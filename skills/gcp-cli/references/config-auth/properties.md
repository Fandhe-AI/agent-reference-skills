---
source: https://docs.cloud.google.com/sdk/docs/properties
---

# gcloud CLI properties

Properties are settings that govern the behavior of the gcloud CLI. They define per-product or per-service settings such as the account used for authorization, the default region for Compute Engine resources, or the option to turn off automatic component update checks, as well as preferences like verbosity level and prompt configuration.

## Signature / Usage

### Listing properties

To list the properties in the active configuration, run `gcloud config list`:

```
gcloud config list
```

The gcloud CLI returns the list of properties:

```sh
[compute]
region = us-east1
zone = us-east1-d
[core]
account = user@google.com
disable_usage_reporting = False
project = example-project
[metrics]
command_name = gcloud.config.list
```

### Setting properties

To set a property in the active configuration, run `gcloud config set`. The following example sets the `project` property, where `PROJECT_ID` is the unique ID for your project.

```
gcloud config set project PROJECT_ID
```

To set properties that are not in the `core` properties section, you must specify the section followed by a forward slash before the property name. The following example sets the zone name to `us-east1-b`.

```
gcloud config set compute/zone us-east1-b
```

### Setting properties using environment variables

Each property has a corresponding environment variable. The name follows the `CLOUDSDK_SECTION_NAME_PROPERTY_NAME` pattern. For example, you can set the `core/project` and `compute/zone` properties as follows:

Adapted (not in the official docs): a plain assignment creates an unexported shell variable that `gcloud` does not see, so `export` passes it to the `gcloud` process; the placeholder `PROJECT_NAME` is renamed `PROJECT_ID` because `core/project` takes the project ID.

```bash
export CLOUDSDK_CORE_PROJECT=PROJECT_ID
export CLOUDSDK_COMPUTE_ZONE=ZONE_NAME
```

### Unsetting properties

To unset a property in the active configuration, use `gcloud config unset`:

```
gcloud config unset disable_usage_reporting
```

### Available properties

The list of all properties can be found by running `gcloud topic configurations` or `gcloud config set --help` and looking for the Available Properties section.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `CLOUDSDK_SECTION_NAME_PROPERTY_NAME` | environment variable pattern | Sets the property `section/property_name`; every property has a corresponding variable |
| `CLOUDSDK_CORE_PROJECT` | environment variable | Sets `core/project` |
| `CLOUDSDK_COMPUTE_ZONE` | environment variable | Sets `compute/zone` |
| `--project` | global flag | Same effect as the `project` property, per invocation |

## Notes

- Adapted from the official docs: the page sets the environment variables without `export` (`CLOUDSDK_CORE_PROJECT=PROJECT_NAME`, `CLOUDSDK_COMPUTE_ZONE=ZONE_NAME`); `gcloud` (a child process) reads them only when exported, so the fence uses `export`.
- Corrected from the official docs: the placeholder `PROJECT_NAME` is shown as `PROJECT_ID`, because `core/project` takes a project ID, not a display name.
- Properties and flags: the gcloud CLI supports both global flags and command flags that have the same effect as properties (for example the `--project` flag and the `project` property). Properties maintain the same settings across command executions while flags affect behavior on a per-invocation basis. Flags override properties when both are set.
- A configuration is a named set of properties. The gcloud CLI uses a configuration named `default` as the initial active configuration, which is suitable for most use cases. See configurations.md.
- Environment variable values take precedence over property values set using `gcloud config set`.
- The twin of this page does not contain a property-by-property list; the full list is available from `gcloud topic configurations` or `gcloud config set --help` (not covered in fetched sources).
- Properties named in other pages of this directory: `disable_prompts` (configurations.md, scripting-gcloud.md), `auth/impersonate_service_account`, `auth/access_token_file`, `auth/login_config_file` (authorizing-*.md), `account` (authorizing-accounts-credentials.md), `show_structured_logs` (scripting-gcloud.md).
- Source: https://docs.cloud.google.com/sdk/docs/properties (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [configurations.md](./configurations.md)
- [authorizing-user-account.md](./authorizing-user-account.md)
- [scripting-gcloud.md](./scripting-gcloud.md)
- [concepts.md](./concepts.md)
