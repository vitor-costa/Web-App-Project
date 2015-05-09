var globalCanvas;
function hideMessage() {
	var password = $('#password-space')[0].value;
	var text = $('#text-space')[0].value;
	var canvas = $("#canvas1")[0];
	globalCanvas = canvas;
	var imageData = getImageData(canvas); 

	var binaryText = convertTextToBinary(text);	
	var metadata = prepareMetadata(binaryText, "txt");
	var unifiedData = processData(metadata, binaryText);
	var positions = generateRandomPermutation(imageData.width * imageData.height, unifiedData.length, password);

	hideBinaryIntoImage(unifiedData, imageData, positions);
	setImageData(imageData);	

	$("#download-btn").removeClass('disabled-btn');
}

function seekMessage() {
	var password = $('#password-space-2')[0].value;
	var canvas = $("#canvas2")[0];
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
