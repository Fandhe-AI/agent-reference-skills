---
source: https://developers.cloudflare.com/ai-gateway/configuration/custom-domains/
---

# Custom domains

Send AI Gateway requests through a hostname you own (e.g. `ai.example.com`) instead of `gateway.ai.cloudflare.com`; account and gateway IDs drop out of the URL.

## Signature / Usage

Adapted (not in the official docs): the official commands embed URL-encoded braces (`%7Baccount_id%7D`) that are never substituted; shell variables are used instead.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai-gateway/gateways/${GATEWAY_ID}/custom-domains" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"domain": "ai.example.com",
		"zone_id": "395566f4c8a5b9d2a5fc0d457b007c44"
	}'
```

Response (excerpt):

```json
{
	"success": true,
	"result": {
		"hostname": "ai.example.com",
		"gateway_id": "my-gateway",
		"status": "pending_dcv",
		"cname_target": "<cname-target>",
		"created_at": 1782925200000,
		"modified_at": 1782925200000
	}
}
```

The API does not create DNS; create a proxied CNAME to the returned `cname_target`:

```bash
curl "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"type": "CNAME",
		"name": "ai",
		"content": "<cname-target>",
		"proxied": true
	}'
```

Request through the custom domain:

```bash
curl -X POST "https://ai.example.com/openai/v1/chat/completions" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "gpt-4.1-mini",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

## Options / Props

### API endpoints (base `https://api.cloudflare.com/client/v4`)

| Operation | Method and path |
|-----------|-----------------|
| Create | `POST /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/custom-domains` |
| List | `GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/custom-domains` |
| Get | `GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/custom-domains/{hostname}` |
| Delete | `DELETE /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/custom-domains/{hostname}` |

### Create body

| Name | Type | Default | Description |
|------|------|---------|-------------|
| domain | string | — | Hostname to use |
| zone_id | string | — | Zone that owns the hostname |

## Notes

- Corrected from the official docs: `%7B...%7D` placeholders replaced with shell variables (see Signature / Usage).
- Custom domains work with the `gateway.ai.cloudflare.com` style endpoints (provider-native routes and OpenAI-compatible `compat` routes, e.g. `https://ai.example.com/compat/chat/completions`). They do not work with the Cloudflare REST API at `api.cloudflare.com`.
- Dashboard: AI > AI Gateway > gateway > **Domains** tab > **Add Domain**; the DNS record is created automatically.
- Status stays `pending_dcv` until domain control validation completes.
- To require authentication on the domain, add Cloudflare Access. The unauthenticated example above applies only if the gateway does not require authentication or Access.

## Related

- [configuration-cloudflare-access.md](./configuration-cloudflare-access.md)
- [configuration-authentication.md](./configuration-authentication.md)
- [usage-chat-completion.md](./usage-chat-completion.md)
