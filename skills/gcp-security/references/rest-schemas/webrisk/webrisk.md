---
source: https://webrisk.googleapis.com/$discovery/rest?version=v1
---

# Web Risk API message schemas (webrisk)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/webrisk/`.

### `GoogleCloudWebriskV1ComputeThreatListDiffResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additions` | GoogleCloudWebriskV1ThreatEntryAdditions | A set of entries to add to a local threat type's list. |
| `checksum` | GoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum | The expected SHA256 hash of the client state; that is, of the sorted list of all hashes present in the database after applying the provided diff. If the client state doesn't match the expected state, the client must discard this diff and retry later. |
| `newVersionToken` | string (byte) | The new opaque client version token. This should be retained by the client and passed into the next call of ComputeThreatListDiff as 'version_token'. A separate version token should be stored and used for each threatList. |
| `recommendedNextDiff` | string (google-datetime) | The soonest the client should wait before issuing any diff request. Querying sooner is unlikely to produce a meaningful diff. Waiting longer is acceptable considering the use case. If this field is not set clients may update as soon as they want. |
| `removals` | GoogleCloudWebriskV1ThreatEntryRemovals | A set of entries to remove from a local threat type's list. This field may be empty. |
| `responseType` | string enum | The type of response. This may indicate that an action must be taken by the client when the response is received. Values: `RESPONSE_TYPE_UNSPECIFIED`, `DIFF`, `RESET`. |

### `GoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum`

- The expected state of a client's local database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sha256` | string (byte) | The SHA256 hash of the client state; that is, of the sorted list of all hashes present in the database. |

### `GoogleCloudWebriskV1RawHashes`

- The uncompressed threat entries in hash format. Hashes can be anywhere from 4 to 32 bytes in size. A large majority are 4 bytes, but some hashes are lengthened if they collide with the hash of a popular URI. Used for sending ThreatEntryAdditons to clients that do not support compression, or when sending non-4-byte hashes to clients that do support compression.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `prefixSize` | integer (int32) | The number of bytes for each prefix encoded below. This field can be anywhere from 4 (shortest prefix) to 32 (full SHA256 hash). In practice this is almost always 4, except in exceptional circumstances. |
| `rawHashes` | string (byte) | The hashes, in binary format, concatenated into one long string. Hashes are sorted in lexicographic order. For JSON API users, hashes are base64-encoded. |

### `GoogleCloudWebriskV1RawIndices`

- A set of raw indices to remove from a local list.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `indices` | array<integer> | The indices to remove from a lexicographically-sorted local list. |

### `GoogleCloudWebriskV1RiceDeltaEncoding`

- The Rice-Golomb encoded data. Used for sending compressed 4-byte hashes or compressed removal indices.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encodedData` | string (byte) | The encoded deltas that are encoded using the Golomb-Rice coder. |
| `entryCount` | integer (int32) | The number of entries that are delta encoded in the encoded data. If only a single integer was encoded, this will be zero and the single value will be stored in `first_value`. |
| `firstValue` | string (int64) | The offset of the first entry in the encoded data, or, if only a single integer was encoded, that single integer's value. If the field is empty or missing, assume zero. |
| `riceParameter` | integer (int32) | The Golomb-Rice parameter, which is a number between 2 and 28. This field is missing (that is, zero) if `num_entries` is zero. |

### `GoogleCloudWebriskV1SearchHashesResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `negativeExpireTime` | string (google-datetime) | For requested entities that did not match the threat list, how long to cache the response until. |
| `threats` | array<GoogleCloudWebriskV1SearchHashesResponseThreatHash> | The full hashes that matched the requested prefixes. The hash will be populated in the key. |

### `GoogleCloudWebriskV1SearchHashesResponseThreatHash`

- Contains threat information on a matching hash.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | The cache lifetime for the returned match. Clients must not cache this response past this timestamp to avoid false positives. |
| `hash` | string (byte) | A 32 byte SHA256 hash. This field is in binary format. For JSON requests, hashes are base64-encoded. |
| `threatTypes` | array<string> | The ThreatList this threat belongs to. This must contain at least one entry. Values: `THREAT_TYPE_UNSPECIFIED`, `MALWARE`, `SOCIAL_ENGINEERING`, `UNWANTED_SOFTWARE`, `SOCIAL_ENGINEERING_EXTENDED_COVERAGE`. |

### `GoogleCloudWebriskV1SearchUrisResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `threat` | GoogleCloudWebriskV1SearchUrisResponseThreatUri | The threat list matches. This might be empty if the URI is on no list. |

### `GoogleCloudWebriskV1SearchUrisResponseThreatUri`

- Contains threat information on a matching uri.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | The cache lifetime for the returned match. Clients must not cache this response past this timestamp to avoid false positives. |
| `threatTypes` | array<string> | The ThreatList this threat belongs to. Values: `THREAT_TYPE_UNSPECIFIED`, `MALWARE`, `SOCIAL_ENGINEERING`, `UNWANTED_SOFTWARE`, `SOCIAL_ENGINEERING_EXTENDED_COVERAGE`. |

### `GoogleCloudWebriskV1Submission`

- Wraps a URI that might be displaying malicious content.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | Required. The URI that is being reported for malicious content to be analyzed. |

### `GoogleCloudWebriskV1ThreatEntryAdditions`

- Contains the set of entries to add to a local database. May contain a combination of compressed and raw data in a single response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rawHashes` | array<GoogleCloudWebriskV1RawHashes> | The raw SHA256-formatted entries. Repeated to allow returning sets of hashes with different prefix sizes. |
| `riceHashes` | GoogleCloudWebriskV1RiceDeltaEncoding | The encoded 4-byte prefixes of SHA256-formatted entries, using a Golomb-Rice encoding. The hashes are converted to uint32, sorted in ascending order, then delta encoded and stored as encoded_data. |

### `GoogleCloudWebriskV1ThreatEntryRemovals`

- Contains the set of entries to remove from a local database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rawIndices` | GoogleCloudWebriskV1RawIndices | The raw removal indices for a local list. |
| `riceIndices` | GoogleCloudWebriskV1RiceDeltaEncoding | The encoded local, lexicographically-sorted list indices, using a Golomb-Rice encoding. Used for sending compressed removal indices. The removal indices (uint32) are sorted in ascending order, then delta encoded and stored as encoded_data. |

### `GoogleLongrunningCancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `GoogleLongrunningListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<GoogleLongrunningOperation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `GoogleLongrunningOperation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | GoogleRpcStatus | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Contains a `SubmitUriMetadata` object. |
| `name` | string | Matches the `/v1/{project-name}/operations/{operation-id}` pattern. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `GoogleProtobufEmpty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `GoogleRpcStatus`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### Shape of `GoogleCloudWebriskV1ComputeThreatListDiffResponse`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "additions": "GoogleCloudWebriskV1ThreatEntryAdditions",
  "checksum": "GoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum",
  "newVersionToken": "string (byte)",
  "recommendedNextDiff": "string (google-datetime)",
  "removals": "GoogleCloudWebriskV1ThreatEntryRemovals",
  "responseType": "string enum"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `webrisk` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://webrisk.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
