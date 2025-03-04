// Removes the revision history on UX user manager that is added by ADP integration.
// Every time it updates, it adds change entries for each role equal to the total number of roles.

// Figure out a way to identify all of the duplicates and remove these.
/*
For instance, if "Original Value" has a record with a matching "New Value" then remove all rows with a matching "Original Value" entry.
This would allow for cleaning up all the entries which have not actually changed.
The grouping would need to be done by the "Modified Date" column grouping.
Nate Velez is a good example to check. Most recent changes have a lot of roles that didn't change, but the building did.
*/

// function remAdpHistory(){

// var x = document.querySelectorAll('tr[class^="plex-grid-row"]')
// for (i=0;i<x.length;i++){
//     var prev = x[i].children[3].innerText
//     var nxt = x[i].children[4].innerText
//     var field = x[i].children[2].innerText
//     if (prev != nxt && field == 'UX'){
//         x[i].remove()
//         }
//     }
// }
// remAdpHistory()


function rem(){
    const tag = '[PMC Expanded Remove ADP Junk]';
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    let appObserver = null;
    const appName = '.plex-grid-wrapper';
    let pinElement = null;

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

      function observeApp() {
        debug(`Observing ${appName}...`);
        appObserver = new MutationObserver((mutations, observer) => {
            remAdpHistory();
        });
        if (document.querySelector(appName) === null) return;
        appObserver.observe(document.querySelector(appName), {
          childList: true,
          subtree: true,
          attributes: true
        });
      }
      function remAdpHistory() {
        log(`Mutator detected`);
        if (document.querySelector('.plex-grid-row') === null) return;
        // log(`pin icon is visible`);
        // if (ko.dataFor(document.querySelector('.plex-grid-row')).isPinned() == true) return;
        log(`Executing script`);
        var x = document.querySelectorAll('tr[class^="plex-grid-row"]')
        for (i=0;i<x.length;i++){
            var prev = x[i].children[3].innerText
            var nxt = x[i].children[4].innerText
            var field = x[i].children[2].innerText
            if (prev != nxt && field == 'UX'){
                x[i].remove()
                }
            }      }
    // Uncomment to restore functionality
    //   observeApp();
    //   log(`Monitoring Plex for revision history...`);
    //   remAdpHistory();

}
rem();