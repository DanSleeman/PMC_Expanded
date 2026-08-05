(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxLazyLoading && settings.vBoolUxSecurityManagerModalPopup){
            scriptInject('ux/src/UX-Popup-Security-Admin-Manager-Script.js')
        }
    });
})();