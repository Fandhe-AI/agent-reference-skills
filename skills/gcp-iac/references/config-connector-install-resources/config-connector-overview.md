---
source: https://docs.cloud.google.com/config-connector/docs/overview
---

# Config Connector overview

Config Connector is an open source Kubernetes add-on that lets you manage Google Cloud resources through Kubernetes. It provides Kubernetes Custom Resource Definitions (CRDs) and controllers, so Kubernetes-managed resources get RBAC for access control, Events for visibility, a single source of configuration and desired state, and eventual consistency through loosely-coupled dependencies.

## Signature / Usage

To see the CRDs that your Config Connector version can create and manage:

```bash
kubectl get crds --selector cnrm.cloud.google.com/managed-by-kcc=true
```

## Notes

- How it works: Config Connector reconciles the configured state against Google Cloud APIs asynchronously, using the identity of the Config Connector IAM service account, not the identity of the human user or service account that submitted the manifest.
- Config Connector deploys Pods with elevated RBAC permissions, such as the ability to create, delete, get, and list CustomResourceDefinitions (CRDs); these are required to create and reconcile Kubernetes resources.
- The ability to create Kubernetes resources in a Config Connector namespace (namespaced mode) or cluster (cluster mode) grants authorization to change cloud resources using Config Connector's identity, similar to CI/CD pipelines where merging code also allows deploying with the pipeline's identity. Security depends on tightly controlling who can create those objects, for example by having a Kubernetes controller apply Config Connector resources from a trusted code repository.
- This delegates broad cloud access management to Config Connector while restricting individual developer access through repository source control.
- Extra features: manage existing Google Cloud resources and use Kubernetes Secrets to provide sensitive data such as passwords.
- Snippet taken from https://docs.cloud.google.com/config-connector/docs/how-to/getting-started
- Config Connector manages Google Cloud resources as Kubernetes objects; the GKE cluster itself and Config Sync are in `gcp-gke`.
- Source: https://docs.cloud.google.com/config-connector/docs/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [installation-types.md](./installation-types.md)
- [getting-started.md](./getting-started.md)
- [resources-reference-overview.md](./resources-reference-overview.md)
