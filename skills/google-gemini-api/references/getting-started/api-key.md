---
source: https://ai.google.dev/gemini-api/docs/api-key
---

# Using Gemini API keys

To use the Gemini API, you must authenticate your requests with a standard or authorization (auth) API key. Keys are created and managed in Google AI Studio or the Google Cloud console.

## Signature / Usage

Environment variable (recommended):

```bash
export GEMINI_API_KEY=<YOUR_API_KEY_HERE>
```

Explicit key in code:

```python
from google import genai

client = genai.Client(api_key="YOUR_API_KEY")

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Explain how AI works in a few words"
)
print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

async function main() {
  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: "Explain how AI works in a few words",
  });
  console.log(interaction.output_text);
}

main();
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H 'Content-Type: application/json' \
  -H "x-goog-api-key: YOUR_API_KEY" \
  -X POST \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Explain how AI works in a few words"
  }'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Standard API key | key type | Associates requests with a Google Cloud project for billing and quota. Does not identify a caller |
| Authorization (auth) key | key type | Bound to a Google Cloud service account; restricted to the Generative Language API by default; fast-acting leaked key enforcement |
| `GEMINI_API_KEY` / `GOOGLE_API_KEY` | env var | Auto-detected by the client libraries. If both are set, `GOOGLE_API_KEY` takes precedence |

IAM permissions needed to create a key in AI Studio:

| Permission | Purpose |
|------------|---------|
| `resourcemanager.projects.get` | Allows AI Studio to verify the project |
| `apikeys.keys.create` | Allows key generation |
| `serviceusage.services.enable` | Ensures the Generative Language API is enabled |
| `iam.serviceAccounts.create` | Required to create the linked service account |
| `iam.serviceAccountApiKeyBindings.create` | Binds the service account to the API key |

## Notes

- Replace `<YOUR_API_KEY_HERE>` (including the angle brackets) with the actual key; the placeholder is verbatim from the source. Left in place, the shell treats `<` as input redirection.
- Starting May 28, 2026, all new API keys created in Google AI Studio are automatically created as auth keys.
- The Gemini API rejects requests from unrestricted standard keys. Standard keys with explicit restrictions continue to work.
- Starting May 7, 2026, the Gemini API blocks unrestricted API keys that have been dormant for an extended period (shown with a Blocked tag in AI Studio).
- Requests authenticated by authorization keys are not recorded in Google Cloud service account usage metrics.
- To restrict a key you need the `apikeys.keys.update` permission (included in API Keys Admin or Editor roles).
- Never check keys into source control; never expose keys client-side in production (use a backend proxy). For production use a secret store such as Google Cloud Secret Manager and set billing alerts.
- Leak response: generate a new key, update the application, disable the compromised key only after the new key is active, audit usage.
- AI Studio limits: max 10 projects created at a time from the Projects page; API keys and Projects pages display max 100 keys and 50 projects; only keys that are unrestricted or restricted to the Generative Language API are displayed.
- Docs fetched 2026-10-16.

## Related

- [get-started](./get-started.md)
- [oauth](./oauth.md)
- [libraries](./libraries.md)
