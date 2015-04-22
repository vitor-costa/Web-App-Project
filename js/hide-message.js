var canvas;
function hideMessage()
{
	var password = $('#password-space')[0].value;
	var text = $('#text-space')[0].value;
	canvas = $("#canvas1")[0];
	var context = canvas.getContext("2d");
	readImage($("#fileUpload")[0], context);
	var imageData = getImageData(canvas); 

	var binaryText = convertTextToBinary(text);	
	var metadata = prepareMetadata(binaryText, "txt");
	var unifiedData = processData(metadata, binaryText);
	var positions = generateRandomPermutation(unifiedData.length, imageData.width * imageData.height, password);

	hideBinaryIntoImage(unifiedData, imageData, positions);
	setImageData(imageData);

	setTimeout(function() {
		window.open(canvas.toDataURL('image/png'));	
	}, 1000);
}

function processData(metadata, data)
{
	return (metadata + data);
}