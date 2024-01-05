function pinByDefault() {
    const tag = '[Plex EX Filter Pin By Default]';


    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    let appObserver = null;
    const appName = '.plex-filter-searchbar';

    // let pinElement = null;

    function log(message) {
      console.log(`${tag}[${getTimestamp()}] ${message}`);
    }

    function debug(message) {
      console.debug(`${tag}[${getTimestamp()}] ${message}`);
    }

    function asDoubleDigit(value) {
      return value < 10 ? '0' + value : value;
    }

    function getTimestamp() {
      let dt = new Date();
      let time = asDoubleDigit(dt.getHours()) + ':' + asDoubleDigit(dt.getMinutes()) + ':' + asDoubleDigit(dt.getSeconds());
      return time;
    }

    function observeApp() {
      debug(`Observing ${appName}...`);
      appObserver = new MutationObserver((mutations, observer) => {
        defaultFilterPinned();
      });
      if (document.querySelector(appName) === null) return;
      appObserver.observe(document.querySelector(appName), {
        childList: true,
        subtree: true,
        attributes: true
      });
    }

    function defaultFilterPinned() {
      //log(`Mutator detected`);
      if (document.querySelector('.plex-filter-pin-icon') === null) return;
      //log(`pin icon is visible`);
      if (ko.dataFor(document.querySelector('.plex-filter-pin-icon')).isPinned() == true) return;
      //log(`Pin icon is not pinned`);
    ko.dataFor(document.querySelector('.plex-filter-pin-icon')).isPinned(true);
    }
    observeApp();
    log(`Monitoring Plex for filter pin icon...`);
    defaultFilterPinned();
  }
  pinByDefault();