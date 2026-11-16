---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/azure/clusters
---

# gcloud container azure clusters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container azure clusters create

```text
NAME
    gcloud container azure clusters create - create an Anthos cluster on Azure

SYNOPSIS
    gcloud container azure clusters create (CLUSTER : --location=LOCATION)
        --azure-region=AZURE_REGION --cluster-version=CLUSTER_VERSION
        --fleet-project=FLEET_PROJECT
        --pod-address-cidr-blocks=POD_ADDRESS_CIDR_BLOCKS
        --resource-group-id=RESOURCE_GROUP_ID
        --service-address-cidr-blocks=SERVICE_ADDRESS_CIDR_BLOCKS
        --ssh-public-key=SSH_PUBLIC_KEY --vnet-id=VNET_ID
        (--client=CLIENT | --azure-application-id=AZURE_APPLICATION_ID
          --azure-tenant-id=AZURE_TENANT_ID) [--admin-groups=[GROUP,...]]
        [--admin-users=USER,[USER,...]]
        [--annotations=ANNOTATION,[ANNOTATION,...]] [--async]
        [--config-encryption-key-id=CONFIG_ENCRYPTION_KEY_ID]
        [--config-encryption-public-key=CONFIG_ENCRYPTION_PUBLIC_KEY]
        [--database-encryption-key-id=DATABASE_ENCRYPTION_KEY_ID]
        [--description=DESCRIPTION] [--enable-managed-prometheus]
        [--endpoint-subnet-id=ENDPOINT_SUBNET_ID]
        [--logging=COMPONENT,[COMPONENT,...]]
        [--main-volume-size=MAIN_VOLUME_SIZE]
        [--replica-placements=[REPLICA_PLACEMENT,...]]
        [--root-volume-size=ROOT_VOLUME_SIZE]
        [--service-load-balancer-subnet-id=SERVICE_LOAD_BALANCER_SUBNET_ID]
        [--subnet-id=SUBNET_ID] [--tags=TAG,[TAG,...]] [--validate-only]
        [--vm-size=VM_SIZE]
        [--proxy-resource-group-id=PROXY_RESOURCE_GROUP_ID
          --proxy-secret-id=PROXY_SECRET_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Create an Anthos cluster on Azure.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To create a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container azure clusters create my-cluster \
            --location=us-west1 --azure-region=AZURE_REGION \
            --cluster-version=CLUSTER_VERSION --client=CLIENT \
            --pod-address-cidr-blocks=POD_ADDRESS_CIDR_BLOCKS \
            --resource-group-id=RESOURCE_GROUP_ID \
            --ssh-public-key=SSH_PUBLIC_KEY --subnet-id=SUBNET_ID \
            --vnet-id=VNET_ID

POSITIONAL ARGUMENTS
     Cluster resource - Azure cluster to create. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

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

       --location=LOCATION
          Google Cloud location for the cluster.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

REQUIRED FLAGS
     --azure-region=AZURE_REGION
        Azure location to deploy the cluster. Refer to your Azure subscription
        for available locations.

     --cluster-version=CLUSTER_VERSION
        Kubernetes version to use for the cluster.

     --fleet-project=FLEET_PROJECT
        ID or number of the Fleet host project where the cluster is registered.

     --pod-address-cidr-blocks=POD_ADDRESS_CIDR_BLOCKS
        IP address range for the pods in this cluster in CIDR notation (e.g.
        10.0.0.0/8).

     --resource-group-id=RESOURCE_GROUP_ID
        ID of the Azure Resource Group to associate the cluster with.

     --service-address-cidr-blocks=SERVICE_ADDRESS_CIDR_BLOCKS
        IP address range for the services IPs in CIDR notation (e.g.
        10.0.0.0/8).

     --ssh-public-key=SSH_PUBLIC_KEY
        SSH public key to use for authentication.

     --vnet-id=VNET_ID
        ID of the Azure Virtual Network to associate with the cluster.

     Authentication configuration

     Exactly one of these must be specified:

       Client resource - Azure client to use for cluster creation. This
       represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --client on the command line with a fully
          specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --client on the command line with a fully
          specified name;
        + provide the argument --location on the command line;
        + set the property container_azure/location.

       --client=CLIENT
          ID of the client or fully qualified identifier for the client.

          To set the client attribute:
          + provide the argument --client on the command line.

       Azure services authentication

       --azure-application-id=AZURE_APPLICATION_ID
          ID of the Azure Application to manage Azure resources.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --azure-tenant-id=AZURE_TENANT_ID
          ID of the Azure Tenant to manage Azure resources.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

OPTIONAL FLAGS
     --admin-groups=[GROUP,...]
        Groups of users that can perform operations as a cluster administrator.

     --admin-users=USER,[USER,...]
        Users that can perform operations as a cluster administrator. If not
        specified, the value of property core/account is used.

     --annotations=ANNOTATION,[ANNOTATION,...]
        Annotations for the cluster.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --config-encryption-key-id=CONFIG_ENCRYPTION_KEY_ID
        URL the of the Azure Key Vault key (with its version) to use to encrypt
        / decrypt config data.

     --config-encryption-public-key=CONFIG_ENCRYPTION_PUBLIC_KEY
        RSA key of the Azure Key Vault public key to use for encrypting config
        data.

     --database-encryption-key-id=DATABASE_ENCRYPTION_KEY_ID
        URL the of the Azure Key Vault key (with its version) to use to encrypt
        / decrypt cluster secrets.

     --description=DESCRIPTION
        Description for the cluster.

     --enable-managed-prometheus
        Enables managed collection for Managed Service for Prometheus in the
        cluster.

        See
        https://cloud.google.com/stackdriver/docs/managed-prometheus/setup-managed#enable-mgdcoll-gke
        for more info.

        Managed Prometheus is enabled by default for cluster versions 1.27 or
        greater, use --no-enable-managed-prometheus to disable.

     --endpoint-subnet-id=ENDPOINT_SUBNET_ID
        ARM ID of the subnet where the control plane load balancer is deployed.
        When unspecified, it defaults to the control plane subnet ID.

     --logging=COMPONENT,[COMPONENT,...]
        Set the components that have logging enabled.

        Examples:

            $ gcloud container azure clusters create --logging=SYSTEM
            $ gcloud container azure clusters create --logging=SYSTEM,WORKLOAD

        COMPONENT must be one of: SYSTEM, WORKLOAD.

     --main-volume-size=MAIN_VOLUME_SIZE
        Size of the main volume. The value must be a whole number followed by a
        size unit of GB for gigabyte, or TB for terabyte. If no size unit is
        specified, GB is assumed.

     --replica-placements=[REPLICA_PLACEMENT,...]
        Placement info for the control plane replicas. Replica placement is of
        format subnetid:zone, for example subnetid12345:1

     --root-volume-size=ROOT_VOLUME_SIZE
        Size of the root volume. The value must be a whole number followed by a
        size unit of GB for gigabyte, or TB for terabyte. If no size unit is
        specified, GB is assumed.

     --service-load-balancer-subnet-id=SERVICE_LOAD_BALANCER_SUBNET_ID
        ARM ID of the subnet where Kubernetes private service type load
        balancers are deployed, when the Service lacks a subnet annotation.

     --subnet-id=SUBNET_ID
        Subnet ID of an existing VNET to use for the cluster control plane.

     --tags=TAG,[TAG,...]
        Applies the given tags (comma separated) on the cluster. Example:

            $ gcloud container azure clusters create EXAMPLE_CLUSTER \
                --tags=tag1=one,tag2=two

     --validate-only
        Validate the creation of the cluster, but don't actually perform it.

     --vm-size=VM_SIZE
        Azure Virtual Machine Size (e.g. Standard_DS1_v).

     Proxy config

     --proxy-resource-group-id=PROXY_RESOURCE_GROUP_ID
        The ARM ID the of the resource group containing proxy keyvault.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --proxy-secret-id=PROXY_SECRET_ID
        The URL the of the proxy setting secret with its version.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure clusters create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud container azure clusters create my-cluster \
    --location=us-west1 \
    --azure-region=AZURE_REGION \
    --cluster-version=CLUSTER_VERSION \
    --client=CLIENT \
    --pod-address-cidr-blocks=POD_ADDRESS_CIDR_BLOCKS \
    --resource-group-id=RESOURCE_GROUP_ID \
    --ssh-public-key=SSH_PUBLIC_KEY \
    --subnet-id=SUBNET_ID \
    --vnet-id=VNET_ID \
    --fleet-project=my-fleet-project \
    --service-address-cidr-blocks=SERVICE_ADDRESS_CIDR_BLOCKS
```

### gcloud container azure clusters delete

```text
NAME
    gcloud container azure clusters delete - delete an Anthos cluster on Azure

SYNOPSIS
    gcloud container azure clusters delete (CLUSTER : --location=LOCATION)
        [--allow-missing] [--async] [--ignore-errors] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Delete an Anthos cluster on Azure.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To delete a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container azure clusters delete my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Cluster resource - cluster to delete. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

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

       --location=LOCATION
          Google Cloud location for the cluster.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

FLAGS
     --allow-missing
        Allow idempotent deletion of cluster. The request will still succeed in
        case the cluster does not exist.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --ignore-errors
        Force delete an Azure cluster. Deletion of the Azure cluster will
        succeed even if errors occur during deleting in-cluster resources.
        Using this parameter may result in orphaned resources in the cluster.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure clusters delete
```

### gcloud container azure clusters describe

```text
NAME
    gcloud container azure clusters describe - describe an Anthos cluster on
        Azure

SYNOPSIS
    gcloud container azure clusters describe (CLUSTER : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Describe an Anthos cluster on Azure.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To describe a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container azure clusters describe my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Cluster resource - cluster to describe. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

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

       --location=LOCATION
          Google Cloud location for the cluster.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure clusters describe
```

### gcloud container azure clusters get-credentials

```text
NAME
    gcloud container azure clusters get-credentials - get credentials of an
        Anthos cluster on Azure

SYNOPSIS
    gcloud container azure clusters get-credentials
        (CLUSTER : --location=LOCATION) [--private-endpoint]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

    Fetch credentials for a running Anthos cluster on Azure.

    This command updates a kubeconfig file with appropriate credentials and
    endpoint information to point kubectl at a specific Anthos cluster on
    Azure.

    By default, credentials are written to HOME/.kube/config. You can provide
    an alternate path by setting the KUBECONFIG environment variable. If
    KUBECONFIG contains multiple paths, the first one is used.

    This command enables switching to a specific cluster, when working with
    multiple clusters. It can also be used to access a previously created
    cluster from a new workstation.

    By default, the command will configure kubectl to automatically refresh its
    credentials using the same identity as the gcloud command-line tool. If you
    are running kubectl as part of an application, it is recommended to use
    application default credentials
    (https://cloud.google.com/docs/authentication/production). To configure a
    kubeconfig file to use application default credentials, set the
    container/use_application_default_credentials Google Cloud CLI property
    (https://cloud.google.com/sdk/docs/properties) to true before running the
    command.

    See https://cloud.google.com/kubernetes-engine/docs/kubectl for kubectl
    documentation.

EXAMPLES
    To get credentials of a cluster named my-cluster managed in location
    us-west1, run:

        $ gcloud container azure clusters get-credentials my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Cluster resource - cluster to get credentials. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

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

       --location=LOCATION
          Google Cloud location for the cluster.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

FLAGS
     --private-endpoint
        If set, use private VPC for authentication.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure clusters get-credentials
```

### gcloud container azure clusters list

```text
NAME
    gcloud container azure clusters list - list Anthos clusters on Azure

SYNOPSIS
    gcloud container azure clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) List Anthos clusters on Azure.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To lists all clusters managed in location us-west1, run:

        $ gcloud container azure clusters list --location=us-west1

FLAGS
     Location resource - Google Cloud location to list Azure clusters. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property container_azure/location with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property container_azure/location.

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
    This variant is also available:

        $ gcloud alpha container azure clusters list
```

### gcloud container azure clusters update

```text
NAME
    gcloud container azure clusters update - update an Anthos cluster on Azure

SYNOPSIS
    gcloud container azure clusters update (CLUSTER : --location=LOCATION)
        [--admin-groups=[GROUP,...]] [--admin-users=USER,[USER,...]] [--async]
        [--cluster-version=CLUSTER_VERSION]
        [--logging=COMPONENT,[COMPONENT,...]] [--ssh-public-key=SSH_PUBLIC_KEY]
        [--validate-only] [--vm-size=VM_SIZE]
        [--annotations=ANNOTATION,[ANNOTATION,...] | --clear-annotations]
        [--clear-description | --description=DESCRIPTION]
        [--client=CLIENT | --azure-application-id=AZURE_APPLICATION_ID
          --azure-tenant-id=AZURE_TENANT_ID --clear-client]
        [--disable-managed-prometheus | --enable-managed-prometheus]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Update an Anthos cluster on Azure.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To update a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container azure clusters update my-cluster \
            --location=us-west1 --cluster-version=CLUSTER_VERSION \
            --client=CLIENT

POSITIONAL ARGUMENTS
     Cluster resource - Azure cluster to update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

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

       --location=LOCATION
          Google Cloud location for the cluster.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

FLAGS
     --admin-groups=[GROUP,...]
        Groups of users that can perform operations as a cluster administrator.

     --admin-users=USER,[USER,...]
        Users that can perform operations as a cluster administrator.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --cluster-version=CLUSTER_VERSION
        Kubernetes version to use for the cluster.

     --logging=COMPONENT,[COMPONENT,...]
        Set the components that have logging enabled.

        Examples:

            $ gcloud container azure clusters update --logging=SYSTEM
            $ gcloud container azure clusters update --logging=SYSTEM,WORKLOAD

        COMPONENT must be one of: SYSTEM, WORKLOAD.

     --ssh-public-key=SSH_PUBLIC_KEY
        SSH public key to use for authentication.

     --validate-only
        Validate the update of the cluster, but don't actually perform it.

     --vm-size=VM_SIZE
        Azure Virtual Machine Size (e.g. Standard_DS1_v).

     Annotations

     At most one of these can be specified:

       --annotations=ANNOTATION,[ANNOTATION,...]
          Annotations for the cluster.

       --clear-annotations
          Clear the annotations for the cluster.

     Description

     At most one of these can be specified:

       --clear-description
          Clear the description for the cluster.

       --description=DESCRIPTION
          Description for the cluster.

     Authentication configuration

     At most one of these can be specified:

       Client resource - Azure client to use for cluster update. This
       represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --client on the command line with a fully
          specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --client on the command line with a fully
          specified name;
        + provide the argument --location on the command line;
        + set the property container_azure/location.

       --client=CLIENT
          ID of the client or fully qualified identifier for the client.

          To set the client attribute:
          + provide the argument --client on the command line.

       Azure services authentication

       --azure-application-id=AZURE_APPLICATION_ID
          ID of the Azure Application to manage Azure resources.

       --azure-tenant-id=AZURE_TENANT_ID
          ID of the Azure Tenant to manage Azure resources.

       --clear-client
          Clear the Azure client. This flag is required when updating to use
          Azure workload identity federation from Azure client to manage Azure
          resources.

     Monitoring Config

     At most one of these can be specified:

       --disable-managed-prometheus
          Disable managed collection for Managed Service for Prometheus.

       --enable-managed-prometheus
          Enable managed collection for Managed Service for Prometheus.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure clusters update
```

### gcloud alpha container azure clusters create

```text
NAME
    gcloud alpha container azure clusters create - create an Anthos cluster on
        Azure

SYNOPSIS
    gcloud alpha container azure clusters create
        (CLUSTER : --location=LOCATION) --azure-region=AZURE_REGION
        --cluster-version=CLUSTER_VERSION --fleet-project=FLEET_PROJECT
        --pod-address-cidr-blocks=POD_ADDRESS_CIDR_BLOCKS
        --resource-group-id=RESOURCE_GROUP_ID
        --service-address-cidr-blocks=SERVICE_ADDRESS_CIDR_BLOCKS
        --ssh-public-key=SSH_PUBLIC_KEY --vnet-id=VNET_ID
        (--client=CLIENT | --azure-application-id=AZURE_APPLICATION_ID
          --azure-tenant-id=AZURE_TENANT_ID) [--admin-groups=[GROUP,...]]
        [--admin-users=USER,[USER,...]]
        [--annotations=ANNOTATION,[ANNOTATION,...]] [--async]
        [--config-encryption-key-id=CONFIG_ENCRYPTION_KEY_ID]
        [--config-encryption-public-key=CONFIG_ENCRYPTION_PUBLIC_KEY]
        [--database-encryption-key-id=DATABASE_ENCRYPTION_KEY_ID]
        [--description=DESCRIPTION] [--enable-managed-prometheus]
        [--endpoint-subnet-id=ENDPOINT_SUBNET_ID]
        [--logging=COMPONENT,[COMPONENT,...]]
        [--main-volume-size=MAIN_VOLUME_SIZE]
        [--replica-placements=[REPLICA_PLACEMENT,...]]
        [--root-volume-size=ROOT_VOLUME_SIZE]
        [--service-load-balancer-subnet-id=SERVICE_LOAD_BALANCER_SUBNET_ID]
        [--subnet-id=SUBNET_ID] [--tags=TAG,[TAG,...]] [--validate-only]
        [--vm-size=VM_SIZE]
        [--proxy-resource-group-id=PROXY_RESOURCE_GROUP_ID
          --proxy-secret-id=PROXY_SECRET_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure clusters delete

```text
NAME
    gcloud alpha container azure clusters delete - delete an Anthos cluster on
        Azure

SYNOPSIS
    gcloud alpha container azure clusters delete
        (CLUSTER : --location=LOCATION) [--allow-missing] [--async]
        [--ignore-errors] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure clusters describe

```text
NAME
    gcloud alpha container azure clusters describe - describe an Anthos cluster
        on Azure

SYNOPSIS
    gcloud alpha container azure clusters describe
        (CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure clusters get-credentials

```text
NAME
    gcloud alpha container azure clusters get-credentials - get credentials of
        an Anthos cluster on Azure

SYNOPSIS
    gcloud alpha container azure clusters get-credentials
        (CLUSTER : --location=LOCATION) [--private-endpoint]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure clusters list

```text
NAME
    gcloud alpha container azure clusters list - list Anthos clusters on Azure

SYNOPSIS
    gcloud alpha container azure clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure clusters update

```text
NAME
    gcloud alpha container azure clusters update - update an Anthos cluster on
        Azure

SYNOPSIS
    gcloud alpha container azure clusters update
        (CLUSTER : --location=LOCATION) [--admin-groups=[GROUP,...]]
        [--admin-users=USER,[USER,...]] [--async]
        [--cluster-version=CLUSTER_VERSION]
        [--logging=COMPONENT,[COMPONENT,...]] [--ssh-public-key=SSH_PUBLIC_KEY]
        [--validate-only] [--vm-size=VM_SIZE]
        [--annotations=ANNOTATION,[ANNOTATION,...] | --clear-annotations]
        [--clear-description | --description=DESCRIPTION]
        [--client=CLIENT | --azure-application-id=AZURE_APPLICATION_ID
          --azure-tenant-id=AZURE_TENANT_ID --clear-client]
        [--disable-managed-prometheus | --enable-managed-prometheus]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud container azure clusters create`: "Create an Anthos cluster on Azure. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure clusters delete`: "Delete an Anthos cluster on Azure. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure clusters describe`: "Describe an Anthos cluster on Azure. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure clusters get-credentials`: "This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure clusters list`: "List Anthos clusters on Azure. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure clusters update`: "Update an Anthos cluster on Azure. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example omits `--fleet-project` and `--service-address-cidr-blocks`, which the SYNOPSIS requires (gcloud 593.0.0: "Must be specified"); the runnable form adds `--fleet-project=my-fleet-project` (gcloud validates the project ID, so the sample uses a lower-case project ID instead of an upper-case placeholder) and `--service-address-cidr-blocks=SERVICE_ADDRESS_CIDR_BLOCKS`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/azure/clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
