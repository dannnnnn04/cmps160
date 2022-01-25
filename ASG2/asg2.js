// Daniel John S. Carig
// asg2

// Global Variables
var gl;
var canvas;
var a_Position;
var u_FragColor;

// Globals related UI elements
var g_globalAngle=0;


// Vertex shader program ==========================================
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'uniform mat4 u_GlobalRotateMatrix;\n' +
    'void main() {\n' +
    ' gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;\n' +
    '}\n';

// Fragment shader program ========================================
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main() {\n' +
    '  gl_FragColor = u_FragColor;\n' + // Set the point color (red)
    '}\n';

// HTML ============================================================
function addActionsForHtmlUI(){

  document.getElementById('camera').addEventListener('mousemove', function() { g_globalAngle = this.value; renderAllShapes(); });


}

// Get Canvas and GL Context ======================================
function setupWebGL(){
   // Retrieve <canvas> element
   canvas = document.getElementById('asg2');
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

   //gl.enable(gl.DEPTH_TEST);
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
   renderAllShapes();
} // end of main



// ======================== renderAllShapes ========================
function renderAllShapes(){

  //Check the time at the start of this function
  var startTime = performance.now();

  // Pass the matrix to u_ModelMatrix attribute
  var globalRotMat = new Matrix4().rotate(g_globalAngle, 0,1,0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

   // Clear <canvas>
   gl.clear(gl.COLOR_BUFFER_BIT);

   // Draw the body cube
   var body = new Cube();
   body.color = [1.0,0.0,0.0,1.0];
   body.matrix.translate(-.25, -.5, 0.0);
   body.matrix.scale(0.5, 1, .5);
   body.render();

   // Draw a left arm
   var leftArm = new Cube();
   leftArm.color = [1,1,0,1];
   leftArm.matrix.setTranslate(.7, 0, 0.0);
   leftArm.matrix.rotate(45, 0,0,1);
   leftArm.matrix.scale(0.25, .7, .5);
   leftArm.render();

   // Test box
   var box = new Cube();
   box.color = [1,0,1,1];
   box.matrix.translate(0,0,-.50,0);
   box.matrix.rotate(-30,1,0,0);
   box.matrix.scale(.5,.5,.5);
   box.render();

   // Check the time at the end of the function, and show on web page
   var duration = performance.now() - startTime;
   sendTextToHTML( " ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration), 'numdot');

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
