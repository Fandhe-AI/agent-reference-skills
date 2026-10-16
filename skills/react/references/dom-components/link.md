---
source: https://react.dev/reference/react-dom/components/link
---

# `<link>`

The built-in browser `<link>` component lets you use external resources such as stylesheets or annotate the document with link metadata. You can render `<link>` from any component and React will in most cases place the corresponding DOM element in the document head.

## Signature / Usage

```js
<link rel="icon" href="favicon.ico" />
```

Linking to a stylesheet (suspends while loading; `precedence` is required for the special behavior):

```js
<link rel="stylesheet" href="sitemap.css" precedence="medium" />
```

## Options / Props

`<link>` supports all [common element props](./common.md).

| Name | Type | Description |
| --- | --- | --- |
| rel | string (required) | Specifies the relationship to the resource. React treats links with `rel="stylesheet"` differently from other links. |
| href | string | The URL of the linked resource. |
| crossOrigin | string | The CORS policy to use. Possible values are `anonymous` and `use-credentials`. Required when `as` is set to `"fetch"`. |
| referrerPolicy | string | The Referrer header to send when fetching. Possible values are `no-referrer-when-downgrade` (the default), `no-referrer`, `origin`, `origin-when-cross-origin`, and `unsafe-url`. |
| fetchPriority | string | Suggests a relative priority for fetching the resource. Possible values are `auto` (the default), `high`, and `low`. |
| hrefLang | string | The language of the linked resource. |
| integrity | string | A cryptographic hash of the resource, to verify its authenticity. |
| type | string | The MIME type of the linked resource. |
| precedence | string | `rel="stylesheet"` only. Tells React where to rank the `<link>` DOM node relative to others in the document `<head>`, which determines which stylesheet can override the other. Values discovered first are "lower", values discovered later are "higher". Stylesheets with the same precedence go together whether they are `<link>` or inline `<style>` tags or loaded using `preinit` functions. |
| media | string | `rel="stylesheet"` only. Restricts the stylesheet to a certain media query. |
| title | string | `rel="stylesheet"` only. Specifies the name of an alternative stylesheet. |
| disabled | boolean | `rel="stylesheet"` only. Disables the stylesheet. Disables React's special treatment of stylesheets. |
| onError | function | `rel="stylesheet"` only. Called when the stylesheet fails to load. Disables React's special treatment of stylesheets. |
| onLoad | function | `rel="stylesheet"` only. Called when the stylesheet finishes being loaded. Disables React's special treatment of stylesheets. |
| as | string | `rel="preload"` or `rel="modulepreload"` only. The type of resource: `audio`, `document`, `embed`, `fetch`, `font`, `image`, `object`, `script`, `style`, `track`, `video`, `worker`. |
| imageSrcSet | string | `as="image"` only. Specifies the source set of the image. |
| imageSizes | string | `as="image"` only. Specifies the sizes of the image. |
| sizes | string | `rel="icon"` or `rel="apple-touch-icon"` only. The sizes of the icon. |
| blocking | string | Not recommended. If set to `"render"`, instructs the browser not to render the page until the stylesheet is loaded. React provides more fine-grained control using Suspense. |

## Notes

- Special rendering behavior: React will always place the DOM element corresponding to the `<link>` component within the document's `<head>`, regardless of where in the React tree it is rendered.
- Exception: if the `<link>` has `rel="stylesheet"`, it must also have a `precedence` prop to get this special behavior. If `precedence` is omitted, there is no special behavior.
- Exception: if the `<link>` has an `itemProp` prop, there is no special behavior, because it represents metadata about a specific part of the page.
- Exception: if the `<link>` has an `onLoad` or `onError` prop, because you are managing the loading of the linked resource manually.
- Special behavior for stylesheets: the component that renders `<link>` will suspend while the stylesheet is loading. If multiple components render links to the same stylesheet, React de-duplicates them and puts a single link into the DOM (two links are the same if they have the same `href`).
- No special stylesheet behavior if the link has no `precedence` prop, or if you supply any of `onLoad`, `onError`, or `disabled`.
- React will ignore changes to props after the link has been rendered (React issues a warning in development if this happens).
- React may leave the link in the DOM even after the component that rendered it has been unmounted.
- Calling `preinit` may allow the browser to start fetching the stylesheet earlier than rendering a `<link>` component, for example by sending an HTTP Early Hints response.
- Built-in DOM element, distinct from router links: see nextjs-app (`next/link`) and react-router (`<Link>`, `<Links>`).

## Related

- [meta](./meta.md)
- [style](./style.md)
- [Common components](./common.md)
