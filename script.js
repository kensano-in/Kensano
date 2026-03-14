const targetDate = new Date("2026-04-15").getTime();

const timer = document.getElementById("timer");

function updateTimer(){

const now = new Date().getTime();

const distance = targetDate - now;

const days = Math.floor(distance / (1000*60*60*24));

const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));

const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));

const seconds = Math.floor((distance % (1000*60)) / 1000);

timer.innerHTML = days+"d "+hours+"h "+minutes+"m "+seconds+"s";

}

setInterval(updateTimer,1000);
