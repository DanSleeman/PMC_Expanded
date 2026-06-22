const highlightDataset = document.currentScript.getAttribute('data-params')
const highlighthighlightDatasettings = document.currentScript.getAttribute('data-settings')
function buttonCallback(e){
    if (e.button !== 0) return;
    window.postMessage({type: this.id},"*")
}

function createTheButtons(){
    console.log('script.js - highlightDataset: ', highlightDataset)
    const params = JSON.parse(highlightDataset);
    const settings = JSON.parse(highlighthighlightDatasettings);
    console.log('script.js - createTheButtons function - injected params: ', params);
    let pasteText = params.pasted
    if (settings.vBoolUxLazyLoading && settings.vBoolUxRoleManagerHighlightButtons){
        uxCreateButton('highlightCopied','Highlight Copied Roles',null,null,false,null)
        document.getElementById ("highlightCopied").addEventListener (
            "mouseup", buttonCallback, false
            );
        uxCreateButton('toggleHighlight','Toggle Highlight Visibility',null,null,false,null)
        document.getElementById ("toggleHighlight").addEventListener (
            "mouseup", buttonCallback, false
            );
    }
}
function checkForFunction(){
    if (typeof window.uxCreateButton === 'function'){
        createTheButtons();
    } else {
        requestAnimationFrame(checkForFunction);
    }
}

checkForFunction();