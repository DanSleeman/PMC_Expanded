const binarySettingsToggleDataset = document.currentScript.getAttribute('data-params')
const binarySettingsToggleDatasettings = document.currentScript.getAttribute('data-settings')
function binarySettingsToggleButtonCallback(e){
    if (e.button !== 0) return;
    window.postMessage({type: this.id},"*")
}

function binarySettingsToggleCreateTheButtons(){
    console.log('script.js - binarySettingsToggleDataset: ', binarySettingsToggleDataset)
    const params = JSON.parse(binarySettingsToggleDataset);
    const settings = JSON.parse(binarySettingsToggleDatasettings);
    console.log('script.js - binarySettingsToggleCreateTheButtons function - injected params: ', params);
    let pasteText = params.pasted
    if (settings.vBoolUxLazyLoading && settings.vBoolUxSecurityRoleBinaryToggleButtons){
        uxCreateButton('binarySettingsToggleHalf','Toggle Half Selected',null,null,false,null)
        document.getElementById ("binarySettingsToggleHalf").addEventListener (
            "mouseup", binarySettingsToggleButtonCallback, false
            );

    }
}
function checkForBinarySettingsToggleFunction(){
    if (typeof window.uxCreateButton === 'function'){
        binarySettingsToggleCreateTheButtons();
    } else {
        requestAnimationFrame(checkForBinarySettingsToggleFunction);
    }
}

checkForBinarySettingsToggleFunction();