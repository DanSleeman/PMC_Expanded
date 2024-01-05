function copyRoles(){
    var a = []
    $('input[type="checkbox"][name="AssignedToRole"]').each(
        function(){
            if(this.checked){
                a.push(this.parentElement.parentElement.nextElementSibling.nextElementSibling.innerText.trim())
                
            }})
    chrome.storage.local.set({roles:a},function(){
            console.log('Value is set to '+ a);
        });
    }

function pasteRoles(){
    chrome.storage.local.get(['roles'],function(result){
        console.log('Value currently is '+ result.roles);
    var b = result.roles
    $('input[type="checkbox"][name="AssignedToRole"]').each(
        function(){
            let y = this.parentElement.parentElement.nextElementSibling.nextElementSibling.innerText.trim()
            if (b.includes(y) && !this.checked){
                this.click()
            }
        }
    )
    })
}

function allAdmin(){
    $('input[type="checkbox"][name="AdminToRole"]').each(
        function(){
            if (!this.checked){
                this.click()
            }
        }
    )
}

uxCreateButton('copyRoles','Copy Roles')
uxCreateButton('pasteRoles','Paste Roles')
uxCreateButton('allAdmin','Select All Admin')

document.getElementById ("copyRoles").addEventListener (
    "mouseup", copyRoles, false
    );
document.getElementById ("pasteRoles").addEventListener (
    "mouseup", pasteRoles, false
    );
document.getElementById ("allAdmin").addEventListener (
    "mouseup", allAdmin, false
    );
