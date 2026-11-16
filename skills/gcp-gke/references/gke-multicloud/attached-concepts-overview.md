---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/concepts/overview
---

# GKE attached clusters overview

GKE attached clusters lets you register (attach) Kubernetes clusters you created yourself to the GKE management environment. Any conformant Kubernetes cluster can be attached, with support for Amazon EKS and Azure AKS clusters. Attaching gives you connect gateway, fleets, Config Sync, Policy Controller and Cloud Service Mesh.

## Signature / Usage

### What you can do with an attached cluster

- Automate policy and security across the fleet through Policy Controller.
- Deploy cluster configurations across the fleet through Config Sync.
- Monitor and manage a fleet-wide service mesh through Cloud Service Mesh.
- Authenticate and access all clusters through a single interface with Connect gateway.

You control and monitor an attached cluster through the Google Cloud CLI or the Google Cloud console. Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/attach-cluster:

```bash
gcloud container attached get-server-config  \
  --location=GOOGLE_CLOUD_REGION
```

### Architecture

- The external cluster is represented in the Google Cloud resource hierarchy as an `AttachedCluster` resource in the GKE Multi-Cloud API.
- Attaching creates a new regional attached cluster resource in your Google project; all metadata is stored in the Google Cloud region of that resource, which permits compliance with data residency requirements.
- GKE attached clusters deploys a workload called the Connect Agent in your cluster. It connects back to the Connect API service on Google Cloud to create a secure link (tunnel) used to manage additional features.

## Notes

- Policy Controller support ends 2027-12-31. Former names: Anthos attached clusters is now GKE attached clusters; Anthos Service Mesh is now Cloud Service Mesh; Anthos Config Management is now Config Sync / Policy Controller.
- Source (Policy Controller end of support on December 31, 2027): https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/policy-controller (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/concepts/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/attach-cluster (the source page itself has no code).

## Related

- [attached-docs.md](./attached-docs.md)
- [attach-cluster-generic.md](./attach-cluster-generic.md)
- [attached-workload-identity.md](./attached-workload-identity.md)
- [support.md](./support.md)
