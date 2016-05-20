import java.io.*;
import java.util.HashMap;

import javax.servlet.*;
import javax.servlet.http.*;

import helpers.*;

public class DispatchServlet extends HttpServlet {

    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
                      throws IOException, ServletException {

    	HttpSession session = request.getSession(false);
    	String toDo;
 	    String command = request.getParameter("action");
 	     
		
 	    if(session == null || session.getAttribute("username") == null) {
			response.sendRedirect("/jadrn022/login_err.jsp");
			return;
		}
		
        if(session.getAttribute("products") == null){
            HashMap<String,Product> productDetails = DBHelper.getProducts();
            session.setAttribute("products",productDetails);
        }

        
	    if(command.equals("menu"))
			toDo = "/WEB-INF/jsp_proj2/menu.jsp";
	    else if(command.equals("lookup"))
            toDo = "/servlet/LookupProduct";
	    else if(command.equals("merchandise_in"))
            toDo = "/servlet/Merchandise";
        else if(command.equals("merchandise_out"))
            toDo =  "/servlet/Merchandise";
        else if(command.equals("logout"))
            toDo = "/servlet/Logout";
        else
            toDo = "/WEB-INF/jsp_proj2/login_err.jsp";

	    processRequest(request, response, toDo);
	}

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
            throws IOException, ServletException {
        doPost(request, response);
    }

    public void processRequest(HttpServletRequest request,
                               HttpServletResponse response, String action)
            throws IOException, ServletException {

        RequestDispatcher dispatcher =
                request.getServletContext().getRequestDispatcher(action);
        dispatcher.forward(request, response);
    }


}





