---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/delete-instances
---

# gcloud compute instance-groups managed delete-instances

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instance-groups managed delete-instances

```text
NAME
    gcloud compute instance-groups managed delete-instances - delete instances
        that are managed by a managed instance group

SYNOPSIS
    gcloud compute instance-groups managed delete-instances NAME
        --instances=INSTANCE,[INSTANCE,...] [--no-graceful-shutdown]
        [--skip-instances-on-validation-error] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instance-groups managed delete-instances is used to delete
    one or more instances from a managed instance group. Once the instances are
    deleted, the size of the group is automatically reduced to reflect the
    changes.

    The command returns the operation status per instance, which might be FAIL,
    SUCCESS, SKIPPED, or MEMBER_NOT_FOUND. MEMBER_NOT_FOUND is returned only
    for regional groups when the gcloud command-line tool wasn't able to
    resolve the zone from the instance name. SKIPPED is returned only when the
    --skip-instances-on-validation-error flag is used and the instance is not a
    member of the group or is already being deleted or abandoned.

    If you want to keep the underlying virtual machines but still remove them
    from the managed instance group, use the abandon-instances command instead.

POSITIONAL ARGUMENTS
     NAME
        Name of the managed instance group to operate on.

REQUIRED FLAGS
     --instances=INSTANCE,[INSTANCE,...]
        Names of instances to delete.

OPTIONAL FLAGS
     --no-graceful-shutdown
        End an ongoing graceful shutdown, or delete the specified instances
        without graceful shutdown.

     --skip-instances-on-validation-error
        Specifies whether the request should proceed even if the request
        includes instances that are not members of the group or that are
        already being deleted or abandoned. By default, if you omit this flag
        and such an instance is specified in the request, the operation fails.
        The operation always fails if the request contains a badly formatted
        instance name or a reference to an instance that exists in a zone or
        region other than the group's zone or region.

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

        $ gcloud alpha compute instance-groups managed delete-instances

        $ gcloud beta compute instance-groups managed delete-instances
```

### gcloud beta compute instance-groups managed delete-instances

```text
NAME
    gcloud beta compute instance-groups managed delete-instances - delete
        instances that are managed by a managed instance group

SYNOPSIS
    gcloud beta compute instance-groups managed delete-instances NAME
        --instances=INSTANCE,[INSTANCE,...] [--no-graceful-shutdown]
        [--skip-instances-on-validation-error] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups managed delete-instances

```text
NAME
    gcloud alpha compute instance-groups managed delete-instances - delete
        instances that are managed by a managed instance group

SYNOPSIS
    gcloud alpha compute instance-groups managed delete-instances NAME
        --instances=INSTANCE,[INSTANCE,...] [--no-graceful-shutdown]
        [--skip-instances-on-validation-error] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/delete-instances (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
