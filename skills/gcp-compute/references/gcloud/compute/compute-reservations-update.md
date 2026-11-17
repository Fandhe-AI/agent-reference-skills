---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/reservations/update
---

# gcloud compute reservations update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute reservations update

```text
NAME
    gcloud compute reservations update - update Compute Engine reservations

SYNOPSIS
    gcloud compute reservations update RESERVATION
        [--add-share-with=PROJECT,[PROJECT,...]]
        [--add-share-with-project=PROJECT,[PROJECT,...]]
        [--early-access-maintenance=EARLY_ACCESS_MAINTENANCE]
        [--[no-]enable-emergent-maintenance]
        [--remove-share-with=PROJECT,[PROJECT,...]]
        [--[no-]require-specific-reservation]
        [--reservation-sharing-policy=RESERVATION_SHARING_POLICY]
        [--scheduling-type=SCHEDULING_TYPE] [--share-setting=SHARE_SETTING]
        [--vm-count=VM_COUNT] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update Compute Engine reservations.

EXAMPLES
    To add project-1,project-2,project-3 to the list of projects that are
    shared with a Compute Engine reservation, my-reservation in zone:
    us-central1-a, run:

        $ gcloud compute reservations update my-reservation \
          --add-share-with=project-1,project-2,project-3 \
          --zone=us-central1-a

    To remove project-1,project-2,project-3 from the list of projects that are
    shared with a Compute Engine reservation, my-reservation in zone:
    us-central1-a, run:

        $ gcloud compute reservations update my-reservation \
          --remove-share-with=project-1,project-2,project-3 \
          --zone=us-central1-a

    To update the number of reserved VM instances to 500 for a Compute Engine
    reservation, my-reservation in zone: us-central1-a, run:

        $ gcloud compute reservations update my-reservation \
          --zone=us-central1-a --vm-count=500

POSITIONAL ARGUMENTS
     RESERVATION
        Name of the reservation to update.

FLAGS
     --add-share-with=PROJECT,[PROJECT,...]
        If this reservation is shared (--share-setting is projects), then
        specify a comma-separated list of projects to share the reservation
        with. You must list the projects using project IDs or project numbers.

     --add-share-with-project=PROJECT,[PROJECT,...]
        Specify a comma-separated list of projects to share the reservation
        with. You must list the projects using project IDs or project numbers.

     --early-access-maintenance=EARLY_ACCESS_MAINTENANCE
        Enable this feature to receive quarterly updates and new features for
        your reservation earlier than the standard schedule..
        EARLY_ACCESS_MAINTENANCE must be one of:

         NO_EARLY_ACCESS
            Standard maintenance schedule. The reservation doesn't have early
            access maintenance.
         WAVE1
            Provides the earliest available notification and maintenance.
         WAVE2
            Provides notification and maintenance after WAVE1, but before the
            standard maintenance schedule.

     --[no-]enable-emergent-maintenance
        Enables the reservation to receive notifications when urgent
        maintenance for a GPU VM starts after the VM encounters a host error.
        Use --enable-emergent-maintenance to enable and
        --no-enable-emergent-maintenance to disable.

     --remove-share-with=PROJECT,[PROJECT,...]
        A list of specific projects to remove from the list of projects that
        this reservation is shared with. List must contain project IDs or
        project numbers.

     --[no-]require-specific-reservation
        Whether VMs with matching properties can automatically consume the
        reservation, or whether VMs must target the reservation to consume it.
        If enabled, then only VMs that target this reservation by name with the
        --reservation-affinity=specific flag can consume it. Before you enable
        or disable this configuration, you must stop, suspend, or delete all
        VMs that consume the reservation. Use --require-specific-reservation to
        enable and --no-require-specific-reservation to disable.

     --reservation-sharing-policy=RESERVATION_SHARING_POLICY
        The reservation sharing policy to use for this reservation.
        RESERVATION_SHARING_POLICY must be one of:

         ALLOW_ALL
            The reservation can be shared with Google Cloud services.
         DISALLOW_ALL
            The reservation won't be shared with Google Cloud services. If you
            omit this flag during creation, the default value is DISALLOW_ALL.

     --scheduling-type=SCHEDULING_TYPE
        How Compute Engine schedules maintenance events for your reserved
        hosts. SCHEDULING_TYPE must be one of:

         GROUPED
            In GROUPED mode, maintenance is synchronized across all your VMs.
         INDEPENDENT
            In INDEPENDENT mode, your VMs have different, unsynchronized
            maintenance schedules.

     --share-setting=SHARE_SETTING
        The projects that can use the reservation. SHARE_SETTING must be one
        of:

         local
            Only your project can use the reservation. This is the default
            value.
         projects
            Your project and up to 100 other projects within your project's
            organization can use the reservation. If you specify this value,
            then you must also include the --share-with flag in the command.

     --vm-count=VM_COUNT
        The number of VM instances that are allocated to this reservation. The
        value of this field must be an int in the range [1, 1000].

     --zone=ZONE
        Zone of the reservation to update. If not specified and the
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

        $ gcloud alpha compute reservations update

        $ gcloud beta compute reservations update
```

### gcloud beta compute reservations update

```text
NAME
    gcloud beta compute reservations update - update Compute Engine
        reservations

SYNOPSIS
    gcloud beta compute reservations update RESERVATION
        [--add-share-with=PROJECT,[PROJECT,...]]
        [--add-share-with-project=PROJECT,[PROJECT,...]]
        [--early-access-maintenance=EARLY_ACCESS_MAINTENANCE]
        [--[no-]enable-emergent-maintenance]
        [--remove-share-with=PROJECT,[PROJECT,...]]
        [--[no-]require-specific-reservation]
        [--reservation-sharing-policy=RESERVATION_SHARING_POLICY]
        [--scheduling-type=SCHEDULING_TYPE] [--share-setting=SHARE_SETTING]
        [--share-with=SHARE_WITH,[SHARE_WITH,...]] [--vm-count=VM_COUNT]
        [--zone=ZONE]
        [--delete-after-duration=DELETE_AFTER_DURATION
          | --delete-at-time=DELETE_AT_TIME | --disable-auto-delete]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations update

```text
NAME
    gcloud alpha compute reservations update - update Compute Engine
        reservations

SYNOPSIS
    gcloud alpha compute reservations update RESERVATION
        [--add-share-with=PROJECT,[PROJECT,...]]
        [--add-share-with-folder=FOLDER,[FOLDER,...]]
        [--add-share-with-project=PROJECT,[PROJECT,...]]
        [--early-access-maintenance=EARLY_ACCESS_MAINTENANCE]
        [--[no-]enable-emergent-maintenance]
        [--remove-share-with=PROJECT,[PROJECT,...]]
        [--remove-share-with-folder=FOLDER,[FOLDER,...]]
        [--remove-share-with-project=PROJECT,[PROJECT,...]]
        [--[no-]require-specific-reservation]
        [--reservation-sharing-policy=RESERVATION_SHARING_POLICY]
        [--scheduling-type=SCHEDULING_TYPE] [--share-setting=SHARE_SETTING]
        [--share-with=SHARE_WITH,[SHARE_WITH,...]] [--vm-count=VM_COUNT]
        [--zone=ZONE]
        [--delete-after-duration=DELETE_AFTER_DURATION
          | --delete-at-time=DELETE_AT_TIME | --disable-auto-delete]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Corrected from the official docs (the help text above is verbatim): the `--share-setting` value `projects` says "you must also include the --share-with flag in the command", but `update` has no `--share-with` flag (its SYNOPSIS has `--add-share-with`, `--add-share-with-project` and `--remove-share-with`); use `--add-share-with` to list the projects to share the reservation with.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/reservations/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
