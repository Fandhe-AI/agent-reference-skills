---
source: https://docs.cloud.google.com/bare-metal/docs/bms-security
---

# Provide security for enterprise workloads in a Bare Metal Solution environment

Security design guide for enterprise workloads (such as Oracle databases) on Bare Metal Solution: a shared-responsibility model organized into six security pillars (physical, compliance, network, data, operational, database).

## Signature / Usage

The page has no code. As an access-review step for server access (SSH keys registered in the project), list them (command example from the gcloud help):

```bash
gcloud bms ssh-keys list
```

## Options / Props

| Pillar | Key points |
|---|---|
| Physical security | Colocation regional extension run by a vendor; caged, camera-monitored (24/7), alarmed doors, biometric entry, locked racks with tracked key locker, per-visit tickets, PCI and ISO based access reporting |
| Compliance | ISO, PCI DSS, HIPAA, plus regional certifications where applicable |
| Network security | Layer 3 VLAN attachments connect your VPC to a unique VRF on the edge routers; Layer 2 VLANs inside the environment; client subnet to Google Cloud, optional private subnet for local services and storage |
| Data security | Encryption at rest by default; unique XTS-AES-256 data encryption key per data volume (never pre-generated), keys held in the NetApp onboard key manager, neither Google Cloud nor the vendor can access them; per-customer Storage Virtual Machine (SVM) on a NetApp cluster; at contract end volumes are cryptographically erased and quarantined for 7 days before reuse |
| Operational security | Staff access is temporary, limited and audited, with 24/7 monitoring; monitoring options include Bindplane (Blue Medora), Prometheus, Oracle Enterprise Manager |
| Database security | Bring Oracle controls: authentication (password policies, TLS, Kerberos, RADIUS, proxy authentication), authorization (privileges, roles, Centrally Managed Users, Database Vault, privilege analysis, data redaction, VPD, OLS), auditing (unified auditing, fine grained auditing, Audit Vault and Database Firewall), encryption (TDE, native network encryption or TLS, ASO for CMEK and Data Guard) |

Application connectivity patterns:

- Only network path to or from the regional extension is Partner Interconnect to the associated region over customer-specific VLAN attachments. Servers have no internet access by default; create a NAT instance if needed.
- BGP dynamic routing means resources in the attached VPC (and new subnets) can reach the servers directly; restrict with firewall policies.
- VPC peering: add a custom advertisement of the peered network CIDR on the redundant Cloud Routers. Shared VPC: create VLAN attachments in the host project.
- On-premises: connect via Dedicated Interconnect, Partner Interconnect or Cloud VPN, add a custom advertisement for the on-premises subnet CIDR, and use firewall rules to allow or block access.
- Backups: Oracle RMAN or solutions such as Actifio, with backup data stored in Cloud Storage tiers matching RTO/RPO.

## Notes

- Private Google Access (described on this page as VPC Service Controls-based perimeters) mitigates data exfiltration; use `restricted.googleapis.com` per https://docs.cloud.google.com/vpc/docs/configure-private-google-access-hybrid.
- Google Cloud API traffic from the environment is encrypted by default (e.g. backups to Cloud Storage).
- Key takeaways: shared responsibility, least privilege, separation of duties, prevent exfiltration via `restricted.googleapis.com`, follow Oracle's database security best practices. The Oracle suggestions are not exhaustive.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bms/ssh-keys/list (gcloud 593.0.0 help; the source page has no code).
- The custom advertisement of the peered or on-premises CIDR range on the redundant Cloud Routers mentioned in the connectivity list uses `gcloud compute routers update-bgp-peer`; see [bms-setup.md](./bms-setup.md) for the command and its notes on keeping advertised ranges narrow.
- Distance line: VPC networks, firewall policies and VPC Service Controls themselves are in the planned `gcp-networking` / `gcp-security`; IAM in general is in `gcp-foundation`. This page covers Oracle on Bare Metal Solution, not Oracle Database@Google Cloud, Cloud SQL or AlloyDB.
- Source: https://docs.cloud.google.com/bare-metal/docs/bms-security (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [bms-iam.md](./bms-iam.md)
- [bms-setup.md](./bms-setup.md)
- [bms-planning.md](./bms-planning.md)
