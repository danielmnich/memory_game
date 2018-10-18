
const memoryGame = {
    tileCount : 20, // number of tiles in the game
    tileOnRow : 5, // number of tiles in a row
    divBoard : null, //div with the game board
    divScore : null, //div with the score
    tiles : [], // here comes the mixed tiles table
    tilesChecked : [], // marked tiles
    moveCount : 0, // number of moves
    tilesImg : [ //pictures fo the tiles
		'images/tile_1.png',
		'images/tile_2.png',
		'images/tile_3.png',
		'images/tile_4.png',
		'images/tile_5.png',
		'images/tile_6.png',
		'images/tile_7.png',
		'images/tile_8.png',
		'images/tile_9.png',
		'images/tile_10.png',
    ],
    canGet : true, // are the tiles clickable
    tilePairs : 0, // number of paired tiles

    tileClick : function(e) {
        if (this.canGet) {

            if (!this.tilesChecked[0] || (this.tilesChecked[0].dataset.index !== e.target.dataset.index)) {
                this.tilesChecked.push(e.target);
                e.target.style.backgroundImage = `url(${ this.tilesImg[e.target.dataset.cardType]})`;
            }

            if (this.tilesChecked.length === 2) {
                this.canGet = false;

                if (this.tilesChecked[0].dataset.cardType === this.tilesChecked[1].dataset.cardType) {
                    setTimeout(this.deleteTiles.bind(this), 500);
                } else {
                    setTimeout(this.resetTiles.bind(this), 500);
                }

                this.moveCount++;
                this.divScore.innerHTML = `Moves: ${this.moveCount}`;
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
			alert('gameOver!');
        }
    },

    resetTiles : function() {
        this.tilesChecked[0].style.backgroundImage = 'url(images/title.png)';
        this.tilesChecked[1].style.backgroundImage = 'url(images/title.png)';

        this.tilesChecked = [];
        this.canGet = true;
    },

    startGame : function() {
        //clearing the board as the game can start multiple times one after another
        this.divBoard = document.querySelector('.game-board');
		this.divBoard.innerHTML = '';

        //clearing the game score
        this.divScore = document.querySelector('.game-score');
        this.divScore.innerHTML = '';

        //clearing the variables
        this.tiles = [];
        this.tilesChecked = [];
        this.moveCount = 0;
        this.canGet = true;
        this.tilePairs = 0;

       // generating a table with tiles (in pairs)
        for (let i=0; i<this.tileCount; i++) {
            this.tiles.push(Math.floor(i/2));
        }

        //mixing the tiles in the table
        for (let i=this.tileCount-1; i>0; i--) {
            const swap = Math.floor(Math.random()*i);
            const tmp = this.tiles[i];
            this.tiles[i] = this.tiles[swap];
            this.tiles[swap] = tmp;
        }

        for (let i=0; i<this.tileCount; i++) {
            const tile = document.createElement('div');
            tile.classList.add("game-tile");
            this.divBoard.appendChild(tile);

            tile.dataset.cardType = this.tiles[i];
            tile.dataset.index = i;

            tile.style.left =`${5 + (tile.offsetWidth+10) * (i%this.tileOnRow)}px`;
            tile.style.top = `${5 + (tile.offsetHeight+10) * (Math.floor(i/this.tileOnRow))}px`;

            tile.addEventListener('click', this.tileClick.bind(this));
		}



    }
}

// function styles (button){
//     button.addEventListener('mouseover', function onMouseOver() {
//         const gameStartBtn = document.querySelector('.game-start');
//         const divBoard = document.querySelector(".game-board"), ':before';
//         divBoard.style.padding = "190px 0 254px 0";
//     });
// }

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.game-start').addEventListener('click', function() {
        memoryGame.startGame();
    });
});


// top: 0;
// padding: 190px 0 254px 0;