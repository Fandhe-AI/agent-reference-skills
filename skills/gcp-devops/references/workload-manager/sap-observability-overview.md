---
source: https://docs.cloud.google.com/workload-manager/docs/observe/sap/overview
---

# Workload Manager observability for SAP: overview

Workload Manager's observability service for SAP is a built-in monitoring solution for SAP workloads on Google Cloud. It combines infrastructure metrics and SAP application metrics into a unified view to correlate events and show system health across all layers, using existing Google Cloud alerting and monitoring features. Workload Manager creates a logical, system-centric representation of each SAP system, identified by the SAP system ID (SID).

## Signature / Usage

To immediately remove a workload from the observability page (see the dashboards page for the full removal procedure):

```bash
curl -X "DELETE" 'https://workloadmanager.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/insights/SYSTEM_IDENTIFIER' -H "Authorization: Bearer $(gcloud auth print-access-token)"
```

## Options / Props

### Information sent by each component

| Component | Sends |
|-----------|-------|
| Agent for SAP | Process Monitoring metrics and SAP HANA Monitoring metrics to Cloud Monitoring; logs related to your SAP system to Cloud Logging; information on the underlying SAP system directly to Workload Manager. |
| Ops Agent (Recommended) | Infrastructure and guest OS information to Cloud Monitoring. |
| Cloud Asset Inventory | Instance metadata: maintenance events, instance states, and instance machine types. |

### SAP system mapping data

By default the Agent for SAP only collects information about the underlying compute instance; additional agent features send the following to Workload Manager.

| Data |
|------|
| Compute Engine instance name and number |
| Attached storage (disks, NFS) |
| Related load balancers, instance groups, health checks, forwarding rules, firewall rules |
| IP addresses |
| Database software name and version |
| Application software name and version |
| SAP system ID (SID): application and database |

## Notes

- Use cases: a unified view of SAP systems with overall and sublayer health; an overview of each system's layers and resources; troubleshooting and root cause analysis with preconfigured dashboards and annotations for predefined SAP events; infrastructure, OS, and application metrics on a single dashboard; upcoming host maintenance events for compute instances on supported machine types belonging to an SAP system.
- Workload Manager reconciles the collected data to create a logical mapping of each SAP system, referred to by its SID.
- The observability service is free, but the agents send data to Cloud Monitoring and Cloud Logging and you incur costs for those services. Increasing collection frequency or using other agent features can add charges. You can disable SAP HANA monitoring and process monitoring collection in the agent to avoid costs. The source gives per-VM estimates for the required features; they are not copied here. See Agent for SAP pricing (https://docs.cloud.google.com/sap/docs/agent-for-sap/latest/planning#pricing) and Ops Agent pricing (https://docs.cloud.google.com/monitoring/agent/ops-agent#pricing).
- The DELETE request removes the workload from the observability page, not the workload itself; it cannot be undone from the dashboard, so try it on a disposable project first.
- Cloud Monitoring and Cloud Logging are in `gcp-observability`.
- Snippet taken from https://docs.cloud.google.com/workload-manager/docs/observe/sap/view-dashboards
- Source: https://docs.cloud.google.com/workload-manager/docs/observe/sap/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [view-dashboards.md](./view-dashboards.md)
- [workload-manager-overview.md](./workload-manager-overview.md)
