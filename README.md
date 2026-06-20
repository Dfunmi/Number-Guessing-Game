# Number Guessing Game

A simple browser game built with vanilla HTML, CSS, and JavaScript.
Try to guess the secret number in as few attempts as possible; the faster you guess, the higher your score.

## How it works

The game picks a random number between 1 and 100. You have 10 attempts to guess it.
After each guess, you'll get a hint: too high, too low, or correct.
Your score is based on how many attempts you had remaining when you got it right.

## Features

- 🔢 Random number generated fresh every round
- 💡 Hot/cold hints after every guess
- 📊 Score, high score, and win counter tracked across sessions
- 📜 Guess history shown in real time
- ⌨️ Keyboard support, just hit Enter to submit
- 💾 High score and wins saved to localStorage so your progress sticks around

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript (no libraries or frameworks)

## Getting started

No installation needed. Just clone the repo and open `index.html` in your browser.

```bash
git clone https://github.com/dfunmi/number-guessing-game.git
cd number-guessing-game
open index.html
```

## How scoring works

Each correct guess earns you `attempts remaining × 10` points.
Guess it on the first try and you walk away with 90 points.
Wait until the last second and you'll scrape by with 0 — but a win is still a win.

## Contributing

Found a bug or have an idea for a feature? Feel free to open an issue or submit a pull request.
