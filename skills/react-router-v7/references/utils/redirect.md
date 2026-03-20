# redirect

Creates an HTTP redirect `Response` with a `Location` header. Defaults to `302 Found`. Use inside loaders or actions to send the user to another URL.

## Signature

```typescript
function redirect(url: string, init?: number | ResponseInit): Response
```

## Usage

```typescript
import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  if (!isLoggedIn(request)) {
    throw redirect("/login");
  }
  // continue with loader logic
}
```

Custom status code:

```typescript
throw redirect("/new-location", 301);
```

Custom headers:

```typescript
return redirect("/dashboard", {
  headers: { "Set-Cookie": "session=abc; Path=/" },
});
```

## Notes

- Defaults to status `302 Found`; pass `301`, `303`, `307`, or `308` as needed
- Can be `throw`n or `return`ed from a loader/action
- Performs client-side navigation (uses `history.pushState`); use `redirectDocument` for a full page reload
- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)

## Related

- [redirectDocument](./redirectDocument.md)
- [replace](./replace.md)
- [data](./data.md)
