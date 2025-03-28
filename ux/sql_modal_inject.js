window.addEventListener("message", async (event) => {
    if (event.source !== window || event.data.type !== "FROM_EXTENSION") return;

    let fileUrl = event.data.fileUrl;
    console.log('Event file URL:', fileUrl)
    // the bare minimum requirement for a popup is the "route" parameter which stores the URL for the pop window's HTML
    // Original:
    // "https://cloud.plex.com/BusinessIntelligence/SqlDevelopmentEnvironment/ViewSavedProcedures?__asid=XXXX"
    let c = {
        route: fileUrl
    }
    if (typeof plex.DialogController.create === "function") {
        plex.DialogController.create(c);
    }
});