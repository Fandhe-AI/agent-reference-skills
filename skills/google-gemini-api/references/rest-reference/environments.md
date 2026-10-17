---
source: https://ai.google.dev/api/environments
---

# Environments API

REST reference for environments: isolated execution contexts for running agent code, tools, and services securely (Beta).

## Signature / Usage

```text
POST   https://generativelanguage.googleapis.com/v1beta/environments                                  Creates an environment.
GET    https://generativelanguage.googleapis.com/v1beta/environments                                  Lists environments.
GET    https://generativelanguage.googleapis.com/v1beta/environments/{environment}/files/{path}       Retrieves file metadata or directory contents from an environment's snapshot.
GET    https://generativelanguage.googleapis.com/v1beta/environments/{id}                             Gets an environment.
PUT    https://generativelanguage.googleapis.com/upload/v1beta/environments/{environment}/files/{path}  Starts a resumable upload session for a file in an environment workspace.
DELETE https://generativelanguage.googleapis.com/v1beta/environments/{id}                             Deletes an environment.
```

## Options / Props

`CreateEnvironment` request body:

| Name | Type | Description |
|------|------|-------------|
| from_environment | string (optional) | The source environment to copy/fork from. Format `environments/{environment_id}` or `{environment_id}`. When specified, `sources` and `env` must be empty. |
| network | EnvironmentNetworkEgressAllowlist or enum (string) (optional) | Network configuration. `allowlist` is an array of EgressRule (allowed domains) or the value `"disabled"` to block all network egress. |
| sources | array (Source) (optional) | Sources to be mounted into the environment. |

`Source` fields: `content` (inline content if `type` is `INLINE`), `encoding` (e.g. `base64`), `source` (Cloud Storage path or GitHub path), `target` (where the source should appear in the environment), `type` (`gcs`, `inline`, `repository` with the provider identified by the protocol prefix e.g. `github://` / `gcs://`, `skill_registry` for a Skill Registry Service resource).

`Environment` resource fields (output only unless noted): `created`, `file_count`, `id`, `last_accessed`, `network`, `size_bytes`, `sources`, `status` (`active` / `expired`), `updated`.

Other parameters:

| Method | Parameter | Type | Description |
|------|------|------|-------------|
| ListEnvironments | page_size | integer (optional) | Maximum number of environments to return. Defaults to 50; maximum is 1000. |
| ListEnvironments | page_token | string (optional) | Pagination token. Response: `environments[]`, `next_page_token`. |
| GetEnvironmentFiles | page_size / page_token | integer / string (optional) | Directory listing pagination. |
| GetEnvironmentFiles | recursive | boolean (optional) | If true and the path is a directory, recursively lists all files. |
| GetEnvironmentFiles | response `files[]` | EnvironmentFile | `created`, `mime_type`, `modified`, `name`, `path`, `size_bytes`, `type` (`file` / `directory`). To download file content, use the download URL returned in the response. |
| GetEnvironment / DeleteEnvironment | id | string (required) | Resource ID segment. |
| StartEnvironmentFileUpload | extract | boolean (optional) | If true, treats the uploaded file as a tar/tar.gz archive and unpacks it into `path`. |
| StartEnvironmentFileUpload | overwrite | boolean (optional) | Whether to overwrite the destination file if it already exists. |
| StartEnvironmentFileUpload | X-Goog-Upload-Command | string (required) | Defaults to `start`. |
| StartEnvironmentFileUpload | X-Goog-Upload-Header-Content-Length | integer (required) | Total number of file bytes that will be uploaded. |
| StartEnvironmentFileUpload | X-Goog-Upload-Header-Content-Type | string (required) | MIME type of the file. |
| StartEnvironmentFileUpload | X-Goog-Upload-Protocol | string (required) | Defaults to `resumable`. Upload the bytes to the URL returned in the `X-Goog-Upload-URL` response header. |

## Notes

- Availability: v1beta (the source states "This API is in Beta. Endpoints are under `/v1beta/`.").
- The per-method examples (Create, Copy, List, List Files, Get File, Download File, Get, Start Upload, Delete) are embedded frames not present in the stored text; endpoint lines above are verbatim.
- An environment can be referenced from an interaction via the `environment` request field (see interactions-v1beta.md) and used as `base_environment` of an agent (see agents.md).
- Hosted Gemini sandbox, distinct from anthropic-managed-agents environments.
- Docs fetched 2026-10-16.

## Related

- [Agents API](./agents.md)
- [Interactions API (v1beta)](./interactions-v1beta.md)
- [Credentials API](./credentials.md)
