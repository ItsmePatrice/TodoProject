import StorageManager from "./StorageManager.js";
import DisplayManager from "./DisplayManager.js";

//const nameForm = document.getElementsByClassName("nameForm");
const toDoForm = document.getElementById("todoform");

let storageManager = new StorageManager();
let displayManager = new DisplayManager();

let uncheckedCircleIcon = document.getElementsByClassName("bi bi-circle");
let checkedCircleIcon = document.getElementsByClassName(
  "bi bi-check-circle-fill"
);

// Add an extra funtionality to take in the user's name
//userName = undefined;

/*nameForm.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent the page from reloading
  userName = document.getElementById("userName").value;
});*/

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

function deleteTodoById(id) {
  storageManager.deleteTodoById(id);
  displayManager.deleteTodoById(id);
}

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

// Add this to your existing JavaScript code
const quotesAndTips = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
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

// Section for the countdown timer
function startCountdown() {
  const minutesInput = document.getElementById("countdown-minutes");
  const countdownDisplay = document.getElementById("countdown");
  const progressBar = document.getElementById("progress-bar");

  const minutes = parseInt(minutesInput.value);

  if (isNaN(minutes) || minutes <= 0) {
    alert("Please enter a valid positive number for minutes.");
    return;
  }

  let seconds = minutes * 60;

  countdownDisplay.textContent = `${minutes}m 0s`;

  const countdownInterval = setInterval(() => {
    const minutesRemaining = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;

    countdownDisplay.textContent = `${minutesRemaining}m ${secondsRemaining}s`;

    // Update the progress bar width
    const totalSeconds = minutes * 60;
    const remainingPercentage = (seconds / totalSeconds) * 100;
    progressBar.style.width = `${100 - remainingPercentage}%`;

    if (seconds === 0) {
      clearInterval(countdownInterval);
      countdownDisplay.textContent = "Time's up!";
      progressBar.style.width = "100%";
    }

    seconds--;
  }, 1000);
}
