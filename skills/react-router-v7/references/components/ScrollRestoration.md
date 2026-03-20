# ScrollRestoration

Emulates browser scroll restoration on location changes and renders an inline `<script>` to prevent scroll flash. Should be rendered once, right before `<Scripts>`.

## Props

| Name | Type | Description |
|------|------|-------------|
| `getKey` | `(location: Location, matches: RouteMatch[]) => string` | Returns a key used to store/restore scroll positions. Defaults to `location.key`. Use `location.pathname` for pathname-based restoration. |
| `nonce` | `string` | A `nonce` attribute on the inline `<script>` element for CSP compliance. |
| `storageKey` | `string` | `sessionStorage` key for persisting scroll positions. Default: `"react-router-scroll-positions"`. |

## 使用例

```tsx
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

## 注意点

- Render only **one** `ScrollRestoration` in the entire app.
- Must be placed before `<Scripts>` in the document.
- Available in Framework and Data modes; **not** available in Declarative mode.
- Scroll positions are stored in `sessionStorage` and survive page reloads within the same tab.

## 関連

- [Scripts.md](./Scripts.md)
- [Links.md](./Links.md)
