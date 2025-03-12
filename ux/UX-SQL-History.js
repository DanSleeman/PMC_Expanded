window.addEventListener('pmcExpandedHistory', saveHistory)
var sqlHistory
chrome.storage.local.get({"pmcSQLHistory":[]}).then(printHistory)

function printHistory(history){
    console.log("starting history:", history.pmcSQLHistory)
    sqlHistory = history.pmcSQLHistory;
}
function saveHistory(history){
    console.log(history.detail)
    sqlHistory.push(history.detail.AdHocQuery)
    chrome.storage.local.set({"pmcSQLHistory": sqlHistory})
}