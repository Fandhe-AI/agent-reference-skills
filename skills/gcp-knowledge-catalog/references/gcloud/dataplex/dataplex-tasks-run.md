---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/tasks/run
---

# gcloud dataplex tasks run

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex tasks run

```text
NAME
    gcloud dataplex tasks run - trigger one-time run of a Dataplex task

SYNOPSIS
    gcloud dataplex tasks run (TASK : --lake=LAKE --location=LOCATION)
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
        [-- execution-spec-args ...]

DESCRIPTION
    Trigger one-time run of a Dataplex task.

EXAMPLES
    To trigger a one-time run of a Dataplex task test-task within lake
    test-lake in location us-central1, run:

        $ gcloud dataplex tasks run test-task --location=us-central1 \
             --lake=test-lake

POSITIONAL ARGUMENTS
     Tasks resource - Arguments and flags that define the Dataplex task you
     want to run. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument task on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TASK
          ID of the tasks or fully qualified identifier for the tasks.

          To set the task attribute:
          + provide the argument task on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --lake=LAKE
          The identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument task on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument task on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

     [-- execution-spec-args ...]
        Execution spec arguments to pass to the driver. Follows the format
        argKey=argValue.

        The '--' argument must be specified between gcloud specific args on the
        left and execution-spec-args on the right.

FLAGS
     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex tasks run
```

### gcloud alpha dataplex tasks run

```text
NAME
    gcloud alpha dataplex tasks run - trigger one-time run of a Dataplex task

SYNOPSIS
    gcloud alpha dataplex tasks run (TASK : --lake=LAKE --location=LOCATION)
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
        [-- execution-spec-args ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/tasks/run (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
