$(document).ready( function() {

    $("#username").focus();
    $('#login_submit').on('click', function() {

        //capturing the data
        var user_element = $("#username");
        var pwd_element = $("#password");
        var user = user_element.val().trim();
        var pwd = pwd_element.val().trim();

        // validating the username
        if(user == "") {
            $('#status').text('Please enter your username.');
            user_element.focus();
        }
        // validating the password
        else if(pwd == "") {
            $('#status').text('Please enter your password.');
            pwd_element.focus();
        }
        // call the login cgi.
        else {
            params = "user="+user+"&password="+pwd;
            $.post('/perl/jadrn022/proj1/login.cgi', params, auth_handler);
        }
    });

    /**
     * This function handles response from the login script.
     *
     **/
    var auth_handler = function(response) {
        if (response === 'OK') {
            $.get("/perl/jadrn022/proj1/main_application.cgi", app_handler);
        }
        else {
            $('#status').text("ERROR, incorrect username or password");
            $('#username').val("").focus();
            $('#password').val("");
        }
    };

    /**
     * This function loads the application on authentication
     * success.
     *
     **/
    var app_handler = function(response) {
        $('#main').html(response);
        $("#tabs").tabs();
        loadApplication();
    };

});





