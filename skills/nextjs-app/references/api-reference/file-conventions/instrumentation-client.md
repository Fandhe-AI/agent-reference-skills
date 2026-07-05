# instrumentation-client.js

Adds monitoring, analytics, and other client-side side-effects that run before the application becomes interactive. Place at the root of the application or inside `src/`.

## Signature / Usage

```ts filename="instrumentation-client.ts"
performance.mark('app-init')

window.addEventListener('error', (event) => {
  reportError(event.error)
})

export function onRouterTransitionStart(
  url: string,
  navigationType: 'push' | 'replace' | 'traverse'
) {
  console.log(`Navigation started: ${navigationType} to ${url}`)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `onRouterTransitionStart` (optional export) | `(url: string, navigationType: 'push' \| 'replace' \| 'traverse') => void` | Called when client-side navigation begins. |

## Notes

- Unlike server-side `instrumentation.js`, no specific export is required — arbitrary top-level code runs directly.
- Execution order: after the HTML document loads, before React hydration begins, before user interactions are possible.
- Wrap instrumentation code in try/catch so tracking failures don't affect other instrumentation.
- Next.js warns in development if initialization takes longer than 16ms.
- Introduced in `v15.3`.

## Related

- [instrumentation.js](./instrumentation.md)
