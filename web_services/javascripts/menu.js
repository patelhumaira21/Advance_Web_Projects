$(document).ready( function() {
$("#in_out_sku").focus();
history.go(1); 
    
    $('html').on('click', function() {
        history.go(1);
        });

    $("#in_out_sku_check").click(function(){
    	var sku = $("#in_out_sku").val();
	
	// Validating SKU
        if(!isEmpty(sku) && checkSkuFormat(sku)){
        	// If valid SKU get product details.	
        	$.ajax({
        		url:"/jadrn022/servlet/DispatchServlet?action=lookup&sku="+sku,
        		type:"GET",
        		success:function(response){
        			if(response != "ERROR"){
            			var data = response.split("|&|");
            			$("#sku_label").text(data[0]);
                        $("#product_sku").val(data[0]);
                        $("#category_label").text(data[1]);
                        $("#vendor_label").text(data[2]);
                        $("#manufacture_id_label").text(data[3]);
                        $("#description_label").text(data[4]);
                        $("#features_label").text(data[5]);
                        $("#cost_label").text(data[6]);
                        $("#retail_label").text(data[7]);
                        $("#product_image_label").attr("src","/~jadrn022/proj1/_uploads/"+(data[8]).toLowerCase()+"?random="+Math.random());
        				$('#merchandise_in_out_form').attr('hidden',false);
        			}
        			else{
        				alert("Sku not found in the database");
        				$("#in_out_sku").val("").focus();
        			}
        		}});
        	
        }
        else{
        	alert("Enter a valid SKU");
        	$("#in_out_sku").val("").focus();
        }  	
    });
    
    // Handling the logout button.
    $("#logout_button").click(function(){
    	$.ajax({
    		url:"/jadrn022/servlet/DispatchServlet?action=logout",
    		type:"GET",
    		success:function(response){
    			if(response=="SUCCESS"){
    				$('#container').html("<h1><center></center>You are now logged out</h1>");
    				window.location = "/jadrn022/logout_pg.html";
    			}
    			else{
    				window.location = "/jadrn022/login_err.jsp";
    			}
    	}});
    	
    });
    
    // Handling the submit button.
    $('#submit').on('click', function(e) {

        //capturing the data
        var quantity = $("#quantity").val().trim();

	// check Quantity format.
        if(!checkQuantityFormat(quantity)) {
            alert("Enter a valid quantity");
            $("#quantity").focus();
            e.preventDefault(); 
        }
        else
            return;
    });
    
    // HAndling the cancel button.
    $('#cancel').on('click', function(e) {
    	$('#merchandise_in_out_form').attr('hidden',true);
    	$("#in_out_sku").val("").focus();
    });
    
    
});
    
   
