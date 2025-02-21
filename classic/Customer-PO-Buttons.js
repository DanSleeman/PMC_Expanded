(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolClassicCustomerPOButtons){
            classicCreateButton('UL','Center','poUpload','Upload')

            document.getElementById ("poUpload").addEventListener (
                "mouseup", UploadClick, false
            );

            function UploadClick () {
            var clk = window.location = "../External/Upload.asp?ImportASP=../sales/po_line_upload_confirm.asp";
            }

        }
    });
})();
