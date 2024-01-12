const favoritesDropDown = '#ViewManageFavoritesDialog_Platform select'
const allFKeys = ['F1','F2','F3','F4','F6','F7','F8','F9','F10','F11','F12'];
function favoriteWrapper(){
    const tag = '[Plex EX Favorite F-Key Unlocker]';
    
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    let appObserver = null;
    const favoritesPane = '#ViewManageFavoritesDialog_Platform';
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
          favoritesCheck();
        });
        if (document.querySelector(appName) === null) return;
        appObserver.observe(document.querySelector(appName), {
          childList: true,
          subtree: true,
          attributes: true
        });
      }

      function favoritesCheck(){
        if (document.querySelector(favoritesPane) === null) return;
        if (document.querySelectorAll(favoritesDropDown).length === 0) return;
        if (document.querySelectorAll(favoritesDropDown)[1].children.length === 0) return
        if (document.querySelectorAll(favoritesDropDown)[1].children.length === allFKeys.length + 1) return;
        favoritesUnlock();
      }
      observeApp();
      favoritesCheck();
}

function favoritesUnlock(){
    var fKeySelector = document.querySelectorAll(favoritesDropDown)[1];
    var fKeyOptions = fKeySelector.children;
    for (i = fKeyOptions.length - 1;i>=0;i--){
        let f = fKeyOptions[i].value;
        if (f){
            fKeyOptions[i].remove();
        }
    }
    for (i = 0;i<allFKeys.length;i++){
        let z = document.createElement('option');
        z.value = allFKeys[i];
        z.innerText = allFKeys[i];
        fKeySelector.appendChild(z);
    }
}
favoriteWrapper();