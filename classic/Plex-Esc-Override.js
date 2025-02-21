(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolClassicEscapeOverride){
            scriptInject('classic/src/Plex-Esc-Override-Script.js')
        }
    });
})();

