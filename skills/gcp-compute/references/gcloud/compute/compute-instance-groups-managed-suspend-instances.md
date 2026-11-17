---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/suspend-instances
---

# gcloud compute instance-groups managed suspend-instances

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instance-groups managed suspend-instances

```text
NAME
    gcloud compute instance-groups managed suspend-instances - suspend
        instances owned by a managed instance group

SYNOPSIS
    gcloud compute instance-groups managed suspend-instances NAME
        --instances=INSTANCE,[INSTANCE,...] [--force]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instance-groups managed suspend-instances suspends one or
    more instances from a managed instance group, thereby reducing the
    targetSize and increasing the targetSuspendedSize of the group.

    The command returns the operation status per instance, which might be FAIL,
    SUCCESS, or MEMBER_NOT_FOUND. MEMBER_NOT_FOUND is returned only for
    regional groups when the gcloud command-line tool wasn't able to resolve
    the zone from the instance name.

EXAMPLES
    To suspend an instance from a managed instance group in the us-central1-a
    zone, run:

        $ gcloud compute instance-groups managed suspend-instances \
        example-managed-instance-group --zone=us-central1-a \
        --instances=example-instance

POSITIONAL ARGUMENTS
     NAME
        Name of the managed instance group to operate on.

REQUIRED FLAGS
     --instances=INSTANCE,[INSTANCE,...]
        Names of instances to suspend.

OPTIONAL FLAGS
     --force
        Immediately suspend the specified instances, skipping the initial
        delay, if one is specified in the standby policy.

     At most one of these can be specified:

       --region=REGION
          Region of the managed instance group to operate on. If not specified,
          you might be prompted to select a region (interactive mode only).

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          Overrides the default compute/region property value for this command
          invocation.

       --zone=ZONE
          Zone of the managed instance group to operate on. If not specified,
          you might be prompted to select a zone (interactive mode only).

          A list of zones can be fetched by running:

              $ gcloud compute zones list

          Overrides the default compute/zone property value for this command
          invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instance-groups managed suspend-instances

        $ gcloud beta compute instance-groups managed suspend-instances
```

### gcloud beta compute instance-groups managed suspend-instances

```text
NAME
    gcloud beta compute instance-groups managed suspend-instances - suspend
        instances owned by a managed instance group

SYNOPSIS
    gcloud beta compute instance-groups managed suspend-instances NAME
        --instances=INSTANCE,[INSTANCE,...] [--force]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups managed suspend-instances

```text
NAME
    gcloud alpha compute instance-groups managed suspend-instances - suspend
        instances owned by a managed instance group

SYNOPSIS
    gcloud alpha compute instance-groups managed suspend-instances NAME
        --instances=INSTANCE,[INSTANCE,...] [--force]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/suspend-instances (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
