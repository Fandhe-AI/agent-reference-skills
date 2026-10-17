---
source: https://react.dev/reference/react-dom/components/style
---

# `<style>`

The built-in browser `<style>` component lets you add inline CSS stylesheets to your document. You can render `<style>` from any component and React will in certain cases place the corresponding DOM element in the document head and de-duplicate identical styles.

## Signature / Usage

```js
<style>{` p { color: red; } `}</style>
```

Opting into special rendering behavior with `href` and `precedence`:

```js
function PieChart({data, colors}) {
  const id = useId();
  const stylesheet = colors.map((color, index) =>
    `#${id} .color-${index}: \{ color: "${color}"; \}`
  ).join();
  return (
    <>
      <style href={"PieChart-" + JSON.stringify(colors)} precedence="medium">
        {stylesheet}
      </style>
      <svg id={id}>
        …
      </svg>
    </>
  );
}
```

## Options / Props

`<style>` supports all [common element props](./common.md).

| Name | Type | Description |
| --- | --- | --- |
| children | string (required) | The contents of the stylesheet. |
| precedence | string | Tells React where to rank the `<style>` DOM node relative to others in the document `<head>`, which determines which stylesheet can override the other. React infers that precedence values it discovers first are "lower" and values discovered later are "higher". Stylesheets with the same precedence go together whether they are `<link>` or inline `<style>` tags or loaded using `preinit` functions. |
| href | string | Allows React to de-duplicate styles that have the same `href`. |
| media | string | Restricts the stylesheet to a certain media query. |
| nonce | string | A cryptographic nonce to allow the resource when using a strict Content Security Policy. |
| title | string | Specifies the name of an alternative stylesheet. |
| blocking | string | Not recommended. If set to `"render"`, instructs the browser not to render the page until the stylesheet is loaded. React provides more fine-grained control using Suspense. |

## Notes

- Special rendering behavior: React can move `<style>` components to the document's `<head>`, de-duplicate identical stylesheets, and suspend while the stylesheet is loading. To opt in, provide the `href` and `precedence` props. React de-duplicates styles if they have the same `href`.
- React will ignore changes to props after the style has been rendered (React issues a warning in development if this happens).
- React will drop all extraneous props when using the `precedence` prop (beyond `href` and `precedence`).
- React may leave the style in the DOM even after the component that rendered it has been unmounted.
- The `href` prop should uniquely identify the stylesheet. If you supply a `precedence` prop, React reorders inline stylesheets based on the order these values appear in the component tree.
- Inline stylesheets will not trigger Suspense boundaries while they're loading, even if they load async resources like fonts or images.
- The PieChart snippet is verbatim from the official demo, which only illustrates where the `<style>` is hoisted; its generated CSS is not valid as written (stray `:` after the selector, quoted color value, default comma separator of `.join()`). In real code use `` `#${CSS.escape(id)} .color-${index} { color: ${color}; }` `` joined with `join("\n")`. Also, href depends only on colors while the CSS embeds the per-instance useId(), so two PieCharts with the same colors share one href and React de-duplicates the second instance's stylesheet; in real code include the id in href (e.g. href={`PieChart-${id}`}) or generate CSS that does not depend on id.
- Built-in DOM element. Not the same as the `style` prop on elements (see [common](./common.md)), nor CSS-in-JS libraries; framework styling APIs live in nextjs-app and react-router.

## Related

- [link](./link.md)
- [Common components](./common.md)
