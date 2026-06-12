async function readStorage(key){
    const result = await chrome.storage.local.get(key);
    return result[key]
}


async function scriptInject(scriptPath, settings={}){
    const copyText = new Object();
    await readStorage('copied').then(val => {
        copyText.pasteText = val
    })
    await readStorage('copiedPCNs').then(val => {
        copyText.pasteTextPCN = val
    })
    await readStorage('reportCopied').then(val => {
        copyText.reportPasted = val
    })
    let s = document.createElement('script');
    s.dataset.params = JSON.stringify({
        pasted:copyText.pasteText,
        pastedPCN:copyText.pasteTextPCN,
        reportPasted:copyText.reportPasted
    });
    s.dataset.settings = JSON.stringify(settings)
    s.src = chrome.runtime.getURL(scriptPath);
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}
