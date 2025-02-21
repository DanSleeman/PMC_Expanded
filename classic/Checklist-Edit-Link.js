(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolClassicChecklistEditLinks){
            const urlParams = new URLSearchParams(window.location.search);
            const checklistNo = urlParams.get('Checklist_No');

            classicCreateButton('UL','Center','editChecklist','Edit Checklist')

            document.getElementById ("editChecklist").addEventListener (
                "mouseup", ButtonClickAction, false
            );

            function ButtonClickAction () {
            window.location = "../Checklist/Checklist_Form.asp?Do=Update&EditMode=true&Checklist_No=" + checklistNo;
            }

        }
    });
})();
