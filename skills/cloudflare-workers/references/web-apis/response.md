---
source: https://developers.cloudflare.com/workers/runtime-apis/response/
---

# Response

The `Response` interface represents an HTTP response and is part of the Fetch API.

## Signature / Usage

```js
let response = new Response(body, init);
```

- `body` (optional): can be `null` or any one of BufferSource, FormData, ReadableStream, URLSearchParams, USVString.
- `init` (optional): an `options` object that contains custom settings to apply to the response.

## Options / Props

### `init` options

| Name | Type | Description |
|------|------|-------------|
| `cf` | any \| null | Cloudflare-specific information. Not part of the Fetch API standard. Only used by consumers of the Response for informational purposes and has no impact on Workers behavior. |
| `encodeBody` | string | Workers compress data according to the `content-encoding` header when transmitting. To serve data that is already compressed, set this to `"manual"`; otherwise the default is `"automatic"`. |
| `headers` | Headers \| ByteString | Headers to add to the response, in a `Headers` object or an object literal of `ByteString` key-value pairs. |
| `status` | int | The status code for the response, such as `200`. |
| `statusText` | string | The status message associated with the status code, such as `OK`. |
| `webSocket` | WebSocket \| null | Present in successful WebSocket handshake responses. If a Worker forwards a WebSocket upgrade request to an origin and the origin replies with a successful upgrade, the Worker sees `response.webSocket`. This establishes a WebSocket connection proxied through a Worker. You cannot intercept data flowing over a WebSocket connection. |

### Properties

| Name | Type | Description |
|------|------|-------------|
| `response.body` | ReadableStream \| null | A getter to get the body contents; `null` when there is no body. |
| `response.bodyUsed` | boolean | Whether the body was used in the response. |
| `response.headers` | Headers | The headers for the response. |
| `response.ok` | boolean | Whether the response was successful (status in the range `200`-`299`). |
| `response.redirected` | boolean | Whether the response is the result of a redirect. If so, its URL list has more than one entry. |
| `response.status` | int | The status code of the response (for example, `200`). |
| `response.statusText` | string | The status message corresponding to the status code (for example, `OK` for `200`). |
| `response.url` | string | The URL of the response. The final URL obtained after any redirects. |
| `response.webSocket` | WebSocket? | Present in successful WebSocket handshake responses (see `webSocket` above). |

### Static methods

| Name | Returns | Description |
|------|---------|-------------|
| `Response.json(data, init?)` | Response | Creates a new response with a JSON-serialized payload. |
| `Response.redirect(url, status?)` | Response | Creates a redirect response to `url` (status defaults to `302`). |

### Instance methods

| Name | Returns | Description |
|------|---------|-------------|
| `clone()` | Response | Creates a clone of a `Response` object. |
| `arrayBuffer()` | Promise\<ArrayBuffer> | Reads the stream to completion and resolves with an `ArrayBuffer`. |
| `formData()` | Promise\<FormData> | Reads the stream to completion and resolves with a `FormData` object. |
| `json()` | Promise\<any> | Reads the stream to completion and resolves with the result of parsing the body text as JSON. |
| `text()` | Promise\<string> | Reads the stream to completion and resolves with a string (text). |

## Notes

- `Response` implements the `Body` mixin of the Fetch API, hence the body-reading methods above.
- Corrected from the official docs: the official page lists `json()` and `redirect()` (the ones that create new responses) under "Instance methods", but they are static methods (`Response.json(...)`, `Response.redirect(...)`). Only the Body mixin `json()` (parses the body) is an instance method. They were moved to a "Static methods" table.
- Corrected from the official docs: the `FixedLengthStream` example below uses `writer.close()`; the official page's `writer.end()` does not exist on `WritableStreamDefaultWriter`.
- The `Content-Length` header is set automatically by the runtime; any value set in `Headers` is ignored. To specify a value, the `body` must be a `FixedLengthStream` or a fixed-length value such as a string or `TypedArray`. Any other `ReadableStream` body uses chunked encoding.
- Workers-specific differences: `cf` property (informational only), `webSocket` property, `encodeBody` option, and `headers` returns a Workers `Headers` with `getAll()` for `Set-Cookie`.
- Workers type definitions define a `Response` type including `cf` and `webSocket`, not directly compatible with the `lib.dom.d.ts` `Response`; type assertions may be needed.

`FixedLengthStream` example (from the same page):

Adapted (not in the official docs): `writer.end()` replaced with `writer.close()`; see Notes.

```js
  const { writable, readable } = new FixedLengthStream(11);

  const enc = new TextEncoder();
  const writer = writable.getWriter();
  writer.write(enc.encode("hello world"));
  writer.close();

  return new Response(readable);
```

## Related

- [Request](./request.md)
- [Headers](./headers.md)
- [Fetch](./fetch.md)
- [WebSockets](./websockets.md)
- [TransformStream (FixedLengthStream)](./transformstream.md)
