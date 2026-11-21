---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/quick/setup
---

# CX Agent Studio Setup

Required setup steps to start using CX Agent Studio: a Google Cloud project with billing, the Gemini Enterprise for Customer Experience API and the Customer Experience Insights API enabled, optional audit logs, and (only if you use the API) the gcloud CLI, authentication and a client library.

## Signature / Usage

### Use a dedicated gcloud configuration directory

Adapted (not in the official docs): first start a child shell (run `bash` or `zsh`), run every step below and the cleanup in it, and `exit` it after the cleanup, so the calling shell's `CLOUDSDK_CONFIG` and `GOOGLE_APPLICATION_CREDENTIALS` stay as they were. This fence points gcloud at a new configuration directory that only this setup uses, so the files of your existing gcloud configuration and ADC are not read, replaced or deleted (the optional server-side revocation in the cleanup is the exception described there). If it prints `Setup failed`, stop: do not run the steps below, in this shell or another one. The fence also unsets `GOOGLE_APPLICATION_CREDENTIALS` in this shell, so client libraries here use the new ADC.

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

Adapted (not in the official docs): the command runs only inside the dedicated directory that the setup fence created; otherwise it prints `Not in the setup's gcloud directory; stop here` and changes nothing.

```bash
if [ -n "${QS_CONFIG-}" ] && [ "${CLOUDSDK_CONFIG-}" = "$QS_CONFIG" ] && [ -f "$QS_CONFIG/.created-by-quick-setup" ]; then
  gcloud init
else
  echo "Not in the setup's gcloud directory; stop here" >&2
fi
```

### User account credentials for REST calls

If `gcloud init` already authorized the account you intend to use, you can skip `gcloud auth login`.

Adapted (not in the official docs): the command runs only inside the dedicated directory that the setup fence created; otherwise it prints `Not in the setup's gcloud directory; stop here` and changes nothing.

```bash
if [ -n "${QS_CONFIG-}" ] && [ "${CLOUDSDK_CONFIG-}" = "$QS_CONFIG" ] && [ -f "$QS_CONFIG/.created-by-quick-setup" ]; then
  gcloud auth login
else
  echo "Not in the setup's gcloud directory; stop here" >&2
fi
```

### Application default credentials for client libraries

`set-quota-project` requires that "The existing application default credentials must have the serviceusage.services.use permission on the given project" (gcloud 593.0.0 help); `roles/serviceusage.serviceUsageConsumer` includes it.

Adapted (not in the official docs): the command runs only inside the dedicated directory that the setup fence created; otherwise it prints `Not in the setup's gcloud directory; stop here` and changes nothing.

```bash
if [ -n "${QS_CONFIG-}" ] && [ "${CLOUDSDK_CONFIG-}" = "$QS_CONFIG" ] && [ -f "$QS_CONFIG/.created-by-quick-setup" ]; then
  gcloud auth application-default login
  gcloud auth application-default set-quota-project PROJECT_ID
else
  echo "Not in the setup's gcloud directory; stop here" >&2
fi
```

### Cleanup

Adapted (not in the official docs): run this in the same shell. It deletes the dedicated directory, and with it the credentials stored there, only when `CLOUDSDK_CONFIG` is the directory that the fence above created and marked; otherwise it removes nothing. It revokes nothing on Google's side, so the tokens it deletes stay valid there. It also unsets `GOOGLE_APPLICATION_CREDENTIALS` if you pointed it into that directory for Rust; a value you had before the setup comes back when you `exit` the child shell.

```bash
if [ -n "${QS_CONFIG-}" ] && [ "${CLOUDSDK_CONFIG-}" = "$QS_CONFIG" ] && [ -f "$QS_CONFIG/.created-by-quick-setup" ]; then
  [ "${GOOGLE_APPLICATION_CREDENTIALS-}" = "$QS_CONFIG/application_default_credentials.json" ] && unset GOOGLE_APPLICATION_CREDENTIALS
  rm -r -- "$QS_CONFIG" && unset CLOUDSDK_CONFIG QS_CONFIG
else
  echo "Not the directory this setup created: nothing removed"
fi
```

Optional: to also revoke the tokens on Google's side, run `gcloud auth application-default revoke` and `gcloud auth revoke --all` in the same shell before the cleanup, while `CLOUDSDK_CONFIG` still points to the dedicated directory. This is a server-side revocation (gcloud 593.0.0 help: "When given a user account, this command revokes the user account token on the server."), and it might also end other sessions that use the same account and OAuth client, such as gcloud or ADC logins in your usual configuration (the gcloud help does not say); skip it if you rely on those.

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
- Added (not in the official docs): the dedicated directory. In gcloud 593.0.0, `_GetGlobalConfigDir` returns `CLOUDSDK_CONFIG` when it is set, else `~/.config/gcloud` (`%APPDATA%\gcloud` on Windows) (`lib/googlecloudsdk/core/config.py`), and the bundled google-auth 2.62.0 reads `os.environ[environment_vars.CLOUD_SDK_CONFIG_DIR]` (`CLOUDSDK_CONFIG`) in `get_config_path` and joins it with `application_default_credentials.json` in `get_application_default_credentials_path` (`lib/third_party/google/auth/_cloud_sdk.py`). The Node.js google-auth-library 11.3.4 also reads `process.env['CLOUDSDK_CONFIG']` before the default (`build/src/auth/googleauth.js`), while the Rust google-cloud-auth 1.19.0 `adc_path` uses `GOOGLE_APPLICATION_CREDENTIALS`, else `$HOME/.config/gcloud` or `%APPDATA%\gcloud` (`src/credentials.rs`). Run with an isolated `HOME` (no real login), `gcloud info` reported the new directory, `gcloud config set` wrote there, the bundled google-auth resolved the ADC path inside it, and the cleanup removed it while `$HOME/.config/gcloud` stayed unchanged (with `CLOUDSDK_CONFIG` set to an empty string, `gcloud info` reports `$HOME/.config/gcloud`, so the setup fence exports nothing unless the marked directory exists). A gcloud stub showed that the setup fence prints `Setup failed` and exports nothing when `mktemp` fails or prints an empty or nonexistent path, that the shell keeps running, that the guarded `gcloud init`, login and quota project blocks then call no gcloud command (also with an inherited `CLOUDSDK_CONFIG`), that the cleanup runs no gcloud command, and that it removes nothing when `QS_CONFIG` is unset or differs, or when `CLOUDSDK_CONFIG` points to `$HOME/.config/gcloud` or to a directory without the marker. Run in an interactive child `bash` or `zsh` that exits after the cleanup, the setup and cleanup left the parent shell's `CLOUDSDK_CONFIG` and `GOOGLE_APPLICATION_CREDENTIALS` unchanged.
- Adapted from the official docs: `gcloud init`, `gcloud auth login`, `gcloud auth application-default login` and `set-quota-project` are wrapped in the same three checks as the cleanup (`QS_CONFIG` set, `CLOUDSDK_CONFIG` equal to it, marker file present), because a failed setup fence ends with exit status 0 and the next blocks would otherwise write to the default or inherited gcloud configuration.
- Adapted from the official docs: the source's cleanup runs `gcloud auth revoke` "If you called `gcloud auth login`" and `gcloud auth application-default revoke` "If you called `gcloud auth application-default login`". The page's default cleanup is local only: it deletes the dedicated directory and runs no revoke, and the two revoke commands are an optional step because a user-account revoke acts on the server ("revokes the user account token on the server. If the revocation is successful, or if the token has already been revoked, this command removes the credential from the local machine."). The gcloud help does not say whether revoking one token also ends other sessions of the same account and OAuth client.
- The source also shows Console steps and links to the client libraries page.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/quick/setup (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [quick-create-agent.md](./quick-create-agent.md)
- [cx-agent-studio.md](./cx-agent-studio.md)
