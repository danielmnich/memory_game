document.addEventListener("DOMContentLoaded", main());
const memoryGame = {
	tileCount : 20, // number of tiles in the game
	tileOnRow : 5, // number of tiles in a row
	divBoard : null, //div with the game board
	divScore : null, //div with the score
	tiles : [], // here comes the mixed tiles table
	tilesChecked : [], // marked tiles
	moveCount : 0, // number of moves
	tilesImg : [ //pictures fo the tiles
		'tile_1.png',
		'tile_2.png',
		'tile_3.png',
		'tile_4.png',
		'tile_5.png',
		'tile_6.png',
		'tile_7.png',
		'tile_8.png',
		'tile_9.png',
		'tile_10.png',
	],
	canGet : true, // are the tiles clickable
	tilePairs : 0, // number of paired tiles

	tileClick : function(e){
		if(this.canGet){
			if(!this.tilesChecked[0] || (this.tilesChecked[0].dataset.index !== e.target.dataset.index)){
				this.tilesChecked.push(e.target);
				e.target.style.backgroundImage = `url(${this.tilesImg[e.target.dataset.cardType]})`;
			}
			if(this.tilesChecked.length === 2){
				this.canGet = false;

				if (this.tilesChecked[0].dataset.cardType === this.tilesChecked[1].dataset.cardType) {
					setTimeout(this.deleteTiles.bind(this), 500);
				} else {
					setTimeout(this.resetTiles.bind(this), 500);
				}
				this.moveCount++;
				this.divScore.innerHTML = this.moveCount;
			}
		}
	},
deleteTiles : function() {
	this.tilesChecked[0].remove();
	this.tilesChecked[1].remove();

	this.canGet = true;
	this.tilesChecked = [];

	this.tilePairs++;
	if (this.tilePairs >= this.tileCount / 2) {

	}
}
}
this.startGame = function(){
	//clearing the board as the game can start multiple times one after another
	this.gameBoard = document.querySelector('.game-board');
	this.gameBoard.innerHTML = '';

	//clearing the game score
	this.gameScore = document.querySelector(".game-score");
	this.gameScore.innerHTML = "";

	//clearing the variables
	this.tiles = [];
	this.tilessChecked = [];
	this.moveCount = 0;

	// generating a table with tiles (in pairs)
	for (let i = 0; i < tileCount; i++){
		this.tile.push(Math.floor(i/2));
	}

	//mixing the tiles in the table
	for (let i = this.tileCount - 1 ; i > 0; i --){
		const swap = Math.floor(Math.random()*i);
		const tmp = this.tiles[i];
		this.tiles[i] = this.tiles[swap];
		this.tiles[swap] = tmp;
	}

}