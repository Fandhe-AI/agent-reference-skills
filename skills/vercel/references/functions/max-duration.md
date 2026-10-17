# Configuring Maximum Duration

The maximum duration defines how long a function can run before Vercel terminates it with a 504 `FUNCTION_INVOCATION_TIMEOUT` error. Default is 300s; configurable up to plan limits.

## Signature / Usage

```ts
// Next.js App Router / SvelteKit / Astro / Nuxt / Remix — in function code
export const maxDuration = 30; // seconds
```

```json
// vercel.json — per-file or glob pattern
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "api/long-task.js": { "maxDuration": 60 },
    "api/*.js": { "maxDuration": 15 }
  }
}
```

## Duration Limits by Plan (Fluid Compute enabled)

### Node.js, Bun and Python Runtimes

| Plan | Default | Maximum |
|------|---------|---------|
| Hobby | 300s (5 min) | 300s (5 min) |
| Pro | 300s (5 min) | 800s (13 min) |
| Enterprise | 300s (5 min) | 800s (13 min) |

### Extended max duration (Beta)

Pro and Enterprise teams can run individual functions for up to 1800s (30 minutes). During the beta, durations above 800s must be configured per function in code or `vercel.json`; project-level defaults above 800s are not supported yet.

| Plan | Default | Maximum | Extended maximum |
|------|---------|---------|------------------|
| Hobby | 300s | 300s | - |
| Pro | 300s | 800s | 1800s (Beta) |
| Enterprise | 300s | 800s | 1800s (Beta) |

Supported runtime versions during the beta: `nodejs22.x`, `nodejs24.x`, Bun `1.x` and `1.4.x`, `python3.12`, `python3.13`, `python3.14`. The Bun runtime is included (changelog "Bun runtime now supports large functions and extended max duration"). Secure Compute and Static IPs do not support durations above 800s during the beta.

```json
{
  "functions": {
    "api/long-task.py": { "maxDuration": 1800 }
  }
}
```

For Next.js App Router functions on a supported Node.js or Bun runtime, set `export const maxDuration = 1800;` in the route file. For Python framework apps, key the entry on the resolved entrypoint file (e.g. `app/main.py`) instead of an `/api` route.

### Edge Runtime

| Limit | Value |
|-------|-------|
| Must begin sending response within | 25 seconds |
| Maximum streaming duration | 300 seconds |

## Configuration by Framework

| Framework | Where to set |
|-----------|-------------|
| Next.js App Router (≥ 13.5) | `export const maxDuration = N` in route file |
| Next.js Pages | `export const config = { maxDuration: N }` |
| SvelteKit | `adapter({ maxDuration: N })` in `svelte.config.js` |
| Astro | `vercel({ maxDuration: N })` in `astro.config.mjs` |
| Nuxt | `defineNitroConfig({ vercel: { functions: { maxDuration: N } } })` |
| Remix | `export const config = { maxDuration: N }` |
| Go, Python, Ruby, older Next.js | `functions` property in `vercel.json` |

## Setting a Project Default

Via dashboard: **Project Settings → Functions → Function Max Duration → Default Max Duration**

Via `vercel.json`:
```json
{
  "functions": {
    "app/api/**/*": { "maxDuration": 5 }
  }
}
```

## Notes

- Duration is "wall-clock time" — includes all time from start to finish, including I/O waits
- Glob pattern order in `vercel.json` matters; more specific patterns should come first
- For unlimited execution time, use Vercel Workflows instead
- `src/` directory Next.js projects must prefix paths with `/src/` in `vercel.json`

## Related

- [limitations.md](./limitations.md)
- [fluid-compute.md](./fluid-compute.md)
- [usage-and-pricing.md](./usage-and-pricing.md)
