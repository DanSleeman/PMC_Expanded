const dataset = document.currentScript.getAttribute('data-params')
function createTheButtons(){
    console.log('script.js - dataset: ', dataset)
    const params = JSON.parse(dataset);
    console.log('script.js - createTheButtons function - injected params: ', params);
    let pasteText = params.pastedPCN
        uxCreateButton('copyPCNs','Copy PCNs',null,null,false,'PCN Access Copied');
        uxCreateButton('pastePCNs',`Paste PCNs (${pasteText})`,null,null,false,'PCN Access Pasted');
        uxCreateButton('fullPCNs',`Enable Toggle PCN`,null,null,false,null);
        document.getElementById ("copyPCNs").addEventListener (
            "mouseup", buttonCallback, false
            );
        document.getElementById ("pastePCNs").addEventListener (
            "mouseup", buttonCallback, false
            );
        document.getElementById ("fullPCNs").addEventListener (
            "mouseup", buttonCallback, false
            );
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