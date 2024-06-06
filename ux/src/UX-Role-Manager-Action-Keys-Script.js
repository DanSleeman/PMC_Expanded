// This script finds and adds the action key for each action on the Security Roles page in UX.

// Function to insert action keys
function actionKeyInsert(){
    // Check if the key elements exist already
    if (jQuery('div.plex-grid-wrapper > table > tbody > tr > td:nth-child(6) > div').length > 0) return;
    // Get all checkboxes for each action
    var x = jQuery('tr > td > div > input[type="checkbox"]')
    // Get action key for each checkbox
    for (i=0;i<x.length;i++){
        var aKey = ko.dataFor(x[i]).data.CloudApplicationActionKey
        var dNode = document.createElement ('div');
        dNode.innerHTML = 'Key: ' + aKey;
        x[i].parentNode.parentNode.nextSibling.nextSibling.appendChild(dNode);
    }
}
function createTheButtons(){
    uxCreateButton('actionKeys','Show Action Keys',null,'Displays Action Key for VP navigation.')

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