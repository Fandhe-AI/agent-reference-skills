---
source: https://react.dev/reference/react-dom/components
---

# React DOM Components

React supports all of the browser built-in HTML and SVG components.

## Signature / Usage

```jsx
<my-element value="Hello, world!"></my-element>
```

Rendering a tag with a dash (like `<my-element>`) renders a custom HTML element. A built-in HTML element with an `is` attribute is also treated as a custom element.

Listening for `CustomEvent`s on a custom element uses an `on` prefix (events are case-sensitive and support dashes):

```jsx
// Listens for `say-hi` events
<my-element onsay-hi={console.log}></my-element>
// Listens for `sayHi` events
<my-element onsayHi={console.log}></my-element>
```

## Notes

Categories:

| Category | Components | Notes |
| --- | --- | --- |
| Common components | all built-in browser components | Support common props and events, including React-specific `ref` and `dangerouslySetInnerHTML`. See [common](./common.md). |
| Form components | `<input>`, `<select>`, `<textarea>` | Passing the `value` prop makes them controlled. See [input](./input.md), [select](./select.md), [textarea](./textarea.md). |
| Resource and metadata components | `<img>`, `<link>`, `<meta>`, `<script>`, `<style>`, `<title>` | React can render them into the document head, suspend while resources are loading, and enact other behaviors described on each page. |
| All HTML components | `<div>`, `<button>`, `<form>`, `<dialog>`, `<table>`, ... | All built-in browser HTML elements are supported. Only `<img>`, `<input>`, `<option>`, `<progress>`, `<select>`, `<textarea>` link to React pages; the rest link to MDN. |
| All SVG components | `<svg>`, `<path>`, `<circle>`, `<g>`, ... | All built-in browser SVG elements are supported. |

General behavior:

- React uses a `camelCase` convention for prop names, like the DOM standard (e.g. `tabIndex` instead of `tabindex`).
- Custom elements: by default React passes values bound in JSX as attributes, and non-string JavaScript values are serialized (e.g. `value={[1,2,3]}` is passed as `"1,2,3"`).
- React will, however, pass arbitrary values as a property if the property name shows up on the custom element class during construction.
- Namespaced SVG attributes are written without the colon: `xlink:href` becomes `xlinkHref`, `xml:lang` becomes `xmlLang`, `xmlns:xlink` becomes `xmlnsXlink` (the same pattern applies to `xlink:actuate` / `arcrole` / `role` / `show` / `title` / `type` and `xml:base` / `xml:space`).

## Related

- [Common components](./common.md)
- [form](./form.md)
- [input](./input.md)
- [select](./select.md)
- [textarea](./textarea.md)
- [option](./option.md)
- [progress](./progress.md)
- [img](./img.md)
- [link](./link.md)
- [meta](./meta.md)
- [script](./script.md)
- [style](./style.md)
- [title](./title.md)
