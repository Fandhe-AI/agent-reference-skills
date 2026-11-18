---
source: https://docs.cloud.google.com/stackdriver/docs/observability/application-topology
---

# View application topology

The Application Monitoring topology graph is a dynamic, interactive view of the relationships between App Hub applications, services and workloads (traffic, latency, error rate, open alerts), for one application or for the whole application management boundary. For custom queries use App Topology in Cloud Hub.

## Signature / Usage

### Application labels used by the graph

To generate a topology graph, trace data must contain application-specific labels. The labels page lists the trace resource attributes as `gcp.apphub.application.{container,id,location}` and `gcp.apphub.{workload,service}.{criticality_type,environment_type,id}`, and shows the format of the `apphub` log field:

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

### Graph elements

| Element | Meaning |
|---|---|
| Blue circle | An application registered with App Hub; **Collapse** / **Expand** buttons (the Expand value is the number of registered services and workloads). |
| Node | A registered or discovered service or workload; icon shows Agent, MCP server, Service or Workload. |
| Connection | Traffic between two nodes; select it for error rate and 95th latency percentile. |

### Limitations

| Limitation | Detail |
|---|---|
| Time range | Latency and error rate use the most recent hour; not changeable. |
| Alerts | Only alerts from the past 24 hours; registered resources use alerting policies with resource labels, not application labels. |
| Size | At most 1000 nodes or connections; at most 100 discovered services and 100 discovered workloads per supported App Hub region. |
| Registration | You can't register by dragging a node into an application's circle. |
| Discovered-only connections | For Firestore, Spanner, Cloud Storage and Google Cloud MCP servers, connections appear only when the resource has App Hub registration status `discovered`. |

### Prerequisites

| Item | Detail |
|---|---|
| Setup | Application Monitoring configured, default trace scope lists all projects with trace data. |
| APIs | Observability, App Topology, Cloud Trace and Telemetry APIs enabled (`observability.googleapis.com`, `apptopology.googleapis.com`, `cloudtrace.googleapis.com`, `telemetry.googleapis.com`). |
| Enabling APIs | `serviceusage.services.enable` (Owner or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`). |
| Viewing | App Topology viewer (`roles/apptopology.viewer`) on your project. |
| Permissions | `apptopology.discoveredResourcesTopologies.generate`, `apptopology.sreDomainTopologies.generate`. |
| Instrumentation | Instrument with OpenTelemetry and send traces to the OTLP endpoint (Telemetry API). |

## Notes

- Note from the source: on October 15, 2026 the App Topology API transitions to a usage-based billing model with a daily free data usage allotment (https://cloud.google.com/products/app-topology/pricing).
- Application labels in trace data are available only when you instrument with OpenTelemetry, send trace data to the Telemetry API and register the application with App Hub. This is OpenTelemetry tracing in Google Cloud, not the tracing of the OpenAI Agents SDK (`openai-agents`) or the Vercel AI SDK telemetry (`vercel-ai-sdk`).
- Enable the Observability API in other projects added to the trace scope too; the graph only shows trace connections from trace-scope projects in the same organization as your App Hub project.
- View: Application monitoring page, select the host or management project, open the **Topology** tab (for the whole boundary) or select an application first. For discovered resources the flyout may show a Cloud Asset Inventory name that decides which dashboard data is shown.
- Snippet taken from https://docs.cloud.google.com/stackdriver/docs/observability/application-monitoring-labels (the source page has no code block; instrumentation samples are in other categories). In that page, the notation `a.b.{x,y}` represents both `a.b.x` and `a.b.y`.
- Source: https://docs.cloud.google.com/stackdriver/docs/observability/application-topology (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [application-monitoring.md](./application-monitoring.md)
- [setup-application-monitoring.md](./setup-application-monitoring.md)
- [application-monitoring-labels.md](./application-monitoring-labels.md)
