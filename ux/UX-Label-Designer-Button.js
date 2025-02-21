(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxLabelDesignerButtons){
            scriptInject('util/utils.js')
            uxCreateButton('labelTesting','Label Testing','/Platform/LabelLibrary/ViewLabelsTestingForm',null,true)
        }
    });
})();
