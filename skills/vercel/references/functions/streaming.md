# Streaming

Send response data in chunks as they are processed, rather than waiting for the full response. Particularly useful for AI/LLM responses where output is available incrementally.

## Signature / Usage

```ts
// app/api/chat/route.ts (Next.js App Router)
import { streamText } from 'ai';

export async function GET() {
  const response = streamText({
    model: 'openai/gpt-4o-mini',
    messages: [{ role: 'user', content: 'What is the capital of Australia?' }],
  });
  return response.toTextStreamResponse({
    headers: { 'Content-Type': 'text/event-stream' },
  });
}
```

## Supported Runtimes

| Runtime | Streaming support |
|---------|------------------|
| Node.js | Yes (default) |
| Python | Yes |
| Edge | Yes (must begin response within 25s; stream up to 300s) |

## Duration Behavior

- Fluid compute increases default max duration to 300s (Hobby) / 800s (Pro/Enterprise)
- Edge runtime: response must begin within **25 seconds**; can continue streaming up to **300 seconds**
- Node.js runtime: configure `maxDuration` as needed up to plan limit

## `waitUntil()` with Streaming

Available for Node.js and Edge runtimes — continues async background tasks after the response is sent:

```ts
export default function middleware(request: Request, context: RequestContext) {
  context.waitUntil(analyticsTask());
  return new Response('done');
}
```

## Notes

- Source: https://vercel.com/docs/functions/streaming-functions (fetched 2026-11-14)
- Prerequisites on the official page: Node.js 20 or later, the latest Vercel CLI, `OPENAI_API_KEY` in `.env.local`, and `npm i ai`; the example route method must be named `GET`; in Next.js Pages projects, streaming functions must be defined in an `app` directory
- The fetched page does not cover Edge runtime streaming or `waitUntil()`; the Edge 25s / 300s figures are in limitations.md and edge-runtime.md (not re-confirmed on this page)
- Vercel recommends [Vercel AI SDK](https://sdk.vercel.ai/docs) for LLM streaming — reduces boilerplate and enables provider switching
- Streaming Python functions use extended runtime logs (real-time output, larger log entries)
- Log Drains may be affected by increased frequency/format of streaming Python function logs
- `waitUntil()` allows background work while maintaining a responsive user experience

## Related

- [edge-runtime.md](./edge-runtime.md)
- [node-js-runtime.md](./node-js-runtime.md)
- [fluid-compute.md](./fluid-compute.md)
- [limitations.md](./limitations.md)
