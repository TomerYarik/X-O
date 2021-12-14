'use strict'

let player = 0; //decides which player is current
let cells = document.getElementsByClassName('cell'); //array of cells
const memoryX = {}; // object to mark the positions of each X
const memoryO = {}; //object to mark the positions of each O
for(let i=0;i<cells.length; i++){
    const currentCell = cells[i];
    //switches the player and marks the cell as X or O
    const switchPlayer = function() {
        if(!currentCell.classList.contains(`selected`)) {
            currentCell.classList.add('selected');
            currentCell.classList.add(`selected${player}`);
            currentCell.textContent = player === 0 ? 'X' : 'O';
            player === 0 ? player++ : player--;
        }
        //pushes the Xs to the memoryX and the Os to memoryO
        currentCell.textContent === 'X' ? memoryX[i] = currentCell.textContent : memoryO[i] = currentCell.textContent; 
        const arrX = Object.keys(memoryX);
        const arrO = Object.keys(memoryO);
    }
    //every time the player clicks it calls the switchPlayer function
    currentCell.addEventListener('click', switchPlayer);
}

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