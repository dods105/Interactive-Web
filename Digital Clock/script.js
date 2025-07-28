const hrs = document.getElementById('hrs');
const min = document.getElementById('min');
const sec = document.getElementById('sec');
const AMPM = document.getElementById('time')

setInterval(() => {
    const now = new Date();

    hrs.innerText = ((now.getHours() < 10 ? "0" : "") + now.getHours()) % 12;
    min.innerText = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
    sec.innerText = (now.getSeconds() < 10 ? "0" : "") + now.getSeconds();
    AMPM.innerText = (now.getHours() < 12 ? "AM" : "PM")
}, 1000)

