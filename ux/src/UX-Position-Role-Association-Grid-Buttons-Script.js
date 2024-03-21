function createTheButtons(){
        uxCreateButton('copyRoles','Copy Roles',null,null,false,'Roles Copied');
        document.getElementById ("copyRoles").addEventListener (
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