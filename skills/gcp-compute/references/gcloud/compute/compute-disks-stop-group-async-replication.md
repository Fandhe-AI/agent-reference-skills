---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/stop-group-async-replication
---

# gcloud compute disks stop-group-async-replication

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute disks stop-group-async-replication

```text
NAME
    gcloud compute disks stop-group-async-replication - consistently stops a
        group of asynchronously replicating disks

SYNOPSIS
    gcloud compute disks stop-group-async-replication
        DISK_CONSISTENCY_GROUP_POLICY [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute disks stop-group-async-replication consistently stops a
    group of asynchronously replicating disks. This command can be invoked in
    either in the primary or secondary scope of the replicating disks.

EXAMPLES
    To stop group replication in the primary scope, include the zone or region
    of the primary disks. The URL of the disk consistency group resource policy
    always uses the region of the primary disks:

        $ gcloud compute disks stop-group-async-replication \
            projects/my-project/regions/us-west1/resourcePolicies/\
        my-policy --zone=us-west1-a

    Alternatively, you can stop replication in the secondary scope. Include the
    region or zone of the secondary disks. The URL of the disk consistency
    group resource policy always uses the region of the primary disks:

        $ gcloud compute disks stop-group-async-replication \
            projects/my-project/regions/us-west1/resourcePolicies/\
        my-policy --zone=us-west2-a

POSITIONAL ARGUMENTS
     DISK_CONSISTENCY_GROUP_POLICY
        URL of the disk consistency group resource policy. The resourcepolicy
        is always in the region of the primary disks.

FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the consistency group's primary or secondary disks. If not
          specified, you might be prompted to select a region (interactive mode
          only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

       --zone=ZONE
          Zone of the consistency group's primary or secondary disks. If not
          specified and the compute/zone property isn't set, you might be
          prompted to select a zone (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
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

        $ gcloud alpha compute disks stop-group-async-replication

        $ gcloud beta compute disks stop-group-async-replication
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute disks stop-group-async-replication projects/my-project/regions/us-west1/resourcePolicies/my-policy \
    --zone=us-west1-a

gcloud compute disks stop-group-async-replication projects/my-project/regions/us-west1/resourcePolicies/my-policy \
    --zone=us-west2-a
```

### gcloud beta compute disks stop-group-async-replication

```text
NAME
    gcloud beta compute disks stop-group-async-replication - consistently stops
        a group of asynchronously replicating disks

SYNOPSIS
    gcloud beta compute disks stop-group-async-replication
        DISK_CONSISTENCY_GROUP_POLICY [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute disks stop-group-async-replication

```text
NAME
    gcloud alpha compute disks stop-group-async-replication - consistently
        stops a group of asynchronously replicating disks

SYNOPSIS
    gcloud alpha compute disks stop-group-async-replication
        DISK_CONSISTENCY_GROUP_POLICY [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/stop-group-async-replication (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
