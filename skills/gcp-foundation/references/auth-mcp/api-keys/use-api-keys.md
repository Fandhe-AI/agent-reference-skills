---
source: https://docs.cloud.google.com/docs/authentication/api-keys-use
---

# Use API keys to access APIs

How to use API keys with Google Cloud APIs and services that accept them, via REST or client libraries. Not all Google Cloud APIs accept API keys; check the documentation of the service or API.

## Signature / Usage

For creating, managing, and restricting keys see the manage API keys page. For Google Maps Platform see its own API key best practices; for the API Keys API see its documentation.

### Before you begin

Client library samples (C#, C++, Go, Node.js, Python) in a local environment: install and initialize the gcloud CLI, then set up ADC with user credentials (not needed in Cloud Shell; with an external IdP first sign in to gcloud with your federated identity):

```bash
gcloud auth application-default login
```

REST samples use the credentials you provide to the gcloud CLI.

### Using an API key with REST

Use the `x-goog-api-key` HTTP header:

```
curl -X POST \
    -H "X-goog-api-key: API_KEY" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d @request.json \
    "https://translation.googleapis.com/language/translate/v2"
```

If you can't use the header, use the `key` query parameter (this puts the key in the URL, exposing it to theft through URL scans):

```
POST https://language.googleapis.com/v1/documents:analyzeEntities?key=API_KEY
```

### Using an API key with client libraries

Example with the Cloud Natural Language API (requires the Natural Language client library).

Python:

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

Go:

```go
import (
	"context"
	"fmt"
	"io"

	language "cloud.google.com/go/language/apiv1"
	"cloud.google.com/go/language/apiv1/languagepb"
	"google.golang.org/api/option"
)

// authenticateWithAPIKey authenticates with an API key for Google Language
// service.
func authenticateWithAPIKey(w io.Writer, apiKey string) error {
	// apiKey := "api-key-string"

	ctx := context.Background()

	// Initialize the Language Service client and set the API key.
	client, err := language.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	text := "Hello, world!"
	// Make a request to analyze the sentiment of the text.
	res, err := client.AnalyzeSentiment(ctx, &languagepb.AnalyzeSentimentRequest{
		Document: &languagepb.Document{
			Source: &languagepb.Document_Content{
				Content: text,
			},
			Type: languagepb.Document_PLAIN_TEXT,
		},
	})
	if err != nil {
		return fmt.Errorf("AnalyzeSentiment: %w", err)
	}

	fmt.Fprintf(w, "Text: %s\n", text)
	fmt.Fprintf(w, "Sentiment score: %v\n", res.DocumentSentiment.Score)
	fmt.Fprintln(w, "Successfully authenticated using the API key.")

	return nil
}
```

Node.js:

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

authenticateWithAPIKey(process.env.API_KEY);
```

Ruby (reads the key from a variable; the sample notes an env var option):

```ruby
require "googleauth"
require "google/cloud/language/v1"

def authenticate_with_api_key api_key_string
  # Authenticates with an API key for Google Language service.
  #
  # TODO(Developer): Uncomment the following line and set the value before running this sample.
  #
  # api_key_string = "mykey12345"
  #
  # Note: You can also set the API key via environment variable:
  #   export GOOGLE_API_KEY=your-api-key
  # and use Google::Auth::APIKeyCredentials.from_env method to load it.
  # Example:
  #   credentials = Google::Auth::APIKeyCredentials.from_env
  #   if credentials.nil?
  #     puts "No API key found in environment"
  #     exit
  #   end

  # Initialize API key credentials using the class factory method
  credentials = Google::Auth::APIKeyCredentials.make_creds api_key: api_key_string

  # Initialize the Language Service client with the API key credentials
  client = Google::Cloud::Language::V1::LanguageService::Client.new do |config|
    config.credentials = credentials
  end

  # Create a document to analyze
  text = "Hello, world!"
  document = {
    content: text,
    type: :PLAIN_TEXT
  }

  # Make a request to analyze the sentiment of the text
  sentiment = client.analyze_sentiment(document: document).document_sentiment

  puts "Text: #{text}"
  puts "Sentiment: #{sentiment.score}, #{sentiment.magnitude}"
  puts "Successfully authenticated using the API key"
end
```

## Notes

- Keep API keys secure in storage and transmission; publicly exposing them can lead to unexpected charges. Prefer keyless auth (ADC) when the API supports it; never hard-code keys in client code or repositories.
- In the fetched twin, the Go/Node.js/Python/Ruby samples have corrupted inline reference URLs; the code above uses the same code as the clean copy on the client-libraries authentication page. The C# and C++ samples are in that page's source too and are not reproduced.
- Source: https://docs.cloud.google.com/docs/authentication/api-keys-use (retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0)

## Related

- [api-key-best-practices.md](./api-key-best-practices.md)
- [manage-api-keys.md](./manage-api-keys.md)
- [../adc/client-libraries-authentication.md](../adc/client-libraries-authentication.md)
- `google-gemini-api` skill (Gemini API keys)
