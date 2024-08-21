/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

const { clear } = require('console');

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    board[position] = mark.toUpperCase();
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {
    console.log(`
      ${board[1]} | ${board[2]} | ${board[3]}
      ---+---+---
      ${board[4]} | ${board[5]} | ${board[6]}
      ---+---+---
      ${board[7]} | ${board[8]} | ${board[9]}
    `);
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) {
    // Check if the position is a valid number between 1 and 9 and not already occupied
    if (!isNaN(position) && position >= 1 && position <= 9 && board[position] === ' ') {
        return true;
    } else {
        return false;
    }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
    [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    for (let combination of winCombinations) {
        const [a, b, c] = combination;
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for (let i = 1; i <= 9; i++) {
        if (board[i] === ' ') {
            return false;
        }
    }
    return true;
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    console.log('Your turn player: ' + player);
    let position = prompt('Enter your move player ' + player + ": ");

    if(validateMove(position)) {
        markBoard(position, player);
        printBoard();
        if(checkWin(player)) {
            console.log("Winner Winner Chicken Dinner! Congratulations Player " + player + ".");
            return true;
        }
        if(checkFull(player)) {
            console.log("The game is tie!");
            return true;
        }
        return false;
    } else {
        console.log("Incorrect input. Please try again...");
        return null;
    }
}

// entry point of the whole program
function startGame() {
    console.log('Game started: \n\n' +
        ' 1 | 2 | 3 \n' +
        ' --------- \n' +
        ' 4 | 5 | 6 \n' +
        ' --------- \n' +
        ' 7 | 8 | 9 \n');

    let winnerIdentified = false;
    let currentTurnPlayer = 'X';

    while (!winnerIdentified) {
        let gameEnded = playTurn(currentTurnPlayer);
        if (gameEnded) {
            winnerIdentified = true; // Stop the game if it's ended
        } else if(gameEnded === false){
            // Switch player only if the move was valid and the game hasn't ended
            currentTurnPlayer = (currentTurnPlayer === 'X') ? 'O' : 'X';
        }
    }

    const playAgain = prompt('Do you want to play again (y/n)')
    if(playAgain === 'y') {
        board = {
            1: ' ', 2: ' ', 3: ' ',
            4: ' ', 5: ' ', 6: ' ',
            7: ' ', 8: ' ', 9: ' '
        };
        startGame();
    } else {
        console.log("Thanks for playing!");
    }
}
startGame();

// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
