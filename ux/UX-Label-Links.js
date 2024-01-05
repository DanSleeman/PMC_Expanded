//ko.dataFor(document.getElementsByClassName("plex-filter-pin-icon")[0]).isPinned(true)
/*	
var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('label-script.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
*/
//Label designer move edit link from column 0 to column 15

function waitForElementToDisplay(selector, time) {
        if(document.querySelector(selector)!=null) {
            //alert("The element is displayed, you can put your code instead of this alert.")
			var elements = document.querySelectorAll('tr[class^="plex-grid-row"]')
var max = elements.length
for (var i=0;i<max;i++){
	var y = document.querySelectorAll('tr[class^="plex-grid-row"]')[i].querySelector('td[data-col-index="0"]').children[0]
	var click_link = y.href
	var x = document.querySelectorAll('tr[class^="plex-grid-row"]')[i].querySelector('td[data-col-index="15"]')
	var x2 = document.querySelectorAll('tr[class^="plex-grid-row"]')[i].querySelector('td[data-col-index="16"]')
	var x3 = document.querySelectorAll('tr[class^="plex-grid-row"]')[i].querySelector('td[data-col-index="17"]')
	if (x.innerText === "\xa0")
		{
		if (x2.innerText === "\xa0")
			{
			var new_text = "Edit"
			}
		else{
			new_text = x2.innerText
			x2.innerText = ''
			x2.innerHTML = '<a href="' + click_link + '" class="plex-grid-link" data-col-index="0">' + new_text + '</a>'
			}
		}
	else{
		new_text = x.innerText
		x.innerText = ''
		x.innerHTML = '<a href="' + click_link + '" class="plex-grid-link" data-col-index="0">' + new_text + '</a>'
		}
}
            return;
        }
        else {
            setTimeout(function() {
                waitForElementToDisplay(selector, time);
            }, time);
        }
    }


//window.onReady = function(){
	//#labelElementsGrid > div.plex-grid-wrapper > table > tbody > tr:nth-child(1) > td:nth-child(1) > a
	var sel = "#labelElementsGrid > div.plex-grid-wrapper > table > tbody > tr:nth-child(1) > td:nth-child(1) > a"
	waitForElementToDisplay(sel, 5)
	/*
var elements = document.querySelectorAll('tr[class^="plex-grid-row"]')
var max = elements.length
for (var i=0;i<max;i++){
	var y = document.querySelectorAll('tr[class^="plex-grid-row"]')[i].querySelector('td[data-col-index="0"]').children[0]
	var click_link = y.href
	var x = document.querySelectorAll('tr[class^="plex-grid-row"]')[i].querySelector('td[data-col-index="15"]')
	var x2 = document.querySelectorAll('tr[class^="plex-grid-row"]')[i].querySelector('td[data-col-index="16"]')
	var x3 = document.querySelectorAll('tr[class^="plex-grid-row"]')[i].querySelector('td[data-col-index="17"]')
	if (x.innerText === "\xa0")
		{
		if (x2.innerText === "\xa0")
			{
			var new_text = "Edit"
			}
		else{
			new_text = x2.innerText
			x2.innerText = ''
			x2.innerHTML = '<a href="' + click_link + '" class="plex-grid-link" data-col-index="0">' + new_text + '</a>'
			}
		}
	else{
		new_text = x.innerText
		x.innerText = ''
		x.innerHTML = '<a href="' + click_link + '" class="plex-grid-link" data-col-index="0">' + new_text + '</a>'
		}
}
*/
//}