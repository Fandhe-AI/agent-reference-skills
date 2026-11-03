---
source: https://developers.cloudflare.com/workers-ai/configuration/hugging-face-chat-ui/
---

# Hugging Face Chat UI

Connect Workers AI text generation models to Hugging Face's open-source Chat UI with the `cloudflare` endpoint type.

## Signature / Usage

```jsonc
{
  "name" : "nousresearch/hermes-2-pro-mistral-7b",
  "tokenizer": "nousresearch/hermes-2-pro-mistral-7b",
  "parameters": {
    "stop": ["<|im_end|>"]
  },
  "endpoints" : [
    {
      "type": "cloudflare",
      // optionally specify these if not included in .env.local
      "accountId": "your-account-id",
      "apiToken": "your-api-token"
      //
    }
  ]
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| endpoints[].type | string | — | `cloudflare`. |
| endpoints[].accountId | string | — | Optional if `CLOUDFLARE_ACCOUNT_ID` is set in `.env.local`. |
| endpoints[].apiToken | string | — | Optional if `CLOUDFLARE_API_TOKEN` is set in `.env.local`. |

## Notes

- Prerequisites: Cloudflare account, Account ID, and a Workers AI API token (see REST API).
- Works with any text generation models that begin with the `@hf` prefix.
- The source labels the block `json`, but it contains `//` comments; it is shown as `jsonc` here. Follow the Chat UI repository for its own config format: https://github.com/huggingface/chat-ui
- Keep `.env.local` out of version control; prefer it over inlining the token in the model config.

## Related

- [REST API](./rest-api.md)
