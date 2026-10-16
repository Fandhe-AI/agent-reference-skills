# runtime

Selects the JavaScript runtime used for rendering a route.

## Signature / Usage

```tsx filename="layout.tsx | page.tsx | route.ts"
export const runtime = 'nodejs'
// 'nodejs'
```

## Options / Props

| Value | Description |
|------|-------------|
| `'nodejs'` (default) | Runs on the Node.js runtime. |
| `'edge'` (deprecated) | Runs on the Edge runtime. Deprecated — remove the `runtime` export from route files. |

## Notes

- The Edge Runtime is deprecated; remove the `runtime` export from route files.
- When Cache Components is enabled, remove the `runtime` export entirely, including `runtime = 'nodejs'`: Cache Components uses the default Node.js runtime and does not support the `runtime` route segment config (`runtime: 'edge'` is likewise not supported).
- This option cannot be used in `proxy.js`.
- `runtime = 'experimental-edge'` was deprecated in `v15.0.0-RC` — a codemod is available to transform it to `'edge'`.

## Related

- [preferredRegion](./preferredRegion.md)
- [proxy.js](../proxy.md)
- [Route Segment Config overview](../route-segment-config.md)
