function Board(viewID, className, width, height, draggable=false)
{
  console.log("Board ctor start");
  this.view = document.getElementById(viewID);
  this.view.className = className; //https://www.w3schools.com/css/css_grid.asp
  this.width = width;
  this.height = height;
  this.grid = null;
  this.draggable = draggable;
  this.blockDragged = null;
  this.blockTotal = 0;

  this.eventDragStart = function dragStart(e) {
    console.log("Block.dragStart targetID: "+e.target.id);
    e.dataTransfer.setData('text/plain', e.target.id);
  };

  if(this.draggable)
  {
    console.log("Board is draggable: "+viewID)
    this.view.addEventListener('dragstart', this.eventDragStart);
    this.view.draggable="true";
  }

  this.clearRow = function(rowIdx)
  {
    console.log("clearing row: "+rowIdx);
    game.playSoundRowColumnFull();
    for(let i=0;i<this.grid[rowIdx].length;++i)
    {
        console.log("clearing x:"+rowIdx+" y:"+i);
        setTimeout(this.grid[rowIdx][i].removeBlock, 500+i*100, this.grid[rowIdx][i]);
    }
  };

  this.clearColumn = function(colIdx)
  {
    console.log("clearColumn: "+colIdx);
    game.playSoundRowColumnFull();
    for(let i=0;i<this.grid.length;++i)
    {
        console.log("clearing x:"+i+" y:"+colIdx);
        setTimeout(this.grid[i][colIdx].removeBlock, 500+i*100 , this.grid[i][colIdx]);
    }
  }

  this.createGrid = function()
  {
    console.log("Board.createGrid start");
    if(this.view!=null && this.view.hasChildNodes())
    {
        let totalChildNodes = this.view.childNodes.length;
        while(this.view.childNodes.length>0)
        {
            this.view.removeChild(this.view.lastChild);
        }
    }

    this.grid = new Array(width);
    for(let w=0; w < this.width; ++w)
    {
      this.grid[w] = [];
      for(let h=0; h<this.height; ++h)
      {
        /*
        I could create the GridCell and render it right here to prevent
        going through the entire Board (again) and invoke the Render
        for each GridCell.
        However, by doing that we also make it impossible to create a grid WIHTOUT
        rendering it... what if we want to do something BEFORE the render but AFTER
        creating the grid? That would be impossible...
        */
        this.grid[w][h] = new GridCell(this, w, h);
      }
    }
    console.log("Board.createGrid end");
  };

  this.render = function()
  {
    console.log("Board.render start");
    if(this.grid==null)
      return;

      for(let w=0; w < this.width; ++w)
      {
        for(let h=0; h<this.height; ++h)
        {
          this.grid[w][h].render();
        }
      }
    console.log("Board.render end");
  };

  this.addNewBlockAndRender = function(block, x, y, override=false)
  {
    /*
    Adds a new block to the Board and renders it. Returns true.
    If there was an existing block, it doesn't replace it. Returns false.
    */

    //console.log("Board.addNewBlock: "+block+" "+x+" "+y+" override:"+override);

    if(!(this.grid!=null && this.grid[x][y]!=null))
    {
      console.log("Grid was not initialized.")
      // TO THINK: should we call this.createGrid() automatically?
      //  usually I don't like "magic" but this could be a fail safe approach.
      return false;
    }

    if(block!=null || override)
    {
      this.grid[x][y].setBlock(block);
      this.grid[x][y].render();
      //console.log("Board.addNewBlock true");
      return true;
    }
    //console.log("Board.addNewBlock false");
    return false;
  };

  console.log("Board ctor end");
}
