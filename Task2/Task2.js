let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 1000);
        startPauseButton.textContent = "Pause";
        running = true;
        lapButton.disabled = false;
    } else {
        clearInterval(tInterval);
        startPauseButton.textContent = "Start";
        running = false;
        lapButton.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.textContent = "00:00:00";
    startPauseButton.textContent = "Start";
    lapCount = 0;
    lapsContainer.innerHTML = "";
    lapButton.disabled = true;
}

function lap() {
    if (running) {
        lapCount++;
        const lapTime = document.createElement("div");
        lapTime.textContent = `Lap ${lapCount}: ${display.textContent}`;
        lapsContainer.appendChild(lapTime);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
    return unit < 10 ? "0" + unit : unit;
}
