---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/sole-tenancy/node-groups
---

# gcloud compute sole-tenancy node-groups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute sole-tenancy node-groups add-iam-policy-binding

```text
NAME
    gcloud compute sole-tenancy node-groups add-iam-policy-binding - add IAM
        policy binding to a Compute Engine node group

SYNOPSIS
    gcloud compute sole-tenancy node-groups add-iam-policy-binding
        (NODE_GROUP : --zone=ZONE) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to a Compute Engine node group.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/compute.admin' for the
    user 'test-user@gmail.com' with node group 'my-node-group' and zone 'ZONE',
    run:

        $ gcloud compute sole-tenancy node-groups add-iam-policy-binding \
            my-node-group --zone=ZONE --member='user:test-user@gmail.com' \
            --role='roles/compute.admin'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Node group resource - The node group for which to add IAM policy binding
     to. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument node_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_GROUP
          ID of the node_group or fully qualified identifier for the
          node_group.

          To set the node_group attribute:
          + provide the argument node_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument node_group on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to add the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        Role name to assign to the principal. The role name is the complete
        path of a predefined role, such as roles/logging.viewer, or the role ID
        for a custom role, such as
        organizations/{ORGANIZATION_ID}/roles/logging.viewer.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-groups \
            add-iam-policy-binding

        $ gcloud beta compute sole-tenancy node-groups add-iam-policy-binding
```

### gcloud compute sole-tenancy node-groups create

```text
NAME
    gcloud compute sole-tenancy node-groups create - create a Compute Engine
        node group

SYNOPSIS
    gcloud compute sole-tenancy node-groups create NAME
        --node-template=NODE_TEMPLATE --target-size=TARGET_SIZE
        [--description=DESCRIPTION]
        [--maintenance-interval=MAINTENANCE_INTERVAL]
        [--maintenance-policy=MAINTENANCE_POLICY]
        [--maintenance-window-start-time=START_TIME] [--zone=ZONE]
        [--autoscaler-mode=AUTOSCALER_MODE
          : --max-nodes=MAX_NODES --min-nodes=MIN_NODES]
        [--share-setting=SHARE_SETTING : --share-with=PROJECT,[PROJECT,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Compute Engine node group.

EXAMPLES
    To create a node group, run:

        $ gcloud compute sole-tenancy node-groups create my-node-group \
            --node-template=example-template --target-size=4

POSITIONAL ARGUMENTS
     NAME
        Name of the node group to operate on.

REQUIRED FLAGS
     --node-template=NODE_TEMPLATE
        The name of the node template resource to be set for this node group.

     --target-size=TARGET_SIZE
        The target initial number of nodes in the node group.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional description of this resource.

     --maintenance-interval=MAINTENANCE_INTERVAL
        Specifies the frequency of planned maintenance events.
        MAINTENANCE_INTERVAL must be one of:

         as-needed
            hosts are eligible to receive infrastructure and hypervisor updates
            as they become available.
         recurrent
            hosts receive planned infrastructure and hypervisor updates on a
            periodic basis, but not more frequently than every 28 days. This
            minimizes the number of planned maintenance operations on
            individual hosts and reduces the frequency of disruptions, both
            live migrations and terminations, on individual VMs.

     --maintenance-policy=MAINTENANCE_POLICY
        Determines the maintenance behavior during host maintenance events. For
        more information, see
        https://cloud.google.com/compute/docs/nodes#maintenance_policies.
        MAINTENANCE_POLICY must be one of:

         default
            VM instances on the host are live migrated to a new physical
            server. This is the default setting.
         migrate-within-node-group
            VM instances on the host are live migrated to another node within
            the same node group.
         restart-in-place
            VM instances on the host are terminated and then restarted on the
            same physical server after the maintenance event has completed.

     --maintenance-window-start-time=START_TIME
        The time (in GMT) when planned maintenance operations window begins.
        The possible values are 00:00, 04:00, 08:00, 12:00, 16:00, 20:00.

     --zone=ZONE
        Zone of the node group to operate on. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

     Autoscaling policy for node groups.

     --autoscaler-mode=AUTOSCALER_MODE
        Set the mode of an autoscaler for a node group. AUTOSCALER_MODE must be
        one of:

         off
            to turn off autoscaling.
         on
            to permit autoscaling to scale in and out.
         only-scale-out
            to permit autoscaling to scale only out and not in.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --max-nodes=MAX_NODES
        The maximum size of the node group. Must be smaller or equal to 100 and
        larger than or equal to --min-nodes. Must be specified if
        --autoscaler-mode is not off.

     --min-nodes=MIN_NODES
        The minimum size of the node group. Default is 0 and must be an integer
        value smaller than or equal to --max-nodes.

     Manage the properties of a shared setting

     --share-setting=SHARE_SETTING
        Specify if this node group is shared; and if so, the type of sharing:
        share with specific projects or folders. SHARE_SETTING must be one of:
        projects, organization, local.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --share-with=PROJECT,[PROJECT,...]
        A list of specific projects this node group should be shared with.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-groups create

        $ gcloud beta compute sole-tenancy node-groups create
```

### gcloud compute sole-tenancy node-groups delete

```text
NAME
    gcloud compute sole-tenancy node-groups delete - delete a Compute Engine
        node group

SYNOPSIS
    gcloud compute sole-tenancy node-groups delete NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Compute Engine node group.

EXAMPLES
    To delete a node group, run:

        $ gcloud compute sole-tenancy node-groups delete my-node-group

POSITIONAL ARGUMENTS
     NAME
        Name of the node group to operate on.

FLAGS
     --zone=ZONE
        Zone of the node group to operate on. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-groups delete

        $ gcloud beta compute sole-tenancy node-groups delete
```

### gcloud compute sole-tenancy node-groups describe

```text
NAME
    gcloud compute sole-tenancy node-groups describe - describe a Compute
        Engine node group

SYNOPSIS
    gcloud compute sole-tenancy node-groups describe NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Compute Engine node group.

EXAMPLES
    To describe a node group, run:

        $ gcloud compute sole-tenancy node-groups describe my-node-group

POSITIONAL ARGUMENTS
     NAME
        Name of the node group to operate on.

FLAGS
     --zone=ZONE
        Zone of the node group to operate on. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-groups describe

        $ gcloud beta compute sole-tenancy node-groups describe
```

### gcloud compute sole-tenancy node-groups get-iam-policy

```text
NAME
    gcloud compute sole-tenancy node-groups get-iam-policy - get the IAM policy
        for a Compute Engine node group

SYNOPSIS
    gcloud compute sole-tenancy node-groups get-iam-policy
        (NODE_GROUP : --zone=ZONE) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute sole-tenancy node-groups get-iam-policy displays the IAM
    policy associated with a Compute Engine node group in a zone. If formatted
    as JSON, the output can be edited and used as a policy file for
    set-iam-policy. The output includes an "etag" field identifying the version
    emitted and allowing detection of concurrent policy updates; see $ {parent}
    set-iam-policy for additional details.

EXAMPLES
    To print the IAM policy for a given node group, run:

        $ gcloud compute sole-tenancy node-groups get-iam-policy \
            my-node-group --zone=ZONE

POSITIONAL ARGUMENTS
     Node group resource - The node group for which to display the IAM policy.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument node_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_GROUP
          ID of the node_group or fully qualified identifier for the
          node_group.

          To set the node_group attribute:
          + provide the argument node_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument node_group on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

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
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-groups get-iam-policy

        $ gcloud beta compute sole-tenancy node-groups get-iam-policy
```

### gcloud compute sole-tenancy node-groups list

```text
NAME
    gcloud compute sole-tenancy node-groups list - list Google Compute Engine
        node groups

SYNOPSIS
    gcloud compute sole-tenancy node-groups list [--share-settings]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute sole-tenancy node-groups list displays all Google Compute
    Engine node groups in a project.

    By default, node groups from all regions are listed. The results can be
    narrowed down using a filter: --filter="region:( REGION ... )".

EXAMPLES
    To list all node groups in a project in table form, run:

        $ gcloud compute sole-tenancy node-groups list

    To list the URIs of all node groups in a project, run:

        $ gcloud compute sole-tenancy node-groups list --uri

    To list all node groups in the us-central1 and europe-west1 regions, run:

        $ gcloud compute sole-tenancy node-groups list \
            --filter="region:( us-central1 europe-west1 )"

FLAGS
     --share-settings
        If provided, shows details for the share setting

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

        $ gcloud alpha compute sole-tenancy node-groups list

        $ gcloud beta compute sole-tenancy node-groups list
```

### gcloud compute sole-tenancy node-groups list-nodes

```text
NAME
    gcloud compute sole-tenancy node-groups list-nodes - list Compute Engine
        sole-tenant nodes present in a nodegroup

SYNOPSIS
    gcloud compute sole-tenancy node-groups list-nodes NAME [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Compute Engine sole-tenant nodes present in a node group.

EXAMPLES
    To list sole-tenant nodes present in a node group, run:

        $ gcloud compute sole-tenancy node-groups list-nodes my-node-group

POSITIONAL ARGUMENTS
     NAME
        Name of the node group to operate on.

FLAGS
     --zone=ZONE
        Zone of the node group to operate on. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

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

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-groups list-nodes

        $ gcloud beta compute sole-tenancy node-groups list-nodes
```

### gcloud compute sole-tenancy node-groups perform-maintenance

```text
NAME
    gcloud compute sole-tenancy node-groups perform-maintenance - perform
        maintenance on nodes in a Compute Engine node group

SYNOPSIS
    gcloud compute sole-tenancy node-groups perform-maintenance NAME
        --nodes=NODE,[NODE,...] [--start-time=START_TIME] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Perform maintenance on nodes in a Compute Engine node group.

EXAMPLES
    To perform maintenance on nodes in a node group, run:

        $ gcloud compute sole-tenancy node-groups perform-maintenance \
            my-node-group --nodes=node-1,node-2 \
            --start-time=2023-05-01T00:00:00.000-08:00

POSITIONAL ARGUMENTS
     NAME
        Name of the node group to operate on.

REQUIRED FLAGS
     --nodes=NODE,[NODE,...]
        The names of the nodes to perform maintenance on.

OPTIONAL FLAGS
     --start-time=START_TIME
        The requested time for the maintenance window to start. The timestamp
        must be an RFC3339 valid string.

     --zone=ZONE
        Zone of the node group to operate on. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-groups perform-maintenance

        $ gcloud beta compute sole-tenancy node-groups perform-maintenance
```

### gcloud compute sole-tenancy node-groups remove-iam-policy-binding

```text
NAME
    gcloud compute sole-tenancy node-groups remove-iam-policy-binding - remove
        IAM policy binding from a Compute Engine node group

SYNOPSIS
    gcloud compute sole-tenancy node-groups remove-iam-policy-binding
        (NODE_GROUP : --zone=ZONE) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding from a Compute Engine node group.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/compute.admin' for
    the user 'test-user@gmail.com' with node group 'my-node-group' and zone
    'ZONE', run:

        $ gcloud compute sole-tenancy node-groups \
            remove-iam-policy-binding my-node-group --zone=ZONE \
            --member='user:test-user@gmail.com' --role='roles/compute.admin'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Node group resource - The node group for which to remove IAM policy
     binding from. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument node_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_GROUP
          ID of the node_group or fully qualified identifier for the
          node_group.

          To set the node_group attribute:
          + provide the argument node_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument node_group on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-groups \
            remove-iam-policy-binding

        $ gcloud beta compute sole-tenancy node-groups \
            remove-iam-policy-binding
```

### gcloud compute sole-tenancy node-groups set-iam-policy

```text
NAME
    gcloud compute sole-tenancy node-groups set-iam-policy - set the IAM policy
        for a Compute Engine node group

SYNOPSIS
    gcloud compute sole-tenancy node-groups set-iam-policy
        (NODE_GROUP : --zone=ZONE) POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given node group as defined in a JSON or YAML
    file.

EXAMPLES
    The following command will read am IAM policy defined in a JSON file
    'policy.json' and set it for the node group my-node-group:

        $ gcloud compute sole-tenancy node-groups set-iam-policy \
            my-node-group --zone=ZONE policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Node group resource - The node group to set the IAM policy for. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument node_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_GROUP
          ID of the node_group or fully qualified identifier for the
          node_group.

          To set the node_group attribute:
          + provide the argument node_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument node_group on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-groups set-iam-policy

        $ gcloud beta compute sole-tenancy node-groups set-iam-policy
```

### gcloud compute sole-tenancy node-groups simulate-maintenance-event

```text
NAME
    gcloud compute sole-tenancy node-groups simulate-maintenance-event -
        simulate maintenance of a Compute Engine node group

SYNOPSIS
    gcloud compute sole-tenancy node-groups simulate-maintenance-event NAME
        [--async] [--nodes=[NODE,...]] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Simulate maintenance of a Compute Engine node group.

EXAMPLES
    To simulate maintenance of a node group, run:

        $ gcloud compute sole-tenancy node-groups \
            simulate-maintenance-event my-node-group --nodes=example-nodes

POSITIONAL ARGUMENTS
     NAME
        Name of the node group to operate on.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --nodes=[NODE,...]
        The names of the nodes to simulate maintenance event.

     --zone=ZONE
        Zone of the node group to operate on. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-groups \
            simulate-maintenance-event

        $ gcloud beta compute sole-tenancy node-groups \
            simulate-maintenance-event
```

### gcloud compute sole-tenancy node-groups test-iam-permissions

```text
NAME
    gcloud compute sole-tenancy node-groups test-iam-permissions - test IAM
        permissions for a Compute Engine node group

SYNOPSIS
    gcloud compute sole-tenancy node-groups test-iam-permissions
        (NODE_GROUP : --zone=ZONE) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns permissions that a caller has on the specified node group.

EXAMPLES
    To test if the caller has 'compute.nodeGroups.get' permission on a node
    group, run:

        $ gcloud compute sole-tenancy node-groups test-iam-permissions \
            my-node-group --zone=ZONE --permissions=compute.nodeGroups.get

POSITIONAL ARGUMENTS
     Node group resource - The ID of the node group to test the IAM permissions
     for. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument node_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_GROUP
          ID of the node_group or fully qualified identifier for the
          node_group.

          To set the node_group attribute:
          + provide the argument node_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument node_group on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

REQUIRED FLAGS
     --permissions=[PERMISSIONS,...]
        The permissions to test.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-groups test-iam-permissions

        $ gcloud beta compute sole-tenancy node-groups test-iam-permissions
```

### gcloud compute sole-tenancy node-groups update

```text
NAME
    gcloud compute sole-tenancy node-groups update - update a Compute Engine
        node group

SYNOPSIS
    gcloud compute sole-tenancy node-groups update NAME
        [--node-template=NODE_TEMPLATE] [--zone=ZONE]
        [--add-nodes=ADD_NODES | --delete-nodes=[NODE,...]]
        [--autoscaler-mode=AUTOSCALER_MODE
          --max-nodes=MAX_NODES --min-nodes=MIN_NODES]
        [--share-setting=SHARE_SETTING : --share-with=PROJECT,[PROJECT,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Compute Engine node group.

EXAMPLES
    To update a node group to have two more nodes, run:

        $ gcloud compute sole-tenancy node-groups update my-node-group \
            --add-nodes=2

POSITIONAL ARGUMENTS
     NAME
        Name of the node group to operate on.

FLAGS
     --node-template=NODE_TEMPLATE
        The name of the node template resource to be set for this node group.

     --zone=ZONE
        Zone of the node group to operate on. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

     At most one of these can be specified:

       --add-nodes=ADD_NODES
          The number of nodes to add to the node group.

       --delete-nodes=[NODE,...]
          The names of the nodes to remove from the group.

     Autoscaling policy for node groups.

     --autoscaler-mode=AUTOSCALER_MODE
        Set the mode of an autoscaler for a node group. AUTOSCALER_MODE must be
        one of:

         off
            to turn off autoscaling.
         on
            to permit autoscaling to scale in and out.
         only-scale-out
            to permit autoscaling to scale only out and not in.

     --max-nodes=MAX_NODES
        The maximum size of the node group. Must be smaller or equal to 100 and
        larger than or equal to --min-nodes. Must be specified if
        --autoscaler-mode is not off.

     --min-nodes=MIN_NODES
        The minimum size of the node group. Default is 0 and must be an integer
        value smaller than or equal to --max-nodes.

     Manage the properties of a shared setting

     --share-setting=SHARE_SETTING
        Specify if this node group is shared; and if so, the type of sharing:
        share with specific projects or folders. SHARE_SETTING must be one of:
        projects, organization, local.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --share-with=PROJECT,[PROJECT,...]
        A list of specific projects this node group should be shared with.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-groups update

        $ gcloud beta compute sole-tenancy node-groups update
```

### gcloud beta compute sole-tenancy node-groups add-iam-policy-binding

```text
NAME
    gcloud beta compute sole-tenancy node-groups add-iam-policy-binding - add
        IAM policy binding to a Compute Engine node group

SYNOPSIS
    gcloud beta compute sole-tenancy node-groups add-iam-policy-binding
        (NODE_GROUP : --zone=ZONE) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-groups create

```text
NAME
    gcloud beta compute sole-tenancy node-groups create - create a Compute
        Engine node group

SYNOPSIS
    gcloud beta compute sole-tenancy node-groups create NAME
        --node-template=NODE_TEMPLATE --target-size=TARGET_SIZE
        [--description=DESCRIPTION]
        [--maintenance-interval=MAINTENANCE_INTERVAL]
        [--maintenance-policy=MAINTENANCE_POLICY]
        [--maintenance-window-start-time=START_TIME] [--zone=ZONE]
        [--autoscaler-mode=AUTOSCALER_MODE
          : --max-nodes=MAX_NODES --min-nodes=MIN_NODES]
        [--share-setting=SHARE_SETTING : --share-with=PROJECT,[PROJECT,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-groups delete

```text
NAME
    gcloud beta compute sole-tenancy node-groups delete - delete a Compute
        Engine node group

SYNOPSIS
    gcloud beta compute sole-tenancy node-groups delete NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-groups describe

```text
NAME
    gcloud beta compute sole-tenancy node-groups describe - describe a Compute
        Engine node group

SYNOPSIS
    gcloud beta compute sole-tenancy node-groups describe NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-groups get-iam-policy

```text
NAME
    gcloud beta compute sole-tenancy node-groups get-iam-policy - get the IAM
        policy for a Compute Engine node group

SYNOPSIS
    gcloud beta compute sole-tenancy node-groups get-iam-policy
        (NODE_GROUP : --zone=ZONE) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-groups list

```text
NAME
    gcloud beta compute sole-tenancy node-groups list - list Google Compute
        Engine node groups

SYNOPSIS
    gcloud beta compute sole-tenancy node-groups list [--share-settings]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-groups list-nodes

```text
NAME
    gcloud beta compute sole-tenancy node-groups list-nodes - list Compute
        Engine sole-tenant nodes present in a nodegroup

SYNOPSIS
    gcloud beta compute sole-tenancy node-groups list-nodes NAME [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-groups perform-maintenance

```text
NAME
    gcloud beta compute sole-tenancy node-groups perform-maintenance - perform
        maintenance on nodes in a Compute Engine node group

SYNOPSIS
    gcloud beta compute sole-tenancy node-groups perform-maintenance NAME
        --nodes=NODE,[NODE,...] [--start-time=START_TIME] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-groups remove-iam-policy-binding

```text
NAME
    gcloud beta compute sole-tenancy node-groups remove-iam-policy-binding -
        remove IAM policy binding from a Compute Engine node group

SYNOPSIS
    gcloud beta compute sole-tenancy node-groups remove-iam-policy-binding
        (NODE_GROUP : --zone=ZONE) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-groups set-iam-policy

```text
NAME
    gcloud beta compute sole-tenancy node-groups set-iam-policy - set the IAM
        policy for a Compute Engine node group

SYNOPSIS
    gcloud beta compute sole-tenancy node-groups set-iam-policy
        (NODE_GROUP : --zone=ZONE) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-groups simulate-maintenance-event

```text
NAME
    gcloud beta compute sole-tenancy node-groups simulate-maintenance-event -
        simulate maintenance of a Compute Engine node group

SYNOPSIS
    gcloud beta compute sole-tenancy node-groups simulate-maintenance-event
        NAME [--async] [--nodes=[NODE,...]] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-groups test-iam-permissions

```text
NAME
    gcloud beta compute sole-tenancy node-groups test-iam-permissions - test
        IAM permissions for a Compute Engine node group

SYNOPSIS
    gcloud beta compute sole-tenancy node-groups test-iam-permissions
        (NODE_GROUP : --zone=ZONE) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-groups update

```text
NAME
    gcloud beta compute sole-tenancy node-groups update - update a Compute
        Engine node group

SYNOPSIS
    gcloud beta compute sole-tenancy node-groups update NAME
        [--node-template=NODE_TEMPLATE] [--zone=ZONE]
        [--add-nodes=ADD_NODES | --delete-nodes=[NODE,...]]
        [--autoscaler-mode=AUTOSCALER_MODE
          --max-nodes=MAX_NODES --min-nodes=MIN_NODES]
        [--share-setting=SHARE_SETTING : --share-with=PROJECT,[PROJECT,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-groups add-iam-policy-binding

```text
NAME
    gcloud alpha compute sole-tenancy node-groups add-iam-policy-binding - add
        IAM policy binding to a Compute Engine node group

SYNOPSIS
    gcloud alpha compute sole-tenancy node-groups add-iam-policy-binding
        (NODE_GROUP : --zone=ZONE) --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-groups create

```text
NAME
    gcloud alpha compute sole-tenancy node-groups create - create a Compute
        Engine node group

SYNOPSIS
    gcloud alpha compute sole-tenancy node-groups create NAME
        --node-template=NODE_TEMPLATE --target-size=TARGET_SIZE
        [--description=DESCRIPTION]
        [--maintenance-interval=MAINTENANCE_INTERVAL]
        [--maintenance-policy=MAINTENANCE_POLICY]
        [--maintenance-window-start-time=START_TIME] [--zone=ZONE]
        [--autoscaler-mode=AUTOSCALER_MODE
          : --max-nodes=MAX_NODES --min-nodes=MIN_NODES]
        [--share-setting=SHARE_SETTING : --share-with=PROJECT,[PROJECT,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-groups delete

```text
NAME
    gcloud alpha compute sole-tenancy node-groups delete - delete a Compute
        Engine node group

SYNOPSIS
    gcloud alpha compute sole-tenancy node-groups delete NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-groups describe

```text
NAME
    gcloud alpha compute sole-tenancy node-groups describe - describe a Compute
        Engine node group

SYNOPSIS
    gcloud alpha compute sole-tenancy node-groups describe NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-groups get-iam-policy

```text
NAME
    gcloud alpha compute sole-tenancy node-groups get-iam-policy - get the IAM
        policy for a Compute Engine node group

SYNOPSIS
    gcloud alpha compute sole-tenancy node-groups get-iam-policy
        (NODE_GROUP : --zone=ZONE) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-groups list

```text
NAME
    gcloud alpha compute sole-tenancy node-groups list - list Google Compute
        Engine node groups

SYNOPSIS
    gcloud alpha compute sole-tenancy node-groups list [--share-settings]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-groups list-nodes

```text
NAME
    gcloud alpha compute sole-tenancy node-groups list-nodes - list Compute
        Engine sole-tenant nodes present in a nodegroup

SYNOPSIS
    gcloud alpha compute sole-tenancy node-groups list-nodes NAME [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-groups perform-maintenance

```text
NAME
    gcloud alpha compute sole-tenancy node-groups perform-maintenance - perform
        maintenance on nodes in a Compute Engine node group

SYNOPSIS
    gcloud alpha compute sole-tenancy node-groups perform-maintenance NAME
        --nodes=NODE,[NODE,...] [--start-time=START_TIME] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-groups remove-iam-policy-binding

```text
NAME
    gcloud alpha compute sole-tenancy node-groups remove-iam-policy-binding -
        remove IAM policy binding from a Compute Engine node group

SYNOPSIS
    gcloud alpha compute sole-tenancy node-groups remove-iam-policy-binding
        (NODE_GROUP : --zone=ZONE) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-groups set-iam-policy

```text
NAME
    gcloud alpha compute sole-tenancy node-groups set-iam-policy - set the IAM
        policy for a Compute Engine node group

SYNOPSIS
    gcloud alpha compute sole-tenancy node-groups set-iam-policy
        (NODE_GROUP : --zone=ZONE) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-groups simulate-maintenance-event

```text
NAME
    gcloud alpha compute sole-tenancy node-groups simulate-maintenance-event -
        simulate maintenance of a Compute Engine node group

SYNOPSIS
    gcloud alpha compute sole-tenancy node-groups simulate-maintenance-event
        NAME [--async] [--nodes=[NODE,...]] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-groups test-iam-permissions

```text
NAME
    gcloud alpha compute sole-tenancy node-groups test-iam-permissions - test
        IAM permissions for a Compute Engine node group

SYNOPSIS
    gcloud alpha compute sole-tenancy node-groups test-iam-permissions
        (NODE_GROUP : --zone=ZONE) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-groups update

```text
NAME
    gcloud alpha compute sole-tenancy node-groups update - update a Compute
        Engine node group

SYNOPSIS
    gcloud alpha compute sole-tenancy node-groups update NAME
        [--node-template=NODE_TEMPLATE] [--zone=ZONE]
        [--add-nodes=ADD_NODES | --delete-nodes=[NODE,...]]
        [--autoscaler-mode=AUTOSCALER_MODE
          --max-nodes=MAX_NODES --min-nodes=MIN_NODES]
        [--share-setting=SHARE_SETTING : --share-with=PROJECT,[PROJECT,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/sole-tenancy/node-groups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
