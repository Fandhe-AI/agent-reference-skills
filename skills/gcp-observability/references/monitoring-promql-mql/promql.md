---
source: https://docs.cloud.google.com/monitoring/promql
---

# PromQL in Cloud Monitoring

PromQL can be used in Cloud Monitoring as an alternative to the Metrics Explorer menu-driven interface for charts and dashboards. It queries Google Cloud system metrics, user-defined metrics (log-based and Cloud Monitoring custom metrics) and Google Cloud Managed Service for Prometheus data.

## Signature / Usage

### Query Cloud Monitoring metrics (UTF-8 syntax)

UTF-8 metric names must be quoted and moved inside the braces. Label names must also be quoted if they contain legacy-incompatible characters. For the metric `kubernetes.io/container/cpu/limit_utilization`, these queries are equivalent:

```text
{"kubernetes.io/container/cpu/limit_utilization", pod_name="foo"}
{__name__="kubernetes.io/container/cpu/limit_utilization", pod_name="foo"}
{"__name__"="kubernetes.io/container/cpu/limit_utilization", "pod_name"="foo"}
```

Distribution-valued metrics are queried like Prometheus histograms, with the `_count`, `_sum` or `_bucket` suffix appended to the metric name.

### Metadata labels

The metadata system label `version` is written `metadata_system_version`; the metadata user label `version` is `metadata_user_version`. If the key has special characters other than `_`, wrap the key in double quotes and keep the `metadata_user_` prefix.

```text
{"compute.googleapis.com/instance/cpu/utilization", monitored_resource="gce_instance", metadata_user_env="prod"}
sum("compute.googleapis.com/instance/cpu/utilization") by (metadata_system_region)
sum("compute.googleapis.com/instance/cpu/utilization") by (metadata_user_env)
{"compute.googleapis.com/instance/uptime_total", "metadata_user_i-love.special/chars"="yes"}
sum("compute.googleapis.com/instance/uptime_total") by ("metadata_user_i-love.special/chars")
```

### Specify the monitored resource type

If a metric maps to more than one monitored resource type (some system metrics and many log-based metrics), select the type with the special label `monitored_resource`. The value `""` refers to the default `prometheus_target` resource type used for Cloud Monitoring metrics.

```text
logging_googleapis_com:byte_count{monitored_resource="k8s_container"}
custom_googleapis_com:opencensus_opencensus_io_http_server_request_count_by_method{monitored_resource="global"}
loadbalancing_googleapis_com:l3_external_egress_bytes_count{monitored_resource="loadbalancing.googleapis.com/ExternalNetworkLoadBalancerRule"}
```

Without it, the query fails with: `metric is configured to be used with more than one monitored resource type; series selector must specify a label matcher on monitored resource name`.

### Resolve label conflicts

If a metric label and a resource label share a key, prefix the metric label with `metric_`.

```text
example_googleapis_com:user_widget_count{pod_name="RESOURCE_LABEL_VALUE"}
example_googleapis_com:user_widget_count{metric_pod_name="METRIC_LABEL_VALUE"}
```

## Options / Props

### Mapping metric names to legacy PromQL

| Cloud Monitoring metric name | Legacy PromQL metric name |
|---|---|
| `kubernetes.io/container/cpu/limit_cores` | `kubernetes_io:container_cpu_limit_cores` |
| `compute.googleapis.com/instance/cpu/utilization` | `compute_googleapis_com:instance_cpu_utilization` |
| `logging.googleapis.com/log_entry_count` | `logging_googleapis_com:log_entry_count` |
| `custom.googleapis.com/opencensus/opencensus.io/http/server/request_count_by_method` | `custom_googleapis_com:opencensus_opencensus_io_http_server_request_count_by_method` |
| `agent.googleapis.com/disk/io_time` | `agent_googleapis_com:disk_io_time` |
| `networking.googleapis.com/vm_flow/rtt` (distribution) | `networking_googleapis_com:vm_flow_rtt_sum`, `networking_googleapis_com:vm_flow_rtt_count`, `networking_googleapis_com:vm_flow_rtt_bucket` |

### Differences from upstream PromQL

| Area | Behavior |
|---|---|
| Metric name matching | Only exact matching on metric names; an exact match on the metric name is required in every query. |
| Staleness | Not supported in the Monarch backend. |
| `irate`, `rate`, `increase` | When the lookback window is less than the step size, it is increased to the step size. Monarch uses a different interpolation / extrapolation algorithm and stores counter samples with a time range, so results can differ slightly. |
| `histogram_quantile` | A histogram with no samples yields NaN in Prometheus; here the point is dropped. Rate differences can also affect its input. |
| Type-specific functions | Monarch is strongly typed: `rate()` on a GAUGE or `histogram_quantile()` on a COUNTER or untyped metric does not work. |

## Notes

- Mapping metric names to legacy PromQL: Replace the first `/` with `:`; replace all other special characters (including `.` and other `/`) with `_`. Charts and dashboards made before UTF-8 support use these names.
- Differences from upstream PromQL: Queries are partially evaluated at the Monarch backend; other than the differences below, PromQL is at parity with Prometheus version 2.44. Functions added after 2.44 might not be supported.
- Use PromQL from the **Code** tab in Metrics Explorer and in **Add Chart** when creating custom dashboards.
- Don't use metadata labels in alerting policies.
- Instead of regular expressions on `__name__`: use one policy per metric for Prometheus adapter configs; move dimensions into metric labels rather than into metric names; use the `/labels/__name__/values` call to discover metrics; use the Metrics Management page or the Samples Ingested / Samples Written by Attribution ID metrics for per-metric sample counts.
- Google Cloud Managed Service for Prometheus — not a self-hosted Prometheus server; PromQL semantics follow upstream Prometheus.
- Corrected from the official docs: the mapping table writes `custom.googleapis.com/opencensus/opencensus.io/ http/server/request_count_by_method` and `custom_googleapis_com:opencensus_opencensus_io_ http_server_request_count_by_method` with a space inside the name; metric types can't contain spaces (allowed characters: letters, digits, `.`, `_`, `:`, `-`, `/`; https://docs.cloud.google.com/monitoring/api/v3/naming-conventions), and the same page's `monitored_resource` example writes `custom_googleapis_com:opencensus_opencensus_io_http_server_request_count_by_method`. The spaces were removed.
- Source: https://docs.cloud.google.com/monitoring/promql (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [promql-in-monitoring.md](./promql-in-monitoring.md)
- [promql-in-alerting.md](./promql-in-alerting.md)
- [managed-prometheus-query.md](./managed-prometheus-query.md)
