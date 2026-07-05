# preferredRegion

Specifies the preferred deployment region for a route segment; the value is passed to the deployment platform.

## Signature / Usage

```tsx filename="layout.tsx | page.tsx | route.ts"
export const preferredRegion = // string || string[]
```

## Options / Props

| Value | Description |
|------|-------------|
| `string` | Deploy the route to a single specific region, e.g. `'iad1'`. |
| `string[]` | Deploy the route to **all** listed regions (not a single choice), e.g. `['iad1', 'sfo1']`. |

On Vercel, regions are only honored when `runtime = 'edge'` is set, and accept: `'auto'` (default, uses the default region), `'global'` (prefer all available regions), `'home'` (prefer the home region). An unsupported value throws an error.

## Notes

- If unspecified, inherits from the nearest parent layout; the root layout defaults to `'auto'`.
- A child segment's value overrides the parent — values are not merged.
- Exact behavior and available region codes are platform-specific; consult your deployment platform's documentation.

## Related

- [runtime](./runtime.md)
- [Route Segment Config overview](../route-segment-config.md)
