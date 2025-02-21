(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxSQLF5Execute){
            scriptInject('ux/src/UX-SQL-Development-F5-Script.js')
        }
    });
})();
