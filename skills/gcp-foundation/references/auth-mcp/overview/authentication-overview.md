---
source: https://docs.cloud.google.com/docs/authentication
---

# Authentication at Google Cloud

Key authentication methods and concepts, a decision tree for choosing a method, and terminology (credentials, principals, tokens, workload vs workforce). Google APIs implement and extend the OAuth 2.0 framework.

## Signature / Usage

### Where to get help

| Action | Instructions |
|---|---|
| Authenticate to Vertex AI in express mode (Preview) | Use the API key created during sign-on. |
| Authenticate to a Google Cloud service from an application in a high-level language | Set up ADC, then use one of the Cloud Client Libraries. |
| Authenticate to an application that requires an ID token | Get an OIDC ID token and provide it with the request. |
| Implement user authentication for an app that accesses Google or Google Cloud | See "Authenticate application users" (use-cases page). |
| Try `gcloud` commands locally | Initialize the gcloud CLI. |
| Try Google Cloud REST requests locally | Use `curl` to call the REST API. |
| Try a code snippet from product docs | Set up ADC for a local development environment and install the product's client library. |

### Choose the right authentication method

For the gcloud CLI, Cloud Client Libraries, ADC-aware tools like Terraform, or REST requests, the decision tree asks:

1. Single-user development environment (own workstation, Cloud Shell, virtual desktop)? Yes -> go to 4. No -> go to 2.
2. Running code in Google Cloud? Yes -> 3. No -> 5.
3. Containers in GKE? Yes -> use Workload Identity Federation for GKE to attach service accounts to pods. No -> attach a service account to the resource.
4. Does the use case require a service account (e.g. consistent authn/authz across environments)? No -> authenticate with user credentials. Yes -> impersonate a service account with user credentials.
5. Does the workload authenticate with an external IdP supporting workload identity federation? Yes -> configure Workload Identity Federation (on-premises / other clouds). No -> create a service account key.

### Authorization

Primarily handled by IAM (granular control by principal and resource). OAuth 2.0 scopes add another layer: a global scope authorizing all Google Cloud services, or a more limited scope if the service supports it:

```
https://www.googleapis.com/auth/cloud-platform
```

Limited scopes reduce risk where compromised tokens are a concern, such as mobile apps. Accepted scopes are listed in each API method's reference.

### Application Default Credentials

ADC lets the same code authenticate in development and production; you must first provide credentials to ADC for your environment. If you use a service in express mode you don't need ADC.

### Terminology

- **Authentication**: determining the identity of the principal accessing a resource. **Authorization**: determining whether it is authorized for that level of access.
- **Credentials**: digital object proving identity. Tokens are not credentials; they prove the caller provided proper credentials. Credentials creatable in the console: API keys (provide a project for billing and quota; if bound to a service account (Preview) they also provide its identity), OAuth Client IDs (identify an application; needed for three-legged OAuth), service account keys. gcloud can create local ADC files and credential configurations for Workload and Workforce Identity Federation.
- **Principal**: an identity that can be granted access; Google APIs support user accounts and service accounts.
- **User accounts**: Google Accounts (Google Workspace or Cloud Identity) or accounts federated via Workforce Identity Federation. Ways to authenticate: set up ADC with gcloud, sign in to the gcloud CLI, impersonate a service account, or sign in to gcloud and generate access tokens.
- **Service accounts**: not human; managed by IAM. Methods from most to least secure: (1) attach a user-managed service account to the resource and use ADC (recommended for production on Google Cloud); (2) use a service account to impersonate another; (3) Workload Identity Federation for on-premises or other clouds; (4) default service account (not recommended: highly privileged by default); (5) a service account key.
- **Token**: shows the caller provided proper credentials that were exchanged for it. With the exception of API keys, Google APIs do not accept credentials directly; your application must acquire a token.
- **Workload vs workforce**: *workload* = programmatic access (Workload Identity Federation avoids service account keys); *workforce* = user access (Workforce Identity Federation lets an external IdP authenticate employees, partners, contractors via IAM).

## Notes

- Service account keys are a security risk if not managed correctly; choose a more secure alternative whenever possible. Key creation may be disabled for your organization (secure-by-default organizations). Keys or credential configurations (JSON, files, streams) from an external source must be validated before use (externally sourced credentials requirements).
- Your gcloud credentials are not the credentials you provide to ADC via gcloud.
- Source: https://docs.cloud.google.com/docs/authentication (retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0)

## Related

- [use-cases-and-identity-products.md](./use-cases-and-identity-products.md)
- [../adc/how-adc-works.md](../adc/how-adc-works.md)
- [../credentials-and-tokens/token-concepts.md](../credentials-and-tokens/token-concepts.md)
- `gcp-security` skill (Workload Identity Federation, IAM)
