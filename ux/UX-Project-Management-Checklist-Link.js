const urlParams = new URLSearchParams(window.location.search);
const checklistNo = urlParams.get('ChecklistNo');
(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxProjectManagementChecklistLink){
            scriptInject('util/utils.js')
            uxCreateButton('fullChecklist','Full Checklist',`/Quality/Checklists/ChecklistGridView?ChecklistNo=${checklistNo}`)
        }
    });
})();

