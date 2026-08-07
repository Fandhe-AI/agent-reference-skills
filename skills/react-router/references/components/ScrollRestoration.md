# ScrollRestoration

Emulates browser scroll restoration on location changes and renders an inline `<script>` to prevent scroll flash. Should be rendered once, right before `<Scripts>`. Available in Framework and Data modes; not available in Declarative mode.

## Signature / Usage

```tsx
function ScrollRestoration({ getKey, storageKey, ...props }: ScrollRestorationProps)

import { ScrollRestoration, Scripts } from "react-router";

export default function Root() {
  return (
    <html>
      <body>
        <ScrollRestoration
          getKey={(location) => location.pathname}
        />
        <Scripts />
      </body>
    </html>
  );
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `getKey` | `(location: Location, matches: RouteMatch[]) => string` | Returns a key used to store/restore scroll positions. Defaults to `location.key`. Use `location.pathname` for pathname-based restoration. |
| `nonce` | `string` | A `nonce` attribute on the inline `<script>` element for CSP compliance. Defaults to the `<ServerRouter nonce>` prop if not provided (Framework mode). |
| `storageKey` | `string` | `sessionStorage` key for persisting scroll positions. Default: `"react-router-scroll-positions"`. |

## Notes

- Render only **one** `ScrollRestoration` in the entire app.
- Must be placed before `<Scripts>` in the document.
- Available in Framework and Data modes; **not** available in Declarative mode.
- Scroll positions are stored in `sessionStorage` and survive page reloads within the same tab.

## Related

- [Scripts](./Scripts.md)
- [Links](./Links.md)
