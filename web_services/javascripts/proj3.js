$(document).ready( function() {
	
	// fetch category 
		populate("category");
	
	// fetch vendor
		populate("vendor");
		
	// fetch products
		getProducts();
		
	// check if items exits in cart
		getCartSize();
	
	$("#apply_filter").on("click", function(){
		getProducts();
	});
	
	$("#clear_filter").on("click", function(){
		$("#filters_form")[0].reset();
		getProducts();
	});
	
	$("#add_to_cart").on("click", function(){
		var selectedProd = $("#prod_sku_detail").val();
		var quantityProd = $("#quantity").val();
			if(!checkQuantityFormat(quantityProd)) {
				alert("Enter a valid Quantity");
				$("#quantity").val("").focus();
			}
			else {
					$.ajax({
						url : "http://jadran.sdsu.edu/jadrn022/servlet/ClientDispatchServlet?" +
								"action=cart&command=add&selectedSku="+selectedProd+"&quantity="+quantityProd,
						type : "POST",
						success : function(response) {
								response = response.split("_")
							if(response[0] == "SUCCESS"){
								alert("Product has been added to your cart");
								 $("#count").text(response[1]);
							}
							else{
								alert("An error occured processing your request. Please try again.");
							}
						}
					});
			}		
	});
	
	
	$("#myCart").on("click", function(){
		$.ajax({
			url : "http://jadran.sdsu.edu/jadrn022/servlet/ClientDispatchServlet?" +
					"action=cart&command=fetch",
			type : "POST",
			success : function(response) {
				 $('body').html(response);
			}
		});	
	});
	
 });


var getProducts = function() {
	var data = getFilters();

	if(data.status == 'success'){
		var url = "http://jadran.sdsu.edu/jadrn022/servlet/ClientDispatchServlet?action=html";
		var filters = data.filters;
		if(filters){
			if(filters.category.length > 0){
				url += "&categories="+filters.category.join("|");
			}
			
			if(filters.vendor.length > 0){
				url += "&vendors="+filters.vendor.join("|");
			}
			
			if(filters.minPrice){
				url += "&minPrice="+filters.minPrice;
			}
			
			if(filters.maxPrice){
				url += "&maxPrice="+filters.maxPrice;
			}
		}
		$.ajax({
			url: url,
			type:"POST",
			data: JSON.stringify(data.filters),
			contentType: "application/json",
			success:function(response){
				$("#content").html(response);
			}
		}).done(function(){
			$(".detail_view").on("click", function(){
				
				var id = this.id;
				var prod = id.split("_");
				var prod_sku = prod[1];
				var prod_details = $("#detail_"+prod_sku).data("product").split("|&|");
				
				$("#prod_sku_detail").val(prod_details[0]);
				$("#title").text(prod_details[1]+" from "+prod_details[2]);
				$("#manufacture_id_label").text(prod_details[3]);
				$("#description_label").html('&#8226;&#32;'+prod_details[4].replace(/\.\s/g,'\.<br/>&#8226;&#32;'));
				$("#features_label").html('&#8226;&#32;'+prod_details[5].replace(/\.\s/g,'\.<br/>&#8226;&#32;'));
				$("#retail_label").text(prod_details[7]);
				$("#productImage").attr("src","/~jadrn022/proj1/_uploads/"+(prod_details[8]).toLowerCase()+"?random="+Math.random());
				var stock_status = $("#status_"+prod_details[0]).text();
				$("#stock_status_label").text(stock_status);
				if(stock_status=="In Stock") {
					$("#stock_status_label").addClass("in_stock");
					$("#stock_status_label").removeClass("coming_soon");
					$("#stock_status_label").removeClass("more_to_come");
				}
				else if(stock_status=="Coming soon") {
					$("#stock_status_label").addClass("coming_soon");
					$("#stock_status_label").removeClass("in_stock");
					$("#stock_status_label").removeClass("more_to_come");
				}
				else {
					$("#stock_status_label").addClass("more_to_come");
					$("#stock_status_label").removeClass("in_stock");
					$("#stock_status_label").removeClass("coming_soon");
				}
				
				if (stock_status=="In Stock") {
					$("#add_to_cart").attr("hidden",false);
					$("#quantity").attr("hidden",false);
					$("#quantity").val("1");
					$("#quantity_label").show();
				}
				else {
					$("#add_to_cart").attr("hidden",true);
					$("#quantity").attr("hidden",true);
					$("#quantity_label").hide();
				}
				$("#myModal").css({"display" : "block"});
			});
			
			$(".close").on("click", function() {
				$("#myModal").css({"display" : "none"});
			});
		});
	}
	
};


var getCartSize = function() {
	$.ajax({
		url : "http://jadran.sdsu.edu/jadrn022/servlet/ClientDispatchServlet?" +
				"action=cart&command=size",
		type : "POST",
		success : function(response) {
			$("#count").text(response);
		}
	});	
};
    
