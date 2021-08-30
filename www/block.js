function Block(color, points, draggable)
{
  console.log("Block.ctor() start");
  this.gridCell = null;
  this.color = color;
  this.points = points;
  this.view = null;
  this.draggable = draggable;

  this.setGridCell = function(gridCellRef)
  {
    // sets the GridCell and returns info on if there was an existing value or not.

      let overrideCell = this.gridCell!=null;
      this.gridCell = gridCellRef;
      return overrideCell;
  };

  this.setDraggable = function(draggable)
  {
    this.draggable = draggable;
  }

  /*this.eventDragStart = function dragStart(e) {
    console.log("Block.dragStart targetID: "+e.target.id);
    e.dataTransfer.setData('text/plain', e.target.id);


      setTimeout(() => {
          e.target.classList.add('hide');
      }, 0);

  }*/

  this.eventBlockMouseDown = function blockMouseDown(mouseEvent)
  {
    console.log("eventBlockMouseDown: "+mouseEvent.target.id);
    let blockX = this.parentElement.getAttribute("grid-cell-x");
    let blockY = this.parentElement.getAttribute("grid-cell-y");
    game.nextPieces.blockDragged = { x: blockX, y: blockY};
  }

  this.render = function(htmlContainer=null)
  {
    if(this.gridCell==null)
    {
      console.log("Block.render() - gridCell is null")
      return;
    }

    if(htmlContainer==null)
    {
      /*
      improvement: it would be best if the Block wouldn't have to worry about
      adapting/changing anything at the GridCell.view level...

      This might be solved if the render returns the htmlElement and let the caller figure this out.
      */
      console.log("Block.render() - setting htmlContainer to gridCell.view")
      htmlContainer = this.gridCell.view;
    }

    this.view = document.createElement("div");
    this.view.className = "block";
    this.view.style.backgroundColor = color;
    this.view.id = "block-id"+this.gridCell.x+this.gridCell.y;

    if(this.draggable)
    {
      //this.view.addEventListener('dragstart', this.eventDragStart);
      //this.view.draggable="true";
      this.view.addEventListener('mousedown', this.eventBlockMouseDown)
    }

    htmlContainer.className = "grid-cell grid-cell-full";
    if(htmlContainer.hasChildNodes())
    {
      for(let childIdx = 0; childIdx < htmlContainer.childNodes.length; ++childIdx)
        htmlContainer.removeChild(htmlContainer.childNodes[childIdx]);
    }
    htmlContainer.appendChild(this.view);
  };

  console.log("Block.ctor() finish");
}
