function uxCreateButton(id,name,link=null,title=null,newTab=false,notificationText=null){
    let plexBase = window.location.origin;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('__asid');
    let x = document.getElementsByClassName('plex-actions');
    let t = x[0];
    let z = document.createElement ('li');
    let a = document.createElement ('a');
    a.setAttribute('data-bind',"id: $data.id, href: $data.href, css: { 'disabled': !$data.isEnabled() }")
    a.id = id
    a.style = "user-select: auto;"
    a.innerText = name
    if(link !== null){
        let url = new URL(`${plexBase}${link}`)
        url.searchParams.append('__asid', token)
        a.href = url
        if (newTab){
            a.target= '_blank';
        }
    }
    if(title !== null){
        a.title = title
    }
    if(notificationText !== null){
        a.notificationText = notificationText
    }
    t.appendChild(z);
    z.appendChild(a);
}

function uxCreateButtonPopup(parentId,id,name,link=null,title=null,newTab=false,notificationText=null){
    let plexBase = window.location.origin;
    let t = document.querySelector(`#${parentId} .plex-actions`);
    let z = document.createElement ('li');
    // "<!-- ko template: { name: $data.clientViewName, data: $data } -->"
    // z.setAttribute('data-bind',"title: $data.title, click: $data.executeAction, css: { 'disabled': !$data.isEnabled() }, visible: $data.visible()")
    let a = document.createElement ('a');
    a.setAttribute('data-bind',"id: $data.id, href: $data.href")
    a.id = id
    a.style = "user-select: auto;"
    a.innerText = name
    if(link !== null){
        a.href = `${plexBase}${link}`
        if (newTab){
            a.target= '_blank';
        }
    }
    if(title !== null){
        a.title = title
    }
    if(notificationText !== null){
        a.notificationText = notificationText
    }
    t.insertBefore(z,t.lastChild);
    // t.appendChild(z);
    z.appendChild(a);
}
function uxCreateButtonFooterPopup(parentId,id,name){
    let plexBase = window.location.origin;
    let t = document.querySelector(`${parentId} .plex-form-buttons`);
    let z = document.createElement ('button');
    // z.setAttribute('data-bind',`id: $root.elements['#${id}'].id, href: 'javascript:void(0);'`)
    z.id = id
    z.style = "user-select: auto;"
    z.innerText = name
    z.href = "javascript:void(0);"
    z.setAttribute("class", "btn btn-sm default-action")
    // z.class = "btn btn-sm default-action"
    z.type = 'button'
    t.insertBefore(z,t.lastChild);
}
async function readStorage(key){
    const result = await chrome.storage.local.get(key);
    return result[key]
}


async function scriptInject(scriptPath){
    const copyText = new Object();
    await readStorage('copied').then(val => {
        console.log(`variable copied: ${val}`)
        copyText.pasteText = val
    })
    await readStorage('copiedPCNs').then(val => {
        console.log(`variable copiedPCNs: ${val}`)
        copyText.pasteTextPCN = val
    })
    console.log(`utils.js - copyText.pasteText variable: ${copyText.pasteText}`)
    console.log(`utils.js - copyText.pasteTextPCN variable: ${copyText.pasteTextPCN}`)
    let s = document.createElement('script');
    s.dataset.params = JSON.stringify({pasted:copyText.pasteText,pastedPCN:copyText.pasteTextPCN});
    s.src = chrome.runtime.getURL(scriptPath);
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}

function classicCreateButton(type,anchorClass,id,name,title=null,touchscreen=false){
    let x = document.getElementsByClassName(anchorClass);
    let t = x[0];
    if(type =='UL'){
        var z = document.createElement('ul');
        z.setAttribute('id',id);
        z.setAttribute ('class', 'green button');
        z.title = title || name;
        let l = document.createElement('li');
        l.setAttribute ('class', 'l');
        z.appendChild(l);
        let s = document.createElement('span');
        s.innerText = name;
        l = document.createElement('li');
        l.setAttribute ('class', 'c');
        l.appendChild(s);
        z.appendChild(l);
        l = document.createElement('li');
        l.setAttribute ('class', 'r');
        z.appendChild(l);
    }
    else if(type == 'DIV'){
        var z = document.createElement ('div');
        z.id = id;
        z.setAttribute('class','ToolbarButton')
        z.title = title || name;
        let a = document.createElement ('a');
        a.setAttribute('class',"Button UpdateButton")
        if (touchscreen){
            a.classList.add('Touchscreen');
        }
        let s = document.createElement ('span');
        s.innerText = name;
        a.appendChild(s);
        z.appendChild(a);
    }
    t.appendChild(z);
    z.insertAdjacentHTML('afterend',"&nbsp;");
    
}

function sortTable(e) {
    // TODO - 1/10/2024 - add toggling for visibility to the indicator element when sorting.
    // Need to also remove visibility to any of the other TH inidcator elements when clicked.
    // Alternatively, figure out how to implement the Plex sorting for the grid. All the elements appear to be present, but the table is not sortable.
    e.currentTarget.toggleAttribute('sorted')
    var tbody = $(e.currentTarget).closest('table').find('tbody'),
        sortIndex = e.currentTarget.cellIndex;

    tbody.find('tr').sort(function(a, b) {
        if (e.currentTarget.hasAttribute('sorted')) {
            $(e.currentTarget).find('.plex-direction-indicator')[0].classList.add('asc')
            $(e.currentTarget).find('.plex-direction-indicator')[0].classList.remove('desc')
            return $(`td:eq(${sortIndex})`, a).text().localeCompare($(`td:eq(${sortIndex})`, b).text());
            
        } else {
            $(e.currentTarget).find('.plex-direction-indicator')[0].classList.add('desc')
            $(e.currentTarget).find('.plex-direction-indicator')[0].classList.remove('asc')
            return $(`td:eq(${sortIndex})`, b).text().localeCompare($(`td:eq(${sortIndex})`, a).text());
        }
    }).appendTo(tbody);
    tbody.find('tr:even').removeClass('plex-grid-row-odd').addClass('plex-grid-row-even');
    tbody.find('tr:odd').removeClass('plex-grid-row-even').addClass('plex-grid-row-odd');
}