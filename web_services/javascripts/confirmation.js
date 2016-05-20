$(document).ready( function() {
	history.go(1); 
    
    $('html').on('click', function() {
        history.go(1);
        });
    
    // Handling the logout button.
    $("#logout").click(function(){
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
});




