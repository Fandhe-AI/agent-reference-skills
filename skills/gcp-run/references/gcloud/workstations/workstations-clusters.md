---
source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/clusters
---

# gcloud workstations clusters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud workstations clusters create

```text
NAME
    gcloud workstations clusters create - create a workstation cluster

SYNOPSIS
    gcloud workstations clusters create (CLUSTER : --region=REGION) [--async]
        [--domain=DOMAIN] [--enable-http2] [--enable-private-endpoint]
        [--endpoint-mode=ENDPOINT_MODE] [--labels=[KEY=VALUE,...]]
        [--network=NETWORK] [--subnetwork=SUBNETWORK] [--tags=[KEY=VALUE,...]]
        [--workstation-authorization-url=WORKSTATION_AUTHORIZATION_URL]
        [--workstation-launch-url=WORKSTATION_LAUNCH_URL]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a workstation cluster.

EXAMPLES
    To create a public cluster my-cluster in region us-central1, run:

        $ gcloud workstations clusters create my-cluster --region=us-central1

    To create a private cluster 'my-private-cluster' associated with network
    'my-network' and subnetwork 'my-subnetwork'. run:

        $ gcloud workstations clusters create my-private-cluster \
            --region=us-central1 --enable-private-endpoint \
            --network='my-network' --subnetwork='my-subnetwork'

POSITIONAL ARGUMENTS
     Cluster resource - Arguments and flags that specify the cluster to create.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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
          The name of the region of the cluster.

          To set the region attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property workstations/region.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --domain=DOMAIN
        Domain used by Workstations for HTTP ingress.

     --enable-http2
        Whether HTTP/2 is enabled for the workstation cluster.

     --enable-private-endpoint
        Default is false. If specified, the cluster will be assigned an
        internal IP address to the Cluster Gateway. This isolates the cluster's
        workstations from public networks, but requires additional
        configuration. Learn more: https://cloud.google.com/workstations/docs.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     --labels=[KEY=VALUE,...]
        Labels that are applied to the cluster and propagated to the underlying
        Compute Engine resources.

     --network=NETWORK
        Fully specified network path for instances created in this cluster.

     --subnetwork=SUBNETWORK
        Fully specified subnetwork path for instances created in this cluster.

     --tags=[KEY=VALUE,...]
        Resource manager tags to be bound to this cluster. For example:
        "123/environment=production" "123/costCenter=marketing"

     --workstation-authorization-url=WORKSTATION_AUTHORIZATION_URL
        The redirect URL for unauthorized requests. Redirects to this endpoint
        send a base64 encoded 'state' query param with the workstation name and
        original request hostname.

     --workstation-launch-url=WORKSTATION_LAUNCH_URL
        The launch URL for workstations. Requests sent to unstarted
        workstations will be redirected to this URL with 'workstation' and
        'project' query params.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the workstations/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/workstations

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha workstations clusters create

        $ gcloud beta workstations clusters create
```

### gcloud workstations clusters delete

```text
NAME
    gcloud workstations clusters delete - delete a workstation cluster

SYNOPSIS
    gcloud workstations clusters delete (CLUSTER : --region=REGION) [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a workstation cluster.

EXAMPLES
    To delete a cluster, run:

        $ gcloud workstations clusters delete WORKSTATION

POSITIONAL ARGUMENTS
     Cluster resource - The name of the cluster to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

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
          The name of the region of the cluster.

          To set the region attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property workstations/region.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the workstations/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/workstations

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha workstations clusters delete

        $ gcloud beta workstations clusters delete
```

### gcloud workstations clusters describe

```text
NAME
    gcloud workstations clusters describe - describe a cluster

SYNOPSIS
    gcloud workstations clusters describe (CLUSTER : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a cluster.

EXAMPLES
    To describe a cluster, run:

        $ gcloud workstations clusters describe CLUSTER

POSITIONAL ARGUMENTS
     Cluster resource - The name of the cluster to display. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

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
          The name of the region of the cluster.

          To set the region attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property workstations/region.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the workstations/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/workstations

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha workstations clusters describe

        $ gcloud beta workstations clusters describe
```

### gcloud workstations clusters list

```text
NAME
    gcloud workstations clusters list - list workstation clusters

SYNOPSIS
    gcloud workstations clusters list [--endpoint-mode=ENDPOINT_MODE]
        [--region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all workstation clusters under the specified project and region.

EXAMPLES
    To list workstation clusters, run:

        $ gcloud workstations clusters list

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     Region resource - The region of the clusters to display. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * set the property workstations/region with a fully specified name;
      * default is all regions with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --region=REGION
        ID of the region or fully qualified identifier for the region.

        To set the region attribute:
        * provide the argument --region on the command line;
        * set the property workstations/region;
        * default is all regions .

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
    This command uses the workstations/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/workstations

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha workstations clusters list

        $ gcloud beta workstations clusters list
```

### gcloud workstations clusters update

```text
NAME
    gcloud workstations clusters update - update a workstation cluster

SYNOPSIS
    gcloud workstations clusters update (CLUSTER : --region=REGION) [--async]
        [--display-name=DISPLAY_NAME] [--enable-http2]
        [--endpoint-mode=ENDPOINT_MODE] [--update-labels=[KEY=VALUE,...]]
        [--workstation-authorization-url=WORKSTATION_AUTHORIZATION_URL]
        [--workstation-launch-url=WORKSTATION_LAUNCH_URL]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a workstation cluster.

EXAMPLES
    To update the display name of workstation cluster my-cluster in region
    us-central1, run:

        $ gcloud workstations clusters update my-cluster \
            --region=us-central1 --display-name='My New Cluster Name'

POSITIONAL ARGUMENTS
     Cluster resource - Arguments and flags that specify the cluster to update.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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
          The name of the region of the cluster.

          To set the region attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property workstations/region.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        Human-readable name for this workstation cluster.

     --enable-http2
        Enable or disable HTTP/2 for the workstation cluster.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --workstation-authorization-url=WORKSTATION_AUTHORIZATION_URL
        The redirect URL for unauthorized requests.

     --workstation-launch-url=WORKSTATION_LAUNCH_URL
        The launch URL for workstations.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud workstations clusters update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud workstations clusters update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the workstations/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/workstations

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha workstations clusters update

        $ gcloud beta workstations clusters update
```

### gcloud beta workstations clusters create

```text
NAME
    gcloud beta workstations clusters create - create a workstation cluster

SYNOPSIS
    gcloud beta workstations clusters create (CLUSTER : --region=REGION)
        [--async] [--console-base-url=CONSOLE_BASE_URL]
        [--direct-access-ports=[DIRECT_ACCESS_PORTS,...]] [--domain=DOMAIN]
        [--enable-http2] [--enable-private-endpoint]
        [--endpoint-mode=ENDPOINT_MODE] [--labels=[KEY=VALUE,...]]
        [--network=NETWORK] [--subnetwork=SUBNETWORK] [--tags=[KEY=VALUE,...]]
        [--workstation-authorization-url=WORKSTATION_AUTHORIZATION_URL]
        [--workstation-launch-url=WORKSTATION_LAUNCH_URL]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workstations clusters delete

```text
NAME
    gcloud beta workstations clusters delete - delete a workstation cluster

SYNOPSIS
    gcloud beta workstations clusters delete (CLUSTER : --region=REGION)
        [--async] [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workstations clusters describe

```text
NAME
    gcloud beta workstations clusters describe - describe a cluster

SYNOPSIS
    gcloud beta workstations clusters describe (CLUSTER : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workstations clusters list

```text
NAME
    gcloud beta workstations clusters list - list workstation clusters

SYNOPSIS
    gcloud beta workstations clusters list [--endpoint-mode=ENDPOINT_MODE]
        [--region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workstations clusters update

```text
NAME
    gcloud beta workstations clusters update - update a workstation cluster

SYNOPSIS
    gcloud beta workstations clusters update (CLUSTER : --region=REGION)
        [--async] [--console-base-url=CONSOLE_BASE_URL]
        [--direct-access-ports=[DIRECT_ACCESS_PORTS,...]]
        [--display-name=DISPLAY_NAME] [--enable-http2]
        [--endpoint-mode=ENDPOINT_MODE] [--update-labels=[KEY=VALUE,...]]
        [--workstation-authorization-url=WORKSTATION_AUTHORIZATION_URL]
        [--workstation-launch-url=WORKSTATION_LAUNCH_URL]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha workstations clusters create

```text
NAME
    gcloud alpha workstations clusters create - create a workstation cluster

SYNOPSIS
    gcloud alpha workstations clusters create (CLUSTER : --region=REGION)
        [--async] [--console-base-url=CONSOLE_BASE_URL]
        [--direct-access-ports=[DIRECT_ACCESS_PORTS,...]] [--domain=DOMAIN]
        [--enable-http2] [--enable-private-endpoint]
        [--endpoint-mode=ENDPOINT_MODE] [--labels=[KEY=VALUE,...]]
        [--network=NETWORK] [--subnetwork=SUBNETWORK] [--tags=[KEY=VALUE,...]]
        [--workstation-authorization-url=WORKSTATION_AUTHORIZATION_URL]
        [--workstation-launch-url=WORKSTATION_LAUNCH_URL]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha workstations clusters delete

```text
NAME
    gcloud alpha workstations clusters delete - delete a workstation cluster

SYNOPSIS
    gcloud alpha workstations clusters delete (CLUSTER : --region=REGION)
        [--async] [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha workstations clusters describe

```text
NAME
    gcloud alpha workstations clusters describe - describe a cluster

SYNOPSIS
    gcloud alpha workstations clusters describe (CLUSTER : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha workstations clusters list

```text
NAME
    gcloud alpha workstations clusters list - list workstation clusters

SYNOPSIS
    gcloud alpha workstations clusters list [--endpoint-mode=ENDPOINT_MODE]
        [--region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha workstations clusters update

```text
NAME
    gcloud alpha workstations clusters update - update a workstation cluster

SYNOPSIS
    gcloud alpha workstations clusters update (CLUSTER : --region=REGION)
        [--async] [--console-base-url=CONSOLE_BASE_URL]
        [--direct-access-ports=[DIRECT_ACCESS_PORTS,...]]
        [--display-name=DISPLAY_NAME] [--enable-http2]
        [--endpoint-mode=ENDPOINT_MODE] [--update-labels=[KEY=VALUE,...]]
        [--workstation-authorization-url=WORKSTATION_AUTHORIZATION_URL]
        [--workstation-launch-url=WORKSTATION_LAUNCH_URL]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
