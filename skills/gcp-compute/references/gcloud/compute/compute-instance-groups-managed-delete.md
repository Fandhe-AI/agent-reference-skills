---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/delete
---

# gcloud compute instance-groups managed delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instance-groups managed delete

```text
NAME
    gcloud compute instance-groups managed delete - delete Compute Engine
        managed instance groups

SYNOPSIS
    gcloud compute instance-groups managed delete NAMES [NAMES ...] [--async]
        [--no-graceful-shutdown] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instance-groups managed delete deletes one or more Compute
    Engine managed instance groups.

POSITIONAL ARGUMENTS
     NAMES [NAMES ...]
        Names of the managed instance groups to delete.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --no-graceful-shutdown
        Delete the managed instance group without graceful shutdown.

     At most one of these can be specified:

       --region=REGION
          Region of the managed instance groups to delete. If not specified,
          you might be prompted to select a region (interactive mode only).

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          Overrides the default compute/region property value for this command
          invocation.

       --zone=ZONE
          Zone of the managed instance groups to delete. If not specified, you
          might be prompted to select a zone (interactive mode only).

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

        $ gcloud alpha compute instance-groups managed delete

        $ gcloud beta compute instance-groups managed delete
```

### gcloud beta compute instance-groups managed delete

```text
NAME
    gcloud beta compute instance-groups managed delete - delete Compute Engine
        managed instance groups

SYNOPSIS
    gcloud beta compute instance-groups managed delete NAMES [NAMES ...]
        [--async] [--no-graceful-shutdown] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups managed delete

```text
NAME
    gcloud alpha compute instance-groups managed delete - delete Compute Engine
        managed instance groups

SYNOPSIS
    gcloud alpha compute instance-groups managed delete NAMES [NAMES ...]
        [--async] [--no-graceful-shutdown] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
