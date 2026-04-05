# Timing Middleware (Server-Timing)

Adds `Server-Timing` headers to responses for performance measurement and profiling.

## Signature / Usage

```ts
import { timing, startTime, endTime, setMetric, wrapTime } from 'hono/timing'
import type { TimingVariables } from 'hono/timing'

type Env = { Variables: TimingVariables }
const app = new Hono<Env>()

app.use(timing())
app.get('/', async (c) => {
  startTime(c, 'db')
  const data = await db.find()
  endTime(c, 'db')
  return c.json(data)
})
```

## Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `timing()` | `timing(options?)` | Middleware initializer; adds performance metrics to response headers |
| `setMetric` | `(c, name, duration?, description?)` | Register a custom metric with optional duration (ms) and label |
| `startTime` | `(c, name)` | Begin timing a labeled operation |
| `endTime` | `(c, name)` | Conclude timing a previously started operation |
| `wrapTime` | `(c, name, promise)` | Wrap a Promise to automatically measure its execution time |

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `total` | `boolean` | `true` | Display cumulative response time |
| `enabled` | `boolean \| (c) => boolean` | `true` | Enable/disable timings conditionally |
| `totalDescription` | `string` | `"Total Response Time"` | Label for total duration metric |
| `autoEnd` | `boolean` | — | Auto-conclude timers at request completion |
| `crossOrigin` | `boolean \| string \| (c) => boolean \| string` | `false` | Control `Timing-Allow-Origin` header for cross-origin access |

## Notes

- On Cloudflare Workers, timer metrics may be inaccurate because timers reflect only the time of the last I/O operation.
- Declare `Variables: TimingVariables` on your Hono app type for proper context inference.
