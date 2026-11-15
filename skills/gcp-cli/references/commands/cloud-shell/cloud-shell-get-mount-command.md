---
source: https://docs.cloud.google.com/sdk/gcloud/reference/cloud-shell/get-mount-command
---

# gcloud cloud-shell get-mount-command

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud cloud-shell get-mount-command

```text
NAME
    gcloud cloud-shell get-mount-command - prints a command to mount the Cloud
        Shell home directory via sshfs

SYNOPSIS
    gcloud cloud-shell get-mount-command MOUNT_DIR [--force-key-file-overwrite]
        [--ssh-key-file] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) gcloud cloud-shell get-mount-command is deprecated and will be
    removed in a future release. Please use gcloud cloud-shell scp or gcloud
    cloud-shell ssh instead.

    gcloud cloud-shell get-mount-command starts your Cloud Shell if it is not
    already running, then prints out a command that allows you to mount the
    Cloud Shell home directory onto your local file system using sshfs. You
    must install and run sshfs yourself.

    After mounting the Cloud Shell home directory, any changes you make under
    the mount point on your local file system will be reflected in Cloud Shell
    and vice-versa.

EXAMPLES
    To print a command that mounts a remote directory onto your local file
    system, run:

        $ gcloud cloud-shell get-mount-command REMOTE-DIR

POSITIONAL ARGUMENTS
     MOUNT_DIR
        Local directory onto which the Cloud Shell home directory should be
        mounted.

FLAGS
     --force-key-file-overwrite
        If enabled gcloud will regenerate and overwrite the files associated
        with a broken SSH key without asking for confirmation in both
        interactive and non-interactive environment.

        If disabled gcloud will not attempt to regenerate the files associated
        with a broken SSH key and fail in both interactive and non-interactive
        environment.

     --ssh-key-file
        The path to the SSH key file. By default, this is
        ~/.ssh/google_compute_engine.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha cloud-shell get-mount-command

        $ gcloud beta cloud-shell get-mount-command
```

### gcloud beta cloud-shell get-mount-command

```text
NAME
    gcloud beta cloud-shell get-mount-command - prints a command to mount the
        Cloud Shell home directory via sshfs

SYNOPSIS
    gcloud beta cloud-shell get-mount-command MOUNT_DIR
        [--force-key-file-overwrite] [--ssh-key-file] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha cloud-shell get-mount-command

```text
NAME
    gcloud alpha cloud-shell get-mount-command - prints a command to mount the
        Cloud Shell home directory via sshfs

SYNOPSIS
    gcloud alpha cloud-shell get-mount-command MOUNT_DIR
        [--force-key-file-overwrite] [--ssh-key-file] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/cloud-shell/get-mount-command (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
