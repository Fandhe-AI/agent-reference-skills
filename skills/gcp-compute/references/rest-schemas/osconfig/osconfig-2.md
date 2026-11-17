---
source: https://osconfig.googleapis.com/$discovery/rest?version=v1
---

# OS Config API message schemas (osconfig) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/osconfig/`.

### `VulnerabilityReport`

- This API resource represents the vulnerability report for a specified Compute Engine virtual machine (VM) instance at a given point in time. For more information, see Vulnerability reports (https://cloud.google.com/compute/docs/instances/os-inventory-management#vulnerability-reports).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `highestUpgradableCveSeverity` | string enum | Output only. Highest level of severity among all the upgradable vulnerabilities with CVEs attached. Values: `VULNERABILITY_SEVERITY_LEVEL_UNSPECIFIED`, `NONE`, `MINIMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `name` | string | Output only. The `vulnerabilityReport` API resource name. Format: `projects/{project_number}/locations/{location}/instances/{instance_id}/vulnerabilityReport` |
| `updateTime` | string (google-datetime) | Output only. The timestamp for when the last vulnerability report was generated for the VM. |
| `vulnerabilities` | array<VulnerabilityReportVulnerability> | Output only. List of vulnerabilities affecting the VM. |

### `VulnerabilityReportVulnerability`

- A vulnerability affecting the VM instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availableInventoryItemIds` | array<string> | Corresponds to the `AVAILABLE_PACKAGE` inventory item on the VM. If the vulnerability report was not updated after the VM inventory update, these values might not display in VM inventory. If there is no available fix, the field is empty. The `inventory_item` value specifies the latest `SoftwarePackage` available to the VM that fixes the vulnerability. |
| `createTime` | string (google-datetime) | The timestamp for when the vulnerability was first detected. |
| `details` | VulnerabilityReportVulnerabilityDetails | Contains metadata as per the upstream feed of the operating system and NVD. |
| `installedInventoryItemIds` | array<string> | Corresponds to the `INSTALLED_PACKAGE` inventory item on the VM. This field displays the inventory items affected by this vulnerability. If the vulnerability report was not updated after the VM inventory update, these values might not display in VM inventory. For some distros, this field may be empty. |
| `items` | array<VulnerabilityReportVulnerabilityItem> | List of items affected by the vulnerability. |
| `updateTime` | string (google-datetime) | The timestamp for when the vulnerability was last modified. |

### `VulnerabilityReportVulnerabilityDetails`

- Contains metadata information for the vulnerability. This information is collected from the upstream feed of the operating system.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cve` | string | The CVE of the vulnerability. CVE cannot be empty and the combination of should be unique across vulnerabilities for a VM. |
| `cvssV2Score` | number (float) | The CVSS V2 score of this vulnerability. CVSS V2 score is on a scale of 0 - 10 where 0 indicates low severity and 10 indicates high severity. |
| `cvssV3` | CVSSv3 | The full description of the CVSSv3 for this vulnerability from NVD. |
| `description` | string | The note or description describing the vulnerability from the distro. |
| `references` | array<VulnerabilityReportVulnerabilityDetailsReference> | Corresponds to the references attached to the `VulnerabilityDetails`. |
| `severity` | string | Assigned severity/impact ranking from the distro. |

### `VulnerabilityReportVulnerabilityDetailsReference`

- A reference for this vulnerability.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `source` | string | The source of the reference e.g. NVD. |
| `url` | string | The url of the reference. |

### `VulnerabilityReportVulnerabilityItem`

- OS inventory item that is affected by a vulnerability or fixed as a result of a vulnerability.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availableInventoryItemId` | string | Corresponds to the `AVAILABLE_PACKAGE` inventory item on the VM. If the vulnerability report was not updated after the VM inventory update, these values might not display in VM inventory. If there is no available fix, the field is empty. The `inventory_item` value specifies the latest `SoftwarePackage` available to the VM that fixes the vulnerability. |
| `fixedCpeUri` | string | The recommended CPE URI (https://cpe.mitre.org/specification/) update that contains a fix for this vulnerability. |
| `installedInventoryItemId` | string | Corresponds to the `INSTALLED_PACKAGE` inventory item on the VM. This field displays the inventory items affected by this vulnerability. If the vulnerability report was not updated after the VM inventory update, these values might not display in VM inventory. For some operating systems, this field might be empty. |
| `upstreamFix` | string | The upstream OS patch, packages or KB that fixes the vulnerability. |

### `WeekDayOfMonth`

- Represents one week day in a month. An example is "the 4th Sunday".
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dayOfWeek` | string enum | Required. A day of the week. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `dayOffset` | integer (int32) | Optional. Represents the number of days before or after the given week day of month that the patch deployment is scheduled for. For example if `week_ordinal` and `day_of_week` values point to the second Tuesday of the month and the `day_offset` value is set to `3`, patch deployment takes place three days after the second Tuesday of the month. If this value is negative, for example -5, patches are deployed five days before the second Tuesday of the month. Allowed values are in range \[-30, 30\]. |
| `weekOrdinal` | integer (int32) | Required. Week number in a month. 1-4 indicates the 1st to 4th week of the month. -1 indicates the last week of the month. |

### `WeeklySchedule`

- Represents a weekly schedule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dayOfWeek` | string enum | Required. Day of the week. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |

### `WindowsUpdateSettings`

- Windows patching is performed using the Windows Update Agent.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `classifications` | array<string> | Only apply updates of these windows update classifications. If empty, all updates are applied. Values: `CLASSIFICATION_UNSPECIFIED`, `CRITICAL`, `SECURITY`, `DEFINITION`, `DRIVER`, `FEATURE_PACK`, `SERVICE_PACK`, `TOOL`, `UPDATE_ROLLUP`, `UPDATE`. |
| `excludes` | array<string> | List of KBs to exclude from update. |
| `exclusivePatches` | array<string> | An exclusive list of kbs to be updated. These are the only patches that will be updated. This field must not be used with other patch configurations. |

### `YumRepository`

- Represents a single Yum package repository. This repository is added to a repo file that is stored at `/etc/yum.repos.d/google_osconfig.repo`.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `baseUrl` | string | Required. The location of the repository directory. |
| `displayName` | string | The display name of the repository. |
| `gpgKeys` | array<string> | URIs of GPG keys. |
| `id` | string | Required. A one word, unique name for this repository. This is the `repo id` in the Yum config file and also the `display_name` if `display_name` is omitted. This id is also used as the unique identifier when checking for guest policy conflicts. |

### `YumSettings`

- Yum patching is performed by executing `yum update`. Additional options can be set to control how this is executed. Note that not all settings are supported on all platforms.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludes` | array<string> | List of packages to exclude from update. These packages are excluded by using the yum `--exclude` flag. |
| `exclusivePackages` | array<string> | An exclusive list of packages to be updated. These are the only packages that will be updated. If these packages are not installed, they will be ignored. This field must not be specified with any other patch configuration fields. |
| `minimal` | boolean | Will cause patch to run `yum update-minimal` instead. |
| `security` | boolean | Adds the `--security` flag to `yum update`. Not supported on all platforms. |

### `ZypperRepository`

- Represents a single Zypper package repository. This repository is added to a repo file that is stored at `/etc/zypp/repos.d/google_osconfig.repo`.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `baseUrl` | string | Required. The location of the repository directory. |
| `displayName` | string | The display name of the repository. |
| `gpgKeys` | array<string> | URIs of GPG keys. |
| `id` | string | Required. A one word, unique name for this repository. This is the `repo id` in the zypper config file and also the `display_name` if `display_name` is omitted. This id is also used as the unique identifier when checking for guest policy conflicts. |

### `ZypperSettings`

- Zypper patching is performed by running `zypper patch`. See also https://en.opensuse.org/SDB:Zypper_manual.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `categories` | array<string> | Install only patches with these categories. Common categories include security, recommended, and feature. |
| `excludes` | array<string> | List of patches to exclude from update. |
| `exclusivePatches` | array<string> | An exclusive list of patches to be updated. These are the only patches that will be installed using 'zypper patch patch:' command. This field must not be used with any other patch configuration fields. |
| `severities` | array<string> | Install only patches with these severities. Common severities include critical, important, moderate, and low. |
| `withOptional` | boolean | Adds the `--with-optional` flag to `zypper patch`. |
| `withUpdate` | boolean | Adds the `--with-update` flag, to `zypper patch`. |

### Shape of `VulnerabilityReport`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "highestUpgradableCveSeverity": "string enum",
  "name": "string",
  "updateTime": "string (google-datetime)",
  "vulnerabilities": "array<VulnerabilityReportVulnerability>"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta of `osconfig` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://osconfig.googleapis.com/$discovery/rest?version=v1, https://osconfig.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
