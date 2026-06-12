(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxTruckBannerFix){
            scriptInject('ux/src/UX-Truck-Ship-Banner-Fix-Script.js')
        }
    });
})();
