---
source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-other-providers
---

# Workload Identity Federation with OIDC and SAML identity providers

Let external workloads exchange IdP credentials (OIDC tokens or SAML assertions) for short-lived Google Cloud credentials: IdP requirements, pool/provider creation, attribute mappings, access grants, and credential configuration files.

## Signature / Usage

### Create a workload identity pool

```bash
gcloud iam workload-identity-pools create POOL_ID \
    --location="global" \
    --description="DESCRIPTION" \
    --display-name="DISPLAY_NAME"
```

### OIDC provider

```bash
gcloud iam workload-identity-pools providers create-oidc WORKLOAD_PROVIDER_ID \
    --location="global" \
    --workload-identity-pool="POOL_ID" \
    --issuer-uri="ISSUER" \
    --discovery-uri="DISCOVERY_URI" \
    --allowed-audiences="AUDIENCE" \
    --attribute-mapping="MAPPINGS" \
    --attribute-condition="CONDITIONS" \
    --jwk-json-path="JWK_JSON_PATH" \
    --actor-providers="ACTOR_PROVIDERS"
```

### SAML provider

```bash
gcloud iam workload-identity-pools providers create-saml WORKLOAD_PROVIDER_ID \
    --location="global" \
    --workload-identity-pool="POOL_ID" \
    --idp-metadata-path="IDP_METADATA_PATH" \
    --attribute-mapping="MAPPINGS" \
    --attribute-condition="CONDITIONS"
```

### SAML assertion encryption keys

```bash
gcloud iam workload-identity-pools providers keys create KEY_ID \
    --workload-identity-pool WORKLOAD_POOL_ID \
    --provider WORKLOAD_PROVIDER_ID \
    --location global \
    --use encryption \
    --spec KEY_SPECIFICATION
```

```bash
gcloud iam workload-identity-pools providers keys describe KEY_ID \
    --workload-identity-pool WORKLOAD_POOL_ID \
    --provider WORKLOAD_PROVIDER_ID \
    --location global \
    --format "value(keyData.key)" \
    > CERTIFICATE_PATH
```

```bash
gcloud iam workload-identity-pools providers keys delete KEY_ID \
    --workload-identity-pool WORKLOAD_POOL_ID \
    --provider WORKLOAD_PROVIDER_ID \
    --location global
```

### Expected token audience

```text
https://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/WORKLOAD_PROVIDER_ID
```

### Attribute mappings and conditions

```text
google.subject=assertion.sub
google.subject=assertion.subject
attribute.actor_subject=assertion.act.sub,attribute.actor_issuer=assertion.act.iss
assertion.service_account==true
has(assertion.act) && assertion.act.iss == 'https://actor-idp.example.com'
assertion.act.sub == 'authorized-agent-worker'
assertion.attributes['https://example.com/SAML/Attributes/AllowGcpFederation'][0]=='true'
```

### Certificate-bound token claim (Preview)

```json
"cnf": {
  "x5t#S256": "BASE64URL_SHA256_CERT_FINGERPRINT"
}
```

### Delegation: may_act claim (Preview)

```json
"may_act": {
  "sub": "ACTOR_SUBJECT",
  "iss": "ACTOR_ISSUER"
}
```

### Grant direct resource access to federated identities

```bash
gcloud projects describe $(gcloud config get-value core/project) --format=value\(projectNumber\)
```

```bash
gcloud storage buckets add-iam-policy-binding BUCKET_ID \
    --role=roles/storage.objectViewer \
    --member="principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT"
```

```bash
gcloud storage buckets add-iam-policy-binding BUCKET_ID \
    --role=roles/storage.objectViewer \
    --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/group/GROUP"
```

```bash
gcloud storage buckets add-iam-policy-binding BUCKET_ID \
    --role=roles/storage.objectViewer \
    --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE"
```

### Or impersonate a service account (Workload Identity User)

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_EMAIL \
    --role=roles/iam.workloadIdentityUser \
    --member="principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT"
```

Also valid members: `principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/group/GROUP`, `.../attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE`, and by whole pool `.../POOL_ID/*`.

### Credential configuration files

Executable-sourced:

```bash
gcloud iam workload-identity-pools create-cred-config \
    projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/WORKLOAD_PROVIDER_ID \
    --service-account=SERVICE_ACCOUNT_EMAIL \
    --service-account-token-lifetime-seconds=SERVICE_ACCOUNT_TOKEN_LIFETIME \
    --sts-location=REGION \
    --output-file=FILEPATH.json \
    --executable-command=EXECUTABLE_COMMAND \
    --executable-timeout-millis=EXECUTABLE_TIMEOUT \
    --executable-output-file=EXECUTABLE_OUTPUT_FILE
```

File-sourced:

```bash
gcloud iam workload-identity-pools create-cred-config \
    projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/WORKLOAD_PROVIDER_ID \
    --service-account=SERVICE_ACCOUNT_EMAIL \
    --service-account-token-lifetime-seconds=SERVICE_ACCOUNT_TOKEN_LIFETIME \
    --sts-location=REGION \
    --output-file=FILEPATH.json \
    --credential-source-file=TOKEN_FILEPATH \
    --credential-source-type=SOURCE_TYPE \
    --credential-source-field-name=FIELD_NAME
```

URL-sourced:

```bash
gcloud iam workload-identity-pools create-cred-config \
    projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/WORKLOAD_PROVIDER_ID \
    --service-account=SERVICE_ACCOUNT_EMAIL \
    --service-account-token-lifetime-seconds=SERVICE_ACCOUNT_TOKEN_LIFETIME \
    --sts-location=REGION \
    --output-file=FILEPATH.json \
    --credential-source-url="TOKEN_URL" \
    --credential-source-headers="KEY_1=VALUE_1,KEY_2=VALUE_2" \
    --credential-source-type=SOURCE_TYPE \
    --credential-source-field-name=FIELD_NAME
```

Executable output (OIDC success / failure / SAML success):

```json
{
  "version": 1,
  "success": true,
  "token_type": "urn:ietf:params:oauth:token-type:id_token",
  "id_token": "HEADER.PAYLOAD.SIGNATURE",
  "expiration_time": 1620499962
}
```

```json
{
  "version": 1,
  "success": false,
  "code": "401",
  "message": "Caller not authorized."
}
```

```json
{
  "version": 1,
  "success": true,
  "token_type": "urn:ietf:params:oauth:token-type:saml2",
  "saml_response": "...",
  "expiration_time": 1620499962
}
```

Use the configuration:

```bash
export GOOGLE_APPLICATION_CREDENTIALS=`pwd`/FILEPATH.json
```

```bash
gcloud auth login --cred-file=FILEPATH.json
```

## Options / Props

### IdP requirements

| IdP type | Requirements |
|---|---|
| OIDC | OpenID Connect 1.0; issuer URI; JWKS reachable via HTTPS discovery (`/.well-known/openid-configuration` appended to issuer, or custom `--discovery-uri`) or uploaded with `--jwk-json-path` (max 8 keys). Tokens signed `RS256` or `ES256`; `aud` equals the provider audience (or custom allowed audience); `exp` in the future, `iat` in the past, `exp - iat` at most 24 hours. |
| SAML | SAML 2.0; SP metadata document with signing certificate (ECDSA or RSA in X.509 v3; recommended ECDSAwithSHA256 or RSAwithSHA256 with 2048/3072/4096-bit keys; `notBefore` at most 7 days in the future, `notAfter` at most 25 years in the future). Max 3 signing certificates per provider. Either the assertion, the response, or both must be signed. |

Custom discovery URI (Preview): starts with `https://`, max 2,000 characters, scheme/host/port match the issuer, path contains `/.well-known/<suffix>` either inserted before or appended under the issuer path.

SAML assertion requirements: `Issuer` equals the configured Entity ID (format omitted or `urn:oasis:names:tc:SAML:2.0:nameid-format:entity`); `Subject` with `NameID` and exactly one bearer `SubjectConfirmation` whose `SubjectConfirmationData` has a future `NotOnOrAfter` and no `NotBefore`; `Conditions` with the audience above; at least one `AuthnStatement`; `SessionNotOnOrAfter` in the future or omitted. Responses contain exactly one assertion, `IssueInstant` less than 1 hour old, and StatusCode `urn:oasis:names:tc:SAML:2.0:status:Success`.

### create-oidc / create-saml flags

| Flag | Description |
|---|---|
| `--issuer-uri` | Issuer URI as defined in the OIDC metadata |
| `--discovery-uri` | Optional custom discovery URL (Preview) |
| `--allowed-audiences` | Expected ID token audience, often the client ID |
| `--attribute-mapping` | Comma-separated mappings; one must map to `google.subject` |
| `--attribute-condition` | Optional CEL condition; credential accepted only if true |
| `--jwk-json-path` | Optional uploaded JWKs; otherwise discovery URL is used |
| `--actor-providers` | Optional (Preview) comma-separated full provider resource names in the same pool authorized to issue actor tokens; max 3 |
| `--idp-metadata-path` | SAML only: local path to IdP metadata document |

### SAML attribute keywords

| Keyword | Meaning |
|---|---|
| `assertion.subject` | `NameID` of the authenticated user |
| `assertion.attributes['ATTRIBUTE_NAME']` | List of values of the named `<Attribute>` |

### SAML encryption algorithms

| Kind | Algorithms |
|---|---|
| Key transport | `http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p`, `http://www.w3.org/2009/xmlenc11#rsa-oaep`, `http://www.w3.org/2001/04/xmlenc#rsa-1_5` |
| Block encryption | `aes128-cbc`, `aes192-cbc`, `aes256-cbc` (xmlenc#), `aes128-gcm`, `aes256-gcm` (xmlenc11#) |

`KEY_SPECIFICATION`: `rsa-2048`, `rsa-3072`, `rsa-4096`.

### Executable-sourced credentials environment variables

| Variable | Description |
|---|---|
| `GOOGLE_EXTERNAL_ACCOUNT_AUDIENCE` | Audience from the configuration; always present |
| `GOOGLE_EXTERNAL_ACCOUNT_TOKEN_TYPE` | Expected subject token type; always present |
| `GOOGLE_EXTERNAL_ACCOUNT_IMPERSONATED_EMAIL` | Service account email; only with impersonation |
| `GOOGLE_EXTERNAL_ACCOUNT_OUTPUT_FILE` | Output file location; only if specified |
| `GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES` | You must set it to `1` to enable executable-sourced credentials |

### create-cred-config flags

| Flag | Description |
|---|---|
| `--service-account` | Omit if not using impersonation |
| `--service-account-token-lifetime-seconds` | Default 1 hour; longer requires `constraints/iam.allowServiceAccountCredentialLifetimeExtension` |
| `--sts-location` | Optional region of regional STS endpoints |
| `--executable-timeout-millis` | Default 30s |
| `--credential-source-type` | `text` (default) or `json`; with `json` use `--credential-source-field-name` |

### Minimum library versions

| Tool | Version |
|---|---|
| C++ | v2.6.0, gRPC 1.36.0+ |
| Go | `golang.org/x/oauth2` v0.0.0-20210218202405-ba52d332ba99+ |
| Java | `google-auth-library-oauth2-http` 0.24.0+ |
| Node.js | `google-auth-library` 7.0.2+ |
| Python | `google-auth` 1.27.0+ |
| gcloud | 363.0.0+ (bq: 390.0.0+) |
| Terraform Google provider | 3.61.0+ |

## Notes

- Pool and provider setup is once per IdP; one pool/provider can serve many workloads and projects. The `gcp-` prefix is reserved in pool and provider IDs.
- Map `google.subject` to an immutable unique claim (`sub` / `NameID`); avoid email, which can be reassigned.
- Identity delegation (RFC 8693 actor tokens), certificate-bound tokens and Context-Aware Access enforcement are Preview. With delegation only the subject provider's mappings and conditions are evaluated; actor provider must be in the same pool; actor token `aud` must contain only that provider's resource URI; `sub`/`iss` must match `may_act`; certificate-bound subject tokens require a certificate-bound actor token.
- Opaque tokens and token introspection are not supported. Access tokens, if used instead of ID tokens, must be JWT-formatted with an issuer claim resolving to `ISSUER/.well-known/openid-configuration`.
- Updating JWKs with `--jwk-json-path` replaces all uploaded keys (not restorable); pass an empty file plus `--issuer-uri` to return to discovery. Rotate uploaded JWKs regularly.
- Direct resource access is recommended; some products have API limitations (see federated identity supported services), in which case impersonate a service account. Use the project number, not the project ID, in member identifiers. For service accounts in another project, add the principal on that service account.
- Use a dedicated service account per workload; enable IAM, Security Token Service and Service Account Credentials APIs.
- A credential configuration file contains no private key and need not be kept confidential. File-sourced tokens must be refreshed before expiry. Node.js and Python auto-detect the project ID only if the service account has `roles/browser` (or equivalent); else set a project ID or `GOOGLE_CLOUD_PROJECT`.
- AWS/Azure workloads use the dedicated guide; AD FS has its own guide; AWS outbound identity federation follows the OIDC instructions.
- Source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-other-providers
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [wif-other-clouds-and-kubernetes.md](./wif-other-clouds-and-kubernetes.md)
- [wif-troubleshooting.md](./wif-troubleshooting.md)
- gcp-client-libraries covers ADC code; gcp-security covers VPC Service Controls.
