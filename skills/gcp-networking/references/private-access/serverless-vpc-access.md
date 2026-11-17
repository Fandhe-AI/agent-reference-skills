---
source: https://docs.cloud.google.com/vpc/docs/serverless-vpc-access
---

# Send serverless traffic to a VPC network

Google recommends Direct VPC egress for Cloud Run services and jobs, with no Serverless VPC Access connector required. If Direct VPC egress isn't an option, Serverless VPC Access lets Cloud Run, Cloud Run functions and App Engine standard send requests to a VPC network using internal DNS and internal IP addresses (RFC 1918 and RFC 6598). A connector is a resource attached to one VPC network and one region; responses also use the internal network.

## Signature / Usage

### List regions that support connectors

```sh
gcloud compute networks vpc-access locations list
```

## Options / Props

### Connector IP range

| Option | Requirement |
|--------|-------------|
| Subnet | An existing `/28` subnet with no resources already using it |
| CIDR range | An unused `/28` CIDR range that doesn't overlap any in-use range |

### Firewall rules created for connectors in standalone VPC networks or Shared VPC host projects

| Purpose | Name format | Type | Action | Priority | Protocols and ports |
|---------|-------------|------|--------|----------|---------------------|
| Health check probes (`35.191.0.0/16`, `130.211.0.0/22`) to connector VMs | `aet-CONNECTOR_REGION-CONNECTOR_NAME-hcfw` | Ingress | Allow | 100 | TCP:667 |
| Google's serverless infrastructure (`35.199.224.0/19`) to connector VMs | `aet-CONNECTOR_REGION-CONNECTOR_NAME-rsgfw` | Ingress | Allow | 100 | TCP:667, UDP:665-666, ICMP |
| Connector VMs to `35.199.224.0/19` | `aet-CONNECTOR_REGION-CONNECTOR_NAME-earfw` | Egress | Allow | 100 | TCP:667, UDP:665-666, ICMP |
| Connector VMs to `35.199.224.0/19`, all other ports | `aet-CONNECTOR_REGION-CONNECTOR_NAME-egrfw` | Egress | Deny | 100 | TCP:1-666, 668-65535, UDP:1-664, 667-65535 |
| All traffic from connector VMs (by IP address) to all resources in the connector's VPC network | `aet-CONNECTOR_REGION-CONNECTOR_NAME-sbntfw` | Ingress | Allow | 1000 | TCP, UDP, ICMP |
| All traffic from connector VMs (by network tag) to all resources in the connector's VPC network | `aet-CONNECTOR_REGION-CONNECTOR_NAME-tagfw` | Ingress | Allow | 1000 | TCP, UDP, ICMP |

### Throughput and scaling

| Machine type | Estimated throughput (Mbps) |
|--------------|-----------------------------|
| `f1-micro` | 100-500 |
| `e2-micro` | 200-1000 |
| `e2-standard-4` | 3200-16000 |

| Throughput and scaling |
|---|
| Minimum instances must be at least 2; maximum at most 10 and larger than the minimum. Defaults: minimum 2, maximum 10. |
| Connectors scale out automatically as traffic increases, never scale in, and can't mix machine types. To reduce instances, recreate the connector. |
| Example: `f1-micro` with defaults gives about 100 Mbps at the minimum and 500 Mbps at the maximum. |

### Supported networks and environments

| Network | Support |
|---------|---------|
| VPC, Shared VPC | Yes |
| Legacy networks | No |
| Networks connected to Cloud Interconnect, Cloud VPN, VPC Network Peering | Yes |

| Serverless environment | Support |
|------------------------|---------|
| Cloud Run, Cloud Run functions | Yes |
| App Engine standard environment | All runtimes except PHP 5 |
| Knative serving, App Engine flexible environment | No (deploy in a VPC network that has connectivity to the target resources instead) |

### Protocols

| Protocol | Only requests to private IPs through connector | All traffic through connector |
|----------|-----------------------------------------------|-------------------------------|
| TCP | Yes | Yes |
| UDP | Yes | Yes |
| ICMP | Supported only for external IP addresses | No |

## Notes

- Connector IP range: Traffic sent through the connector into the VPC network originates from the subnet or CIDR range you specify.
- Firewall rules created for connectors in standalone VPC networks or Shared VPC host projects: Google Cloud creates these automatically; they exist only while the connector exists, are visible in the console and can't be edited or deleted.
- Firewall rules created for connectors in standalone VPC networks or Shared VPC host projects: Additional firewall rules you add must use a priority higher than 100, as the source states, so they don't conflict with the hidden rules. For a connector created in a Shared VPC service project that targets the host project's network, you must add the firewall rules yourself.
- Network tags: Every connector automatically gets two tags that can't be deleted or added to: `vpc-connector` (universal) and `vpc-connector-REGION-CONNECTOR_NAME` (unique).
- Protocols: IPv6 traffic is not supported.
- The source's example says requests to external IP addresses still travel through the internet and don't use the connector; this holds when only requests to private IPs are routed through the connector. When the serverless resource routes all traffic through the connector (Cloud Run `--vpc-egress=all-traffic`), requests to external IP addresses also go through the connector (see the protocol table and the Clarified line below). Serverless VPC Access sends internal traffic back to the serverless environment only as a response to a request sent through the connector. To reach resources across multiple VPC networks and projects, also configure Shared VPC or VPC Network Peering.
- Maintenance: Google replaces instances (host migrations, security updates to the base image, restart once every two weeks). A replaced instance stops accepting new requests one minute before shutdown. If an organization policy such as `constraints/compute.trustedImageProjects` blocks images from the `serverless-vpc-access-images` project, replacements fail and the instance count can fall to zero. Use connection pools rather than connections lasting over one minute; a connector may temporarily exceed its maximum instance count.
- Throughput chart in Cloud Monitoring (Connector details page) is Preview, under Pre-GA terms.
- Cross-region resources incur outbound data transfer costs. Pricing is on the VPC pricing page (not copied).
- Regions: every region that supports Cloud Run, Cloud Run functions or App Engine standard environment.
- Source position: Google recommends Direct VPC egress for Cloud Run services and jobs (no connector required) and presents Serverless VPC Access connectors as the option when Direct VPC egress isn't available. Treat connectors as the fallback, not the default; see the `gcp-run` skill for the service side.
- This page is conceptual; connector creation steps are on the official page Configure Serverless VPC Access (https://docs.cloud.google.com/vpc/docs/configure-serverless-vpc-access). The only code block in the source is the `locations list` command.
- The hidden connector firewall rules use priority 100 (and 1000 for the two traffic-from-connector rules); the source tells you to use a priority higher than 100 for rules you add.
- Source inconsistency: the source says rules you add "must use a priority higher than 100" while the hidden connector rules use priority 100 and 1000; it does not say whether "higher" is meant numerically (greater than 100) or as precedence (a lower number). Check the effective rule order on the connector's network before relying on either reading.
- Clarified from the official docs: the overview says "Requests sent to external IP addresses still travel through the internet and don't use the Serverless VPC Access connector", while the protocol table on the same page has the column "Route all traffic through the connector", and the gcloud 593.0.0 help for `gcloud run deploy` says `--vpc-egress=all-traffic` "Sends all outbound traffic through Direct VPC egress or the VPC connector".
- Source: https://docs.cloud.google.com/vpc/docs/serverless-vpc-access (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [private-access-options.md](./private-access-options.md)
- [private-google-access.md](./private-google-access.md)
