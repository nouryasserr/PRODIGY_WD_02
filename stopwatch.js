let [seconds, minutes, hours] = [0, 0, 0];
let interval = null;
let isRunning = false;
let lapCount = 1;
const lapsContainer = document.getElementById("laps");

function updateDisplay() {
  document.querySelector(".hours-num").textContent =
    hours < 10 ? "0" + hours : hours;
  document.querySelector(".min-num").textContent =
    minutes < 10 ? "0" + minutes : minutes;
  document.querySelector(".sec-num").textContent =
    seconds < 10 ? "0" + seconds : seconds;
}

function startTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateDisplay();
}

document.getElementById("start").addEventListener("click", () => {
  if (!isRunning) {
    interval = setInterval(startTimer, 1000);
    document.getElementById("start").textContent = "Pause";
    isRunning = true;
  } else {
    clearInterval(interval);
    document.getElementById("start").textContent = "Start";
    isRunning = false;
  }
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(interval);
  [seconds, minutes, hours] = [0, 0, 0];
  updateDisplay();
  document.getElementById("start").textContent = "Start";
  isRunning = false;
  lapsContainer.innerHTML = "";
  lapCount = 1;
});

document.getElementById("lap").addEventListener("click", () => {
  if (isRunning) {
    const lapTime = document.createElement("div");
    lapTime.classList.add("lap-line");
    lapTime.innerHTML = `<h3>LAP ${lapCount}</h3><h3>${
      hours < 10 ? "0" + hours : hours
    }:${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }</h3>`;
    lapsContainer.prepend(lapTime);
    lapCount++;
  }
});

updateDisplay();
