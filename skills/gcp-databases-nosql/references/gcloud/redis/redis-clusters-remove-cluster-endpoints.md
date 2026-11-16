---
source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/remove-cluster-endpoints
---

# gcloud redis clusters remove-cluster-endpoints

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud redis clusters remove-cluster-endpoints

```text
NAME
    gcloud redis clusters remove-cluster-endpoints - remove existing
        Memorystore cluster endpoints

SYNOPSIS
    gcloud redis clusters remove-cluster-endpoints (CLUSTER : --region=REGION)
        --cluster-endpoint=[psc-connection=PSC-CONNECTION] [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    To remove one cluster endpoint from an existing Redis cluster, two PSC
    connections MUST be removed as a pair: one to the Redis cluster's discovery
    service attachment and the other to its additional service attachment.

    Multiple cluster endpoints COULD be removed simultaneously.

    This command can fail for the following reasons:
      o The cluster specified does not exist.
      o Some connections in the to be removed list do not exist.

EXAMPLES
    To remove an endpoint from redis cluster, run:

        $ gcloud redis clusters remove-cluster-endpoints my-redis-cluster \
            remove-cluster-endpoints \
            --cluster-endpoint='["psc-connection":[{"psc-connection-id":"$PS\
        C_CONNECTION_ID"},{$ADDITIONAL_PSC_CONNECTION}]]' \
            --cluster_endpoint=$ADDITIONAL_CLUSTER_ENDPOINT \
            $PSCConnectionID SHOULD be extracted from forwarding rules. \
            E.g. 75311697652483351

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
     --cluster-endpoint=[psc-connection=PSC-CONNECTION]
        Required, Resource details of a redis cluster endpoint.

         psc-connection
            Sets psc-connection value.

             psc-connection-id
                Sets psc-connection-id value.

        Shorthand Example:

            --cluster-endpoint=psc-connection=[{psc-connection-id=string}] --cluster-endpoint=psc-connection=[{psc-connection-id=string}]

        JSON Example:

            --cluster-endpoint='[{"psc-connection": [{"psc-connection-id": "string"}]}]'

        File Example:

            --cluster-endpoint=path_to_file.(yaml|json)

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

        $ gcloud alpha redis clusters remove-cluster-endpoints

        $ gcloud beta redis clusters remove-cluster-endpoints
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud redis clusters remove-cluster-endpoints my-redis-cluster \
    --region=us-east1 \
    --cluster-endpoint='[{"psc-connection": [{"psc-connection-id": "PSC_CONNECTION_ID"}, {"psc-connection-id": "ADDITIONAL_PSC_CONNECTION_ID"}]}]'
```

### gcloud beta redis clusters remove-cluster-endpoints

```text
NAME
    gcloud beta redis clusters remove-cluster-endpoints - remove existing
        Memorystore cluster endpoints

SYNOPSIS
    gcloud beta redis clusters remove-cluster-endpoints
        (CLUSTER : --region=REGION)
        --cluster-endpoint=[psc-connection=PSC-CONNECTION] [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters remove-cluster-endpoints

```text
NAME
    gcloud alpha redis clusters remove-cluster-endpoints - remove existing
        Memorystore cluster endpoints

SYNOPSIS
    gcloud alpha redis clusters remove-cluster-endpoints
        (CLUSTER : --region=REGION)
        --cluster-endpoint=[psc-connection=PSC-CONNECTION] [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example repeats the subcommand (`remove-cluster-endpoints my-redis-cluster remove-cluster-endpoints`), passes a value that is not valid JSON (`["psc-connection":[...]]`, a key inside an array), repeats the flag as `--cluster_endpoint`, and ends with the sentence "$PSCConnectionID SHOULD be extracted from forwarding rules. E.g. 75311697652483351" inside the command; the runnable form passes the cluster endpoint in the JSON form of the flag description (`[{"psc-connection": [{...}, {...}]}]`) with the two PSC connection IDs the DESCRIPTION requires as a pair (the discovery and the additional service attachment connections; the example writes the second as `{$ADDITIONAL_PSC_CONNECTION}`), upper-case placeholders and `--region=us-east1`. The PSC connection ID is taken from the forwarding rule, as the example says.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/remove-cluster-endpoints (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
