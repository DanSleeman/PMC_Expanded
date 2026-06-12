export function loadSettings(callback) {
    const DEFAULT_SETTINGS = {
        vBoolUxTruckBannerFix: true
    };
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