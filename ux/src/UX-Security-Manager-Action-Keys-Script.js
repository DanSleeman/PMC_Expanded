// This script finds and adds the action key for each action on the Security Admin page in UX.
// Function to insert action keys
function actionKeyInsert(){
    if (jQuery('div.plex-grid-wrapper > table > tbody > tr > td:nth-child(2) > div').length > 0) return;
    // Get all checkboxes for each action
    var x = document.querySelectorAll('td[class="plex-grid-selection-cell"]')
    // Get action key for each checkbox
    for (i=0;i<x.length;i++){
        var aKey = ko.dataFor(x[i].children[0]).data.CloudApplicationActionKey
        var dNode = document.createElement ('div');
        dNode.innerHTML = 'Key: ' + aKey;
        x[i].nextSibling.appendChild(dNode);
    }}
/*
// Start Mutator Script
// Mutator doesn't work, so just going to use the button action.
// Not sure how to observe when the grid controller refreshes, but if that is discovered, this can be updated to observe that.
function actionKeyInsertWrapper(){
    const tag = '[PMC Expanded Action Key Insert]'
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    let appObserver = null;
    const appName = '.plex-grid';

    function log(message) {
        console.log(`${tag}[${getTimestamp()}] ${message}`);
      }
  
      function debug(message) {
        console.debug(`${tag}[${getTimestamp()}] ${message}`);
      }
  
      function asDoubleDigit(value) {
        return value < 10 ? '0' + value : value;
      }
  
      function getTimestamp() {
        let dt = new Date();
        let time = asDoubleDigit(dt.getHours()) + ':' + asDoubleDigit(dt.getMinutes()) + ':' + asDoubleDigit(dt.getSeconds());
        return time;
      }
      
      function observeApp(){
        debug(`Observing ${appName}...`);
        appObserver = new MutationObserver((mutations,observer) =>{
            actionKeyInitializer();
        });
        if (jQuery('div.plex-grid-wrapper > table > tbody').length === 0) return;
        appObserver.observe(jQuery('div.plex-grid-wrapper > table > tbody > tr')[0],{
            childList: true,
            subtree: true,
            attributes: true
        });
      }

      function actionKeyInitializer(){
        if (jQuery('div.plex-grid-wrapper > table > tbody > tr > td:nth-child(2) > div').length > 0) return;
        // if (jQuery('#roleAssociationGrid > div.plex-grid-wrapper > table > tbody > tr > td')[3].getAttribute('class') === null) return;
        // if (jQuery('#roleAssociationGrid > div.plex-grid-wrapper > table > tbody > tr > td')[3].getAttribute('class') === 'plex-boolean')
        actionKeyInsert();
      }
      observeApp();
      actionKeyInitializer();
}
actionKeyInsertWrapper();
*/
// Start Action Button Creation
function createTheButtons(){
    uxCreateButton('actionKeys','Show Action Keys',link=null,title='Displays Action Key for VP navigation.')
    document.getElementById ("actionKeys").addEventListener (
        "mouseup", actionKeyInsert, false
    );
}
function checkForFunction(){
    if (typeof window.uxCreateButton === 'function'){
        createTheButtons();
    } else {
        requestAnimationFrame(checkForFunction);
    }
}

checkForFunction();