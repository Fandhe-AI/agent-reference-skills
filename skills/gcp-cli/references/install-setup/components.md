---
source: https://docs.cloud.google.com/sdk/docs/components
---

# gcloud CLI components

Components are the installable parts of the Google Cloud CLI: command-line tools (`gcloud`, `bq`, `gsutil`), sets of commands at the Alpha, Beta, or Preview release levels, or packages with dependencies used by a tool.

## Signature / Usage

Most commonly used components are installed by default. If you run a `gcloud alpha`, `gcloud beta`, or `gcloud preview` command interactively and that component is not installed, gcloud asks whether to install it, then runs the command. Other components are installed on demand when a command needs them.

### Listing components

```bash
gcloud components list
```

### Installing components

```bash
gcloud components install [COMPONENT-ID]
```

```bash
gcloud components install kubectl
```

### Updating components

Update all installed components to the latest version:

```bash
gcloud components update
```

Revert to a known good version (only for installations done directly, not via a package manager: interactive installer, static versions, Windows installer, Homebrew):

```bash
gcloud components update --version VERSION
```

### Removing components

> **Warning:** this uninstalls the component from this installation of the gcloud CLI.

```bash
gcloud components remove [COMPONENT-ID]
```

## Options / Props

Default components:

| ID | Name | Description |
|---|---|---|
| `gcloud` | Default gcloud CLI commands | Tool for interacting with Google Cloud. Only General Availability commands are installed with this component. |
| `bq` | BigQuery command-line tool | Tool for working with data in BigQuery |
| `gsutil` |   | Legacy tool for Cloud Storage tasks. Use `gcloud storage` commands instead. |
| `core` | gcloud CLI core libraries | Libraries used internally by the gcloud CLI tools. |

Alpha, beta, and preview components (not installed by default):

| ID | Name | Description |
|---|---|---|
| `alpha` | gcloud CLI alpha commands | Commands at the alpha release level. |
| `beta` | gcloud CLI beta commands | Commands at the beta release level. |
| `preview` | gcloud CLI preview commands | Commands at the preview release level. |

External package manager equivalents (APT / YUM packages for the same components):

| gcloud CLI component | APT Package | YUM Package |
|---|---|---|
| `app-engine-go` | `google-cloud-cli-app-engine-go` | `google-cloud-cli-app-engine-go` |
| `app-engine-java` | `google-cloud-cli-app-engine-java` | `google-cloud-cli-app-engine-java` |
| `app-engine-python` | `google-cloud-cli-app-engine-python` | `google-cloud-cli-app-engine-python` |
| `bigtable` | `google-cloud-cli-bigtable-emulator` | `google-cloud-cli-bigtable-emulator` |
| `cbt` | `google-cloud-cli-cbt` | `google-cloud-cli-cbt` |
| `cloud-build-local` | `google-cloud-cli-cloud-build-local` | `google-cloud-cli-cloud-build-local` |
| `docker-credential-gcr` | `google-cloud-cli-docker-credential-gcr` | `google-cloud-cli-docker-credential-gcr` |
| `gcd-emulator` | `google-cloud-cli-datastore-emulator` | `google-cloud-cli-datastore-emulator` |
| `kubectl` | `kubectl` | `kubectl` |
| `pubsub-emulator` | `google-cloud-cli-pubsub-emulator` | `google-cloud-cli-pubsub-emulator` |

## Notes

- The component manager is disabled when the gcloud CLI was installed with a package manager such as APT or `yum`; use the external package manager packages instead. If the package manager cannot find them, configure `https://packages.cloud.google.com/` as a package source (see install-sdk).
- When modifying your installation, the terminal's current directory must be outside the `google-cloud-cli` installation directory. On Windows, open the terminal as Administrator after an *All Users* installation.
- The page's sample `gcloud components list` output is not complete; update the CLI and run `gcloud components list` for current offerings. Components with status `Not Installed` can be installed.
- The page still lists a `preview` component and `gcloud preview` commands, but the gcloud 593.0.0 command reference has no `gcloud preview` group (only `gcloud alpha` and `gcloud beta` release-level groups); use `gcloud components list` to see whether a `preview` component is offered.
- To downgrade a package-manager installation, use the version-specific `apt-get` / `yum` instructions in install-sdk.
- Source: https://docs.cloud.google.com/sdk/docs/components (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [install-sdk.md](./install-sdk.md)
- [interactive-gcloud.md](./interactive-gcloud.md)
