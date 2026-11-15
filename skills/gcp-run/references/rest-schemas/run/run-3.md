---
source: https://run.googleapis.com/$discovery/rest?version=v2
---

# Cloud Run Admin API message schemas (run) (part 3/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/run/`.

### `TrafficTarget`

- TrafficTarget holds a single entry of the routing table for a Route.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configurationName` | string | \[Deprecated\] Not supported in Cloud Run. It must be empty. |
| `latestRevision` | boolean | Uses the "status.latestReadyRevisionName" of the Service to determine the traffic target. When it changes, traffic will automatically migrate from the prior "latest ready" revision to the new one. This field must be false if RevisionName is set. This field defaults to true otherwise. If the field is set to true on Status, this means that the Revision was resolved from the Service's latest ready revision. |
| `percent` | integer (int32) | Percent specifies percent of the traffic to this Revision or Configuration. This defaults to zero if unspecified. |
| `revisionName` | string | Points this traffic target to a specific Revision. This field is mutually exclusive with latest_revision. |
| `tag` | string | Tag is used to expose a dedicated url for referencing this target exclusively. |
| `url` | string | Output only. URL displays the URL for accessing tagged traffic targets. URL is displayed in status, and is disallowed on spec. URL must contain a scheme (e.g. https://) and a hostname, but may not contain anything else (e.g. basic auth, url path, etc.) |

### `UtilStatusProto`

- Wire-format for a Status object
- Version: v2

| Field | Type | Description |
|---|---|---|
| `canonicalCode` | integer (int32) | copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 canonical_code = 6; |
| `code` | integer (int32) | Numeric code drawn from the space specified below. Often, this is the canonical error space, and code is drawn from google3/util/task/codes.proto copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 code = 1; |
| `message` | string | Detail message copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional string message = 3; |
| `messageSet` | Proto2BridgeMessageSet | message_set associates an arbitrary proto message with the status. copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional proto2.bridge.MessageSet message_set = 5; |
| `space` | string | copybara:strip_begin(b/383363683) Space to which this status belongs copybara:strip_end_and_replace optional string space = 2; // Space to which this status belongs |

### `Volume`

- Volume represents a named volume in a container.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configMap` | ConfigMapVolumeSource | Not supported in Cloud Run. |
| `csi` | CSIVolumeSource | Volume specified by the Container Storage Interface driver |
| `emptyDir` | EmptyDirVolumeSource | Ephemeral storage used as a shared volume. |
| `filestore` | FilestoreVolumeSource | Represents a volume backed by a Filestore instance. |
| `name` | string | Volume's name. In Cloud Run Fully Managed, the name 'cloudsql' is reserved. |
| `nfs` | NFSVolumeSource | — |
| `secret` | SecretVolumeSource | The secret's value will be presented as the content of a file whose name is defined in the item path. If no items are defined, the name of the file is the secretName. |

### `VolumeMount`

- VolumeMount describes a mounting of a Volume within a container.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mountPath` | string | Required. Path within the container at which the volume should be mounted. Must not contain ':'. |
| `name` | string | Required. The name of the volume. There must be a corresponding Volume with the same name. |
| `readOnly` | boolean | Sets the mount to be read-only or read-write. Not used by Cloud Run. |
| `subPath` | string | Path within the volume from which the container's volume should be mounted. Defaults to "" (volume's root). This field is currently rejected in Secret volume mounts. |

### `WorkerPool`

- WorkerPool acts as a top-level container that manages a set instance splits among a set of Revisions and a template for creating new Revisions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call. It must be "run.googleapis.com/v1". |
| `kind` | string | The kind of resource. It must be "WorkerPool". |
| `metadata` | ObjectMeta | Metadata associated with this WorkerPool, including name, namespace, labels, and annotations. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. The following Cloud Run-specific annotations are accepted in WorkerPool.metadata.annotations. \* `run.googleapis.com/binary-authorization-breakglass` \* `run.googleapis.com/binary-authorization` \* `run.googleapis.com/client-name` \* `run.googleapis.com/description` |
| `spec` | WorkerPoolSpec | Holds the desired state of the WorkerPool (from the client). |
| `status` | WorkerPoolStatus | Communicates the system-controlled state of the WorkerPool. |

### `WorkerPoolSpec`

- WorkerPoolSpec holds the desired state of the WorkerPool's template and instance splits.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceSplits` | array<InstanceSplit> | Specifies how to distribute instances over a collection of Revisions. |
| `template` | RevisionTemplate | Holds the latest specification for the Revision to be stamped out. |

### `WorkerPoolStatus`

- The current state of the WorkerPool. Output only.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conditions` | array<GoogleCloudRunV1Condition> | Conditions communicate information about ongoing/complete reconciliation processes that bring the `spec` inline with the observed state of the world. \* `Ready`: `True` when all underlying resources are ready. |
| `instanceSplits` | array<InstanceSplit> | Holds the configured workload distribution. These entries will always contain RevisionName references. When ConfigurationName appears in the spec, this will hold the LatestReadyRevisionName that we last observed. |
| `latestCreatedRevisionName` | string | Name of the last revision that was created from this WorkerPool's template. It might not be ready yet, for that use LatestReadyRevisionName. |
| `latestReadyRevisionName` | string | Name of the latest Revision from this WorkerPool's template that has had its `Ready` condition become `True`. |
| `observedGeneration` | integer (int32) | Returns the generation last seen by the system. Clients polling for completed reconciliation should poll until observedGeneration = metadata.generation and the Ready condition's status is True or False. |

### Shape of `TrafficTarget`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "configurationName": "string",
  "latestRevision": "boolean",
  "percent": "integer (int32)",
  "revisionName": "string",
  "tag": "string",
  "url": "string"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `run` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://run.googleapis.com/$discovery/rest?version=v2, https://run.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
