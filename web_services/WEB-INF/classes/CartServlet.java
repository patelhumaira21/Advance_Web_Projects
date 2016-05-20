import java.io.*;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;

import helpers.*;

/***
 * This servlet handles all the operations related to cart like add, update
 * delete and clear.
 *
 */
public class CartServlet extends HttpServlet {

    /**
     * This method handles the get request.
     *
     * @param request
     * @param response
     * @throws IOException
     * @throws ServletException
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        processRequest(request, response);
    }

    /**
     * This method handles the post request
     *
     * @param request
     * @param response
     * @throws IOException
     * @throws ServletException
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        processRequest(request, response);
    }


    /**
     * This method process the request and performs and the required operations
     * on the cart.
     *
     * @param request
     * @param response
     * @throws IOException
     * @throws ServletException
     */
    public void processRequest(HttpServletRequest request,
                               HttpServletResponse response)
            throws IOException, ServletException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        Hashtable<String, Cart> shoppingCart = SharedResources.getShoppingCart();
        String command = request.getParameter("command");
        String productSku = request.getParameter("selectedSku");

        int quantity = 0;
        try {
            quantity = Integer.parseInt((String) request
                    .getParameter("quantity"));
        } catch (NumberFormatException e) {
            quantity = 0;
        }

        HttpSession session = request.getSession();
        if(session == null) {
            out.write("SESSION_NULL");
        }
        else{
            String sessionId = session.getId();
            Cart c = shoppingCart.get(sessionId);
            if (c == null)
                shoppingCart.put(sessionId, new Cart(sessionId)); // new cart

            c = shoppingCart.get(sessionId);
            if (command.equals("add")){
                c.insert(productSku, quantity);
                out.write("SUCCESS_"+c.size());
            }
            else if (command.equals("update")){
                c.insert(productSku, quantity);
                goToCart(c, request, response);
            }
            else if (command.equals("delete")) {
                c.delete(productSku);
                goToCart(c, request, response);
            }
            else if (command.equals("clear")){
                c.clear();
            }
            else if (command.equals("fetch")) {
                goToCart(c, request, response);
            }
            else if(command.equals("size")) {
                out.write(""+c.size());
            }
        }

    }

    /**
     * This method adds the cart to the users session and
     * routes the user to the shopping cart page
     *
     * @param c
     * @param request
     * @param response
     * @throws IOException
     * @throws ServletException
     */
    private void goToCart(Cart c, HttpServletRequest request,
                          HttpServletResponse response) throws IOException, ServletException  {

        Hashtable<String, Product> productTable   =  SharedResources.getProducttable();
        HashMap<String, Product> cartToSend = new HashMap<String, Product>();
        HashMap<String, Integer> cartQuantity = new HashMap<String, Integer>();
        HttpSession session = request.getSession(false);
        Iterator<String> k = c.keys();
        Iterator<Integer> v = c.values();
        while (k.hasNext()) {
            String key = k.next();
            cartToSend.put(key, productTable.get(key));
            cartQuantity.put(key, v.next());
        }
        session.setAttribute("productQuantity", cartQuantity);
        session.setAttribute("productDetails", cartToSend);
        RequestDispatcher dispatcher = request.getServletContext()
                .getRequestDispatcher("/WEB-INF/jsp_proj3/ShoppingCart.jsp");
        dispatcher.forward(request, response);
    }



}
