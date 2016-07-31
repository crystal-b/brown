$(document).ready(function() {

	var music = document.getElementById('audio'); // id for audio element
	var control = document.getElementById('control'); // id for the play button
	var timeline = document.getElementById('timeline'); // id for the timeline to show track position
	var playhead = document.getElementById('slider'); // id for the slider
	var timelineWidth = timeline.offsetWidth - playhead.offsetWidth; // adjust width to account for slider
	var currentTime;  // time played
	var currentTime2 = 250.723265;
	var d; // duration of audio track
	// var seconds = currentTime;




	// load metadata
	music.addEventListener("loadedmetadata", function() {
		music.setAttribute("data-time", d);
	}, false);

	//update track time
	music.addEventListener("timeupdate", timeUpdate, false);
	// console.log(timeUpdate);

	// make timeline clickable
	//THIS ISN'T WORKING
	timeline.addEventListener("click", function(event) {
		moveplayhead(event);
		console.log("duration: " + d);
		music.currentTime = d * clickPercent(event);
	}, false);

	formatTime(d);
	displayTime('start', d);

	// returns click as .77 of timelineWidth
	function clickPercent(p) {
		console.log((p.pageX - timeline.offsetLeft) / timelineWidth);
		return (p.pageX - timeline.offsetLeft) / timelineWidth;

	}

	// make playhead draggable
	playhead.addEventListener('mousedown', mouseDown, false);
	window.addEventListener('mouseup', mouseUp, false);

	//mouse moves only after playhead is released
	var onplayhead = false;
	function mouseDown() {
		onplayhead = true;
		window.addEventListener('mousemove', moveplayhead, true);
		music.removeEventListener('timeupdate', timeUpdate, false);
	}

	//get input from all mouse clicks
	function mouseUp(p) {
		if(onplayhead === true) {
			moveplayhead(p);
			window.removeEventListener('mousemove', moveplayhead, true);
			//change current time
			music.currentTime = d * clickPercent(p);
			music.addEventListener('timeupdate', timeUpdate, false);
		}
		onplayhead = false;
	}

	// move playhead on user drag
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

	//sync slider with current audio position
	function timeUpdate() {
		var playPercent = timelineWidth * (currentTime / d);
		playhead.style.marginLeft = playPercent + "px";
		if(currentTime == d) {
			control.className = "";
			control.className = "play";
		}
	}

	// convert current time and duration from seconds to minutes:seconds
	function formatTime(endtime) {
		var t = d;
		// var t = Date.parse(endtime) - Date.parse(new Date());
		var t = parsefloat(endtime) - parsefloat
		console.log(t);
		var minutes = Math.floor((t/1000/60) % 60);
		// minutes = (minutes >= 10) ? minutes : "0" + minutes;
		var seconds = Math.floor((t/1000) % 60);
		// seconds = (seconds >= 10) ? seconds : "0" + seconds;
		console.log(minutes + ":" + seconds);
		return {
			'total': t,
			'minutes': minutes,
			'seconds': seconds
		}
	}

	// 	function formatTime(seconds) {
	// 	minutes = Math.floor(seconds / 60);
	// 	minutes = (minutes >= 10) ? minutes : "0" + minutes;
	// 	seconds = Math.floor(seconds % 60);
	// 	seconds = (seconds >= 10) ? seconds : "0" + seconds;
	// 	return minutes + ":" + seconds;
	// }

	function displayTime(id, endtime) {
		var clock = document.getElementById(id);
		var interval = setInterval(function() {
		t = formatTime(endtime);
			clock.innerHTML = t.minutes + ":" + t.seconds;
		});
	}

	//Play and Pause
	$("#control").click(function() {
			currentTime = document.getElementById('audio').currentTime;
	d = document.getElementById('audio').duration;
		if(music.paused) { //play music
			music.play();
			control.className = ""; //swap class names to swap button images
			control.className = "pause";
			console.log(d);
		}
		else { //pause music
			music.pause();
			control.className = "";
			control.className = "play";
			console.log(currentTime);
			$(".media__audio--time-end").innerHTML + seconds;
			console.log($(".media__audio--time-end").innerHTML + seconds);
		}
	});

	//Play and Pause
	// function play() { 

	// }
	// console.log(music);
	// $("#control").click(function() {
	// 	document.getElementById("audio").play();
	// 	$(this).attr("id", "playing");
	// 	$(this).attr("src", "img/icons/button-pause.png");
	// 	$(this).css('margin-left', '0');
	// 	console.log("I started playing music");
	// });
	// $("#playing").click(function() {
	// 	document.getElementById("audio").pause();
	// 	preventDefault();
	// 	$(this).attr("id", "control");
	// 	$(this).attr("src", "img/icons/button-play.png");
	// 	$(this).css('margin-left', '0.8rem');
	// 	console.log("I stopped playing music");
	// });
  // function audioPlay() {
  //   document.getElementById('audio').play();
  // }
  // function audioPause() {
  // 	document.getElementById('audio2').play();	
  // }

 //  function playPause() {
	//   var myAudio = document.getElementsByTagName('audio')[0];
	//   if (myAudio.paused)
	//     myAudio.play();
	//   else
	//     myAudio.pause();
	// }
// 	var music = document.getElementById('audio');
 
// function playAudio() {
// 	if (music.paused) {
// 		music.play();
// 		control.className = "";
// 		control.className = "pause";
// 	} else { 
// 		music.pause();
// 		control.className = "";
// 		control.className = "play";
// 	}
// }
});