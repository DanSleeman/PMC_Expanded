const roleButton = 'enterpriseRoleCopy'
const popupId = 'enterpriseRolesDialog'
const pgradPCNs = [
    "PGrad - NA2",
    "PGrad - NA3",
    "PGrad -Grand Haven"
]
const enterprisePCNs = [
    "广州顺普汽车零部件有限公司",
    "顺普汽车零部件（昆山）有限公司",
    //"Light Corporation",
    "Meta Tool Technologies",
    //"Net Shape Engineering",
    //"Net Shape International, LLC.",
    "NetShape Michigan",
    "NetShape Alabama",
    "NetShape Mexico",
    "Pliant Plastics",
    "Shape - Aluminum",
    //"Shape - Shape Receivables",
    "Shape Corp CST",
    "Shape Corp Czech Republic s.r.o.",
    "SHAPE CORP MEXICO, S. de R.L. de C.V.",
    //"SHAPE CORP MEXICO, S. de R.L. de C.V. MST",
    //"Shape Corp. (Test PCN)",
    //"Shape Corp. - HEMSAP, S. de R.L. de C.V.",
    //"Shape Corp. U.K. Limited",
    //"Shape France",
    "Shape Germany",
    "Shape Japan",
    //"Shape Japan - old",
    //"Shape NetShape Mexico S. de R.L. de C.V.",
    //"Shape Staffing, LLC",
    "Shape/NetShape Korea"
];
function favoriteWrapper(){
    const tag = '[Plex EX Enterprise Role Security Setup]';
    
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
        // debug('checking for roles pane')
        if (document.querySelector(rolePane) === null) return;
        // debug('roles pane found, checking if button exists')
        if (document.querySelector(`#${roleButton}`)) return;
        // debug('button does not exist')
        function checkForFunction(){
            if (typeof window.uxCreateButtonPopup === 'function'){
                // debug('function is available. creating button')
                roleButtonCreate();
            } else {
                // debug('function unavailable, waiting and checking again')
                requestAnimationFrame(checkForFunction);
            }
        }
        checkForFunction();
      }
      observeApp();
      rolesCheck();


function roleEnterprise(){
    var roleTableRows = document.querySelectorAll(`div[id='${popupId}'] tbody tr`);
    var header = document.querySelector('h3').textContent;
    var reg = /- (UX.+) \(/
    var found = header.match(reg);
    var roleName = found[1]
    debug(`Role Name: ${roleName}`)
    roleTableRows.forEach(function(el){
        var newRoleBox
        var currentValue
        var existingRole
        var n = el.children[0].textContent
        if (enterprisePCNs.includes(n)){
            currentValue = el.children[1].querySelector('.plex-picker-selected-items')
            if (currentValue){
                return
            }
            if (pgradPCNs.includes(n)){
                newRoleBox = el.children[1].querySelector('input')
                newRoleBox.value = roleName
            }
            else {
                newRoleBox = el.children[2].querySelector('input')
                newRoleBox.value = roleName
                ko.dataFor(newRoleBox).data.NewRoleName = roleName
            }
            // newRoleBox = el.children[1].querySelector('input')
            // newRoleBox.value = roleName
            newRoleBox.focus()
            newRoleBox.blur()
            // var noResults = document.querySelector(".plex-picker-modal.plex-dialog.modal.fade.in")
            // if (noResults){
            //     let popupText = noResults.querySelector(".plex-empty-message")
            //     if (popupText){
            //         noResults.querySelector("a").click()
            //     }
            //     existingRole = false
            // }
            // else {
            //     existingRole = true
            // }
            // if (!existingRole){
            //     newRoleBox = el.children[2].querySelector('input')
            //     newRoleBox.value = roleName
            //     ko.dataFor(newRoleBox).data.NewRoleName = roleName
            // }
        }
    })
}

function roleButtonCreate(){
    uxCreateButtonPopup(popupId,roleButton,'Set Roles')
    document.getElementById (roleButton).addEventListener (
        "mouseup", roleEnterprise, false
        );
}
}
favoriteWrapper();

// function checkForFunction(){
//     if (typeof window.uxCreateButton === 'function'){
//         roleButtonCreate();
//     } else {
//         requestAnimationFrame(checkForFunction);
//     }
// }

// checkForFunction();