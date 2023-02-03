import Notiflix, { Loading } from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
}
refs.form.addEventListener('click', onPromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
        }, delay);
  });
}

function onPromise(event) {
  event.preventDefault();

  let inputDelay = Number(refs.delay.value);
  let inputStep = Number(refs.step.value);
  let inputAmount = Number(refs.amount.value);

  for (let i = 1; i <= inputAmount; i+= 1) {
    let promise = inputDelay + inputStep*i;

    createPromise(i, promise)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}