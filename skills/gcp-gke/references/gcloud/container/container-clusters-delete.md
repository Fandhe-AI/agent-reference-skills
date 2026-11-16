---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/delete
---

# gcloud container clusters delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container clusters delete

```text
NAME
    gcloud container clusters delete - delete an existing cluster for running
        containers

SYNOPSIS
    gcloud container clusters delete NAME [NAME ...] [--async]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    When you delete a cluster, the following resources are deleted:

      o The control plane resources
      o All of the node instances in the cluster
      o Any Pods that are running on those instances
      o Any firewalls and routes created by Kubernetes Engine at the time of
        cluster creation
      o Data stored in host hostPath and emptyDir volumes

    GKE will attempt to delete the following resources. Deletion of these
    resources is not always guaranteed:

      o External load balancers created by the cluster
      o Internal load balancers created by the cluster
      o Persistent disk volumes

EXAMPLES
    To delete an existing cluster, run:

        $ gcloud container clusters delete sample-cluster

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        The names of the clusters to delete.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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

        $ gcloud alpha container clusters delete

        $ gcloud beta container clusters delete
```

### gcloud beta container clusters delete

```text
NAME
    gcloud beta container clusters delete - delete an existing cluster for
        running containers

SYNOPSIS
    gcloud beta container clusters delete NAME [NAME ...] [--async]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container clusters delete

```text
NAME
    gcloud alpha container clusters delete - delete an existing cluster for
        running containers

SYNOPSIS
    gcloud alpha container clusters delete NAME [NAME ...] [--async]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
