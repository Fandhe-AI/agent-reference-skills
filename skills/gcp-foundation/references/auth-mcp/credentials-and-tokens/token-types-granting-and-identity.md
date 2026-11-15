---
source: https://docs.cloud.google.com/docs/authentication/token-types
---

# Token types: token-granting and identity tokens

Token-granting tokens let clients obtain new or different tokens later (they cannot call Google APIs). Identity (ID) tokens let clients identify the user they're interacting with (they cannot call Google APIs or obtain access tokens).

## Signature / Usage

### Token-granting tokens

Common properties: represent a prior authentication, authenticate a Google identity or external identity, can be redeemed for an access token, cannot be used for Google API calls.

| Token type | Issuer | Redeemed access token type | Principals | Restrictions |
|---|---|---|---|---|
| Refresh token | Google authorization server | User access token | User (managed user), user (consumer account) | OAuth scope |
| Authorization code | Google authorization server | User access token | User (managed user), user (consumer account) | OAuth scope |
| Federated refresh token | Google Cloud IAM authorization server | Federated access token | Workforce identity pool principal | OAuth scope |
| Federated authorization code | Google Cloud IAM authorization server | Federated access token | Workforce identity pool principal | OAuth scope |
| Service account JSON Web Token assertion | Client | Domain-wide delegation token, service account access token | User (managed user), service account | OAuth scope |
| External JSON Web Token | External identity provider | Federated access token | External principal | None |
| External SAML assertion or response | External identity provider | Federated access token | External principal | None |
| AWS `GetCallerIdentity` token | External identity provider | Federated access token | External principal | None |

| Token type | Format | Lifetime | Revocable | Multi-use | Binding |
|---|---|---|---|---|---|
| Refresh token | Opaque | Varies | Yes | Yes | OAuth client credentials |
| Authorization code | Opaque | 10 minutes | No | No | OAuth client credentials |
| Federated refresh token | Opaque | Varies | No | Yes | OAuth client credentials |
| Federated authorization code | Opaque | 10 minutes | No | No | OAuth client credentials |
| Service account JWT assertion | JWT | 5 minutes--1 hour | No | Yes | |
| External JWT | JWT | Depends on identity provider | Depends on identity provider | Yes | |
| External SAML assertion or response | SAML | Depends on identity provider | Depends on identity provider | Yes | |
| AWS `GetCallerIdentity` token | Text blob | Depends on identity provider | Depends on identity provider | Yes | |

- **Refresh tokens**: opaque, tied to a client, usable only with valid client credentials (client ID and secret). If the authorization includes Google Cloud OAuth scopes, lifetime is subject to the Google Cloud session length control; otherwise valid until the user revokes authorization or other token-revoking events occur.
- **Authorization codes**: opaque, short-lived, intended only as an intermediary during user authentication; tied to a client; single use.
- **Federated refresh tokens**: let clients obtain access tokens for a workforce identity pool principal; cannot be revoked; lifetime is linked to the workforce identity session.
- **Federated authorization codes**: like authorization codes, with the Google Cloud IAM authorization server.
- **Service account JWT assertions**: assert a service account's identity to obtain service account access tokens or domain-wide delegation tokens; signed by a service account key. Valid up to one hour; can't be revoked.

```
{
  "alg": "RS256",
  "kid": "290b7bf588eee0c35d02bf1164f4336229373300",
  "typ": "JWT"
}.{
  "iss": "service-account@example.iam.gserviceaccount.com",
  "scope": "https://www.googleapis.com/auth/devstorage.read_only",
  "aud": "https://oauth2.googleapis.com/token",
  "exp": 1744851267,
  "iat": 1744850967
}.SIGNATURE
```

| Field | Service account JWT | Service account JWT assertion |
|---|---|---|
| `aud` | Google Cloud API, omitted if `scope` is specified | Must be `https://oauth2.googleapis.com/token` |
| `exp` | Expiry | Expiry |
| `iat` | Issue time | Issue time |
| `iss` | Email address of the service account | Email address of the service account |
| `scope` | OAuth scopes, omitted if aud is specified | OAuth scopes |
| `sub` | Email address of the service account | Email address of a user account for domain wide delegation, omitted otherwise |

- **External JWTs / SAML assertions / AWS `GetCallerIdentity` tokens**: issued by an external IdP (Microsoft Entra ID, Okta, Kubernetes, GitHub, AD FS); with Workforce or Workload Identity Federation configured they are exchanged for federated access tokens. The principal identifier is derived from claims of the external token. They must satisfy specific requirements for compatibility. The AWS token is a text blob containing a signed request to the AWS `GetCallerIdentity` API.

### Identity tokens

Common properties: signed but not encrypted (can be decoded and verified by the client), authenticate a user or workload, issued to one client, expire after at most one hour, not revocable. Usable to authenticate calls between microservices or programmatically to Identity-Aware Proxy (IAP).

| Token type | Issuer | Audience | Principal |
|---|---|---|---|
| User ID token | Google authorization server | OAuth/OIDC client | User (managed user), user (consumer account) |
| Service account ID token | Google Cloud IAM authorization server | Free to choose any audience | Service account |
| Agent identity ID token | Google Cloud IAM authorization server | Free to choose any audience | Agent identity |
| IAP assertion | IAP | Backend, App Engine app | User (managed user), user (consumer account), workforce identity pool principal |
| SAML assertion | Google authorization server | SAML app | User (managed user) |

| Token type | Format | Lifetime | Binding |
|---|---|---|---|
| User ID token | JWT | 1 hour | |
| Service account ID token | JWT | 1 hour | |
| Agent identity ID token | JWT | 1 hour | X.509 client certificate |
| IAP assertion | JWT | 10 minutes | |
| SAML assertion | XML | 10 minutes | |

#### User ID tokens

JWTs obtained by initiating an OIDC authentication flow, signed with the Google JWKS (same keys for managed users, consumer users, and service accounts).

```
{
  "alg": "RS256",
  "kid": "c37da75c9fbe18c2ce9125b9aa1f300dcb31e8d9",
  "typ": "JWT"
}.{
  "iss": "https://accounts.google.com",
  "azp": "1234567890-123456789abcdef.apps.googleusercontent.com",
  "aud": "1234567890-123456789abcdef.apps.googleusercontent.com",
  "sub": "12345678901234567890",
  "at_hash": "y0LZEe-ervzRNSxn4R-t9w",
  "name": "Example user",
  "picture": "https://lh3.googleusercontent.com/a/...",
  "given_name": "Example",
  "family_name": "User",
  "hd": "example.com",
  "iat": 1745361695,
  "exp": 1745365295
}.SIGNATURE
```

| Field | Name | Description |
|---|---|---|
| `aud` | Audience | The OAuth client the token is for (client ID); may differ from the authorized party. |
| `azp` | Authorized party | The OAuth client that performed the OIDC flow. |
| `exp` | Expiry | Unix epoch time. |
| `hd` | Hosted domain | Primary domain of the user's Cloud Identity or Google Workspace account; present only for a managed user when the client specified the `hd` parameter. |
| `iss` | Issuer | Always `https://accounts.google.com`. |
| `sub` | Subject | Unique ID of the principal, equivalent to the Directory API user ID. |

The claim set depends on the `scope` parameter of the authentication request. To identify a managed user account or its Cloud Identity / Workspace account, inspect the `hd` claim. Valid one hour; not revocable.

#### Service account ID tokens

JWTs signed by the Google JWKS (not by a service account key).

```
{
  "alg": "RS256",
  "kid": "c37da75c9fbe18c2ce9125b9aa1f300dcb31e8d9",
  "typ": "JWT"
}.{
  "aud": "example-audience",
  "azp": "112010400000000710080",
  "email": "service-account@example.iam.gserviceaccount.com",
  "email_verified": true,
  "exp": 1745365618,
  "iat": 1745362018,
  "iss": "https://accounts.google.com",
  "sub": "112010400000000710080"
}.SIGNATURE
```

Fields: `aud` (freely chosen by the requester), `azp` and `sub` (the requesting service account, unique ID), `exp`, `iss` (always `https://accounts.google.com`). Claims depend on how it is requested: tokens from the Compute Engine metadata server can include claims asserting VM identity; tokens from the IAM Credentials API can include the organization ID of the service account's project. Unlike user ID tokens, no `hd` claim. Valid one hour; not revocable.

#### Agent identity ID tokens

SPIFFE verifiable identity documents (JWT-SVID) for an agent with an agent identity; obtained from the Compute Engine metadata server, optionally bound to the X.509 client certificate (fingerprint in the `cnf` claim). Signed by a JWKS specific to an agent identity pool, not the Google JWKS.

```
{
  "alg": "RS256",
  "kid": "78ab40e4a0319f9ced58024f5bb66e6387d68066",
  "typ": "JWT"
}.{
  "iss": "https://sts.googleapis.com/v1/organizations/1234567890/locations/global/workloadIdentityPools/agents.global.org-1234567890.system.id.goog",
  "sub": "spiffe://agents.global.org-1234567890.system.id.goog/resources/aiplatform/projects/1234567890/locations/us-central1/reasoningEngines/987654321",
  "aud": ["https://example.com/"],
  "iat": 1775776191,
  "exp": 1775779791,
  "cnf": {
    "x5t#S256": "QTB5TSHeDxHrzDzcrrHU+/shhkfCnARcBEvMldp2uis"
  }
}.SIGNATURE
```

Fields: `aud` (chosen by requester), `exp`, `iss` (the agent identity pool), `sub` (SPIFFE ID), `cnf.x5t#S256` (certificate fingerprint; empty if unbound).

#### Identity-Aware Proxy assertions

JWTs IAP passes to IAP-protected apps in the `x-goog-iap-jwt-assertion` HTTP request header; they authenticate a user and prove the request was authorized by IAP. Signed with the separate IAP JWKS (`https://www.gstatic.com/iap/verify/public_key-jwk`), not the Google JWKS.

```
{
  "alg": "ES256",
  "typ": "JWT",
  "kid": "4BCyVw"
}.{
  "aud": "/projects/0000000000/global/backendServices/000000000000",
  "azp": "/projects/0000000000/global/backendServices/000000000000",
  "email": "user@example.com",
  "exp": 1745362883,
  "google": {
    "access_levels": [
      "accessPolicies/0000000000/accessLevels/Australia"
    ]
  },
  "hd": "example.com",
  "iat": 1745362283,
  "identity_source": "GOOGLE",
  "iss": "https://cloud.google.com/iap",
  "sub": "accounts.google.com:112010400000000710080"
}.SIGNATURE
```

With IAP configured for Workforce Identity Federation, `identity_source` is `WORKFORCE_IDENTITY`, `sub` is like `sts.google.com:AAFTZ...Q`, and a `workforce_identity` object contains `iam_principal` (`principal://iam.googleapis.com/locations/global/workforcePools/example/subject/user-0000000000`) and `workforce_pool_name` (`locations/global/workforcePools/example`). Fields: `aud` (backend service, App Engine app, or Cloud Run service), `iss` (always `https://cloud.google.com/iap`), `sub`. Valid 10 minutes; not revocable.

#### SAML assertions

Authenticate a managed user account to a custom SAML app; issued and signed by Cloud Identity with a key specific to a Cloud Identity or Google Workspace account. Fields: `Audience` (entity ID of the SAML app), `Issuer` (specific to the account), `NameID` (principal; format depends on app config). Attributes depend on the SAML app configuration.

```
<saml2:Assertion
  xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion"
  ID="..."
  IssueInstant="2025-04-23T22:47:20.881Z"
  Version="2.0">
  <saml2:Issuer>
    https://accounts.google.com/o/saml2?idpid=C0123456789
  </saml2:Issuer>
  <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">...</ds:Signature>
  <saml2:Subject>
    <saml2:NameID
      Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified">
        user@example.com
    </saml2:NameID>
    <saml2:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
      <saml2:SubjectConfirmationData
        NotOnOrAfter="2025-04-23T22:52:20.881Z"
        Recipient="https://app.example.com/"/>
    </saml2:SubjectConfirmation>
  </saml2:Subject>

  <saml2:Conditions
    NotBefore="2025-04-23T22:42:20.881Z"
    NotOnOrAfter="2025-04-23T22:52:20.881Z">
    <saml2:AudienceRestriction>
      <saml2:Audience>example-app</saml2:Audience>
    </saml2:AudienceRestriction>
  </saml2:Conditions>

  <saml2:AuthnStatement
    AuthnInstant="2025-04-23T22:46:44.000Z"
    SessionIndex="...">
    <saml2:AuthnContext>
      <saml2:AuthnContextClassRef>
        urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified
      </saml2:AuthnContextClassRef>
    </saml2:AuthnContext>
  </saml2:AuthnStatement>
</saml2:Assertion>
```

Valid 10 minutes; not revocable.

## Notes

- Source: https://docs.cloud.google.com/docs/authentication/token-types (retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0)

## Related

- [token-types-access.md](./token-types-access.md)
- [id-tokens.md](./id-tokens.md)
- [token-concepts.md](./token-concepts.md)
