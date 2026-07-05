# maxDuration

Sets the maximum execution time (in seconds) for server-side logic in a route segment. Deployment platforms can read `maxDuration` from the build output to enforce execution limits.

## Signature / Usage

```tsx filename="layout.tsx | page.tsx | route.ts"
export const maxDuration = 5
```

## Notes

- When using Server Actions, set `maxDuration` at the **page** level to change the default timeout of all Server Actions used on that page.
- Introduced in `v13.4.10`.

## Related

- [Route Segment Config overview](../route-segment-config.md)
