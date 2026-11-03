---
source: https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/, https://developers.cloudflare.com/ai-gateway/usage/providers/bedrock/, https://developers.cloudflare.com/ai-gateway/usage/providers/vertex/, https://developers.cloudflare.com/ai-gateway/usage/providers/google-ai-studio/
---

# Anthropic, Amazon Bedrock, Google Vertex AI, and Google AI Studio

Provider-native gateway endpoints for Claude and Gemini model families, including the AWS SigV4 and Google service-account authentication handled by BYOK.

## Signature / Usage

Anthropic (provider key in `x-api-key`):

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic/v1/messages \
 --header 'x-api-key: {anthropic_api_key}' \
 --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
 --header 'anthropic-version: 2023-06-01' \
 --header 'Content-Type: application/json' \
 --data  '{
    "model": "claude-sonnet-4-5",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "What is Cloudflare?"}
    ]
  }'
```

Amazon Bedrock with BYOK (the gateway signs the request):

```bash
curl "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/aws-bedrock/bedrock-runtime/us-east-1/model/us.anthropic.claude-haiku-4-5-20251001-v1:0/invoke" \
  -H "cf-aig-authorization: Bearer {CF_AIG_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ],
    "max_tokens": 256,
    "anthropic_version": "bedrock-2023-05-31"
  }'
```

Google Vertex AI with BYOK:

```bash
curl "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/google-vertex-ai/v1/projects/{project_name}/locations/{region}/publishers/google/models/gemini-2.5-flash:generateContent" \
    -H 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
    -H 'Content-Type: application/json' \
    -d '{
        "contents": [
          {
            "role": "user",
            "parts": [
              {
                "text": "Tell me more about Cloudflare"
              }
            ]
          }
        ]
      }'
```

Google AI Studio with a stored key / Unified Billing:

```bash
curl "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_name}/google-ai-studio/v1/models/gemini-2.5-flash:generateContent" \
 --header 'content-type: application/json' \
 --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
 --data '{
      "contents": [
          {
            "role":"user",
            "parts": [
              {"text":"What is Cloudflare?"}
            ]
          }
        ]
      }'
```

## Options / Props

### Authentication methods

| Provider | Method | `cf-aig-authorization` | Provider credential |
|----------|--------|------------------------|--------------------|
| Anthropic | Key in request | `Bearer {CF_AIG_TOKEN}` (if gateway authenticated) | `x-api-key: {anthropic_api_key}` |
| Anthropic | BYOK / Unified Billing | `Bearer {CF_AIG_TOKEN}` | none |
| Bedrock | BYOK (recommended) | `Bearer {CF_AIG_TOKEN}` | none; stored JSON `{accessKeyId, secretAccessKey, region}` plus optional `sessionToken` for STS |
| Bedrock | Client-side signing | `Bearer {CF_AIG_TOKEN}` | Pre-signed AWS headers (sign against the original `bedrock-runtime` URL with `aws4fetch` or an AWS SDK) |
| Vertex | BYOK (recommended) | `Bearer {CF_AIG_TOKEN}` | none; region chosen in the dashboard |
| Vertex | Service account JSON in header | `Bearer {CF_AIG_TOKEN}` | `Authorization`: base64-encoded service account JSON that includes an extra `region` key |
| Vertex | Direct access token | `Bearer {CF_AIG_TOKEN}` | `Authorization: Bearer <gcloud access token>` (provider-specific endpoint only) |
| AI Studio | Key in request | optional | `x-goog-api-key: {google_studio_api_key}` |
| AI Studio | BYOK / Unified Billing | `Bearer {CF_AIG_TOKEN}` | none |

### URL structure

| Provider | URL |
|----------|-----|
| Bedrock | `.../aws-bedrock/bedrock-runtime/{region}/model/{model}/invoke` (replaces `https://bedrock-runtime.{region}.amazonaws.com/`) |
| Vertex | `.../google-vertex-ai/v1/projects/{project_name}/locations/{region}/publishers/google/models/{model}:{generative_ai_rest_resource}` |
| Vertex via unified API | `.../compat/chat/completions` with model `google-vertex-ai/google/gemini-2.5-pro` |
| AI Studio | `.../google-ai-studio/v1/models/{model}:{generative_ai_rest_resource}` |

## Notes

- `cf-aig-authorization` authenticates to AI Gateway; the `Authorization` header (or provider key header) carries upstream credentials. With BYOK, AWS/Google credentials stay in the gateway and requests need only `cf-aig-authorization`.
- Anthropic SDK: set `x-api-key` explicitly when supplying your own key; setting `Authorization` to `null` removes the SDK-generated bearer header. Error `2044` explains missing provider credentials (see [reference-troubleshooting.md](./reference-troubleshooting.md)).
- Vertex: use a specific region such as `us-central1` or `us-east4`, not `global` (limited model support). Passing raw service-account JSON on every request is for testing or when BYOK is not possible; prefer BYOK so private keys do not live in client code. The source JSON sample uses placeholders only.
- Bedrock BYOK credentials JSON in the docs uses AWS's published example keys (`AKIAIOSFODNN7EXAMPLE`); use your own least-privilege IAM credentials for Bedrock only. In client-side signing, keep `accessKey` / `secretAccessKey` in Worker secrets.
- Google native search grounding for Gemini goes through the provider-specific Vertex endpoint ([usage-web-search.md](./usage-web-search.md)). `@google/genai` can be pointed at the AI Studio endpoint via its base URL option.
- Provider API semantics: anthropic-api-core and google-gemini-api skills.

## Related

- [usage-providers-overview.md](./usage-providers-overview.md)
- [configuration-bring-your-own-keys.md](./configuration-bring-your-own-keys.md)
- [integrations-coding-agents.md](./integrations-coding-agents.md)
- [reference-troubleshooting.md](./reference-troubleshooting.md)
