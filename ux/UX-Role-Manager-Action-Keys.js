// This injects another script into the UX Security Role Manager screen which shows the action keys
// You need the action key for VP navigation expressions, so this is easier than opening dev tools all the time.
(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxLazyLoading && settings.vBoolUxRoleManagerActionKeys){
            scriptInject('util/utils.js')
            scriptInject('ux/src/UX-Role-Manager-Action-Keys-Script.js')
        }
    });
})();
