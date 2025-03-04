(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxLazyLoading && settings.vBoolUxPosRoleAssocCopyPasteButtons){
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
                var u = $('label:contains("Position")')[0].parentElement.parentElement.nextElementSibling.children[0].textContent
                chrome.storage.local.set({copied:u},function(){
                        console.log('Value copied from '+ u);
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

        }
    });
})();