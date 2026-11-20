---
source:
  - https://dataform.googleapis.com/$discovery/rest?version=v1
  - https://dataform.googleapis.com/$discovery/rest?version=v1beta1
---

# Dataform API message schemas (dataform) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/dataform/`.

### `Workspace` (v1beta1)

- Represents a Dataform Git workspace.
- Version: v1beta1

### `WorkspaceCompilationOverrides`

- Configures workspace compilation overrides for a repository.
- Version: v1

### `WriteFile`

- Represents the write file operation (for files added or modified).
- Version: v1

### `WriteFileRequest`

- `WriteFile` request message.
- Version: v1

### `WriteFileResponse`

- `WriteFile` response message.
- Version: v1

### Shape of `Workspace` (v1beta1)

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "createTime": "string (google-datetime)",
  "dataEncryptionState": "DataEncryptionState",
  "depth": "integer (int32)",
  "disableMoves": "boolean",
  "enableBranchManagement": "boolean",
  "internalMetadata": "string",
  "name": "string",
  "originalBranch": "string",
  "privateResourceMetadata": "PrivateResourceMetadata",
  "shallow": "boolean"
}
```

### Example `Workspace` value (v1beta1)

Generated from the field types (not in the official docs): a JSON value that matches the table, with empty strings, `0` (`1` where the description allows only positive values), `false`, empty arrays and objects, and for an enum its first value other than `*_UNSPECIFIED`. int64 values are JSON strings, as in the Discovery `format`. It shows the JSON shape only; it is not a request to send as is (fill in the values the method needs, and omit output-only fields in requests).

```json
{
  "createTime": "2026-01-01T00:00:00Z",
  "dataEncryptionState": {},
  "depth": 0,
  "disableMoves": false,
  "enableBranchManagement": false,
  "internalMetadata": "",
  "name": "",
  "originalBranch": "",
  "privateResourceMetadata": {},
  "shallow": false
}
```

## Options / Props

### `Workspace` (v1beta1) fields

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp of when the workspace was created. |
| `dataEncryptionState` | DataEncryptionState | Output only. A data encryption state of a Git repository if this Workspace is protected by a KMS key. |
| `depth` | integer (int32) | Optional. Input only. Immutable. The maximum depth of the Git repository to checkout for this workspace. If defined and greater than 0, the Git repository will be created as a shallow clone with the given depth, otherwise a full clone will be performed. This field is available only for GitHub, GitLab and 1p repositories with enabled branch management. |
| `disableMoves` | boolean | Optional. If set to true, workspaces will not be moved if its linked Repository is moved. Instead, it will be deleted. |
| `enableBranchManagement` | boolean | Immutable. Controls the enablement of branch checkout for the workspace. When set to True, the workspace will be allowed to checkout branches. |
| `internalMetadata` | string | Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. |
| `name` | string | Identifier. The workspace's name. |
| `originalBranch` | string | Optional. Input only. Immutable. The name of the default upstream branch for all pull/push operations in the remote repository for this workspace. If empty, the HEAD branch from repository will be used. |
| `privateResourceMetadata` | PrivateResourceMetadata | Output only. Metadata indicating whether this resource is user-scoped. For `Workspace` resources, the `user_scoped` field is always `true`. |
| `shallow` | boolean | Output only. If set to true, the workspace was created as a shallow clone. Will be set to true if the depth field is set to a value greater than 0, otherwise it will be set to false. |

### `WorkspaceCompilationOverrides` fields

| Field | Type | Description |
|---|---|---|
| `defaultDatabase` | string | Optional. The default database (Google Cloud project ID). |
| `schemaSuffix` | string | Optional. The suffix that should be appended to all schema (BigQuery dataset ID) names. |
| `tablePrefix` | string | Optional. The prefix that should be prepended to all table names. |

### `WriteFile` fields

| Field | Type | Description |
|---|---|---|
| `contents` | string (byte) | The file's contents. |

### `WriteFileRequest` fields

| Field | Type | Description |
|---|---|---|
| `contents` | string (byte) | Required. The file's contents. |
| `path` | string | Required. The file. |

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `dataform` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://dataform.googleapis.com/$discovery/rest?version=v1, https://dataform.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
