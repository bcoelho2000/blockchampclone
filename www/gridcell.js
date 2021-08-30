function GridCell(boardRef, x, y)
{
  //console.log("GridCell ctor: "+boardRef+" "+x+" "+y);

  this.board = boardRef;
  this.x = x;
  this.y = y;
  this.view = null;
  this.block = null;

  this.drop = function drop(e) {
    console.log("GridCell.drop "+e.dataTransfer.getData('text/plain'));
    //console.log("game.nextPieces.blockDragged: "+game.nextPieces.blockDragged);

    let baseBlockX = this.getAttribute("grid-cell-x");
    let baseBlockY = this.getAttribute("grid-cell-y");
    console.log("baseBlock x:"+baseBlockX+" y:"+baseBlockY);
    console.log("newBlock x:"+game.nextPieces.blockDragged.x+" y:"+game.nextPieces.blockDragged.y);

    // Calc initial base board coordinates that overlap
    let baseBlockInitX = baseBlockX - game.nextPieces.blockDragged.x;
    let baseBlockInitY = baseBlockY - game.nextPieces.blockDragged.y;
    console.log("baseBlockInit x:"+baseBlockInitX+" y:"+baseBlockInitY);

    console.log("game.board.blockTotal: "+game.board.blockTotal);
    console.log("game.nextPieces.blockTotal: "+game.nextPieces.blockTotal);

    if(baseBlockInitX>=0 &&
      baseBlockInitX < game.board.grid.length &&
      baseBlockInitY>=0 &&
      baseBlockInitY < game.board.grid[x].length)
      {
        console.log("Begin overlap check");
        let blocksToBePlaced = [];
        for(let newPieceX=0;newPieceX<game.nextPieces.grid.length;++newPieceX)
        {
          for(let newPieceY=0;newPieceY<game.nextPieces.grid[newPieceX].length;++newPieceY)
          {
            let baseGridCellX = baseBlockInitX+newPieceX;
            let baseGridCellY = baseBlockInitY+newPieceY;
            console.log("Trying to get base board gridcell x:"+baseGridCellX+" y:"+baseGridCellY);

            if(!(baseGridCellX<game.board.grid.length && baseGridCellY<game.board.grid[baseGridCellX].length))
            {
              console.log("Game board is out of bounds. Breaking loop.");
              break;
            }


            let baseGridCell = game.board.grid[baseGridCellX][baseGridCellY];

            console.log("Getting new gridcell at x:"+newPieceX+ " y:"+newPieceY);
            let newGridCell = game.nextPieces.grid[newPieceX][newPieceY];

            if(!newGridCell.hasBlock())
            {
              console.log("skipping this cell at new gridcell");
              continue;
            }

            if(!baseGridCell.hasBlock())
            {
              //if we're here then we can this block is a candidate to be added
              // however, we can't add it just yet because the whole piece might overlap with an existing piece...
              // if that is the case the we can't add the new piece (of course)
              // and if we added the new blocks we would had to rollback all the new blocks added
              console.log("adding a new block to be placed");

              blocksToBePlaced.push({gameBoardGridCell: baseGridCell, newGridCell: newGridCell});
            }
            else {
              // We can break the loop right now.
              break;
            }
          }
        }

        console.log("game.nextPieces.blockTotal:"+game.nextPieces.blockTotal+" vs blocksToBePlaced.length:"+blocksToBePlaced.length);
        if(game.nextPieces.blockTotal == blocksToBePlaced.length)
        {
          console.log("Good! We can successfully place all the blocks!");
          for(let blockToBePlacedIdx = 0; blockToBePlacedIdx < blocksToBePlaced.length; ++blockToBePlacedIdx)
          {
            blocksToBePlaced[blockToBePlacedIdx].gameBoardGridCell.setBlock(blocksToBePlaced[blockToBePlacedIdx].newGridCell.block);
            blocksToBePlaced[blockToBePlacedIdx].gameBoardGridCell.render();
          }
          
          game.nextPieces.blockTotal = 0;
          game.addRandomPiece(game.nextPieces);
        }
        else {
          console.log("Some blocks were not placed... Maybe there was an overlap»");
          //
        }
      }
      else {

      }

  };

  this.dragEnter = function dragEnter(e) {
      e.preventDefault();
      //e.target.classList.add('drag-over');
      //console.log("dragEnter: "+e.dataTransfer.getData('text/plain'));
  }

  this.dragOver = function dragOver(e) {
      e.preventDefault();
      //e.target.classList.add('drag-over');
      //console.log("dragOver: "+e.dataTransfer.getData('text/plain'));
  }

  this.dragLeave = function dragLeave(e) {
      //e.target.classList.remove('drag-over');
      //console.log("dragLeave: "+e.dataTransfer.getData('text/plain'));
  }

  this.createView = function()
  {
    this.view = document.createElement("div");
    this.view.className = "grid-cell";
    this.view.id = "grid-cell-id-x"+x+"|"+y;
    this.view.setAttribute("grid-cell-x", x);
    this.view.setAttribute("grid-cell-y", y);
    this.view.addEventListener('drop', this.drop); // support drag-and-drop
    this.view.addEventListener('dragenter', this.dragEnter)
    this.view.addEventListener('dragover', this.dragOver);
    this.view.addEventListener('dragleave', this.dragLeave);

    this.board.view.appendChild(this.view);

  };
  this.createView();



  this.setBlock = function(block)
  {
    /*
    if the caller wants to setBlock then this function wont check
      if the block exists before it sets.

      This way this approach can be used to overlap/override existing blocks
      and even to erase an existing block by calling this with block = null
    */
    this.block = block;
    if(this.block!=null)
    {
      this.board.blockTotal++;
      this.block.setGridCell(this);
    }
  };

  this.hasBlock = function()
  {
    return this.block!=null;
  }

  this.render = function()
  {
    console.log("GridCell.render start");
    if(this.block != null)
    {
      console.log("GridCell.render invoke block.render()");
      this.block.render();
    }
    else
    {
      // Render an "empty block"
      this.view.className = "grid-cell";
      this.view.id = "grid-cell-id-"+x+y;
      if(this.view.hasChildNodes())
      {
        for(let childIdx = 0; childIdx < this.view.childNodes.length; ++childIdx)
          this.view.removeChild(this.view.childNodes[childIdx]);
      }
    }
    console.log("GridCell.render end");
  };
}
