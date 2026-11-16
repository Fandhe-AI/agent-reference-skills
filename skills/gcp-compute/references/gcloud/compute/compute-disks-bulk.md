---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/bulk
---

# gcloud compute disks bulk

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute disks bulk create

```text
NAME
    gcloud compute disks bulk create - create multiple Compute Engine disks or
        a consistency group of instant snapshots

SYNOPSIS
    gcloud compute disks bulk create (--region=REGION | --zone=ZONE)
        [--source-consistency-group-policy=SOURCE_CONSISTENCY_GROUP_POLICY]
        [--source-instant-snapshot-group=SOURCE_INSTANT_SNAPSHOT_GROUP]
        [--source-instant-snapshot-group-region=SOURCE_INSTANT_SNAPSHOT_GROUP_REGION | --source-instant-snapshot-group-zone=SOURCE_INSTANT_SNAPSHOT_GROUP_ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute disks bulk create facilitates the creation of multiple
    Compute Engine disks with a single command. This includes cloning a set of
    Async PD secondary disks with the same consistency group policy or a
    consistency group of instant snapshots.

EXAMPLES
    To consistently clone secondary disks with the same consistency group
    policy
    'projects/example-project/regions/us-central1/resourcePolicies/example-group-policy'
    to target zone 'us-central1-a', run:

        $ gcloud compute disks bulk create \
            --source-consistency-group-policy=projects/example-project/\
        regions/us-central1/resourcePolicies/example-group-policy \
            --zone=us-central1-a

REQUIRED FLAGS
     Exactly one of these must be specified:

       --region=REGION
          Target region of the created disks, which currently must be the same
          as the source region. If not specified, you might be prompted to
          select a region (interactive mode only).

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
          Target zone of the created disks, which currently must be the same as
          the source zone. If not specified and the compute/zone property isn't
          set, you might be prompted to select a zone (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/zone property:

              $ gcloud config set compute/zone ZONE

          A list of zones can be fetched by running:

              $ gcloud compute zones list

          To unset the property, run:

              $ gcloud config unset compute/zone

          Alternatively, the zone can be stored in the environment variable
          CLOUDSDK_COMPUTE_ZONE.

OPTIONAL FLAGS
     --source-consistency-group-policy=SOURCE_CONSISTENCY_GROUP_POLICY
        URL of the format regions/<REGION>/resourcePolicies/<RESOURCE_POLICY>
        of the source consistency group resource policy. The resource policy is
        always in the same region as the source disks.

     --source-instant-snapshot-group=SOURCE_INSTANT_SNAPSHOT_GROUP
        URL of the format
        regions/<REGION>/instantSnapshotGroups/<INSTANT_SNAPSHOT_GROUP> or
        zones/<ZONE>/instantSnapshotGroups/<INSTANT_SNAPSHOT_GROUP> of the
        source consistency group of instant snapshots used to create the disks.

     At most one of these can be specified:

       --source-instant-snapshot-group-region=SOURCE_INSTANT_SNAPSHOT_GROUP_REGION
          Region of the source instant snapshot group to operate on. Overrides
          the default compute/region property value for this command
          invocation.

       --source-instant-snapshot-group-zone=SOURCE_INSTANT_SNAPSHOT_GROUP_ZONE
          Zone of the source instant snapshot group to operate on. Overrides
          the default compute/zone property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute disks bulk create

        $ gcloud beta compute disks bulk create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute disks bulk create \
    --source-consistency-group-policy=projects/example-project/regions/us-central1/resourcePolicies/example-group-policy \
    --zone=us-central1-a
```

### gcloud compute disks bulk set-labels

```text
NAME
    gcloud compute disks bulk set-labels - add or remove labels on multiple
        Compute Engine disks

SYNOPSIS
    gcloud compute disks bulk set-labels
        (--source=SOURCE | --disks=[DISK_NAME,...] --labels=[KEY=VALUE,...])
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute disks bulk set-labels allows you to add or remove labels on
    multiple Compute Engine disks in a single zone. Labels are key-value pairs
    that help you organize your Google Cloud resources.

    You can specify the disks and their labels in two ways:

    1. By providing a JSON file using the --source flag. Each request in the
    JSON list must specify the disk name and labels, and may optionally include
    label_fingerprint for optimistic concurrency control.

    2. By providing a list of disk names using the --disks flag and the labels
    to apply using the --labels flag.

EXAMPLES
    To set the labels env=production and team=sre on disk-1 and disk-2 in zone
    us-central1-a, run:

        $ gcloud compute disks bulk set-labels --zone=us-central1-a \
            --disks=disk-1,disk-2 --labels=env=production,team=sre

    To clear all labels on disk-3 and disk-4 in zone europe-west1-b provide an
    empty value to --labels, run:

        $ gcloud compute disks bulk set-labels --zone=europe-west1-b \
            --disks=disk-3,disk-4 --labels=''

    If a disk has multiple labels and you want to remove particular labels,
    specify all the labels that you want to keep and omit the labels that you
    want to remove. This is because the gcloud compute disks bulk set-labels
    command replaces the entire label map.

    For example, if disk-5 has the labels env=production and team=sre, then to
    remove the env label, include the team=sre label in the --labels argument:

        $ gcloud compute disks bulk set-labels --zone=us-central1-a \
            --disks=disk-5 --labels=team=sre

    To set labels based on a JSON file named disk_labels.json, run:

    Example `disk_labels.json` content:        [
          {
            "name": "disk-1",
            "labels": { "env": "production", "team": "sre" },
            "label_fingerprint": "42WmSpB8rSM="
          },
          {
            "name": "disk-2",
            "labels": { "env": "production", "team": "sre" }
          }
        ]

        $ gcloud compute disks bulk set-labels --zone=us-central1-a \
            --source=disk_labels.json

    To clear all labels on disk-3 and disk-4 in zone europe-west1-b provide an
    empty labels value in the JSON file, run:

    Example `disk_labels.json` content:        [
          {
            "name": "disk-3",
            "labels": {}
          },
          {
            "name": "disk-4",
            "labels": {}
          }
        ]

        $ gcloud compute disks bulk set-labels --zone=europe-west1-b \
            --source=disk_labels.json

    To remove the env label from disk-5 using a JSON file, omit the env label
    and include all the labels that you want to keep.

    Example `disk_labels.json` content:        [
          {
            "name": "disk-5",
            "labels": { "team": "sre" }
          }
        ]

        $ gcloud compute disks bulk set-labels --zone=us-central1-a \
            --source=disk_labels.json

REQUIRED FLAGS
     Exactly one of these must be specified:

       --source=SOURCE
          Path to a JSON file containing a list of disk label update requests.
          Each request object must specify "name" and "labels", and may
          optionally include "label_fingerprint".

       Or at least one of these can be specified:

         --disks=[DISK_NAME,...]
            Comma-separated list of disk names to update.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --labels=[KEY=VALUE,...]
            List of label KEY=VALUE pairs to set on all specified disks.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

OPTIONAL FLAGS
     --zone=ZONE
        Zone of the disk to update labels. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

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

        $ gcloud alpha compute disks bulk set-labels

        $ gcloud beta compute disks bulk set-labels
```

### gcloud beta compute disks bulk create

```text
NAME
    gcloud beta compute disks bulk create - create multiple Compute Engine
        disks or a consistency group of instant snapshots

SYNOPSIS
    gcloud beta compute disks bulk create (--region=REGION | --zone=ZONE)
        [--source-consistency-group-policy=SOURCE_CONSISTENCY_GROUP_POLICY]
        [--source-instant-snapshot-group=SOURCE_INSTANT_SNAPSHOT_GROUP]
        [--source-instant-snapshot-group-region=SOURCE_INSTANT_SNAPSHOT_GROUP_REGION | --source-instant-snapshot-group-zone=SOURCE_INSTANT_SNAPSHOT_GROUP_ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute disks bulk set-labels

```text
NAME
    gcloud beta compute disks bulk set-labels - add or remove labels on
        multiple Compute Engine disks

SYNOPSIS
    gcloud beta compute disks bulk set-labels
        (--source=SOURCE | --disks=[DISK_NAME,...] --labels=[KEY=VALUE,...])
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute disks bulk create

```text
NAME
    gcloud alpha compute disks bulk create - create multiple Compute Engine
        disks or a consistency group of instant snapshots

SYNOPSIS
    gcloud alpha compute disks bulk create (--region=REGION | --zone=ZONE)
        [--snapshot-group-params=[replica-zones=REPLICA-ZONES],[type=TYPE]]
        [--source-consistency-group-policy=SOURCE_CONSISTENCY_GROUP_POLICY]
        [--source-instant-snapshot-group=SOURCE_INSTANT_SNAPSHOT_GROUP]
        [--source-snapshot-group=SOURCE_SNAPSHOT_GROUP]
        [--source-instant-snapshot-group-region=SOURCE_INSTANT_SNAPSHOT_GROUP_REGION | --source-instant-snapshot-group-zone=SOURCE_INSTANT_SNAPSHOT_GROUP_ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute disks bulk set-labels

```text
NAME
    gcloud alpha compute disks bulk set-labels - add or remove labels on
        multiple Compute Engine disks

SYNOPSIS
    gcloud alpha compute disks bulk set-labels
        (--source=SOURCE | --disks=[DISK_NAME,...] --labels=[KEY=VALUE,...])
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/bulk (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
