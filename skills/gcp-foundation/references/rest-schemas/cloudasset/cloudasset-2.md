---
source: https://cloudasset.googleapis.com/$discovery/rest?version=v1p1beta1
---

# Cloud Asset API message schemas (cloudasset) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudasset/`.

### `UpdateFeedRequest`

- Update asset feed request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `feed` | Feed | Required. The new values of feed details. It must match an existing feed and the field `name` must be in the format of: projects/project_number/feeds/feed_id or folders/folder_number/feeds/feed_id or organizations/organization_number/feeds/feed_id. |
| `updateMask` | string (google-fieldmask) | Required. Only updates the `feed` fields indicated by this mask. The field mask must not be empty, and it must not contain fields that are immutable or only set by the server. |

### `VersionedPackage`

- Information related to the a standard versioned package. This includes package info for APT, Yum, Zypper, and Googet package managers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string | The system architecture this package is intended for. |
| `packageName` | string | The name of the package. |
| `version` | string | The version of the package. |

### `VersionedResource`

- Resource representation as defined by the corresponding service providing the resource for a given API version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetExceptions` | array<AssetException> | The exceptions of a resource. |
| `resource` | object | JSON representation of the resource as defined by the corresponding service providing this resource. Example: If the resource is an instance provided by Compute Engine, this field will contain the JSON representation of the instance as defined by Compute Engine: `https://cloud.google.com/compute/docs/reference/rest/v1/instances`. You can find the resource definition for each supported resource type in this table: `https://cloud.google.com/asset-inventory/docs/supported-asset-types` |
| `version` | string | API version of the resource. Example: If the resource is an instance provided by Compute Engine v1 API as defined in `https://cloud.google.com/compute/docs/reference/rest/v1/instances`, version will be "v1". |

### `WindowsApplication`

- Contains information about a Windows application that is retrieved from the Windows Registry. For more information about these fields, see: https://docs.microsoft.com/en-us/windows/win32/msi/uninstall-registry-key
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The name of the application or product. |
| `displayVersion` | string | The version of the product or application in string format. |
| `helpLink` | string | The internet address for technical support. |
| `installDate` | Date | The last time this product received service. The value of this property is replaced each time a patch is applied or removed from the product or the command-line option is used to repair the product. |
| `publisher` | string | The name of the manufacturer for the product or application. |

### `WindowsQuickFixEngineeringPackage`

- Information related to a Quick Fix Engineering package. Fields are taken from Windows QuickFixEngineering Interface and match the source names: https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caption` | string | A short textual description of the QFE update. |
| `description` | string | A textual description of the QFE update. |
| `hotFixId` | string | Unique identifier associated with a particular QFE update. |
| `installTime` | string (google-datetime) | Date that the QFE update was installed. Mapped from installed_on field. |

### `WindowsUpdateCategory`

- Categories specified by the Windows Update.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | The identifier of the windows update category. |
| `name` | string | The name of the windows update category. |

### `WindowsUpdatePackage`

- Details related to a Windows Update package. Field data and names are taken from Windows Update API IUpdate Interface: https://docs.microsoft.com/en-us/windows/win32/api/\_wua/ Descriptive fields like title, and description are localized based on the locale of the VM being updated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `categories` | array<WindowsUpdateCategory> | The categories that are associated with this update package. |
| `description` | string | The localized description of the update package. |
| `kbArticleIds` | array<string> | A collection of Microsoft Knowledge Base article IDs that are associated with the update package. |
| `lastDeploymentChangeTime` | string (google-datetime) | The last published date of the update, in (UTC) date and time. |
| `moreInfoUrls` | array<string> | A collection of URLs that provide more information about the update package. |
| `revisionNumber` | integer (int32) | The revision number of this update package. |
| `supportUrl` | string | A hyperlink to the language-specific support information for the update. |
| `title` | string | The localized title of the update package. |
| `updateId` | string | Gets the identifier of an update package. Stays the same across revisions. |

### `ZypperPatch`

- Details related to a Zypper Patch.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `category` | string | The category of the patch. |
| `patchName` | string | The name of the patch. |
| `severity` | string | The severity specified for this patch |
| `summary` | string | Any summary information provided about this patch. |

### Shape of `UpdateFeedRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "feed": "Feed",
  "updateMask": "string (google-fieldmask)"
}
```

## Notes

- Generated from the Discovery document(s) of `cloudasset` (retrieved 2026-11-14); a type shared by several versions shows the preferred version.
- Source: https://cloudasset.googleapis.com/$discovery/rest?version=v1p1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
