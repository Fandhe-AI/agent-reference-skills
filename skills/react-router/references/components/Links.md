# Links

Renders all `<link>` tags collected from each route module's `links` export. Must be placed inside the `<head>` of the root document. Framework mode only.

## Signature / Usage

```tsx
function Links({ nonce, crossOrigin }: LinksProps): React.JSX.Element

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

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `nonce` | `string` | A `nonce` attribute applied to each rendered `<link>` element (for CSP). Defaults to the `<ServerRouter nonce>` prop if not provided. |
| `crossOrigin` | `string` | A `crossOrigin` attribute applied to each rendered `<link>` element. |

## Notes

- **Framework mode only** — not available in Data or Declarative modes.
- Must be rendered inside `<head>`. Placing it elsewhere will result in invalid HTML.
- Works in conjunction with the `links` export of each route module to inject stylesheets and other link tags.

## Related

- [Meta](./Meta.md)
- [Scripts](./Scripts.md)
- [ScrollRestoration](./ScrollRestoration.md)
