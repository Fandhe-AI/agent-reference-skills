---
source: https://docs.cloud.google.com/workload-manager/docs/observe/sap/view-dashboards
---

# View SAP observability dashboards

View the system health status of SAP workloads in the Workload Manager **Observability** page (system dashboard and per-system details) to perform root cause analysis and troubleshoot issues. The observability service is available only for SAP workloads.

## Signature / Usage

### Remove a workload from the dashboard

First disable discovery on the compute instances that run the SAP workload. With a VM Extension Manager policy: edit the policy, set `enable_discovery` to `false` in the `discovery_configuration` section, `collect_process_metrics` to `false` to stop process monitoring, and `enabled` to `false` in `hana_monitoring_configuration` to stop SAP HANA monitoring. Without a policy, over SSH on each instance:

```bash
sudo /usr/bin/google_cloud_sap_agent configure -feature=sap_discovery -disable
```

```bash
sudo /usr/bin/google_cloud_sap_agent configure -feature=process_metrics -disable
```

```bash
sudo /usr/bin/google_cloud_sap_agent configure -feature=hana_monitoring -disable
```

Optionally remove the workload from the **Observability** page immediately.

```bash
curl -X "DELETE" 'https://workloadmanager.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/insights/SYSTEM_IDENTIFIER' -H "Authorization: Bearer $(gcloud auth print-access-token)"
```

`SYSTEM_IDENTIFIER` is visible in the console URL, for example:

```text
https://console.cloud.google.com/workload-manager/systems/a1b2c3d4/...
```

## Options / Props

### System dashboard columns

| Field | Description |
|-------|-------------|
| System | SAP system identifier (SID). One entry if application and database SIDs are the same; otherwise an entry in the format `[APP_SID]-[DB_SID]`. |
| Observability pre-reqs | **Enabled**: prerequisites completed for all compute instances running the workload. **Error**: prerequisites pending for at least one instance (see the **Overview**, **Applications**, and **Databases** tabs). |
| Workload type | Shows **SAP**. |
| Health | Overall health; expand for application, database, and central services (ASCS) layers. |
| Products | Names and versions of the SAP products. |
| Region | Region of the Compute Engine instances, for example `us-central1`. |
| Last backup state | **Successful** or **Failed** for the last backup of the SAP HANA data volume, based on the `sap/hanamonitoring/backups/data` metric. No value if: no SAP HANA database; no data-volume backups; SAP HANA monitoring of the Agent for SAP is not correctly configured; or the SAP HANA user in the agent configuration lacks permission to query backups. |
| Last backup on | Date and time of the last SAP HANA data-volume backup; no value under the same conditions. |

### System health status

| Status | Description |
|--------|-------------|
| Gray (Unspecified) | Not enough values from the metric sources for the most important metrics (usually availability of application servers or SAP HANA) to define health; unknown or missing metric values make the system Unspecified. |
| Green (Healthy) | Reported metric values are within the defined thresholds for a healthy system. |
| Yellow (Caution) | Values are within the thresholds for an unhealthy system; low-priority issues that don't affect availability, or part of the system unavailable without risk to the whole system. |
| Red (Critical) | Values are within the thresholds for an unavailable system; availability and/or performance issues impact users and might disrupt business operations. |

### Metric sources

| Source | Notes |
|--------|-------|
| Compute Engine instances | Available by default, no agent required; under `compute.googleapis.com`. |
| Ops Agent | Requires the Ops Agent installed and running; under `agent.googleapis.com`; the required metrics are in the non-chargeable tier. |
| Agent for SAP | Requires the agent installed and running; under `workload.googleapis.com/sap`. |

### Agent for SAP metrics used for health

| Metric |
|--------|
| `workload.googleapis.com/sap/hana/availability` |
| `workload.googleapis.com/sap/hana/ha/availability` |
| `workload.googleapis.com/sap/hanamonitoring/system/replication_data_latency/total_time` |
| `workload.googleapis.com/sap/hana/service` |
| `workload.googleapis.com/sap/cluster/nodes` |
| `workload.googleapis.com/sap/cluster/resources` |
| `workload.googleapis.com/sap/nw/instance/role` |
| `workload.googleapis.com/sap/nw/service` |
| `workload.googleapis.com/sap/nw/availability` |

### Applications and Databases tab columns

| Column | Description |
|--------|-------------|
| VM Name | Name of the compute instance. |
| VM Status | Whether the instance is running. |
| SAP # | The SAP instance number assigned when deploying. |
| Role | **Application Server**, **Central Services**, **ERS**; for SAP HANA database servers **HANA Primary**, **HANA Secondary**. |
| Zone | Compute Engine zone. |
| Machine type | For example `n2-highmem-32` or `c4-highmem-48`. |
| Agent version | Status and version of the Agent for SAP; shown only when installed and actively running. |
| Process metrics | Whether process monitoring is correctly enabled. |
| System discovery | Whether SAP system discovery is correctly enabled. |
| HANA monitoring | Databases tab only; whether SAP HANA monitoring is correctly enabled. |
| Connect | Options such as **SSH**; users might need additional permission. |

### Predefined dashboard sections

| Tab | Sections |
|-----|----------|
| Applications | Availability, Performance, Storage, Networking, Application server performance, Work process utilization, NetWeaver memory, Workload statistics |
| Databases | Availability, Performance, Database Performance, Storage, Network, Database Utilization, Database Capacity, Database Backups |

### Supported SAP event types (annotations)

| Event type | Description |
|------------|-------------|
| SAP Availability | Status of SAP HANA, SAP NetWeaver, and the nodes and resources in Pacemaker-managed Linux HA clusters when they stop, start, or face errors. Needs Agent for SAP Process Monitoring metrics: `sap/hana/service`, `sap/hana/availability`, `sap/nw/service`, `sap/nw/availability`, `sap/cluster/nodes`, `sap/cluster/resources`. |
| SAP Backint | Backint-based backup and recovery operations. Needs the Agent for SAP Backint metrics. |
| SAP Operations | Status of data replication in SAP HANA HA systems. Needs the Process Monitoring metric `sap/hana/ha/replication`. |

## Notes

- Open **Workload Manager**, select a project, then **Observability**; enable the required APIs and configure the Workload Manager service agent if prompted. A DR site is displayed as a secondary instance in the **Overview** tab.
- Overall health is *Healthy* only if all layers and sublayers are *Healthy*; otherwise the system is marked *Unspecified* in the source's centralized example. The layers are Central services, Application servers, and Database servers; the number of sublayers depends on the architecture (a centralized system has fewer than a distributed one). The source's HA example shows overall Red (Critical) when application server 1 is Red.
- The system details **Overview** tab shows system metadata (SID, architecture, region, scale-up or scale-out), a card per layer, **Health Insights** (unhealthy instances and reasons), and **Maintenance Events** (instances with an upcoming or recently completed host maintenance event). If agent setup is incomplete on even one instance, a red banner appears at the top of the **Overview**, **Applications**, and **Databases** tabs.
- To view SAP events as annotations: the instances must run Agent for SAP version 3.7 or later; open the **Applications** or **Databases** tab, click **Annotations**, select event types, and click **Apply**; hover over an event and click **View** to open Logs Explorer filtered to it.
- Removal: it can take up to 48 hours for Workload Manager to delete the collected metrics and for the workload to disappear from the **Observability** page unless you run the DELETE request. The DELETE request removes the workload from the page (not the workload itself); try it on a disposable project first.
- Custom alerts: create Cloud Monitoring alerting policies on the displayed metrics (thresholds on any available Cloud Monitoring metric, including SAP workload metrics). Cloud Monitoring is in `gcp-observability`.
- The source shows the `sudo` commands as separate indented blocks; each is a separate fence here.
- Source: https://docs.cloud.google.com/workload-manager/docs/observe/sap/view-dashboards (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [sap-observability-overview.md](./sap-observability-overview.md)
- [workload-manager-overview.md](./workload-manager-overview.md)
