"use strict";

document.getElementById("javascript_check").remove();
document.getElementById("start_btn").disabled = false;

const settings = document.getElementById("settings");
const body = document.getElementsByTagName("body")[0];
const text = document.getElementById("text");
const restart_btn = document.getElementById("restart_btn");

const all_states = {
	head: {backgroundColor: "red", color: "white", text: "Head", sounds: ["asset/head.ogg"].map(s => new Audio(s)), end: false},
	shoulders: {backgroundColor: "green", color: "black", text: "Shoulders", sounds: ["asset/shoulders.ogg"].map(s => new Audio(s)), end: false},
	knees: {backgroundColor: "blue", color: "black", text: "Knees", sounds: ["asset/knees.ogg"].map(s => new Audio(s)), end: false},
	toes: {backgroundColor: "orange", color: "black", text: "Toes", sounds: ["asset/toes.ogg"].map(s => new Audio(s)), end: false},
	cup: {backgroundColor: "black", color: "white", text: "Cup!", sounds: ["asset/cup.ogg"].map(s => new Audio(s)), end: true},
};

var states = [];
var sound = null;

function restart()
{
	if(sound != null)
	{
		sound.pause();
		sound.currentTime = 0;
		sound = null;
	}
	body.style.backgroundColor = "white";
	text.style.color = "black";
	restart_btn.style.display = "none";
	text.style.display = "none";
	settings.style.display = "block";
	states = [];
}

function add_state(state_name)
{
	if(document.getElementById(state_name).checked)
		states.push(all_states[state_name]);
}

function game()
{
	if(sound != null)
	{
		sound.pause();
		sound.currentTime = 0;
		sound = null;
	}
	var state = states[(states.length * Math.random()) << 0];
	// make the game unlikely to end right away
	if(state.end)
		state = states[(states.length * Math.random()) << 0];
	body.style.backgroundColor = state.backgroundColor;
	text.style.color = state.color;
	text.innerText = state.text;
	sound = state.sounds[(state.sounds.length * Math.random()) << 0];
	sound.play();
	if(state.end)
		restart_btn.style.display = "inline";
	else
		setTimeout(game, Math.random() * 3000 + 1000);
}

function countdown()
{
	var count = 4;
	text.innerText = 'Ready?';
	const interval = setInterval(() => {
		count--;
		if(count == 0)
		{
			clearInterval(interval);
			game();
		}
		else
			text.innerText = count;
	}, 1000);
}

function start()
{
	settings.style.display = "none";
	text.style.display = "block";

	add_state("head");
	add_state("shoulders");
	add_state("knees");
	add_state("toes");
	states.push(all_states.cup);

	//states = [all_states.cup];
	//game();
	countdown();
}

