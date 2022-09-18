var canvases = document.getElementsByTagName("canvas");

for(var i=0; i<canvases.length; i++)
{
  canvas = canvases[i];
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}


/* drawStack: location of every move will be pushed to the stack */
let drawStack = [];
let undoStack = [];
let penColor = "black";
let penSize = 1;
let draw = false;
let step = 0;

let pen  = null;

// context
let savedCtx = document.getElementById("myCanvas").getContext("2d");
savedCtx.fillStyle = "white";
savedCtx.fillRect(0, 0, canvas.width, canvas.height);

///////////////////////////////
function saveStepInfo(stepXPos, stepYPos, stepColor, stepSize, stepCount, stepStack) {
  stepStack.push({x:stepXPos, y:stepYPos, color:stepColor, size:stepSize, step: stepCount});
}

function drawLine(stepStack, endPoint, ctx) {
  if(draw == false) {
    return;
  }
  let currentStep = endPoint-1;
  let lastStep = currentStep-1;
  if(stepStack[lastStep].step != stepStack[currentStep].step) {
    return;
  }
  ctx.strokeStyle = stepStack[lastStep].color;
  ctx.lineWidth = stepStack[lastStep].size;
  ctx.beginPath();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.moveTo(stepStack[lastStep].x, stepStack[lastStep].y);
  ctx.lineTo(stepStack[currentStep].x, stepStack[currentStep].y);
  ctx.stroke();
}

function drawAll() {
  draw = true;  
  let length = drawStack.length - 2;
  let i = 2;
  while(i<length) {
    drawLine(drawStack, i, savedCtx);
    i++;
  } 
  draw = false;
}

///////////////////////////////



document.getElementById("myCanvas").addEventListener("mousedown", function(event) {
  console.log("start");
  draw = true;
  step++;
  saveStepInfo(event.clientX, event.clientY, penColor, penSize, step, drawStack);
    this.addEventListener("mousemove", function(event) {
      if(draw) {
        console.log("move");
        saveStepInfo(event.clientX, event.clientY, penColor, penSize, step, drawStack);
        drawLine(drawStack, drawStack.length, savedCtx);
      }
    });
  
  this.addEventListener("mouseup", function(event) {
    console.log("done");
    draw = false;
  });  
  this.addEventListener("mouseleave", function(event) {
    console.log("done");
    draw = false;
  });  
});


/*----------------------------------------------- */
document.getElementById("myCanvas").addEventListener("touchstart", function(event) {
  let on = true;
  lastX = event.touches[0].clientX;
  lastY = event.touches[0].clientY;
  this.addEventListener("touchmove", function(event) {
    if(on) {
      var x = event.touches[0].clientX;
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
  saveStepInfo(-1, -1, penColor, penSize, ++step, drawStack);
}
/*----------------------------------------------- */
// Undo
function undo() {
  let which = drawStack[drawStack.length-1].step;
  while(drawStack[drawStack.length-1].step == which) {
    drawStack.pop();
    if(drawStack.length == 0) {
      break;
    }
  }
  undoHelper();
  drawAll();
}

function undoHelper() {
  const context = document.getElementById("myCanvas").getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}
/*----------------------------------------------- 



/****************************Handle change brush color****************************/
function black() {
  penColor = "black";
}
function silver() {
  penColor = "silver";
}

function gray() {
  penColor = "gray";
}
function orange() {
  penColor = "orange";
}

function maroon() {
  penColor = "maroon";
}
function red() {
  penColor = "red";
}

function purple() {
  penColor = "purple";
}
function fushsia() {
  penColor = "fuchsia";
}

function green() {
  penColor = "green";
}
function lime() {
  penColor = "lime";
}

function olive() {
  penColor = "olive";
}
function yellow() {
  penColor = "yellow";
}
function navy() {
  penColor = "navy";
}
function blue() {
  penColor = "blue";
}
function teal() {
  penColor = "teal";
}
function aqua() {
  penColor = "aqua";
}
/****************************Handle change brush color****************************/

/****************************Handle download image****************************/
download_img = function() {
  let image = canvas.toDataURL();  
  let downloadLink = document.createElement("a");  
  downloadLink.download = "myImage.jpg";
  downloadLink.href = image; 
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
/****************************Handle download image****************************/


/****************************Handle change brush size****************************/
var oldX = 0, newX = 0; // for storing X (horizontal) positions
var element = document.getElementById("circle"); // The element you want to drag
let rect = element.getBoundingClientRect();
let leftMax = rect.x;
let rightMax = rect.x + 100;

// We do the dragging here
function elementDrag(e) {
  e = e || window.event;
  e.preventDefault();
  newX = oldX - e.clientX; // to calculate how much we have moved
  oldX = e.clientX; // store current value to use for next move
  let temp = element.offsetLeft - newX;
  if(temp > 100) {
    temp = 100;
  } else if(temp < 0) {
    temp = 0;
  } else {
    //
  }
  element.style.left = temp + "px"; // update left position
  console.log(penSize);
  penSize = element.offsetLeft/2;
  console.log(penSize);
}

// we do this so there is not multiple event handlers
function closeDragElement() {
  document.onmouseup = null;
  document.onmousemove = null;
}

// when mouse down on element attach mouse move and mouse up for document
// so that if mouse goes outside element still drags
function dragMouseDown(e) {
  e = e || window.event;
  e.preventDefault();
  oldX = e.clientX; // store current value to use for mouse move calculation
  document.onmouseup = closeDragElement;
  document.onmousemove = elementDrag;
}

element.onmousedown = dragMouseDown;

function brush() {
  penColor = "black";
  pen.style.display = "none";
  document.getElementById("myCanvas").style.cursor = 'url("./img/pen.png"),auto';
  document.getElementById("brushContainer").style.display = "flex";
}

function hideBrush() {
  document.getElementById("brushContainer").style.display = "none";
}
/****************************Handle change brush size****************************/


/****************************Handle eraser cursor****************************/
let myCanvas = document.getElementById("myCanvas");
myCanvas.onmousemove = consoleL;
let added = false;
function consoleL(e) {
  e = e || window.event;
  e.preventDefault();
  if(!added) {
    pen = document.createElement("div");
    pen.id = "pen";
    document.body.appendChild(pen);
    added = true;
  }

  pen.style.width = penSize + "px";
  pen.style.height = penSize + "px";
  pen.style.left = e.clientX - (penSize/2)  + "px";
  pen.style.top = e.clientY - (penSize/2)  + "px";
  //console.log(pen);
  //console.log(pen.style.width);
}
/****************************Handle eraser cursor****************************/


/****************************Handle change eraser size****************************/
var oldX1 = 0, newX1 = 0; // for storing X (horizontal) positions
var element1 = document.getElementById("circle1"); // The element you want to drag


// We do the dragging here
function elementDrag1(e) {
  e = e || window.event;
  e.preventDefault();
  newX1 = oldX1 - e.clientX; // to calculate how much we have moved
  oldX1 = e.clientX; // store current value to use for next move
  let temp = element1.offsetLeft - newX1;
  if(temp > 100) {
    temp = 100;
  } else if(temp < 0) {
    temp = 0;
  } else {
    //
  }
  element1.style.left = temp + "px"; // update left position
  penSize = element1.offsetLeft/2;
}



// when mouse down on element attach mouse move and mouse up for document
// so that if mouse goes outside element still drags
function dragMouseDown1(e) {
  e = e || window.event;
  e.preventDefault();
  oldX1 = e.clientX; // store current value to use for mouse move calculation
  document.onmouseup = closeDragElement;
  document.onmousemove = elementDrag1;
}

element1.onmousedown = dragMouseDown1;

function eraser() {
  document.getElementById("eraserContainer").style.display = "flex";
  penColor = "white";
  pen.style.display = "block";
  penSize = 30;
  document.getElementById("myCanvas").style.cursor = 'none';
}

function hideEraser() {
  document.getElementById("eraserContainer").style.display = "none";
}
/****************************Handle change eraser size****************************/



document.getElementById("myCanvas").addEventListener("mousedown", (e) => {
  const brushContainer =  document.getElementById("brushContainer");
  const eraserContainer = document.getElementById("eraserContainer");
  const tools = document.getElementById("tools");
  let target = e.target;
  if(target != brushContainer || target != eraserContainer) {
    hideEraser();
    hideBrush();
  } 
});


