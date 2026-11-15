---
source: https://docs.cloud.google.com/shell/docs/auth
---

# Authorize with Cloud Shell

Authorizing your Cloud Shell session grants your environment temporary credentials, letting you send gcloud CLI commands and manage Google Cloud resources.

## Signature / Usage

When you make a Google Cloud API call or use a command-line tool, such as the gcloud CLI, that requires credentials for the first time with Cloud Shell, Cloud Shell prompts you with the **Authorize Cloud Shell** dialog. To allow the tool to use your credentials to make calls, click **Authorize**.

### Duration of authorization

This authorization lasts the lifetime of your Cloud Shell session. Since each Cloud Shell session is tied to an ephemeral, pre-configured virtual machine, if you restart your VM or close your browser, you will need to reauthorize these tools if you use them in your next new session.

### Revoke access

To revoke access for a session, restart your VM to start a new session by clicking **More** > **Restart**.

Snippet taken from https://docs.cloud.google.com/shell/docs/run-gcloud-commands (lists the credentialed accounts on the system):

```bash
gcloud auth list
```

## Notes

- Distance line: Application Default Credentials and credential concepts are covered by the `gcp-foundation` skill; in Cloud Shell and Cloud Code the tool uses the credentials from sign-in, and ADC cannot be configured with the gcloud CLI there.
- Source: https://docs.cloud.google.com/shell/docs/auth (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [how-cloud-shell-works.md](./how-cloud-shell-works.md)
- [run-gcloud-commands.md](./run-gcloud-commands.md)
