---
source: https://developers.cloudflare.com/ai-gateway/configuration/cloudflare-access/
---

# Cloudflare Access

Put a gateway behind Cloudflare Access so users authenticate with your identity provider, tying each request to a verified user.

## Signature / Usage

Adapted (not in the official docs): the official example for the second request ends lines with a doubled backslash (`\\`), which breaks the shell continuation; a single backslash is used here.

```bash
cloudflared access curl https://ai.example.com/compat/chat/completions -s \
  --json '{
    "model": "workers-ai/@cf/meta/llama-3.1-8b-instruct-fast",
    "messages": [
      {"role": "user", "content": "What should I buy for a summer flash sale?"}
    ]
  }'
```

Provider-native route on the custom domain:

```bash
cloudflared access curl https://ai.example.com/openai/v1/chat/completions -s \
  --json '{
    "model": "gpt-4.1-mini",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

## Notes

- Corrected from the official docs: `\\` line continuation replaced by `\` (see Signature / Usage).
- Prerequisites: a custom domain on the gateway and Cloudflare Access enabled on the account. Setup: gateway > **Access** tab > set up Access > add Access policies. This configures the Access application so coding agents and other non-browser clients can authenticate by sending the Access token as a bearer token.
- A valid Access JWT on a custom-domain request is accepted as the credential; no AI Gateway token is needed. AI Gateway adds `cf.user_id` (the Access JWT `sub` claim, not the email) to request metadata, and strips the Access JWT and AI Gateway authorization headers before forwarding upstream.
- Once Access protects the domain, every request must pass an Access policy. Gateway-token-only requests are blocked by Access; keep gateway-token traffic on the default `gateway.ai.cloudflare.com` endpoint (not protected by Access) or move integrations to Access.
- Browsers attach the Access token as a cookie after login; other clients must send it explicitly (`cloudflared access curl` does this).
- Limitations: `cf.user_id` is added only for a valid Access JWT with a non-empty subject; service-token requests do not include it; metadata keys beginning with `cf.` are reserved and not saved.
- Per-agent setup: see [integrations-coding-agents.md](./integrations-coding-agents.md).

## Related

- [configuration-custom-domains.md](./configuration-custom-domains.md)
- [observability-custom-metadata.md](./observability-custom-metadata.md)
- [integrations-coding-agents.md](./integrations-coding-agents.md)
