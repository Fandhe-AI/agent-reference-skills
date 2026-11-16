---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/install-cloud-logging
---

# Install Cloud Logging for attached clusters

GKE attached clusters supports Cloud Logging for workloads and for system components on worker nodes, using a Fluentbit-based logging agent that runs as a DaemonSet on worker nodes. Collected data can be managed and deleted like any other log data.

## Signature / Usage

### Enable logging

If you specify no logging mode at attach time, system logging is enabled by default. Workload logging requires Kubernetes 1.23 or later. Add `--logging` to register or update:

Adapted (not in the official docs): the `...` elision line (which the shell would run as a command) is replaced with the other register flags from the attach page (private-issuer form) and, for update, with `--location`.

```sh
gcloud container attached clusters register CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --fleet-project=PROJECT_NUMBER \
  --platform-version=PLATFORM_VERSION \
  --distribution=generic \
  --context=KUBECONFIG_CONTEXT \
  --has-private-issuer \
  --kubeconfig=KUBECONFIG_PATH \
  --logging=LOGGING_FLAG
```

```sh
gcloud container attached clusters update CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --logging=LOGGING_FLAG
```

### Sample Logs Explorer query

Logs of the `gke-connect-agent` container for the cluster:

```text
resource.type="k8s_container"
resource.labels.cluster_name="attachedClusters/CLUSTER_NAME"
resource.labels.container_name="gke-connect-agent"
```

## Options / Props

| `LOGGING_FLAG` value | Description |
| --- | --- |
| `NONE` | Disable logging |
| `SYSTEM` | Log system workloads in the system namespaces |
| `SYSTEM,WORKLOAD` | Log both system and workload activity on worker nodes |

| Resource type | Display name |
| --- | --- |
| `k8s_container` | Workload container logs |

System apps logs (`k8s_container`) come from containers in these namespaces: `gke-connect`, `gke-system`, `gmp-system`, `asm-user-auth`, `cnrm-system`, `config-management-system`, `gatekeeper-system`, `gmp-public`, `istio-system`, `knative-serving`.

## Notes

- Prerequisites: cluster prerequisites (https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/reference/cluster-prerequisites) and authorizing Cloud Logging and Cloud Monitoring (see [attach-cluster-generic.md](./attach-cluster-generic.md); unnecessary from Kubernetes 1.28).
- Corrected from the official docs: the source shows a `...` line between `CLUSTER_NAME` and `--logging=LOGGING_FLAG` (no line continuations).
- Access logs via Logs Explorer (Query Builder, Logs field explorer) or `gcloud logging read`.
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/install-cloud-logging (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [install-cloud-monitoring.md](./install-cloud-monitoring.md)
- [attach-cluster-generic.md](./attach-cluster-generic.md)
- [update-cluster.md](./update-cluster.md)
