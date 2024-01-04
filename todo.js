import StorageManager from "./StorageManager.js";
import DisplayManager from "./DisplayManager.js";

const toDoForm = document.getElementById("todoform");

let storageManager = new StorageManager();
let displayManager = new DisplayManager();

let CountdownInterval;
let PausedTime = 0;

let PlayPauseButton = document.getElementById("playPauseButton");
let RestartTimerButton = document.getElementById("restartButton");
let StopTimerButton = document.getElementById("stopButton");

// toDoForm SUBMIT
toDoForm.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent the page from reloading
  const todoInput = document.getElementById("newtodo").value;
  addTodo(todoInput);
  document.getElementById("newtodo").value = "";
});

function addTodo(todoInput) {
  const todo = { description: todoInput, id: generateRandomId() };
  storageManager.addTodo(todo);
  displayManager.addTodo(todo);
}

// For future features
function deleteTodoById(id) {
  storageManager.deleteTodoById(id);
  displayManager.deleteTodoById(id);
}

// For future features
function deleteAllTodos() {
  storageManager.deleteAllTodos();
  displayManager.removeAllTodos();
}

function generateRandomId() {
  return uuidv4();
}

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourRotation = (360 / 12) * (hours % 12) + (360 / 12) * (minutes / 60);
  const minuteRotation = (360 / 60) * minutes + (360 / 60) * (seconds / 60);
  const secondRotation = (360 / 60) * seconds;

  document.querySelector(
    ".hour-hand"
  ).style.transform = `rotate(${hourRotation}deg)`;
  document.querySelector(
    ".minute-hand"
  ).style.transform = `rotate(${minuteRotation}deg)`;
  document.querySelector(
    ".second-hand"
  ).style.transform = `rotate(${secondRotation}deg)`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial clock update
updateClock();

// Section for the motivational messages
const quotesAndTips = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Courage is not the abscence of fear, but the triumph over it. - Nelson Mandela",
  "The glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
];

function getRandomQuote() {
  const quoteDisplay = document.getElementById("quote-text");

  // Fade out the existing quote
  quoteDisplay.classList.remove("quote-fade-in");
  quoteDisplay.classList.add("quote-fade-out");

  setTimeout(() => {
    // Get a new random quote
    const randomIndex = Math.floor(Math.random() * quotesAndTips.length);
    const randomQuote = quotesAndTips[randomIndex];

    // Update the quote text and fade it in
    quoteDisplay.textContent = randomQuote;
    quoteDisplay.classList.remove("quote-fade-out");
    quoteDisplay.classList.add("quote-fade-in");
  }, 1000); // Wait for 1 second before updating the quote
}

// Initial quote display
getRandomQuote();

// Set interval to change quote every 10 seconds
setInterval(getRandomQuote, 10000);

document
  .getElementById("startCountdownButton")
  .addEventListener("click", function () {
    if (CountdownInterval) {
      alert(
        "A countdown is already in progress. Please wait for it to complete or cancel it."
      );
      return;
    }

    startCountdown();
  });

// Section for the countdown timer
function startCountdown() {
  const minutesInput = document.getElementById("countdown-minutes");
  const countdownDisplay = document.getElementById("countdown");
  const progressBar = document.getElementById("progress-bar");
  var icon = document.getElementById("playPauseIcon");

  const minutes = parseInt(minutesInput.value);

  if (isNaN(minutes) || minutes <= 0) {
    alert("Please enter a valid positive number for minutes.");
    return;
  }

  let seconds = minutes * 60;

  if (PausedTime > 0) {
    seconds = PausedTime;
    PausedTime = 0; // Reset PausedTime after resuming
  }

  countdownDisplay.textContent = `${Math.floor(seconds / 60)}m ${
    seconds % 60
  }s`;

  CountdownInterval = setInterval(() => {
    const minutesRemaining = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;

    countdownDisplay.textContent = `${minutesRemaining}m ${secondsRemaining}s`;

    // Update the progress bar width
    const totalSeconds = minutes * 60;
    const remainingPercentage = (seconds / totalSeconds) * 100;
    progressBar.style.width = `${100 - remainingPercentage}%`;

    if (seconds === 0) {
      clearInterval(CountdownInterval);
      countdownDisplay.textContent = "Time's up!";
      progressBar.style.width = "100%";
    }

    seconds--;
  }, 1000);
}

function pauseTimer() {
  clearInterval(CountdownInterval);

  // Save the value of the counter at paused moment
  PausedTime =
    parseInt(document.getElementById("countdown").textContent.split(" ")[0]) *
      60 +
    parseInt(document.getElementById("countdown").textContent.split(" ")[1]);
}

function resumeTimer() {
  startCountdown();
}

function stopTimer() {
  // Stop the current countdown if it's running
  clearInterval(CountdownInterval);
  CountdownInterval = 0;

  // Reset the UI elements
  const countdownDisplay = document.getElementById("countdown");
  const progressBar = document.getElementById("progress-bar");

  countdownDisplay.textContent = "";
  progressBar.style.width = "0%";
}

function restartTimer() {
  stopTimer();
  // If displayed, play button becomes pause button
  var icon = document.getElementById("playPauseIcon");
  if (icon.classList.contains("fa-play")) {
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  }

  PausedTime = 0;
  // Start a new countdown
  startCountdown();
}

PlayPauseButton.addEventListener("click", function () {
  var icon = document.getElementById("playPauseIcon");

  // Toggle between play and pause icons
  if (icon.classList.contains("fa-play")) {
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
    resumeTimer();
  } else {
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
    pauseTimer();
  }
});

RestartTimerButton.addEventListener("click", restartTimer);
StopTimerButton.addEventListener("click", stopTimer);
