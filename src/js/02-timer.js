import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dateTimePickerInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      console.log(selectedDates[0]);

      timer(selectedDates);
    }
  },
};

flatpickr(refs.dateTimePickerInput, options);

function timer(selectedDates) {
  const timerId = setInterval(() => {
    const diffInMs = selectedDates[0].getTime() - new Date().getTime();
    const formatedDiffInMs = convertMs(diffInMs);
    
    if (diffInMs > 0) {
      insertValueInTimer(formatedDiffInMs);
    } else {
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
