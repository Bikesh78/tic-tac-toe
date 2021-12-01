const Gameboard = function(cellName,value){
    return {cellName,value};
};
let gameboard = [];
for(let i =1; i <= 9;i++){
    gameboard.push(Gameboard('cell' + i, ''));
}
