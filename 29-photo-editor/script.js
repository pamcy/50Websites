const inputs = document.querySelectorAll('#ctrlarea-ctrl-form input');

function updateCssVariable() {

	const suffix = this.dataset.sizing || '';
	// dataset is an object that contains all the data attributes on that element.
	// console.log(this.dataset);
	// '' for basecolor, if no sizing just fallback

	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
	// document.documentElement
	// returns the Element that is the root element of the document.
	// In this case --> :root

	document.querySelector(`.result-${this.name}`).textContent = this.value;

	console.log(this.name + ' ' + this.value);
}

inputs.forEach( input => input.addEventListener('change', updateCssVariable));
inputs.forEach( input => input.addEventListener('mousemove', updateCssVariable));
