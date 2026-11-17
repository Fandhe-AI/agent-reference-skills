---
source: https://docs.cloud.google.com/firewall/docs/about-url-filtering
---

# URL filtering service overview

The Cloud NGFW URL filtering service controls access to websites by allowing or blocking domains, using the domain and SNI information in egress HTTP(S) messages. Google-managed zonal firewall endpoints redirect traffic with packet intercept and match it against configured domain lists. It is a Cloud NGFW Enterprise feature.

## Signature / Usage

### Create a URL filtering security profile

Adapted (not in the official docs): `--organization=ORGANIZATION_ID --location=global` is added because the help example omits the location and the organization or project, and gcloud 593.0.0 then fails with "[security_profile] resource missing required data".

```bash
gcloud network-security security-profiles url-filtering create \
  my-urlf-security-profile \
  --description="New URLF Security Profile" \
  --organization=ORGANIZATION_ID --location=global
```

## Options / Props

### What is matched

| Traffic | Match source |
|---|---|
| Encrypted, TLS inspection enabled | Host header (decrypted) plus plaintext SNI from TLS negotiation |
| Encrypted, no TLS inspection | SNI from `clientHello` only |
| Unencrypted HTTP | Host header, regardless of TLS inspection setting |

### Components

| Component | Role |
|---|---|
| URL filtering security profile (`url-filtering`) | URL filters: matcher strings, unique priority and action |
| Security profile group | Container; a rule references it to enable URL filtering, intrusion prevention or both |
| Firewall endpoint | Zonal; matches domain / SNI against profile filters in the same zone as the target VM's VPC |
| Firewall policy rule | L3 / L4 match plus `apply_security_profile_group` action; hierarchical and global network firewall policies |

### Limitations

- Supports only `http/1.x` and `http/2`. QUIC, encrypted SNI (ESNI) and Encrypted Client Hello (ECH) aren't supported with TLS inspection enabled.
- With TLS inspection enabled, QUIC / ESNI / ECH traffic isn't passed. With it disabled, such traffic passes without domain / SNI information: allowed only when an explicit allow URL filter exists, otherwise the implicit deny URL filter blocks it.
- Firewall endpoints support IP packets of a limited size only.
- Inspecting egress traffic from serverless workloads is not supported (Direct VPC egress and Serverless VPC Access connectors).

## Notes

- Wildcard domain filtering (such as `*.example.com`) needs a rule with destination IP range `0.0.0.0/0`, because wildcard matching is done at Layer 7 by the security profile. Restrict it to internet-bound traffic with network contexts set to `INTERNET`.- With destination `0.0.0.0/0` plus a security profile group, traffic from VMs in zones without a firewall endpoint is not inspected and the rule allows all traffic matching the other parameters; deploy endpoints in every zone with workloads needing inspection.
- If URL filtering allows egress traffic, intrusion detection and prevention (if enabled) can scan it further. Secure tags can be used in the rules.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/url-filtering/create (gcloud 593.0.0 help); the source page has no code block.
- Adapted from the official docs: the help example for this profile command omitted `--location` and `--organization` (or `--project`), which gcloud 593.0.0 needs to parse the profile name; organization-level profiles use `--organization`, project-level profiles use `--project`.
- Source: https://docs.cloud.google.com/firewall/docs/about-url-filtering (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-security-profiles.md](./about-security-profiles.md)
- [about-security-profile-groups.md](./about-security-profile-groups.md)
- [about-firewall-endpoints.md](./about-firewall-endpoints.md)
- [about-tls-inspection.md](./about-tls-inspection.md)
- [about-intrusion-prevention.md](./about-intrusion-prevention.md)
