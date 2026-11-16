---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/instances/finish-migration
---

# gcloud memorystore instances finish-migration

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memorystore instances finish-migration

```text
NAME
    gcloud memorystore instances finish-migration - finish migration for a
        Memorystore instance

SYNOPSIS
    gcloud memorystore instances finish-migration
        (INSTANCE : --location=LOCATION) [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Finish migration for a Memorystore instance.

EXAMPLES
    To finish migration for a target Memorystore instance named my-instance in
    region us-central1, run:

        $ gcloud memorystore instances finish-migration my-instance \
             --project=my-project --location=us-central1

POSITIONAL ARGUMENTS
     Instance resource - The resource name of the instance to finalize
     migration on. Format:
     projects/{project}/locations/{location}/instances/{instance} The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

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

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the instance resource.

          To set the location attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --force
        By default, the FinishMigration operation ensures the target
        replication offset to catch up to the source offset as of the time of
        the call. Set this field to true to bypass this offset verification
        check.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore instances finish-migration

        $ gcloud beta memorystore instances finish-migration
```

### gcloud beta memorystore instances finish-migration

```text
NAME
    gcloud beta memorystore instances finish-migration - finish migration for a
        Memorystore instance

SYNOPSIS
    gcloud beta memorystore instances finish-migration
        (INSTANCE : --location=LOCATION) [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore instances finish-migration

```text
NAME
    gcloud alpha memorystore instances finish-migration - finish migration for
        a Memorystore instance

SYNOPSIS
    gcloud alpha memorystore instances finish-migration
        (INSTANCE : --location=LOCATION) [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/instances/finish-migration (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
