---
source: https://beyondcorp.googleapis.com/$discovery/rest?version=v1
---

# BeyondCorp API message schemas (beyondcorp) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/beyondcorp/`.

### `ResolveConnectionsResponse`

- Response message for BeyondCorp.ResolveConnections.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `connectionDetails` | array<ConnectionDetails> | A list of BeyondCorp Connections with details in the project. |
| `nextPageToken` | string | A token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | A list of locations that could not be reached. |

### `ResolveInstanceConfigResponse`

- Response message for BeyondCorp.ResolveInstanceConfig.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `instanceConfig` | ConnectorInstanceConfig | ConnectorInstanceConfig. |

### `ResourceInfo`

- ResourceInfo represents the information/status of the associated resource.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `id` | string | Required. Unique Id for the resource. |
| `resource` | object | Specific details for the resource. |
| `status` | string enum | Overall health status. Overall status is derived based on the status of each sub level resources. Values: `HEALTH_STATUS_UNSPECIFIED`, `HEALTHY`, `UNHEALTHY`, `UNRESPONSIVE`, `DEGRADED`. |
| `sub` | array<ResourceInfo> | List of Info for the sub level resources. |
| `time` | string (google-datetime) | The timestamp to collect the info. It is suggested to be set by the topmost level resource only. |

### `ServiceAccount`

- ServiceAccount represents a GCP service account.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `email` | string | Email address of the service account. |

### `Tunnelv1ProtoTunnelerError`

- TunnelerError is an error proto for errors returned by the connection manager.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `err` | string | Original raw error |
| `retryable` | boolean | retryable isn't used for now, but we may want to reuse it in the future. |

### `Tunnelv1ProtoTunnelerInfo`

- TunnelerInfo contains metadata about tunneler launched by connection manager.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backoffRetryCount` | integer (uint32) | backoff_retry_count stores the number of times the tunneler has been retried by tunManager for current backoff sequence. Gets reset to 0 if time difference between 2 consecutive retries exceeds backoffRetryResetTime. |
| `id` | string | id is the unique id of a tunneler. |
| `latestErr` | Tunnelv1ProtoTunnelerError | latest_err stores the Error for the latest tunneler failure. Gets reset everytime the tunneler is retried by tunManager. |
| `latestRetryTime` | string (google-datetime) | latest_retry_time stores the time when the tunneler was last restarted. |
| `totalRetryCount` | integer (uint32) | total_retry_count stores the total number of times the tunneler has been retried by tunManager. |

### Shape of `ResolveConnectionsResponse`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "connectionDetails": "array<ConnectionDetails>",
  "nextPageToken": "string",
  "unreachable": "array<string>"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1alpha of `beyondcorp` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://beyondcorp.googleapis.com/$discovery/rest?version=v1, https://beyondcorp.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
