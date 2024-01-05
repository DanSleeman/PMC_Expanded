function uxCreateButton(id,name,link=null,title=null,newTab=false){
    let plexBase = window.location.origin;
    let x = document.getElementsByClassName('plex-actions');
    let t = x[0];
    let z = document.createElement ('li');
    let a = document.createElement ('a');
    a.setAttribute('data-bind',"id: $data.id, href: $data.href, css: { 'disabled': !$data.isEnabled() }")
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
    t.appendChild(z);
    z.appendChild(a);
}
function scriptInject(scriptPath){
    let s = document.createElement('script');
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
