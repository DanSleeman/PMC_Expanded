function waitForElementToDisplay(selector, time, func) {
        if(document.querySelector(selector)!=null) {
            //alert("The element is displayed, you can put your code instead of this alert.")

new func

            return;
        }
        else {
            setTimeout(function() {
                waitForElementToDisplay(selector, time, func);
            }, time);
        }
    }

function fillChecksheet() {

//Mark as passed

//ko.contextFor($0).$parent.model.HasPassed = true

var maxRadio = document.querySelectorAll("input[type='radio']").length
for (i=0;i<maxRadio;i++){
ko.contextFor(document.querySelectorAll("input[type='radio']")[i]).$parent.model.HasPassed = [true]
}

//ko.contextFor($0).$data.data.Value = 0
//ko.contextFor($0).$data.data.PreviousValue = 0
//ko.contextFor($0).$data.data.IsOutOfSpec = false

var maxVal = document.querySelectorAll("input[name='Value']").length
for (i=0;i<maxVal;i++){
ko.contextFor(document.querySelectorAll("input[name='Value']")[i]).$data.data.Value = 0
//ko.contextFor(document.querySelectorAll("input[name='Value']")[i]).$data.data.PreviousValue = 0
//ko.contextFor(document.querySelectorAll("input[name='Value']")[i]).$data.data.PreviousValueIsOutOfSpec = false
ko.contextFor(document.querySelectorAll("input[name='Value']")[i]).$data.data.IsOutOfSpec = false}

document.querySelector("#checksheetLineActionBar > li:nth-child(3)").children[0].click()
waitForElementToDisplay(sel2,5,function(){addListen()})
}

function eleCreate(){
	//alert("Im the eleCreate function")
var xNode = document.createElement ('li');
xNode.innerHTML = '<a data-bind="id: $data.id, href: $data.href, css: { "disabled": !$data.isEnabled() }" id="processASN" style="user-select: auto;" href="javascript:;">Fill Checksheet</a>';
xNode.addEventListener("mouseup", function() {fillChecksheet()});
document.querySelector("#checksheetLineActionBar").appendChild(xNode)
}

function addListen(){
	//alert("Im the addListen function")
var maxCheck = document.querySelectorAll("div[class='control-panel clickable']").length
for(i=0;i<maxCheck;i++){
//var sel = "#checksheetLineActionBar"
//var sel = "ul[class='plex-actions']"
//var sel = "div[class='plex-actions-wrapper plex-grid-actions']"
var sel = "div[class$='plex-grid-actions']"
//document.querySelectorAll("div[class='control-panel clickable']")[i].addEventListener("mouseup", waitForElementToDisplay(sel,5,function(){eleCreate()}));
document.querySelectorAll("li[class='plex-listview-item']")[i].addEventListener("mouseup", waitForElementToDisplay(sel,5,function(){eleCreate()}));
}
}
//var sel2 = "#controlPanelChecksheet"
var sel2 = "li[class='plex-listview-item']"
waitForElementToDisplay(sel2,5,function(){addListen()})
