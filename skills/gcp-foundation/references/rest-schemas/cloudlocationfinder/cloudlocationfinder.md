---
source: https://cloudlocationfinder.googleapis.com/$discovery/rest?version=v1
---

# Cloud Location Finder API message schemas (cloudlocationfinder)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudlocationfinder/`.

### `CloudLocation`

- Represents resource cloud locations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `carbonFreeEnergyPercentage` | number (float) | Optional. The carbon free energy percentage of the cloud location. This represents the average percentage of time customers' application will be running on carbon-free energy. See https://cloud.google.com/sustainability/region-carbon for more details. There is a difference between default value 0 and unset value. 0 means the carbon free energy percentage is 0%, while unset value means the carbon footprint data is not available. |
| `cloudLocationType` | string enum | Optional. The type of the cloud location. |
| `cloudProvider` | string enum | Optional. The provider of the cloud location. Values can be Google Cloud or third-party providers, including AWS, Azure, or Oracle Cloud Infrastructure. |
| `containingCloudLocation` | string | Output only. The containing cloud location in the strict nesting hierarchy. For example, the containing cloud location of a zone is a region. |
| `displayName` | string | Optional. The human-readable name of the cloud location. Example: us-east-2, us-east1. |
| `gcpAttributes` | GcpAttributes | Optional. GCP-specific attributes. |
| `name` | string | Identifier. Name of the cloud location. Unique name of the cloud location including project and location using the form: `projects/{project_id}/locations/{location}/cloudLocations/{cloud_location}` |
| `territoryCode` | string | Optional. The two-letter ISO 3166-1 alpha-2 code of the cloud location. Examples: US, JP, KR. |

### `GcpAttributes`

- GCP-specific attributes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `zoneType` | string enum | Optional. The type of the cloud zone. |

### `ListCloudLocationsResponse`

- Message for response to listing cloud locations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudLocations` | array<CloudLocation> | Output only. List of cloud locations. |
| `nextPageToken` | string | Output only. The continuation token, used to page through large result sets. Provide this value in a subsequent request as page_token in subsequent requests to retrieve the next page. If this field is not present, there are no subsequent results. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `SearchCloudLocationsResponse`

- Message for response to searching cloud locations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudLocations` | array<CloudLocation> | Output only. List of cloud locations. |
| `nextPageToken` | string | Output only. The continuation token, used to page through large result sets. Provide this value in a subsequent request as page_token in subsequent requests to retrieve the next page. If this field is not present, there are no subsequent results. |

### Shape of `CloudLocation`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "carbonFreeEnergyPercentage": "number (float)",
  "cloudLocationType": "string enum",
  "cloudProvider": "string enum",
  "containingCloudLocation": "string",
  "displayName": "string",
  "gcpAttributes": "GcpAttributes",
  "name": "string",
  "territoryCode": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `cloudlocationfinder` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://cloudlocationfinder.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
