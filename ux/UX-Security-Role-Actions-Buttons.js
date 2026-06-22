(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        console.log('content.js settings', settings)
            scriptInject('util/utils.js')
            scriptInject('ux/src/UX-Security-Role-Actions-Buttons-Script.js', settings)
    });
})();

window.addEventListener('message',function(event){
    if (event.source != window) return;
    switch(event.data.type){
        case "binarySettingsToggleHalf":
            binarySettingsToggleHalf()
            break;
    }
})

let firstHalfActive  = true
function binarySettingsToggleHalf(){ //
    const checkboxes = Array.from(document.querySelectorAll("tr[class*='plex-grid-row'] input"));
    const halfLength = Math.floor(checkboxes.length / 2);
    const firstHalf = checkboxes.slice(0, halfLength);
    const secondHalf = checkboxes.slice(halfLength);
    
    if (firstHalfActive) {
        // First half checked, second half unchecked
        firstHalf.forEach(checkbox => checkbox.checked = true);
        secondHalf.forEach(checkbox => checkbox.checked = false);
    } else {
        // Second half checked, first half unchecked
        firstHalf.forEach(checkbox => checkbox.checked = false);
        secondHalf.forEach(checkbox => checkbox.checked = true);
    }
    firstHalfActive  = !firstHalfActive ;
}
