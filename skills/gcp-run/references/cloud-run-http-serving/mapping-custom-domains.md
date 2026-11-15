---
source: https://docs.cloud.google.com/run/docs/mapping-custom-domains
---

# Mapping custom domains

Set up a custom domain instead of the default `run.app` address. Three options: a global external Application Load Balancer (recommended), Cloud Run domain mapping (limited availability and Preview), or Firebase Hosting. Multiple custom domains can map to the same service.

## Signature / Usage

### Cloud Run domain mapping (Preview)

Verify domain ownership (first use in a project, unless the domain was bought from Google):

```bash
gcloud domains list-user-verified
```

```bash
gcloud domains verify BASE-DOMAIN
```

For `subdomain.example.com` you must verify `example.com`. Then map the service:

```bash
gcloud beta run domain-mappings create --service SERVICE --domain DOMAIN
```

Or map while deploying:

```bash
gcloud beta run deploy SERVICE --image IMAGE --domain DOMAIN
```

Retrieve the DNS records to add at your registrar (use all records under `resourceRecords`):

```bash
gcloud beta run domain-mappings describe --domain DOMAIN
```

Delete a mapping:

```bash
gcloud beta run domain-mappings delete --domain DOMAIN
```

### Firebase Hosting

`firebase.json` (kept in a folder separate from the service source):

```json
  {
    "hosting": {
      "rewrites": [{
        "source": "**",
        "run": {
          "serviceId": "SERVICE_NAME",
          "region": "REGION"
        }
      }]
    }
  }
```

```bash
firebase deploy --only hosting --project PROJECT_ID
```

## Options / Props

| Option | Notes |
|---|---|
| Global external Application Load Balancer (recommended) | Own TLS certificate, route URL paths to the service, Cloud CDN, Google Cloud Armor, multiple services per dynamic hostname or path via URL masks (for example a `SERVICE.example.com` pattern) |
| Cloud Run domain mapping | Preview, not production-ready (latency issues); not recommended for production |
| Firebase Hosting | Low price; can serve static content alongside dynamic Cloud Run content; not covered by Google Cloud Terms of Service |

Domain mapping limitations:

| Limitation | Value |
|---|---|
| Launch stage | Preview (Pre-GA, "as is", limited support) |
| TLS certificate | Google-managed, auto-issued and renewed; usually about 15 minutes, up to 24 hours |
| TLS 1.0 / 1.1 | Cannot be disabled (use Firebase Hosting or Cloud Load Balancing for TLS 1.2-only) |
| Own (self-managed) or wildcard certificates | Not supported |
| Mapping length | Limited to 64 characters |
| Paths | Map a domain or subdomain to `/` only, not a path like `/users` |
| Regions | `asia-east1`, `asia-northeast1`, `asia-southeast1`, `europe-north1`, `europe-west1`, `europe-west4`, `us-central1`, `us-east1`, `us-east4`, `us-west1`; use another option elsewhere |

DNS record types returned: `A`, `AAAA`, or `CNAME`. Use name `@` for `example.com` and `www` for `www.example.com`.

## Notes

- Destructive: `gcloud beta run domain-mappings delete` removes the mapping, and `--force-override` on create removes a domain from another service. Try on a disposable domain first.
- DNS changes usually take minutes, sometimes several hours depending on registrar and TTL; certificate issuance can take several more minutes.
- With CAA DNS records, authorize both `pki.goog` and `letsencrypt.org` so Cloud Run can issue and renew the managed certificate.
- Some third-party CDNs can intercept validation requests; for Cloudflare CDN turn off "Always use https" under SSL/TLS > Edge Certificates.
- Domain verification is per user account; add other users or service accounts under Verified owners in Search Console. A verified owner can override mappings from other projects after confirmation.
- Authenticated services: audience is normally the generated `run.app` URL; with a custom domain, configure a custom audience (https://docs.cloud.google.com/run/docs/configuring/custom-audiences).
- If domain forwarding is already configured on a third-party load balancer, domain mapping is not needed.
- The source also shows Console and Terraform forms (omitted).
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that run only inside the container.
- Source: https://docs.cloud.google.com/run/docs/mapping-custom-domains (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [https-request.md](./https-request.md)
- Load balancer setup: https://docs.cloud.google.com/load-balancing/docs/https/setup-global-ext-https-serverless
