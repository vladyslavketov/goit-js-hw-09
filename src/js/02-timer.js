import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector("input#datetime-picker"),
  startBtn: document.querySelector("button[data-start]"),
  days: document.querySelector("span[data-days]"),
  hours: document.querySelector("span[data-hours]"),
  minutes: document.querySelector("span[data-minutes]"),
  seconds: document.querySelector("span[data-seconds]"),
  label: document.querySelectorAll("span.label"),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      // window.alert("Please choose a date in the future");
      Notify.info("Please choose a date in the future");
    } else {
      refs.startBtn.removeAttribute("disabled", "");
      console.log(selectedDates[0]);
    };
  },
};

const calendar = flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', timer);

function timer() {
  const startTime = calendar.selectedDates[0];
  const timerId = setInterval(() => {
    const currentTime = Date.now();
    let ms = startTime - currentTime;

    setTextContent(addLeadingZero(convertMs(ms)));

    if (ms < 1000) {
      clearInterval(timerId);
    };
  }, 1000);
};

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
};

function addLeadingZero({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(2, 0);
  hours = hours.toString().padStart(2, 0);
  minutes = minutes.toString().padStart(2, 0);
  seconds = seconds.toString().padStart(2, 0);

  return { days, hours, minutes, seconds };
};

function setTextContent({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
};