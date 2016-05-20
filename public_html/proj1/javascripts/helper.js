/**
 * This function checks if the field is empty or null.
 */
var isEmpty = function(value){
    return (value=="" || value==null);
};

/**
 * This function checks if the field is valid.
 */
var isValidField = function(value,field){

    if(field=="cost" || field=="retail") {
        // check if cost or retail value is empty.
        if(isEmpty(value)){
            return {valid:false , msg:"Enter "+field};
        }
        else{
            // check the format of the value in cost or retail.
            return (!checkCurrencyFormat(value))
                ? {valid:false , msg:"Enter a value only up to 2 decimal places for "+field}
                :{valid:true , msg:"success"};
        }
     }
    else{
        return (isEmpty(value))
             ? {valid:false , msg:"Enter "+field}
             :{valid:true , msg:"success"};
    }
};

/**
 * This function checks if the SKU is of correct format:(eg. ABC-123)
 */
var checkSkuFormat =function(sku){
    var regex = new RegExp("^[A-Z]{3}-[0-9]{3}$");
    return regex.test(sku);
};

/**
 * This function checks if cost or retail is of correct format.
 */
var checkCurrencyFormat =function(currency){
    var regex_currency = new RegExp("^[0-9]*(\.[0-9]{2})?$");
    return regex_currency.test(currency);
};

/**
 * This function checks if the SKU is of correct format:(eg. ABC-123)
 * and also checks if it exists in the database.
 */
var isValidSku = function(sku,callback){

    // check for SKU format
    if (checkSkuFormat(sku)){
        // check for duplicate SKU
        duplicate_sku(sku,function(result){
            if(result.length==0){
               callback({valid:false,msg:"SKU not found in Database",data:result});
            }
            else{
               callback({valid:true,msg:"SKU found in Database",data:result});
            }
        });
    }
    else {
        callback({valid:false,msg:"Enter a valid SKU"});
    }
};

/**
 * This function validates all the fields in the form except for SKU.
 * If the field is not valid it alerts the user to enter a correct value.
 * If all the fields are valid it returns a JSON with all the fields.
 */
var validateForm = function(form){
    var data = {};
    var result = {valid:false, data:data};

    // check if category is valid
    var category_element = $("#"+form+"_category_list");
    var category = category_element.val();
    var category_result = isValidField(category, "Category");
    if (!category_result.valid){
        alert (category_result.msg);
        category_element.focus();
        return result;
    }
    else {
        data["category_text"] = category_element.find('option:selected').text();
        data["category"]= category;
    }

    // check if vendor is valid
    var vendor_element = $("#"+form+"_vendor_list");
    var vendor = vendor_element.val();
    var vendor_result = isValidField(vendor, "vendor");
    if (!vendor_result.valid){
        alert (vendor_result.msg);
        vendor_element.focus();
        return result;
    }
    else {
        data["vendor_text"] = vendor_element.find('option:selected').text();
        data["vendor"]= vendor;
    }

    // check if manufacture_id is valid
    var manufacture_element = $("#"+form+"_manufacture_id");
    var manufacture_id = manufacture_element.val();
    var manufacture_id_result = isValidField(manufacture_id, "manufacture_id");
    if (!manufacture_id_result.valid){
        alert (manufacture_id_result.msg);
        manufacture_element.focus();
        return result;
    }
    else {
        data["manufacture_id"]= manufacture_id;
    }

    // check if description is valid
    var description_element = $("#"+form+"_description");
    var description = description_element.val();
    var description_result = isValidField(description, "description");
    if (!description_result.valid){
        alert (description_result.msg);
        description_element.focus();
        return result;
    }
    else {
        data["description"]= description;
    }

    // check if feature is valid
    var feature_element = $("#"+form+"_features");
    var features = feature_element.val();
    var features_result = isValidField(features, "features");
    if (!features_result.valid){
        alert (features_result.msg);
        feature_element.focus();
        return result;
    }
    else {
        data["features"]= features;
    }

    // check if cost is valid
    var cost_element = $("#"+form+"_cost");
    var cost = cost_element.val();
    var cost_result = isValidField(cost, "cost");
    if (!cost_result.valid){
        alert (cost_result.msg);
        cost_element.focus();
        return result;
    }
    else {
        data["cost"]= cost;
    }

    // check if retail is valid
    var retail_element = $("#"+form+"_retail");
    var retail = retail_element.val();
    var retail_result = isValidField(retail, "retail");
    if (!retail_result.valid){
        alert (retail_result.msg);
        retail_element.focus();
        return result;
    }
    else {
        data["retail"]= retail;
    }

    // check if product_image is selected
    var product_img_element = $("#"+form+"_product_img");
    var product_img = product_img_element.val();
    var product_img_result = isValidField(product_img, "product_img");
    if (!product_img_result.valid && form !== "edit"){
        alert (product_img_result.msg);
        product_img_element.focus();
        return result;
    }
    else {
        data["product_img"]= product_img;
    }

    result.valid = true;
    result.data = data;
    return result;
};

/**
 * This function checks for duplicate SKU.
 */
var duplicate_sku = function(sku,callback){

    // call cgi script to fetch the record.
    $.ajax({
        url:'/perl/jadrn022/proj1/fetch_product.cgi',
        type: 'post',
        data:{sku:sku},
        success: onSuccess,
        error: onError
    });

    // Send the data back on success.
    function onSuccess(response){
        var records = JSON.parse(response);
        callback (records);
    }

    // Logout on error from server.
    function onError(error){
        logout();
    }
};

/**
 * This function populates category/vendor in the given form.
 */
var populate = function(form,id,done){

    // call cgi script to fetch the records.
    $.ajax({
        url: '/perl/jadrn022/proj1/fetch_'+id+'.cgi',
        type: 'get',
        success: onSuccess,
        error: onError
    });

    // add the categories/vendors in the given form.
    function onSuccess(data){
        var jsonData = JSON.parse(data);
        for (var i = 0; i < jsonData.length; i++) {
            $("#"+form+"_"+id+"_list").append('<option value="'+jsonData[i][0]+'">'+jsonData[i][1]+'</option>');
        }
        // call the callback if present
        if(done)
            done();
    }

    function onError(error){
        console.log(error);
    }
};

/**
 * This function uploads the image.
 */
var upload_image = function(form,callback){

    // prepare the form and image.
    var form_data = new FormData($('#'+form+'_form')[0]);
    form_data.append("image", document.getElementById(form+"_product_img").files[0]);

    // call cgi script to upload the image.
    $.ajax({
        url:'/perl/jadrn022/proj1/upload_image.cgi',
        type: 'post',
        data: form_data,
        processData: false,
        contentType: false,
        success: onSuccess,
        error: onError
    });

    function onSuccess(data){
        console.log("Image uploaded successfully");
        callback();
    }

    function onError(error){
        console.log(error);
        callback();
    }

};

/**
 * This function populates the confirmation page in a given form(new/edit).
 */
var fill_confirmation_pg = function(form_name,confirmation_data){
    $(form_name+" #sku_label").text(confirmation_data.sku);
    $(form_name+" #category_label").text(confirmation_data.category_text);
    $(form_name+" #vendor_label").text(confirmation_data.vendor_text);
    $(form_name+" #manufacture_id_label").text(confirmation_data.manufacture_id);
    $(form_name+" #description_label").text(confirmation_data.description);
    $(form_name+" #features_label").text(confirmation_data.features);
    $(form_name+" #cost_label").text(confirmation_data.cost);
    $(form_name+" #retail_label").text(confirmation_data.retail);
    $(form_name+" #product_image_label").attr("src","_uploads/"+(confirmation_data.sku).toLowerCase()+"?random="+Math.random());
}

/**
 * This function logs the user out of the application.
 */
var logout= function(){
    alert("Error : Status-Code: 401 Not Authorized.\n Login again to proceed" );
    window.location = "logout_pg.html";
};





