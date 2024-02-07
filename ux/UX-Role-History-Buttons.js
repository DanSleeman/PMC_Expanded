scriptInject('util/utils.js')
scriptInject('ux/src/UX-Role-History-Buttons-Script.js')

window.addEventListener('message',function(event){
    if (event.source != window) return;
    switch(event.data.type){
        case "copyRoles":
            copyRoles()
            break;
    }
})

function copyRoles(){
    var a = [];
    var status;
    $('tbody > tr').each(
        function(){
            status = $(this).find('td').eq(1).text();
            if (status == 'Remove'){
                a.push($(this).find('td').eq(2).text())
            }
        })
    chrome.storage.local.set({roles:a},function(){
            console.log('Value is set to '+ a);
        });
    }