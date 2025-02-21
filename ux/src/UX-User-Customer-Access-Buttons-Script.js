const dataset = document.currentScript.getAttribute('data-params')
const dataSettings = document.currentScript.getAttribute('data-settings')
function createTheButtons(){
    console.log('script.js - dataset: ', dataset)
    const params = JSON.parse(dataset);
    const settings = JSON.parse(dataSettings);
    console.log('script.js - createTheButtons function - injected params: ', params);
    console.log('script.js - createTheButtons function - injected settings: ', settings);
    console.log('script.js - createTheButtons function - copyPaste on: ', settings.vBoolUxCustAccessCopyPasteButtons);
    let pasteText = params.pastedPCN
        if (settings.vBoolUxCustAccessCopyPasteButtons){
            uxCreateButton('copyPCNs','Copy PCNs',null,null,false,'PCN Access Copied');
            uxCreateButton('pastePCNs',`Paste PCNs (${pasteText})`,null,null,false,'PCN Access Pasted');
            document.getElementById ("copyPCNs").addEventListener (
                "mouseup", buttonCallback, false
                );
            document.getElementById ("pastePCNs").addEventListener (
                "mouseup", buttonCallback, false
                );
        }
        if (settings.vBoolUxCustAccessTogglePCNs){
            uxCreateButton('fullPCNs',`Enable Toggle PCN`,null,null,false,null);
            document.getElementById ("fullPCNs").addEventListener (
                "mouseup", buttonCallback, false
                );
        }
}

function buttonCallback(e){
    if (e.button !== 0) return;
    window.postMessage({type: this.id},"*")
    if (this.id === 'fullPCNs'){
        return
    }
    plex.banner.getPageBanner().setMessage(this.notificationText || 'No notification message defined.',{status:'info',timeOut:600,toast:!0})
}

function checkForFunction(){
    if (typeof window.uxCreateButton === 'function'){
        createTheButtons();
    } else {
        requestAnimationFrame(checkForFunction);
    }
}

checkForFunction();