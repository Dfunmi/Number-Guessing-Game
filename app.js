const scoreEl = document.getElementById('score')
const highScoreEl = document.getElementById('high-score')
const winsEl = document.getElementById('wins')
const historyEl = document.getElementById('history')
const guessInput = document.getElementById('guess-input')
const guessButton = document.getElementById('submit-btn')
const messageEl = document.getElementById('message')
const restartButton = document.getElementById('restart-button')
const attemptsEl = document.getElementById('attempts')

const maxAttempts = 10

let randomNumber;
let currentScore;
let attemptsLeft;
let guessHistory = []

let highScore = parseInt(localStorage.getItem('highScore')) || 0
let wins = parseInt(localStorage.getItem('wins')) || 0

function initGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1

    attemptsLeft = maxAttempts
    currentScore = 0
    guessHistory = []

    guessInput.disabled = false
    guessButton.disabled = false

    guessInput.value = ''
    messageEl.textContent = ''
    messageEl.className = ''
    messageEl.style.color = ''
    attemptsEl.textContent = `${attemptsLeft} attempts left`
    historyEl.classList.remove('visible')
    historyEl.innerHTML = ''
    updateScore()
}

function updateScore() {
    scoreEl.textContent = currentScore
    highScoreEl.textContent = highScore
    winsEl.textContent = wins
}

function saveToLocalStorage() {
    localStorage.setItem('highScore', highScore)
    localStorage.setItem('wins', wins)
}

function addToHistory(guess, result) {
    guessHistory.push({ guess, result })
    historyEl.classList.add('visible')
    
    historyEl.innerHTML = `
        <strong>Guess history:</strong>
        <ul style="list-style:none; padding:0; margin-top:10px;">
            ${guessHistory.map(item => `
                <li style="padding: 5px 0; border-bottom: 1px solid #eee;">
                    Guess: <strong>${item.guess}</strong> — ${item.result}
                </li>
            `).join('')}
        </ul>
    `
}

function handleGuess() {
    const guess = parseInt(guessInput.value)
    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageEl.textContent = 'Please enter a valid number between 1 and 100'
        messageEl.style.color = 'red'
        return
    }

    attemptsLeft--

    if (guess === randomNumber) {
        currentScore = attemptsLeft * 10

        if (currentScore > highScore) highScore = currentScore

        wins++

        saveToLocalStorage()
        
        updateScore()

        messageEl.textContent = `Correct! The number was ${randomNumber}. Your score: ${currentScore} points.`
        messageEl.style.color = 'green'
        addToHistory(guess, 'Correct!')
        endGame()

        return
    } else if (guess < randomNumber) {
        messageEl.textContent = 'Too low! Try a higher number.'
        messageEl.style.color = 'orange'
        addToHistory(guess, 'Too low')
    } else {
        messageEl.textContent = 'Too high! Try a lower number.'
        messageEl.style.color = 'orange'
        addToHistory(guess, 'Too high')
    }

    
    attemptsEl.textContent = `${attemptsLeft} attempts left`

    updateScore()

    if (attemptsLeft === 0 && guess !== randomNumber) {
        messageEl.textContent = `Game over! The correct number was ${randomNumber}.`
        messageEl.style.color = 'red'
        addToHistory(guess, 'Game Over')
        endGame()
        return
    }

    guessInput.value = ''
    guessInput.focus()
}

function endGame() {
    guessInput.disabled = true
    guessButton.disabled = true
}

guessButton.addEventListener('click', handleGuess)
restartButton.addEventListener('click', initGame)

guessInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        handleGuess()
    }
})

initGame()
