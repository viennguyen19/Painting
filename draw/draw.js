var canvases = document.getElementsByTagName("canvas");

for(var i=0; i<canvases.length; i++)
{
  canvas = canvases[i];

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
/* drawStack: location of every move will be pushed to the stack
   step: info of every step will be push to the stack
   movePos: index of begining of step in drawStack
   stepInfo: save where each step start on drawStack and style of draw*/
let drawStack = [];
let step = [];
let movePos = 0;
let stepInfo = {start: 0, info: "stroke"};
let holdPos = {posX: 0, posY: 0};
let drawStyle = "stroke";

let undoCount = 0;
// context
let savedCtx = document.getElementById("myCanvas").getContext("2d");
savedCtx.fillStyle = "white";
savedCtx.fillRect(0, 0, canvas.width, canvas.height);

let lastX = -110;
let lastY = 0;
let penColor = "black";
let penSize = 1;

document.getElementById("myCanvas").style.cursor = "crosshair";
document.getElementById("myCanvas").addEventListener("mousedown", function(event) {
  let on = true;
  lastX = event.clientX-110;
  lastY = event.clientY;
  // save location of mouse and push into the stack
  var x = lastX;
  var y = lastY;
  drawStack.push({x,y});
  
  // save step info into the stack
  stepInfo = {movePos, drawStyle};
  step.push(stepInfo);
  // move to next index in drawStack
  movePos++;
  this.addEventListener("mousemove", function(event) {
    if(on) {
      undoCount = 0;
      var x = event.clientX-110;
      var y = event.clientY;
      // save location of mouse and push to stack
      drawStack.push({x,y});
      console.log(drawStack);
      // move to next index in stack
      movePos++;
      dothis(x,y,this);
    }
  });
  this.addEventListener("mouseup", function(event) {
    on = false;
    savedCtx.save();
  });
});

function dothis(x,y,myelement) {
  var ctx = myelement.getContext("2d");
  ctx.strokeStyle = penColor;
  ctx.lineWidth = penSize;
  ctx.beginPath();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x,y);
  ctx.stroke();
  lastX = x;
  lastY = y;
}
/*----------------------------------------------- */
document.getElementById("myCanvas").addEventListener("touchstart", function(event) {
  let on = true;
  lastX = event.touches[0].clientX-110;
  lastY = event.touches[0].clientY;
  this.addEventListener("touchmove", function(event) {
    if(on) {
      var x = event.touches[0].clientX-110;
      var y = event.touches[0].clientY;
      dothis(x,y,this);
      event.preventDefault();
    }
  });
  this.addEventListener("touchend", function(event) {
    on = false;
    event.preventDefault();
  });
  event.preventDefault();
});
/*----------------------------------------------- */
// Clear
function clearCanvas() {
  const context = document.getElementById("myCanvas").getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  removeEraserSize();
  removeBrushSize();
  removeColor();
}
/*----------------------------------------------- */
// Undo
function undo() {
  savedCtx.restore();
  console.log(step);
  undoCount++;
  if(undoCount<=step.length) {
    let prevLoc = step[step.length-undoCount];
    savedCtx.strokeStyle = "white";
    for(k=0; k <30; k++) {
      for(j=prevLoc.movePos; j<drawStack.length-1; ) {
        savedCtx.moveTo(drawStack[j].x, drawStack[j].y);
        j++;
  			savedCtx.lineTo(drawStack[j].x, drawStack[j].y);
      }
    }
    savedCtx.stroke();
  }
  removeEraserSize();
  removeBrushSize();
  //removeColor();
}
/*----------------------------------------------- */
// Eraser 
function eraser() {
  penColor = "white";
  penSize = 1;
  if(document.querySelector("#eraserSize") == null) {
    let temp1 = document.querySelector("#tools");
    let eraserSize = document.createElement('div');
    eraserSize.id = "eraserSize";
    temp1.appendChild(eraserSize);
    let temp2 = document.querySelector("#eraserSize");
    let sizeEraser = document.createElement('div');
    sizeEraser.id = "sizeEraser";
    temp2.appendChild(sizeEraser);
    changeEraserSize(temp2);
  }
  removeBrushSize();
  removeColor();
}

function changeEraserSize(div) {
  div.addEventListener("click", function clickEvent(e) {
    console.log("Test here");
    // e = Mouse click event.
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; 
    var y = e.clientY - rect.top;  
    console.log("Left? : " + x + " ; Top? : " + y + ".");
    document.getElementById("sizeEraser").style.top = y + "px";
    penSize = y/10;
  });
}

function removeEraserSize() {
  let node = document.querySelector("#eraserSize");
  if(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
}
/*----------------------------------------------- */
// Brush 
function brush() {
  penSize = 1;
  penColor = "black";
  if(document.querySelector("#brushSize") == null) {
    let temp1 = document.querySelector("#tools");
    let brushSize = document.createElement('div');
    brushSize.id = "brushSize";
    temp1.appendChild(brushSize);

    let temp2 = document.querySelector("#brushSize");
    let sizeBrush = document.createElement('div');
    sizeBrush.id = "sizeBrush";
    temp2.appendChild(sizeBrush);

    changeBrushSize(temp2);
  }
  removeEraserSize();
  removeColor();
}

function changeBrushSize(div) {
  div.addEventListener("click", function clickEvent(e) {
    console.log("Test here");
    // e = Mouse click event.
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; 
    var y = e.clientY - rect.top;  
    console.log("Left? : " + x + " ; Top? : " + y + ".");
    document.getElementById("sizeBrush").style.top = y + "px";
    penSize = y/10;
  });
}

function removeBrushSize() {
  let node = document.querySelector("#brushSize");
  if(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
}
/*----------------------------------------------- */
let hideColor = true;
function unhide() {
  if(hideColor) {
    document.getElementById("colorTable").style.zIndex  = 10;
  } else {
    document.getElementById("colorTable").style.zIndex  = -10;
  }
  hideColor = !hideColor;
  removeBrushSize();
  removeEraserSize()
}



function pickRed() {
  penColor = "#ff0000";
}
function pickRedPurple() {
  penColor = "#953553";
}

function pickPurple() {
  penColor = "#800080";
}
function pickBluePurple() {
  penColor = "#3007B6";
}

function pickBlue() {
  penColor = "#0000ff";
}
function pickCBlueGreen() {
  penColor = "#0d98ba";
}

function pickGreen() {
  penColor = "green";
}
function pickYellowGreen() {
  penColor = "#9acd32";
}

function pickYellow() {
  penColor = "yellow";
}
function pickYellowOrange() {
  penColor = "#ffae42";
}

function pickOrange() {
  penColor = "ffa500";
}
function pickRedOrange() {
  penColor = "#ff5349";
}
function pickBlack() {
  penColor = "black";
}

/*---------------------------------------- */
download_img = function() {
  let image = canvas.toDataURL();  
  let downloadLink = document.createElement("a");  
  downloadLink.download = "myImage.jpg";
  downloadLink.href = image; 
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
