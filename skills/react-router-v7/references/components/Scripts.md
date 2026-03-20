# Scripts

Renders the client-side JavaScript runtime of the app. Must be placed inside `<body>`. Can be omitted to ship a JavaScript-free, traditional web app when server-rendering.

## Props

| Name | Type | Description |
|------|------|-------------|
| `...scriptProps` | `ScriptsProps` | Any valid `<script>` element attributes (e.g., `nonce`, `crossOrigin`) spread onto each rendered `<script>` tag. |

## 使用例

```tsx
import { Scripts } from "react-router";

export default function Root() {
  return (
    <html>
      <head>...</head>
      <body>
        <Scripts />
      </body>
    </html>
  );
}
```

```tsx
// With CSP nonce
<Scripts nonce={cspNonce} />
```

## 注意点

- **Framework mode only** — not available in Data or Declarative modes.
- Must be rendered inside `<body>`, not `<head>`.
- Omitting `<Scripts>` in an SSR setup produces a fully functional app with no JavaScript (progressive enhancement baseline).

## 関連

- [Links.md](./Links.md)
- [Meta.md](./Meta.md)
- [ScrollRestoration.md](./ScrollRestoration.md)
