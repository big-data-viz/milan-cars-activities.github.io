function iframeLoaded_one() {
	var iFrameID = document.getElementById('iframe_one');
	if(iFrameID) {
		// here you can make the height, I delete it first, then I make it again
		iFrameID.height = "";
		iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
	}   
}
function iframeLoaded_two() {
	var iFrameID = document.getElementById('iframe_two');
	if(iFrameID) {
		// here you can make the height, I delete it first, then I make it again
		iFrameID.height = "";
		iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
	}   
}
function iframeLoaded_three() {
	var iFrameID = document.getElementById('iframe_three');
	if(iFrameID) {
		// here you can make the height, I delete it first, then I make it again
		iFrameID.height = "";
		iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
	}   
}