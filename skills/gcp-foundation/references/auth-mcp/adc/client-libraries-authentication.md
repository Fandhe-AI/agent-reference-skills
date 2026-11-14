---
source: https://docs.cloud.google.com/docs/authentication/client-libraries
---

# Authenticate for using client libraries

Client libraries simplify access to Google Cloud APIs, especially authentication, since they support Application Default Credentials (ADC). This page shows client creation with ADC, API key use, and security requirements when accepting credential configurations from an external source.

## Signature / Usage

### Use ADC with client libraries

Set up ADC for the environment first. When you create a client, the library automatically finds and uses the credentials provided to ADC; your application doesn't explicitly authenticate or manage tokens. Locally, set up ADC with user credentials or with service account impersonation via gcloud; in production, attach a service account. Prerequisites for the samples: set up ADC and install the Cloud Storage client library (samples list buckets; needs `storage.buckets.list`).

Go:

```go
import (
	"context"
	"fmt"
	"io"

	"cloud.google.com/go/storage"
	"google.golang.org/api/iterator"
)

// authenticateImplicitWithAdc uses Application Default Credentials
// to automatically find credentials and authenticate.
func authenticateImplicitWithAdc(w io.Writer, projectId string) error {
	// projectId := "your_project_id"

	ctx := context.Background()

	// NOTE: Replace the client created below with the client required for your application.
	// Note that the credentials are not specified when constructing the client.
	// The client library finds your credentials using ADC.
	client, err := storage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	it := client.Buckets(ctx, projectId)
	for {
		bucketAttrs, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return err
		}
		fmt.Fprintf(w, "Bucket: %v\n", bucketAttrs.Name)
	}

	fmt.Fprintf(w, "Listed all storage buckets.\n")

	return nil
}
```

Python:

```python
from google.cloud import storage


def authenticate_implicit_with_adc(project_id: str = "your-google-cloud-project-id") -> None:
    """
    When interacting with Google Cloud Client libraries, the library can auto-detect the
    credentials to use.

    // TODO(Developer):
    //  1. Before running this sample,
    //  set up ADC as described in https://cloud.google.com/docs/authentication/external/set-up-adc
    //  2. Replace the project variable.
    //  3. Make sure that the user account or service account that you are using
    //  has the required permissions. For this sample, you must have "storage.buckets.list".
    Args:
        project_id: The project id of your Google Cloud project.
    """

    # This snippet demonstrates how to list buckets.
    # *NOTE*: Replace the client created below with the client required for your application.
    # Note that the credentials are not specified when constructing the client.
    # Hence, the client library will look for credentials using ADC.
    storage_client = storage.Client(project=project_id)
    buckets = storage_client.list_buckets()
    print("Buckets:")
    for bucket in buckets:
        print(bucket.name)
    print("Listed all storage buckets.")
```

Node.js:

```javascript
const {Storage} = require('@google-cloud/storage');

async function authenticateImplicitWithAdc() {
  // This snippet demonstrates how to list buckets.
  // NOTE: Replace the client created below with the client required for your application.
  // Note that the credentials are not specified when constructing the client.
  // The client library finds your credentials using ADC.
  const storage = new Storage({
    projectId,
  });
  const [buckets] = await storage.getBuckets();
  console.log('Buckets:');

  for (const bucket of buckets) {
    console.log(`- ${bucket.name}`);
  }

  console.log('Listed all storage buckets.');
}

authenticateImplicitWithAdc();
```

### Use API keys with client libraries

API keys work only with client libraries for APIs that accept them, and the key must not have an API restriction that prevents using it for the API. Example with the Cloud Natural Language API:

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

### Security requirements for credential configurations from an external source

Credential configurations normally come from gcloud commands or the console. If an external entity (for example a customer) supplies them, validate before use: some configurations include endpoints and file paths the authentication libraries use to acquire a token, so an unvalidated configuration lets a malicious actor compromise your systems and data.

If your application accepts only service account keys, use a type-specific credential loader (it parses only the fields present for service account keys):

```c#
var saCredential = CredentialFactory.FromStream<ServiceAccountCredential>(stream);
```

```c++
auto cred = google::cloud::MakeServiceAccountCredentials(json)
```

```java
ServiceAccountCredentials credentials =
      ServiceAccountCredentials.fromStream(credentialsStream);
```

Adapted (not in the official docs): `fromJSON` is an instance method, so a `JWT` instance is created first.

```javascript
const keys = JSON.parse(json_input)
const authClient = new JWT();
authClient.fromJSON(keys);
```

```php
$cred = new Google\Auth\Credentials\ServiceAccountCredentials($scope, $jsonKey);
```

```python
cred = service_account.Credentials.from_service_account_info(json_data)
```

```ruby
creds = Google::Auth::ServiceAccountCredentials.make_creds(json_key_io: json_stream)
```

If you can't use a type-specific loader, confirm the `type` field is `service_account`; for any other value, don't use the key.

If your application accepts any other credential configuration type (ADC credential files, Workload Identity Federation credential files, Workforce Identity Federation login configuration files), validate these fields when present. If any value does not conform, don't use the credential.

Adapted (not in the official docs): the three AWS rows are listed as `credential_source.url`, `credential_source.region_url`, `credential_source.imdsv2_session_token_url` (the official table shows them under `credential_source.aws.*`, but in AWS external account configs they sit directly under `credential_source`).

| Field | Purpose | Expected value |
|---|---|---|
| `service_account_impersonation_url` | Endpoint to generate an access token for the impersonated service account. | `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/service account email:generateAccessToken` |
| `token_url` | Endpoint where an external token is exchanged for a federated access token. | `https://sts.googleapis.com/v1/token` |
| `credential_source.file` | File from which the library reads an external token and sends it to `token_url`. | The path for a file containing an external token. You should recognize this path. |
| `credential_source.url` | Endpoint returning an external token; the response goes to `token_url`. | A well-known endpoint provided by your cloud provider, or an endpoint you explicitly set up to provide tokens. |
| `credential_source.executable.command` | Command run if `GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES` is `1`. | An executable file or command that returns an external token. You should recognize it and validate that it is safe. |
| `credential_source.url` (AWS: security token URL) | URL to retrieve an AWS security token. | `http://169.254.169.254/latest/meta-data/iam/security-credentials` or `http://[fd00:ec2::254]/latest/meta-data/iam/security-credentials` |
| `credential_source.region_url` | URL to retrieve the active AWS region. | `http://169.254.169.254/latest/meta-data/placement/availability-zone` or `http://[fd00:ec2::254]/latest/meta-data/placement/availability-zone` |
| `credential_source.imdsv2_session_token_url` | URL to retrieve the AWS session token. | `http://169.254.169.254/latest/api/token` or `http://[fd00:ec2::254]/latest/api/token` |

## Notes

- Adapted from the official docs: AWS `url` / `region_url` / `imdsv2_session_token_url` are validated at `credential_source.*` (not `credential_source.aws.*`); the Node.js `JWT.fromJSON` sample calls the instance method (`new JWT().fromJSON(keys)`); the Node.js API key sample passes the key (here from `process.env.API_KEY`).
- Keep API keys secure in storage and transmission; publicly exposing them can lead to unexpected charges. API keys passed as plaintext strings in code should be avoided; prefer keyless ADC where the API supports it.
- Service account keys are a security risk; prefer keyless auth.
- The source page also provides the ADC client creation sample for Java, PHP, Ruby and the API key sample for C#, C++, Ruby; those are not reproduced here. Per-language ADC code belongs to the `gcp-client-libraries` skill.
- Source: https://docs.cloud.google.com/docs/authentication/client-libraries (retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0)

## Related

- [set-up-adc.md](./set-up-adc.md)
- [how-adc-works.md](./how-adc-works.md)
- [../api-keys/use-api-keys.md](../api-keys/use-api-keys.md)
- `gcp-client-libraries` skill
