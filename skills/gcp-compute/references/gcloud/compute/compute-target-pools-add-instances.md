---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-pools/add-instances
---

# gcloud compute target-pools add-instances

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute target-pools add-instances

```text
NAME
    gcloud compute target-pools add-instances - add instances to a target pool

SYNOPSIS
    gcloud compute target-pools add-instances NAME
        --instances=INSTANCE,[INSTANCE,...] [--instances-zone=INSTANCES_ZONE]
        [--region=REGION] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-pools add-instances is used to add one or more
    instances to a target pool. For more information on health checks and load
    balancing, see
    https://cloud.google.com/compute/docs/load-balancing-and-autoscaling/

POSITIONAL ARGUMENTS
     NAME
        The name of the target pool to which to add the instances.

REQUIRED FLAGS
     --instances=INSTANCE,[INSTANCE,...]
        Specifies a list of instances to add to the target pool.

OPTIONAL FLAGS
     --instances-zone=INSTANCES_ZONE
        Zone of the instances to add to the target pool. If not specified and
        the compute/zone property isn't set, you might be prompted to select a
        zone (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

     --region=REGION
        Region of the target pool to operate on. If not specified, it will be
        set to the region of the instances. Overrides the default
        compute/region property value for this command invocation.

     --zone=ZONE
        Zone of the instances to add to the target pool. DEPRECATED, use
        --instances-zone. If not specified, you will be prompted to select a
        zone. Overrides the default compute/zone property value for this
        command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-pools add-instances

        $ gcloud beta compute target-pools add-instances
```

### gcloud beta compute target-pools add-instances

```text
NAME
    gcloud beta compute target-pools add-instances - add instances to a target
        pool

SYNOPSIS
    gcloud beta compute target-pools add-instances NAME
        --instances=INSTANCE,[INSTANCE,...] [--instances-zone=INSTANCES_ZONE]
        [--region=REGION] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-pools add-instances

```text
NAME
    gcloud alpha compute target-pools add-instances - add instances to a target
        pool

SYNOPSIS
    gcloud alpha compute target-pools add-instances NAME
        --instances=INSTANCE,[INSTANCE,...] [--instances-zone=INSTANCES_ZONE]
        [--region=REGION] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute target-pools add-instances --zone`: "DEPRECATED, use --instances-zone.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-pools/add-instances (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
