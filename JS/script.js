const board = (() =>{
    let gameboard =[];
    const createEmptyGameboard= () => {
        const Gameboard = function(cellName,value){
            return {cellName, value};
        };
            gameboard = [];
            for(let i =1; i <= 9;i++){
                gameboard.push(Gameboard('cell' + i, ''));
            }
        
        return gameboard;
    };
    
    const getBoardArray= () => {
        return gameboard;
    };
    const setValue = (boardIndex, currentPlayer) => {
        //prevents setting value to an already filled cell
        if(gameboard[boardIndex].value != '') return;
        
        gameboard[boardIndex].value = currentPlayer;
        return gameboard[boardIndex].value;
    };

    return {createEmptyGameboard, setValue,getBoardArray};
    })();

const Player = (sign) =>{
    return {sign};
};

const displayController =(() => {

    const displayMoves = () =>{
        let gameboard = board.getBoardArray();
        let cellValues = gameboard.filter(cellValue => cellValue.value != '');
        cellValues.forEach(cell => {
            let cellId = cell.cellName;
            document.querySelector(`#${cellId}`).textContent = cell.value;
        });

    };
    let resultMsgBox = document.createElement('div');
    let resultMsg = document.createElement('p');
    let playAgainBtn = document.createElement('button');
    const createMsgBox = () =>{
        
        resultMsgBox.setAttribute('class','game-result');
        setTimeout(function(){resultMsgBox.style.display = 'flex';},500);
        
        resultMsg.setAttribute('class','result-message');
        resultMsgBox.appendChild(resultMsg);
        document.querySelector('#container').appendChild(resultMsgBox);

        playAgainBtn.setAttribute('class','button play-again');
        playAgainBtn.textContent = 'Play Again'
        resultMsgBox.appendChild(playAgainBtn);
        
        gameFlow.playAgain(playAgainBtn,resultMsgBox);
    };
    
    const displayResult = (winner) => {
        gameOver = true;
        createMsgBox();
        let resultMsg = document.querySelector('.result-message');
        if(winner === 'playerX'){
            resultMsg.textContent = 'Congratulations!!! Player X Won';
        }else if(winner === 'playerO'){
            resultMsg.textContent = 'Congratulations!!! Player O Won';
        }else{
            resultMsg.textContent = 'It\'s A Tie';
        }
           
    };
    
    const clearCells = () => {
        let emptyCells = document.querySelectorAll('.cell');
        emptyCells.forEach(emptyCells =>{
            emptyCells.textContent = '';
        });
    };

    return {displayMoves,displayResult, clearCells};
    })();


const gameFlow = (() =>{
    let gameOver = false;
    let counter = 1;
    let playerX = Player('X').sign;
    let playerO = Player('O').sign;
    let gameboard = board.createEmptyGameboard();
    
    const playGame = () =>{
        let grid = document.querySelector('#grid');
        clickedCell = grid.childNodes;
        clickedCell.forEach(clicked => {
            clicked.addEventListener('click',(e) =>{
                if(gameOver == true) return;
                clickedCellId = e.target.getAttribute('id'); //get the id of the clicked div
                
                let boardIndex = gameboard.findIndex(gameboard => gameboard.cellName == clickedCellId);
                if(board.setValue(boardIndex, currentPlayer()) == undefined) return;
                displayController.displayMoves();
                counter++;
                checkGameState();
            });
        });
    };

    const currentPlayer = () => {
        if(counter % 2 !==0){
            return playerX;
        }else{
            return playerO;
        }
    };

    const checkGameState= () => {
        if(gameboard[0].value === 'X' && gameboard[1].value === 'X' && gameboard[2].value === 'X'
        ||  gameboard[3].value === 'X' && gameboard[4].value === 'X' && gameboard[5].value === 'X'
        ||  gameboard[6].value === 'X' && gameboard[7].value === 'X' && gameboard[8].value === 'X'
        ||  gameboard[0].value === 'X' && gameboard[3].value === 'X' && gameboard[6].value === 'X'
        ||  gameboard[1].value === 'X' && gameboard[4].value === 'X' && gameboard[7].value === 'X'
        ||  gameboard[2].value === 'X' && gameboard[5].value === 'X' && gameboard[8].value === 'X'
        ||  gameboard[2].value === 'X' && gameboard[4].value === 'X' && gameboard[6].value === 'X'
        ||  gameboard[0].value === 'X' && gameboard[4].value === 'X' && gameboard[8].value === 'X'
         ){
            displayController.displayResult('playerX');
            
        } else if(gameboard[0].value === 'O' && gameboard[1].value === 'O' && gameboard[2].value === 'O'
        ||  gameboard[3].value === 'O' && gameboard[4].value === 'O' && gameboard[5].value === 'O'
         ||  gameboard[6].value === 'O' && gameboard[7].value === 'O' && gameboard[8].value === 'O'
        ||  gameboard[0].value === 'O' && gameboard[3].value === 'O' && gameboard[6].value === 'O'
        ||  gameboard[1].value === 'O' && gameboard[4].value === 'O' && gameboard[7].value === 'O'
        ||  gameboard[2].value === 'O' && gameboard[5].value === 'O' && gameboard[8].value === 'O'
        ||  gameboard[2].value === 'O' && gameboard[4].value === 'O' && gameboard[6].value === 'O'
        ||  gameboard[0].value === 'O' && gameboard[4].value === 'O' && gameboard[8].value === 'O'
        ){
            displayController.displayResult('playerO');
            
        }
        if(counter > 9){
            displayController.displayResult('tie');
            
        }
    };

    const playAgain = (playAgainBtn,resultMsgBox) => {
        playAgainBtn.addEventListener('click',(e) => {
            resultMsgBox.style.display = 'none';
            gameboard = board.createEmptyGameboard();
            displayController.clearCells();
            counter = 1;
            gameOver = false;
        });
    };
    
    return {playGame, playAgain};
})();


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
        gameFlow.playGame();
    });
}
)();