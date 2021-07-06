const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board")
let time = 0;
let score = 0
let colors = ["red", "blue", "green", "yellow", "purple", "pink", "white", "salmon"]

function getRandomColor(params) {
	const index = Math.floor(Math.random() * colors.length)
	return colors[index]
}


startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')){
		score++
		event.target.remove()
		createRandomCircle()
	}
})

function startGame(params) {
  setInterval(decreaseTime, 1000);
  createRandomCircle()
  setTime(time);
}

function decreaseTime(params) {
  if (time === 0) {
	  finishGame()
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}


function finishGame(params) {
	board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
	timeEl.parentNode.classList.add("hide")
}

function createRandomCircle(params) {
	const circle = document.createElement("div")
	const size = getRandomNumber(10, 60)
	const {width, height} = board.getBoundingClientRect()
	const x = getRandomNumber(0, width - size)
	const y = getRandomNumber(0, height - size)
	const colorOfCircle = getRandomColor()
	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`
	circle.style.backgroundColor = colorOfCircle
	board.append(circle)
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

