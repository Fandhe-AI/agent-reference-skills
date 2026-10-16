---
source: https://react.dev/reference/react-dom/preinitModule
---

# preinitModule

`preinitModule` lets you eagerly fetch and evaluate an ESM module.

## Signature / Usage

```js
import { preinitModule } from 'react-dom';

function AppRoot() {
  preinitModule("https://example.com/module.js", {as: "script"});
  // ...
}
```

`preinitModule(href, options)`. Provides the browser with a hint that it should start downloading and executing the given module, which can save time. Modules that you `preinit` are executed when they finish downloading. Returns nothing.

Preiniting in an event handler:

```js
import { preinitModule } from 'react-dom';

function CallToAction() {
  const onClick = () => {
    preinitModule("https://example.com/module.js", {as: "script"});
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
| `href` | string | The URL of the module you want to download and execute. |
| `options.as` | string | Required. It must be `'script'`. |
| `options.crossOrigin` | string | The CORS policy to use. Possible values are `anonymous` and `use-credentials`. |
| `options.integrity` | string | A cryptographic hash of the module, to verify its authenticity. |
| `options.nonce` | string | A cryptographic nonce to allow the module when using a strict Content Security Policy. |

## Notes

- React-based frameworks frequently handle resource loading for you, so you might not have to call this API yourself. Consult your framework's documentation for details.
- Multiple calls to `preinitModule` with the same `href` have the same effect as a single call.
- In the browser, you can call `preinitModule` in any situation: while rendering a component, in an Effect, in an event handler, and so on.
- In server-side rendering or when rendering Server Components, `preinitModule` only has an effect if you call it while rendering a component or in an async context originating from rendering a component. Any other calls will be ignored.
- If you want the browser to download the module but not to execute it right away, use `preloadModule` instead. If you want to preinit a script that isn't an ESM module, use `preinit`.

## Related

- [preloadModule](./preloadModule.md)
- [preinit](./preinit.md)
- [React DOM APIs](./overview.md)
