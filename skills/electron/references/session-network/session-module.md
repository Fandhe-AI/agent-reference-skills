---
source: https://www.electronjs.org/docs/latest/api/session
---

# session module

Manage browser sessions, cookies, cache, proxy settings, etc.

## Signature / Usage

Process: Main

The `session` module can be used to create new `Session` objects.

You can also access the `session` of existing pages by using the `session` property of `WebContents`, or from the `session` module.

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

### Methods

```js
session.fromPartition(partition[, options])
session.fromPath(path[, options])
```

#### `session.fromPartition(partition[, options])`

Returns `Session` - A session instance from `partition` string. When there is an existing `Session` with the same `partition`, it will be returned; otherwise a new `Session` instance will be created with `options`.

If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. if there is no `persist:` prefix, the page will use an in-memory session. If the `partition` is empty then default session of the app will be returned.

To create a `Session` with `options`, you have to ensure the `Session` with the `partition` has never been used before. There is no way to change the `options` of an existing `Session` object.

| Name | Type | Description |
| --- | --- | --- |
| `partition` | string | Partition string. |
| `options` | Object (optional) | |
| `options.cache` | boolean | Whether to enable cache. Default is `true` unless the `--disable-http-cache` switch is used. |

#### `session.fromPath(path[, options])`

Returns `Session` - A session instance from the absolute path as specified by the `path` string. When there is an existing `Session` with the same absolute path, it will be returned; otherwise a new `Session` instance will be created with `options`. The call will throw an error if the path is not an absolute path. Additionally, an error will be thrown if an empty string is provided.

To create a `Session` with `options`, you have to ensure the `Session` with the `path` has never been used before. There is no way to change the `options` of an existing `Session` object.

| Name | Type | Description |
| --- | --- | --- |
| `path` | string | Absolute path. |
| `options` | Object (optional) | |
| `options.cache` | boolean | Whether to enable cache. Default is `true` unless the `--disable-http-cache` switch is used. |

### Properties

#### `session.defaultSession`

A `Session` object, the default session object of the app, available after `app.whenReady` is called.

### Class: Session

> Get and set properties of a session.

Process: Main

_This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

You can create a `Session` object in the `session` module:

```js
const { session } = require('electron')

const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

## Notes

* The `Session` class instance events, methods and properties are split across [session-events-downloads-extensions.md](./session-events-downloads-extensions.md), [session-events-devices.md](./session-events-devices.md), [session-methods-cache-proxy-network.md](./session-methods-cache-proxy-network.md), [session-methods-permissions.md](./session-methods-permissions.md), [session-methods-misc.md](./session-methods-misc.md) and [session-methods-extensions-properties.md](./session-methods-extensions-properties.md).
* This is the Electron `session` module (a browser profile: cookies, cache, proxy, permissions). It is not an authentication-session library; for auth sessions and cookies in an Electron app see better-auth (it has an Electron integration).

## Related

* [Cookies](./cookies.md)
* [session-events-downloads-extensions](./session-events-downloads-extensions.md)
* [session-methods-cache-proxy-network](./session-methods-cache-proxy-network.md)
