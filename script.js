'use strict'

//selectors
let player; //decides which player is current
let cells = document.getElementsByClassName('cell'); //array of cells
const memoryX = {}; // object to mark the positions of each X
const memoryO = {}; //object to mark the positions of each O
const resetBtn = document.querySelector('.resetBtn');
const winner = document.querySelector('.winner');
const btnEasy = document.querySelector('.easy');
const btnHard = document.querySelector('.hard');
const btn1V1 = document.querySelector('.PVP');
const gameContainer = document.querySelector('.game');
const selectorContainer = document.querySelector('.difficulty');
const btnPlayer = document.querySelector('.player');
const btnPC = document.querySelector('.PC');
const btnPlayer0 = document.querySelector('.btnPlayer0');
const btnPlayer1 = document.querySelector('.btnPlayer1');
const selectPlayerContainer = document.querySelector('.selectPlayerStarter');
const selectPlayerOrPcContainer = document.querySelector('.selectPlayer');

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
    updateToStart();
}
function clearMemory() {
    for(const key in memoryX) delete memoryX[key];
    for(const key in memoryO) delete memoryO[key];
}

function addSelectedClass(currentCell) {
    currentCell.classList.add('selected');
    currentCell.classList.add(`selected${player}`);
    currentCell.textContent = player === 0 ? 'X' : 'O';

}
//selects the current cell and switches to the next player
function switchingPlayer(currentCell) {
    if(!currentCell.classList.contains(`selected`)) {
        addSelectedClass(currentCell);
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
    if(checkWin(arrO)) {
        for(const cell of cells) cell.classList.add('selected');
        winner.textContent = `Os Have Won!`;
        resetBtn.style.display = "inline";
        clearMemory();
    }
    else if(checkWin(arrX)) {
        for(const cell of cells) cell.classList.add('selected');
        winner.textContent = "Xs Have Won!"
        resetBtn.style.display = "inline";
        clearMemory();
    }
    //checks if no one won
    else if(arrX.length + arrO.length === 9) {
        resetBtn.style.display = 'inline';
        winner.textContent = 'Draw!';
        clearMemory();
    }
}
function updateGameDisplay() {
    selectorContainer.style.display = "none";
    selectPlayerContainer.style.display = "none";
    gameContainer.style.display = "inline";
}
function updateToStart() {
    selectorContainer.style.display = "inline";
    gameContainer.style.display = "none";
}
function setPlayer0() {
    player = 0;
    updateGameDisplay();
}
function setPlayer1() {
    player = 1;
    updateGameDisplay();
}
function setPlayer() {
    player = 0;
    selectPlayerOrPcContainer.style.display = "none";
    updateGameDisplay();
}

//sets the game to a 1V1 game
function set1V1() {
    selectPlayerContainer.style.display = "inline";
    selectorContainer.style.display = "none";
    btnPlayer0.addEventListener('click', setPlayer0);
    btnPlayer1.addEventListener('click', setPlayer1);
    for(let i=0;i<cells.length;i++) {
        const currentCell = cells[i];
        const gameEvents = function (){
        switchingPlayer(currentCell);
        pushToArr(currentCell, i);
        const arrX = Object.keys(memoryX);
        const arrO = Object.keys(memoryO); 
        declareWinner(arrX, arrO);
        }
        currentCell.addEventListener('click', gameEvents);
    }
}

const randomNum = () => Math.trunc(Math.random() * 9);

function createRandomCell() {
    let random = randomNum();
    let randomCell = cells[random];
    if(randomCell.classList.contains('selected')){
        random = randomNum();
        randomCell = cells[random];
    }
    return randomCell;
}
function getIndex(randomCell) {
    for(let i=0;i<cells.length;i++){
        if(cells[i] === randomCell) return i;
    }
}

function setEasy() {
    selectPlayerOrPcContainer.style.display = "inline";
    selectorContainer.style.display = "none";
    btnPlayer.addEventListener('click', setPlayer);
    for(let i=0;i<cells.length;i++) {
        const currentCell = cells[i];
        function gameEvents() {
            switchingPlayer(currentCell);
            const randomCell = createRandomCell();
            switchingPlayer(randomCell);
            const randomIndex = getIndex(randomCell);
            pushToArr(currentCell, i);
            pushToArr(randomCell,randomIndex);
            const arrX = Object.keys(memoryX);
            const arrO = Object.keys(memoryO);
            declareWinner(arrX,arrO);
        }
        currentCell.addEventListener('click',gameEvents);
    }
}
function setHard() {

}


//reset button
resetBtn.addEventListener('click', resetAll);
btnEasy.addEventListener('click', setEasy);
btn1V1.addEventListener('click', set1V1);
btnHard.addEventListener('click', setHard)