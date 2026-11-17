---
source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/concepts/connect-on-prem-gcp
---

# Connect an on-premises data center to Google Cloud (Google Distributed Cloud software only for VMware)

Options for connecting on-premises Google Distributed Cloud clusters to the Google Cloud network, and features that enhance the fundamental connection.

## Signature / Usage

### VPC Service Controls and `gkectl` validation errors

If you use VPC Service Controls, some `gkectl` commands can fail with:

```text
"Validation Category: GCP - [UNKNOWN] GCP service: [Stackdriver] could not get GCP services"
```

To avoid these errors, add the `--skip-validation-gcp` parameter to your `gkectl` commands.

## Options / Props

| Option | Traffic path | Notes |
|--------|--------------|-------|
| Regular internet connection | Public internet | Suitable if the deployment is self-contained, used mainly for cluster management, or accesses a Google service such as Cloud SQL over public IPs with firewall rules |
| HA VPN + Cloud Router | Public internet, encrypted | Private IP communication; Cloud Router exchanges routes dynamically |
| Partner Interconnect | Via a supported service provider; not the public internet | Private IPs; fast, secure, reliable |
| Dedicated Interconnect | Direct physical connection; not the public internet | Cost-effective for high bandwidth; faster than Partner Interconnect |

### Enhancements (assume HA VPN, Partner Interconnect or Dedicated Interconnect)

- Private Google Access: lets VMs with only private IPs reach Google APIs and services, enabled at subnet level; on-premises requests traverse Cloud Interconnect or Cloud VPN. Not required when reaching a service by private IP, for example a Cloud SQL instance with a private IP that Cloud Router advertises to your on-premises network, or NodePort / internal load balancer Services of a cluster in Google Cloud.
- VPC Service Controls: security perimeters around Google-managed services to protect against exfiltration.
- Connect: view and manage on-premises user clusters from the Google Cloud console. It is not the fundamental connection; it runs on top of Cloud Interconnect or Cloud VPN.

## Notes

- Impact of temporary disconnection: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/reference/connectivity
- Network connectivity products (Cloud VPN, Interconnect, Private Google Access) are general Google Cloud networking (`gcp-networking`); this page covers only their use with Google Distributed Cloud.
- Former names: Google Distributed Cloud Virtual, Anthos clusters on VMware. The source mentions Container Registry among services reachable with Private Google Access; Container Registry was shut down on March 18, 2025, use Artifact Registry instead.
- The source page has no code block; the fenced text is the error message quoted in the source.
- Source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/concepts/connect-on-prem-gcp (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [vmware-install-overview.md](./vmware-install-overview.md)
- [vmware-overview.md](./vmware-overview.md)
