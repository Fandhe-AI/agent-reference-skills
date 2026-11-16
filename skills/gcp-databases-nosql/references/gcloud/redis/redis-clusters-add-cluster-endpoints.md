---
source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/add-cluster-endpoints
---

# gcloud redis clusters add-cluster-endpoints

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud redis clusters add-cluster-endpoints

```text
NAME
    gcloud redis clusters add-cluster-endpoints - add more cluster endpoints

SYNOPSIS
    gcloud redis clusters add-cluster-endpoints (CLUSTER : --region=REGION)
        --cluster-endpoint=[psc-connection=PSC-CONNECTION] [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This is required to enable multi-vpc for Redis cluster.

    To add one cluster endpoint to an existing Redis cluster, two PSC
    connections MUST be added as a pair: one for the Redis cluster's discovery
    service attachment and the other for the additional service attachment.

    Multiple cluster endpoints COULD be added simultaneously.

    This command can fail for the following reasons:
      o The cluster specified does not exist.
      o The number of connections provided to a cluster endpoint are not in
        pairs.
      o One of the connections is not found.

EXAMPLES
    To connect redis cluster to one additional VPC, run:

        $ gcloud redis clusters add-cluster-endpoints my-redis-cluster \
            add-cluster-endpoints \
            --cluster-endpoint='["psc-connection":[{"psc-connection-id":"$ID\
        ","address":"$IP","network":"projects/$PROJECT/global/networks/$NETW\
        ORK","forwarding-rule":"projects/$PROJECT/regions/us-east1/forwardin\
        gRules/$FR_NAME","service-attachment":"projects/$PROJECT/regions/$RE\
        GION/serviceAttachments/$SA_NAME"},{$ADDITIONAL_PSC_CONNECTION}]]' \
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

             address
                Sets address value.

             forwarding-rule
                Sets forwarding-rule value.

             network
                Sets network value.

             psc-connection-id
                Sets psc-connection-id value.

             service-attachment
                Sets service-attachment value.

        Shorthand Example:

            --cluster-endpoint=psc-connection=[{address=string,forwarding-rule=string,network=string,psc-connection-id=string,service-attachment=string}] --cluster-endpoint=psc-connection=[{address=string,forwarding-rule=string,network=string,psc-connection-id=string,service-attachment=string}]

        JSON Example:

            --cluster-endpoint='[{"psc-connection": [{"address": "string", "forwarding-rule": "string", "network": "string", "psc-connection-id": "string", "service-attachment": "string"}]}]'

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

        $ gcloud alpha redis clusters add-cluster-endpoints

        $ gcloud beta redis clusters add-cluster-endpoints
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud redis clusters add-cluster-endpoints my-redis-cluster \
    --region=us-east1 \
    --cluster-endpoint='[{"psc-connection": [{"psc-connection-id": "PSC_CONNECTION_ID", "address": "IP_ADDRESS", "network": "projects/PROJECT_ID/global/networks/NETWORK", "forwarding-rule": "projects/PROJECT_ID/regions/us-east1/forwardingRules/FORWARDING_RULE", "service-attachment": "projects/PROJECT_ID/regions/us-east1/serviceAttachments/SERVICE_ATTACHMENT"}]}]'
```

### gcloud beta redis clusters add-cluster-endpoints

```text
NAME
    gcloud beta redis clusters add-cluster-endpoints - add more cluster
        endpoints

SYNOPSIS
    gcloud beta redis clusters add-cluster-endpoints
        (CLUSTER : --region=REGION)
        --cluster-endpoint=[psc-connection=PSC-CONNECTION] [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters add-cluster-endpoints

```text
NAME
    gcloud alpha redis clusters add-cluster-endpoints - add more cluster
        endpoints

SYNOPSIS
    gcloud alpha redis clusters add-cluster-endpoints
        (CLUSTER : --region=REGION)
        --cluster-endpoint=[psc-connection=PSC-CONNECTION] [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example repeats the subcommand (`add-cluster-endpoints my-redis-cluster add-cluster-endpoints`), passes a value that is not valid JSON (`["psc-connection":[...]]`, a key inside an array), repeats the flag as `--cluster_endpoint`, and ends with the sentence "$PSCConnectionID SHOULD be extracted from forwarding rules. E.g. 75311697652483351" inside the command; the runnable form passes one cluster endpoint in the JSON form of the flag description (`[{"psc-connection": [{...}]}]`) with upper-case placeholders and `--region=us-east1` (the region of the forwarding rule in the example). The PSC connection ID is taken from the forwarding rule, as the example says.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/add-cluster-endpoints (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
