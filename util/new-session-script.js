function newSession(){
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.code === 'Space') {
        e.preventDefault(); // optional: prevent default behavior
        plex.navigation.openNewWindow()
        console.log('New session opened?')
    }
});}


newSession()
/*
// 6/26/2025 TODO - Working on support for classic new session.
// Very complex compared to UX which is a built in function Plex has.
c$(function (){
void 0 === environment && (environment = {});
(c$.environment.IsClassic =
      window.location.origin.includes("plexonline.com") ||
      window.location.origin.includes("plexus-online.com"))
})
    c$.environment.IsClassic
      ? (window.location.pathname.match(
          /\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})\//
        ) &&
          (c$.environment.SessionKey = window.location.pathname.match(
            /\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})\//
          )[1]),
        (c$.environment.Path = window.location.pathname.match(
          /(?:\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12})?(\/.*)/
        )[1]),
        (c$.environment.CurrentServer = window.location.origin),
        (c$.environment.IsTestServer =
          c$.environment.CurrentServer.indexOf("//test.") > -1),
        (c$.environment.IsProductionServer =
          c$.environment.CurrentServer.indexOf("//www.") > -1))

:plexSession.IsUX = window.location.origin.includes("cloud.plex.com")),
    (c$.environment.IsClassic =
      window.location.origin.includes("plexonline.com") ||
      window.location.origin.includes("plexus-online.com")),

      c$.environment.SessionKey = window.location.pathname.match(
            /\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})\//
          )[1]),
        (c$.environment.Path = window.location.pathname.match(
          /(?:\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12})?(\/.*)/
        )[1]),
CurrentServer = window.location.origin
IsTestServer =
          c$.environment.CurrentServer.indexOf("//test.") > -1
          IsProductionServer =
          c$.environment.CurrentServer.indexOf("//www.") > -1))
var e =
          c$.environment.CurrentServer +
          "/" +
          c$.environment.SessionKey +
          "/index.asp?Session_Copy={" +
          c$.environment.SessionKey +
          "}";
        Plex.LaunchNewSession(e, 0);
    })
*/