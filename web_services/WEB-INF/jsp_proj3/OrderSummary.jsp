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
<title>Furniture In-Billing</title>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="Content-Style-Type" content="text/css" />

<script type="text/javascript" src="/jquery/jquery.js"></script>
<script type="text/javascript" src="/jquery/jQueryUI.js"></script>
<script type="text/javascript" src="/jadrn022/javascripts/helper.js"></script>
<script type="text/javascript"
	src="/jadrn022/javascripts/order_summary.js"></script>
<link rel="stylesheet" href="/jadrn022/css/order_summary.css">
<link rel="stylesheet" href="/jadrn022/css/common.css">

<!--    Patel, Humaira    Account:  jadrn022
          CS645, Spring 2016
          Project #3
    -->

</head>
<body>

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
	<div id="order_summary">

		<%
			if (session != null) {
				HashMap<String, Product> purchasedItems = (HashMap<String, Product>) session
						.getAttribute("productDetails");
				HashMap<String, Integer> purchasedQuantity = (HashMap<String, Integer>) session
						.getAttribute("productQuantity");
				double sub_total = 0;
				double sales_tax = 0;
				double order_total = 0;
				double shipping = 5;
				if (purchasedQuantity == null || purchasedQuantity.size() == 0) {
		%>
		<center>
			<img src="/jadrn022/images/empty_cart.png" id="empty_cart"><br /> <input
				type="button" class="continue_shopping" value="Continue Shopping" />
		</center>
		<%
			} else {
		%>
		<%!DecimalFormat df = new DecimalFormat("###.##");%>
		<div id="heading" class="heading" style="display: block">
			<h2>Final Checkout Review</h2>
		</div>

		<div id="confirm_heading" class="heading" style="display: none">
			<h2>Thank you for your order</h2>
		</div>
		<div id="confirmation" style="display: none">
			<p id="confirmation_note">Your order has been received and is now
				being processed. Your order details are shown below for your
				reference:</p>
			<p>
				<h3 class="order_number">
					ORDER: #<%=UUID.randomUUID().toString().split("-")[4]%>
					<input type="button" value="PRINT" id="print" class="print" />
				</h3>

			</p>
		</div>
		<div id="product_summary">
			<h3 id="order_summary_caption" style="display: block">Order
				Summary</h3>
			<table id="summary_table" class="summary_table">
				<tr>
					<th>Product</th>
					<th>Quantity</th>
					<th>Price</th>
				</tr>
				<%
					for (String key : purchasedItems.keySet()) {
								double total_price = Double.parseDouble(purchasedItems
										.get(key).getRetail())
										* purchasedQuantity.get(key);
				%>
				<tr>
					<td><%=purchasedItems.get(key).getCategory()
								+ " from 	"
								+ purchasedItems.get(key).getVendor() + " : "
								+ purchasedItems.get(key).getVendorModel()%></td>
					<td align="center"><%=purchasedQuantity.get(key)%></td>
					<td align="center">$<%=df.format(total_price)%></td>
				</tr>
				<%
					sub_total += total_price;
								sales_tax = 0.08 * (sub_total + shipping);
								order_total = (sub_total + sales_tax + shipping);
							}
				%>
				<tr>
					<th colspan="2">Cart Subtotal:</th>
					<td align="center">$<%=df.format(sub_total)%></td>
				</tr>
				<tr>
					<th colspan="2">Shipping:</th>
					<td align="center">$5.00</td>
				</tr>
				<tr>
					<th colspan="2">Sales Tax:</th>
					<td align="center">$<%=df.format(sales_tax)%></td>
				</tr>
				<tr>
					<th colspan="2">Order Total:</th>
					<td align="center"><b>$<%=df.format(order_total)%></b></td>
				</tr>
			</table>
		</div>
		<div id="customer_details">
			<h3>Customer Details</h3>
			<p>
				<b>Name: </b><%=request.getParameter("ship_name")%><br /> <b>Phone:
				</b><%=request.getParameter("ship_phone")%><br />
			</p>
		</div>
		<div id="card_details" style="display: block">
			<h3>Payment Information</h3>
			<p>
				<b>Credit Card Type: </b><%=request.getParameter("card_type")%><br />
				<b>Credit Card Number: </b><%=request.getParameter("card_number").replaceFirst(
							".{12}", "XXXXXXXXXXXX")%><br /> <b>Expiration Date: </b><%=request.getParameter("month") + "/"
							+ request.getParameter("year")%>
			</p>
		</div>
		<div id="ship_details">
			<table id="ship_summary">
				<tr class="ship_summary">
					<th class="ship_summary">Billing Address</th>
					<th class="ship_summary">Shipping Address</th>
				</tr>
				<tr class="ship_summary">
					<td class="ship_summary"><%=request.getParameter("bill_name")%></td>
					<td class="ship_summary"><%=request.getParameter("ship_name")%></td>
				</tr>
				<tr class="ship_summary">
					<td class="ship_summary"><%=request.getParameter("bill_address_1")%></td>
					<td class="ship_summary"><%=request.getParameter("ship_address_1")%></td>
				</tr>
				<tr class="ship_summary">
					<td class="ship_summary"><%=request.getParameter("bill_city") + ", "
							+ request.getParameter("bill_state") + "<br/>Zip:"
							+ request.getParameter("bill_zip")%></td>
					<td class="ship_summary"><%=request.getParameter("ship_city") + ", "
							+ request.getParameter("ship_state") + "<br/>Zip:"
							+ request.getParameter("ship_zip")%></td>
				</tr>
			</table>
		</div>
		<div id="place_order_div" style="display: block">
			<input type="button" value="CANCEL" id="cancel" class="cancel" /> <input
				type="submit" value="PLACE ORDER" id="place_order"
				class="place_order" />
		</div>
		<div id="done" style="display: none">
			<input type="button" value="I AM DONE" id="done_button" class="done" />
		</div>
		<%
			}
			}
		%>

	</div>
</body>
</html>