// Celsius convert to Fahrenheit
function convertToF(celsius) {
	var fahrenheit = Math.round( (celsius * 9/5) + 32 );
	return fahrenheit;
}

// Fahrenheit convert to Celsius
function convertToC(fahrenheit) {
	var celsius = Math.round( (fahrenheit - 32) * 5/9 );
	return celsius;
}

$(document).ready(function() {	
	$('input[id="cNumber"]').on('keyup', function() {
		var cValue = $('#cNumber').val();
		var toFValue = convertToF(cValue);
		$('#fNumber').val(toFValue);
	})
	
	$('input[id="fNumber"]').on('keyup', function() {
		var fValue = $('#fNumber').val();
		var toCValue = convertToC(fValue);
		$('#cNumber').val(toCValue);
	})
});
