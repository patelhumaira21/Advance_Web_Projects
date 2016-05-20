<script type="text/javascript">
	$(document).ready( function() {
	
	    $("#datepicker").datepicker({
	    });
	    var myDate = new Date();
	    var currentDate = (myDate.getMonth()+1) + '/' + myDate.getDate() + '/' + myDate.getFullYear();
	    $("#datepicker").val(currentDate);
	});
</script>
	    
<form id="product_details" method="post" action="/jadrn022/servlet/DispatchServlet"> 
    <table class="product_table">
    	<tr>
    	    <th colspan="4"> SKU Details are given below: </th>
    	</tr>
        <tr class="product">
            <th><label>SKU: </label></th>
            <td><label id="sku_label"></label>
            <input type="hidden" id="product_sku" name="product_sku" value="" ></td>
            <th><label>Category:</label></th>
            <td><label id="category_label"></label></td>
        </tr>
        <tr class="product">
            <th><label>Vendor:</label></th>
            <td><label id="vendor_label"></label></td>
            <th><label>Manufacturer's Identifier:</label></th>
            <td><label id="manufacture_id_label"></label></td>
        </tr>
        <tr class="product">
            <th><label>Description:</label></th>
            <td><label id="description_label"></label></td>
            <th><label>Features:</label></th>
            <td><label id="features_label"></label></td>
        </tr>
        <tr class="product">
            <th><label>Cost:&nbsp;&nbsp;$</label></th>
            <td><label id="cost_label"></label></td>
            <th><label>Retail:&nbsp;&nbsp;$</label></th>
            <td><label id="retail_label"></label></td>
        </tr>
        <tr class="blank_row">
    		<td colspan="4"></td>
		</tr>
        <tr>
            <th colspan="2" align="center"><input type="radio" value="merchandise_in" name="action" checked="checked"/>Incoming Merchandise</th>
            <th colspan="2" ><input type="radio" value="merchandise_out" name="action"/>Outgoing Merchandise</th>
        </tr>
        <tr class="blank_row">
    		<td colspan="4"></td>
	</tr>
         <tr>
            <th><label>Quantity:</label></th>
            <td><input type="number" id="quantity" name="quantity"/></td>
            <th><label>Date:</label></th>
            <td><input type="text" id="datepicker" name="datepicker"/></td>
        </tr>
        <tr>
            <th><label>Product Image:</label></th>
            <td colspan="3"><img src="" id="product_image_label" 
            				alt="" width=170 height=170 class="image"/></td>
        </tr>
        <tr>
            <td colspan="2" align="right"><input type=submit id="submit" value="Submit" class="button"/></td>
            <td colspan="2" align="left"><input type=button id="cancel" value="Cancel" class="button"/></td>
	</tr>
    </table>
    </br>
</form>
