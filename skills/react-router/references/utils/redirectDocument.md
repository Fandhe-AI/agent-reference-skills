# redirectDocument

Creates an HTTP redirect `Response` that forces a **full document reload** at the new location, bypassing client-side navigation. Defaults to `302 Found`.

## Signature / Usage

```typescript
function redirectDocument(url: string, init?: number | ResponseInit): Response
```

```typescript
import { redirectDocument } from "react-router";
import { destroySession } from "../sessions.server";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirectDocument("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}
```

## Notes

- Unlike `redirect()`, this causes the browser to make a new HTTP GET request (no SPA navigation)
- Useful when you need `Set-Cookie` headers to be processed by the browser, need to clear client-side state, or redirect to an external URL
- Defaults to status `302 Found`
- Accepts absolute URLs and can navigate to external domains — applications should validate any user-supplied redirect inputs to avoid open-redirect vulnerabilities
- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)

## Related

- [redirect](./redirect.md)
- [replace](./replace.md)
