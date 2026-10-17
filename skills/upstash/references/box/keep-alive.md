# Keep Alive

With `keepAlive` enabled the box stays on between sessions instead of auto-pausing when idle, for always-available workloads (servers, warm agents, always-on dev environments).

## Signature / Usage

```typescript
import { Box } from "@upstash/box"

const box = await Box.create({
  runtime: "node",
  size: "medium",
  keepAlive: true,
  initCommand: "npm install && npm run dev", // optional
})
```

```python
box = Box.create(
    runtime="node",
    size="medium",
    keep_alive=True,
    init_command="npm install && npm run dev",
)
```

## Options / Props

| | Default behavior | With `keepAlive: true` |
|---|---|---|
| Idle behavior | Auto-pauses when idle | Stays on |
| Pause / resume | Supported | Not supported |
| Best for | Bursty workloads, task runners, on-demand agents | Always-on servers, long-running agents, warm environments |
| Billing model | Active usage based | Open-time / always-on based |

| Size | CPU | Memory | Storage |
|------|-----|--------|---------|
| `small` | 2 vCPU | 4 GB | 5 GB |
| `medium` | 4 vCPU | 8 GB | 10 GB |
| `large` | 8 vCPU | 16 GB | 20 GB |

## Notes

- Combines with all normal Box features (agent, git, shell, filesystem, public URLs, snapshots)
- Init command is a startup script the box runs once each time its container starts. It is not a keep-alive feature: every box can have one, and get/set/delete work on any box, including a paused one
- Console: enable Keep alive and choose Size at creation; manage the Init Command later from the box settings page
- Avoid keep-alive when you only need a reusable workspace; default lifecycle plus Snapshots is usually enough
- Source: https://upstash.com/docs/box/overall/keep-alive (fetched 2026-10-17; no version pin on the site).

## Related

- [How It Works](./how-it-works.md)
- [Snapshots](./snapshots.md)
- [Public URLs](./preview.md)
- [Quickstart](./quickstart.md)
