// Daniel John S. Carig
// asg0
var ctx;
var canvas;

function main() {
  // Retrieve <canvas> element
  canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }
  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');

  // Black background
  ctx.fillStyle = 'black'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color
}
