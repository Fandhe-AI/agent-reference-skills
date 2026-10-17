---
source: https://react.dev/reference/react-dom/components/meta
---

# `<meta>`

The built-in browser `<meta>` component lets you add metadata to the document. You can render `<meta>` from any component and React will always place the corresponding DOM element in the document head.

## Signature / Usage

```js
<meta name="keywords" content="React, JavaScript, semantic markup, html" />
```

Annotating specific items within the document (no special head placement because `itemProp` is set):

```js
<section itemScope>
  <h3>Annotating specific items</h3>
  <meta itemProp="description" content="API reference for using <meta> with itemProp" />
  <p>...</p>
</section>
```

## Options / Props

`<meta>` supports all [common element props](./common.md). It should have *exactly one* of the following props: `name`, `httpEquiv`, `charSet`, `itemProp`. The `<meta>` component does something different depending on which of these props is specified.

| Name | Type | Description |
| --- | --- | --- |
| name | string | Specifies the kind of metadata to be attached to the document. |
| charSet | string | Specifies the character set used by the document. The only valid value is `"utf-8"`. |
| httpEquiv | string | Specifies a directive for processing the document. |
| itemProp | string | Specifies metadata about a particular item within the document rather than the document as a whole. |
| content | string | Specifies the metadata to be attached when used with the `name` or `itemProp` props or the behavior of the directive when used with the `httpEquiv` prop. |

## Notes

- Special rendering behavior: React will always place the DOM element corresponding to the `<meta>` component within the document's `<head>`, regardless of where in the React tree it is rendered.
- Exception: if `<meta>` has an `itemProp` prop, there is no special behavior, because in this case it doesn't represent metadata about the document but rather metadata about a specific part of the page.
- Built-in DOM element, distinct from framework metadata APIs: see nextjs-app (Metadata API) and react-router (`<Meta>`, `<Links>`).

- Corrected from the source: react.dev lists the HTML attribute name `charset`; the React/JSX prop is `charSet` (`charset` triggers an invalid DOM property warning and a TypeScript error).

## Related

- [title](./title.md)
- [link](./link.md)
- [Common components](./common.md)
