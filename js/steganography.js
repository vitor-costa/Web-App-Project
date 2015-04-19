function convertTextToBinary(text) {
  var  binary = "";
    for (i=0; i < text.length; i++) {
        binary += byteString(text[i]);
    }
  return binary;
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
		var generatedNumber = 1 + getRandomArbitrary(0, Number.MAX_VALUE) % ((totalNumberOfElements) - i);
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