
let timer;
let timeElapsed = 0;
let wordCount = 0;
const sentences = [
    "The quick brown fox jumps over the lazy dog.",
     "How razorback-jumping frogs can level six piqued gymnasts!",
      "Pack my box with five dozen liquor jugs.", "Jackdaws love my big sphinx of quartz.",
       "The five boxing wizards jump quickly.", "“Sure,” she said, “let's do it at 3 o'clock!”",
        "He scored 98.7% in his math exam!", 
    "Email me at john.doe@example.com.", "You’ll need a username and password: admin123#.", "On a dark, stormy night, 42 ghosts screamed for help!"
];

let currentSentence = '';
let currentIndex = 0;
let mistakes = 0;
let correctChars = 0;

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', restartGame);
document.getElementById('text-input').addEventListener('input', checkTyping);

function startGame() {
    document.getElementById('text-input').value = '';
    document.getElementById('text-input').removeAttribute('disabled');
    document.getElementById('restart-btn').style.display = 'block';
    currentSentence = getRandomSentence();
    document.getElementById('text-display').innerHTML = currentSentence;
    timeElapsed = 0;
    wordCount = 0;
    currentIndex = 0;
    mistakes = 0;
    correctChars = 0;
    timer = setInterval(updateTimer, 1000);
}

function restartGame() {
    clearInterval(timer);
    startGame();
}

function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

function updateTimer() {
    timeElapsed++;
    document.getElementById('timer').innerText = `Time: ${timeElapsed}s`;
    calculateSpeed();
}

function checkTyping() {
    const textInput = document.getElementById('text-input').value;
    const textDisplay = document.getElementById('text-display');

    // Reset counters on each input change
    mistakes = 0;
    correctChars = 0;

    for (let i = 0; i < textInput.length; i++) {
        if (textInput[i] !== currentSentence[i]) {
            highlightText(i);
            mistakes++;
        } else {
            correctChars++;
        }
    }

    if (textInput === currentSentence) {
        clearInterval(timer);
        document.getElementById('text-input').setAttribute('disabled', 'true');
    }

    textDisplay.innerHTML = currentSentence;
    calculateAccuracy();
}

function highlightText(index) {
    const textDisplay = document.getElementById('text-display');
    textDisplay.innerHTML = currentSentence.substring(0, index) +
        `<span class="mistake">${currentSentence[index]}</span>` +
        currentSentence.substring(index + 1);
}

function calculateSpeed() {
    wordCount = currentSentence.split(' ').length;
    const speed = Math.round((wordCount / timeElapsed) * 60);
    document.getElementById('speed').innerText = `Speed: ${speed} WPM`;
}

function calculateAccuracy() {
    const textInput = document.getElementById('text-input').value.length;
    const totalTyped = mistakes + correctChars;
    const accuracy = totalTyped ? ((correctChars / totalTyped) * 100) : 100;
    document.getElementById('accuracy').innerText = `Accuracy: ${accuracy.toFixed(2)}%`;
}
