<%@ page import="helpers.*" %>
<%@ page import="java.util.*" %>
<%@ page import="javax.servlet.*" %>
<%@ page import="javax.servlet.http.*" %>


<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Confirmation</title>
	<link rel="stylesheet" href="/jadrn022/css/main_application.css" />
	<script src="/jquery/jquery.js"></script>
    <script src="/jquery/jQueryUI.js"></script>
	<script src="/jadrn022/javascripts/confirmation.js"></script>
</head>
<body>
	<div id="logout">
        	<form method="post">
            	<input type="button" id="logout" name="action" value="Logout" class="logout_button"/>
            </form>
    </div>	
<% HashMap<String,Product> productsHash = (HashMap<String,Product>)session.getAttribute("products");
	Product product = productsHash.get(request.getParameter("product_sku")); 
	String status = (String)request.getAttribute("status");
	int onhand = (Integer)request.getAttribute("on_hand");
	if(status == "error") { %>
	    <h2> There was an error while processing your request.</h2>
	<% }
	else{ %>
	    <h2> Inventory level updated successfully.</h2>
	<%}
%>
<br />
<form id="confirmation_form" method="post" action="/jadrn022/servlet/DispatchServlet?action=menu">
	<h3> The current inventory status is</h3>
    <table id="confirm_record">
        <tr>
            <th><label>SKU: </label></th>
            <td><label id="confirm_sku_label"><%= product.getSku() %></label></td>
            <th><label>Category:</label></th>
            <td><label id="confirm_category_label"><%= product.getCategory() %></label></td>
        </tr>
        <tr>
            <th><label>Vendor:</label></th>
            <td><label id="confirm_vendor_label"><%= product.getVendor() %></label></td>
            <th><label>Manufacturer's Identifier:</label></th>
            <td><label id="confirm_manu_id_label"><%= product.getVendorModel() %></label></td>
        </tr>
        <tr>
            <th><label>Description:</label></th>
            <td><label id="confirm_desc_label"><%= product.getDescription() %></label></td>
            <th><label>Features:</label></th>
            <td><label id="confirm_features_label"><%= product.getFeatures() %></label></td>
        </tr>
        <tr>
            <th><label>Cost:&nbsp;&nbsp;$</label></th>
            <td><label id="confirm_cost_label"><%= product.getCost() %></label></td>
            <th><label>Retail:&nbsp;&nbsp;$</label></th>
            <td><label id="confirm_retail_label"><%= product.getRetail() %></label></td>
        </tr>
        <tr>
            <th><label>On Hand Quantity:</label></th>
            <td><label id="confirm_onhand_label"><%= onhand %></label></td>
            <th><label>Product Image:</label></th>
            <td><img src="/~jadrn022/proj1/_uploads/<%= product.getImage().toLowerCase() %>" id="confirm_image_label" alt="" width=170 height=170 class="image"/></td>
        </tr>
        <tr>
            <td colspan="4" align="center"><input type=submit id="confirm_submit" value="DONE" class="button"/></td>
        </tr>
    </table>
    <br/>
</form>
</body>
</html>