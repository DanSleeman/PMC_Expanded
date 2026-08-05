const settingsKeys = [
    "key",
    "type",
    "default",
    "category",
    "group",
    "parent",
    "label",
    "description",
    "tooltipText",
    "tooltipType",
    "visibleIf",
    "dependsOn",
    "sortOrder",
    "options",
    "indentLevel",
    "tags",
    "featureFlag",
    "version"
]
const templateSetting = {
    key: "vBoolUxExportAnywhere",
    type: "checkbox",
    default: true,

    // display hierarchy
    category: "UX",
    group: "All Screens",
    parent: null,

    // rendering
    label: "Add button for exporting visible grid data.",
    description: null,

    // tooltip
    tooltipText: "May behave oddly on pages with multiple grids.",
    tooltipType: "warning",

    // visibility
    visibleIf: "vBoolUxLazyLoading",
    dependsOn: "vBoolUxLazyLoading",

    // ordering
    sortOrder: 100,

    // future-proofing
    featureFlag: null,
    tags: ["grid", "export"],

    // control specific
    options: null,

    // UI hints
    indentLevel: 0,

    // metadata
    version: 1
}
export const SETTINGS = [

    // -----------------------
    // Role Configuration
    // -----------------------

    {
        key: "vListEnterprisePCNs",
        type: "textarea",
        default: "",
        parent: null,
        label: "Enterprise PCNs",
        tooltipText: "Comma delimited list of PCN names or numbers to be used when setting new enterprise security roles. Use '_ALL_' as the only option to set the role in all PCNs.",
        tooltipType: "info",
        category: "Role Configuration",
        group: "General"
    },

    {
        key: "vStrClassicUserManagerExcludeText",
        type: "text",
        default: "",
        parent: null,
        label: "Excluded paste terms",
        tooltipText: "Comma delimited list of values to exclude when pasting roles. Case sensitive. This functions only within the user details paste screens.",
        tooltipType: "info",
        category: "Role Configuration",
        group: "General"
    },

    {
        key: "vStrClassicUserManagerUXRolePrefix",
        type: "text",
        default: "UX:",
        parent: null,
        label: "UX role prefix",
        tooltipText: "Prefix used to detect UX roles on screens that show all roles.",
        tooltipType: "info",
        category: "Role Configuration",
        group: "General"
    },

    // -----------------------
    // UX Settings
    // -----------------------

    {
        key: "vBoolUxMenuSearchKeyboardOBS",
        type: "checkbox",
        default: true,
        parent: "General QOL",
        label: "Add keyboard navigation to menu search",
        tooltipText: "This is now native Plex functionality. Keeping the option in case Plex ever breaks it.",
        tooltipType: "important",
        category: "UX",
        group: "General QOL"
    },

    {
        key: "vBoolUxTruckBannerFix",
        type: "checkbox",
        default: true,
        parent: "General QOL",
        label: "Fix 'Unexpected Error' banner when shipping a truck.",
        tooltipText: "Overrides the broken function to show the actual warning instead of an unexpected error.",
        tooltipType: "important",
        category: "UX",
        group: "General QOL"
    },

    {
        key: "vBoolUxFavoritesUnlock",
        type: "checkbox",
        default: true,
        parent: "General QOL",
        label: "Unlock all function key options when assigning favorites.",
        tooltipText: "F5 is still reserved for refreshing the browser.",
        tooltipType: "info",
        category: "UX",
        group: "General QOL"
    },

    {
        key: "vBoolUxCompareSettings",
        type: "checkbox",
        default: true,
        parent: "General QOL",
        label: "Add 'Compare Settings' link in the gears dropdown menu.",
        category: "UX",
        group: "General QOL"
    },

    {
        key: "vStrSettingsManagerGlossary",
        type: "text",
        default: "Settings Manager",
        parent: "vBoolUxCompareSettings",
        label: "Settings Manager Glossary Term",
        tooltipText: "The glossary term shown in Plex for Settings Manager.",
        tooltipType: "info",
        category: "UX",
        group: "General QOL",
        dependsOn: "vBoolUxCompareSettings"
    },

    {
        key: "vBoolUxRoleRevHistory",
        type: "checkbox",
        default: true,
        parent: "General QOL",
        label: "Add 'Role Revision History' link in the gears dropdown menu.",
        category: "UX",
        group: "General QOL"
    },

    {
        key: "vStrSecurityManagerGlossary",
        type: "text",
        default: "Security Manager",
        parent: "vBoolUxRoleRevHistory",
        label: "Security Manager Glossary Term",
        tooltipText: "The glossary term shown in Plex for Security Manager.",
        tooltipType: "info",
        category: "UX",
        group: "General QOL",
        dependsOn: "vBoolUxRoleRevHistory"
    },

    {
        key: "vBoolUxFilterPinEnforce",
        type: "checkbox",
        default: true,
        parent: "General QOL",
        label: "Force the 'Pin Filters' option to always be enabled.",
        category: "UX",
        group: "General QOL"
    },

    {
        key: "vBoolUxLazyLoading",
        type: "checkbox",
        default: false,
        parent: "General QOL",
        label: "Disable lazy loading for all UX pages.",
        tooltipText: "Required for many extension features to work properly.",
        tooltipType: "important",
        category: "UX",
        group: "General QOL"
    },

    // -----------------------
    // All Screens
    // -----------------------

    {
        key: "vBoolUxExportAnywhere",
        type: "checkbox",
        default: true,
        parent: "All Screens",
        label: "Add button for exporting visible grid data.",
        tooltipText: "May behave oddly on pages with multiple grids.",
        tooltipType: "warning",
        category: "UX",
        group: "All Screens",
        dependsOn: "vBoolUxLazyLoading"
    },

    {
        key: "vBoolUxSelectHalfCheckboxes",
        type: "checkbox",
        default: true,
        parent: "All Screens",
        label: "Add a context menu item to do a binary selection for checkboxes.",
        tooltipText: "Allows testing security configurations by selecting half the checkboxes.",
        tooltipType: "info",
        category: "UX",
        group: "All Screens"
    },

    {
        key: "vOptUxSelectHalfCheckboxesType",
        type: "select",
        default: 0,
        parent: "vBoolUxSelectHalfCheckboxes",
        label: "Checkbox selection preference",
        options: [
            { value: 0, text: "Prefer grid" },
            { value: 1, text: "Prefer standalone" },
            { value: 2, text: "Use both" }
        ],
        category: "UX",
        group: "All Screens",
        dependsOn: "vBoolUxSelectHalfCheckboxes"
    },

    {
        key: "vBoolUxSavePopupCsv",
        type: "checkbox",
        default: true,
        parent: "All Screens",
        label: "Add button to save upload confirmation/error popups to CSV.",
        category: "UX",
        group: "All Screens"
    },

    // -----------------------
    // Security Role Screens
    // -----------------------

    {
        key: "vBoolUxSecurityActionKeys",
        type: "checkbox",
        default: true,
        parent: "Security Role Screens",
        label: "Add button to show the action key when viewing the security admin manager.",
        category: "UX",
        group: "Security Role Screens"
    },

    {
        key: "vBoolUxRoleManagerActionKeys",
        type: "checkbox",
        default: true,
        parent: "Security Role Screens",
        label: "Add button to show the action key from security role manager.",
        category: "UX",
        group: "Security Role Screens"
    },

    {
        key: "vBoolUxSecurityRoleCopyPasteButtons",
        type: "checkbox",
        default: true,
        parent: "Security Role Screens",
        label: "Add copy/paste buttons to security role actions.",
        category: "UX",
        group: "Security Role Screens"
    }
];
// settings-schema.js

export const SCHEMA_VERSION = 1;

export const TYPE = {
    CHECKBOX: "checkbox",
    TEXT: "text",
    TEXTAREA: "textarea",
    SELECT: "select"
};

export const TOOLTIP = {
    INFO: "info",
    IMPORTANT: "important",
    WARNING: "warning",
    ALERT: "alert"
};

export const CATEGORY = {
    ROLE_CONFIGURATION: "Role Configuration",
    UX: "UX",
    CLASSIC: "Classic"
};

export const SETTINGS_V2 = [

    // =====================================================
    // Role Configuration
    // =====================================================

    {
        key: "vListEnterprisePCNs",
        type: TYPE.TEXTAREA,

        default: "",

        category: CATEGORY.ROLE_CONFIGURATION,
        group: "General",
        parent: null,

        label: "Enterprise PCNs",
        description: null,

        tooltipText: "Comma delimited list of PCN names or numbers to be used when setting new enterprise security roles. Use '_ALL_' as the only option to set the role in all PCNs.",
        tooltipType: TOOLTIP.INFO,

        visibleIf: null,
        dependsOn: null,

        sortOrder: 100,

        options: null,

        indentLevel: 0,

        tags: ["pcn", "roles", "security"],

        featureFlag: null,

        version: 1
    },

    {
        key: "vStrClassicUserManagerExcludeText",
        type: TYPE.TEXT,

        default: "",

        category: CATEGORY.ROLE_CONFIGURATION,
        group: "General",
        parent: null,

        label: "Excluded paste terms",
        description: null,

        tooltipText: "Comma delimited list of values to exclude when pasting roles.",
        tooltipType: TOOLTIP.INFO,

        visibleIf: null,
        dependsOn: null,

        sortOrder: 110,

        options: null,

        indentLevel: 0,

        tags: ["roles", "paste"],

        featureFlag: null,

        version: 1
    },

    {
        key: "vStrClassicUserManagerUXRolePrefix",
        type: TYPE.TEXT,

        default: "UX:",

        category: CATEGORY.ROLE_CONFIGURATION,
        group: "General",
        parent: null,

        label: "UX Role Prefix",
        description: null,

        tooltipText: "Prefix used to identify UX roles.",
        tooltipType: TOOLTIP.INFO,

        visibleIf: null,
        dependsOn: null,

        sortOrder: 120,

        options: null,

        indentLevel: 0,

        tags: ["ux", "roles"],

        featureFlag: null,

        version: 1
    },

    // =====================================================
    // UX - General QOL
    // =====================================================

    {
        key: "vBoolUxMenuSearchKeyboardOBS",
        type: TYPE.CHECKBOX,

        default: true,

        category: CATEGORY.UX,
        group: "General QOL",
        parent: null,

        label: "Add keyboard navigation to menu search",
        description: null,

        tooltipText: "This is now native Plex functionality. Keeping the option in case Plex ever breaks it.",
        tooltipType: TOOLTIP.IMPORTANT,

        visibleIf: null,
        dependsOn: null,

        sortOrder: 1000,

        options: null,

        indentLevel: 0,

        tags: ["menu", "keyboard"],

        featureFlag: null,

        version: 1
    },

    {
        key: "vBoolUxCompareSettings",
        type: TYPE.CHECKBOX,

        default: true,

        category: CATEGORY.UX,
        group: "General QOL",
        parent: null,

        label: "Add Compare Settings link",
        description: null,

        tooltipText: null,
        tooltipType: null,

        visibleIf: null,
        dependsOn: null,

        sortOrder: 1010,

        options: null,

        indentLevel: 0,

        tags: ["settings", "compare"],

        featureFlag: null,

        version: 1
    },

    {
        key: "vStrSettingsManagerGlossary",
        type: TYPE.TEXT,

        default: "Settings Manager",

        category: CATEGORY.UX,
        group: "General QOL",
        parent: "vBoolUxCompareSettings",

        label: "Settings Manager Glossary Term",
        description: null,

        tooltipText: "The glossary term shown in Plex for Settings Manager.",
        tooltipType: TOOLTIP.INFO,

        visibleIf: "vBoolUxCompareSettings",
        dependsOn: "vBoolUxCompareSettings",

        sortOrder: 1011,

        options: null,

        indentLevel: 1,

        tags: ["glossary"],

        featureFlag: null,

        version: 1
    },

    {
        key: "vBoolUxLazyLoading",
        type: TYPE.CHECKBOX,

        default: false,

        category: CATEGORY.UX,
        group: "General QOL",
        parent: null,

        label: "Disable lazy loading for all UX pages",

        description: null,

        tooltipText: "Required for many extension features to work properly.",
        tooltipType: TOOLTIP.IMPORTANT,

        visibleIf: null,
        dependsOn: null,

        sortOrder: 1090,

        options: null,

        indentLevel: 0,

        tags: ["lazy-loading"],

        featureFlag: null,

        version: 1
    },

    // =====================================================
    // UX - All Screens
    // =====================================================

    {
        key: "vBoolUxExportAnywhere",
        type: TYPE.CHECKBOX,

        default: true,

        category: CATEGORY.UX,
        group: "All Screens",
        parent: null,

        label: "Add button for exporting visible grid data.",

        description: null,

        tooltipText: "May behave oddly on pages with multiple grids.",
        tooltipType: TOOLTIP.WARNING,

        visibleIf: null,
        dependsOn: "vBoolUxLazyLoading",

        sortOrder: 2000,

        options: null,

        indentLevel: 0,

        tags: ["grid", "export"],

        featureFlag: null,

        version: 1
    },

    {
        key: "vBoolUxSelectHalfCheckboxes",
        type: TYPE.CHECKBOX,

        default: true,

        category: CATEGORY.UX,
        group: "All Screens",
        parent: null,

        label: "Add a context menu item to do a binary selection for checkboxes.",

        description: null,

        tooltipText: "Allows testing security configurations by selecting and unselecting half of the checkboxes.",
        tooltipType: TOOLTIP.INFO,

        visibleIf: null,
        dependsOn: null,

        sortOrder: 2010,

        options: null,

        indentLevel: 0,

        tags: ["checkbox", "testing"],

        featureFlag: null,

        version: 1
    },

    {
        key: "vOptUxSelectHalfCheckboxesType",
        type: TYPE.SELECT,

        default: 0,

        category: CATEGORY.UX,
        group: "All Screens",
        parent: "vBoolUxSelectHalfCheckboxes",

        label: "Checkbox selection preference",
        description: null,

        tooltipText: "Controls which checkbox types participate in binary selection.",
        tooltipType: TOOLTIP.INFO,

        visibleIf: "vBoolUxSelectHalfCheckboxes",
        dependsOn: "vBoolUxSelectHalfCheckboxes",

        sortOrder: 2011,

        options: [
            {
                value: 0,
                text: "Prefer grid"
            },
            {
                value: 1,
                text: "Prefer standalone"
            },
            {
                value: 2,
                text: "Use both"
            }
        ],

        indentLevel: 1,

        tags: ["checkbox"],

        featureFlag: null,

        version: 1
    }

    // Remaining UX entries...
    // Remaining Classic entries...
];