---
source: https://docs.cloud.google.com/sdk/gcloud/reference/cloud-shell/scp
---

# gcloud cloud-shell scp

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud cloud-shell scp

```text
NAME
    gcloud cloud-shell scp - copies files between Cloud Shell and the local
        machine

SYNOPSIS
    gcloud cloud-shell scp (cloudshell|localhost):SRC
        [(cloudshell|localhost):SRC ...] (cloudshell|localhost):DEST
        [--dry-run] [--force-key-file-overwrite] [--recurse]
        [--scp-flag=SCP_FLAG] [--ssh-key-file] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud cloud-shell scp copies files between your Cloud Shell instance and
    your local machine using the scp command.

EXAMPLES
    To denote a file in Cloud Shell, prefix the file name with the string
    "cloudshell:" (e.g. cloudshell:~/FILE). To denote a local file, prefix the
    file name with the string "localhost:" (e.g. localhost:~/FILE). For
    example, to copy a remote directory to your local machine, run:

        $ gcloud cloud-shell scp cloudshell:~/REMOTE-DIR \
          localhost:~/LOCAL-DIR

    In the above example, ~/REMOTE-DIR from your Cloud Shell instance is copied
    into the ~/LOCAL-DIR directory.

    Conversely, files from your local computer can be copied into Cloud Shell:

        $ gcloud cloud-shell scp localhost:~/LOCAL-FILE-1 \
          localhost:~/LOCAL-FILE-2 cloudshell:~/REMOTE-DIR

    Under the covers, scp(1) or pscp (on Windows) is used to facilitate the
    transfer.

POSITIONAL ARGUMENTS
     (cloudshell|localhost):SRC [(cloudshell|localhost):SRC ...]
        Specifies the files to copy.

     (cloudshell|localhost):DEST
        Specifies a destination for the source files.

FLAGS
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

     --recurse
        Upload directories recursively.

     --scp-flag=SCP_FLAG
        Extra flag to be sent to scp. This flag may be repeated.

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

        $ gcloud alpha cloud-shell scp

        $ gcloud beta cloud-shell scp
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud cloud-shell scp \
    --recurse cloudshell:~/REMOTE-DIR localhost:~/LOCAL-DIR
```

### gcloud beta cloud-shell scp

```text
NAME
    gcloud beta cloud-shell scp - copies files between Cloud Shell and the
        local machine

SYNOPSIS
    gcloud beta cloud-shell scp (cloudshell|localhost):SRC
        [(cloudshell|localhost):SRC ...] (cloudshell|localhost):DEST
        [--dry-run] [--force-key-file-overwrite] [--recurse]
        [--scp-flag=SCP_FLAG] [--ssh-key-file] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha cloud-shell scp

```text
NAME
    gcloud alpha cloud-shell scp - copies files between Cloud Shell and the
        local machine

SYNOPSIS
    gcloud alpha cloud-shell scp (cloudshell|localhost):SRC
        [(cloudshell|localhost):SRC ...] (cloudshell|localhost):DEST
        [--dry-run] [--force-key-file-overwrite] [--recurse]
        [--scp-flag=SCP_FLAG] [--ssh-key-file] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example copies the directory `~/REMOTE-DIR`, which `gcloud cloud-shell scp` copies only with `--recurse` ("Upload directories recursively"); the runnable form adds `--recurse`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/cloud-shell/scp (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
