let sentences = [
    "if i make a typo, i owe him a date.",
    "typing fast is cool, but can i type fast and still look pretty?",
    "This game has better structural integrity than my last project."
];

let currentSentenceIndex = 0;
let sentenceElement = document.getElementById("sentence");
let inputBox = document.getElementById("input-box");
let messageBox = document.getElementById("message");
let progressBar = document.getElementById("progress");
let timerElement = document.getElementById("timer");
let heartContainer = document.getElementById("heart-container");

let startTime;
let timerInterval;

function startGame() {
    sentenceElement.innerText = sentences[currentSentenceIndex];
    inputBox.value = "";
    messageBox.innerText = "";
    progressBar.style.width = "0%";
    startTime = new Date().getTime();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
    timerElement.innerText = `Time: ${elapsedTime}s`;
}

function checkTyping() {
    let typedText = inputBox.value;
    let correctText = sentences[currentSentenceIndex];

    let progress = (typedText.length / correctText.length) * 100;
    progressBar.style.width = `${progress}%`;

    if (typedText === correctText) {
        showSuccessMessage();
    } else {
        messageBox.innerText = "";
    }

    createFloatingHeart();
}

function showSuccessMessage() {
    clearInterval(timerInterval);
    let elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);

    if (currentSentenceIndex < sentences.length - 1) {
        messageBox.innerText = `Great! You did it in ${elapsedTime}s. Get ready for the next challenge! ❤️`;
        currentSentenceIndex++;
        setTimeout(startGame, 2000);
    } else {
        messageBox.innerText = `Wow! You finished all levels! You officially typed your way into my heart! 💖`;
        inputBox.disabled = true;
    }
}

function createFloatingHeart() {
    let heart = document.createElement("div");
    heart.innerText = "❤️";
    heart.classList.add("heart");
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 2000);
}

startGame();
