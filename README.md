# errorlog

. A simple console.error override written in pure javascript.

## How to use ?

Make sure you include errorLog.js in your page. Recommended as first file that loads.
Set up the snippet to transport data back to you server.

## Installation
<code>bower install errorlog</code>

<code>npm install errorlog-browser</code>

## API

### onError(error, log)
Callback that enables you to decorade the error object that is beeing collected.
By default this object will look like this :
<code> 
 var errorObj = {
                title: errTitle,
                lineColumn: errLineColumn[0],
                windowHeight: windowHeight,
                windowWidth: windowWidth,
                os: os,
                browser: browser,
                url: url,
                payload: errPayload
            };
</code>

#### Example
<code>
  errorLogger.logger.onError = function (errorObj, originalError) { //do stuf here... }
</code>


### Send
You have to implement this method yourself. This snippet is completely agnostic to any transport.
You have access to the collected errors in the <pre>errorLogger.logger.log</pre> array.

#### Example
<code>
  errorLogger.logger.send = function () { XHR(errorLogger.logger.log) }
</code>
