(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolClassicLabelDesignerButtons){

            classicCreateButton('DIV','NavigationToolbarSection','getSerial','Get Serial')

            document.getElementById ("getSerial").addEventListener (
                "mouseup", ButtonClickAction, false
            );

            function ButtonClickAction () {
            var clk = window.open('../part/labels/Label_print_Format_Serial.asp');
            }
        }
    });
})();
