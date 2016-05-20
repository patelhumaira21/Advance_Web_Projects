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
<script type="text/javascript" src="/jadrn022/javascripts/billing.js"></script>
<link rel="stylesheet" href="/jadrn022/css/billing.css">
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
	<form id="confirm_order_form" method="post"
		action="http://jadran.sdsu.edu/jadrn022/servlet/ClientDispatchServlet?action=confirm_order">
		<div class="ship">
			<h3>Shipping Address</h3>
			<table id="ship_table">
				<tr>
					<th><label>Name <span class="asterisk">*</span></label></th>
					<td><input type="text" name="ship_name" id="ship_name"
						value="" maxlength="50" size="50" /></td>
					<td width="30%"><label id="error_ship_name"
						class="errormessage"></label></td>
				</tr>
				<tr>
					<th><label>Address Line 1 <span class="asterisk">*</span></label></th>
					<td><input type="text" name="ship_address_1"
						id="ship_address_1" value="" maxlength="50" size="50" /></td>
					<td><label id="error_ship_address_1" class="errormessage"></label></td>
				</tr>
				<tr>
					<th><label>Address Line 2 </label></th>
					<td><input type="text" name="ship_address_2"
						id="ship_address_2" value="" maxlength="50" size="50" /></td>
					<td><label id="error_ship_address_2" class="errormessage"></label></td>
				</tr>
				<tr>
					<th><label>City <span class="asterisk">*</span></label></th>
					<td><input type="text" name="ship_city" id="ship_city"
						value="" maxlength="50" size="50" /></td>
					<td><label id="error_ship_city" class="errormessage"></label></td>
				</tr>
				<tr>
					<!-- Source: http://www.freeformatter.com/usa-state-list-html-select.html -->
					<th><label>State <span class="asterisk">*</span></label></th>
					<td><select name="ship_state" id="ship_state">
							<option value="" selected="selected">Select one...</option>
							<option value="Alabama">Alabama</option>
							<option value="Alaska">Alaska</option>
							<option value="Arizona">Arizona</option>
							<option value="Arkansas">Arkansas</option>
							<option value="California">California</option>
							<option value="Colorado">Colorado</option>
							<option value="Connecticut">Connecticut</option>
							<option value="Delaware">Delaware</option>
							<option value="District of Columbia">District of
								Columbia</option>
							<option value="Florida">Florida</option>
							<option value="Georgia">Georgia</option>
							<option value="Hawaii">Hawaii</option>
							<option value="Idaho">Idaho</option>
							<option value="Illinois">Illinois</option>
							<option value="Indiana">Indiana</option>
							<option value="Iowa">Iowa</option>
							<option value="Kansas">Kansas</option>
							<option value="Kentucky">Kentucky</option>
							<option value="Louisiana">Louisiana</option>
							<option value="Maine">Maine</option>
							<option value="Maryland">Maryland</option>
							<option value="Massachusetts">Massachusetts</option>
							<option value="Michigan">Michigan</option>
							<option value="Minnesota">Minnesota</option>
							<option value="Mississippi">Mississippi</option>
							<option value="Missouri">Missouri</option>
							<option value="Montana">Montana</option>
							<option value="Nebraska">Nebraska</option>
							<option value="Nevada">Nevada</option>
							<option value="New Hampshire">New Hampshire</option>
							<option value="New Jersey">New Jersey</option>
							<option value="New Mexico">New Mexico</option>
							<option value="New York">New York</option>
							<option value="North Carolina">North Carolina</option>
							<option value="North Dakota">North Dakota</option>
							<option value="Ohio">Ohio</option>
							<option value="Oklahoma">Oklahoma</option>
							<option value="Oregon">Oregon</option>
							<option value="Pennsylvania">Pennsylvania</option>
							<option value="Rhode Island">Rhode Island</option>
							<option value="South Carolina">South Carolina</option>
							<option value="South Dakota">South Dakota</option>
							<option value="Tennessee">Tennessee</option>
							<option value="Texas">Texas</option>
							<option value="Utah">Utah</option>
							<option value="Vermont">Vermont</option>
							<option value="Virginia">Virginia</option>
							<option value="Washington">Washington</option>
							<option value="West Virginia">West Virginia</option>
							<option value="Wisconsin">Wisconsin</option>
							<option value="Wyoming">Wyoming</option>
							<option value="American Samoa">American Samoa</option>
							<option value="Guam">Guam</option>
							<option value="Northern Mariana Island">Northern Mariana
								Islands</option>
							<option value="Puerto Rico">Puerto Rico</option>
							<option value="United States Minor Outlying Islands">United
								States Minor Outlying Islands</option>
							<option value="Virgin Islands">Virgin Islands</option>
							<option value="AA">AA</option>
							<option value="AP">AP</option>
							<option value="AE">AE</option>
					</select></td>
					<td><label id="error_ship_state" class="errormessage"></label></td>
				</tr>
				<tr>
					<th><label>ZIP/Postal Code <span class="asterisk">*</span></label></th>
					<td><input type="text" name="ship_zip" id="ship_zip" value=""
						maxlength="12" size="50" /></td>
					<td><label id="error_ship_zip" class="errormessage"></label></td>
				</tr>
				<tr>
					<th><label>Contact Phone <span class="asterisk">*</span></label></th>
					<td><input type="text" name="ship_phone" id="ship_phone"
						placeholder="XXX-XXX-XXXX" value="" maxlength="15" size="50" /></td>
					<td><label id="error_ship_phone" class="errormessage"></label></td>
				</tr>
			</table>
		</div>

		<div class="bill_details">
			<h3>Billing Address</h3>
			<input type="checkbox" name="bill_addr_same" id="bill_addr_same"
				value="same" /> <label for="ship_addr_same"><b>My
					Billing Address is same as Shipping Address.</b></label>&nbsp;&nbsp;&nbsp;
			<div>


				<div class="bill" style="display: block">
					<table id="bill_table">
						<tr>
							<th><label>Name <span class="asterisk">*</span></label></th>
							<td><input type="text" name="bill_name" id="bill_name"
								value="" maxlength="50" size="50" /></td>
							<td><label id="error_bill_name" class="errormessage"></label></td>
						</tr>
						<tr>
							<th><label>Address Line 1 <span class="asterisk">*</span></label></th>
							<td><input type="text" name="bill_address_1"
								id="bill_address_1" value="" maxlength="50" size="50" /></td>
							<td><label id="error_bill_address_1" class="errormessage"></label></td>
						</tr>
						<tr>
							<th><label>Address Line 2 </label></th>
							<td><input type="text" name="bill_address_2"
								id="bill_address_2" value="" maxlength="50" size="50" /></td>
							<td><label id="error_bill_address_2" class="errormessage"></label></td>
						</tr>
						<tr>
							<th><label>City <span class="asterisk">*</span></label></th>
							<td><input type="text" name="bill_city" id="bill_city"
								value="" maxlength="50" size="50" /></td>
							<td><label id="error_bill_city" class="errormessage"></label></td>
						</tr>
						<tr>
							<!-- Source: http://www.freeformatter.com/usa-state-list-html-select.html -->
							<th><label>State <span class="asterisk">*</span></label></th>
							<td><select name="bill_state" id="bill_state">
									<option value="" selected="selected">Select one...</option>
									<option value="Alabama">Alabama</option>
									<option value="Alaska">Alaska</option>
									<option value="Arizona">Arizona</option>
									<option value="Arkansas">Arkansas</option>
									<option value="California">California</option>
									<option value="Colorado">Colorado</option>
									<option value="Connecticut">Connecticut</option>
									<option value="Delaware">Delaware</option>
									<option value="District of Columbia">District of
										Columbia</option>
									<option value="Florida">Florida</option>
									<option value="Georgia">Georgia</option>
									<option value="Hawaii">Hawaii</option>
									<option value="Idaho">Idaho</option>
									<option value="Illinois">Illinois</option>
									<option value="Indiana">Indiana</option>
									<option value="Iowa">Iowa</option>
									<option value="Kansas">Kansas</option>
									<option value="Kentucky">Kentucky</option>
									<option value="Louisiana">Louisiana</option>
									<option value="Maine">Maine</option>
									<option value="Maryland">Maryland</option>
									<option value="Massachusetts">Massachusetts</option>
									<option value="Michigan">Michigan</option>
									<option value="Minnesota">Minnesota</option>
									<option value="Mississippi">Mississippi</option>
									<option value="Missouri">Missouri</option>
									<option value="Montana">Montana</option>
									<option value="Nebraska">Nebraska</option>
									<option value="Nevada">Nevada</option>
									<option value="New Hampshire">New Hampshire</option>
									<option value="New Jersey">New Jersey</option>
									<option value="New Mexico">New Mexico</option>
									<option value="New York">New York</option>
									<option value="North Carolina">North Carolina</option>
									<option value="North Dakota">North Dakota</option>
									<option value="Ohio">Ohio</option>
									<option value="Oklahoma">Oklahoma</option>
									<option value="Oregon">Oregon</option>
									<option value="Pennsylvania">Pennsylvania</option>
									<option value="Rhode Island">Rhode Island</option>
									<option value="South Carolina">South Carolina</option>
									<option value="South Dakota">South Dakota</option>
									<option value="Tennessee">Tennessee</option>
									<option value="Texas">Texas</option>
									<option value="Utah">Utah</option>
									<option value="Vermont">Vermont</option>
									<option value="Virginia">Virginia</option>
									<option value="Washington">Washington</option>
									<option value="West Virginia">West Virginia</option>
									<option value="Wisconsin">Wisconsin</option>
									<option value="Wyoming">Wyoming</option>
									<option value="American Samoa">American Samoa</option>
									<option value="Guam">Guam</option>
									<option value="Northern Mariana Island">Northern
										Mariana Islands</option>
									<option value="Puerto Rico">Puerto Rico</option>
									<option value="United States Minor Outlying Islands">United
										States Minor Outlying Islands</option>
									<option value="Virgin Islands">Virgin Islands</option>
									<option value="AA">AA</option>
									<option value="AP">AP</option>
									<option value="AE">AE</option>
							</select></td>
							<td><label id="error_bill_state" class="errormessage"></label></td>
						</tr>
						<tr>
							<th><label>ZIP/Postal Code <span class="asterisk">*</span></label></th>
							<td><input type="text" name="bill_zip" id="bill_zip"
								value="" maxlength="12" size="50" /></td>
							<td><label id="error_bill_zip" class="errormessage"></label></td>
						</tr>
						<tr>
							<th><label>Contact Phone <span class="asterisk">*</span></label></th>
							<td><input type="text" name="bill_phone" id="bill_phone"
								placeholder="XXX-XXX-XXXX" value="" maxlength="15" size="50" /></td>
							<td><label id="error_bill_phone" class="errormessage"></label></td>
						</tr>
					</table>
				</div>
				<div class="payment">
					<h3>Payment Information</h3>
					<table id="payment_table">
						<tr>
							<th><label>Credit Card Type <span class="asterisk">*</span></label></th>
							<td><input type="radio" name="card_type" id="visa"
								value="Visa" class="radio" /> <img src="/jadrn022/images/visa.png"
								style="width: 50px; height: 40px" class="credit_card" /> <input
								type="radio" name="card_type" id="mastercard" value="MasterCard"
								class="radio" /> <img src="/jadrn022/images/mastercard.jpg"
								style="width: 50px; height: 40px" class="credit_card" /> <input
								type="radio" name="card_type" id="american"
								value="American Express" class="radio" /> <img
								src="/jadrn022/images/american_express.png"
								style="width: 50px; height: 40px" class="credit_card" /> <input
								type="radio" name="card_type" id="discover" value="Discover"
								class="radio" /> <img src="/jadrn022/images/discover.jpg"
								style="width: 50px; height: 40px" class="credit_card" /></td>
						</tr>
						<tr>
							<td colspan="2"><center>
									<label id="error_card_type" class="errormessage"></label>
								</center></td>
						</tr>
						<tr>
							<th><label>Credit Card Number <span class="asterisk">*</span></label></th>
							<td><input type="text" name="card_number" id="card_number"
								value="" maxlength="16" size="20" /></td>
						</tr>
						<tr>
							<td colspan="2">
								<center>
									<label id="error_card_number" class="errormessage"></label>
								</center>
							</td>
						</tr>
						<tr>
							<th><label>Expiration Date <span class="asterisk">*</span></label></th>
							<td><select name="month" id="exp_month">
									<option value="01" selected="selected">01</option>
									<option value="02">02</option>
									<option value="03">03</option>
									<option value="04">04</option>
									<option value="05">05</option>
									<option value="06">06</option>
									<option value="07">07</option>
									<option value="08">08</option>
									<option value="09">09</option>
									<option value="10">10</option>
									<option value="11">11</option>
									<option value="12">12</option>
							</select> / <select name="year" id="exp_year">
									<option value="2016" selected="selected">2016</option>
									<option value="2017">2017</option>
									<option value="2018">2018</option>
									<option value="2019">2019</option>
									<option value="2020">2020</option>
									<option value="2021">2021</option>
									<option value="2022">2022</option>
									<option value="2023">2023</option>
									<option value="2024">2024</option>
									<option value="2025">2025</option>
							</select></td>
						</tr>
						<tr>
							<th>Security Code <span class="asterisk">*</span></th>
							<td><input type="text" name="security_code"
								id="security_code" value="" maxlength="4" size="10" /></td>
						</tr>
						<tr>
							<td colspan="2"><center>
									<label id="error_security_code" class="errormessage"></label>
								</center></td>
						</tr>
					</table>
				</div>
				<div id="action_button">
					<input type="button" value="BACK TO CART" id="back_to_cart"
						class="back_to_cart" /> <input type="submit"
						value="CHECK OUT NOW" id="check_out_now" class="check_out_now" />
				</div>
			</div>
	</form>

</body>
</html>