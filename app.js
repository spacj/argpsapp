import { detectQRCode } from './qrDetector.js';
import { setup3DScene, placeObjectInAR, renderScene } from './threeDRenderer.js';

const video = document.getElementById('cameraFeed');
const canvas = document.getElementById('qrCanvas');

// Start the camera and load the 3D scene
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((err) => {
    console.error("Error accessing the camera", err);
  });

// Set up the canvas size to match the video
video.addEventListener('loadedmetadata', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
});

// Initialize 3D scene
setup3DScene();

// Start detecting QR codes and render the 3D object when found
detectQRCode(video, canvas, (qrCode) => {
  const qrPosition = { x: 0, y: 0, z: -5 }; // You can derive a real position using the QR code data
  placeObjectInAR(qrPosition);
});

// Start rendering the 3D scene
renderScene();
