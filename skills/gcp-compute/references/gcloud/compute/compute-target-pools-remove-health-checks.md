---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-pools/remove-health-checks
---

# gcloud compute target-pools remove-health-checks

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute target-pools remove-health-checks

```text
NAME
    gcloud compute target-pools remove-health-checks - remove an HTTP health
        check from a target pool

SYNOPSIS
    gcloud compute target-pools remove-health-checks NAME
        --http-health-check=HTTP_HEALTH_CHECK [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-pools remove-health-checks is used to remove an HTTP
    health check from a target pool. Health checks are used to determine the
    health status of instances in the target pool. For more information on
    health checks and load balancing, see
    https://cloud.google.com/compute/docs/load-balancing-and-autoscaling/

POSITIONAL ARGUMENTS
     NAME
        The name of the target pool from which to remove the health check.

REQUIRED FLAGS
     --http-health-check=HTTP_HEALTH_CHECK
        Specifies an HTTP health check object to remove from the target pool.

OPTIONAL FLAGS
     --region=REGION
        Region of the target pool to remove health checks from. If not
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-pools remove-health-checks

        $ gcloud beta compute target-pools remove-health-checks
```

### gcloud beta compute target-pools remove-health-checks

```text
NAME
    gcloud beta compute target-pools remove-health-checks - remove an HTTP
        health check from a target pool

SYNOPSIS
    gcloud beta compute target-pools remove-health-checks NAME
        --http-health-check=HTTP_HEALTH_CHECK [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-pools remove-health-checks

```text
NAME
    gcloud alpha compute target-pools remove-health-checks - remove an HTTP
        health check from a target pool

SYNOPSIS
    gcloud alpha compute target-pools remove-health-checks NAME
        --http-health-check=HTTP_HEALTH_CHECK [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-pools/remove-health-checks (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
