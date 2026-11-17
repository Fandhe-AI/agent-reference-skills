---
source: https://docs.cloud.google.com/armor/docs/network-edge-policies
---

# Configure network edge security policies

Network edge security policies allow or block traffic at the edge of Google's network for regional external passthrough Network Load Balancers, protocol forwarding, and VMs with public IP addresses. They filter by source and destination IP ranges similarly to Cloud Next Generation Firewall without consuming your resources, and are the only policy type that supports byte-offset filtering.

## Signature / Usage

### Custom rule: allow only a source range

Requires an active Cloud Armor Enterprise subscription and advanced network DDoS protection. Create a new policy; do not reuse the policy used to enable advanced network DDoS protection.

```bash
gcloud compute security-policies create POLICY_NAME \
   --type=CLOUD_ARMOR_NETWORK \
   --region=REGION
```

Change the default rule from `allow` to `deny` so traffic not explicitly allowed is blocked.

```bash
gcloud compute security-policies rules update 2147483647 \
   --security-policy=POLICY_NAME \
   --action=deny \
   --region=REGION
```

Add an allow rule at priority `RULE_PRIORITY` for the source range `RANGE`.

```bash
gcloud compute security-policies rules create RULE_PRIORITY \
   --security-policy=POLICY_NAME \
   --network-src-ip-ranges=RANGE \
   --action=allow \
   --region=REGION
```

Associate the policy with a backend service.

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME \
   --security-policy=POLICY_NAME \
   --region=REGION
```

Alternatively, associate it with a single VM instance.

```bash
gcloud beta compute instances network-interfaces update VM_NAME \
   --security-policy=POLICY_NAME \
   --security-policy-region=REGION \
   --network-interface=NETWORK_INTERFACE \
   --zone=ZONE_NAME
```

Optional check: the `securityPolicy` field in the output links to your policy.

```bash
gcloud compute instances describe VM_NAME --zone=ZONE_NAME
```

### Byte-offset filtering

Cloud Armor performs deep packet inspection on a TCP/UDP byte offset value and can apply the action when the value is present or absent. The example allows traffic when the value is present and denies the rest. Create the policy (skip if you have one):

```bash
gcloud compute security-policies create POLICY_NAME \
   --type=CLOUD_ARMOR_NETWORK \
   --region=REGION_NAME
```

Add user-defined fields (up to eight per policy; two shown):

Adapted (not in the official docs): `--base=TCP` changed to `--base=tcp`; gcloud 593.0.0 accepts only `ipv4`, `ipv6`, `tcp`, `udp`.

```bash
gcloud compute security-policies add-user-defined-field POLICY_NAME \
   --user-defined-field-name=USER_DEFINED_FIELD_NAME_TCP \
   --base=tcp \
   --offset=OFFSET \
   --size=SIZE \
   --mask=MASK \
   --region=REGION_NAME
```

Adapted (not in the official docs): `--base=UDP` changed to `--base=udp` for the same reason.

```bash
gcloud compute security-policies add-user-defined-field POLICY_NAME \
   --user-defined-field-name=USER_DEFINED_FIELD_NAME_UDP \
   --base=udp \
   --offset=OFFSET \
   --size=SIZE \
   --mask=MASK \
   --region=REGION_NAME
```

Add a rule using the same field names; replace `VALUE1` and `VALUE2` with values to allow.

Adapted (not in the official docs): dropped the trailing `USER_DEFINED_FIELD_NAME_UDP;VALUE1,VALUE2` element, which repeats the UDP field and whose `,VALUE2` gcloud splits into an element without the `NAME;` part.

```bash
gcloud compute security-policies rules create RULE_PRIORITY \
   --security-policy=POLICY_NAME \
   --network-user-defined-fields="USER_DEFINED_FIELD_NAME_TCP;VALUE1:VALUE2,USER_DEFINED_FIELD_NAME_UDP;VALUE1:VALUE2" \
   --action=allow \
   --region=REGION_NAME
```

Set the default rule to deny (skip if already deny), then associate the policy with the passthrough Network Load Balancer's backend service:

```bash
gcloud compute security-policies rules update 2147483647 \
   --security-policy=POLICY_NAME \
   --action=deny \
   --region=REGION_NAME
```

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME \
   --security-policy=POLICY_NAME \
   --region=REGION_NAME
```

## Options / Props

### Supported rule fields

| Field | Flag | Description |
|---|---|---|
| Source IP address | `--network-src-ip-ranges` | Source IPv4/6 addresses or CIDR prefixes, standard text format |
| Source ports | `--network-src-ports` | TCP/UDP/SCTP port numbers; each element a 16-bit number (such as "80") or range (such as "0-1023") |
| Source region codes | `--network-src-region-codes` | Two-letter country code (ISO 3166-1 alpha 2) |
| Source ASNs | `--network-src-asns` | BGP Autonomous System Number of the source IP address |
| Destination IP address ranges | `--network-dest-ip-ranges` | Destination IPv4/6 addresses or CIDR prefixes |
| Destination ports | `--network-dest-ports` | TCP/UDP/SCTP port numbers or ranges |
| IP address protocols | `--network-ip-protocols` | IPv4 protocol / IPv6 next header (after extension headers); 8-bit number (such as "6"), range (such as "253-254"), or `tcp`, `udp`, `icmp`, `esp`, `ah`, `ipip`, `sctp` |
| Byte-offset filtering | `--network-user-defined-fields` (with `add-user-defined-field`) | See byte-offset filtering above |

### User-defined field parameters

| Parameter | Description |
|---|---|
| Base | `IPv4`, `IPv6`, `TCP`, or `UDP` |
| Offset | Offset of the field from the base, in bytes |
| Size | Size of the field in bytes; maximum `4` |
| Mask | Mask for the bits in the field to be matched |

### Region codes for territories under comprehensive US sanctions (with `--network-src-region-codes`)

| Territory | Assigned code |
|---|---|
| Crimea | `XC` |
| The so-called Donetsk People's Republic (DNR) and the so-called Luhansk People's Republic (LNR) | `XD` |

### Cloud Monitoring metrics

| Metric | Meaning |
|---|---|
| `packet_count` | `Blocked`: boolean result of an `allow` or `deny` action; `Count`: incremented once for each 10,000 packets (a value of `5` means at least 50,000 matching packets) |
| `preview_packet_count` | Same as `packet_count`, for rules in preview mode |

## Notes

- Not supported for VM instances using Dynamic NICs. Policies can be deployed in preview mode.
- Once a network edge security service is added to a policy, it can be removed only with the Google Cloud CLI or the API, not the console.
- Changing the default rule (priority `2147483647`) to `deny` blocks everything not explicitly allowed and can cut off production traffic; add allow rules and test on a disposable policy or in preview mode first.
- The allow rule is a source-range allowlist; supply the narrowest `RANGE` that you need rather than a wide range such as `0.0.0.0/0`.
- Region codes `XC` and `XD` are available only with `--network-src-region-codes`.
- Metrics require enabling the Network Security API (`networksecurity.googleapis.com`); the Compute Security Admin role (`roles/compute.securityAdmin`) includes the permission.
- The VM association example uses `gcloud beta`; gcloud 593.0.0 help also lists `--security-policy` and `--security-policy-region` on the GA `gcloud compute instances network-interfaces update`.
- The full flag list for `gcloud compute security-policies` is in the `gcp-compute` skill. Console steps are omitted; see the source page.
- Corrected from the official docs: `--base=TCP` and `--base=UDP`. The gcloud 593.0.0 help of `gcloud compute security-policies add-user-defined-field` says "BASE must be one of: ipv4, ipv6, tcp, udp", and the upper-case values fail with "Invalid choice". The source's field table writes the bases as `IPv4`, `IPv6`, `TCP`, `UDP`.
- Corrected from the official docs: `--network-user-defined-fields="USER_DEFINED_FIELD_NAME_TCP;VALUE1:VALUE2,USER_DEFINED_FIELD_NAME_UDP;VALUE1:VALUE2,USER_DEFINED_FIELD_NAME_UDP;VALUE1,VALUE2"`. The gcloud 593.0.0 help gives the format `--network-user-defined-fields=[NAME;VALUE:VALUE:...,...]` (elements separated by `,`, values by `:`), so `VALUE2` after the last comma has no field name.
- Source: https://docs.cloud.google.com/armor/docs/network-edge-policies (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [security-policy-overview.md](./security-policy-overview.md)
- [best-practices.md](./best-practices.md)
