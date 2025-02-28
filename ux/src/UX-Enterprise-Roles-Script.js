const roleButton = 'enterpriseRoleCopy'
const popupId = 'enterpriseRolesDialog'
const dataSettings = document.currentScript.getAttribute('data-settings')
const settings = JSON.parse(dataSettings);
const enterprisePCNsString = settings.vListEnterprisePCNs
const enterprisePCNs = (enterprisePCNsString || "").split(",").map(item => item.trim());
var emptyList = false
var allPCNs = false
if (enterprisePCNs.length === 1 && enterprisePCNs[0] === "") emptyList = true;
if (enterprisePCNs.length === 1 && enterprisePCNs[0] === "_ALL_") allPCNs = true;

function favoriteWrapper(){
    const tag = '[PMC Expanded Enterprise Role Security Setup]';
    
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    let appObserver = null;
    const rolePane = `#${popupId}`;
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
          rolesCheck();
        });
        if (document.querySelector(appName) === null) return;
        appObserver.observe(document.querySelector(appName), {
          childList: true,
          subtree: true,
          attributes: true
        });
      }

      function rolesCheck(){
        if (document.querySelector(rolePane) === null) return;
        if (document.querySelector(`#${roleButton}`)) return;
        function checkForFunction(){
            if (typeof window.uxCreateButtonPopup === 'function'){
                roleButtonCreate();
            } else {
                requestAnimationFrame(checkForFunction);
            }
        }
        checkForFunction();
      }
      observeApp();
      rolesCheck();


function roleEnterprise(){
    if (emptyList) return;
    var roleTableRows = document.querySelectorAll(`div[id='${popupId}'] tbody tr`);
    var header = document.querySelector('h3').textContent;
    var reg = /- (.+) \(/
    var found = header.match(reg);
    var roleName = found[1]
    debug(`Role Name: ${roleName}`)
    roleTableRows.forEach(function(el, key){
        var newRoleBox
        var currentValue
        var n = el.children[0].textContent
        var pcn = String(ko.dataFor(el).config.data[key].PlexusCustomerNo)
        if (enterprisePCNs.includes(n) || enterprisePCNs.includes(pcn) || allPCNs){
            currentValue = el.children[1].querySelector('.plex-picker-selected-items')
            if (currentValue){
                return
            }
            else {
                newRoleBox = el.children[2].querySelector('input')
                newRoleBox.value = roleName
                ko.dataFor(newRoleBox).data.NewRoleName = roleName
            }
            newRoleBox.focus()
            newRoleBox.blur()
        }
    })
}

function roleButtonCreate(){
    uxCreateButtonPopup(popupId,roleButton,'Set New Roles')
    document.getElementById (roleButton).addEventListener (
        "mouseup", roleEnterprise, false
        );
}
}
favoriteWrapper();
