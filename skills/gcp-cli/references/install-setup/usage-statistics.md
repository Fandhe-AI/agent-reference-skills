---
source: https://docs.cloud.google.com/sdk/docs/usage-statistics
---

# Usage statistics

Unless you opt in during installation, the gcloud CLI does not collect usage statistics. You can permit it to send usage statistics to help Google prioritize features and improvements.

## Signature / Usage

Disable sending usage statistics:

```
gcloud config set disable_usage_reporting true
```

Enable sending usage statistics:

```
gcloud config set disable_usage_reporting false
```

## Notes

- Statistics contain anonymized tool executions (for example the command invoked, time taken, whether an error was raised, and similar metrics). They do not include argument values or personal information.
- Handled in accordance with Google's privacy policy (https://policies.google.com/privacy).
- Installer equivalents: the Windows installer flags `/reporting` / `/noreporting` (see downloads-interactive). The property shows as `disable_usage_reporting` under `[core]` in `gcloud config list`.
- Source: https://docs.cloud.google.com/sdk/docs/usage-statistics (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [install-sdk.md](./install-sdk.md)
- [resources.md](./resources.md)
