// Daniel John S. Carig
// asg3

// Global Variables
var gl;
var canvas;
var a_Position;
var a_UV;
var u_FragColor;
var u_Size;
var u_ModelMatrix;
var u_ProjectionMatrix;
var u_ViewMatrix;
var u_GlobalRotateMatrix;

// Globals related UI elements
var g_globalAngle=0;
var g_yellowAngle=0;
var g_magentaAngle=0;
var g_yellowAnimation=false;
var g_magentaAnimation=false;

// Animation
var g_startTime=performance.now()/1000.0;
var g_seconds=performance.now()/1000.0-g_startTime;

// Vertex shader program ==========================================
var VSHADER_SOURCE =`
   precision mediump float;
   attribute vec4 a_Position;
   attribute vec2 a_UV;
   varying vec2 v_UV;
   uniform mat4 u_ModelMatrix;
   uniform mat4 u_GlobalRotateMatrix;
   uniform mat4 u_ViewMatrix;
   uniform mat4 u_ProjectionMatrix;

   void main() {

      gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
      v_UV = a_UV;
   }`

   // Fragment shader program ========================================
   var FSHADER_SOURCE =`
       precision mediump float;
       varying vec2 v_UV;
       uniform vec4 u_FragColor;
       void main() {
         gl_FragColor = u_FragColor;
         gl_FragColor = vec4(v_UV, 1.0, 1.0);
       }`

// HTML ============================================================
function addActionsForHtmlUI(){

  // Button Events
  document.getElementById('animate_on').onclick = function() {g_yellowAnimation = true;};
  document.getElementById('animate_off').onclick = function() {g_yellowAnimation = false;};
  document.getElementById('animate_on2').onclick = function() {g_magentaAnimation = true;};
   document.getElementById('animate_off2').onclick = function() {g_magentaAnimation = false;};

  //Size Slider Events
  document.getElementById('camera').addEventListener('mousemove', function() { g_globalAngle = this.value; renderAllShapes(); });

  // Color Slider Events
  document.getElementById('yellowSlide').addEventListener('mousemove', function() { g_yellowAngle = this.value; renderAllShapes(); });
  document.getElementById('magentaSlide').addEventListener('mousemove', function() { g_magentaAngle = this.value; renderAllShapes(); });
}

// Get Canvas and GL Context ======================================
function setupWebGL(){
   // Retrieve <canvas> element
   canvas = document.getElementById('asg3');
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

   gl.enable(gl.DEPTH_TEST);

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

   a_UV = gl.getAttribLocation(gl.program, 'a_UV');
   if (a_UV < 0) {
      console.log('Failed to get the storage location of a_UV');
      return;
  }
   // Get the storage location of u_FragColor
   u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
   if (!u_FragColor) {
       console.log('Failed to get u_FragColor');
       return;
   }

   // Get the storage location of u_ModelMatrix
   u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
   if (!u_ModelMatrix) {
    console.log('Failed to get u_ModelMatrix');
    return;
  }

  // Get the storage location of u_GlobalRotateMatrix
  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if (!u_GlobalRotateMatrix) {
    console.log('Failed to get u_GlobalRotateMatrix');
    return;
  }

  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if (!u_ViewMatrix) {
    console.log('Failed to get u_ViewMatrix');
    return;
  }

  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if (!u_ProjectionMatrix) {
    console.log('Failed to get u_ProjectionMatrix');
    return;
  }

  //Set an initial value for this matrix to identity
  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);

}

// Main ===========================================================
function main() {
   setupWebGL();
   connectVariablesToGLSL();
   addActionsForHtmlUI();

   // Specify the color for clearing <canvas>
   gl.clearColor(0.0, 0.0, 0.0, 1.0);

   // Render
   //renderAllShapes();
   requestAnimationFrame(tick)
} // end of main


// Called by browser repeatedly whenever its timeout
function tick() {
  // Save the current time
  g_seconds=performance.now()/1000.0-g_startTime;
  console.log(g_seconds);

  // Update Animation angles
  updateAnimationAngles();

  // Draw everything
  renderAllShapes();

  // Tell the browser to update again when it has time
  requestAnimationFrame(tick);
}

// Update the angles of everything if currently animated
function updateAnimationAngles(){
   if(g_yellowAnimation){
      g_yellowAngle = (45*Math.sin(g_seconds));
   }
   if(g_magentaAnimation){
      g_magentaAngle = (45*Math.sin(3*g_seconds));
   }
}

// Draw every shape that is supposed to be in the canvas
function renderAllShapes(){

  //Check the time at the start of this function
  var startTime = performance.now();

  // Pass the projection matrix
  var projMat = new Matrix4();
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

  // Pass the view matrix
  var viewMat =new Matrix4();
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

  // Pass the matrix to u_ModelMatrix attribute
  var globalRotMat = new Matrix4().rotate(g_globalAngle, 0,1,0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

   // Clear <canvas>
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   gl.clear(gl.COLOR_BUFFER_BIT);

   // Draw the body cube
   var body = new Cube();
   body.color = [1.0,0.0,0.0,1.0];
   body.matrix.translate(-.25, -.75, 0.0);
   body.matrix.rotate(-5,1,0,0);
   body.matrix.scale(0.5, .3, .5);
   body.render();

   // Draw a left arm
   var yellow = new Cube();
   yellow.color = [1,1,0,1];
   yellow.matrix.setTranslate(0, -.5, 0.0);
   yellow.matrix.rotate(-5, 1,0,0);

   yellow.matrix.rotate(-g_yellowAngle, 0,0,1);

   //if (g_yellowAnimation){
      //yellow.matrix.rotate(45*Math.sin(g_seconds), 0,0,1);
   //} else {
      //yellow.matrix.rotate(-g_yellowAngle, 0,0,1);
   //}

   var yellowCoordinatesMat=new Matrix4(yellow.matrix);
   yellow.matrix.scale(0.25, .7, .5);
   yellow.matrix.translate(-.5,0,0);
   yellow.render();

   // Test box
   var magenta = new Cube();
   magenta.color = [1,0,1,1];
   magenta.matrix = yellowCoordinatesMat;
   magenta.matrix.translate(0, 0.65, 0);
   magenta.matrix.rotate(g_magentaAngle,0,0,1);
   magenta.matrix.scale(.3,.3,.3);
   magenta.matrix.translate(-.5,0, -0.001);
   magenta.render();

   // Check the time at the end of the function, and show on web page
   var duration = performance.now() - startTime;
   sendTextToHTML( " ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration)/10, "numdot");

}


// Set the text of a HTML element
function sendTextToHTML(text, htmlID) {
    var htmlElm = document.getElementById(htmlID);
    if(!htmlElm) {
      console.log("Failed to get " + htmlID + " from HTML");
      return;
    }
    htmlElm.innerHTML = text;
}
