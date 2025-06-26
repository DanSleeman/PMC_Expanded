/*
Intention for this script
Add checkboxes for remembering input values.
    TODO - Decide if we should have a checkbox next to each value to remember, or for all values that are pre-defined.
When pressing Apply, save the remembered input values to session storage
When page loads, auto populate the previous values.
If time elapsed since last Apply click > some amount of time, clear stored session data and reload page or just clear inputs
Have button to clear remembered values from session history.
If "OK" button is pressed, session storage sould be cleared.

When locating the data, the ko.contextFor() function has various variables with the current data.
Using any input element, you should be able to find this detail.
ko.contextFor($0).$rawData.model.BadgeNo > String
ko.contextFor($0).$rawData.model.ItemKey > Array with Item Key
ko.contextFor($0).$rawData.model.Location > Array with location string
ko.contextFor($0).$rawData.model.UsedBy > Array with PUN

The model also has various functions that should be able to be leveraged to update the elements. (I've had mixed success with this)

Note:
When badge no is used, the 'used by' cell populates, and the badge no field retains the value. This can be useful for session storage.

Test part details
Item Number - 101613
Location - 17STK E.44
Badge/Used By - 21215 / Sleeman, Daniel
*/