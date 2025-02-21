const urlParams = new URLSearchParams(window.location.search);
        const checklistNo = urlParams.get('ChecklistNo');
(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxChecklistEditLink){
            scriptInject('util/utils.js')
            uxCreateButton('editChecklist','Edit Checklist',`/Quality/Checklists/ViewForm?ChecklistNo=${checklistNo}`)
        }
    });
})();
