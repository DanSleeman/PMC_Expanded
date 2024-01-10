const thElements = document.querySelectorAll('th');
thElements.forEach(function(thElement) {
    thElement.addEventListener('click', sortTable);
    thElement.classList.add('sortable')
});
