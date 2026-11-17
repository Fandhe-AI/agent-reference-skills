---
source: https://docs.cloud.google.com/network-security-integration/docs/security-profile-groups-overview
---

# Security profile groups overview

A security profile group is a container for custom security profiles. A mirroring rule references a security profile group to enable the processing of network traffic within Network Security Integration. Groups apply to packet mirroring policies only when a mirroring rule with the action `MIRROR` is added, and can be configured in hierarchical firewall policy rules and global network firewall policy rules.

## Signature / Usage

### Describe a security profile group

```bash
gcloud network-security security-profile-groups describe \
  my-security-profile-group --organization=1234 --location=global
```

## Options / Props

### Specifications

| Item | Value |
|------|-------|
| Scope | Global, organization-level or project-level resource |
| Organization-level name | `organizations/ORGANIZATION_ID/locations/global/securityProfileGroups/NAME` |
| Project-level name | `projects/PROJECT_ID/locations/global/securityProfileGroups/NAME` |
| `NAME` | String of 1-63 characters; lowercase alphanumeric characters or hyphens (-); starts with a letter |
| Profiles per group | Only one security profile of type `CUSTOM_MIRRORING` |
| Organization-level group | Can reference only organization-level security profiles |
| Project-level group | Can reference only project-level security profiles in the same project |

| Specifications |
|---|
| Examples: `organizations/2345678432/locations/global/securityProfileGroups/example-security-profile-group`, `projects/my-project-123/locations/global/securityProfileGroups/example-security-profile-group`. |
| With the short name, provide the organization ID or project ID and location separately in `gcloud`. |
| A mirroring rule must contain the name of the security profile group. Depending on the rule direction, mirrored traffic goes to the mirroring endpoint group of the profile, which redirects it to the producer deployment group. |
| Each group must have an associated project ID (quotas and access restrictions). |

### IAM roles

| Ability | Necessary role (on the organization or the project) |
|---------|------------------------------------------------------|
| Create or modify a group | Security Profile Admin (`networksecurity.securityProfileAdmin`) |
| View or list groups | Any of: `networksecurity.securityProfileAdmin`, Compute Network User (`compute.networkUser`), Compute Network Viewer (`compute.networkViewer`) |
| Use a group in a packet mirroring policy rule | Any of: `networksecurity.securityProfileAdmin`, `compute.networkUser` |

## Notes

- IAM roles: Without `roles/networksecurity.securityProfileAdmin`, these permissions allow management: `networksecurity.securityProfileGroups.create`, `.delete`, `.get`, `.list`, `.update`, `.use`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profile-groups/describe (gcloud 593.0.0 help). The source page itself has no code. The create help example uses a threat prevention profile, which this page does not cover, so it is not copied.
- Quotas for groups are on the NSI quotas page.
- Source inconsistency: this page says security profile groups for mirroring can be configured in hierarchical firewall policy rules, but the out-of-band integration overview (https://docs.cloud.google.com/network-security-integration/docs/out-of-band/out-of-band-integration-overview, retrieved 2026-11-17) lists "Supported by hierarchical firewall policies" as "No" for packet mirroring, and the NSI overview (https://docs.cloud.google.com/network-security-integration/docs/nsi-overview, retrieved 2026-11-17) limits hierarchical firewall policies to in-band integration.
- Source: https://docs.cloud.google.com/network-security-integration/docs/security-profile-groups-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [security-profiles-overview.md](./security-profiles-overview.md)
- [out-of-band-integration-overview.md](./out-of-band-integration-overview.md)
- [nsi-quotas.md](./nsi-quotas.md)
