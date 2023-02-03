import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('#datetime-picker'),
    timer: document.querySelector('.timer'), 
    btnStart: document.querySelector('button[data-start]'),
    seconds: document.querySelector('span[data-seconds]'),
    minutes: document.querySelector('span[data-minutes]'),
    hours: document.querySelector('span[data-hours]'),
    days: document.querySelector('span[data-days]'),
};


refs.btnStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] < new Date()) {
        Notiflix.Notify.failure(`Please choose a date in the future`);
        refs.btnStart.disabled = true;
      } else {
        refs.btnStart.disabled = false;
      }
    },
  };
  flatpickr(refs.input, options);
  
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

refs.btnStart.addEventListener('click', () => {
        let timer = setInterval(() => {
        
        let timeLeft = new Date(refs.input.value) - new Date();

        if (timeLeft >= 0) {
            let countDownTime = convertMs(timeLeft);
            refs.days.textContent = addLeadingZero(countDownTime.days);
            refs.hours.textContent = addLeadingZero(countDownTime.hours);
            refs.minutes.textContent = addLeadingZero(countDownTime.minutes);
            refs.seconds.textContent = addLeadingZero(countDownTime.seconds);
        } else {
            Notiflix.Notify.success('Countdown finished')
            clearInterval(timer);
        }
    }, 1000); 
});