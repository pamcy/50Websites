const inputs = document.querySelectorAll('.panel-ctrl input');

function updateCssVaribale() {

	const pxSuffix = this.dataset.sizing || '';
	// '' for basecolor, if no sizing just fallback
	// dataset is an object that contains all the data attributes on that element.
	// console.log(this.dataset);

	document.documentElement.style.setProperty(`--${this.name}`, this.value + pxSuffix);
	// document.documentElement
	// returns the Element that is the root element of the document.
	// In this case --> :root

	document.querySelector(`.result-${this.name}`).textContent = this.value;

	// document.querySelector('.result-padding').textContent = this.value;
	// document.querySelector('.result-blur').textContent = this.value;
	// document.querySelector('.result-bgcolor').textContent = this.value;

	console.log(this.name + ' ' + this.value);
}

// inputs.forEach( input => input.addEventListener('change', updateCssVaribale));

inputs.forEach(function(input) {
	// input.addEventListener('change', updateCssVaribale);
	console.log(input);
});

// inputs.forEach( input => input.addEventListener('mousemove', updateCssVaribale));
