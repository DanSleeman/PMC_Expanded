(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        console.log('content.js settings', settings)
            scriptInject('util/utils.js')
            scriptInject('ux/src/UX-Enterprise-Roles-Script.js', settings)
    });
})();