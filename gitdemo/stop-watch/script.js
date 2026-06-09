const startBtn = document.getElementById("startBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

const min = document.getElementById("min");
const sec = document.getElementById("sec");
const ms = document.getElementById("ms");

const lapList = document.getElementById("lapList");

let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let timer;
let running = false;
let lapNumber = 1;

function updateDisplay(){

    min.innerText = String(minutes).padStart(2,"0");
    sec.innerText = String(seconds).padStart(2,"0");
    ms.innerText = String(milliseconds).padStart(2,"0");
}

function startWatch(){

    timer = setInterval(()=>{

        milliseconds++;

        if(milliseconds === 100){
            milliseconds = 0;
            seconds++;
        }

        if(seconds === 60){
            seconds = 0;
            minutes++;
        }

        updateDisplay();

    },10);
}

startBtn.addEventListener("click",()=>{

    if(!running){

        startWatch();
        running = true;
        startBtn.innerText = "Pause";

    }else{

        clearInterval(timer);
        running = false;
        startBtn.innerText = "Resume";
    }

});

lapBtn.addEventListener("click",()=>{

    if(!running) return;

    let li = document.createElement("li");

    li.innerText =
    `Lap ${lapNumber} : ${String(minutes).padStart(2,"0")} :
     ${String(seconds).padStart(2,"0")} :
     ${String(milliseconds).padStart(2,"0")}`;

    lapList.appendChild(li);

    lapNumber++;
});

resetBtn.addEventListener("click",()=>{

    clearInterval(timer);

    running = false;

    minutes = 0;
    seconds = 0;
    milliseconds = 0;

    lapNumber = 1;

    startBtn.innerText = "Start";

    lapList.innerHTML = "";

    updateDisplay();
});

updateDisplay();