import java.io.*;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;

import helpers.*;

/**
 * This servlet handles the order request. It updates the database and
 * clears the shopping cart.
 *
 */
public class Order extends HttpServlet {

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
     * This method handles the post request.
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
     * This method processes the request
     *
     * @param request
     * @param response
     * @throws IOException
     * @throws ServletException
     */
    private void processRequest(HttpServletRequest request,
                                HttpServletResponse response) throws IOException, ServletException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.write(updateDatabase(request) ? "SUCCESS" : "ERROR");

    }

    /**
     * This method updates the on-hand quantity for each product in the cart.
     *
     * @param request
     * @return
     * @throws IOException
     * @throws ServletException
     */
    private boolean updateDatabase(HttpServletRequest request) throws IOException, ServletException{

        HttpSession session = request.getSession(false);
        HashMap<String, Integer> cartQuantity = (HashMap<String, Integer>)session.getAttribute("productQuantity");

        if(cartQuantity == null)
            return false;

        // update the database
        for(String sku : cartQuantity.keySet()){
            updateMerchandise(sku,cartQuantity.get(sku));
        }

        // Delete elements from the cart
        session.setAttribute("productQuantity", null);
        session.setAttribute("productDetails", null);
        SharedResources.getShoppingCart().remove(session.getId());
        return true;

    }

    /**
     * This method updates the onhand quantity of the given product.
     *
     * @param sku
     * @param quantity
     */
    public void updateMerchandise(String sku, int quantity) {
        boolean dbResult = DBHelper.runUpdateQuery("INSERT INTO merchandise_out"
                + " values('" + sku + "',CURDATE()," + quantity + ");");

        if (dbResult) {
            int on_hand_quantity = DBHelper.getOnHandQuantity(sku);
            int new_quantity = 0;
            if (on_hand_quantity != -9999) {
                new_quantity = on_hand_quantity - quantity;
                DBHelper.runUpdateQuery("UPDATE on_hand SET last_date_modified=CURDATE(),"
                        + "on_hand_quantity=" + new_quantity + " WHERE sku='" + sku + "';");
            }
        }
    }

}
