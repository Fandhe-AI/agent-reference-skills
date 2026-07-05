# runtime

Selects the JavaScript runtime used for rendering a route.

## Signature / Usage

```tsx filename="layout.tsx | page.tsx | route.ts"
export const runtime = 'nodejs'
// 'nodejs' | 'edge'
```

## Options / Props

| Value | Description |
|------|-------------|
| `'nodejs'` (default) | Runs on the Node.js runtime. |
| `'edge'` | Runs on the Edge runtime. |

## Notes

- `runtime: 'edge'` is not supported for Cache Components.
- This option cannot be used in `proxy.js`.
- `runtime = 'experimental-edge'` was deprecated in `v15.0.0-RC` — a codemod is available to transform it to `'edge'`.

## Related

- [preferredRegion](./preferredRegion.md)
- [proxy.js](../proxy.md)
- [Route Segment Config overview](../route-segment-config.md)
