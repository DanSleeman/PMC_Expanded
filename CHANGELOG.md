# Change Log

## [0.18.8] - 7/18/2025

### Added

Added classic login popup prevention based on the Cumulus browser extension.  
Cumulus now no longer works on Chrome, and this is one of the big benefits.

## [0.18.7] - 6/30/2025

### Fixed

Fixed export anywhere functionality for tables which have "grouped" columns.

The export will now use the grouping column name as part of the sub-columns when exporting.

All sub columns will now be able to be selectable.

Fixed issue with text that was styled with `display:none` to no longer be part of the exported data.

## [0.18.6] - 6/26/2025

### Added

Added UX hotkey for ctrl+space to launch a new session.  
This replicates the Cumulus browser plugin functionality.

Classic is not currently supported as the UX site has a purpose built call for launching sessions already and this was a quick addition for UX.

## [0.18.5] - 6/24/2025

### Fixed

Fixed export anywhere issue when the first row's cell contents were zero length, causing that entire column to be excluded.

## [0.18.4] - 6/3/2025

Fixed include glob case sensitivity issue for Role Member List script

Fixed export anywhere cell content detection when "image" checkboxes are used instead of read-only input elements. Setup tables are one example of where this occurs.

## [0.18.3] - 3/25/2025

Fixed settings issue after removal of "tweaks" settings for classic user manager buttons.

## [0.18.2] - 3/14/2025

### Changed

Fixed issue with manifest for UX Menu search navigation throwing errors. It was set to load on classic pages as well as UX.

### Removed

Moved in-dev scripts to dev branch while being worked on.

## [0.18.1] - 3/11/2025

### Changed

Removed activeTab permission after chrome store rejection. Apparently it wasn't used.

## [0.18] - 3/4/2025

### Added

Added privacy policy

Added option to add link to Role Revision History screen for navigating there without accessing a role first.

Added config settings for the drop-down insert scripts so they can get a user's glossary terms.

Added build script for minifying code and packaging.

### Changed

Updated compare settings script to use the glossary term setting when searching for where to insert the value.

Created TODO.md and removed all TODO statements from specific scripts.

Reworked compare settings and role revision history scripts to prevent clobbering other onload events.

Reworked compare settings and role revision history scripts to create elements rather than set innerHtml attribute.

Removed console logs from utils functions.

Replaced jquery file with fresh minified copy from website.

### Fixed

Fixed lazy loading rule to be removed if the addon is disabled.

## [0.17] - 2/28/2025

### Added

Added configuration support for quickly entering role names for enterprising security roles in defined PCNs.

Added UX menu search keyboard navigation script. Formerly tampermonkey userscript.

### Changed

Update the enterprise role script to dynamically set the PCNs.

Modified wording to various option entries.

Updated debug script tags to reflect extension name change.

Updated README details.

## [0.16] - 2/25/2025

### Changed

Changed extension name from Plex EX to PMC Expanded.

Changed icon.

Set the options page to also be used for the popup.

### Fixed

Fixed user detail role paste when the exclusion setting was an empty value.

Fixed user detail role paste when UX prefix is not populated. Turns both classic paste buttons into "Paste all" buttons.

Fixed manifest icon configuration.

## [0.15] - 2/21/2025

### Added

Added options to enable/disable nearly all functions within the extension.

Linked up options with the content scripts that are relevant.

Added parameter to `utils.injectScript()` to take the settings object if needed.

### Removed

Removed some files which were not used or extremely outdated.

### Changed

Changed background.js dynamic redirect rule creation to be within config.js module script to support config option.

## [0.14] - 2024-12-18

### Added

Added buttons on user customer access to toggle the PCN with all options.
* PCN Enabled
* Show as employee
* Allow cross company data access
* Set sort order = 1

This is currently enabled via an action button to show the values.

### Fixed

Fixed export anywhere to wait until the async function is available to create elements.

## [0.13] - 2024-10-30

### Changed

Added support for checkboxes on grids to be converted to an 'x' character.

Changed the PCN names for the new NetShape/Pgrad PCNs.

### Fixed

Fixed export anywhere to not try loading until the utility functions are available.

Fixed export for rows that span multiple columns. Only grabbing rows with "plex-grid-row" class which should omit the summary rows

Fixed export with row selection checkboxes. Now ignoring these columns all together.

Fixed export when cell content was within an editable text field.

## [0.12] - 2024-10-24

### Added

Added button to export the visible table content on any page.  
Functions similarly to the upload popup download.  
Default filename is the tab's title.

### Fixed

Fixed export anywhere to not attempt to load if the page doesn't have a table.

## [0.11] - 2024-10-14

### Added

Added button to save upload validation details to a CSV file.

Added checkboxes to upload dialog table columns to select which columns to include in the download. All default to selected.

Added utils function `uxCreateButtonFooterPopup` which can add a button to the footer section of a popup dialog window.

## [0.10] - 2024-9-16

Fixed issue with buttons on screens not in the home PCN navigating back to the home PCN.

## [0.9] - 2024-6-28

### Added

Added buttons on user manager customer access screen to copy and paste PCN access.

Added async function to `utils.js` for getting key values from chrome storage.

### Changed

Modified the `scriptInject` function to be async.  
Modified the `scriptInject` dataset params to include the pastePCN source text.

## [0.8] - 2024-6-18

### Added

Added button on Security Roles Manager screen for enterprise companies popup.  
Function is to fill out the role name in all the enterprise PCNs that are relevant.

Pgrad PCNs select existing roles, other PCNs enter a new role to be created.

## [0.7] - 2024-6-6

### Added

Added additional local storage variable for "Copied" source.  
This records the last record that was used when the "Copy roles" button is pressed in UX.

Added functionality to display the last copied source on the "Paste Roles" buttons in UX.

Added logic to pass the "Copied" local variable to injected scripts so it can be used when creating buttons.

### Changed

Updated all `copyRoles` functions to store the relevant source data in local storage.


## [0.6] - 2024-5-28

### Added

Added two buttons to `UX-Role-History-Buttons` for filtering results
* UX Roles - Filters for only roles starting with "UX"
* Classic Roles - Filters for only roles not starting with "UX"

Added script to swap the position of the first and last name fields on the Employees screen.  
There is a userscript for this as well for standalone functionality.

### Fixed

Updated `UX-Security-Manager-Action-Keys-Script` to wait until the function is available before calling

Updated `UX-Role-Manager-Action-Keys-Script` to wait until the function is available before calling


## [0.5] - 2024-2-23

### Changed

Updated role members table sorting to apply the appropriate even/odd class for highlights.

### Fixed

Fixed manifest glob formatting for role history buttons.

## [0.4] - 2024-2-7

### Added

Added button to "role history" screen which will copy role names that have "remove" actions.  
This will support pasting these roles into the user manager and position role association screens.

## [0.3] - 2024-1-11

### Fixed

Fixed issue with role manager buttons to prevent errors on initialization.

### Added

Added notification toasts to UX user manager role buttons.

### Changed

Changed favorites F-key unlock selector to be less strict to avoid future DOM changes that may affect functionality.

## [0.2] - 2024-1-10

### Added
Added override to UX SQL Development Environment to execute the SQL when F5 is pressed.

Added utility function to allow sorting on UX grids which do not implement the Plex standard sorting methods.

Applied the sort function to the Security Role Member screen.

### Changed
Added toast alerts to the UX User manager role buttons.

Reworked the user manager buttons functions to `window.postMessage`. Added event handler to extension to monitor for these messages and execute the original functions.  
This method allows the buttons to use the Plex toast alert function when pressed and still allows the extension to store the roles to copy/paste between screens.