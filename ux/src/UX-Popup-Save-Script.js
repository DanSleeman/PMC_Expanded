const popupWindow = '#uploadValidationDialog'
const popupFooter = ''
const saveButton = '#saveJsonBtn'
function popupWrapper(){
    const tag = '[Plex EX Popup Save Button]';
    
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    let appObserver = null;
    const favoritesPane = '#uploadValidationDialog';
    const appName = 'body';
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
      }
      observeApp();
      popupCheck();
}

function generateTableObject(){
    var tbl = $(jQuery('div.plex-grid-wrapper > table')[1]);
    // This selector should get the popup window data.
    // The base selector will return two tables since it sees the normal screen grid as well.
    // There are no good IDs to use for selecting the popup

    // Specify the indices of the columns you want to extract
    var columnIndices = [];

    //Pass true if you want to extract the whole popup into a json object.
    var allColumns = true; 

    var rowDataList = [];

    var headers = [];
    tbl.find('thead tr th').each(function(index) {
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
                // Header index is one ahead of row index for some reason.
                var headerText = headers[index+1] || ('column' + (index+1)); // Fallback to 'columnX' if no header. 
                rowData[headerText] = cells.eq(index).text().trim();
            }
        });

        // Add the object to the list if it has any data
        if (Object.keys(rowData).length > 0) {
            rowDataList.push(rowData);
        }
    });

    console.log('Extracted row data with headers as keys:', rowDataList);
    return rowDataList
}

function saveJsonToCsv() {
    // Example JSON data
    const jsonObject = generateTableObject()

    // Convert JSON to CSV
    const csv = convertJsonToCsv(jsonObject);

    // Trigger file download
    downloadCsv(csv, 'Upload_Validation_Data.csv');
}

function convertJsonToCsv(jsonData) {
    const headers = Object.keys(jsonData[0]);
    const csvRows = jsonData.map(row => 
        headers.map(header => `"${row[header]}"`).join(',')
    );

    // Add headers to the CSV
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
    
    // Clean up
    window.URL.revokeObjectURL(url);
}

function popupButtonCreate(){
    uxCreateButtonFooterPopup(popupWindow, 'saveJsonBtn', 'Save CSV')
    document.getElementById('saveJsonBtn').addEventListener('click', saveJsonToCsv);
}
popupWrapper();