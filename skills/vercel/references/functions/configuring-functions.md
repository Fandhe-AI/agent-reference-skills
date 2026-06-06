# Configuring Functions

Configure runtime, region, maximum duration, and memory for Vercel Functions via function code, `vercel.json`, or the dashboard.

## Runtime Configuration

| Runtime | How to configure |
|---------|-----------------|
| Node.js / TypeScript | Default; no extra config needed for `/api` files |
| Ruby, Python, Go | Auto-detected from file extension |
| Community runtimes | `functions` property in `vercel.json` |

## Region Configuration

See [regions.md](./regions.md) for full details. Set via:
- Dashboard: **Project Settings → Functions → Function Regions**
- `vercel.json`: `"regions": ["sfo1"]`
- Per-function: `functions` property in `vercel.json`
- CLI: `vercel --regions sfo1`

## Maximum Duration Configuration

See [max-duration.md](./max-duration.md) for full details.

```ts
// In function code (Next.js App Router, SvelteKit, Astro, Nuxt, Remix)
export const maxDuration = 30;
```

```json
// vercel.json (all frameworks)
{
  "functions": {
    "api/long-task.js": { "maxDuration": 60 },
    "api/*.js": { "maxDuration": 15 }
  }
}
```

## Memory / CPU Configuration

See [memory.md](./memory.md) for full details. Configurable via dashboard only (not `vercel.json`):

| Type | Memory / CPU | Use |
|------|-------------|-----|
| Standard | 2 GB / 1 vCPU | Default; predictable production performance |
| Performance | 4 GB / 2 vCPUs | Latency-sensitive apps, SSR workloads |

## Notes

- Memory size cannot be set in `vercel.json`; use the dashboard (Pro/Enterprise only)
- Settings precedence: function code > `vercel.json` > dashboard > fluid defaults
- The `maxDuration` in `vercel.json` uses glob patterns; order matters

## Related

- [regions.md](./regions.md)
- [max-duration.md](./max-duration.md)
- [memory.md](./memory.md)
- [limitations.md](./limitations.md)
