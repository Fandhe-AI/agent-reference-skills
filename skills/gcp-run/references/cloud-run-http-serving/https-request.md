---
source: https://docs.cloud.google.com/run/docs/triggering/https-request
---

# Invoke with HTTPS requests

Every Cloud Run service or function gets a stable HTTPS endpoint (and optionally custom domains). This page covers service URLs, public and private services, streaming, HTTP to HTTPS redirect, and HTTP/2.

## Signature / Usage

### Get the service URL

```sh
gcloud run services describe SERVICE --format 'value(status.url)'
```

### Deterministic URL format

```text
https://[TAG---]SERVICE_NAME-PROJECT_NUMBER.REGION.run.app
```

### Test a private service with the proxy

```bash
gcloud run services proxy SERVICE --project PROJECT-ID
```

The proxy serves the private service at `http://localhost:8080` (or the port given with `--port`) using the active account's token.

### Call a private service with curl

```bash
curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" SERVICE_URL
```

## Options / Props

| URL type | Format | Notes |
|---|---|---|
| Deterministic | `https://[TAG---]SERVICE_NAME-PROJECT_NUMBER.REGION.run.app` | Predictable before creation; only if the DNS segment (service name, project number, any traffic tags) is 63 characters or less. Uses the project number, not the project ID. Shown with priority |
| Non-deterministic | `https://[TAG---]SERVICE_IDENTIFIER.run.app` | Hash-based, random second field; stable after deploy. Do not parse `SERVICE_IDENTIFIER`: its format is not fixed and may change |
| `cloudfunctions.net` | — | Also assigned when the service was created as a function with the Cloud Functions v2 API |

`TAG` is the optional traffic tag of the revision; `REGION` is for example `europe-west1`.

Behavior:

| Topic | Behavior |
|---|---|
| Response streaming | Supported with no configuration; the server must respond with `Transfer-Encoding: chunked` |
| HTTP to HTTPS | All HTTP requests are redirected to HTTPS; TLS terminates before your service |
| HTTP/2 | Downgraded to HTTP/1 when sent to the container by default; end-to-end HTTP/2 is a separate setting |
| Public service | Requires allowing unauthenticated (public) access |
| Private service | Limit access with the IAM invoker permission, or application-level auth such as Identity Platform |

## Notes

- A public service is made in one of two ways (https://docs.cloud.google.com/run/docs/authenticating/public): disable the Invoker IAM check (`--no-invoker-iam-check`, recommended by the source; revert with `--invoker-iam-check`), or grant Cloud Run Invoker (`roles/run.invoker`) to `allUsers` (`gcloud run services add-iam-policy-binding` or `--allow-unauthenticated`; revert by removing the `allUsers` binding, for example with `gcloud run services remove-iam-policy-binding`). Either makes the service publicly accessible; use only for intentionally public content.
- Mixed content: because TLS terminates before your service, generated links should use `https` or honor the `X-Forwarded-Proto` header.
- The default `run.app` URLs can be disabled (https://docs.cloud.google.com/run/docs/securing/ingress#disable-url).
- Service-to-service calls use service-to-service authentication (https://docs.cloud.google.com/run/docs/authenticating/service-to-service).
- Middleware options: API Gateway and Firebase Hosting (dynamic backend) can front a service.
- The source also covers the Windows note: use WSL (preferred) or cygwin for `curl`/proxy commands.
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that run only inside the container.
- Source: https://docs.cloud.google.com/run/docs/triggering/https-request (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/authenticating/public (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [grpc.md](./grpc.md)
- [websockets.md](./websockets.md)
- [mapping-custom-domains.md](./mapping-custom-domains.md)
- Using HTTP/2: https://docs.cloud.google.com/run/docs/configuring/http2
- Allow public access: https://docs.cloud.google.com/run/docs/authenticating/public
