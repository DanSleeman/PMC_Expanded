/**
 * @param siblings {jQuery} List of sibling elements to act upon
 * @param subjectIndex {int} Index of the item to be moved
 * @param objectIndex {int} Index of the item to move subject after
 */
var swapElements = function(siblings, subjectIndex, objectIndex) {
    // Get subject jQuery
    var subject = $(siblings.get(subjectIndex));
    // Get object element
    var object = siblings.get(objectIndex);
    // Insert subject after object
    subject.insertAfter(object);
}

/* 
This example will move the "Custom Data" section on the customer details screen to before the "Address List" section.
Move element 11 to after element 6
The list includes all the fieldset elements which includes both columns.
*/
$(function() {
    swapElements($('fieldset'), 11, 6);
});

/*
TODO - Figure out a way to make a configurable setting to move custom field sections
*/