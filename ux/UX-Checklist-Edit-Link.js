const urlParams = new URLSearchParams(window.location.search);
const checklistNo = urlParams.get('ChecklistNo');

uxCreateButton('editChecklist','Edit Checklist',`/Quality/Checklists/ViewForm?ChecklistNo=${checklistNo}`)