// Daniel John S. Carig
// asg1

// Global Variables
var gl;
var canvas;
var a_Position;
var u_FragColor;
var u_Size;

// Constants
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

// Globals related to UI elements
var g_selectedColor = [1.0, 1.0, 1.0, 1.0];
var g_selectedSize = 5;
var g_selectedType = POINT;
var g_selectedsCount = 12; // segment count
var g_outline = 0;
var drag = false;

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

  // ================== Get Canvas and GL Context ====================
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

  // ======== Compile Shader Programs and connect js to GLSL =========
  function connectVariablesToGLSL(){
   // Initialize shaders
   if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
       console.log('Failed to intialize shaders.');
       return;
   }

   // Get the storage location of attribute variable
   a_Position = gl.getAttribLocation(gl.program, 'a_Position');
   if (a_Position < 0) {
       console.log('Failed to get the storage location of a_Position');
       return;
   }

   // Get the storage location of attribute variable
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

 // ============================== Set up actions for the HTML UI elements ==============================
 function addActionsForHtmlUI(){
   // Button Events
   document.getElementById('clear').onclick     = function() { g_shapesList = []; renderAllShapes(); };
   document.getElementById('square').onclick    = function() { g_selectedType = POINT;    g_outline = 0;};
   document.getElementById('triangle').onclick  = function() { g_selectedType = TRIANGLE; g_outline = 0;};
   document.getElementById('circle').onclick    = function() { g_selectedType = CIRCLE;   g_outline = 0;};
   document.getElementById('sTrace').onclick    = function() { g_selectedType = POINT;    g_outline = 1;};
   document.getElementById('tTrace').onclick    = function() { g_selectedType = TRIANGLE; g_outline = 1;};
   document.getElementById('cTrace').onclick    = function() { g_selectedType = CIRCLE;   g_outline = 1;};
   document.getElementById('draw').onclick  	  = function() {
                                // Specify the color for clearing <canvas>
																gl.clearColor(0.0, 0.0, 0.0, 1.0);
																// Clear <canvas>
																gl.clear(gl.COLOR_BUFFER_BIT);
																//drawTriangle([0, 0.5,   -0.5, -0.5,   0.5, -0.5]);
																drawTriangle([0, 0,   -0.25, -0.25,   0.25, -0.25]);
																drawTriangle([-0.5, 0,   -0.75, -0.25,   -0.25, -0.25]);
																drawTriangle([0.5, 0,   0.25, -0.25,   0.75, -0.25]);
																drawTriangle([-0.25, 0.25,   -0.5, 0,   0, 0]);
																drawTriangle([0.25, 0.25,   0, 0,   0.5, 0]);
																drawTriangle([0, 0.5,   -0.25, 0.25,   0.25, 0.25]);

																drawTriangle([0, -0.5,  -0.25, -0.25,  0.25, -0.25])
																drawTriangle([-0.5, -0.5,  -0.75, -0.25,  -0.25, -0.25])
																drawTriangle([0.5, -0.5,  0.25, -0.25,  0.75, -0.25])
																drawTriangle([-0.25, -0.75,  -0.5, -0.5,  0, -0.5])
																drawTriangle([0.25, -0.75,  0, -0.5,  0.5, -0.5])
																drawTriangle([0,-1,  -0.25,-0.75,  0.25,-0.75])
															};

   // Color Slider Events
   document.getElementById('red').addEventListener('mouseup',     function() { g_selectedColor[0] = this.value*0.1; });
   document.getElementById('green').addEventListener('mouseup',   function() { g_selectedColor[1] = this.value*0.1; });
   document.getElementById('blue').addEventListener('mouseup',    function() { g_selectedColor[2] = this.value*0.1; });

   // Size and Seg Slider Events
   document.getElementById('size').addEventListener('mouseup',    function() { g_selectedSize = this.value });
   document.getElementById('sCount').addEventListener('mouseup',  function() { g_selectedsCount = this.value; });
 }

 function drawTriangle(vertices) {
//  var vertices = new Float32Array([
//    0, 0.5,   -0.5, -0.5,   0.5, -0.5
//  ]);
  var n = 3; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  //gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, n);
  //return n;
}

function main() {
  setupWebGL();
  connectVariablesToGLSL();
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = function(ev){
    click(ev);
    drag = true;
  };
  canvas.onmouseup = function(ev){
    drag = false;
  };
  canvas.onmousemove = function(ev){
    if(drag){
      click(ev);
    }
  };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}


function click(ev) {

    // Extract the event click and return it in WebGL coordinates
    var [x,y] = convertCoordinatesEventToGL(ev);

    // Create and store the new point
    var point;
    if(g_selectedType==POINT){
      point = new Point();
   } else if (g_selectedType==TRIANGLE){
      point = new Triangle();
   } else {
      point = new Circle();
      point.sCount = g_selectedsCount;
   }

    point.position = [x,y];
    point.color = g_selectedColor.slice();
    point.size = g_selectedSize;
    point.outline = g_outline;
    g_shapesList.push(point);

  // Draw every shape that is suppose to be in the canvas
  renderAllShapes();
}

// ======================== Get Coordinates ========================
function convertCoordinatesEventToGL(ev){
   var x = ev.clientX; // x coordinate of a mouse pointer
   var y = ev.clientY; // y coordinate of a mouse pointer
   var rect = ev.target.getBoundingClientRect() ;

   // set coordinates based on origin
   x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
   y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

   return [x,y];
}

// ======================== renderAllShapes ========================
function renderAllShapes(){
   // Clear <canvas>
   gl.clear(gl.COLOR_BUFFER_BIT);

   //var len = g_points.length;
   var len = g_shapesList.length;

   for(var i = 0; i < len; i++) {
     g_shapesList[i].render();
 }

}
