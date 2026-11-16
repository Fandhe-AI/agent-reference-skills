---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/node-pools/delete
---

# gcloud container node-pools delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container node-pools delete

```text
NAME
    gcloud container node-pools delete - delete an existing node pool in a
        running cluster

SYNOPSIS
    gcloud container node-pools delete NAME [--async] [--cluster=CLUSTER]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud container node-pools delete deletes a node pool from a Google
    Kubernetes Engine (GKE) cluster. When you delete a node pool, GKE drains
    all the nodes in the node pool. The draining process involves GKE deleting
    Pods on each node in the node pool. Each node in a node pool is drained by
    deleting Pods with an allotted graceful termination period of MAX_POD.
    MAX_POD is the maximum terminationGracePeriodSeconds set on the Pods
    scheduled to the node with a cap of one hour.

EXAMPLES
    To delete the "node-pool-1" node pool from the cluster "sample-cluster",
    run:

        $ gcloud container node-pools delete node-pool-1 \
            --cluster=sample-cluster

POSITIONAL ARGUMENTS
     NAME
        The name of the node pool to delete.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --cluster=CLUSTER
        The cluster from which to delete the node pool. Overrides the default
        container/cluster property value for this command invocation.

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

        $ gcloud alpha container node-pools delete

        $ gcloud beta container node-pools delete
```

### gcloud beta container node-pools delete

```text
NAME
    gcloud beta container node-pools delete - delete an existing node pool in a
        running cluster

SYNOPSIS
    gcloud beta container node-pools delete NAME [--async] [--cluster=CLUSTER]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container node-pools delete

```text
NAME
    gcloud alpha container node-pools delete - delete an existing node pool in
        a running cluster

SYNOPSIS
    gcloud alpha container node-pools delete NAME [--async] [--cluster=CLUSTER]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/node-pools/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
