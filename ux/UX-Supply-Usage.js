(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxSupplyUsageRemember){
            scriptInject('util/utils.js')
            scriptInject('ux/src/UX-Supply-Usage-Script.js')
        }
    });
})();