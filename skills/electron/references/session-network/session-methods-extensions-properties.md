---
source: https://www.electronjs.org/docs/latest/api/session#sesloadextensionpath-options-deprecated
---

# Session methods: extensions (deprecated), clearData; instance properties

Deprecated extension methods on `Session`, `ses.getStoragePath()`, `ses.clearData()` and the `Session` instance properties.

## Signature / Usage

Process: Main

```js
const { app, session } = require('electron')

const path = require('node:path')

app.whenReady().then(async () => {
  await session.defaultSession.loadExtension(
    path.join(__dirname, 'react-devtools'),
    // allowFileAccess is required to load the DevTools extension on file:// URLs.
    { allowFileAccess: true }
  )
  // Note that in order to use the React DevTools extension, you'll need to
  // download and unzip a copy of the extension.
})
```

### `ses.loadExtension(path[, options])` _Deprecated_

* `path` string - Path to a directory containing an unpacked Chrome extension
* `options` Object (optional)
  * `allowFileAccess` boolean - Whether to allow the extension to read local files over `file://` protocol and inject content scripts into `file://` pages. This is required e.g. for loading DevTools extensions on `file://` URLs. Defaults to false.

Returns `Promise<Extension>` - resolves when the extension is loaded.

This method will raise an exception if the extension could not be loaded. If there are warnings when installing the extension (e.g. if the extension requests an API that Electron does not support) then they will be logged to the console.

Note that Electron does not support the full range of Chrome extensions APIs. See [Supported Extensions APIs](./extensions.md) for more details on what is supported.

Note that in previous versions of Electron, extensions that were loaded would be remembered for future runs of the application. This is no longer the case: `loadExtension` must be called on every boot of your app if you want the extension to be loaded.

This API does not support loading packed (.crx) extensions.

> NOTE: This API cannot be called before the `ready` event of the `app` module is emitted.

> NOTE: Loading extensions into in-memory (non-persistent) sessions is not supported and will throw an error.

**Deprecated:** Use the new `ses.extensions.loadExtension` API.

### `ses.removeExtension(extensionId)` _Deprecated_

* `extensionId` string - ID of extension to remove

Unloads an extension.

> NOTE: This API cannot be called before the `ready` event of the `app` module is emitted.

**Deprecated:** Use the new `ses.extensions.removeExtension` API.

### `ses.getExtension(extensionId)` _Deprecated_

* `extensionId` string - ID of extension to query

Returns `Extension | null` - The loaded extension with the given ID.

> NOTE: This API cannot be called before the `ready` event of the `app` module is emitted.

**Deprecated:** Use the new `ses.extensions.getExtension` API.

### `ses.getAllExtensions()` _Deprecated_

Returns `Extension[]` - A list of all loaded extensions.

> NOTE: This API cannot be called before the `ready` event of the `app` module is emitted.

**Deprecated:** Use the new `ses.extensions.getAllExtensions` API.

### `ses.getStoragePath()`

Returns `string | null` - The absolute file system path where data for this session is persisted on disk. For in memory sessions this returns `null`.

### `ses.clearData([options])`

* `options` Object (optional)
  * `dataTypes` String[] (optional) - The types of data to clear. By default, this will clear all types of data. This can potentially include data types not explicitly listed here. (See Chromium's [`BrowsingDataRemover`](https://source.chromium.org/chromium/chromium/src/+/main:content/public/browser/browsing_data_remover.h) for the full list.)
    * `backgroundFetch` - Background Fetch
    * `cache` - Cache (includes `cachestorage` and `shadercache`)
    * `cookies` - Cookies
    * `downloads` - Downloads
    * `fileSystems` - File Systems
    * `indexedDB` - IndexedDB
    * `localStorage` - Local Storage
    * `serviceWorkers` - Service Workers
    * `webSQL` - WebSQL
  * `origins` String[] (optional) - Clear data for only these origins. Cannot be used with `excludeOrigins`.
  * `excludeOrigins` String[] (optional) - Clear data for all origins except these ones. Cannot be used with `origins`.
  * `avoidClosingConnections` boolean (optional) - Skips deleting cookies that would close current network connections. (Default: `false`)
  * `originMatchingMode` String (optional) - The behavior for matching data to origins.
    * `third-parties-included` (default) - Storage is matched on origin in first-party contexts and top-level-site in third-party contexts.
    * `origin-in-all-contexts` - Storage is matched on origin only in all contexts.

Returns `Promise<void>` - resolves when all data has been cleared.

Clears various different types of data.

This method clears more types of data and is more thorough than the `clearStorageData` method.

> NOTE: Cookies are stored at a broader scope than origins. When removing cookies and filtering by `origins` (or `excludeOrigins`), the cookies will be removed at the [registrable domain](https://url.spec.whatwg.org/#host-registrable-domain) level. For example, clearing cookies for the origin `https://really.specific.origin.example.com/` will end up clearing all cookies for `example.com`. Clearing cookies for the origin `https://my.website.example.co.uk/` will end up clearing all cookies for `example.co.uk`.

> NOTE: Clearing cache data will also clear the shared dictionary cache. This means that any dictionaries used for compression may be reloaded after clearing the cache. If you wish to clear the shared dictionary cache but leave other cached data intact, you may want to use the `clearSharedDictionaryCache` method.

For more information, refer to Chromium's [`BrowsingDataRemover` interface](https://source.chromium.org/chromium/chromium/src/+/main:content/public/browser/browsing_data_remover.h).

### Instance Properties

The following properties are available on instances of `Session`:

#### `ses.availableSpellCheckerLanguages` _Readonly_

A `string[]` array which consists of all the known available spell checker languages. Providing a language code to the `setSpellCheckerLanguages` API that isn't in this array will result in an error.

#### `ses.spellCheckerEnabled`

A `boolean` indicating whether builtin spell checker is enabled.

#### `ses.storagePath` _Readonly_

A `string | null` indicating the absolute file system path where data for this session is persisted on disk. For in memory sessions this returns `null`.

#### `ses.cookies` _Readonly_

A [`Cookies`](./cookies.md) object for this session.

#### `ses.extensions` _Readonly_

A [`Extensions`](./extensions-api.md) object for this session.

#### `ses.serviceWorkers` _Readonly_

A [`ServiceWorkers`](./service-workers.md) object for this session.

#### `ses.webRequest` _Readonly_

A [`WebRequest`](./web-request.md) object for this session.

#### `ses.protocol` _Readonly_

A `Protocol` object for this session (see [protocol-handle.md](./protocol-handle.md)).

```js
const { app, session } = require('electron')

const path = require('node:path')

app.whenReady().then(() => {
  const protocol = session.fromPartition('some-partition').protocol
  if (
    !protocol.registerFileProtocol('atom', (request, callback) => {
      const root = __dirname
      const filePath = request.url.slice('atom://'.length)
      const target = path.resolve(root, '.' + path.sep + decodeURIComponent(filePath))
      const relative = path.relative(root, target)
      if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) {
        return callback({ error: -6 })
      }
      callback({ path: target })
    })
  ) {
    console.error('Failed to register protocol')
  }
})
```

#### `ses.netLog` _Readonly_

A [`NetLog`](./net-log.md) object for this session.

```js
const { app, session } = require('electron')

app.whenReady().then(async () => {
  const netLog = session.fromPartition('some-partition').netLog
  netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```

## Notes

* Adapted (not in the official docs): the official example joins the URL path onto __dirname without confining it, so atom://../secret.txt escapes the root; this page rejects resolved paths outside the root via path.relative / path.isAbsolute.
* `ses.loadExtension`, `ses.removeExtension`, `ses.getExtension`, `ses.getAllExtensions` are _Deprecated_; use `ses.extensions.*` ([extensions-api.md](./extensions-api.md)).
* The `ses.protocol` example uses `registerFileProtocol`, which is itself _Deprecated_ in favor of `protocol.handle` (see [protocol-legacy-register-intercept.md](./protocol-legacy-register-intercept.md)).

## Related

* [session-module](./session-module.md)
* [extensions](./extensions.md)
* [extensions-api](./extensions-api.md)
* [cookies](./cookies.md)
* [web-request](./web-request.md)
* [net-log](./net-log.md)
