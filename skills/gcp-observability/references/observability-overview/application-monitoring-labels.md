---
source: https://docs.cloud.google.com/stackdriver/docs/observability/application-monitoring-labels
---

# Application Monitoring labels and attributes

Application-specific log labels, metric labels, trace resource attributes and alerting policy labels that Google Cloud Observability uses to build dashboards and the topology map for applications registered with App Hub. The notation `a.b.{x,y}` in the source means both `a.b.x` and `a.b.y`.

## Signature / Usage

### The `apphub` log field

Log data written by Google Cloud infrastructure can store application information in the `LogEntry` fields `apphub`, `apphubDestination` and `apphubSource`. Each holds an `AppHub` object that can list labels for an application, a service and a workload.

```text
apphub: {
  application: {
    container: "projects/my-project"
    id: "my-app"
    location: "my-app-location"
  }
  workload: {
    criticalityType: "MEDIUM"
    environmentType: "STAGING"
    id: "my-workload-id"
  }
}
```

## Options / Props

### Labels by telemetry type

| Telemetry | Source | Labels / attributes |
|---|---|---|
| Logs | Google Cloud infrastructure | `LogEntry` fields `apphub`, `apphubDestination`, `apphubSource` |
| Metrics | Google Cloud infrastructure | `metadata.system_labels.apphub_application_{container,id,location}`, `metadata.system_labels.apphub_{workload,service}_{criticality_type,environment_type,id}` |
| Metrics | Instrumentation you added | `metric.labels.apphub_application_{container,id,location}`, `metric.labels.apphub_workload_{criticality_type,environment_type,id}` |
| Traces | Instrumentation you added (resource attributes) | `gcp.apphub.application.{container,id,location}`, `gcp.apphub.{workload,service}.{criticality_type,environment_type,id}` |
| Alerting policies | User-attached | `apphub_application_location`, `apphub_application_id`, `apphub_service_id` or `apphub_workload_id` |

## Notes

- Typically only `apphub` is populated; `apphubDestination` and `apphubSource` are populated only for edge-like entries such as VPC Flow Logs (VPC Flow Logs configuration is in `gcp-networking`).
- Service and workload labels aren't automatically attached to alerting policies. When a policy includes the three keys, its alerts are shown on the Application Monitoring dashboards.
- Source: https://docs.cloud.google.com/stackdriver/docs/observability/application-monitoring-labels (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [application-monitoring.md](./application-monitoring.md)
- [setup-application-monitoring.md](./setup-application-monitoring.md)
- [application-topology.md](./application-topology.md)
- [about-application-monitoring.md](./about-application-monitoring.md)
