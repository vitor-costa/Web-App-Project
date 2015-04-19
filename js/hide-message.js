function hideMessage()
{
	var password = $('#password-space')[0].value;

	var text = $('#text-space')[0].value;
	var binaryText = convert_text_to_binary(text);	
	var metadata = prepare_metadata(binaryText, "txt");
	var unifiedData = processData(metadata, binaryText);

	window.alert(unifiedData);

	
}
function processData(metadata, data)
{
	return (metadata + data);
}