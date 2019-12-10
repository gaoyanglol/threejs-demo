import * as THREE from './vendor/three/three.js';

let container;
let camera;
let renderer;
let scene;
let mesh;

function init() {
  container = document.querySelector('#scene-container');
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8FBCD4);

  createCamera();
  createLights();
  createMeshes();
  createRenderer();

  renderer.setAnimationLoop( () => {
    update();
    render();
  });
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(
    35,  //FOV 
    container.clientWidth / container.clientHeight,  // aspect
    0.1, // near clipping plane
    100 // far clipping plane
  );
  camera.position.set(0, 0, 10);
}

function createLights() {
  const light = new THREE.DirectionalLight(0xffffff, 3.0);
  light.position.set(10, 10, 10);
  
  scene.add(light);
}

function createMeshes() {
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('../textures/uv_test_bw.png');

  texture.encoding = THREE.sRGBEncoding;
  texture.anisotropy = 16;

  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });

  mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);
}

function createRenderer() {
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  container.appendChild(renderer.domElement);
}

function update() {
  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}
window.addEventListener('resize', onWindowResize);

init();