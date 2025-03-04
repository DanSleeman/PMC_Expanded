(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxCompareSettings){
            const settingsManagerGlossary = settings.vStrSettingsManagerGlossary

//Wrap everything in an onload function in order to get around errors of not finding the elements
window.onload = function(){
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
const XPathSearch = `//span[text()='${settingsManagerGlossary}']`

y = getElementByXpath(XPathSearch)
// Sometimes the function fails to find an element.
// I've tried searching with document.getElementsByTagName('span') and iterating through them all to find it, but had the same behavior.
// The button isn't critical, so I'm just adding the check for non-null before adding it to stop errors.
if (y){
    y = y.parentNode.parentNode;
    t = y.parentNode
    var xNode       = document.createElement ('li');
    xNode.innerHTML = '<a data-bind="click: $parents[1].navigate, href: $data.action.address, clickBubble: false" id="compareSettings" href="/Platform/SettingsCompare/Index?" "style="user-select: auto;"><span class="pull-left" data-bind="text: text" style="user-select: auto;">Compare Settings</span><span class="plex-favorite-accelerator pull-right" data-bind="  visible: $data.hotKey, text: $data.hotKey" style="display: none; user-select: auto;"></span></a>';
    xNode.setAttribute ('class', 'clearfix');
    xNode.setAttribute ('style', 'user-select: auto;');

    t.insertBefore(xNode, y.nextSibling);
    }
}

}
});
})();