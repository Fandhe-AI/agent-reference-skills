---
source: https://ui.shadcn.com/docs/registry/open-in-v0
---

# Open in v0

If a registry is hosted and publicly accessible via URL, an item can be opened in v0 through the `https://v0.dev/chat/api/open?url=[URL]` endpoint.

## Signature / Usage

```tsx
import { Button } from "@/components/ui/button"

export function OpenInV0Button({ url }: { url: string }) {
  return (
    <Button
      aria-label="Open in v0"
      className="h-8 gap-1 rounded-[6px] bg-black px-3 text-xs text-white hover:bg-black hover:text-white dark:bg-white dark:text-black"
      asChild
    >
      <a
        href={`https://v0.dev/chat/api/open?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
      >
        Open in v0
      </a>
    </Button>
  )
}
```

```jsx
<OpenInV0Button url="https://example.com/r/hello-world.json" />
```

Query-parameter authentication on the registry server:

```typescript
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")

  if (!isValidToken(token)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Invalid or missing token",
      },
      { status: 401 }
    )
  }

  return NextResponse.json(registryItem)
}
```

## Notes

- `Open in v0` does not support `cssVars`, `css`, `envVars`, namespaced registries, or advanced authentication methods. Only a `token` query parameter is supported (`https://registry.company.com/r/hello-world.json?token=your_secure_token_here`); return `401 Unauthorized` for a missing or invalid token. Both the shadcn CLI and Open in v0 handle 401 and show a message.
- Example endpoint: `https://v0.dev/chat/api/open?url=https://ui.shadcn.com/r/styles/new-york/login-01.json`. The SVG logo in the source button example is abbreviated here ("Open in v0" text); the official page links "Build your Open in v0 button" at `https://v0.dev/chat/button`.
- The button example uses `asChild` on the copied `Button` component as written in the source docs; the page does not discuss Base UI `render` versus Radix `asChild`.
- Adapted (not in the official docs): the official button interpolates `url` without encoding; `encodeURIComponent(url)` added so registry URLs with their own query string (for example `?token=...`) are passed through intact.
- Encrypt and expire tokens; never expose production tokens in docs or examples.
- v0 / Vercel platform details are covered by skill vercel.

## Related

- [Authentication](./authentication.md)
- [Getting Started](./getting-started.md)
