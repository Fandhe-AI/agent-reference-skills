---
source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst
---

# External Account Credentials (Workload Identity Federation)

With workload identity federation an application outside Google Cloud (AWS, Microsoft Azure, any OpenID Connect provider, or X.509 certificates) can access Google Cloud resources by impersonating a service account, eliminating the maintenance and security burden of service account keys. The generated credential configuration file holds only non-sensitive metadata that tells the library how to fetch external subject tokens and exchange them for service account access tokens.

## Signature / Usage

### Using external identities with ADC

Generate the JSON credential configuration for your external identity, then point the environment variable at it:

Adapted (not in the official docs): removed the `$` shell prompt so the command can be pasted.

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/config.json
```

The library then picks the right client type from the configuration file:

```python
import google.auth

credentials, project = google.auth.default()
```

### Explicit clients: Azure and OIDC providers

Use `identity_pool.Credentials.from_info` or `identity_pool.Credentials.from_file`:

```python
import json

from google.auth import identity_pool

json_config_info = json.loads(function_to_get_json_config())
credentials = identity_pool.Credentials.from_info(json_config_info)
scoped_credentials = credentials.with_scopes(
    ['https://www.googleapis.com/auth/cloud-platform'])
```

### Explicit clients: AWS providers

Use `aws.Credentials.from_info` or `aws.Credentials.from_file`:

```python
import json

from google.auth import aws

json_config_info = json.loads(function_to_get_json_config())
credentials = aws.Credentials.from_info(json_config_info)
scoped_credentials = credentials.with_scopes(
    ['https://www.googleapis.com/auth/cloud-platform'])
```

### X.509 certificate-sourced credentials

Two files are needed: a credential configuration file and a certificate configuration file. Default behavior (recommended): omit `--credential-cert-configuration-output-file` and gcloud writes the certificate configuration to a well-known default path that the library discovers.

Adapted (not in the official docs): the pool path and `$SERVICE_ACCOUNT_EMAIL` are quoted, like the certificate paths on the following lines.

```bash
gcloud iam workload-identity-pools create-cred-config \
    "projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$POOL_ID/providers/$PROVIDER_ID" \
    --service-account "$SERVICE_ACCOUNT_EMAIL" \
    --credential-cert-path "$PATH_TO_CERTIFICATE" \
    --credential-cert-private-key-path "$PATH_TO_PRIVATE_KEY" \
    --credential-cert-trust-chain-path "$PATH_TO_TRUST_CHAIN" \
    --output-file /path/to/config.json
```

Custom location: use `--credential-cert-configuration-output-file` to store the certificate configuration elsewhere. The credential configuration then contains a `"certificate_config_location"` field instead of `"use_default_certificate_config": true`.

Adapted (not in the official docs): the pool path and `$SERVICE_ACCOUNT_EMAIL` are quoted, like the certificate paths on the following lines.

```bash
gcloud iam workload-identity-pools create-cred-config \
    "projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$POOL_ID/providers/$PROVIDER_ID" \
    --service-account "$SERVICE_ACCOUNT_EMAIL" \
    --credential-cert-path "$PATH_TO_CERTIFICATE" \
    --credential-cert-private-key-path "$PATH_TO_PRIVATE_KEY" \
    --credential-cert-trust-chain-path "$PATH_TO_TRUST_CHAIN" \
    --credential-cert-configuration-output-file "/custom/path/cert_config.json" \
    --output-file /path/to/config.json
```

## Options / Props

### Requirements per provider

| Provider | Requirements |
|----------|--------------|
| AWS | Workload identity pool; AWS added as provider (org policy must allow it); permission to impersonate a service account granted to the external identity; credential configuration file generated. For IMDSv2, add `"imdsv2_session_token_url": "http://169.254.169.254/latest/api/token"` to the `credential_source` section |
| Azure | Workload identity pool; Azure added as provider (org policy must allow it); Azure tenant configured for identity federation; impersonation permission granted; credential configuration file generated |
| OIDC | Workload identity pool; OIDC provider added (org policy must allow it); impersonation permission granted; credential configuration file generated. Tokens come from a local file or a local server |

### X.509 command variables

| Variable | Meaning |
|----------|---------|
| `$PROJECT_NUMBER` | Numeric project number (not the project ID string) |
| `$POOL_ID` / `$PROVIDER_ID` | Workload identity pool and provider IDs |
| `$SERVICE_ACCOUNT_EMAIL` | Service account to impersonate |
| `$PATH_TO_CERTIFICATE` | Leaf X.509 certificate |
| `$PATH_TO_PRIVATE_KEY` | Private key of the leaf certificate |
| `$PATH_TO_TRUST_CHAIN` | PEM trust chain with intermediate certificates (leaf optional) |

## Notes

- X.509 default output: `certificate_config.json` at the default gcloud configuration path (typically `~/.config/gcloud/certificate_config.json` on Linux and macOS, `%APPDATA%\gcloud\certificate_config.json` on Windows).
- OIDC token sources: file-sourced (a background process must keep refreshing the file before expiry, e.g. hourly for one-hour tokens; plain text or JSON) or URL-sourced (a local server hosts a GET endpoint returning the token as plain text or JSON; extra request headers may be specified).

- When using external identities with ADC, grant the service account the `roles/browser` role and enable the Cloud Resource Manager API on the project. `default()` auto-discovers the project ID using the impersonated credential; otherwise the project ID resolves to `None`. Override detection with `GOOGLE_CLOUD_PROJECT`.
- Security: the library performs no validation of the `token_url`, `token_info_url` or `service_account_impersonation_url` fields. Do not use a credential configuration you did not generate with the gcloud CLI unless you verify the URL fields point to a `googleapis.com` domain. Validate configurations from external sources before use.
- `function_to_get_json_config()` is a placeholder (fragment). The X.509 certificate has a built-in expiry and must be renewed; its private key must be kept secret and never printed.
- Executable-sourced credentials: see [external-account-executable.md](./external-account-executable.md). Custom suppliers: see [external-account-custom-suppliers.md](./external-account-custom-suppliers.md).
- AWS environment variables read by the library (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`, `AWS_REGION`, `AWS_DEFAULT_REGION`); when absent the AWS metadata server is used.
- Corrected from the official docs: `$ export GOOGLE_APPLICATION_CREDENTIALS=/path/to/config.json`.
- Adapted from the official docs: both X.509 commands passed the unquoted `projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$POOL_ID/providers/$PROVIDER_ID \` and `--service-account $SERVICE_ACCOUNT_EMAIL \`.
- Setting up the pool, provider and IAM bindings belongs to `gcp-foundation`.
- Applies to google-auth 2.62.2 (PyPI); Python `>=3.10`.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/auth/environment_vars.py (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)

## Related

- [external-account-executable.md](./external-account-executable.md)
- [external-account-custom-suppliers.md](./external-account-custom-suppliers.md)
- [workforce-identity-federation.md](./workforce-identity-federation.md)
- [impersonated-credentials.md](./impersonated-credentials.md)
