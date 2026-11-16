---
source: https://docs.cloud.google.com/sdk/gcloud/reference/anthos/config
---

# gcloud anthos config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud anthos config controller create

```text
NAME
    gcloud anthos config controller create - create Anthos Config Controller
        instances

SYNOPSIS
    gcloud anthos config controller create (NAME : --location=LOCATION)
        [--async] [--cluster-ipv4-cidr-block=CLUSTER_IPV4_CIDR_BLOCK]
        [--cluster-named-range=CLUSTER_NAMED_RANGE] [--full-management]
        [--man-block=MAN_BLOCK] [--man-blocks=[BLOCK,...]]
        [--master-ipv4-cidr-block=MASTER_IPV4_CIDR_BLOCK] [--network=NETWORK]
        [--services-ipv4-cidr-block=SERVICES_IPV4_CIDR_BLOCK]
        [--services-named-range=SERVICES_NAMED_RANGE] [--subnet=SUBNET]
        [--use-private-endpoint] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an Anthos Config Controller instance.

EXAMPLES
    To create an Anthos Config Controller instance with the name acc-default,
    run:

        $ gcloud anthos config controller create acc-default \
            --location=us-central1

POSITIONAL ARGUMENTS
     Instance resource - The identifier for a Config Controller instance. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument name on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the instance or fully qualified identifier for the instance.

          To set the name attribute:
          + provide the argument name on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the Config Controller instance location. Currently, only
          us-central1, us-east1, us-east4, us-east5, us-west2,
          northamerica-northeast1, northamerica-northeast2, europe-north1,
          europe-west1, europe-west3, europe-west6, australia-southeast1,
          australia-southeast2, asia-northeast1, asia-northeast2 and
          asia-southeast1 are supported.

          To set the location attribute:
          + provide the argument name on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --cluster-ipv4-cidr-block=CLUSTER_IPV4_CIDR_BLOCK
        The IP address range for the cluster pod IPs. Can be specified as a
        netmask size (e.g. '/14') or as in CIDR notation (e.g.
        '10.100.0.0/20'). Defaults to '/20' if flag is not provided.

     --cluster-named-range=CLUSTER_NAMED_RANGE
        The name of the existing secondary range in the clusters subnetwork to
        use for pod IP addresses. Alternatively, --cluster_cidr_block can be
        used to automatically create a GKE-managed one.

     --full-management
        Enable full cluster management type.

     --man-block=MAN_BLOCK
        (DEPRECATED) Master Authorized Network. Allows access to the Kubernetes
        control plane from this block. Defaults to 0.0.0.0/0 if flag is not
        provided.

        The --man-block option is deprecated; use --man-blocks instead.

     --man-blocks=[BLOCK,...]
        Master Authorized Network. Allows users to specify multiple blocks to
        access the Kubernetescontrol plane from this block. Defaults to
        0.0.0.0/0 if flag is not provided.

     --master-ipv4-cidr-block=MASTER_IPV4_CIDR_BLOCK
        The /28 network that the control plane will use. Defaults to
        '172.16.0.128/28' if flag is not provided.

     --network=NETWORK
        Existing VPC Network to put the GKE cluster and nodes in. Defaults to
        'default' if flag is not provided. If --subnet=SUBNET is also
        specified, subnet must be a subnetwork of the network specified by this
        --network=NETWORK flag.

     --services-ipv4-cidr-block=SERVICES_IPV4_CIDR_BLOCK
        The IP address range for the cluster service IPs. Can be specified as a
        netmask size (e.g. '/14') or as in CIDR notation (e.g.
        '10.100.0.0/20'). Defaults to '/24' if flag is not provided.

     --services-named-range=SERVICES_NAMED_RANGE
        The name of the existing secondary range in the clusters subnetwork to
        use for service ClusterIPs. Alternatively, --services_cidr_block can be
        used to automatically create a GKE-managed one.

     --subnet=SUBNET
        Specifies the subnet that the VM instances are a part of.
        --network=NETWORK must also be specified, subnet must be a subnetwork
        of the network specified by the --network=NETWORK flag.

     --use-private-endpoint
        Only allow access to the master's private endpoint IP.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha anthos config controller create
```

### gcloud anthos config controller delete

```text
NAME
    gcloud anthos config controller delete - delete Anthos Config Controller
        instances

SYNOPSIS
    gcloud anthos config controller delete (NAME : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Anthos Config Controller instance.

EXAMPLES
    To delete an Anthos Config Controller instance, run:

        $ gcloud anthos config controller delete NAME --location=LOCATION

POSITIONAL ARGUMENTS
     Instance resource - The identifier for an Anthos Config Controller
     instance. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument name on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the instance or fully qualified identifier for the instance.

          To set the name attribute:
          + provide the argument name on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the Anthos Config Controller instance location.
          Currently, only us-central1, us-east1, us-east4, us-east5, us-west2,
          northamerica-northeast1, northamerica-northeast2, europe-north1,
          europe-west1, europe-west3, europe-west6, australia-southeast1,
          australia-southeast2, asia-northeast1, asia-northeast2 and
          asia-southeast1 are supported.

          To set the location attribute:
          + provide the argument name on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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
    This command uses the krmapihosting/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud alpha anthos config controller delete
```

### gcloud anthos config controller describe

```text
NAME
    gcloud anthos config controller describe - describe Anthos Config
        Controller instances

SYNOPSIS
    gcloud anthos config controller describe (NAME : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Anthos Config Controller instance.

EXAMPLES
    To describe an Anthos Config Controller instance named default in the
    location us-central1, run:

        $ gcloud anthos config controller describe default \
            --location=us-central1

POSITIONAL ARGUMENTS
     Instance resource - The identifier for an Anthos Config Controller
     instance. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument name on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the instance or fully qualified identifier for the instance.

          To set the name attribute:
          + provide the argument name on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the Anthos Config Controller instance location.
          Currently, only us-central1, us-east1, us-east4, us-east5, us-west2,
          northamerica-northeast1, northamerica-northeast2, europe-north1,
          europe-west1, europe-west3, europe-west6, australia-southeast1,
          australia-southeast2, asia-northeast1, asia-northeast2 and
          asia-southeast1 are supported.

          To set the location attribute:
          + provide the argument name on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the krmapihosting/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud alpha anthos config controller describe
```

### gcloud anthos config controller get-config-connector-identity

```text
NAME
    gcloud anthos config controller get-config-connector-identity - fetch
        default Config Connector identity

SYNOPSIS
    gcloud anthos config controller get-config-connector-identity NAME
        --location=LOCATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud anthos config controller get-config-connector-identity prints the
    default Config Connector Google Service Account in a specific Anthos Config
    Controller.

EXAMPLES
    To print the default Config Connector identity used by your Config
    Controller 'main' in the location 'us-central1', run:

        $ gcloud anthos config controller get-config-connector-identity \
            main --location=us-central1

POSITIONAL ARGUMENTS
     NAME
        Name of the Anthos Config Controller.

REQUIRED FLAGS
     --location=LOCATION
        The location (region) of the Anthos Config Controller.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha anthos config controller get-config-connector-identity
```

### gcloud anthos config controller get-credentials

```text
NAME
    gcloud anthos config controller get-credentials - fetch credentials for a
        running Anthos Config Controller

SYNOPSIS
    gcloud anthos config controller get-credentials NAME --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud anthos config controller get-credentials updates a kubeconfig file
    with appropriate credentials and endpoint information to point kubectl at a
    specific Anthos Config Controller.

EXAMPLES
    To switch to working on your Config Controller 'main', run:

        $ gcloud anthos config controller get-credentials main \
            --location=us-central1

POSITIONAL ARGUMENTS
     NAME
        Name of the Anthos Config Controller.

REQUIRED FLAGS
     --location=LOCATION
        The location (region) of the Anthos Config Controller.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha anthos config controller get-credentials
```

### gcloud anthos config controller list

```text
NAME
    gcloud anthos config controller list - list Anthos Config Controller
        instances

SYNOPSIS
    gcloud anthos config controller list [--full-name] [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Anthos Config Controller instances.

EXAMPLES
    To list all Anthos Config Controller instances in the region 'us-central1',
    run:

        $ gcloud anthos config controller list --location=us-central1

    To list all Anthos Config Controller instances in all regions with their
    fully specified name, run:

        $ gcloud anthos config controller list --full-name

    To list all Anthos Config Controller instances in all regions, run:

        $ gcloud anthos config controller list

FLAGS
     --full-name
        Print the fully specified name of the instance.

     Instance list resource - List of Anthos Config Controller instances. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * use global location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the instance-list or fully qualified identifier for the
        instance-list.

        To set the location attribute:
        * provide the argument --location on the command line;
        * use global location.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the krmapihosting/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud alpha anthos config controller list
```

### gcloud anthos config operations describe

```text
NAME
    gcloud anthos config operations describe - describe Anthos Config
        Controller operations

SYNOPSIS
    gcloud anthos config operations describe (OPERATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Anthos Config Controller operation.

EXAMPLES
    To describe an Anthos Config Controller operation named my-operation in the
    location us-central1, run:

        $ gcloud anthos config operations describe my-operation \
            --location=us-central1

POSITIONAL ARGUMENTS
     Operation resource - The identifier for an Anthos Config Controller
     operation. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the Anthos Config Controller instance location.
          Currently, only us-central1, us-east1, us-east4, us-east5, us-west2,
          northamerica-northeast1, northamerica-northeast2, europe-north1,
          europe-west1, europe-west3, europe-west6, australia-southeast1,
          australia-southeast2, asia-northeast1, asia-northeast2 and
          asia-southeast1 are supported.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the krmapihosting/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud alpha anthos config operations describe
```

### gcloud anthos config operations list

```text
NAME
    gcloud anthos config operations list - list Anthos Config Controller
        operations

SYNOPSIS
    gcloud anthos config operations list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Anthos Config Controller operations.

EXAMPLES
    To list all Anthos Config Controller operations in the region
    'us-central1', run:

        $ gcloud anthos config operations list --location=us-central1

    To list all Anthos Config Controller operations in all regions, run:

        $ gcloud anthos config operations list

FLAGS
     Operation list resource - List of Anthos Config Controller operations.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * use global location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the operation-list or fully qualified identifier for the
        operation-list.

        To set the location attribute:
        * provide the argument --location on the command line;
        * use global location.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the krmapihosting/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud alpha anthos config operations list
```

### gcloud alpha anthos config controller create

```text
NAME
    gcloud alpha anthos config controller create - create Anthos Config
        Controller instances

SYNOPSIS
    gcloud alpha anthos config controller create (NAME : --location=LOCATION)
        [--async] [--cluster-ipv4-cidr-block=CLUSTER_IPV4_CIDR_BLOCK]
        [--cluster-named-range=CLUSTER_NAMED_RANGE]
        [--experimental-features=[FEATURE,...]] [--full-management]
        [--man-block=MAN_BLOCK] [--man-blocks=[BLOCK,...]]
        [--master-ipv4-cidr-block=MASTER_IPV4_CIDR_BLOCK] [--network=NETWORK]
        [--services-ipv4-cidr-block=SERVICES_IPV4_CIDR_BLOCK]
        [--services-named-range=SERVICES_NAMED_RANGE] [--subnet=SUBNET]
        [--use-private-endpoint] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha anthos config controller delete

```text
NAME
    gcloud alpha anthos config controller delete - delete Anthos Config
        Controller instances

SYNOPSIS
    gcloud alpha anthos config controller delete (NAME : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha anthos config controller describe

```text
NAME
    gcloud alpha anthos config controller describe - describe Anthos Config
        Controller instances

SYNOPSIS
    gcloud alpha anthos config controller describe (NAME : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha anthos config controller get-config-connector-identity

```text
NAME
    gcloud alpha anthos config controller get-config-connector-identity - fetch
        default Config Connector identity

SYNOPSIS
    gcloud alpha anthos config controller get-config-connector-identity NAME
        --location=LOCATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha anthos config controller get-credentials

```text
NAME
    gcloud alpha anthos config controller get-credentials - fetch credentials
        for a running Anthos Config Controller

SYNOPSIS
    gcloud alpha anthos config controller get-credentials NAME
        --location=LOCATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha anthos config controller list

```text
NAME
    gcloud alpha anthos config controller list - list Anthos Config Controller
        instances

SYNOPSIS
    gcloud alpha anthos config controller list [--full-name]
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha anthos config controller update

```text
NAME
    gcloud alpha anthos config controller update - update an Anthos Config
        Controller instance

SYNOPSIS
    gcloud alpha anthos config controller update (NAME : --location=LOCATION)
        [--async] [--experimental-features=[FEATURE,...]]
        [--man-block=MAN_BLOCK] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha anthos config operations describe

```text
NAME
    gcloud alpha anthos config operations describe - describe Anthos Config
        Controller operations

SYNOPSIS
    gcloud alpha anthos config operations describe
        (OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha anthos config operations list

```text
NAME
    gcloud alpha anthos config operations list - list Anthos Config Controller
        operations

SYNOPSIS
    gcloud alpha anthos config operations list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud anthos config controller create --man-block`: "The --man-block option is deprecated; use --man-blocks instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/anthos/config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
