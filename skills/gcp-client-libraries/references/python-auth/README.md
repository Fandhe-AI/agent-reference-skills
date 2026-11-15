# python-auth

| Name | Description | Path |
| --- | --- | --- |
| credential-types | Service, user and external account types; capability and transport index of google-auth | [credential-types.md](./credential-types.md) |
| adc-default | Application Default Credentials via `google.auth.default()`, lookup order, env vars | [adc-default.md](./adc-default.md) |
| service-account-credentials | Service account private key files, with the key-secrecy warning | [service-account-credentials.md](./service-account-credentials.md) |
| user-credentials | OAuth 2.0 user credentials with `google.oauth2.credentials` | [user-credentials.md](./user-credentials.md) |
| compute-engine-credentials | Compute Engine and App Engine metadata-based credentials | [compute-engine-credentials.md](./compute-engine-credentials.md) |
| external-account-wif | Workload identity federation: AWS, Azure, OIDC, X.509, ADC usage | [external-account-wif.md](./external-account-wif.md) |
| external-account-executable | Executable-sourced credentials: gcloud config, response format, executable env vars | [external-account-executable.md](./external-account-executable.md) |
| external-account-custom-suppliers | Custom `SubjectTokenSupplier` (OIDC / SAML) and `AwsSecurityCredentialsSupplier` | [external-account-custom-suppliers.md](./external-account-custom-suppliers.md) |
| workforce-identity-federation | Workforce pools with OIDC / SAML: file, URL, executable, custom supplier | [workforce-identity-federation.md](./workforce-identity-federation.md) |
| impersonated-credentials | Service account impersonation, delegates, lifetime | [impersonated-credentials.md](./impersonated-credentials.md) |
| downscoped-credentials | Credential Access Boundaries, token broker and consumer | [downscoped-credentials.md](./downscoped-credentials.md) |
| id-tokens | `fetch_id_token`, `IDTokenCredentials`, ID token verification | [id-tokens.md](./id-tokens.md) |
| api-key-credentials | `google.auth.api_key.Credentials` and the `x-goog-api-key` header (docstring-only) | [api-key-credentials.md](./api-key-credentials.md) |
| authenticated-requests | `AuthorizedSession`, `AuthorizedHttp`, gRPC authorized channels | [authenticated-requests.md](./authenticated-requests.md) |
