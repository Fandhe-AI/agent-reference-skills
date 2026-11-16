---
source: https://docs.cloud.google.com/sdk/gcloud/reference/batch/jobs
---

# gcloud batch jobs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud batch jobs cancel

```text
NAME
    gcloud batch jobs cancel - cancel a job

SYNOPSIS
    gcloud batch jobs cancel (JOB : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The job specified does not exist.
      o The active account does not have permission to cancel the given job.

EXAMPLES
    To cancel the job with name projects/foo/locations/us-central1/jobs/bar,
    run:

        $ gcloud batch jobs cancel \
            projects/foo/locations/us-central1/jobs/bar

POSITIONAL ARGUMENTS
     Job resource - The Batch job resource. If --location not specified,the
     current batch/location is used. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument JOB on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       JOB
          ID of the job or fully qualified identifier for the job.

          To set the job attribute:
          + provide the argument JOB on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the job.

          To set the location attribute:
          + provide the argument JOB on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property batch/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha batch jobs cancel

        $ gcloud beta batch jobs cancel
```

### gcloud batch jobs delete

```text
NAME
    gcloud batch jobs delete - delete a job

SYNOPSIS
    gcloud batch jobs delete (JOB : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The job specified does not exist.
      o The active account does not have permission to delete the given job.

EXAMPLES
    To delete the job with name projects/foo/locations/us-central1/jobs/bar,
    run:

        $ gcloud batch jobs delete \
            projects/foo/locations/us-central1/jobs/bar

POSITIONAL ARGUMENTS
     Job resource - The Batch job resource. If --location not specified,the
     current batch/location is used. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument JOB on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       JOB
          ID of the job or fully qualified identifier for the job.

          To set the job attribute:
          + provide the argument JOB on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the job.

          To set the location attribute:
          + provide the argument JOB on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property batch/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha batch jobs delete

        $ gcloud beta batch jobs delete
```

### gcloud batch jobs describe

```text
NAME
    gcloud batch jobs describe - show details of a job

SYNOPSIS
    gcloud batch jobs describe (JOB : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The job specified does not exist.
      o The active account does not have permission to access the given job.

EXAMPLES
    To print details of the job with name
    projects/foo/locations/us-central1/jobs/bar, run:

        $ gcloud batch jobs describe \
            projects/foo/locations/us-central1/jobs/bar

POSITIONAL ARGUMENTS
     Job resource - The Batch job resource. If --location not specified,the
     current batch/location is used. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument JOB on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       JOB
          ID of the job or fully qualified identifier for the job.

          To set the job attribute:
          + provide the argument JOB on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the job.

          To set the location attribute:
          + provide the argument JOB on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property batch/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha batch jobs describe

        $ gcloud beta batch jobs describe
```

### gcloud batch jobs list

```text
NAME
    gcloud batch jobs list - list jobs for a specified Batch project/location

SYNOPSIS
    gcloud batch jobs list [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The project/location specified do not exist.
      o The active account does not have permission to access the given
        project/location.

EXAMPLES
    To print all the jobs under all available locations for the default
    project, run:

        $ gcloud batch jobs list

    To print all the jobs under projects/location
    projects/foo/locations/us-central1, run:

        $ gcloud batch jobs list --project=foo --location=us-central1

FLAGS
     Location resource - The Batch location resource. If you omit this flag,
     the defaultlocation is used if you set the batch/location
     property.Otherwise, omitting this flag lists jobs across all locations.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property batch/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property batch/location.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha batch jobs list

        $ gcloud beta batch jobs list
```

### gcloud batch jobs submit

```text
NAME
    gcloud batch jobs submit - submit a Batch job

SYNOPSIS
    gcloud batch jobs submit [[JOB] --location=LOCATION]
        (--config=PATH_TO_FILE
          --container-commands-file=CONTAINER_COMMANDS_FILE
          --container-entrypoint=CONTAINER_ENTRYPOINT
          --container-image-uri=CONTAINER_IMAGE_URI
          | --script-file-path=SCRIPT_FILE_PATH | --script-text=SCRIPT_TEXT)
        [--job-prefix=JOB_PREFIX] [--machine-type=MACHINE_TYPE]
        [--priority=PRIORITY] [--provisioning-model=PROVISIONING_MODEL]
        [--network=NETWORK --subnetwork=SUBNETWORK : --no-external-ip-address]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates and submits a Batch job. After you create and submit
    the job, Batch automatically queues, schedules, and executes it.

EXAMPLES
    To submit a job with a sample JSON configuration file (config.json) and
    name projects/foo/locations/us-central1/jobs/bar, run:

        $ gcloud batch jobs submit \
            projects/foo/locations/us-central1/jobs/bar --config=config.json

    To submit a job with a sample YAML configuration file (config.yaml) and
    name projects/foo/locations/us-central1/jobs/bar, run:

        $ gcloud batch jobs submit \
            projects/foo/locations/us-central1/jobs/bar --config=config.yaml

    To submit a job through stdin with a sample job configuration and name
    projects/foo/locations/us-central1/jobs/bar, run:

        $ gcloud batch jobs submit \
            projects/foo/locations/us-central1/jobs/bar --config=-

        then input json job config via stdin
        {
          job config
        }

    To submit a job through HereDoc with a sample job configuration and name
    projects/foo/locations/us-central1/jobs/bar, run:

        $ gcloud batch jobs submit \
            projects/foo/locations/us-central1/jobs/bar --config=- << EOF

        {
          job config
        }
        EOF

    For details about how to define a job's configuration using JSON, see the
    projects.locations.jobs resource in the Batch API Reference. If you want to
    define a job's configuration using YAML, convert the JSON syntax to YAML.

POSITIONAL ARGUMENTS
     Job resource - The Batch job resource. If --location not specified,the
     current batch/location is used. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument JOB on the command line with a fully specified
        name;
      * job ID is optional and will be generated if not specified with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     [JOB]
        ID of the job or fully qualified identifier for the job.

        To set the job attribute:
        * provide the argument JOB on the command line;
        * job ID is optional and will be generated if not specified.

     --location=LOCATION
        Google Cloud location for the job.

        To set the location attribute:
        * provide the argument JOB on the command line with a fully specified
          name;
        * job ID is optional and will be generated if not specified with a
          fully specified name;
        * provide the argument --location on the command line;
        * set the property batch/location.

REQUIRED FLAGS
     At least one of these must be specified:

       --config=PATH_TO_FILE
          The file path of the job config file in either JSON or YAML format.
          It also supports direct input from stdin with '-' or HereDoc (in
          shells with HereDoc support like Bash) with '- <<DELIMITER'.

          Use a full or relative path to a local file containing the value of
          config.

       Either specify the config file for the job or the first runnable in the
       task spec. Specify either a script file or container arguments for the
       first runnable in the task spec.

       At most one of these can be specified:

         Options to specify the container arguments for the first runnable in
         the task spec.

         --container-commands-file=CONTAINER_COMMANDS_FILE
            Overrides the CMD specified in the container. If there is an
            ENTRYPOINT (either in the container image or with the entrypoint
            field below) then commands are appended as arguments to the
            ENTRYPOINT.

         --container-entrypoint=CONTAINER_ENTRYPOINT
            Overrides the ENTRYPOINT specified in the container.

         --container-image-uri=CONTAINER_IMAGE_URI
            The URI to pull the container image from.

         Either specify a path to a script file to run or provide inline text
         to execute directly.

         At most one of these can be specified:

           --script-file-path=SCRIPT_FILE_PATH
              Path to script file to run as first runnable in task spec. File
              path should be a valid path on the instance volume.

           --script-text=SCRIPT_TEXT
              Text to run as first runnable in task spec.

OPTIONAL FLAGS
     --job-prefix=JOB_PREFIX
        Specify the job prefix. A job ID in the format of job prefix +
        %Y%m%d-%H%M%S will be generated. Note that job prefix cannot be
        specified while JOB ID positional argument is specified.

     --machine-type=MACHINE_TYPE
        Specify the Compute Engine machine type, for example, e2-standard-4.
        Currently only one machine type is supported.

     --priority=PRIORITY
        Job priority [0-99] 0 is the lowest priority.

     --provisioning-model=PROVISIONING_MODEL
        Specify the allowed provisioning model for the compute instances.
        PROVISIONING_MODEL must be one of:

         SPOT
            The SPOT VM provisioning model. Ideal for fault-tolerant workloads
            that can withstand preemption.
         STANDARD
            The STANDARD VM provisioning model

     --network=NETWORK
        The URL for the network resource. Must specify subnetwork as well if
        network is specified

     --subnetwork=SUBNETWORK
        The URL for the subnetwork resource. Must specify network as well if
        subnetwork is specified

     --no-external-ip-address
        Required if no external public IP address is attached to the VM. If no
        external public IP address, additional configuration is required to
        allow the VM to access Google Services.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha batch jobs submit

        $ gcloud beta batch jobs submit
```

### gcloud beta batch jobs cancel

```text
NAME
    gcloud beta batch jobs cancel - cancel a job

SYNOPSIS
    gcloud beta batch jobs cancel (JOB : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta batch jobs delete

```text
NAME
    gcloud beta batch jobs delete - delete a job

SYNOPSIS
    gcloud beta batch jobs delete (JOB : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta batch jobs describe

```text
NAME
    gcloud beta batch jobs describe - show details of a job

SYNOPSIS
    gcloud beta batch jobs describe (JOB : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta batch jobs list

```text
NAME
    gcloud beta batch jobs list - list jobs for a specified Batch
        project/location

SYNOPSIS
    gcloud beta batch jobs list [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta batch jobs submit

```text
NAME
    gcloud beta batch jobs submit - submit a Batch job

SYNOPSIS
    gcloud beta batch jobs submit [[JOB] --location=LOCATION]
        (--config=PATH_TO_FILE
          --container-commands-file=CONTAINER_COMMANDS_FILE
          --container-entrypoint=CONTAINER_ENTRYPOINT
          --container-image-uri=CONTAINER_IMAGE_URI
          | --script-file-path=SCRIPT_FILE_PATH | --script-text=SCRIPT_TEXT)
        [--job-prefix=JOB_PREFIX] [--machine-type=MACHINE_TYPE]
        [--priority=PRIORITY] [--provisioning-model=PROVISIONING_MODEL]
        [--network=NETWORK --subnetwork=SUBNETWORK : --no-external-ip-address]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha batch jobs cancel

```text
NAME
    gcloud alpha batch jobs cancel - cancel a job

SYNOPSIS
    gcloud alpha batch jobs cancel (JOB : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha batch jobs delete

```text
NAME
    gcloud alpha batch jobs delete - delete a job

SYNOPSIS
    gcloud alpha batch jobs delete (JOB : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha batch jobs describe

```text
NAME
    gcloud alpha batch jobs describe - show details of a job

SYNOPSIS
    gcloud alpha batch jobs describe (JOB : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha batch jobs list

```text
NAME
    gcloud alpha batch jobs list - list jobs for a specified Batch
        project/location

SYNOPSIS
    gcloud alpha batch jobs list [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha batch jobs submit

```text
NAME
    gcloud alpha batch jobs submit - submit a Batch job

SYNOPSIS
    gcloud alpha batch jobs submit [[JOB] --location=LOCATION]
        (--config=PATH_TO_FILE
          --container-commands-file=CONTAINER_COMMANDS_FILE
          --container-entrypoint=CONTAINER_ENTRYPOINT
          --container-image-uri=CONTAINER_IMAGE_URI
          | --script-file-path=SCRIPT_FILE_PATH | --script-text=SCRIPT_TEXT)
        [--job-prefix=JOB_PREFIX] [--machine-type=MACHINE_TYPE]
        [--priority=PRIORITY] [--provisioning-model=PROVISIONING_MODEL]
        [--network=NETWORK --subnetwork=SUBNETWORK : --no-external-ip-address]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/batch/jobs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
