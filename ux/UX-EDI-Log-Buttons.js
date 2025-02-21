(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxEDILogButtons){
            scriptInject('util/utils.js')
            uxCreateButton('processASN','Process ASN','/EDI/AutoASNProcessing')
            uxCreateButton('mailboxes','EDI Mailboxes','/VisionPlex/Screen?__actionKey=18700')
        }
    });
})();

