---
source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst
---

# External Credentials: Workforce Identity Federation

Workforce identity federation lets a workforce (employees, partners, contractors) use an external identity provider that supports OIDC or SAML 2.0 (Azure AD, AD FS, Okta and others) to access Google Cloud services through IAM. A workforce identity pool and an OIDC or SAML 2.0 provider must exist; then generate a credential configuration file with the gcloud CLI. The file holds only non-sensitive metadata. The library reads subject tokens from a local file, a local server (URL) or an executable.

## Signature / Usage

### File-sourced OIDC

The token file must be refreshed by a background process before expiry (hourly for one-hour tokens); plain text or JSON.

Adapted (not in the official docs): the official fence has `#` comment lines inside the backslash-continued command, which breaks it; those comments were removed (the leading comment line is kept), the optional flags moved to the Options table, and every variable is quoted.

```bash
# Generate an OIDC configuration file for file-sourced credentials.
gcloud iam workforce-pools create-cred-config \
    "locations/global/workforcePools/$WORKFORCE_POOL_ID/providers/$PROVIDER_ID" \
    --subject-token-type=urn:ietf:params:oauth:token-type:id_token \
    --credential-source-file="$PATH_TO_OIDC_ID_TOKEN" \
    --workforce-pool-user-project="$WORKFORCE_POOL_USER_PROJECT" \
    --output-file=/path/to/generated/config.json
```

### File-sourced SAML

Adapted (not in the official docs): every variable is quoted so paths with spaces do not split the command.

```bash
# Generate a SAML configuration file for file-sourced credentials.
gcloud iam workforce-pools create-cred-config \
    "locations/global/workforcePools/$WORKFORCE_POOL_ID/providers/$PROVIDER_ID" \
    --credential-source-file="$PATH_TO_SAML_ASSERTION" \
    --subject-token-type=urn:ietf:params:oauth:token-type:saml2 \
    --workforce-pool-user-project="$WORKFORCE_POOL_USER_PROJECT" \
    --output-file=/path/to/generated/config.json
```

### URL-sourced OIDC

A local server hosts a GET endpoint returning the token (plain text or JSON); extra request headers may be set.

Adapted (not in the official docs): every variable is quoted so URLs or header values with spaces do not split the command.

```bash
# Generate an OIDC configuration file for URL-sourced credentials.
gcloud iam workforce-pools create-cred-config \
    "locations/global/workforcePools/$WORKFORCE_POOL_ID/providers/$PROVIDER_ID" \
    --subject-token-type=urn:ietf:params:oauth:token-type:id_token \
    --credential-source-url="$URL_TO_RETURN_OIDC_ID_TOKEN" \
    --credential-source-headers "$HEADER_KEY=$HEADER_VALUE" \
    --workforce-pool-user-project="$WORKFORCE_POOL_USER_PROJECT" \
    --output-file=/path/to/generated/config.json
```

### URL-sourced SAML

Adapted (not in the official docs): every variable is quoted so URLs or header values with spaces do not split the command, and the leading comment line is dropped because it wrongly says "file-sourced".

```bash
gcloud iam workforce-pools create-cred-config \
    "locations/global/workforcePools/$WORKFORCE_POOL_ID/providers/$PROVIDER_ID" \
    --subject-token-type=urn:ietf:params:oauth:token-type:saml2 \
    --credential-source-url="$URL_TO_GET_SAML_ASSERTION" \
    --credential-source-headers "$HEADER_KEY=$HEADER_VALUE" \
    --workforce-pool-user-project="$WORKFORCE_POOL_USER_PROJECT" \
    --output-file=/path/to/generated/config.json
```

### Executable-sourced

Requires `GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES=1`. The executable response format is the one in [external-account-executable.md](./external-account-executable.md).

Adapted (not in the official docs): the official fence has `#` comment lines inside the backslash-continued command, which breaks it; those comments were removed (the leading comment line is kept) and the optional flags moved to the Options table; every variable is quoted, and `$EXECUTABLE_COMMAND` must be quoted because it contains arguments.

```bash
# Generate a configuration file for executable-sourced credentials.
gcloud iam workforce-pools create-cred-config \
    "locations/global/workforcePools/$WORKFORCE_POOL_ID/providers/$PROVIDER_ID" \
    --subject-token-type="$SUBJECT_TOKEN_TYPE" \
    --executable-command="$EXECUTABLE_COMMAND" \
    --workforce-pool-user-project="$WORKFORCE_POOL_USER_PROJECT" \
    --output-file /path/to/generated/config.json
```

### Custom supplier

Same `SubjectTokenSupplier` mechanism as workload identity federation, plus `workforce_pool_user_project`:

Adapted (not in the official docs): the subject token type is `urn:ietf:params:oauth:token-type:jwt`; the official example passes `urn:ietf:params:aws:token-type:jwt`, which is not one of the token types the same guide allows.

```python
from google.auth import exceptions
from google.auth import identity_pool

class CustomSubjectTokenSupplier(identity_pool.SubjectTokenSupplier):

    def get_subject_token(self, context, request):
        audience = context.audience
        subject_token_type = context.subject_token_type
        try:
            # Attempt to return the valid subject token of the requested type for the requested audience.
        except Exception as e:
            # If token retrieval fails, raise a refresh error, setting retryable to true if the client should
            # attempt to retrieve the subject token again.
            raise exceptions.RefreshError(e, retryable=True)


supplier = CustomSubjectTokenSupplier()

credentials = identity_pool.Credentials(
    AUDIENCE, # Set GCP Audience.
    "urn:ietf:params:oauth:token-type:jwt", # Set subject token type.
    subject_token_supplier=supplier, # Set supplier.
    scopes=SCOPES, # Set desired scopes.
    workforce_pool_user_project=USER_PROJECT # Set workforce pool user project.
)
```

## Options / Props

| Name | Description |
|------|-------------|
| `$WORKFORCE_POOL_ID`, `$PROVIDER_ID` | Workforce pool and provider IDs |
| `$WORKFORCE_POOL_USER_PROJECT` | Project number of the workforce pools user project |
| `--credential-source-type "json"` | Optional for file sources. Default is `"text"` |
| `--credential-source-field-name "id_token"` | Optional; the JSON field holding the OIDC credential. Required for `json` |
| `--executable-timeout-millis` | Optional. Default 30 s, minimum 5 s, maximum 2 min |
| `--executable-output-file` | Optional. Absolute path of the cached executable response, read by the library before running the executable |
| `$HEADER_KEY=$HEADER_VALUE` | Extra headers on the URL GET request, e.g. `Metadata-Flavor=Google` |

## Notes

- Custom supplier audience: `//iam.googleapis.com/locations/global/workforcePools/$WORKFORCE_POOL_ID/providers/$PROVIDER_ID`; `USER_PROJECT` is the workforce pools user project number.
- Corrected from the official docs: the supplier example passed `"urn:ietf:params:aws:token-type:jwt", # Set subject token type.`; the guide's token type list allows only `urn:ietf:params:oauth:token-type:jwt`, `urn:ietf:params:oauth:token-type:id_token` and `urn:ietf:params:oauth:token-type:saml2`.
- Security: restrict access to an executable that prints credentials to stdout, and make the configuration file non-modifiable. File- or URL-sourced mechanisms are recommended over executables.
- Security: the library performs no validation on `token_url`, `token_info_url` or `service_account_impersonation_url`; do not use a configuration not generated by the gcloud CLI unless those URLs point to a `googleapis.com` domain.
- Fragments: the `try:` body is comment-only, and `AUDIENCE`, `SCOPES`, `USER_PROJECT` are undefined placeholders in the official example.
- Adapted from the official docs: the file-sourced OIDC command originally contained comment lines such as `# Optional arguments for file types. Default is "text":` and `# --credential-source-type "json" \` between continued lines, and the executable command contained `# --executable-timeout-millis=$EXECUTABLE_TIMEOUT \` and the unquoted `--executable-command=$EXECUTABLE_COMMAND \`; the comments were removed because they break the command.
- Adapted from the official docs: all five `gcloud` fences used unquoted variables, for example `locations/global/workforcePools/$WORKFORCE_POOL_ID/providers/$PROVIDER_ID \`, `--credential-source-file=$PATH_TO_SAML_ASSERTION \` and `--credential-source-headers $HEADER_KEY=$HEADER_VALUE \`; the URL-sourced SAML fence began with `# Generate a SAML configuration file for file-sourced credentials.`
- Source inconsistency: the official prose names `identity_pool.Credential`; the example uses `identity_pool.Credentials`. The URL-sourced SAML fence comment says "file-sourced credentials".
- Pool and provider setup belongs to `gcp-foundation`.
- Applies to google-auth 2.62.2 (PyPI); Python `>=3.10`.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)

## Related

- [external-account-wif.md](./external-account-wif.md)
- [external-account-executable.md](./external-account-executable.md)
- [external-account-custom-suppliers.md](./external-account-custom-suppliers.md)
