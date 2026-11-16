---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/binauthz/attestors/update
---

# gcloud container binauthz attestors update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container binauthz attestors update

```text
NAME
    gcloud container binauthz attestors update - update an existing Attestor

SYNOPSIS
    gcloud container binauthz attestors update ATTESTOR
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To update an existing Attestor my_attestor:

        $ gcloud container binauthz attestors update my_attestor \
            --description="my new attestor description"

POSITIONAL ARGUMENTS
     Attestor resource - The attestor to update. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument ATTESTOR on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ATTESTOR
          ID of the attestor or fully qualified identifier for the attestor.

          To set the name attribute:
          + provide the argument ATTESTOR on the command line.

FLAGS
     --description=DESCRIPTION
        The new description for the attestor

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container binauthz attestors update

        $ gcloud beta container binauthz attestors update
```

### gcloud beta container binauthz attestors update

```text
NAME
    gcloud beta container binauthz attestors update - update an existing
        Attestor

SYNOPSIS
    gcloud beta container binauthz attestors update ATTESTOR
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container binauthz attestors update

```text
NAME
    gcloud alpha container binauthz attestors update - update an existing
        Attestor

SYNOPSIS
    gcloud alpha container binauthz attestors update ATTESTOR
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/binauthz/attestors/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
