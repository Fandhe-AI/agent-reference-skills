---
source: https://docs.cloud.google.com/deploy/docs/gke-targets
---

# Deploy to GKE targets

Cloud Deploy deploys container-based workloads to any Google Kubernetes Engine cluster, and all Cloud Deploy features are supported for GKE targets. A target's `gke` stanza points to the cluster; Skaffold renders and applies with `deploy.kubectl`.

## Signature / Usage

### Target configuration

The cluster resource name format (placeholders in brackets in the source):

```text
gke:
 cluster: projects/[project_name]/locations/[location]/clusters/[cluster_name]
```

Example target:

```yaml
apiVersion: deploy.cloud.google.com/v1
kind: Target
metadata:
 name: dev
description: development cluster
gke:
 cluster: projects/my-app/locations/us-central1/clusters/my-app-dev-cluster
```

### Skaffold configuration

```yaml
apiVersion: skaffold/v4beta7
kind: Config
metadata:
  name: gke-application
manifests:
  rawYaml:
  - deployment.yaml
deploy:
  kubectl: {}
```

### Deploy using a proxy

Add `proxyUrl` to the `gke` stanza (`URL` is the URL of the proxy; the source writes it as `[URL]`):

```text
gke:
 cluster: projects/my-app/locations/us-central1/clusters/my-app-dev-cluster
 proxyUrl: [URL]
```

### Private cluster through a Cloud Build private pool

`RENDER` must use the private pool; `DEPLOY` and `VERIFY` may.

```yaml
executionConfigs:
- usages:
  - RENDER
  - DEPLOY
  workerPool: "projects/p123/locations/us-central1/workerPools/wp123"
```

## Options / Props

### Target `gke` fields mentioned

| Field | Description |
|-------|-------------|
| `gke.cluster` | `projects/<project>/locations/<location>/clusters/<cluster>`; the cluster can be in another project or region than the pipeline, if the execution service account has access |
| `gke.proxyUrl` | HTTP proxy URL for organizations that reach clusters only through a proxy |
| `gke.dnsEndpoint` | Set to `true` to use the cluster's DNS-based endpoint |
| `gke.internalIp` | Set to `true` to use the internal IP of a private cluster |

### Options for private GKE clusters

| Option | Notes |
|--------|-------|
| DNS-based endpoint | Simplest. Enable the DNS-based endpoint on the cluster and set `dnsEndpoint: true`. If the cluster has no IP-based endpoint, Cloud Deploy connects to the DNS endpoint by default (it is the only control plane endpoint) |
| VPC network | Create a private cluster (VPC-native), set `internalIp: true` if using the internal IP, create a Cloud Build private worker pool and configure the execution environment to use it |
| GKE attached clusters and connect gateway | No VPC or VPN connections required; see `anthos-targets.md` |

### Cross-project permissions with private pools

| Situation | Requirement |
|-----------|-------------|
| Cloud Deploy and the worker pool are in different projects | The Cloud Deploy service agent needs sufficient permissions to talk to the worker pool's project; the execution service account needs permissions to access the Cloud Storage bucket |
| Worker pool and cluster are in different projects | The execution service account needs sufficient permissions in the cluster's project |

## Notes

- Targets must be defined in the same project and region as the delivery pipeline. Several targets can share a file but must be in separate `kind: Target` stanzas.
- Ensure the execution service account has the roles and permissions it needs (see the Cloud Deploy IAM roles page); manifests can be created with Kustomize or Helm.
- Register targets as Cloud Deploy resources before creating a release.
- The `[project_name]` / `[URL]` placeholders are shown in `text` fences because they are fragments with bracketed placeholders (`proxyUrl: [URL]` would parse as a YAML list); replace the whole bracketed placeholder with the plain value.
- For the VPC option, see the Cloud Build page "Access private GKE clusters with Cloud Build private pools" (`gcp-networking` covers VPC and Private Service Connect; `gcp-gke` covers the cluster side).
- Source: https://docs.cloud.google.com/deploy/docs/gke-targets (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [anthos-targets.md](./anthos-targets.md)
- [run-targets.md](./run-targets.md)
- [parallel.md](./parallel.md)
- [getting-started-skaffold.md](./getting-started-skaffold.md)
