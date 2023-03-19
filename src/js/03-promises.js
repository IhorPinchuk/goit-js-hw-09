const formEl = document.querySelector('.form');
console.log(formEl);
// console.log(formEl.delay);
// console.log(formEl.step);
let delay = Number(formEl.delay.value);
// const step = Number(formEl.step.value);
// const amount = formEl.amount.value;
let position = 0;
// let delay = 0;
// console.log(delay);

formEl.addEventListener('submit', createPromises);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    // const delay = Number(formEl.delay.value);
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromises(event) {
  event.preventDefault();

  // const amount = Number(formEl.amount.value);
  const step = Number(formEl.step.value);
  let delay = Number(formEl.delay.value);
  // console.log(delay);
  
  const timerId = setInterval(() => {
    const amount = Number(formEl.amount.value);
    position += 1;
    delay += step;
    if (position <= amount) {
      createPromise(position, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    } else {
      clearInterval(timerId);
    }
  }, step);
}
