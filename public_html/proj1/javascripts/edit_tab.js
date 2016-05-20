/**
 * This function contains all the orchestration and interactions
 * in the edit tab.
 *
 */
 var  edit_tab = function(){

    // Setting focus when the tab is loaded.
    $("#ui-id-2").click(function(){
        $("#edit_sku").focus();
    });

    // Handling the edit button
    $("#edit_button").click(function(){

        var sku = $("#edit_sku").val();
        // Validating SKU
        isValidSku(sku, function(sku_result){
            if (!sku_result.valid){
                alert (sku_result.msg);
                $("#edit_sku").focus();
            }
            // If valid SKU then populate the form.
            else {
                // logic to select vendor the drop-down list.
                populate("edit","vendor",function(){
                    $("#edit_vendor_list").find('option').each(function(){
                        if(this.text == sku_result.data[0][2])
                            $("#edit_vendor_list").val(this.value)
                        });
                });

                // logic to select category the drop-down list.
                populate("edit","category",function(){
                   $("#edit_category_list").find('option').each(function(){
                       if(this.text == sku_result.data[0][1])
                           $("#edit_category_list").val(this.value)
                       });
                });

                //populate the data
                $("#edit_sku_hidden").val(sku_result.data[0][0]);
                $("#edit_sku_label").text(sku_result.data[0][0]);
                $("#edit_manufacture_id").val(sku_result.data[0][3]);
                $("#edit_description").text(sku_result.data[0][4]);
                $("#edit_features").text(sku_result.data[0][5]);
                $("#edit_cost").val(sku_result.data[0][6]);
                $("#edit_retail").val(sku_result.data[0][7]);
                $("#edit_img").attr("src","_uploads/"+(sku_result.data[0][8]).toLowerCase()+"?random="+Math.random());
                $("#edit_img").attr("name",(sku_result.data[0][8]).toLowerCase());
                $("#edit_form").attr("hidden", false);
            }
        });
    });

    // Handling the reset button
    $("#edit_reset").click(function(){
        $("#edit_form").attr("hidden", true);
        $("#edit_sku").val("").focus();
        $("#edit_confirmation_page").attr("hidden", true);
    });

    // Handling the delete another button
    $("#edit_submit").click(function(){
        var sku = $("#edit_sku").val();
        var result = validateForm("edit");
        var updateNeeded = true;
        if (result.valid){
            result.data['sku'] = sku;
            if(!result.data.product_img){
                result.data['product_img'] = $("#edit_img").attr("name");
            }
            else{
                upload_image("edit",function(){
                    update_record(result.data);
                });
            updateNeeded = false;
            }

            if(updateNeeded)
                update_record(result.data);
        }

    });

    /**
     * This function loads the confirmation page on successful edit.
     *
     */
    var load_confirm_page = function(data){
        $("#edit_confirmation_page").attr("hidden", false);
        $("#edit_confirm_data").load("confirmation_pg.html",function(response, status,xhr){
            if (status=='success'){
                fill_confirmation_pg("#edit_confirmation_page",data);
            }
            $("#edit_page").attr("hidden", true);

            // Handling the edit another button
             $("#go_to_edit").click(function(){
                 $("#edit_page").attr("hidden", false);
                 $("#edit_form").attr("hidden", true);
                 $("#edit_sku").val("").focus();
                 $("#edit_confirmation_page").attr("hidden", true);
            });
        });
    };

    /**
     * This function updates the record in the database.
     *
     */
    var update_record = function(data) {

        // call the update-cgi script.
        $.ajax({
            url:'/perl/jadrn022/proj1/update_record.cgi',
            type: 'post',
            data: data,
            success: onSuccess,
            error: onError
        });

        // Show the confirmation on update success
        function onSuccess(result){
            load_confirm_page(data);
        }

        // Logout on error from server.
        function onError(error){
            logout();
        }
    };

}




