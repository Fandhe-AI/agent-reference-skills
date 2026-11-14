---
source: https://docs.cloud.google.com/iam/docs/workforce-console-sso
---

# Workforce sign-in: console (federated) and gcloud CLI

Set up IdP redirect URLs for the Google Cloud Workforce Identity Federation console (console (federated)), tell users how to sign in, and sign in to the gcloud CLI with a login configuration file.

## Signature / Usage

Provider name to share with users:

```
locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID
```

Redirect URL to configure in the IdP (OIDC `Redirect URL` / `Callback URL`, SAML `Single sign-on URL` / ACS URL):

```
https://auth.cloud.google/signin-callback/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID
```

SAML IdP-initiated login: set `Default RelayState` to:

```
https://console.cloud.google/
```

SSO link for users (skips the provider-name prompt):

```
https://auth.cloud.google/signin/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID?continueUrl=https://console.cloud.google/
```

Or send users to `https://console.cloud.google/` and have them enter the provider name on first access.

Create a gcloud login configuration file:

```bash
gcloud iam workforce-pools create-login-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --output-file=LOGIN_CONFIG_PATH
```

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
| `WORKFORCE_POOL_ID` | Workforce identity pool ID. |
| `WORKFORCE_PROVIDER_ID` | Workforce identity pool provider ID. |
| `LOGIN_CONFIG_PATH` | Output path, e.g. `login-config.json`. |
| `--activate` | Makes the login config the gcloud default so `gcloud auth login` needs no path. |

## Notes

- Configure attribute mapping for personalization (display name, photo) in the console (federated).
- The console (federated) shows only Google Cloud products that support Workforce Identity Federation, possibly with UI limitations; the regular Google Cloud console gives full access depending on roles. See supported products and limitations in the official docs.
- The login configuration file contains no secrets but is not validated: a writer can change endpoints and intercept credentials. Verify contents, make it read-only, and restrict access with an ACL.
- Users can obtain the pool and provider IDs, an existing login config path, or the file contents from an administrator; administrators can list pools and providers to find IDs.
- Source: https://docs.cloud.google.com/iam/docs/workforce-console-sso and https://docs.cloud.google.com/iam/docs/workforce-log-in-gcloud (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [Workforce Identity Federation with Microsoft Entra ID](./workforce-entra-id.md)
- [Workforce Identity Federation with Okta](./workforce-okta.md)
- [Workforce credentials and troubleshooting](./workforce-credentials-and-troubleshooting.md)
