import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    dateTimePickerInput: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            window.alert("Please choose a date in the future");
            refs.startBtn.disabled = true;
        } else {
            refs.startBtn.disabled = false;
        //     console.log(selectedDates[0]);
        // console.log(selectedDates[0].getTime() - Date.now());
        
        // return Date.now() - selectedDates[0].getSeconds();
      }
        
         
  },
};

flatpickr(refs.dateTimePickerInput, options);

// console.log(options.defaultDate);
// const timer = {
//     start() {
//         const timerStart = Date.now();
//         setInterval(() => {
//             const currentTime = Date.now();
//             console.log(timerStart - currentTime);
//         },1000)
//     }
// }

// timer.start();

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


