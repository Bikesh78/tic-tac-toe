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


let counter = 1;
const playerMove = function(){
    let clickedGrid = document.querySelector('#grid');
    clickedCell = clickedGrid.childNodes;
    clickedCell.forEach(clicked => {
        clicked.addEventListener('click',(e) =>{
            clickedCellId = e.target.getAttribute('id'); //get the id of the clicked div
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
            }            
        });
        
    });
}
//display user's input
const displayGame = function(){
    let cellValues = gameboard.filter(cellValue => cellValue.value != '');
    cellValues.forEach(cell => {
        let cellId = cell.cellName;
        document.querySelector(`#${cellId}`).textContent = cell.value;
    });
};
return {
    // displayGame:displayGame,
    playerMove: playerMove
};
})();

// game.displayGame();
game.playerMove();