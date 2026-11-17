---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/firewallinsights
---

# Firewall Insights IAM roles and permissions

## Signature / Usage

Predefined roles of `firewallinsights` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Firewall Insights Service Agent (`roles/firewallinsights.serviceAgent`)

- Gives Cloud Firewall Insights service agent permissions to retrieve Firewall, VM and route resources on user behalf. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (27): `compute.backendServices.list`, `compute.firewalls.get`, `compute.firewalls.list`, `compute.forwardingRules.list`, `compute.healthChecks.list`, `compute.httpHealthChecks.list`, `compute.httpsHealthChecks.list`, `compute.instanceGroups.list`, `compute.instances.get`, `compute.instances.list`, `compute.networks.getEffectiveFirewalls`, `compute.networks.list`, `compute.projects.get`, `compute.regionTargetTcpProxies.list`, `compute.routers.list`, `compute.routes.get`, `compute.routes.list`, `compute.subnetworks.list`, `compute.targetHttpProxies.list`, `compute.targetHttpsProxies.list`, `compute.targetPools.list`, `compute.targetSslProxies.list`, `compute.targetTcpProxies.list`, `compute.targetVpnGateways.list`, `compute.urlMaps.list`, `compute.vpnGateways.list`, `compute.vpnTunnels.list`

### Example: inspect a role

Generated example (not in the official docs) describing the first role on this page; every role on this page is a service agent role, which is granted to the service agent by Google Cloud and must not be granted to users:

```bash
gcloud iam roles describe roles/firewallinsights.serviceAgent
```

## Notes

- Roles and permissions of the `firewallinsights` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/firewallinsights (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
