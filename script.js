'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting condition
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// Switch Player
const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
const rollFunc = () => {
  if (!playing) return;

  // 1. Generate a random dice roll
  const dice = Math.floor(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // 3. Check for rolled 1
  if (dice !== 1) {
    // Add dice roll to current score
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Switch to next player
    switchPlayer();
  }
};

const holdFunc = () => {
  if (!playing) return;

  // Add current score to active player's score
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];

  // check if plyer's score is >= 100
  if (scores[activePlayer] >= 100) {
    // Finish the game

    playing = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    // switch to the next player
    switchPlayer();
  }
};

// Dice roll listener
btnRoll.addEventListener('click', rollFunc);

// Hold score listener
btnHold.addEventListener('click', holdFunc);

// New game
btnNew.addEventListener('click', init);

// Keyboard event listeners
document.addEventListener('keydown', event => {
  if (event.code === 'Space') rollFunc();
  if (event.code === 'Enter') holdFunc();
  if (event.code === 'Escape') init();
});
