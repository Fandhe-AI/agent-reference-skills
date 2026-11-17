---
source: https://docs.cloud.google.com/firewall/docs/about-security-profile-groups
---

# Security profile group overview

A security profile group is a container for security profiles. Firewall policy rules reference a group (action `apply_security_profile_group`) to enable Layer 7 inspection: intrusion detection and prevention, Advanced malware sandbox (WildFire) and URL filtering.

## Signature / Usage

### Create a security profile group

Adapted (not in the official docs): the gcloud help wraps the profile path in backticks across a line break, which a shell treats as command substitution; the path is given as one plain argument instead.

```bash
gcloud network-security security-profile-groups create \
  my-security-profile-group --organization=1234 \
  --location=global \
  --threat-prevention-profile=organizations/1234/locations/global/securityProfiles/my-security-profile \
  --description='optional description'
```

## Options / Props

| Item | Value |
|---|---|
| Scope | Organization-level (groups org-level profiles) or project-level (groups project-level profiles in the same project) |
| Name format | `organizations/ORGANIZATION_ID/locations/global/securityProfileGroups/NAME` or `projects/PROJECT_ID/locations/global/securityProfileGroups/NAME` |
| `NAME` | 1-63 characters, lowercase alphanumeric or hyphens, starts with a letter |
| Profile types | `THREAT_PREVENTION`, `WILDFIRE_ANALYSIS`, `URL_FILTERING`, in any order; only one profile of each type per group |
| Mandatory pairing | A `WILDFIRE_ANALYSIS` profile requires a `THREAT_PREVENTION` profile in the same group |
| Hierarchical firewall policies | Can reference only organization-level groups |
| Global network firewall policies | Can reference organization-level groups and project-level groups from any project |
| Project association | Each group has an associated project used for quotas and access restrictions |

### Organization-level vs project-level

| Organization-level vs project-level |
|---|
| Organization-level groups apply to organization-level and project-level endpoints. |
| Project-level groups apply to project-level endpoints in the same project; they can't be applied to organization-level endpoints. |

## Notes

- Inspection sequence: 1. `URL_FILTERING` profile runs first. 2. `THREAT_PREVENTION` runs; with Advanced malware sandbox enabled, `WILDFIRE_ANALYSIS` runs alongside it.
- Inspection sequence: If a possible threat is detected in the HTTP(S) header, intrusion detection and prevention can evaluate and block first; unblocked traffic then goes to URL filtering.
- Advanced malware sandbox protection layers: real-time protection (known signatures plus on-box ML), inline cloud analysis (before files reach the network), and asynchronous deep sandboxing of unknown files per submission rules.
- Rules match traffic; matched traffic is redirected to the firewall endpoint along with the group name.
- The group is referenced by the firewall policy of the VPC network where Layer 7 inspection is enforced.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profile-groups/create (gcloud 593.0.0 help); the source page has no code block.
- Adapted from the official docs: the help example wrote `--threat-prevention-profile=`organizations/1234/locations/\` / `global/securityProfiles/my-security-profile``; backticks replaced by a plain single-line value.
- Source: https://docs.cloud.google.com/firewall/docs/about-security-profile-groups (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-security-profiles.md](./about-security-profiles.md)
- [about-firewall-endpoints.md](./about-firewall-endpoints.md)
- [about-intrusion-prevention.md](./about-intrusion-prevention.md)
- [about-url-filtering.md](./about-url-filtering.md)
