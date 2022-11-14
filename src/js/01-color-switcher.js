const refs = {
  startBtn: document.querySelector('[data-start]'),
  stoptBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
let timerId = null;

refs.startBtn.addEventListener('click', () => {
  const DELAY = 1000;

  refs.startBtn.setAttribute("disabled", "");

  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, DELAY);
});

refs.stoptBtn.addEventListener('click', () => {
  clearInterval(timerId);
  refs.startBtn.removeAttribute("disabled", "");
 });

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}