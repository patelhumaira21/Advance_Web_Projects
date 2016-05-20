import java.io.*;
import java.text.*;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.*;
import javax.servlet.http.*;

import helpers.*;


public class Merchandise extends HttpServlet { 
          
    public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {
        processRequest(request, response);         
        }

    public void doGet(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  { 
        processRequest(request, response);
        } 
        
    private void processRequest(HttpServletRequest request,
              HttpServletResponse response) 
                        throws IOException, ServletException {
    	
    	HttpSession session = request.getSession(false);
        if(session == null) {    
            ServletContext context = getServletContext();       
            RequestDispatcher dispatcher 
                = request.getRequestDispatcher("/WEB-INF/jsp_proj2/login_err.jsp");   
            dispatcher.forward(request, response);              
        }    
        
        String toDo;
        if(!request.getMethod().equals("POST")) {
            response.sendRedirect("/jadrn022/login_err.jsp");
            return;
        }    
        String sku = (String)request.getParameter("product_sku");
        int quantity = Integer.parseInt(request.getParameter("quantity"));
    	String dateString = (String)request.getParameter("datepicker");
	    String tableName = request.getParameter("action");

    	boolean dbResult = DBHelper.runUpdateQuery("INSERT INTO "+tableName
        		+ " values('"+sku+"',STR_TO_DATE('"+dateString+"','%m/%d/%Y'),"+quantity+");");
    	
        Date currDate = new Date();
        boolean success = false;
        if(dbResult){
        	int on_hand_quantity = DBHelper.getOnHandQuantity(sku);
        	int new_quantity = 0;
        	if(on_hand_quantity != -9999){
        		
        		new_quantity = (tableName.equals("merchandise_in")) 
        				? (on_hand_quantity+quantity)
        				: (on_hand_quantity-quantity);

        		//System.out.println("In update"+new_quantity);
        		success = DBHelper.runUpdateQuery("UPDATE on_hand SET last_date_modified=CURDATE(),"
        				+ "on_hand_quantity="+new_quantity+" WHERE sku='"+sku+"';");
        	    request.setAttribute("on_hand",  (success) ? new_quantity : on_hand_quantity);
        	}
        	else
        	{	//System.out.println("In insert"+quantity);
        		success = DBHelper.runUpdateQuery("INSERT INTO on_hand "
        				+ "values('"+sku+"',CURDATE(),"+quantity+");");
        		request.setAttribute("on_hand", (success) ? quantity : 0 );
        	}
        	
    		request.setAttribute("status", (success) ? "success" : "error");

    		RequestDispatcher dispatcher =
                    request.getServletContext().getRequestDispatcher("/WEB-INF/jsp_proj2/confirmation.jsp");
            dispatcher.forward(request, response);
        }
        
       
     }
}


