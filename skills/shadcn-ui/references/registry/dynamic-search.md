---
source: https://ui.shadcn.com/docs/registry/dynamic-search
---

# Dynamic Search

Opt-in server-side search for large registries. By default `shadcn search` fetches the whole `registry.json` and filters locally; a dynamic registry filters server-side and returns a `pagination` object.

## Signature / Usage

```bash
npx shadcn@latest search @acme --query button --limit 50
```

```txt
GET https://acme.com/r/registry.json?q=button&limit=50&offset=0
```

Response:

```json
{
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "description": "A button component."
    }
  ],
  "pagination": {
    "total": 12,
    "offset": 0,
    "limit": 2,
    "hasMore": true
  }
}
```

Next.js route handler:

```typescript
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const query = searchParams.get("q")
  const types = searchParams.get("type")?.split(",")
  const limit = Number(searchParams.get("limit") ?? 100)
  const offset = Number(searchParams.get("offset") ?? 0)

  if (
    !Number.isInteger(limit) ||
    !Number.isInteger(offset) ||
    offset < 0 ||
    limit < 1 ||
    limit > 100
  ) {
    return NextResponse.json({ error: "Invalid pagination" }, { status: 400 })
  }

  const { items, total } = await searchItems({ query, types, limit, offset })

  return NextResponse.json({
    name: "acme",
    homepage: "https://acme.com",
    items,
    pagination: {
      total,
      offset,
      limit,
      hasMore: offset + limit < total,
    },
  })
}
```

## Options / Props

Query parameters sent by the CLI (all optional; a request without `q` or `type` should return all items, paginated):

| Parameter | Description |
| --- | --- |
| `q` | The search query string. |
| `type` | Comma-separated item types, e.g. `registry:ui,registry:block`. |
| `limit` | Maximum number of items to return. |
| `offset` | Number of items to skip. |

`pagination` object:

| Property | Type | Description |
| --- | --- | --- |
| `total` | `number` | Total number of items matching the query. |
| `offset` | `number` | Number of items skipped. |
| `limit` | `number` | Maximum number of items in this response. |
| `hasMore` | `boolean` | Whether more items are available beyond this page. |

## Notes

- The presence of `pagination` in the response signals server-side search; the CLI then skips local filtering and preserves your ordering. No configuration or negotiation is needed.
- Search results only need `name`, `type`, `description` per item; the full definition is fetched on `shadcn add`.
- Multiple registries (`shadcn search @acme @lib`): a global offset cannot be split, so the CLI forwards `q`, `type` and a `limit` of `offset + limit` to each registry, then merges and paginates locally. If a registry caps items below the requested `limit`, the CLI treats it as exhausted for deeper pages.
- Works with all authentication patterns: configured headers and params are sent with the search request.
- Backwards compatible: static registries ignore query parameters; older CLI versions ignore `pagination`, so return a sensible default (e.g. first page) for parameterless requests.
- Adapted (not in the official docs): limit / offset validation (finite integers, offset >= 0, 1 <= limit <= 100, otherwise 400) added; the official handler passes Number() results straight to searchItems.
- Test with `curl "https://acme.com/r/registry.json?q=button&limit=10"`.

## Related

- [Authentication](./authentication.md)
- [Getting Started](./getting-started.md)
- [Namespaces](./namespace.md)
