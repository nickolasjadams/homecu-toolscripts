// call function with type: 'whole' or 'partial'
function makeEditable(type, wrapperId, rateType, serverNum) {
	var meta = '<meta HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT"><meta HTTP-EQUIV="Pragma" CONTENT="no-cache"><meta HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">';	
	if (serverNum == 5) {
		var cgiType = 'bin';
	} else {
		var cgiType = 'live';
	}
	var fileName = window.location.pathname;
		fileName = fileName.split('.html');
		fileName = fileName[0].split('/');
		fileName = fileName[fileName.length - 1];

	var form = '<form action="https://www' + serverNum + '.homecu.net/cgi-' + cgiType + '/editform.pl" name="rates" method="post">' + '<input type="hidden" name="next_page" value="' + window.location.href + '"><input type="hidden" name="source" value=".edit-' + fileName + 'frm.html"><input type="hidden" name="target" value="' + fileName + '.html">';
	var cells = document.getElementsByTagName('td');
	var cellsArray = [];

	for (i = 0; i < cells.length; i++) {
		cellsArray.push(cells[i]);
	}
	var i = 0;
	cellsArray.forEach(function(td) {
		i++;
		var saveVal = td.innerHTML;
		var clear = '';
		var ui = "<input type='text' name='gen_" + i + "' value='" + saveVal + "'>";

		td.innerHTML = clear;
		td.innerHTML = ui;
		td.children[0].value = saveVal;
	})

	var ta = document.createElement('textarea');
	ta.setAttribute('id', 'allCode');
	document.body.appendChild(ta);

	var allCode = document.getElementById('allCode');
		allCode.style.width = "100%";
		allCode.style.height = "400px";
		allCode.style.fontFamily = "sans-serif";

	if (type === 'whole') {
		var all = document.documentElement.outerHTML;
		allCode.value = '<!DOCTYPE html>' + all;
		console.log('A \'whole\' page has been created in Textarea below');
	} else if (type === 'partial' && wrapperId != undefined) {
		var all = document.getElementById(wrapperId).innerHTML;
		allCode.value = '<!DOCTYPE html><html lang="en"><head><title>Edit ' + rateType + ' Rates</title>' + meta + '</head><body>'
		+ form
		+ all + '<input type="submit" value="Save Changes"></form></body></html>';
		console.log('A \'partial\' page has been created in Textarea below');
		console.log('Go make neccessary edits to form data');
	} else {
		console.log('Please check %c\'type\' %cand %c\'wrapperId\' %cparameters', 'color: orange;', 'color: black;', 'color: orange;', 'color: black;');
	}

}
makeEditable('partial', 'srates', 'Savings', 6);





