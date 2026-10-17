---
source: https://react.dev/reference/react-dom/preloadModule
---

# preloadModule

`preloadModule` lets you eagerly fetch an ESM module that you expect to use.

## Signature / Usage

```js
import { preloadModule } from 'react-dom';

function AppRoot() {
  preloadModule("https://example.com/module.js", {as: "script"});
  // ...
}
```

`preloadModule(href, options)`. Provides the browser with a hint that it should start downloading the given module, which can save time. Returns nothing.

Preloading in an event handler:

```js
import { preloadModule } from 'react-dom';

function CallToAction() {
  const onClick = () => {
    preloadModule("https://example.com/module.js", {as: "script"});
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
| `href` | string | The URL of the module you want to download. |
| `options.as` | string | Required. It must be `'script'`. |
| `options.crossOrigin` | string | The CORS policy to use. Possible values are `anonymous` and `use-credentials`. |
| `options.integrity` | string | A cryptographic hash of the module, to verify its authenticity. |
| `options.nonce` | string | A cryptographic nonce to allow the module when using a strict Content Security Policy. |

## Notes

- React-based frameworks frequently handle resource loading for you, so you might not have to call this API yourself. Consult your framework's documentation for details.
- Multiple calls to `preloadModule` with the same `href` have the same effect as a single call.
- In the browser, you can call `preloadModule` in any situation: while rendering a component, in an Effect, in an event handler, and so on.
- In server-side rendering or when rendering Server Components, `preloadModule` only has an effect if you call it while rendering a component or in an async context originating from rendering a component. Any other calls will be ignored.
- If you want the browser to start executing the module immediately (rather than just downloading it), use `preinitModule` instead. If you want to load a script that isn't an ESM module, use `preload`.

## Related

- [preinitModule](./preinitModule.md)
- [preload](./preload.md)
- [React DOM APIs](./overview.md)
