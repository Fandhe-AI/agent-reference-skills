---
source: https://developers.cloudflare.com/workers/static-assets/direct-upload/
---

# Static Assets

Direct upload of static assets through the Workers API. Pinned to cloudflare-docs production SHA `34d908a`, fetched 2026-11-14. Advanced; most users should deploy with Wrangler (see the cloudflare-wrangler skill).

> **Warning**: These calls create or update a Worker on a real account using an API token. Use a scoped token and a test Worker name first.

## Register the asset manifest

Adapted (not in the official docs): URL double-quoted so `{...}` placeholders are not shell-expanded; see Notes.

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

The response contains an upload JWT (valid one hour) and `buckets` of file hashes to upload together. If `buckets` is empty, skip the upload step.

## Register the manifest (Workers for Platforms)

Adapted (not in the official docs): URL double-quoted so `{...}` placeholders are not shell-expanded; see Notes.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/assets-upload-session" \
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

## Upload files

```
POST /client/v4/accounts/:accountId/workers/assets/upload?base64=true
```

Use `multipart/form-data` with base64-encoded file contents, and `Authorization: Bearer <upload JWT>`. HTTP 201 returns the completion JWT (valid one hour). The official page gives no `curl` for this step.

## Create or deploy a new version with assets

```
PUT /client/v4/accounts/:accountId/workers/scripts/:scriptName
```

Metadata part examples from the official page:

```json
{
  "main_module": "main.js",
  "assets": {
    "jwt": "<completion_token>"
  },
  "compatibility_date": "2021-09-14"
}
```

```json
{
  "main_module": "main.js",
  "keep_assets": true,
  "compatibility_date": "2021-09-14"
}
```

## Notes

- Programmatic example: `cloudflare-typescript` `examples/workers/script-with-assets-upload.ts` (environment variables `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `ASSETS_DIRECTORY`, optional `CLOUDFLARE_SUBDOMAIN`; run via `npm run tsn -T`).
- Doc inconsistency: the official page labels the metadata JSON blocks as `bash`, and the `config` example is missing a colon (`"config" {`); it is omitted here.
- Adapted from the official docs: the two `curl` URLs are double-quoted so the `{...}` placeholders are not brace-expanded by the shell; replace them with real values.
- Standard (Wrangler-based) static site creation: see `create-project.md`.
- Versions: the completion token only attaches the asset set; create a Worker version with it and deploy that version to receive production traffic. Include every file path the new version needs in the manifest, including unchanged files. See `references/static-assets/direct-upload.md`.
- Source: https://developers.cloudflare.com/workers/static-assets/direct-upload/ (cloudflare-docs production 34d908a, fetched 2026-11-14)
