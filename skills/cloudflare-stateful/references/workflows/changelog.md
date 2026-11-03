---
source: https://developers.cloudflare.com/workflows/reference/changelog/
---

# Release notes

Release history for Cloudflare Workflows from the 2024-10-23 public beta through 2026-04-01.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workflows/build/local-development/ (the 2026-04-01 `--local` flag):

```sh
npx wrangler workflows list --local
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| 2026-04-01 | release | — | All `wrangler workflows` commands accept `--local` (and `--port`, default 8787) to manage the full lifecycle in a local `wrangler dev` session |
| 2026-03-26 | release | — | JavaScript `step.do()` can return `ReadableStream<Uint8Array>` for large binary output; counts toward instance storage |
| 2026-03-23 | release | — | `pause()`, `resume()`, `restart()`, `terminate()` available in local development |
| 2025-09-12 | release | — | Test Workflows with new test APIs in the `cloudflare:test` module (Vitest integration) |
| 2025-08-22 | release | — | Python Workflows open beta, on Free and Paid plans |
| 2025-05-07 | release | — | Search Workflows by name via API |
| 2025-04-29 | release | — | Workflow deletion; event type and instance ID limit raised to 100 characters; fixed a bug where retry `delay` of `0` failed |
| 2025-04-07 | release | — | General Availability: `waitForEvent`, up to 4,500 concurrent instances, CPU time metrics, Vitest support |
| 2025-02-25 | release | — | Concurrent (running) instances raised from 100 to 4,500 |
| 2025-02-11 | release | — | Fixes for stuck instances, step retry counts, and instance ID validation |
| 2025-01-23 | release | — | `event.timestamp` is a `Date` again; terminate fix for instances without metadata; reliability under high load |
| 2025-01-09 | release | — | Local dev `output` field matches production (the actual return of `run`) |
| 2024-12-19 | release | — | Terminate/pause from queued state; instance ID exposed on `WorkflowEvent`; 1024 steps (up from 512) |
| 2024-12-09 | release | — | New instance queueing mechanism to avoid being stuck queued |
| 2024-11-30 | release | — | 512 steps (up from 256) |
| 2024-11-21 | release | — | `create()` works without arguments |
| 2024-11-20 | release | — | Multiple Workflows per script supported in local development |
| 2024-10-23 | release | — | Public beta |

## Notes

- Values here are historical (for example the 4,500 concurrent-instance and 1,024-step limits); current limits are in [limits.md](./limits.md).
- Python Workflows usage: see [python-sdk.md](./python-sdk.md). Vitest test APIs are documented in the cloudflare-wrangler skill (vitest-integration).

## Related

- [limits.md](./limits.md)
- [local-development.md](./local-development.md)
- [python-sdk.md](./python-sdk.md)
