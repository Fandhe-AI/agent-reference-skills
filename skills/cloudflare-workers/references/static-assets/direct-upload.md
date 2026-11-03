---
source: https://developers.cloudflare.com/workers/static-assets/direct-upload/
---

# Direct Uploads

Upload static assets and attach them to a Worker through the Workers API. An advanced approach for programmatic integrations; most users should deploy with Wrangler.

## Signature / Usage

Three phases: register a manifest, upload the assets, deploy the Worker.

```
sequenceDiagram
    participant User
    participant Workers API
    User<<->>Workers API: Submit manifest<br/>POST /client/v4/accounts/:accountId/workers/scripts/:scriptName/assets-upload-session
    User<<->>Workers API: Upload files<br/>POST /client/v4/accounts/:accountId/workers/assets/upload?base64=true
    User<<->>Workers API: Upload script version<br/>PUT /client/v4/accounts/:accountId/workers/scripts/:scriptName
```

Workers for Platforms variant:

```
sequenceDiagram
    participant User
    participant Workers API
    User<<->>Workers API: Submit manifest<br/>POST /client/v4/accounts/:accountId/workers/dispatch/namespaces/:dispatchNamespace/scripts/:scriptName/assets-upload-session
    User<<->>Workers API: Upload files<br/>POST /client/v4/accounts/:accountId/workers/assets/upload?base64=true
    User<<->>Workers API: Upload script version<br/>PUT /client/v4/accounts/:accountId/workers/dispatch/namespaces/:dispatchNamespace/scripts/:scriptName
```

1. Upload manifest (`hash` is a 32 hex character hash, `size` is bytes):

Adapted (not in the official docs): the URL is wrapped in double quotes and the example hashes are placeholders; see Notes.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/scripts/{script_name}/assets-upload-session" \
--header 'content-type: application/json' \
--header 'Authorization: Bearer <API_TOKEN>' \
--data '{
  "manifest": {
		"/filea.html": {
			"hash": "08f1dfda4574284ab3c21666d1",
			"size": 12
		},
		"/fileb.html": {
			"hash": "4f1c1af44620d531446ceef93f",
			"size": 23
		},
		"/filec.html": {
			"hash": "54995e302614e0523757a04ec1",
			"size": 23
		}
	}
}'
```

Response (JWT valid for one hour; `buckets` lists hashes to upload together):

```json
{
	"result": {
		"jwt": "<UPLOAD_TOKEN>",
		"buckets": [
			["08f1dfda4574284ab3c21666d1", "4f1c1af44620d531446ceef93f"],
			["54995e302614e0523757a04ec1"]
		]
	},
	"success": true,
	"errors": null,
	"messages": null
}
```

2. Upload files as `multipart/form-data`, base64-encoded, with `base64=true` and `Authorization: Bearer <upload JWT>`. After every file is uploaded, a `201` is returned with a completion `jwt` (valid for 1 hour).

3. Create/deploy a version with a metadata part containing the completion token:

```json
{
  "main_module": "main.js",
  "assets": {
    "jwt": "<completion_token>"
  },
  "compatibility_date": "2021-09-14"
}
```

Reuse existing assets:

```json
{
  "main_module": "main.js",
  "keep_assets": true,
  "compatibility_date": "2021-09-14"
}
```

Asset routing configuration:

Adapted (not in the official docs): the missing colon in `"config": {` is added; see Notes.

```json
{
  "main_module": "main.js",
  "assets": {
    "jwt": "<completion_token>",
    "config": {
      "html_handling": "auto-trailing-slash"
    }
  },
  "compatibility_date": "2021-09-14"
}
```

Assets binding:

Adapted (not in the official docs): a missing comma after the `bindings` array is added; see Notes.

```jsonc
{
  "main_module": "main.js",
  "assets": {
    ...
  },
  "bindings": [
    ...
    {
      "name": "ASSETS",
      "type": "assets"
    }
    ...
  ],
  "compatibility_date": "2021-09-14"
}
```

## Notes

- If all assets were previously uploaded, `buckets` is empty and `jwt` is already a completion token; skip to creating the script/version.
- The `Content-Type` of each file part is attached when serving. To avoid sending a `Content-Type`, send `application/null` at upload time.
- Limits differ by account plan; see https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits.
- Deviation from source: the official "asset configuration" metadata example reads `"config" {` (missing colon); corrected to `"config": {` above.
- The official page also includes a full programmatic example (TypeScript/JavaScript, using the `cloudflare` SDK: `client.workers.scripts.assets.upload.create`, `client.workers.assets.upload.create`, `client.workers.beta.workers.versions.create`, `client.workers.scripts.deployments.create`) from https://github.com/cloudflare/cloudflare-typescript/blob/main/examples/workers/script-with-assets-upload.ts. It is omitted here for length. The hash it uses is the first 32 hex chars of `sha256(base64(content) + extension)`.
- Corrected from the official docs: the official "Assets binding" metadata example lacks a comma after the `bindings` array before `"compatibility_date"` (invalid JSON); a comma was added. Adapted from the official docs: the manifest `curl` URL is wrapped in double quotes. The example `hash` values shown are shorter than the 32 hex characters the text requires; they are placeholders.
- Endpoint reference: https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/assets/subresources/upload/methods/create/

## Related

- [Headers](./headers.md)
- [Configuration and Bindings](./binding.md)
- [HTML handling](./routing-html-handling.md)
