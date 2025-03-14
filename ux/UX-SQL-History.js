window.addEventListener('pmcExpandedHistory', saveHistory);
let sqlHistory = [];

async function loadHistory(){
    const history = await chrome.storage.local.get({"pmcSQLHistory":[]});
    sqlHistory = history.pmcSQLHistory;
    console.log("starting history:", sqlHistory);
}

async function saveHistory(event){
    if (!event.detail || !event.detail.AdHocQuery) return;
    sqlHistory.push(event.detail);
    await chrome.storage.local.set({"pmcSQLHistory": sqlHistory});
}
loadHistory();

/*
There is a function called sde.LoadProcedure which appears to take in the sprocData.Data parameter when loading a sproc
sde is plex.currentPage.SqlDevelopmentEnvironment;
This function seems to load the sproc and populate the SDE text editor with the adhocquery data.
The function loads dynamically when the view stored procedure popup loads, so this has been difficult to investigate.
For the history function, I would want to be able to leverage this function and load the saved adhocquery values.
*/

/*
var sde = plex.currentPage.SqlDevelopmentEnvironment;
function loadSprocFromHistory_(sprocData) {
    if (sprocData && sprocData.Data) {
    sde.data = sprocData.Data; // form
    }
}
*/