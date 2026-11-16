---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/upgrade
---

# gcloud bigtable instances upgrade

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bigtable instances upgrade

```text
NAME
    gcloud bigtable instances upgrade - upgrade an existing instance's type
        from development to production

SYNOPSIS
    gcloud bigtable instances upgrade INSTANCE [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Upgrade an existing instance's type from development to production.

EXAMPLES
    To upgrade a DEVELOPMENT instance to PRODUCTION, run:

        $ gcloud bigtable instances upgrade my-instance-id

POSITIONAL ARGUMENTS
     Instance resource - The instance to upgrade. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bigtable instances upgrade

        $ gcloud beta bigtable instances upgrade
```

### gcloud beta bigtable instances upgrade

```text
NAME
    gcloud beta bigtable instances upgrade - upgrade an existing instance's
        type from development to production

SYNOPSIS
    gcloud beta bigtable instances upgrade INSTANCE [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable instances upgrade

```text
NAME
    gcloud alpha bigtable instances upgrade - upgrade an existing instance's
        type from development to production

SYNOPSIS
    gcloud alpha bigtable instances upgrade INSTANCE [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/upgrade (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
