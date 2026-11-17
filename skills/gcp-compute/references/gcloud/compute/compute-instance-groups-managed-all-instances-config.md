---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/all-instances-config
---

# gcloud compute instance-groups managed all-instances-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instance-groups managed all-instances-config delete

```text
NAME
    gcloud compute instance-groups managed all-instances-config delete - delete
        values defined in the all-instances configuration of a managed instance
        group

SYNOPSIS
    gcloud compute instance-groups managed all-instances-config delete NAME
        [--labels=KEY,[KEY,...]] [--metadata=KEY,[KEY,...]]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instance-groups managed all-instances-config delete deletes
    one or more values defined in the all-instances configuration of a managed
    instance group.

    To apply a revised all-instances configuration to existing instances in the
    group, use one of the following methods:

      o Update instances using the update-instances command.
      o Recreate instances using the recreate-instances command.
      o Use the rolling-action start-update command.
      o Use the API to set the group's updatePolicy.type to PROACTIVE.

EXAMPLES
    To delete the group's all-instances configuration in order to stop
    overriding the group's instance template for a label with the key label-key
    and metadata with the key metadata-key in group my-group, run:

        $ gcloud compute instance-groups managed all-instances-config \
            delete my-group --metadata=metadata-key --labels=label-key

POSITIONAL ARGUMENTS
     NAME
        Name of the managed instance group to delete the all instances
        configuration for.

FLAGS
     --labels=KEY,[KEY,...]
        Remove labels keys from the group's all instances configuration.

     --metadata=KEY,[KEY,...]
        Remove metadata keys from the group's all instances configuration.

     At most one of these can be specified:

       --region=REGION
          Region of the managed instance group to delete the all instances
          configuration for. If not specified, you might be prompted to select
          a region (interactive mode only).

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          Overrides the default compute/region property value for this command
          invocation.

       --zone=ZONE
          Zone of the managed instance group to delete the all instances
          configuration for. If not specified, you might be prompted to select
          a zone (interactive mode only).

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

        $ gcloud alpha compute instance-groups managed \
            all-instances-config delete

        $ gcloud beta compute instance-groups managed all-instances-config \
            delete
```

### gcloud compute instance-groups managed all-instances-config update

```text
NAME
    gcloud compute instance-groups managed all-instances-config update - update
        the all-instances configuration of a managed instance group

SYNOPSIS
    gcloud compute instance-groups managed all-instances-config update NAME
        [--labels=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instance-groups managed all-instances-config update updates
    the group's all-instances configuration and applies it only to new
    instances that are added to the group.

    To apply a revised all-instances configuration to existing instances in the
    group, use one of the following methods:

      o Update instances using the update-instances command.
      o Recreate instances using the recreate-instances command.
      o Use the rolling-action start-update command.
      o Use the API to set the group's updatePolicy.type to PROACTIVE.

EXAMPLES
    To update an all-instances configuration in order to override the group's
    instance template for a label with the key label-key and metadata with the
    key metadata-key in group my-group, run:

        $ gcloud compute instance-groups managed all-instances-config \
            update my-group \
            --metadata=metadata-key=metadata-override-value \
            --labels=qlabel-key=label-override-value

POSITIONAL ARGUMENTS
     NAME
        Name of the managed instance group to update the all instances
        configuration for.

FLAGS
     --labels=KEY=VALUE,[KEY=VALUE,...]
        Add labels to the group's all instances configuration.

     --metadata=KEY=VALUE,[KEY=VALUE,...]
        Add metadata to the group's all instances configuration.

     At most one of these can be specified:

       --region=REGION
          Region of the managed instance group to update the all instances
          configuration for. If not specified, you might be prompted to select
          a region (interactive mode only).

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          Overrides the default compute/region property value for this command
          invocation.

       --zone=ZONE
          Zone of the managed instance group to update the all instances
          configuration for. If not specified, you might be prompted to select
          a zone (interactive mode only).

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

        $ gcloud alpha compute instance-groups managed \
            all-instances-config update

        $ gcloud beta compute instance-groups managed all-instances-config \
            update
```

### gcloud beta compute instance-groups managed all-instances-config delete

```text
NAME
    gcloud beta compute instance-groups managed all-instances-config delete -
        delete values defined in the all-instances configuration of a managed
        instance group

SYNOPSIS
    gcloud beta compute instance-groups managed all-instances-config delete
        NAME [--labels=KEY,[KEY,...]] [--metadata=KEY,[KEY,...]]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-groups managed all-instances-config update

```text
NAME
    gcloud beta compute instance-groups managed all-instances-config update -
        update the all-instances configuration of a managed instance group

SYNOPSIS
    gcloud beta compute instance-groups managed all-instances-config update
        NAME [--labels=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups managed all-instances-config delete

```text
NAME
    gcloud alpha compute instance-groups managed all-instances-config delete -
        delete values defined in the all-instances configuration of a managed
        instance group

SYNOPSIS
    gcloud alpha compute instance-groups managed all-instances-config delete
        NAME [--labels=KEY,[KEY,...]] [--metadata=KEY,[KEY,...]]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups managed all-instances-config update

```text
NAME
    gcloud alpha compute instance-groups managed all-instances-config update -
        update the all-instances configuration of a managed instance group

SYNOPSIS
    gcloud alpha compute instance-groups managed all-instances-config update
        NAME [--labels=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/all-instances-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
