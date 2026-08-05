import { SETTINGS } from "./settings-schema.js";
export function loadSettings(callback) {

    const DEFAULT_SETTINGS = Object.fromEntries(
    SETTINGS.map(setting => [setting.key, setting.default])
    );

    const STORAGE_KEYS = Object.keys(DEFAULT_SETTINGS);
    chrome.storage.sync.get(STORAGE_KEYS, (data) => {
        // Merge with default values
        const settings = { ...DEFAULT_SETTINGS, ...data };
        callback(settings);
    });
};

export function saveSettings(updatedSettings, callback) {
    chrome.storage.sync.set(updatedSettings, callback);
};

export function addLazyRule(){
    console.log("Setting up no lazy loading rule");
    const lazyRuleId = 1001;
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [lazyRuleId],
        addRules: [
            {
                id: lazyRuleId,
                priority: 1,
                condition: {
                    urlFilter: "cloud.plex.com", //Need cloud. included so to not match on the IAM screens.
                    resourceTypes: ["main_frame"],
                },
                action: {
                    type: "redirect",
                    redirect:{
                        transform:{
                            queryTransform: {
                                addOrReplaceParams:[
                                    {
                                        key:"__features",
                                        value:"novirtual"
                                    }
                                ]}
                }},
                },
            },
        ],
    });
};

export function removeLazyRule(){
    const lazyRuleId = 1001;
    chrome.declarativeNetRequest.getDynamicRules((rules) =>{
        const found = rules.some(rule => rule.id === lazyRuleId);
        if (chrome.runtime.lastError) {
            console.error("Error retrieving rules:", chrome.runtime.lastError);
            return;
        }
        if (rules.length > 0){
            console.log("Existing dynamic rules:", rules);
            if (found){
                console.log("Found lazyLoad rule. Removing.")
                chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: [lazyRuleId]})
            }
        } else {
            console.log("No dynamic rules found.");
        }
    })
}