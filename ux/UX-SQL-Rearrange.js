/* 
process which will rearrange the query panes to mimic the classic layout a bit more 
Create DIV container for query and properties tabs
Move these tabs into that container

move results tab to below new container
    Should this be triggered by the F5/execute function?
    Should it be hidden again with a close action?
Add a resize element to the results container.
*/


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
const div1 = subTabs[0].children[0]
div1.style = 'flex: 1;'
const div2 = subTabs[0].children[1]
div2.style = 'margin-top: 10px; flex: none; overflow: none; height: 30%'
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
