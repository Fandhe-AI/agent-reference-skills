---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/groups/delete
---

# gcloud compute interconnects groups delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects groups delete

```text
NAME
    gcloud compute interconnects groups delete - delete Compute Engine
        interconnect groups

SYNOPSIS
    gcloud compute interconnects groups delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects groups delete is used to delete interconnect
    groups.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To delete an interconnect group, run:

        $ gcloud compute interconnects groups delete \
            example-interconnect-group"

    Although not shown in this example, you can delete multiple interconnect
    groups in a single command.

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the interconnect groups to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects groups delete

        $ gcloud beta compute interconnects groups delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute interconnects groups delete example-interconnect-group
```

### gcloud beta compute interconnects groups delete

```text
NAME
    gcloud beta compute interconnects groups delete - delete Compute Engine
        interconnect groups

SYNOPSIS
    gcloud beta compute interconnects groups delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects groups delete

```text
NAME
    gcloud alpha compute interconnects groups delete - delete Compute Engine
        interconnect groups

SYNOPSIS
    gcloud alpha compute interconnects groups delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example ends with a stray unmatched `"` after `example-interconnect-group`; the runnable form drops it.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/groups/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
