const dataset = document.currentScript.getAttribute('data-params')
const dataSettings = document.currentScript.getAttribute('data-settings')
function buttonCallback(e){
    if (e.button !== 0) return;
    window.postMessage({type: this.id},"*")
    plex.banner.getPageBanner().setMessage(this.notificationText || 'No notification message defined.',{status:'info',timeOut:600,toast:!0})
}

function createTheButtons(){
    console.log('script.js - dataset: ', dataset)
    const params = JSON.parse(dataset);
    const settings = JSON.parse(dataSettings);
    console.log('script.js - createTheButtons function - injected params: ', params);
    let pasteText = `Copied with filters:\n${params.reportPasted}`
    if (settings.vBoolUxLazyLoading && settings.vBoolUxAvailableRolesCopyPasteButtons){
        uxCreateButton('copyReports','Copy Reports',null,null,false,'Reports Copied')
        uxCreateButton('pasteReports',`Paste Reports`,null,pasteText,false,'Reports Pasted')
        document.getElementById ("copyReports").addEventListener (
            "mouseup", buttonCallback, false
            );
        document.getElementById ("pasteReports").addEventListener (
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