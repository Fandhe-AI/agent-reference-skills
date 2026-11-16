---
source: https://docs.cloud.google.com/kubernetes-engine/enterprise/knative-serving/docs/resource-model
---

# Knative serving resource model

Knative serving organizes applications with three parts: Services, Revisions, and Container Instances. A Google Cloud project can run many services in different regions or GKE clusters.

## Signature / Usage

The page contains no code. The command below is taken from https://docs.cloud.google.com/kubernetes-engine/enterprise/knative-serving/docs/install/on-gcp and shows the Knative serving release label in a cluster.

Adapted (not in the official docs): `kubectl get all` returns a `List`, so the template ranges over `.items` and prints each resource's `serving.knative.dev/release` label.

```bash
kubectl get all -n knative-serving -o 'go-template={{range .items}}{{.kind}}/{{.metadata.name}} {{with .metadata.labels}}{{index . "serving.knative.dev/release"}}{{end}}{{"\n"}}{{end}}'
```

## Options / Props

| Resource | Description |
| --- | --- |
| Service | Main resource. Lives in a specific GKE cluster namespace; exposes a unique endpoint and automatically scales the underlying infrastructure for incoming requests. |
| Revision | Created by each deployment to a service: a specific container image plus environment settings (environment variables, memory limits, concurrency value). Immutable. Requests route to the latest healthy revision as soon as possible; traffic can be split between revisions. |
| Container instance | Each revision with requests is autoscaled to the number of instances needed. One instance can receive many concurrent requests; the concurrency setting sets the maximum parallel requests per instance. |

Example of revision creation: deploying an image to a new service creates the first revision; deploying a different image creates a second; setting an environment variable creates a third; every later configuration change creates a new revision.

## Notes

- This is the resource model of Knative serving on GKE, distinct from Cloud Run (`gcp-run`), which is a separate fully managed product.
- Snippet taken from the install page above because the source page has no code.
- Corrected from the official docs: the source template `{{index .metadata.labels "serving.knative.dev/release"}}` reads the labels of the `List` returned by `kubectl get all`, which has none; the example ranges over `.items` and prints the label of each resource (empty for resources without it).
- Source: https://docs.cloud.google.com/kubernetes-engine/enterprise/knative-serving/docs/resource-model (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [knative-architecture-overview.md](./knative-architecture-overview.md)
- [knative-install-on-gcp.md](./knative-install-on-gcp.md)
