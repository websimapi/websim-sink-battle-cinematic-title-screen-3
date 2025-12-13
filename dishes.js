import * as THREE from "three";

export const createDishes = (scene, materials) => {
  const { dirtyMat, dirty } = materials;

  const plateGeo = new THREE.CylinderGeometry(0.4, 0.3, 0.05, 32);
  const cupGeo = new THREE.CylinderGeometry(0.15, 0.12, 0.4, 16);

  const dishesGroup = new THREE.Group();
  dishesGroup.position.set(0, -0.78, 0); 
  scene.add(dishesGroup);

  const addPlate = (parent, pos, rot) => {
    const mesh = new THREE.Mesh(plateGeo, dirtyMat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
  };

  const addCup = (parent, pos, rot) => {
    const mat = new THREE.MeshStandardMaterial({
      color: "#ccbbaa",
      roughness: 0.5,
      map: dirty,
    });
    const mesh = new THREE.Mesh(cupGeo, mat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
  };

  const pile = new THREE.Group();
  pile.position.set(2.4, 0.78, 0.2); 
  dishesGroup.add(pile);

  addPlate(pile, [0, 0, 0], [0.1, 0, 0]);
  addPlate(pile, [0.05, 0.06, 0.02], [-0.05, 1, 0]);
  addPlate(pile, [-0.05, 0.12, -0.05], [0.05, 2, 0.1]);
  addPlate(pile, [0.1, 0.18, 0.05], [0.1, 3, -0.05]);
  addCup(pile, [-0.4, 0.1, 0.3], [0, 0, 1.4]);

  const forkGeo = new THREE.BoxGeometry(0.02, 0.02, 0.8);
  const forkMat = new THREE.MeshStandardMaterial({
    color: "#888888",
    metalness: 1,
    roughness: 0.2,
  });
  const fork = new THREE.Mesh(forkGeo, forkMat);
  fork.position.set(0.2, 0.21, 0);
  fork.rotation.set(0, 0.5, 0.1);
  fork.castShadow = true;
  pile.add(fork);

  addPlate(dishesGroup, [-1.0, 0, 0.2], [0.2, 0, 0]);
  addPlate(dishesGroup, [-0.8, 0.05, -0.2], [-0.1, 0.5, 0.2]);
  addCup(dishesGroup, [-1.2, 0.1, 0.4], [1.7, 0, -0.2]);

  addPlate(dishesGroup, [1.0, 0, -0.3], [0.1, 0.2, 0.1]);
  addPlate(dishesGroup, [0.9, 0.08, 0.1], [-0.2, 2.5, 0.1]);
  addCup(dishesGroup, [1.1, 0.05, 0.5], [1.5, 0.5, -0.4]);
};

