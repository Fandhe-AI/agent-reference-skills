---
source: https://ai.google.dev/gemini-api/docs/api-versions
---

# Switch API Version (v1 / v1beta)

The SDKs default to `v1beta`. Set the API version explicitly to use the stable `v1`, which also supports the Interactions API.

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
- Features available only in `v1beta` (per the page's capability table): Audio Output (Speech Config), Service Tier (Priority / Flex), Computer Use tool, MCP Servers tool, Live API, Live Music API, Ephemeral Tokens, Agents API, Webhooks API, Context Caching. Do not switch to `v1` if you use them.
- The Java and Go samples on the official page use `gemini-3.6-flash` as the model ID; the model ID is interchangeable here since all models are supported in both versions.
