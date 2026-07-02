import { loadSettings, addLazyRule, removeLazyRule} from "./config.js"
loadSettings((settings) =>{
    if (settings.vBoolUxLazyLoading){
        chrome.runtime.onConnect.addListener(addLazyRule);
    } else {
        removeLazyRule();
    }
    chrome.runtime.onSuspend.addListener(removeLazyRule);
    
    if (settings.vBoolUxLazyLoading && settings.vBoolUxSelectHalfCheckboxes){

        chrome.contextMenus.create({
        id: 'selectHalf',
        title: 'Select Half Checkboxes',
        contexts: ['page'],
        documentUrlPatterns:[
            "*://test.cloud.plex.com/*",
            "*://cloud.plex.com/*"
        ]
        }, ()=>{
            if (chrome.runtime.lastError){
                console.warn('Menu item already exists:', chrome.runtime.lastError);
            }
        });

        chrome.contextMenus.onClicked.addListener((info, tab) => {
        if (info.menuItemId === 'selectHalf') {
            chrome.tabs.sendMessage(tab.id, { action: 'selectHalf', targetElement: info.frameId });
        }
        });
    };
});
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'PMCEXlog') {
    console.log(request.message);
  }
});