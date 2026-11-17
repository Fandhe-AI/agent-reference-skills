---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/vpc-access/connectors
---

# gcloud compute networks vpc-access connectors

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute networks vpc-access connectors create

```text
NAME
    gcloud compute networks vpc-access connectors create - create a VPC Access
        connector

SYNOPSIS
    gcloud compute networks vpc-access connectors create
        (CONNECTOR : --region=REGION) [--async] [--machine-type=MACHINE_TYPE]
        [--max-instances=MAX_INSTANCES;
          default=10 --min-instances=MIN_INSTANCES; default=2
          | --max-throughput=MAX_THROUGHPUT --min-throughput=MIN_THROUGHPUT]
        [--network=NETWORK; default="default" --range=RANGE
          | --subnet=SUBNET --subnet-project=SUBNET_PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new VPC Access connector with the given name.

    This command can fail for the following reasons:
      o An instance with the same name already exists.
      o The active account does not have permission to create instances.

EXAMPLES
    The following command creates a VPC Access connector with name
    'my-vpc-connector' in region 'us-central1' in network 'my-network' with IP
    CIDR range of '10.132.0.0/28'.

        $ gcloud compute networks vpc-access connectors create \
            my-vpc-connector --region=us-central1 --network=my-network \
            --range=10.132.0.0/28

POSITIONAL ARGUMENTS
     Connector resource - Arguments and flags that specify the VPC Access
     connector you want to create. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument connector on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTOR
          ID of the connector or fully qualified identifier for the connector.

          To set the connector attribute:
          + provide the argument connector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Compute region (e.g. us-central1) for the connector.

          To set the region attribute:
          + provide the argument connector on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --machine-type=MACHINE_TYPE
        Machine type of VMs underlying the VPC Access connector. Accepted
        values are e2-micro, f1-micro, and e2-standard-4. If left unspecified,
        the e2-micro machine type is used.

     At most one of these can be specified:

       Scaling settings of a VPC Access Connector can be specified in terms of
       number of Google Compute Engine VM instances underlying the connector
       autoscaling group.

       --max-instances=MAX_INSTANCES; default=10
          Maximum number of instances within an autoscaling group underlying
          the connector. Value must be between 3 and 10, inclusive. Must be
          higher than the value specified by --min-instances.

       --min-instances=MIN_INSTANCES; default=2
          Minimum number of instances within an autoscaling group underlying
          the connector. Value must be between 2 and 9, inclusive. Must be
          lower than the value specified by --max-instances.

       Scaling settings of a VPC Access Connector can be specified in terms of
       throughput.

       --max-throughput=MAX_THROUGHPUT
          Maximum throughput of the connector in Mbps. Refers to the expected
          throughput when using an e2-micro machine type. Value must be a
          multiple of 100 from 300 through 1000. Must be higher than the value
          specified by --min-throughput. If both max-throughput and
          max-instances are provided, max-instances takes precedence over
          max-throughput. The use of max-throughput is discouraged in favor of
          max-instances.

       --min-throughput=MIN_THROUGHPUT
          Minimum throughput of the connector in Mbps. Refers to the expected
          throughput when using an e2-micro machine type. Value must be a
          multiple of 100 from 200 through 900. Must be lower than the value
          specified by --max-throughput. If both min-throughput and
          min-instances are provided, min-instances takes precedence over
          min-throughput. The use of min-throughput is discouraged in favor of
          min-instances.

     At most one of these can be specified:

       The Serverless VPC Access API can internally manage the creation of a
       subnet to house the VPC connector. To create this subnet, the network ID
       (--network) and an IP CIDR range (--range) for the subnet must be
       provided.

       --network=NETWORK; default="default"
          Name of the Compute Engine network to which the connector will be
          connected. If left unspecified, the default network will be used.

       --range=RANGE
          CIDR range of internal addresses that are reserved for this
          connector. For example, 10.132.0.0/28. Range must be unique and
          non-overlapping with existing ranges in the network.

       You can specify a subnet in which to place the connector rather than
       using an internally managed subnet. If you wish to use this connector to
       attach your Serverless application to a Shared VPC, first share a subnet
       to the project to which you are deploying your connector. Then, supply
       the name of the subnet (--subnet) and the project ID (--subnet-project)
       from which the subnet is hosted to connect to this VPC.

       --subnet=SUBNET
          User-provided subnet to house the connector. This field can be used
          in favor of specifying the network and range fields. e.g. "my-subnet"

       --subnet-project=SUBNET_PROJECT
          Project ID of the provided subnet. The default is the project of the
          connector.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the vpcaccess/v1 API. The full documentation for this API
    can be found at:
    https://cloud.google.com/vpc/docs/configure-serverless-vpc-access

NOTES
    This variant is also available:

        $ gcloud beta compute networks vpc-access connectors create
```

### gcloud compute networks vpc-access connectors delete

```text
NAME
    gcloud compute networks vpc-access connectors delete - delete a VPC Access
        connector

SYNOPSIS
    gcloud compute networks vpc-access connectors delete
        (CONNECTOR : --region=REGION) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a new VPC Access connector with the given name.

    This command can fail for the following reasons:
      o An instance with the same name already exists.
      o The active account does not have permission to delete instances.

EXAMPLES
    The following command deletes a VPC Access connector with name
    my-vpc-connector in region us-central1:

        $ gcloud compute networks vpc-access connectors delete \
            my-vpc-connector --region=us-central1

POSITIONAL ARGUMENTS
     Connector resource - Arguments and flags that specify the VPC Access
     connector you want to delete. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument connector on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTOR
          ID of the connector or fully qualified identifier for the connector.

          To set the connector attribute:
          + provide the argument connector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Compute region (e.g. us-central1) for the connector.

          To set the region attribute:
          + provide the argument connector on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

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
    This command uses the vpcaccess/v1 API. The full documentation for this API
    can be found at:
    https://cloud.google.com/vpc/docs/configure-serverless-vpc-access

NOTES
    This variant is also available:

        $ gcloud beta compute networks vpc-access connectors delete
```

### gcloud compute networks vpc-access connectors describe

```text
NAME
    gcloud compute networks vpc-access connectors describe - show metadata for
        a VPC Access connector

SYNOPSIS
    gcloud compute networks vpc-access connectors describe
        (CONNECTOR : --region=REGION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all metadata associated with a VPC Access connector given a valid
    connector name.

    This command can fail for the following reasons:
      o The connector specified does not exist.
      o The active account does not have permission to access the given
        operation.

EXAMPLES
    The following command prints metadata for a connector with name
    my-vpcaccesss-connector in region us-central1:

        $ gcloud compute networks vpc-access connectors describe \
            my-vpcaccess-connector --region=us-central

POSITIONAL ARGUMENTS
     Connector resource - The connector to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument connector on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTOR
          ID of the connector or fully qualified identifier for the connector.

          To set the connector attribute:
          + provide the argument connector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Compute region (e.g. us-central1) for the connector.

          To set the region attribute:
          + provide the argument connector on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the vpcaccess/v1 API. The full documentation for this API
    can be found at:
    https://cloud.google.com/vpc/docs/configure-serverless-vpc-access

NOTES
    This variant is also available:

        $ gcloud beta compute networks vpc-access connectors describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute networks vpc-access connectors describe my-vpcaccess-connector \
    --region=us-central1
```

### gcloud compute networks vpc-access connectors list

```text
NAME
    gcloud compute networks vpc-access connectors list - list VPC Access
        connectors

SYNOPSIS
    gcloud compute networks vpc-access connectors list --region=REGION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all VPC Access connectors under the specified project and region.

    You can specify the maximum number of connectors to list using the --limit
    flag.

EXAMPLES
    The following command lists a maximum of five instances in us-central1:

        $ gcloud compute networks vpc-access connectors list \
          --region=us-central1 --limit=5

REQUIRED FLAGS
     Region resource - The region of the connectors to list. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --region=REGION
          ID of the region or fully qualified identifier for the region.

          To set the region attribute:
          + provide the argument --region on the command line.

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

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the vpcaccess/v1 API. The full documentation for this API
    can be found at:
    https://cloud.google.com/vpc/docs/configure-serverless-vpc-access

NOTES
    This variant is also available:

        $ gcloud beta compute networks vpc-access connectors list
```

### gcloud compute networks vpc-access connectors update

```text
NAME
    gcloud compute networks vpc-access connectors update - update a VPC Access
        connector

SYNOPSIS
    gcloud compute networks vpc-access connectors update
        (CONNECTOR : --region=REGION) [--async] [--machine-type=MACHINE_TYPE]
        [--max-instances=MAX_INSTANCES] [--min-instances=MIN_INSTANCES]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing VPC Access connector with the given name.

    This command can fail for the following reasons:
      o Invalid parameters are passed to this command.
      o The active account does not have permission to update instances.

EXAMPLES
    The following command updates a VPC Access connector with name
    my-vpc-connector in region us-central1:

        $ gcloud compute networks vpc-access connectors update \
            my-vpc-connector --region=us-central1 --min-instances=3 \
            --max-instances=5

POSITIONAL ARGUMENTS
     Connector resource - Arguments and flags that specify the VPC Access
     connector you want to update. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument connector on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTOR
          ID of the connector or fully qualified identifier for the connector.

          To set the connector attribute:
          + provide the argument connector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Compute region (e.g. us-central1) for the connector.

          To set the region attribute:
          + provide the argument connector on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --machine-type=MACHINE_TYPE
        If set, updates the machine type of VMs underlying the connector.
        Accepted values are "e2-micro", "f1-micro", and "e2-standard-4".

     --max-instances=MAX_INSTANCES
        If set, updates the maximum number of instances within an autoscaling
        group underlying the connector. Value must be between 3 and 10,
        inclusive, greater than or equal to the currently set maximum number of
        instances, and greater than the value specified by --min-instances.
        --min-instances must be provided.

     --min-instances=MIN_INSTANCES
        If set, updates the minimum number of instances within an autoscaling
        group underlying the connector. Value must be between 2 and 9,
        inclusive, greater than or equal to the currently set minimum number of
        instances, and less than the value specified by --max-instances.
        --max-instances must be provided

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the vpcaccess/v1 API. The full documentation for this API
    can be found at:
    https://cloud.google.com/vpc/docs/configure-serverless-vpc-access

NOTES
    This variant is also available:

        $ gcloud beta compute networks vpc-access connectors update
```

### gcloud beta compute networks vpc-access connectors create

```text
NAME
    gcloud beta compute networks vpc-access connectors create - create a VPC
        Access connector

SYNOPSIS
    gcloud beta compute networks vpc-access connectors create
        (CONNECTOR : --region=REGION) [--async] [--machine-type=MACHINE_TYPE]
        [--max-instances=MAX_INSTANCES;
          default=10 --min-instances=MIN_INSTANCES; default=2
          | --max-throughput=MAX_THROUGHPUT --min-throughput=MIN_THROUGHPUT]
        [--network=NETWORK; default="default" --range=RANGE
          | --subnet=SUBNET --subnet-project=SUBNET_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute networks vpc-access connectors delete

```text
NAME
    gcloud beta compute networks vpc-access connectors delete - delete a VPC
        Access connector

SYNOPSIS
    gcloud beta compute networks vpc-access connectors delete
        (CONNECTOR : --region=REGION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute networks vpc-access connectors describe

```text
NAME
    gcloud beta compute networks vpc-access connectors describe - show metadata
        for a VPC Access connector

SYNOPSIS
    gcloud beta compute networks vpc-access connectors describe
        (CONNECTOR : --region=REGION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute networks vpc-access connectors list

```text
NAME
    gcloud beta compute networks vpc-access connectors list - list VPC Access
        connectors

SYNOPSIS
    gcloud beta compute networks vpc-access connectors list --region=REGION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute networks vpc-access connectors update

```text
NAME
    gcloud beta compute networks vpc-access connectors update - update a VPC
        Access connector

SYNOPSIS
    gcloud beta compute networks vpc-access connectors update
        (CONNECTOR : --region=REGION) [--async] [--machine-type=MACHINE_TYPE]
        [--max-instances=MAX_INSTANCES] [--min-instances=MIN_INSTANCES]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example says the resource is "in region us-central1" but passes `--region=us-central`, which is not a region; the runnable form uses `--region=us-central1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/vpc-access/connectors (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
