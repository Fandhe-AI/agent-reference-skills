# vercel.json Configuration

Configure redirects, rewrites, serverless functions, and cron jobs in a single `vercel.json` at the project root.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",

  "redirects": [
    { "source": "/me", "destination": "/profile", "permanent": false },
    { "source": "/blog/:path*", "destination": "/news/:path*" },
    {
      "source": "/:path((?!uk/).*)",
      "has": [{ "type": "header", "key": "x-vercel-ip-country", "value": "GB" }],
      "destination": "/uk/:path*",
      "permanent": false
    }
  ],

  "rewrites": [
    { "source": "/about", "destination": "/about-our-company.html" },
    { "source": "/(.*)", "destination": "/index.html" },
    {
      "source": "/proxy/:match*",
      "destination": "https://example.com/:match*"
    }
  ],

  "functions": {
    "api/heavy.js": {
      "maxDuration": 60
    },
    "api/*.js": {
      "maxDuration": 30
    }
  },

  "crons": [
    { "path": "/api/cleanup",    "schedule": "0 2 * * *" },
    { "path": "/api/sync-data",  "schedule": "*/15 * * * *" }
  ]
}
```

## Notes

- `redirects` sends the browser to a new URL (307 temporary when `permanent: false`, 308 permanent when `true`).
- `rewrites` proxies internally — the browser URL does not change; use `/(.*) → /index.html` for SPAs.
- `functions.maxDuration` limits are plan-dependent: 60 s (Hobby), 300 s (Pro), 900 s (Enterprise).
- `crons` only run against the **production** deployment; cron expressions follow standard 5-field POSIX format.
