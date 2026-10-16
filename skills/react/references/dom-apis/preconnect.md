---
source: https://react.dev/reference/react-dom/preconnect
---

# preconnect

`preconnect` lets you eagerly connect to a server that you expect to load resources from.

## Signature / Usage

```js
import { preconnect } from 'react-dom';

function AppRoot() {
  preconnect("https://example.com");
  // ...
}
```

`preconnect(href)`. Provides the browser with a hint that it should open a connection to the given server. If the browser chooses to do so, this can speed up the loading of resources from that server. Returns nothing.

Preconnecting in an event handler:

```js
import { preconnect } from 'react-dom';

function CallToAction() {
  const onClick = () => {
    preconnect('http://example.com');
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

- Multiple calls to `preconnect` with the same server have the same effect as a single call.
- In the browser, you can call `preconnect` in any situation: while rendering a component, in an Effect, in an event handler, and so on.
- In server-side rendering or when rendering Server Components, `preconnect` only has an effect if you call it while rendering a component or in an async context originating from rendering a component. Any other calls will be ignored.
- If you know the specific resources you'll need, you can call other resource preloading functions instead that will start loading the resources right away.
- There is no benefit to preconnecting to the same server the webpage itself is hosted from because it's already been connected to by the time the hint would be given.

## Related

- [prefetchDNS](./prefetchDNS.md)
- [preload](./preload.md)
- [React DOM APIs](./overview.md)
