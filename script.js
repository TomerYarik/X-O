'use strict'

let player = 0; //decides which player is current
let cells = document.getElementsByClassName('cell'); //array of cells
const memoryX = {}; // object to mark the positions of each X
const memoryO = {}; //object to mark the positions of each O
const resetBtn = document.querySelector('.resetBtn');
const winner = document.querySelector('.winner');
//functions

//checks if the current array contains ine of the eight winning combos
const checkWin = function(array) {
    if(array.includes('0') && array.includes('1') && array.includes('2')) return true;
    else if(array.includes('0') && array.includes('3') && array.includes('6')) return true;
    else if(array.includes('0') && array.includes('4') && array.includes('8')) return true;
    else if(array.includes('1') && array.includes('4') && array.includes('7'))  return true;
    else if(array.includes('2') && array.includes('5') && array.includes('8')) return true;
    else if(array.includes('2') && array.includes('4') && array.includes('6')) return true;
    else if(array.includes('3') && array.includes('4') && array.includes('5')) return true;
    else if(array.includes('6') && array.includes('7') && array.includes('8')) return true;
    else {
        return false;
    }
}

//resets the game
function resetAll() {
    for(let cell of cells) {
        cell.classList.remove('selected');
        cell.classList.remove('selected1') || cell.classList.remove('selected0');
        cell.textContent = '';
        player =0;
        for(const key of Object.keys(memoryO)) delete memoryO[key];
        for(const key of Object.keys(memoryX)) delete memoryX[key];
        winner.textContent = '';
    }
    resetBtn.style.display = 'none';
}
//selects the current cell and switches to the next player
function switchingPlayer(currentCell) {
    if(!currentCell.classList.contains(`selected`)) {
    currentCell.classList.add('selected');
    currentCell.classList.add(`selected${player}`);
    currentCell.textContent = player === 0 ? 'X' : 'O';
    if(resetBtn.style.display = 'hidden') player === 0 ? player++ : player--;
    }
}

//pushes the memory object keys to arrays
function pushToArr(currentCell, i) {
    currentCell.textContent === 'X' ? memoryX[i] = currentCell.textContent : memoryO[i] = currentCell.textContent;
}

//checks if someone won, and if so, declares who won, else ddeclares draw
function declareWinner(arrX ,arrO) {
    //checks if someone won
    if(checkWin(arrO) || checkWin(arrX)) {
        for(const cell of cells) cell.classList.add('selected');
        checkWin(arrX) ? player = 0 : player = 1 ;
        resetBtn.style.display = 'inline';
        winner.textContent = `player ${player + 1} won!`;
    }
    //checks if no one won
    else if(arrX.length === 5 && arrO.length === 4) {
        resetBtn.style.display = 'inline';
        winner.textContent = 'Draw!';
    }
}

for(let i=0;i<cells.length; i++){
    const currentCell = cells[i];
    const gameEvents = function() {
        //switches the player and marks the cell as X or O
        switchingPlayer(currentCell);
        //pushes the Xs to the memoryX and the Os to memoryO
        pushToArr(currentCell, i);
        //makes arrays from the objects
        const arrX = Object.keys(memoryX);
        const arrO = Object.keys(memoryO);
        //checks if someone won and if so, declares the winner
        declareWinner(arrX, arrO);
    }
    //every time the player clicks it calls the gameEvents function
    currentCell.addEventListener('click', gameEvents);
}

//reset button
resetBtn.addEventListener('click', resetAll);