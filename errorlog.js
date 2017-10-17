(function () {
  var consoleErrorBackup = console.error;

  window.errorLogger = {
    version: '1.0.0',
    logger: {
      onError: undefined,
      send: undefined,
      log: []
    }
  };

  if (console && console.error) {
    console.error = function (error) {
      consoleErrorBackup.apply(this, arguments);

      var splittedError;
      if (error && error.split) {
        splittedError = error.split('\n')
      } else if (error.stack) {
        splittedError = error.stack.split('\n');
      }

      var errTitle;
      if (splittedError && error.split) {
        errTitle = splittedError[0];
        if (splittedError[0].length > 254) {
          errTitle = errTitle.substr(0, 254);
        }
      } else {
        errTitle = '';
      }
      var errPayload = error;
      var windowWidth = document.documentElement.clientWidth;
      var windowHeight = document.documentElement.clientHeight;
      var os = navigator.platform;
      var browser = navigator.userAgent;
      // line number

      var lineColumn = null;
      var errLineColumn = null;
      if (splittedError) {
        lineColumn = splittedError[1];
        var pattern = /[\d]+\:[\d]+/;
        errLineColumn = pattern.exec(lineColumn);
      }

      var url = window.location.href;


      var errorObj = {
        title: JSON.stringify(errTitle),
        lineColumn: errLineColumn ? errLineColumn[0] : null,
        windowHeight: windowHeight,
        windowWidth: windowWidth,
        os: os,
        browser: browser,
        url: url,
        payload: JSON.stringify(errPayload)
      };

      if (window.errorLogger.logger.onError) {
        window.errorLogger.logger.onError(errorObj, error);
      }

      window.errorLogger.logger.log.push(errorObj);

      if (window.errorLogger.logger.send) {
        window.errorLogger.logger.send();
      }
    }
  }
})();
