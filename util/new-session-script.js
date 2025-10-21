function newSession(){
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.code === 'Space') {
        e.preventDefault();
        plex.navigation.openNewWindow()
    }
});}


newSession()