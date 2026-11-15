---
source: https://docs.cloud.google.com/sdk/gcloud/reference/auth
---

# Auth Commands

Copy-paste `gcloud auth` commands for listing, signing in, switching, and revoking gcloud CLI accounts, for the ADC login helper, and for printing tokens.

## Signature / Usage

### List credentialed accounts

```bash
gcloud auth list
```

```bash
gcloud auth list --filter=status:ACTIVE --format="value(account)"
```

```bash
gcloud auth list --filter="-status:ACTIVE account:test*" \
    --format="value(account)"
```

### Switch the active account

```bash
gcloud config set account ACCOUNT
```

### Sign in with a user account

```bash
gcloud auth login
```

```bash
gcloud auth login --no-browser
```

```bash
gcloud auth login --no-launch-browser
```

`--no-browser` is for a machine without a browser when you can run the gcloud CLI on another machine that has one; `--no-launch-browser` is for when you cannot.

### Sign in with a credential configuration file

```bash
gcloud auth login --cred-file=/path/to/configuration/file
```

```bash
gcloud auth login --login-config=/path/to/configuration/file
```

`--cred-file` takes a workload or workforce identity federation credential configuration file, or a service account key file (JSON). `--login-config` starts a browser-based workforce identity federation sign-in.

### Sign in with a service account key file

> **警告**: A service account key file is a long-lived secret. Keep it out of version control and shared directories, and delete it when no longer needed.

```bash
gcloud auth activate-service-account SERVICE_ACCOUNT@DOMAIN.COM \
    --key-file=/path/key.json --project=PROJECT_ID
```

The command also sets the project in the active configuration.

### Revoke credentials

> **警告**: `gcloud auth revoke` removes the stored credential from this machine and, for user accounts, revokes the token on the server. It does not delete a service account key (use `gcloud iam service-accounts keys delete` for that). Name the account explicitly, or try it only in a disposable environment.

```bash
gcloud auth revoke ACCOUNT
```

```bash
gcloud auth revoke
```

With no argument the command revokes the currently active account.

### Application Default Credentials (ADC) login helper

```bash
gcloud auth application-default login
```

```bash
gcloud auth application-default login \
    --client-id-file=clientid.json
```

```bash
gcloud auth application-default set-quota-project my-quota-project
```

> **警告**: The next command revokes the previously generated ADC credential; applications that rely on it lose access.

```bash
gcloud auth application-default revoke
```

ADC is separate from `gcloud auth login`: `gcloud auth application-default login` has no effect on the accounts set up by `gcloud auth login`.

### Print an access token

> **警告**: The token is a bearer credential printed to standard output. Do not paste it into tickets, chat, or CI logs.

```bash
gcloud auth print-access-token
```

### Print an identity token

```bash
gcloud auth print-identity-token
```

```bash
gcloud auth print-identity-token foo@example.com \
    --audiences="https://service-hash-uc.a.run.app"
```

```bash
gcloud auth print-identity-token \
    --impersonate-service-account="my-account@example.iam.gserviceaccount.com" --audiences="https://service-hash-uc.a.run.app"
```

```bash
gcloud auth print-identity-token \
    --impersonate-service-account="my-account@example.iam.gserviceaccount.com" --include-email
```

`--include-email` is meant for impersonated service accounts.

### Register gcloud as a Docker credential helper

```bash
gcloud auth configure-docker
```

```bash
gcloud auth configure-docker gcr.io
```

## Notes

- `gcloud auth revoke --all` revokes every account in the credential store and signs out of all of them; do not run it unless that is the intent. Other flags worth knowing, see `gcloud auth login --help`: `--brief`, `--force`, `--update-adc`. For ADC, see `gcloud auth application-default login --help` (`--disable-quota-project`, `--scopes`, `--no-browser`) and `gcloud auth print-access-token --help` (`--lifetime`).
- `gcloud auth revoke` and `gcloud auth application-default revoke` remove stored credentials; `gcloud auth configure-docker` overwrites any existing `credHelper` entry in Docker's configuration file.
- `gcloud auth configure-docker` needs `docker` and `gcloud` on the same PATH, and does not work with Docker installed via Snap.
- The help text wraps the impersonation examples in the middle of the service account address; the blocks above join those lines.
- `gcloud auth login` and `gcloud auth application-default login` accept a positional `ACCOUNT`; reuse of a stored credential applies to user credentials only.
- ADC design, service account key policy, impersonation roles, and Workload Identity Federation setup belong to the `gcp-foundation` skill. Client library authentication code belongs to the `gcp-client-libraries` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/list (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/login (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/activate-service-account (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/revoke (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/application-default (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/print-access-token (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/print-identity-token (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/configure-docker (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/docs/authorizing (retrieved 2026-11-14)

## Related

- [authorizing-user-account.md](../references/config-auth/authorizing-user-account.md)
- [authorizing-service-accounts.md](../references/config-auth/authorizing-service-accounts.md)
- [authorizing-workforce-identity-federation.md](../references/config-auth/authorizing-workforce-identity-federation.md)
- [authorizing-accounts-credentials.md](../references/config-auth/authorizing-accounts-credentials.md)
