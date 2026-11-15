---
source: https://docs.cloud.google.com/run/docs/fit-for-run
---

# Is my app a good fit for Cloud Run?

Criteria to decide whether an app suits a Cloud Run service. The app must meet all of them.

## Signature / Usage

Quick fit check, then deploy from source to try it (command taken from the Node.js quickstart):

```bash
gcloud run deploy --source .
```

## Options / Props

| Criterion | Detail |
|---|---|
| Protocols | Serves requests, streams, or events delivered using HTTP, HTTP/2, WebSockets, or gRPC, or executes to completion |
| File system | Does not require a local persistent file system; a local ephemeral or a network file system is fine |
| Concurrency of instances | Built to handle multiple instances of the app running simultaneously |
| Size | Does not require more than 8 CPU and 32 GiB of memory per instance |

## Notes

- If the app does not meet all criteria, consider Google Kubernetes Engine (GKE); see the GKE and Cloud Run comparison guide and the "Selection guide for managed container runtime environments".
- Source inconsistency: this page's size criterion is at most 8 CPU and 32 GiB of memory per instance, while the GPU page requires at least 20 CPU and 80 GiB for NVIDIA RTX PRO 6000 instances (https://docs.cloud.google.com/run/docs/configuring/services/gpu).
- For server-rendered Next.js or Angular apps with automatic GitHub integration and CDN, consider Firebase App Hosting.
- The source page has no code block; the snippet is from https://docs.cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service.
- Source: https://docs.cloud.google.com/run/docs/fit-for-run (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [container-contract.md](./container-contract.md)
- [quotas.md](./quotas.md)
- [what-is-cloud-run.md](./what-is-cloud-run.md)
