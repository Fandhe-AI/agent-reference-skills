---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
---

# About Workload Identity Federation for GKE

How Workload Identity Federation for GKE works, how it affects clusters, and how to grant IAM roles to Kubernetes entities. It is the recommended way for GKE workloads to access Google Cloud services, with distinct fine-grained identities per application and no service account key files.

## Signature / Usage

### Principal identifier syntax

```text
PREFIX://iam.googleapis.com/projects/1234567890/locations/global/workloadIdentityPools/example-project.svc.id.goog/SELECTOR
```

### Principal for all Pods using a Kubernetes ServiceAccount (by name)

```text
principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/subject/ns/NAMESPACE/sa/SERVICEACCOUNT
```

### By ServiceAccount UID

```text
principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/kubernetes.serviceaccount.uid/SERVICEACCOUNT_UID
```

### All Pods in a namespace (any ServiceAccount or cluster)

```text
principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/namespace/NAMESPACE
```

### All Pods in a specific cluster

```text
principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/kubernetes.cluster/https://container.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER_NAME
```

`PROJECT_NUMBER` is the numerical project number (not the ID), `PROJECT_ID` the project ID, `LOCATION` the cluster location.

## Options / Props

### Example condition expressions

| Use | Expression |
|---|---|
| Allow access before a time | `request.time < timestamp('TIMESTAMP')` (UTC, such as `2024-08-30T00:00:00.000Z`) |
| Allow if the resource has a tag | `resource.matchTag('TAG_KEY', 'TAG_VALUE')` (such as `env` / `dev`) |

### Metadata server: instance metadata (`http://metadata.google.internal/computeMetadata/v1/instance/`)

| Entry | Description |
|---|---|
| `hostname` | Hostname of the node |
| `id` | Unique ID of the node |
| `service-accounts/` | Service accounts directory (the source describes it as "service accounts associated with the node"): `aliases`, `email`, `identity` (JWT; requires `audience`), `scopes`, `token` (OAuth 2.0 access token). For a Pod served by the GKE metadata server, `service-accounts/default/token` returns a token for the identity the Pod is configured to use (its Kubernetes ServiceAccount principal, or the linked IAM service account), not the node's service account; Pods with `hostNetwork: true` reach the Compute Engine metadata server instead (see Notes). |
| `zone` | Compute Engine zone of the node |

### Instance attributes (`.../instance/attributes/`)

| Entry | Description |
|---|---|
| `cluster-location` | Zone or region of the cluster |
| `cluster-name` | Name of the cluster |
| `cluster-uid` | UID of the cluster |

### Project metadata (`.../project/`)

| Entry | Description |
|---|---|
| `project-id` | Project ID |
| `numeric-project-id` | Project number |

### Limits

| Item | Value |
|---|---|
| Security Token Service Exchange Token API quota | 6,000 requests per minute (request an increase of `Token exchange requests per minute` on `QUOTA_EXCEEDED`) |
| Concurrent connections to the GKE metadata server | 500 per node; excess calls are queued and might return `HTTP/499` on client timeout |
| Default access token lifetime | 1 hour (3,600 seconds); client libraries refresh when expiry is within 3 minutes 45 seconds |
| Kubernetes ServiceAccounts per cluster | More than 3000 might cause the kubelet to terminate metadata server Pods |

## Notes

- Enabling it creates a fixed workload identity pool `PROJECT_ID.svc.id.goog` (never deleted by GKE, even after all clusters are deleted; its name can't be changed), registers the cluster as an identity provider, and deploys the GKE metadata server (DaemonSet, one Pod per Linux node or a native service per Windows node) on every node. It grants no additional IAM permissions.
- Credential flow: ADC requests a token from the metadata server; the GKE metadata server obtains a Kubernetes ServiceAccount JWT from the API server and exchanges it through Security Token Service for a short-lived federated access token. Some Google Cloud services limit federated tokens (https://docs.cloud.google.com/iam/docs/federated-identity-supported-services); then link a Kubernetes ServiceAccount to an IAM service account (see [workload-identity.md](./workload-identity.md)).
- Identity sameness: workloads with identical metadata in clusters sharing a pool (same project) are treated as the same identity. Every cluster in a pool must be trusted; use separate projects or distinct namespace names, or conditional IAM policies to limit access to specific clusters.
- With strict network policy, allow egress to `169.254.169.252/32` port `988`; on GKE Dataplane V2 allow egress to `169.254.169.254/32` port `80`. Only the listed attributes are supported; unsupported ones return `404` in the `gke-metadata-server` Pod log.
- Restrictions: Pods with `hostNetwork: true` don't use it and are routed to the Compute Engine metadata server (with the Cloud Storage FUSE CSI driver on Standard clusters running 1.33.3-gke.1226000 or later, host-network Pods can authenticate with their own ServiceAccount). When ServiceAccounts are linked to IAM service accounts, the metadata server returns `SERVICEACCOUNT_NAME.svc.id.goog` unless the `iam.gke.io/return-principal-id-as-email: "true"` annotation is set. The metadata server needs a few seconds to accept requests in a new Pod (retry). Built-in logging and monitoring agents still use the node service account; node pools still use their service account for image pulls (`ImagePullBackOff` / `ErrImagePull`). Knative serving needs manual setup to keep releasing request metrics. VPC Service Controls ingress/egress rules for these principals are in Preview.
- Alternatives (less secure): the Compute Engine default service account on nodes (shared by all workloads on the node, over-provisioned, inappropriate for multi-tenant clusters) or exported service account keys stored as Kubernetes Secrets (a security risk; follow https://docs.cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys).
- Distinct from Workload Identity Federation for external workloads (AWS / Azure / OIDC), which is in `gcp-foundation`.
- Source inconsistency: the instance metadata table describes `service-accounts/` as "A directory of service accounts associated with the node", while the same page says the `GET /computeMetadata/v1/instance/service-accounts/default/token` request "retrieves a token for the IAM service account that the Pod is configured to impersonate". This page describes the Pod identity.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/workload-identity (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [workload-identity.md](./workload-identity.md)
- [iam.md](./iam.md)
