# CSS Helper

Write CSS-in-JS using tagged template literals inside JSX. Requires `<Style />` in the document head.

## Signature / Usage

```ts
import { css, cx, keyframes, Style } from 'hono/css'

// Generate a class name
const headerClass = css`
  background-color: orange;
  color: white;
  &:hover { opacity: 0.8; }
`

// Define keyframe animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

// Compose multiple classes
const combined = cx(headerClass, extraClass)

// In JSX render
<head><Style /></head>
<h1 class={headerClass}>Hello</h1>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `css` | tagged template | Generates a scoped class name string |
| `keyframes` | tagged template | Defines a CSS animation, returns animation name string |
| `cx` | `(...classes: string[]) => string` | Composes multiple class names |
| `Style` | JSX component | Injects collected CSS into `<style>` tag; accepts `nonce` prop |

## Notes

- `<Style />` must be included in the document `<head>` or the CSS will not render
- Pseudo-classes use the nesting selector `&` (e.g., `&:hover`)
- Global styles can be defined using the `:-hono-global` pseudo-selector
- `nonce` prop on `<Style />` supports Content-Security-Policy headers

## Related

- [HTML Helper](./html.md)
