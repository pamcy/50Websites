const secondHand = document.querySelector('.second-hand'),
	  minuteHand = document.querySelector('.minute-hand'),
	  hourHand = document.querySelector('.hour-hand');
	  
function setDate() {
	const now = new Date(),
		  seconds = now.getSeconds(),
		  secondsDegree = ((seconds / 60) * 360) + 90,
		  minutes = now.getMinutes(),
		  minutesDegree = (minutes / 60 * 360) + 90,
		  hours = now.getHours(),
		  hoursDegree = (hours / 12 * 360) + (minutes / 60 * 30) + 90;
	
	//	Fix the problem when hands are in 12 o'clock position, it goes all the way backwards rather than going forward. 
	if (secondsDegree === 90) secondHand.style.transition = 'all 0s';
	else secondHand.style.transition = 'all .5s';
	
	if (minutesDegree === 90) minutesHand.style.transition = 'all 0s';
	else minuteHand.style.transition = 'all .5s';
	
	//	To display the percentage rotation
	secondHand.style.transform = `rotate(${secondsDegree}deg)`;
	minuteHand.style.transform = `rotate(${minutesDegree}deg)`;
	hourHand.style.transform = `rotate(${hoursDegree}deg)`;
	
	console.log(`${hours}:${minutes}:${seconds} - ${hoursDegree}:${minutesDegree}:${secondsDegree}`);
}

setInterval(setDate, 1000);