const submit = document.querySelector(".input-submit");
const time = document.querySelector(".input-time");
const audio = document.querySelector("audio");
const timeToGetUp = {
  minutes: null,
  hours: null,
};

window.onload = getLocalStorage;

submit.addEventListener("click", handleSubmit);

function handleSubmit() {
  if (time.value) {
    document.querySelector(".pause").classList.add("hide");
    document.querySelector(".delay").classList.remove("hide");
    time.disabled = true;

    const now = new Date();
    const alarmTime = new Date();

    alarmTime.setHours(
      time.value[0] === "0"
        ? Number(time.value[1])
        : Number(time.value.slice(0, 2))
    );
    alarmTime.setMinutes(
      time.value[3] === "0"
        ? Number(time.value[4])
        : Number(time.value.slice(3, 5))
    );

    setLocalStorage(alarmTime);

    if (alarmTime < now) {
      alarmTime.setDate(alarmTime.getDate() + 1);
    }

    const delay = alarmTime - now - now.getSeconds() * 1000;
    showDelay(delay / 1000);
    submit.disabled = true;

    setTimeout(() => {
      audio.play();
      submit.disabled = false;
      time.disabled = false;
      document.querySelector(".pause").classList.remove("hide");
      document.querySelector(".delay").textContent = `The alarm rang already`;
    }, delay);
  }
}

function showDelay(delaySeconds) {
  const hours = Math.floor(delaySeconds / 3600);
  delaySeconds -= hours * 3600;
  const minutes = Math.floor(delaySeconds / 60);
  delaySeconds -= minutes * 60;
  document.querySelector(
    ".delay"
  ).textContent = `The alarm will ring in ${hours} hours, ${minutes} minutes and ${delaySeconds} seconds`;
}

document.querySelector(".pause").addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
  document.querySelector(".pause").classList.add("hide");
  document.querySelector(".delay").classList.add("hide");
  document.querySelector(".delay").textContent = null;
});

function getLocalStorage() {
  if (localStorage.getItem("timeToGetUp")) {
    const getUp = JSON.parse(localStorage.getItem("timeToGetUp"));
    let timeStringValue =
      getUp.hours < 10 ? `0${getUp.hours}:` : `${getUp.hours}:`;
    timeStringValue +=
      getUp.minutes < 10 ? `0${getUp.minutes}` : `${getUp.minutes}`;
    time.value = timeStringValue;
  }
}

function setLocalStorage(dateObject) {
  timeToGetUp.hours = dateObject.getHours();
  timeToGetUp.minutes = dateObject.getMinutes();
  stringifiedTime = JSON.stringify(timeToGetUp);
  localStorage.setItem("timeToGetUp", stringifiedTime);
}
