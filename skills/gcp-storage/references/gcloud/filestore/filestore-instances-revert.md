---
source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/revert
---

# gcloud filestore instances revert

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud filestore instances revert

```text
NAME
    gcloud filestore instances revert - revert a Filestore instance

SYNOPSIS
    gcloud filestore instances revert (INSTANCE : --location=LOCATION)
        --target-snapshot=TARGET_SNAPSHOT [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Revert a Filestore instance to the target snapshot.

    This command can fail for the following reasons:
      o The target snapshot does not exist.
      o The active account does not have permission to revert the instance.
      o The service tier of the instance does not support the operation.

EXAMPLES
    To revert an instance with the name my-instance that's located in
    us-central1 to the target snapshot named my-snapshot , run:

        $ gcloud filestore instances revert my-instance \
            --target-snapshot=my-snapshot --location=us-central1

POSITIONAL ARGUMENTS
     Instance resource - Arguments and flags that specify the Filestore
     instance to revert. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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
          The location of the Filestore instance.

          To set the location attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property filestore/location.

REQUIRED FLAGS
     --target-snapshot=TARGET_SNAPSHOT
        Name of the Filestore snapshot to revert to.

OPTIONAL FLAGS
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
    This command uses the file/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/filestore/

NOTES
    This variant is also available:

        $ gcloud beta filestore instances revert
```

### gcloud beta filestore instances revert

```text
NAME
    gcloud beta filestore instances revert - revert a Filestore instance

SYNOPSIS
    gcloud beta filestore instances revert (INSTANCE : --location=LOCATION)
        --target-snapshot=TARGET_SNAPSHOT [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/revert (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
