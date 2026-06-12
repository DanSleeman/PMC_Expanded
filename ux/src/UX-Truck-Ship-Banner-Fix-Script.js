(function() {
  let globalConfig = null;

  // Capture config when parseJSON is called
  const originalParseJSON = plex?.parsing?.parseJSON;
  if (originalParseJSON) {
    plex.parsing.parseJSON = function(jsonString) {
      const result = originalParseJSON.call(this, jsonString);
      globalConfig = result;
      console.log('Stored config:', globalConfig);
      return result;
    };
  }

  // Override onReady to inject config into the callback's scope
  const originalOnReady = plex?.onReady;
  if (originalOnReady) {
    plex.onReady = function(callback) {
      return originalOnReady.call(this, function() {
        // Temporarily inject config into global scope so the callback can find it
        const originalConfig = window.config;
        window.config = globalConfig;
        try {
          callback.call(this);
        } catch (e) {
          throw e;
        } finally {
          // Restore original state
          window.config = originalConfig;
        }
      });
    };
  }
})();
