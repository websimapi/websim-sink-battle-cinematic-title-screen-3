import * as THREE from "three";

export const setupLighting = (scene) => {
  const ambient = new THREE.AmbientLight(0x404040, 0.5); 
  scene.add(ambient);

  // Sunlight
  const sunLight = new THREE.DirectionalLight(0xfffaf0, 4); 
  sunLight.position.set(2, 5, -8); 
  sunLight.target.position.set(0, 0, 0); 
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.bias = -0.0001;
  sunLight.shadow.normalBias = 0.02; // Helps with self-shadowing acne/peter-panning
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 20;
  sunLight.shadow.camera.left = -5;
  sunLight.shadow.camera.right = 5;
  sunLight.shadow.camera.top = 5;
  sunLight.shadow.camera.bottom = -5;
  scene.add(sunLight);
  scene.add(sunLight.target);

  // Window Fill
  const windowFill = new THREE.SpotLight(0xddeeff, 2, 15, Math.PI / 3, 0.5, 1);
  windowFill.position.set(0, 3, -1.8); 
  windowFill.target.position.set(0, 0, 2);
  scene.add(windowFill);
  scene.add(windowFill.target);

  // Interior Ceiling Light - Warm top light
  const ceilingLight = new THREE.PointLight(0xffeedd, 1.5, 12);
  ceilingLight.position.set(0, 3.2, 3);
  ceilingLight.castShadow = true;
  ceilingLight.shadow.bias = -0.0001;
  ceilingLight.shadow.normalBias = 0.01;
  scene.add(ceilingLight);
};

export const createEnvironment = (scene, materials) => {
  const { frameMat, glassMat, outdoorMat, wood, wallMat, ceilingMat, floorMat } = materials;

  const windowWidth = 4;
  const windowHeight = 2.5;
  const frameThickness = 0.1;
  const frameDepth = 0.15;
  const windowZ = -2;

  // Window Frame
  const topFrame = new THREE.Mesh(
    new THREE.BoxGeometry(windowWidth + frameThickness * 2, frameThickness, frameDepth),
    frameMat,
  );
  topFrame.position.set(0, 2.8, windowZ);
  topFrame.castShadow = true;
  scene.add(topFrame);

  const bottomFrame = new THREE.Mesh(
    new THREE.BoxGeometry(windowWidth + frameThickness * 2, frameThickness, frameDepth),
    frameMat,
  );
  bottomFrame.position.set(0, 0.2, windowZ);
  bottomFrame.castShadow = true;
  bottomFrame.receiveShadow = true;
  scene.add(bottomFrame);

  const leftFrame = new THREE.Mesh(
    new THREE.BoxGeometry(frameThickness, windowHeight + 0.1, frameDepth),
    frameMat,
  );
  leftFrame.position.set(-windowWidth / 2 - frameThickness / 2, 1.5, windowZ);
  leftFrame.castShadow = true;
  scene.add(leftFrame);

  const rightFrame = new THREE.Mesh(
    new THREE.BoxGeometry(frameThickness, windowHeight + 0.1, frameDepth),
    frameMat,
  );
  rightFrame.position.set(windowWidth / 2 + frameThickness / 2, 1.5, windowZ);
  rightFrame.castShadow = true;
  scene.add(rightFrame);

  // Glass
  const glassGeo = new THREE.BoxGeometry(windowWidth, windowHeight, 0.02);
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.set(0, 1.5, windowZ);
  scene.add(glass);

  // Outdoor View
  const outdoorGeo = new THREE.PlaneGeometry(12, 8);
  const outdoorView = new THREE.Mesh(outdoorGeo, outdoorMat);
  outdoorView.position.set(0, 2, -5); 
  outdoorView.rotation.y = Math.PI; 
  scene.add(outdoorView);

  // Window Sill
  const sill = new THREE.Mesh(
    new THREE.BoxGeometry(10, 0.08, 0.6),
    new THREE.MeshStandardMaterial({
      map: wood,
      roughness: 0.4,
    }),
  );
  sill.position.set(0, 0.1, -1.7);
  sill.castShadow = true;
  sill.receiveShadow = true;
  scene.add(sill);

  // Walls
  const wallGroup = new THREE.Group();
  wallGroup.position.z = -2.0; 
  
  // Dimensions based on window frame bounds - adjusted to overlap frame slightly to prevent light leaks
  const roomWidth = 20;
  const roomHeight = 3.5; 
  const winBoundLeft = -2.08;  // Was -2.1
  const winBoundRight = 2.08;  // Was 2.1
  const winBoundTop = 2.82;    // Was 2.85
  const winBoundBottom = 0.18; // Was 0.15

  // Left Wall
  const leftW = (roomWidth / 2) + winBoundLeft; 
  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(leftW, roomHeight, 0.2),
    wallMat
  );
  leftWall.position.set(-10 + leftW/2, roomHeight/2, 0);
  leftWall.castShadow = true;
  leftWall.receiveShadow = true;
  wallGroup.add(leftWall);

  // Right Wall
  const rightW = (roomWidth / 2) - winBoundRight;
  const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(rightW, roomHeight, 0.2),
    wallMat
  );
  rightWall.position.set(10 - rightW/2, roomHeight/2, 0);
  rightWall.castShadow = true;
  rightWall.receiveShadow = true;
  wallGroup.add(rightWall);

  // Top Wall (Header)
  const midW = winBoundRight - winBoundLeft;
  const topH = roomHeight - winBoundTop;
  if (topH > 0) {
    const topWall = new THREE.Mesh(
      new THREE.BoxGeometry(midW, topH, 0.2),
      wallMat
    );
    topWall.position.set(0, winBoundTop + topH/2, 0);
    topWall.castShadow = true;
    topWall.receiveShadow = true;
    wallGroup.add(topWall);
  }

  // Bottom Wall (Apron)
  const botH = winBoundBottom;
  if (botH > 0) {
    const botWall = new THREE.Mesh(
      new THREE.BoxGeometry(midW, botH, 0.2),
      wallMat
    );
    botWall.position.set(0, botH/2, 0);
    botWall.castShadow = true;
    botWall.receiveShadow = true;
    wallGroup.add(botWall);
  }

  scene.add(wallGroup);

  // Ceiling
  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    ceilingMat
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = roomHeight;
  ceiling.receiveShadow = true;
  scene.add(ceiling);

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    floorMat
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -3.5; 
  floor.receiveShadow = true;
  scene.add(floor);
};

