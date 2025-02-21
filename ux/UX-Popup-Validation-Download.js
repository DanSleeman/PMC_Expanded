(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxLazyLoading && settings.vBoolUxSavePopupCsv){
            scriptInject('util/utils.js')
            scriptInject('ux/src/UX-Popup-Save-Script.js')
        }
    });
})();