import { loadSettings, saveSettings} from "./config.js"
document.addEventListener("DOMContentLoaded", function () {
    const vBoolUxTruckBannerFix = document.getElementById("vBoolUxTruckBannerFix");
    const saveButton = document.getElementById("saveButton");

    // Dunamically sets the tooltip bounds to keep them within the window
    function tooltipText(){
        document.querySelectorAll(".tooltip").forEach(tooltip => {
            tooltip.addEventListener("mouseenter", () => {
                const tooltipText = tooltip.querySelector(".tooltiptext");
                const rect = tooltipText.getBoundingClientRect();
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
        
                // Shift left if tooltip goes beyond the right edge
                if (rect.right > windowWidth) {
                    tooltipText.style.left = "auto";
                    tooltipText.style.right = "0";
                    tooltipText.style.transform = "none";
                }
        
                // Shift right if tooltip goes beyond the left edge
                if (rect.left < 0) {
                    tooltipText.style.left = "0";
                    tooltipText.style.right = "auto";
                    tooltipText.style.transform = "none";
                }
        
                // Shift below if too close to top
                if (rect.top < 0) {
                    tooltipText.style.bottom = "auto";
                    tooltipText.style.top = "100%";
                }
            });
        });
    }
    tooltipText()

    // Load saved settings
    loadSettings((settings) =>{
        vBoolUxTruckBannerFix.checked = settings.vBoolUxTruckBannerFix;
    });

    // Save settings
    saveButton.addEventListener("click", function () {
        saveSettings({
            vBoolUxTruckBannerFix: vBoolUxTruckBannerFix.checked,
        }, () =>
        {
            const statusMessage = document.getElementById("statusMessage");
            statusMessage.textContent = "Settings saved!";
            setTimeout(() => { statusMessage.textContent = ""; }, 2000);
        });
    });
});
