---
source: https://docs.cloud.google.com/docs/authentication/get-id-token
---

# Get an ID token

Ways to acquire a Google-signed OpenID Connect (OIDC) ID token, needed for accessing a Cloud Run service, invoking a Cloud Run function, authenticating a user to an app secured by Identity-Aware Proxy (IAP), or calling an API deployed with API Gateway or Cloud Endpoints.

## Signature / Usage

An ID token is valid for a specific service or application, given by its `aud` claim (the *target service*). Include the token in an `Authorization` header in the request to the target service. For other applications not on Google Cloud these methods can usually be used too, but determine which claims the app requires.

Methods: metadata server, a connecting service, service account impersonation, and a generic development token.

### From the metadata server

On resources that can have a service account attached, the metadata server generates ID tokens for the attached service account (never for user credentials). Available on Compute Engine, App Engine standard and flexible, Cloud Run functions, Cloud Run, Google Kubernetes Engine, and Cloud Build. Replace `AUDIENCE` with the URI of the target service, for example `http://www.example.com`.

curl:

```
curl -H "Metadata-Flavor: Google" \
  'http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience=AUDIENCE'
```

PowerShell:

```
$value = (Invoke-RestMethod `
  -Headers @{'Metadata-Flavor' = 'Google'} `
  -Uri "http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience=AUDIENCE")
$value
```

Go (requires `golang.org/x/oauth2/google` and `google.golang.org/api/idtoken`):

```go
import (
	"context"
	"fmt"
	"io"

	"golang.org/x/oauth2/google"
	"google.golang.org/api/idtoken"
	"google.golang.org/api/option"
)

// getIdTokenFromMetadataServer uses the Google Cloud metadata server environment
// to create an identity token and add it to the HTTP request as part of an Authorization header.
func getIdTokenFromMetadataServer(w io.Writer, url string) error {
	// url := "http://www.example.com"

	ctx := context.Background()

	// Construct the GoogleCredentials object which obtains the default configuration from your
	// working environment.
	credentials, err := google.FindDefaultCredentials(ctx)
	if err != nil {
		return fmt.Errorf("failed to generate default credentials: %w", err)
	}

	ts, err := idtoken.NewTokenSource(ctx, url, option.WithCredentials(credentials))
	if err != nil {
		return fmt.Errorf("failed to create NewTokenSource: %w", err)
	}

	// Get the ID token.
	// Once you've obtained the ID token, you can use it to make an authenticated call
	// to the target audience.
	_, err = ts.Token()
	if err != nil {
		return fmt.Errorf("failed to receive token: %w", err)
	}
	fmt.Fprintf(w, "Generated ID token.\n")

	return nil
}
```

### Use a connecting service

These services can automatically include an ID token with the right `aud` when they call a service that requires one:

- Cloud Scheduler: can include an ID token or an access token when invoking another service (HTTP target auth).
- Cloud Tasks: a task can include an ID token or access token when it calls a service.
- Pub/Sub: can include an ID token with a push message (push subscription authentication).
- Workflows: a workflow can include an ID token or access token when it invokes another service.

### Impersonate a service account

Steps:

1. Identify or create the privilege-bearing service account.
2. Grant it the roles required to invoke the target service: Cloud Run Invoker (`roles/run.invoker`) for Cloud Run services; for Cloud Run functions, Cloud Functions Invoker (`roles/cloudfunctions.invoker`) for 1st gen and Cloud Run Invoker (`roles/run.invoker`) for 2nd gen HTTP functions; for other services see the product docs.
3. Identify the impersonating principal and set up ADC to use its credentials (in development, usually the user account provided to ADC via gcloud; on a resource with an attached service account, that service account).
4. Grant the principal the Service Account OpenID Connect Identity Token Creator role (`roles/iam.serviceAccountOpenIdTokenCreator`).
5. Use the IAM Credentials API to generate the ID token (`AUDIENCE` = URI of the target service; `SERVICE_ACCOUNT_EMAIL` = privilege-bearing service account):

```
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
-d '{"audience": "AUDIENCE", "includeEmail": "true"}' \
https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/SERVICE_ACCOUNT_EMAIL:generateIdToken
```

### Generic ID token for development (Cloud Run and Cloud Run functions)

Gets an ID token for your user credentials usable with any Cloud Run service or function you have permission to invoke. It will not work for any other application.

```
gcloud auth print-identity-token
```

## Notes

- Warning from the docs: keep these tokens secure and never use the generic development token in production.
- Self-impersonation (a service account granted permission to impersonate itself) creates a security vulnerability because it allows access tokens that refresh forever; always use two principals.
- The source page also has Java, Node.js, Python, and Ruby metadata-server samples; in the fetched twin their code is corrupted by inlined reference-doc URLs, so they are not reproduced. Per-language ADC and ID token code belongs to the `gcp-client-libraries` skill.
- Source: https://docs.cloud.google.com/docs/authentication/get-id-token (retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0)

## Related

- [token-types-granting-and-identity.md](./token-types-granting-and-identity.md)
- [service-account-impersonation.md](./service-account-impersonation.md)
- `gcp-cli` skill (`gcloud auth print-identity-token`)
