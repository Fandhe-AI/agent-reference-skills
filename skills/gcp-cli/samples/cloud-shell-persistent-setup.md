---
source: https://docs.cloud.google.com/shell/docs/configuring-cloud-shell
---

# Persist gcloud Preferences and Tools in Cloud Shell

Keep gcloud properties across tabs with `.bashrc` or `CLOUDSDK_CONFIG`, and install packages at boot with `.customize_environment`.

## Signature / Usage

### Default every new tab from `.bashrc`

Your `$HOME` is a persistent 5 GB disk, so `.bashrc` survives sessions. Add gcloud configuration commands to the end of `$HOME/.bashrc`; every new tab inherits them and can still change them:

```bash
gcloud config set compute/region us-central1
```

### Use one gcloud configuration in every tab

Add this line to the end of `.bashrc`, then create the configuration you want to use:

```bash
export CLOUDSDK_CONFIG=$HOME/.config/gcloud
```

```bash
gcloud config configurations create CONFIG_NAME
```

Set the project and region for it:

```bash
gcloud config set project [PROJECT_NAME]
```

```bash
gcloud config set compute/region us-east1
```

### Install packages at boot with `.customize_environment`

Cloud Shell runs `$HOME/.customize_environment` once when the instance boots, as root. Official example that installs erlang:

```sh
#!/bin/sh
apt-get update
apt-get -y install erlang
```

### Turn off gcloud usage statistics

```bash
gcloud config set disable_usage_reporting true
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `$HOME/.bashrc` | file | Runs for every new shell login; persists |
| `$HOME/.customize_environment` | file | Runs once at boot as root; log at `/var/log/customize_environment` |
| `/google/devshell/customize_environment_done` | file | Touched when the script succeeds |
| `CLOUDSDK_CONFIG` | environment variable | gcloud config directory |
| `GOOGLE_CLOUD_PROJECT`, `CLOUD_SHELL` | environment variables | Set by Cloud Shell (active project; `true`) |

## Notes

- Without these steps gcloud preferences live in a temporary folder for the current tab only and are lost across sessions.
- The script runs in the background, so installed packages can appear a few moments after the login prompt.
- `.customize_environment` runs as root: keep it to trusted package installs.
- Replace `[PROJECT_NAME]` with your project ID and drop the brackets.
- Named configurations in general are in the `named-configurations-multi-project` sample.
- Source: https://docs.cloud.google.com/shell/docs/configuring-cloud-shell (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/configurations (retrieved 2026-11-14)

## Related

- [configuring-cloud-shell.md](../references/cloud-shell/configuring-cloud-shell.md)
- [how-cloud-shell-works.md](../references/cloud-shell/how-cloud-shell-works.md)
- [configurations.md](../references/config-auth/configurations.md)
