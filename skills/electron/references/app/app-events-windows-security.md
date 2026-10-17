---
source: https://www.electronjs.org/docs/latest/api/app#event-browser-window-blur
---

# app Events: windows, certificates, login, child processes

Events of `app` for BrowserWindow / WebContents creation and focus, certificate and basic-auth handling, GPU / process-gone notifications, accessibility, session creation and second instances. Process: Main.

## Signature / Usage

```js
const { app } = require('electron')

// Pre-trusted certificate fingerprint (placeholder; replace with your pinned value)
const TRUSTED_FINGERPRINT = 'sha256/...'

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url.startsWith('https://example.com/') && certificate.fingerprint === TRUSTED_FINGERPRINT) {
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

## Events

### Event: 'browser-window-blur'

Returns: `event` Event, `window` BrowserWindow. Emitted when a browserWindow gets blurred.

### Event: 'browser-window-focus'

Returns: `event` Event, `window` BrowserWindow. Emitted when a browserWindow gets focused.

### Event: 'browser-window-created'

Returns: `event` Event, `window` BrowserWindow. Emitted when a new browserWindow is created.

### Event: 'web-contents-created'

Returns: `event` Event, `webContents` WebContents. Emitted when a new webContents is created.

### Event: 'certificate-error'

Returns:

* `event` Event
* `webContents` WebContents
* `url` string
* `error` string - The error code
* `certificate` Certificate
* `callback` Function
  * `isTrusted` boolean - Whether to consider the certificate as trusted
* `isMainFrame` boolean

Emitted when failed to verify the `certificate` for `url`, to trust the certificate you should prevent the default behavior with `event.preventDefault()` and call `callback(true)`.

### Event: 'select-client-certificate'

Returns:

* `event` Event
* `webContents` WebContents | null
* `url` URL
* `certificateList` Certificate[]
* `callback` Function
  * `certificate` Certificate (optional)

Emitted when a client certificate is requested. The `url` corresponds to the navigation entry requesting the client certificate and `callback` can be called with an entry filtered from the list. Using `event.preventDefault()` prevents the application from using the first certificate from the store.

`webContents` is `null` when the request does not originate from a renderer process, for example when using `net.request` or `net.fetch` in the main process, or from a utility process created with `respondToAuthRequestsFromMainProcess: true`. For utility processes created without that flag, `net` requests proceed without a client certificate and this event is not emitted.

```js
const { app } = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### Event: 'login'

Returns:

* `event` Event
* `webContents` WebContents | null
* `authenticationResponseDetails` Object
  * `url` URL
  * `pid` number
  * `isRequestForNavigation` boolean - Indicates whether the request is for a navigation.
  * `firstAuthAttempt` boolean - Indicates whether this is the first authentication attempt.
  * `responseHeaders` Record\<string, string | string[]\> (optional) - The headers returned in the response.
* `authInfo` Object
  * `isProxy` boolean
  * `scheme` string
  * `host` string
  * `port` Integer
  * `realm` string
* `callback` Function
  * `username` string (optional)
  * `password` string (optional)

Emitted when `webContents` or Utility process wants to do basic auth. The default behavior is to cancel all authentications. To override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials. If `callback` is called without a username or password, the authentication request will be cancelled and the authentication error will be returned to the page.

```js
const { app } = require('electron')

app.on('login', (event, webContents, details, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Event: 'gpu-info-update'

Emitted whenever there is a GPU info update.

### Event: 'render-process-gone'

Returns: `event` Event, `webContents` WebContents, `details` RenderProcessGoneDetails. Emitted when the renderer process unexpectedly disappears. This is normally because it was crashed or killed.

### Event: 'child-process-gone'

Returns:

* `event` Event
* `details` Object
  * `type` string - Process type. One of: `Utility`, `Zygote`, `Sandbox helper`, `GPU`, `Pepper Plugin`, `Pepper Plugin Broker`, `Unknown`
  * `reason` string - The reason the child process is gone. Possible values:
    * `clean-exit` - Process exited with an exit code of zero
    * `abnormal-exit` - Process exited with a non-zero exit code
    * `killed` - Process was sent a SIGTERM or otherwise killed externally
    * `crashed` - Process crashed
    * `oom` - Process ran out of memory
    * `launch-failed` - Process never successfully launched
    * `integrity-failure` - Windows code integrity checks failed
    * `memory-eviction` - Process proactively terminated to prevent a future out-of-memory (OOM) situation
  * `exitCode` number - The exit code for the process (e.g. status from waitpid if on POSIX, from GetExitCodeProcess on Windows), unless `reason` is `launch-failed`, in which case `exitCode` will be a platform-specific launch failure error code.
  * `systemErrorCode` number (optional) _Windows_ - The Windows system error code (`GetLastError()`) of the failed launch. Only set when `reason` is `launch-failed`.
  * `serviceName` string (optional) - The non-localized name of the process.
  * `name` string (optional) - The name of the process. Examples for utility: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.

Emitted when the child process unexpectedly disappears. This is normally because it was crashed or killed, or because it failed to launch. It does not include renderer processes.

### Event: 'accessibility-support-changed' _macOS_ _Windows_

Returns:

* `event` Event
* `accessibilitySupportEnabled` boolean - `true` when Chromium's accessibility support is enabled, `false` otherwise.

Emitted when Chromium's accessibility support changes. This event fires when assistive technologies, such as screen readers, are enabled or disabled.

### Event: 'session-created'

Returns: `session` Session. Emitted when Electron has created a new `session`.

```js
const { app } = require('electron')

app.on('session-created', (session) => {
  console.log(session)
})
```

### Event: 'second-instance'

Returns:

* `event` Event
* `argv` string[] - An array of the second instance's command line arguments
* `workingDirectory` string - The second instance's working directory
* `additionalData` unknown - A JSON object of additional data passed from the second instance

This event will be emitted inside the primary instance of your application when a second instance has been executed and calls `app.requestSingleInstanceLock()`. `argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

This event is guaranteed to be emitted after the `ready` event of `app` gets emitted.

## Notes

* `argv` will not be exactly the same list of arguments as those passed to the second instance. The order might change and additional arguments might be appended. If you need to maintain the exact same arguments, use `additionalData` instead.
* If the second instance is started by a different user than the first, the `argv` array will not include the arguments.
* Extra command line arguments might be added by Chromium, such as `--original-process-start-time`.
* The official `certificate-error` example decides on the URL alone; the snippet above instead checks the certificate's `fingerprint` (a documented `Certificate` field) against a pre-trusted value. Calling `callback(true)` without verifying the certificate allows man-in-the-middle attacks.
* `login` here is HTTP basic auth for Electron web contents / utility processes, not application user authentication. For app-level sign-in with Electron see better-auth; for server-side Request handling see fastify / hono.

## Related

* [app Events: lifecycle and macOS](./app-events-lifecycle.md)
* [app Jump List, User Tasks and Single Instance Lock](./app-jump-list-single-instance.md)
