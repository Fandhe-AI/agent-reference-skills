---
source: https://react.dev/reference/react-dom/components/title
---

# `<title>`

The built-in browser `<title>` component lets you specify the title of the document. You can render `<title>` from any component and React will always place the corresponding DOM element in the document head.

## Signature / Usage

```js
<title>My Blog</title>
```

Use string interpolation to pass `<title>` a single string:

```js
<title>{`Results page ${pageNumber}`}</title>
```

## Options / Props

`<title>` supports all [common element props](./common.md).

| Name | Type | Description |
| --- | --- | --- |
| children | string | `<title>` accepts only text as a child. This text will become the title of the document. You can also pass your own components as long as they only render text. |

## Notes

- Special rendering behavior: React will always place the DOM element corresponding to the `<title>` component within the document's `<head>`, regardless of where in the React tree it is rendered.
- Exception: if `<title>` is within an `<svg>` component, there is no special behavior, because in this context it is an accessibility annotation for that SVG graphic.
- Exception: if the `<title>` has an `itemProp` prop, there is no special behavior, because in this case it represents metadata about a specific part of the page.
- Only render a single `<title>` at a time. If more than one component renders a `<title>` tag at the same time, React will place all of those titles in the document head. When this happens, the behavior of browsers and search engines is undefined.
- The children of `<title>` must be a single string of text (or a single number or a single object with a `toString` method). Using JSX curly braces like `<title>Results page {pageNumber}</title>` gives the component a two-element array as its children and causes an error.
- Built-in DOM element, distinct from framework metadata APIs: see nextjs-app (Metadata API) and react-router (`<Meta>`, `<Links>`).

## Related

- [meta](./meta.md)
- [link](./link.md)
- [Common components](./common.md)
