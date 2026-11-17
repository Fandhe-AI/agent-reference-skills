---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/report-host-as-faulty
---

# gcloud compute instances report-host-as-faulty

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instances report-host-as-faulty

```text
NAME
    gcloud compute instances report-host-as-faulty - report a host as faulty to
        start the repair process

SYNOPSIS
    gcloud compute instances report-host-as-faulty INSTANCE_NAME
        --disruption-schedule=DISRUPTION_SCHEDULE
        --fault-reasons=[behavior=BEHAVIOR],[description=DESCRIPTION] [--async]
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instances report-host-as-faulty is used to report a host as
    faulty to start the repair process.

EXAMPLES
    To report a host as faulty for an instance named test-instance, run:

        $ gcloud compute instances report-host-as-faulty test-instance \
            --fault-reasons=behavior=SILENT_DATA_CORRUPTION,\
        description="affecting our ML job" --disruption-schedule=IMMEDIATE

POSITIONAL ARGUMENTS
     INSTANCE_NAME
        Name of the instance to operate on. For details on valid instance
        names, refer to the criteria documented under the field 'name' at:
        https://cloud.google.com/compute/docs/reference/rest/v1/instances

REQUIRED FLAGS
     --disruption-schedule=DISRUPTION_SCHEDULE
        Specifies the timing for initiating the fault reporting process. The
        default value is IMMEDIATE which initiates the process right away.
        DISRUPTION_SCHEDULE must be one of: IMMEDIATE, FUTURE.

     --fault-reasons=[behavior=BEHAVIOR],[description=DESCRIPTION]
        Specified and can include one or more of the following types:
        ['BEHAVIOR_UNSPECIFIED', 'PERFORMANCE', 'SILENT_DATA_CORRUPTION',
        'UNRECOVERABLE_GPU_ERROR', 'CHIP_ERROR']. This helps categorize the
        nature of the fault being reported.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --zone=ZONE
        Zone of the instance to operate on. If not specified, you might be
        prompted to select a zone (interactive mode only). gcloud attempts to
        identify the appropriate zone by searching for resources in your
        currently active project. If the zone cannot be determined, gcloud
        prompts you for a selection with all available Google Cloud Platform
        zones.

        To avoid prompting when this flag is omitted, the user can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instances report-host-as-faulty

        $ gcloud beta compute instances report-host-as-faulty
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute instances report-host-as-faulty test-instance \
    --fault-reasons=behavior=SILENT_DATA_CORRUPTION,description="affecting our ML job" \
    --disruption-schedule=IMMEDIATE
```

### gcloud beta compute instances report-host-as-faulty

```text
NAME
    gcloud beta compute instances report-host-as-faulty - report a host as
        faulty to start the repair process

SYNOPSIS
    gcloud beta compute instances report-host-as-faulty INSTANCE_NAME
        --disruption-schedule=DISRUPTION_SCHEDULE
        --fault-reasons=[behavior=BEHAVIOR],[description=DESCRIPTION] [--async]
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances report-host-as-faulty

```text
NAME
    gcloud alpha compute instances report-host-as-faulty - report a host as
        faulty to start the repair process

SYNOPSIS
    gcloud alpha compute instances report-host-as-faulty INSTANCE_NAME
        --disruption-schedule=DISRUPTION_SCHEDULE
        --fault-reasons=[behavior=BEHAVIOR],[description=DESCRIPTION] [--async]
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/report-host-as-faulty (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
