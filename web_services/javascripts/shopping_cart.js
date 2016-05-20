$(document).ready(function(){
	
	$(".remove").on("click",function(e){
		var sku = this.id.split("_")[1];
		
			$.ajax({
				url : "http://jadran.sdsu.edu/jadrn022/servlet/ClientDispatchServlet?" +
						"action=cart&command=delete&selectedSku="+sku,
				type : "POST",
				success : function(response) {
					//alert(response);
					 $('body').html(response);
					 $("#count").text(countItems-1);
				}
			});
			e.preventDefault();		
	});	
	
	$(".update").on("click",function(e){
		e.preventDefault();		
		var id = this.id;
		var sku = id.split("_")[1];
		var prevQuantity = parseInt($("#"+id).data("previous"));
		var newQuantity = parseInt($("#quantity_"+sku).val());
		
		// check for a valid new quantity
		if(newQuantity>0){
			
			// update only if there is a difference
			var diff = newQuantity - prevQuantity;
			if(diff != 0){
				
				//check if the quantity does not exceed max-quantity
				var maxQuantity = $("#stock_status_"+sku).data("max");
				if(newQuantity > maxQuantity){
					alert("You can only order upto "+maxQuantity+" of this item");
					$("#quantity_"+sku).focus();
				}
				else{
					$.ajax({
						url : "http://jadran.sdsu.edu/jadrn022/servlet/ClientDispatchServlet?" +
						"action=cart&command=update&selectedSku="+sku+"&quantity="+diff,
						type : "POST",
						success : function(response) {	
								alert("Quantity has been updated.")
								$("#"+id).data("previous",newQuantity);
								$('body').html(response);
						}	
					});
				}
			}
		}
		else {
			alert("Quantity cannot be less than 1");
			$("#quantity_"+sku).focus();
		}
	});	
	
	$(".continue_shopping").on("click", function(){
		window.location.href="http://jadran.sdsu.edu/jadrn022/proj3.html";
	});
	
	$("#checkout").on("click", function(e){
		$.ajax({
			url : "http://jadran.sdsu.edu/jadrn022/servlet/ClientDispatchServlet?" +
					"action=checkout",
			type : "POST",
			success : function(response) {
				 $('body').html(response);
			}
		});
		e.preventDefault();		
	});
	
});