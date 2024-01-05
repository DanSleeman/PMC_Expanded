classicCreateButton('UL','Left','adminRoles','Select All Admin')
classicCreateButton('UL','Left','copyRoles','Copy Roles')
classicCreateButton('UL','Left','pasteRoles','Paste Roles')
classicCreateButton('UL','Left','pasteClassicRoles','Paste Classic Roles')


document.getElementById ("adminRoles").addEventListener (
    "mouseup", selectAllAdmin, false
);
document.getElementById ("copyRoles").addEventListener (
    "mouseup", copyRoles, false
);
document.getElementById ("pasteRoles").addEventListener (
    "mouseup", pasteRoles, false
);
document.getElementById ("pasteClassicRoles").addEventListener (
    "mouseup", pasteClassicRoles, false
);


function selectAllAdmin () {
    var x = document.querySelectorAll('input[name^="Admin"]')
    for(var i =0;i<x.length;i++){
        x[i].checked = 1}
}

function copyRoles () {
    var a = []
    var x = document.querySelectorAll('input[name^="Member"]')
    for(var i=0;i<x.length;i++){
        if (x[i].checked){
        var y = x[i].parentElement.nextElementSibling.nextElementSibling.innerText.trim()
        a.push(y)
    }}
    chrome.storage.local.set({roles: a}, function() {
        console.log('Value is set to ' + a);
      });
      
    }

function pasteRoles () {
    chrome.storage.local.get(['roles'], function(result) {
        console.log('Value currently is ' + result.roles);
    var b = result.roles
    var x = document.querySelectorAll('input[name^="Member"]')
    for(var i=0;i<x.length;i++){
        var y = x[i].parentElement.nextElementSibling.nextElementSibling.innerText.trim()
        if (b.includes(y) && y.includes('UX')){
            x[i].checked = 1
        }
    }})
    }
     

function pasteClassicRoles () {
    chrome.storage.local.get(['roles'], function(result) {
        console.log('Value currently is ' + result.roles);
    var b = result.roles
    var x = document.querySelectorAll('input[name^="Member"]')
    for(var i=0;i<x.length;i++){
        var y = x[i].parentElement.nextElementSibling.nextElementSibling.innerText.trim()
        if (b.includes(y) && !y.includes('UX') && !y.includes('HR')){
            x[i].checked = 1
        }
    }})
    }