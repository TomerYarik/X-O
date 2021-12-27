'use strict'

//selectors
let player; //decides which player is current
let cells = document.getElementsByClassName('cell'); //array of cells
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

function makeNestedArray(arrayOfCells) {
    let array = [];
    for(let i =0; i<arrayOfCells.length; i+= Math.sqrt(arrayOfCells.length)) {
        let smallArr = []
        for(let j=i; j<i+Math.sqrt(arrayOfCells.length);j++){
            smallArr.push(arrayOfCells[j].textContent);
        }
        array.push(smallArr);
    }
    return array;
}

const checkAllEqual = array => array.every(letter => letter === array[0]);

function winnerLetter(checkArr) {
    if(!checkArr.includes('')) {
        const equalLine = checkAllEqual(checkArr);
        if(equalLine) return checkArr[0];
    }
}

function checkHorizontal(array) {
    for(let i=0;i<array.length;i++) {
        const checkArr = array[i];
        if(!checkArr.includes('')) {
            const equalLine = checkAllEqual(checkArr);
            if(equalLine) return checkArr[0];
        }
    }
    return null;
}

function checkVertical(array) {
    for(let i=0;i<array.length;i++) {
        const checkArr = [];
        for(let j=0;j<array.length;j++) {
            checkArr.push(array[j][i]);
        }
        if(!checkArr.includes('')) {
            const equalLine = checkAllEqual(checkArr);
            if(equalLine) return checkArr[0];
        }
    }
    return null;
}

function checkLineLTR(array) {
    const checkArr = [];
    for(let i=0;i<array.length;i++) {
        checkArr.push(array[i][i]);
    }
    return winnerLetter(checkArr) || null;
}

function checkLineRTL(array) {
    const checkArr = [];
    let lastIndex = array.length-1;
    for(let i=0;i<array.length;i++){
        checkArr.push(array[i][lastIndex]);
        lastIndex--;
    }
    return winnerLetter(checkArr) || null;
}

//checks if someone won
const checkWin = function(arrayOfCells) {
    const array = makeNestedArray(arrayOfCells);
    const winner = checkHorizontal(array) || checkVertical(array) || checkLineLTR(array) || checkLineRTL(array) || null;
    if(winner !== null) declareWinner(winner);
}


const checkDraw = function() {

}

//resets the game
function resetAll() {
    for(let cell of cells) {
        cell.classList.remove('selected');
        cell.classList.remove('selected1') || cell.classList.remove('selected0');
        cell.textContent = '';
        player = null;
        winner.textContent = '';
    }
    resetBtn.style.display = 'none';
    updateToStart();
}

function addSelectedClass(currentCell) {
    currentCell.classList.add('selected');
    currentCell.classList.add(`selected${player}`);
    currentCell.textContent = player === 0 ? 'X' : 'O';
}
function switchPlayer() {
    if(resetBtn.style.display = 'hidden') player === 0 ? player++ : player--;
}
//selects the current cell and switches to the next player
function switchingPlayer(currentCell) {
    if(!currentCell.classList.contains(`selected`)) {
        addSelectedClass(currentCell);
        switchPlayer();
    }
}

//pushes the memory object keys to arrays
function pushToArr(currentCell, i) {
    currentCell.textContent === 'X' ? arrX.push(i) : arrO.push(i);
}

//decalers the winner
function declareWinner(winnerLetter) {
    //checks if someone won
    for(const cell of cells) cell.classList.add('selected');
    winner.textContent = `${winnerLetter}s HAVE WON!`;
    resetBtn.style.display = "inline";
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
            checkWin(cells);
            if(checkDraw(cells)) {
                console.log('entered draw');
                resetBtn.style.display = 'inline';
                winner.textContent = 'DRAW!';
            }
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
            pushToArr(currentCell, i);
            const randomCell = createRandomCell();
            switchingPlayer(randomCell);
            const randomIndex = getIndex(randomCell);
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