const checksheetPopupWindow = 'checksheetLineActionBar' //This ID is the container for the checksheet measurement rows
const checksheetActionButton = '#pencilWhip'
const checksheetTag = '[PMC Expanded Pencil Whip Checksheet]';

function log(message) {
    console.log(`${checksheetTag}[${getTimestamp()}] ${message}`);
  }

function debug(message) {
    console.debug(`${checksheetTag}[${getTimestamp()}] ${message}`);
  }
function asDoubleDigit(value) {
    return value < 10 ? '0' + value : value;
  }

function getTimestamp() {
    let dt = new Date();
    let time = asDoubleDigit(dt.getHours()) + ':' + asDoubleDigit(dt.getMinutes()) + ':' + asDoubleDigit(dt.getSeconds());
    return time;
  }
function checksheetPopupWrapper(){
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    let appObserver = null;
    const checksheetPane = '#checksheetLineTraditionalGrid_Container';
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
        if (document.querySelector(checksheetPane) === null) return;
        if (document.querySelector(checksheetActionButton) !== null) return;
        checksheetPopupButtonCreate();
        // identifyCorrectValues();
      }
      observeApp();
      popupCheck();
}
async function checksheetPopupButtonCreate(){
    uxCreateButtonPopup(checksheetPopupWindow, 'pencilWhip', 'Pencil Whip')
    const a = await waitForElement('#pencilWhip',60000, document, 0)
    a.addEventListener('click', pencilWhipChecksheet);
}
// function to input text into checksheet data input fields. Completely overwrites the DOM value so it can be used to replace inputs.
// The input needs to be valid for the checksheet since these events will fire the event to trigger a failure notice.
function simulateTyping(el, text) {
  el.dispatchEvent(new FocusEvent('focus', { bubbles: true }));

  for (const ch of text) {
    const code = ch.charCodeAt(0);
    el.dispatchEvent(new KeyboardEvent('keydown', {
      key: ch, code: `Digit${ch}`, keyCode: code, which: code,
      bubbles: true, cancelable: true
    }));
    el.dispatchEvent(new InputEvent('input', {
      data: ch, inputType: 'insertText', bubbles: true, cancelable: true
    }));
    el.dispatchEvent(new KeyboardEvent('keyup', {
      key: ch, code: `Digit${ch}`, keyCode: code, which: code,
      bubbles: true, cancelable: true
    }));
  }
  el.value = text; //Force visible input value. This alone doesn't pass the check.
  el.dispatchEvent(new Event('change', { bubbles: true }));
  el.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
}

async function identifyCorrectValues(){
    try{
        const table = await waitForElement('#checksheetLineTraditionalGrid_Container',60000, document, 0)
        const headerRow = await waitForElement('thead tr', 60000, table, 3, 1);

        // Locate all text input rows and get the valid target value
        // Targets can have different types:
        // Minimum - 2023.280 lbs Min
        // Maximum - 0.012 in Max
        // One sided min with target - 4.73 mm Min (5.33)
        // One sided max with target - 5.33 mm Max (4.73) (Theoretical; didn't find an example.)
        // Two Sided - 8.00 mm (There is a measurement text that would go after this limit text separated by a line break)
        //      Also shows upper/lower limits in other cell - 15.00 0.00 (The text is separated by a line break element)

        const e = table.querySelectorAll('tr:has(td input[type="text"][name="Value"])[class~="selectable"]') //All rows which have input elements
        for (let el of e){
            let limitSpan = el.querySelectorAll('td[data-col-index="2"] span')[1]
            let limitText = Array.from(limitSpan.childNodes) 
                .filter(node => node.nodeType === Node.TEXT_NODE || node.nodeName === 'BR')
                .reduce((acc, node) => {
                    if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent.trim();
                    if (text) acc.push(text);
                    }
                return acc;
            }, []);
            let cv = limitText[0].split("\u00A0")[0]; // input value from limit text. Use this since it should be valid for all checks.
            let inputs = [...el.querySelectorAll('input[type="text"]')] //Nodelist != array
                .filter(el => window.getComputedStyle(el).display !== 'none'); // There are a bunch of hidden input elements which cause the update loop to break when firing events to them.
            // Apply the target value as an element attribute and set a class to identify these.
            for (let i of inputs){
                i.setAttribute('PMCEXcorrectValue', cv)
                i.classList.add('PMCEXcorrectInput')
            }
        }

        //Identify and mark all passing radio buttons with a class.
        const x = document.querySelectorAll('input[type=radio]')
        for (let e of x){
            let el = ko.contextFor(e).$rawData
            if (el?.data?.Value){
                e.classList.add('PMCEXcorrectRadio')}}
    } catch (error){
        console.error(error);
    }
}
async function pencilWhipChecksheet() {
    await identifyCorrectValues()
    // Locate and apply the target value attribute for each input element.
    const v = document.querySelectorAll('.PMCEXcorrectInput')
    for (let e of v){
        let cv = e.getAttribute('PMCEXcorrectValue');
        if (cv) simulateTyping(e, cv);
        };

    // Locate and select the passing radio options
    const r = document.querySelectorAll('.PMCEXcorrectRadio');
    for (let e of r){
        // Sending events to the element bypasses the need to enter valid "Custom Data" checks.
        e.dispatchEvent(new PointerEvent('click', { bubbles: true }));
        e.dispatchEvent(new Event('change', { bubbles: true }));
        e.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    };

}
checksheetPopupWrapper();