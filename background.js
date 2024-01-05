chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
        addRules: [
            {
                id: 1,
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
});
