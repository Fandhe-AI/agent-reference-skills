---
source: https://www.electronjs.org/docs/latest/api/protocol#protocolregisterfileprotocolscheme-handler-deprecated
---

# protocol: register*/intercept* (deprecated)

Deprecated `protocol.register*Protocol` and `protocol.intercept*Protocol` methods (replaced by `protocol.handle`), plus `unregisterProtocol`, `uninterceptProtocol`, `isProtocolRegistered` and `isProtocolIntercepted`.

## Signature / Usage

Process: Main

```js
protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({ mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>') })
})
```

### `protocol.registerFileProtocol(scheme, handler)` _Deprecated_

* `scheme` string
* `handler` Function
  * `request` [ProtocolRequest](./protocol-structures.md)
  * `callback` Function
    * `response` (string | [ProtocolResponse](./protocol-structures.md))

Returns `boolean` - Whether the protocol was successfully registered

Registers a protocol of `scheme` that will send a file as the response. The `handler` will be called with `request` and `callback` where `request` is an incoming request for the `scheme`.

To handle the `request`, the `callback` should be called with either the file's path or an object that has a `path` property, e.g. `callback(filePath)` or `callback({ path: filePath })`. The `filePath` must be an absolute path.

By default the `scheme` is treated like `http:`, which is parsed differently from protocols that follow the "generic URI syntax" like `file:`.

### `protocol.registerBufferProtocol(scheme, handler)` _Deprecated_

* `scheme` string
* `handler` Function
  * `request` [ProtocolRequest](./protocol-structures.md)
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](./protocol-structures.md))

Returns `boolean` - Whether the protocol was successfully registered

Registers a protocol of `scheme` that will send a `Buffer` as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `Buffer` object or an object that has the `data` property.

### `protocol.registerStringProtocol(scheme, handler)` _Deprecated_

* `scheme` string
* `handler` Function
  * `request` [ProtocolRequest](./protocol-structures.md)
  * `callback` Function
    * `response` (string | [ProtocolResponse](./protocol-structures.md))

Returns `boolean` - Whether the protocol was successfully registered

Registers a protocol of `scheme` that will send a `string` as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `string` or an object that has the `data` property.

### `protocol.registerHttpProtocol(scheme, handler)` _Deprecated_

* `scheme` string
* `handler` Function
  * `request` [ProtocolRequest](./protocol-structures.md)
  * `callback` Function
    * `response` [ProtocolResponse](./protocol-structures.md)

Returns `boolean` - Whether the protocol was successfully registered

Registers a protocol of `scheme` that will send an HTTP request as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with an object that has the `url` property.

### `protocol.registerStreamProtocol(scheme, handler)` _Deprecated_

* `scheme` string
* `handler` Function
  * `request` [ProtocolRequest](./protocol-structures.md)
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](./protocol-structures.md))

Returns `boolean` - Whether the protocol was successfully registered

Registers a protocol of `scheme` that will send a stream as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) object or an object that has the `data` property.

Example:

```js
const { protocol } = require('electron')

const { PassThrough } = require('node:stream')

function createStream(text) {
  const rv = new PassThrough() // PassThrough is also a Readable stream
  rv.push(text)
  rv.push(null)
  return rv
}

protocol.registerStreamProtocol('atom', (request, callback) => {
  callback({
    statusCode: 200,
    headers: {
      'content-type': 'text/html'
    },
    data: createStream('<h5>Response</h5>')
  })
})
```

It is possible to pass any object that implements the readable stream API (emits `data`/`end`/`error` events). For example, here's how a file could be returned:

```js
protocol.registerStreamProtocol('atom', (request, callback) => {
  callback(fs.createReadStream('index.html'))
})
```

### `protocol.unregisterProtocol(scheme)` _Deprecated_

* `scheme` string

Returns `boolean` - Whether the protocol was successfully unregistered

Unregisters the custom protocol of `scheme`.

### `protocol.isProtocolRegistered(scheme)` _Deprecated_

* `scheme` string

Returns `boolean` - Whether `scheme` is already registered.

### `protocol.interceptFileProtocol(scheme, handler)` _Deprecated_

* `scheme` string
* `handler` Function
  * `request` [ProtocolRequest](./protocol-structures.md)
  * `callback` Function
    * `response` (string | [ProtocolResponse](./protocol-structures.md))

Returns `boolean` - Whether the protocol was successfully intercepted

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a file as a response.

### `protocol.interceptStringProtocol(scheme, handler)` _Deprecated_

* `scheme` string
* `handler` Function
  * `request` [ProtocolRequest](./protocol-structures.md)
  * `callback` Function
    * `response` (string | [ProtocolResponse](./protocol-structures.md))

Returns `boolean` - Whether the protocol was successfully intercepted

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `string` as a response.

### `protocol.interceptBufferProtocol(scheme, handler)` _Deprecated_

* `scheme` string
* `handler` Function
  * `request` [ProtocolRequest](./protocol-structures.md)
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](./protocol-structures.md))

Returns `boolean` - Whether the protocol was successfully intercepted

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `Buffer` as a response.

### `protocol.interceptHttpProtocol(scheme, handler)` _Deprecated_

* `scheme` string
* `handler` Function
  * `request` [ProtocolRequest](./protocol-structures.md)
  * `callback` Function
    * `response` [ProtocolResponse](./protocol-structures.md)

Returns `boolean` - Whether the protocol was successfully intercepted

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a new HTTP request as a response.

### `protocol.interceptStreamProtocol(scheme, handler)` _Deprecated_

* `scheme` string
* `handler` Function
  * `request` [ProtocolRequest](./protocol-structures.md)
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](./protocol-structures.md))

Returns `boolean` - Whether the protocol was successfully intercepted

Same as `protocol.registerStreamProtocol`, except that it replaces an existing protocol handler.

### `protocol.uninterceptProtocol(scheme)` _Deprecated_

* `scheme` string

Returns `boolean` - Whether the protocol was successfully unintercepted

Remove the interceptor installed for `scheme` and restore its original handler.

### `protocol.isProtocolIntercepted(scheme)` _Deprecated_

* `scheme` string

Returns `boolean` - Whether `scheme` is already intercepted.

## Notes

* History: deprecated — `protocol.register*Protocol` and `protocol.intercept*Protocol` methods have been replaced with `protocol.handle` (https://github.com/electron/electron/pull/36674). The same history block is attached to every method on this page (registerFileProtocol, registerBufferProtocol, registerStringProtocol, registerHttpProtocol, registerStreamProtocol, unregisterProtocol, isProtocolRegistered, interceptFileProtocol, interceptStringProtocol, interceptBufferProtocol, interceptHttpProtocol, interceptStreamProtocol, uninterceptProtocol, isProtocolIntercepted). Breaking-changes entry: [Deprecated: protocol.{un,}{register,intercept}{Buffer,String,Stream,File,Http}Protocol](../breaking-changes/breaking-changes-v25-v23.md).
* Replacement: [protocol.handle](./protocol-handle.md).
* Removed (Electron 37.0): the deprecated `null` value for the `session` property in `ProtocolResponse` ([breaking-changes-v37](../breaking-changes/breaking-changes-v37.md)).
* These legacy methods intercept custom or built-in schemes inside an Electron app; they are not HTTP server routing APIs (for server-side HTTP see fastify / hono).

## Related

* [protocol-handle](./protocol-handle.md)
* [protocol-structures](./protocol-structures.md)
