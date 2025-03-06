import { loadSettings, addLazyRule, removeLazyRule} from "./config.js"
loadSettings((settings) =>{
    if (settings.vBoolUxLazyLoading){
        chrome.runtime.onConnect.addListener(addLazyRule);
    } else {
        removeLazyRule();
    }
    chrome.runtime.onSuspend.addListener(removeLazyRule);
});