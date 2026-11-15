---
source: https://cloudasset.googleapis.com/$discovery/rest?version=v1
---

# Cloud Asset API message schemas (cloudasset) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudasset/`.

### `SoftwarePackage`

- Software package information of the operating system.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aptPackage` | VersionedPackage | Details of an APT package. For details about the apt package manager, see https://wiki.debian.org/Apt. |
| `cosPackage` | VersionedPackage | Details of a COS package. |
| `googetPackage` | VersionedPackage | Details of a Googet package. For details about the googet package manager, see https://github.com/google/googet. |
| `qfePackage` | WindowsQuickFixEngineeringPackage | Details of a Windows Quick Fix engineering package. See https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering for info in Windows Quick Fix Engineering. |
| `windowsApplication` | WindowsApplication | Details of Windows Application. |
| `wuaPackage` | WindowsUpdatePackage | Details of a Windows Update package. See https://docs.microsoft.com/en-us/windows/win32/api/\_wua/ for information about Windows Update. |
| `yumPackage` | VersionedPackage | Yum package info. For details about the yum package manager, see https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/deployment_guide/ch-yum. |
| `zypperPackage` | VersionedPackage | Details of a Zypper package. For details about the Zypper package manager, see https://en.opensuse.org/SDB:Zypper_manual. |
| `zypperPatch` | ZypperPatch | Details of a Zypper patch. For details about the Zypper package manager, see https://en.opensuse.org/SDB:Zypper_manual. |

### `StandardResourceMetadata`

- The standard metadata of a cloud resource.
- Version: v1p1beta1

| Field | Type | Description |
|---|---|---|
| `additionalAttributes` | array<string> | Additional searchable attributes of this resource. Informational only. The exact set of attributes is subject to change. For example: project id, DNS name etc. |
| `assetType` | string | The type of this resource. For example: "compute.googleapis.com/Disk". |
| `description` | string | One or more paragraphs of text description of this resource. Maximum length could be up to 1M bytes. |
| `displayName` | string | The display name of this resource. |
| `labels` | object | Labels associated with this resource. See Labelling and grouping Google Cloud resources (https://cloud.google.com/blog/products/gcp/labelling-and-grouping-your-google-cloud-platform-resources) for more information. |
| `location` | string | Location can be "global", regional like "us-east1", or zonal like "us-west1-b". |
| `name` | string | The full resource name. For example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`. See Resource Names (https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. |
| `networkTags` | array<string> | Network tags associated with this resource. Like labels, network tags are a type of annotations used to group Google Cloud resources. See \[Labelling Google Cloud resources\](lhttps://cloud.google.com/blog/products/gcp/labelling-and-grouping-your-google-cloud-platform-resources) for more information. |
| `project` | string | The project that this resource belongs to, in the form of `projects/{project_number}`. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TableFieldSchema`

- A field in TableSchema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `field` | string | The field name. The name must contain only letters (a-z, A-Z), numbers (0-9), or underscores (\_), and must start with a letter or underscore. The maximum length is 128 characters. |
| `fields` | array<TableFieldSchema> | Describes the nested schema fields if the type property is set to RECORD. |
| `mode` | string | The field mode. Possible values include NULLABLE, REQUIRED and REPEATED. The default value is NULLABLE. |
| `type` | string | The field data type. Possible values include \* STRING \* BYTES \* INTEGER \* FLOAT \* BOOLEAN \* TIMESTAMP \* DATE \* TIME \* DATETIME \* GEOGRAPHY, \* NUMERIC, \* BIGNUMERIC, \* RECORD (where RECORD indicates that the field contains a nested schema). |

### `TableSchema`

- BigQuery Compatible table schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fields` | array<TableFieldSchema> | Describes the fields in a table. |

### `Tag`

- The key and value for a tag (https://cloud.google.com/resource-manager/docs/tags/tags-overview).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tagKey` | string | TagKey namespaced name, in the format of {ORG_ID}/{TAG_KEY_SHORT_NAME}. |
| `tagKeyId` | string | TagKey ID, in the format of tagKeys/{TAG_KEY_ID}. |
| `tagValue` | string | TagValue namespaced name, in the format of {ORG_ID}/{TAG_KEY_SHORT_NAME}/{TAG_VALUE_SHORT_NAME}. |
| `tagValueId` | string | TagValue ID, in the format of tagValues/{TAG_VALUE_ID}. |

### `TemporalAsset`

- An asset in Google Cloud and its temporal metadata, including the time window when it was observed and its status during that window.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asset` | Asset | An asset in Google Cloud. |
| `deleted` | boolean | Whether the asset has been deleted or not. |
| `priorAsset` | Asset | Prior copy of the asset. Populated if prior_asset_state is PRESENT. Currently this is only set for responses in Real-Time Feed. |
| `priorAssetState` | string enum | State of prior_asset. |
| `window` | TimeWindow | The time window when the asset data and state was observed. |

### `TemporalAsset` (v1beta1)

- An asset in Google Cloud and its temporal metadata, including the time window when it was observed and its status during that window.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `asset` | Asset | An asset in Google Cloud. |
| `deleted` | boolean | Whether the asset has been deleted or not. |
| `window` | TimeWindow | The time window when the asset data and state was observed. |

### `TimeWindow`

- A time window specified by its `start_time` and `end_time`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | End time of the time window (inclusive). If not specified, the current timestamp is used instead. |
| `startTime` | string (google-datetime) | Start time of the time window (exclusive). |

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

### Shape of `SoftwarePackage`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "aptPackage": "VersionedPackage",
  "cosPackage": "VersionedPackage",
  "googetPackage": "VersionedPackage",
  "qfePackage": "WindowsQuickFixEngineeringPackage",
  "windowsApplication": "WindowsApplication",
  "wuaPackage": "WindowsUpdatePackage",
  "yumPackage": "VersionedPackage",
  "zypperPackage": "VersionedPackage",
  "zypperPatch": "ZypperPatch"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1p1beta1, v1beta1 of `cloudasset` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://cloudasset.googleapis.com/$discovery/rest?version=v1, https://cloudasset.googleapis.com/$discovery/rest?version=v1p1beta1, https://cloudasset.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
