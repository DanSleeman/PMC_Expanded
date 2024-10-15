# Change Log

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

