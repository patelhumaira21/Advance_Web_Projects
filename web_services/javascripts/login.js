$(document).ready( function() {

    $("#username").focus();
    $('#login_submit').on('click', function(e) {

        //capturing the data
        var user_element = $("#username");
        var pwd_element = $("#password");
        var user = user_element.val().trim();
        var pwd = pwd_element.val().trim();

        // validating the username
        if(user == "") {
            $('#status').text('Please enter your username.');
            user_element.focus();
            e.preventDefault(); 
        }
        // validating the password
        else if(pwd == "") {
            $('#status').text('Please enter your password.');
            pwd_element.focus();
            e.preventDefault(); 
        }
        else
            return;
    });
});





