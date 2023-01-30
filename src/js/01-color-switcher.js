const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
}
stop.disabled = true;
let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  
refs.start.addEventListener('click', () => {
    refs.start.disabled = true;
    refs.stop.disabled = false;
  
    timerId = setInterval(() => {
      document.body.style.background = getRandomHexColor();
    }, 1000);
  });
  
refs.stop.addEventListener('click', () => {
    clearInterval(timerId);
    refs.start.disabled = false;
    refs.stop.disabled = true;
  });