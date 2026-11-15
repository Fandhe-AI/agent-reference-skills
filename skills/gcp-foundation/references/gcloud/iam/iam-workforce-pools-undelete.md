---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workforce-pools/undelete
---

# gcloud iam workforce-pools undelete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam workforce-pools undelete

```text
NAME
    gcloud iam workforce-pools undelete - undelete a workforce pool

SYNOPSIS
    gcloud iam workforce-pools undelete (WORKFORCE_POOL : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Undelete a workforce pool.

EXAMPLES
    The following command undeletes a workforce pool with ID my-workforce-pool:

        $ gcloud iam workforce-pools undelete my-workforce-pool \
            --location=global

POSITIONAL ARGUMENTS
     Workforce pool resource - The workforce pool to undelete. The arguments in
     this group can be used to specify the attributes of this resource.

     This must be specified.

       WORKFORCE_POOL
          ID of the workforce pool or fully qualified identifier for the
          workforce pool.

          To set the workforce_pool attribute:
          + provide the argument workforce_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the workforce pool.

          To set the location attribute:
          + provide the argument workforce_pool on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    These variants are also available:

        $ gcloud alpha iam workforce-pools undelete

        $ gcloud beta iam workforce-pools undelete
```

### gcloud beta iam workforce-pools undelete

```text
NAME
    gcloud beta iam workforce-pools undelete - undelete a workforce pool

SYNOPSIS
    gcloud beta iam workforce-pools undelete
        (WORKFORCE_POOL : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam workforce-pools undelete

```text
NAME
    gcloud alpha iam workforce-pools undelete - undelete a workforce pool

SYNOPSIS
    gcloud alpha iam workforce-pools undelete
        (WORKFORCE_POOL : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workforce-pools/undelete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
