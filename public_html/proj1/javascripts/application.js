/**
 * This is the main javascript file and the entry
 * point for the web app if login is successful
 *
 */

var loadApplication = function (){

    // Load the new, edit and delete tabs(Javascripts).
    loadTabs(function(){
        new_tab();
        edit_tab();
        delete_tab();
    });

    // Handler for Logout button.
    $("#logout_button").click(function(){
        $.ajax({
            url:'/perl/jadrn022/proj1/logout.cgi',
            type: 'get',
            success: onSuccess,
            error: onError
        });

        function onSuccess(result){
            if(result=="OK"){
              window.location = "logout_pg.html";
            }
        }

        function onError(error){
            window.location = "logout_pg.html"
        }
    });

  }

/**
 * Loads the New, Edit and Delete Form
 *
 */
var loadTabs = function(callback){
    $("#tabs").tabs();
    $("#tabs-1").load("New_Form.html");
    $("#tabs-2").load("Edit_Form.html");
    $("#tabs-3").load("Delete_Form.html");
    setTimeout(callback,1000);
}


