var globalCanvas;
function hideMessage() {
	var password = $('#password-space')[0].value;
	var text = $('#text-space')[0].value;
	var canvas = $("#canvas1")[0];
	globalCanvas = canvas;
	var context = canvas.getContext("2d");
	readImage($("#fileUpload")[0], context);
	var imageData = getImageData(canvas); 

	var binaryText = convertTextToBinary(text);	
	var metadata = prepareMetadata(binaryText, "txt");
	var unifiedData = processData(metadata, binaryText);
	var positions = generateRandomPermutation(unifiedData.length, imageData.width * imageData.height, password);

	hideBinaryIntoImage(unifiedData, imageData, positions);
	setImageData(imageData);

	// window.open(canvas.toDataURL('image/png'));	

	
}

function seekMessage() {
	var password = $('#password-space-2')[0].value;
	var canvas = $("#canvas2")[0];
	var context = canvas.getContext('2d');
	readImage($('#file-upload-2'), context);
	var imageData = getImageData(canvas);

	console.log("passou 1");

	var pixelNumber = imageData.width * imageData.height;
	var positions = generateRandomPermutation(pixelNumber, pixelNumber, password);

	console.log("passou 2");

	var data = extractSecretMessage(imageData, positions);
	console.log(data);
	var binary = data[0];
	var extension = data[1];

	console.log("passou 3");

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

function test() {
	var password = 'senha'
	var text = 'ola mundo'
	var canvas = $("#canvas1")[0];
	var context = canvas.getContext("2d");
	// readImage($("#fileUpload")[0], context);
	var imageData = getImageData(canvas); 

	var binaryText = convertTextToBinary(text);	
	var metadata = prepareMetadata(binaryText, "txt");
	var unifiedData = processData(metadata, binaryText);
	var positions = generateRandomPermutation(unifiedData.length, imageData.width * imageData.height, password);
	//
	hideBinaryIntoImage(unifiedData, imageData, positions);

	var pixelNumber = imageData.width * imageData.height;
	positions = generateRandomPermutation(pixelNumber, pixelNumber, password);
	var data = extractSecretMessage(imageData, positions);
	var binary = data[0];
	var extension = data[1];
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
