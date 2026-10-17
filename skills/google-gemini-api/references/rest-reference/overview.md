---
source: https://ai.google.dev/api
---

# Gemini API reference overview

REST API reference landing page: primary endpoints and authentication for the Gemini API (unary, streaming, and real-time).

## Signature / Usage

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }'
```

## Options / Props

Primary endpoints:

| Endpoint | Description |
|------|-------------|
| Interactions (`CreateInteraction`) (Recommended) | The recommended standard primitive for building with Gemini, optimized for agentic workflows, server-side state management, and complex multi-modal, multi-turn conversations. |
| Standard content generation (`generateContent`) | A standard REST endpoint that processes your request and returns the model's full response in a single package. This is best for non-interactive tasks where you can wait for the entire result. |
| Streaming content generation (`streamGenerateContent`) | Uses Server-Sent Events (SSE) to push chunks of the response to you as they are generated. |
| Live API (`BidiGenerateContent`) | A stateful WebSocket-based API for bi-directional streaming, designed for real-time conversational use cases. |
| Batch mode (`batchGenerateContent`) | A standard REST endpoint for submitting batches of `generateContent` requests. |
| Embeddings (`embedContent`) | A standard REST endpoint that generates a text embedding vector from the input `Content`. |
| Gen Media APIs | Endpoints for generating media with specialized models such as Imagen (`models.predict`) and Veo (`models.predictLongRunning`). Gemini also has these capabilities built in via `generateContent`. |
| Platform APIs | Utility endpoints such as uploading files and counting tokens. |

## Notes

- Authentication: all requests must include an `x-goog-api-key` header with your API key (create one in Google AI Studio). SDK usage of the key is covered by the "Using Gemini API keys" guide. Some source examples on other pages pass the key as a `?key=` query parameter instead, and Live API sessions can authenticate with ephemeral tokens (see live.md).
- Docs fetched 2026-10-16 (no version in URL). The example above uses `v1beta`; the Interactions API is also published as `v1` (see interactions-v1.md).
- Distinct from openai-api-core (OpenAI Responses API) and anthropic-api-core (Claude Messages API): this reference covers the Gemini Developer API host `generativelanguage.googleapis.com` only.
- Language-specific SDK references are linked from the left navigation of the source page (not reproduced here).

## Related

- [All methods](./all-methods.md)
- [Interactions API (v1)](./interactions-v1.md)
- [Interactions API (v1beta)](./interactions-v1beta.md)
- [Generating content](./generate-content.md)
