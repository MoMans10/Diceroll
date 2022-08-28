'use strict';
const playerActive = document.querySelector('player--active');
const scorEl0 = document.querySelector('#score--0');
const scorEl1 = document.querySelector('#score--1');
scorEl0.textContent = 0;
scorEl1.textContent = 0;
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const img = document.querySelector('.dice');
img.classList.add('hidden');
let currentL = document.querySelector('#current--0');
let currentLscore = 0;
let currentR = document.querySelector('#current--1');
let currentRscore = 0;
const roll = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const hold = document.querySelector('.btn--hold');

const rollDice = function () {
  let diceRoll = Math.trunc(Math.random() * 6) + 1;
  img.src = `dice-${diceRoll}.png`;
  img.classList.remove('hidden');
  if (player0.classList.contains('player--active')) {
    if (diceRoll != 1) {
      currentLscore += diceRoll;
      currentL.textContent = currentLscore;
    } else {
      currentL.textContent = 0;
      currentLscore = 0;
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    }
  } else if (player1.classList.contains('player--active')) {
    if (diceRoll != 1) {
      currentRscore += diceRoll;
      currentR.textContent = currentRscore;
    } else {
      currentR.textContent = 0;
      currentRscore = 0;
      player1.classList.remove('player--active');
      player0.classList.add('player--active');
    }
  }
};
const addNewRoll = function () {
  roll.addEventListener('click', rollDice);
};
const stopRoll = function () {
  roll.removeEventListener('click', rollDice);
};

const stopHold = function () {
  hold.removeEventListener('click', holdGame);
};
const holdGame = function () {
  if (player0.classList.contains('player--active')) {
    scorEl0.textContent = +scorEl0.textContent + currentLscore;
    if (scorEl0.textContent >= 100) {
      player0.classList.add('player--winner');
      stopRoll();
      roll.classList.add('no-pointer');
      stopHold();
      hold.classList.add('no-pointer');
    } else {
      currentLscore = 0;
      currentL.textContent = 0;
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    }
  } else if (player1.classList.contains('player--active')) {
    scorEl1.textContent = +scorEl1.textContent + currentRscore;
    scorEl1.textContent = +scorEl1.textContent + currentLscore;
    if (scorEl1.textContent >= 100) {
      player1.classList.add('player--winner');
      stopRoll();
      roll.classList.add('no-pointer');
      stopHold();
      hold.classList.add('no-pointer');
    } else {
      currentRscore = 0;
      currentR.textContent = 0;
      player0.classList.add('player--active');
      player1.classList.remove('player--active');
    }
  }
};
const addNewHold = function () {
  hold.addEventListener('click', holdGame);
};
const doNewGame = function () {
  scorEl0.textContent = 0;
  scorEl1.textContent = 0;
  currentL.textContent = 0;
  currentLscore = 0;
  currentR.textContent = 0;
  currentRscore = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  roll.classList.remove('no-pointer');
  hold.classList.remove('no-pointer');
  addNewRoll();
  addNewHold();
  img.classList.add('hidden');
  if (player1.classList.contains('player--active')) {
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
  }
};
newGame.addEventListener('click', doNewGame);
addNewRoll();
addNewHold();
