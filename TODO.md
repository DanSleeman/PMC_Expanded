### Role copy 

[ ] Change copy storage from sync to session so it resets each time the browser launches.

### SQL Development Environment Sproc History

[ ] Save executed queries to a local storage variable

[ ] Display the SQL history to the user

[ ] Create method to load this data into a new query panel

### SQL Development Environment Rearrange

[ ] Change execute query action to create a results panel within the main query panel

[ ] Allow the properties panel to render within the main query panel

### SQL Development Environment Additional Hotkeys

[ ] Add support for saving the sproc with ctrl+s

* Should check if this is a new sproc or existing sproc.
* Prompt the user to set a name if there is none defined yet.

### Checksheet Fill - UX

[x] Make this function like the classic version. Need to use mutators to detect if the checksheet window is loaded.

### Export Anywhere

[ ] - Fix or modify exports on 'grouped' grids to handle row data which isn't present due to hidden repeating cell content.  

* EX: Inventory

[ ] - Fix export for situations where the first header row spans the length of all the columns below.

* EX: Receiving Log

[ ] - More elegantly handle the checkbox placement for column selection.  
The layout is bad for columns that are themselves a checkbox.  
Want to see if there can be a DIV or SPAN inserted to align them.

### User Manager - Customer Access

[ ] - Find a way to get the Toggle PCN button on the user customer access screen to work on page load. Currently it creates the cells, but it removes them after loading completely.


[ ] - Create links for the user manager "customer access" portion which links to that user's detail screen in the relevant PCN

`https://cloud.plex.com/Security/UserManagement/ViewUserManagerCustomerForm?__sk=21&__sak=81&__actionKey=10473&__asid=&UserValue=&UserCustomerKey=&__features=novirtual`  
`https://cloud.plex.com/Security/UserManagement/ViewUserManagerCustomerForm?__sk=21&__sak=81&__actionKey=10473&__asid=&UserValue=&UserCustomerKey=&__features=novirtual`

__sk and __sak appear to be different for different submenus in the user manager. These are consistent from user to user and PCN to PCN.  
UserValue is the same. This is the PUN  
UserCustomerKey is different based on the PCN that is selected. Need to figure out if this is available on the screen or not.

datasource.raw is an array of each row which has a lot of detail. Does not have the usercustomerkey though.  
This same detail is avaialable on each checkbox data as well.

### Utils - Sort Table

[ ] - add toggling for visibility to the indicator element when sorting.  
Need to also remove visibility to any of the other TH inidcator elements when clicked.  
Alternatively, figure out how to implement the Plex sorting for the grid. All the elements appear to be present, but the table is not sortable.

### Position Role Association 

[ ] - Update functions to search for the Security Role column rather than the next sibling.
