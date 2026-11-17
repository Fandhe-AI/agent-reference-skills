---
source: https://docs.cloud.google.com/network-security-integration/docs/security-profiles-overview
---

# Security profiles overview

Security profiles are policy containers used by multiple network security products. In Network Security Integration a security profile specifies the action for a matched mirroring rule: it identifies the endpoint group (associated with your VPC network, pointing to a producer's deployment group) to which traffic is sent, and mirrored packets carry the security profile group `data_path_id` (GENEVE Profile ID) that a collector can use for policy enforcement. Without a security profile on the rule, the service doesn't know where to send the mirrored traffic.

## Signature / Usage

### Describe a security profile

```bash
gcloud network-security security-profiles describe \
  my-security-profile --organization=1234 --location=global
```

## Options / Props

### Specifications

| Item | Value |
|------|-------|
| Supported type | `CUSTOM_MIRRORING` |
| Organization-level name | `organizations/ORGANIZATION_ID/locations/global/securityProfiles/NAME` |
| Project-level name | `projects/PROJECT_ID/locations/global/securityProfiles/NAME` |
| `NAME` | String of 1-63 characters; lowercase alphanumeric characters or hyphens (-); starts with a letter |
| Examples | `organizations/2345678432/locations/global/securityProfiles/example-security-profile`, `projects/my-project-123/locations/global/securityProfiles/example-security-profile` |

| Specifications |
|---|
| With the full URL identifier, organization or project and location are already included. With the short name, provide the organization ID or project ID and the location separately in `gcloud`. |
| Each security profile must have an associated project ID, used for quotas and access restrictions. A service account authenticated with `gcloud auth activate-service-account` can be associated with the profile. |
| Attach a profile to a security profile group; the group is referenced by the network firewall policy of the VPC network. Matching traffic is sent to the endpoint group referenced by the profile. |

### IAM roles

| Ability | Necessary role (on the organization or the project) |
|---------|------------------------------------------------------|
| Create or modify a custom security profile | Security Profile Admin (`networksecurity.securityProfileAdmin`) |
| View details of, or list, custom security profiles | Any of: Security Profile Admin (`networksecurity.securityProfileAdmin`), Compute Network User (`compute.networkUser`), Compute Network Viewer (`compute.networkViewer`) |
| Use a custom security profile in a security profile group | Any of: Security Profile Admin (`networksecurity.securityProfileAdmin`), Compute Network User (`compute.networkUser`) |

## Notes

- IAM roles: Without the Security Profile Admin role (`roles/networksecurity.securityProfileAdmin`), these permissions allow management: `networksecurity.securityProfiles.create`, `.delete`, `.get`, `.list`, `.update`, `.use`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/describe (gcloud 593.0.0 help). The source page itself has no code; the creation command for a custom mirroring profile is in the gcloud reference for `security-profiles custom-mirroring create`.
- The gcloud reference also lists `custom-intercept` profiles (used with in-band integration), and the NSI quotas page lists custom intercept security profile quotas; this overview page states only `CUSTOM_MIRRORING` as supported.
- Source: https://docs.cloud.google.com/network-security-integration/docs/security-profiles-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [security-profile-groups-overview.md](./security-profile-groups-overview.md)
- [out-of-band-integration-overview.md](./out-of-band-integration-overview.md)
- [nsi-quotas.md](./nsi-quotas.md)
