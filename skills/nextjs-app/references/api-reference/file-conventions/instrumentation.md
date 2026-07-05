# instrumentation.js

Integrates observability tools into your application to track performance, behavior, and debug production issues. Place at the root of the application or inside `src/`.

## Signature / Usage

```ts filename="instrumentation.ts"
import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel('next-app')
}
```

```ts filename="instrumentation.ts"
import { type Instrumentation } from 'next'

export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context
) => {
  const message = err instanceof Error ? err.message : String(err)
  await fetch('https://.../report-error', {
    method: 'POST',
    body: JSON.stringify({ message, request, context }),
    headers: { 'Content-Type': 'application/json' },
  })
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `register` (optional) | `() => void \| Promise<void>` | Called once when a new Next.js server instance starts, before it handles requests. Can be async. |
| `onRequestError` (optional) | `(error: unknown, request, context) => void \| Promise<void>` | Reports server errors to an observability provider. `request` has `path`, `method`, `headers`; `context` has `routerKind`, `routePath`, `routeType` (`render`\|`route`\|`action`\|`proxy`), `renderSource`, `revalidateReason`, `renderType`. |

## Notes

- `error` passed to `onRequestError` is typed `unknown` and may be processed by React (e.g. during Server Components rendering) — use the `digest` property to identify the original error type.
- Any async work inside `onRequestError` must be awaited.
- Works in both Node.js and Edge runtimes; branch on `process.env.NEXT_RUNTIME === 'edge'` to target a specific runtime.
- Version history: `v15.0.0` `onRequestError` introduced, `instrumentation` stable; `v14.0.4` Turbopack support; `v13.2.0` introduced as experimental.

## Related

- [Instrumentation guide](../../guides/instrumentation.md)
- [instrumentation-client.js](./instrumentation-client.md)
- [src folder](./src-folder.md)
