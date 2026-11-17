---
source: https://docs.cloud.google.com/intrusion-detection-system/docs/overview
---

# Cloud IDS overview

Cloud Intrusion Detection System (Cloud IDS) provides threat detection for intrusions, malware, spyware and command-and-control attacks. It creates a Google-managed peered network with mirrored VM instances; mirrored traffic is inspected by Palo Alto Networks threat protection technologies. You can mirror all traffic or filter by protocol, IP address range, or ingress / egress. It covers north-south and east-west traffic, including intra-subnet traffic, and can help meet PCI 11.4 and HIPAA requirements. Cloud IDS detects and alerts; it does not prevent attacks or repair damage (use Cloud Next Generation Firewall to act on detected threats).

## Signature / Usage

### Get the endpoint forwarding rule used by packet mirroring

```bash
gcloud ids endpoints describe ENDPOINT_NAME
```

## Options / Props

### IDS endpoints

| Item | Value |
|------|-------|
| Resource | Zonal; can inspect traffic from any zone in its region |
| Per region | One endpoint per monitored region recommended; multiple endpoints allowed |
| Inspection capacity | 5 Gbps per endpoint; absorbs anomalous spikes up to 17 Gbps; recommended one endpoint per 5 Gbps of throughput |
| Connectivity | Private services access; for endpoints in the same VPC network the same private connection is reused, with a new subnet per endpoint. Adding IP ranges requires modifying the connection. |
| Traffic source | Packet mirroring policies attached to a single IDS endpoint; all traffic from a VM goes to the same Google-managed IDS VM |

### Advanced threat detection

| Feature | Description |
|---------|-------------|
| App-ID | Application visibility regardless of port, protocol, evasive tactic or encryption; list expanded weekly (typically 3-5 applications) and updated in daily content updates |
| Default signature set (Cloud IDS service profile in the console) | Vulnerability detection (critical, high, medium-severity threats for clients and servers) and anti-spyware signatures; customize by minimum alert severity |
| Threat exceptions | `--threat-exceptions` disables noisy threat IDs; limited to 99 exceptions per IDS endpoint |
| Content updates | Automatic, picked up daily; maximum update latency up to 48 hours |

### Threat severity levels

| Severity | Description |
|----------|-------------|
| Critical | Serious threats, such as those affecting default installations of widely deployed software, resulting in root compromise of servers, with exploit code widely available; no special credentials needed. |
| High | Could become critical but mitigating factors exist (difficult to exploit, no elevated privileges, small victim pool). |
| Medium | Minor threats with minimized impact, or exploits requiring the attacker on the same local network, non-standard configurations or obscure applications. |
| Low | Warning-level threats with very little impact; usually need local or physical access; may cause privacy issues or information leakage. |
| Informational | Suspicious events with no immediate threat, reported to call attention to possible deeper problems. |

## Notes

- Limitation: when Cloud NGFW Layer 7 inspection policies and Cloud IDS endpoint policies apply to the same traffic, the Layer 7 inspection policy takes priority and the traffic isn't mirrored.
- Cloud IDS is subject to the Cloud Data Processing Addendum. Alerts go to the threat log; see Cloud IDS Logging.
- This is Cloud IDS (a managed Google service), not the Network Security Integration out-of-band service that mirrors to your own appliances; see the other pages in this category.
- Snippet taken from https://docs.cloud.google.com/intrusion-detection-system/docs/configuring-ids (same category). The source page itself has no code.
- Source: https://docs.cloud.google.com/intrusion-detection-system/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuring-ids.md](./configuring-ids.md)
- [best-practice.md](./best-practice.md)
- [ids-quotas.md](./ids-quotas.md)
- [out-of-band-integration-overview.md](./out-of-band-integration-overview.md)
