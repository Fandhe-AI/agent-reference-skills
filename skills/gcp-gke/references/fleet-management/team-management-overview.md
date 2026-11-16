---
source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/team-management-overview
---

# Fleet team management monitoring overview

With fleet team management you can view team-scoped information such as resource utilization aggregated by team and by namespace. The Monitoring tab on the Teams page in the Google Cloud console gives an overview of a specific team scope.

## Signature / Usage

In the Google Cloud console, with the fleet host project selected, open Teams, select a team scope and click the Monitoring tab. The page is Console-only; the source has no commands. To list the fleet's team scopes from the command line:

```bash
gcloud container fleet scopes list --project=PROJECT_ID
```

## Options / Props

| Section | Content |
|---|---|
| Time filter | Default: past seven days; predefined windows or Custom |
| Team summary | Number of clusters and namespaces, errors (link to Logs Explorer), container restarts, estimated monthly cost (link to Cost Optimization), average CPU, memory and disk utilization across namespaces |
| CPU / memory / disk utilization by team | Graph over time with lines: Limit (maximum containers may use, for example 42.5 CPUs), Requested (for example 3.8 CPUs), Used (actual, for example 0.64 CPUs) |
| Top CPU / memory / disk utilization by namespace | Five highest-utilization namespaces, highest first, with usage graph and average relative to the limit |
| Error distribution by namespace | Namespaces with the most error logs (link to Cloud Logging) |
| Restart counts distribution by namespace | Namespaces with the most container restarts, useful for tuning CPU limits and requests |

## Notes

- Resource utilization metrics are generated from Cloud Monitoring data of the team's clusters.
- Newly created clusters in the team scope may show no data in the Total Utilization card and the rest of the dashboard, depending on the chosen time window. See fleet resource utilization metrics troubleshooting.
- Requires familiarity with Kubernetes resource management for Pods and containers.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/scopes/list (the source page has no code).
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/team-management-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/scopes/list (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [fleet-concepts.md](./fleet-concepts.md)
- [about-fleet-workload-identity-federation.md](./about-fleet-workload-identity-federation.md)
