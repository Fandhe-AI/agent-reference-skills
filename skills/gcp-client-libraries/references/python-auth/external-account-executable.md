---
source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst
---

# External Accounts: Executable-Sourced Credentials

For workload identity federation, the subject token (OIDC ID token or SAML assertion) can come from a local executable that the library runs. The executable must write a valid, unexpired OIDC ID token or SAML assertion as JSON to stdout. The environment variable `GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES` must be set to `1`.

## Signature / Usage

### Generate the credential configuration

Adapted (not in the official docs): the official fence has `#` comment lines between backslash-continued lines, which breaks the shell command; those comments were removed (the leading comment line is kept) and the optional flags moved to the Options table; every variable is quoted, and `$EXECUTABLE_COMMAND` must be quoted because it contains arguments.

```bash
# Generate a configuration file for executable-sourced credentials.
gcloud iam workload-identity-pools create-cred-config \
    "projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$POOL_ID/providers/$PROVIDER_ID" \
    --service-account="$SERVICE_ACCOUNT_EMAIL" \
    --subject-token-type="$SUBJECT_TOKEN_TYPE" \
    --executable-command="$EXECUTABLE_COMMAND" \
    --output-file /path/to/generated/config.json
```

### Executable response

Successful OIDC response:

```json
{
  "version": 1,
  "success": true,
  "token_type": "urn:ietf:params:oauth:token-type:id_token",
  "id_token": "HEADER.PAYLOAD.SIGNATURE",
  "expiration_time": 1620499962
}
```

A successful SAML response has the same shape, with `"token_type": "urn:ietf:params:oauth:token-type:saml2"` and `"saml_response": "..."` in place of `id_token` (block omitted for size).

Error response (`code` and `message` are both required and become part of the thrown exception):

```json
{
  "version": 1,
  "success": false,
  "code": "401",
  "message": "Caller not authorized."
}
```

## Options / Props

### Executable flags and variables

| Name | Description |
|------|-------------|
| `--executable-command` | Required. Full command including arguments; must be an absolute path to the program (e.g. `"/path/to/command --foo=bar"`) |
| `--executable-timeout-millis` | Optional. How long to wait for the executable, in milliseconds. Default 30 seconds; minimum 5 seconds; maximum 2 minutes |
| `--executable-output-file` | Optional. Absolute path of a file caching the executable's JSON response. The library checks it before running the executable; the executable must write it, the library only reads it. If `expiration_time` is missing from the file, the response is considered expired and the executable is called |
| `$SUBJECT_TOKEN_TYPE` | The subject token type |
| `$PROJECT_NUMBER`, `$POOL_ID`, `$PROVIDER_ID`, `$SERVICE_ACCOUNT_EMAIL` | Project number, pool, OIDC or SAML provider, service account to impersonate |

### Executable response fields

| Field | Description |
|-------|-------------|
| `version` | Required. Only version `1` is supported |
| `success` | Required. `true`: token, token type and expiry present and exit code 0. `false`: `code` and `message` present and non-zero exit |
| `token_type` | `urn:ietf:params:oauth:token-type:jwt`, `urn:ietf:params:oauth:token-type:id_token` or `urn:ietf:params:oauth:token-type:saml2` |
| `id_token` / `saml_response` | The third-party OIDC token / SAML response (one is required on success) |
| `expiration_time` | Optional. Expiry in Unix epoch seconds |
| `code`, `message` | Error code string and message |

### Environment variables set when the executable runs

| Variable | Description |
|----------|-------------|
| `GOOGLE_EXTERNAL_ACCOUNT_AUDIENCE` | Audience from the credential configuration; always present |
| `GOOGLE_EXTERNAL_ACCOUNT_IMPERSONATED_EMAIL` | Service account email; only with service account impersonation |
| `GOOGLE_EXTERNAL_ACCOUNT_OUTPUT_FILE` | Output file location; only when specified in the configuration |

## Notes

- Security: access to the executable must be restricted because it displays credentials on stdout; the configuration file should not be modifiable (restrict write access so nothing alters the executable command). Never log the executable's output.
- Given the complexity, the official guide recommends file-sourced or URL-sourced credentials unless they do not meet your requirements.
- Source inconsistency: the guide says a successful response "must contain the 3rd party token, token type, and expiration", but also that `expiration_time` is optional (if the output file does not contain it, the response is treated as expired and the executable is called).
- Security: the library does not validate `token_url`, `token_info_url` or `service_account_impersonation_url`; see [external-account-wif.md](./external-account-wif.md).
- Adapted from the official docs: the `gcloud` command originally had comment lines such as `# Optional argument for the executable timeout. Defaults to 30s.` and `# --executable-output-file=$EXECUTABLE_OUTPUT_FILE \` between continued lines, and unquoted variables such as `--service-account=$SERVICE_ACCOUNT_EMAIL \` and `--executable-command=$EXECUTABLE_COMMAND \`.
- Custom Python suppliers (instead of an executable): see [external-account-custom-suppliers.md](./external-account-custom-suppliers.md).
- Applies to google-auth 2.62.2 (PyPI); Python `>=3.10`.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)

## Related

- [external-account-custom-suppliers.md](./external-account-custom-suppliers.md)
- [external-account-wif.md](./external-account-wif.md)
- [workforce-identity-federation.md](./workforce-identity-federation.md)
