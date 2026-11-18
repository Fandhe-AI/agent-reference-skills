---
source: https://docs.cloud.google.com/kms/docs/bare-metal-hsm
---

# Bare Metal HSM

Bare Metal HSM is an infrastructure-as-a-service offering in which Google hosts your own (customer-owned) HSMs next to your Google Cloud workloads in PCI-compliant colocation facilities with active peering fabrics. You have logical access only; Google provides racks, switching, power and Partner Interconnect connectivity. It is available only to customers with specific business and technical requirements; contact your account representative.

## Signature / Usage

Step 3 of the network setup below (global dynamic routing in the VPC network) corresponds to this gcloud example:

```bash
gcloud compute networks update network-name \
    --bgp-routing-mode=global
```

### Network setup per set of racks in a zone

Steps from the source: (1) create a redundant pair of Cloud Routers per zone using ASN16550; (2) create two redundant pairs of VLAN attachments with Partner Interconnect per zone with the pre-activate option (four attachments per zone; otherwise activate the connections manually); (3) enable global dynamic routing in the VPC network (follow the 99.99% or 99.9% Partner Interconnect tutorials); (4) configure firewall rules to allow traffic between your premises and project resources.

## Options / Props

### Bare Metal HSM vs Bare Metal Rack HSM

| Bare Metal HSM | Bare Metal Rack HSM |
|---|---|
| Google hosts your HSMs on a per-device basis | Google hosts your HSMs on a per-rack basis |
| Logical access, no physical access | Logical access and escorted physical access on request |
| Small deployments of 10-15 HSMs | Large rack-level deployments of 100 or more HSMs |

### HSM equipment requirements

| Item | Requirement |
|------|-------------|
| Rack | 36 rack units available; 42 inches deep; EIA-310 19" with square hole mounts; up to 4 rack units per HSM |
| Power | Dual AC power supplies (16A max per supply); 208V line to line (US locations); rack PDU with C13 or C19 outlets |
| Power cables (yours) | PDU end C14 or C20; 2 x 6 feet or 2 meter |
| Network | Dual 1g copper NICs (if applicable); 2 x 6 feet or 2 meter CAT-5e or better patch cables (yours) |
| Security | No cameras or wireless (such as Bluetooth); FIPS 140-2 Level 3 or better; fully remotely manageable |
| Weight / cooling | No requirements |

### SLA requirements

| Deployment | SLA |
|------------|-----|
| One pair of racks in a single zone | 99.9% |
| Two zones (two regions, or two zones in the same region where available), at least two HSMs per zone (one per rack in at least two racks), global dynamic routing | 99.99% |

### Location compatibility

| Geographical area | Location | Description | Zones per region |
|---|---|---|---|
| Americas | `us-central1` | Iowa | 1 |
| Americas | `us-south1` | Dallas | 1 |
| Americas | `us-east4` | Northern Virginia | 1 |
| Americas | `us-west1` | Oregon | 1 |
| Europe | `europe-west4` | Netherlands | 1 |
| Europe | `europe-west3` | Frankfurt | 1 |
| Americas | `southamerica-west1` | Santiago | 1 |
| Americas | `southamerica-east1` | São Paulo | 1 |
| Asia-Pacific | `australia-southeast1` | Sydney | 2 |
| Asia-Pacific | `australia-southeast2` | Melbourne | 2 |
| Middle East | `me-west1` | Tel Aviv | 2 |

## Notes

- Contract: minimum 12 months; Premium Support is required. You procure, configure and ship HSMs; Google racks, stacks and connects them and configures Partner Interconnect.
- Compliance: limited to FIPS 140-2 Level 3 or better HSMs; facilities are PCI-DSS, PCI-3DS and SOC 1, 2, 3 compliant. Google supports your AOC for PCI-PIN, PCI-P2PE and SOC in all regions. Not a general hosting or colocation service.
- Google has no logical access to your HSMs or their keys. Customer visits are not permitted; Google provides a remote hands service.
- Decommissioning: you file a request and must erase all data and reset HSMs to factory defaults; erased or reset HSMs are then shipped back, or destroyed if they can't be shipped. Erasure is irreversible; the keys on them are lost.
- Provide MAC address and assigned IP for each HSM network interface. HSM internal IP allocations shouldn't overlap with on-premises or Google Cloud project IP addresses. Each HSM needs at least two 1GE copper interfaces with redundant connections to both top-of-rack switches (management and data both).
- A single Partner Interconnect connection failure isn't an SLA violation. Global Routing lets HSMs at either location reach Google Cloud resources in any region. A 99.99% SLA in one region is possible if it has two zones. Single-zone deployments have 99.9% availability until the second zone is available.
- Source: https://docs.cloud.google.com/kms/docs/bare-metal-hsm (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/update (gcloud 593.0.0 help). The full `gcloud compute` flag list is in the `gcp-compute` skill.

## Related

- [single-tenant-hsm.md](./single-tenant-hsm.md)
- [ekm.md](./ekm.md)
