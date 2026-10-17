---
source: https://ui.shadcn.com/docs/registry/authentication
---

# Authentication

Secure a registry for private, team-specific or personalized items. Credentials are configured per namespace in `components.json` using headers or query params with `${ENV_VAR}` expansion.

## Signature / Usage

```json
{
  "registries": {
    "@private": {
      "url": "https://registry.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

```bash
# .env.local
REGISTRY_TOKEN=your_secret_token_here
```

Server side (Next.js route handler):

```typescript
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const authHeader = request.headers.get("authorization")
  const token = authHeader?.replace("Bearer ", "")
  const queryToken = request.nextUrl.searchParams.get("token")

  if (!isValidToken(token || queryToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!hasAccessToComponent(token, params.name)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const component = await getComponent(params.name)
  return NextResponse.json(component)
}
```

## Notes

- Patterns: Bearer token / API key headers (`X-API-Key`, `X-Workspace-Id`), query-parameter auth (`"params": { "token": "${ACCESS_TOKEN}" }` yields `https://registry.company.com/button.json?token=your_token`), and mixing public and per-registry authenticated namespaces (`@public`, `@internal`, `@premium` with `X-License-Key`).
- Advanced server patterns shown: team-based access, user-personalized registries, temporary expiring tokens, Express.js handler. The helper functions in the samples (`isValidToken`, `hasAccessToComponent`, `getTeamFromToken`, ...) are illustrative placeholders.
- Best practices: environment variables, HTTPS, rate limiting (express-rate-limit example), token rotation, access logging.
- CLI handles `401 Unauthorized` (invalid or missing token), `403 Forbidden` (lacks permission) and `429 Too Many Requests`. A response body with `error` and `message` is displayed to the user (for example `"message": "Your subscription has expired. Please renew at company.com/billing"`).
- Test locally with `curl -H "Authorization: Bearer your_token" https://registry.company.com/button.json` or `REGISTRY_TOKEN=your_token npx shadcn@latest add @private/button`.
- Namespace configuration details are in the Namespaces page; Open in v0 supports only query-parameter authentication.

## Related

- [Namespaces](./namespace.md)
- [Dynamic Search](./dynamic-search.md)
- [Open in v0](./open-in-v0.md)
