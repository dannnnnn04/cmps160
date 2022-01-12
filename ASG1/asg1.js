// Daniel John S. Carig
// asg1

// Global Variables
var gl;
var canvas;
var a_Position;
var u_FragColor;
var u_Size;

// Globals related to UI elements
var g_selectedColor = [1.0, 1.0, 1.0, 1.0];
var g_selectedSize = 5;

// Array
var g_shapesList = [];

var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform float u_Size;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = u_Size;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +  // uniform変数
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';

  // Get Canvas and GL Context ======================================
  function setupWebGL(){
     // Retrieve <canvas> element
     canvas = document.getElementById('asg1');
     if (!canvas) {
         console.log('Failed to retrieve the <canvas> element');
         return;
     }

     // Rendering context for WebGL
     gl = getWebGLContext(canvas);
     if(!gl){
         console.log('Failed to get the rendering context for WebGL');
         return;
     }
   }

  // Compile Shader Programs and connect js to GLSL =================
  function connectVariablesToGLSL(){
   // Initialize shaders ==========================================
   if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
       console.log('Failed to intialize shaders.');
       return;
   }

   // Get the storage location of attribute variable ==============
   a_Position = gl.getAttribLocation(gl.program, 'a_Position');
   if (a_Position < 0) {
       console.log('Failed to get the storage location of a_Position');
       return;
   }

   // Get the storage location of attribute variable ==============
   u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
   if (!u_FragColor) {
       console.log('Failed to get u_FragColor');
       return;
   }

   u_Size = gl.getUniformLocation(gl.program, 'u_Size');
   if (!u_Size) {
     console.log('Failed to get u_Size');
     return;
   }

 }

 // Set up actions for the HTML UI elements ============================================================
 function addActionsForHtmlUI(){

   // Color Slider Events
   document.getElementById('red').addEventListener('mouseup',     function() { g_selectedColor[0] = this.value*0.1; });
   document.getElementById('green').addEventListener('mouseup',   function() { g_selectedColor[1] = this.value*0.1; });
   document.getElementById('blue').addEventListener('mouseup',    function() { g_selectedColor[2] = this.value*0.1; });

   // Size and Seg Slider Events
   document.getElementById('size').addEventListener('mouseup',    function() { g_selectedSize = this.value });
 }

function main() {
  setupWebGL();
  connectVariablesToGLSL();
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = function(ev){
    click(ev)
  };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}

class Point{
   constructor(){
      this.type='point';
      this.position = [0.0, 0.0, 0.0];
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.size = 5.0;

   }
 }

//var g_points = [];  // The array for the position of a mouse press
//var g_colors = [];  // The array to store the color of a point
//var g_sizes = [];

function click(ev) {

    // Extract the event click and return it in WebGL coordinates
    var [x,y] = convertCoordinatesEventToGL(ev);

    let point = new Point();
    point.position = [x,y];
    point.color = g_selectedColor.slice();
    point.size = g_selectedSize;

    g_shapesList.push(point);

  // Store the coordinates to g_points array
  //g_points.push([x, y]);

  //g_colors.push(g_selectedColor.slice());

  //g_sizes.push(g_selectedSize);

  // Store the coordinates to g_points array
  //if (x >= 0.0 && y >= 0.0) {      // First quadrant
    //g_colors.push([1.0, 0.0, 0.0, 1.0]);  // Red
  //} else if (x < 0.0 && y < 0.0) { // Third quadrant
    //g_colors.push([0.0, 1.0, 0.0, 1.0]);  // Green
  //} else {                         // Others
    //g_colors.push([1.0, 1.0, 1.0, 1.0]);  // White
  //}

  // Draw every shape that is suppose to be in the canvas
  renderAllShapes();
}

// Get Coordinates ================================================
function convertCoordinatesEventToGL(ev){
   var x = ev.clientX; // x coordinate of a mouse pointer
   var y = ev.clientY; // y coordinate of a mouse pointer
   var rect = ev.target.getBoundingClientRect() ;

   // set coordinates based on origin
   x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
   y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

   // Print coordinate in console
   // console.log("("+x+","+y+")");

   return [x,y];
}

// renderAllShapes ================================================
function renderAllShapes(){
   // Clear <canvas>
   gl.clear(gl.COLOR_BUFFER_BIT);

   //var len = g_points.length;
   var len = g_shapesList.length;

   for(var i = 0; i < len; i++) {
        var xy = g_shapesList[i].position;
        var rgba = g_shapesList[i].color;
        var size = g_shapesList[i].size;
//     var xy = g_points[i];
//     var rgba = g_colors[i];
//     var size = g_sizes[i];

     // Pass the position of a point to a_Position variable
     gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
     // Pass the color of a point to u_FragColor variable
     gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
     // Pass the size of a point to u_Size variable
     gl.uniform1f(u_Size, size);

     // Draw
     gl.drawArrays(gl.POINTS, 0, 1);
   }
 }
