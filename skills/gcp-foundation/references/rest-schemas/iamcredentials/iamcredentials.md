---
source: https://iamcredentials.googleapis.com/$discovery/rest?version=v1
---

# IAM Service Account Credentials API message schemas (iamcredentials)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/iamcredentials/`.

### `GenerateAccessTokenRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delegates` | array<string> | The sequence of service accounts in a delegation chain. This field is required for delegated requests (https://cloud.google.com/iam/help/credentials/delegated-request). For direct requests (https://cloud.google.com/iam/help/credentials/direct-request), which are more common, do not specify this field. Each service account must be granted the `roles/iam.serviceAccountTokenCreator` role on its next service account in the chain. The last service account in the chain must be granted the `roles/iam.serviceAccountTokenCreator` role on the service account that is specified in the `name` field of the request. The delegates must have the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. |
| `lifetime` | string (google-duration) | The desired lifetime duration of the access token in seconds. By default, the maximum allowed value is 1 hour. To set a lifetime of up to 12 hours, you can add the service account as an allowed value in an Organization Policy that enforces the `constraints/iam.allowServiceAccountCredentialLifetimeExtension` constraint. See detailed instructions at https://cloud.google.com/iam/help/credentials/lifetime If a value is not specified, the token's lifetime will be set to a default value of 1 hour. |
| `scope` | array<string> | Required. Code to identify the scopes to be included in the OAuth 2.0 access token. See https://developers.google.com/identity/protocols/googlescopes for more information. At least one value required. |

### `GenerateAccessTokenResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessToken` | string | The OAuth 2.0 access token. |
| `expireTime` | string (google-datetime) | Token expiration time. The expiration time is always set. |

### `GenerateIdTokenRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `audience` | string | Required. The audience for the token, such as the API or account that this token grants access to. |
| `delegates` | array<string> | The sequence of service accounts in a delegation chain. Each service account must be granted the `roles/iam.serviceAccountTokenCreator` role on its next service account in the chain. The last service account in the chain must be granted the `roles/iam.serviceAccountTokenCreator` role on the service account that is specified in the `name` field of the request. The delegates must have the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. |
| `includeEmail` | boolean | Include the service account email in the token. If set to `true`, the token will contain `email` and `email_verified` claims. |
| `organizationNumberIncluded` | boolean | Include the organization number of the service account in the token. If set to `true`, the token will contain a `google.organization_number` claim. The value of the claim will be `null` if the service account isn't associated with an organization. |

### `GenerateIdTokenResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `token` | string | The OpenId Connect ID token. The token is a JSON Web Token (JWT) that contains a payload with claims. See the JSON Web Token spec (https://tools.ietf.org/html/rfc7519) for more information. Here is an example of a decoded JWT payload: { "iss": "https://accounts.google.com", "iat": 1496953245, "exp": 1496953245, "aud": "https://www.example.com", "sub": "107517467455664443765", "azp": "107517467455664443765", "email": "my-iam-account@my-project.iam.gserviceaccount.com", "email_verified": true, "google": { "organization_number": 123456 } } |

### `ServiceAccountAllowedLocations`

- Represents a list of allowed locations for given service account.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encodedLocations` | string | Output only. The hex encoded bitmap of the trust boundary locations |
| `locations` | array<string> | Output only. The human readable trust boundary locations. For example, \["us-central1", "europe-west1"\] |

### `SignBlobRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delegates` | array<string> | The sequence of service accounts in a delegation chain. Each service account must be granted the `roles/iam.serviceAccountTokenCreator` role on its next service account in the chain. The last service account in the chain must be granted the `roles/iam.serviceAccountTokenCreator` role on the service account that is specified in the `name` field of the request. The delegates must have the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. |
| `payload` | string (byte) | Required. The bytes to sign. |

### `SignBlobResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyId` | string | The ID of the key used to sign the blob. The key used for signing will remain valid for at least 12 hours after the blob is signed. To verify the signature, you can retrieve the public key in several formats from the following endpoints: - RSA public key wrapped in an X.509 v3 certificate: `https://www.googleapis.com/service_accounts/v1/metadata/x509/{ACCOUNT_EMAIL}` - Raw key in JSON format: `https://www.googleapis.com/service_accounts/v1/metadata/raw/{ACCOUNT_EMAIL}` - JSON Web Key (JWK): `https://www.googleapis.com/service_accounts/v1/metadata/jwk/{ACCOUNT_EMAIL}` |
| `signedBlob` | string (byte) | The signature for the blob. Does not include the original blob. After the key pair referenced by the `key_id` response field expires, Google no longer exposes the public key that can be used to verify the blob. As a result, the receiver can no longer verify the signature. |

### `SignJwtRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delegates` | array<string> | The sequence of service accounts in a delegation chain. Each service account must be granted the `roles/iam.serviceAccountTokenCreator` role on its next service account in the chain. The last service account in the chain must be granted the `roles/iam.serviceAccountTokenCreator` role on the service account that is specified in the `name` field of the request. The delegates must have the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. |
| `payload` | string | Required. The JWT payload to sign. Must be a serialized JSON object that contains a JWT Claims Set. For example: `{"sub": "user@example.com", "iat": 313435}` If the JWT Claims Set contains an expiration time (`exp`) claim, it must be an integer timestamp that is not in the past and no more than 12 hours in the future. |

### `SignJwtResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyId` | string | The ID of the key used to sign the JWT. The key used for signing will remain valid for at least 12 hours after the JWT is signed. To verify the signature, you can retrieve the public key in several formats from the following endpoints: - RSA public key wrapped in an X.509 v3 certificate: `https://www.googleapis.com/service_accounts/v1/metadata/x509/{ACCOUNT_EMAIL}` - Raw key in JSON format: `https://www.googleapis.com/service_accounts/v1/metadata/raw/{ACCOUNT_EMAIL}` - JSON Web Key (JWK): `https://www.googleapis.com/service_accounts/v1/metadata/jwk/{ACCOUNT_EMAIL}` |
| `signedJwt` | string | The signed JWT. Contains the automatically generated header; the client-supplied payload; and the signature, which is generated using the key referenced by the `kid` field in the header. After the key pair referenced by the `key_id` response field expires, Google no longer exposes the public key that can be used to verify the JWT. As a result, the receiver can no longer verify the signature. |

### `WorkforcePoolAllowedLocations`

- Represents a list of allowed locations for given workforce pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encodedLocations` | string | Output only. The hex encoded bitmap of the trust boundary locations |
| `locations` | array<string> | Output only. The human readable trust boundary locations. For example, \["us-central1", "europe-west1"\] |

### `WorkloadIdentityPoolAllowedLocations`

- Represents a list of allowed locations for given workload identity pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encodedLocations` | string | Output only. The hex encoded bitmap of the trust boundary locations |
| `locations` | array<string> | Output only. The human readable trust boundary locations. For example, \["us-central1", "europe-west1"\] |

### Shape of `GenerateAccessTokenRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "delegates": "array<string>",
  "lifetime": "string (google-duration)",
  "scope": "array<string>"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `iamcredentials` (retrieved 2026-11-14); a type shared by several versions shows the preferred version, and each type's `Version` line names the document it was taken from.
- Source: https://iamcredentials.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
