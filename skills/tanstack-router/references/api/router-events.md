---
source: https://tanstack.com/router/latest/docs/api/router/RouterEventsType
---

# RouterEvents (type)

Contains all of the events the router can emit. Each top-level key is an event name; the values are the event payloads.

## Signature / Usage

```tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

const unsub = router.subscribe('onResolved', (evt) => {
  // ...
})

// Later, clean up the listener
unsub()
```

Event names: `onBeforeNavigate`, `onBeforeLoad`, `onLoad`, `onResolved`, `onBeforeRouteMount`, `onRendered`. Each payload has this shape (with `type` set to the event name):

```tsx
{
  type: 'onBeforeNavigate'
  fromLocation?: ParsedLocation
  toLocation: ParsedLocation
  pathChanged: boolean
  hrefChanged: boolean
  hashChanged: boolean
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | `onBeforeNavigate \| onBeforeLoad \| onLoad \| onBeforeRouteMount \| onResolved \| onRendered` | The type of the event; useful for discriminating events in a listener |
| `fromLocation` | `ParsedLocation` | The location the router is transitioning from |
| `toLocation` | `ParsedLocation` | The location the router is transitioning to |
| `pathChanged` | `boolean` | `true` if the path changed between `fromLocation` and `toLocation` |
| `hrefChanged` | `boolean` | `true` if the href changed between `fromLocation` and `toLocation` |
| `hashChanged` | `boolean` | `true` if the hash changed between `fromLocation` and `toLocation` |

## Notes

- The official example does not call `unsub`; call it (e.g. in effect cleanup) to remove the listener.

## Related

- [ParsedLocation](./parsed-location.md)
- [Router](./router.md)
