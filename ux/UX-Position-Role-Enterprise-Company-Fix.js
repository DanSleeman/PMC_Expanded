let table = jQuery('#roleAssociationGrid > div.plex-grid-wrapper > table > tbody')
// let x = document.getElementsByClassName('element-repeater')

jQuery.groupCompanies = function (table){
    var rows = jQuery('tr',table);
    var companies;
    var companyCount;
    var companyList;
    rows.each(function(){
        companies = jQuery(this).children('td').eq(2);
        companyCount = companies.find('span').length;
        companyList = $.map(companies.find('span'),function(element){return $(element).text()}).join("\n");
        companies.children().remove();
        companies.append('<div>Count: '+companyCount+'</div>');
        companies.children().attr('title',companyList);
    })
}

new jQuery.groupCompanies(table)