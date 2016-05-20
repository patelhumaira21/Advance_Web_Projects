import java.io.*;

import javax.servlet.*;
import javax.servlet.http.*;

import helpers.*;

/**
 * This servlet serves as the helper servlet to the home servlet.
 * It returns the values of vendor or category that the filters in
 * home servlet needs.
 *
 */
public class FetchCategoryVendorServlet extends HttpServlet {

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
     * This method processes the request and returns the stringified list
     * of categories or vendors.
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
        String action = request.getParameter("action");

        out.write(
                (action.equals("category")) ?
                DBHelper.getCategoryValues() :
                DBHelper.getVendorValues()
        );
    }
}
