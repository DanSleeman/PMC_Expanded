(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxEmployeeSwapNames){
            scriptInject('ux/src/UX-Employees-Swap-Name-Script.js')
        }
    });
})();
