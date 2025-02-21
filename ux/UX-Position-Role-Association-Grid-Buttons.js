(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxLazyLoading && settings.vBoolUxPosRoleAssocCopyPasteButtons){
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

            function copyRoles(){//
                var a = []
                $('td:nth-child(3)').each(
                    function(){
                        if(this){
                            a.push(this.innerText.trim())
                        }})
                chrome.storage.local.set({roles:a},function(){
                        console.log('Value is set to '+ a);
                    });
                var u = $('tbody > tr > td')[0].children[0].textContent
                chrome.storage.local.set({copied:u},function(){
                        console.log('Value copied from '+ u);
                    });
                }

            }
    });
})();