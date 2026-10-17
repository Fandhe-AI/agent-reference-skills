# Google Gemini

Use Hermes Agent with Google Gemini through the native AI Studio / Gemini API (`generateContent`), not the OpenAI-compatible endpoint.

## Signature / Usage

```bash
echo "GOOGLE_API_KEY=..." >> ~/.hermes/.env
hermes model     # More providers... -> Google AI Studio
hermes chat
```

```yaml
model:
  default: gemini-3.7-flash
  provider: gemini
  base_url: https://generativelanguage.googleapis.com/v1beta
```

Switch mid-session: `/model gemini-3.7-flash`, `/model gemini-pro-latest`, `/model gemma-4-31b-it`. Diagnostics: `hermes doctor`. Gateway: `hermes gateway setup`, `hermes gateway start`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GOOGLE_API_KEY` / `GEMINI_API_KEY` | env | API key; both names checked for the `gemini` provider |
| `GEMINI_BASE_URL` | env | Endpoint override; host-root URLs get `/v1beta` appended |
| `tts.gemini.base_url` | config | Gemini TTS base URL (same normalization) |

Models listed in the guide:

| Model | ID |
|-------|----|
| Gemini 4 Argon | `gemini-4-argon` |
| Gemini 3.8 Flash | `gemini-3.8-flash` |
| Gemini 3.7 Flash (recommended default) | `gemini-3.7-flash` |
| Gemini 3.1 Pro Preview | `gemini-3.1-pro-preview` |
| Gemini 3.5 Flash Lite | `gemini-3.5-flash-lite` |
| Gemini 2.5 Flash / Pro | `gemini-2.5-flash` / `gemini-2.5-pro` |
| Aliases | `gemini-pro-latest`, `gemini-flash-latest` |
| Gemma 4 31B IT / 26B A4B IT (evaluation tier) | `gemma-4-31b-it` / `gemma-4-26b-a4b-it` |

Gemini 4 Argon reasoning effort mapping:

| Hermes effort | `thinkingLevel` | Total output budget |
|---------------|-----------------|---------------------|
| `none`, `minimal`, `low` | `low` (thoughts hidden for `none`) | Per-request cap |
| `medium` | `medium` | Per-request cap |
| `high` | `high` | Per-request cap |
| `xhigh` | `high` | 262,144 tokens (long decode) |
| `max`, `ultra` | `high` | 1,048,576 tokens minus the input (long decode) |

## Notes

- Hermes keeps an OpenAI-shaped loop and translates: `messages[]` to `contents[]`, system prompts to `systemInstruction`, tool schemas to `functionDeclarations`, tool results to `functionResponse` parts. Type arrays like `["number","null"]` become scalar type plus `nullable`; multi-type unions use `anyOf`.
- Gemini 3 `thoughtSignature` values on function-call parts are preserved and replayed; other part signatures are not yet replayed with full fidelity.
- Prefer the native endpoint over `https://generativelanguage.googleapis.com/v1beta/openai/`. Native path applies only on `generativelanguage.googleapis.com` or the Vertex AI express host; proxies on other hosts are treated as OpenAI-compatible.
- Use native IDs (`gemini-3.7-flash`), not OpenRouter-style `google/gemini-3.7-flash`.
- Express-mode keys (`AQ.` prefix) are issued for both AI Studio and Vertex express; the base URL decides the surface. For a Vertex express key set `GEMINI_BASE_URL=https://aiplatform.googleapis.com`. The earlier automatic `AQ.` reroute is gone: with the URL unset, requests go to AI Studio and return `403 PERMISSION_DENIED`. For `global`-only models use `https://aiplatform.googleapis.com/v1beta1/projects/<project>/locations/global`.
- Free-tier keys are too small for agent sessions; a billing-enabled project is recommended. Gemma models are free-tier-only with low caps and hidden from the default picker; set them directly in config.
- Long decode (`xhigh` / `max`) uses `continuationToken` resends on `finishReason: CONTINUATION`; only on native endpoints (AI Studio and Vertex express). Without it, one request stops at 65,536 output tokens streaming (32,768 non-streaming).
- Troubleshooting: "Gemini native client requires an API key" (set a key), "This Google API key is on the free tier" (enable billing, rerun `hermes model`), "404 model not found" (pick another model), "429 quota exceeded" on Gemma, schema errors (upgrade Hermes).
- Model availability changes over time; rerun `hermes model` for the current list.

## Related

- [google-vertex](./google-vertex.md)
- [aws-bedrock](./aws-bedrock.md)
