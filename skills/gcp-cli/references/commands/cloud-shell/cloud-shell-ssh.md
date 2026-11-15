---
source: https://docs.cloud.google.com/sdk/gcloud/reference/cloud-shell/ssh
---

# gcloud cloud-shell ssh

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud cloud-shell ssh

```text
NAME
    gcloud cloud-shell ssh - allows you to establish an interactive SSH session
        with Cloud Shell

SYNOPSIS
    gcloud cloud-shell ssh [--authorize-session] [--command=COMMAND]
        [--dry-run] [--force-key-file-overwrite] [--ssh-flag=SSH_FLAG]
        [--ssh-key-file] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud cloud-shell ssh lets you remotely log in to Cloud Shell. If your
    Cloud Shell is not currently running, this will cause it to be started
    before establishing the SSH session.

EXAMPLES
    To SSH into your Cloud Shell, run:

        $ gcloud cloud-shell ssh

    To run a remote command in your Cloud Shell, run:

        $ gcloud cloud-shell ssh --command=ls

FLAGS
     --authorize-session
        If provided, sends OAuth credentials to the current Cloud Shell session
        on behalf of the user. When this completes, the session will be
        authorized to run various Google Cloud command-line tools without
        requiring the user to manually authenticate.

     --command=COMMAND
        A command to run in Cloud Shell.

        Runs the command in Cloud Shell and then exits.

     --dry-run
        If provided, prints the command that would be run to standard out
        instead of executing it.

     --force-key-file-overwrite
        If enabled gcloud will regenerate and overwrite the files associated
        with a broken SSH key without asking for confirmation in both
        interactive and non-interactive environment.

        If disabled gcloud will not attempt to regenerate the files associated
        with a broken SSH key and fail in both interactive and non-interactive
        environment.

     --ssh-flag=SSH_FLAG
        Additional flags to be passed to ssh(1).

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

        $ gcloud alpha cloud-shell ssh

        $ gcloud beta cloud-shell ssh
```

### gcloud beta cloud-shell ssh

```text
NAME
    gcloud beta cloud-shell ssh - allows you to establish an interactive SSH
        session with Cloud Shell

SYNOPSIS
    gcloud beta cloud-shell ssh [--authorize-session] [--command=COMMAND]
        [--dry-run] [--force-key-file-overwrite] [--ssh-flag=SSH_FLAG]
        [--ssh-key-file] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha cloud-shell ssh

```text
NAME
    gcloud alpha cloud-shell ssh - allows you to establish an interactive SSH
        session with Cloud Shell

SYNOPSIS
    gcloud alpha cloud-shell ssh [--authorize-session] [--command=COMMAND]
        [--dry-run] [--force-key-file-overwrite] [--ssh-flag=SSH_FLAG]
        [--ssh-key-file] [GCLOUD_WIDE_FLAG ...] [-- SSH_ARGS ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/cloud-shell/ssh (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
