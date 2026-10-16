---
source: https://tanstack.com/start/latest/docs/framework/react/guide/production-checklist
---

# Production Checklist

Checks to run against the production build and again through the public hostname. A passing development server does not verify the deployment adapter, runtime environment, or CDN.

## Signature / Usage

Example for the "keep secrets out of browser output" check (the doc prescribes the procedure, not a command; this is one way to run it): build with a harmless unique test secret, then search the emitted client output.

```sh
# Build with a harmless, unique test secret (never a real one), then search client output
MY_TEST_SECRET=canary-12345 npm run build
grep -r "canary-12345" dist/client
```

## Checklist

| Area | Check |
| --- | --- |
| Secrets and server boundaries | Check required environment variables at runtime; keep secrets out of browser output (client files, published source maps, response bodies, server-function return values) |
| Authorization and mutations | Test endpoints directly (signed out / different account); exercise session expiry and sign-out; reject invalid and cross-site writes, including repeated submissions |
| Cache isolation and rendering | Request the same private URL as two accounts concurrently; check final cache headers and update behavior; compare a direct visit with client navigation |
| HTTP responses and search visibility | Probe success / missing / redirect / error responses; inspect public HTML before JavaScript runs; check `robots.txt`, sitemap, and indexing rules |
| Assets, logging, and deployment | Inspect the production network waterfall; trigger and find a controlled error; run the deployed entry point and rehearse rollback |

## Notes

- A redirect in `beforeLoad` does not protect a separately callable endpoint.
- Use `Cache-Control: no-store` for personalized responses unless there is an explicit identity-partitioned cache key and lifecycle. `private` alone does not prevent a browser cache from retaining one account's response after sign-out.
- A real missing public resource should return HTTP 404; check status codes before following redirects.
- Robots rules are not access control. Remove accidental production `noindex` rules, but keep private and preview content out of search.
- Rehearse restoring a previous release and account for any database migration separately.
- Keep a release record: tested commit, runtime, hostname, commands, and results. Turn repeatable HTTP and browser checks into CI tests; repeat host-specific checks after deployment changes.
- The doc points to a Next.js migration example (`examples/start-next-migration`) as a starting point for production browser checks; its demo credentials and cookie session are for local comparison only.

## Related

- [Hosting](./hosting.md)
- [Observability](./observability.md)
