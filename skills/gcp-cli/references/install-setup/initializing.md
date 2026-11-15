---
source: https://docs.cloud.google.com/sdk/docs/initializing
---

# Initializing the gcloud CLI

After installing the gcloud CLI, run `gcloud init` to perform initial setup. You can also run it later to change settings or create a new configuration.

## Signature / Usage

`gcloud init` authorizes the gcloud CLI to use your user account credentials (or lets you select a previously authorized account) and sets up a configuration with a base set of properties: the active account, the current project, and if applicable the default Compute Engine region and zone.

```bash
gcloud init
```

In a remote terminal session, prevent the browser-based authorization flow:

```bash
gcloud init --no-launch-browser
```

Steps:

1. Create or select a configuration if prompted. A new installation gets a configuration named `default` set as active. With existing configurations you choose between re-initializing the active one, switching to another one and re-initializing it, or creating a new one.
2. Complete authorization when prompted (browser login and grant, or select an existing account). With `--no-launch-browser`, copy the authorization URL into another browser window. `gcloud init` sets the `account` property.
3. Choose a current project if prompted. With one accessible project it is selected for you; otherwise choose from projects where you have **Owner**, **Editor**, or **Viewer**. `gcloud init` sets the `project` property. With more than 200 projects you are prompted:

   ```
   This account has a lot of projects! Listing them all can take a while.
    [1] Enter a project ID
    [2] Create a new project
    [3] List projects
   Please enter your numeric choice:
   ```

4. Choose a default Compute Engine zone if prompted (not shown if the Compute Engine API is not enabled or a default zone already exists in project-level metadata). `gcloud init` sets the `region` and `zone` properties.

View the properties set by `gcloud init` with `gcloud config list`:

```sh
[compute]
region = us-east1
zone = us-east1-b
[core]
account = dana@example.com
disable_usage_reporting = False
project = example-project
```

## Options / Props

Alternatives to `gcloud init`:

| Command | Description |
|---|---|
| `gcloud auth login` | Authorize with a user account without setting up a configuration. |
| `gcloud auth activate-service-account` | Authorize with a service account instead of a user account. Useful for authorizing non-interactively and without a web browser. |
| `gcloud config [COMMAND]` / `gcloud config configurations [COMMAND]` | Create and manage gcloud CLI configurations and properties. |

## Notes

- If you choose to create a project, enable billing on it to use Google Cloud services.
- Authorizing Application Default Credentials (ADC) for Cloud Client Libraries is a separate step (`gcloud auth application-default login`); ADC concepts belong to the `gcp-foundation` skill.
- Source: https://docs.cloud.google.com/sdk/docs/initializing (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [install-sdk.md](./install-sdk.md)
- [proxy-settings.md](./proxy-settings.md)
- [usage-statistics.md](./usage-statistics.md)
