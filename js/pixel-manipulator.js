function getImageData(canvas) {
	// element = document.getElementById("canvas1");
  c = canvas.getContext("2d");

  // read the width and height of the canvas
  width = canvas.width;
  height = canvas.height;

  // create a new batch of pixels with the same
  // dimensions as the image:
  imageData = c.getImageData(0, 0, width, height);

  return imageData;
}

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + (y * imageData.width)) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function getPixel(imageData, x, y) {
    index = (x + (y * imageData.width)) * 4;
    var r = imageData.data[index+0];
    var g = imageData.data[index+1];
    var b = imageData.data[index+2];
    var a = imageData.data[index+3];
    return [r,g,b,a];
}

function setImageData(imageData) {
	// copy the image data back onto the canvas
	c.putImageData(imageData, 0, 0); // at coords 0,0
}