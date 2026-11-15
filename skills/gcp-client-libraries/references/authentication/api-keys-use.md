---
source: https://docs.cloud.google.com/docs/authentication/api-keys-use
---

# Using API Keys with Client Libraries

Pass an API key to a client constructor (Node.js `apiKey`, Python `client_options={"api_key": ...}`) for APIs that accept API keys. The example uses the Cloud Natural Language API.

## Signature / Usage

### Node.js

Adapted (not in the official docs): the final call reads the key from the API_KEY environment variable, fails fast if it is unset (an unset key silently falls back to ADC), and handles the returned promise; API_KEY is an illustrative name.

```javascript

const {
  v1: {LanguageServiceClient},
} = require('@google-cloud/language');

/**
 * Authenticates with an API key for Google Language service.
 *
 * @param {string} apiKey An API Key to use
 */
async function authenticateWithAPIKey(apiKey) {
  const language = new LanguageServiceClient({apiKey});

  // Alternatively:
  // const {GoogleAuth} = require('google-auth-library');
  // const auth = new GoogleAuth({apiKey});
  // const language = new LanguageServiceClient({auth});

  const text = 'Hello, world!';

  const [response] = await language.analyzeSentiment({
    document: {
      content: text,
      type: 'PLAIN_TEXT',
    },
  });

  console.log(`Text: ${text}`);
  console.log(
    `Sentiment: ${response.documentSentiment.score}, ${response.documentSentiment.magnitude}`,
  );
  console.log('Successfully authenticated using the API key');
}

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error('Set the API_KEY environment variable');
}
authenticateWithAPIKey(apiKey).catch(err => {
  console.error(err.message);
  process.exitCode = 1;
});
```

### Python

```python

from google.cloud import language_v1


def authenticate_with_api_key(api_key_string: str) -> None:
    """
    Authenticates with an API key for Google Language service.

    TODO(Developer): Replace this variable before running the sample.

    Args:
        api_key_string: The API key to authenticate to the service.
    """

    # Initialize the Language Service client and set the API key
    client = language_v1.LanguageServiceClient(
        client_options={"api_key": api_key_string}
    )

    text = "Hello, world!"
    document = language_v1.Document(
        content=text, type_=language_v1.Document.Type.PLAIN_TEXT
    )

    # Make a request to analyze the sentiment of the text.
    sentiment = client.analyze_sentiment(
        request={"document": document}
    ).document_sentiment

    print(f"Text: {text}")
    print(f"Sentiment: {sentiment.score}, {sentiment.magnitude}")
    print("Successfully authenticated using the API key")

```

## Options / Props

| Language | Where the key goes | Alternative |
|---|---|---|
| Node.js | `{apiKey}` in the client constructor options | `new GoogleAuth({apiKey})` from `google-auth-library`, passed as `{auth}` |
| Python | `client_options={"api_key": ...}` | none stated |

## Notes

- You can use an API key only with client libraries for APIs that accept API keys, and the key must not have an API restriction that prevents its use for that API. Not all Google Cloud APIs accept API keys.
- Keep API keys secure in storage and transmission; exposing a key publicly can lead to unexpected charges. Do not print or log the key.
- Adapted from the official docs: the original ends with `authenticateWithAPIKey();` (no argument), which passes `undefined` as the key. The client options reach `GoogleAuth` through google-gax 6.17.0 (`this.auth = options.auth || new GoogleAuth(options)` in the function body of the `GrpcClient` constructor in `grpc.ts`, not documented in the docstring). With no key, `GoogleAuth` falls back to normal ADC resolution (from the function bodies of the `GoogleAuth` constructor and the private `#determineClient` method in `googleauth.ts` of google-auth-library 11.3.4, which builds the API key client only when `apiKey` is set; not documented in the docstring), so the call could succeed with the developer's ADC identity and still print the API key success message; the adapted code therefore stops when `API_KEY` is unset.
- The twin of this page has identifiers replaced by URLs in its Node.js and Python code (for example `require('https://docs.cloud.google.com/nodejs/docs/reference/language/latest/overview.html')`). The code above was taken from the clean samples in the `client-libraries` twin, which are identical apart from that corruption. Snippet taken from https://docs.cloud.google.com/docs/authentication/client-libraries
- Not covered: the REST usage (`x-goog-api-key` header, or the `key` query parameter, which exposes the key in the URL), the Go / Java / C# / C++ / Ruby tabs, and the gcloud-side setup. The page has no Rust section.
- With an API key, the project associated with the key is used as the quota project. For ADC setup with gcloud, see the `gcp-foundation` skill.
- This is the Google Cloud client library, distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill) and from `googleapis` (the Node.js Google API Client Library for REST discovery APIs).
- Source: https://docs.cloud.google.com/docs/authentication/api-keys-use (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/docs/authentication/client-libraries (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/docs/quotas/set-quota-project (retrieved 2026-11-16; CC BY 4.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/googleauth.ts (pinned at tag google-auth-library-v11.3.4)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/grpc.ts (pinned at tag google-gax-v6.17.0)

## Related

- [client-libraries.md](./client-libraries.md)
- [use-service-account-impersonation.md](./use-service-account-impersonation.md)
