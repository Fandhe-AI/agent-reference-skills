---
source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/detach-secondaries
---

# gcloud redis clusters detach-secondaries

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud redis clusters detach-secondaries

```text
NAME
    gcloud redis clusters detach-secondaries - detach one or more secondary
        clusters from the primary cluster

SYNOPSIS
    gcloud redis clusters detach-secondaries (CLUSTER : --region=REGION)
        --clusters-to-detach=CLUSTERS_TO_DETACH [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Detach one or more secondary clusters from the primary cluster.

    After detachment, the secondary clusters become independent clusters, i.e.
    they stop replicating from the primary cluster and will now accept both
    read and write requests.

    This command is only supported on primary clusters.

EXAMPLES
    To detach the secondary clusters my-secondary-cluster1 and
    my-secondary-cluster2 from the primary cluster my-primary-cluster, run:

        $ gcloud redis clusters detach-secondaries my-primary-cluster \
            --region=us-central1 \
            --clusters-to-detach=projects/my-project/locations/us-east1/\
        clusters/my-secondary-cluster1,projects/my-project/locations/\
        asia-east1/clusters/my-secondary-cluster2

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

REQUIRED FLAGS
     --clusters-to-detach=CLUSTERS_TO_DETACH
        Comma separated list of secondary clusters to detach from the primary
        cluster.

        Each element in the list should be in the format:
        projects/PROJECT_ID/locations/REGION/clusters/CLUSTER_ID.

OPTIONAL FLAGS
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

        $ gcloud alpha redis clusters detach-secondaries

        $ gcloud beta redis clusters detach-secondaries
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud redis clusters detach-secondaries my-primary-cluster \
    --region=us-central1 \
    --clusters-to-detach=projects/my-project/locations/us-east1/clusters/my-secondary-cluster1,projects/my-project/locations/asia-east1/clusters/my-secondary-cluster2
```

### gcloud beta redis clusters detach-secondaries

```text
NAME
    gcloud beta redis clusters detach-secondaries - detach one or more
        secondary clusters from the primary cluster

SYNOPSIS
    gcloud beta redis clusters detach-secondaries (CLUSTER : --region=REGION)
        --clusters-to-detach=CLUSTERS_TO_DETACH [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters detach-secondaries

```text
NAME
    gcloud alpha redis clusters detach-secondaries - detach one or more
        secondary clusters from the primary cluster

SYNOPSIS
    gcloud alpha redis clusters detach-secondaries (CLUSTER : --region=REGION)
        --clusters-to-detach=CLUSTERS_TO_DETACH [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/detach-secondaries (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
