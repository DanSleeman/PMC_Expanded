function f5Refresh(){
    var actionButtons = document.querySelectorAll('ul.plex-actions > li')
    actionButtons.forEach(function(a){
        let button = ko.contextFor(a).$data;
        if (button.action){
        if (button.action.address !== 'ExecuteAdHocQuery') return;
        button.executeAction();}
    })
}
function disableF5(e) {
    if ((e.which || e.keyCode) == 116){
    e.preventDefault();
    f5Refresh()
    }
  };

$(document).ready(function(){
    $(document).on("keydown", disableF5);
});