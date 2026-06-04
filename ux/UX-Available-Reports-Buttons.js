(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        console.log('content.js settings', settings)
            scriptInject('util/utils.js')
            scriptInject('ux/src/UX-Available-Reports-Buttons-Script.js', settings)
    });
})();

window.addEventListener('message',function(event){
    if (event.source != window) return;
    switch(event.data.type){
        case "copyReports":
            copyReports()
            break;
        case "pasteReports":
            pasteReports()
            break;
    }
})
function copyReports(){ //
    var a = []
    $('tr[class*="plex-grid-row-selected"] > td > input[type="checkbox"]').each(
        function(){
            if(this.checked){
                let t = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerText.trim() 
                a.push(t)
            }})
    chrome.storage.local.set({activeReports:a},function(){
            console.log('Value is set to '+ a);
        });
    let filters = $('')
    var u = getFilters()
    chrome.storage.local.set({reportCopied:u},function(){
            console.log('Value copied from '+ u);
        });
    }

function pasteReports(){
    (async () => {
        const module = await import(chrome.runtime.getURL("config.js"));
        module.loadSettings((settings) =>{
    chrome.storage.local.get(['activeReports'],function(result){
        console.log('Value currently is '+ result.activeReports);
        var b = result.activeReports
        $('tr[class^="plex-grid-row"] > td > input[type="checkbox"]').each(
            function(){
                let y = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerText.trim()
                if (b.includes(y) && 
                    !this.checked
                   ){
                    this.click()
                }
            }
        )
    })
    });
    })();
}

function getFilters(){
    let f = []
    let filters = $("div[class^='plex-control-group']").each(
        function(){
            let c = this.children
            let k = c[0].innerText.trim()
            let v = c[1]
            let t = c[1].querySelector('input')
            let s = ''
            if (t.type == 'checkbox'){
                s = t.checked
            } else {
                s = v.innerText.trim()
            }
            f.push(`${k}: ${s}`)
        }
    )
    return f.join('\n')
}