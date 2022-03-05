// Daniel John S. Carig
// asg5

let scene, camera, renderer;
let rtCamera, rtScene, renderTarget, rtCube, rtCube3, rtCube2;
let cube, texturedCube, sphere, pyramid, cylinder, cubeWithRenderMat;

let controls;
let fov = 90;
let near = 0.1;
let far = 1000;

function init(){
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x070707, near, 80);
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth/window.innerHeight, near, far);
    renderer = new THREE.WebGLRenderer({antialias : true});
    renderer.shadowMap.enabled = true;

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    const pillarGeo = new THREE.CylinderGeometry(0.5, 0.5, 10, 32);
	const pillar1Material = new THREE.MeshPhongMaterial({color : 0x00ff00});
    const pillar1 = new THREE.Mesh(pillarGeo, pillar1Material);
    pillar1.position.set(5, 0, 4);
    pillar1.castShadow = true;
    pillar1.receiveShadow = true;
    scene.add(pillar1);

    const pillar2 = new THREE.Mesh(pillarGeo, pillar1Material);
    pillar2.position.set(-5, 0, 4);
    pillar2.castShadow = true;
    pillar2.receiveShadow = true;
    scene.add(pillar2);

    const pillar3 = new THREE.Mesh(pillarGeo, pillar1Material);
    pillar3.position.set(5, 0, -10);
    pillar3.castShadow = true;
    pillar3.receiveShadow = true;
    scene.add(pillar3);

    const pillar4 = new THREE.Mesh(pillarGeo, pillar1Material);
    pillar4.position.set(-5, 0, -10);
    pillar4.castShadow = true;
    pillar4.receiveShadow = true;
    scene.add(pillar4);

    const roofGeo = new THREE.BoxGeometry(15, 0.2, 20);
    const roofMat = new THREE.MeshPhongMaterial({color : 0x606060});
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 5, -4);
    scene.add(roof);

    const roofLeftGeo = new THREE.BoxGeometry(5, 0.1, 20.2);
    const roofLeftMat = new THREE.MeshPhongMaterial({color : 0x808080});
    const roofLeft = new THREE.Mesh(roofLeftGeo, roofLeftMat);
    roofLeft.position.set(-3, 6.4, -4.05);    
	roofLeft.rotation.z = -Math.PI/4;
    scene.add(roofLeft);

    const roofRight = new THREE.Mesh(roofLeftGeo, roofLeftMat);
    roofRight.position.set(3, 6.4, -4.05);    
	roofRight.rotation.z = Math.PI/4;
    scene.add(roofRight);

    const geometryCube = new THREE.BoxGeometry(2, 2, 2);	
	const materialCube = new THREE.MeshPhongMaterial( {color:0xffff00});
    cube = new THREE.Mesh(geometryCube, materialCube);
    cube.position.set(5, 0, 0);
    scene.add(cube);

    const wallGeo = new THREE.BoxGeometry(0.05, 5, 20);
	const wallMat = new THREE.MeshPhongMaterial({color:0x033033});	
    const wallLeft = new THREE.Mesh(wallGeo, wallMat);
    wallLeft.position.set(7,2,-3.5);
    wallLeft.castShadow = true;
    wallLeft.receiveShadow = true;
    scene.add(wallLeft);

    const wallRight = new THREE.Mesh(wallGeo, wallMat);
    wallRight.position.set(-7, 2, -3.5);
    wallRight.castShadow = true;
    wallRight.receiveShadow = true;
    scene.add(wallRight);

    const hedgeGeo = new THREE.BoxGeometry(1, 1, 1);
    const hedgeMat = new THREE.MeshPhongMaterial({color : 0x078225});
	const hedgeMat3 = new THREE.MeshPhongMaterial({color : 0xf78225});
	const hedge = new THREE.Mesh(hedgeGeo, hedgeMat3);
    hedge.position.set(3, .48, 7);
    hedge.castShadow = true;
    hedge.receiveShadow = true;
    scene.add(hedge);

    const hedgeBushGeo = new THREE.SphereGeometry( 0.75, 32, 16 );
    const hedgeBushMat = new THREE.MeshPhongMaterial({color: 0x000000});
    const hedgeBush1 = new THREE.Mesh(hedgeBushGeo, hedgeBushMat);
    hedgeBush1.position.set(3, 1.48, 7);
    hedgeBush1.castShadow = true;
    hedgeBush1.receiveShadow = true;
    scene.add(hedgeBush1);

    const hedgeMat2 = new THREE.MeshPhongMaterial({color : 0x078ff5});
	const hedge2 = new THREE.Mesh(hedgeGeo, hedgeMat3);
    hedge2.position.set(-3, .48, 7);
    hedge2.castShadow = true;
    hedge2.receiveShadow = true;
    scene.add(hedge2);

    const hedgeBushMat2 = new THREE.MeshPhongMaterial({color: 0x000033});
    const hedgeBush2 = new THREE.Mesh(hedgeBushGeo, hedgeBushMat2);
    hedgeBush2.position.set(-3, 1.48, 7);
    hedgeBush2.castShadow = true;
    hedgeBush2.receiveShadow = true;
    scene.add(hedgeBush2);

    const hedgeGeoRow2 = new THREE.BoxGeometry(0.75, 0.75, 0.75);
	const hedge3 = new THREE.Mesh(hedgeGeo, hedgeMat);
    hedge3.position.set(-3, .373, 9);
    hedge3.castShadow = true;
    hedge3.receiveShadow = true;
    scene.add(hedge3);


	const hedge4 = new THREE.Mesh(hedgeGeo, hedgeMat2);
    hedge4.position.set(3, .373, 9);
    hedge4.castShadow = true;
    hedge4.receiveShadow = true;
    scene.add(hedge4);


	const texture = new THREE.TextureLoader().load('akatsuki.png');
    const texturedMaterial = new THREE.MeshPhongMaterial({map: texture});
    texturedCube = new THREE.Mesh(geometryCube, texturedMaterial);
    //texturedCube.position.set(-5, 0, 0);
	//texturedCube.position.set(0, 2, 9);
    texturedCube.castShadow = true;
    scene.add(texturedCube)

    

    const geometrySph = new THREE.SphereGeometry( 1, 32, 16 );
	const materialSph = new THREE.MeshPhongMaterial( { color: 0x105011 } );
    sphere = new THREE.Mesh( geometrySph, materialSph );
    sphere.castShadow = true;
	//sphere.position.set(0, 2, 9);
	sphere.position.set(0, 0, 4);
    scene.add( sphere );

	const materialSph2 = new THREE.MeshPhongMaterial( { color: 0x1239ff } );
    const sphere2 = new THREE.Mesh(geometrySph, materialSph2);
    sphere2.position.set(0, 7, 0);
    scene.add(sphere2);

	const sphere3 = new THREE.Mesh(geometrySph, materialSph2);
    sphere3.position.set(0, 8, -2.5);
    scene.add(sphere3);

    const materialSph4 = new THREE.MeshPhongMaterial( { color: 0x1239ff } );
	const sphere4 = new THREE.Mesh(geometrySph, materialCube);
	sphere4.position.set(0, 11, 0);
    scene.add(sphere4);


    var radius = 4;
    var height = 5;

    const geometryPyramid = new THREE.CylinderGeometry(0, radius, height, 4, 1)
    const materialPyramid = new THREE.MeshPhongMaterial();
    pyramid = new THREE.Mesh(geometryPyramid, materialPyramid);
	pyramid.position.set(-3, 0.5, -4);
    scene.add(pyramid);

    const geometryPyramid2 = new THREE.CylinderGeometry(0, 0.5, 3, 4, 1)
    const pyramid2 = new THREE.Mesh(geometryPyramid2, materialPyramid);
    pyramid2.rotation.y = Math.PI /4;
	pyramid2.position.set(4, 1.4, 8);
    scene.add(pyramid2);

    const pyramid3 = new THREE.Mesh(geometryPyramid2, materialPyramid);
    pyramid3.rotation.y = Math.PI /4;
	pyramid3.position.set(-4, 1.4, 8);
    scene.add(pyramid3);



    
    var mtlLoader = new THREE.MTLLoader();
   
    mtlLoader.setResourcePath('obj/')
    //mtlLoader.setPath('assets/')
    
    mtlLoader.load('obj/Wolf_One_obj.mtl', function(materials) {
        materials.preload();
        var loader = new THREE.OBJLoader();
        loader.setMaterials(materials);
       
        loader.load('obj/Wolf_One_obj.obj', function(object){
            //object.position.set(0,0,2);
			//object.position.set(-3, 1.48, 7);
			object.position.set(-3, 0.9, 9);
            object.castShadow = true;
            
            scene.add(object);
						
        });
		
    });
	
	    mtlLoader.load('obj/Wolf_One_obj.mtl', function(materials) {
        materials.preload();
        var loader = new THREE.OBJLoader();
        loader.setMaterials(materials);
       
        loader.load('obj/Wolf_One_obj.obj', function(object){
			object.position.set(3, 0.9, 9);
            object.castShadow = true;
            
            scene.add(object);
						
        });
		
    });
	
		mtlLoader.load('obj/E 45 Aircraft_obj.mtl', function(materials) {
        materials.preload();
        var loader = new THREE.OBJLoader();
        loader.setMaterials(materials);
       
        loader.load('obj/E 45 Aircraft_obj.obj', function(object){
            object.position.set(-8, 0.5, 9);
            object.castShadow = true;
            object.rotation.y = -Math.PI/2;
            scene.add(object);
						
        });
		
    });
	
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
    directionalLight.position.set(4, 4, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

  
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0x3df2e9, 0xf2bf3d, 0.5);
    scene.add(hemisphereLight);

    const spotLight = new THREE.SpotLight(0xFF0000, 3);
    spotLight.position.set(2, 3, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const spotLight2 = new THREE.SpotLight(0x0000FF, 2);
    spotLight2.position.set(30, 2, 2);
    spotLight2.castShadow = true;
    scene.add(spotLight2);


    const planeSize = 1000;
    const plainLoader = new THREE.TextureLoader();
    const plainTexture = plainLoader.load('checker.png');
    plainTexture.wrapS = THREE.RepeatWrapping;
    plainTexture.wrapT = THREE.RepeatWrapping;
    plainTexture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    plainTexture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({map:plainTexture, side : THREE.DoubleSide});
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    mesh.receiveShadow = true;
    scene.add(mesh);

    const box = new THREE.TextureLoader();
	const skybox = box.load('piazza_martin_lutero_2k.png', ()=>{
        const rt = new THREE.WebGLCubeRenderTarget(skybox.image.height);
        rt.fromEquirectangularTexture(renderer, skybox);
        scene.background = rt.texture;
    });


    

    for(let z = -100; z <= 100; z += 10)
    {
        for(let x = -100; x <= 100; x += 10)
        {
            if((x > 20 ) || x < -20  || z < -20 || z > 20)
            {
                trees(x, z);

            }
            
        }
    }

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.campingFactor = 0.25;
    controls.enableZoom = true;
    
    camera.position.z = 15;
    camera.position.y = 6;

    const rtWidth = 512;
    const rtHeight = 512;
    renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight);
    const rtFov = 120;
    const rtAspect = rtWidth / rtHeight;
    const rtNear = 0.1;
    const rtFar = 5;
    rtCamera = new THREE.PerspectiveCamera(rtFov, rtAspect, rtNear, rtFar);
    rtCamera.position.z = 2;
    
    rtScene = new THREE.Scene();
    rtScene.background = new THREE.Color('red');
    const rtLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    rtLight.position.set(-2, -2, 4);
    rtScene.add(rtLight);

    const rtBox = new THREE.BoxGeometry(1, 1, 1);
    const rtMat = new THREE.MeshPhongMaterial({color: 0x521738})
    rtCube = new THREE.Mesh(rtBox, rtMat);
    rtCube.position.x = -2;
    rtScene.add(rtCube);
    const rtMat2 = new THREE.MeshPhongMaterial({color: 0x5af7b8})
    rtCube2 = new THREE.Mesh(rtBox, rtMat2);
    rtCube2.position.x = 2;
    rtScene.add(rtCube2);
    const rtMat3 = new THREE.MeshPhongMaterial({color: 0xff2148})
    rtCube3 = new THREE.Mesh(rtBox, rtMat3);
    rtScene.add(rtCube3);
    
    const newRTMaterial = new THREE.MeshPhongMaterial({map:renderTarget.texture, });
    //cubeWithRenderMat = new THREE.Mesh(rtBox, newRTMaterial);
	cubeWithRenderMat = new THREE.Mesh(geometryCube, newRTMaterial);
    //cubeWithRenderMat.position.set(0, 2, 9);
	cubeWithRenderMat.position.set(-5, 0, 0);
    scene.add(cubeWithRenderMat);
    
}

//from https://threejs.org/manual/#en/billboards
function trees(x, z) {
    const trunkRadius = .2;
    const trunkHeight = 1;
    const trunkRadialSegments = 12;
    const trunkGeometry = new THREE.CylinderGeometry(
        trunkRadius, trunkRadius, trunkHeight, trunkRadialSegments);
    
    const topRadius = trunkRadius * 4;
    const topHeight = trunkHeight * 2;
    const topSegments = 12;
    const topGeometry = new THREE.ConeGeometry(
        topRadius, topHeight, topSegments);
    
    const trunkMaterial = new THREE.MeshPhongMaterial({color: 'brown'});
    const topMaterial = new THREE.MeshPhongMaterial({color: 'green'});


    const root = new THREE.Object3D();
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = trunkHeight / 2;
    trunk.castShadow = true;
    root.add(trunk);
    
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.y = trunkHeight + topHeight / 2;
    top.castShadow = true;
    root.add(top);
    
    root.position.set(x, 0, z);
    scene.add(root);

}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}



function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;    
    cube.rotation.y += 0.01; 

    texturedCube.rotation.x += 0.01;    
    texturedCube.rotation.y += 0.01; 

    cubeWithRenderMat.rotation.x += 0.01;
    cubeWithRenderMat.rotation.y += 0.01;
    cubeWithRenderMat.rotation.z += 0.01;
    rtCube.rotation.x += 0.01
    rtCube.rotation.y += 0.01

    rtCube2.rotation.x += 0.01
    rtCube2.rotation.y += 0.01

    rtCube3.rotation.x += 0.01
    rtCube3.rotation.y += 0.01
    
    renderer.setRenderTarget(renderTarget);
    renderer.render(rtScene, rtCamera);
    renderer.setRenderTarget(null);


    controls.update();

    renderer.render(scene, camera);
}



function main() {
    window.addEventListener('resize' , onWindowResize, false);
    init();
    animate();
}