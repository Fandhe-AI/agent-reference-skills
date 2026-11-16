---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-services
---

# gcloud compute backend-services (part 3/5)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute backend-services get-health

```text
NAME
    gcloud compute backend-services get-health - get backend health statuses
        from a backend service

SYNOPSIS
    gcloud compute backend-services get-health BACKEND_SERVICE_NAME
        [--global | --region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-services get-health is used to request the current
    health status of instances in a backend service. Every group in the service
    is checked and the health status of each configured instance is printed.

    If a group contains names of instances that don't exist or instances that
    haven't yet been pushed to the load-balancing system, they will not show
    up. Those that are listed as HEALTHY are able to receive load-balanced
    traffic. Those that are marked as UNHEALTHY are either failing the
    configured health-check or not responding to it.

    Since the health checks are performed continuously and in a distributed
    manner, the state returned by this command is the most recent result of a
    vote of several redundant health checks. Backend services that do not have
    a valid global forwarding rule referencing it will not be health checked
    and so will have no health status.

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to operate on.

FLAGS
     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to operate on. Overrides the default
          compute/region property value for this command invocation.

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

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services get-health

        $ gcloud beta compute backend-services get-health
```

### gcloud compute backend-services get-iam-policy

```text
NAME
    gcloud compute backend-services get-iam-policy - get the IAM policy for a
        Compute Engine backend service

SYNOPSIS
    gcloud compute backend-services get-iam-policy BACKEND_SERVICE_NAME
        [--global | --region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-services get-iam-policy displays the IAM policy
    associated with a Compute Engine backend service in a project. If formatted
    as JSON, the output can be edited and used as a policy file for
    set-iam-policy. The output includes an "etag" field identifying the version
    emitted and allowing detection of concurrent policy updates; see $ {parent}
    set-iam-policy for additional details.

EXAMPLES
    To print the IAM policy for a given backend service, run:

        $ gcloud compute backend-services get-iam-policy \
            my-backend-service --region=REGION

        $ gcloud compute backend-services get-iam-policy \
            my-backend-service --global

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to operate on.

FLAGS
     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to operate on. Overrides the default
          compute/region property value for this command invocation.

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

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services get-iam-policy

        $ gcloud beta compute backend-services get-iam-policy
```

### gcloud compute backend-services import

```text
NAME
    gcloud compute backend-services import - import a backend service

SYNOPSIS
    gcloud compute backend-services import BACKEND_SERVICE_NAME
        [--source=SOURCE] [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Imports a backend service's configuration from a file.

EXAMPLES
    A backend service can be imported by running:

        $ gcloud compute backend-services import NAME \
            --source=<path-to-file> --global

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to import.

FLAGS
     --source=SOURCE
        Path to a YAML file containing configuration export data.
        Alternatively, you may omit this flag to read from standard input. For
        a schema describing the export/import format, see:
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/compute/v1/BackendService.yaml.

            Note: $CLOUDSDKROOT represents the Google Cloud CLI's installation directory.

     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to import. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services import

        $ gcloud beta compute backend-services import
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute backend-services import NAME \
    --source=PATH_TO_FILE \
    --global
```

### gcloud compute backend-services list

```text
NAME
    gcloud compute backend-services list - list Google Compute Engine backend
        services

SYNOPSIS
    gcloud compute backend-services list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--global | --regions=[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-services list displays all Google Compute Engine
    backend services in a project.

    By default, global backend services and backend services from all regions
    are listed. The results can be narrowed down by providing the --global or
    --regions flag.

EXAMPLES
    To list all backend services in a project in table form, run:

        $ gcloud compute backend-services list

    To list the URIs of all backend services in a project, run:

        $ gcloud compute backend-services list --uri

    To list all global backend services in a project, run:

        $ gcloud compute backend-services list --global

    To list all backend services in the us-central1 and europe-west1 regions,
    given they are regional resources, run:

        $ gcloud compute backend-services list \
            --filter="region:( europe-west1 us-central1 )"

POSITIONAL ARGUMENTS
     [NAME ...]
        (DEPRECATED) If provided, show details for the specified names and/or
        URIs of resources.

        Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )"
        instead.

FLAGS
     --regexp=REGEXP, -r REGEXP
        (DEPRECATED) Regular expression to filter the names of the results on.
        Any names that do not match the entire regular expression will be
        filtered out.

        Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.

     At most one of these can be specified:

       --global
          If provided, only global resources are shown.

       --regions=[REGION,...]
          If provided, only regional resources are shown. If arguments are
          provided, only resources from the given regions are shown.

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

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services list

        $ gcloud beta compute backend-services list
```

### gcloud compute backend-services list-usable

```text
NAME
    gcloud compute backend-services list-usable - list usable backend services

SYNOPSIS
    gcloud compute backend-services list-usable [BACKEND_SERVICE_NAME]
        [--global | --region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-services list-usable retrieves the list of backend
    service resources in the specified project for which you have
    compute.backendService.get and compute.backendService.use permissions. This
    command is useful when you're creating load balancers in a Shared VPC
    environment and you want to use cross-project service referencing
    (https://cloud.google.com/load-balancing/docs/https#cross-project). You can
    use this command to find out which backend services in other projects are
    available to you for referencing.

EXAMPLES
    To list all global backend services in a project, run:

        $ gcloud compute backend-services list-usable --global

    To list all backend services in a region, run:

        $ gcloud compute backend-services list-usable --region=REGION

POSITIONAL ARGUMENTS
     [BACKEND_SERVICE_NAME]
        Name of the backend service to operate on.

FLAGS
     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to operate on. Overrides the default
          compute/region property value for this command invocation.

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

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services list-usable

        $ gcloud beta compute backend-services list-usable
```

### gcloud compute backend-services remove-backend

```text
NAME
    gcloud compute backend-services remove-backend - remove a backend from a
        backend service

SYNOPSIS
    gcloud compute backend-services remove-backend BACKEND_SERVICE_NAME
        ([--instance-group=INSTANCE_GROUP
          : --instance-group-region=INSTANCE_GROUP_REGION
          | --instance-group-zone=INSTANCE_GROUP_ZONE]
          | [--network-endpoint-group=NETWORK_ENDPOINT_GROUP
          : --global-network-endpoint-group
          | --network-endpoint-group-region=NETWORK_ENDPOINT_GROUP_REGION
          | --network-endpoint-group-zone=NETWORK_ENDPOINT_GROUP_ZONE])
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-services remove-backend is used to remove a backend
    from a backend service.

    Before removing a backend, it is a good idea to "drain" the backend first.
    A backend can be drained by setting its capacity scaler to zero through
    'gcloud compute backend-services edit'.

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to operate on.

REQUIRED FLAGS
     Exactly one of these must be specified:

       Instance Group

       --instance-group=INSTANCE_GROUP
          Name of the instance group to remove from the backend service. For
          details on valid instance names, refer to the criteria documented
          under the field 'name' at:
          https://cloud.google.com/compute/docs/reference/rest/v1/instances

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       At most one of these can be specified:

         --instance-group-region=INSTANCE_GROUP_REGION
            Region of the instance group to remove from the backend service. If
            not specified, you might be prompted to select a region
            (interactive mode only).

            To avoid prompting when this flag is omitted, you can set the
            compute/region property:

                $ gcloud config set compute/region REGION

            A list of regions can be fetched by running:

                $ gcloud compute regions list

            To unset the property, run:

                $ gcloud config unset compute/region

            Alternatively, the region can be stored in the environment variable
            CLOUDSDK_COMPUTE_REGION.

         --instance-group-zone=INSTANCE_GROUP_ZONE
            Zone of the instance group to remove from the backend service. If
            not specified and the compute/zone property isn't set, you might be
            prompted to select a zone (interactive mode only).

            To avoid prompting when this flag is omitted, you can set the
            compute/zone property:

                $ gcloud config set compute/zone ZONE

            A list of zones can be fetched by running:

                $ gcloud compute zones list

            To unset the property, run:

                $ gcloud config unset compute/zone

            Alternatively, the zone can be stored in the environment variable
            CLOUDSDK_COMPUTE_ZONE.

       Network Endpoint Group

       --network-endpoint-group=NETWORK_ENDPOINT_GROUP
          Name of the network endpoint group to remove from the backend
          service.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       At most one of these can be specified:

         --global-network-endpoint-group
            If set, the network endpoint group is global.

         --network-endpoint-group-region=NETWORK_ENDPOINT_GROUP_REGION
            Region of the network endpoint group to remove from the backend
            service. If not specified, you might be prompted to select a region
            (interactive mode only).

            To avoid prompting when this flag is omitted, you can set the
            compute/region property:

                $ gcloud config set compute/region REGION

            A list of regions can be fetched by running:

                $ gcloud compute regions list

            To unset the property, run:

                $ gcloud config unset compute/region

            Alternatively, the region can be stored in the environment variable
            CLOUDSDK_COMPUTE_REGION.

         --network-endpoint-group-zone=NETWORK_ENDPOINT_GROUP_ZONE
            Zone of the network endpoint group to remove from the backend
            service. If not specified and the compute/zone property isn't set,
            you might be prompted to select a zone (interactive mode only).

            To avoid prompting when this flag is omitted, you can set the
            compute/zone property:

                $ gcloud config set compute/zone ZONE

            A list of zones can be fetched by running:

                $ gcloud compute zones list

            To unset the property, run:

                $ gcloud config unset compute/zone

            Alternatively, the zone can be stored in the environment variable
            CLOUDSDK_COMPUTE_ZONE.

OPTIONAL FLAGS
     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to operate on. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services remove-backend

        $ gcloud beta compute backend-services remove-backend
```

### gcloud compute backend-services remove-iam-policy-binding

```text
NAME
    gcloud compute backend-services remove-iam-policy-binding - remove an IAM
        policy binding from a Compute Engine backend service

SYNOPSIS
    gcloud compute backend-services remove-iam-policy-binding
        BACKEND_SERVICE_NAME --member=PRINCIPAL --role=ROLE
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding from a Compute Engine backend service.

EXAMPLES
    To remove an IAM policy binding for the role of
    'roles/compute.loadBalancerServiceUser' for the user 'test-user@gmail.com'
    with backend service 'my-backend-service' and region 'REGION', run:

        $ gcloud compute backend-services remove-iam-policy-binding \
          my-backend-service --region=REGION \
          --member='user:test-user@gmail.com' \
          --role='roles/compute.loadBalancerServiceUser'

        $ gcloud compute backend-services remove-iam-policy-binding \
          my-backend-service --global \
          --member='user:test-user@gmail.com' \
          --role='roles/compute.loadBalancerServiceUser'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to operate on.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to remove the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Deleted principals have an additional deleted: prefix and a ?uid=UID
        suffix, where UID is a unique identifier for the principal. Example:
        deleted:user:test-user@gmail.com?uid=123456789012345678901.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        The role to remove the principal from.

OPTIONAL FLAGS
     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to operate on. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services remove-iam-policy-binding

        $ gcloud beta compute backend-services remove-iam-policy-binding
```

### gcloud compute backend-services remove-service-bindings

```text
NAME
    gcloud compute backend-services remove-service-bindings - remove service
        bindings from a backend service

SYNOPSIS
    gcloud compute backend-services remove-service-bindings
        BACKEND_SERVICE_NAME --service-bindings=SERVICE_BINDING,[...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove service bindings from a backend service.

EXAMPLES
    To remove a service binding from a backend service, run:

        $ gcloud compute backend-services remove-service-bindings NAME \
            --service-bindings=SERVICE_BINDING1 --global

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to operate on.

REQUIRED FLAGS
     --service-bindings=SERVICE_BINDING,[...]
        List of service binding names to be removed from the backend service.

OPTIONAL FLAGS
     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to operate on. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services remove-service-bindings

        $ gcloud beta compute backend-services remove-service-bindings
```

### gcloud compute backend-services set-iam-policy

```text
NAME
    gcloud compute backend-services set-iam-policy - set the IAM policy binding
        for a Compute Engine backend service

SYNOPSIS
    gcloud compute backend-services set-iam-policy BACKEND_SERVICE_NAME
        POLICY_FILE [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given backend service as defined in a JSON or
    YAML file.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    'policy.json' and set it for the backend service my-backend-service:

        $ gcloud compute backend-services set-iam-policy \
            my-backend-service policy.json --region=REGION

        $ gcloud compute backend-services set-iam-policy \
            my-backend-service policy.json --global

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to operate on.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

FLAGS
     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to operate on. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services set-iam-policy

        $ gcloud beta compute backend-services set-iam-policy
```

### gcloud compute backend-services test-iam-permissions

```text
NAME
    gcloud compute backend-services test-iam-permissions - test IAM permissions
        for a Compute Engine backend service

SYNOPSIS
    gcloud compute backend-services test-iam-permissions BACKEND_SERVICE_NAME
        --permissions=[PERMISSION,...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-services test-iam-permissions tests the IAM
    permissions that a caller has on a Compute Engine backend service.

EXAMPLES
    To test if the caller has the compute.backendServices.get permission on the
    global backend service my-backend-service, run:

        $ gcloud compute backend-services test-iam-permissions \
            my-backend-service --global \
            --permissions=compute.backendServices.get

    To test if the caller has the compute.regionBackendServices.get permission
    on the regional backend service my-backend-service in region us-central1,
    run:

        $ gcloud compute backend-services test-iam-permissions \
            my-backend-service --region=us-central1 \
            --permissions=compute.regionBackendServices.get

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to operate on.

REQUIRED FLAGS
     --permissions=[PERMISSION,...]
        The set of permissions to check for the resource.

OPTIONAL FLAGS
     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to operate on. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services test-iam-permissions

        $ gcloud beta compute backend-services test-iam-permissions
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute backend-services list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-services (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
