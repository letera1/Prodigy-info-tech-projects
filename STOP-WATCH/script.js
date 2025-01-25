// script.js
let timerInterval;
let startTime;
let elapsedTime = 0;

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

function updateTimerDisplay() {
  const time = Date.now() - startTime + elapsedTime;
  const milliseconds = time % 1000;
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 60000) % 60);
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

startBtn.addEventListener('click', () => {
  startTime = Date.now();
  timerInterval = setInterval(updateTimerDisplay, 10);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  elapsedTime += Date.now() - startTime;
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timerDisplay.textContent = '00:00:00.000';
  lapList.innerHTML = '';
  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
});

lapBtn.addEventListener('click', () => {
  const lapTime = timerDisplay.textContent;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapList.children.length + 1}: ${lapTime}`;
  lapList.appendChild(lapItem);
});

themeSwitch.addEventListener('change', () => {
  body.setAttribute('data-theme', themeSwitch.checked ? 'dark' : 'light');
});
