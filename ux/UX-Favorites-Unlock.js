(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxFavoritesUnlock){
            scriptInject('ux/src/UX-Favorites-Unlock-Script.js')
        }
    });
})();
