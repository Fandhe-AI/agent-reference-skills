# Instrumentation

Instrumentation integrates monitoring/logging tools by running code once at server startup, before the server handles requests, via an `instrumentation.ts` file's `register` function.

## Signature / Usage

```ts filename="instrumentation.ts"
import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel('next-app')
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `register()` | exported function | Called once per new server instance; must complete before the server accepts requests |
| `process.env.NEXT_RUNTIME` | `'nodejs' \| 'edge'` | Used to conditionally import runtime-specific code inside `register` |

## Notes

- File must live in the project root (or inside `src/` if used) — not inside `app/` or `pages/`.
- If `pageExtensions` adds a custom suffix, the `instrumentation` filename must match it.
- Import side-effect-only packages inside `register()` (not at the top of the file) to colocate side effects and avoid unintended global-import consequences.
- `register` runs in all environments — gate Node-only or Edge-only imports behind `NEXT_RUNTIME` checks.

## Related

- [OpenTelemetry](./open-telemetry.md)
- [Analytics](./analytics.md)
