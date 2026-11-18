---
source: https://docs.cloud.google.com/network-intelligence-center/docs/cloud-network-insights/overview
---

# Cloud Network Insights overview

Cloud Network Insights, offered in partnership with AppNeta by Broadcom, gives visibility into network health and application performance across multicloud and hybrid environments by using active synthetic probing from Monitoring Points. The control plane is hosted on Google Cloud and managed by AppNeta.

## Signature / Usage

Network Management API groups for monitoring providers and Monitoring Points:

```bash
gcloud network-management network-monitoring-providers list \
    --location=global
```

```bash
gcloud network-management network-monitoring-providers \
    monitoring-points list \
    --network-monitoring-provider=my-provider-id --location=global
```

## Options / Props

| Action | Interface |
|---|---|
| Deploy Monitoring Points (download Docker, Helm, OVA bundles; see Active or Offline status) | Google Cloud console |
| View Monitoring Points (fleet, software versions, upgrades needed) | Google Cloud console |
| Create monitoring policies (source, target, profiles) | AppNeta |
| View high-level metrics (latency, loss, jitter) in Cloud Monitoring dashboards | Google Cloud console |
| Deep dive troubleshooting (hop-by-hop TruPath, web transaction timeline) | AppNeta |
| Create alarm rules (thresholds that send events and logs to Google Cloud) | AppNeta |
| Configure alert policies and notifications (email, Slack, PagerDuty, Pub/Sub) with log-based alerting | Google Cloud console |

| Path type | Mode | Behavior |
|---|---|---|
| Network paths (Layer 3 and 4 hop-by-hop; RTT, packet loss, jitter, path changes) | Single-ended | Probes an external target without a Monitoring Point using ICMP, TCP, UDP or Echo |
| Network paths | Dual-ended | Probes another Monitoring Point or a Global Monitoring Target; one-way latency, jitter, asymmetric routing detection |
| Web paths (Layer 7) | Browser | Real browser engine (Selenium) loads full pages |
| Web paths | HTTP | Synthetic HTTP or HTTPS requests to a URL or API endpoint |

| Telemetry | Destination | Examples |
|---|---|---|
| Metrics | Cloud Monitoring | Network Health (min/avg/max RTT, packet loss %, jitter); Web Experience (total transaction time, DNS lookup time, TTFB, HTTP status codes) |
| Logs | Cloud Logging | `networkmanagement.googleapis.com/insights_alarm` (performance deviates from baselines); `networkmanagement.googleapis.com/insights_event` (structural changes such as a Monitoring Point going offline and online, or a path change) |

## Notes

- Monitoring Points are lightweight agents deployed as containers or virtual appliances in cloud or on-premises networks; they communicate securely over the internet with the control plane.
- Setup order: deploy Monitoring Points, configure monitoring policies, set up alarms and logging, set up alerts and notifications, analyze metrics.
- Alarms come from alarm rules in AppNeta that define thresholds and how many violations in a period trigger an event; predefined alert policy templates exist, such as `Critical Network Alarm`.
- Launch stage: the source page does not state a launch stage, deprecation or retirement date for Cloud Network Insights, so none is given here; check the source page before relying on it for new deployments.
- Generic Cloud Monitoring / Logging belongs to the `gcp-observability` skill.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-management/network-monitoring-providers/list and https://docs.cloud.google.com/sdk/gcloud/reference/network-management/network-monitoring-providers/monitoring-points/list (gcloud 593.0.0 help); the source page has no code.
- Source: https://docs.cloud.google.com/network-intelligence-center/docs/cloud-network-insights/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [network-intelligence-center-overview.md](./network-intelligence-center-overview.md)
- [performance-dashboard-overview.md](./performance-dashboard-overview.md)
