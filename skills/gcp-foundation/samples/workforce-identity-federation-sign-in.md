---
source: https://docs.cloud.google.com/iam/docs/workforce-console-sso
---

# Workforce Identity Federation: Console and gcloud Sign-In

Configure the IdP redirect URL, share the SSO link, and sign in to gcloud with a login configuration file.

## Signature / Usage

### Provider name to share with users

```
locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID
```

### Redirect URL to configure in the IdP

Use it as the OIDC `Redirect URL` / `Callback URL` or the SAML `Single sign-on URL` / ACS URL:

```
https://auth.cloud.google/signin-callback/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID
```

SAML IdP-initiated login, `Default RelayState`:

```
https://console.cloud.google/
```

### SSO link for users

```
https://auth.cloud.google/signin/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID?continueUrl=https://console.cloud.google/
```

### gcloud login configuration file

```bash
gcloud iam workforce-pools create-login-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --output-file=LOGIN_CONFIG_PATH
```

The generated file looks like:

```json
{
  "universe_domain": "googleapis.com",
  "universe_cloud_web_domain": "cloud.google",
  "type": "external_account_authorized_user_login_config",
  "audience": "//iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID",
  "auth_url": "https://auth.cloud.google/authorize",
  "token_url": "https://sts.googleapis.com/v1/oauthtoken",
  "token_info_url": "https://sts.googleapis.com/v1/introspect"
}
```

Sign in:

```bash
gcloud auth login --login-config="LOGIN_CONFIG_FILE_PATH"
```

If the file was activated with `--activate` when created:

```bash
gcloud auth login
```

## Options / Props

| Name | Description |
|------|-------------|
| `WORKFORCE_POOL_ID` | Workforce identity pool ID |
| `WORKFORCE_PROVIDER_ID` | Workforce identity pool provider ID |
| `LOGIN_CONFIG_PATH` | Output path, e.g. `login-config.json` |
| `--activate` | Makes the login config the gcloud default so `gcloud auth login` needs no path |

## Notes

- The login configuration file has no secrets but is not validated: a writer could change endpoints and intercept credentials. Make it read-only and restrict access.
- The console (federated) shows only products that support Workforce Identity Federation; the regular console gives full access depending on roles.
- Workforce Identity Federation is for people (employees, partners); Workload Identity Federation is for workloads such as CI pipelines.
- Source: https://docs.cloud.google.com/iam/docs/workforce-console-sso (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/workforce-log-in-gcloud (retrieved 2026-11-14)

## Related

- [workforce-console-and-gcloud-sign-in.md](../references/iam-guides/workforce-identity-federation/workforce-console-and-gcloud-sign-in.md)
- [workforce-identity-federation-overview.md](../references/iam-guides/workforce-identity-federation/workforce-identity-federation-overview.md)
- [workforce-credentials-and-troubleshooting.md](../references/iam-guides/workforce-identity-federation/workforce-credentials-and-troubleshooting.md)
