let scene, camera, renderer, cube;
let isObjectPlaced = false;
let objectPosition = null;

export function setup3DScene() {
  // Create the scene
  scene = new THREE.Scene();

  // Create the camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Create the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Attach the renderer to the DOM
  document.getElementById('threeDScene').appendChild(renderer.domElement);

  // Create a 3D object (cube)
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  cube.visible = false; // Hidden until placed
  scene.add(cube);
}

export function placeObjectInAR(qrPosition) {
  // Anchor the object in the world where the QR code was found
  objectPosition = new THREE.Vector3(qrPosition.x, qrPosition.y, qrPosition.z);
  cube.position.copy(objectPosition);
  cube.visible = true;
  isObjectPlaced = true;
}

export function renderScene() {
  if (isObjectPlaced) {
    camera.lookAt(objectPosition);
  }

  renderer.render(scene, camera);
  
  requestAnimationFrame(renderScene); // Continue rendering
}
