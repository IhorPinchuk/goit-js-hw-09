const PROMPT_DELAY = 1000;
const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let timerId = null;

refs.startBtn.addEventListener('click', handleStartBtn);
refs.stopBtn.addEventListener('click', handleStopBtn);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function handleStartBtn() {
  refs.startBtn.disabled = true;
  timerId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, PROMPT_DELAY);
}

function handleStopBtn() {
  refs.startBtn.disabled = false;
  clearInterval(timerId);
}
