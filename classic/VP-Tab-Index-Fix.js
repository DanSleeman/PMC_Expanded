(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolClassicVPTabIndexFix){
            var x = document.getElementsByTagName('input')
            for (var i=0;i<x.length;i++){
                if (x[i].tabIndex == 0){
                    x[i].tabIndex = 1}
            }
        }
    });
})();
