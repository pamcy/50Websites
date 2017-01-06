var f1 = document.getElementById('fish-01'),
	f2 = document.getElementById('fish-02'),
	f3 = document.getElementById('fish-03'),
	f4 = document.getElementById('fish-04'),
	f5 = document.getElementById('fish-05'),
	f6 = document.getElementById('fish-06');

function swimming() {
	f1.style.left = ((window.pageYOffset / 10) - 400) + 'px';
	f2.style.left = ((window.pageYOffset / 5) + 250) + 'px';
	
	f3.style.left = ((window.pageYOffset / 6) + 150) + 'px';
	f3.style.bottom = ((window.pageYOffset / 35) + 50) + 'px';
	
	f4.style.right = ((window.pageYOffset / 6) - 200) + 'px';
	f4.style.bottom = (window.pageYOffset / 35) + 'px';
	
	f5.style.right = ((window.pageYOffset / 6) + 380) + 'px';
	f6.style.right = ((window.pageYOffset / 15) - 50) + 'px';
}

window.addEventListener('scroll', swimming);