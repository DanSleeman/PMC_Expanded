// TODO - 1/4/2024 Update functions to search for the Security Role column rather than the next sibling.

scriptInject('util/utils.js')
scriptInject('ux/src/UX-Position-Role-Association-Buttons-Script.js')

window.addEventListener('message',function(event){
    if (event.source != window) return;
    switch(event.data.type){
        case "copyRoles":
            copyRoles()
            break;
        case "pasteRoles":
            pasteRoles()
            break;
    }
})

function copyRoles(){
    var a = []
    $('input[type="checkbox"]').each(
        function(){
            if(this.checked){
                a.push(this.parentElement.parentElement.nextElementSibling.innerText.trim())
            }})
    chrome.storage.local.set({roles:a},function(){
            console.log('Value is set to '+ a);
        });
    }

function pasteRoles(){
    chrome.storage.local.get(['roles'],function(result){
        console.log('Value currently is '+ result.roles);
    var b = result.roles
    $('input[type="checkbox"]').each(
        function(){
            let x = null;
            let y = this.parentElement.parentElement.nextElementSibling
            if (y !== null){
                x = y.innerText.trim()
                }
            if (b.includes(x) && !this.checked){
                this.click()
            }
        }
    )
    })
}