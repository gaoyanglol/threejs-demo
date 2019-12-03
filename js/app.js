// import * as THREE from './vendor/three/three.js';

let container;
let camera;
let renderer;
let scene;
let mesh;

function init() {
  container = document.querySelector('#scene-container');
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8FBCD4);

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 100;

  camera = new THREE.PerspectiveCamera(fov, aspect,near, far);
  camera.position.set(0, 0, 10);

  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  const material = new THREE.MeshStandardMaterial({color: 0x800080});

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const light = new THREE.DirectionalLight(0xffffff, 5.0);
  light.position.set(10, 10, 10);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  renderer.setAnimationLoop( () => {
    update();
    render();
  });
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