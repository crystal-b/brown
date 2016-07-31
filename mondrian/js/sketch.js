$(document).ready(function() {

/*** Audio Setup ***/
	//construct audio
	var mySound = new buzz.sound('audio/David-Tudor/JohnCage-MusicOfChanges/01-I', {
	    formats: [ 'mp3' ],
	    preload: true,
	    autoplay: false,
	    loop: false
	});
	var music = document.getElementById('audio'); // id for audio element
	var control = document.getElementById('control'); // id for the play button
	var totalTime = mySound.getTime(); // I'm only using this to test the MouseUp function
    var timeline = document.getElementById('timeline');
    var playhead = document.getElementById('slider'); // id for the slider
	var timelineWidth = timeline.offsetWidth - playhead.offsetWidth; // adjust width to account for slider
    var visualTime;

	//update elapsed and remaining times
	mySound.bind("timeupdate", function() {
		var elapsedTime = buzz.toTimer(mySound.getTime());
	    var calculateRemainingTime = mySound.getDuration() - mySound.getTime();
	    var remainingTime = buzz.toTimer(calculateRemainingTime);
	    document.getElementById("start").innerText = elapsedTime;
	    document.getElementById("end").innerText = remainingTime;
	    timeUpdate();
	 });

	//make timeline clickable
	//THIS PARTIALLY WORKS. I DON'T WANT TO USE THE VISUALTIME VARIABLE.
	timeline.addEventListener("click", function(event) {
		moveplayhead(event);
		visualTime = mySound.getTime() * clickPercent(event);
	}, false);

	//move playhead on user drag
	function moveplayhead(p) {
		var newMargLeft = p.pageX - timeline.offsetLeft;
		if(newMargLeft >= 0 && newMargLeft <= timelineWidth) {
			playhead.style.marginLeft = newMargLeft + "px";
		}
		if (newMargLeft < 0) {
			playhead.style.marginLeft = "0px";
		}
		if(newMargLeft > timelineWidth) {
			playhead.style.marginLeft = timelineWidth + "px";
		}
	}

	//returns click as .77 of timelineWidth
	function clickPercent(p) {
		return (p.pageX - timeline.offsetLeft) / timelineWidth;
	}

	//make playhead draggable
	playhead.addEventListener('mousedown', mouseDown, false);
	window.addEventListener('mouseup', mouseUp, false);

	//mouse moves only after playhead is released
	var onplayhead = false;
	function mouseDown() {
		onplayhead = true;
		window.addEventListener('mousemove', moveplayhead, true);
	}

	//THIS PARTIALLY WORKS. totalTime NEEDS TO AFFECT AUDIO TRACK POSITION.
	//get input from all mouse clicks
	function mouseUp(p) {
		if(onplayhead === true) {
			moveplayhead(p);
			window.removeEventListener('mousemove', moveplayhead, true);
			//change current time
			totalTime = mySound.getDuration() * clickPercent(p);
		}
		onplayhead = false;
	}

	//sync slider with current audio position
	function timeUpdate() {
		var playPercent = timelineWidth * (mySound.getTime() / mySound.getDuration());
		playhead.style.marginLeft = playPercent + "px";
		if(mySound.getTime() == mySound.getDuration()) {
			control.className = "";
			control.className = "play";
		}
	}

	//RESETTING THE AUDIO AT THE END IS NOT WORKING
	//set play/pause/reset controls
	document.getElementById("control").addEventListener("click", function() {
		if(mySound.isPaused()) { //play music
			mySound.play();
			control.className = ""; //swap class names to swap button images
			control.className = "pause";
		}
		// else if(mySound.isEnded()) { //reload music at the end
		// 	mySound.pause();
		// 	control.className = "";
		// 	control.className = "play";
		// }
		else { //pause music
			mySound.pause();
			control.className = "";
			control.className = "play";
		}
	});
});







