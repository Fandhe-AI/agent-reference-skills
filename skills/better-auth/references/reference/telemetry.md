# Telemetry

## Signature / Usage

```typescript
export const auth = betterAuth({
  telemetry: { enabled: true } // opt in (disabled by default)
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `telemetry.enabled` | `boolean` | `false` | Enable anonymous telemetry collection |
| `telemetry.debug` | `boolean` | `false` | Log collected telemetry data without sending it |

## Notes

- Optional anonymous usage data collected by Better Auth, available since v1.3.5. **Disabled by default**.
- Collected: an anonymous project identifier (irreversible hash); runtime environment (Node, Bun, Deno and version); deploy context (development, production, test, CI); detected framework and DB (e.g. Next.js, PostgreSQL, Prisma versions); system specs (platform, architecture, CPU, memory, Docker/WSL); package manager info; a redacted `betterAuth` config (sensitive values converted to booleans or generic identifiers). CLI operations (`generate`, `migrate`) also collect results and related adapter info.
- Not collected: email addresses, usernames, tokens, secrets, client ID/secret, DB URLs.
- Disable via environment variable: `BETTER_AUTH_TELEMETRY=0`.
- Automatically disabled during tests unless explicitly overridden.

## Related

- [instrumentation](./instrumentation.md)
- [options](./options.md)
