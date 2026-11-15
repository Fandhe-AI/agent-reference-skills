---
source: https://docs.cloud.google.com/docs/authentication/use-cases
---

# Authentication use cases and identity products

Common authentication and authorization use cases with pointers, plus a catalogue of Google identity and access management products and how they differ.

## Signature / Usage

### Authenticate to Google APIs

Google APIs require a valid access token or API key with every request.

- **Client libraries + ADC** (recommended): ADC supports authenticating as a service account and as a user.
- **GKE**: Workload Identity Federation for GKE lets a GKE service account act as an IAM service account. Same for Knative serving.
- **API keys**: if an API supports them, a key can replace the access token and associates the request with a project for billing and quota. Check the API docs.
- **Self-signed JWTs**: some APIs accept self-signed JSON Web Tokens instead of access tokens, avoiding a network call to Google's authorization server; you create your own signed JWT.
- **Authentication libraries and packages** (if ADC / client library OAuth is unavailable): C#, Dart (`googleapis_auth`), Go (`google.golang.org/api/transport`), Java (`google-auth-library-java`), Node.js (`google-auth-library-nodejs`), PHP (`google-auth-library-php`), Python (`google-auth`), Ruby (`google-auth-library-ruby`). You can also implement the OAuth 2.0 flow with Google's OAuth 2.0 endpoints.

### Service-specific use cases

- Cloud Storage signed URLs: time-limited access to a specific resource.
- GKE Enterprise: authenticate with Google Cloud identities via the Connect gateway, or a third-party OIDC/LDAP IdP via GKE Identity Service.
- API Gateway / Cloud Endpoints: service-to-service and user authentication with Firebase, Google-signed ID tokens, Okta, Auth0, and JWTs.
- Cloud Run and Cloud Run functions: require ID tokens. Cloud Run end users use Identity Platform or Firebase Authentication, or IAP for internal users; function invocations use user credentials or an OIDC ID token.

### Authenticate application users

| Authentication service | Description |
|---|---|
| Google Identity Services | Sign In With Google, One Tap, Identity Services APIs and SDK (OAuth 2.0 / OIDC). Targeted at Google-only accounts, or Google Accounts in an existing sign-in system, for mobile apps; available for iOS, Android, web. |
| Firebase Authentication | Authentication for a wide array of account types and multiple platforms (password, federated sign-in). Uses Identity Platform as backend but targets consumer apps with a subset of features. |
| Identity Platform | CIAM platform: SAML, OIDC, email/password, social, phone, custom; enterprise-focused SaaS; supports inbound OIDC or SAML from enterprise IdPs. |
| OAuth 2.0 and OpenID Connect | Maximum control over the implementation; validate the ID token and retrieve profile info; can implement programmatic authentication to an IAP-secured resource. |
| Identity-Aware Proxy (IAP) | Authentication before requests reach your app; central authorization layer with signed headers; access only for principals with the correct IAM role; doesn't protect against activity within a project. |
| App Engine Users API | User authentication for App Engine standard (some languages). |
| End-user resource access (3LO) | Three-legged OAuth when the app accesses resources owned by the end user. |

### Other options

- Workload Identity Federation: grants on-premises or multi-cloud workloads access without service account keys; supports OIDC-compatible or SAML 2.0-compatible IdPs.
- Identity provider: use Cloud Identity or Google Workspace, or federate with an external IdP via SAML.
- Two-factor authentication: Identity Platform (web, iOS, Android), Google Identity Services (FIDO), hardware keys such as Titan Keys.
- Certificate-based access (mTLS): part of Chrome Enterprise Premium; limits access to authenticated users on trusted devices via X.509 certificates.
- Compromised credentials: see "Handling compromised Google Cloud credentials". Certificate / CA errors: see the Google Trust Services FAQ.

### Identity products

| Product | What it is |
|---|---|
| Chrome Enterprise Premium | Zero-trust solution for secure workforce access to web apps without a VPN; includes IAP, Endpoint Verification, Chrome Enterprise. |
| Cloud Identity | IDaaS that centrally manages users and groups; built in to Google Cloud and Google Workspace; standalone available. Not related to Identity Platform. |
| Firebase Authentication | Firebase's authentication solution for Web, Android, iOS apps. |
| Google Identity Services | Sign In With Google button, One Tap, libraries for OAuth 2.0 flows. For apps using only Google Cloud APIs/resources, consider Identity Platform instead. |
| Google Workspace | Productivity and collaboration suite on Google identities; includes Cloud Identity user management. |
| IAM | Fine-grained access control for Google Cloud resources. |
| Identity-Aware Proxy (IAP) | Centralized authentication and authorization for applications and VMs, in Google Cloud or on-premises. |
| Identity Platform | CIAM platform (email/password, Google, Facebook, Apple; SMS MFA). Not related to Cloud Identity or IAP. |
| Workforce Identity Federation | IAM feature to federate workforce (employees, partners) identities from an external IdP. Aggregates human users. |
| Workload Identity Federation for GKE | Lets a Kubernetes service account act as an IAM service account; recommended for GKE workloads. Not related to Workload Identity Federation. |
| Workload Identity Federation | Grants on-premises or multicloud workloads access by federating identities from an external IdP, without a service account key. Aggregates machine workloads. |

```
https://www.googleapis.com/auth/cloud-platform
```

## Notes

- Do not confuse Workforce Identity Federation (humans), Workload Identity Federation (machine workloads outside Google Cloud), and Workload Identity Federation for GKE (Kubernetes service accounts). Details of Workload Identity Federation setup live in the `gcp-security` skill.
- The source pages contain no code; the fence above is the cloud-wide OAuth scope string quoted from the authentication overview page (Snippet taken from https://docs.cloud.google.com/docs/authentication).
- Source: https://docs.cloud.google.com/docs/authentication/use-cases
- Source: https://docs.cloud.google.com/docs/authentication/identity-products
- Retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0.

## Related

- [authentication-overview.md](./authentication-overview.md)
- [../credentials-and-tokens/id-tokens.md](../credentials-and-tokens/id-tokens.md)
