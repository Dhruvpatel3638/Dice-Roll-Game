'use strict';

const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//starting Game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceImg.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
    activePlayer + 1
  }`;
};
init();

// switching the player
const switchPlayer = function () {
  currentScore = 0; //setting value to 0 as it moved to player 2
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // changing the ActivePLayer
  player0.classList.toggle('player--active'); // adding ot removing the class if it is not there
  player1.classList.toggle('player--active');
};

//roll button click handler
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // showing the image as per the random number
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${dice}.png`;

    // if the dice value is not one
    if (dice !== 1) {
      currentScore += dice; // adding the values to the currentScore
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //adding value to the ActivePlayer
    }
    // if the value is one
    else {
      switchPlayer();
    }
  }
});

// hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    //holding Value to socre
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // winner if score is 100
    if (scores[activePlayer] >= 100) {
      diceImg.classList.add('hidden');
      playing = false;
      //adding player--winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector(
        `#name--${activePlayer}`
      ).textContent = `🎉Winner🎉 Player ${activePlayer + 1}`;
    } else {
      switchPlayer();
    }
  }
});

// newgame
btnNew.addEventListener('click', init);
