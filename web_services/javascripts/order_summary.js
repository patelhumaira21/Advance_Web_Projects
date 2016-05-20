$(document).ready(function(){

	$(".continue_shopping").on("click", function(){
		window.location.href="http://jadran.sdsu.edu/jadrn022/proj3.html";
	});

	$("#cancel").on("click", function(){
		window.location.href="http://jadran.sdsu.edu/jadrn022/proj3.html";
	});
	
	$("#place_order").on("click", function(e){

    $.ajax({
      url : "http://jadran.sdsu.edu/jadrn022/servlet/ClientDispatchServlet?" +
      "action=place_order",
      type : "POST",
      success : function(response) {
        if(response == "SUCCESS"){
          $("#heading").hide();
          $("#order_summary_caption").hide();
          $("#card_details").hide();
          $("#place_order_div").hide();
          $("#confirm_heading").show();
          $("#confirmation").show();
          $("#done").show();
        }
        else{
          alert("There was a problem processing your request. Please try again");
        }
      }
    });
    e.preventDefault();


		
	});
	
	$("#done").on("click", function(){
		window.location.href="http://jadran.sdsu.edu/jadrn022/proj3.html";
	});

  // Source - Stack overflow
  $("#print").on("click", function(){
    var data = $("#order_summary").html();
    var mywindow = window.open('', 'Print Receipt', 'height=400,width=600');
    mywindow.document.write('<html><head><title>Print Receipt</title>');
    mywindow.document.write('<link rel="stylesheet" href="/jadrn022/css/order_summary.css">');
    mywindow.document.write('<link rel="stylesheet" href="/jadrn022/css/common.css">');
    mywindow.document.write('</head><body >');
    mywindow.document.write(data);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10

    mywindow.print();
    mywindow.close();
  });

});