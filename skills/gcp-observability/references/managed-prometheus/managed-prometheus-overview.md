---
source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus
---

# Google Cloud Managed Service for Prometheus overview

Google Cloud Managed Service for Prometheus is Google Cloud's fully managed, multi-cloud, cross-project solution for Prometheus and OpenTelemetry metrics. It is built on Monarch, the datastore behind Cloud Monitoring, so Prometheus data is queried with PromQL, Grafana or any tool that can read the Prometheus API. It splits the work of a single Prometheus server into collection (managed collectors, self-deployed collectors, the OpenTelemetry Collector or the Ops Agent), query evaluation (Monarch), rule and alert evaluation (Cloud Monitoring PromQL alerts or a rule-evaluator that forwards to Alertmanager) and storage (Monarch).

## Signature / Usage

### Smallest managed-collection scrape configuration

A PodMonitoring resource tells the managed collectors which pods to scrape (see `managed-collection-podmonitoring.md`).

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

## Options / Props

### Collection modes

| Mode | Where it runs | Scrape configuration | Rules and alerts | Support |
|------|---------------|----------------------|------------------|---------|
| Managed collection | Kubernetes (GKE and non-GKE); recommended for all Kubernetes environments | Lightweight custom resources (PodMonitoring / ClusterPodMonitoring); deployed with the GKE UI, gcloud CLI, `kubectl` or Terraform | Managed rule evaluation or Cloud Monitoring PromQL alerts | Full assistance from Google Cloud technical support |
| Self-deployed collection | Any; drop-in replacement for the upstream Prometheus binary | Your own methods (annotations, prometheus-operator, manual); scaling and functional sharding are manual | Typically local to each Prometheus server | Limited assistance |
| OpenTelemetry Collector | Any compute or Kubernetes environment, including stateless ones such as Cloud Run | Prometheus-like configs in the collector's Prometheus receiver; supports push-based collection; metadata from resource detector processors | Cloud Monitoring alerting policy or the stand-alone rule evaluator | Limited assistance |
| Ops Agent | Compute Engine (Linux and Windows) | Prometheus-like configs in the agent's Prometheus receiver | Cloud Monitoring or the stand-alone rule evaluator | Full assistance |

### Storage and retention

| Item | Value |
|------|-------|
| Retention | 24 months at no additional cost |
| Minimum scrape interval | 5 seconds |
| Full granularity | 1 week |
| Downsampled to 1-minute points | the next 5 weeks |
| Downsampled to 10-minute points | the remainder of the retention period |
| Active / total time series | No limit |
| Query reach | All Google Cloud regions and up to 3,500 Google Cloud projects |

### Quotas

| Quota | Default |
|-------|---------|
| Ingest | 500 QPS per project, up to 200 samples in a single call (equivalent to 100,000 samples per second) |
| Read | 100 QPS per metrics scope |

## Notes

- Collection modes: For Cloud Run, use the Prometheus sidecar for Prometheus metrics or the OpenTelemetry sidecar for OTLP metrics. Managed, self-deployed and OpenTelemetry collectors can run on-prem and in any cloud; collectors outside Google Cloud send data to Monarch.
- Quotas: Ingest and read quotas are shared with Cloud Monitoring and can be increased.
- Google Cloud Managed Service for Prometheus is a Google Cloud product, not a self-hosted Prometheus server; PromQL semantics follow upstream Prometheus.
- Billing is based primarily on the number of metric samples ingested, plus a nominal charge for read API calls; storage and retention are not charged. See the Google Cloud Observability pricing page (https://cloud.google.com/products/observability/pricing) for prices.
- PromQL can also query over 6,500 free Cloud Monitoring metrics, free GKE system metrics, custom metrics and log-based metrics, even without sending data to the managed service.
- Rules accept the standard Prometheus `rule_files` format and are evaluated against all Monarch data in a metrics scope; recording and alerting rule results are stored in Monarch. Prometheus alerting rules can also be migrated to PromQL-based Cloud Monitoring alerting policies.
- Managed Service for Prometheus inherits Cloud Monitoring agreements and certifications: Google Cloud terms of service, the Operations SLA, US DISA and FedRAMP compliance levels, and VPC Service Controls support.
- Cluster-side settings of GKE (enabling the managed service on a cluster) belong to `gcp-gke`; this page set covers the Prometheus-side resources.
- Snippet taken from https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/setup-managed (the overview twin has no code block).
- Source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [managed-collection-setup.md](./managed-collection-setup.md)
- [managed-collection-podmonitoring.md](./managed-collection-podmonitoring.md)
- [managed-collection-authorized-endpoints.md](./managed-collection-authorized-endpoints.md)
- [managed-collection-operatorconfig.md](./managed-collection-operatorconfig.md)
- [managed-rules.md](./managed-rules.md)
- [managed-alertmanager.md](./managed-alertmanager.md)
- [managed-rules-operations.md](./managed-rules-operations.md)
