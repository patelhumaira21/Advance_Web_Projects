/**
 * This function contains all the orchestration and interactions
 * in the new tab.
 *
 */
 var new_tab = function(){

     // Setting focus when the tab is loaded.
    $("#ui-id-1").click(function(){
        $("#new_sku").focus();
    });

    // Setting focus when the tab is loaded.
    $("#new_sku").focus();

     // populate vendor and category drop-down list.
    populate("new","vendor");
    populate("new","category");

    // Handling the submit button
    $("#new_submit").click(function(){
        var sku = $("#new_sku").val();

        // Validating SKU
        isValidNewSku(sku,function(sku_result){
            if (!sku_result.valid){
                   alert (sku_result.msg);
                   $("#new_sku").focus();
                }
            // If valid SKU then validate the form.
            else{
                var result = validateForm("new");
                //insert data, if form is valid
                if (result.valid){
                    result.data['sku'] = sku;
                    insert_data(result.data);
                }
            }
        });
    });

    // Handling the reset button
    $("#new_reset").click(function(){
        $("#new_sku").val("").focus();
    });


    /**
     * This function checks if the sku is valid or not.
     *
     */
    var isValidNewSku = function(sku,callback){

        // check for the SKU format
        if (checkSkuFormat(sku)){
            // check for duplicate SKU.
            duplicate_sku(sku,function(result){
                if(result.length>0){
                   callback({valid:false,msg:"SKU already exits in database",data:result});
                }
                else{
                    callback({valid:true,msg:"SKU not found in Database",data:result});
                }
            });
        }
        else {
            callback({valid:false,msg:"Enter a valid SKU"});
        }
    };

    /**
     * This function inserts the record in the database.
     *
     */
    var insert_record = function(data) {

        // call the insert-cgi script.
        $.ajax({
            url:'/perl/jadrn022/proj1/insert_record.cgi',
            type: 'post',
            data: data,
            success: onSuccess,
            error: onError
        });

        // Show the confirmation on insert success
        function onSuccess(result){
            load_new_confirm_page(data);
        }

        // Logout on error from server.
        function onError(error){
            logout();
        }
    };

    /**
     * This function uploads the image and then inserts the
     * record in the database. This is a synchronous call
     * because the image needs to be shown on the confirmation
     * page when the record is inserted successfully.
     *
     */
    var insert_data = function(data) {
         upload_image("new",function(){
            insert_record(data);
         });
    }

    /**
     * This function loads the confirmation page on successful insertion.
     *
     */
    var load_new_confirm_page = function(data){
        $("#new_confirmation_page").attr("hidden", false);
        $("#new_confirm_data").load("confirmation_pg.html",function(response, status,xhr){
            if (status=='success'){
                fill_confirmation_pg("#new_confirmation_page",data);
            }

            // Handling the add another button
            $("#new_page").attr("hidden", true);
            $("#go_to_new").click(function(){
                 $("#new_page").attr("hidden", false);
                 $("#new_sku").val("").focus();
                 $("#new_confirmation_page").attr("hidden", true);
                 $('#new_form')[0].reset();
            });
        });
    }

};













