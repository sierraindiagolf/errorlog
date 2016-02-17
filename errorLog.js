(function () {
    var onsoleErrorBackup = console.error;

    window.logger = {
        version: '0.0.1',
        logger: {
            onError: undefined,
            send: undefined,
            log: [];
        }
    };

    if (console && console.error) {
        console.error = function (error) {
            consoleErrorBackup.apply(this, arguments);

            var splittedError = error.split('\n');
            var errTitle = splittedError[0];
            var errPayload = error;
            var windowWidth = document.documentElement.clientWidth;
            var windowHeight = document.documentElement.clientHeight;
            var os = navigator.platform;
            var browser = navigator.userAgent;
            // line number
            var lineColumn = splittedError[1];
            var pattern = /[\d]+\:[\d]+/;
            var errLineColumn = pattern.exec(lineColumn);
            var url = window.location.href;
            var clientId = Alcedo7Settings.selectedClient ? Alcedo7Settings.selectedClient.id : 0;
            var userId = Alcedo7Settings.currentUser ? Alcedo7Settings.currentUser.id : 0;

            var errorObj = {
                title: errTitle,
                lineColumn: errLineColumn[0],
                buildNumber: buildTag,
                applicationVersion: version,
                windowHeight: windowHeight,
                windowWidth: windowWidth,
                os: os,
                browser: browser,
                url: url,
                clientId: clientId,
                userId: userId,
                payload: errPayload
            };

            if (window.logger.onError) {
                window.logger.onError(orrorObj, error);
            }

            window.logger.log.push(errorObj);

            if (window.logger.send) {
                window.logger.send();
            }
        }
    }
})();
