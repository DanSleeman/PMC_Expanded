function createTheButtons(){
        uxCreateButton('copyRolesRem','Copy Removed Roles',null,null,false,'Removed Roles Copied');
        document.getElementById ("copyRolesRem").addEventListener (
            "mouseup", buttonCallback, false
            );
        uxCreateButton('copyRolesAdd','Copy Added Roles',null,null,false,'Added Roles Copied');
        document.getElementById ("copyRolesAdd").addEventListener (
            "mouseup", buttonCallback, false
            );
        uxCreateButton('uxRolesFilter','UX Roles',null,null,false,'UX Prefix Roles Displayed');
        document.getElementById ("uxRolesFilter").addEventListener (
            "mouseup", buttonCallback, false
            );
        uxCreateButton('classicRolesFilter','Classic Roles',null,null,false,'Classic Roles Displayed');
        document.getElementById ("classicRolesFilter").addEventListener (
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