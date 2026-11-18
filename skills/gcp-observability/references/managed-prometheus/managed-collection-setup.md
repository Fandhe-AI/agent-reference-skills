---
source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/setup-managed
---

# Get started with managed collection

Managed collection runs Prometheus-based collectors as a DaemonSet and scrapes only targets on colocated nodes. You configure the collectors with lightweight custom resources; the collectors push scraped data to Monarch. Google Cloud never directly accesses your cluster to pull or scrape metric data. Managed collection is supported on GKE and all other Kubernetes environments, and is the recommended approach.

## Signature / Usage

### Configure the environment

```bash
gcloud config set project PROJECT_ID
```

On GKE, set your cluster:

```bash
gcloud container clusters get-credentials CLUSTER_NAME --location LOCATION --project PROJECT_ID
```

Otherwise use `kubectl`:

Adapted (not in the official docs): `kubectl config set-cluster` only edits a cluster entry in kubeconfig and does not switch the current context, so the example selects the context of the target cluster and prints it before the following commands run.

```bash
kubectl config use-context CONTEXT_NAME
kubectl config current-context
```

Create the namespace for the example application (the source recommends `gmp-test`):

```bash
kubectl create ns NAMESPACE_NAME
```

### Enable managed collection on GKE

These commands might take up to 5 minutes. Update an existing zonal or regional cluster:

```bash
gcloud container clusters update CLUSTER_NAME --enable-managed-prometheus --zone ZONE
```

```bash
gcloud container clusters update CLUSTER_NAME --enable-managed-prometheus --region REGION
```

Create a cluster with managed collection enabled:

```bash
gcloud container clusters create CLUSTER_NAME --zone ZONE --enable-managed-prometheus
```

### Disable managed collection on GKE

```bash
gcloud container clusters update CLUSTER_NAME --disable-managed-prometheus --zone ZONE
```

```bash
gcloud container clusters update CLUSTER_NAME --disable-managed-prometheus --region REGION
```

Override the automatic enabling when creating a Standard cluster (GKE 1.27 or greater):

```bash
gcloud container clusters create CLUSTER_NAME --zone ZONE --no-enable-managed-prometheus
```

### Enable managed collection on non-GKE Kubernetes

Adapted (not in the official docs): the source runs `kubectl apply -f` directly against the remote URLs; the manifests are downloaded and inspected before they are applied.

```bash
curl -fsSL -o setup.yaml https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.17.2/manifests/setup.yaml
curl -fsSL -o operator.yaml https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.17.2/manifests/operator.yaml
less setup.yaml operator.yaml
kubectl apply -f setup.yaml
kubectl apply -f operator.yaml
```

### Teardown

Adapted (not in the official docs): `--location LOCATION` added because the cluster is otherwise not identified; the remote `kubectl delete -f URL` is replaced by the downloaded `operator.yaml`.

```bash
gcloud container clusters update CLUSTER_NAME --disable-managed-prometheus --location LOCATION
```

```bash
kubectl delete -f operator.yaml
```

## Options / Props

### Components installed by managed collection

| Component | Kind | Purpose |
|-----------|------|---------|
| `gmp-operator` | Deployment | Kubernetes operator for Managed Service for Prometheus |
| `rule-evaluator` | Deployment | Configures and runs alerting and recording rules |
| `collector` | DaemonSet | Scales collection horizontally by scraping only pods on the same node |
| `alertmanager` | StatefulSet | Sends triggered alerts to your notification channels |

### GKE defaults and requirements

| Cluster type | Behavior |
|--------------|----------|
| GKE Autopilot, version 1.25 or greater | Managed collection is on by default and can't be turned off |
| GKE Standard, version 1.27 or greater | On by default; can be overridden at cluster creation |
| Enabling with gcloud or Terraform | Requires GKE 1.21.4-gke.300 or newer |
| On-premises (VMware, bare metal) | Version 1.12 or newer; see the distribution documentation |

### Other ways to enable or disable on GKE

| Method | Notes |
|--------|-------|
| Managed Prometheus Bulk Cluster Enablement dashboard (Cloud Monitoring) | Shows only GKE clusters in the current project, even if the metrics scope has multiple projects |
| Kubernetes Engine page in the Google Cloud console | Features list, "Managed Service for Prometheus" option |
| Terraform | `managed_prometheus` block of `google_container_cluster`; set `enabled` to `false` to disable |

## Notes

- After managed collection is enabled the in-cluster components run but no metrics are generated until PodMonitoring or ClusterPodMonitoring resources with valid endpoints are deployed, or a managed metrics package (for example Kube state metrics) is enabled.
- Managed collection on GKE is automatically upgraded when new in-cluster component versions are released. On non-GKE clusters deployed with `kubectl`, you must upgrade manually by re-running the commands with a new version from the prometheus-engine releases page.
- On GKE, managed collection uses permissions granted to the default Compute Engine service account. If a policy modifies the default node service account permissions, you might need to add the `Monitoring Metric Writer` role (`roles/monitoring.metricWriter`).
- The Monitoring API must be enabled in the project (it is enabled by default for new projects).
- If you enabled any curated packages of observability metrics for GKE, add `--monitoring=SYSTEM` (recommended) or `--monitoring=NONE` to the disable command to say whether GKE system metrics keep being collected.
- Disabling managed collection stops sending new data to Managed Service for Prometheus; data already stored is not deleted. Deleting `operator.yaml` also deletes the `gmp-public` namespace and everything in it, including exporters installed there. Try it on a disposable cluster first.
- Cluster-side settings (the `gcloud container clusters` flags) belong to `gcp-gke`.
- Google Cloud Managed Service for Prometheus is not a self-hosted Prometheus server; PromQL semantics follow upstream Prometheus.
- The source also shows Console click-paths and Terraform.
- Adapted from the official docs: the source shows `kubectl apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.17.2/manifests/setup.yaml` and the same for `operator.yaml`, and `kubectl delete -f https://raw.githubusercontent.com/.../manifests/operator.yaml`; the disable command shown in "Teardown" had no location flag.
- Source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/setup-managed (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: for non-GKE clusters the source shows `kubectl config set-cluster CLUSTER_NAME`. That command edits a cluster entry in kubeconfig and does not change the current context, so later `kubectl create ns` and `kubectl apply` would run against whichever cluster was selected before; the example uses `kubectl config use-context CONTEXT_NAME` and checks it with `kubectl config current-context`.

## Related

- [managed-collection-podmonitoring.md](./managed-collection-podmonitoring.md)
- [managed-collection-operatorconfig.md](./managed-collection-operatorconfig.md)
- [managed-collection-authorized-endpoints.md](./managed-collection-authorized-endpoints.md)
- [managed-prometheus-overview.md](./managed-prometheus-overview.md)
