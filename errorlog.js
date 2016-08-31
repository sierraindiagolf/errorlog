(function () {
  var consoleErrorBackup = console.error;

  window.errorLogger = {
    version: '0.0.2',
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
      if (error.split) {
        splittedError = error.split('\n')
      } else if (error.stack) {
        splittedError = error.stack.split('\n');
      }

      var errTitle;
      if (splittedError) {
        errTitle = splittedError[0];
      } else {
        errTitle = error;
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
        title: errTitle,
        lineColumn: errLineColumn ? errLineColumn[0] : null,
        windowHeight: windowHeight,
        windowWidth: windowWidth,
        os: os,
        browser: browser,
        url: url,
        payload: errPayload
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
