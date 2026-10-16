---
source: https://react.dev/reference/react-dom/prefetchDNS
---

# prefetchDNS

`prefetchDNS` lets you eagerly look up the IP of a server that you expect to load resources from.

## Signature / Usage

```js
import { prefetchDNS } from 'react-dom';

function AppRoot() {
  prefetchDNS("https://example.com");
  // ...
}
```

`prefetchDNS(href)`. Provides the browser with a hint that it should look up the IP address of a given server. If the browser chooses to do so, this can speed up the loading of resources from that server. Returns nothing.

Prefetching DNS in an event handler:

```js
import { prefetchDNS } from 'react-dom';

function CallToAction() {
  const onClick = () => {
    prefetchDNS('http://example.com');
    startWizard();
  }
  return (
    <button onClick={onClick}>Start Wizard</button>
  );
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `href` | string | The URL of the server you want to connect to. |

## Notes

- Multiple calls to `prefetchDNS` with the same server have the same effect as a single call.
- In the browser, you can call `prefetchDNS` in any situation: while rendering a component, in an Effect, in an event handler, and so on.
- In server-side rendering or when rendering Server Components, `prefetchDNS` only has an effect if you call it while rendering a component or in an async context originating from rendering a component. Any other calls will be ignored.
- If you know the specific resources you'll need, you can call other resource preloading functions instead that will start loading the resources right away.
- There is no benefit to prefetching the same server the webpage itself is hosted from because it's already been looked up by the time the hint would be given.
- Compared with `preconnect`, `prefetchDNS` may be better if you are speculatively connecting to a large number of domains, in which case the overhead of preconnections might outweigh the benefit.

## Related

- [preconnect](./preconnect.md)
- [React DOM APIs](./overview.md)
