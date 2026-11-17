---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/wait-until-stable
---

# gcloud compute instance-groups managed wait-until-stable

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instance-groups managed wait-until-stable

```text
NAME
    gcloud compute instance-groups managed wait-until-stable - waits until
        state of managed instance group is stable

SYNOPSIS
    gcloud compute instance-groups managed wait-until-stable NAME
        [--timeout=TIMEOUT] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Waits until state of managed instance group is stable.

    gcloud compute instance-groups managed wait-until-stable is deprecated.
    Please use gcloud compute instance-groups managed wait-until --stable
    instead.

POSITIONAL ARGUMENTS
     NAME
        Name of the managed instance group to operate on.

FLAGS
     --timeout=TIMEOUT
        Timeout in seconds for waiting for group becoming stable.

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

        $ gcloud alpha compute instance-groups managed wait-until-stable

        $ gcloud beta compute instance-groups managed wait-until-stable
```

### gcloud beta compute instance-groups managed wait-until-stable

```text
NAME
    gcloud beta compute instance-groups managed wait-until-stable - waits until
        state of managed instance group is stable

SYNOPSIS
    gcloud beta compute instance-groups managed wait-until-stable NAME
        [--timeout=TIMEOUT] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups managed wait-until-stable

```text
NAME
    gcloud alpha compute instance-groups managed wait-until-stable - waits
        until state of managed instance group is stable

SYNOPSIS
    gcloud alpha compute instance-groups managed wait-until-stable NAME
        [--timeout=TIMEOUT] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute instance-groups managed wait-until-stable`: "Waits until state of managed instance group is stable. gcloud compute instance-groups managed wait-until-stable is deprecated. Please use gcloud compute instance-groups managed wait-until --stable instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/wait-until-stable (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
