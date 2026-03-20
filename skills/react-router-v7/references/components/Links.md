# Links

Renders all `<link>` tags collected from each route module's `links` export. Must be placed inside the `<head>` of the root document.

## Props

| Name | Type | Description |
|------|------|-------------|
| `nonce` | `string` | A `nonce` attribute applied to each rendered `<link>` element (for CSP). |
| `crossOrigin` | `string` | A `crossOrigin` attribute applied to each rendered `<link>` element. |

## 使用例

```tsx
import { Links } from "react-router";

export default function Root() {
  return (
    <html>
      <head>
        <Links />
      </head>
      <body>...</body>
    </html>
  );
}
```

## 注意点

- **Framework mode only** — not available in Data or Declarative modes.
- Must be rendered inside `<head>`. Placing it elsewhere will result in invalid HTML.
- Works in conjunction with the `links` export of each route module to inject stylesheets and other link tags.

## 関連

- [Meta.md](./Meta.md)
- [Scripts.md](./Scripts.md)
- [ScrollRestoration.md](./ScrollRestoration.md)
