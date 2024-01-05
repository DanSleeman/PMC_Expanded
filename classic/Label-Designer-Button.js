
classicCreateButton('DIV','NavigationToolbarSection','getSerial','Get Serial')

document.getElementById ("getSerial").addEventListener (
    "mouseup", ButtonClickAction, false
);

function ButtonClickAction () {
var clk = window.open('../part/labels/Label_print_Format_Serial.asp');
}