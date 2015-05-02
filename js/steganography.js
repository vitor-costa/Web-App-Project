function convertTextToBinary(text) {
  var  binary = "";
    for (i=0; i < text.length; i++) {
        binary += byteString(text[i]);
    }
  return binary;
}

function convertBinaryToText(binary) {
	var byteNumber = binary.length / 8;
	var text = "";

	for(var i = 0; i < byteNumber; i++) {
		var oneByte = binary.substr(i * 8, 8);
		text += String.fromCharCode(parseInt(oneByte, 2));
	}

	return text;
}

// Return ascii code always with 8 bits
function byteString(n) {
	return ("000000000" + n.charCodeAt(0).toString(2)).substr(-8)
}

function prepareMetadata(data, extension) {
	var length = convertTextToBinary(data.length.toString());
	var ext = convertTextToBinary(extension);
	var binary;
	var terminator = "00010100";
	binary = length + terminator + ext + terminator;
	return binary;
}

function hideBinaryIntoImage(binary, imageBuffer, positions) {
	var width = imageBuffer.width;
	var heigth = imageBuffer.height;
	var x, y;

	for (var i = 0; i < binary.length; i++) {
		x = positions[i] % width;
		y = (positions[i] - x) / width	

		// Set imageBuffer pixels parity according to binary
		// if value of pixel blue component is even
		var pixel = getPixel(imageBuffer, x, y);
		var blue = pixel[2];
		if(blue % 2 == 0) {
			// if bit is 1 (odd)
			if(binary[i] == "1") {
				// change parity
				blue++;
				setPixel(imageBuffer, x, y, pixel[0], pixel[1], blue, pixel[3]);
				console.log('>'+blue+'-'+getPixel(imageBuffer,x,y)[2]+'<');
			}
			// else, OK! (don't change parity)
		} else { // if value of pixel blue component is odd
			// if bit is 0 (even)
			if(binary[i] == "0") {
				// change parity
				// range [0,255]
				if(blue == 255) {
					blue--;
				} else {
					blue++;
				}
				setPixel(imageBuffer, x, y, pixel[0], pixel[1], blue, pixel[3]);
				// console.log('>'+blue+'-'+getPixel(imageBuffer,x,y)[2]+'<');
			}
			// else, OK!
		}
	};	
}

function readImage(element, context) {
  if ( element.files && element.files[0] ) {
      var FR= new FileReader();
      FR.onload = function(e) {
         var img = new Image();
         img.onload = function() {
           context.drawImage(img, 0, 0, img.width, img.height, 0, 0, 200, 200);
         };
         img.src = e.target.result;
      };       
      FR.readAsDataURL( element.files[0] );
  }
}

function loadCanvas1(element) {
	var canvas = $("#canvas1")[0];
	var context = canvas.getContext("2d");
	readImage(element, context);
}

function loadCanvas2(element) {
	var canvas = $("#canvas2")[0];
	var context = canvas.getContext("2d");
	readImageWithoutResize(element, context);
}

function readImageWithoutResize(element, context) {
  if ( element.files && element.files[0] ) {
      var FR= new FileReader();
      FR.onload = function(e) {
         var img = new Image();
         img.onload = function() {
           context.drawImage(img, 0, 0);
         };
         img.src = e.target.result;
      };       
      FR.readAsDataURL( element.files[0] );
  }
}

function generateRandomPermutation(totalNumberOfElements, numberOfPermutations, seed) {
	var crypto = [];
	// StringBuilder sb = new StringBuilder();
	var random = Math.seedrandom(seed);

	var imageArray = [];
	// int[] imageArray = new int[totalNumberOfElements];
	for(var i = 0; i < totalNumberOfElements; i++) {
		imageArray.push(i);
	}

	if(numberOfPermutations > totalNumberOfElements) {
		numberOfPermutations = totalNumberOfElements;
	}

	for(var i = 0; i < numberOfPermutations; i++) {
		var aux = imageArray[i];
		// var generatedNumber = i + random.nextInt(Integer.MAX_VALUE) % ((totalNumberOfElements) - i);
		var generatedNumber = i + getRandomArbitrary(0, Number.MAX_VALUE) % ((totalNumberOfElements) - i);
		imageArray[i] = imageArray[generatedNumber];
		imageArray[generatedNumber] = aux;
	}

	for(var i = 0; i < imageArray.length; i++) {
		crypto.push(imageArray[i]);
	}

	return crypto;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function extractSecretMessage(imageBuffer, positions) {
	var terminator = "00010100";
	var width = imageBuffer.width;
	var heigth = imageBuffer.height;
	var x, y;
	var binaryIndex = 0;

	console.log("passou aqui");
	// extract length
	var metadata1 = extractNextMetadata(terminator, imageBuffer, positions, binaryIndex);
	var length = parseInt(metadata1[0]);
	binaryIndex = metadata1[1];
	console.log("passou aqui");

	// extract extension
	var metadata2 = extractNextMetadata(terminator, imageBuffer, positions, binaryIndex);
	var extension = metadata2[0];
	binaryIndex = metadata2[1];
	console.log("passou aqui");

	// extract data binary
	var dataBinary = "";
	for(var i = binaryIndex; i < binaryIndex + length; i++) {
		// for(var j = 0; j < 8; j++) {
		x = positions[i] % width;
		y = (positions[i] - x) / width;

		var pixel = getPixel(imageBuffer, x, y);
		var blue = pixel[2];
		// if value of pixel blue component is even
		if(blue % 2 == 0) {
			dataBinary += "0";
		} else { // if value of pixel blue component is odd
			dataBinary += "1";
		}
		// }
	}
	console.log("passou aqui");

	return [dataBinary, extension];
}

function extractNextMetadata(terminator, imageBuffer, positions, binaryIndex) {
	var metadata = "";
	var oneByte = "";
	var i = binaryIndex;
	while(oneByte != terminator && i<400) {
		if(oneByte != "") {
			metadata += String.fromCharCode(parseInt(oneByte, 2));
			console.log("metadata>>" + metadata);
		}
		oneByte = "";
		for(var j = 0; j < 8; j++) {
			x = positions[i] % width;
			y = (positions[i] - x) / width;
			i++;

			var pixel = getPixel(imageBuffer, x, y);
			var blue = pixel[2];
			// if value of pixel blue component is even
			if(blue % 2 == 0) {
				oneByte += "0";
			} else { // if value of pixel blue component is odd
				oneByte += "1";
			}
			console.log("--"+oneByte);
		}
	}
	binaryIndex = i;
	return [metadata, binaryIndex];
}