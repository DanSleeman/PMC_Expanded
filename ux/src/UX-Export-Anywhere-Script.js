const exportButton = '#exportAnywhere';
const exportTag = '[PMC Expanded Export Anywhere]';
function log(message) {
    console.log(`${exportTag}[${getTimestamp()}] ${message}`);
  }

function exportDebug(message) {
    console.debug(`${exportTag}[${getTimestamp()}] ${message}`);
  }
function asDoubleDigit(value) {
    return value < 10 ? '0' + value : value;
  }

function getTimestamp() {
    let dt = new Date();
    let time = asDoubleDigit(dt.getHours()) + ':' + asDoubleDigit(dt.getMinutes()) + ':' + asDoubleDigit(dt.getSeconds());
    return time;
  }

function exportWrapper(){
    if (document.getElementsByClassName('plex-actions').length == 0){
        return
    }
    if (!jQuery('div.plex-grid-wrapper > table')[0]){
        return
    }
    checkForFunction();
    addExportCheckboxesToTableHeader();
}

function generateExportTableObject(){
    var tbl = $(jQuery('div.plex-grid-wrapper > table')[0]);
    exportDebug(tbl)
    var columnIndices = getCheckboxStatus();
    

    var allColumns = false; 
    // Fallback to download all columns if there are no checked columns or there is an issue finding the checked columns.
    if (columnIndices.length < 1){
        allColumns = true;
    }

    var rowDataList = [];
    var headers = [];

    // Getting the text from just the th element includes some hidden text content from the sort order of the column.
    // Some columns don't have text and this causes the indexes to be desynced if trying to directly find abbr elements.
    // Need to include the tr class because there is a single phantom thead tr th element for some reason
    tbl.find('thead tr.plex-grid-header-row th.plex-grid-header-cell').each(function(index) {
        var columnText = ''
        if (this.querySelector('div abbr')){
            columnText = $(this.querySelector('div abbr')).text().trim();
            exportDebug('Column has abbr tag')
        } else {
            columnText = 'column' + (index)
            exportDebug('Column does not have abbr tag')
        }
        exportDebug(`Column text: ${columnText}`)
        headers[index] = columnText
    });

    if (allColumns){
        columnIndices = Array.from({length: headers.length}, (_, index) => index);
    }

    tbl.find('tbody tr.plex-grid-row').each(function() {
        // exportDebug('compiling row data')
        
        var rowData = {}; 
        var cells = $(this).find('td').not('.plex-grid-selection-cell'); //Ignoring the first column if it is a checkbox selector

        // Loop through the specified column indices and store the values in the object
        columnIndices.forEach(function(index) {
            if (cells.eq(index).length) {
                // Use the header text as the key and the cell content as the value
                var headerText = headers[index] || ('column' + (index)); // Fallback to 'columnX' if no header. 
                var boolean_check = cells.eq(index).find('i[class^="plex-icon-check"]')
                if (boolean_check.length){ 
                    //There is a style applied for display: none if a plex-icon-check3 element exists.
                    if (boolean_check.attr('style')){
                        rowData[headerText] = false.toString() 
                } else{
                    rowData[headerText] = true.toString() 
                }}
                else if (cells.eq(index).find('input[type="text"]').length) {
                    rowData[headerText] = cells.eq(index).find('input[type="text"]').val().trim().replaceAll('"','""'); //content from editable fields
                } else if (cells.eq(index).find('input[type="checkbox"]').length) {
                    rowData[headerText] = cells.eq(index).find('input[type="checkbox"]')[0].checked.toString()
                } else {
                    rowData[headerText] = cells.eq(index).text().trim().replaceAll('"','""') || ''; //Not having this will break csv formatting.
                }
            } else {
                var headerText = headers[index] || ('column' + (index)); // Fallback to 'columnX' if no header.
                rowData[headerText] = ''
            }
        });

        // Add the object to the list if it has any data
        if (Object.keys(rowData).length > 0) {
            rowDataList.push(rowData);
            // exportDebug(rowData)
        }
    });

    exportDebug('Extracted row data with headers as keys:', rowDataList);
    return rowDataList
}

function saveExcportJsonToCsv() {
    const jsonObject = generateExportTableObject()
    const csv = convertExportJsonToCsv(jsonObject);
    const saveTitle = document.title
    exportCsv(csv, `${saveTitle}.csv`);
}

function convertExportJsonToCsv(jsonData) {
    const headers = Object.keys(jsonData[0]);
    const csvRows = jsonData.map(row => 
        headers.map(header => `"${row[header]}"`).join(',')
    );

    csvRows.unshift(headers.join(','));

    return csvRows.join('\n');
}

function exportCsv(csvContent, fileName) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    a.click();
    
    window.URL.revokeObjectURL(url);
}
function checkForFunction(){
    if (typeof window.uxCreateButton === 'function'){
        exportButtonCreate();
    } else {
        requestAnimationFrame(checkForFunction);
    }
}
function exportButtonCreate(){
    uxCreateButton('exportAnywhere','Export Visible Content')
    document.getElementById('exportAnywhere').addEventListener('click', saveExcportJsonToCsv);
}
function getCheckboxStatus(){
    const selectedColumns = document.querySelectorAll('.PlexEX.ExportAnywhereCheckbox')
    let selectedIndexes = []
    for (let i = 0; i < selectedColumns.length; i++){
        if (selectedColumns[i].checked){
            selectedIndexes.push(i)
        }
    }
    return selectedIndexes
}
async function addExportCheckboxesToTableHeader() {
    try {
        const table = await waitForElement(exportButton, 60000, document, 0)
        var tbl = jQuery('div.plex-grid-wrapper > table')[0]
        exportDebug(table)
        const headerRow = await waitForElement('thead tr.plex-grid-header-row', 60000, tbl, 0);
        exportDebug(headerRow)
        const headers = headerRow.getElementsByClassName('plex-grid-header-cell');
        exportDebug(headers)
        for (let i = 0; i < headers.length; i++) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = true;
            checkbox.setAttribute('class', 'PlexEX ExportAnywhereCheckbox')
            
            const checkboxContainer = document.createElement('div');
            checkboxContainer.style.textAlign = 'center';
            
            checkboxContainer.appendChild(checkbox);
            
            // Placing the checkbox under the column text is more consistently formatted.
            headers[i].appendChild(checkboxContainer);
        }
    } catch (error){
        console.error(error);
    }
}

function checkForWaitFunction(){
    if (typeof window.waitForElement === 'function'){
        exportWrapper();
    } else {
        requestAnimationFrame(checkForWaitFunction);
    }
}

checkForWaitFunction();
