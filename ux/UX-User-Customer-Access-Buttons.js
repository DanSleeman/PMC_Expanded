(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        console.log('content.js settings', settings)
            scriptInject('util/utils.js')
            scriptInject('ux/src/UX-User-Customer-Access-Buttons-Script.js', settings)

window.addEventListener('message',function(event){
    if (event.source != window) return;
    switch(event.data.type){
        case "copyPCNs":
            copyPCNs()
            break;
        case "pastePCNs":
            pastePCNs()
            break;
        case "fullPCNs":
            tableRowButtons()
            break;
    }
})

var toggleButtons = false;
function tableRowButtons(){
    if (toggleButtons){
        return;
    }
    const head = document.querySelectorAll('tr.plex-grid-header-row')
    head.forEach((h, index) => {
        if (index % 2 === 0){
            const t = document.createElement('th');
            const d = document.createElement('div');
            const a = document.createElement('abbr');
            t.classList.add('plex-grid-header-cell');
            t.rowSpan = 2;
            d.classList.add('plex-grid-header-inner-content');
            d.style.textAlign = 'center';
            a.title = 'Toggle PCN';
            a.textContent = 'Toggle PCN';
            t.appendChild(d);
            d.appendChild(a);
            h.appendChild(t);
        }
    })
    const rows = document.querySelectorAll('tr.plex-grid-row.selectable')
    rows.forEach(row => {
        const inputs = {
            col2: row.children[2].querySelector('input'),
            col3: row.children[3].querySelector('input'),
            col4: row.children[4].querySelector('input'),
            col6: row.children[6].querySelector('input'),
        };
        const buttonCell = document.createElement('td');
        const button = document.createElement('button');
        button.textContent = 'Toggle PCN';
        button.classList.add('btn');
        if (inputs.col2 === null){ //Do not add a button to the home PCN row. This will be denoted by col2 being null since it does not have an input element.
            row.appendChild(buttonCell);
            return
        }
        button.style.backgroundColor = inputs.col2.checked ? '#0077aa': '';
        button.addEventListener('click', () =>{

            if (inputs.col2.checked) {
                inputs.col3.value = '';
                if (inputs.col4.checked) {
                    inputs.col4.click();
                }
                if (inputs.col6.checked) {
                    inputs.col6.click();
                }
                inputs.col2.click();
                button.style.backgroundColor = '';
            } else {
                inputs.col2.click();
                inputs.col3.value = 1;
                if (!inputs.col4.checked) {
                    inputs.col4.click();
                }
                if (!inputs.col6.checked) {
                    inputs.col6.click();
                }
                button.style.backgroundColor = '#0077aa';
            }
            //Do the stuff for the other row elements
        });
        buttonCell.appendChild(button)
        row.appendChild(buttonCell);
    });
    toggleButtons = true;
}


function fullPCN(){

}


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

// function checkForFunction(){
//     if (typeof window.uxCreateButton === 'function'){
//         tableRowButtons();
//     } else {
//         requestAnimationFrame(checkForFunction);
//     }
// }

// checkForFunction();
});
})();
