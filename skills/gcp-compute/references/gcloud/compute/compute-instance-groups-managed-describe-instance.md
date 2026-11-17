---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/describe-instance
---

# gcloud compute instance-groups managed describe-instance

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instance-groups managed describe-instance

```text
NAME
    gcloud compute instance-groups managed describe-instance - describe an
        instance in a managed instance group

SYNOPSIS
    gcloud compute instance-groups managed describe-instance NAME
        --instance=INSTANCE [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instance-groups managed describe-instance describes an
    instance in a managed instance group, listing all its attributes in YAML
    format.

EXAMPLES
    To describe an instance instance-1 in my-group (in region europe-west4),
    run:

        $ gcloud compute instance-groups managed describe-instance \
          my-group --instance=instance-1 --region=europe-west4

POSITIONAL ARGUMENTS
     NAME
        Name of the managed instance group to describe an instance in.

REQUIRED FLAGS
     --instance=INSTANCE
        Name of the managed instance to describe.

OPTIONAL FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the managed instance group to describe an instance in. If
          not specified, you might be prompted to select a region (interactive
          mode only).

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          Overrides the default compute/region property value for this command
          invocation.

       --zone=ZONE
          Zone of the managed instance group to describe an instance in. If not
          specified, you might be prompted to select a zone (interactive mode
          only).

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

        $ gcloud alpha compute instance-groups managed describe-instance

        $ gcloud beta compute instance-groups managed describe-instance
```

### gcloud beta compute instance-groups managed describe-instance

```text
NAME
    gcloud beta compute instance-groups managed describe-instance - describe an
        instance in a managed instance group

SYNOPSIS
    gcloud beta compute instance-groups managed describe-instance NAME
        --instance=INSTANCE [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups managed describe-instance

```text
NAME
    gcloud alpha compute instance-groups managed describe-instance - describe
        an instance in a managed instance group

SYNOPSIS
    gcloud alpha compute instance-groups managed describe-instance NAME
        --instance=INSTANCE [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/describe-instance (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
