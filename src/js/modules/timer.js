const timer = (id, deadline) => {
  const addZerro = (num) => {
    if (num <= 9) {
      return "0" + num;
    } else {
      return num;
    }
  };
  const getTimeRemaning = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date()),
              seconds = Math.floor((t/1000) % 60),
              minutes = Math.floor((t/1000/60) % 60),
              hours = Math.floor((t/(1000 * 60 * 60)) % 24),
              days = Math.floor((t/(1000 * 60 * 60 * 24)));

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds");
   const  timeInterval = setInterval(updateClock, 1000);

    updateClock();
    function updateClock() {
      const t = getTimeRemaning(endtime);

      days.textContent = addZerro(t.days);
      hours.textContent = addZerro(t.hours);
      minutes.textContent = addZerro(t.minutes);
      seconds.textContent = addZerro(t.seconds);

      if (t.total <= 0) {
        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        clearInterval(timeInterval);
      }
    }
  };
  setClock(id, deadline);
};

export default timer;
