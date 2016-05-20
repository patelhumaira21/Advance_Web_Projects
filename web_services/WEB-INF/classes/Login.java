import java.io.*;
import java.util.HashMap;

import javax.servlet.*;
import javax.servlet.http.*;

import helpers.*;


public class Login extends HttpServlet { 
          
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
        String toDo;
        if(!request.getMethod().equals("POST")) {
            response.sendRedirect("/jadrn022/login_err.jsp");
            return;
            }     
        String username = (String) request.getParameter("username");
        String password = (String) request.getParameter("password");
        if(username == null || password == null) {
            response.sendRedirect("/jadrn022/login_err.jsp");
            return;
            }        
        if(PasswordUtilities.isValidLogin(username,password)) {
            toDo =  "/jadrn022/servlet/DispatchServlet?action=menu";
            HttpSession session = request.getSession(true);
            session.setAttribute("username", username);
            
            if(session.getAttribute("products") == null){
                HashMap<String,Product> productDetails = DBHelper.getProducts();
                session.setAttribute("products",productDetails);
            }

        }
        else
            toDo = "/jadrn022/login_err.jsp";
        response.sendRedirect(toDo);
    }
}


