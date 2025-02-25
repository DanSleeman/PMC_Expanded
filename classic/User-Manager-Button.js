
(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));

module.loadSettings((settings) =>{
    const uxRolePrefix = settings.vStrClassicUserManagerUXRolePrefix
    const excludeRoleText = settings.vStrClassicUserManagerExcludeText
    const excludeArray = (excludeRoleText || "").split(",").map(item => item.trim());
    if (!settings.vBoolClassicUserManagerTweaks) return;
    if (settings.vBoolClassicUserManagerSelectAllAdmin){
        classicCreateButton('UL','Left','adminRoles','Select All Admin')
        document.getElementById ("adminRoles").addEventListener (
            "mouseup", selectAllAdmin, false
        );
    }
    if (settings.vBoolClassicUserManagerCopy){
        classicCreateButton('UL','Left','copyRoles','Copy Roles')
        document.getElementById ("copyRoles").addEventListener (
            "mouseup", copyRoles, false
        );
    }
    if (settings.vBoolClassicUserManagerPasteUX){
        classicCreateButton('UL','Left','pasteRoles','Paste UX Roles')
        document.getElementById ("pasteRoles").addEventListener (
            "mouseup", pasteRoles, false
        );
    }
    if (settings.vBoolClassicUserManagerPasteClassic){
        classicCreateButton('UL','Left','pasteClassicRoles','Paste Classic Roles')
        document.getElementById ("pasteClassicRoles").addEventListener (
            "mouseup", pasteClassicRoles, false
        );
    }


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
            if (b.includes(y) && 
                (y.startsWith(uxRolePrefix) || uxRolePrefix === "") && 
                (!excludeArray.some(excludedWord => y.includes(excludedWord)) || (excludeArray.length === 1 && excludeArray[0] === ""))
                ){
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
            if (b.includes(y) && 
                (!y.startsWith(uxRolePrefix) || uxRolePrefix === "") && 
                (!excludeArray.some(excludedWord => y.includes(excludedWord)) || (excludeArray.length === 1 && excludeArray[0] === ""))
                ){
                    x[i].checked = 1
            }
        }})
        }
});
})();