let game = (function(){
const Gameboard = function(cellName,value){
    return {cellName,value};
};
let gameboard = [];
for(let i =1; i <= 9;i++){
    gameboard.push(Gameboard('cell' + i, ''));
}

gameboard[0].value = 'x';
gameboard[5].value = 'o';

//display user's input
const displayGame = function(){
    let cellValues = gameboard.filter(cellValue => cellValue.value != '');
    cellValues.forEach(cell => {
        let cellId = cell.cellName;
        console.log(cellId);
        document.querySelector(`#${cellId}`).textContent = cell.value;
    });

    console.log(cellValues);

};
return {
    displayGame:displayGame
};
})();

game.displayGame();