# WebStorage

`WebStorage` (since v1.61) exposes the page's `localStorage` or `sessionStorage` for the current origin via an async, browser-consistent API. Instances are accessed through `page.localStorage` and `page.sessionStorage`.

## Signature / Usage

```ts
await page.goto('https://example.com');
await page.localStorage.setItem('token', 'abc');
const token = await page.localStorage.getItem('token');
const all = await page.localStorage.items();
await page.localStorage.removeItem('token');
await page.localStorage.clear();
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `items()` | `Promise<Array<{ name: string; value: string }>>` | All items as name/value pairs (`WebStorageItem`) |
| `getItem(name: string)` | `Promise<null \| string>` | Value for the given name if present |
| `setItem(name: string, value: string)` | `Promise<void>` | Sets the value, overwriting any existing value for that name |
| `removeItem(name: string)` | `Promise<void>` | Removes the item. No-op if absent |
| `clear()` | `Promise<void>` | Removes all items from the storage |

## Notes

- All methods are available since v1.61.
- Operates on the storage of the current origin of the page.
- Source: https://playwright.dev/docs/api/class-webstorage (microsoft/playwright v1.64.1 `docs/src/api/class-webstorage.md`)

## Related

- [page.md](./page.md)
- [browser-context.md](./browser-context.md)
