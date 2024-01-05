
classicCreateButton('DIV','NavigationToolbarSection','renaultDCS','DCS Folder')

document.getElementById ("renaultDCS").addEventListener (
    "mouseup", ButtonClickAction, false
);

function ButtonClickAction () {
var clk = window.open('../DCS_v2/DCS_v2.asp?DCS_Node=14389569');
}