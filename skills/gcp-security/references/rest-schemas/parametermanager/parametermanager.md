---
source: https://parametermanager.googleapis.com/$discovery/rest?version=v1
---

# Parameter Manager API message schemas (parametermanager)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/parametermanager/`.

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListParameterVersionsResponse`

- Message for response to listing ParameterVersions
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `parameterVersions` | array<ParameterVersion> | The list of ParameterVersions |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListParametersResponse`

- Message for response to listing Parameters
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `parameters` | array<Parameter> | The list of Parameters |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListTemplateVersionsResponse`

- Message for response to listing TemplateVersions
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `templateVersions` | array<TemplateVersion> | The list of TemplateVersions |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListTemplatesResponse`

- Message for response to listing Templates
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `templates` | array<Template> | The list of Templates |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

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

### `Parameter`

- Message describing Parameter resource
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create time stamp |
| `format` | string enum | Optional. Specifies the format of a Parameter. Values: `PARAMETER_FORMAT_UNSPECIFIED`, `UNFORMATTED`, `YAML`, `JSON`. |
| `kmsKey` | string | Optional. Customer managed encryption key (CMEK) to use for encrypting the Parameter Versions. If not set, the default Google-managed encryption key will be used. Cloud KMS CryptoKeys must reside in the same location as the Parameter. The expected format is `projects/*/locations/*/keyRings/*/cryptoKeys/*`. |
| `labels` | object | Optional. Labels as key value pairs |
| `name` | string | Identifier. The resource name of the Parameter in the format `projects/*/locations/*/parameters/*`. |
| `policyMember` | ResourcePolicyMember | Output only. Policy member strings of a Google Cloud resource. |
| `tags` | object | Optional. Input only. Immutable. Tag keys and tag values that are bound to this Parameter. You must represent each item in the map as: `"" : ""`. For example, a single resource can have the following tags: "123/environment": "production", "123/costCenter": "marketing", Tags are used to organize and group resources. Tags can be used to control policy evaluation for the resource. |
| `updateTime` | string (google-datetime) | Output only. Update time stamp |

### `ParameterVersion`

- Message describing ParameterVersion resource
- Version: v1

| Field | Type | Description |
|---|---|---|
| `checksumSource` | string enum | Optional. Output only. The source of the checksum. Values: `CHECKSUM_SOURCE_UNSPECIFIED`, `SERVER_GENERATED`, `USER_SPECIFIED`. |
| `createTime` | string (google-datetime) | Output only. Create time stamp |
| `disabled` | boolean | Optional. Disabled boolean to determine if a ParameterVersion acts as a metadata only resource (payload is never returned if disabled is true). If true any calls will always default to BASIC view even if the user explicitly passes FULL view as part of the request. A render call on a disabled resource fails with an error. Default value is False. |
| `kmsKeyVersion` | string | Optional. Output only. The resource name of the KMS key version used to encrypt the ParameterVersion payload. This field is populated only if the Parameter resource has customer managed encryption key (CMEK) configured. |
| `name` | string | Identifier. The resource name of the ParameterVersion in the format `projects/*/locations/*/parameters/*/versions/*`. |
| `payload` | ParameterVersionPayload | Required. Immutable. Payload content of a ParameterVersion resource. This is only returned when the request provides the View value of FULL (default for GET request). |
| `updateTime` | string (google-datetime) | Output only. Update time stamp |

### `ParameterVersionPayload`

- Message for storing a ParameterVersion resource's payload data
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | string (byte) | Required. bytes data for storing payload. |
| `dataCrc32c` | string (int64) | Optional. The integrity checksum of the payload. If provided, the server will verify that the checksum matches the payload. If not provided, the server will generate the checksum. |

### `RenderParameterVersionResponse`

- Message describing response of the `RenderParameterVersion` method
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parameterVersion` | string | Resource identifier of a ParameterVersion in the format `projects/*/locations/*/parameters/*/versions/*`. |
| `payload` | ParameterVersionPayload | Payload content of a ParameterVersion resource. |
| `renderedPayload` | string (byte) | Server generated rendered version of the user provided payload data (ParameterVersionPayload) which has substitutions of all (if any) references to a SecretManager SecretVersion resources. This substitution only works for a Parameter which is in JSON or YAML format. |

### `RenderTemplateVersionResponse`

- Message describing response for `RenderTemplateVersion` method
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parameterVersion` | string | The resource name of the ParameterVersion used to render the template version in the format `projects/*/locations/*/parameters/*/versions/*`. |
| `payload` | TemplateVersionPayload | Payload content of a TemplateVersion resource. |
| `renderedPayload` | string (byte) | Server generated rendered version of the user provided payload data (TemplateVersionPayload) which has all the variables resolved using the provided parameter version. |
| `templateFormat` | string enum | Format of the template version. Values: `TEMPLATE_FORMAT_UNSPECIFIED`, `TEMPLATE_FORMAT_YAML`, `TEMPLATE_FORMAT_JSON`. |
| `templateVersion` | string | Resource identifier of a TemplateVersion in the format `projects/*/locations/*/templates/*/versions/*`. |

### `ResourcePolicyMember`

- Output-only policy member strings of a Google Cloud resource's built-in identity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `iamPolicyNamePrincipal` | string | Output only. IAM policy binding member referring to a Google Cloud resource by user-assigned name (https://google.aip.dev/122). If a resource is deleted and recreated with the same name, the binding will be applicable to the new resource. Example: `principal://parametermanager.googleapis.com/projects/12345/name/locations/us-central1-a/parameters/my-parameter` |
| `iamPolicyUidPrincipal` | string | Output only. IAM policy binding member referring to a Google Cloud resource by system-assigned unique identifier (https://google.aip.dev/148#uid). If a resource is deleted and recreated with the same name, the binding will not be applicable to the new resource Example: `principal://parametermanager.googleapis.com/projects/12345/uid/locations/us-central1-a/parameters/a918fed5` |

### `Template`

- Message describing Template resource
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create time stamp |
| `format` | string enum | Optional. Specifies the format of a Template. Values: `TEMPLATE_FORMAT_UNSPECIFIED`, `TEMPLATE_FORMAT_YAML`, `TEMPLATE_FORMAT_JSON`. |
| `labels` | object | Optional. Labels as key value pairs |
| `name` | string | Identifier. The resource name of the Template in the format `projects/*/locations/*/templates/*`. |
| `updateTime` | string (google-datetime) | Output only. Update time stamp |

### `TemplateVersion`

- Message describing TemplateVersion resource
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create time stamp |
| `disabled` | boolean | Optional. Disabled boolean to determine if a TemplateVersion acts as a metadata only resource (payload is never returned if disabled is true). |
| `name` | string | Identifier. The resource name of the TemplateVersion in the format `projects/*/locations/*/templates/*/versions/*`. |
| `payload` | TemplateVersionPayload | Required. Immutable. Payload content of a TemplateVersion resource. |
| `updateTime` | string (google-datetime) | Output only. Update time stamp |

### `TemplateVersionPayload`

- Message for storing a TemplateVersion resource's payload data
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | string (byte) | Required. bytes data for storing payload. |

### Shape of `ListLocationsResponse`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "locations": "array<Location>",
  "nextPageToken": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `parametermanager` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://parametermanager.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
