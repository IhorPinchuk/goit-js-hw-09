import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
console.log(formEl);
let delay = Number(formEl.delay.value);
let position = 0;

formEl.addEventListener('submit', createPromises);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const firstDelay = Number(formEl.delay.value);
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, firstDelay);
  });
}

function createPromises(event) {
  event.preventDefault();

  const step = Number(formEl.step.value);
  delay = Number(formEl.delay.value);
  position += 1;

  if (position === 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  const timerId = setInterval(() => {
    const amount = Number(formEl.amount.value);
    position += 1;
    delay += step;

    if (position <= amount) {
      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    } else {
      clearInterval(timerId);
    }
  }, step);
}
