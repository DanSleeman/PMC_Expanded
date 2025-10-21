// Original code from Cumulus extension
// let windowName = localStorage.getItem("WindowName");
// (window.name = windowName || window.name)
//   c$(function () {
//     c$.settings.Ready(function () {
//       1 == c$.settings.GetValue("PreventLoginPopup") &&
//         (window.name = "POLPOLMAINKIOSK");
//     });
//   });

(async () => {
  const windowName = localStorage.getItem("WindowName");
  window.name = windowName || window.name;
  const module = await import(chrome.runtime.getURL("config.js"));
  module.loadSettings((settings) => {
    if (settings.vBoolClassicPreventLoginPopup) {
      window.name = "POLPOLMAINKIOSK";
    }
  });
})();