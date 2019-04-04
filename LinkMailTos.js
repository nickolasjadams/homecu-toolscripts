// Make a[href^="mailto:"] tags editable
// Leave the email address empty in the markup
// 		<a href="mailto:">{{editable region}}</a>
// Paste function code in script.js
// Call the function pages that show edited content.
// Script grabs the content in {{editable region}} and places in in href="mailto:"

function linkMailTos(wrapperId) {
	var mailAnchors = $('#'+wrapperId+' a[href^="mailto:"');
	for (i=0; i < mailAnchors.length; i++) {
		let address = mailAnchors[i].innerText;
		mailAnchors[i].href = "mailto:"+address;
	}
}
linkMailTos('content');