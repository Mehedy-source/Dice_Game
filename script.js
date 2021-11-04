'use strict';
// Selecting elements
let score1 = document.querySelector('#score--0')
let score2 = document.querySelector('#score--1')
let diceEl = document.querySelector('.dice')
let btnNew = document.querySelector('.btn--new')
let btnRoll = document.querySelector('.btn--roll')
let btnHold = document.querySelector('.btn--hold')
let currentEl1 = document.getElementById('current--0')
let currentEl2 = document.getElementById('current--1')

let player1 = document.querySelector('.player--0')
let player2 = document.querySelector('.player--1')
//additional variables


// Starting conditions
score1.textContent = 0
score2.textContent = 0
diceEl.style.visibility = 'hidden'
let currentScore = 0
let activePlayer = 0
let scores = [0,0]

const switchPlayer = function (){   
    document.querySelector(`#current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0
    player1.classList.toggle('player--active')
    player2.classList.toggle('player--active')
}

// Rolling dice functionality
//btnRoll
btnRoll.addEventListener('click',function(){
    // 1. generate a random dice roll [1-6]
    let dice = Math.trunc(Math.random()*6) + 1
    console.log(dice)

    // 2. display dice
    diceEl.style.visibility = ''
    diceEl.src = `dice-${dice}.png`

    // 3.  Check if 1 then switch to the next player
    if(dice != 1){
        // Add dice to current score
        currentScore += dice;

        activePlayer === 0? currentEl1.textContent = currentScore : currentEl2.textContent = currentScore;
        
    }else{
        // switch to the next player
        switchPlayer()
    }
})


//btnHold
btnHold.addEventListener('click',function(){
    //1. Add current score to active players score
    scores[activePlayer] += currentScore
    
    activePlayer === 0 ? score1.textContent=scores[activePlayer] : score2.textContent=scores[activePlayer];

    //2. Check if player's score is >= 30
    if(scores[activePlayer] >= 100){
        // finish game
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        document.querySelector(`#name--${activePlayer}`).textContent = 'WINNER!!!'

    }else{
        //3. Switch to next player
        switchPlayer()
    }

})


//btnNew
btnNew.addEventListener('click',function(){
    //1. Add current score to active players score
    finishGame()

})

function finishGame(){
    // Starting conditions
    score1.textContent = 0
    score2.textContent = 0
    diceEl.style.visibility = 'hidden'
    currentScore = 0
    scores = [0,0]

    document.querySelector(`#name--0`).textContent = 'PLAYER 1'
    document.querySelector(`#name--1`).textContent = 'PLAYER 2'
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')
    
    currentEl1.textContent = 0
    currentEl2.textContent = 0
    switchPlayer()
}