const memoryGame = {
	tileCount : 20,
	tileOnRow : 5,
	divBoard : null,
	divScore : null,
	tiles : [],
	tilesChecked : [],
	moveCount : 0,
	tilesImg : [
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
	canGet : true,
	tilePairs : 0,

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
this.startGame =()=>{

	this.gameBoard = document.querySelector('.game-board');
	this.gameBoard.innerHTML = '';


	this.gameScore = document.querySelector(".game-score");
	this.gameScore.innerHTML = "";


	this.tiles = [];
	this.tilessChecked = [];
	this.moveCount = 0;


	for (let i = 0; i < tileCount; i++){
		this.tile.push(Math.floor(i/2));
	}


	for (let i = this.tileCount - 1 ; i > 0; i --){
		const swap = Math.floor(Math.random()*i);
		const tmp = this.tiles[i];
		this.tiles[i] = this.tiles[swap];
		this.tiles[swap] = tmp;
	}

	for (let i = 0; i < this.tileCount; i++){
		const tile = document.createElement("div");
		tile.classList.add("game-tile");
		this.divBoard.appendChild(tile);

		tile.dataset.cardType = this.tiles[i];
		tile.dataset.index = i;


		tile.style.left = 5 + (tile.offsetWidth + 10) * (i % this.tileOnRow) + 'px';
		tile.style.top = 5 + (tile.offsetHeight + 10) * (Math.floor(i / this.tileOnRow)) + 'px';

		tile.addEventListener('click', this.tileClick.bind(this));
	}

}

document.addEventListener("DOMContentLoaded", function(){
	document.querySelector(".game-start").addEventListener('click', function(){
		memoryGame.startGame();
	});
});