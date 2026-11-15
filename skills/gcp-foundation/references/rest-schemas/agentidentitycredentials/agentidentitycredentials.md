---
source: https://agentidentitycredentials.googleapis.com/$discovery/rest?version=v1
---

# Agent Identity Credentials API message schemas (agentidentitycredentials)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/agentidentitycredentials/`.

### `GoogleCloudAgentidentitycredentialsV1_ConsentRejected`

- Indicates the user has rejected the permission delegation or canceled the request.
- Version: v1

### `GoogleCloudAgentidentitycredentialsV1_FinalizeCredentialsRequest`

- Request message for `FinalizeCredentials`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consentNonce` | string | Required. The same `consent_nonce` value that was provided during retrieval in the UriConsentRequired (https://cloud.google.com/iam/docs/reference/agentidentitycredentials/rest/v1/projects.locations.authProviders.credentials/retrieve#UriConsentRequired) metadata. |
| `userId` | string | Required. The identity of the end user. |
| `userIdValidationState` | string (byte) | Required. The encrypted state passed back from the consent flow. |

### `GoogleCloudAgentidentitycredentialsV1_FinalizeCredentialsResponse`

- Response message for `FinalizeCredentials`. Intentionally empty.
- Version: v1

### `GoogleCloudAgentidentitycredentialsV1_Pending`

- Indicates that the credential retrieval is pending. The caller should retry the `RetrieveCredentials` request after some time.
- Version: v1

### `GoogleCloudAgentidentitycredentialsV1_RetrieveCredentialsRequest`

- Request message for `RetrieveCredentials`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `continueUri` | string | Optional. The URI to redirect the user to after consent is completed. This field is required for auth providers using the 3-legged OAuth flow. For other auth provider types, this field is unused but not rejected. |
| `forceRefreshToken` | string | Optional. Input only. Set this field only if the previous token was expired or invalid. This value must be the full, previously returned token string. Setting this field triggers a refresh of the access token with a stored refresh token, if possible, or a new consent flow. |
| `scopes` | array<string> | Optional. The OAuth scopes required for this access. |
| `userId` | string | Required. The identity of the end user. |

### `GoogleCloudAgentidentitycredentialsV1_RetrieveCredentialsResponse`

- Response message for `RetrieveCredentials`. Contains the access tokens and related artifacts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consentRejected` | GoogleCloudAgentidentitycredentialsV1_ConsentRejected | Message indicating consent was rejected. |
| `pending` | GoogleCloudAgentidentitycredentialsV1_Pending | Message indicating credential retrieval is pending. |
| `success` | GoogleCloudAgentidentitycredentialsV1_Success | Message indicating credentials were successfully retrieved. |
| `uriConsentRequired` | GoogleCloudAgentidentitycredentialsV1_UriConsentRequired | Message indicating URI-based consent is required. |

### `GoogleCloudAgentidentitycredentialsV1_Success`

- Message indicating successful retrieval of credentials.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | The expiration time of the token. This does not guarantee that the token will be valid until this time, since the token could be revoked earlier. There could also be clock skew between the auth provider and the client so it may expire slightly earlier. If not set, the token might be permanent or it may be that the service does not (or cannot) know when it will expire. |
| `header` | string | The HTTP header name where the token should be placed. |
| `scopes` | array<string> | The scopes actually associated with the retrieved token. End users may have rejected some requested scopes, or the third-party authorization servers can return a different set of scopes than what was asked for. Callers should verify that all required scopes for their intended use are included in this list. |
| `token` | string | The retrieved access token or credential for the end user. On an MCP tool call, for an invalid token the OAuth spec states that this should return `401` or `403`, but MCP servers may implement this differently. If you get any flavor of `PERMISSION_DENIED`, retry your original request to `RetrieveCredentials` with force_refresh_token set to the expired/invalid token string, which will fetch a new token or initiate a new consent flow. |

### `GoogleCloudAgentidentitycredentialsV1_UriConsentRequired`

- Indicates that the user must visit the provided URI to consent to delegate permission to the agent to act on their behalf. The caller can either poll the `RetrieveCredentials` method, or await the /ValidateUserId callback.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizationUri` | string | Output only. The URL where the user should be redirected to grant consent. This will always be present. |
| `consentNonce` | string | Output only. A one-time, randomly generated value that validates the entire consent flow is handled by a single user, avoiding CSRF attacks. It must be submitted with the `FinalizeCredentials` request to complete the OAuth exchange. This will always be present. Implemented per RFC 6819 Section 5.3.5 (https://www.rfc-editor.org/rfc/rfc6819#section-5.3.5). |
| `uid` | string | Output only. The unique ID of the credentials retrieval operation. |

### `GoogleCloudAgentidentitycredentialsV1alpha_ConsentRejected`

- Indicates the user has rejected the permission delegation or canceled the request.
- Version: v1alpha

### `GoogleCloudAgentidentitycredentialsV1alpha_ExchangeCredentialsRequest`

- Request message for `ExchangeCredentials`.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `scopes` | array<string> | Optional. The desired downstream OAuth scopes to request for the exchanged token. |
| `sourceCredential` | string | Required. The incoming identity or assertion token to be exchanged. |
| `targetTokenType` | string enum | Optional. The desired target token type to be returned from the exchange. If unspecified, defaults to the token type configured on the AuthProvider. |
| `tokenBinding` | GoogleCloudAgentidentitycredentialsV1alpha_TokenBinding | Optional. The token binding parameters to be applied to downstream tokens and embedded into the ID-JAG assertion. |

### `GoogleCloudAgentidentitycredentialsV1alpha_ExchangeCredentialsResponse`

- Response message for `ExchangeCredentials` containing the resulting credentials.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `acquireTime` | string (google-datetime) | Optional. The time when the token was acquired. |
| `expireTime` | string (google-datetime) | Optional. The expiration time of the exchanged access token. |
| `scopes` | array<string> | The scopes actually associated with the retrieved token. |
| `token` | string | The user-consented workforce access token resulting from the exchange. |

### `GoogleCloudAgentidentitycredentialsV1alpha_FinalizeCredentialsRequest`

- Request message for `FinalizeCredentials`.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `consentNonce` | string | Required. The same `consent_nonce` value that was provided during retrieval in the UriConsentRequired (https://cloud.google.com/iam/docs/reference/agentidentitycredentials/rest/v1/projects.locations.authProviders.credentials/retrieve#UriConsentRequired) metadata. |
| `userId` | string | Required. The identity of the end user. |
| `userIdValidationState` | string (byte) | Required. The encrypted state passed back from the consent flow. |

### `GoogleCloudAgentidentitycredentialsV1alpha_FinalizeCredentialsResponse`

- Response message for `FinalizeCredentials`. Intentionally empty.
- Version: v1alpha

### `GoogleCloudAgentidentitycredentialsV1alpha_Pending`

- Indicates that the credential retrieval is pending. The caller should retry the `RetrieveCredentials` request after some time.
- Version: v1alpha

### `GoogleCloudAgentidentitycredentialsV1alpha_RetrieveCredentialsRequest`

- Request message for `RetrieveCredentials`.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `continueUri` | string | Optional. The URI to redirect the user to after consent is completed. This field is required for auth providers using the 3-legged OAuth flow. For other auth provider types, this field is unused but not rejected. |
| `forceRefreshToken` | string | Optional. Input only. Set this field only if the previous token was expired or invalid. This value must be the full, previously returned token string. Setting this field triggers a refresh of the access token with a stored refresh token, if possible, or a new consent flow. |
| `scopes` | array<string> | Optional. The OAuth scopes required for this access. |
| `userId` | string | Required. The identity of the end user. |

### `GoogleCloudAgentidentitycredentialsV1alpha_RetrieveCredentialsResponse`

- Response message for `RetrieveCredentials`. Contains the access tokens and related artifacts.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `consentRejected` | GoogleCloudAgentidentitycredentialsV1alpha_ConsentRejected | Message indicating consent was rejected. |
| `pending` | GoogleCloudAgentidentitycredentialsV1alpha_Pending | Message indicating credential retrieval is pending. |
| `success` | GoogleCloudAgentidentitycredentialsV1alpha_Success | Message indicating credentials were successfully retrieved. |
| `uriConsentRequired` | GoogleCloudAgentidentitycredentialsV1alpha_UriConsentRequired | Message indicating URI-based consent is required. |

### `GoogleCloudAgentidentitycredentialsV1alpha_Success`

- Message indicating successful retrieval of credentials.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | The expiration time of the token. This does not guarantee that the token will be valid until this time, since the token could be revoked earlier. There could also be clock skew between the auth provider and the client so it may expire slightly earlier. If not set, the token might be permanent or it may be that the service does not (or cannot) know when it will expire. |
| `header` | string | The HTTP header name where the token should be placed. |
| `scopes` | array<string> | The scopes actually associated with the retrieved token. End users may have rejected some requested scopes, or the third-party authorization servers can return a different set of scopes than what was asked for. Callers should verify that all required scopes for their intended use are included in this list. |
| `token` | string | The retrieved access token or credential for the end user. On an MCP tool call, for an invalid token the OAuth spec states that this should return `401` or `403`, but MCP servers may implement this differently. If you get any flavor of `PERMISSION_DENIED`, retry your original request to `RetrieveCredentials` with force_refresh_token set to the expired/invalid token string, which will fetch a new token or initiate a new consent flow. |

### `GoogleCloudAgentidentitycredentialsV1alpha_TokenBinding`

- Configuration for binding downstream credentials to client communication channel properties.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `certificateFingerprint` | string | Optional. The base64url-encoded SHA-256 hash of the DER-encoded X.509 client certificate, as defined in RFC 8705 Section 3.1 (corresponding to "x5t#S256"). Format requirements: - Base64url encoding (RFC 4648 Section 5) using URL-safe characters ('-' and '\_') without padding ('='). - Exactly 43 characters long for a 256-bit SHA-256 digest. |

### `GoogleCloudAgentidentitycredentialsV1alpha_UriConsentRequired`

- Indicates that the user must visit the provided URI to consent to delegate permission to the agent to act on their behalf. The caller can either poll the `RetrieveCredentials` method, or await the /ValidateUserId callback.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `authorizationUri` | string | Output only. The URL where the user should be redirected to grant consent. This will always be present. |
| `consentNonce` | string | Output only. A one-time, randomly generated value that validates the entire consent flow is handled by a single user, avoiding CSRF attacks. It must be submitted with the `FinalizeCredentials` request to complete the OAuth exchange. This will always be present. Implemented per RFC 6819 Section 5.3.5 (https://www.rfc-editor.org/rfc/rfc6819#section-5.3.5). |
| `uid` | string | Output only. The unique ID of the credentials retrieval operation. |

### `GoogleCloudAgentidentitycredentialsV1beta_ConsentRejected`

- Indicates the user has rejected the permission delegation or canceled the request.
- Version: v1beta

### `GoogleCloudAgentidentitycredentialsV1beta_FinalizeCredentialsRequest`

- Request message for `FinalizeCredentials`.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `consentNonce` | string | Required. The same `consent_nonce` value that was provided during retrieval in the UriConsentRequired (https://cloud.google.com/iam/docs/reference/agentidentitycredentials/rest/v1/projects.locations.authProviders.credentials/retrieve#UriConsentRequired) metadata. |
| `userId` | string | Required. The identity of the end user. |
| `userIdValidationState` | string (byte) | Required. The encrypted state passed back from the consent flow. |

### `GoogleCloudAgentidentitycredentialsV1beta_FinalizeCredentialsResponse`

- Response message for `FinalizeCredentials`. Intentionally empty.
- Version: v1beta

### `GoogleCloudAgentidentitycredentialsV1beta_Pending`

- Indicates that the credential retrieval is pending. The caller should retry the `RetrieveCredentials` request after some time.
- Version: v1beta

### `GoogleCloudAgentidentitycredentialsV1beta_RetrieveCredentialsRequest`

- Request message for `RetrieveCredentials`.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `continueUri` | string | Optional. The URI to redirect the user to after consent is completed. This field is required for auth providers using the 3-legged OAuth flow. For other auth provider types, this field is unused but not rejected. |
| `forceRefreshToken` | string | Optional. Input only. Set this field only if the previous token was expired or invalid. This value must be the full, previously returned token string. Setting this field triggers a refresh of the access token with a stored refresh token, if possible, or a new consent flow. |
| `scopes` | array<string> | Optional. The OAuth scopes required for this access. |
| `userId` | string | Required. The identity of the end user. |

### `GoogleCloudAgentidentitycredentialsV1beta_RetrieveCredentialsResponse`

- Response message for `RetrieveCredentials`. Contains the access tokens and related artifacts.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `consentRejected` | GoogleCloudAgentidentitycredentialsV1beta_ConsentRejected | Message indicating consent was rejected. |
| `pending` | GoogleCloudAgentidentitycredentialsV1beta_Pending | Message indicating credential retrieval is pending. |
| `success` | GoogleCloudAgentidentitycredentialsV1beta_Success | Message indicating credentials were successfully retrieved. |
| `uriConsentRequired` | GoogleCloudAgentidentitycredentialsV1beta_UriConsentRequired | Message indicating URI-based consent is required. |

### `GoogleCloudAgentidentitycredentialsV1beta_Success`

- Message indicating successful retrieval of credentials.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | The expiration time of the token. This does not guarantee that the token will be valid until this time, since the token could be revoked earlier. There could also be clock skew between the auth provider and the client so it may expire slightly earlier. If not set, the token might be permanent or it may be that the service does not (or cannot) know when it will expire. |
| `header` | string | The HTTP header name where the token should be placed. |
| `scopes` | array<string> | The scopes actually associated with the retrieved token. End users may have rejected some requested scopes, or the third-party authorization servers can return a different set of scopes than what was asked for. Callers should verify that all required scopes for their intended use are included in this list. |
| `token` | string | The retrieved access token or credential for the end user. On an MCP tool call, for an invalid token the OAuth spec states that this should return `401` or `403`, but MCP servers may implement this differently. If you get any flavor of `PERMISSION_DENIED`, retry your original request to `RetrieveCredentials` with force_refresh_token set to the expired/invalid token string, which will fetch a new token or initiate a new consent flow. |

### `GoogleCloudAgentidentitycredentialsV1beta_UriConsentRequired`

- Indicates that the user must visit the provided URI to consent to delegate permission to the agent to act on their behalf. The caller can either poll the `RetrieveCredentials` method, or await the /ValidateUserId callback.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `authorizationUri` | string | Output only. The URL where the user should be redirected to grant consent. This will always be present. |
| `consentNonce` | string | Output only. A one-time, randomly generated value that validates the entire consent flow is handled by a single user, avoiding CSRF attacks. It must be submitted with the `FinalizeCredentials` request to complete the OAuth exchange. This will always be present. Implemented per RFC 6819 Section 5.3.5 (https://www.rfc-editor.org/rfc/rfc6819#section-5.3.5). |
| `uid` | string | Output only. The unique ID of the credentials retrieval operation. |

### Shape of `GoogleCloudAgentidentitycredentialsV1_FinalizeCredentialsRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "consentNonce": "string",
  "userId": "string",
  "userIdValidationState": "string (byte)"
}
```

## Notes

- Generated from the Discovery document(s) of `agentidentitycredentials` (retrieved 2026-11-14); a type shared by several versions shows the preferred version.
- Source: https://agentidentitycredentials.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
