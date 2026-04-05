# HTML Helper

Tagged template literal for writing HTML safely in JavaScript, plus `raw()` for unescaped output.

## Signature / Usage

```ts
import { html, raw } from 'hono/html'

// Tagged template literal
html`<h1>Hello! ${username}!</h1>`

// Render unescaped content
raw(content: string): HtmlEscapedString

// As a functional component
const Footer = () => html`<footer><address>...</address></footer>`
```

## Notes

- Variables interpolated into `html` are automatically escaped; use `raw()` to bypass escaping (manual sanitization required)
- Can be used as a JSX replacement — no need for `dangerouslySetInnerHTML`
- IDE syntax highlighting via lit-html extensions

## Related

- [CSS Helper](./css.md)
- [Streaming Helper](./streaming.md)
