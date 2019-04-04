var numberOfLinks = (($('.sidelinks').length)-2)/2;
var rlinks = $('.sidelinks a');

var tempVal = "\n";
var target = '';
for (i=0; i < numberOfLinks; i++) {
	if (rlinks[i]) {
		if (!rlinks[i].target == '') {
			var target = ' target="'+ rlinks[i].target + '"';
		}
	}
	tempVal = tempVal + "<a href='" + rlinks[i].href + target + "'>" + rlinks[i].innerText + "</a>\n";
}
