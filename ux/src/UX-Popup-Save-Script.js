const popupWindow = '#uploadValidationDialog'
const popupFooter = ''
const saveButton = '#saveJsonBtn'
const tag = '[Plex EX Popup Save Button]';
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

function popupWrapper(){
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    let appObserver = null;
    const favoritesPane = '#uploadValidationDialog';
    const appName = 'body';
  
      function observeApp() {
        debug(`Observing ${appName}...`);
        appObserver = new MutationObserver((mutations, observer) => {
          popupCheck();
        });
        if (document.querySelector(appName) === null) return;
        appObserver.observe(document.querySelector(appName), {
          childList: true,
          subtree: true,
          attributes: true
        });
      }

      function popupCheck(){
        if (document.querySelector(favoritesPane) === null) return;
        if (document.querySelector(saveButton) !== null) return;
        popupButtonCreate();
        addCheckboxesToTableHeader();
      }
      observeApp();
      popupCheck();
}

function generateTableObject(){
    var tbl = $(jQuery('div.plex-grid-wrapper > table')[1]);
    // This selector should get the popup window data.
    // The base selector will return two tables since it sees the normal screen grid as well.
    // There are no good IDs to use for selecting the popup
    // One screen appears to show that the popup has an ID, but I don't think this is consistent.

    var columnIndices = getCheckboxStatus();
    

    var allColumns = false; 
    // Fallback to download all columns if there are no checked columns or there is an issue finding the checked columns.
    if (columnIndices.length < 1){
        allColumns = true;
    }

    var rowDataList = [];
    var headers = [];

    // Getting the text from just the th element includes some hidden text content from the sort order of the column.
    tbl.find('thead tr th div abbr').each(function(index) {
        headers[index] = $(this).text().trim();
    });

    if (allColumns){
        columnIndices = Array.from({length: headers.length}, (_, index) => index);
    }

    tbl.find('tbody tr').each(function() {
        var rowData = {}; 
        var cells = $(this).find('td'); 

        // Loop through the specified column indices and store the values in the object
        columnIndices.forEach(function(index) {
            if (cells.eq(index).length) {
                // Use the header text as the key and the cell content as the value
                var headerText = headers[index] || ('column' + (index)); // Fallback to 'columnX' if no header. 
                rowData[headerText] = cells.eq(index).text().trim().replaceAll('"','""'); //Not having this will break csv formatting.
            }
        });

        // Add the object to the list if it has any data
        if (Object.keys(rowData).length > 0) {
            rowDataList.push(rowData);
        }
    });

    debug('Extracted row data with headers as keys:', rowDataList);
    return rowDataList
}

function saveJsonToCsv() {
    const jsonObject = generateTableObject()
    const csv = convertJsonToCsv(jsonObject);
    downloadCsv(csv, 'Upload_Validation_Data.csv');
}

function convertJsonToCsv(jsonData) {
    const headers = Object.keys(jsonData[0]);
    const csvRows = jsonData.map(row => 
        headers.map(header => `"${row[header]}"`).join(',')
    );

    csvRows.unshift(headers.join(','));

    return csvRows.join('\n');
}

function downloadCsv(csvContent, fileName) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    a.click();
    
    window.URL.revokeObjectURL(url);
}

function popupButtonCreate(){
    uxCreateButtonFooterPopup(popupWindow, 'saveJsonBtn', 'Save CSV')
    document.getElementById('saveJsonBtn').addEventListener('click', saveJsonToCsv);
}
function getCheckboxStatus(){
    const selectedColumns = document.querySelectorAll('.PlexEX.UploadValidationCheckbox')
    let selectedIndexes = []
    for (let i = 0; i < selectedColumns.length; i++){
        if (selectedColumns[i].checked){
            selectedIndexes.push(i)
        }
    }
    return selectedIndexes
}
async function addCheckboxesToTableHeader() {
    try {
        const table = await waitForElement('#uploadValidationDialog', 60000, document, 0)
        debug(table)
        // The popup initializes with an empty table prior to having data.
        // Using the workaroundLength parameter of 1 will allow the await call to properly find the real table.
        // Plex tables have 2-4 thead tr elements.
        // Index 1 and 3 of this list are the actual header cells. Index 3 should be the stationary cell.
        const headerRow = await waitForElement('thead tr', 60000, table, 3, 1);
        debug(headerRow)
        const headers = headerRow.getElementsByTagName('th');
        debug(headers)
        for (let i = 0; i < headers.length; i++) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = true;
            checkbox.setAttribute('class', 'PlexEX UploadValidationCheckbox')
            
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
popupWrapper();