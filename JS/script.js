let game = (function(){
const Gameboard = function(cellName,value){
    return {cellName,value};
};
let gameboard = [];
for(let i =1; i <= 9;i++){
    gameboard.push(Gameboard('cell' + i, ''));
}

const PlayerOne = function(boardIndex){
    gameboard[boardIndex].value = 'X';
    return {gameboard};
}
const PlayerTwo = function(boardIndex){
    gameboard[boardIndex].value = 'O';
    return {gameboard};
}

let ratio = 0;
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
    resultMsgBox.style.display = 'flex';
    let resultMsg = document.createElement('p');
    resultMsgBox.appendChild(resultMsg);
    if(winner === 'playerOne'){
        resultMsg.textContent = 'The Winner Is Player One';
    }else if(winner === 'playerTwo'){
        resultMsg.textContent = 'The Winner Is Player Two';
    }else{
        resultMsg.textContent = 'It\'s A Tie';
    }
    document.querySelector('#container').appendChild(resultMsgBox);
    let playAgainBtn = document.createElement('button');
    playAgainBtn.setAttribute('class','button play-again');
    playAgainBtn.textContent = 'Play Again'
    resultMsgBox.appendChild(playAgainBtn);
    
};

return {
    // displayGame:displayGame,
    playGame: playGame
};
})();

// game.displayGame();
game.playGame();