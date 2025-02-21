(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolClassicEDILogButtons){
            classicCreateButton('UL','Left','ediUpload','Upload')
            classicCreateButton('UL','Left','processASN','Process ASN')
            classicCreateButton('UL','Left','mailbox','EDI Mailboxes')

            document.getElementById ("ediUpload").addEventListener (
                "mouseup", UploadClick, false
            );
            document.getElementById ("processASN").addEventListener (
                "mouseup", ProcessClick, false
            );
            document.getElementById ("mailbox").addEventListener (
                "mouseup", MailboxClick, false
            );

            function UploadClick () {
            var clk = window.location = "../Upload_Apps/EDI_Upload_Process.asp";
            }

            function ProcessClick () {
            var clk = window.location = "../Rendering_Engine/default.aspx?Request=Show&RequestData=SourceType(Screen)SourceKey(17701)";
            }

            function MailboxClick () {
            var clk = window.location = "../Rendering_Engine/Default.aspx?Request=Show&RequestData=SourceType(Screen)SourceKey(15606)";
            }


        }
    });
})();
