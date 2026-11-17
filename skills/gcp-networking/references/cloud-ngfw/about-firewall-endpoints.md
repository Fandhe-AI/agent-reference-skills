---
source: https://docs.cloud.google.com/firewall/docs/about-firewall-endpoints
---

# Firewall endpoint overview

A firewall endpoint is a zonal Cloud NGFW resource (Enterprise tier) that performs Layer 7 inspection: intrusion detection and prevention, Advanced malware sandbox (WildFire) and URL filtering. It receives traffic redirected by Google Cloud packet intercept, which inserts appliances into the path without changing routing policies.

## Signature / Usage

### Create a firewall endpoint and associate it with a network

Adapted (not in the official docs): `--billing-project=BILLING_PROJECT_ID` is added because gcloud 593.0.0 rejects an organization-scoped endpoint without it ("--billing-project flag must be specified for org-scoped firewall endpoints").

```bash
gcloud network-security firewall-endpoints create my-endpoint \
    --zone=us-central1-a --organization=1234 \
    --billing-project=BILLING_PROJECT_ID
```

Adapted (not in the official docs): the help wraps the `--endpoint` value across a line break, which would split the argument in a shell, so it is given on one line; the `--network` value uses the `projects/PROJECT/global/networks/NAME` form shown by the other `network-security` association examples (the help example wrote `networks/global/myNetwork`).

```bash
gcloud network-security firewall-endpoint-associations create \
  --network=projects/my-project/global/networks/myNetwork \
  --endpoint=organizations/1234/locations/us-central1-a/firewallEndpoints/my-endpoint \
  --zone=us-central1-a --project=my-project
```

## Options / Props

### Specifications and limits

| Item | Value |
|---|---|
| Scope | Zonal resource, organization-level or project-level. Project-level endpoints can be associated with any VPC network in the organization. |
| Zone | Endpoint and protected workloads must be in the same zone; no inspection for zones without an attached endpoint. |
| Throughput (endpoint) | Up to 2 Gbps with TLS inspection, 10 Gbps without. Overload causes packet loss and may drop legitimate traffic. |
| Throughput (per connection) | 250 Mbps with TLS inspection, 1.25 Gbps without. |
| Cross-region internal Application Load Balancer (Preview) | Max throughput 1.6 Gbps. |
| Jumbo frames | Endpoint accepts packets up to 8,588 bytes (plus 308 bytes reserved for GENEVE, total 8,896) or, without jumbo support, up to 1,460 bytes. |
| MTU requirement | VPC networks must use MTU of 8,588 bytes or less (jumbo endpoint) or 1,460 bytes or less (no jumbo). |
| Association | A VPC network can be associated with one firewall endpoint per zone (organization-level and project-level combined). Cross-project association requires both projects in the same organization. |
| Deletion | Only when no VPC networks are associated. |

### Advanced malware sandbox settings on an endpoint

| Setting | Meaning |
|---|---|
| WildFire region | Region where suspicious files are submitted; defaults to nearest available. |
| Content cloud region | Content cloud region used; defaults to nearest available. |
| Signature lookup timeout | Max milliseconds the firewall holds a file during real-time lookup. |
| Signature lookup timeout action | `Allow` or `Deny`; default `Allow`. |
| Block HTTP partial responses | Blocks resuming of blocked malicious HTTP downloads (maximum security). |
| Inline cloud analysis max duration | Max hold time during inline cloud analysis (seconds or milliseconds depending on interface). |
| Inline cloud analysis timeout action | `Allow` or `Deny`; default `Allow`. |
| Enable submission timeout logging | Logs files that time out during inline cloud analysis. |

## Notes

- Jumbo frame support can't be added or removed on an existing endpoint; delete and recreate it. Deleting an endpoint or association stops Layer 7 inspection for that zone; try on a disposable resource first.
- If a VPC network's MTU exceeds the endpoint limit, the endpoint performs no URL filtering, Advanced malware sandbox or intrusion detection and prevention for it.
- Project-level interception requires: a VPC network in the VM's zone associated with the endpoint; traffic matching a rule with `apply_security_profile_group`; and the security profile group in the same project as the endpoint. If they differ, traffic may still be intercepted but a default profile is applied.
- Gradually increase traffic and monitor capacity with the `firewall_endpoint` network security metrics. Creating the endpoint in the workload zone lowers latency, avoids cross-zonal traffic cost and outage risk.
- Google provides dedicated VMs and failover for high availability. Quotas: see [quotas.md](./quotas.md).
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/firewall-endpoints/create and https://docs.cloud.google.com/sdk/gcloud/reference/network-security/firewall-endpoint-associations/create (gcloud 593.0.0 help); the source page has no code block.
- Adapted from the official docs: the associations example split `--endpoint=organizations/1234/locations/us-central1-a/\` and `firewallEndpoints/my-endpoint` over two indented lines (joined into one value) and wrote `--network=projects/my-project/networks/global/myNetwork` (changed to `projects/my-project/global/networks/myNetwork`).
- Adapted from the official docs: the create example omitted `--billing-project`, which gcloud 593.0.0 requires for organization-scoped endpoints; the help describes that project as the one used for API enablement check, quota and endpoint uptime billing.
- Source: https://docs.cloud.google.com/firewall/docs/about-firewall-endpoints (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-security-profiles.md](./about-security-profiles.md)
- [about-security-profile-groups.md](./about-security-profile-groups.md)
- [about-intrusion-prevention.md](./about-intrusion-prevention.md)
- [about-url-filtering.md](./about-url-filtering.md)
- [about-tls-inspection.md](./about-tls-inspection.md)
