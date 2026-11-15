---
source: https://apikeys.googleapis.com/$discovery/rest?version=v2
---

# API Keys API message schemas (apikeys)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/apikeys/`.

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `V2AndroidApplication`

- Identifier of an Android application for key use.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `packageName` | string | The package name of the application. |
| `sha1Fingerprint` | string | The SHA1 fingerprint of the application. For example, both sha1 formats are acceptable : DA:39:A3:EE:5E:6B:4B:0D:32:55:BF:EF:95:60:18:90:AF:D8:07:09 or DA39A3EE5E6B4B0D3255BFEF95601890AFD80709. Output format is the latter. |

### `V2AndroidKeyRestrictions`

- The Android apps that are allowed to use the key.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowedApplications` | array<V2AndroidApplication> | A list of Android applications that are allowed to make API calls with this key. |

### `V2ApiTarget`

- A restriction for a specific service and optionally one or multiple specific methods. Both fields are case insensitive.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `methods` | array<string> | Optional. List of one or more methods that can be called. If empty, all methods for the service are allowed. A wildcard (\*) can be used as the last symbol. Valid examples: `google.cloud.translate.v2.TranslateService.GetSupportedLanguage` `TranslateText` `Get*` `translate.googleapis.com.Get*` |
| `service` | string | The service for this restriction. It should be the canonical service name, for example: `translate.googleapis.com`. You can use `gcloud services list` (https://cloud.google.com/sdk/gcloud/reference/services/list) to get a list of services that are enabled in the project. |

### `V2BrowserKeyRestrictions`

- The HTTP referrers (websites) that are allowed to use the key.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowedReferrers` | array<string> | A list of regular expressions for the referrer URLs that are allowed to make API calls with this key. |

### `V2GetKeyStringResponse`

- Response message for `GetKeyString` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `keyString` | string | An encrypted and signed value of the key. |

### `V2IosKeyRestrictions`

- The iOS apps that are allowed to use the key.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowedBundleIds` | array<string> | A list of bundle IDs that are allowed when making API calls with this key. |

### `V2Key`

- The representation of a key managed by the API Keys API.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Annotations is an unstructured key-value map stored with a policy that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. |
| `createTime` | string (google-datetime) | Output only. A timestamp identifying the time this key was originally created. |
| `deleteTime` | string (google-datetime) | Output only. A timestamp when this key was deleted. If the resource is not deleted, this must be empty. |
| `displayName` | string | Human-readable display name of this key that you can modify. The maximum length is 63 characters. |
| `etag` | string | A checksum computed by the server based on the current value of the Key resource. This may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. See https://google.aip.dev/154. |
| `keyString` | string | Output only. An encrypted and signed value held by this key. This field can be accessed only through the `GetKeyString` method. |
| `name` | string | Identifier. The resource name of the key. The `name` has the form: `projects//locations/global/keys/`. For example: `projects/123456867718/locations/global/keys/b7ff1f9f-8275-410a-94dd-3855ee9b5dd2` NOTE: Key is a global resource; hence the only supported value for location is `global`. |
| `restrictions` | V2Restrictions | Key restrictions. |
| `serviceAccountEmail` | string | Optional. The email address of the service account (https://cloud.google.com/iam/docs/service-accounts) the key is bound to. |
| `uid` | string | Output only. Unique id in UUID4 format. |
| `updateTime` | string (google-datetime) | Output only. A timestamp identifying the time this key was last updated. |

### `V2ListKeysResponse`

- Response message for `ListKeys` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `keys` | array<V2Key> | A list of API keys. |
| `nextPageToken` | string | The pagination token for the next page of results. |

### `V2LookupKeyResponse`

- Response message for `LookupKey` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | The resource name of the API key. If the API key has been purged, resource name is empty. |
| `parent` | string | The project that owns the key with the value specified in the request. |

### `V2Restrictions`

- Describes the restrictions on the key.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `androidKeyRestrictions` | V2AndroidKeyRestrictions | The Android apps that are allowed to use the key. |
| `apiTargets` | array<V2ApiTarget> | A restriction for a specific service and optionally one or more specific methods. Requests are allowed if they match any of these restrictions. If no restrictions are specified, all targets are allowed. |
| `browserKeyRestrictions` | V2BrowserKeyRestrictions | The HTTP referrers (websites) that are allowed to use the key. |
| `iosKeyRestrictions` | V2IosKeyRestrictions | The iOS apps that are allowed to use the key. |
| `serverKeyRestrictions` | V2ServerKeyRestrictions | The IP addresses of callers that are allowed to use the key. |

### `V2ServerKeyRestrictions`

- The IP addresses of callers that are allowed to use the key.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowedIps` | array<string> | A list of the caller IP addresses that are allowed to make API calls with this key. |

### `V2UndeleteKeyRequest`

- Request message for `UndeleteKey` method.
- Version: v2

### Shape of `Operation`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "done": "boolean",
  "error": "Status",
  "metadata": "object",
  "name": "string",
  "response": "object"
}
```

## Notes

- Generated from the Discovery document(s) v2 of `apikeys` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://apikeys.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
