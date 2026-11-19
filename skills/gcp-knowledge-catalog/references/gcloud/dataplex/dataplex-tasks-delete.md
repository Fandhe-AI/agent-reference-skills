---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/tasks/delete
---

# gcloud dataplex tasks delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex tasks delete

```text
NAME
    gcloud dataplex tasks delete - delete a Dataplex task resource

SYNOPSIS
    gcloud dataplex tasks delete (TASK : --lake=LAKE --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Dataplex task resource.

EXAMPLES
    To delete a Dataplex task test-task within lake test-lake in location
    us-central1, run:

        $ gcloud dataplex tasks delete test-task --location=us-central1 \
          --lake=test-lake

POSITIONAL ARGUMENTS
     Task resource - Arguments and flags that define the Dataplex Task you want
     to delete. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument task on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TASK
          ID of the task or fully qualified identifier for the task.

          To set the task attribute:
          + provide the argument task on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --lake=LAKE
          Identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument task on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument task on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex tasks delete
```

### gcloud alpha dataplex tasks delete

```text
NAME
    gcloud alpha dataplex tasks delete - delete a Dataplex task resource

SYNOPSIS
    gcloud alpha dataplex tasks delete (TASK : --lake=LAKE --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/tasks/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
