---
source: https://react.dev/reference/react-dom/preload
---

# preload

`preload` lets you eagerly fetch a resource such as a stylesheet, font, or external script that you expect to use.

## Signature / Usage

```js
import { preload } from 'react-dom';

function AppRoot() {
  preload("https://example.com/font.woff2", {as: "font"});
  // ...
}
```

`preload(href, options)`. Provides the browser with a hint that it should start downloading the given resource, which can save time. Returns nothing.

Preloading an image:

```js
import { preload } from 'react-dom';

function AppRoot() {
  preload("/banner.png", {
    as: "image",
    imageSrcSet: "/banner512.png 512w, /banner1024.png 1024w",
    imageSizes: "(max-width: 512px) 512px, 1024px",
  });
  return ...;
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `href` | string | The URL of the resource you want to download. |
| `options.as` | string | Required. The type of resource. Possible values are `audio`, `document`, `embed`, `fetch`, `font`, `image`, `object`, `script`, `style`, `track`, `video`, `worker`. |
| `options.crossOrigin` | string | The CORS policy to use. Possible values are `anonymous` and `use-credentials`. It is required when `as` is set to `"fetch"`. For fonts (`as: "font"`), set it (e.g. `"anonymous"`) even for same-origin URLs, because browsers fetch fonts in CORS mode and a preload without it is not reused. |
| `options.referrerPolicy` | string | The Referrer header to send when fetching. Possible values are `no-referrer-when-downgrade` (the default), `no-referrer`, `origin`, `origin-when-cross-origin`, and `unsafe-url`. |
| `options.integrity` | string | A cryptographic hash of the resource, to verify its authenticity. |
| `options.type` | string | The MIME type of the resource. |
| `options.nonce` | string | A cryptographic nonce to allow the resource when using a strict Content Security Policy. |
| `options.fetchPriority` | string | Suggests a relative priority for fetching the resource. Possible values are `auto` (the default), `high`, and `low`. |
| `options.imageSrcSet` | string | For use only with `as: "image"`. Specifies the source set of the image. |
| `options.imageSizes` | string | For use only with `as: "image"`. Specifies the sizes of the image. |

## Notes

- React-based frameworks frequently handle resource loading for you, so you might not have to call this API yourself. Consult your framework's documentation for details.
- Multiple equivalent calls to `preload` have the same effect as a single call. Two calls are equivalent if they have the same `href`, except: if `as` is set to `image`, two calls are equivalent if they have the same `href`, `imageSrcSet`, and `imageSizes`.
- In the browser, you can call `preload` in any situation: while rendering a component, in an Effect, in an event handler, and so on.
- In server-side rendering or when rendering Server Components, `preload` only has an effect if you call it while rendering a component or in an async context originating from rendering a component. Any other calls will be ignored.
- If you want the browser to start executing the script immediately (rather than just downloading it), use `preinit` instead. If you want to load an ESM module, use `preloadModule`.
- The react.dev font examples omit `crossOrigin`; per MDN (`<link rel="preload">` `as="font"`), font preloads need `crossOrigin: 'anonymous'` to match the actual font request.
- If you preload a stylesheet, it's smart to also preload any fonts that the stylesheet refers to.

## Related

- [preinit](./preinit.md)
- [preloadModule](./preloadModule.md)
- [React DOM APIs](./overview.md)
