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
  fieldEl: document.querySelectorAll('.field'),
  valueEl: document.querySelectorAll('.value'),
  labelEl: document.querySelectorAll('.label'),
};

let arrayTime = [];

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      refs.startBtn.style.backgroundColor = 'red';
      Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.style.backgroundColor = 'green';
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
      refs.startBtn.style.backgroundColor = 'silver';
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

refs.dateTimePickerInput.style.display = 'block';
refs.dateTimePickerInput.style.marginRight = 'auto';
refs.dateTimePickerInput.style.marginLeft = 'auto';
refs.dateTimePickerInput.style.marginBottom = '10px';
refs.dateTimePickerInput.style.boxSizing = 'border-box';
refs.dateTimePickerInput.style.fontSize = '20px';
refs.dateTimePickerInput.style.fontWeight = '700';
refs.dateTimePickerInput.style.textAlign = 'center';

refs.startBtn.style.display = 'block';
refs.startBtn.style.marginRight = 'auto';
refs.startBtn.style.marginLeft = 'auto';
refs.startBtn.style.fontSize = '20px';
refs.startBtn.style.fontWeight = '700';
refs.startBtn.style.backgroundColor = 'silver';
refs.startBtn.style.color = 'black';

refs.timerEl.style.display = 'flex';
refs.timerEl.style.justifyContent = 'center';

refs.fieldEl.forEach(el => {
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.alignItems = 'center';
  el.style.marginTop = '10px';
  el.style.marginRight = '10px';
});

refs.valueEl.forEach(el => {
  el.style.fontSize = '50px';
  el.style.fontWeight = '500';
});

refs.labelEl.forEach(el => {
  el.style.fontSize = '20px';
  el.style.fontWeight = '500';
  el.style.textTransform = 'uppercase';
});
