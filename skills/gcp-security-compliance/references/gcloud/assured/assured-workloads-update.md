---
source: https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/update
---

# gcloud assured workloads update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud assured workloads update

```text
NAME
    gcloud assured workloads update - update Assured Workloads environments

SYNOPSIS
    gcloud assured workloads update
        (WORKLOAD : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--etag=ETAG] [--version=VERSION; default="v1"]
        [--display-name=DISPLAY_NAME --labels=[KEY=VALUE,...]
          --violation-notifications-enabled=VIOLATION_NOTIFICATIONS_ENABLED]
        [--framework-major-revision=FRAMEWORK_MAJOR_REVISION
          --cloud-control-config=[PROPERTY=VALUE,...]
          | --cloud-control-configs-from-file=CLOUD_CONTROL_CONFIGS_FROM_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a given Assured Workloads environment.

EXAMPLES
    To update the display name and labels of a V1 Assured Workload using a full
    resource name:

        $ gcloud assured workloads update \
            organizations/123/locations/us-central1/workloads/456 \
            --display-name=Test-Workload-2 --labels=dept=sec,env=prod \
            --etag=789

    To update a V1 Assured Workload using discrete resource flags:

        $ gcloud assured workloads update 456 --organization=123 \
            --location=us-central1 --display-name=Test-Workload-2 --etag=789

    To update the major revision and cloud control configurations of a V2
    Assured Workload using a full resource name:

        $ gcloud assured workloads update \
            organizations/123/locations/us-central1/workloads/456 \
            --framework-major-revision=2 \
            --cloud-control-configs-from-file=/path/to/controls.yaml \
            --version=v2

    To update the major revision and cloud control configurations of a V2
    Assured Workload using discrete resource flags:

        $ gcloud assured workloads update 456 --organization=123 \
            --location=us-central1 --framework-major-revision=2 \
            --cloud-control-configs-from-file=/path/to/controls.yaml \
            --version=v2

    To update cloud control configurations from a file for a V2 Assured
    Workload:

        $ gcloud assured workloads update 456 --organization=123 \
            --location=us-central1 \
            --cloud-control-configs-from-file=/path/to/controls.yaml \
            --version=v2

    To update a V2 Assured Workload asynchronously:

        $ gcloud assured workloads update 456 --organization=123 \
            --location=us-central1 --framework-major-revision=2 \
            --cloud-control-configs-from-file=/path/to/controls.yaml \
            --async --version=v2

POSITIONAL ARGUMENTS
     Workload resource - The Assured Workloads environment resource to update.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       WORKLOAD
          ID of the workload or fully qualified identifier for the workload.

          To set the workload attribute:
          + provide the argument workload on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the workload.

          To set the location attribute:
          + provide the argument workload on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The parent organization for the workload.

          To set the organization attribute:
          + provide the argument workload on the command line with a fully
            specified name;
          + provide the argument --organization on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        The etag acquired by reading the Assured Workloads environment before
        updating.

     --version=VERSION; default="v1"
        Assured Workloads API version to use. Options are v1 and v2. Defaults
        to v1. VERSION must be one of: v1, v2.

V1 UPDATE FLAGS
     Settings that can be updated on the Assured Workloads environment.

     --display-name=DISPLAY_NAME
        The new display name of the Assured Workloads environment (V1).

     --labels=[KEY=VALUE,...]
        The new labels of the Assured Workloads environment, for example,
        LabelKey1=LabelValue1,LabelKey2=LabelValue2 (V1).

     --violation-notifications-enabled=VIOLATION_NOTIFICATIONS_ENABLED
        The notification setting of the Assured Workloads environment (V1).

V2 UPDATE FLAGS
     --framework-major-revision=FRAMEWORK_MAJOR_REVISION
        Updated major revision ID for the workload (V2).

     At most one of these can be specified:

       --cloud-control-config=[PROPERTY=VALUE,...]
          Updated repeated inline control configuration (V2).

       --cloud-control-configs-from-file=CLOUD_CONTROL_CONFIGS_FROM_FILE
          Path to JSON/YAML file specifying updated control configurations
          (V2).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha assured workloads update

        $ gcloud beta assured workloads update
```

### gcloud beta assured workloads update

```text
NAME
    gcloud beta assured workloads update - update Assured Workloads
        environments

SYNOPSIS
    gcloud beta assured workloads update
        (WORKLOAD : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--etag=ETAG] [--version=VERSION; default="v1"]
        [--display-name=DISPLAY_NAME --labels=[KEY=VALUE,...]
          --violation-notifications-enabled=VIOLATION_NOTIFICATIONS_ENABLED]
        [--framework-major-revision=FRAMEWORK_MAJOR_REVISION
          --cloud-control-config=[PROPERTY=VALUE,...]
          | --cloud-control-configs-from-file=CLOUD_CONTROL_CONFIGS_FROM_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha assured workloads update

```text
NAME
    gcloud alpha assured workloads update - update Assured Workloads
        environments

SYNOPSIS
    gcloud alpha assured workloads update
        (WORKLOAD : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--etag=ETAG] [--version=VERSION; default="v1"]
        [--display-name=DISPLAY_NAME --labels=[KEY=VALUE,...]
          --violation-notifications-enabled=VIOLATION_NOTIFICATIONS_ENABLED]
        [--framework-major-revision=FRAMEWORK_MAJOR_REVISION
          --cloud-control-config=[PROPERTY=VALUE,...]
          | --cloud-control-configs-from-file=CLOUD_CONTROL_CONFIGS_FROM_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
