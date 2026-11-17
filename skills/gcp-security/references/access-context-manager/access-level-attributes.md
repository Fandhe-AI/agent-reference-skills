---
source: https://docs.cloud.google.com/access-context-manager/docs/access-level-attributes
---

# Access level attributes

Access levels filter requests using the attributes below. With `gcloud`, attributes are written in YAML using the keys listed here.

## Signature / Usage

The following YAML, taken from the basic access level examples, combines the `members` and `requiredAccessLevels` attributes.

```yaml
- members:
    - user:sysadmin@example.com
    - serviceAccount:service@project.iam.gserviceaccount.com

- requiredAccessLevels:
    - accessPolicies/247332951433/accessLevels/Device_Trust
    - accessPolicies/247332951433/accessLevels/IP_Trust
```

## Options / Props

### Attributes

| Attribute | YAML key | Valid values | Notes |
|-----------|----------|--------------|-------|
| IP subnetworks | `ipSubnetworks` | List of IPv4 and/or IPv6 CIDR blocks | Multiple values are ORed |
| Geographic locations | `regions` | List of ISO 3166-1 alpha-2 codes | Multiple values are ORed |
| Access level dependencies | `requiredAccessLevels` | List of `accessPolicies/POLICY-NAME/accessLevels/LEVEL-NAME` | `POLICY-NAME` is the numeric name of the organization's access policy |
| Principals | `members` | `user:EMAIL`, `serviceAccount:EMAIL` | Groups are not supported; settable only via `gcloud` or the API (not the console, though console-created levels can be edited that way) |
| Device policy | `devicePolicy` | List of device policy attributes (below) | Mobile devices need MDM configured; other devices need Endpoint Verification enabled |

### Device policy attributes

| Attribute | YAML key | Valid values | Supports mobile devices |
|-----------|----------|--------------|-------------------------|
| Require screen lock | `requireScreenlock` | `true`, `false` (default `false`) | Yes |
| Storage encryption | `allowedEncryptionStatuses` | `ENCRYPTION_UNSUPPORTED`, `ENCRYPTED`, `UNENCRYPTED` | Yes |
| Require admin approval | `requireAdminApproval` | `true`, `false` (default `false`) | Yes |
| Require corp owned device | `requireCorpOwned` | `true`, `false` (default `false`) | Yes |
| OS policy | `osConstraints` | List of `osType` entries, each optionally with `minimumVersion` | Yes |

### OS policy fields (`osConstraints`)

| Field | Values |
|-------|--------|
| `osType` | `DESKTOP_MAC`, `DESKTOP_WINDOWS`, `DESKTOP_CHROME_OS`, `DESKTOP_LINUX`, `IOS`, `ANDROID`, `GOOGLEBOOK_OS` |
| `minimumVersion` | Optional; must be used with `osType`; format `MAJOR.MINOR.PATCH` (for example `10.5.301`) |
| `requireVerifiedChromeOs` | Optional, only with `DESKTOP_CHROME_OS`; `true` or `false` |

## Notes

- Geographic locations: the origin is determined by the geolocation of the request's source IP, so the attribute works only for public IP addresses. Access levels that require a geographic location always deny requests from private IP addresses and do not support requests made using Private Google Access.
- Geographic locations and VPN: access is decided from the derived location of the VPN server's public IP, not the user's physical location. For high-security environments the source recommends supplementing region rules with signals such as device compliance.
- Storage encryption: for an iOS device to satisfy this attribute, screen lock must be enabled.
- When more than one OS is specified, the values are ORed. If `IOS` or `ANDROID` is the `osType`, any device policy attribute that supports mobile devices can also be included.
- Each attribute's REST and RPC reference links are listed on the official page. `requireAdminApproval` and `requireCorpOwned` have no API reference entry there.
- The source writes the principal formats as `user: EMAIL` and `serviceAccount: EMAIL`; the table uses the form without a space, as in the YAML example above.
- Source: https://docs.cloud.google.com/access-context-manager/docs/access-level-attributes (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/access-context-manager/docs/create-basic-access-level

## Related

- [overview.md](./overview.md)
- [create-basic-access-level.md](./create-basic-access-level.md)
- [create-custom-access-level.md](./create-custom-access-level.md)
