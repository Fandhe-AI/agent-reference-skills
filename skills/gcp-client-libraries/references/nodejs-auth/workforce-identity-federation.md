---
source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md#workforce-identity-federation
---

# Workforce Identity Federation

Workforce identity federation lets a workforce (employees, partners, contractors) use an external OIDC or SAML 2.0 identity provider (Azure AD, AD FS, Okta, ...) to authenticate to Google Cloud through IAM, with syncless, attribute-based single sign-on. The generated credential configuration file holds only non-sensitive metadata. Pool and provider setup is covered by the `gcp-foundation` skill.

## Signature / Usage

### Generate a configuration (file-sourced SAML)

Variables: `$WORKFORCE_POOL_ID`, `$PROVIDER_ID`, `$PATH_TO_SAML_ASSERTION` (file with the base64-encoded SAML assertion), `$WORKFORCE_POOL_USER_PROJECT` (the project number of the workforce pool user project).

Adapted (not in the official docs): quoted the shell variables so values with spaces stay one argument.

```bash
# Generate a SAML configuration file for file-sourced credentials.
gcloud iam workforce-pools create-cred-config \
    "locations/global/workforcePools/$WORKFORCE_POOL_ID/providers/$PROVIDER_ID" \
    --credential-source-file="$PATH_TO_SAML_ASSERTION" \
    --subject-token-type=urn:ietf:params:oauth:token-type:saml2 \
    --workforce-pool-user-project="$WORKFORCE_POOL_USER_PROJECT" \
    --output-file=/path/to/generated/config.json
```

### Generate a configuration (URL-sourced OIDC)

A local server hosts a GET endpoint returning the OIDC token (plain text or JSON); `$HEADER_KEY=$HEADER_VALUE` adds request headers, for example `Metadata-Flavor=Google`.

Adapted (not in the official docs): quoted the shell variables so values with spaces stay one argument.

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

### Browser sign-in (external account authorized user)

Signs in through the gcloud CLI and stores an external account authorized user configuration at the well-known ADC location; the library uses its refresh token to generate and refresh access tokens.

Adapted (not in the official docs): quoted the shell variables so values with spaces stay one argument.

```bash
gcloud auth application-default login --login-config="$LOGIN_CONFIG"
```

`$LOGIN_CONFIG` is the login config file generated with the cloud console or `gcloud iam workforce-pools create-login-config`.

### Custom subject token supplier (OIDC or SAML 2.0)

Implement `SubjectTokenSupplier` for tokens the library cannot fetch natively; the client does not cache the token. Replace `$WORKFORCE_POOL_ID` and `$PROVIDER_ID`.

Adapted (not in the official docs): the README ended with `new CustomSupplier(clientOptions)`, which constructs the supplier rather than a client; it now constructs an `IdentityPoolClient`.

```ts
class CustomSupplier implements SubjectTokenSupplier {
  async getSubjectToken(
    context: ExternalAccountSupplierContext
  ): Promise<string> {
    const audience = context.audience;
    const subjectTokenType = context.subjectTokenType;
    // Return a valid subject token for the requested audience and subject token type.
  }
}

const clientOptions = {
  audience: '//iam.googleapis.com/locations/global/workforcePools/$WORKFORCE_POOL_ID/providers/$PROVIDER_ID', // Set the GCP audience.
  subject_token_type: 'urn:ietf:params:oauth:token-type:id_token', // Set the subject token type.
  subject_token_supplier: new CustomSupplier() // Set the custom supplier.
}

const client = new IdentityPoolClient(clientOptions);
```

## Options / Props

| Name | Description |
|------|-------------|
| Token sources | File-sourced (a background process refreshes the file before expiry, text or JSON), URL-sourced, or executable-sourced. |
| `--workforce-pool-user-project` | Project number of the workforce pools user project, passed to `gcloud iam workforce-pools create-cred-config`. |
| File OIDC | `--subject-token-type=urn:ietf:params:oauth:token-type:id_token`, `--credential-source-file`, optional `--credential-source-type "json"` and `--credential-source-field-name "id_token"` (required for json; default is text). |
| Executable | `--subject-token-type`, `--executable-command` (absolute path, with arguments), `--executable-timeout-millis` (default 30 s, min 5 s, max 2 min), `--executable-output-file`. Requires `GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES=1`. The executable response format and the `GOOGLE_EXTERNAL_ACCOUNT_*` variables are the same as in `workload-identity-federation.md`. |
| Browser sign-in refresh token | Default lifetime one hour, after which generate a new configuration with gcloud. Change it through the workforce pool session duration, up to 12 hours. |

## Notes

- Applies to google-auth-library 11.3.4 (npm), `node>=22`.
- Using the generated configuration with ADC (`GOOGLE_APPLICATION_CREDENTIALS`, `GoogleAuth`, `ExternalAccountClient.fromJSON`) is described in the "Using External Identities" section, reproduced in `workload-identity-federation.md`, including the security note that the library does not validate `token_url`, `token_info_url` or `service_account_impersonation_url`.
- Executable-sourced security: restrict access to the executable (it prints credentials to stdout) and make the configuration file non-modifiable; prefer file or URL sources. Never log executable output or tokens.
- Corrected from the official docs: original line `const client = new CustomSupplier(clientOptions);` (README "Workforce Identity Federation" custom supplier section; it constructs the supplier, not an auth client).
- Corrected from the official docs: unquoted variables in the original gcloud lines, for example `locations/global/workforcePools/$WORKFORCE_POOL_ID/providers/$PROVIDER_ID \`, `--credential-source-headers $HEADER_KEY=$HEADER_VALUE \` and `gcloud auth application-default login --login-config=$LOGIN_CONFIG`.
- For the custom supplier, the README also names the workforce pool user project (the project number associated with the workforce pools user project); the client option is `workforce_pool_user_project` ("Required when using a workforce identity pool", `BaseExternalAccountClientOptions` in `baseexternalclient.d.ts`).
- Fragment: the `ts` block has no imports and `getSubjectToken` has no return statement. The supplier interfaces and options are described in `external-account-custom-suppliers.md`.
- Dropped: the file-sourced OIDC and executable gcloud blocks (the README puts `#` comment lines between `\` continuations, which would end the shell command); their flags are in the table. The file-sourced SAML and URL-sourced OIDC blocks above are verbatim. The URL-sourced SAML block is the same as the OIDC one with `--subject-token-type=urn:ietf:params:oauth:token-type:saml2` and `--credential-source-url=$URL_TO_GET_SAML_ASSERTION`.
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md (retrieved 2026-11-16; pinned at tag google-auth-library-v11.3.4, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/identitypoolclient.ts (pinned at tag google-auth-library-v11.3.4)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/baseexternalclient.ts (pinned at tag google-auth-library-v11.3.4)

## Related

- [workload-identity-federation.md](./workload-identity-federation.md)
- [external-account-custom-suppliers.md](./external-account-custom-suppliers.md)
- [adc-googleauth.md](./adc-googleauth.md)
