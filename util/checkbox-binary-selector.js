(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolUxLazyLoading && settings.vBoolUxSelectHalfCheckboxes){


            function getCheckboxes(settings){
                const gridCheckboxes = Array.from(document.querySelectorAll("tr[class*='plex-grid-row'] input[type='checkbox']"));
                const standardCheckboxes = Array.from(document.querySelectorAll("div[class*='plex-control-group'] input[type='checkbox']"));
                const strategies = {
                    0: () => gridCheckboxes.length > 0  ? gridCheckboxes : standardCheckboxes, // Prioritize only grid checkboxes; fallback to standard
                    1: () => standardCheckboxes.length > 0  ? standardCheckboxes : gridCheckboxes, // Prioritize only standard checkboxes; fallback to grid
                    2: () => [...standardCheckboxes, ...gridCheckboxes] // Combine both sets of checkboxes
                };
                const strategy = strategies[settings.vOptUxSelectHalfCheckboxesType];
                return strategy ? strategy() : [];
            }
            function binarySettingsToggleHalf(){
                chrome.storage.local.get('firstHalfActive', (result) => {
                    console.log(result)
                    let firstHalfActive  = result.firstHalfActive !== false;

                    const checkboxes = getCheckboxes(settings)
                    const halfLength = Math.floor(checkboxes.length / 2);
                    const firstHalf = checkboxes.slice(0, halfLength);
                    const secondHalf = checkboxes.slice(halfLength);
                    
                    const targetChecked = firstHalfActive;
                    console.log(`First half: ${firstHalf.length} Second half: ${secondHalf.length}`)

                    firstHalf.forEach(checkbox => {
                        checkbox.checked = targetChecked;
                        checkbox.dispatchEvent(new PointerEvent('click', { bubbles: true, composed: true }));
                    });
                    secondHalf.forEach(checkbox => {
                        checkbox.checked = !targetChecked;
                        checkbox.dispatchEvent(new PointerEvent('click', { bubbles: true, composed: true }));
                    });

                    chrome.storage.local.set({ firstHalfActive: !firstHalfActive});
                }
                )
            }

            chrome.runtime.onMessage.addListener((request) => {
            if (request.action === 'selectHalf') {
                console.log('request received, checking half of checkboxes')
                binarySettingsToggleHalf();
            }
            });
        }
    });
})();