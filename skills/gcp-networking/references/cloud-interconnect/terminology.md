---
source: https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/terminology
---

# Key terms (Cloud Interconnect)

Definitions of the terms used across Cloud Interconnect: connection, VLAN attachment, Cloud Router, external / on-premises router, locations, edge availability domain, LOA-CFA, pairing key, and BGP terms. Each term states which connection types it applies to.

## Signature / Usage

### List connection locations

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/locations/list (gcloud 593.0.0 help). Locations such as `lga-zone1-16` and `dfw-zone2-4` encode metro and edge availability domain.

```bash
gcloud compute interconnects locations list --uri
```

## Options / Props

| Term | Applies to | Definition |
|---|---|---|
| Interconnect connection | Dedicated, Cross-Cloud, Cross-Site | Physical connection (single link or link bundle) in a colocation facility. Separate connections are needed for different locations or devices. |
| Connection type | all | Dedicated Interconnect, Partner Interconnect, Cross-Cloud Interconnect, Partner Cross-Cloud Interconnect for OCI, Partner Cross-Cloud Interconnect for AWS, Cross-Site Interconnect |
| VLAN attachment | Dedicated, Partner, Cross-Cloud, partner Cross-Cloud for OCI / AWS | Logical connection between an external network and a single region in a VPC network (`interconnectAttachment` in the Compute Engine API). Associated with a project, region, Cloud Router and connection; BGP runs between Cloud Router and the external router. |
| Cloud Router | Dedicated, Partner, Cross-Cloud | BGP speaker that exchanges routes between the VPC network and the external network. Must exist before creating a VLAN attachment. A Cloud Router belongs to one network. |
| On-premises router | Dedicated, Partner, Cross-Site | External router that peers with Cloud Router (BGP) or another on-premises router (Ethernet). |
| External router | all | An on-premises router or a virtual router in the remote cloud. |
| Connection location / colocation facility | Dedicated, Cross-Site (notes for Partner, Cross-Cloud) | Facility where your equipment meets Google's peering edge; each location supports a subset of regions. |
| Service provider | Partner | Network provider that supplies the connection to Google. |
| Metro | all | City of a colocation facility. |
| Metro availability zone | all | Older term for edge availability domain. |
| Edge availability domain | all | Each metro has two independent maintenance domains, `zone1` and `zone2`. Redundant connections must use different domains. |
| LOA-CFA | Dedicated, Cross-Site | Letter of Authorization and Connecting Facility Assignment; identifies the ports Google assigned and authorizes the facility vendor. No longer valid or available once the connection is `PROVISIONED`. |
| Pairing key | Partner | One-time key `<random>/<vlan-attachment-region>/<edge-availability-domain>`, for example `7e51371e-72a3-40b5-b844-2e3efefaee59/us-central1/2`. |
| Remote cloud service provider | Cross-Cloud | The other cloud (AWS, Azure, OCI, Alibaba Cloud). |
| BGP / AS / ASN / MD5 authentication | Cloud VPN and Cloud Interconnect | Both peers must use the same MD5 key or the session cannot be established (RFC 2385). |

### VLAN attachment capacity by type

| Type | Behavior |
|---|---|
| Dedicated | Allocates a 802.1Q VLAN on the connection; the VPC network must be in the same organization as the connection's project; default capacity 10 Gbps; capacity limits only Google Cloud to colocation traffic, so configure a rate limiter on your router for inbound traffic. Maximum bandwidth is approximate. |
| Partner | Attachment generates a pairing key that the service provider uses to configure the attachment and allocate an 802.1q VLAN. |
| Cross-Cloud | Allocates an 802.1Q VLAN; the Cloud Router's VPC network must be in the same project as the connection; default capacity 10 Gbps; configure an outbound rate limiter on the remote cloud's virtual router. |
| Partner Cross-Cloud for OCI | Order a partner VLAN attachment, then enter its pairing key when you get an Oracle FastConnect virtual circuit. |

Examples of full use of bandwidth: 2 x 10-Gbps connections need a 20-Gbps VLAN attachment; 5 x 10-Gbps connections need a 50-Gbps attachment. Attachments with combined bandwidth above the connection's do not give more bandwidth.

## Notes

- Layer 2 vs Layer 3 (Partner): with Layer 2 you configure BGP between your router and Cloud Router; with Layer 3 the service provider does.
- Without custom advertisements, Cloud Router advertises subnet routes of its region (regional dynamic routing mode) or all regions (global mode), and learned routes are available in the same scope.
- Treat the pairing key as sensitive until the attachment is configured; it cannot be modified. To get a new key, delete the VLAN attachment and create a new one (this breaks connectivity of that attachment; try it on a disposable resource first).
- BGP MD5 authentication keys (both peers must use the same key) are secrets: do not commit, share or print them. The pairing key in the example above is an illustrative value from the source.
- 100-Gbps circuits are not available at all locations; contact your sales representative.
- For maintenance isolation, locations `dfw-zone1-4` and `dfw-zone1-505` are the same edge availability domain (no redundancy); `dfw-zone1-4` and `dfw-zone2-4` are redundant. Maintenance windows are not coordinated across metros.
- Example: `lga-zone1-16` supports VLAN attachments in `northamerica-northeast1`, `northamerica-northeast2`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`.
- Source: https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/terminology (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/locations/list (gcloud 593.0.0 help).

## Related

- [overview.md](./overview.md)
- [dedicated-overview.md](./dedicated-overview.md)
- [partner-overview.md](./partner-overview.md)
- [cci-overview.md](./cci-overview.md)
