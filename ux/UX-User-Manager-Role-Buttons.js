(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        console.log('content.js settings', settings)
            scriptInject('util/utils.js')
            scriptInject('ux/src/UX-User-Manager-Role-Buttons-Script.js', settings)
    });
})();

window.addEventListener('message',function(event){
    if (event.source != window) return;
    switch(event.data.type){
        case "copyRoles":
            copyRoles()
            break;
        case "pasteRoles":
            pasteRoles()
            break;
        case "allAdmin":
            allAdmin()
            break;
    }
})
function copyRoles(){ //
    var a = []
    $('input[type="checkbox"][name="AssignedToRole"]').each(
        function(){
            if(this.checked){
                a.push(this.parentElement.parentElement.nextElementSibling.nextElementSibling.innerText.trim())
                
            }})
    chrome.storage.local.set({roles:a},function(){
            console.log('Value is set to '+ a);
        });
    var u = $('label:contains("User ID")')[0].parentElement.parentElement.nextElementSibling.children[0].textContent
    chrome.storage.local.set({copied:u},function(){
            console.log('Value copied from '+ u);
        });
    }

function pasteRoles(){
    (async () => {
        const module = await import(chrome.runtime.getURL("config.js"));
        module.loadSettings((settings) =>{
    const excludeRoleText = settings.vStrClassicUserManagerExcludeText
    const excludeArray = (excludeRoleText || "").split(",").map(item => item.trim());
    chrome.storage.local.get(['roles'],function(result){
        console.log('Value currently is '+ result.roles);
        var b = result.roles
        $('input[type="checkbox"][name="AssignedToRole"]').each(
            function(){
                let y = this.parentElement.parentElement.nextElementSibling.nextElementSibling.innerText.trim()
                if (b.includes(y) && 
                    !this.checked &&
                    (!excludeArray.some(excludedWord => y.includes(excludedWord)) || (excludeArray.length === 1 && excludeArray[0] === ""))
                   ){
                    this.click()
                }
            }
        )
    })
    });
    })();
}


function allAdmin(){
    $('input[type="checkbox"][name="AdminToRole"]').each(
        function(){
            if (!this.checked){
                this.click()
            }
        }
    )
}