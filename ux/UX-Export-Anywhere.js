(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxLazyLoading && settings.vBoolUxExportAnywhere){
            scriptInject('util/utils.js')
            scriptInject('ux/src/UX-Export-Anywhere-Script.js')
        }
    });
})();