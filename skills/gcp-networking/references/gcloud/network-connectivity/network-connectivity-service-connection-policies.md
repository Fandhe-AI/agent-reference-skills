---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/service-connection-policies
---

# gcloud network-connectivity service-connection-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity service-connection-policies create

```text
NAME
    gcloud network-connectivity service-connection-policies create - create a
        new Service Connection Policy

SYNOPSIS
    gcloud network-connectivity service-connection-policies create
        SERVICE_CONNECTION_POLICY --network=NETWORK
        --service-class=SERVICE_CLASS
        (--subnets=[SUBNETS,...]
          : --allowed-google-producers-resource-hierarchy-level=[ALLOWED_GOOGLE_PRODUCERS_RESOURCE_HIERARCHY_LEVEL,
          ...] --producer-instance-location=PRODUCER_INSTANCE_LOCATION
          --psc-connection-limit=PSC_CONNECTION_LIMIT) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Service Connection Policy with the given name.

EXAMPLES
    Create a Service Connection Policy with name my-service-conn-policy for
    network projects/my-project/global/networks/net1 and service class
    my-service-class-ad32fa4b in region us-central1 using subnet
    projects/my-project/regions/us-central1/subnetworks/subnet1 subject to
    custom-resource-hierarchy-levels that allows connections from
    Google-managed producer instances in projects/my-project.

        $ gcloud network-connectivity service-connection-policies create \
            my-service-conn-policy \
            --network="projects/my-project/global/networks/net1" \
            --service-class=my-service-class-ad32fa4b --region=us-central1 \
            --subnets=projects/my-project/regions/us-central1/subnetworks/\
        subnet1 --psc-connection-limit=100 \
            --producer-instance-location=custom-resource-hierarchy-levels \
            --allowed-google-producers-resource-hierarchy-level=projects/\
        my-project

POSITIONAL ARGUMENTS
     Service connection policy resource - Name of the Service Connection Policy
     to be created. This represents a Cloud resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument service_connection_policy on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the region attribute:
      * provide the argument service_connection_policy on the command line
        with a fully specified name;
      * provide the argument --region on the command line.

     This must be specified.

       SERVICE_CONNECTION_POLICY
          ID of the service connection policy or fully qualified identifier for
          the service connection policy.

          To set the service_connection_policy attribute:
          + provide the argument service_connection_policy on the command
            line.

REQUIRED FLAGS
     Network resource - Network that this service connection policy applies to.
     E.g. projects/my-project/global/networks/net1 This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --network=NETWORK
          ID of the network or fully qualified identifier for the network.

          To set the network attribute:
          + provide the argument --network on the command line.

     --service-class=SERVICE_CLASS
        Service class that this policy is created for. E.g.
        my-service-class-ad32fa4b

     This must be specified.

       Subnetwork resource - Subnetwork to use for IP address management. This
       represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --subnets on the command line with a fully
          specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the region attribute:
        + provide the argument --subnets on the command line with a fully
          specified name;
        + provide the argument --region on the command line.

       This must be specified.

         --subnets=[SUBNETS,...]
            IDs of the subnetworks or fully qualified identifiers for the
            subnetworks.

            To set the subnetwork attribute:
            - provide the argument --subnets on the command line.

       --allowed-google-producers-resource-hierarchy-level=[ALLOWED_GOOGLE_PRODUCERS_RESOURCE_HIERARCHY_LEVEL,...]
          List of projects, folders, or orgs where the producer instance can be
          located in the form "projects/123456789", folders/123456789", or
          "organizations/123456789".

       --producer-instance-location=PRODUCER_INSTANCE_LOCATION
          Option that determines where the producer instances can be located
          for which connections can be created in the network controlled by
          this policy. PRODUCER_INSTANCE_LOCATION must be one of:

           custom-resource-hierarchy-levels
              The producer instance must be located in one of the values
              provided in the allowed-google-producers-resource-hierarchy-level
              flag.
           none
              The producer instance must be within the same project as this
              connection policy.

       --psc-connection-limit=PSC_CONNECTION_LIMIT
          Max number of PSC connections for this policy.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the Service Connection Policy to be created.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

     --region=REGION
        For resources [service_connection_policy, subnets], provides fallback
        value for resource region attribute. When the resource's full URI path
        is not provided, region will fallback to this flag value.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity service-connection-policies create my-service-conn-policy \
    --network="projects/my-project/global/networks/net1" \
    --service-class=my-service-class-ad32fa4b \
    --region=us-central1 \
    --subnets=projects/my-project/regions/us-central1/subnetworks/subnet1 \
    --psc-connection-limit=100 \
    --producer-instance-location=custom-resource-hierarchy-levels \
    --allowed-google-producers-resource-hierarchy-level=projects/my-project
```

### gcloud network-connectivity service-connection-policies delete

```text
NAME
    gcloud network-connectivity service-connection-policies delete - delete a
        service connection policy

SYNOPSIS
    gcloud network-connectivity service-connection-policies delete
        (SERVICE_CONNECTION_POLICY : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified service connection policy.

EXAMPLES
    To delete a service connection policy with name pol1 in region us-central1,
    run:

        $ gcloud network-connectivity service-connection-policies delete \
            pol1 --region=us-central1

POSITIONAL ARGUMENTS
     Service connection policy resource - Name of the Service Connection Policy
     to be deleted. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument service_connection_policy on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE_CONNECTION_POLICY
          ID of the service connection policy or fully qualified identifier for
          the service connection policy.

          To set the service_connection_policy attribute:
          + provide the argument service_connection_policy on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location Id.

          To set the region attribute:
          + provide the argument service_connection_policy on the command
            line with a fully specified name;
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
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest
```

### gcloud network-connectivity service-connection-policies describe

```text
NAME
    gcloud network-connectivity service-connection-policies describe - describe
        a service connection policy

SYNOPSIS
    gcloud network-connectivity service-connection-policies describe
        (SERVICE_CONNECTION_POLICY : --region=REGION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display details about a service connection policy.

EXAMPLES
    To display details about the service connection policy named pol1 in region
    us-central1, run:

        $ gcloud network-connectivity service-connection-policies describe \
            pol1 --region=us-central1

POSITIONAL ARGUMENTS
     Service connection policy resource - Name of the service connection policy
     you want to describe. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument service_connection_policy on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE_CONNECTION_POLICY
          ID of the service connection policy or fully qualified identifier for
          the service connection policy.

          To set the service_connection_policy attribute:
          + provide the argument service_connection_policy on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location Id.

          To set the region attribute:
          + provide the argument service_connection_policy on the command
            line with a fully specified name;
          + provide the argument --region on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest
```

### gcloud network-connectivity service-connection-policies list

```text
NAME
    gcloud network-connectivity service-connection-policies list - list service
        connection policies

SYNOPSIS
    gcloud network-connectivity service-connection-policies list
        --region=REGION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display a list of all service connection policies in the
    specified project.

EXAMPLES
    To list all service connection policies in region us-central1, run:

        $ gcloud network-connectivity service-connection-policies list \
            --region=us-central1

REQUIRED FLAGS
     Region resource - A Google Cloud region. Use this flag to filter the list
     of service connection policies to a specific region or to all regions. Use
     ``-`` to specify all regions. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest
```

### gcloud network-connectivity service-connection-policies update

```text
NAME
    gcloud network-connectivity service-connection-policies update - update a
        service connection policy

SYNOPSIS
    gcloud network-connectivity service-connection-policies update
        SERVICE_CONNECTION_POLICY
        [--allowed-google-producers-resource-hierarchy-level=[ALLOWED_GOOGLE_PRODUCERS_RESOURCE_HIERARCHY_LEVEL,
          ...]] [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]]
        [--producer-instance-location=PRODUCER_INSTANCE_LOCATION]
        [--psc-connection-limit=PSC_CONNECTION_LIMIT] [--region=REGION]
        [--subnets=[SUBNETS,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Service Connection Policy with the given name.

EXAMPLES
    Update a Service Connection Policy with name my-service-conn-policy in
    region us-central1.

        $ gcloud network-connectivity service-connection-policies update \
            my-service-conn-policy --region=us-central1 \
            --psc-connection-limit=5 --subnets=my-subnet \
            --producer-instance-location=custom-resource-hierarchy-levels \
            --allowed-google-producers-resource-hierarchy-level=projects/\
        my-project

POSITIONAL ARGUMENTS
     Service connection policy resource - Name of the Service Connection Policy
     to be updated. This represents a Cloud resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument service_connection_policy on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the region attribute:
      * provide the argument service_connection_policy on the command line
        with a fully specified name;
      * provide the argument --region on the command line.

     This must be specified.

       SERVICE_CONNECTION_POLICY
          ID of the service connection policy or fully qualified identifier for
          the service connection policy.

          To set the service_connection_policy attribute:
          + provide the argument service_connection_policy on the command
            line.

FLAGS
     --allowed-google-producers-resource-hierarchy-level=[ALLOWED_GOOGLE_PRODUCERS_RESOURCE_HIERARCHY_LEVEL,...]
        List of projects, folders, or orgs where the producer instance can be
        located in the form "projects/123456789", folders/123456789", or
        "organizations/123456789".

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the Service Connection Policy to be updated.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

     --producer-instance-location=PRODUCER_INSTANCE_LOCATION
        Option that determines where the producer instances can be located for
        which connections can be created in the network controlled by this
        policy. PRODUCER_INSTANCE_LOCATION must be one of:

         custom-resource-hierarchy-levels
            The producer instance must be located in one of the values provided
            in the allowed-google-producers-resource-hierarchy-level flag.
         none
            The producer instance must be within the same project as this
            connection policy.

     --psc-connection-limit=PSC_CONNECTION_LIMIT
        Max number of PSC connections for this policy.

     --region=REGION
        For resources [service_connection_policy, subnets], provides fallback
        value for resource region attribute. When the resource's full URI path
        is not provided, region will fallback to this flag value.

     Subnetwork resource - Subnetwork to use for IP address management. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --subnets on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the region attribute:
      * provide the argument --subnets on the command line with a fully
        specified name;
      * provide the argument --region on the command line.

     --subnets=[SUBNETS,...]
        IDs of the subnetworks or fully qualified identifiers for the
        subnetworks.

        To set the subnetwork attribute:
        * provide the argument --subnets on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity service-connection-policies update my-service-conn-policy \
    --region=us-central1 \
    --psc-connection-limit=5 \
    --subnets=my-subnet \
    --producer-instance-location=custom-resource-hierarchy-levels \
    --allowed-google-producers-resource-hierarchy-level=projects/my-project
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/service-connection-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
