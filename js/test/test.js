function preTest() {
	var canvas = $("#canvas1")[0];
	var context = canvas.getContext("2d");
	readImage($("#fileUpload")[0], context);
	setTimeout(test(), 1000);
}

function testHideAndSeek() {
	var password = 'senha'
	var text = 'ola mundo'
	var canvas = $("#canvas1")[0];
	var context = canvas.getContext("2d");
	var imageData = getImageData(canvas); 

	var binaryText = convertTextToBinary(text);	
	var metadata = prepareMetadata(binaryText, "txt");
	var unifiedData = processData(metadata, binaryText);
	var pixelNumber = imageData.width * imageData.height;
	var positions = generateRandomPermutation(pixelNumber, unifiedData.length, password);
	
	hideBinaryIntoImage(unifiedData, imageData, positions);

	positions = generateRandomPermutation(pixelNumber, pixelNumber, password);
	var data = extractSecretMessage(imageData, positions);
	var binary = data[0];
	var extension = data[1];

	var secretMessage = convertBinaryToText(binary);

	// window.alert(secretMessage);
	// console.log(secretMessage);

	return text == secretMessage;
}

function testStringConversion() {
	str = 'teste de string';
	binary = convertTextToBinary(str);
	newStr = convertBinaryToText(binary);
	// console.log(newStr);
	return str == newStr;
}

function testAll() {
	funcs = [testStringConversion, testHideAndSeek];

	for(var i = 0; i < funcs.length; i++) {
		if(funcs[i]()) {
			console.log("Function " + i + " passed.");
		} else {
			console.log("Error in function: " + funcs[i]);
		}
	}
}