$(document).ready(function() {

	$("#bill_addr_same").on("change", function() {
		var checked = $(this).is(':checked');
		if (checked) {
			var result = isValidAddress("ship");
			if (!result.valid) {
				$("#bill_addr_same").attr("checked", false);
			} else {
				var data = result.values;
				// copy the address
				$("#bill_name").val(data.name);
				$("#bill_address_1").val(data.address1);
				$("#bill_address_2").val(data.address2);
				$("#bill_city").val(data.city);
				$("#bill_state").val(data.state);
				$("#bill_zip").val(data.zip);
				$("#bill_phone").val(data.phone);
				$("#card_number").focus();
			}
		}
	});
	
	$('#check_out_now').on('click',function(e){
		var isValidForm = isValidAddress("ship").valid && isValidAddress("bill").valid && isValidPayment().valid;
		if(isValidForm){
			return;
		}
		e.preventDefault();
	});
	
	$("#back_to_cart").on("click", function(){
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

var isValidPayment = function(){
	var values = {};
	
	var result = {
		valid : true,
		values : values
	};

	
	var cardtype = $('input[name=card_type]:checked').val();
	if (!cardtype) {
		$("#error_card_type").text("Select card type");
		result.valid = false;
	} else {
		values["cardtype"] = cardtype;
		$("error_card_type").text("");
	}
	
	
	var cardNumber = $("#card_number").val();
	if (!checkCardNumberFormat(cardNumber)) {
		$("#error_card_number").text("Enter a valid card number");
		result.valid = false;
	} else {
		values["cardNumber"] = cardNumber;
		$("#error_card_number").text("");
	}
	
	var securityCode = $("#security_code").val();
	if (!checkCardCodeFormat(securityCode)) {
		$("#error_security_code").text("Enter a valid security code");
		result.valid = false;
	} else {
		values["securityCode"] = securityCode;
		$("#error_security_code").text("");
	}

	result.values = values;
	return result;
}

var isValidAddress = function(action) {

	var values = {};
	var result = {
		valid : true,
		values : values
	};

	// check if Name is valid
	var name = $("#" + action + "_name").val();
	if (isEmpty(name)) {
		$("#error_" + action + "_name").text("Enter Name");
		result.valid = false;
	} else {
		values["name"] = name;
		$("#error_" + action + "_name").text("");
	}

	// check if Address Line 1 is valid
	var address1 = $("#" + action + "_address_1").val();
	if (isEmpty(address1)) {
		$("#error_" + action + "_address_1").text("Enter Address Line 1");
		result.valid = false;
	} else {
		values["address1"] = address1;
		$("#error_" + action + "_address_1").text("");
	}
	
	var address2 = $("#" + action + "_address_2").val();
	values["address2"] = address2;

	// check if City is valid
	var city = $("#" + action + "_city").val();
	if (isEmpty(city)) {
		$("#error_" + action + "_city").text("Enter City");
		result.valid = false;
	} else {
		values["city"] = city;
		$("#error_" + action + "_city").text("");
	}

	// check if State is selected
	var state = $("#" + action + "_state").val();
	if (state == "") {
		$("#error_" + action + "_state").text("Select State");
		result.valid = false;
	} else {
		values["state"] = state;
		$("#error_" + action + "_state").text("");
	}

	// check if valid zipcode is entered
	var zip = $("#" + action + "_zip").val();
	if (isEmpty(zip) || !checkZipCodeFormat(zip)) {
		$("#error_" + action + "_zip").text("Enter valid ZipCode");
		result.valid = false;
	} else {
		values["zip"] = zip;
		$("#error_" + action + "_zip").text("");
	}

	// check if valid phone number is entered
	var phone = $("#" + action + "_phone").val();
	if (isEmpty(phone) || !checkPhoneFormat(phone)) {
		$("#error_" + action + "_phone").text("Enter valid Phone Number");
		result.valid = false;
	} else {
		values["phone"] = phone;
		$("#error_" + action + "_phone").text("");
	}

	result.values = values;
	return result;

}
