
function Game()
{
  this.score = 0;
  this.scoreView = document.getElementById("score");

  this.updateScore = function(score)
  {
    this.score = score;
    this.scoreView.innerText = this.score;
  }

  this.addScore = function(score)
  {
    this.score += score;
    this.scoreView.innerText = this.score;
  }

  this.pieceColors = ["#93CB4C", "#F170A0", "#2290FF", "#FCBE5B", "#A35ECD"];
  this.piecesMatrix = new Array();
  this.generatePieces = function()
  {
    // This is just a temporary thing because this function will eventually
    // generete random pieces with random score points

    this.piecesMatrix.push([  [2, 2, 2],
                              [0, 0, 2],
                              [0, 0, 2]
                            ]);

    this.piecesMatrix.push([  [5, 5, 5],
                              [5, 5, 5],
                              [5, 5, 5]
                            ]);

        this.piecesMatrix.push([  [5, 5],
                                  [5, 5]
                                ]);

    this.piecesMatrix.push([  [3, 0, 0],
                              [3, 0, 0],
                              [3, 3, 3]
                            ]);

    this.piecesMatrix.push([  [2, 2],
                              [2, 0]
                            ]);

    this.piecesMatrix.push([  [2]
                            ]);

    this.piecesMatrix.push([  [2],
                              [2]
                              ]);

    this.piecesMatrix.push([  [3],
                              [3],
                              [3]
                              ]);

                              this.piecesMatrix.push([  [3],
                                                        [3],
                                                        [3],
                                                        [3]
                                                        ]);

      this.piecesMatrix.push([ [3,3,3,3] ]);
      this.piecesMatrix.push([ [3,3,3] ]);
      this.piecesMatrix.push([ [3,3] ]);
  };
  this.generatePieces();



  /*
  Add a random piece to the 'board' starting on position 'x' and 'y'
  */
  this.addRandomPiece = function(board, x, y)
  {
    let pieceColor = this.pieceColors[getRandomNumber(0,this.pieceColors.length)];
    let pieceMatrix = this.piecesMatrix[getRandomNumber(0,this.piecesMatrix.length)];

    for(let boardX = 0; boardX < board.grid.length;++boardX)
    {
      for(let boardY = 0; boardY < board.grid[boardX].length; ++boardY)
      {
        let block = null;
        if(
          boardX < pieceMatrix.length &&
          boardY < pieceMatrix[boardX].length &&
          pieceMatrix[boardX][boardY]!=0)
        {
          block = new Block(pieceColor, pieceMatrix[boardX][boardY], true);
        }

        board.addNewBlockAndRender(block, boardX, boardY, true);
      }
    }
  };



  this.soundRowColumnFull = [new Sound("sounds/mixkit-flute-music-notification-2311.wav"),
  new Sound("sounds/mixkit-uplifting-flute-2314.wav"),
  new Sound("sounds/mixkit-uplifting-flute-notification-2317.wav"),
  new Sound("sounds/mixkit-flute-mobile-phone-notification-alert-2316.wav")];

  this.playSoundRowColumnFull = function()
  {
    this.soundRowColumnFull[getRandomNumber(0,this.soundRowColumnFull.length)].play();
  };
  this.soundGameBegin = new Sound("sounds/mixkit-melodical-flute-music-notification-2310.wav");
  this.soundBlockPlaced =
    [new Sound("sounds/mixkit-bike-magical-bell-591.wav", 0.3),
    new Sound("sounds/mixkit-drum-and-percussion-545.wav", 0.3)];
  this.playSoundBlockPlaced = function()
  {
    this.soundBlockPlaced[getRandomNumber(0,this.soundBlockPlaced.length)].play();
  };

  this.soundAmbient = new Sound("sounds/mixkit-drumming-atmospheric-570.wav", 0.4);

  this.beginGame = function()
  {
    this.board = new Board("boardID", "grid-container", 10, 10);
    this.board.createGrid();
    this.board.render();

    this.soundGameBegin.play();
    //this.soundAmbient.audio.loop = true;
    //this.soundAmbient.play();
    this.nextPieces = new Board("nextPiecesID", "nextpieces-container", 5, 5, true)
    this.nextPieces.createGrid();
    this.nextPieces.render();
    this.addRandomPiece(this.nextPieces);

    this.updateScore(0);
  }

}
