---
source: https://developers.cloudflare.com/ai-search/configuration/indexing/service-api-token/
---

# Service API token

Grants AI Search read access to R2 buckets and D1 databases. Required for instances with `type: "r2"` or `type: "d1"`.

## Signature / Usage

Create the service token (needs a token with User > API Tokens > Edit; export it, do not paste it inline):

Adapted (not in the official docs): tokens are read from environment variables instead of inline placeholders; see Notes.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/user/tokens" \
  -H "Authorization: Bearer ${CREATOR_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "AI Search Service API Token",
    "policies": [
      {
        "effect": "allow",
        "resources": {
          "com.cloudflare.api.account.<ACCOUNT_ID>": "*"
        },
        "permission_groups": [
          { "id": "9e9b428a0bcd46fd80e580b46a69963c" }
        ]
      }
    ]
  }'
```

Register it with AI Search:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/tokens" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "cf_api_id": "<CF_API_ID>",
    "cf_api_key": "<CF_API_KEY>",
    "name": "AI Search Service Token"
  }'
```

Use the returned `id` as `token_id`:

```json
{
	"id": "my-r2-docs",
	"type": "r2",
	"source": "<R2_BUCKET_NAME>",
	"token_id": "<TOKEN_ID>"
}
```

## Notes

- Not needed for website data sources or built-in storage uploads. The AI Search Index Engine permission includes R2 read access and the D1 Read permission, so one token works for both; D1-backed instances always require `token_id`.
- If you omit `token_id` on an R2 instance and your account already has a registered token, AI Search uses the most recently registered service API token for your account.
- Easiest path: create an R2-backed instance once through the dashboard or Wrangler; the token is created, registered, and reused for all instances.
- Do not delete or revoke the token; R2-backed and D1-backed instances lose access and stop indexing. Rotate under instance **Settings** > **General** > **Service API Token**.
- List registered tokens with `GET /accounts/<ACCOUNT_ID>/ai-search/tokens`.
- Adapted from the official docs: the creator token is read from an environment variable instead of an inline literal in the create command.
- The permission group id `9e9b428a0bcd46fd80e580b46a69963c` is the AI Search Index Engine permission as given in the source.
- Related errors: `7012`, `7075`, `7076`, instance error `bucket_unauthorized`; for D1, a token that cannot read the database pauses the instance with status `paused_invalid_api_token` (see error-codes.md).
- Source: https://developers.cloudflare.com/ai-search/configuration/indexing/service-api-token/ (pin 34d908a / fetched 2026-11-14)

## Related

- [R2 data source](./data-source-r2.md)
- [D1 data source](./data-source-d1.md)
- [Syncing](./syncing.md)
- [Error codes](./error-codes.md)
