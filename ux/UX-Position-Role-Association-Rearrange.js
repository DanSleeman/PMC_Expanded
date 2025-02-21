
// Rearranges and resizes the position security role association table to be more intuitive. 
// Moves the check boxes next to the role you are selecting.

(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxLazyLoading && settings.vBoolUxPosRoleAssocRearrangeColumns){
            scriptInject('ux/src/UX-Position-Role-Association-Rearrange-Script.js')
        }
    });
})();
