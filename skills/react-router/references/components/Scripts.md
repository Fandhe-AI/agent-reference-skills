# Scripts

Renders the client-side JavaScript runtime of the app. Must be placed inside `<body>`. Can be omitted to ship a JavaScript-free, traditional web app when server-rendering. Framework mode only.

## Signature / Usage

```tsx
function Scripts(scriptProps: ScriptsProps): React.JSX.Element | null

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

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `...scriptProps` | `ScriptsProps` | Any valid `<script>` element attributes (e.g., `nonce`, `crossOrigin`) spread onto each rendered `<script>` tag. |

## Notes

- **Framework mode only** — not available in Data or Declarative modes.
- Must be rendered inside `<body>`, not `<head>`.
- Omitting `<Scripts>` in an SSR setup produces a fully functional app with no JavaScript (progressive enhancement baseline).

## Related

- [Links](./Links.md)
- [Meta](./Meta.md)
- [ScrollRestoration](./ScrollRestoration.md)
