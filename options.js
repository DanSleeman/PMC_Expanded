import { loadSettings, saveSettings, addLazyRule, removeLazyRule} from "./config.js"
document.addEventListener("DOMContentLoaded", function () {
    const vBoolUxChecklistEditLink = document.getElementById("vBoolUxChecklistEditLink");
    const vBoolUxChecksheetFillButton = document.getElementById("vBoolUxChecksheetFillButton");
    const vBoolUxCompareSettings = document.getElementById("vBoolUxCompareSettings");
    const vBoolUxEDILogButtons = document.getElementById("vBoolUxEDILogButtons");
    const vBoolUxFavoritesUnlock = document.getElementById("vBoolUxFavoritesUnlock");
    const vBoolUxEmployeeSwapNames = document.getElementById("vBoolUxEmployeeSwapNames");
    const vBoolUxSQLF5Execute = document.getElementById("vBoolUxSQLF5Execute");
    const vBoolUxLabelDesignerButtons = document.getElementById("vBoolUxLabelDesignerButtons");
    const vBoolUxFilterPinEnforce = document.getElementById("vBoolUxFilterPinEnforce");
    const vBoolUxProjectManagementChecklistLink = document.getElementById("vBoolUxProjectManagementChecklistLink");
    const vBoolUxLazyLoading = document.getElementById("vBoolUxLazyLoading");
    const vBoolUxExportAnywhere = document.getElementById("vBoolUxExportAnywhere");
    const vBoolUxSecurityActionKeys = document.getElementById("vBoolUxSecurityActionKeys");
    const vBoolUxRoleRevisionHistory = document.getElementById("vBoolUxRoleRevisionHistory");
    const vBoolUxRoleManagerActionKeys = document.getElementById("vBoolUxRoleManagerActionKeys");
    const vBoolUxPosRoleAssocRearrangeColumns = document.getElementById("vBoolUxPosRoleAssocRearrangeColumns");
    
    const vBoolUxPosRoleAssocCopyPasteButtons = document.getElementById("vBoolUxPosRoleAssocCopyPasteButtons");
    const vBoolUxUserManagerCopyPasteButtons = document.getElementById("vBoolUxUserManagerCopyPasteButtons");
    const vBoolUxSelectAllAdmin = document.getElementById("vBoolUxSelectAllAdmin");
    const vBoolUxCustAccessCopyPasteButtons = document.getElementById("vBoolUxCustAccessCopyPasteButtons");
    const vBoolUxCustAccessTogglePCNs = document.getElementById("vBoolUxCustAccessTogglePCNs");
    const vBoolUxSavePopupCsv = document.getElementById("vBoolUxSavePopupCsv");
    const vBoolClassicCalendarMassUpdate = document.getElementById("vBoolClassicCalendarMassUpdate");
    const vBoolClassicChecklistEditLinks = document.getElementById("vBoolClassicChecklistEditLinks");
    const vBoolClassicChecksheetPopulate = document.getElementById("vBoolClassicChecksheetPopulate");
    const vBoolClassicCustomerPOButtons = document.getElementById("vBoolClassicCustomerPOButtons");
    const vBoolClassicEDILogButtons = document.getElementById("vBoolClassicEDILogButtons");
    const vBoolClassicEscapeOverride = document.getElementById("vBoolClassicEscapeOverride");
    const vBoolClassicLabelDesignerButtons = document.getElementById("vBoolClassicLabelDesignerButtons");
    const vBoolClassicLabelDesignerLinks = document.getElementById("vBoolClassicLabelDesignerLinks");
    const vBoolClassicRenaultDelforButton = document.getElementById("vBoolClassicRenaultDelforButton");
    const vBoolClassicUserManagerCopy = document.getElementById("vBoolClassicUserManagerCopy");
    const vBoolClassicUserManagerSelectAllAdmin = document.getElementById("vBoolClassicUserManagerSelectAllAdmin");
    const vBoolClassicUserManagerPasteClassic = document.getElementById("vBoolClassicUserManagerPasteClassic");
    const vBoolClassicUserManagerPasteUX = document.getElementById("vBoolClassicUserManagerPasteUX");
    const vStrClassicUserManagerExcludeText = document.getElementById("vStrClassicUserManagerExcludeText");
    const vStrClassicUserManagerUXRolePrefix = document.getElementById("vStrClassicUserManagerUXRolePrefix");
    const vBoolClassicVPTabIndexFix = document.getElementById("vBoolClassicVPTabIndexFix");
    const vBoolClassicPosRoleAssocCopyPaste = document.getElementById("vBoolClassicPosRoleAssocCopyPaste");
    const saveButton = document.getElementById("saveButton");

    // Function to update dependencies
    function updateDependencies() {
        const isvBoolUxLazyLoadingEnabled = vBoolUxLazyLoading.checked;
        vBoolUxExportAnywhere.disabled = !isvBoolUxLazyLoadingEnabled;
        vBoolUxSecurityActionKeys.disabled = !isvBoolUxLazyLoadingEnabled;
        vBoolUxRoleRevisionHistory.disabled = !isvBoolUxLazyLoadingEnabled;
        vBoolUxRoleManagerActionKeys.disabled = !isvBoolUxLazyLoadingEnabled;
        vBoolUxPosRoleAssocRearrangeColumns.disabled = !isvBoolUxLazyLoadingEnabled;
        vBoolUxPosRoleAssocCopyPasteButtons.disabled = !isvBoolUxLazyLoadingEnabled;
        vBoolUxUserManagerCopyPasteButtons.disabled = !isvBoolUxLazyLoadingEnabled;
        vBoolUxSelectAllAdmin.disabled = !isvBoolUxLazyLoadingEnabled;
        vBoolUxSavePopupCsv.disabled = !isvBoolUxLazyLoadingEnabled;
    }
    // Load saved settings
    loadSettings((settings) =>{
        vBoolUxChecklistEditLink.checked = settings.vBoolUxChecklistEditLink;
        vBoolUxChecksheetFillButton.checked = settings.vBoolUxChecksheetFillButton;
        vBoolUxCompareSettings.checked = settings.vBoolUxCompareSettings;
        vBoolUxEDILogButtons.checked = settings.vBoolUxEDILogButtons;
        vBoolUxFavoritesUnlock.checked = settings.vBoolUxFavoritesUnlock;
        vBoolUxSQLF5Execute.checked = settings.vBoolUxSQLF5Execute;
        vBoolUxLabelDesignerButtons.checked = settings.vBoolUxLabelDesignerButtons;
        vBoolUxFilterPinEnforce.checked = settings.vBoolUxFilterPinEnforce;
        vBoolUxProjectManagementChecklistLink.checked = settings.vBoolUxProjectManagementChecklistLink;
        vBoolUxLazyLoading.checked = settings.vBoolUxLazyLoading;
        vBoolUxExportAnywhere.checked = settings.vBoolUxExportAnywhere;
        vBoolUxSecurityActionKeys.checked = settings.vBoolUxSecurityActionKeys;
        vBoolUxRoleRevisionHistory.checked = settings.vBoolUxRoleRevisionHistory;
        vBoolUxRoleManagerActionKeys.checked = settings.vBoolUxRoleManagerActionKeys;
        vBoolUxPosRoleAssocRearrangeColumns.checked = settings.vBoolUxPosRoleAssocRearrangeColumns;
        vBoolUxEmployeeSwapNames.checked = settings.vBoolUxEmployeeSwapNames;
        vBoolUxPosRoleAssocCopyPasteButtons.checked = settings.vBoolUxPosRoleAssocCopyPasteButtons;
        vBoolUxUserManagerCopyPasteButtons.checked = settings.vBoolUxUserManagerCopyPasteButtons;
        vBoolUxSelectAllAdmin.checked = settings.vBoolUxSelectAllAdmin;
        vBoolUxCustAccessCopyPasteButtons.checked = settings.vBoolUxCustAccessCopyPasteButtons;
        vBoolUxCustAccessTogglePCNs.checked = settings.vBoolUxCustAccessTogglePCNs;
        vBoolUxSavePopupCsv.checked = settings.vBoolUxSavePopupCsv;

        vBoolClassicCalendarMassUpdate.checked = settings.vBoolClassicCalendarMassUpdate;
        vBoolClassicChecklistEditLinks.checked = settings.vBoolClassicChecklistEditLinks;
        vBoolClassicChecksheetPopulate.checked = settings.vBoolClassicChecksheetPopulate;
        vBoolClassicCustomerPOButtons.checked = settings.vBoolClassicCustomerPOButtons;
        vBoolClassicEDILogButtons.checked = settings.vBoolClassicEDILogButtons;
        vBoolClassicEscapeOverride.checked = settings.vBoolClassicEscapeOverride;
        vBoolClassicLabelDesignerButtons.checked = settings.vBoolClassicLabelDesignerButtons;
        vBoolClassicLabelDesignerLinks.checked = settings.vBoolClassicLabelDesignerLinks;
        vBoolClassicRenaultDelforButton.checked = settings.vBoolClassicRenaultDelforButton;
        vBoolClassicUserManagerCopy.checked = settings.vBoolClassicUserManagerCopy;
        vBoolClassicUserManagerSelectAllAdmin.checked = settings.vBoolClassicUserManagerSelectAllAdmin;
        vBoolClassicUserManagerPasteClassic.checked = settings.vBoolClassicUserManagerPasteClassic;
        vBoolClassicUserManagerPasteUX.checked = settings.vBoolClassicUserManagerPasteUX;
        vStrClassicUserManagerExcludeText.value = settings.vStrClassicUserManagerExcludeText;
        vStrClassicUserManagerUXRolePrefix.value = settings.vStrClassicUserManagerUXRolePrefix;
        vBoolClassicVPTabIndexFix.checked = settings.vBoolClassicVPTabIndexFix;
        vBoolClassicPosRoleAssocCopyPaste.checked = settings.vBoolClassicPosRoleAssocCopyPaste;
        updateDependencies();
    });

    // Listen for changes in lazy loading
    vBoolUxLazyLoading.addEventListener("change", updateDependencies);
    
    // Save settings
    saveButton.addEventListener("click", function () {
        if (vBoolUxLazyLoading.checked){
            addLazyRule()
        } else {
            removeLazyRule()
        }
        saveSettings({
            vBoolUxChecklistEditLink: vBoolUxChecklistEditLink.checked,
            vBoolUxChecksheetFillButton: vBoolUxChecksheetFillButton.checked,
            vBoolUxCompareSettings: vBoolUxCompareSettings.checked,
            vBoolUxEDILogButtons: vBoolUxEDILogButtons.checked,
            vBoolUxFavoritesUnlock: vBoolUxFavoritesUnlock.checked,
            vBoolUxSQLF5Execute: vBoolUxSQLF5Execute.checked,
            vBoolUxLabelDesignerButtons: vBoolUxLabelDesignerButtons.checked,
            vBoolUxFilterPinEnforce: vBoolUxFilterPinEnforce.checked,
            vBoolUxProjectManagementChecklistLink: vBoolUxProjectManagementChecklistLink.checked,
            vBoolUxLazyLoading: vBoolUxLazyLoading.checked,
            vBoolUxExportAnywhere: vBoolUxExportAnywhere.checked,
            vBoolUxSecurityActionKeys: vBoolUxSecurityActionKeys.checked,
            vBoolUxRoleRevisionHistory: vBoolUxRoleRevisionHistory.checked,
            vBoolUxRoleManagerActionKeys: vBoolUxRoleManagerActionKeys.checked,
            vBoolUxPosRoleAssocRearrangeColumns: vBoolUxPosRoleAssocRearrangeColumns.checked,
            vBoolUxEmployeeSwapNames: vBoolUxEmployeeSwapNames.checked,
            vBoolUxPosRoleAssocCopyPasteButtons: vBoolUxPosRoleAssocCopyPasteButtons.checked,
            vBoolUxUserManagerCopyPasteButtons: vBoolUxUserManagerCopyPasteButtons.checked,
            vBoolUxSelectAllAdmin: vBoolUxSelectAllAdmin.checked,
            vBoolUxCustAccessCopyPasteButtons: vBoolUxCustAccessCopyPasteButtons.checked,
            vBoolUxCustAccessTogglePCNs: vBoolUxCustAccessTogglePCNs.checked,
            vBoolUxSavePopupCsv: vBoolUxSavePopupCsv.checked,
            vBoolClassicCalendarMassUpdate: vBoolClassicCalendarMassUpdate.checked,
            vBoolClassicChecklistEditLinks: vBoolClassicChecklistEditLinks.checked,
            vBoolClassicChecksheetPopulate: vBoolClassicChecksheetPopulate.checked,
            vBoolClassicCustomerPOButtons: vBoolClassicCustomerPOButtons.checked,
            vBoolClassicEDILogButtons: vBoolClassicEDILogButtons.checked,
            vBoolClassicEscapeOverride: vBoolClassicEscapeOverride.checked,
            vBoolClassicLabelDesignerButtons: vBoolClassicLabelDesignerButtons.checked,
            vBoolClassicLabelDesignerLinks: vBoolClassicLabelDesignerLinks.checked,
            vBoolClassicRenaultDelforButton: vBoolClassicRenaultDelforButton.checked,
            vBoolClassicUserManagerCopy: vBoolClassicUserManagerCopy.checked,
            vBoolClassicUserManagerSelectAllAdmin: vBoolClassicUserManagerSelectAllAdmin.checked,
            vBoolClassicUserManagerPasteClassic: vBoolClassicUserManagerPasteClassic.checked,
            vBoolClassicUserManagerPasteUX: vBoolClassicUserManagerPasteUX.checked,
            vStrClassicUserManagerExcludeText: vStrClassicUserManagerExcludeText.value,
            vStrClassicUserManagerUXRolePrefix: vStrClassicUserManagerUXRolePrefix.value,
            vBoolClassicVPTabIndexFix: vBoolClassicVPTabIndexFix.checked,
            vBoolClassicPosRoleAssocCopyPaste: vBoolClassicPosRoleAssocCopyPaste.checked
        }, () =>
        {
            const statusMessage = document.getElementById("statusMessage");
            statusMessage.textContent = "Settings saved!";
            setTimeout(() => { statusMessage.textContent = ""; }, 2000);
        });
    });
});
