# Streaming Helper

Helpers for HTTP streaming responses: raw binary, plain text, and Server-Sent Events.

## Signature / Usage

```ts
import { stream, streamText, streamSSE } from 'hono/streaming'

// Raw streaming response
app.get('/stream', (c) =>
  stream(c, async (s) => {
    await s.write(new Uint8Array([1, 2, 3]))
    await s.writeln('hello')
    await s.pipe(readableStream)
  })
)

// Plain-text streaming (sets Content-Type: text/plain, Transfer-Encoding: chunked)
app.get('/text', (c) =>
  streamText(c, async (s) => {
    await s.writeln('Hello!')
    await s.sleep(100)
    await s.writeln('World!')
  })
)

// Server-Sent Events
app.get('/sse', (c) =>
  streamSSE(c, async (s) => {
    await s.writeSSE({ data: 'event data', event: 'update', id: '1' })
  })
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `c` | `Context` | Hono context |
| `callback` | `(stream) => Promise<void>` | Async function performing write operations |
| `errorHandler` | `(err, stream) => Promise<void>` | Optional; called on errors during streaming |

### Stream object methods

| Method | Description |
|--------|-------------|
| `write(data: Uint8Array)` | Write binary data |
| `writeln(text: string)` | Write text with trailing newline |
| `writeSSE({ data, event?, id? })` | Write an SSE frame |
| `sleep(ms: number)` | Pause execution |
| `pipe(ReadableStream)` | Pipe a readable stream |
| `onAbort(cb)` | Register callback for stream abort |

## Notes

- Errors thrown inside the callback do **not** trigger Hono's `onError` hook because the response has already started
- On Cloudflare Workers / Wrangler, set the `Content-Encoding` header to `'Identity'` for correct streaming behavior
- The stream is automatically closed after the callback completes

## Related

- [WebSocket Helper](./websocket.md)
