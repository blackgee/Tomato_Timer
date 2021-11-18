//buttons to create event listeners and start/reset timer
const btnTomato = document.querySelector("#tomato");
const btnlongBreak = document.querySelector("#longBreak");
const btnBreak = document.querySelector("#break");
const btnPause = document.querySelector("#pauseBtn");
const btnFaq = document.querySelector("#faq");
const modal = document.querySelector("#page-modal");
const close = document.querySelector(".modal-close")

btnFaq.addEventListener("click", () => {
  modal.style.display = "block"
});

close.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target.className == "modal-background") {
    modal.style.display = "none";
 }
});

// select countdown element
const countdownEl = document.querySelector("#countdown");

// Def starting minutes and time for the countdown
const startingMinutes = 25;
let time = startingMinutes * 60;

//create a clear element to reset time
let clear;

//audio for the ring after timer goes to zero
const ring = new Audio("ring.mp3");

//Responsive mobile menu
const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

burgerIcon.addEventListener("click", () => {
  navbarMenu.classList.toggle("is-active");
});

// starting a var called tomato to track how many tomato timers were used
let tomato = 0;

//Changes the pauseBtn inner html to pause when called
const pause = () => {
  btnPause.innerHTML = "Pause";
};

// the func bellow avoid the countdown to add more intervals when you
// click the button speeding the time. It clears the setInterval func
const clearCount = () => {
  if (clear !== undefined) {
    clearInterval(clear);
  }
};

//start the tomato timer with 25min
btnTomato.addEventListener("click", () => {
  pause();
  clearCount();
  time = 25 * 60;
  clear = setInterval(updateCountdown, 1000);
  tomato = 1;
});

//start the short break of 5 min
btnBreak.addEventListener("click", () => {
  pause();
  clearCount();
  time = 5 * 60;
  clear = setInterval(updateCountdown, 1000);
});

//start the long break of 10 min
btnlongBreak.addEventListener("click", () => {
  pause();
  clearCount();
  time = 10 * 60;
  clear = setInterval(updateCountdown, 1000);
});

// Stops and displays the current countdown time
btnPause.addEventListener("click", () => {
  if (clear === undefined) {
    clear = setInterval(updateCountdown, 1000);
    btnPause.innerHTML = "Pause";
  } else {
    clearInterval(clear);
    clear = undefined;
    btnPause.innerHTML = "Resume";
  }
});

// function to update the Countdown and call endTimer
const updateCountdown = () => {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  countdownEl.innerHTML = `${minutes}:${seconds}`;
  time--;
  endTimer();
}

// Func to play audio when timer is = 0 and call addTomato func
const endTimer = () => {
  if (time < 0) {
    time = 0;
    clearInterval(clear);
    ring.play();
    if (tomato === 1) {
      addTomato();
      tomato = 0;
    }
  }
};

// Adds new tomatoes elements to the focused task in the todo list.
const addTomato = () => {
  const focused = document.querySelectorAll(".focused");
  const tom = document.querySelectorAll(".tomatoes");
  for (let i = 0; i < focused.length; i++) {
    const tomatoes = document.createElement("span");
      tomatoes.classList.add("tomatoes");
      focused[i].append(tomatoes);
  }
}

//todo list selectors
const todoForm = document.querySelector("#todoForm");
const taskList = document.querySelector("#taskList");
const input = document.querySelector("input");

// create a submit event in the form to collect user input
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = input.value;
  addTask(taskText);
  input.value = "";
});

// take the user input and create a li
const addTask = (task) => {
  const newTask = document.createElement("li");
  newTask.classList.add("lateral");
  newTask.append(task);
  taskList.append(newTask);
};

// double click event to delete the task
taskList.addEventListener("dblclick", (e) => {
  e.target.nodeName === "LI" && e.target.remove();
});

//click event to focus in one or more tasks to count the tomatoes
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("focused")) {
    e.target.classList.remove("focused");
  } else {
    e.target.nodeName === "LI" && e.target.classList.add("focused");
  }
});
