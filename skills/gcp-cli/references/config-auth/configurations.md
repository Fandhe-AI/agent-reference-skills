---
source: https://docs.cloud.google.com/sdk/docs/configurations
---

# gcloud CLI configurations

A configuration is a named set of Google Cloud CLI properties. These properties are key-value pairs, organized in sections, that govern the behavior of the gcloud CLI. Usually, if you're working with just one project, the default configuration, named `default`, should be sufficient.

Properties commonly stored in configurations include the default Compute Engine zone, verbosity level, usage reporting, project ID, and an active user or service account.

## Signature / Usage

### Where configurations are stored

Configurations are stored in your user config directory (typically `~/.config/gcloud` on MacOS and Linux, or `%APPDATA%\gcloud` on Windows). Find the location by running:

```
gcloud info --format='value(config.paths.global_config_dir)'
```

The config directory can be changed by setting the environment variable `CLOUDSDK_CONFIG`. The config directory must be write-enabled. In Cloud Shell, your gcloud CLI preferences are stored in a temporary `tmp` folder, set for your current Cloud Shell tab only, and do not persist across sessions.

To read about configurations from the command-line (along with a complete list of available properties and the sections they are in), run `gcloud topic configurations`.

### Default configuration

The gcloud CLI starts you off with a single configuration named `default`. You can set properties by running `gcloud init` or `gcloud config set` directly. For example, to disable prompting for scripting, run:

```
gcloud config set disable_prompts true
```

### Multiple configurations

You can create additional configurations and switch between them using `gcloud config configurations activate`. There is nothing special about the initial `default` configuration; it is created as a convenience. You can name this and any additional configurations however you'd like.

Multiple configurations are useful if you want to:

- **Use multiple projects**: create a separate configuration for each project and switch between them as required.
- **Use multiple authorization accounts**
- **Perform generally independent tasks**: for example, one configuration for an App Engine application in one project and another for unrelated Compute Engine instances in another project.

### Creating a configuration

```
gcloud config configurations create [NAME]
```

You must activate the new configuration after creation in order to use it.

### Activating a configuration

Only one configuration can be active at a given time. The active configuration's properties govern the behavior of the gcloud CLI.

```
gcloud config configurations activate [NAME]
```

`gcloud config list` will always show you the properties in your active configuration.

To change the active configuration for a single command invocation, use the `--configuration` flag on any gcloud CLI command:

```
gcloud auth list --configuration=[CONFIGURATION_NAME]
```

To change the active configuration for all commands in your current terminal, set the environment variable `CLOUDSDK_ACTIVE_CONFIG_NAME` to the name of the configuration you'd like to use.

### Automating configuration switching

Tools such as direnv and ondir can automatically switch between configurations when you switch working directories. One way to accomplish this is to set the necessary environment variables (like `CLOUDSDK_ACTIVE_CONFIG_NAME`) in the `.envrc` file in the root directory of your project.

### Listing configurations

```
gcloud config configurations list
```

The gcloud CLI lists the configurations and shows which configuration is active:

```sh
NAME         IS_ACTIVE     ACCOUNT            PROJECT               DEFAULT_ZONE  DEFAULT_REGION
default      False         user@gmail.com     example-project-1     us-east1-b    us-east1
project-1    False         user@gmail.com     example-project-2     us-east1-c    us-east1
project-2    True          user@gmail.com     example-project-3     us-east1-b    us-east1
```

### Setting configuration properties

To set and unset the properties in the active configuration, run `gcloud config set` and `gcloud config unset`:

```
gcloud config set project [PROJECT]

gcloud config unset project
```

Properties can also be set via environment variables named `CLOUDSDK_SECTION_NAME_PROPERTY_NAME`. For example, you can set the `core/project` and `compute/zone` properties as follows:

Adapted (not in the official docs): a plain assignment creates an unexported shell variable that `gcloud` does not see, so `export` passes it to the `gcloud` process; the placeholder `[YOUR_PROJECT_NAME]` is renamed `[YOUR_PROJECT_ID]` because `core/project` takes the project ID.

```bash
export CLOUDSDK_CORE_PROJECT=[YOUR_PROJECT_ID]
export CLOUDSDK_COMPUTE_ZONE=[YOUR_ZONE_NAME]
```

### Viewing configuration properties

To view the properties in a configuration:

```
gcloud config configurations describe [NAME]
```

Or, to view properties in the active configuration:

```
gcloud config list
```

The gcloud CLI prints the configuration properties:

```
is_active: false
name: default
properties:
  compute:
    region: us-east1
    zone: us-east1-b
  core:
    account: user@google.com
    project: example-project
```

### Deleting a configuration

> **Warning:** deleting a named configuration removes its stored properties; it cannot be undone.

```
gcloud config configurations delete [NAME]
```

You can't delete the active configuration. Use `gcloud config configurations activate` if required to switch to another configuration before deleting.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `CLOUDSDK_CONFIG` | environment variable | Changes the config directory (must be write-enabled) |
| `CLOUDSDK_ACTIVE_CONFIG_NAME` | environment variable | Active configuration for all commands in the current terminal |
| `--configuration` | flag | Active configuration for a single command invocation |
| `CLOUDSDK_SECTION_NAME_PROPERTY_NAME` | environment variable pattern | Sets a property, for example `core/project` and `compute/zone` |

## Notes

- Adapted from the official docs: the page sets the environment variables without `export` (`CLOUDSDK_CORE_PROJECT=[YOUR_PROJECT_NAME]`, `CLOUDSDK_COMPUTE_ZONE=[YOUR_ZONE_NAME]`); `gcloud` (a child process) reads them only when exported, so the fence uses `export`.
- Corrected from the official docs: the placeholder `[YOUR_PROJECT_NAME]` is shown as `[YOUR_PROJECT_ID]`, because `core/project` takes a project ID, not a display name.
- Configuration management commands: `gcloud config configurations create | activate | list | describe | delete` (written out individually above).
- This guide says the new configuration must be activated after creation, while the `gcloud config configurations create` help of gcloud 593.0.0 activates it by default (`--no-activate` turns this off). Activate explicitly if in doubt.
- Source: https://docs.cloud.google.com/sdk/docs/configurations (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [properties.md](./properties.md)
- [authorizing-accounts-credentials.md](./authorizing-accounts-credentials.md)
- [cheatsheet.md](./cheatsheet.md)
