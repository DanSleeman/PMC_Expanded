scriptInject('util/utils.js')
scriptInject('ux/src/UX-Role-History-Buttons-Script.js')

window.addEventListener('message',function(event){
    if (event.source != window) return;
    switch(event.data.type){
        case "copyRolesRem":
            copyRoles('Remove')
            break;
        case "copyRolesAdd":
            copyRoles('Add')
            break;
        case "uxRolesFilter":
            filterUX()
            break;
        case "classicRolesFilter":
            filterClassic()
            break;
    }
})

function copyRoles(roleStatus){ //
    var a = [];
    var status;
    $('tbody > tr').each(
        function(){
            status = $(this).find('td').eq(1).text();
            if (status == roleStatus){
                a.push($(this).find('td').eq(2).text())
            }
        })
    chrome.storage.local.set({roles:a},function(){
            console.log('Value is set to '+ a);
        });
    var u = $('tbody > tr > td')[0].children[0].textContent
    chrome.storage.local.set({copied:u},function(){
            console.log('Value copied from '+ u);
        });
    }
function filterUX(){
    var role;
    $('tbody > tr').each(
        function(){
            role = $(this).find('td').eq(2).text();
            if (!role.startsWith('UX')){
                this.style = 'display: none;'
            }
            else{
                this.removeAttribute('style')
            }
        })
}
function filterClassic(){
    var role;
    $('tbody > tr').each(
        function(){
            role = $(this).find('td').eq(2).text();
            if (role.startsWith('UX')){
                this.style = 'display: none;'
            }
            else{
                this.removeAttribute('style')
            }
        })
}