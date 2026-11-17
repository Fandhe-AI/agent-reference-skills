---
source: https://docs.cloud.google.com/firewall/docs/about-intrusion-prevention
---

# Intrusion detection and prevention service overview

Cloud NGFW intrusion detection and prevention monitors workload traffic for intrusions, malware, spyware and command-and-control attacks. Google-managed zonal firewall endpoints use packet intercept to inspect traffic for configured threat signatures, powered by Palo Alto Networks threat prevention technologies. It is a Cloud NGFW Enterprise capability.

## Signature / Usage

### Create a threat prevention security profile

Adapted (not in the official docs): `--organization=ORGANIZATION_ID --location=global` is added because the help example omits the location and the organization or project, and gcloud 593.0.0 then fails with "[security_profile] resource missing required data".

```bash
gcloud network-security security-profiles threat-prevention \
  create my-security-profile --description="New Security Profile" \
  --organization=ORGANIZATION_ID --location=global
```

## Options / Props

### Processing sequence

| Step | What happens |
|---|---|
| 1 | Firewall policy rules apply to traffic to and from VM instances or GKE clusters in the network. |
| 2 | Matched traffic is intercepted and sent to the firewall endpoint for Layer 7 inspection. |
| 3 | The endpoint scans packets for configured threat signatures. |
| 4 | If a threat is detected, the action configured in the security profile is performed on the packet. |

### Components

| Component | Role |
|---|---|
| Security profile (type `threat-prevention`) | Overrides specific threat prevention scenarios; configurable at organization or project level. |
| Security profile group | Org- or project-level; max one `threat-prevention` profile per group; referenced by rules. |
| Firewall endpoint | Zonal, org- or project-level; scans intercepted traffic in the same zone. |
| Firewall policy rule | Matches traffic by Layer 3 / Layer 4 components and sets the security profile group on `apply_security_profile_group`. Hierarchical and global network firewall policies support Layer 7 rules; secure tags can be used in the rules. |
| TLS inspection | Decrypts selected encrypted traffic (inbound and outbound) for inspection. |

### Limitations

| Limitations |
|---|
| Firewall endpoints ignore X-Forwarded-For (XFF) headers, so they aren't included in VPC firewall rules logging. |
| Firewall endpoints support IP packets of a limited size only. |
| Intranode visibility for GKE is unsupported. |
| Inspecting egress traffic from serverless workloads is not supported (both Direct VPC egress and Serverless VPC Access connectors). |

## Notes

- Components: Threat signature categories: anti-spyware, vulnerability protection, antivirus.
- Enterprise capabilities are available only through firewall policies; "firewall rules" on this page means firewall policy rules, not VPC firewall rules.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/threat-prevention/create (gcloud 593.0.0 help); the source page has no code block.
- Adapted from the official docs: the help example for this profile command omitted `--location` and `--organization` (or `--project`), which gcloud 593.0.0 needs to parse the profile name; organization-level profiles use `--organization`, project-level profiles use `--project`.
- Source: https://docs.cloud.google.com/firewall/docs/about-intrusion-prevention (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-security-profiles.md](./about-security-profiles.md)
- [about-security-profile-groups.md](./about-security-profile-groups.md)
- [about-firewall-endpoints.md](./about-firewall-endpoints.md)
- [about-tls-inspection.md](./about-tls-inspection.md)
- [about-url-filtering.md](./about-url-filtering.md)
