/**
 * This function checks if the SKU is of correct format:(eg. ABC-123)
 */
var checkSkuFormat = function(sku) {
	var regex = new RegExp("^[A-Z]{3}-[0-9]{3}$");
	return regex.test(sku);
};

/**
 * This function checks if the field is empty or null.
 */
var isEmpty = function(value) {
	return (value == "" || value == null);
};

/**
 * This function checks if quantity is a positive integer
 */
var checkQuantityFormat = function(quantity) {
	var regex = new RegExp("^[1-9][0-9]*$");
	return regex.test(quantity);
};

/**
 * This function checks if max/min price is of correct format.
 */
var checkCurrencyFormat = function(currency) {
	var regex_currency = new RegExp("^[0-9]*(\.[0-9]{2})?$");
	return regex_currency.test(currency);
};

/**
 * This function checks if zipcode is of correct format.
 */
var checkZipCodeFormat = function(zipcode) {
	var regex_zip = new RegExp("^[0-9]{5}(-[0-9]{4})?$");
	return regex_zip.test(zipcode);
}

/**
 * This function checks if phone number is of correct format.
 * Regular expression source: stackoverflow
 */
var checkPhoneFormat = function(phone) {
	var regex = /^\(?[0-9]{3}(\-|\)) ?[0-9]{3}-[0-9]{4}$/;
	var regex_phone = new RegExp(regex);
	return regex_phone.test(phone);
}

/**
 * This function checks if credit card number is of correct format.
 */
var checkCardNumberFormat = function(card_number) {
	var regex = /^[0-9]{16}$/;
	var regex_card = new RegExp(regex);
	return regex_card.test(card_number);
}

/**
 * This function checks if credit card security code is of correct format.
 */
var checkCardCodeFormat = function(card_code) {
	var regex = /^[0-9]{3,4}$/;
	var regex_card = new RegExp(regex);
	return regex_card.test(card_code);
}


/**
 * This function populates category/vendor in the given form.
 */
var populate = function(id) {

	// call servlet to fetch the records.
	$.ajax({
				url : "http://jadran.sdsu.edu/jadrn022/servlet/FetchCategoryVendorServlet?action="
						+ id,
				type : "GET",
				success : function(response) {
					var catVen = response.split("|&|");
					for (var i = 0; i < catVen.length; i++) {
						$('#' + id + '_filter').append(
								'<input type="checkbox" name="' + id
										+ '_checkbox" class="' + id
										+ '_checkbox "value="' + catVen[i]
										+ '">' + catVen[i] + '<br/>');
					}
				}
			});
};

/**
 * This checks the filters that were applied by the user to refine the search.
 */
var getFilters = function() {
	var filter = {};
	var catFilter = [];
	var status = 'success';

	$('.category_checkbox:checked').each(function() {
		catFilter.push($(this).val());
	});

	var venFilter = [];
	$('.vendor_checkbox:checked').each(function() {
		venFilter.push($(this).val());
	});

	var maxPrice = $("#max_price").val();
	if (!isEmpty(minPrice) && !checkCurrencyFormat(maxPrice)) {
		alert("Enter a valid price.");
		$("#max_price").val("").focus();
		status = 'error';
	}

	var minPrice = $("#min_price").val();
	if (!isEmpty(minPrice) && !checkCurrencyFormat(minPrice)) {
		alert("Enter a valid price.");
		$("#min_price").val("").focus();
		status = 'error';
	}

	return {
		status : status,
		filters : {
			category : catFilter,
			vendor : venFilter,
			minPrice : minPrice,
			maxPrice : maxPrice
		}
	};
}
