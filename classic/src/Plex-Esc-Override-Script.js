//Overrides the browser's default 'back' button to send the 'esc' keypress when using Plex screens only.
//Replaces the AHK script that would override it for all Chrome pages.

document.addEventListener("mousedown", logMouseButton);
document.addEventListener("mouseup", logMouseButtonUp);
function logMouseButton(e){
if (e.which == 4) {
e.preventDefault()
__triggerKeyboardEvent(document, 27)
}
};

function logMouseButtonUp(e){
if (e.which == 4) {
e.preventDefault()
}
};

function __triggerKeyboardEvent(el, keyCode)
{
    var eventObj = document.createEventObject ?
        document.createEventObject() : document.createEvent("Events");
  
    if(eventObj.initEvent){
      eventObj.initEvent("keydown", true, true);
    }
  
    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;
    
    el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj); 
  
}