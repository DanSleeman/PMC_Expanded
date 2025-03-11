/* WIP Script
process which will rearrange the query panes to mimic the classic layout a bit more 
Create DIV container for query and properties tabs
Move these tabs into that container

move results tab to below new container
    Should this be triggered by the F5/execute function?
    Should it be hidden again with a close action?
Add a resize element to the results container.


Logical process that should take place.
Only process this for the currently active query tab.
Move the Properties sub-pane to the Query sub-pane.
When the Results are triggered, create a container and move the reults sub-pane to it.
Create a close button to remove the results container and move it back to the sub-pane.

Notes on what may be possible.
When execute adhoc query is called, there is a function that sets the active tab to results.
If I can overwrite this, then it should not change the active tab, and that results pane can instead be created in the main tab.
subtabList.tabs.forEach(function(subtab){
    if (subtab.title()==="Query"){ //The original checks for "Results"
        subtabList.setActiveTab(subtab);}})
Maybe we can override the property?
*/
//Replace the function with an identical function that uses a different callback

function ExecuteAdHocQuery() {
    var tab = this.tabList.getActiveTab();
    var unblock = function () { $(document).unblock(); };
    if (tab) {
      var query = this.GetTabData(tab);
      tab.results = tab.results || ko.observableArray([{}]);
      $(document).block();
      this.ValidateAdHocQuery(
        query,
         () => {// changing this to an arrow function will allow 'this' variable to propogate through to the callback.
            console.log("Type of resultsPaneHandler_:", typeof this.resultsPaneHandler_);
            console.log("This variable before callback:",this)

          plex.loadHtml(
            $("#" + tab.results().id),
            "/BusinessIntelligence/SqlDevelopmentEnvironment/ExecuteAdHocQuery",
            query,
            { method: "post", showOverlay: false })
            .done(this.resultsPaneHandler_.bind(this))
            .done(function () {
                //Removed the original code that focuses the results tab.
              var messageInput = $("#" + tab.results().id + " [id$='BannerMessage']")[0];
              if (typeof (messageInput) != 'undefined' && messageInput.value) {
                plex.banner.getPageBanner().setMessage(messageInput.value, false);
              }

              unblock();
            })
            .fail(unblock);
        },
        unblock);
    }
  }

//Add a new function that controls creating the results container within the query tab
// plex.SqlDevelopmentEnvironmentLayoutController.prototype.CreateResultsContainer_ = function (n) {
function CreateResultsContainer_(){
    try{
    console.log("I'm in. Callback")
    // console.log(n)
    // console.log("n variable:",n)
    console.log("this variable:",this)
    // console.log(plex.SqlDevelopmentEnvironmentLayoutController.prototype)
    var tab = this.tabList.getActiveTab();
    console.log('tab variable:', tab)
    var subtabList = tab.childElement.controller.tabList;
    console.log('subtablist variable:', subtabList)
    subtabList.tabs.forEach((subtab) =>{
        if (subtab.title() === "Results") {
            //Do the thing for creating container
            //need to ensure that the element doesn't already exist before doing anything
            console.log("This element:",this.$element)
            var subTab = this.$element[0].querySelector('.query-sub-tab')
            subTab.style = 'display: flex; flex-direction: column;'
            console.log("I'm in.")
            
// create and move the results pane into the main display
// TODO 3/11/2025 Clean up script.
// Need to add a close button.
// Need to separate the functionality of the properties pane getting moved.
//      Ideally would have one setting to control having the results pane show in the query tab
//      Another setting to control the properties tab in the query tab.
//          Should the properties tab button functionality embed the pane rather than switch tabs? Clicking it will toggle between embedded and not.
// Need to handle the activities of switching tabs. (Should we remove the results container if the user clicks on the results tab?)
// Likewise with the properties tab
const noSelectStyle = document.createElement('style');
noSelectStyle.textContent = `
.no-select{
user-select: none;
cursor: ns-resize;
}`
document.head.appendChild(noSelectStyle);
const subTabs = document.querySelectorAll('.query-sub-tab')
subTabs[0].style = 'display: flex; flex-direction: column;'
const d = document.createElement('div');
d.style = 'display: flex; gap: 10px;'
d.classList = ['pmcExpandedResultsContainer']
const div1 = subTabs[0].children[0]
div1.style = 'flex: 1;'
const div2 = subTabs[0].children[1]
div2.style = 'margin-top: 10px; margin-bottom: 10px; flex: none; overflow: none; height: 30%'
const div3 = subTabs[0].children[2]
const div4 = subTabs[0].children[3]
div4.style = 'flex: 0 1 45%;'
d.appendChild(div1)
d.appendChild(div4)
subTabs[0].insertBefore(d,subTabs[0].children[0])
const d2 = document.createElement('div');
d2.setAttribute('class', 'resizer query-results-container plex-form-content plex-form-content-two-columns')
d2.style = 'height: 5px; background: #000; cursor: ns-resize; bottom: 0; left: 0; right: 0;'
div2.insertBefore(d2,div2.children[0])

const resizer = div2.querySelector(".resizer");
let startY, startHeight;

resizer.addEventListener("mousedown", (e) => {
    startY = e.clientY; // Initial mouse Y position
    startHeight = parseInt(window.getComputedStyle(div2).height, 10); // Current height of div2
    document.body.classList.add("no-select");
    document.documentElement.addEventListener("mousemove", resize);
    document.documentElement.addEventListener("mouseup", stopResize);
});

function resize(e) {
    const newHeight = startHeight + (startY - e.clientY); // Adjust height based on mouse movement
    if (newHeight > 50 && newHeight < 600) { // Set minimum and maximum height limits
        div2.style.height = `${newHeight}px`;
    }
}

function stopResize() {
    document.body.classList.remove("no-select");
    document.documentElement.removeEventListener("mousemove", resize);
    document.documentElement.removeEventListener("mouseup", stopResize);
}
        }
    });}catch(error){
        console.error("Error in callback:", error);
    }
}



function resultsPaneHandler_(){
    var x = this.$element[0].querySelector('.pmcExpandedResultsContainer')
    console.log("x var:", x)
    if (x) return;
    console.log('Executing Function CreateResultsContainer_', typeof this.CreateResultsContainer_)
    this.CreateResultsContainer_.bind(this);
    this.CreateResultsContainer_();
}
plex.SqlDevelopmentEnvironmentLayoutController.prototype.ExecuteAdHocQuery = ExecuteAdHocQuery
plex.SqlDevelopmentEnvironmentLayoutController.prototype.resultsPaneHandler_ = resultsPaneHandler_
plex.SqlDevelopmentEnvironmentLayoutController.prototype.CreateResultsContainer_ = CreateResultsContainer_