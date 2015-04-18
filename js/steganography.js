function convert_text_to_binary(text) {
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

function prepare_metadata(data, extension) {
	var length = convert_text_to_binary(data.length.toString());
	var ext = convert_text_to_binary(extension);
	var binary;
	var terminator = "00010100";
	binary = length + terminator + ext + terminator;
	return binary;
}