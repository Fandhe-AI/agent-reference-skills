---
source: https://react.dev/reference/react-dom/preinit
---

# preinit

`preinit` lets you eagerly fetch and evaluate a stylesheet or external script.

## Signature / Usage

```js
import { preinit } from 'react-dom';

function AppRoot() {
  preinit("https://example.com/script.js", {as: "script"});
  // ...
}
```

`preinit(href, options)`. Provides the browser with a hint that it should start downloading and executing the given resource, which can save time. Scripts that you `preinit` are executed when they finish downloading. Stylesheets that you preinit are inserted into the document, which causes them to go into effect right away. Returns nothing.

Preiniting a stylesheet:

```js
import { preinit } from 'react-dom';

function AppRoot() {
  preinit("https://example.com/style.css", {as: "style", precedence: "medium"});
  return ...;
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `href` | string | The URL of the resource you want to download and execute. |
| `options.as` | string | Required. The type of resource. Possible values are `script` and `style`. |
| `options.precedence` | string | Required with stylesheets. Says where to insert the stylesheet relative to others. Stylesheets with higher precedence can override those with lower precedence. The value is an arbitrary string that groups stylesheets; React infers that precedence values it discovers first are "lower" and values discovered later are "higher" (names like reset/low/medium/high carry no built-in order). |
| `options.crossOrigin` | string | The CORS policy to use. Possible values are `anonymous` and `use-credentials`. |
| `options.integrity` | string | A cryptographic hash of the resource, to verify its authenticity. |
| `options.nonce` | string | A cryptographic nonce to allow the resource when using a strict Content Security Policy. |
| `options.fetchPriority` | string | Suggests a relative priority for fetching the resource. Possible values are `auto` (the default), `high`, and `low`. |

## Notes

- React-based frameworks frequently handle resource loading for you, so you might not have to call this API yourself. Consult your framework's documentation for details.
- Multiple calls to `preinit` with the same `href` have the same effect as a single call.
- In the browser, you can call `preinit` in any situation: while rendering a component, in an Effect, in an event handler, and so on.
- In server-side rendering or when rendering Server Components, `preinit` only has an effect if you call it while rendering a component or in an async context originating from rendering a component. Any other calls will be ignored.
- If you want the browser to download the script but not to execute it right away, use `preload` instead. If you want to load an ESM module, use `preinitModule`.
- The react.dev preinit page lists reset/low/medium/high as possible values, but the `<link>`/`<style>` pages state precedence values are arbitrary and ranked by discovery order; this page follows the latter.
- If you want to download the stylesheet but not to insert it into the document right away, use `preload` instead.

## Related

- [preload](./preload.md)
- [preinitModule](./preinitModule.md)
- [React DOM APIs](./overview.md)
