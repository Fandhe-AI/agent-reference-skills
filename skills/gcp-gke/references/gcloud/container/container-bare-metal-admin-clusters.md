---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/bare-metal/admin-clusters
---

# gcloud container bare-metal admin-clusters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container bare-metal admin-clusters create

```text
NAME
    gcloud container bare-metal admin-clusters create - create an Anthos on
        bare metal admin cluster

SYNOPSIS
    gcloud container bare-metal admin-clusters create
        (ADMIN_CLUSTER : --location=LOCATION) --version=VERSION
        (--control-plane-load-balancer-port=CONTROL_PLANE_LOAD_BALANCER_PORT
          --control-plane-vip=CONTROL_PLANE_VIP : --enable-manual-lb)
        ((((--control-plane-node-configs=[labels=LABELS],[node-ip=NODE-IP]
          : --control-plane-node-labels=[KEY=VALUE,...]
          --control-plane-node-taints=[KEY=VALUE:EFFECT,...])))
          : --api-server-args=[KEY=VALUE,...])
        (--island-mode-pod-address-cidr-blocks=POD_ADDRESS,[POD_ADDRESS,...]
          --island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...])
        ((--lvp-node-mounts-config-path=LVP_NODE_MOUNTS_CONFIG_PATH
          --lvp-node-mounts-config-storage-class=LVP_NODE_MOUNTS_CONFIG_STORAGE_CLASS) ((--lvp-share-path=LVP_SHARE_PATH --lvp-share-storage-class=LVP_SHARE_STORAGE_CLASS) : --shared-path-pv-count=SHARED_PATH_PV_COUNT))
        [--admin-users=ADMIN_USERS] [--annotations=[KEY=VALUE,...]] [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--enable-application-logs]
        [--login-user=LOGIN_USER]
        [--maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,
          ...]] [--max-pods-per-node=MAX_PODS_PER_NODE] [--validate-only]
        [--uri=URI : --no-proxy=[NO_PROXY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an Anthos on bare metal admin cluster.

EXAMPLES
    To create a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container bare-metal admin-clusters create my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Admin cluster resource - admin cluster to create The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument admin_cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADMIN_CLUSTER
          ID of the admin_cluster or fully qualified identifier for the
          admin_cluster.

          To set the admin_cluster attribute:
          + provide the argument admin_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the admin_cluster.

          To set the location attribute:
          + provide the argument admin_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property container_bare_metal/location.

REQUIRED FLAGS
     --version=VERSION
        Anthos cluster on bare metal version for the admin cluster resource.

     Anthos on bare metal admin cluster load balancer configuration.

     This must be specified.

       Control plane load balancer port configuration.

       This must be specified.

         --control-plane-load-balancer-port=CONTROL_PLANE_LOAD_BALANCER_PORT
            Control plane load balancer port configuration.

       VIPs used by the load balancer.

       This must be specified.

         --control-plane-vip=CONTROL_PLANE_VIP
            VIP for the Kubernetes API of this cluster.

       Manual load balancer configuration.

       --enable-manual-lb
          ManualLB typed load balancers configuration.

     Anthos on bare metal cluster control plane configuration.

     At least one of these must be specified:

       --api-server-args=[KEY=VALUE,...]
          API Server argument configuration.

       Anthos on bare metal cluster control plane node pool configuration.

       This must be specified.

         Anthos on bare metal node pool configuration for control plane nodes.

         This must be specified.

           Anthos on bare metal node configuration for control plane nodes.

           This must be specified.

             Populate control plane node config.

             Exactly one of these must be specified:

               --control-plane-node-configs=[labels=LABELS],[node-ip=NODE-IP]
                  Control plane node configuration.

             --control-plane-node-labels=[KEY=VALUE,...]
                Labels assigned to nodes of a node pool.

             --control-plane-node-taints=[KEY=VALUE:EFFECT,...]
                Node taint applied to every Kubernetes node in a node pool.

     Populate one of the network configs.

     This must be specified.

       Island mode CIDR network configuration.

       --island-mode-pod-address-cidr-blocks=POD_ADDRESS,[POD_ADDRESS,...]
          IPv4 address range for all pods in the cluster.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...]
          IPv4 address range for all services in the cluster.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

     Anthos on bare metal cluster storage configuration.

     This must be specified.

       LVP node mounts class and path used by the storage.

       This must be specified.

         --lvp-node-mounts-config-path=LVP_NODE_MOUNTS_CONFIG_PATH
            Path for the LVP node mounts class.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --lvp-node-mounts-config-storage-class=LVP_NODE_MOUNTS_CONFIG_STORAGE_CLASS
            Storage class for LVP node mounts.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

       LVP share configuration.

       At least one of these must be specified:

         --shared-path-pv-count=SHARED_PATH_PV_COUNT
            Number of subdirectories to create under path.

         LVP share class and path used by the storage.

         This must be specified.

           --lvp-share-path=LVP_SHARE_PATH
              Path for the LVP share class.

              This flag argument must be specified if any of the other
              arguments in this group are specified.

           --lvp-share-storage-class=LVP_SHARE_STORAGE_CLASS
              Storage class for LVP share.

              This flag argument must be specified if any of the other
              arguments in this group are specified.

OPTIONAL FLAGS
     Anthos on bare metal admin cluster security configuration.

     Admin cluster authorization configurations

     --admin-users=ADMIN_USERS
        Users that will be granted the view role on the admin cluster,
        providing view only access to the cluster.

     --annotations=[KEY=VALUE,...]
        Annotations on the Anthos on bare metal resource.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE
        Set Binary Authorization evaluation mode for this cluster.
        BINAUTHZ_EVALUATION_MODE must be one of: DISABLED,
        PROJECT_SINGLETON_POLICY_ENFORCE.

     --description=DESCRIPTION
        Description for the resource.

     Anthos on bare metal cluster operations configuration.

     --enable-application-logs
        Whether collection of application logs/metrics should be enabled (in
        addition to system logs/metrics).

     Anthos on bare metal node access related settings for the admin cluster.

     --login-user=LOGIN_USER
        User name used to access node machines.

     Anthos on bare metal cluster maintenance configuration.

     --maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,...]
        IPv4 addresses to be placed into maintenance mode.

     Anthos on bare metal admin cluster workload node configuration.

     --max-pods-per-node=MAX_PODS_PER_NODE
        Maximum number of pods a node can run.

     --validate-only
        If set, only validate the request, but do not actually perform the
        operation.

     Anthos on bare metal cluster proxy configuration.

     --uri=URI
        Address of the proxy server.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --no-proxy=[NO_PROXY,...]
        List of IPs, hostnames, and domains that should skip the proxy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container bare-metal admin-clusters create

        $ gcloud beta container bare-metal admin-clusters create
```

### gcloud container bare-metal admin-clusters describe

```text
NAME
    gcloud container bare-metal admin-clusters describe - describe an Anthos on
        bare metal admin cluster

SYNOPSIS
    gcloud container bare-metal admin-clusters describe
        (ADMIN_CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Anthos on bare metal admin cluster.

EXAMPLES
    To describe an admin cluster named my-cluster managed in location us-west1,
    run:

        $ gcloud container bare-metal admin-clusters describe my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Admin cluster resource - admin cluster to describe The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument admin_cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADMIN_CLUSTER
          ID of the admin_cluster or fully qualified identifier for the
          admin_cluster.

          To set the admin_cluster attribute:
          + provide the argument admin_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the admin_cluster.

          To set the location attribute:
          + provide the argument admin_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property container_bare_metal/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container bare-metal admin-clusters describe

        $ gcloud beta container bare-metal admin-clusters describe
```

### gcloud container bare-metal admin-clusters enroll

```text
NAME
    gcloud container bare-metal admin-clusters enroll - enroll an Anthos on
        bare metal admin cluster

SYNOPSIS
    gcloud container bare-metal admin-clusters enroll
        (ADMIN_CLUSTER : --location=LOCATION)
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION; default="global")
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enroll an Anthos on bare metal admin cluster.

EXAMPLES
    To enroll a cluster named my-cluster managed in location us-west1 with
    admin cluster membership of
    projects/my-project/locations/us-west1/memberships/my-admin-cluster-membership,
    run:

        $ gcloud container bare-metal admin-clusters enroll my-cluster \
            --location=us-west1 \
            --admin-cluster-membership=projects/my-project/locations/\
        us-west1/memberships/my-admin-cluster-membership

POSITIONAL ARGUMENTS
     Admin cluster resource - admin cluster to enroll The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument admin_cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADMIN_CLUSTER
          ID of the admin_cluster or fully qualified identifier for the
          admin_cluster.

          To set the admin_cluster attribute:
          + provide the argument admin_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the admin_cluster.

          To set the location attribute:
          + provide the argument admin_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property container_bare_metal/location.

REQUIRED FLAGS
     Admin cluster membership resource - membership of the admin cluster.
     Membership can be the membership ID or the full resource name. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --admin-cluster-membership on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          ID of the admin_cluster_membership or fully qualified identifier for
          the admin_cluster_membership.

          To set the admin_cluster_membership attribute:
          + provide the argument --admin-cluster-membership on the command
            line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION; default="global"
          Google Cloud location for the admin_cluster_membership.

          To set the location attribute:
          + provide the argument --admin-cluster-membership on the command
            line with a fully specified name;
          + provide the argument --admin-cluster-membership-location on the
            command line.

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

NOTES
    These variants are also available:

        $ gcloud alpha container bare-metal admin-clusters enroll

        $ gcloud beta container bare-metal admin-clusters enroll
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud container bare-metal admin-clusters enroll my-cluster \
    --location=us-west1 \
    --admin-cluster-membership=projects/my-project/locations/us-west1/memberships/my-admin-cluster-membership
```

### gcloud container bare-metal admin-clusters list

```text
NAME
    gcloud container bare-metal admin-clusters list - list Anthos on bare metal
        admin clusters

SYNOPSIS
    gcloud container bare-metal admin-clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Anthos on bare metal admin clusters.

EXAMPLES
    To list all admin clusters managed in location us-west1, run:

        $ gcloud container bare-metal admin-clusters list --location=us-west1

FLAGS
     Location resource - Google Cloud location to list Anthos on bare metal
     admin clusters. This represents a Cloud resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property container_bare_metal/location with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property container_bare_metal/location.

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

        $ gcloud alpha container bare-metal admin-clusters list

        $ gcloud beta container bare-metal admin-clusters list
```

### gcloud container bare-metal admin-clusters query-version-config

```text
NAME
    gcloud container bare-metal admin-clusters query-version-config - query
        versions for creating or upgrading an Anthos on bare metal admin
        cluster

SYNOPSIS
    gcloud container bare-metal admin-clusters query-version-config
        [--admin-cluster=ADMIN_CLUSTER] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Query versions for creating or upgrading an Anthos on bare metal admin
    cluster.

EXAMPLES
    To query versions for creating an admin cluster in location us-west1, run:

        $ gcloud container bare-metal admin-clusters query-version-config \
            --location=us-west1

    To query versions for upgrading an admin cluster named my-admin-cluster in
    location us-west1, run:

        $ gcloud container bare-metal admin-clusters query-version-config \
            --location=us-west1 --admin-cluster=my-admin-cluster

FLAGS
     Use cases for querying versions.

     Upgrade an Anthos on bare metal admin cluster use case.

     Admin cluster resource - Admin cluster to query versions for upgrade. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --admin-cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --admin-cluster on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property container_bare_metal/location.

     --admin-cluster=ADMIN_CLUSTER
        ID of the admin_cluster or fully qualified identifier for the
        admin_cluster.

        To set the admin_cluster attribute:
        * provide the argument --admin-cluster on the command line.

     Location resource - Google Cloud location to query versions. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property container_bare_metal/location with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property container_bare_metal/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container bare-metal admin-clusters \
            query-version-config

        $ gcloud beta container bare-metal admin-clusters \
            query-version-config
```

### gcloud container bare-metal admin-clusters unenroll

```text
NAME
    gcloud container bare-metal admin-clusters unenroll - unenroll an Anthos on
        bare metal admin cluster so that it is no longer managed by the Anthos
        On-Prem API

SYNOPSIS
    gcloud container bare-metal admin-clusters unenroll
        (ADMIN_CLUSTER : --location=LOCATION) [--allow-missing] [--async]
        [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Unenroll an Anthos on bare metal admin cluster so that it is no longer
    managed by the Anthos On-Prem API.

EXAMPLES
    To unenroll an admin cluster named my-cluster managed in location us-west1,
    run:

        $ gcloud container bare-metal admin-clusters unenroll my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Admin cluster resource - admin cluster to unenroll The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument admin_cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADMIN_CLUSTER
          ID of the admin_cluster or fully qualified identifier for the
          admin_cluster.

          To set the admin_cluster attribute:
          + provide the argument admin_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the admin_cluster.

          To set the location attribute:
          + provide the argument admin_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property container_bare_metal/location.

FLAGS
     --allow-missing
        If set, and the Bare Metal cluster is not found, the request will
        succeed but no action will be taken.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --ignore-errors
        If set, the unenrollment of a bare metal admin cluster resource will
        succeed even if errors occur during unenrollment.

     --validate-only
        If set, only validate the request, but do not actually perform the
        operation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container bare-metal admin-clusters unenroll

        $ gcloud beta container bare-metal admin-clusters unenroll
```

### gcloud container bare-metal admin-clusters update

```text
NAME
    gcloud container bare-metal admin-clusters update - update an Anthos on
        bare metal admin cluster

SYNOPSIS
    gcloud container bare-metal admin-clusters update
        (ADMIN_CLUSTER : --location=LOCATION) [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--enable-application-logs]
        [--island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...]]
        [--login-user=LOGIN_USER]
        [--maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,
          ...]] [--max-pods-per-node=MAX_PODS_PER_NODE] [--validate-only]
        [--version=VERSION]
        [--api-server-args=[KEY=VALUE,...]
          --control-plane-node-configs=[labels=LABELS],[node-ip=NODE-IP]
          --control-plane-node-labels=[KEY=VALUE,...]
          --control-plane-node-taints=[KEY=VALUE:EFFECT,...]]
        [--no-proxy=[NO_PROXY,...] --uri=URI] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Anthos on bare metal admin cluster.

EXAMPLES
    To update a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container bare-metal admin-clusters update my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Admin cluster resource - admin cluster to update The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument admin_cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADMIN_CLUSTER
          ID of the admin_cluster or fully qualified identifier for the
          admin_cluster.

          To set the admin_cluster attribute:
          + provide the argument admin_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the admin_cluster.

          To set the location attribute:
          + provide the argument admin_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property container_bare_metal/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE
        Set Binary Authorization evaluation mode for this cluster.
        BINAUTHZ_EVALUATION_MODE must be one of: DISABLED,
        PROJECT_SINGLETON_POLICY_ENFORCE.

     --description=DESCRIPTION
        Description for the resource.

     Anthos on bare metal cluster operations configuration.

     --enable-application-logs
        Whether collection of application logs/metrics should be enabled (in
        addition to system logs/metrics).

     Populate one of the network configs.

     Island mode CIDR network configuration.

     --island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...]
        IPv4 address range for all services in the cluster.

     Anthos on bare metal node access related settings for the admin cluster.

     --login-user=LOGIN_USER
        User name used to access node machines.

     Anthos on bare metal cluster maintenance configuration.

     --maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,...]
        IPv4 addresses to be placed into maintenance mode.

     Anthos on bare metal admin cluster workload node configuration.

     --max-pods-per-node=MAX_PODS_PER_NODE
        Maximum number of pods a node can run.

     --validate-only
        If set, only validate the request, but do not actually perform the
        operation.

     --version=VERSION
        Anthos cluster on bare metal version for the admin cluster resource.

     Anthos on bare metal cluster control plane configuration.

     --api-server-args=[KEY=VALUE,...]
        API Server argument configuration.

     Anthos on bare metal cluster control plane node pool configuration.

     Anthos on bare metal node pool configuration for control plane nodes.

     Anthos on bare metal node configuration for control plane nodes.

     Populate control plane node config.

     At most one of these can be specified:

       --control-plane-node-configs=[labels=LABELS],[node-ip=NODE-IP]
          Control plane node configuration.

     --control-plane-node-labels=[KEY=VALUE,...]
        Labels assigned to nodes of a node pool.

     --control-plane-node-taints=[KEY=VALUE:EFFECT,...]
        Node taint applied to every Kubernetes node in a node pool.

     Anthos on bare metal cluster proxy configuration.

     --no-proxy=[NO_PROXY,...]
        List of IPs, hostnames, and domains that should skip the proxy.

     --uri=URI
        Address of the proxy server.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container bare-metal admin-clusters update

        $ gcloud beta container bare-metal admin-clusters update
```

### gcloud beta container bare-metal admin-clusters create

```text
NAME
    gcloud beta container bare-metal admin-clusters create - create an Anthos
        on bare metal admin cluster

SYNOPSIS
    gcloud beta container bare-metal admin-clusters create
        (ADMIN_CLUSTER : --location=LOCATION) --version=VERSION
        (--control-plane-load-balancer-port=CONTROL_PLANE_LOAD_BALANCER_PORT
          --control-plane-vip=CONTROL_PLANE_VIP : --enable-manual-lb)
        ((((--control-plane-node-configs=[labels=LABELS],[node-ip=NODE-IP]
          : --control-plane-node-labels=[KEY=VALUE,...]
          --control-plane-node-taints=[KEY=VALUE:EFFECT,...])))
          : --api-server-args=[KEY=VALUE,...])
        (--island-mode-pod-address-cidr-blocks=POD_ADDRESS,[POD_ADDRESS,...]
          --island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...])
        ((--lvp-node-mounts-config-path=LVP_NODE_MOUNTS_CONFIG_PATH
          --lvp-node-mounts-config-storage-class=LVP_NODE_MOUNTS_CONFIG_STORAGE_CLASS) ((--lvp-share-path=LVP_SHARE_PATH --lvp-share-storage-class=LVP_SHARE_STORAGE_CLASS) : --shared-path-pv-count=SHARED_PATH_PV_COUNT))
        [--admin-users=ADMIN_USERS] [--annotations=[KEY=VALUE,...]] [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--enable-application-logs]
        [--login-user=LOGIN_USER]
        [--maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,
          ...]] [--max-pods-per-node=MAX_PODS_PER_NODE] [--validate-only]
        [--uri=URI : --no-proxy=[NO_PROXY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal admin-clusters describe

```text
NAME
    gcloud beta container bare-metal admin-clusters describe - describe an
        Anthos on bare metal admin cluster

SYNOPSIS
    gcloud beta container bare-metal admin-clusters describe
        (ADMIN_CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal admin-clusters enroll

```text
NAME
    gcloud beta container bare-metal admin-clusters enroll - enroll an Anthos
        on bare metal admin cluster

SYNOPSIS
    gcloud beta container bare-metal admin-clusters enroll
        (ADMIN_CLUSTER : --location=LOCATION)
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION; default="global")
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal admin-clusters list

```text
NAME
    gcloud beta container bare-metal admin-clusters list - list Anthos on bare
        metal admin clusters

SYNOPSIS
    gcloud beta container bare-metal admin-clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal admin-clusters query-version-config

```text
NAME
    gcloud beta container bare-metal admin-clusters query-version-config -
        query versions for creating or upgrading an Anthos on bare metal admin
        cluster

SYNOPSIS
    gcloud beta container bare-metal admin-clusters query-version-config
        [--admin-cluster=ADMIN_CLUSTER] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal admin-clusters unenroll

```text
NAME
    gcloud beta container bare-metal admin-clusters unenroll - unenroll an
        Anthos on bare metal admin cluster so that it is no longer managed by
        the Anthos On-Prem API

SYNOPSIS
    gcloud beta container bare-metal admin-clusters unenroll
        (ADMIN_CLUSTER : --location=LOCATION) [--allow-missing] [--async]
        [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal admin-clusters update

```text
NAME
    gcloud beta container bare-metal admin-clusters update - update an Anthos
        on bare metal admin cluster

SYNOPSIS
    gcloud beta container bare-metal admin-clusters update
        (ADMIN_CLUSTER : --location=LOCATION) [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--enable-application-logs]
        [--island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...]]
        [--login-user=LOGIN_USER]
        [--maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,
          ...]] [--max-pods-per-node=MAX_PODS_PER_NODE] [--validate-only]
        [--version=VERSION]
        [--api-server-args=[KEY=VALUE,...]
          --control-plane-node-configs=[labels=LABELS],[node-ip=NODE-IP]
          --control-plane-node-labels=[KEY=VALUE,...]
          --control-plane-node-taints=[KEY=VALUE:EFFECT,...]]
        [--no-proxy=[NO_PROXY,...] --uri=URI] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal admin-clusters create

```text
NAME
    gcloud alpha container bare-metal admin-clusters create - create an Anthos
        on bare metal admin cluster

SYNOPSIS
    gcloud alpha container bare-metal admin-clusters create
        (ADMIN_CLUSTER : --location=LOCATION) --version=VERSION
        (--control-plane-load-balancer-port=CONTROL_PLANE_LOAD_BALANCER_PORT
          --control-plane-vip=CONTROL_PLANE_VIP : --enable-manual-lb)
        ((((--control-plane-node-configs=[labels=LABELS],[node-ip=NODE-IP]
          : --control-plane-node-labels=[KEY=VALUE,...]
          --control-plane-node-taints=[KEY=VALUE:EFFECT,...])))
          : --api-server-args=[KEY=VALUE,...])
        (--island-mode-pod-address-cidr-blocks=POD_ADDRESS,[POD_ADDRESS,...]
          --island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...])
        ((--lvp-node-mounts-config-path=LVP_NODE_MOUNTS_CONFIG_PATH
          --lvp-node-mounts-config-storage-class=LVP_NODE_MOUNTS_CONFIG_STORAGE_CLASS) ((--lvp-share-path=LVP_SHARE_PATH --lvp-share-storage-class=LVP_SHARE_STORAGE_CLASS) : --shared-path-pv-count=SHARED_PATH_PV_COUNT))
        [--admin-users=ADMIN_USERS] [--annotations=[KEY=VALUE,...]] [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--enable-application-logs]
        [--login-user=LOGIN_USER]
        [--maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,
          ...]] [--max-pods-per-node=MAX_PODS_PER_NODE] [--validate-only]
        [--uri=URI : --no-proxy=[NO_PROXY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal admin-clusters describe

```text
NAME
    gcloud alpha container bare-metal admin-clusters describe - describe an
        Anthos on bare metal admin cluster

SYNOPSIS
    gcloud alpha container bare-metal admin-clusters describe
        (ADMIN_CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal admin-clusters enroll

```text
NAME
    gcloud alpha container bare-metal admin-clusters enroll - enroll an Anthos
        on bare metal admin cluster

SYNOPSIS
    gcloud alpha container bare-metal admin-clusters enroll
        (ADMIN_CLUSTER : --location=LOCATION)
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION; default="global")
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal admin-clusters list

```text
NAME
    gcloud alpha container bare-metal admin-clusters list - list Anthos on bare
        metal admin clusters

SYNOPSIS
    gcloud alpha container bare-metal admin-clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal admin-clusters query-version-config

```text
NAME
    gcloud alpha container bare-metal admin-clusters query-version-config -
        query versions for creating or upgrading an Anthos on bare metal admin
        cluster

SYNOPSIS
    gcloud alpha container bare-metal admin-clusters query-version-config
        [--admin-cluster=ADMIN_CLUSTER] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal admin-clusters unenroll

```text
NAME
    gcloud alpha container bare-metal admin-clusters unenroll - unenroll an
        Anthos on bare metal admin cluster so that it is no longer managed by
        the Anthos On-Prem API

SYNOPSIS
    gcloud alpha container bare-metal admin-clusters unenroll
        (ADMIN_CLUSTER : --location=LOCATION) [--allow-missing] [--async]
        [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal admin-clusters update

```text
NAME
    gcloud alpha container bare-metal admin-clusters update - update an Anthos
        on bare metal admin cluster

SYNOPSIS
    gcloud alpha container bare-metal admin-clusters update
        (ADMIN_CLUSTER : --location=LOCATION) [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--enable-application-logs]
        [--island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...]]
        [--login-user=LOGIN_USER]
        [--maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,
          ...]] [--max-pods-per-node=MAX_PODS_PER_NODE] [--validate-only]
        [--version=VERSION]
        [--api-server-args=[KEY=VALUE,...]
          --control-plane-node-configs=[labels=LABELS],[node-ip=NODE-IP]
          --control-plane-node-labels=[KEY=VALUE,...]
          --control-plane-node-taints=[KEY=VALUE:EFFECT,...]]
        [--no-proxy=[NO_PROXY,...] --uri=URI] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Incomplete example: the `create` example gives only the cluster name and `--location`; gcloud 593.0.0 rejects it ("Exactly one of --control-plane-node-configs must be specified"), because the SYNOPSIS requires `--version`, the control plane node configuration (`--control-plane-node-configs`), the control plane load balancer flags and the network flags. Use the SYNOPSIS and flags on this page to complete the command.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/bare-metal/admin-clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
