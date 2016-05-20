<%@ page import="helpers.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.DecimalFormat"%>
<%@ page import="javax.servlet.*"%>
<%@ page import="javax.servlet.http.*"%>

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
<title>Furniture In-Cart</title>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="Content-Style-Type" content="text/css" />

<script type="text/javascript" src="/jquery/jquery.js"></script>
<script type="text/javascript" src="/jquery/jQueryUI.js"></script>
<script type="text/javascript" src="/jadrn022/javascripts/helper.js"></script>
<script type="text/javascript"
	src="/jadrn022/javascripts/shopping_cart.js"></script>
<link rel="stylesheet" href="/jadrn022/css/shopping_cart.css">
<link rel="stylesheet" href="/jadrn022/css/common.css">

<!--    Patel, Humaira    Account:  jadrn022
          CS645, Spring 2016
          Project #3
    -->

</head>
<body>
	<div class="ui-widget">
		<div class="ui-widget-header">
			<img src="/jadrn022/images/logo.png" alt="logo" class="logo" />
			<div id="counter">
				<ul id="navigation">
					<li><a href="/jadrn022/proj3.html">HOME</a></li>
					<li><a href="/jadrn022/about.html">ABOUT US</a></li>
					<li><a href="/jadrn022/contact.html">CONTACT US</a></li>
				</ul>
			</div>
		</div>
		<%
			if (session != null) {
				HashMap<String, Product> shoppingBag = (HashMap<String, Product>) session
						.getAttribute("productDetails");
				HashMap<String, Integer> itemQuantity = (HashMap<String, Integer>) session
						.getAttribute("productQuantity");
				double sub_total = 0;
				double sales_tax = 0;
				double est_total = 0;
				double shipping = 5;
				if (itemQuantity == null || itemQuantity.size() == 0) {
		%>
		<div id="bag">
			<center>
				<img src="/jadrn022/images/empty_cart.png" id="empty_cart"><br /><input
					type="button" class="continue_shopping" value="Continue Shopping" />
			</center>
			<%
				} else {
			%>
			<%!DecimalFormat df = new DecimalFormat("###.##");%>

			<div id="left">
				<h2>MY SHOPPING CART</h2>
				<hr />
				<form id="cart_form">
					<table id="cart_table">
						<tr>
							<th style="width: 20%; align: center">PRODUCT</th>
							<th style="width: 40%"></th>
							<th style="width: 20%";align:center">PRICE</th>
							<th style="width: 20%";align:center">TOTAL</th>
						</tr>
						<%
							for (String key : shoppingBag.keySet()) {
										String stock_status = "";
										int stock = 0;
										double total_price = Double.parseDouble(shoppingBag
												.get(key).getRetail()) * itemQuantity.get(key);

										if (shoppingBag.get(key).getOnHandQuantity() != null) {
											stock = Integer.parseInt(shoppingBag.get(key)
													.getOnHandQuantity());
										}
										if (stock <= 0)
											stock_status = "OUT OF STOCK";
										else
											stock_status = "You can order upto " + stock
													+ " of this item";
						%>
						<tr>
							<td><img
								src="/~jadrn022/proj1/_uploads/<%=shoppingBag.get(key).getImage().toLowerCase()%>"
								style="border-width: 1px; padding-left: 0px; width: 75px; height: 75x" />
							</td>
							<td class="cart_contents"><%=shoppingBag.get(key).getCategory()
								.toUpperCase()
								+ " BY "
								+ shoppingBag.get(key).getVendor()
										.toUpperCase()%><br /> <br /> PRODUCT NO: <%=shoppingBag.get(key).getVendorModel()%><br />
								<br /> <input type="number" name="quantity"
								id="quantity_<%=shoppingBag.get(key).getSku()%>" size="5"
								value="<%=itemQuantity.get(key)%>" />
								<button class="update"
									id="update_<%=shoppingBag.get(key).getSku()%>"
									data-previous="<%=itemQuantity.get(key)%>">Update</button> <br />
								<br /> <span
								id="stock_status_<%=shoppingBag.get(key).getSku()%>"
								data-max="<%=shoppingBag.get(key).getOnHandQuantity()%>"><%=stock_status%>
							</span> <br /> <br /> <br />
								<button class="remove"
									id="remove_<%=shoppingBag.get(key).getSku()%>">Remove
								</button></td>
							<td>$<%=shoppingBag.get(key).getRetail()%>
							</td>
							<td>$ <%=df.format(total_price)%></td>
						</tr>
						<tr class="blank_row_cart">
							<td colspan="4"></td>
						</tr>
						<%
							sub_total += total_price;
										sales_tax = 0.08 * (sub_total + shipping);
										est_total = (sub_total + sales_tax + shipping);
									}
						%>
					</table>
				</form>
				<center>
					<input type="button" class="continue_shopping"
						value="Continue Shopping" />
				</center>
			</div>

			<div id="right">
				<h3>SUMMARY</h3>
				<hr />
				<form id="summary_form">
					<table id="summary_table">
						<tr>
							<th>SUBTOTAL</th>
							<td>$ <%=df.format(sub_total)%></td>
						</tr>
						<tr class="blank_row_cart">
							<td colspan="4"></td>
						</tr>
						<tr>
							<th>Shipping</th>
							<td>$ 5.00</td>
						</tr>
						<tr class="blank_row_cart">
							<td colspan="4"></td>
						</tr>

						<tr class="underline">
							<th>Sales Tax</th>
							<td>$ <%=df.format(sales_tax)%></td>
						</tr>
						<tr class="blank_row_cart">
							<td colspan="4"></td>
						</tr>
						<tr>
							<th>ESTIMATED TOTAL</th>
							<td><b>$ <%=df.format(est_total)%></b></td>
						</tr>
						<tr class="blank_row_cart underline">
							<td colspan="4"></td>
						</tr>
						<tr class="blank_row_cart">
							<td colspan="4"></td>
						</tr>
						<tr>
							<th colspan="2">
								<center>
									<input type="submit" id="checkout" value="PROCEED TO CHECKOUT" />
								</center>
							</th>
						</tr>
					</table>
				</form>
			</div>
			<%
				}
				}
			%>
		</div>
	</div>
</body>
</html>