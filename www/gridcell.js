function GridCell(boardRef, x, y)
{
  console.log("GridCell ctor: "+boardRef+" "+x+" "+y);
  this.board = boardRef;
  this.x = x;
  this.y = y;
  this.view = null;
  this.block = null;

  this.createView = function()
  {
    this.view = document.createElement("div");
    this.view.className = "grid-cell";
    this.view.id = "grid-cell-id-"+x+y;
    console.log("GridCell.render adding new "+this.view.id);
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
