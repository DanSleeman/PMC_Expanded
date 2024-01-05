classicCreateButton('DIV','NavigationToolbarSection','whipChecksheet','Pencil Whip Checksheet',null,true)

document.getElementById ("whipChecksheet").addEventListener (
    "mouseup", ButtonClickAction, false
);


function ButtonClickAction () {
var allInputs = document.querySelectorAll('input[id$="pass"]');
for (var i = 0, max = allInputs.length; i < max; i++){
    if (allInputs[i].type === 'radio')
        allInputs[i].checked = true;
}

var allMeasure = document.querySelectorAll('input[id^="Measurement"]');
for (var i = 0, max = allMeasure.length; i < max; i++){
    if (allMeasure[i].type === 'text')
        allMeasure[i].value = "0";
}
}