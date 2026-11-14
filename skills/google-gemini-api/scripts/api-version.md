---
source: https://ai.google.dev/gemini-api/docs/api-versions
---

# Switch API Version (v1 / v1beta)

The latest SDKs (Python `google-genai` 3.x, JS `@google/genai` 3.x) default to `v1`; earlier releases defaulted to `v1beta`. Set the API version explicitly to pin `v1` (as below) or to use `v1beta`-only features by passing `v1beta` instead. The `GOOGLE_GENAI_API_VERSION` environment variable (for example `v1beta`) is also read when no version is set in code. Both versions support the Interactions API.

## Python

```python
from google import genai

client = genai.Client(http_options={'api_version': 'v1'})

interaction = client.interactions.create(
    model='gemini-3.8-flash',
    input="Explain how AI works",
)

print(interaction.output_text)
```

## JavaScript

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  httpOptions: { apiVersion: "v1" },
});

async function main() {
  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: "Explain how AI works",
  });
  console.log(interaction.output_text);
}

await main();
```

## Go

```go
client, err := genai.NewClient(ctx, &genai.ClientConfig{
    HTTPOptions: genai.HTTPOptions{
        APIVersion: "v1",
    },
})
```

Excerpt of the client construction from the official Go sample (the page also uses `client.Interactions.Create`; see `references/migration/api-versions.md` for the full program).

## Java

```java
Client client = Client.builder()
    .httpOptions(HttpOptions.builder().apiVersion("v1").build())
    .build();
```

Uses `com.google.genai.types.HttpOptions`. Excerpt from the official Java sample.

## REST

```sh
curl -X POST "https://generativelanguage.googleapis.com/v1/interactions" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Explain how AI works"
  }'
```

## Notes

- The official REST sample has a trailing comma after the `"input"` line, which is invalid JSON; it is removed above.
- Variable expansions use the `"${var}"` form; the official snippets write `$GEMINI_API_KEY`.
- Features available only in `v1beta` (per the page's capability table, fetched 2026-11-14): Audio Output (Speech Config), Audio Transcription (Transcription Config), Live API, Live Music API, Ephemeral Tokens, Agents API, Webhooks API, Explicit Context Caching. If you use them with SDK 3.x, set `v1beta` explicitly. Service Tier (Priority / Flex), Computer Use and MCP Servers are now supported on `v1` too.
- Migration (SDK 2.x to 3.x): the Python / JS 3.0.0 release notes list `gemini-flash-latest`, `gemini-flash-lite-latest` and `gemini-pro-latest` as `v1beta`-only aliases. Source: https://github.com/googleapis/python-genai/releases/tag/v3.0.0 (fetched 2026-11-14).
- The Java and Go samples on the official page use `gemini-3.6-flash` as the model ID; the model ID is interchangeable here since all models are supported in both versions.
