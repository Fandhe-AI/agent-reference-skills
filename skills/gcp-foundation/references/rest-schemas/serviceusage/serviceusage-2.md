---
source: https://serviceusage.googleapis.com/$discovery/rest?version=v1
---

# Service Usage API message schemas (serviceusage) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/serviceusage/`.

### `Type`

- A protocol buffer message type. New usages of this message as an alternative to DescriptorProto are strongly discouraged. This message does not reliability preserve all information necessary to model the schema and preserve semantics. Instead make use of FileDescriptorSet which preserves the necessary information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `edition` | string | The source edition string, only valid when syntax is SYNTAX_EDITIONS. |
| `fields` | array<Field> | The list of fields. |
| `name` | string | The fully qualified message name. |
| `oneofs` | array<string> | The list of types appearing in `oneof` definitions in this type. |
| `options` | array<Option> | The protocol buffer options. |
| `sourceContext` | SourceContext | The source context. |
| `syntax` | string enum | The source syntax. Values: `SYNTAX_PROTO2`, `SYNTAX_PROTO3`, `SYNTAX_EDITIONS`. |

### `UpdateAdminQuotaPolicyMetadata`

- Metadata message that provides information such as progress, partial failures, and similar information on each GetOperation call of LRO returned by UpdateAdminQuotaPolicy.
- Version: v1

### `UpdateConsumerPolicyMetadata`

- Metadata for the `UpdateConsumerPolicy` method.
- Version: v1

### `UpdateContentSecurityPolicyMetadata`

- Metadata for the `UpdateContentSecurityPolicy` method.
- Version: v1

### `Usage`

- Configuration controlling usage of a service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `producerNotificationChannel` | string | The full resource name of a channel used for sending notifications to the service producer. Google Service Management currently only supports Google Cloud Pub/Sub (https://cloud.google.com/pubsub) as a notification channel. To use Google Cloud Pub/Sub as the channel, this must be the name of a Cloud Pub/Sub topic that uses the Cloud Pub/Sub topic name format documented in https://cloud.google.com/pubsub/docs/overview. |
| `requirements` | array<string> | Requirements that must be satisfied before a consumer project can use the service. Each requirement is of the form /; for example 'serviceusage.googleapis.com/billing-enabled'. For Google APIs, a Terms of Service requirement must be included here. Google Cloud APIs must include "serviceusage.googleapis.com/tos/cloud". Other Google APIs should include "serviceusage.googleapis.com/tos/universal". Additional ToS can be included based on the business needs. |
| `rules` | array<UsageRule> | A list of usage rules that apply to individual API methods. \*\*NOTE:\*\* All service configuration rules follow "last one wins" order. |

### `UsageRule`

- Usage configuration rules for the service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowUnregisteredCalls` | boolean | Use this rule to configure unregistered calls for the service. Unregistered calls are calls that do not contain consumer project identity. (Example: calls that do not contain an API key). WARNING: By default, API methods do not allow unregistered calls, and each method call must be identified by a consumer project identity. |
| `selector` | string | Selects the methods to which this rule applies. Use '\*' to indicate all methods in all APIs. Refer to selector for syntax details. |
| `skipServiceControl` | boolean | If true, the selected method should skip service control and the control plane features, such as quota and billing, will not be available. This flag is used by Google Cloud Endpoints to bypass checks for internal methods, such as service health check methods. |

### Shape of `Type`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "edition": "string",
  "fields": "array<Field>",
  "name": "string",
  "oneofs": "array<string>",
  "options": "array<Option>",
  "sourceContext": "SourceContext",
  "syntax": "string enum"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `serviceusage` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://serviceusage.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
