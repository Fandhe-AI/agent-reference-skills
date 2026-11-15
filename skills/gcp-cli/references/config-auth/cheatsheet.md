---
source: https://docs.cloud.google.com/sdk/docs/cheatsheet
---

# gcloud CLI cheat sheet

A roster of go-to commands for the Google Cloud CLI, the primary command-line tool for Google Cloud. The page also includes an introductory primer, a section on understanding commands, and a printable PDF (https://docs.cloud.google.com/static/sdk/docs/images/gcloud-cheat-sheet.pdf).

## Signature / Usage

### Getting started

| Command | Description |
| --- | --- |
| `gcloud init` | Initialize, authorize, and configure the gcloud CLI. |
| `gcloud version` | Display version and installed components. |
| `gcloud components install` | Install specific components. |
| `gcloud components update` | Update your gcloud CLI to the latest version. |
| `gcloud config set project` | Set a default Google Cloud project to work on. |
| `gcloud info` | Display current gcloud CLI environment details. |

### Help

| Command | Description |
| --- | --- |
| `gcloud help` | Search the gcloud CLI reference documents for specific terms. |
| `gcloud feedback` | Provide feedback to the gcloud CLI team. |
| `gcloud topic` | Supplementary help material for non-command topics like accessibility, filtering, and formatting. |

### Personalization

| Command | Description |
| --- | --- |
| `gcloud config set` | Define a property (like compute/zone) for the current configuration. |
| `gcloud config get` | Fetch the value of a gcloud CLI property. |
| `gcloud config list` | Display all the properties for the current configuration. |
| `gcloud config configurations create` | Create a new named configuration. |
| `gcloud config configurations list` | Display a list of all available configurations. |
| `gcloud config configurations activate` | Switch to an existing named configuration. |

### Authorization and Credentials

| Command | Description |
| --- | --- |
| `gcloud auth login` | Authorize Google Cloud access for the gcloud CLI with Google Cloud user credentials and set the current account as active. |
| `gcloud auth activate-service-account` | Authorize Google Cloud access similar to `gcloud auth login` but with service account credentials. |
| `gcloud auth application-default` | Manage your Application Default Credentials (ADC) for Cloud Client Libraries. |
| `gcloud auth list` | List all credentialed accounts. |
| `gcloud auth print-access-token` | Display the current account's access token. |
| `gcloud auth revoke` | Remove access credentials for an account. |

### Projects

| Command | Description |
| --- | --- |
| `gcloud projects describe` | Display metadata for a project (including its ID). |
| `gcloud projects add-iam-policy-binding` | Add an IAM policy binding to a specified project. |

### IAM

| Command | Description |
| --- | --- |
| `gcloud iam list-grantable-roles` | List IAM grantable roles for a resource. |
| `gcloud iam roles create` | Create a custom role for a project or org. |
| `gcloud iam service-accounts create` | Create a service account for a project. |
| `gcloud iam service-accounts add-iam-policy-binding` | Add an IAM policy binding to a service account. |
| `gcloud iam service-accounts set-iam-policy` | Replace the whole IAM policy of the service account (the official list prints `set-iam-policy-binding`, which does not exist; see Notes). |
| `gcloud iam service-accounts keys list` | List a service account's keys. |

### Docker \& Google Kubernetes Engine (GKE)

| Command | Description |
| --- | --- |
| `gcloud auth configure-docker` | Register the gcloud CLI as a Docker credential helper. |
| `gcloud container clusters create` | Create a cluster to run GKE containers. |
| `gcloud container clusters list` | List clusters for running GKE containers. |
| `gcloud container clusters get-credentials` | Update `kubeconfig` to get `kubectl` to use a GKE cluster. |
| `gcloud container images list-tags` | List tag and digest metadata for a container image. |

### Virtual Machines \& Compute Engine

| Command | Description |
| --- | --- |
| `gcloud compute zones list` | List Compute Engine zones. |
| `gcloud compute instances create` | Create a VM instance. |
| `gcloud compute instances describe` | Display a VM instance's details. |
| `gcloud compute instances list` | List all VM instances in a project. |
| `gcloud compute disks snapshot` | Create snapshot of persistent disks. |
| `gcloud compute snapshots describe` | Display a snapshot's details. |
| `gcloud compute snapshots delete` | Delete a snapshot. |
| `gcloud compute ssh` | Connect to a VM instance by using SSH. |

### Serverless \& App Engine

| Command | Description |
| --- | --- |
| `gcloud app deploy` | Deploy your app's code and configuration to the App Engine server. |
| `gcloud app versions list` | List all versions of all services deployed to the App Engine server. |
| `gcloud app browse` | Open the current app in a web browser. |
| `gcloud app create` | Create an App Engine app within your current project. |
| `gcloud app logs read` | Display the latest App Engine app logs. |

### Miscellaneous

| Command | Description |
| --- | --- |
| `gcloud kms decrypt` | Decrypt ciphertext (to a plaintext file) using a Cloud Key Management Service key. |
| `gcloud logging logs list` | List your project's logs. |
| `gcloud sql backups describe` | Display info about a Cloud SQL instance backup. |
| `gcloud sql export sql` | Export data from a Cloud SQL instance to a SQL file. |

### Introductory primer

Install the Google Cloud CLI with the installation instructions at https://docs.cloud.google.com/sdk/docs/install.

Arguments can be positional arguments or flags:

- **Positional args:** Set after command name; must respect order of positional args.
- **Flags:** Set after positional args; order of flags doesn't matter. A flag can be either a name-value pair (`--foo=bar`) or a boolean (`--force/no-force`). Flags can be required or optional (if an optional flag is not defined, the default value is used).

### Cleaning up results

Get the most from your output with the filter, format, limit, and sort-by flags.

For Compute Engine instances with prefix `us` and not machine type `f1-micro`:

```
gcloud compute instances list --filter="zone ~ ^us AND -machineType:f1-micro"
```

For a list of projects created on or after 15 January 2018, sorted from oldest to newest, presented as a table with project number, project id and creation time columns with dates and times in local timezone:

Adapted (not in the official docs): the official example breaks across two lines without a continuation character, so a shell runs `--filter=...` as a separate command; a trailing backslash joins them.

```
gcloud projects list --format="table(projectNumber,projectId,createTime.date(tz=LOCAL))" \
--filter="createTime>=2018-01-15T12:00:00" --sort-by=createTime
```

For a list of ten Compute Engine instances with a label `my-label` (of any value):

```
gcloud compute instances list --filter="labels.my-label:*" --limit=10
```

### Understanding commands

The gcloud CLI is a tree; non-leaf nodes are command groups and leaf nodes are commands. Tab completion works for commands and resources. Most `gcloud` commands follow this format:

```
gcloud + release level (optional) + component + entity + operation + positional args + flags
```

For example:

```
gcloud + compute + instances + create + example-instance-1 + --zone=us-central1-a
```

## Options / Props

### Global flags

| Name | Type | Description |
| --- | --- | --- |
| `--help` | flag | For when in doubt; display detailed help for a command. |
| `--project` | flag | If using a project other than the current one. |
| `--quiet` | flag | Disabling interactive prompting (and applying default values for inputs). |
| `--verbosity` | flag | Can set verbosity levels at `debug`, `info`, `warning`, `error`, `critical`, and `none`. |
| `--version` | flag | Display `gcloud` version information. |
| `--format` | flag | Set output format as `config`, `csv`, `default`, `diff`, `disable`, `flattened`, `get`, `json`, `list`, `multi`, `none`, `object`, `table`, `text`, `value`, or `yaml`. |

### Command anatomy

| Part | Description | Example |
| --- | --- | --- |
| Release level | The command's release status | `alpha` for alpha commands, `beta` for beta commands, no release level needed for GA commands |
| Component | The different Google Cloud services | `compute` for Compute Engine, `app` for App Engine, etc. |
| Entity | Plural form of an element or collection of elements under a component | `disks`, `firewalls`, `images`, `instances`, `regions`, `zones` for compute |
| Operation | Imperative verb form of the operation performed on the entity | `describe`, `list`, `create/update`, `delete/clear`, `import`, `export`, `copy`, `remove`, `add`, `reset`, `restart`, `restore`, `run`, and `deploy` |
| Positional args | Required, order-specific arguments | `<INSTANCE_NAMES>` is the required positional argument for `gcloud compute instances create` |
| Flags | Additional arguments, `--flag-name(=value)`, passed after positional args | `--machine-type=<MACHINE_TYPE>` and `--preemptible` are optional flags for `gcloud compute instances create` |

## Notes

- Corrected from the official docs: the page prints the `--sort-by` example as two lines without a continuation character (`gcloud projects list --format="table(projectNumber,projectId,createTime.date(tz=LOCAL))"` then `--filter="createTime>=2018-01-15T12:00:00" --sort-by=createTime`), so a shell would run the second line as a separate command; the fence above adds a trailing backslash.
- Corrected from the official docs: the cheat sheet lists `gcloud iam service-accounts set-iam-policy-binding` ("Replace existing IAM policy binding"), but no such command exists; its link target is `https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/set-iam-policy`, which replaces the whole policy. To change a single binding use `add-iam-policy-binding` / `remove-iam-policy-binding`.
- The `gcloud auth ...` and `gcloud config ...` commands are detailed in authorizing-*.md and configurations.md. ADC and service account key design belong to the `gcp-foundation` skill.
- Command reference pages follow `https://docs.cloud.google.com/sdk/gcloud/reference/<command path>`; global flags are at `https://docs.cloud.google.com/sdk/gcloud/reference`.
- Source: https://docs.cloud.google.com/sdk/docs/cheatsheet (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [configurations.md](./configurations.md)
- [properties.md](./properties.md)
- [authorizing-accounts-credentials.md](./authorizing-accounts-credentials.md)
- [scripting-gcloud.md](./scripting-gcloud.md)
