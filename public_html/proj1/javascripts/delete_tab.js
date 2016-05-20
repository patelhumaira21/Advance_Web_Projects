/**
 * This function contains all the orchestration and interactions
 * in the delete tab.
 *
 */
var delete_tab = function() {

    // Setting focus when the tab is loaded.
    $("#ui-id-3").click(function(){
        $("#delete_sku").focus();
     });

    // Handling the delete button
    $("#delete_button").click(function(){

        var sku = $("#delete_sku").val();
        // Validating SKU
        isValidSku(sku,function(sku_result){
            if (!sku_result.valid)  {
                alert (sku_result.msg);
                $("#delete_sku").focus();
            }
            // If valid SKU then display the record.
            else {
                // loading the data
                $('#delete_confirm #delete_status').text("The following record will be deleted: ");
                $("#delete_confirm  #sku_label").text(sku);
                $("#delete_confirm  #category").text(sku_result.data[0][1]);
                $("#delete_confirm  #vendor").text(sku_result.data[0][2]);
                $("#delete_confirm  #manufacture_id").text(sku_result.data[0][3]);
                $("#delete_confirm  #description").text(sku_result.data[0][4]);
                $("#delete_confirm  #features").text(sku_result.data[0][5]);
                $("#delete_confirm  #cost").text(sku_result.data[0][6]);
                $("#delete_confirm  #retail").text(sku_result.data[0][7]);
                // prevent caching of images using random query params.
                $("#delete_confirm  #product_image").attr("src","_uploads/"+(sku_result.data[0][8]).toLowerCase()+"?random="+Math.random());

                // show-hide logic.
                $("#delete_form").attr("hidden", true);
                $("#delete_confirm").attr("hidden", false);
                $("#submit_reset_delete").attr("hidden", false);
                $("#delete_another").attr("hidden", true);

                // setting up dynamic css.
                $("#delete_record").css({backgroundColor: '#ccffff'});
                $("#delete_record th").css({backgroundColor:'#ccffff'});
                $("#delete_record th").css({textAlign:'left'});
            }
        });
    });

    // Handling the reset button
    $("#delete_reset").click(function(){
        $("#delete_confirm").attr("hidden", true);
        $("#delete_form").attr("hidden", false);
        $("#delete_sku").val("").focus();
    });

    // Handling the delete another button
    $("#delete_another").click(function(){
        $("#delete_confirm").attr("hidden", true);
        $("#delete_form").attr("hidden", false);
        $("#delete_another").attr("hidden", true);
        $("#delete_sku").val("").focus();
    });

    // Handling the delete submit button, this deletes the record.
    $("#delete_submit").click(function(){
        var sku = $("#delete_sku").val();
        delete_record(sku);
    });

    /**
     * This function deletes the record from the database.
     *
     */
    var delete_record = function(sku) {

        // call the delete-cgi script.
        $.ajax({
            url:'/perl/jadrn022/proj1/delete_record.cgi?sku='+sku,
            type: 'delete',
            success: onSuccess,
            error: onError
        });

        // Show the confirmation on delete success
        function onSuccess(data){
            if (data == 'SUCCESS'){
                // show-hide logic
                $("#delete_form").attr("hidden", true);
                $("#submit_reset_delete").attr("hidden", true);
                $("#delete_another").attr("hidden", false);
                $("#delete_status").text("The following record has been deleted successfully: ");

                // dynamic css
                $("#delete_record").css({backgroundColor: '#ffffe6'});
                $("#delete_record th").css({backgroundColor:'#d4a377'});
                $("#delete_record th").css({textAlign:'center'});
            }
        }

        // Logout on error from server.
        function onError(error){
            logout();
        }
    };

}





