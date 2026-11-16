---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/complete-control-plane-upgrade
---

# gcloud container clusters complete-control-plane-upgrade

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container clusters complete-control-plane-upgrade

```text
NAME
    gcloud container clusters complete-control-plane-upgrade - complete the
        control plane upgrade for an existing cluster

SYNOPSIS
    gcloud container clusters complete-control-plane-upgrade NAME
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Complete the control plane upgrade for an existing cluster.

EXAMPLES
    To complete the control plane upgrade for an existing cluster, run:

        $ gcloud container clusters complete-control-plane-upgrade \
            sample-cluster

POSITIONAL ARGUMENTS
     NAME
        The name of your existing cluster.

FLAGS
     At most one of these can be specified:

       --location=LOCATION
          Compute zone or region (e.g. us-central1-a or us-central1) for the
          cluster. Overrides the default compute/region or compute/zone value
          for this command invocation. Prefer using this flag over the --region
          or --zone flags.

       --region=REGION
          Compute region (e.g. us-central1) for a regional cluster. Overrides
          the default compute/region property value for this command
          invocation.

       --zone=ZONE, -z ZONE
          Compute zone (e.g. us-central1-a) for a zonal cluster. Overrides the
          default compute/zone property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container clusters complete-control-plane-upgrade

        $ gcloud beta container clusters complete-control-plane-upgrade
```

### gcloud beta container clusters complete-control-plane-upgrade

```text
NAME
    gcloud beta container clusters complete-control-plane-upgrade - complete
        the control plane upgrade for an existing cluster

SYNOPSIS
    gcloud beta container clusters complete-control-plane-upgrade NAME
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container clusters complete-control-plane-upgrade

```text
NAME
    gcloud alpha container clusters complete-control-plane-upgrade - complete
        the control plane upgrade for an existing cluster

SYNOPSIS
    gcloud alpha container clusters complete-control-plane-upgrade NAME
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/complete-control-plane-upgrade (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
