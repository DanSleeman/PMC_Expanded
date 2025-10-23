(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxChecksheetFillButton){
            scriptInject('util/utils.js')
            scriptInject('ux/src/UX-Checksheet-Fill-Script.js')
        }
    });
})();