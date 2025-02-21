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
    let pasteText = params.pasted
    if (settings.vBoolUxLazyLoading && settings.vBoolUxUserManagerCopyPasteButtons){
        uxCreateButton('copyRoles','Copy Roles',null,null,false,'Roles Copied')
        uxCreateButton('pasteRoles',`Paste Roles (${pasteText})`,null,null,false,'Roles Pasted')
        document.getElementById ("copyRoles").addEventListener (
            "mouseup", buttonCallback, false
            );
        document.getElementById ("pasteRoles").addEventListener (
            "mouseup", buttonCallback, false
            );
    }
    if (settings.vBoolUxLazyLoading && settings.vBoolUxSelectAllAdmin){
        uxCreateButton('allAdmin','Select All Admin',null,null,false,'Admin Checked')
        document.getElementById ("allAdmin").addEventListener (
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