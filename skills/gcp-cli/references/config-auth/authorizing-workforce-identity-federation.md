---
source: https://docs.cloud.google.com/sdk/docs/authorizing
---

# Authorize the gcloud CLI: Workforce Identity Federation

How to sign in to the gcloud CLI using Workforce Identity Federation, with a browser-based flow or a headless flow (OIDC or SAML). Part 2 of 4 of the official Authorize page.

## Signature / Usage

### gcloud CLI browser-based sign-in

1. Create a login configuration file. You can optionally activate the file as the default for the gcloud CLI by adding the `--activate` flag; you can then run `gcloud auth login` without specifying the configuration file path each time.

```bash
gcloud iam workforce-pools create-login-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/PROVIDER_ID \
    --output-file=LOGIN_CONFIG_FILE_PATH
```

Replace the following:

- `WORKFORCE_POOL_ID`: the workforce pool ID
- `PROVIDER_ID`: the provider ID
- `LOGIN_CONFIG_FILE_PATH`: the path to a configuration file that you specify, for example `login.json`

The file contains the endpoints used by the gcloud CLI to enable the browser-based authentication flow and set the audience to the IdP that was configured in the workforce identity pool provider. The file doesn't contain confidential information. The output looks similar to the following:

```json
{
  "type": "external_account_authorized_user_login_config",
  "audience": "//iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID",
  "auth_url": "https://auth.cloud.google/authorize",
  "token_url": "https://sts.googleapis.com/v1/oauthtoken",
  "token_info_url": "https://sts.googleapis.com/v1/introspect"
}
```

Caution: ensure that the contents of this file are correct and then safeguard the file, for example by making it read-only and restricting access with an ACL. The file isn't validated; a malicious actor with write access to this file can change the endpoints and intercept credentials.

To stop `gcloud auth login` from using this configuration file automatically, unset it with `gcloud config unset auth/login_config_file`.

2. Sign in using browser-based authentication. If you used the `--activate` flag, or activated the file with `gcloud config set auth/login_config_file`, the gcloud CLI uses your configuration file automatically:

```bash
gcloud auth login
```

To sign in by specifying the location of the configuration file:

```bash
gcloud auth login --login-config=LOGIN_CONFIG_FILE_PATH
```

To use an environment variable to specify the location of the configuration file, set `CLOUDSDK_AUTH_LOGIN_CONFIG_FILE` to the configuration path.

To discontinue using the login configuration file: if you used `--activate` or `gcloud config set auth/login_config_file`, unset it:

```bash
gcloud config unset auth/login_config_file
```

Also clear the `CLOUDSDK_AUTH_LOGIN_CONFIG_FILE` environment variable, if it is set.

### gcloud CLI headless sign-in

#### OIDC

1. Sign a user in to your IdP app and get the OIDC token (see your IdP's OIDC documentation).
2. Save the OIDC token returned by IdP in a secure location on your local machine.
3. Generate a configuration file by running the following command:

```
gcloud iam workforce-pools create-cred-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/PROVIDER_ID \
    --subject-token-type="urn:ietf:params:oauth:token-type:id_token" \
    --credential-source-file="PATH_TO_OIDC_ID_TOKEN" \
    --workforce-pool-user-project="WORKFORCE_POOL_USER_PROJECT" \
    --output-file="config.json"
```

Replace the following:

- `WORKFORCE_POOL_ID`: the workforce pool ID
- `PROVIDER_ID`: the provider ID
- `PATH_TO_OIDC_ID_TOKEN`: the path to the OIDC IdP credential file
- `WORKFORCE_POOL_USER_PROJECT`: the project number associated with the workforce pools user project

The principal must have `serviceusage.services.use` permission on this project. When you run the command, it produces an OIDC IdP config file formatted similar to the following:

Adapted (not in the official docs): `credential_source.file` uses `PATH_TO_OIDC_ID_TOKEN`, the same placeholder as the command, instead of the official `PATH_TO_OIDC_CREDENTIALS_FILE`.

```
{
  "type": "external_account",
  "audience": "//iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/PROVIDER_ID",
  "subject_token_type": "urn:ietf:params:oauth:token-type:id_token",
  "token_url": "https://sts.googleapis.com/v1/token",
  "workforce_pool_user_project": "WORKFORCE_POOL_USER_PROJECT",
  "credential_source": {
    "file": "PATH_TO_OIDC_ID_TOKEN"
  }
}
```

#### SAML

1. Sign a user in to your IdP app and get the SAML assertion (see your IdP's SAML documentation).
2. Save the SAML response returned by IdP in a secure location on your local machine, then store the path, as follows:

Adapted (not in the official docs): the official line assigns the variable its own name (`SAML_ASSERTION_PATH=SAML_ASSERTION_PATH`); the value is now the placeholder `PATH_TO_SAML_ASSERTION`.

```bash
SAML_ASSERTION_PATH="PATH_TO_SAML_ASSERTION"
```

3. To generate a configuration file, run the following command:

Adapted (not in the official docs): `--credential-source-file` reads the shell variable set above (`"${SAML_ASSERTION_PATH}"`) instead of the literal string `"SAML_ASSERTION_PATH"`, and `PROJECT_NUMBER` replaces the official `PROJECT_ID` because `--workforce-pool-user-project` takes the project number (see `gcloud iam workforce-pools create-cred-config --help`).

```
gcloud iam workforce-pools create-cred-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --subject-token-type="urn:ietf:params:oauth:token-type:saml2" \
    --credential-source-file="${SAML_ASSERTION_PATH}"  \
    --workforce-pool-user-project="PROJECT_NUMBER"  \
    --output-file="config.json"
```

Replace the following:

- `WORKFORCE_PROVIDER_ID`: the workforce provider ID you created earlier in this guide.
- `WORKFORCE_POOL_ID`: the workforce pool ID you created earlier in this guide.
- `PATH_TO_SAML_ASSERTION`: the path of the SAML assertion file.
- `PROJECT_NUMBER`: the project number of the workforce pools user project

The configuration file that is generated looks similar to the following:

Adapted (not in the official docs): `credential_source.file` shows `PATH_TO_SAML_ASSERTION` (the path the variable holds) and `workforce_pool_user_project` shows `PROJECT_NUMBER`, matching the command above.

```
{
  "type": "external_account",
  "audience": "//iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID",
  "subject_token_type": "urn:ietf:params:oauth:token-type:saml2",
  "token_url": "https://sts.googleapis.com/v1/token",
  "credential_source": {
    "file": "PATH_TO_SAML_ASSERTION"
  },
  "workforce_pool_user_project": "PROJECT_NUMBER"
}
```

#### Sign in with token exchange (OIDC and SAML)

```
gcloud auth login --cred-file="config.json"
```

`gcloud` then transparently exchanges your IdP credentials for temporary Google Cloud access tokens, allowing you to make other `gcloud` calls to Google Cloud. The output is similar to the following:

```
Authenticated with external account user credentials for:
[principal://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/subject/USER_ID].
```

To list the credentialed accounts and your currently active account:

```
gcloud auth list
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--activate` | flag (`gcloud iam workforce-pools create-login-config`) | Activates the login configuration file as the default for the gcloud CLI |
| `--output-file` | flag | Path of the generated login or credential configuration file |
| `--login-config` | flag (`gcloud auth login`) | Path of the login configuration file |
| `auth/login_config_file` | property | Login configuration file used automatically by `gcloud auth login` |
| `CLOUDSDK_AUTH_LOGIN_CONFIG_FILE` | environment variable | Login configuration file path |
| `--subject-token-type` | flag (`create-cred-config`) | `urn:ietf:params:oauth:token-type:id_token` (OIDC) or `urn:ietf:params:oauth:token-type:saml2` (SAML) |
| `--credential-source-file` | flag (`create-cred-config`) | File holding the OIDC token or SAML assertion |
| `--workforce-pool-user-project` | flag (`create-cred-config`) | Project number used as workforce pools user project (OIDC and SAML) |
| `--cred-file` | flag (`gcloud auth login`) | Credential configuration file used for token exchange |

## Notes

- Corrected from the official docs: the OIDC step uses three names for one path (`PATH_TO_OIDC_ID_TOKEN` in the command, `PATH_TO_OIDC_TOKEN` in the "Replace the following" list, `PATH_TO_OIDC_CREDENTIALS_FILE` in the generated file); this page uses `PATH_TO_OIDC_ID_TOKEN` throughout.
- Corrected from the official docs: the SAML step stores the path with `SAML_ASSERTION_PATH=SAML_ASSERTION_PATH` (a variable assigned its own name) and then passes the literal `--credential-source-file="SAML_ASSERTION_PATH"`, so the variable is never used; this page assigns `SAML_ASSERTION_PATH="PATH_TO_SAML_ASSERTION"`, passes `--credential-source-file="${SAML_ASSERTION_PATH}"`, and shows `PATH_TO_SAML_ASSERTION` as the `file` value in the generated JSON.
- Corrected from the official docs: the SAML example on the source page uses `PROJECT_ID` for `--workforce-pool-user-project`, but the flag help (gcloud 593.0.0) defines it as the client project number, matching the OIDC example; the command, replacement list and generated JSON here use `PROJECT_NUMBER`.
- Workforce Identity Federation design (pools, providers, IdP setup) belongs to the `gcp-foundation` skill; this page covers only the gcloud CLI sign-in commands.
- Source: https://docs.cloud.google.com/sdk/docs/authorizing (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [authorizing-user-account.md](./authorizing-user-account.md)
- [authorizing-service-accounts.md](./authorizing-service-accounts.md)
- [authorizing-accounts-credentials.md](./authorizing-accounts-credentials.md)
