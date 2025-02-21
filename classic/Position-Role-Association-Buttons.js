// Adds copy/paste buttons to position role security screen in classic
(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolClassicPosRoleAssocCopyPaste){

            classicCreateButton('DIV','ActionToolbarSection','copyRoles','Copy Roles')
            classicCreateButton('DIV','ActionToolbarSection','pasteRoles','Paste Roles')

            document.getElementById ("copyRoles").addEventListener (
                "mouseup", copyRoles, false
            );
            document.getElementById ("pasteRoles").addEventListener (
                "mouseup", pasteRoles, false
            );

            function copyRoles () {
                var a = []
                var x = document.querySelectorAll('input[type="checkbox"]')
                for(var i=0;i<x.length;i++){
                    if (x[i].checked){
                    var y = x[i].parentElement.previousElementSibling.previousElementSibling.innerText.trim()
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
                var x = document.querySelectorAll('input[type="checkbox"]')
                for(var i=0;i<x.length;i++){
                    var y = x[i].parentElement.previousElementSibling.previousElementSibling.innerText.trim()
                    if (b.includes(y) ){//&& y.includes('UX')){
                        x[i].checked = 1
                    }
                }})
                }

}
});
})();
