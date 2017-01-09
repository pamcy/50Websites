var f1 = document.getElementById('fish-01'),
	f2 = document.getElementById('fish-02'),
	f3 = document.getElementById('fish-03'),
	f4 = document.getElementById('fish-04'),
	f5 = document.getElementById('fish-05'),
	f6 = document.getElementById('fish-06');

function swimming() {
	
	var windowYOffset = window.pageYOffset;
	
	f1.style.left = ((windowYOffset / 10) - 400) + 'px';
	f2.style.left = ((windowYOffset / 5) + 250) + 'px';
	
	f3.style.left = ((windowYOffset / 6) + 150) + 'px';
	f3.style.bottom = ((windowYOffset / 35) + 50) + 'px';
	
	f4.style.right = ((windowYOffset / 6) - 200) + 'px';
	f4.style.bottom = (windowYOffset / 35) + 'px';
	
	f5.style.right = ((windowYOffset / 6) + 380) + 'px';
	f6.style.right = ((windowYOffset / 15) - 50) + 'px';
}

window.addEventListener('scroll', swimming);