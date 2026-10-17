---
source: https://www.electronjs.org/docs/latest/api/protocol
---

# protocol: handle, registerSchemesAsPrivileged, registerSource

Register a custom protocol and intercept existing protocol requests.

## Signature / Usage

Process: Main

An example of implementing a protocol that has the same effect as the `file://` protocol:

```js
const { app, protocol, net } = require('electron')

const path = require('node:path')
const url = require('node:url')

app.whenReady().then(() => {
  protocol.handle('atom', (request) => {
    const filePath = request.url.slice('atom://'.length)
    return net.fetch(url.pathToFileURL(path.join(__dirname, filePath)).toString())
  })
})
```

> NOTE: All methods unless specified can only be used after the `ready` event of the `app` module gets emitted.

### Using `protocol` with a custom `partition` or `session`

A protocol is registered to a specific Electron [`session`](./session-module.md) object. If you don't specify a session, then your `protocol` will be applied to the default session that Electron uses. However, if you define a `partition` or `session` on your `browserWindow`'s `webPreferences`, then that window will use a different session and your custom protocol will not work if you just use `electron.protocol.XXX`.

To have your custom protocol work in combination with a custom session, you need to register it to that session explicitly.

```js
const { app, BrowserWindow, net, protocol, session } = require('electron')

const path = require('node:path')
const url = require('node:url')

app.whenReady().then(() => {
  const partition = 'persist:example'
  const ses = session.fromPartition(partition)

  ses.protocol.handle('atom', (request) => {
    const filePath = request.url.slice('atom://'.length)
    return net.fetch(url.pathToFileURL(path.resolve(__dirname, filePath)).toString())
  })

  const mainWindow = new BrowserWindow({ webPreferences: { partition } })
})
```

### Protocol names

[RFC 3986](https://www.rfc-editor.org/rfc/rfc3986#section-3.1) defines what a valid protocol name is:

> Scheme names consist of a sequence of characters beginning with a letter and followed by any combination of letters, digits, plus ("+"), period ("."), or hyphen ("-"). Although schemes are case-insensitive, the canonical form is lowercase […].

### Methods

The `protocol` module has the following methods:

#### `protocol.registerSchemesAsPrivileged(customSchemes)`

* `customSchemes` [CustomScheme[]](./protocol-structures.md)

> NOTE: This method can only be used before the `ready` event of the `app` module gets emitted and can be called only once.

Registers the `scheme` as standard, secure, bypasses content security policy for resources, allows registering ServiceWorker, supports fetch API, streaming video/audio, and V8 code cache. Specify a privilege with the value of `true` to enable the capability.

An example of registering a privileged scheme, that bypasses Content Security Policy:

```js
const { protocol } = require('electron')

protocol.registerSchemesAsPrivileged([{ scheme: 'foo', privileges: { bypassCSP: true } }])
```

A standard scheme adheres to what RFC 3986 calls [generic URI syntax](https://tools.ietf.org/html/rfc3986#section-3). For example `http` and `https` are standard schemes, while `file` is not.

Registering a scheme as standard allows relative and absolute resources to be resolved correctly when served. Otherwise the scheme will behave like the `file` protocol, but without the ability to resolve relative URLs.

For example when you load following page with custom protocol without registering it as standard scheme, the image will not be loaded because non-standard schemes can not recognize relative URLs:

```html
<body>
  <img src='test.png'>
</body>
```

Registering a scheme as standard will allow access to files through the [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem). Otherwise the renderer will throw a security error for the scheme.

By default web storage apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) are disabled for non standard schemes. So in general if you want to register a custom protocol to replace the `http` protocol, you have to register it as a standard scheme.

Protocols that use streams (http and stream protocols) should set `stream: true`. The `<video>` and `<audio>` HTML elements expect protocols to buffer their responses by default. The `stream` flag configures those elements to correctly expect streaming responses.

#### `protocol.handle(scheme, handler)`

* `scheme` string - scheme to handle, for example `https` or `my-app`. This is the bit before the `:` in a URL.
* `handler` Function\<[GlobalResponse](https://nodejs.org/api/globals.html#response) | Promise\<GlobalResponse\>\>
  * `request` [GlobalRequest](https://nodejs.org/api/globals.html#request)

Register a protocol handler for `scheme`. Requests made to URLs with this scheme will delegate to this handler to determine what response should be sent.

In addition to the standard `Request` fields, `request.initiatorOrigin` is set to the origin that issued the request (for example `https://example.com`, or `null` for an opaque origin) when web content made it; it is absent for requests the browser started itself. Unlike `request.referrer` it is not controlled by the requesting page, so prefer it when deciding whether to serve a request.

Either a `Response` or a `Promise<Response>` can be returned.

Example:

```js
const { app, net, protocol } = require('electron')

const path = require('node:path')
const { pathToFileURL } = require('node:url')

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true
    }
  }
])

app.whenReady().then(() => {
  protocol.handle('app', (req) => {
    const { host, pathname } = new URL(req.url)
    if (host === 'bundle') {
      if (pathname === '/') {
        return new Response('<h1>hello, world</h1>', {
          headers: { 'content-type': 'text/html' }
        })
      }
      // NB, this checks for paths that escape the bundle, e.g.
      // app://bundle/../../secret_file.txt
      const pathToServe = path.resolve(__dirname, pathname)
      const relativePath = path.relative(__dirname, pathToServe)
      const isSafe = relativePath && !relativePath.startsWith('..') && !path.isAbsolute(relativePath)
      if (!isSafe) {
        return new Response('bad', {
          status: 400,
          headers: { 'content-type': 'text/html' }
        })
      }

      return net.fetch(pathToFileURL(pathToServe).toString())
    } else if (host === 'api') {
      return net.fetch('https://api.my-server.com/' + pathname, {
        method: req.method,
        headers: req.headers,
        body: req.body
      })
    }
  })
})
```

See the MDN docs for [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) and [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) for more details.

#### `protocol.unhandle(scheme)`

* `scheme` string - scheme for which to remove the handler.

Removes a protocol handler registered with `protocol.handle` or a source registered with `protocol.registerSource`.

#### `protocol.registerSource(scheme, source)` _Experimental_

* `scheme` string - a custom scheme registered with `protocol.registerSchemesAsPrivileged`.
* `source` [ProtocolSource](./protocol-structures.md)

Serves `scheme` from directories on disk without a JavaScript handler. Each request is matched against `routes` (a route with a `host` wins over one without, then the longest `path` prefix wins), the rest of the URL's path is resolved inside that route's `root`, and the file is streamed to the requester the way `file:` URLs are, including from `asar` archives, with `Content-Type` taken from the file extension. A path that resolves outside `root`, a missing file, a request that matches no route, or a method other than `GET`/`HEAD` fails with `net::ERR_FILE_NOT_FOUND`. A URL whose path ends in `/` serves the route's `index` file.

Use this instead of `protocol.handle` when a scheme only serves an app's own bundled files: no request touches the main thread, so pages and their subresources load at the same speed whether or not the main process is busy.

```js
const { app, protocol } = require('electron')
const path = require('node:path')

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true } }
])

app.whenReady().then(() => {
  protocol.registerSource('app', {
    routes: [
      {
        match: { host: 'bundle', path: '/assets/' },
        source: { type: 'directory', root: path.join(process.resourcesPath, 'assets') }
      },
      {
        match: { host: 'bundle' },
        source: {
          type: 'directory',
          root: path.join(app.getAppPath(), 'dist'),
          headers: { 'Cross-Origin-Opener-Policy': 'same-origin' }
        }
      }
    ]
  })
})
```

A scheme has either a handler or a source; `protocol.unhandle` removes either, and `protocol.isProtocolHandled` reports both. `webRequest` listeners apply to these requests as to any other.

#### `protocol.getSource(scheme)` _Experimental_

* `scheme` string

Returns [`ProtocolSource | null`](./protocol-structures.md) - The source registered for `scheme` with `protocol.registerSource`, or `null`.

#### `protocol.isProtocolHandled(scheme)`

* `scheme` string

Returns `boolean` - Whether `scheme` already has a handler or a source.

## Notes

* `protocol.registerSource` and `protocol.getSource` are _Experimental_ in the source.
* The legacy `protocol.register*Protocol` / `protocol.intercept*Protocol` methods are _Deprecated_ in favor of `protocol.handle`; see [protocol-legacy-register-intercept.md](./protocol-legacy-register-intercept.md).
* The `protocol.handle` request handler is invoked by Electron for in-app custom-scheme URLs (and can proxy via `net.fetch`); it is not an HTTP server routing API (for server-side HTTP see fastify / hono).
* Examples use `net.fetch` (see [net.md](./net.md)) and the `webRequest` listeners ([web-request.md](./web-request.md)) apply to these requests.

## Related

* [protocol-legacy-register-intercept](./protocol-legacy-register-intercept.md)
* [protocol-structures](./protocol-structures.md)
* [net](./net.md)
* [session-module](./session-module.md)
* [web-request](./web-request.md)
