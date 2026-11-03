---
source: https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/, https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/
---

# Custom domains and Cloudflare Access

Serve a public endpoint from your own hostname and put Cloudflare Access in front of it so callers authenticate first.

## Signature / Usage

Attach a domain and turn off the default hostname (required for Access to be effective):

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances/<INSTANCE_NAME>" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "public_endpoint_params": {
      "enabled": true,
      "custom_domains": ["search.example.com"],
      "default_domain_enabled": false
    }
  }'
```

Proxied CNAME to the endpoint's default hostname:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/dns_records" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "CNAME",
    "name": "search",
    "content": "<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com",
    "proxied": true
  }'
```

Non-browser client with an Access service token (export the values; do not paste them in shared logs):

Adapted (not in the official docs): the request goes to `search.example.com`, the custom domain registered above (the official example uses `access.search.example.com`, which the steps never configure). See Notes.

```bash
curl https://search.example.com/search \
  --header "Content-Type: application/json" \
  --header "CF-Access-Client-Id: <CLIENT_ID>" \
  --header "CF-Access-Client-Secret: <CLIENT_SECRET>" \
  --data '{
    "messages": [
      {
        "content": "How do I configure AI Search?",
        "role": "user"
      }
    ]
  }'
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `public_endpoint_params.enabled` | boolean | — | Enable the public endpoint. |
| `public_endpoint_params.custom_domains` | string[] | unchanged if omitted | One FQDN (max 253 chars, lowercase, no wildcards); `[]` removes. |
| `public_endpoint_params.default_domain_enabled` | boolean | `true` | Set `false` to serve only the custom domain. |
| `public_endpoint_params.rate_limit` / `authorized_hosts` | object / array | — | Also part of the replaced-in-full object. |

Errors: `7090` not a verified zone, `7091` already in use, `7092` provisioning failed, `7093` needs an active endpoint, `7096` default domain cannot be disabled without a custom domain, `60018` default hostname disabled.

## Notes

- Corrected from the official docs: the service-token example called `access.search.example.com`, a hostname the page never sets up; it uses the configured custom domain `search.example.com`.
- `public_endpoint_params` is replaced in full on every update. Omitted fields revert to defaults; in particular omitting `default_domain_enabled` re-opens the unauthenticated default hostname. Send the complete object each time. `custom_domains` is the exception (omit to keep, `null` echoed in the response).
- The hostname must be in an active zone on the same account; one custom domain per instance or namespace; a hostname attaches to one endpoint at a time.
- The CNAME must be Proxied (orange-to-orange); DNS only bypasses your zone so Access never runs.
- Access steps: create a Self-hosted application for the hostname; add an Allow policy (an application with no policy denies all); for MCP clients and scripts add a Service Auth policy and send `CF-Access-Client-Id` / `CF-Access-Client-Secret` on every request. An MCP client config can carry these as `headers` on the server entry; header support varies by client.
- Verify: a request without credentials returns the Access login page; the default hostname returns `404` with `60018`.
- Limitations: UI snippets on public sites stop working behind Access; cross-origin browser calls need Access CORS settings; AI Search rate limits are shared across callers; allowed origins are not authentication.
- Alternatives on a proxied hostname: WAF custom rules, rate limiting rules, Bot Management, Turnstile (https://developers.cloudflare.com/waf/, https://developers.cloudflare.com/bots/, https://developers.cloudflare.com/turnstile/). Access docs: https://developers.cloudflare.com/cloudflare-one/access-controls/.
- Keep Access service token values out of source control; the snippets use placeholders.

## Related

- [Public endpoint settings](./public-endpoint-settings.md)
- [MCP endpoint](./mcp.md)
- [Namespace public endpoints](./namespace-public-endpoints.md)
