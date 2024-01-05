# UX 

### No Lazy Loading

`background.js`

This creates a dynamic declarativeNetRequest rule which adds the query param of `__features=novirtual` if it is not already present.

The UX Grid constructor has code which looks for the `__features` query and adds this to the `env.features` variable on initialization.  
Adding `novirtual` will force all UX grids to never implement lazy loading.

This filter is required for a few of the other content scripts to behave as expected.  
For example, the Position Role Association column rearrange will have the column width reverted when a lazy load is triggered. Unsure how to handle this, but the actual data is still in the right spot. I believe it is because the headers never revert position, but they do update the width on lazy loading.

This will increase load times on certain screens, but I find that this is a very acceptable tradeoff to not having to wait for each lazy load chunk to render. (300 rows if i recall correctly). This also allows for browser ctrl+f searching properly instead of the janky Plex implementation.

### Security Manager Action Keys

`UX-Security-Manager-Action-Keys.js` `UX-Security-Manager-Action-Keys-Script.js`

Adds an action bar button to the page which adds the action keys under the action.


### Checklist edit link

`UX-Checklist-Edit-Link.js`

Adds action button to the "grid view" of a checklist that allows for editing the checklist to enable "N/A" support.

### Checksheet Fill

`UX-Checksheet-Fill.js` `UX-Checksheet-Fill-Script.js`

TODO - 1/2/2024 - Make this function like the classic version. Need to use mutators to detect if the checksheet window is loaded.

Intended to be a button that can fill out an entire production checksheet. It doesn't work in UX at this time. This is only intended to be used for testing purposes.

### Compare Settings

`UX-Compare-Settings.js`

Adds a button on the dropdown gears which opens the settings compare screen. This is normally only accessible when on the settings manager screen. Used to be a navigatable screen in classic.

TODO - 1/2/2024 - Doesn't always work. Need a more consistent approach.

### EDI Log Buttons

`UX-EDI-Log-Buttons.js`

Adds buttons to the EDI log 
* Process ASN - Access the ASN Processing screen to trigger drop-ship automation ASNs
* EDI Mailboxes - Access the EDI Mailboxes screen

### Favorites F-Key Unlock

`UX-Favorites-Unlock-Script.js` `UX-Favorites-Unlock.js`

This overrides the large restriction UX places upon favorite keys that classic did not have.  
Setting a favorite to a browser reserved function key will override the browser's function.  
UX does not allow this by default, but there was a time when it did and they have not removed the hotkey functionality for users who had set these at that time.

This script removes and replaces the options in the f-key drop down selector when loaded.

### Label Designer

`UX-Label-Designer-Button.js`

Adds action bar button to navigate to the "label testing" screen from the label designer element grid. Replicates functionality that existed in classic.

`UX-Label-Links.js`

Adds hyperlinks to the label elements grid to edit that row. Behaves like the "pencil" icon in classic. Same functionality as highlighting a row and clicking the edit button on the action bar.

### Search Filter Pin Default

`UX-Pin-Default.js` `UX-Pin-Default-Script.js`

Sets the "pin filters" pin to always true. You can still manually hide filters which will not affect this behavior since the pin goes away at this point.

### Project management checklist link

`UX-Project-Management-Checklist-Link.js`

Adds a link to the full checklist from the project manager screen.

This is not otherwise accessible and you would need to go to the checklists screen to access this info. The project management screen only allows checklist sections to be opened.


### Role Manager Action Keys

`UX-Role-Manager-Action-Keys-Script.js` `UX-Role-Manager-Action-Keys.js` 

Adds action keys to the grid for the security roles manager. These are needed for VP screen navigation.


### Position Role Association

`UX-Position-Role-Association-Rearrange.js`  
`UX-Position-Role-Association-Rearrange-Script.js`  
`UX-Position-Role-Association-Highlight.css`  
`UX-Position-Role-Association-Buttons.js`

Script will rearrange the columns to have the checkboxes in the first position.

Also groups the "companies" column text into a single record for the count of enterprised companies and adds that text as the hover title.

Custom css which highlights the row you are hovering over. Replicates the behavior in classic.

Adds buttons to the screen 
* Copy Roles - Add the currently selected roles to local storage variable
* Paste Roles - Select all the local storage variable's roles. Does not remove any pre-existing roles

### User Manager Buttons

`UX-User-Manager-Role-Buttons.js`

Adds buttons to the user manager screen.
* Copy Roles- Add the currently selected roles to local storage variable
* Paste Roles - Select all the local storage variable's roles. Does not remove any pre-existing roles
* Select All Admin - Selects the "admin" checkbox for every role. This is needed for anyone administering security.

The Admin checkbox is important for UX functionality due to the way the Position Role Association screen behaves differently than classic.

In Classic, if a user does not have admin to a role and makes updates to a position association which has that role, it will remain on the position.  
In UX, this role will be removed from the position association.

### User Manager Revision History

`UX-User-Manage-Revision-History-Cleanup.js` `UX-User-Manager-Revision-History.js`

Intended to clean up the ADP integration revision history garbage.

I think that the integrators are not making the proper revision change entries, so there are many garbage records being made.

TODO - 1/2/2024 - Figure out a way to identify all of the duplicates and remove these. 
For instance, if "Original Value" has a record with a matching "New Value" then remove all rows with a matching "Original Value" entry.
This would allow for cleaning up all the entries which have not actually changed.
The grouping would need to be done by the "Modified Date" column grouping.

# Classic

### Calendar Mass Update

`Plex-Calendar-Year-Expander.js`

Injects options to the shipping calendar mass update drop-downs that allow for cleaning up past records. This can be done in UX natively.

Why would you need this? If any date on a shipping calendar is defined as shipable, then every other day is considered non-shippable. If no days are shippable, every day is considered shippable. This allows you to remove every single old shipping day if you no longer wish to use the shipping calendar.

### Checklist Edit Links

`Checklist-Edit-Link.js`

Adds buttons to the checklist details to allow you to edit the actual checklist for enabling 'n/a' or changing the checklist title.

### Checksheet Populate

`Checksheet-Populate.js`

Adds a button to production checksheets which pencil whips them.  
There is a flaw in the design of the classic screen which does not validate the data entered into these fields when submitting the checksheet.  
It relies on the onblur() event to validate for pass/fail. When submitting, it assumes these values would have been validated already.  
This script exploits this by setting the value of all text/number inputs to 0 which is accepted as long as they are not focused/blured.

It also selects all the 'pass' radio buttons. These all have HTML IDs ending in 'pass' while the fails end in 'fail'.

This is only intended for testing purposes when there are ridiculous amounts of control plan checks and you don't want to remove the control plan completely from the part.

### Customer PO Buttons

`Customer-PO-Buttons.js`

Adds buttons to the customer PO grid to access the upload screen.

This is native functionality in UX.

### EDI Log Buttons

`EDI-Log-Buttons.js`

Adds buttons to the EDI log 
* Upload - Access the EDI upload screen
* Process ASN - Access the ASN Processing screen to trigger drop-ship automation ASNs
* EDI Mailboxes - Access the EDI Mailboxes screen

The upload button is native functionality in UX.

### Escape Override

`Plex-Esc-Override-Script.js`

This overrides the "browser back" mouse button to send an "Escape" instead. In classic, the normal browser back functionality will break breadcrumb trails, and escape should be used instead.

### Label Designer Buttons

`Label-Designer-Button.js`

Adds a "get serial" button to the label designer element editor. Normally only exists in the label library. This screen allows you to test print labels using specific serial numbers rather than the default serial when printing a sample from the label designer.

### Label Designer Links

`label-script.js`

1/2/2024 - Appears to not be implemented for classic. The pencil works well enough, so it must have only been testing for UX.

Adds hyperlinks to the first element of the label designer element grid to edit that element. Functions the same as the pencil icon.

### Renault Delfor Button

`Renault-DELFOR-Button.js`

Specific to Shape Corp.  
Adds a button  on the customer VP screen for Renault DELFOR splitting to open the DCS folder where these files are stored.

This is natively available in UX VP designer.

### User Manager

`User-Manager-Buttons.js`

Adds buttons to the user manager screen.
* Copy Roles- Add the currently selected roles to local storage variable
* Paste Roles - Select all the local storage variable's roles. Only Roles pre-pended with "UX". - Shape specific functionality
* Paste Classic Roles - Select all the local storage variable's roles. Pastes every matching role.
* Select All Admin - Selects the "admin" checkbox for every role. This is needed for anyone administering security.

The Admin checkbox is important for UX functionality due to the way the Position Role Association screen behaves differently than classic.

In Classic, if a user does not have admin to a role and makes updates to a position association which has that role, it will remain on the position.  
In UX, this role will be removed from the position association.

Paste options do not remove any existing role selections if they are not within the storage variable.

### VP Tab Index Fix

`VP-Tab-Index-Fix.js`

Simple script to assign all VisionPlex report elements to the same tab index.

Some Plex created VP screens have 0 tab indexes which causes you to have to tab through most of the screen elements before going to the second filter.

This sets all of them to index 1.