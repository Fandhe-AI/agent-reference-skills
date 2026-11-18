---
source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/setup-managed
---

# OperatorConfig for managed collection

The OperatorConfig resource (`config` in the `gmp-public` namespace) configures the managed collection operator. This page covers explicit credentials for non-GKE clusters, running managed collection outside GKE, ConfigMap compression and vertical pod autoscaling (VPA).

## Signature / Usage

### Provide credentials explicitly (non-GKE clusters)

On GKE the collecting Prometheus server retrieves credentials from the environment based on the node's service account. In non-GKE Kubernetes clusters credentials must be provided through the OperatorConfig.

```bash
gcloud config set project PROJECT_ID
```

```bash
gcloud iam service-accounts create gmp-test-sa
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID\
  --member=serviceAccount:gmp-test-sa@PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/monitoring.metricWriter
```

```bash
gcloud iam service-accounts keys create gmp-test-sa-key.json \
  --iam-account=gmp-test-sa@PROJECT_ID.iam.gserviceaccount.com
```

```bash
kubectl -n gmp-public create secret generic gmp-test-sa \
  --from-file=key.json=gmp-test-sa-key.json
```

```bash
kubectl -n gmp-public edit operatorconfig config
```

Add the `collection.credentials` section (also add credentials to the `rules` section so managed rule evaluation works):

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: OperatorConfig
metadata:
  namespace: gmp-public
  name: config
collection:
  credentials:
    name: gmp-test-sa
    key: key.json
```

After the change is applied, the pods are re-created and authenticate to the metric backend with the service account.

### Run managed collection outside GKE

Outside GKE, provide credentials, a `project-id` for your metrics, a `location` (Google Cloud region) where metrics are stored, and the `cluster` name. Managed collection cannot be turned on for a non-GKE cluster with `gcloud container clusters`, so deploy with `kubectl` (see `managed-collection-setup.md`). Provide `project-id`, `location` and `cluster` as `args` on the Deployment in `operator.yaml`; provide the key through the OperatorConfig.

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: OperatorConfig
metadata:
  namespace: gmp-public
  name: config
collection:
  credentials:
    name: gmp-test-sa
    key: key.json
rules:
  credentials:
    name: gmp-test-sa
    key: key.json
```

The Deployment fragment (`REGION` is a value like `us-central1`):

```text
apiVersion: apps/v1
kind: Deployment
...
spec:
  ...
  template:
    ...
    spec:
      ...
      containers:
      - name: operator
        ...
        args:
        - ...
        - "--project-id=PROJECT_ID"
        - "--cluster=CLUSTER_NAME"
        - "--location=REGION"
```

Enable gzip compression over the wire to reduce data transfer fees:

```text
apiVersion: monitoring.googleapis.com/v1
kind: OperatorConfig
metadata:
  namespace: gmp-public
  name: config
collection:
  compression: gzip
  ...
```

### Compress configurations

If you have many PodMonitoring resources you might run out of ConfigMap space; enable `gzip` compression:

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: OperatorConfig
metadata:
  namespace: gmp-public
  name: config
features:
  config:
    compression: gzip
```

### Enable vertical pod autoscaling (VPA)

```bash
kubectl -n gmp-public patch operatorconfig/config -p '{"scaling":{"vpa":{"enabled":true}}}' --type=merge
```

Resulting section of the OperatorConfig:

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: OperatorConfig
metadata:
  namespace: gmp-public
  name: config
scaling:
  vpa:
    enabled: true
```

If the error `vertical pod autoscaling is not available - install vpa support and restart the operator` appears, enable vertical pod autoscaling at the cluster level, then retry the patch. If it is already enabled on a Standard cluster, recreate the operator pod and patch again:

```bash
kubectl -n gmp-system rollout restart deployment/gmp-operator
```

## Options / Props

| Item | Value |
|------|-------|
| `collection.credentials.name` / `.key` | Secret name and key holding the service account key (`gmp-test-sa` / `key.json`) |
| `rules.credentials.name` / `.key` | Same, for the rule evaluator |
| `features.config.compression` | `gzip` to compress configurations |
| `collection.compression` | `gzip` to compress data over the wire (outside Google Cloud) |
| `scaling.vpa.enabled` | `true` deploys `VerticalPodAutoscaler` manifests for `collector`, `rule-evaluator`, `alertmanager` and `gmp-operator` |
| Required role for the service account | `roles/monitoring.metricWriter` (collection); the rules page also needs `roles/monitoring.viewer` |
| VPA namespace | `gmp-system` on Standard clusters, `gke-gmp-system` on Autopilot clusters |
| `location` | Nearest Google Cloud region; `global` can't be used |

## Notes

- The service account key is a long-lived credential: `gmp-test-sa-key.json` lands on the local file system. Restrict its file permissions and do not commit it. The source grants `roles/monitoring.metricWriter` at project level.
- `project_id`, `location` and `cluster` can be overridden on GKE too, but that is not recommended. Choose `project-id` based on your tenancy model for reads (metrics scopes); choose `location` as the nearest Google Cloud region (more distance means more write latency and exposure to networking issues); use the operator's cluster name for `cluster`.
- Running outside Google Cloud incurs data transfer fees (into Google Cloud, and possibly out of another cloud).
- After enabling VPA, OOM errors cause an immediate increase to resource limits; with no OOM errors the first adjustment typically occurs within 24 hours. VPA works best with steady, evenly spread sample ingestion and might not be efficient for spiky or uneven loads.
- On a cluster where VPA must be enabled, changing the cluster's Vertical Pod Autoscaling option restarts the cluster. On Autopilot the operator pod can't be restarted manually: VPA evicts and recreates collector pods; contact support if the error persists. Cluster-level VPA settings belong to `gcp-gke`.
- The Deployment and compression blocks are fragments with `...` in the source and are kept as `text`.
- Google Cloud Managed Service for Prometheus is not a self-hosted Prometheus server; PromQL semantics follow upstream Prometheus.
- The source also shows Console click-paths. The remaining Prometheus-side options are in https://github.com/GoogleCloudPlatform/prometheus-engine/blob/v0.17.2/doc/api.md.
- Source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/setup-managed (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source says "`gcloud` does not work outside of Google Cloud environments". The gcloud CLI runs on any authenticated machine (this page itself creates the service account with gcloud); what does not apply outside GKE is enabling managed collection through `gcloud container clusters`, so the kubectl deployment is used.

## Related

- [managed-collection-setup.md](./managed-collection-setup.md)
- [managed-collection-podmonitoring.md](./managed-collection-podmonitoring.md)
- [managed-rules.md](./managed-rules.md)
