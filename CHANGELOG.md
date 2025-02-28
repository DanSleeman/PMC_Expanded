# Change Log

## TODO

[ ] - Fix or modify exports on 'grouped' grids to handle row data which isn't present due to hidden repeating cell content.  

* Inventory

[ ] - Fix export for situations where the first header row spans the length of all the columns below.

* Receiving Log

[ ] - Find a way to get the Toggle PCN button on the user customer access screen to work on page load. Currently it creates the cells, but it removes them after loading completely.

[x] - Fix popup HTML formatting so the tooltips do not render off screen.

## [0.4] - 2/28/2025

### Added

Added configuration support for quickly entering role names for enterprising security roles in defined PCNs.

Added UX menu search keyboard navigation script. Formerly tampermonkey userscript.

### Changed

Update the enterprise role script to dynamically set the PCNs.

Modified wording to various option entries.

Updated debug script tags to reflect extension name change.

## [0.3] - 2/25/2025

### Changed

Changed extension name from Plex EX to PMC Expanded.

Changed icon.

Set the options page to also be used for the popup.

### Fixed

Fixed user detail role paste when the exclusion setting was an empty value.

Fixed user detail role paste when UX prefix is not populated. Turns both classic paste buttons into "Paste all" buttons.

Fixed manifest icon configuration.

## [0.2] - 2/21/2025

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

### TODO
Fix SQL Development Environment F5 override to still allow other F keys to function.

