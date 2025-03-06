const dataset = document.currentScript.getAttribute('data-params')
function createTheButtons(){
    // console.log('script.js - dataset: ', dataset)
    const params = JSON.parse(dataset);
    // console.log('script.js - createTheButtons function - injected params: ', params);
    let pasteText = params.pasted
        uxCreateButton('copyRoles','Copy Roles',null,null,false,'Roles Copied');
        uxCreateButton('pasteRoles',`Paste Roles (${pasteText})`,null,null,false,'Roles Pasted');
        document.getElementById ("copyRoles").addEventListener (
            "mouseup", buttonCallback, false
            );
        document.getElementById ("pasteRoles").addEventListener (
            "mouseup", buttonCallback, false
            );
}

function buttonCallback(e){
    if (e.button !== 0) return;
    window.postMessage({type: this.id},"*")
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