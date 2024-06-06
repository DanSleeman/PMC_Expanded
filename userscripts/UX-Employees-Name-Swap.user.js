// ==UserScript==
// @name         Employee List Name Filter Swap
// @namespace    http://tampermonkey.net/
// @version      2024-05-17
// @description  try to take over the world!
// @author       You
// @match        https://cloud.plex.com/HumanResources/EmployeeList*
// @match        https://test.cloud.plex.com/HumanResources/EmployeeList*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=plex.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let inputs = document.querySelectorAll("input[name='FirstName']");
    let div1 = inputs[0].closest("div.plex-control-group");
    inputs = document.querySelectorAll("input[name='LastName']");
    let div2 = inputs[0].closest("div.plex-control-group");
    let parent = div1.parentNode;
    parent.insertBefore(div2, div1);

})();