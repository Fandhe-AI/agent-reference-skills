---
source: https://docs.cloud.google.com/iap/docs/faq
---

# Troubleshooting and frequently asked questions

Troubleshooting guidance, quotas, the TCP domains and error codes for Identity-Aware Proxy.

## Signature / Usage

### Inspect sign-in problems

Open an Incognito/Private window, open developer tools, **Network** tab, select **Preserve log**, reproduce the issue and examine the requests. Errors on `iap.googleapis.com` show a detailed message (adjust IAP settings such as OAuth client issues; open a Support ticket for unexplained client errors or server errors). Errors on your application domain show an error code (table below).

### Firewall "Server Error"

If you see the following message your firewall may be blocking load balancer IPs:

```text
The server encountered a temporary error and could not complete your request. Please try again in 30 seconds.
```

Allow `130.211.0.0/22` and `35.191.0.0/16`; for IAP TCP connections to specific VMs also allow `35.235.240.0/20`.

## Options / Props

### Quotas (error code 429 / 253)

| Request type | Limit |
|--------------|-------|
| Browser-based requests | 360,000 per minute per project |
| Programmatic requests (include an `AUTHORIZATION` or `PROXY-AUTHORIZATION` header and no IAP cookie) | 360,000 per minute per project |

### Domains used by IAP for TCP

| Domain | Condition |
|--------|-----------|
| `tunnel.cloudproxy.app` | Always |
| `mtls.tunnel.cloudproxy.app` | When certificate-based access is enabled |

### Common symptoms

| Symptom | Cause / fix |
|---------|-------------|
| `#` appended to the URL after sign-in | Normal in some browsers; no issue |
| `405 Method Not Allowed` | Cookies not attached; set `withCredentials` to `true` for `XMLHttpRequest`, `credentials` to `include` or `same-origin` for Fetch |
| `401 Unauthorized` instead of `302 Redirect` | Client not handling redirects; add `Accept: text/html,*/*` |
| POST not redirecting | Browsers do not redirect POSTs; send an ID token in an `Authorization: Bearer` header or valid cookies |
| API disabled | IAP-secured resources remain accessible, but you cannot modify IAM permissions |
| Owner role users can use IAP for TCP | Limit `roles/owner`; otherwise block IAP for TCP with firewall rules |
| Intermittent internal server errors | Codes `1`, `30`, `62`, `63`, `64`, `703` are typically transient; retry with exponential backoff |
| Error code `38` | Identity Platform authentication URL not configured correctly: IAP page, **Applications** tab, check **Authentication URL** or **Login URL** |
| Sign-in failures or loops with Identity Platform | Large IdP claims push the IAP session cookie past browser limits (typically around 4 KB); reduce claims, inspect cookie size, test with minimal claims |
| HTTP 502 `Empty Google Account OAuth client ID(s)/secret(s).` | Project not in an organization (the default Google-managed OAuth client needs one; configure custom OAuth credentials), or the custom OAuth client was deleted (re-create it and update IAP settings) |

### Error codes

| Code | Description | Troubleshooting |
|------|-------------|-----------------|
| 7, HTTP 502 | Empty OAuth client ID or secret | If the project has no organization, configure custom OAuth credentials; otherwise verify the client ID and secret on the Credentials page or via the GET / PATCH IAP properties API methods (Compute Engine, App Engine) |
| 9 | Failed OAuth redirect | Internal error, logged automatically; no action |
| 9 (path rewrite rules) | Failed OAuth redirect | Path rewrite rules block OAuth; ensure all backends behind the load balancer use identical OAuth client IDs (`gcloud compute backend-services update`) |
| 9 (path routing rules) | Failed OAuth redirect | Create path rules for both variants (with and without trailing slash), such as `/path/` and `/path`, to the same backend |
| 11 | Incorrectly configured OAuth client ID | Check client ID and secret on the Credentials page, or via the GET / PATCH API methods |
| 13 | Invalid OIDC token | Confirm the client ID was not deleted or modified incorrectly |
| 51 | Browser lacks connection pooling support | Ask users to update their browsers |
| 52 | Hostname/SSL certificate mismatch | Administrator updates the certificate to match the hostname |
| 52 (primary certificate map entry) | Hostname/SSL certificate mismatch | IAP does not support primary certificate map entries; use separate entries per certificate and hostname |
| 53 | Hostname not in allowed domains | Administrator adds the hostname to the allowed domains list |
| 253, HTTP 429 | Request quota exceeded | See quotas |
| 551 | IAP enabled in multiple places | Cannot enable IAP on both a forwarding rule and a backend service; disable one |
| 700, 701 | Workforce pool provider issues | Configure exactly one provider for the pool |
| 705 | Missing OAuth client ID for workforce identity | Create the OAuth client ID, then update the IAP settings |
| 708 | Invalid workforce pool name | Use `locations/global/workforcePools/WORKFORCE_POOL_ID` and verify the pool exists |
| 4003 | Connection or firewall issue | Check the VM process listens on the port and firewall rules allow it |
| 4010 | Connection closed by destination | Reset the VM; examine `auth.log` (usually in `/var/log/`) or the serial console |
| 4033 | Permission, existence, or VM state issue | Confirm the Tunnel User role on the resource and that the VM exists and runs |
| 4047 | Instance does not exist or is stopped | Ensure the VM is powered on and finished starting |

## Notes

- Supported apps: App Engine standard and flexible; Compute Engine instances with HTTP(S) load balancing backend services; GKE containers; Cloud Run with HTTP(S) load balancing backend services; Cloud Run with one click (no load balancer backend service). IAP cannot be used with Cloud CDN.
- Quotas (error code 429 / 253): The limits apply collectively to all IAP-protected resources in the project. All other requests, including those without credentials, count as browser requests. Mitigations: avoid load testing in production (use paths that bypass IAP), exponential backoff for service-to-service traffic, spread traffic across projects, use Apigee or a similar gateway for APIs, or ask Support for a quota increase.
- Ensure proxy servers and firewalls allow the TCP domains above and do not block WebSocket connections.
- When contacting Cloud Customer Care, include the response from a `GET` call to the API and remove your client secret from it.
- Source: https://docs.cloud.google.com/iap/docs/faq (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [using-tcp-forwarding.md](./using-tcp-forwarding.md)
- [external-identities.md](./external-identities.md)
- [use-workforce-identity-federation.md](./use-workforce-identity-federation.md)
