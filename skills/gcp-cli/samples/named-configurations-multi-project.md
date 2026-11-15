---
source: https://docs.cloud.google.com/sdk/docs/configurations
---

# Switch Between Projects with Named Configurations

Create one named configuration per project, then switch with `activate`, `--configuration`, or `CLOUDSDK_ACTIVE_CONFIG_NAME`.

## Signature / Usage

### Create a configuration per project

Adapted (not in the official docs): the `create`, `config set project`, and `config set compute/zone` examples are combined into one setup; `project-1` / `project-2` are the names used in the official listing example, and `PROJECT_1_ID` / `PROJECT_2_ID` are placeholders.

```bash
gcloud config configurations create project-1
gcloud config set project PROJECT_1_ID
gcloud config set compute/zone us-east1-b

gcloud config configurations create project-2
gcloud config set project PROJECT_2_ID
gcloud config set compute/zone us-east1-c
```

### List and activate

```bash
gcloud config configurations list
```

```text
NAME         IS_ACTIVE     ACCOUNT            PROJECT               DEFAULT_ZONE  DEFAULT_REGION
default      False         user@gmail.com     example-project-1     us-east1-b    us-east1
project-1    False         user@gmail.com     example-project-2     us-east1-c    us-east1
project-2    True          user@gmail.com     example-project-3     us-east1-b    us-east1
```

```bash
gcloud config configurations activate project-1
gcloud config list
```

### Use another configuration for one command

```bash
gcloud auth list --configuration=project-2
```

### Use another configuration for one terminal

Adapted (not in the official docs): the official page only names the variable; `export` is added to make it a runnable shell line.

```bash
export CLOUDSDK_ACTIVE_CONFIG_NAME=project-2
```

### Switch automatically per directory

Put the same variable in the `.envrc` file at the project root and let direnv (or ondir) load it when you enter the directory.

Adapted (not in the official docs): the `.envrc` line combines the `CLOUDSDK_ACTIVE_CONFIG_NAME` variable with the official direnv suggestion.

```bash
export CLOUDSDK_ACTIVE_CONFIG_NAME=project-1
```

### Inspect and delete

```bash
gcloud config configurations describe project-2
```

> **Warning:** this deletes the `project-2` configuration and its properties; it cannot be undone, and the active configuration cannot be deleted.

```bash
gcloud config configurations delete project-2
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `gcloud config configurations activate NAME` | command | Switch the active configuration |
| `--configuration` | global flag | Configuration for a single invocation |
| `CLOUDSDK_ACTIVE_CONFIG_NAME` | environment variable | Configuration for the current terminal |
| `CLOUDSDK_CONFIG` | environment variable | Config directory (must be writable) |
| `--no-activate` | flag (`create`) | Create without activating (activation is on by default) |

## Notes

- Names match `^[a-z][-a-z0-9]*$`; `NONE` is a built-in configuration with no properties. Reinitializing an existing configuration with `gcloud init` removes all its properties.
- The configurations page says a new configuration must be activated after creation, while the 593.0.0 `gcloud config configurations create` help says it is activated on create (`--no-activate` disables). Run `activate` explicitly if unsure.
- The active configuration cannot be deleted, even when overridden with `--configuration`. Delete only throwaway configurations.
- In Cloud Shell the preferences live in a per-tab temporary folder; see the `cloud-shell-persistent-setup` sample.
- Account and credential design (service accounts, ADC, Workload Identity Federation) belongs to the `gcp-foundation` skill.
- Source: https://docs.cloud.google.com/sdk/docs/configurations (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/config/configurations (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/configurations (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/properties (retrieved 2026-11-14)

## Related

- [configurations.md](../references/config-auth/configurations.md)
- [properties.md](../references/config-auth/properties.md)
- [authorizing-accounts-credentials.md](../references/config-auth/authorizing-accounts-credentials.md)
