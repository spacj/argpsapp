export function detectQRCode(videoElement, canvasElement, callback) {
    const canvasContext = canvasElement.getContext('2d');
    
    function processFrame() {
      canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      
      const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
      const code = jsQR(imageData.data, canvasElement.width, canvasElement.height);
      
      if (code) {
        callback(code);
      }
      
      requestAnimationFrame(processFrame); // Continue processing frames
    }
    
    requestAnimationFrame(processFrame);
  }
  