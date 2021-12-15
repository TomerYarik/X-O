'use strict'

let player = 0; //decides which player is current
let cells = document.getElementsByClassName('cell'); //array of cells
const memoryX = {}; // object to mark the positions of each X
const memoryO = {}; //object to mark the positions of each O
const resetBtn = document.querySelector('.resetBtn');
const winner = document.querySelector('.winner');
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

function switchingPlayer(currentCell) {
    if(!currentCell.classList.contains(`selected`)) {
    currentCell.classList.add('selected');
    currentCell.classList.add(`selected${player}`);
    currentCell.textContent = player === 0 ? 'X' : 'O';
    player === 0 ? player++ : player--;
    }
}

for(let i=0;i<cells.length; i++){
    const currentCell = cells[i];
    const gameEvents = function() {
        //switches the player and marks the cell as X or O
        switchingPlayer(currentCell);
        //pushes the Xs to the memoryX and the Os to memoryO
        currentCell.textContent === 'X' ? memoryX[i] = currentCell.textContent : memoryO[i] = currentCell.textContent;
        //makes arrays from the objects
        const arrX = Object.keys(memoryX);
        const arrO = Object.keys(memoryO);
        if(checkWin(arrX) || checkWin(arrO)) {
            for(const cell of cells) {
                cell.classList.add('selected');
            }
            player === 0 ? player++ : player--;
            resetBtn.style.display = 'inline';
            winner.textContent = `player ${player + 1} won!`;
        }
        if(arrX.length === 5 && arrO.length === 4) resetBtn.style.display = 'inline';
    }
    //every time the player clicks it calls the gameEvents function
    currentCell.addEventListener('click', gameEvents);
}
//reset button
resetBtn.addEventListener('click', resetAll);