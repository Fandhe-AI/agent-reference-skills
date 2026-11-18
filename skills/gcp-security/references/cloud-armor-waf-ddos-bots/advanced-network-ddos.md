---
source: https://docs.cloud.google.com/armor/docs/advanced-network-ddos
---

# Configure advanced network DDoS protection

Cloud Armor protects regional external passthrough Network Load Balancers, protocol forwarding, and VMs with public IP addresses from volumetric DDoS attacks. Standard network DDoS protection is always on and covered by Cloud Armor Standard. Advanced network DDoS protection requires projects enrolled in Cloud Armor Enterprise, is enabled per region through a `CLOUD_ARMOR_NETWORK` security policy attached to a network edge security service, and adds attack monitoring, targeted mitigations and telemetry.

## Signature / Usage

### Enable advanced network DDoS protection

Prerequisites: an active Cloud Armor Enterprise subscription on the billing account and the project enrolled. After the policy is created for this purpose, custom rules cannot be added to it; create a new network edge security policy for custom rules.

1. Create a security policy of type `CLOUD_ARMOR_NETWORK` (or reuse one).

```bash
gcloud compute security-policies create SECURITY_POLICY_NAME \
    --type CLOUD_ARMOR_NETWORK \
    --region REGION
```

2. Set `--network-ddos-protection` to `ADVANCED`.

```bash
gcloud compute security-policies update SECURITY_POLICY_NAME \
    --network-ddos-protection ADVANCED \
    --region REGION
```

Or use `ADVANCED_PREVIEW` to enable the policy in preview mode.

```bash
gcloud beta compute security-policies update SECURITY_POLICY_NAME \
    --network-ddos-protection ADVANCED_PREVIEW \
    --region REGION
```

3. Create a network edge security service that references the policy.

```bash
gcloud compute network-edge-security-services create SERVICE_NAME \
    --security-policy SECURITY_POLICY_NAME \
    --region REGION
```

### Disable: set the level back to STANDARD

```bash
gcloud compute security-policies update SECURITY_POLICY_NAME \
    --network-ddos-protection STANDARD \
    --region REGION
```

### Disable: delete the policy

An in-use policy cannot be deleted. Remove it from the service or delete the service first.

```bash
gcloud compute network-edge-security-services update SERVICE_NAME \
    --security-policy="" \
    --region=REGION_NAME
```

```bash
gcloud compute network-edge-security-services delete SERVICE_NAME \
    --region=REGION_NAME
```

Adapted (not in the official docs): `--region=REGION` is added because a regional policy needs `--region` (the help has `--global | --region=REGION`); the source command had no region flag.

```bash
gcloud compute security-policies delete SECURITY_POLICY_NAME \
    --region=REGION
```

### Preview mode

Preview mode logs the detected attack and proposed mitigation without enforcing it; it is set per region with the `ADVANCED_PREVIEW` command in step 2 above. To enforce during an active attack, set `--network-ddos-protection` to `ADVANCED`; the policy is enforced almost immediately and the next `MITIGATION_ONGOING` event (every five minutes) reflects it.

## Options / Props

### Standard versus advanced

| Feature | Standard | Advanced (Cloud Armor Enterprise) |
|---------|----------|-----------------------------------|
| Protected endpoint types | Regional external passthrough Network Load Balancer, protocol forwarding, VMs with public IPs | Same |
| Forwarding rule enforcement | Yes | Yes |
| Always-on attack monitoring and alerting | No | Yes |
| Targeted attack mitigations | No | Yes |
| Mitigation telemetry | No | Yes |

### IAM permissions for network edge security services

| Permission | API method |
|------------|------------|
| `compute.networkEdgeSecurityServices.create` | `networkEdgeSecurityServices insert` |
| `compute.networkEdgeSecurityServices.update` | `networkEdgeSecurityServices patch` |
| `compute.networkEdgeSecurityServices.get` | `networkEdgeSecurityServices get` |
| `compute.networkEdgeSecurityServices.delete` | `networkEdgeSecurityServices delete` |
| `compute.networkEdgeSecurityServices.list` | `networkEdgeSecurityServices aggregatedList` |

### `--network-ddos-protection` values

| Value | Meaning |
|-------|---------|
| `STANDARD` | Standard protection only |
| `ADVANCED` | Advanced protection, enforced |
| `ADVANCED_PREVIEW` | Advanced protection in preview mode: logs and telemetry, mitigation not enforced |

### Mitigation log filters

| Mitigation type | Log filter |
|-----------------|-----------|
| Start | `resource.type="network_security_policy" jsonPayload.mitigationType="MITIGATION_STARTED"` |
| Ongoing | `resource.type="network_security_policy" jsonPayload.mitigationType="MITIGATION_ONGOING"` |
| End | `resource.type="network_security_policy" jsonPayload.mitigationType="MITIGATION_ENDED"` |

## Notes

- Advanced network DDoS protection is not supported for VM instances using Dynamic NICs.
- Training period of 24 hours after enabling before a reliable baseline is built and baseline-based mitigations apply.
- In preview mode each `mitigation_type` is prefixed `PREVIEWED_` (for example `PREVIEWED_MITIGATION_STARTED`). Logs are on the `network_security_policy` resource in Logs Explorer. Event logs carry alert ID, target VIP, total volume (pps, bps), classified attacks (for example `NTP-udp`, `CHARGEN-udp`), and top source ASNs, geos and IPs; the source's three full log examples are omitted.
- Security Command Center shows a finding "Volumetric DDoS Attack Attempt - Network LB/VMs" that is active during mitigation and inactive after it ends (see the `gcp-security-compliance` skill).
- Adapted from the official docs: `gcloud compute security-policies delete SECURITY_POLICY_NAME` became `gcloud compute security-policies delete SECURITY_POLICY_NAME --region=REGION`.
- Source inconsistency: the preview-mode text says to set the `--ddos-protection` flag to `ADVANCED_PREVIEW`, but its command and the gcloud 593.0.0 help use `--network-ddos-protection`. The GA `update` help also lists `ADVANCED_PREVIEW`; the source uses `gcloud beta` for that value. The full flag list is in the `gcp-compute` skill.
- Removing a project with an active advanced network DDoS policy from Cloud Armor Enterprise still bills the feature; delete the policies before unenrolling.
- Deleting a policy or service disables advanced protection for the region and is disruptive; try it on a disposable policy first.
- Source: https://docs.cloud.google.com/armor/docs/advanced-network-ddos (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [armor-enterprise-overview.md](./armor-enterprise-overview.md)
- [adaptive-protection-overview.md](./adaptive-protection-overview.md)
