// ==UserScript==
// @name         Plex UX Position Role Association Bandaid Fix
// @namespace    mailto:sleemand@shapecorp.com
// @version      2024-01-03
// @description  Groups the 'Companies' column into a single record displaying the count of the companies with hover text for the PCNs that are enterprised.
// @author       Dan Sleeman (sleemand@shapecorp.com); https://stackoverflow.com/a/12751531/3900817
// @match        https://*cloud.plex.com/Security/PositionSecurityRoleAssociations/ViewPositionRoleAssociation*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=plex.com
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

// This will install jQuery if it is not present. 
// Plex should already have it though.
// From https://stackoverflow.com/a/12751531/3900817
function GM_main ($) {
    console.log ('jQuery is installed with no conflicts! The version is: ' + $.fn.jquery);
}

if (typeof jQuery === "function") {
    console.log ("Running with local copy of jQuery!");
    GM_main (jQuery);
}
else {
    console.log ("fetching jQuery from some 3rd-party server.");
    add_jQuery (GM_main, "3.2.1");
}

function add_jQuery (callbackFn, jqVersion) {
    var jqVersion   = jqVersion || "3.2.1";
    var D           = document;
    var targ        = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    var scriptNode  = D.createElement ('script');
    scriptNode.src  = 'http://ajax.googleapis.com/ajax/libs/jquery/'
                    + jqVersion
                    + '/jquery.min.js'
                    ;
    scriptNode.addEventListener ("load", function () {
        var scriptNode          = D.createElement ("script");
        scriptNode.textContent  =
            'var gm_jQuery  = jQuery.noConflict (true);\n'
            + '(' + callbackFn.toString () + ')(gm_jQuery);'
        ;
        targ.appendChild (scriptNode);
    }, false);
    targ.appendChild (scriptNode);
}

// Locate the companies header position even if it has been glossarized or the user has a non-English language selected.
function findCompaniesHeaderGlossary(){
    let headers = $('thead > tr.plex-grid-header-row > th')
    let a = []
    headers.each(function(index){
        let ogHead = ko.dataFor(this).originalHeaderName
        if (ogHead === 'Companies'){
            a.push(index)
        }
    })
    return a[0]
}

// Begin mutator script for monitoring the table.
// For some reason, I've seen Plex 'refresh' the table body after the table is loaded.
// On top of the lazy loading, this causes any non-mutator script to be overwritten.

function roleAssociationBandaid(){
    const tag = '[Plex UX Role Association Company Group]'
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
            columnRearrange();
        });
        if ($('#roleAssociationGrid > div.plex-grid-wrapper > table > tbody').length === 0) return;
        appObserver.observe($('#roleAssociationGrid > div.plex-grid-wrapper > table > tbody')[0],{
            childList: true,
            subtree: true,
            attributes: true
        });
      }

      function columnRearrange(){
        if ($('#roleAssociationGrid > div.plex-grid-wrapper > table > tbody > tr > td').children().find('span').length>0){
            freeScreenSpace();
        }
      }
      observeApp();
      columnRearrange();
}

// Function to actually group the companies and modify the DOM.
// Groups the enterprise companies column into a count display with hover text for the enterprised companies.
// Why Plex decided to implement it in the current state boggles my mind.
// Imagine a company with 100 enterprise PCNs using this. Our 12-13 PCNs already take 1/4 of the screen space per role.

function freeScreenSpace(){
    var tbl;
    $.groupCompanies = function (table){
        let companyIndex = findCompaniesHeaderGlossary()
        var rows = $('tr',table);
        var companies;
        var companyCount;
        var companyList;
        rows.each(function(){
            companies = $(this).children('td').eq(companyIndex);
            companyCount = companies.find('span').length;
            if (companyCount === 0) return;
            companyList = $.map(companies.find('span'),function(element){return $(element).text()}).join("\n");
            companies.children().remove();
            companies.append('<div>Count: '+companyCount+'</div>');
            companies.children().attr('title',companyList);
        })
    }
    if ($('#roleAssociationGrid > div.plex-grid-wrapper > table > tbody > tr > td').children().find('span').length>0){
        tbl = $('#roleAssociationGrid > div.plex-grid-wrapper > table');
        new $.groupCompanies(tbl);
    }
}
roleAssociationBandaid();
