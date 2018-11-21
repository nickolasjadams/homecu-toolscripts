// call function with type: 'whole' or 'partial'
function makeEditable(type, wrapperId) {
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
		allCode.value = all;
		console.log('A \'partial\' page has been created in Textarea below');
	} else {
		console.log('Please check %c\'type\' %cand %c\'wrapperId\' %cparameters', 'color: orange;', 'color: black;', 'color: orange;', 'color: black;');
	}

}
makeEditable();