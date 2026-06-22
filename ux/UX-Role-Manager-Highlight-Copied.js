(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        console.log('content.js settings', settings)
            scriptInject('util/utils.js')
            scriptInject('ux/src/UX-Role-Manager-Highlight-Copied-Script.js', settings)
    });
})();

window.addEventListener('message',function(event){
    if (event.source != window) return;
    switch(event.data.type){
        case "highlightCopied":
            highlightCopied()
            break;
        case "toggleHighlight":
            toggleHighlight()
            break;
    }
})

function highlightCopied(){
    (async () => {
        
    chrome.storage.local.get(['roles'],function(result){
        console.log('Value currently is '+ result.roles);
        var b = result.roles
        $("tr[class*='plex-grid-row']").each(
            function(){
                let y = this.children[0].children[0].innerText.trim()
                if (b.includes(y)){
                    this.classList.add('EX-Highlight-Role')
                }
            }
        )
    })
    })();
}

function toggleHighlight(){
    $("tr[class*='plex-grid-row']").not("[class*='EX-Highlight-Role']").each(
            function(){
                this.hidden = !this.hidden
            }
        )
}