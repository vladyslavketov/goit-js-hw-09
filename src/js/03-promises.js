import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector(".form"),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const { elements: { delay, step, amount } } = e.currentTarget;
  // console.log(delay.value, step.value, amount.value);

  runFnCreatePromise(Number(delay.value), Number(step.value), Number(amount.value));
};

function runFnCreatePromise( delay, step, amount ) {
  let newDelay = delay;
    
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.info(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    newDelay += step;
  };
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    // console.log("position:", position, "delay:", delay)
    
    const shouldResolve = Math.random() > 0.3;
   
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          position,
          delay,
        });
      } else {
        reject ({
          position,
          delay,
        });
      }
    }, delay);
  });
};

// ============ альтернативний варіант ============

// function runFnCreatePromise( delay, step, amount ) {
//   let newDelay = delay;
    
//   for (let i = 1; i <= amount; i += 1) {
//     createPromise(i, newDelay).then(resolve => console.log(resolve)).catch(reject => console.log(reject));
//     newDelay += step;
//   };
// };

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     // console.log("position:", position, "delay:", delay)
    
//     const shouldResolve = Math.random() > 0.3;
   
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve (`✅ Fulfilled promise ${position} in ${delay}ms`);
//       } else {
//         reject (`❌ Rejected promise ${position} in ${delay}ms`);
//       }
//     }, delay);
//   });
// };