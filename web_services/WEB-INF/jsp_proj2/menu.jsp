<%@ page import="javax.servlet.*" %>
<%@ page import="javax.servlet.http.*" %>

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<title>Main Menu</title>
	<meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="expires" content="0" />        
	<meta http-equiv="Content-Style-Type" content="text/css" />
	<link rel="stylesheet" href="/jadrn022/css/main_application.css" />
    <script src="/jquery/jquery.js"></script>
    <script src="/jquery/jQueryUI.js"></script>
    <script src="/jadrn022/javascripts/helper.js"></script>
    <script src="/jadrn022/javascripts/menu.js"></script>
</head>

<body>
   <div id="container">
	    <div class="Proj_Heading">
	        <h1>Furniture In</h1>
	    </div>
        <div id="logout">
        	<form method="post">
            	<input type="button" id="logout_button" name="action" value="Logout" class="logout_button"/>
            </form>
        </div>

        <div id="merchandise_in_out">
	         <div id="sku_details">
	         <h3>You can manage your incoming and outgoing merchandise here. Kindly enter a SKU to continue.</h3>
				<form id="merchandise_form">
					   <label for="in_out_sku">
					       <b>Enter SKU:</b>
					   </label>
					   <input type="text" id="in_out_sku" name="sku" size="20"/>
					   <input type="button" id="in_out_sku_check" value="Check SKU"  class="button" /><br/>
				</form>
				<br/>
	  		</div>
  			<div id="merchandise_in_out_form" hidden=true>
  			<br/>
  				<%@ include file="product_details.jsp" %>
  			</div>
         </div>

        	<div id="status"></div>
    </div>
</body>
</html>


