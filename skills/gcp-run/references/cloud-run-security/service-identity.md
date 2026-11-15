---
source: https://docs.cloud.google.com/run/docs/securing/service-identity
---

# About Cloud Run service identity

Cloud Run separates access across two identities: a deployer account that manages resources through the Cloud Run Admin API, and a service identity (a service account) that running instances use to call Google Cloud APIs through Cloud Client Libraries or other Cloud Run services.

## Signature / Usage

### Fetch an access token from the metadata server

The metadata server is only available to workloads running on Google Cloud; you cannot query it from your local machine. The `http://metadata.google.internal` root URL is the metadata server address given by the source.

```bash
curl "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token" \
    --header "Metadata-Flavor: Google"
```

The JSON response has an `access_token` attribute. Send it in the `Authorization` header:

```text
PUT https://pubsub.googleapis.com/v1/projects/PROJECT_ID/topics/TOPIC_ID
Authorization: Bearer ACCESS_TOKEN
```

### Fetch an ID token for a given audience

```bash
curl "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=AUDIENCE" \
    --header "Metadata-Flavor: Google"
```

`AUDIENCE` is the JWT audience requested. For Cloud Run services, the audience should be either the URL of the service you are invoking or a custom audience, such as a custom domain, configured for the service (for example `https://service.domain.com`). For other resources, it is likely the OAuth Client ID of an IAP-protected resource (for example `1234567890.apps.googleusercontent.com`).

## Options / Props

| Identity | Description |
|---|---|
| Cloud Run deployer account | User account or service account used to deploy and manage a resource through the Cloud Run Admin API |
| Cloud Run service identity | Service account used by the instance at runtime (Cloud Client Libraries, service-to-service calls) |

| Service account type | Format | Note |
|---|---|---|
| User-managed service account (recommended) | `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com` | You create it and grant the minimal permissions it needs |
| Compute Engine default service account | `PROJECT_NUMBER-compute@developer.gserviceaccount.com` | Default if you specify none |

| Token | Used for |
|---|---|
| OAuth 2.0 access token | Most Google API Client Libraries |
| ID token | Calling other Cloud Run services, or validating an ID token |

How it works: the client library requests an OAuth 2.0 access token for the service identity from the instance metadata server; the request is sent with that token; IAM checks the service identity's permissions and policy bindings before the API performs the operation.

## Notes

- Avoid the default service account. Depending on organization policy it might automatically be granted the Editor role on the project. The source strongly recommends enforcing the `iam.automaticIamGrantsForDefaultServiceAccounts` organization policy constraint (enforced by default for organizations created after May 3, 2024). If it already has Editor, replace Editor with less permissive roles, using Policy Simulator to check the impact.
- Use a dedicated user-managed service account for the service identity, with minimum permissions.
- A service account used as the deployer account is the service identity only if you configure the same account in your Cloud Run configuration.
- Warning from the source: if a service, job, or worker pool uses service identity to authenticate to Google Cloud APIs, never set `GOOGLE_APPLICATION_CREDENTIALS` as an environment variable on it. Always configure a user-managed service account instead.
- Service identity configuration pages exist for services, jobs, and worker pools: https://docs.cloud.google.com/run/docs/configuring/services/service-identity , https://docs.cloud.google.com/run/docs/configuring/jobs/service-identity , https://docs.cloud.google.com/run/docs/configuring/workerpools/service-identity
- See the `gcp-foundation` skill for IAM, service accounts, and Application Default Credentials.
- Source inconsistency: this page says the audience can be "a custom audience, such as a custom domain, configured for the service"; https://docs.cloud.google.com/run/docs/authenticating/service-to-service says "Custom domains are currently not supported for the `aud` value". A custom domain works as `aud` only when it is configured as a custom audience (https://docs.cloud.google.com/run/docs/configuring/custom-audiences).
- Source: https://docs.cloud.google.com/run/docs/securing/service-identity (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [security.md](./security.md)
- [secrets.md](./secrets.md)
- Service-to-service authentication: https://docs.cloud.google.com/run/docs/authenticating/service-to-service
