---
source: https://www.electronjs.org/docs/latest/api/utility-process
---

# utilityProcess

`utilityProcess` creates a child process with Node.js and Message ports enabled. It is the equivalent of Node.js `child_process.fork` but uses the Chromium Services API to launch the child process. Process: Main.

## Signature / Usage

```js
// Main process
const { port1, port2 } = new MessageChannelMain()
const child = utilityProcess.fork(path.join(__dirname, 'test.js'))
child.postMessage({ message: 'hello' }, [port1])

// Child process
process.parentPort.once('message', (e) => {
  const [port] = e.ports
  // ...
})
```

## Methods

### `utilityProcess.fork(modulePath[, args][, options])`

Returns `UtilityProcess`. Can only be called after the `ready` event has been emitted on `App`.

| Option | Type | Description |
| --- | --- | --- |
| `modulePath` | string | Path to the script that runs as entrypoint in the child process. |
| `args` | string[] (optional) | Arguments available as `process.argv` in the child. |
| `options.env` | Object (optional) | Environment key-value pairs. Default is `process.env`. |
| `options.execArgv` | string[] (optional) | Arguments passed to the executable. |
| `options.cwd` | string (optional) | Current working directory of the child process. |
| `options.session` | Session (optional) | Session used for network requests. By default, requests use the system network context, which has no HTTP cache support; setting a session enables HTTP caching and other session-specific network features. |
| `options.partition` | string (optional) | Sets the session by partition string. A `persist:` prefix uses a persistent session shared by pages with the same partition; otherwise in-memory. Ignored if `session` is set. |
| `options.stdio` | (string[] \| string) (optional) | Mode for `stdout` and `stderr`; default `inherit`. Values: `pipe`, `ignore`, `inherit`. Only `stdout`/`stderr` can be configured; setting `stdin` to anything other than `ignore` is not supported and errors. `pipe` = `['ignore','pipe','pipe']`, `ignore` = `['ignore','ignore','ignore']`, `inherit` = `['ignore','inherit','inherit']`. |
| `options.serviceName` | string (optional) | Process name shown in the `name` property of `ProcessMetric` (from `app.getAppMetrics`) and the `child-process-gone` event of `app`. Default `Node Utility Process`. |
| `options.allowLoadingUnsignedLibraries` | boolean (optional, macOS) | Launches via the `Electron Helper (Plugin).app` helper, which can be codesigned with `com.apple.security.cs.disable-library-validation` and `com.apple.security.cs.allow-unsigned-executable-memory` entitlements, allowing unsigned libraries. Default `false`. |
| `options.disclaim` | boolean (optional, macOS) | Disclaims responsibility for the child process so the OS treats it as a separate entity for policies like TCC; the parent is not attributed for the child's TCC requests. Default `false`. |
| `options.respondToAuthRequestsFromMainProcess` | boolean (optional) | Lets HTTP 401/407 requests made via the `net` module be answered via the `login` event on the `UtilityProcess` (when a `session` is provided) or `app#login` (default system network context). Also routes client-certificate selection to `app#select-client-certificate`; without it, `net` requests proceed without a client certificate. Default `false`. |

## Class: UtilityProcess

Instances represent the Chromium-spawned child process with Node.js integration. It is an EventEmitter.

| Member | Description |
| --- | --- |
| `child.postMessage(message, [transfer])` | Sends a message to the child, optionally transferring `MessagePortMain[]`. |
| `child.kill()` | Returns `boolean`. Terminates gracefully (SIGTERM on POSIX, ensuring the process is reaped); true on success. |
| `child.pid` | `Integer \| undefined`. `undefined` until spawned and after `exit`. |
| `child.stdout` | `NodeJS.ReadableStream \| null`. `null` unless `options.stdio[1]` is `'pipe'`, and after exit. |
| `child.stderr` | `NodeJS.ReadableStream \| null`. `null` unless `options.stdio[2]` is `'pipe'`, and after exit. |

### Instance Events

| Event | Payload | Description |
| --- | --- | --- |
| `'spawn'` | — | Child has spawned successfully. |
| `'error'` _Experimental_ | `type` string (`FatalError`), `location` string, `report` string (Node.js diagnostic report) | Child needs to terminate due to a non-continuable V8 error. `exit` is emitted afterwards regardless. |
| `'exit'` | `code` number (waitpid on POSIX, GetExitCodeProcess on Windows) | Emitted after the child ends. |
| `'message'` | `message` any | Child sent a message via `process.parentPort.postMessage()`. |
| `'login'` | `event`, `authenticationResponseDetails` (`url`, `pid`, `isRequestForNavigation`, `firstAuthAttempt`, `responseHeaders?`), `authInfo` (`isProxy`, `scheme`, `host`, `port`, `realm`), `callback(username?, password?)` | HTTP 401/407 challenge when created with `respondToAuthRequestsFromMainProcess: true` and a `session`. Default cancels; call `event.preventDefault()` and `callback(username, password)`; `callback()` with no args cancels. |

```js
const { session, utilityProcess } = require('electron')

const ses = session.defaultSession
const child = utilityProcess.fork('./worker.js', [], {
  session: ses,
  respondToAuthRequestsFromMainProcess: true
})

child.on('login', (event, authenticationResponseDetails, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'password')
})
```

```js
const child = utilityProcess.fork(path.join(__dirname, 'test.js'))

console.log(child.pid) // undefined

child.on('spawn', () => {
  console.log(child.pid) // Integer
})

child.on('exit', () => {
  console.log(child.pid) // undefined
})
```

## Notes

- `child.pid` can be used to determine if the process is currently running.
- Inside the child, use `process.parentPort` (see parentPort).
- The `login` event is scoped to the individual utility process and otherwise behaves like the `login` event on `app`.
- Not the same as Node.js `child_process.fork` (which `utilityProcess` mirrors); worker/job-queue concepts such as bullmq workers are unrelated.

## Related

- [parentPort](./parent-port.md)
- [MessagePortMain](./message-port-main.md)
- [Multithreading](./multithreading.md)
