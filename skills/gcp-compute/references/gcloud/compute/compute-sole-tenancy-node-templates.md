---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/sole-tenancy/node-templates
---

# gcloud compute sole-tenancy node-templates

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute sole-tenancy node-templates add-iam-policy-binding

```text
NAME
    gcloud compute sole-tenancy node-templates add-iam-policy-binding - add IAM
        policy binding to a Compute Engine node template

SYNOPSIS
    gcloud compute sole-tenancy node-templates add-iam-policy-binding
        (NODE_TEMPLATE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to a Compute Engine node template.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/compute.admin' for the
    user 'test-user@gmail.com' with node template 'my-node-template' and region
    'REGION', run:

        $ gcloud compute sole-tenancy node-templates \
            add-iam-policy-binding my-node-template --region=REGION \
            --member='user:test-user@gmail.com' --role='roles/compute.admin'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Node template resource - The node template for which to add IAM policy
     binding to. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument node_template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_TEMPLATE
          ID of the node_template or fully qualified identifier for the
          node_template.

          To set the node_template attribute:
          + provide the argument node_template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument node_template on the command line with a
            fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

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

        $ gcloud alpha compute sole-tenancy node-templates \
            add-iam-policy-binding

        $ gcloud beta compute sole-tenancy node-templates \
            add-iam-policy-binding
```

### gcloud compute sole-tenancy node-templates create

```text
NAME
    gcloud compute sole-tenancy node-templates create - create a Compute Engine
        node template

SYNOPSIS
    gcloud compute sole-tenancy node-templates create NAME
        (--node-requirements=[localSSD=LOCALSSD],[memory=MEMORY],[vCPU=VCPU]
          | --node-type=NODE_TYPE) [--accelerator=[count=COUNT],[type=TYPE]]
        [--cpu-overcommit-type=CPU_OVERCOMMIT_TYPE] [--description=DESCRIPTION]
        [--disk=[count=COUNT],[size=SIZE],[type=TYPE]]
        [--node-affinity-labels=[KEY=VALUE,...]] [--region=REGION]
        [--server-binding=SERVER_BINDING; default="restart-node-on-any-server"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Compute Engine node template.

EXAMPLES
    To create a node template of type n1-node-96-624, run:

        $ gcloud compute sole-tenancy node-templates create \
            my-node-template --node-type=n1-node-96-624

POSITIONAL ARGUMENTS
     NAME
        Name of the node templates to operate on.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --node-requirements=[localSSD=LOCALSSD],[memory=MEMORY],[vCPU=VCPU]
          The requirements for nodes. Google Compute Engine will automatically
          choose a node type that fits the requirements on Node Group creation.
          If multiple node types match your defined criteria, the NodeType with
          the least amount of each resource will be selected. You can specify
          'any' to indicate any non-zero value for a certain resource.

          The following keys are allowed:

           vCPU
              The number of committed cores available to the node.

           memory
              The amount of memory available to the node. This value should
              include unit (eg. 3072MB or 9GB). If no units are specified, MB
              is assumed.

           localSSD
              Optional. The amount of SSD space available on the node. This
              value should include unit (eg. 3072MB or 9GB). If no units are
              specified, GB is assumed. If this key is not specified, local SSD
              is unconstrained.

       --node-type=NODE_TYPE
          The node type to use for nodes in node groups using this template.
          The type of a node determines what resources are available to
          instances running on the node.

          See the following for more information:

              $ gcloud compute sole-tenancy node-types list

OPTIONAL FLAGS
     --accelerator=[count=COUNT],[type=TYPE]
        Attaches accelerators (e.g. GPUs) to the node template.

         type
            The specific type (e.g. nvidia-tesla-k80 for nVidia Tesla K80) of
            accelerator to attach to the node template. Use 'gcloud compute
            accelerator-types list' to learn about all available accelerator
            types.

         count
            Number of accelerators to attach to each node template. The default
            value is 1.

     --cpu-overcommit-type=CPU_OVERCOMMIT_TYPE
        CPU overcommit type for nodes created based on this template. To
        overcommit CPUs on a VM, set --cpu-overcommit-type equal to either
        standard or none, and then when creating a VM, specify a value for the
        --min-node-cpu flag. Lower values for --min-node-cpu specify a higher
        overcommit ratio, that is, proportionally more vCPUs in relation to
        physical CPUs. You can only overcommit CPUs on VMs that are scheduled
        on nodes that support it. CPU_OVERCOMMIT_TYPE must be one of: enabled,
        none.

     --description=DESCRIPTION
        An optional description of this resource.

     --disk=[count=COUNT],[size=SIZE],[type=TYPE]
        Option to specify disk properties. It is mutually exclusive with
        '--node-requirements=[localSSD=LOCALSSD]' but
        '--node-requirements=[memory=MEMORY],[vCPU=VCPU],any' are still
        available.

         type
            Specifies the desired disk type on the node. This disk type must be
            a local storage type. This should be the name of the disk type.
            Currently only local-ssd is allowed.

         size
            The size of the disk in GiB.

         count
            Specifies the number of such disks. Set to 16 or 24.

     --node-affinity-labels=[KEY=VALUE,...]
        Labels to use for node affinity, which will be used in instance
        scheduling. This corresponds to the --node-affinity flag on compute
        instances create and compute instance-templates create.

     --region=REGION
        Region of the node templates to operate on. If not specified, you might
        be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

     --server-binding=SERVER_BINDING; default="restart-node-on-any-server"
        The server binding policy for nodes using this template, which
        determines where the nodes should restart following a maintenance
        event. SERVER_BINDING must be one of:

         restart-node-on-any-server
            Nodes using this template will restart on any physical server
            following a maintenance event.
         restart-node-on-minimal-servers
            Nodes using this template will restart on the same physical server
            following a maintenance event, instead of being live migrated to or
            restarted on a new physical server. This means that VMs on such
            nodes will experience outages while maintenance is applied. This
            option may be useful if you are using software licenses tied to the
            underlying server characteristics such as physical sockets or
            cores, to avoid the need for additional licenses when maintenance
            occurs.

            Note that in some cases, Google Compute Engine may need to move
            your VMs to a new underlying server. During these situations your
            VMs will be restarted on a new physical server and assigned a new
            sole tenant physical server ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-templates create

        $ gcloud beta compute sole-tenancy node-templates create
```

### gcloud compute sole-tenancy node-templates delete

```text
NAME
    gcloud compute sole-tenancy node-templates delete - delete a Compute Engine
        node template

SYNOPSIS
    gcloud compute sole-tenancy node-templates delete NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Compute Engine node template.

EXAMPLES
    To delete a node template, run:

        $ gcloud compute sole-tenancy node-templates delete my-node-template

POSITIONAL ARGUMENTS
     NAME
        Name of the node templates to operate on.

FLAGS
     --region=REGION
        Region of the node templates to operate on. If not specified, you might
        be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-templates delete

        $ gcloud beta compute sole-tenancy node-templates delete
```

### gcloud compute sole-tenancy node-templates describe

```text
NAME
    gcloud compute sole-tenancy node-templates describe - describe a Compute
        Engine node template

SYNOPSIS
    gcloud compute sole-tenancy node-templates describe NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Compute Engine node template.

EXAMPLES
    To describe a node template, run:

        $ gcloud compute sole-tenancy node-templates describe \
            my-node-template

POSITIONAL ARGUMENTS
     NAME
        Name of the node templates to operate on.

FLAGS
     --region=REGION
        Region of the node templates to operate on. If not specified, you might
        be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-templates describe

        $ gcloud beta compute sole-tenancy node-templates describe
```

### gcloud compute sole-tenancy node-templates get-iam-policy

```text
NAME
    gcloud compute sole-tenancy node-templates get-iam-policy - get the IAM
        Policy for a Compute Engine node template

SYNOPSIS
    gcloud compute sole-tenancy node-templates get-iam-policy
        (NODE_TEMPLATE : --region=REGION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute sole-tenancy node-templates get-iam-policy displays the IAM
    policy associated with a Compute Engine node template. If formatted as
    JSON, the output can be edited and used as a policy file for
    set-iam-policy. The output includes an "etag" field identifying the version
    emitted and allowing detection of concurrent policy updates; see $ {parent}
    set-iam-policy for additional details.

EXAMPLES
    To print the IAM policy for a given node template, run:

        $ gcloud compute sole-tenancy node-templates get-iam-policy \
            my-node-template --region=REGION

POSITIONAL ARGUMENTS
     Node template resource - The node template for which to display the IAM
     policy. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument node_template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_TEMPLATE
          ID of the node_template or fully qualified identifier for the
          node_template.

          To set the node_template attribute:
          + provide the argument node_template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument node_template on the command line with a
            fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

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

        $ gcloud alpha compute sole-tenancy node-templates get-iam-policy

        $ gcloud beta compute sole-tenancy node-templates get-iam-policy
```

### gcloud compute sole-tenancy node-templates list

```text
NAME
    gcloud compute sole-tenancy node-templates list - list Google Compute
        Engine node templates

SYNOPSIS
    gcloud compute sole-tenancy node-templates list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute sole-tenancy node-templates list displays all Google Compute
    Engine node templates in a project.

    By default, node templates from all regions are listed. The results can be
    narrowed down using a filter: --filter="region:( REGION ... )".

EXAMPLES
    To list all node templates in a project in table form, run:

        $ gcloud compute sole-tenancy node-templates list

    To list the URIs of all node templates in a project, run:

        $ gcloud compute sole-tenancy node-templates list --uri

    To list all node templates in the us-central1 and europe-west1 regions,
    run:

        $ gcloud compute sole-tenancy node-templates list \
            --filter="region:( us-central1 europe-west1 )"

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

        $ gcloud alpha compute sole-tenancy node-templates list

        $ gcloud beta compute sole-tenancy node-templates list
```

### gcloud compute sole-tenancy node-templates remove-iam-policy-binding

```text
NAME
    gcloud compute sole-tenancy node-templates remove-iam-policy-binding -
        remove IAM policy binding from a Compute Engine node template

SYNOPSIS
    gcloud compute sole-tenancy node-templates remove-iam-policy-binding
        (NODE_TEMPLATE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding from a Compute Engine node template.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/compute.admin' for
    the user 'test-user@gmail.com' with node template 'my-node-template' and
    region 'REGION', run:

        $ gcloud compute sole-tenancy node-templates \
            remove-iam-policy-binding my-node-template --region=REGION \
            --member='user:test-user@gmail.com' --role='roles/compute.admin'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Node template resource - The node template for which to remove IAM policy
     binding from. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument node_template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_TEMPLATE
          ID of the node_template or fully qualified identifier for the
          node_template.

          To set the node_template attribute:
          + provide the argument node_template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument node_template on the command line with a
            fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

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

        $ gcloud alpha compute sole-tenancy node-templates \
            remove-iam-policy-binding

        $ gcloud beta compute sole-tenancy node-templates \
            remove-iam-policy-binding
```

### gcloud compute sole-tenancy node-templates set-iam-policy

```text
NAME
    gcloud compute sole-tenancy node-templates set-iam-policy - set the IAM
        policy for a Compute Engine node template

SYNOPSIS
    gcloud compute sole-tenancy node-templates set-iam-policy
        (NODE_TEMPLATE : --region=REGION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given node template as defined in a JSON or
    YAML file.

EXAMPLES
    The following command will read am IAM policy defined in a JSON file
    'policy.json' and set it for the node template my-node-template:

        $ gcloud compute sole-tenancy node-templates set-iam-policy \
            my-node-template --region=REGION policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Node template resource - The node template to set the IAM policy for. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument node_template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_TEMPLATE
          ID of the node_template or fully qualified identifier for the
          node_template.

          To set the node_template attribute:
          + provide the argument node_template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument node_template on the command line with a
            fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

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

        $ gcloud alpha compute sole-tenancy node-templates set-iam-policy

        $ gcloud beta compute sole-tenancy node-templates set-iam-policy
```

### gcloud compute sole-tenancy node-templates test-iam-permissions

```text
NAME
    gcloud compute sole-tenancy node-templates test-iam-permissions - test IAM
        permissions for a Compute Engine sole-tenancy node template

SYNOPSIS
    gcloud compute sole-tenancy node-templates test-iam-permissions
        (NODE_TEMPLATE : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns permissions that a caller has on the specified node template.

EXAMPLES
    To test if the caller has 'compute.nodeTemplates.get' permission on a node
    template, run:

        $ gcloud compute sole-tenancy node-templates test-iam-permissions \
            my-node-template --region=REGION \
            --permissions=compute.nodeTemplates.get

POSITIONAL ARGUMENTS
     Node template resource - The node template for which to test permissions.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument node_template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_TEMPLATE
          ID of the node_template or fully qualified identifier for the
          node_template.

          To set the node_template attribute:
          + provide the argument node_template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument node_template on the command line with a
            fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

REQUIRED FLAGS
     --permissions=[PERMISSIONS,...]
        Permissions to be tested.

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

        $ gcloud alpha compute sole-tenancy node-templates \
            test-iam-permissions

        $ gcloud beta compute sole-tenancy node-templates \
            test-iam-permissions
```

### gcloud beta compute sole-tenancy node-templates add-iam-policy-binding

```text
NAME
    gcloud beta compute sole-tenancy node-templates add-iam-policy-binding -
        add IAM policy binding to a Compute Engine node template

SYNOPSIS
    gcloud beta compute sole-tenancy node-templates add-iam-policy-binding
        (NODE_TEMPLATE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-templates create

```text
NAME
    gcloud beta compute sole-tenancy node-templates create - create a Compute
        Engine node template

SYNOPSIS
    gcloud beta compute sole-tenancy node-templates create NAME
        (--node-requirements=[localSSD=LOCALSSD],[memory=MEMORY],[vCPU=VCPU]
          | --node-type=NODE_TYPE) [--accelerator=[count=COUNT],[type=TYPE]]
        [--cpu-overcommit-type=CPU_OVERCOMMIT_TYPE] [--description=DESCRIPTION]
        [--disk=[count=COUNT],[size=SIZE],[type=TYPE]]
        [--node-affinity-labels=[KEY=VALUE,...]] [--region=REGION]
        [--server-binding=SERVER_BINDING; default="restart-node-on-any-server"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-templates delete

```text
NAME
    gcloud beta compute sole-tenancy node-templates delete - delete a Compute
        Engine node template

SYNOPSIS
    gcloud beta compute sole-tenancy node-templates delete NAME
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-templates describe

```text
NAME
    gcloud beta compute sole-tenancy node-templates describe - describe a
        Compute Engine node template

SYNOPSIS
    gcloud beta compute sole-tenancy node-templates describe NAME
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-templates get-iam-policy

```text
NAME
    gcloud beta compute sole-tenancy node-templates get-iam-policy - get the
        IAM Policy for a Compute Engine node template

SYNOPSIS
    gcloud beta compute sole-tenancy node-templates get-iam-policy
        (NODE_TEMPLATE : --region=REGION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-templates list

```text
NAME
    gcloud beta compute sole-tenancy node-templates list - list Google Compute
        Engine node templates

SYNOPSIS
    gcloud beta compute sole-tenancy node-templates list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-templates remove-iam-policy-binding

```text
NAME
    gcloud beta compute sole-tenancy node-templates remove-iam-policy-binding -
        remove IAM policy binding from a Compute Engine node template

SYNOPSIS
    gcloud beta compute sole-tenancy node-templates remove-iam-policy-binding
        (NODE_TEMPLATE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-templates set-iam-policy

```text
NAME
    gcloud beta compute sole-tenancy node-templates set-iam-policy - set the
        IAM policy for a Compute Engine node template

SYNOPSIS
    gcloud beta compute sole-tenancy node-templates set-iam-policy
        (NODE_TEMPLATE : --region=REGION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-templates test-iam-permissions

```text
NAME
    gcloud beta compute sole-tenancy node-templates test-iam-permissions - test
        IAM permissions for a Compute Engine sole-tenancy node template

SYNOPSIS
    gcloud beta compute sole-tenancy node-templates test-iam-permissions
        (NODE_TEMPLATE : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-templates add-iam-policy-binding

```text
NAME
    gcloud alpha compute sole-tenancy node-templates add-iam-policy-binding -
        add IAM policy binding to a Compute Engine node template

SYNOPSIS
    gcloud alpha compute sole-tenancy node-templates add-iam-policy-binding
        (NODE_TEMPLATE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-templates create

```text
NAME
    gcloud alpha compute sole-tenancy node-templates create - create a Compute
        Engine node template

SYNOPSIS
    gcloud alpha compute sole-tenancy node-templates create NAME
        (--node-requirements=[localSSD=LOCALSSD],[memory=MEMORY],[vCPU=VCPU]
          | --node-type=NODE_TYPE) [--accelerator=[count=COUNT],[type=TYPE]]
        [--cpu-overcommit-type=CPU_OVERCOMMIT_TYPE] [--description=DESCRIPTION]
        [--disk=[count=COUNT],[size=SIZE],[type=TYPE]]
        [--node-affinity-labels=[KEY=VALUE,...]] [--region=REGION]
        [--server-binding=SERVER_BINDING; default="restart-node-on-any-server"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-templates delete

```text
NAME
    gcloud alpha compute sole-tenancy node-templates delete - delete a Compute
        Engine node template

SYNOPSIS
    gcloud alpha compute sole-tenancy node-templates delete NAME
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-templates describe

```text
NAME
    gcloud alpha compute sole-tenancy node-templates describe - describe a
        Compute Engine node template

SYNOPSIS
    gcloud alpha compute sole-tenancy node-templates describe NAME
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-templates get-iam-policy

```text
NAME
    gcloud alpha compute sole-tenancy node-templates get-iam-policy - get the
        IAM Policy for a Compute Engine node template

SYNOPSIS
    gcloud alpha compute sole-tenancy node-templates get-iam-policy
        (NODE_TEMPLATE : --region=REGION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-templates list

```text
NAME
    gcloud alpha compute sole-tenancy node-templates list - list Google Compute
        Engine node templates

SYNOPSIS
    gcloud alpha compute sole-tenancy node-templates list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-templates remove-iam-policy-binding

```text
NAME
    gcloud alpha compute sole-tenancy node-templates remove-iam-policy-binding
        - remove IAM policy binding from a Compute Engine node template

SYNOPSIS
    gcloud alpha compute sole-tenancy node-templates remove-iam-policy-binding
        (NODE_TEMPLATE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-templates set-iam-policy

```text
NAME
    gcloud alpha compute sole-tenancy node-templates set-iam-policy - set the
        IAM policy for a Compute Engine node template

SYNOPSIS
    gcloud alpha compute sole-tenancy node-templates set-iam-policy
        (NODE_TEMPLATE : --region=REGION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-templates test-iam-permissions

```text
NAME
    gcloud alpha compute sole-tenancy node-templates test-iam-permissions -
        test IAM permissions for a Compute Engine sole-tenancy node template

SYNOPSIS
    gcloud alpha compute sole-tenancy node-templates test-iam-permissions
        (NODE_TEMPLATE : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/sole-tenancy/node-templates (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
