(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxFilterPinEnforce){
            scriptInject('ux/src/UX-Pin-Default-Script.js')
        }
    });
})();
