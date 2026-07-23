(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxLazyLoading && settings.vBoolUxSecurityRoleCopyPasteButtons){
            scriptInject('util/utils.js')
            scriptInject('ux/src/UX-Role-Security-Copy-Buttons-Script.js')

            window.addEventListener('message',function(event){
                if (event.source != window) return;
                switch(event.data.type){
                    case "saveActions":
                        saveActions(event.data.data)
                        break;
                    case "readActions":
                        readActions()
                        break;
                }
            })
            function saveActions(a){
                chrome.storage.local.set({actions:a},function(){
                        // console.log('Actions copied:\n'+ JSON.stringify(a));
                    });
                var u = $('label:contains("Security Role")')[0].parentElement.nextElementSibling.children[0].textContent.trim()
                chrome.storage.local.set({actionCopiedRole:u},function(){
                        console.log('Actions copied from role '+ u);
                        window.postMessage({type: 'pasteButtonUpdate', data: u},"*")
                    });
            }
            function readActions(){
                chrome.storage.local.get(['actions'],function(result){
                    // console.log('Value currently is '+ JSON.stringify(result.actions));
                window.postMessage({type: 'pasteActions', data: result.actions},"*")
                })
            }
            
        }
    });
})();