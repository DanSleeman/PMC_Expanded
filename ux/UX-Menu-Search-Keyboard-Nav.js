(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxMenuSearchKeyboard){
            let resultIndex = -1;
            document.addEventListener('keyup', (e) => {
                let x = document.getElementsByClassName('plex-search-menu plex-navbar-panel');
                try {
                    if (!x[0].classList.contains('active')) return;
                    let y = document.getElementsByClassName('plex-search-menu-method');
                    let z = [];
                    for (let i = 0; i < y.length; i++) {
                        let subList = y[i].childNodes[1].childNodes;
                        for (let j = 0; j < subList.length; j++) {
                            z.push(subList[j]);
                        }
                    }
                    let upperLimit = z.length - 1;
                    if (e.code === "ArrowUp") {
                        resultIndex -= 1;
                        if (resultIndex < 0) resultIndex = 0;
                        z[resultIndex]?.childNodes[0]?.focus({ focusVisible: true });
                    } 
                    else if (e.code === "ArrowDown") {
                        resultIndex += 1;
                        if (resultIndex > upperLimit) resultIndex = upperLimit;
                        z[resultIndex]?.childNodes[0]?.focus({ focusVisible: true });
                    }
                } catch (error) {
                    console.error("Error navigating search results:", error);
                }
            });
        }
    });
})();