# Security & Secrets

Every box runs in its own isolated container (dedicated filesystem, process tree, network stack); boxes cannot communicate with or observe each other, and cannot reach private networks, cloud metadata services, or other internal infrastructure.

## Signature / Usage

```typescript
const box = await Box.create({
  runtime: "node",
  env: {
    DATABASE_URL: "postgres://...",
    ANTHROPIC_API_KEY: "sk-ant-...",
  },
})
```

```python
box = Box.create(
    runtime="node",
    env={
        "DATABASE_URL": "postgres://...",
        "ANTHROPIC_API_KEY": "sk-ant-...",
    },
)
```

## Options / Props

| Blocked env var | Reason |
|------------------|--------|
| `PATH` | Prevents binary hijacking |
| `HOME` | Prevents home directory manipulation |
| `LD_PRELOAD` | Prevents shared library injection |
| `LD_LIBRARY_PATH` | Prevents library path hijacking |
| `NODE_OPTIONS` | Prevents Node.js flag injection |
| `UPSTASH_BOX_ID` | Reserved. Set by the platform to the box ID |
| `UPSTASH_BOX_NAME` | Reserved. Set by the platform to the box name |

## Notes

- Source: https://upstash.com/docs/box/overall/security (fetched 2026-11-14; no version pin on the site).
- `env` variables are visible to **all** code running inside the box, including untrusted user-submitted code — for sensitive credentials, use Attach Headers instead (injects secret HTTP headers into outbound HTTPS requests without exposing them inside the container)
- Boxes with `browser: true` can hand out two token-carrying URL types: Live view URLs (view-only) and CDP URLs (full control) — treat both as secrets. Recording playlist URLs are not tokenized and require the Box API key like any other API call
- All other env vars, including `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` and their `*_BASE_URL` variants, are allowed; the built-in agent runner uses its own isolated environment that overrides these per-run

### Blocked variables behaviour

- Blocked variables passed in `env` at box creation are ignored; saving them as account-level environment variables fails with a `400` error

### Read-only API keys

- A read-only key lets a monitoring tool or debugging agent look into boxes without changing them. Create it in the Upstash Console (Box, Overview tab, API Keys, `+ API Key`, pick Read Only); permissions cannot be changed later
- Allowed: get/list boxes and read status, metrics, logs, schedules, previews, config; list/read/download files and read git status and diffs; run commands with `exec` (as a separate user with an empty environment that cannot write to the workspace)
- Everything else returns `403 This API key is read-only` (creating/deleting/pausing/resetting boxes, runs, file and git writes, schedules, previews, config changes, streaming exec and terminal sessions). On a paused box, commands and file/git reads return `409` instead of waking it
- Secrets are masked: env var values and schedule webhook header values come back as their first four characters plus `••••`; webhook URLs are cut to scheme and host
- A read-only key limits what can change through the Box API, not what a command can see: commands keep network access and can read workspace files not private to their owner. Keep secrets in env vars or Attach Headers
- `box-cli` 0.4.0: `box exec` works with read-only API keys, with output printed after completion (Source: https://github.com/upstash/box/releases, release notes checked 2026-11-14)

```bash
export UPSTASH_BOX_API_KEY=box_...   # read-only key
box list
box exec --box my-box -- 'tail -n 50 /workspace/home/app.log'
```

```typescript
const box = await Box.get("my-box", { apiKey: process.env.READ_ONLY_BOX_KEY })
const { result } = await box.exec.command("tail -n 50 /workspace/home/app.log")
```

## Related

- [Network Policy](./network-policy.md)
- [Browser: Live View](./browser-live-view.md)
- [Browser: Connect over CDP](./browser-connect.md)
