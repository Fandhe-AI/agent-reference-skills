# Microfrontends

## Signature / Usage

Turborepo ships a built-in local development proxy server that unifies multiple applications behind a single entry point (default: `http://localhost:3024`).

```json
{
  "$schema": "https://turborepo.dev/microfrontends/schema.json",
  "options": { "localProxyPort": 3024 },
  "applications": {
    "web": {
      "development": { "local": { "port": 3000 } }
    },
    "docs": {
      "packageName": "documentation",
      "development": {
        "local": { "port": 3001 },
        "fallback": "example.com"
      },
      "routing": [
        { "group": "documentation", "paths": ["/docs", "/docs/:path*"] }
      ]
    }
  }
}
```

Port configuration:

```json
{ "scripts": { "dev": "next dev --port $(turbo get-mfe-port)" } }
```

Vite: use the `TURBO_MFE_PORT` environment variable.

## Options / Props

| Framework | Config file | Property |
|---|---|---|
| Next.js | `next.config.ts` | `basePath` |
| Nuxt / SvelteKit / Vite | `vite.config.ts` | `base` |

| Pattern | Description |
|---|---|
| `/pricing` | Exact match |
| `/blog/:slug` | Parameter (single segment) |
| `/docs/:path*` | Wildcard (zero or more) |
| `/api/:path+` | Plus (one or more) |

## Notes

- Paths are case-sensitive.
- The Turborepo proxy is for local development only. For production on Vercel, use `@vercel/microfrontends`.
