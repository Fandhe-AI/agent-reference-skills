# replace

Creates a redirect `Response` that performs `history.replaceState` instead of `history.pushState`, replacing the current entry in the browser history stack rather than pushing a new one.

## Signature

```typescript
function replace(url: string, init?: number | ResponseInit): Response
```

## Usage

```typescript
import { replace } from "react-router";

export async function loader() {
  return replace("/new-location");
}
```

Custom status code:

```typescript
return replace("/corrected-url", 301);
```

## Notes

- Behaves like `redirect()` except the browser history entry is replaced, not pushed — the user cannot navigate back to the pre-redirect URL
- Defaults to status `302 Found`
- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)

## Related

- [redirect](./redirect.md)
- [redirectDocument](./redirectDocument.md)
