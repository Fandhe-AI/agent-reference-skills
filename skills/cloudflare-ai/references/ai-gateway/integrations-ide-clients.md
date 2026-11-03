---
source: https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-desktop/, https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/cursor/, https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/vs-code/, https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/xcode/, https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/android-studio/
---

# Desktop and IDE clients

Route Claude Desktop, Cursor, Visual Studio Code, Xcode, and Android Studio through AI Gateway. Terminal agents are in [integrations-coding-agents.md](./integrations-coding-agents.md).

## Signature / Usage

Claude Desktop with Access (helper script `aig-access.sh`; set it as the "Helper script" credential kind, gateway base URL `https://ai-gateway.example.com/anthropic`):

```sh
#!/bin/sh
exec cloudflared access login --no-verbose --app https://ai-gateway.example.com
```

Visual Studio Code (`chatLanguageModels.json`; the API key entered in the UI is the single-header Access service token JSON):

```json
[
  {
    "name": "AI Gateway",
    "vendor": "customendpoint",
    "apiKey": "${input:cloudflareAccessServiceToken}",
    "apiType": "chat-completions",
    "models": [
      {
        "id": "openai/gpt-4.1-mini",
        "name": "GPT-4.1 mini",
        "url": "https://ai.example.com/compat/chat/completions",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 1000000,
        "maxOutputTokens": 32768,
        "requestHeaders": {
          "Authorization": "${apiKey}"
        }
      }
    ]
  }
]
```

Single-header Access service token value (replace the placeholders; used by VS Code and Xcode):

```json
{"cf-access-client-id":"<CLIENT_ID>","cf-access-client-secret":"<CLIENT_SECRET>"}
```

Cursor base URL:

```txt
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai/v1
```

Xcode chat provider URL and Android Studio built-in assistant URL:

```txt
https://ai.example.com/compat
https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/compat
```

## Options / Props

| Client | Where | Endpoint | Credential |
|--------|-------|----------|-----------|
| Claude Desktop | Help > Troubleshooting > Enable Developer Mode > Developer > Configure Third-Party Inference; connection type Gateway | `https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/anthropic` | Static API key = gateway token, auth scheme Bearer (or Helper script for Access). Model example: ID `claude-sonnet-4-5`, tier alias `sonnet` |
| Cursor | Settings > Models > OpenAI API Key + Override OpenAI Base URL > Add Custom Model | `https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai/v1` | Cloudflare API token with Account > Workers AI > Read |
| Visual Studio Code | Chat: Manage Language Models > Add Models > Custom Endpoint; API type Chat Completions | `https://ai.example.com/compat/chat/completions` | Access service token (single-header JSON) |
| Xcode | Settings > Intelligence > Chat > Add a Chat Provider > Internet Hosted | `https://ai.example.com/compat`; API Key Header `Authorization` | Access service token (single-header JSON) |
| Android Studio (built-in assistant) | Settings > Tools > AI > Model Providers > Add > Third-Party Remote Provider; URL Schema OpenAI-compatible | `.../<GATEWAY_ID>/compat` (no `/chat/completions`) | Cloudflare API token with Account > AI Gateway > Run |
| Android Studio (GitHub Copilot Chat) | Manage Models > Add Models > custom endpoint; API Type Chat Completions | `.../<GATEWAY_ID>/compat/chat/completions` (full URL) | Cloudflare API token |

## Notes

- Claude Desktop: if the gateway API key is your own Anthropic key rather than the gateway token, add `cf-aig-authorization: Bearer <CF_AIG_TOKEN>` as a custom inference header. With the helper script, `--no-verbose` prints only the JWT; if `cloudflared` is not found, use its full path from `command -v cloudflared`; `chmod +x` the script and give the full path in Helper Script; select **Test connection**.
- Cursor sends requests through its own servers, so the gateway endpoint must be publicly reachable. If **Override OpenAI Base URL** is missing, the version or plan does not support it. Workers AI models work for chat (Chat Completions, e.g. `@cf/meta/llama-3.3-70b-instruct-fp8-fast`); agent mode uses the OpenAI Responses API, so use a third-party Responses-compatible model such as `openai/gpt-4.1-mini`.
- VS Code and Xcode use static service-token credentials (no `cloudflared` short-lived tokens). Prerequisites: custom domain with Access, a Service Auth policy, and the Access application configured to accept service tokens in the `Authorization` header. Service-token requests carry no `cf.user_id`. Treat the service token like a password: rotate it if exposed, scope the Access policy narrowly, and keep it out of committed settings (VS Code reads it from secret storage via `${input:...}`).
- VS Code: WAF managed rule "Command Injection - Common Attack Commands" can block prompts that contain shell commands on a custom domain; if it does, create a WAF exception skipping only that rule for the AI Gateway custom domain, scoped as narrowly as possible.
- Xcode appends `/v1/models` and `/v1/chat/completions` to the URL; both work under `/compat`. The `/compat` endpoint is deprecated for single-model calls, but is used because the REST API has no `/v1/models`. Android Studio uses `/compat` for the same reason (it fetches a model list); a listed model does not mean credentials are configured for it. Some Android Studio AI features may not work with third-party models.
- Android Studio needs Unified Billing credits or stored provider keys for the selected models; Copilot Chat model IDs use `provider/model` form (e.g. `openai/gpt-4.1-mini`, suggested limits 128000 input / 16000 output, tool calling and vision on).
- Verify by checking gateway **Logs**.

## Related

- [integrations-coding-agents.md](./integrations-coding-agents.md)
- [configuration-cloudflare-access.md](./configuration-cloudflare-access.md)
- [configuration-custom-domains.md](./configuration-custom-domains.md)
- [usage-chat-completion.md](./usage-chat-completion.md)
- [usage-rest-api.md](./usage-rest-api.md)
