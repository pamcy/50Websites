function playSound(e) {
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

	if(!audio) return;
	//	Stop the function
	
	key.classList.add('playing') ;
	audio.currentTime = 0;
	//	Rewind to the start, so it can play over and over again
	audio.play();	
}

// When the transition is ending, remove the transition
function removeTransition(e) {
	if (e.propertyName !== 'transform') return;
	//	Skip it if it's not a tranform
	
	this.classList.remove('playing');	
}

// Listen for event 'transitionend' for every single key
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);