---
source: https://docs.cloud.google.com/developer-connect/docs/http-connections
---

# HTTP connections (Preview)

An HTTP connection lets you create and maintain connections to arbitrary HTTP endpoints that you grant a service account permission to use. No user who authorized the connection needs to be present when it is invoked.

## Signature / Usage

Connection resource name format (from the gcloud help):

```text
projects/{project}/locations/{location}/connections/{connection_id}
```

## Options / Props

### `gcloud developer-connect connections create` flags for HTTP

| Flag | Description |
|------|-------------|
| `--http-config-host-uri` | The service provider's https endpoint (required for an HTTP config) |
| `--http-config-service-directory` | Service Directory service `projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}` |
| `--http-config-ssl-ca-certificate` | SSL certificate to use for requests to the HTTP service provider |
| `--http-config-bearer-token-authentication-secret-version` | Secret Manager secret version holding the bearer token |
| `--http-config-basic-authentication-username` | Username for basic authentication |
| `--http-config-basic-authentication-password-secret-version` | Secret Manager secret version holding the password |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms; Pre-GA features are available "as is" and might have limited support.
- Developer Connect handles authentication to the resource every time a Google Cloud service (such as Gemini Code Assist) accesses it, and guides you through setting up that authentication.
- Bearer tokens and passwords belong in Secret Manager; the flags take secret versions, never the credential itself. At most one authentication method can be given.
- The flag table comes from the gcloud 593.0.0 help for `gcloud developer-connect connections create`; the source page describes the concept only and links to a separate setup page (`configure-http-connections`, not in this category).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/developer-connect/connections/create (gcloud 593.0.0 help); the source page itself has no code block.
- Source: https://docs.cloud.google.com/developer-connect/docs/http-connections (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [git-repo-connections.md](./git-repo-connections.md)
