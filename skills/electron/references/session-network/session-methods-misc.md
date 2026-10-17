---
source: https://www.electronjs.org/docs/latest/api/session#sesclearhostresolvercache
---

# Session methods: user agent, SSL, downloads, preload scripts, code cache, shared dictionary, spellchecker

Instance methods of `Session` for host resolver cache, NTLM, user agent, SSL config, downloads, preload scripts, V8 code cache, shared dictionaries and the built-in spellchecker.

## Signature / Usage

Process: Main

```js
const { session } = require('electron')
// consider any url ending with `example.com`, `foobar.com`, `baz`
// for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')

// consider all urls for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

### `ses.clearHostResolverCache()`

Returns `Promise<void>` - Resolves when the operation is complete.

Clears the host resolver cache.

### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` string - A comma-separated list of servers for which integrated authentication is enabled.

Dynamically sets whether to always send credentials for HTTP NTLM or Negotiate authentication.

### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` string
* `acceptLanguages` string (optional)

Overrides the `userAgent` and `acceptLanguages` for this session.

The `acceptLanguages` must be a comma separated ordered list of language codes, for example `"en-US,fr,de,ko,zh-CN,ja"`.

This doesn't affect existing `WebContents`, and each `WebContents` can use `webContents.setUserAgent` to override the session-wide user agent.

### `ses.isPersistent()`

Returns `boolean` - Whether or not this session is a persistent one. The default `webContents` session of a `BrowserWindow` is persistent. When creating a session from a partition, session prefixed with `persist:` will be persistent, while others will be temporary.

### `ses.getUserAgent()`

Returns `string` - The user agent for this session.

### `ses.setSSLConfig(config)`

* `config` Object
  * `minVersion` string (optional) - Can be `tls1.2` or `tls1.3`. The minimum SSL version to allow when connecting to remote servers. Defaults to `tls1.2`.
  * `maxVersion` string (optional) - Can be `tls1.2` or `tls1.3`. The maximum SSL version to allow when connecting to remote servers. Defaults to `tls1.3`.
  * `disabledCipherSuites` Integer[] (optional) - List of cipher suites which should be explicitly prevented from being used in addition to those disabled by the net built-in policy. Supported literal forms: 0xAABB, where AA is `cipher_suite[0]` and BB is `cipher_suite[1]`, as defined in RFC 2246, Section 7.4.1.2. Unrecognized but parsable cipher suites in this form will not return an error. Ex: To disable TLS_RSA_WITH_RC4_128_MD5, specify 0x0004, while to disable TLS_ECDH_ECDSA_WITH_RC4_128_SHA, specify 0xC002. Note that TLSv1.3 ciphers cannot be disabled using this mechanism.

Sets the SSL configuration for the session. All subsequent network requests will use the new configuration. Existing network connections (such as WebSocket connections) will not be terminated, but old sockets in the pool will not be reused for new connections.

### `ses.getBlobData(identifier)`

* `identifier` string - Valid UUID.

Returns `Promise<Buffer>` - resolves with blob data.

### `ses.downloadURL(url[, options])`

* `url` string
* `options` Object (optional)
  * `headers` Record\<string, string\> (optional) - HTTP request headers.

Initiates a download of the resource at `url`. The API will generate a [DownloadItem](./download-item.md) that can be accessed with the [will-download](./session-events-downloads-extensions.md) event.

> NOTE: This does not perform any security checks that relate to a page's origin, unlike `webContents.downloadURL` (https://www.electronjs.org/docs/latest/api/web-contents#contentsdownloadurlurl-options).

### `ses.createInterruptedDownload(options)`

* `options` Object
  * `path` string - Absolute path of the download.
  * `urlChain` string[] - Complete URL chain for the download.
  * `mimeType` string (optional)
  * `offset` Integer - Start range for the download.
  * `length` Integer - Total length of the download.
  * `lastModified` string (optional) - Last-Modified header value.
  * `eTag` string (optional) - ETag header value.
  * `startTime` Double (optional) - Time when download was started in number of seconds since UNIX epoch.

Allows resuming `cancelled` or `interrupted` downloads from previous `Session`. The API will generate a [DownloadItem](./download-item.md) that can be accessed with the [will-download](./session-events-downloads-extensions.md) event. The [DownloadItem](./download-item.md) will not have any `WebContents` associated with it and the initial state will be `interrupted`. The download will start only when the `resume` API is called on the [DownloadItem](./download-item.md).

### `ses.clearAuthCache()`

Returns `Promise<void>` - resolves when the session’s HTTP authentication cache has been cleared.

### `ses.setPreloads(preloads)` _Deprecated_

* `preloads` string[] - An array of absolute path to preload scripts

Adds scripts that will be executed on ALL web contents that are associated with this session just before normal `preload` scripts run.

**Deprecated:** Use the new `ses.registerPreloadScript` API.

### `ses.getPreloads()` _Deprecated_

Returns `string[]` an array of paths to preload scripts that have been registered.

**Deprecated:** Use the new `ses.getPreloadScripts` API. This will only return preload script paths for `frame` context types.

### `ses.registerPreloadScript(script)`

* `script` [PreloadScriptRegistration](./session-structures.md) - Preload script

Registers preload script that will be executed in its associated context type in this session. For `frame` contexts, this will run prior to any preload defined in the web preferences of a WebContents.

Returns `string` - The ID of the registered preload script.

### `ses.unregisterPreloadScript(id)`

* `id` string - Preload script ID

Unregisters script.

### `ses.getPreloadScripts()`

Returns [`PreloadScript[]`](./session-structures.md): An array of paths to preload scripts that have been registered.

### `ses.setCodeCachePath(path)`

* `path` String - Absolute path to store the v8 generated JS code cache from the renderer.

Sets the directory to store the generated JS [code cache](https://v8.dev/blog/code-caching-for-devs) for this session. The directory is not required to be created by the user before this call, the runtime will create if it does not exist otherwise will use the existing directory. If directory cannot be created, then code cache will not be used and all operations related to code cache will fail silently inside the runtime. By default, the directory will be `Code Cache` under the respective user data folder.

Note that by default code cache is only enabled for http(s) URLs, to enable code cache for custom protocols, `codeCache: true` and `standard: true` must be specified when registering the protocol.

### `ses.clearCodeCaches(options)`

* `options` Object
  * `urls` String[] (optional) - An array of url corresponding to the resource whose generated code cache needs to be removed. If the list is empty then all entries in the cache directory will be removed.

Returns `Promise<void>` - resolves when the code cache clear operation is complete.

### `ses.getSharedDictionaryUsageInfo()`

Returns `Promise<SharedDictionaryUsageInfo[]>` - an array of shared dictionary information entries in Chromium's networking service's storage.

Shared dictionaries are used to power advanced compression of data sent over the wire, specifically with Brotli and ZStandard. You don't need to call any of the shared dictionary APIs in Electron to make use of this advanced web feature, but if you do, they allow deeper control and inspection of the shared dictionaries used during decompression.

To get detailed information about a specific shared dictionary entry, call `getSharedDictionaryInfo(options)`.

### `ses.getSharedDictionaryInfo(options)`

* `options` Object
  * `frameOrigin` string - The origin of the frame where the request originates. It’s specific to the individual frame making the request and is defined by its scheme, host, and port. In practice, will look like a URL.
  * `topFrameSite` string - The site of the top-level browsing context (the main frame or tab that contains the request). It’s less granular than `frameOrigin` and focuses on the broader "site" scope. In practice, will look like a URL.

Returns `Promise<SharedDictionaryInfo[]>` - an array of shared dictionary information entries in Chromium's networking service's storage.

To get information about all present shared dictionaries, call `getSharedDictionaryUsageInfo()`.

### `ses.clearSharedDictionaryCache()`

Returns `Promise<void>` - resolves when the dictionary cache has been cleared, both in memory and on disk.

### `ses.clearSharedDictionaryCacheForIsolationKey(options)`

* `options` Object
  * `frameOrigin` string - The origin of the frame where the request originates. It’s specific to the individual frame making the request and is defined by its scheme, host, and port. In practice, will look like a URL.
  * `topFrameSite` string - The site of the top-level browsing context (the main frame or tab that contains the request). It’s less granular than `frameOrigin` and focuses on the broader "site" scope. In practice, will look like a URL.

Returns `Promise<void>` - resolves when the dictionary cache has been cleared for the specified isolation key, both in memory and on disk.

### `ses.setSpellCheckerEnabled(enable)`

* `enable` boolean

Sets whether to enable the builtin spell checker.

### `ses.isSpellCheckerEnabled()`

Returns `boolean` - Whether the builtin spell checker is enabled.

### `ses.setSpellCheckerLanguages(languages)`

* `languages` string[] - An array of language codes to enable the spellchecker for.

The built in spellchecker does not automatically detect what language a user is typing in. In order for the spell checker to correctly check their words you must call this API with an array of language codes. You can get the list of supported language codes with the `ses.availableSpellCheckerLanguages` property.

> NOTE: On macOS, the OS spellchecker is used and will detect your language automatically. This API is a no-op on macOS.

### `ses.getSpellCheckerLanguages()`

Returns `string[]` - An array of language codes the spellchecker is enabled for. If this list is empty the spellchecker will fallback to using `en-US`. By default on launch if this setting is an empty list Electron will try to populate this setting with the current OS locale. This setting is persisted across restarts.

> NOTE: On macOS, the OS spellchecker is used and has its own list of languages. On macOS, this API will return whichever languages have been configured by the OS.

### `ses.setSpellCheckerDictionaryDownloadURL(url)`

* `url` string - A base URL for Electron to download hunspell dictionaries from.

By default Electron will download hunspell dictionaries from the Chromium CDN. If you want to override this behavior you can use this API to point the dictionary downloader at your own hosted version of the hunspell dictionaries. We publish a `hunspell_dictionaries.zip` file with each release which contains the files you need to host here.

The file server must be **case insensitive**. If you cannot do this, you must upload each file twice: once with the case it has in the ZIP file and once with the filename as all lowercase.

If the files present in `hunspell_dictionaries.zip` are available at `https://example.com/dictionaries/language-code.bdic` then you should call this api with `ses.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')`. Please note the trailing slash. The URL to the dictionaries is formed as `${url}${filename}`.

> NOTE: On macOS, the OS spellchecker is used and therefore we do not download any dictionary files. This API is a no-op on macOS.

### `ses.listWordsInSpellCheckerDictionary()`

Returns `Promise<string[]>` - An array of all words in app's custom dictionary. Resolves when the full dictionary is loaded from disk.

### `ses.addWordToSpellCheckerDictionary(word)`

* `word` string - The word you want to add to the dictionary

Returns `boolean` - Whether the word was successfully written to the custom dictionary. This API will not work on non-persistent (in-memory) sessions.

> NOTE: On macOS and Windows, this word will be written to the OS custom dictionary as well.

### `ses.removeWordFromSpellCheckerDictionary(word)`

* `word` string - The word you want to remove from the dictionary

Returns `boolean` - Whether the word was successfully removed from the custom dictionary. This API will not work on non-persistent (in-memory) sessions.

> NOTE: On macOS and Windows, this word will be removed from the OS custom dictionary as well.

## Notes

* `ses.setPreloads` and `ses.getPreloads` are _Deprecated_; use `ses.registerPreloadScript` / `ses.getPreloadScripts` (note `getPreloadScripts` is the replacement for `getPreloads`, which only returned `frame` context paths).
* Breaking (v44): a `chrome-extension://` document used to receive the window's preload script (and session preload scripts) wherever it was embedded; it now only does so when it is a top-level frame or is hosted inside the DevTools front-end (a `devtools_page` or panel). An extension frame embedded in an ordinary page is treated like any other subframe and follows `nodeIntegrationInSubFrames` ([breaking-changes-v44](../breaking-changes/breaking-changes-v44.md)).
* `ses.setSpellCheckerLanguages`, `ses.setSpellCheckerDictionaryDownloadURL` are no-ops on macOS (the OS spellchecker is used).

## Related

* [session-module](./session-module.md)
* [DownloadItem](./download-item.md)
* [session-structures](./session-structures.md)
* [protocol-handle](./protocol-handle.md)
