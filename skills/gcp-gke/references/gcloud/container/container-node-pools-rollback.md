---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/node-pools/rollback
---

# gcloud container node-pools rollback

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container node-pools rollback

```text
NAME
    gcloud container node-pools rollback - rollback a node-pool upgrade

SYNOPSIS
    gcloud container node-pools rollback NAME [--async] [--cluster=CLUSTER]
        [--respect-pdb=RESPECT_PDB]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Rollback a node-pool upgrade.

    Rollback is a method used after a canceled or failed node-pool upgrade. It
    makes a best-effort attempt to revert the pool back to its original state.

EXAMPLES
    To roll back a canceled or failed upgrade in "node-pool-1" in the cluster
    "sample-cluster", run:

        $ gcloud container node-pools rollback node-pool-1 \
            --cluster=sample-cluster

POSITIONAL ARGUMENTS
     NAME
        The name of the node pool to rollback.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --cluster=CLUSTER
        The cluster from which to rollback the node pool. Overrides the default
        container/cluster property value for this command invocation.

     --respect-pdb=RESPECT_PDB
        Indicates whether node pool rollbacks should respect pod disruption
        budgets.

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

        $ gcloud alpha container node-pools rollback

        $ gcloud beta container node-pools rollback
```

### gcloud beta container node-pools rollback

```text
NAME
    gcloud beta container node-pools rollback - rollback a node-pool upgrade

SYNOPSIS
    gcloud beta container node-pools rollback NAME [--async]
        [--cluster=CLUSTER] [--respect-pdb=RESPECT_PDB]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container node-pools rollback

```text
NAME
    gcloud alpha container node-pools rollback - rollback a node-pool upgrade

SYNOPSIS
    gcloud alpha container node-pools rollback NAME [--async]
        [--cluster=CLUSTER] [--respect-pdb=RESPECT_PDB]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/node-pools/rollback (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
