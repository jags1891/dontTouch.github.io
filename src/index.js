import * as handTrack from "../node_modules/handtrackjs";

navigator.getUserMedia =
	navigator.getUserMedia ||
	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia ||
	navigator.msGetUserMedia;

const modelParams = {
	flipHorizontal: true, // flip e.g for video
	imageScaleFactor: 0.7, // reduce input image size for gains in speed.
	maxNumBoxes: 20, // maximum number of boxes to detect
	iouThreshold: 0.5, // ioU threshold for non-max suppression
	scoreThreshold: 0.79, // confidence threshold for predictions.
};

let timeStart = new Date();
let startStamp = timeStart.getTime();
const timeSt = document.querySelector("#timeStart");
console.log(String(timeStart));
timeSt.innerHTML = "<b>Start Time: </b>" + String(timeStart);

var timer; // for storing the interval (to stop or pause later if needed)
var newDate = new Date();
var newStamp = newDate.getTime();
function updateClock() {
	console.log("hello");
	newDate = new Date();
	newStamp = newDate.getTime();
	var diff = Math.round((newStamp - startStamp) / 1000);

	var d = Math.floor(
		diff / (24 * 60 * 60)
	); /* though I hope she won't be working for consecutive days :) */
	diff = diff - d * 24 * 60 * 60;
	var h = Math.floor(diff / (60 * 60));
	diff = diff - h * 60 * 60;
	var m = Math.floor(diff / 60);
	diff = diff - m * 60;
	var s = diff;

	document.getElementById("timeElapsed").innerHTML =
		"<b> Elapsed </b>: " +
		d +
		" day(s), " +
		h +
		" hour(s), " +
		m +
		" minute(s), " +
		s +
		" second(s)";
}

timer = setInterval(updateClock, 1000);
let numTimesTouched = 0;
let numsTouched = document.querySelector("#num");
numsTouched.innerHTML =
	"<b>Face touched : </b> " + String(numTimesTouched) + " time(s)";

const video = document.querySelector("#video");
//const audio = document.querySelector("#audio");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const audio = new Audio("Sound.mp3");

let model;

// Load the model.
handTrack.load(modelParams).then((lmodel) => {
	model = lmodel;
});

handTrack.startVideo(video).then((status) => {
	if (status) {
		navigator.getUserMedia(
			{ video: {} },
			(stream) => {
				video.srcObject = stream;
				setInterval(detect, 1000);
			},
			(err) => {
				alert(err);
			}
		);
	}
});

function detect() {
	model.detect(video).then((predictions) => {
		if (predictions.length > 0) {
			numTimesTouched++;
			numsTouched.innerHTML =
				"<b>Face touched : </b> " + String(numTimesTouched) + " time(s)";
			audio.play();
		}
		//model.renderPredictions(predictions, canvas, context, video);
	});
}
