---
source: https://docs.cloud.google.com/vpc/docs/private-access-options
---

# Private access options for services

Overview of the options that give a VM without an external IP address private connectivity to Google and third-party APIs and services. By default such a VM can't reach anything outside its VPC network, including Google APIs. All Google Cloud APIs and services support at least one of: Private Service Connect, Private Google Access, private services access, VPC Network Peering. The options operate independently and you can configure more than one.

## Signature / Usage

### Enable Private Google Access on a subnet

```bash
gcloud compute networks subnets update SUBNET_NAME \
--region=REGION \
--enable-private-ip-google-access
```

## Options / Props

### Types of Google Cloud services

| Type | Examples | Private connectivity options |
|------|----------|------------------------------|
| Google APIs and services on Google's production infrastructure | Gmail, Google Docs, Google Maps; `*.googleapis.com` APIs; serverless `*.appspot.com`, `*.run.app`, `*.cloudfunctions.net`; `*.gstatic.com` files | Private Service Connect, Private Google Access, or both |
| VPC-hosted services on Compute Engine VMs in VPC networks (Google-managed or third-party) | Cloud SQL, Filestore, Memorystore for Redis | Private Service Connect, private services access, VPC Network Peering, or a combination |

### Connect to Google APIs

| Option | Clients | Connection | Supported services |
|--------|---------|------------|--------------------|
| Private Service Connect endpoints for Google APIs | Google Cloud resources or on-premises systems, with or without external IP addresses | Connect to an endpoint in your VPC network, which forwards requests to Google APIs and services | All Google Cloud APIs and most other Google APIs and services (see footnote 1) |
| Private Service Connect backends for Google APIs | Google Cloud resources or on-premises systems, with or without external IP addresses | Connect to a load balancer in your VPC network, which forwards requests to Google APIs and services | Selected locational and global Google APIs and services |
| Private Google Access | Google Cloud resources without external IP addresses | Connect to the standard external IP addresses or Private Google Access domains and VIPs through the VPC network's default internet gateway | Most Google APIs and services (see footnote 1) |
| Private Google Access for on-premises hosts | On-premises hosts with or without external IP addresses | Connect through a Cloud VPN tunnel or VLAN attachment using one of the Private Google Access-specific domains and VIPs | Depends on which Private Google Access-specific domain you use |

Footnote 1: Use private services access or Private Service Connect to connect to Google services that are not supported by Private Service Connect for Google APIs or Private Google Access.

### Connect to services in VPC networks

| Option | Clients | Connection | Supported services |
|--------|---------|------------|--------------------|
| Private Service Connect endpoints for published services | Google Cloud VM instances with or without external IP addresses | Connect to services in another VPC network through an endpoint | Services published using Private Service Connect for service producers |
| Private Service Connect backends for published services | Google Cloud VM instances with or without external IP addresses | Connect to services in another VPC network through a consumer-managed load balancer | Services published using Private Service Connect for service producers |
| Service connection policies | Google Cloud VM instances with or without external IP addresses | Connect through an endpoint; the managed service instance is deployed in a producer VPC network and configured through the service's administrative API or UI | Specific Google and third-party services; contact the service provider to find out whether a service supports them |
| Private services access | Google Cloud VM instances with or without external IP addresses | Connect to a Google or third-party managed VPC network through a VPC Network Peering connection | Google services and third-party services made available using the Service Networking API (see footnote 2) |

Footnote 2: Use Private Service Connect for Google APIs or Private Google Access to connect to Google services that are not supported by private services access or Private Service Connect for published services.

## Notes

- From serverless services (Cloud Run, App Engine standard, Cloud Run functions) to a VPC network, use Direct VPC egress; if that isn't an option, configure a Serverless VPC Access connector. Both also support sending packets to other networks connected to the selected VPC network.
- The source page has no code block. Snippet taken from https://docs.cloud.google.com/vpc/docs/configure-private-google-access (same category).
- Source: https://docs.cloud.google.com/vpc/docs/private-access-options (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [private-google-access.md](./private-google-access.md)
- [configure-private-google-access.md](./configure-private-google-access.md)
- [private-services-access.md](./private-services-access.md)
- [serverless-vpc-access.md](./serverless-vpc-access.md)
