# Streaming and Server-Sent Events

Streaming text responses and Server-Sent Events (SSE) using `hono/streaming`.

```ts
import { Hono } from 'hono'
import { stream, streamText, streamSSE } from 'hono/streaming'

const app = new Hono()

// Plain-text streaming (Transfer-Encoding: chunked)
app.get('/stream/text', (c) =>
  streamText(c, async (s) => {
    await s.writeln('Processing...')
    await s.sleep(500)
    await s.writeln('Done!')
  })
)

// Server-Sent Events
app.get('/sse', (c) =>
  streamSSE(c, async (s) => {
    let id = 0
    while (true) {
      if (s.isAborted) break
      await s.writeSSE({
        data: JSON.stringify({ time: new Date().toISOString() }),
        event: 'tick',
        id: String(id++),
      })
      await s.sleep(1000)
    }
  })
)

// Raw binary streaming
app.get('/stream/raw', (c) =>
  stream(c, async (s) => {
    const readable = await fetch('https://example.com/large-file').then((r) => r.body!)
    await s.pipe(readable)
  })
)

export default app
```

## Notes

- Errors thrown inside the callback do not trigger `app.onError` because the response has already started; handle errors inside the callback
- On Cloudflare Workers, set `Content-Encoding: Identity` header to ensure correct streaming behavior
- Use `s.onAbort(() => { /* cleanup */ })` to handle client disconnects
- `streamSSE` automatically sets `Content-Type: text/event-stream` and disables caching
