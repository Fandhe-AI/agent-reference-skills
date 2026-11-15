---
source: https://docs.cloud.google.com/sdk/gcloud/reference/config
---

# Configurations and Properties

Copy-paste commands for named configurations (`gcloud config configurations`) and for getting, setting, listing, and unsetting gcloud CLI properties (`gcloud config`).

## Signature / Usage

### Create and activate a named configuration

```bash
gcloud config configurations create my-config
```

```bash
gcloud config configurations activate my-config
```

### List and describe configurations

```bash
gcloud config configurations list
```

```bash
gcloud config configurations describe my-config
```

`describe` is similar to activating the configuration and running `gcloud config list`.

### Rename a configuration

```bash
gcloud config configurations rename my-config --new-name=new-config
```

### Delete named configurations

> **警告**: Deleting a configuration removes its stored properties (account, project, region, and so on). The command refuses to delete the active configuration; name only configurations you no longer need.

```bash
gcloud config configurations list
```

```bash
gcloud config configurations delete my-config
```

```bash
gcloud config configurations delete my-config1 my-config2
```

Run `gcloud config configurations activate OTHER_CONFIG` first if the target is currently active.

### Set properties in the active configuration

```bash
gcloud config set project PROJECT_ID
```

```bash
gcloud config set compute/zone ZONE_NAME
```

```bash
gcloud config set disable_prompts true
```

```bash
gcloud config set account ACCOUNT
```

### Read and list properties

```bash
gcloud config get project
```

```bash
gcloud config get compute/zone
```

```bash
gcloud config list
```

```bash
gcloud config list project
```

```bash
gcloud config list compute/
```

```bash
gcloud config list compute/ --all
```

```bash
gcloud config list --all
```

`--all` and a property name cannot be combined; only a section name plus `--all` works (`compute/ --all`).

### Unset a property

```bash
gcloud config unset project
```

```bash
gcloud config unset compute/zone
```

### Find the config directory

```bash
gcloud info --format='value(config.paths.global_config_dir)'
```

### Property examples

```bash
gcloud config set proxy/type http
gcloud config set proxy/address 1.234.56.78
gcloud config set proxy/port 8080
```

```bash
gcloud config unset auth/impersonate_service_account
```

## Notes

- Per-command and per-terminal selection: `--configuration=CONFIGURATION_NAME` on any gcloud command applies to one invocation (for example `gcloud auth list --configuration=...`), and the environment variable `CLOUDSDK_ACTIVE_CONFIG_NAME` set to a configuration name applies to every command in the terminal.
- Properties can also be set through environment variables named `CLOUDSDK_SECTION_NAME_PROPERTY_NAME`, for example `CLOUDSDK_CORE_PROJECT` for `core/project` and `CLOUDSDK_COMPUTE_ZONE` for `compute/zone`. `CLOUDSDK_CONFIG` changes the config directory (must be write-enabled); the typical default is `~/.config/gcloud` on macOS and Linux.
- `--installation`: see `gcloud config set --help` and `gcloud config unset --help`. With it a property is updated for the entire installation instead of only the active configuration; use it sparingly. Other flags: `gcloud config configurations create --no-activate`, `gcloud config configurations describe --all`.
- Impersonation uses the property `auth/impersonate_service_account` (see `gcloud config set --help`); the quota project uses `billing/quota_project`. Impersonation needs `roles/iam.serviceAccountTokenCreator` on the target; permission design belongs to the `gcp-foundation` skill.
- `core` section properties can omit the section: `project` and `core/project` are equivalent. Other sections need the prefix (`compute/region`).
- Help text says `create` activates by default; the configurations docs page says the new configuration must be activated before use. Follow the help text for 593.0.0 and run `gcloud config configurations list` to confirm which one is active.
- In Cloud Shell, preferences live in a temporary folder per tab and do not persist; see cloud-shell.md.
- The full property list is printed by `gcloud config set --help`; the help text is about 1,500 lines, so use the properties reference page instead.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/config/configurations (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/config/set (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/config/get (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/config/list (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/config/unset (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/docs/configurations (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/properties (retrieved 2026-11-14)

## Related

- [configurations.md](../references/config-auth/configurations.md)
- [properties.md](../references/config-auth/properties.md)
- [concepts.md](../references/config-auth/concepts.md)
- [cheatsheet.md](../references/config-auth/cheatsheet.md)
