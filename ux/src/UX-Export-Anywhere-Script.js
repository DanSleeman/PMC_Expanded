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
    var columnIndices = getExportCheckboxStatus();
    columnIndices.sort((a,b) => a.index - b.index)

    var allColumns = false; 
    // Fallback to download all columns if there are no checked columns or there is an issue finding the checked columns.
    if (columnIndices.length < 1){
        console.log('length is less than 1, exporting all columns')
        allColumns = true;
    }

    var rowDataList = [];

    if (allColumns){
        columnIndices = Array.from({length: columnIndices.length}, (_, index) => index);
    }

    tbl.find('tbody tr.plex-grid-row').each(function() {
        var rowData = {}; 
        var cells = $(this).find('td').not('.plex-grid-selection-cell'); //Ignoring the first column if it is a checkbox selector

        // Loop through the specified column indices and store the values in the object
        columnIndices.forEach(function(plexExCol) {
            lookup = plexExCol.index != null ? plexExCol.index : plexExCol
            if (cells.eq(lookup).length) {
                // Use the header text as the key and the cell content as the value
                var headerText = plexExCol.name || 'Column_' + plexExCol
                var boolean_check = cells.eq(lookup).find('i[class^="plex-icon-check"]')
                if (boolean_check.length){
                    //There is a style applied for display: none if a plex-icon-check3 element exists.
                    if (boolean_check.attr('style')){
                        rowData[headerText] = false.toString()
                } else{
                    rowData[headerText] = true.toString()
                }}
                else if (cells.eq(lookup).find('input[type="text"]').length) {
                    rowData[headerText] = cells.eq(lookup).find('input[type="text"]').val().trim().replaceAll('"','""'); //content from editable fields
                } else if (cells.eq(lookup).find('input[type="checkbox"]').length) {
                    rowData[headerText] = cells.eq(lookup).find('input[type="checkbox"]')[0].checked.toString()
                } else {
                    rowData[headerText] = getVisibleText(cells.eq(lookup)[0]).trim().replaceAll('"','""') || ''; //Not having replacement function will break csv formatting.
                }
            } else{
                console.log(`Column ${plexExCol.name} is unable to be found`)
                var headerText = plexExCol.name || 'Column_' + plexExCol
                rowData[headerText] = ''
            }
        });
        if (Object.keys(rowData).length > 0) {
            rowDataList.push(rowData);
        }
    });
    return rowDataList
}

function saveExportJsonToCsv() {
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
    document.getElementById('exportAnywhere').addEventListener('click', saveExportJsonToCsv);
}
function getExportCheckboxStatus(){
    const selectedColumns = document.querySelectorAll('.PlexEX.ExportAnywhereCheckbox')
    let selectedIndexes = []
    for (let i = 0; i < selectedColumns.length; i++){
        let selectedObj = {}
        if (selectedColumns[i].checked){
            selectedObj.index = parseInt(selectedColumns[i].getAttribute('sortindex'))
            selectedObj.name = selectedColumns[i].name
            selectedIndexes.push(selectedObj)
        }
    }
    return selectedIndexes
}
function getExportCellAttributes(element, index, groupText=null){
    //Returns an object of the column which defines the column text(with grouping text), the HTML element, and the index within the table.
    colObj = {}
    var columnText = ''
    if (element.querySelector('div abbr')){
        columnText = $(element.querySelector('div abbr')).text().trim();
    } else {
        columnText = 'column' + (index)
    }
    exportDebug(`Column text: ${columnText}`)
    if (groupText){
        columnText = groupText + ' - ' + columnText
    }
    colObj.text = columnText
    colObj.elem = element
    colObj.index = index
    return colObj
}
function getVisibleText(element) {
    // From https://stackoverflow.com/a/48001585
    window.getSelection().removeAllRanges();

    let range = document.createRange();
    range.selectNode(element);
    window.getSelection().addRange(range);

    let visibleText = window.getSelection().toString().trim();
    window.getSelection().removeAllRanges();

    return visibleText;
}
function getExportFlatHeaders(mainHeader, subHeaders=null) {
    //Gets a list of headers which have any grouped columns identified as such.
    let headers = [];
    let colIndex = 0;
    let fullIndex = 0;
    let subHead;
    const head = Array.from(mainHeader.children).filter(el => el.tagName === 'TH');
    if (subHeaders){subHead = Array.from(subHeaders.children).filter(el => el.tagName === 'TH');}
    for (let th of head) {
        let colspan = th.colSpan || parseInt(th.getAttribute('colspan') || '1', 10);
        let rowspan = th.rowSpan || parseInt(th.getAttribute('rowspan') || '1', 10);
        let isSubRow = rowspan === 1 && subHead;

        if (isSubRow){
                groupText = getExportCellAttributes(th, fullIndex).text
                // headers.push(...subHead.slice(colIndex, colIndex + colspan).map((cell,i) => getExportCellAttributes(cell, fullIndex+i, groupText)))
                for (let i = 0; i < colspan; i++) {
                    headers.push(getExportCellAttributes(subHead[colIndex + i], fullIndex + i, groupText));
                }
                fullIndex += colspan - 1
                colIndex += colspan
        } else {
            headers.push(getExportCellAttributes(th, fullIndex));
        }
        fullIndex++;
    }
    console.log(headers)
    return headers;
}
async function addExportCheckboxesToTableHeader() {
    try {
        const table = await waitForElement(exportButton, 60000, document, 0) //Get the first table on the page.
        var tbl = jQuery('div.plex-grid-wrapper > table')[0]
        exportDebug(table)
        const headerRow = await waitForElement('thead tr.plex-grid-header-row', 60000, tbl, 999); //Get the first header for that table.
        exportDebug(headerRow)
        console.log(headerRow)
        let headers = getExportFlatHeaders(...headerRow)
        let headElem;
        exportDebug(headers)
        console.log(headers)
        for (let i = 0; i < headers.length; i++) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = true;
            checkbox.setAttribute('class', 'PlexEX ExportAnywhereCheckbox')
            checkbox.setAttribute('name', headers[i].text)
            checkbox.setAttribute('sortindex', headers[i].index)
            const checkboxContainer = document.createElement('div');
            checkboxContainer.style.textAlign = 'center';
            
            checkboxContainer.appendChild(checkbox);
            
            // Placing the checkbox under the column text is more consistently formatted.
            headElem = headers[i].elem || headers[i]
            headElem.appendChild(checkboxContainer);
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
