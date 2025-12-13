import * as THREE from "three";

export const loadMaterials = () => {
  const loader = new THREE.TextureLoader();
  const wood = loader.load("wood_counter.png");
  wood.wrapS = wood.wrapT = THREE.RepeatWrapping;
  
  const tiles = loader.load("kitchen_tiles.png");
  tiles.wrapS = tiles.wrapT = THREE.RepeatWrapping;
  tiles.repeat.set(6, 6); // Adjusted repeat for wall scale

  const tilesNormal = loader.load("kitchen_tiles_normal.png");
  tilesNormal.wrapS = tilesNormal.wrapT = THREE.RepeatWrapping;
  tilesNormal.repeat.set(6, 6);

  const drywall = loader.load("drywall_diffuse.png");
  drywall.wrapS = drywall.wrapT = THREE.RepeatWrapping;
  drywall.repeat.set(4, 4);

  const drywallNormal = loader.load("drywall_normal.png");
  drywallNormal.wrapS = drywallNormal.wrapT = THREE.RepeatWrapping;
  drywallNormal.repeat.set(4, 4);

  const metal = loader.load("metal_scratch.png");
  const dirty = loader.load("dirty_plate_texture.png");
  const hdrEnv = loader.load("kitchen_hdr.png");
  
  // Environment Map for realistic reflections
  hdrEnv.mapping = THREE.EquirectangularReflectionMapping;

  const counterMat = new THREE.MeshStandardMaterial({
    map: wood,
    roughness: 0.4,
  });

  const metalMat = new THREE.MeshStandardMaterial({
    map: metal,
    metalness: 0.8,
    roughness: 0.3,
    color: "#bbbbbb"
  });

  const rimMat = new THREE.MeshStandardMaterial({
    map: metal,
    metalness: 0.9,
    roughness: 0.2,
    color: "#cccccc"
  });

  const wallMat = new THREE.MeshStandardMaterial({
    map: drywall,
    normalMap: drywallNormal,
    roughness: 0.8,
    color: "#ffffff"
  });

  const ceilingMat = new THREE.MeshStandardMaterial({
    color: "#dddddd",
    roughness: 0.9,
    metalness: 0.0,
    side: THREE.DoubleSide
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    color: "#ffffff",
    metalness: 1.0,
    roughness: 0.15,
    envMapIntensity: 1.2,
  });
  
  const rubberMat = new THREE.MeshStandardMaterial({
    color: "#222222",
    roughness: 0.9,
    metalness: 0.0
  });

  const frameMat = new THREE.MeshStandardMaterial({
    color: "#e0e0e0",
    metalness: 0.1,
    roughness: 0.5,
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.05,
    transmission: 0.95, 
    thickness: 0.1,     
    ior: 1.5,           
    envMapIntensity: 1,
    transparent: true,
    opacity: 1,
  });

  const outdoorMat = new THREE.MeshBasicMaterial({
    map: hdrEnv,
    side: THREE.BackSide, 
  });

  const dirtyMat = new THREE.MeshStandardMaterial({
    map: dirty,
    roughness: 0.2,
    color: "#eeeeee",
  });

  const cabinetMat = new THREE.MeshStandardMaterial({
    color: "#f5f5f5", 
    roughness: 0.4,
    metalness: 0.1
  });

  const floorMat = new THREE.MeshStandardMaterial({
    color: "#2a2a2a",
    roughness: 0.7
  });

  return {
    wood, tiles, metal, dirty, hdrEnv, drywall, drywallNormal,
    counterMat, metalMat, rimMat, chromeMat, rubberMat, frameMat, glassMat, outdoorMat, dirtyMat, wallMat, ceilingMat, cabinetMat, floorMat
  };
};

