let game = (function(){
const Gameboard = function(cellName,value){
    return {cellName,value};
};
let gameboard;
let createEmptyBoard = () => {
    gameboard = [];
    for(let i =1; i <= 9;i++){
        gameboard.push(Gameboard('cell' + i, ''));
    }
}
createEmptyBoard();

const PlayerOne = function(boardIndex){
    gameboard[boardIndex].value = 'X';
    return {gameboard};
}
const PlayerTwo = function(boardIndex){
    gameboard[boardIndex].value = 'O';
    return {gameboard};
}


let gameStatus = 'not over';
let counter = 1;
const playGame = function(){
    let clickedGrid = document.querySelector('#grid');
    clickedCell = clickedGrid.childNodes;
    clickedCell.forEach(clicked => {
        clicked.addEventListener('click',(e) =>{
            if(gameStatus == 'not over'){
                clickedCellId = e.target.getAttribute('id'); //get the id of the clicked div
            }
            
            gameboardIndex = gameboard.findIndex(gameboard => gameboard.cellName === clickedCellId); //find index nuber of the array whose cellName matches with the id name of the div
            
            //only accepts input when the cell is empty
            if(gameboard[gameboardIndex].value == ''){
                //if counter is odd player one's turn else player two's turn
                if(counter % 2 !==0){
                    PlayerOne(gameboardIndex);
                }else{
                    PlayerTwo(gameboardIndex);
                }
                counter++;
                displayGame();
                if(counter > 5){
                    checkGameState();
                }
                if(counter > 9){
                    displayResult('draw');
                }
            }            
        });
        
        
        
    });
}
const checkGameState = () =>{
    if(gameboard[0].value === 'X' && gameboard[1].value === 'X' && gameboard[2].value === 'X'
       ||  gameboard[3].value === 'X' && gameboard[4].value === 'X' && gameboard[5].value === 'X'
       ||  gameboard[6].value === 'X' && gameboard[7].value === 'X' && gameboard[8].value === 'X'
       ||  gameboard[0].value === 'X' && gameboard[3].value === 'X' && gameboard[6].value === 'X'
       ||  gameboard[1].value === 'X' && gameboard[4].value === 'X' && gameboard[7].value === 'X'
       ||  gameboard[2].value === 'X' && gameboard[5].value === 'X' && gameboard[8].value === 'X'
       ||  gameboard[2].value === 'X' && gameboard[4].value === 'X' && gameboard[6].value === 'X'
       ||  gameboard[0].value === 'X' && gameboard[4].value === 'X' && gameboard[8].value === 'X'
        ){
        displayResult('playerOne');
    } else if(gameboard[0].value === 'O' && gameboard[1].value === 'O' && gameboard[2].value === 'O'
    ||  gameboard[3].value === 'O' && gameboard[4].value === 'O' && gameboard[5].value === 'O'
    ||  gameboard[6].value === 'O' && gameboard[7].value === 'O' && gameboard[8].value === 'O'
    ||  gameboard[0].value === 'O' && gameboard[3].value === 'O' && gameboard[6].value === 'O'
    ||  gameboard[1].value === 'O' && gameboard[4].value === 'O' && gameboard[7].value === 'O'
    ||  gameboard[2].value === 'O' && gameboard[5].value === 'O' && gameboard[8].value === 'O'
    ||  gameboard[2].value === 'O' && gameboard[4].value === 'O' && gameboard[6].value === 'O'
    ||  gameboard[0].value === 'O' && gameboard[4].value === 'O' && gameboard[8].value === 'O'
     ){
     displayResult('playerTwo');
 }
};
//display user's input
const displayGame = function(){
    let cellValues = gameboard.filter(cellValue => cellValue.value != '');
    cellValues.forEach(cell => {
        let cellId = cell.cellName;
        document.querySelector(`#${cellId}`).textContent = cell.value;
    });
    
};

const displayResult = (winner) =>{
    gameStatus = 'over';
    let resultMsgBox = document.createElement('div');
    resultMsgBox.setAttribute('class','game-result');
    setTimeout(function(){resultMsgBox.style.display = 'flex';},500);
    let resultMsg = document.createElement('p');
    resultMsgBox.appendChild(resultMsg);
    if(winner === 'playerOne'){
        resultMsg.textContent = 'Congratulations!!! Player One Won';
    }else if(winner === 'playerTwo'){
        resultMsg.textContent = 'Congratulations!!! Player Two Won';
    }else{
        resultMsg.textContent = 'It\'s A Tie';
    }
    document.querySelector('#container').appendChild(resultMsgBox);
    let playAgainBtn = document.createElement('button');
    playAgainBtn.setAttribute('class','button play-again');
    playAgainBtn.textContent = 'Play Again'
    resultMsgBox.appendChild(playAgainBtn);
    playAgainBtn.addEventListener('click',(e)=> {
        createEmptyBoard();
        clearCells();
        counter = 1;
        gameStatus = 'not over';
        resultMsgBox.style.display = 'none';
    });
};

//clears textcontent of cells
const clearCells = () => {
    let emptyCells = document.querySelectorAll('.cell');
    emptyCells.forEach(emptyCells =>{
        emptyCells.textContent = '';
    });
};
return {
    // displayGame:displayGame,
    playGame: playGame
};
})();

// game.displayGame();
// game.playGame();

let startPage = (function(){
    let body = document.querySelector('body');
    let grid = document.querySelector('#grid');
    grid.style.display = 'none';
    let header = document.querySelector('.header');
    header.style.display = 'none';
    let welcomePage = document.createElement('div');
    welcomePage.setAttribute('id','welcome-page');
    body.appendChild(welcomePage);
    let welcomeMessage = document.createElement('p');
    welcomeMessage.textContent = 'Tic Tac Toe';
    welcomeMessage.setAttribute('class','welcome-message');
    welcomePage.appendChild(welcomeMessage);
    let startBtn = document.createElement('button');
    startBtn.setAttribute('class','button start')
    startBtn.textContent = 'Start';
    welcomePage.appendChild(startBtn);
    startBtn.addEventListener('click',() => {
        welcomePage.style.display = 'none';
        grid.style.display = 'block';
        header.style.display = 'block';
        game.playGame();
    });
}
)();
