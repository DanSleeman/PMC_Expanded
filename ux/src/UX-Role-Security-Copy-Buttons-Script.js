const roleDataset = document.currentScript.getAttribute('data-params')
function createRoleButtons(){
    // console.log('script.js - roleDataset: ', roleDataset)
    const params = JSON.parse(roleDataset);
    // console.log('script.js - createRoleButtons function - injected params: ', params);
    let pasteText = params.actionCopiedRole
        uxCreateButton('copyActions','Copy Actions',null,null,false,'Actions Copied');
        uxCreateButton('pasteActions',`Paste Actions (${pasteText})`,null,null,false,'Actions Pasted');
        document.getElementById ("copyActions").addEventListener (
            "mouseup", roleButtonCallback, false
            );
        document.getElementById ("pasteActions").addEventListener (
            "mouseup", roleButtonCallback, false
            );
}
window.addEventListener('message', function(event){
    if (event.source != window) return;
    switch(event.data.type){
        case "pasteActions":
            pasteActions(event.data.data)
            break;
        case "pasteButtonUpdate":
            console.log(event.data.data)
            pasteButtonUpdate(event.data.data)
            break;
    }
})
function roleButtonCallback(e){
    if (e.button !== 0) return;
    switch(this.id){
        case "copyActions":
            var a = copyActions()
            window.postMessage({type: 'saveActions', data:a},"*")
            break;
        case "pasteActions":
            window.postMessage({type: 'readActions'},"*")
            break;
    }
    plex.banner.getPageBanner().setMessage(this.notificationText || 'No notification message defined.',{status:'info',timeOut:600,toast:!0})
}
function pasteButtonUpdate(pasteText){
    console.log('paste button updating to: ' + pasteText)
    document.getElementById("pasteActions").innerText = `Paste Actions (${pasteText})`
}
function copyActions(){
    var a = []
    $('input[type="checkbox"]').each(
        function(){
            if(this.checked){
                const rowData = ko.dataFor(this).data
                if (rowData){
                    const rowRef = {}
                    rowRef.ActionDescription = rowData.ActionDescription
                    rowRef.ActionName = rowData.ActionName
                    rowRef.ActionTitle = rowData.ActionTitle
                    rowRef.ActionType = rowData.ActionType
                    rowRef.CloudApplicationActionKey = rowData.CloudApplicationActionKey
                    rowRef.CloudApplicationActionStatusName = rowData.CloudApplicationActionStatusName
                    rowRef.CloudApplicationName = rowData.CloudApplicationName
                    rowRef.ModuleGroup = rowData.ModuleGroup
                    rowRef.ModuleName = rowData.ModuleName
                    const allNull = Object.values(rowRef).every(value => value === null || value === undefined)
                    if (allNull) return;
                    a.push(rowRef)
                    // console.log(rowRef)
                }
            }})
    return a
}
function pasteActions(src){
    $('input[type="checkbox"]').each(
        function(){
            const rowData = ko.dataFor(this).data
            if (rowData){
                const rowRef = {}
                rowRef.ActionDescription = rowData.ActionDescription
                rowRef.ActionName = rowData.ActionName
                rowRef.ActionTitle = rowData.ActionTitle
                rowRef.ActionType = rowData.ActionType
                rowRef.CloudApplicationActionKey = rowData.CloudApplicationActionKey
                rowRef.CloudApplicationActionStatusName = rowData.CloudApplicationActionStatusName
                rowRef.CloudApplicationName = rowData.CloudApplicationName
                rowRef.ModuleGroup = rowData.ModuleGroup
                rowRef.ModuleName = rowData.ModuleName
                const allNull = Object.values(rowRef).every(value => value === null || value === undefined)
                if (allNull) return;
                const exists = src.some(item => JSON.stringify(item) === JSON.stringify(rowRef))
                if (exists && !this.checked){
                    this.click()
                }
            }
        }
    )
}
function checkForRoleFunction(){
    if (typeof window.uxCreateButton === 'function'){
        createRoleButtons();
    } else {
        requestAnimationFrame(checkForRoleFunction);
    }
}

checkForRoleFunction();