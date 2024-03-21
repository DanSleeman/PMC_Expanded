scriptInject('util/utils.js')
scriptInject('ux/src/UX-Position-Role-Association-Grid-Buttons-Script.js')

window.addEventListener('message',function(event){
    if (event.source != window) return;
    switch(event.data.type){
        case "copyRoles":
            copyRoles()
            break;
    }
})

function copyRoles(){
    var a = []
    $('td:nth-child(3)').each(
        function(){
            if(this){
                a.push(this.innerText.trim())
            }})
    chrome.storage.local.set({roles:a},function(){
            console.log('Value is set to '+ a);
        });
    }