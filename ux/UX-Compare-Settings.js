(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxCompareSettings){
            const settingsManagerGlossary = settings.vStrSettingsManagerGlossary

            window.addEventListener('load', () => {
                const plexBase = window.location.origin;
                const urlParams = new URLSearchParams(window.location.search);
                const token = urlParams.get('__asid');
                function getElementByXpath(path) {
                    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    }
                const XPathSearch = `//span[text()='${settingsManagerGlossary}']`

                y = getElementByXpath(XPathSearch)
                if (y){
                    const link = '/Platform/SettingsCompare/Index?'
                    let url = new URL(`${plexBase}${link}`)
                    url.searchParams.append('__asid', token)
                    y = y.parentNode.parentNode;
                    t = y.parentNode

                    const listItem = document.createElement('li');
                    listItem.setAttribute ('class', 'clearfix');
                    listItem.setAttribute ('style', 'user-select: auto;');

                    const anchor = document.createElement('a');
                    anchor.id = 'compareSettings';
                    anchor.href = url
                    anchor.setAttribute ('style', 'user-select: auto;');
                    anchor.setAttribute('data-bind', 'click: $parents[1].navigate, href: $data.action.address, clickBubble: false');

                    const spanText = document.createElement('span');
                    spanText.classList.add('pull-left');
                    spanText.style.userSelect = 'auto';
                    spanText.setAttribute('data-bind', 'text: text');
                    spanText.textContent = 'Compare Settings';
                    
                    const spanHotKey = document.createElement('span');
                    spanHotKey.classList.add('plex-favorite-accelerator', 'pull-right');
                    spanHotKey.style.display = 'none';
                    spanHotKey.style.userSelect = 'auto';
                    spanHotKey.setAttribute('data-bind', 'visible: $data.hotKey, text: $data.hotKey');

                    anchor.appendChild(spanText);
                    anchor.appendChild(spanHotKey);
                    listItem.appendChild(anchor);
                    t.insertBefore(listItem, y.nextSibling);
                }
            });
        }
    })
})();