// Daniel John S. Carig
// ASG0
var ctx;
var canvas;

function main() {
  // Retrieve <canvas> element
  canvas = document.getElementById('asg0');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }
  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');

  // Black background
  ctx.fillStyle = 'black'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the colors
}

function drawVector(v, color){
   ctx.strokeStyle = color; // Set color
   ctx.beginPath();
   ctx.moveTo(canvas.width/2, canvas.height/2);
   ctx.lineTo(200+v.elements[0]*20, 200-v.elements[1]*20, v.elements[2]*20);
   ctx.stroke();
}

function handleDrawEvent(){
   var x = document.getElementById('xcoord').value;
   var y = document.getElementById('ycoord').value;
   var x2 = document.getElementById('xcoord2').value;
   var y2 = document.getElementById('ycoord2').value;
   // Clear Canvas
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // Black background
   ctx.fillStyle = 'black'; // Set color to black
   ctx.fillRect(0, 0, 400, 400);

   // Draw new lines
   var v1 = new Vector3([x, y, 0.0]);
   drawVector(v1, "red");
   var v2 = new Vector3([x2, y2, 0.0]);
   drawVector(v2, "blue");
}
