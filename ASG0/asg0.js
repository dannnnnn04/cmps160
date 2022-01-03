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
  ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color

  // Draw new lines
   var v1 = new Vector3([2.25, 2.25, 0.0]);
   drawVector(v1,"red");
}

function drawVector(v, color){
   ctx.strokeStyle = color; // Set color
   ctx.beginPath();
   ctx.moveTo(canvas.width/2, canvas.height/2);
   ctx.lineTo(200+v.elements[0]*20, 200-v.elements[1]*20, v.elements[2]*20);
   ctx.stroke();
}
