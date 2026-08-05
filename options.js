import { loadSettings, saveSettings, addLazyRule, removeLazyRule} from "./config.js"
import { SETTINGS } from "./settings-schema.js";
document.addEventListener("DOMContentLoaded", function () {

    function renderSettings() {
        const container = document.getElementById("settingsContainer");
        
        SETTINGS.forEach(setting => {
            const wrapper = document.createElement("label");
            
            //TODO 
            // - add all types
            // - set up the full HTML structure for each element
            // - add text label to schema
            // - class to schema
            // - add group to schema
            if (setting.type === "checkbox") {
                wrapper.innerHTML = `
                    <input type="checkbox" id="${setting.key}">
                    ${setting.label}
                `;
            }

            if (setting.type === "text") {
                wrapper.innerHTML = `
                    ${setting.label}
                    <input type="text" id="${setting.key}">
                `;
            }

            container.appendChild(wrapper);
        });
    }
    // renderSettings()
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
    loadSettings((settings) => {

        SETTINGS.forEach(setting => {

            const element = document.getElementById(setting.key);
            if (!element) return;

            switch (setting.type) {
                case "checkbox":
                    element.checked = settings[setting.key];
                    break;
                case "text":
                case "textarea":
                    element.value = settings[setting.key];
                    break;
                case "select":
                    element.selectedIndex = settings[setting.key];
                    break;
            }
        });
        SETTINGS.forEach(setting => {
            if (!setting.dependsOn) return;

            const parent = document.getElementById(setting.dependsOn);
            const child = document.getElementById(setting.key);

            child.disabled = !parent.checked;
            parent.addEventListener("change", () => {
                child.disabled = !parent.checked;
            });
        });
    });

    function collectSettings() {
        const result = {};
        SETTINGS.forEach(setting => {
            const element = document.getElementById(setting.key);
            if (!element) return;

            switch (setting.type) {
                case "checkbox":
                    result[setting.key] = element.checked;
                    break;
                case "text":
                case "textarea":
                    result[setting.key] = element.value;
                    break;
                case "select":
                    result[setting.key] = element.selectedIndex;
                    break;
            }
        });
        return result;
    }
    
    // Save settings
    saveButton.addEventListener("click", function () {
        if (vBoolUxLazyLoading.checked){
            addLazyRule()
        } else {
            removeLazyRule()
        }
        saveSettings(collectSettings(), () =>
        {
            const statusMessage = document.getElementById("statusMessage");
            statusMessage.textContent = "Settings saved!";
            setTimeout(() => { statusMessage.textContent = ""; }, 2000);
        });
    });
});
