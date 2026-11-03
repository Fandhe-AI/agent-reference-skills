---
source: https://developers.cloudflare.com/workers/runtime-apis/encoding/
---

# Encoding

`TextEncoder` and `TextDecoder` convert between code points and UTF-8 bytes.

## Signature / Usage

```js
let encoder = new TextEncoder();
```

```js
let decoder = new TextDecoder();
```

## Options / Props

### TextEncoder

| Name | Type | Description |
|------|------|-------------|
| `encoder.encoding` | DOMString (read-only) | The name of the encoder (always `utf-8`). |
| `encode(inputUSVString)` | Uint8Array | Encodes a string input. |

### TextDecoder

| Name | Type | Description |
|------|------|-------------|
| `decoder.encoding` | DOMString (read-only) | The name of the decoder describing the method the `TextDecoder` uses. |
| `decoder.fatal` | boolean (read-only) | Whether the error mode is fatal. |
| `decoder.ignoreBOM` | boolean (read-only) | Whether the byte-order marker is ignored. |
| `decode()` | DOMString | Decodes using the method specified in the `TextDecoder` object. |

## Notes

- `TextEncoder` takes a stream of code points and emits a stream of bytes. Encoding types passed to the constructor are ignored and a UTF-8 `TextEncoder` is created. It takes no parameters and throws no exceptions.
- `TextDecoder` represents a UTF-8 decoder: it takes a stream of bytes and emits a stream of code points.

## Related

- [Web standards](./web-standards.md)
- [Streams](./streams.md)
