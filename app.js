//Responsive mobile menu
const burgerIcon = document.querySelector("#burger")
const navbarMenu = document.querySelector("#nav-links")

burgerIcon.addEventListener("click", () => {
    navbarMenu.classList.toggle("is-active")
});

// Def starting minutes and time for the countdown
const startingMinutes = 25;
let time = startingMinutes * 60;

//create a clear element to reset time
let clear;

//audio for the ring after timer goes to zero
const ring = new Audio("telephone-ring-01a.wav");

// select the and display the countdown 
const countdownEl = document.querySelector("#countdown");

//start the tomato timer with 25min
const btnTomato = document.querySelector('#tomato');
btnTomato.addEventListener('click', function() {
    btnPause.innerHTML = 'Pause'
    if (clear !== undefined)
        clearInterval(clear)
    time = 25 * 60;
    clear = setInterval(updateCountdown, 1000);
});

//start the short break of 5 min
const btnBreak = document.querySelector('#break');
btnBreak.addEventListener("click", function() {
    btnPause.innerHTML = 'Pause'
    if (clear !== undefined)
        clearInterval(clear)
    time = 5 * 60;
    clear = setInterval(updateCountdown, 1000);
})

//start the long break of 10 min
const btnlongBreak = document.querySelector('#longBreak');
btnlongBreak.addEventListener("click", function() {
    btnPause.innerHTML = 'Pause'
    if (clear !== undefined)
        clearInterval(clear)
    time = 10 * 60;
    clear = setInterval(updateCountdown, 1000);
})

// NEEDS FIX, should stop and display the current countdown time 
const btnPause = document.querySelector("#pauseBtn");
btnPause.addEventListener("click", function() {
    if (clear === undefined) {
        clear = setInterval(updateCountdown, 1000)
        btnPause.innerHTML = 'Pause'
    } else {
        clearInterval(clear);
        clear = undefined
        btnPause.innerHTML = 'Resume'
    }
})

// const cklTask = document.querySelector("#task");
// cklTask.addEventListener("input", function() {
//     cklTask.innerHTML = input.value;
// })


// function to update the Countdown and play audio when it goes to zero
function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    countdownEl.innerHTML = `${minutes}:${seconds}`;
    time--;
    if (time < 0) {
        time = 0;
        //console.log("ring")
        play3Times();
        clearInterval(clear);
    }
}

function playSound(audio, numberOfTimes = 1, delay = 3000, firstTime = true) {
    if (firstTime) {
        audio.play();
        console.log("ring1")
    }
    setTimeout(() => {
        if (!firstTime) {
            audio.play();
            console.log("ring2")
        }
        numberOfTimes--;
        if (numberOfTimes > 0) {
            playSound(audio, numberOfTimes, delay, false);
            console.log("ring3")
        }
    }, delay)
}

function play3Times() {
    const audio = ring
    playSound(audio, 4, 3000);
}



//to do list 
const lis = document.querySelectorAll("li");
for (let li of lis) {
    li.addEventListener("click", function() {
        li.remove();
    })
}

const todoForm = document.querySelector('#todoForm');
const taskList = document.querySelector('#taskList');
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskInput = todoForm.elements.task;
    addTask(taskInput.value)
    taskInput.value = '';

});

const addTask = (task) => {
    const newTask = document.createElement('li');
    newTask.append(task);
    taskList.append(newTask);
}

taskList.addEventListener('click', function(e) {
    e.target.nodeName === 'LI' && e.target.remove();
})

// NEEDS FIX AND TIME!!  Attempt to write the todo list with checkbox

// const taskInput = document.querySelector("input");
// const taskList = document.querySelector('#taskList3');
// const elCheckbox = document.querySelector("#taskList")

// taskInput.addEventListener("input", function(e) {
//     taskList.innerText = taskInput.value;
//     const newTask = document.createElement("input");
//     newTask.setAttribute("type", "checkbox");

//     newTask.setAttribute("nextElementSibling", "label")
//     taskList.append(newTask)
//     console.dir(newTask)
// })

// const usernameInput = document.querySelectorAll('input')[0];
// const tweetInput = document.querySelectorAll('input')[1];

// How to create a label exemple
// var newlabel = document.createElement("Label");
// newlabel.setAttribute("for", taskList);
// newlabel.innerHTML = "Here goes the text";
// parentDiv.appendChild(newlabel);