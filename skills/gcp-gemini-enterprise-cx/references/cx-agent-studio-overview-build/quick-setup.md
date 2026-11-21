---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/quick/setup
---

# CX Agent Studio Setup

Required setup steps to start using CX Agent Studio: a Google Cloud project with billing, the Gemini Enterprise for Customer Experience API and the Customer Experience Insights API enabled, optional audit logs, and (only if you use the API) the gcloud CLI, authentication and a client library.

## Signature / Usage

### Use a dedicated gcloud configuration directory

Adapted (not in the official docs): run every step below and the cleanup in one bash or zsh shell, after this fence points gcloud at a new configuration directory that only this setup uses, so your existing gcloud accounts and ADC are not read, replaced or revoked. If it prints `Setup failed`, stop: do not run the steps below, in this shell or another one. The fence also unsets `GOOGLE_APPLICATION_CREDENTIALS` in this shell, so client libraries here use the new ADC.

```bash
if QS_CONFIG=$(mktemp -d) && [ -n "$QS_CONFIG" ] && [ -d "$QS_CONFIG" ] && : > "$QS_CONFIG/.created-by-quick-setup"; then
  export CLOUDSDK_CONFIG="$QS_CONFIG"; unset GOOGLE_APPLICATION_CREDENTIALS
else
  echo "Setup failed: no dedicated gcloud configuration directory; stop here" >&2
  unset QS_CONFIG
fi
```

Any later command or client library that needs these credentials, including the REST examples' `gcloud auth print-access-token`, must run with the same `CLOUDSDK_CONFIG`. gcloud, the Python google-auth and the Node.js google-auth-library read ADC from that directory; the Rust google-cloud-auth 1.19.0 does not, so for it also set `GOOGLE_APPLICATION_CREDENTIALS` to `"$CLOUDSDK_CONFIG/application_default_credentials.json"`. Other libraries were not checked.

### Initialize the gcloud CLI

```bash
gcloud init
```

### User account credentials for REST calls

If `gcloud init` already authorized the account you intend to use, you can skip `gcloud auth login`.

```bash
gcloud auth login
```

### Application default credentials for client libraries

`set-quota-project` requires that "The existing application default credentials must have the serviceusage.services.use permission on the given project" (gcloud 593.0.0 help); `roles/serviceusage.serviceUsageConsumer` includes it.

```bash
gcloud auth application-default login
gcloud auth application-default set-quota-project PROJECT_ID
```

### Cleanup

Adapted (not in the official docs): run this in the same shell. It acts only when `CLOUDSDK_CONFIG` is the directory that the fence above created and marked; otherwise it revokes and removes nothing. The directory is removed only after both revokes succeed (`gcloud auth revoke --all` is skipped when no account is left, so a retry can finish); if a revoke fails, the directory and `CLOUDSDK_CONFIG` are kept for a retry. It also unsets `GOOGLE_APPLICATION_CREDENTIALS` if you pointed it into that directory for Rust; a value you had before the setup stays unset in this shell.

```bash
if [ -n "${QS_CONFIG-}" ] && [ "${CLOUDSDK_CONFIG-}" = "$QS_CONFIG" ] && [ -f "$QS_CONFIG/.created-by-quick-setup" ]; then
  if gcloud auth application-default revoke &&
    accounts=$(gcloud auth list --format="value(account)") &&
    { [ -z "$accounts" ] || gcloud auth revoke --all; }; then
    [ "${GOOGLE_APPLICATION_CREDENTIALS-}" = "$QS_CONFIG/application_default_credentials.json" ] && unset GOOGLE_APPLICATION_CREDENTIALS
    rm -r -- "$QS_CONFIG" && unset CLOUDSDK_CONFIG QS_CONFIG
  else
    echo "Revoke failed: $QS_CONFIG is kept and CLOUDSDK_CONFIG stays set; run this cleanup again" >&2
  fi
else
  echo "Not the directory this setup created: nothing revoked or removed"
fi
```

## Notes

- Roles: selecting a project needs no specific IAM role; creating a project needs the Project Creator role (`roles/resourcemanager.projectCreator`, containing `resourcemanager.projects.create`); enabling APIs needs the `serviceusage.services.enable` permission, for example through Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`) or the Owner role (`roles/owner`) if you created the project.
- APIs to enable: Gemini Enterprise for Customer Experience API (`ces.googleapis.com`) and the Customer Experience Insights API (`contactcenterinsights.googleapis.com`; the console text calls it "Contact Center AI Insights API").
- Enabling Data Access audit logs for the Gemini Enterprise for Customer Experience API can be skipped for non-production agent applications; together with Versions they track design-time changes.
- Installing the gcloud CLI, authentication and the client library can be skipped if you won't use the API. If you use an external identity provider, sign in to the gcloud CLI with your federated identity first.
- In Cloud Shell you are already logged in to gcloud.
- The source says: "The `GOOGLE_APPLICATION_CREDENTIALS` environment variable must not be set in order for your application default credentials to be used by client libraries." This applies to the user-account credentials that `gcloud auth application-default login` creates: ADC searches the `GOOGLE_APPLICATION_CREDENTIALS` environment variable first, then the credential file created by `gcloud auth application-default login`, then the attached service account from the metadata server, so a set variable takes precedence over that login file. Unset the variable only when you want client libraries to use the `gcloud auth application-default login` credentials; if it points to a credential configuration you rely on (for example Workload Identity Federation), keep it set in your other shells: the dedicated-directory fence unsets it only in the setup shell, so that client libraries there use the new ADC. ADC in general is covered by the gcp-foundation skill.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/serviceusage (`roles/serviceusage.serviceUsageConsumer`; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/docs/authentication/application-default-credentials (ADC search order; retrieved 2026-11-14)
- If you created the project with your user account you have the Owner basic role, which allows calling any API for the project; the source does not present this as a recommendation, so prefer granting narrower roles to other principals.
- Added (not in the official docs): the dedicated directory. In gcloud 593.0.0, `_GetGlobalConfigDir` returns `CLOUDSDK_CONFIG` when it is set, else `~/.config/gcloud` (`%APPDATA%\gcloud` on Windows) (`lib/googlecloudsdk/core/config.py`), and the bundled google-auth 2.62.0 reads `os.environ[environment_vars.CLOUD_SDK_CONFIG_DIR]` (`CLOUDSDK_CONFIG`) in `get_config_path` and joins it with `application_default_credentials.json` in `get_application_default_credentials_path` (`lib/third_party/google/auth/_cloud_sdk.py`). The Node.js google-auth-library 11.3.4 also reads `process.env['CLOUDSDK_CONFIG']` before the default (`build/src/auth/googleauth.js`), while the Rust google-cloud-auth 1.19.0 `adc_path` uses `GOOGLE_APPLICATION_CREDENTIALS`, else `$HOME/.config/gcloud` or `%APPDATA%\gcloud` (`src/credentials.rs`). Run with an isolated `HOME` (no real login), `gcloud info` reported the new directory, `gcloud config set` wrote there, the bundled google-auth resolved the ADC path inside it, and the cleanup removed it while `$HOME/.config/gcloud` stayed unchanged (with `CLOUDSDK_CONFIG` set to an empty string, `gcloud info` reports `$HOME/.config/gcloud`, so the setup fence exports nothing unless the marked directory exists); with no ADC, `gcloud auth application-default revoke` exited 0 ("nothing to revoke"), while `gcloud auth revoke --all` with no account exited 1. A gcloud stub showed that the setup fence prints `Setup failed` and exports nothing when `mktemp` fails or prints an empty or nonexistent path, that the shell keeps running, that a failed revoke keeps the directory and `CLOUDSDK_CONFIG`, and that the cleanup runs no gcloud command when `QS_CONFIG` is unset or differs, or when `CLOUDSDK_CONFIG` points to `$HOME/.config/gcloud` or to a directory without the marker.
- Adapted from the official docs: the source's cleanup runs `gcloud auth revoke` "If you called `gcloud auth login`" and `gcloud auth application-default revoke` "If you called `gcloud auth application-default login`"; without an account, `gcloud auth revoke` "revokes credentials for the currently active account". The page runs `gcloud auth revoke --all` (help: `gcloud auth revoke [ACCOUNTS ...] [--all]`, "Revoke credentials for all accounts.") and `application-default revoke`, which "Revokes Application Default Credentials that have been previously generated by gcloud auth application-default login and deletes the local credential file", inside the dedicated directory, and removes the directory only after both succeed. It runs `gcloud auth revoke --all` only when `gcloud auth list --format="value(account)"` (the help's example format) prints an account, because with no account the command fails ("No credentials available to revoke.") and a retry after a partial cleanup could never finish.
- The source also shows Console steps and links to the client libraries page.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/quick/setup (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [quick-create-agent.md](./quick-create-agent.md)
- [cx-agent-studio.md](./cx-agent-studio.md)
