---
source: https://docs.cloud.google.com/service-extensions/docs/swp-extensions-overview
---

# Secure Web Proxy extensions overview

Preview. Service Extensions callouts let you insert custom services directly into the Secure Web Proxy traffic processing path to inspect, modify or block outbound traffic before it reaches its destination.

## Signature / Usage

### Import an authorization extension

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/service-extensions/authz-extensions/import (gcloud 593.0.0 help; the overview page itself has no code).

```bash
gcloud service-extensions authz-extensions import \
  my-authz-extension --source=my-authz-extension.yaml \
  --location=us-central1
```

## Options / Props

| Item | Detail |
|------|--------|
| Extension type | Authorization extensions, by using callouts |
| Transport | Real-time gRPC call to an external service that you manage |
| Policy basis | The configured authorization policy |
| Evaluation order | Authorization policies are evaluated after TLS interception on the inner payload; request-authorization-policy extensions run before content-authorization-policy extensions |

## Notes

- Use cases: integrate outbound data transfer and AI agent flows with specialized security providers, implement custom authentication or authorization, enforce bespoke business logic.
- Secure Web Proxy itself belongs to the `gcp-networking` skill; this page covers only its extension hook.
- Source: https://docs.cloud.google.com/service-extensions/docs/swp-extensions-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/service-extensions/authz-extensions/import (gcloud 593.0.0 help).

## Related

- [callouts-overview.md](./callouts-overview.md)
- [lb-extensions-overview.md](./lb-extensions-overview.md)
