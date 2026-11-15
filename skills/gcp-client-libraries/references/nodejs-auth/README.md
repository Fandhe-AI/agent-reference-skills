# nodejs-auth

| Name | Description | Path |
|------|-------------|------|
| ADC and GoogleAuth | Application Default Credentials, `GoogleAuth` options and methods, deprecated key-file options | [adc-googleauth.md](./adc-googleauth.md) |
| OAuth2 client | `OAuth2Client` authorization-code flow, `generateAuthUrl`, refresh tokens | [oauth2-client.md](./oauth2-client.md) |
| OAuth2 tokens and API keys | `tokens` event, `getTokenInfo`, `apiKey`, `fromAPIKey` | [oauth2-tokens-api-keys.md](./oauth2-tokens-api-keys.md) |
| JWT and service account keys | `JWT` client, key-file and env-var loading, credential validation warning | [jwt-service-account.md](./jwt-service-account.md) |
| Compute | `Compute` client for the Google Cloud default or a named service account | [compute.md](./compute.md) |
| Workload Identity Federation | AWS / Azure / OIDC / X.509 external accounts, `ExternalAccountClient`, executable-sourced credentials | [workload-identity-federation.md](./workload-identity-federation.md) |
| External account custom suppliers | `AwsSecurityCredentialsSupplier`, `SubjectTokenSupplier`, `AwsClient`, `IdentityPoolClient` | [external-account-custom-suppliers.md](./external-account-custom-suppliers.md) |
| Workforce Identity Federation | OIDC / SAML workforce configurations, browser sign-in, custom supplier | [workforce-identity-federation.md](./workforce-identity-federation.md) |
| ID tokens | `getIdTokenClient` for Cloud Run / Functions / IAP, IAP token verification | [id-tokens.md](./id-tokens.md) |
| Impersonated credentials | `Impersonated` client, delegates, lifetime, gRPC client library use | [impersonated-credentials.md](./impersonated-credentials.md) |
| Downscoped credentials | `DownscopedClient` with Credential Access Boundaries, broker and consumer | [downscoped-credentials.md](./downscoped-credentials.md) |
| Proxy | `HTTPS_PROXY`, `transporter` and `transporterOptions` | [proxy.md](./proxy.md) |
