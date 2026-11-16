---
source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/switchover
---

# gcloud redis clusters switchover

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud redis clusters switchover

```text
NAME
    gcloud redis clusters switchover - switchover to a secondary cluster

SYNOPSIS
    gcloud redis clusters switchover (CLUSTER : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command promotes the secondary cluster to become the new primary
    cluster. The old primary and other secondary clusters will automatically
    become the secondary clusters of this cluster.

    After the successful completion of this operation, the new primary cluster
    will accept both read and write requests.

    This command is only supported on secondary clusters.

EXAMPLES
    To switchover to a secondary cluster with name my-secondary-cluster in
    region us-central1, run:

        $ gcloud redis clusters switchover my-secondary-cluster \
            --region=us-central1

POSITIONAL ARGUMENTS
     Cluster resource - Arguments and flags that specify the Memorystore Redis
     cluster you want to update. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Redis region of the cluster. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis clusters switchover

        $ gcloud beta redis clusters switchover
```

### gcloud beta redis clusters switchover

```text
NAME
    gcloud beta redis clusters switchover - switchover to a secondary cluster

SYNOPSIS
    gcloud beta redis clusters switchover (CLUSTER : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters switchover

```text
NAME
    gcloud alpha redis clusters switchover - switchover to a secondary cluster

SYNOPSIS
    gcloud alpha redis clusters switchover (CLUSTER : --region=REGION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/switchover (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
