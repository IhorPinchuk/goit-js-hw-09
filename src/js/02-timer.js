import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateTimePickerInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  timerEl: document.querySelector('.timer'),
};

let arrayTime = [];

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      Notify.info('You can press "Start"');
      refs.startBtn.disabled = false;
      console.log(selectedDates[0]);
      arrayTime.splice(0, 1, selectedDates[0]);
    }
  },
};
refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', handleTimerStart);

flatpickr(refs.dateTimePickerInput, options);

function handleTimerStart() {
  Notify.success('Start');
  const timerId = setInterval(() => {
    const diffInMs = arrayTime[0].getTime() - new Date().getTime();
    const formatedDiffInMs = convertMs(diffInMs);

    if (diffInMs > 0) {
      refs.startBtn.disabled = true;
      insertValueInTimer(formatedDiffInMs);
      if (diffInMs <= 10000) {
        refs.timerEl.style.color = 'red';
      }
    } else {
      refs.timerEl.style.color = 'black';
      Notify.success('Countdown is over');
      clearInterval(timerId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function insertValueInTimer(formatedDiffInMs) {
  refs.secondsEl.textContent = addLeadingZero(formatedDiffInMs.seconds);
  refs.minutesEl.textContent = addLeadingZero(formatedDiffInMs.minutes);
  refs.hoursEl.textContent = addLeadingZero(formatedDiffInMs.hours);
  refs.daysEl.textContent = addLeadingZero(formatedDiffInMs.days);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
