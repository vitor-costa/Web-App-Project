var globalCanvas;
function hideMessage() {
	var password = $('#password-space')[0].value;
	var text = $('#text-space')[0].value;
	var canvas = $("#canvas1")[0];
	globalCanvas = canvas;
	// var context = canvas.getContext("2d");
	// readImage($("#fileUpload")[0], context);
	var imageData = getImageData(canvas); 

	var binaryText = convertTextToBinary(text);	
	var metadata = prepareMetadata(binaryText, "txt");
	var unifiedData = processData(metadata, binaryText);
	var positions = generateRandomPermutation(imageData.width * imageData.height, unifiedData.length, password);

	hideBinaryIntoImage(unifiedData, imageData, positions);
	setImageData(imageData);

	// window.open(canvas.toDataURL('image/png'));	

	
}

function seekMessage() {
	var password = $('#password-space-2')[0].value;
	var canvas = $("#canvas2")[0];
	// var context = canvas.getContext('2d');
	// readImage($('#file-upload-2'), context);
	var imageData = getImageData(canvas);

	var pixelNumber = imageData.width * imageData.height;
	var positions = generateRandomPermutation(pixelNumber, pixelNumber, password);

	var data = extractSecretMessage(imageData, positions);
	console.log(data);
	var binary = data[0];
	var extension = data[1];

	var secretMessage = convertBinaryToText(binary);

	window.alert(secretMessage);

	
}

function processData(metadata, data) {
	return (metadata + data);
}

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
	// readImage($("#fileUpload")[0], context);
	var imageData = getImageData(canvas); 

	var binaryText = convertTextToBinary(text);	
	var metadata = prepareMetadata(binaryText, "txt");
	var unifiedData = processData(metadata, binaryText);
	var pixelNumber = imageData.width * imageData.height;
	var positions = generateRandomPermutation(pixelNumber, unifiedData.length, password);
	//
	hideBinaryIntoImage(unifiedData, imageData, positions);

	
	// console.log('pixelNumber>>'+pixelNumber);
	// console.log('posAntes>>'+positions[0]+','+positions[1]+','+positions[2]+','+positions[3]);
	positions = generateRandomPermutation(pixelNumber, pixelNumber, password);
	// console.log('posDepois>>'+positions[0]+','+positions[1]+','+positions[2]+','+positions[3]);
	var data = extractSecretMessage(imageData, positions);
	var binary = data[0];
	var extension = data[1];
	console.log('binaryLength>>'+binary.length);
	console.log('ext>>'+extension);

	var secretMessage = convertBinaryToText(binary);

	window.alert(secretMessage);

}

function testStringConversion() {
	str = 'teste de string';
	binary = convertTextToBinary(str);
	newStr = convertBinaryToText(binary);
	return str == newStr;
}
