(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxRoleRevHistory){
            const securityManagerGlossary = settings.vStrSecurityManagerGlossary

            window.onload = function(){
            function getElementByXpath(path) {
                return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }
            const XPathSearch = `//span[text()='${securityManagerGlossary}']`

            y = getElementByXpath(XPathSearch)
            if (y){
                y = y.parentNode.parentNode;
                t = y.parentNode
                var xNode       = document.createElement ('li');
                xNode.innerHTML = '<a data-bind="click: $parents[1].navigate, href: $data.action.address, clickBubble: false" id="roleRevisionHistory" href="/VisionPlex/Screen?__actionKey=8086" "style="user-select: auto;"><span class="pull-left" data-bind="text: text" style="user-select: auto;">Role Revision History</span><span class="plex-favorite-accelerator pull-right" data-bind="  visible: $data.hotKey, text: $data.hotKey" style="display: none; user-select: auto;"></span></a>';
                xNode.setAttribute ('class', 'clearfix');
                xNode.setAttribute ('style', 'user-select: auto;');

                t.insertBefore(xNode, y);
                }
            }

}
});
})();