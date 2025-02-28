// For some reason, Plex 'refreshes' the table body after the table is loaded. 
// This causes any normal non-mutator script injection to be overwritten.
function roleAssociationRearrange(){
    const tag = '[PMC Expanded Role Association Column Rearrange]'
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
        if (jQuery('#roleAssociationGrid > div.plex-grid-wrapper > table > tbody').length === 0) return;
        appObserver.observe(jQuery('#roleAssociationGrid > div.plex-grid-wrapper > table > tbody')[0],{
            childList: true,
            subtree: true,
            attributes: true
        });
      }

      function columnRearrange(){
        if (jQuery('#roleAssociationGrid > div.plex-grid-wrapper > table > tbody > tr > td')[3].length === 0) return;
        if (jQuery('#roleAssociationGrid > div.plex-grid-wrapper > table > tbody > tr > td')[3].getAttribute('class') === null) return;
        if (jQuery('#roleAssociationGrid > div.plex-grid-wrapper > table > tbody > tr > td')[3].getAttribute('class') === 'plex-boolean'){
        moveCheckboxes();
        }
      }
      observeApp();
      columnRearrange();
}
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
function moveCheckboxes(evt){
    let checkIndex = 3;
    let newIndex = 0;
    jQuery.moveColumn = function (table, from, to) {
        var rows = jQuery('tr', table);
        var cols;
        rows.each(function() {
            cols = jQuery(this).children('td');
            cols.eq(from).detach().insertBefore(cols.eq(to));
        });
    }
    // We can't move the header with the body. Plex refreshses the table body once it is finished loading, but not the header.
    // Combining these in the 'cols' variable will cause a double shift.
    jQuery.moveHeader = function(table,from,to){
        var rows = jQuery('tr', table);
        var cols;
        rows.each(function() {
            cols = jQuery(this).children('th');
            cols.eq(from).detach().insertBefore(cols.eq(to));
        });
    }
    // Groups the enterprise companies column into a count display.
    // Sets the title as the original company text.
    // Why Plex decided to implement it like this boggles my mind. 
    // Imagine a company with 100 enterprise PCNs using this. Our 12 is already 1/4 of the screen realistate.
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
    //Table body. Verify that the check boxes are at the last index so it isn't continually moving columns around.
    if (jQuery('#roleAssociationGrid > div.plex-grid-wrapper > table > tbody > tr > td')[3].getAttribute('class') === 'plex-boolean'){
        var tbl = jQuery('#roleAssociationGrid > div.plex-grid-wrapper > table');
        new jQuery.moveColumn(tbl, checkIndex, newIndex);
        new jQuery.groupCompanies(tbl);
    }
    //Top headers
    if (jQuery('#roleAssociationGrid > div.plex-grid-wrapper > table > thead > tr > th')[4].getAttribute('class') === 'plex-grid-header-cell sortable plex-boolean'){
        var tbl = jQuery('#roleAssociationGrid > div.plex-grid-wrapper > table');
        new jQuery.moveHeader(tbl, checkIndex, newIndex);
    }
    //Floating header for scrolling. This is separate from the main table and needs to also be updated. 
    if (jQuery('#roleAssociationGrid > div.fixed-element-wrapper > div > table > thead > tr > th')[4].getAttribute('class') === 'plex-grid-header-cell sortable plex-boolean'){
        var tbl = jQuery('#roleAssociationGrid > div.fixed-element-wrapper > div > table');
        new jQuery.moveHeader(tbl, checkIndex, newIndex);
    }}
roleAssociationRearrange();