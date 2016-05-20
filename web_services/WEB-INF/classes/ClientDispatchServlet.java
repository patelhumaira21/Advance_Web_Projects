import java.io.*;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;

import helpers.*;

/**
 * This class serves as the router servlet which forward the request to
 * appropriate servlet or jsp.
 *
 *
 */
public class ClientDispatchServlet extends HttpServlet {

	/**
	 * This method initializes the shared resources.
	 *
	 * @param config
	 * @throws ServletException
	 */
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		SharedResources.initialize();

	}

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
	 * This method forwards the request to appropriate servlet or jsp.
	 *
	 * @param request
	 * @param response
	 * @param action
	 * @throws IOException
	 * @throws ServletException
	 */
	public void forwardRequest(HttpServletRequest request,
			HttpServletResponse response, String action) throws IOException,
			ServletException {

		RequestDispatcher dispatcher = request.getServletContext()
				.getRequestDispatcher(action);
		dispatcher.forward(request, response);
	}

	/**
	 * This method decides which servlet or jsp to route to.
	 *
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws ServletException
	 */
	private void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws IOException, ServletException {

		String action = request.getParameter("action");
		String toDo = "";

		if (action.equals("checkout")) {
			toDo = "/WEB-INF/jsp_proj3/Billing.jsp";
		} else if (action.equals("confirm_order")) {
			toDo = "/WEB-INF/jsp_proj3/OrderSummary.jsp";
		} else if (action.equals("place_order")) {
			toDo = "/servlet/Order";
		} else if (action.equals("cart")) {
			toDo = "/servlet/CartServlet";
		} else if (action.equals("html")) {
			toDo = "/servlet/HomePage";
		}
		forwardRequest(request, response, toDo);

	}
}
