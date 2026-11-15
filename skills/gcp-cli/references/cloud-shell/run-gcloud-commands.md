---
source: https://docs.cloud.google.com/shell/docs/run-gcloud-commands
---

# Run `gcloud` commands with Cloud Shell

How to run gcloud CLI commands in Cloud Shell.

## Signature / Usage

### Set `gcloud` properties

1. Launch the Cloud Shell Editor (https://ide.cloud.google.com).
2. Prevent color from being used when printing messages to the terminal by setting a core property:

```bash
gcloud config set disable_color true
```

3. Unset the `disable_color` property:

```bash
gcloud config unset disable_color
```

4. If you have the Compute Engine API enabled, set your preferred Compute Engine region (replace `REGION` with a region name, for example `us-east1`):

```bash
gcloud config set compute/region REGION
```

Alternatively, set your preferred zone (replace `ZONE`, for example `us-east1-b`):

```bash
gcloud config set compute/zone ZONE
```

5. Display a list of available properties:

```bash
gcloud topic configurations
```

### Run core commands

List accounts whose credentials are stored on the local system:

```bash
gcloud auth list
```

The gcloud CLI displays a list of credentialed accounts, where `ACCOUNT_EMAIL` represents one or more active accounts.

List the properties in your active gcloud CLI configuration:

```bash
gcloud config list
```

The output is similar to the following, where `ACCOUNT_EMAIL` and `PROJECT_ID` display your email and project ID:

```text
[core]
account = ACCOUNT_EMAIL
disable_usage_reporting = False
project = PROJECT_ID
```

View information about your gcloud CLI installation and the active configuration:

```bash
gcloud info
```

### View help for `gcloud` commands

```bash
gcloud help compute instances create
```

```bash
gcloud help topic
```

```bash
gcloud topic filters
```

```bash
gcloud topic command-conventions
```

These show, in order: help for `gcloud compute instances create`, available commands under `gcloud topic`, information on filtering, and the `gcloud` command structure.

## Notes

- Distance line: the full gcloud property and configuration model is covered by the `config-auth` category of this skill.
- The `gcloud auth list` sample output block of the source (with an `ACTIVE`/`ACCOUNT` table) is not reproduced because its markdown escaping is garbled in the fetched twin.
- Source: https://docs.cloud.google.com/shell/docs/run-gcloud-commands (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuring-cloud-shell.md](./configuring-cloud-shell.md)
- [using-cloud-shell-with-gcloud-cli.md](./using-cloud-shell-with-gcloud-cli.md)
- [deploy-cloud-run-app.md](./deploy-cloud-run-app.md)
