# Change Log

## [0.3] - 2024-11-1

### Fixed

Fixed issue with role manager buttons to prevent errors on initialization.

### Added

Added notification toasts to UX user manager role buttons.

### Changed

Changed favorites F-key unlock selector to be less strict to avoid future DOM changes that may affect functionality.

## [0.2] - 2024-10-1

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

