---
source: https://docs.cloud.google.com/docs/authentication/token-types
---

# Token types: overview and access tokens

Google Cloud tokens are categorized by purpose and the parties exchanging them. This page covers the categories and all access token types. Token-granting and identity tokens are in a sibling page.

## Signature / Usage

| Token category | Communication path | Purpose |
|---|---|---|
| Access tokens | Authorization server -> Client -> Google API | Lets clients call Google Cloud APIs. |
| Token-granting tokens | Authorization server <-> Client | Lets clients obtain new or different tokens, possibly later. |
| Identity tokens | Authorization server -> Client | Lets clients identify the user they're interacting with. |

Most access and identity tokens are *bearer tokens*: they grant access to whoever holds them, so an intercepted token can be misused. *Bound tokens* grant access to a specific client that must provide additional proof of ownership, reducing the risk of theft.

### Access tokens

Common properties: they authenticate a principal (user or workload), are issued to one client, are short-lived (at most a few hours), and are restricted to certain OAuth scopes, endpoints, or resources.

| Token type | Issuer | Principals | Restrictions |
|---|---|---|---|
| User access token | Google authorization server | User (managed user), user (consumer account) | OAuth scope |
| Service account access token | Google authorization server, Google Cloud IAM authorization server | Service account | OAuth scope |
| Domain-wide delegation token | Google authorization server | User (managed user) | OAuth scope |
| Service account JSON Web Token (JWT) | Client | Service account | OAuth scope or API |
| Federated access token | Google Cloud IAM authorization server | Workforce identity pool principal, workload identity pool principal | OAuth scope |
| Agent identity access token | Google Cloud IAM authorization server | Agent identity principal | OAuth scope |
| Credential access boundary token | Google Cloud IAM authorization server | User (managed user), user (consumer account), service account | Specific Cloud Storage objects |
| Client-issued credential access boundary token | Client | Service account | Specific Cloud Storage objects |

| Token type | Format | Introspectable | Lifetime | Revocable | Binding |
|---|---|---|---|---|---|
| User access token | Opaque | Yes | 1 hour | Yes | |
| Service account access token | Opaque | Yes | 5 minutes--12 hours | No | |
| Domain-wide delegation token | Opaque | Yes | 1 hour | No | |
| Service account JSON Web Token (JWT) | JWT | N/A | 5 minutes--1 hour | No | |
| Federated access token | Opaque | No | See Federated access tokens | No | |
| Agent identity access token | Opaque | No | See Agent identity access tokens | No | X.509 client certificate |
| Credential access boundary token | Opaque | No | See Credential access boundary tokens | No | |
| Client-issued credential access boundary token | Opaque | No | N/A | No | |

### User access tokens

Bearer tokens that authenticate a user and authorize a client (web or native app) to act for them. Opaque; introspect for diagnostics:

```
curl "https://oauth2.googleapis.com/tokeninfo?access_token=ACCESS_TOKEN"
```

```
{
  "azp": "0000000000.apps.googleusercontent.com",
  "aud": "0000000000.apps.googleusercontent.com",
  "sub": "00000000000000000000",
  "scope": "openid https://www.googleapis.com/auth/userinfo.email",
  "exp": "1744687132",
  "expires_in": "3568",
  "email": "user@example.com",
  "email_verified": "true"
}
```

| Field | Name | Description |
|---|---|---|
| `aud` | Audience | The OAuth client this token is for (OAuth client ID). Clients can obtain tokens for other clients in the same project, so it may differ from the authorized party. |
| `azp` | Authorized party | The OAuth client that requested the token. |
| `email` | Primary email address | Present only if the token includes the `https://www.googleapis.com/auth/userinfo.email` scope. |
| `exp` | Expiry | Unix epoch time. |
| `scope` | OAuth scopes | APIs the client may access on behalf of the user. |
| `sub` | Subject | Unique ID of the principal, equivalent to the ID in the Directory API. |

They expire after one hour and can be revoked earlier. By default they are bearer tokens; optionally bind them by deploying certificate-based access so they work only with a valid mTLS client certificate.

### Service account access tokens

Opaque bearer tokens, introspectable via `https://oauth2.googleapis.com/tokeninfo`:

```
{
  "azp": "000000000000000000000",
  "aud": "000000000000000000000",
  "scope": "https://www.googleapis.com/auth/userinfo.email",
  "exp": "1744687132",
  "expires_in": "3568",
  "email": "service-account@example.iam.gserviceaccount.com",
  "email_verified": "true",
  "access_type": "online"
}
```

Fields: `aud` (the service account, equivalent to authorized party), `azp` (service account that requested the token, by unique ID), `email` (only with the userinfo.email scope), `exp`. They cannot be revoked and stay valid until expiry. Default lifetime is one hour; `serviceAccounts.generateAccessToken` can request other lifetimes, but longer than one hour requires configuring the `iam.allowServiceAccountCredentialLifetimeExtension` constraint.

### Domain-wide delegation tokens

Opaque bearer tokens that authenticate a user and authorize a service account to act on their behalf. Introspection output:

```
{
  "azp": "000000000000000000000",
  "aud": "000000000000000000000",
  "scope": "https://www.googleapis.com/auth/admin.directory.user.readonly https://www.googleapis.com/auth/userinfo.email",
  "exp": "1744688957",
  "expires_in": "3540",
  "email": "user@example.com",
  "email_verified": "true",
  "access_type": "offline"
}
```

`email` is the impersonated user's primary email (needs the userinfo.email scope); `scope` is what the client may access for the impersonated user. They expire after one hour and can't be revoked.

### Service account JSON Web Tokens

Bearer JWTs issued by the client itself ("self-signed"), useful for authenticating to some Google APIs without an access token (for example when building your own client libraries). Steps: prepare a JSON web signature payload (service account email, OAuth scope or API endpoint, expiry), and sign it with a service account key, offline with a user-managed key or online using `signJwt` with a Google-managed key.

```
{
  "alg": "RS256",
  "kid": "290b7bf588eee0c35d02bf1164f4336229373300",
  "typ": "JWT"
}.{
  "iss": "service-account@example.iam.gserviceaccount.com",
  "sub": "service-account@example.iam.gserviceaccount.com",
  "scope": "https://www.googleapis.com/auth/cloud-platform",
  "exp": 1744851267,
  "iat": 1744850967
}.SIGNATURE
```

Instead of `scope`, specify an API endpoint in `aud`:

```
{
  "alg": "RS256",
  "kid": "290b7bf588eee0c35d02bf1164f4336229373300",
  "typ": "JWT"
}.{
  "iss": "service-account@example.iam.gserviceaccount.com",
  "sub": "service-account@example.iam.gserviceaccount.com",
  "aud": "https://cloudresourcemanager.googleapis.com/",
  "exp": 1744854799,
  "iat": 1744851199
}.SIGNATURE
```

Fields: `aud` (API endpoints; only valid if `scope` isn't specified), `exp`, `iat`, `iss` (the service account), `scope` (only valid if `aud` isn't specified), `sub` (the service account). Valid up to one hour; can't be revoked.

### Federated access tokens

Bearer tokens that authenticate a workforce identity pool principal (Workforce Identity Federation exchanges an external token) or a workload identity pool principal (Workload Identity Federation). Identifiers:

```
principal://iam.googleapis.com/locations/global/workforcePools/POOL/subject/raha@altostrat.com.
```

```
principal://iam.googleapis.com/projects/PROJECT/locations/global/workloadIdentityPools/POOL/subject/SUBJECT_ATTRIBUTE_VALUE
```

Opaque, not introspectable, not revocable. Expiry: Workforce Identity Federation uses the smaller of the time left in the Workforce session and 1 hour; Workload Identity Federation matches the expiry of the external token.

### Agent identity access tokens

Authenticate an agent assigned an agent identity; principal identifier is based on the SPIFFE ID of the agent's X.509 client certificate with prefix `principal://` instead of `spiffe://`:

```
principal://agents.global.org-ORGANIZATION_ID.system.id.goog/resources/aiplatform/projects/PROJECT_NUMBER/locations/us-central1/reasoningEngines/REASONING_ENGINE_ID
```

Obtained from the Compute Engine metadata server; optionally bound to the agent's X.509 client certificate (a bound token is valid only over a mutual TLS connection authenticated with that certificate). Opaque, not introspectable or revocable; default validity 1 hour, possibly shorter if bound to a certificate close to expiry.

### Credential access boundary tokens

Bearer tokens that authenticate a user or service account and include an access boundary limiting use to a defined subset of Cloud Storage resources ("downscoped"). Expiry derives from the input token (user or service account access token). Opaque; can't be introspected or revoked.

### Client-issued credential access boundary tokens

Like credential access boundary tokens but optimized for obtaining tokens with different boundaries at high frequency. Clients create them locally with the Cloud Client Libraries and an access boundary intermediary token that must be refreshed periodically. Opaque; can't be introspected or revoked.

## Notes

- Compromised bearer tokens grant access to anyone holding them; prefer short lifetimes and bound tokens where available.
- Source: https://docs.cloud.google.com/docs/authentication/token-types (retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0)

## Related

- [token-types-granting-and-identity.md](./token-types-granting-and-identity.md)
- [token-concepts.md](./token-concepts.md)
- [service-account-impersonation.md](./service-account-impersonation.md)
