'use strict';

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let currentscore, activeplayer, scores, playing;
const init = function () {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  currentscore = 0;
  activeplayer = 0;
  scores = [0, 0];
  playing = true;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};
init();

const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentscore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    if (dice != 1) {
      currentscore += dice;
      document.getElementById(
        `current--${activeplayer}`
      ).textContent = currentscore;
    } else {
      switchplayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  scores[activeplayer] += currentscore;
  document.getElementById(`score--${activeplayer}`).textContent =
    scores[activeplayer];
  if (scores[activeplayer] >= 40) {
    playing = false;
    diceEL.classList.add('hidden');
    document
      .querySelector(`.player--${activeplayer}`)
      .classList.add('player--winner');

    document
      .querySelector(`.player--${activeplayer}`)
      .classList.remove('player--active');
  } else {
    switchplayer();
  }
});

btnNew.addEventListener('click', init);
