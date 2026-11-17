---
source: https://docs.cloud.google.com/firewall/docs/about-security-profiles
---

# Security profile overview

Security profiles are generic Layer 7 policy structures that firewall endpoints use to scan intercepted traffic: threat prevention (intrusion detection and prevention), Advanced malware sandbox (WildFire) and URL filtering. A profile is attached to a security profile group, which firewall policy rules reference.

## Signature / Usage

### Create the three profile types

Adapted (not in the official docs): `--organization=ORGANIZATION_ID --location=global` is added because the help example omits the location and the organization or project, and gcloud 593.0.0 then fails with "[security_profile] resource missing required data".

```bash
gcloud network-security security-profiles threat-prevention \
  create my-security-profile --description="New Security Profile" \
  --organization=ORGANIZATION_ID --location=global
```

Adapted (not in the official docs): `--organization=ORGANIZATION_ID --location=global` is added for the same reason as in the example above.

```bash
gcloud network-security security-profiles wildfire-analysis \
  create my-wildfire-security-profile \
  --description="New WildFire Security Profile" \
  --organization=ORGANIZATION_ID --location=global
```

Adapted (not in the official docs): `--organization=ORGANIZATION_ID --location=global` is added for the same reason as in the example above.

```bash
gcloud network-security security-profiles url-filtering create \
  my-urlf-security-profile \
  --description="New URLF Security Profile" \
  --organization=ORGANIZATION_ID --location=global
```

## Options / Props

### Specifications

| Item | Value |
|---|---|
| Types | `THREAT_PREVENTION`, `WILDFIRE_ANALYSIS`, `URL_FILTERING` |
| Scope | Organization-level (manages org-level and project-level endpoints) or project-level (project-level endpoints in the same project) |
| Name format | `organizations/ORGANIZATION_ID/locations/global/securityProfiles/NAME` or `projects/PROJECT_ID/locations/global/securityProfiles/NAME` |
| `NAME` | 1-63 characters, lowercase alphanumeric or hyphens, starts with a letter |
| Group membership | Org-level group references only org-level profiles; project-level group references project-level profiles in the same project |
| Project association | Each profile has an associated project used for quotas and access restrictions |

### Threat prevention actions

| Action | Effect |
|---|---|
| Default | Performs the default action associated with the threat |
| Deny | Logs the threat and drops the packet |
| Alert | Logs the threat and allows the session |
| Allow | Ignores the threat |

### Advanced malware sandbox (`WILDFIRE_ANALYSIS`) parameters

| Parameter | Command and flags |
|---|---|
| Submission rules | `add-submission-rule`; `--file-types` (`ANY_FILE`, `APK`, `ARCHIVE`, `EMAIL_LINK`, `FLASH`, `JAR`, `LINUX`, `MS_OFFICE`, `PDF`, `PE`, `SCRIPT`); `--direction` (`UPLOAD`, `DOWNLOAD`, `BOTH`) |
| Inline cloud analysis rules | `add-inline-cloud-analysis-rule`; `--file-types` (`ANY_FILE` or `PE` only); `--direction` (`DOWNLOAD` or `BOTH`); `--action` (`ALLOW`, `DENY`, `ALERT`) |
| Inline ML configuration | `update` with `--[no-]analyze-windows-executables`, `--[no-]analyze-powershell-script-1`, `--[no-]analyze-powershell-script-2`, `--[no-]analyze-elf`, `--[no-]analyze-ms-office`, `--[no-]analyze-shell`, `--[no-]analyze-ooxml`, `--[no-]analyze-macho` |
| Inline ML exceptions | `add-inline-ml-exception`; `--partial-hash`, `--filename` |
| Real-time lookup | `update --[no-]wildfire-realtime-lookup`; enabled by default in the console, disabled by default with gcloud or API |
| Overrides | `add-override`; protocol overrides (`HTTP`, `SMTP`, `FTP`) via `--wildfire` or `--wildfire-inline-ml` with `--action`; threat ID overrides via `--threat-ids` with `--action` |

## Notes

- Threat prevention actions: Default signatures added on creation: vulnerability detection, anti-spyware, antivirus, DNS. Override action defaults to `Default` for all severity levels; signature overrides take precedence over severity overrides.
- URL filtering profile: A URL filter is a list of matcher strings with a unique priority (`0` to `2147483647`; lowest number first) and an action. Encrypted traffic is matched on SNI; with TLS inspection the host header is also evaluated; unencrypted traffic always uses the host header. Domains within a list are not evaluated in priority order.
- Changing a threat prevention override or a URL filtering profile may take up to 15 minutes to take effect.
- An Advanced malware sandbox profile must be in a group together with a threat prevention profile.
- Cloud NGFW Enterprise features; see [ngfw-tiers.md](./ngfw-tiers.md). Quotas: [quotas.md](./quotas.md).
- Snippets taken from the gcloud help for `network-security security-profiles threat-prevention|wildfire-analysis|url-filtering create` (gcloud 593.0.0; https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/threat-prevention/create).
- Adapted from the official docs: the help example for these profile commands omitted `--location` and `--organization` (or `--project`), which gcloud 593.0.0 needs to parse the profile name; organization-level profiles use `--organization`, project-level profiles use `--project`.
- Source: https://docs.cloud.google.com/firewall/docs/about-security-profiles (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-security-profile-groups.md](./about-security-profile-groups.md)
- [about-firewall-endpoints.md](./about-firewall-endpoints.md)
- [about-intrusion-prevention.md](./about-intrusion-prevention.md)
- [about-url-filtering.md](./about-url-filtering.md)
