---
source: https://tanstack.com/router/latest/docs/framework/react/guide/router-events
---

# Router Events

`router.subscribe` exposes router lifecycle events for imperative side effects (analytics, cache resets, DOM-dependent logic) without driving rendering.

## Signature / Usage

```tsx
const unsubscribe = router.subscribe('onResolved', (event) => {
  console.info('Navigation finished:', event.toLocation.href)
})

// Later, clean up the listener
unsubscribe()
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| onBeforeNavigate | event | Fires right before a navigation begins |
| onBeforeLoad | event | Fires before route loading starts |
| onLoad | event | Fires after the next location has committed and route matches have loaded |
| onBeforeRouteMount | event | Fires after loading finishes, just before route components mount |
| onResolved | event | Fires after the navigation has fully resolved |
| onInjectedHtml | event | Fires when HTML is injected |
| onRendered | event | Fires after the route has rendered |

Common event payload fields: `type` (discriminant), `fromLocation` (optional `ParsedLocation`, `undefined` on initial load), `toLocation` (`ParsedLocation`), `pathChanged`, `hrefChanged`, `hashChanged`.

## Notes

- Typical flow for a normal navigation: `onBeforeNavigate` → `onBeforeLoad` → `onLoad` → `onBeforeRouteMount` → `onResolved` → `onRendered`.
- Use `onBeforeNavigate`/`onBeforeLoad` to observe navigation start, `onResolved` for analytics/cleanup, `onRendered` for DOM-dependent work.
- For reactive UI updates, prefer framework hooks (`useRouterState`, `useSearch`, `useParams`) over manual subscriptions.
- Always return the unsubscribe function from component cleanup/effects.
- Full event payload types are documented under the `RouterEvents` type on the official API reference.

## Related

- [Creating a Router](./creating-a-router.md)
