const urlParams = new URLSearchParams(window.location.search);
const checklistNo = urlParams.get('ChecklistNo');

uxCreateButton('fullChecklist','Full Checklist',`/Quality/Checklists/ChecklistGridView?ChecklistNo=${checklistNo}`)
