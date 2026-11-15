---
source: https://docs.cloud.google.com/sdk/gcloud/reference/cloud-shell
---

# Cloud Shell Commands

Copy-paste commands for connecting to Cloud Shell from a local gcloud CLI (`gcloud cloud-shell`), for the `cloudshell` helper inside Cloud Shell, for persisting gcloud preferences, and for resetting the home directory.

## Signature / Usage

### Open an SSH session from a local terminal

Run these on your local machine with the gcloud CLI installed.

```bash
gcloud cloud-shell ssh
```

```bash
gcloud cloud-shell ssh --command=ls
```

`--command` runs one command in Cloud Shell and exits.

### Copy files between Cloud Shell and the local machine

Prefix Cloud Shell paths with `cloudshell:` and local paths with `localhost:`.

```bash
gcloud cloud-shell scp cloudshell:~/REMOTE-DIR \
  localhost:~/LOCAL-DIR
```

```bash
gcloud cloud-shell scp localhost:~/LOCAL-FILE-1 \
  localhost:~/LOCAL-FILE-2 cloudshell:~/REMOTE-DIR
```

### Print a command to mount the Cloud Shell home directory

```bash
gcloud cloud-shell get-mount-command REMOTE-DIR
```

This command is deprecated in the 593.0.0 help in favor of `gcloud cloud-shell scp` and `gcloud cloud-shell ssh`. It starts Cloud Shell if needed and prints an `sshfs` command; you must install and run `sshfs` yourself.

### Edit and download files from inside Cloud Shell

Run these in the Cloud Shell terminal.

```bash
cloudshell edit $HOME/.bashrc
```

```bash
cloudshell download $HOME/.bashrc
```

### Persist gcloud preferences in Cloud Shell

Run these in the Cloud Shell terminal. By default preferences live in a temporary folder for the current tab only.

Adapted (not in the official docs): the placeholder `[PROJECT_NAME]` is renamed `[PROJECT_ID]` because `gcloud config set project` takes the project ID.

```bash
gcloud config set project [PROJECT_ID]
```

```bash
gcloud config set compute/region us-east1
```

Add this line to the end of `$HOME/.bashrc` to always use the same gcloud CLI configuration, then run `gcloud config configurations create CONFIG_NAME` to create the configuration you want:

```bash
export CLOUDSDK_CONFIG=$HOME/.config/gcloud
```

```bash
gcloud config set disable_usage_reporting true
```

The last command disables gcloud CLI usage statistics, which are enabled by default in Cloud Shell.

### Run a customization script at boot

Save as `$HOME/.customize_environment`; Cloud Shell runs it as root once at boot.

```sh
#!/bin/sh
apt-get update
apt-get -y install erlang
```

### Open a repository in Cloud Shell

```text
https://shell.cloud.google.com/cloudshell/editor?cloudshell_git_repo=http://path-to-repo/sample.git
```

### Reset the home directory

Check for personal files first (inside the Cloud Shell terminal):

```sh
ls -a $HOME
```

The official reset procedure then deletes every file in the Cloud Shell home directory and restarts the VM from the Cloud Shell menu (**More** > **Restart**). The deletion command is not reproduced here because it is irreversible; follow the steps on the official reset page inside Cloud Shell only, after backing up the files you need (for example with `gcloud cloud-shell scp`).

## Notes

- Other flags, see `gcloud cloud-shell ssh --help` and `gcloud cloud-shell scp --help`: `--authorize-session` (send OAuth credentials to the session), `--dry-run` (print the command instead of running it), `--recurse` (scp directories), `--ssh-key-file`, `--force-key-file-overwrite`.
- Reset and disable: Cloud Shell cannot recover deleted home-directory files. Consider Safe mode to sign in as root and fix file issues before resetting. Disabling Cloud Shell for managed Google Workspace or Cloud Identity users is done in the Google Admin console, not from the command line.
- The official Cloud Shell page writes the `scp` local destination as `localhost:~data.txt` (no slash); the examples above use the `~/` form from the gcloud 593.0.0 help.
- Corrected from the official docs: the page writes `gcloud config set project [PROJECT_NAME]`, but the `core/project` property takes a project ID, not a display name; this file uses `[PROJECT_ID]`.
- `gcloud cloud-shell ssh` and `scp` use the SSH key at `~/.ssh/google_compute_engine` by default.
- The `authuser` URL parameter for opening Cloud Shell with a specific account is documented, but the example URL is truncated in the source, so none is given here.
- General gcloud configuration commands (named configurations, `gcloud config set`) are in config.md; ADC and credential design belong to the `gcp-foundation` skill, and client libraries to the `gcp-client-libraries` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/cloud-shell/ssh (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/cloud-shell/scp (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/cloud-shell/get-mount-command (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/shell/docs/using-cloudshell-command (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/shell/docs/configuring-cloud-shell (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/shell/docs/open-in-cloud-shell (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/shell/docs/resetting-cloud-shell (retrieved 2026-11-14)

## Related

- [using-cloud-shell-with-gcloud-cli.md](../references/cloud-shell/using-cloud-shell-with-gcloud-cli.md)
- [using-cloudshell-command.md](../references/cloud-shell/using-cloudshell-command.md)
- [configuring-cloud-shell.md](../references/cloud-shell/configuring-cloud-shell.md)
- [open-in-cloud-shell.md](../references/cloud-shell/open-in-cloud-shell.md)
- [resetting-cloud-shell.md](../references/cloud-shell/resetting-cloud-shell.md)
