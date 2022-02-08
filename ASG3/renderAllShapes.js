function drawMap(){
   for(x=0; x<32; x++){
      for(y=0; y<32; y++){
         if (((x == 0 || x == 31) && y%4 == 0) || (y == 0 || y == 31) && x%4 == 0){
            var wall = new Cube();
			wall.color = [.25, .078, .074, 1.0];
            wall.textureNum = -2;
			wall.matrix.scale(0.25,0.73,0.25);
            wall.matrix.translate(x-16,-.25,y-16);
            wall.renderfast();
         }
         else if (((x == 0 || x == 31) && y%4 != 0) || (y == 0 || y == 31) && x%4 != 0){
            var wall = new Cube();
			wall.color = [.39, .22, .14, 1.0];
            wall.textureNum = -2;
			wall.matrix.scale(0.25,0.25,0.25);
            wall.matrix.translate(x-16,-.25,y-16);
            wall.renderfast();
         }

      }
   }
}

function renderAllShapes(){   
   // draw Map
   drawMap();
   
   //colors
   var skin = [.941, .886, .843, 1.0];
   var horn = [.4, .369, .361, 1.0];
   var wool = [.584, .549, .510, 1.0];
   //var wool = [.369, .369, .369, 1.0];
   
	// body 
   var body = new Cube();
   body.color = wool;
   body.matrix.rotate(170, 0, 1, 0);
   body.matrix.scale(.25, 0.25, 0.35);
   body.matrix.translate(-.5, 0, -0.25);
   body.render();
   
   // head 
   var head = new Cube();
   head.color = wool;
   head.matrix.rotate(170, 0, 1, 0);
   head.matrix.rotate(-head_animation, 1, 0, 0);
   head.matrix.scale(0.35, 0.35, 0.35);
   head.matrix.translate(-.5, 0.50, -1.25);
   head.render();
   
   var face = new Cube();
   face.color = skin;   
   face.matrix.rotate(170, 0, 1, 0);
   face.matrix.rotate(-head_animation, 1, 0, 0);
   face.matrix.scale(0.30, 0.30, 0.03);
   face.matrix.translate(-.51, 0.591, -15.51);
   face.render();

   var upplefthorn = new Cube();
   upplefthorn.color = horn;
   upplefthorn.matrix.rotate(170, 0, 1, 0);
   upplefthorn.matrix.rotate(-head_animation, 1, 0, 0);
   upplefthorn.matrix.scale(0.05, 0.071, 0.04);
   upplefthorn.matrix.translate(-3.01, 7, -11.95);  
   upplefthorn.render();
   
   var upprighthorn = new Cube();
   upprighthorn.color = horn;
   upprighthorn.matrix.rotate(170, 0, 1, 0);
   upprighthorn.matrix.rotate(-head_animation, 1, 0, 0);
   upprighthorn.matrix.scale(0.05, 0.071, 0.04);
   upprighthorn.matrix.translate(2.01, 7, -11.95);
  
   upprighthorn.render();

   var lefteye = new Cube();
   lefteye.color = [1,1,1,1];
   lefteye.matrix.rotate(170, 0, 1, 0);
   lefteye.matrix.rotate(-head_animation, 1, 0, 0);
   lefteye.matrix.scale(0.1, 0.061, 0.04);
   lefteye.matrix.translate(-1.5, 5, -11.95);
   lefteye.render();
   
   var lefteyeblack = new Cube();
   lefteyeblack.color = [0,0,0,1];
   lefteyeblack.matrix.rotate(170, 0, 1, 0);
   lefteyeblack.matrix.rotate(-head_animation, 1, 0, 0);
   lefteyeblack.matrix.scale(0.05, 0.061, 0.04);
   lefteyeblack.matrix.translate(-2.001, 5, -12);
   lefteyeblack.render();

   var righteye = new Cube();
   righteye.color = [1,1,1,1];
   righteye.matrix.rotate(170, 0, 1, 0);
   righteye.matrix.rotate(-head_animation, 1, 0, 0);
   righteye.matrix.scale(0.1, 0.061, 0.04);
   righteye.matrix.translate(0.5, 5, -11.95);
   righteye.render();
   
   var righteyeblack = new Cube();
   righteyeblack.color = [0,0,0,1];
   righteyeblack.matrix.rotate(170, 0, 1, 0);
   righteyeblack.matrix.rotate(-head_animation, 1, 0, 0);
   righteyeblack.matrix.scale(0.05, 0.061, 0.04);
   righteyeblack.matrix.translate(1.001, 5, -12.05);
   righteyeblack.render();

   var mouth = new Cube();   
   mouth.color = [.89,.69,.64,1];  
   mouth.matrix.rotate(170, 0, 1, 0);
   mouth.matrix.rotate(-head_animation, 1, 0, 0);   
   mouth.matrix.scale(0.13, 0.06, 0.04);
   mouth.matrix.translate(-0.47, 3.0, -11.95);
   mouth.render();
   
   // upper legs
   var frontleft = new Cube();
   frontleft.color = wool;
   frontleft.matrix.setTranslate(0, 0, 0);
   frontleft.matrix.rotate(-g_jointAngle, 1, 0, 0); // Joint 1
   var frontleftCoord = new Matrix4(frontleft.matrix);
   frontleft.matrix.rotate(170, 0, 1, 0);
   frontleft.matrix.scale(.10, -0.30, 0.10);
   frontleft.matrix.translate(-1.15, -.25, -0.75);
   frontleft.render();

   var frontright = new Cube();
   frontright.color = wool;
   frontright.matrix.setTranslate(0, 0, 0);
   frontright.matrix.rotate(-g_jointAngle, 1, 0, 0); // Joint 1
   var frontrightCoord = new Matrix4(frontright.matrix);
   frontright.matrix.rotate(170, 0, 1, 0);
   frontright.matrix.scale(.10, -0.30, 0.10);
   frontright.matrix.translate(.2, -.25, -0.75);
   frontright.render();

   var backleft = new Cube();
   backleft.color = wool;
   backleft.matrix.setTranslate(0, 0, 0);
   backleft.matrix.rotate(g_jointAngle, 1, 0, 0); // Joint 1
   var backleftCoord = new Matrix4(backleft.matrix);
   backleft.matrix.rotate(170, 0, 1, 0);
   backleft.matrix.scale(.10, -0.30, 0.10);
   backleft.matrix.translate(-1.15, -.25, 1.5);
   backleft.render();

   var backright = new Cube();
   backright.color = wool;
   backright.matrix.setTranslate(0, 0, 0);
   backright.matrix.rotate(g_jointAngle, 1, 0, 0); // Joint 1
   var backrightCoord = new Matrix4(backright.matrix);
   backright.matrix.rotate(170, 0, 1, 0);
   backright.matrix.scale(.10, -0.30, 0.10);
   backright.matrix.translate(.2, -.25, 1.5);
   backright.render();



   // lower legs
   var frontleftlow = new Cube();
   frontleftlow.color = skin;
   frontleftlow.matrix = frontleftCoord;
   frontleftlow.matrix.rotate(170, 0, 1, 0);
   frontleftlow.matrix.rotate(-g_jointAngle2, 0, 0, 1);
   frontleftlow.matrix.scale(0.08, 0.16, 0.08);
   frontleftlow.matrix.translate(-1.25, -1.75, -.8);
   frontleftlow.render();

   var frontrightlow = new Cube();
   frontrightlow.color = skin;
   frontrightlow.matrix = frontrightCoord;
   frontrightlow.matrix.rotate(170, 0, 1, 0);
   frontrightlow.matrix.rotate(g_jointAngle2, 0, 0, 1);
   frontrightlow.matrix.scale(0.08, 0.16, 0.08);
   frontrightlow.matrix.translate(.37, -1.75, -.8);
   frontrightlow.render();

   var backleftlow = new Cube();
   backleftlow.color = skin;
   backleftlow.matrix = backleftCoord;
   backleftlow.matrix.rotate(170, 0, 1, 0);
   backleftlow.matrix.rotate(-g_jointAngle2, 0, 0, 1);
   backleftlow.matrix.scale(0.08, 0.16, 0.08);
   backleftlow.matrix.translate(-1.25, -1.75, 2);
   backleftlow.render();

   var backrightlow = new Cube();
   backrightlow.color = skin;
   backrightlow.matrix = backrightCoord;
   backrightlow.matrix.rotate(170, 0, 1, 0);
   backrightlow.matrix.rotate(g_jointAngle2, 0, 0, 1);
   backrightlow.matrix.scale(0.08, 0.16, 0.08);
   backrightlow.matrix.translate(.37, -1.75, 2);
   backrightlow.render();

   // sky
   var sky = new Cube();
   sky.color = [.6, .9, .95, 1];
   sky.textureNum = 1;
   sky.matrix.scale(20,20,20);
   sky.matrix.translate(-.5, -.5, -.5);
   sky.render();

   // floor
   var floor = new Cube();
   floor.color = [.2, .9, .4, 1];
   floor.textureNum = 0;
   floor.matrix.translate(0,-.25,0);
   floor.matrix.scale(20,0,20);
   floor.matrix.translate(-.5, 0, -.5);
   floor.render();

}
