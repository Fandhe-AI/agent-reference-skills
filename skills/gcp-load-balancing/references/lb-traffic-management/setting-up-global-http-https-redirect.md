---
source: https://docs.cloud.google.com/load-balancing/docs/https/setting-up-global-http-https-redirect
---

# Set up an HTTP-to-HTTPS redirect for global external Application Load Balancers

How to redirect all HTTP requests to HTTPS on a global external Application Load Balancer by using URL map redirects, with a partial HTTP load balancer that shares the HTTPS load balancer's IP address. This page is for the global external mode only; classic and regional external Application Load Balancers have separate pages.

## Signature / Usage

### Create the redirect URL map (existing HTTPS load balancer, "LB1")

Create `/tmp/web-map-http.yaml` (uses `MOVED_PERMANENTLY_DEFAULT`):

```yaml
kind: compute#urlMap
name: web-map-http
defaultUrlRedirect:
  redirectResponseCode: MOVED_PERMANENTLY_DEFAULT
  httpsRedirect: True
tests:
- description: Test with no query parameters
  host: example.com
  path: /test/
  expectedOutputUrl: https://example.com/test/
  expectedRedirectResponseCode: 301
- description: Test with query parameters
  host: example.com
  path: /test/?parameter1=value1&parameter2=value2
  expectedOutputUrl: https://example.com/test/?parameter1=value1&parameter2=value2
  expectedRedirectResponseCode: 301
```

Validate the URL map:

```bash
gcloud compute url-maps validate --source /tmp/web-map-http.yaml
```

If the tests pass, import it (this overwrites an existing URL map of the same name after a `Do you want to continue (Y/n)?` prompt):

```bash
gcloud compute url-maps import web-map-http \
    --source /tmp/web-map-http.yaml \
    --global
```

```bash
gcloud compute url-maps describe web-map-http
```

### Target HTTP proxy and forwarding rule ("LB2")

Create or update the target HTTP proxy that uses `web-map-http`:

```bash
gcloud compute target-http-proxies create http-lb-proxy \
    --url-map=web-map-http \
    --global
```

```bash
gcloud compute target-http-proxies update http-lb-proxy \
    --url-map=web-map-http \
    --global
```

Create the forwarding rule on the same IP address as the HTTPS load balancer (`lb-ipv4-1`):

```bash
gcloud compute forwarding-rules create http-content-rule \
    --load-balancing-scheme=EXTERNAL_MANAGED \
    --address=lb-ipv4-1 \
    --network-tier=PREMIUM \
    --global \
    --target-http-proxy=http-lb-proxy \
    --ports=80
```

### Optional: add a custom HSTS header on LB1's backend service

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME_LB1 \
    --global \
    --custom-response-header='Strict-Transport-Security:max-age=31536000; includeSubDomains; preload'
```

### Test the redirect

Show the reserved IP address used by both load balancers.

Adapted (not in the official docs): added the missing line-continuation backslashes so the command runs as one command; the source block has the flags on separate lines without them.

```bash
gcloud compute addresses describe lb-ipv4-1 \
    --format="get(address)" \
    --global
```

```bash
curl -v http://hostname.com
```

## Options / Props

| Item | Value / behavior |
|---|---|
| Default redirect response code | `301 Moved Permanently` (`MOVED_PERMANENTLY_DEFAULT`); other response codes are possible |
| Frontend ports | Examples use 80 (HTTP) and 443 (HTTPS); each Application Load Balancer forwarding rule can reference a single port from 1-65535 |
| Redirect fields | `defaultUrlRedirect.redirectResponseCode`, `defaultUrlRedirect.httpsRedirect` |
| HSTS header | Name `Strict-Transport-Security`; value `max-age=31536000; includeSubDomains; preload` |
| Load balancing scheme of the redirect forwarding rule | `EXTERNAL_MANAGED`, `--network-tier=PREMIUM` |

## Notes

- New HTTPS load balancers can use the Console checkbox **Enable HTTP to HTTPS Redirect** (requires the HTTPS protocol and a reserved, non-ephemeral IP address). It creates a partial HTTP load balancer (URL map, forwarding rule, target HTTP proxy) with a `-redirect` suffix and a `301` default. The checkbox exists only while creating a new load balancer, and has no gcloud or API equivalent; use the steps above instead.
- For an existing HTTPS load balancer, LB2 must use the same frontend IP address as LB1; if the addresses differ, the redirect won't work. The source says to delete the forwarding rule in LB2 and recreate it with LB1's IP address. Deleting a forwarding rule is destructive and can break connectivity; try it on a disposable resource first.
- `gcloud compute url-maps import` overwrites an existing URL map. With the HSTS header, the browser redirects later HTTP requests itself.
- Run the test after a few minutes. In the source example, `http://34.98.77.106/` redirects to `https://34.98.77.106/`, and the curl output shows `HTTP/1.1 301 Moved Permanently` with a `Location: https://hostname.com` header (output omitted here).
- Corrected from the official docs: the `gcloud compute addresses describe lb-ipv4-1` block listed `--format="get(address)"` and `--global` on separate lines without trailing `\`.
- The source also shows the Console steps and links to Terraform, GKE and internal Application Load Balancer redirect pages.
- Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Source: https://docs.cloud.google.com/load-balancing/docs/https/setting-up-global-http-https-redirect (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [url-map-concepts.md](./url-map-concepts.md)
- [custom-headers-global.md](./custom-headers-global.md)
- [traffic-management-global.md](./traffic-management-global.md)
- Clean up the load balancer setup: https://docs.cloud.google.com/load-balancing/docs/cleaning-up-lb-setup
