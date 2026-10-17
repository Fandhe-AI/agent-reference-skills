---
source: https://tanstack.com/router/latest/docs/api/router/AsyncRouteComponentType
---

# AsyncRouteComponent

Describes a code-split route component that can be preloaded using a `component.preload()` method.

## Signature / Usage

```tsx
type AsyncRouteComponent<TProps> = SyncRouteComponent<TProps> & {
  preload?: () => Promise<void>
}
```

## Related

- [lazyRouteComponent](./lazy-route-component.md)
- [createLazyRoute](./create-lazy-route.md)
