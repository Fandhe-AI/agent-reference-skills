---
source: https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/overview
---

# Performance Dashboard overview

Performance Dashboard gives visibility into the performance of the entire Google Cloud network and of your project's resources, so you can tell an application problem from a Google Cloud network problem and investigate historical issues. It exports data to Cloud Monitoring.

## Signature / Usage

The dashboards are used through the Google Cloud console; the source page has no commands. Connectivity Tests, another Network Intelligence Center module, can rerun an existing test with the command below.

```bash
gcloud network-management connectivity-tests rerun my-test
```

## Options / Props

| View | Scope | Limits and contents |
|---|---|---|
| Project performance | Packet loss or latency only for zones where you have project VM instances (VM-to-VM, VM-to-internet) | Select up to five regions. Packet loss summary and region-pair / zone-pair averages; latency summary and region-pair / zone-pair medians. Current data plus six weeks |
| Google Cloud performance | Zone-to-zone packet loss and latency across all of Google Cloud, including internet locations | Select up to five Google Cloud regions. Summary views show up to 50 zone pairs (default window one hour). Zone pairs viewable even where your project has no deployment |

| Required permission | Included in roles |
|---|---|
| `monitoring.timeSeries.list` | Monitoring Viewer `roles/monitoring.viewer`, Monitoring Editor `roles/monitoring.editor`, Monitoring Admin `roles/monitoring.admin` |

## Notes

- Recommended alert: the packet loss alerting policy triggers when packet loss exceeds 5% for 5 minutes for any region pair.
- The dashboards do not represent network performance targets; increased packet loss or latency is not downtime under the Google Cloud SLA, especially for a single zone.
- Internet-location latency metrics show per region and city/geographic region/country when there is sufficient traffic for the pair.
- Multiple projects use a Cloud Monitoring metrics scope (Change Scope button or project picker). Generic Cloud Monitoring belongs to the planned `gcp-observability` skill.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-management/connectivity-tests/rerun (gcloud 593.0.0 help); the source page has no code.
- Source: https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [network-intelligence-center-overview.md](./network-intelligence-center-overview.md)
- [connectivity-tests-overview.md](./connectivity-tests-overview.md)
- [network-topology-overview.md](./network-topology-overview.md)
