import java.io.*;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;

import helpers.*;

/**
 * This Servlet provides all the products to the home page. It applies various
 * filters to the product.
 *
 */
public class HomePage extends HttpServlet {

	private String[] categoryFilters;
	private String[] vendorFilters;
	private int maxPrice = Integer.MAX_VALUE;
	private int minPrice = Integer.MIN_VALUE;

	/**
	 * Handling the get method
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
	 *
	 * Handling the post method
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
	 *
	 * This method returns the details of all the products to the user in an
	 * html form. It considers filters as well.
	 *
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws ServletException
	 */
	private void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws IOException, ServletException {

		Hashtable<String, Product> productTable = SharedResources
				.updateProductQuantity();

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();

		String categories = request.getParameter("categories");
		categoryFilters = (categories != null) ? categories.split("\\|") : null;

		String vendors = request.getParameter("vendors");
		vendorFilters = (vendors != null) ? vendors.split("\\|") : null;

		String minPrice = request.getParameter("minPrice");
		this.minPrice = (minPrice != null) ? Integer.parseInt(minPrice)
				: Integer.MIN_VALUE;

		String maxPrice = request.getParameter("maxPrice");
		this.maxPrice = (maxPrice != null) ? Integer.parseInt(maxPrice)
				: Integer.MAX_VALUE;
		boolean isEmpty = true;
		for (String key : productTable.keySet()) {
			Product product = productTable.get(key);
			if (applyFilters(product)) {
				isEmpty = false;
				String status = "";
				String css_class = "";
				int quantity = 0;
				if (product.getOnHandQuantity() == null) {
					quantity = -999;
				} else {
					quantity = Integer.parseInt(product.getOnHandQuantity());
				}

				if (quantity > 0) {
					status = "In Stock";
					css_class = "in_stock";
				} else if (quantity == 0) {
					status = "More on the way";
					css_class = "more_to_come";
				} else {
					status = "Coming soon";
					css_class = "coming_soon";
				}

				// data-cleansing
				String productData = product.toString();
				productData = escapeHtml(productData);

				out.write("<div class=\"thumbnail detail_view\" "
						+ "id=\"thumbnail_" + product.getSku() + "\"><center>");
				// Image div
				out.write("<div class=\"img\">");
				out.write("<img src=\"/~jadrn022/proj1/_uploads/"
						+ product.getImage().toLowerCase()
						+ "\" style=\"width:150px;height:150px\">");
				out.write("</div>");

				// Caption div
				out.write("<div class=\"caption\">");
				out.write("<p><label id=\"product_code\"><b>"
						+ product.getVendorModel() + "</b><br/><i> by "
						+ product.getVendor() + "</i>" + "</label>"
						+ "<br/><label for=\"product_price\">Price: $</label>"
						+ "<label id=\"product_price\">" + product.getRetail()
						+ "</label>" + "<br/><label id=\"status_"
						+ product.getSku() + "\" class=\"" + css_class + "\">"
						+ status + "</label><br/></p>");

				// Button
				out.write("<p>");
				out.write("<button type=\"button\" class=\" detail_button detail_view\" "
						+ "id=\"detail_"
						+ product.getSku()
						+ "\"  "
						+ "data-product=\""
						+ productData
						+ "\">Detailed View</button>");
				out.write("</p></center></div>");
				out.write("</div>");
			}
		}

		// Check for empty results
		if (isEmpty) {
			out.write("<h1>Your search did not match any products.</h1><br/>"
					+ "<h3>Kindly refine your search with some other filters.</h3>");
		}
	}

	/**
	 * Apply the filters to the product to decide whether to show this product
	 * or not.
	 *
	 * @param product
	 * @return
	 */
	private boolean applyFilters(Product product) {
		return (categoryFilters == null || Arrays.asList(categoryFilters)
				.contains(product.getCategory()))
				&& (vendorFilters == null || Arrays.asList(vendorFilters)
						.contains(product.getVendor()))
				&& Double.parseDouble(product.getRetail()) >= minPrice
				&& Double.parseDouble(product.getRetail()) <= maxPrice;

	}

	/**
	 * Cleaning up html escape characters.
	 *
	 * @param string
	 * @return
	 */
	private String escapeHtml(String string) {
		return string.replace("'", "&#x27;").replace("\"", "&quot;")
				.replace("/", "&#x2F;").replace("&", "&amp;")
				.replace(">", "&gt;").replace("<", "&lt;");
	}

}
