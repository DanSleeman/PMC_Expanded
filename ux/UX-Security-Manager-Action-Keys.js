// This injects another script into the UX Security Admin Manager screen which shows the action keys
// You need the action key for VP navigation expressions, so this is easier than opening dev tools all the time.
(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxLazyLoading && settings.vBoolUxSecurityActionKeys){
            scriptInject('util/utils.js')
            scriptInject('ux/src/UX-Security-Manager-Action-Keys-Script.js')
        }
    });
})();

