// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const doubleOrNothingBtn = document.getElementById("double-or-nothing-btn")
const tripleOrRestartBtn = document.getElementById("triple-or-restart-btn")



// TO GET REGULAR DICE VALUE
 rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1

    if (player1Turn) {
        
        player1Score += randomNumber
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randomNumber
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"

    } else {
        player2Score += randomNumber
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = randomNumber
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"

    }
    
    declareWinner()
    hideOrShowTripleBtn()
})
 
 
 


//TO GET DOUBLE DICE VALUE OR ZERO DICE VALUE
doubleOrNothingBtn.addEventListener("click", function() {
    let doubleRandomNumber = (Math.floor(Math.random() * 6) + 1) *2
    //chanceNo for creating randomness
    const chanceNo = Math.floor(Math.random()*2)

 //For creating the double or nothing
 if (chanceNo) {
     doubleRandomNumber = doubleRandomNumber
 } else {
     doubleRandomNumber = 0
 }
    
if (player1Turn) {
        
        player1Score += doubleRandomNumber
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = doubleRandomNumber
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
    } else {
        
        player2Score += doubleRandomNumber
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = doubleRandomNumber
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"
    }
    
    declareWinner()
    hideOrShowTripleBtn() 
})



//TO GET TRIPLE DICE VALUE OR LOSE ALL YOUR SCORES
tripleOrRestartBtn.addEventListener("click", function() {
    let tripleRandomNumber = (Math.floor(Math.random() * 6) + 1) *3
    //chanceNo for creating randomness
    const chanceNo = Math.floor(Math.random()*2)+1

 //For creating the triple or reset score
 if (chanceNo === 1) {
     tripleRandomNumber = tripleRandomNumber
 } else {
     tripleRandomNumber = 0
     if (player1Turn){
         player1Score = 0
     } else {
         player2Score = 0
     }
 }
    
if (player1Turn) {
        player1Score += tripleRandomNumber
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = tripleRandomNumber
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
    } else {
        player2Score += tripleRandomNumber
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = tripleRandomNumber
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"
    }
    
    declareWinner()
    hideOrShowTripleBtn() 
})




// TO SHOW THE RESTART GAME BUTTON AND HIDE OTHERS
function showRestartButton() {
    rollBtn.style.display = "none"
    doubleOrNothingBtn.style.display = "none"
  //not needed  tripleOrRestartBtn.style.display = "none"
    resetBtn.style.display = "block"
}

//TO RESET/RESTART THE GAME. Note triple or restart option doesnt show at the start as it creates cheatmode
function restartGame() {
//const chanceNo = Math.floor(Math.random()*2)

//      //For Random/Fair Start
//   if (chanceNo) {
//      player1Turn = true    
//      message.textContent = "Player 1 Turn"  
//  } else {
//      player1Turn = !player1Turn
//      message.textContent = "Player 2 Turn"     
//  }    
  
        //For last round loser to start
    if (player1Score < player2Score){
     player1Turn = true    
     message.textContent = "Player 1 Turn"  
 } else {
     player1Turn = !player1Turn
     message.textContent = "Player 2 Turn"     
 }    
        
        
    player1Score = 0
    player2Score = 0
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"

    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
    doubleOrNothingBtn.style.display = "block"
  //not needed  tripleOrRestartBtn.style.display = "none"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
}

//Call Reset function on click
resetBtn.addEventListener("click", function(){
restartGame()
})


//TO SHOW TRIPLE DICE IF PLAYER SCORE IS 5
function hideOrShowTripleBtn() {
    if (player1Score >= 20 || player2Score >= 20){
        tripleOrRestartBtn.style.display = "none"
        return 
    }
    
    if ((player1Turn && player1Score > 4) || (!player1Turn && player2Score > 4)){
        tripleOrRestartBtn.style.display = "block"
    } else {        
        tripleOrRestartBtn.style.display = "none"
    }
}


//TO DECLARE WINNER
function declareWinner() {
        if (player1Score >= 20) {
        message.textContent = "Player 1 Won 🥳"
        showRestartButton()
    }  else if (player2Score >= 20) {
        message.textContent = "Player 2 Won 🎉"
        showRestartButton()
    }
    player1Turn = !player1Turn
}

// let canDrink = 20
// let drinkingAge = (canDrink >= 21) ? player1Score === 0: player1Score === 2


// console.log(drinkingAge)