scriptInject('util/utils.js')
scriptInject('ux/src/UX-User-Customer-Access-Buttons-Script.js')

window.addEventListener('message',function(event){
    if (event.source != window) return;
    switch(event.data.type){
        case "copyPCNs":
            copyPCNs()
            break;
        case "pastePCNs":
            pastePCNs()
            break;
    }
})

function copyPCNs(){
    var a = []
    $('tr[class^="plex-grid-row"]').each(
        function(){
            if(this.children[2].querySelector('input')){
                
            // if(this.children[2].querySelector('input').checked){
                const pcn = new Object();
                pcn.companyCode = this.children[0].textContent.trim()
                pcn.active = this.children[2].querySelector('input').checked
                pcn.sort = this.children[3].querySelector('input').value
                pcn.employee = this.children[4].querySelector('input').checked
                pcn.crossCompany = this.children[6].querySelector('input').checked
                //a.push(this.children[0].textContent.trim())
                a.push(pcn)
            }
        }
    // }
    )
    chrome.storage.local.set({pcns:a},function(){
            console.log('Value is set to '+ a);
        });
    var u = $('span[class="plex-page-title"]')[0].textContent.split("(")[0].trim()
    chrome.storage.local.set({copiedPCNs:u},function(){
            console.log('Value copied from '+ u);
        });
    }

function pastePCNs(){
    chrome.storage.local.get(['pcns'],function(result){
        console.log('Value currently is '+ result.pcns);
    var b = result.pcns
    $('tr[class^="plex-grid-row"]').each(
        function(){
            let mat = b.find(o => o.companyCode === this.children[0].textContent.trim())
            if (mat){
            console.log(JSON.stringify(mat))
            console.log(mat.companyCode)
            console.log(mat.active)
            console.log(mat.sort)
            console.log(mat.employee)
            console.log(mat.crossCompany)
            if (mat.active & !this.children[2].querySelector('input').checked){
                this.children[2].querySelector('input').click()
                this.children[3].querySelector('input').value = mat.sort
                this.children[4].querySelector('input').click()
                this.children[6].querySelector('input').click()
            }}
        }
    )
    })
}