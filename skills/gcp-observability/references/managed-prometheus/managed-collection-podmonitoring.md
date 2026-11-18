---
source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/setup-managed
---

# PodMonitoring and ClusterPodMonitoring for managed collection

Target scraping and metric ingestion for managed collection are configured with Kubernetes custom resources. A PodMonitoring resource scrapes pods only in the namespace it is deployed in; ClusterPodMonitoring has the same interface but does not limit discovered pods to a namespace.

## Signature / Usage

### Deploy the example application and a PodMonitoring

The example application emits the `example_requests_total` counter and the `example_random_numbers` histogram (among others) on its `metrics` port; its manifest defines three replicas.

Adapted (not in the official docs): the source applies the manifests straight from the remote URLs; they are downloaded and inspected first.

```bash
curl -fsSL -o example-app.yaml https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.17.2/examples/example-app.yaml
less example-app.yaml
kubectl -n NAMESPACE_NAME apply -f example-app.yaml
```

The PodMonitoring below finds all pods in the namespace with label `app.kubernetes.io/name` = `prom-example` and scrapes the port named `metrics` every 30 seconds on the `/metrics` HTTP path.

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: PodMonitoring
metadata:
  name: prom-example
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: prom-example
  endpoints:
  - port: metrics
    interval: 30s
```

```bash
curl -fsSL -o pod-monitoring.yaml https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.17.2/examples/pod-monitoring.yaml
less pod-monitoring.yaml
kubectl -n NAMESPACE_NAME apply -f pod-monitoring.yaml
kubectl get podmonitoring -A
```

### Enable target status

Set `features.targetStatus.enabled` in the OperatorConfig to see `Status.Endpoint Statuses` on each valid PodMonitoring or ClusterPodMonitoring.

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: OperatorConfig
metadata:
  namespace: gmp-public
  name: config
features:
  targetStatus:
    enabled: true
```

```bash
kubectl -n NAMESPACE_NAME describe podmonitorings/prom-example
```

Output (abridged in the source):

```text
API Version:  monitoring.googleapis.com/v1
Kind:         PodMonitoring
...
Status:
  Conditions:
    ...
    Status:                True
    Type:                  ConfigurationCreateSuccess
  Endpoint Statuses:
    Active Targets:       3
    Collectors Fraction:  1
    Last Update Time:     2023-08-02T12:24:26Z
    Name:                 PodMonitoring/custom/prom-example/metrics
    Sample Groups:
      Count:  3
      Sample Targets:
        Health:  up
        Labels:
          Cluster:                     CLUSTER_NAME
          Container:                   prom-example
          Instance:                    prom-example-589ddf7f7f-hcnpt:metrics
          Job:                         prom-example
          Location:                    REGION
          Namespace:                   NAMESPACE_NAME
          Pod:                         prom-example-589ddf7f7f-hcnpt
          project_id:                  PROJECT_ID
        Last Scrape Duration Seconds:  0.020206416
```

### Filter exported metrics

Use Prometheus relabeling with a `keep` action (allowlist) or `drop` action (denylist) in the `metricRelabeling` section of the PodMonitoring or ClusterPodMonitoring resource. This rule filters out any metric beginning with `foo_bar_`, `foo_baz_` or `foo_qux_`:

```text
  metricRelabeling:
  - action: drop
    regex: foo_(bar|baz|qux)_.+
    sourceLabels: [__name__]
```

### Convert a prometheus-operator ServiceMonitor

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: example-app
spec:
  selector:
    matchLabels:
      app: example-app
  endpoints:
  - targetPort: web
    path: /stats
    interval: 30s
  targetLabels:
  - foo
```

The analogous PodMonitoring, assuming the service and its pods are labeled `app=example-app` (otherwise use the label selectors of the underlying Service):

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: PodMonitoring
metadata:
  name: example-app
spec:
  selector:
    matchLabels:
      app: example-app
  endpoints:
  - port: web
    path: /stats
    interval: 30s
  targetLabels:
    fromPod:
    - from: foo # pod label from example-app Service pods.
      to: foo
```

## Options / Props

### ServiceMonitor to PodMonitoring field mapping

| monitoring.coreos.com/v1 ServiceMonitor | Compatibility | monitoring.googleapis.com/v1 PodMonitoring |
|---|---|---|
| `.ServiceMonitorSpec.Selector` | Identical | `.PodMonitoringSpec.Selector` |
| `.ServiceMonitorSpec.Endpoints[]` | `.TargetPort` maps to `.Port`; `.Path`: compatible; `.Interval`: compatible; `.Timeout`: compatible | `.PodMonitoringSpec.Endpoints[]` |
| `.ServiceMonitorSpec.TargetLabels` | PodMonitor must specify: `.FromPod[].From` pod label, `.FromPod[].To` target label | `.PodMonitoringSpec.TargetLabels` |

### Target status fields

| Field | Meaning |
|-------|---------|
| `Status.Conditions.Status` | `true` when the PodMonitoring or ClusterPodMonitoring is acknowledged and processed |
| `Status.Endpoint Statuses.Active Targets` | Number of scrape targets counted on all collectors for this resource (3 in the example: three replicas, one metric target each); `Unhealthy Targets` appears if there are unhealthy targets |
| `Status.Endpoint Statuses.Collectors Fraction` | `1` (100%) if all managed collectors are reachable |
| `Status.Endpoint Statuses.Last Update Time` | Last update; much older than the scrape interval might indicate target or cluster issues |
| `Status.Endpoint Statuses.Sample Groups` | Sample targets grouped by common target labels; expected `Health` is `up` |

### Reserved labels

| Label | Meaning |
|-------|---------|
| `project_id` | Identifier of the Google Cloud project associated with the metric |
| `location` | Google Cloud region where the data is stored; typically the region of the GKE cluster; for AWS or on-premises deployments, possibly the closest Google Cloud region |
| `cluster` | Name of the Kubernetes cluster |
| `namespace` | Name of the Kubernetes namespace |
| `job` | Job label of the Prometheus target, if known; might be empty for rule-evaluation results |
| `instance` | Instance label of the Prometheus target, if known; might be empty for rule-evaluation results |

## Notes

- Target status fields: Signs of a configuration problem: no `Status.Endpoint Statuses` field, a stale `Last Scrape Duration Seconds`, too few targets, or `Health` = `down`.
- To scrape targets in multiple namespaces, deploy the same PodMonitoring in each namespace. For horizontal collection across namespaces use ClusterPodMonitoring.
- The `targetLabels` field provides a simplified Prometheus-style relabel configuration; mandatory target labels (see the `prometheus_target` resource in the PromQL query page of the source) cannot be overwritten.
- Target status is a debugging tool: enable it only to investigate immediate issues. Leaving it on in large clusters might make the operator run out of memory and crash loop.
- Reserved labels used as metric labels are automatically relabeled with the prefix `exported_`. The `project_id`, `location` and `cluster` labels can be overridden with `args` on the Deployment in `operator.yaml` (not recommended on GKE; see `managed-collection-operatorconfig.md`).
- A prometheus-operator PodMonitor converts to PodMonitoring the same way; label selectors are always copyable. Existing prometheus-operator resources can also keep working with self-deployed collectors; metrics from both collector types are queryable together.
- Kubelet and cAdvisor metrics are scraped by editing the OperatorConfig (see the Kubelet and cAdvisor exporter page of the source). Metrics from centralized exporters (statsd_exporter, Envoy for Istio, SNMP exporter, Pushgateway, kube-state-metrics) need small changes; see the troubleshooting page of the source.
- The Cloud Monitoring Metrics Management page reports ingestion volumes, label cardinality, reads, use in alerting policies and dashboards, and metric-write error rate, and can exclude unneeded metrics.
- Dropping series with `metricRelabeling` means the dropped metrics are not ingested; try new filters on a non-production cluster first.
- Google Cloud Managed Service for Prometheus is not a self-hosted Prometheus server; PromQL semantics follow upstream Prometheus.
- The output example is the source's abridged output (the `...` lines are in the source); it is kept as a `text` block.
- The source also shows Terraform (`kubernetes_manifest` / `kubectl_manifest`) for these resources.
- Adapted from the official docs: `kubectl -n NAMESPACE_NAME apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.17.2/examples/example-app.yaml` and `.../examples/pod-monitoring.yaml` were changed to download, inspect, apply.
- Reference for all custom resources: https://github.com/GoogleCloudPlatform/prometheus-engine/blob/v0.17.2/doc/api.md
- Source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/setup-managed (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [managed-collection-setup.md](./managed-collection-setup.md)
- [managed-collection-authorized-endpoints.md](./managed-collection-authorized-endpoints.md)
- [managed-collection-operatorconfig.md](./managed-collection-operatorconfig.md)
- [managed-rules.md](./managed-rules.md)
