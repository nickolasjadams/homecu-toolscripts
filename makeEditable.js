/**
 * makeEditable
 * Generate a editable page for tables.  !! Does not work on sites with table layouts.  
 * Works efficiently with TableCloth
 *
 * Assumptions:
 * Your dot filename is formatted like .edit-[filename]frm.html
 * Your non-dot filename is formatted like edit-[filename].html
 * Your running the script on our live servers
 *
 * @params
 * wrapperId: narrows table selection
 * rateType: titles your editable document for the backend
 * serverNum: only the number
 */

function makeEditable(wrapperId, rateType, serverNum) {
	var error = false;
	if (rateType == undefined || serverNum == undefined) {
		error = true;
	}
	var meta = '\n<meta HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">\n<meta HTTP-EQUIV="Pragma" CONTENT="no-cache">\n<meta HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">\n';	
	//if (serverNum == 5) {
		var cgiType = 'bin';
	//} 
	/* I believe all our editform.pl files are in a bin
	 else {
		var cgiType = 'live';
	} */
	var fileName = window.location.pathname;
		fileName = fileName.split('.html');
		fileName = fileName[0].split('/');
		fileName = fileName[fileName.length - 1];

	var form = '\n<form action="https://www' + serverNum + '.homecu.net/cgi-' + cgiType + '/editform.pl" name="rates" method="post">\n' + '<input type="hidden" name="next_page" value="' + window.location.href + '">\n<input type="hidden" name="source" value=".edit-' + fileName + 'frm.html">\n<input type="hidden" name="target" value="' + fileName + '.html">\n';
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

	if (wrapperId != undefined) {
		var all = document.getElementById(wrapperId).innerHTML;
		allCode.value = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>Edit ' + rateType + ' Rates</title>' + meta + '</head>\n<body>\n'
		+ form
		+ all + '<input type="submit" value="Save Changes">\n</form>\n</body>\n</html>';
	} else {
		error = true;
		console.log('Please check %c\'wrapperId\', \'rateType\', and \'serverNum\' %cparameters', 'color: orange;', 'color: black;');
	}

	if (error == false) {
		allCode.select();
		document.execCommand("copy");
		console.log('An editable page has been created in Textarea below');
		console.log('Go make neccessary edits to form data');
		console.log('Copied To Clipboard');
	}	

}
makeEditable('srates', 'Savings', 6);
