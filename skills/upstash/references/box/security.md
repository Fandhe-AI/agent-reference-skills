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

## Notes

- `env` variables are visible to **all** code running inside the box, including untrusted user-submitted code — for sensitive credentials, use Attach Headers instead (injects secret HTTP headers into outbound HTTPS requests without exposing them inside the container)
- Boxes with `browser: true` can hand out two token-carrying URL types: Live view URLs (view-only) and CDP URLs (full control) — treat both as secrets. Recording playlist URLs are not tokenized and require the Box API key like any other API call
- All other env vars, including `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` and their `*_BASE_URL` variants, are allowed; the built-in agent runner uses its own isolated environment that overrides these per-run

## Related

- [Network Policy](./network-policy.md)
- [Browser: Live View](./browser-live-view.md)
- [Browser: Connect over CDP](./browser-connect.md)
