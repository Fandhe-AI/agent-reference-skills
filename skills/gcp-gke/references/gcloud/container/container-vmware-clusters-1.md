---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/vmware/clusters
---

# gcloud container vmware clusters (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container vmware clusters create

```text
NAME
    gcloud container vmware clusters create - create an Anthos cluster on
        VMware

SYNOPSIS
    gcloud container vmware clusters create (CLUSTER : --location=LOCATION)
        --version=VERSION
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT)
        ((--control-plane-vip=CONTROL_PLANE_VIP --ingress-vip=INGRESS_VIP)
          (--metal-lb-config-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL]
          | --control-plane-node-port=CONTROL_PLANE_NODE_PORT
          --ingress-http-node-port=INGRESS_HTTP_NODE_PORT
          --ingress-https-node-port=INGRESS_HTTPS_NODE_PORT
          --konnectivity-server-node-port=KONNECTIVITY_SERVER_NODE_PORT
          | [--f5-config-address=F5_CONFIG_ADDRESS
          --f5-config-partition=F5_CONFIG_PARTITION
          : --f5-config-snat-pool=F5_CONFIG_SNAT_POOL]))
        (--pod-address-cidr-blocks=POD_ADDRESS
          --service-address-cidr-blocks=SERVICE_ADDRESS
          : --control-plane-ip-block=[gateway=GATEWAY],
          [ips=IPS],[netmask=NETMASK]
          --dns-search-domains=[DNS_SEARCH_DOMAINS,...]
          --dns-servers=[DNS_SERVERS,...]
          --ntp-servers=[NTP_SERVERS,...] --enable-dhcp
          | --static-ip-config-ip-blocks=[gateway=GATEWAY],
          [ips=IPS],[netmask=NETMASK]) [--admin-users=ADMIN_USERS]
        [--annotations=[KEY=VALUE,...]] [--async] [--description=DESCRIPTION]
        [--disable-aag-config] [--disable-vsphere-csi] [--enable-auto-repair]
        [--enable-vm-tracking]
        [--upgrade-policy=[control-plane-only=CONTROL-PLANE-ONLY]]
        [--validate-only]
        [--cpus=CPUS --enable-auto-resize --memory=MEMORY --replicas=REPLICAS]
        [--disable-control-plane-v2 | --enable-control-plane-v2]
        [--enable-advanced-networking --enable-dataplane-v2]
        [--vcenter-ca-cert-data=VCENTER_CA_CERT_DATA
          --vcenter-cluster=VCENTER_CLUSTER
          --vcenter-datacenter=VCENTER_DATACENTER
          --vcenter-datastore=VCENTER_DATASTORE --vcenter-folder=VCENTER_FOLDER
          --vcenter-resource-pool=VCENTER_RESOURCE_POOL
          --vcenter-storage-policy-name=VCENTER_STORAGE_POLICY_NAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an Anthos cluster on VMware.

EXAMPLES
    To create a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container vmware clusters create my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Cluster resource - cluster to create The arguments in this group can be
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
          + set the property container_vmware/location.

REQUIRED FLAGS
     --version=VERSION
        Anthos Cluster on VMware version for the cluster resource

     Admin cluster membership resource - membership of the admin cluster.
     Membership name is the same as the admin cluster name.

     Examples:

         $ gcloud container vmware clusters create
               --admin-cluster-membership=projects/example-project-12345/locations/us-west1/memberships/example-admin-cluster-name

     or

         $ gcloud container vmware clusters create
               --admin-cluster-membership-project=example-project-12345
               --admin-cluster-membership-location=us-west1
               --admin-cluster-membership=example-admin-cluster-name

         The arguments in this group can be used to specify the attributes of this resource.

     This must be specified.

       --admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          ID of the admin_cluster_membership or fully qualified identifier for
          the admin_cluster_membership.

          To set the admin_cluster_membership attribute:
          + provide the argument --admin-cluster-membership on the command
            line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION
          Google Cloud location for the admin_cluster_membership.

          To set the location attribute:
          + provide the argument --admin-cluster-membership on the command
            line with a fully specified name;
          + provide the argument --admin-cluster-membership-location on the
            command line.

       --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT
          Google Cloud project for the admin_cluster_membership.

          To set the project attribute:
          + provide the argument --admin-cluster-membership on the command
            line with a fully specified name;
          + provide the argument --admin-cluster-membership-project on the
            command line.

     Anthos on VMware cluster load balancer configurations

     This must be specified.

       VIPs used by the load balancer

       This must be specified.

         --control-plane-vip=CONTROL_PLANE_VIP
            VIP for the Kubernetes API of this cluster.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --ingress-vip=INGRESS_VIP
            VIP for ingress traffic into this cluster.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

       Populate one of the load balancers.

       Exactly one of these must be specified:

         MetalLB Configuration

         At most one of these can be specified:

           --metal-lb-config-address-pools=[addresses=ADDRESSES],[avoid-buggy-ips=AVOID-BUGGY-IPS],[manual-assign=MANUAL-ASSIGN],[pool=POOL]
              MetalLB load balancer configurations.

              Examples:

              To specify MetalLB load balancer configurations for two address
              pools pool1 and pool2,

                  $ gcloud gcloud container vmware clusters create
                      --metal-lb-config-address-pools 'pool=pool1,avoid-buggy-ips=True,manual-assign=True,addresses=192.168.1.1/32;192.168.1.2-192.168.1.3'
                      --metal-lb-config-address-pools 'pool=pool2,avoid-buggy-ips=False,manual-assign=False,addresses=192.168.2.1/32;192.168.2.2-192.168.2.3'

              Use quote around the flag value to escape semicolon in the
              terminal.

         Manual load balancer configuration.

         With manual load balancing mode, DHCP is not supported. Specify static
         IP addresses for cluster nodes instead. For more details, see
         https://cloud.google.com/anthos/clusters/docs/on-prem/latest/how-to/manual-load-balance#setting_aside_node_ip_addresses.

         --control-plane-node-port=CONTROL_PLANE_NODE_PORT
            NodePort for control plane service.

         --ingress-http-node-port=INGRESS_HTTP_NODE_PORT
            NodePort for ingress service's http.

         --ingress-https-node-port=INGRESS_HTTPS_NODE_PORT
            NodePort for ingress service's https.

         --konnectivity-server-node-port=KONNECTIVITY_SERVER_NODE_PORT
            NodePort for konnectivity service running as a sidecar in each
            kube-apiserver pod.

         F5 Big IP Configuration

         --f5-config-address=F5_CONFIG_ADDRESS
            F5 Big IP load balancer address.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --f5-config-partition=F5_CONFIG_PARTITION
            F5 Big IP load balancer partition.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --f5-config-snat-pool=F5_CONFIG_SNAT_POOL
            F5 Big IP load balancer pool name if using SNAT.

     VMware User Cluster network configurations

     This must be specified.

       --pod-address-cidr-blocks=POD_ADDRESS
          IPv4 address range for all pods in the cluster.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --service-address-cidr-blocks=SERVICE_ADDRESS
          IPv4 address range for all services in the cluster.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       Control plane v2 mode configurations.

       --control-plane-ip-block=[gateway=GATEWAY],[ips=IPS],[netmask=NETMASK]
          Static IP addresses for the control plane nodes. The number of IP
          addresses should match the number of replicas for the control plane
          nodes, specified by --replicas.

          To specify the control plane IP block,

              $ gcloud gcloud container vmware clusters create
                  --control-plane-ip-block 'gateway=192.168.0.1,netmask=255.255.255.0,ips=192.168.1.1;0.0.0.0 localhost;'

       Common parameters for all hosts irrespective of their IP address

       --dns-search-domains=[DNS_SEARCH_DOMAINS,...]
          DNS search domains.

       --dns-servers=[DNS_SERVERS,...]
          DNS server IP address.

       --ntp-servers=[NTP_SERVERS,...]
          NTP server IP address.

       IP configuration used by the VMware User Cluster

       At most one of these can be specified:

         DHCP configuration group.

         --enable-dhcp
            Enable DHCP IP allocation for VMware user clusters.

            While using DHCP, manual load balancing mode is not supported. For
            more details, see
            https://cloud.google.com/anthos/clusters/docs/on-prem/latest/how-to/manual-load-balance#setting_aside_node_ip_addresses.

         Static IP configuration group

         At most one of these can be specified:

           --static-ip-config-ip-blocks=[gateway=GATEWAY],[ips=IPS],[netmask=NETMASK]
              Static IP configurations.

              Expect an individual IP address, an individual IP address with an
              optional hostname, or a CIDR block.

              Example:

              To specify two Static IP blocks,

                  $ gcloud gcloud container vmware clusters create
                      --static-ip-config-ip-blocks 'gateway=192.168.0.1,netmask=255.255.255.0,ips=192.168.1.1;0.0.0.0 localhost;192.168.1.2/16'
                      --static-ip-config-ip-blocks 'gateway=192.168.1.1,netmask=255.255.0.0,ips=8.8.8.8;4.4.4.4'

              Use quote around the flag value to escape semicolon in the
              terminal.

OPTIONAL FLAGS
     User cluster authorization configurations to bootstrap onto the admin
     cluster

     --admin-users=ADMIN_USERS
        Users that will be granted the cluster-admin role on the cluster,
        providing full access to the cluster.

        To add multiple users, specify one in each flag. When updating, the
        update command overwrites the whole grant list. Specify all existing
        and new users that you want to be cluster administrators.

        Examples:

            $ gcloud container vmware clusters create
                --admin-users alice@example.com
                --admin-users bob@example.com

     --annotations=[KEY=VALUE,...]
        Annotations on the VMware user cluster.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description for the resource.

     Anti-affinity group configurations

     --disable-aag-config
        If set, spread nodes across at least three physical hosts (requires at
        least three hosts). Enabled by default.

     Storage configurations

     --disable-vsphere-csi
        If set, vSphere CSI components are not deployed in the VMware User
        Cluster. Enabled by default.

     Auto-repair configurations

     --enable-auto-repair
        If set, deploy the cluster-health-controller.

     --enable-vm-tracking
        If set, enable VM tracking.

     Upgrade policy for the cluster.

     --upgrade-policy=[control-plane-only=CONTROL-PLANE-ONLY]
        If not specified, control-plane-only is set to False. In the next
        upgrade operation, all worker node pools will be upgraded together with
        the control plane.

        Example:

            To upgrade the control plane only and keep worker node pools version unchanged, first specify the policy:

            $ gcloud container vmware clusters create CLUSTER \
              --upgrade-policy control-plane-only=True

            Then to start the upgrade operation using the specified policy, run:

            $ gcloud container vmware clusters upgrade CLUSTER --version=VERSION

            After upgrading only the cluster control plane, to upgrade an individual node pool, run:

            $ gcloud container vmware node-pools update NODE_POOL \
              --version=VERSION

        Example:

            Alternatively, to upgrade both the control plane and all worker node pools, first specify the policy:

            $ gcloud container vmware clusters create CLUSTER \
              --upgrade-policy control-plane-only=False

            Then to start the upgrade operation using the specified policy, run:

            $ gcloud container vmware clusters upgrade CLUSTER --version=VERSION

     --validate-only
        If set, only validate the request, but do not actually perform the
        operation.

     Control plane node configurations

     --cpus=CPUS
        Number of CPUs for each admin cluster node that serve as control planes
        for this VMware user cluster. (default: 4 CPUs)

     Auto resize configurations

     --enable-auto-resize
        Enable controle plane node auto resize.

     --memory=MEMORY
        Megabytes of memory for each admin cluster node that serves as a
        control plane for this VMware User Cluster (default: 8192 MB memory).

     --replicas=REPLICAS
        Number of control plane nodes for this VMware user cluster. (default: 1
        replica).

     At most one of these can be specified:

       --disable-control-plane-v2
          If set, disable control plane v2.

       --enable-control-plane-v2
          If set, enable control plane v2.

     Dataplane V2 configurations

     --enable-advanced-networking
        If set, enable advanced networking. Requires dataplane_v2_enabled to be
        set true.

     --enable-dataplane-v2
        If set, enables Dataplane V2.

     vCenter configurations for the cluster. If not specified, it is inherited
     from the admin cluster.

     --vcenter-ca-cert-data=VCENTER_CA_CERT_DATA
        Name of the vCenter CA certificate public key for SSL verification.

     --vcenter-cluster=VCENTER_CLUSTER
        Name of the vCenter cluster for the user cluster.

     --vcenter-datacenter=VCENTER_DATACENTER
        Name of the vCenter datacenter for the user cluster.

     --vcenter-datastore=VCENTER_DATASTORE
        Name of the vCenter datastore for the user cluster.

     --vcenter-folder=VCENTER_FOLDER
        Name of the vCenter folder for the user cluster.

     --vcenter-resource-pool=VCENTER_RESOURCE_POOL
        Name of the vCenter resource pool for the user cluster.

     --vcenter-storage-policy-name=VCENTER_STORAGE_POLICY_NAME
        Name of the vCenter storage policy for the user cluster.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container vmware clusters create

        $ gcloud beta container vmware clusters create
```

### gcloud container vmware clusters delete

```text
NAME
    gcloud container vmware clusters delete - delete an Anthos cluster on
        VMware

SYNOPSIS
    gcloud container vmware clusters delete (CLUSTER : --location=LOCATION)
        [--allow-missing] [--async] [--force] [--ignore-errors]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Anthos cluster on VMware.

EXAMPLES
    To delete a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container vmware clusters delete my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Cluster resource - cluster to delete The arguments in this group can be
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
          + set the property container_vmware/location.

FLAGS
     --allow-missing
        If set, and the Anthos cluster on VMware is not found, the request will
        succeed but no action will be taken.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --force
        If set, any node pools from the cluster will also be deleted. This flag
        is required if the cluster has any associated node pools.

     --ignore-errors
        If set, the deletion of a VMware user cluster resource will succeed
        even if errors occur during deletion.

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

        $ gcloud alpha container vmware clusters delete

        $ gcloud beta container vmware clusters delete
```

### gcloud container vmware clusters describe

```text
NAME
    gcloud container vmware clusters describe - describe an Anthos cluster on
        VMware

SYNOPSIS
    gcloud container vmware clusters describe (CLUSTER : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Anthos cluster on VMware.

EXAMPLES
    To describe a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container vmware clusters describe my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Cluster resource - cluster to describe The arguments in this group can be
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
          + set the property container_vmware/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container vmware clusters describe

        $ gcloud beta container vmware clusters describe
```

### gcloud container vmware clusters enroll

```text
NAME
    gcloud container vmware clusters enroll - enroll an Anthos cluster on
        VMware

SYNOPSIS
    gcloud container vmware clusters enroll (CLUSTER : --location=LOCATION)
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT)
        [--async] [--local-name=LOCAL_NAME] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enroll an Anthos cluster on VMware.

EXAMPLES
    To enroll a cluster named my-cluster managed in location us-west1 with
    admin cluster membership of
    projects/my-project/locations/us-west1/memberships/my-admin-cluster-membership,
    run:

        $ gcloud container vmware clusters enroll my-cluster \
            --location=us-west1 \
            --admin-cluster-membership=projects/my-project/locations/\
        us-west1/memberships/my-admin-cluster-membership

POSITIONAL ARGUMENTS
     Cluster resource - cluster to enroll The arguments in this group can be
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
          + set the property container_vmware/location.

REQUIRED FLAGS
     Admin cluster membership resource - membership of the admin cluster.
     Membership name is the same as the admin cluster name.

     Examples:

         $ gcloud container vmware clusters enroll
               --admin-cluster-membership=projects/example-project-12345/locations/us-west1/memberships/example-admin-cluster-name

     or

         $ gcloud container vmware clusters enroll
               --admin-cluster-membership-project=example-project-12345
               --admin-cluster-membership-location=us-west1
               --admin-cluster-membership=example-admin-cluster-name

         The arguments in this group can be used to specify the attributes of this resource.

     This must be specified.

       --admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          ID of the admin_cluster_membership or fully qualified identifier for
          the admin_cluster_membership.

          To set the admin_cluster_membership attribute:
          + provide the argument --admin-cluster-membership on the command
            line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION
          Google Cloud location for the admin_cluster_membership.

          To set the location attribute:
          + provide the argument --admin-cluster-membership on the command
            line with a fully specified name;
          + provide the argument --admin-cluster-membership-location on the
            command line.

       --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT
          Google Cloud project for the admin_cluster_membership.

          To set the project attribute:
          + provide the argument --admin-cluster-membership on the command
            line with a fully specified name;
          + provide the argument --admin-cluster-membership-project on the
            command line.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --local-name=LOCAL_NAME
        The object name of the VMware OnPremUserCluster custom resource on the
        associated admin cluster. This field is used to support conflicting
        resource names when enrolling existing clusters to the API. When not
        provided, this field will resolve to the vmware_cluster_id. Otherwise,
        it must match the object name of the VMware OnPremUserCluster custom
        resource. It is not modifiable outside / beyond the enrollment
        operation.

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

        $ gcloud alpha container vmware clusters enroll

        $ gcloud beta container vmware clusters enroll
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud container vmware clusters enroll my-cluster \
    --location=us-west1 \
    --admin-cluster-membership=projects/my-project/locations/us-west1/memberships/my-admin-cluster-membership
```

### gcloud container vmware clusters list

```text
NAME
    gcloud container vmware clusters list - list Anthos clusters on VMware

SYNOPSIS
    gcloud container vmware clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Anthos clusters on VMware.

EXAMPLES
    To lists all clusters managed in location us-west1, run:

        $ gcloud container vmware clusters list --location=us-west1

FLAGS
     Location resource - Google Cloud location to list Anthos on VMware
     clusters. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property container_vmware/location with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property container_vmware/location.

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

        $ gcloud alpha container vmware clusters list

        $ gcloud beta container vmware clusters list
```

### gcloud container vmware clusters query-version-config

```text
NAME
    gcloud container vmware clusters query-version-config - query versions for
        creating or upgrading an Anthos on VMware user cluster

SYNOPSIS
    gcloud container vmware clusters query-version-config [--location=LOCATION]
        [--cluster=CLUSTER
          | [--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION; default="global" --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Query versions for creating or upgrading an Anthos on VMware user cluster.

EXAMPLES
    To query all available versions in location us-west1, run:

        $ gcloud container vmware clusters query-version-config \
            --location=us-west1

    To query versions for creating a cluster with an admin cluster membership
    named my-admin-cluster-membership managed in project
    my-admin-cluster-project and location us-west, run:

        $ gcloud container vmware clusters query-version-config \
            --location=us-west1 \
            --admin-cluster-membership=my-admin-cluster-membership \
            --admin-cluster-membership-project=my-admin-cluster-project

    To query versions for upgrading a user cluster named my-user-cluster in
    location us-west1, run:

        $ gcloud container vmware clusters query-version-config \
            --location=us-west1 --cluster=my-user-cluster

FLAGS
     Location resource - Google Cloud location to query versions. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property container_vmware/location with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property container_vmware/location.

     Use cases for querying versions.

     At most one of these can be specified:

       Upgrade an Anthos on VMware user cluster use case.

       Cluster resource - Cluster to query versions for upgrade. This
       represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --cluster on the command line with a fully
          specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --cluster on the command line with a fully
          specified name;
        + provide the argument --location on the command line;
        + set the property container_vmware/location.

       --cluster=CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument --cluster on the command line.

       Create an Anthos on VMware user cluster use case.

       Admin cluster membership resource - Membership of the admin cluster to
       query versions for create. Membership can be the membership ID or the
       full resource name. The arguments in this group can be used to specify
       the attributes of this resource.

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

       --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT
          Project ID of the Google Cloud project for the
          admin_cluster_membership.

          To set the project attribute:
          + provide the argument --admin-cluster-membership on the command
            line with a fully specified name;
          + provide the argument --admin-cluster-membership-project on the
            command line;
          + provide the argument --project on the command line;
          + set the property core/project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container vmware clusters query-version-config

        $ gcloud beta container vmware clusters query-version-config
```

### gcloud container vmware clusters update

```text
NAME
    gcloud container vmware clusters update - update an Anthos cluster on
        VMware

SYNOPSIS
    gcloud container vmware clusters update (CLUSTER : --location=LOCATION)
        [--admin-users=ADMIN_USERS] [--async] [--description=DESCRIPTION]
        [--metal-lb-config-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL]]
        [--static-ip-config-ip-blocks=[gateway=GATEWAY],
          [ips=IPS],[netmask=NETMASK]]
        [--upgrade-policy=[control-plane-only=CONTROL-PLANE-ONLY]]
        [--validate-only] [--version=VERSION]
        [--add-annotations=[KEY1=VALUE1,KEY2=VALUE2,...]
          | --remove-annotations=[KEY1,KEY2,...]]
        [--cpus=CPUS --memory=MEMORY --disable-auto-resize
          | --enable-auto-resize] [--disable-aag-config | --enable-aag-config]
        [--disable-auto-repair | --enable-auto-repair]
        [--disable-vsphere-csi | --enable-vsphere-csi] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Anthos cluster on VMware.

EXAMPLES
    To update a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container vmware clusters update my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Cluster resource - cluster to update The arguments in this group can be
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
          + set the property container_vmware/location.

FLAGS
     User cluster authorization configurations to bootstrap onto the admin
     cluster

     --admin-users=ADMIN_USERS
        Users that will be granted the cluster-admin role on the cluster,
        providing full access to the cluster.

        To add multiple users, specify one in each flag. When updating, the
        update command overwrites the whole grant list. Specify all existing
        and new users that you want to be cluster administrators.

        Examples:

            $ gcloud container vmware clusters update
                --admin-users alice@example.com
                --admin-users bob@example.com

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description for the resource.

     Anthos on VMware cluster load balancer configurations

     Populate one of the load balancers.

     MetalLB Configuration

     At most one of these can be specified:

       --metal-lb-config-address-pools=[addresses=ADDRESSES],[avoid-buggy-ips=AVOID-BUGGY-IPS],[manual-assign=MANUAL-ASSIGN],[pool=POOL]
          MetalLB load balancer configurations.

          Examples:

          To specify MetalLB load balancer configurations for two address pools
          pool1 and pool2,

              $ gcloud gcloud container vmware clusters update
                  --metal-lb-config-address-pools 'pool=pool1,avoid-buggy-ips=True,manual-assign=True,addresses=192.168.1.1/32;192.168.1.2-192.168.1.3'
                  --metal-lb-config-address-pools 'pool=pool2,avoid-buggy-ips=False,manual-assign=False,addresses=192.168.2.1/32;192.168.2.2-192.168.2.3'

          Use quote around the flag value to escape semicolon in the terminal.

     VMware User Cluster network configurations

     IP configuration used by the VMware User Cluster

     Static IP configuration group

     At most one of these can be specified:

       --static-ip-config-ip-blocks=[gateway=GATEWAY],[ips=IPS],[netmask=NETMASK]
          Static IP configurations.

          Expect an individual IP address, an individual IP address with an
          optional hostname, or a CIDR block.

          Example:

          To specify two Static IP blocks,

              $ gcloud gcloud container vmware clusters update
                  --static-ip-config-ip-blocks 'gateway=192.168.0.1,netmask=255.255.255.0,ips=192.168.1.1;0.0.0.0 localhost;192.168.1.2/16'
                  --static-ip-config-ip-blocks 'gateway=192.168.1.1,netmask=255.255.0.0,ips=8.8.8.8;4.4.4.4'

          Use quote around the flag value to escape semicolon in the terminal.

     Upgrade policy for the cluster.

     --upgrade-policy=[control-plane-only=CONTROL-PLANE-ONLY]
        If not specified, control-plane-only is set to False. In the next
        upgrade operation, all worker node pools will be upgraded together with
        the control plane.

        Example:

            To upgrade the control plane only and keep worker node pools version unchanged, first specify the policy:

            $ gcloud container vmware clusters update CLUSTER \
              --upgrade-policy control-plane-only=True

            Then to start the upgrade operation using the specified policy, run:

            $ gcloud container vmware clusters upgrade CLUSTER --version=VERSION

            After upgrading only the cluster control plane, to upgrade an individual node pool, run:

            $ gcloud container vmware node-pools update NODE_POOL \
              --version=VERSION

        Example:

            Alternatively, to upgrade both the control plane and all worker node pools, first specify the policy:

            $ gcloud container vmware clusters update CLUSTER \
              --upgrade-policy control-plane-only=False

            Then to start the upgrade operation using the specified policy, run:

            $ gcloud container vmware clusters upgrade CLUSTER --version=VERSION

     --validate-only
        If set, only validate the request, but do not actually perform the
        operation.

     --version=VERSION
        Anthos Cluster on VMware version for the cluster resource

     At most one of these can be specified:

       --add-annotations=[KEY1=VALUE1,KEY2=VALUE2,...]
          Add the given key-value pairs to the current annotations, or update
          its value if the key already exists.

       --remove-annotations=[KEY1,KEY2,...]
          Remove annotations of the given keys.

     Control plane node configurations

     --cpus=CPUS
        Number of CPUs for each admin cluster node that serve as control planes
        for this VMware user cluster. (default: 4 CPUs)

     --memory=MEMORY
        Megabytes of memory for each admin cluster node that serves as a
        control plane for this VMware User Cluster (default: 8192 MB memory).

     Auto resize configurations

     At most one of these can be specified:

       --disable-auto-resize
          Disable controle plane node auto resize.

       --enable-auto-resize
          Enable controle plane node auto resize.

     Anti-affinity group configurations

     At most one of these can be specified:

       --disable-aag-config
          If set, spread nodes across at least three physical hosts (requires
          at least three hosts). Enabled by default.

       --enable-aag-config
          If set, enable anti-affinity group config.

     Auto-repair configurations

     At most one of these can be specified:

       --disable-auto-repair
          If set, disables auto repair.

       --enable-auto-repair
          If set, deploy the cluster-health-controller.

     Storage configurations

     At most one of these can be specified:

       --disable-vsphere-csi
          If set, vSphere CSI components are not deployed in the VMware User
          Cluster. Enabled by default.

       --enable-vsphere-csi
          If set, vSphere CSI components are deployed in the VMware User
          Cluster.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container vmware clusters update

        $ gcloud beta container vmware clusters update
```

### gcloud container vmware clusters upgrade

```text
NAME
    gcloud container vmware clusters upgrade - centrally upgrade an Anthos
        cluster on VMware

SYNOPSIS
    gcloud container vmware clusters upgrade (CLUSTER : --location=LOCATION)
        --version=VERSION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Centrally upgrade an Anthos cluster on VMware.

EXAMPLES
    To upgrade a cluster named my-cluster managed in location us-west1 to
    version 1.13.0-gke.1000, run:

        $ gcloud container vmware clusters upgrade my-cluster \
            --location=us-west1 --version=1.13.0-gke.1000

POSITIONAL ARGUMENTS
     Cluster resource - cluster to upgrade The arguments in this group can be
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
          + set the property container_vmware/location.

REQUIRED FLAGS
     --version=VERSION
        Anthos Cluster on VMware version for the cluster resource

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container vmware clusters upgrade

        $ gcloud beta container vmware clusters upgrade
```

### gcloud beta container vmware clusters create

```text
NAME
    gcloud beta container vmware clusters create - create an Anthos cluster on
        VMware

SYNOPSIS
    gcloud beta container vmware clusters create
        (CLUSTER : --location=LOCATION) --version=VERSION
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT)
        ((--control-plane-vip=CONTROL_PLANE_VIP --ingress-vip=INGRESS_VIP)
          (--metal-lb-config-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL]
          | --control-plane-node-port=CONTROL_PLANE_NODE_PORT
          --ingress-http-node-port=INGRESS_HTTP_NODE_PORT
          --ingress-https-node-port=INGRESS_HTTPS_NODE_PORT
          --konnectivity-server-node-port=KONNECTIVITY_SERVER_NODE_PORT
          | [--f5-config-address=F5_CONFIG_ADDRESS
          --f5-config-partition=F5_CONFIG_PARTITION
          : --f5-config-snat-pool=F5_CONFIG_SNAT_POOL]))
        (--pod-address-cidr-blocks=POD_ADDRESS
          --service-address-cidr-blocks=SERVICE_ADDRESS
          : --control-plane-ip-block=[gateway=GATEWAY],
          [ips=IPS],[netmask=NETMASK]
          --dns-search-domains=[DNS_SEARCH_DOMAINS,...]
          --dns-servers=[DNS_SERVERS,...]
          --ntp-servers=[NTP_SERVERS,...] --enable-dhcp
          | --static-ip-config-ip-blocks=[gateway=GATEWAY],
          [ips=IPS],[netmask=NETMASK]) [--admin-users=ADMIN_USERS]
        [--annotations=[KEY=VALUE,...]] [--async] [--description=DESCRIPTION]
        [--disable-aag-config] [--disable-vsphere-csi] [--enable-auto-repair]
        [--enable-vm-tracking]
        [--upgrade-policy=[control-plane-only=CONTROL-PLANE-ONLY]]
        [--validate-only]
        [--cpus=CPUS --enable-auto-resize --memory=MEMORY --replicas=REPLICAS]
        [--disable-control-plane-v2 | --enable-control-plane-v2]
        [--enable-advanced-networking --enable-dataplane-v2]
        [--vcenter-ca-cert-data=VCENTER_CA_CERT_DATA
          --vcenter-cluster=VCENTER_CLUSTER
          --vcenter-datacenter=VCENTER_DATACENTER
          --vcenter-datastore=VCENTER_DATASTORE --vcenter-folder=VCENTER_FOLDER
          --vcenter-resource-pool=VCENTER_RESOURCE_POOL
          --vcenter-storage-policy-name=VCENTER_STORAGE_POLICY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware clusters delete

```text
NAME
    gcloud beta container vmware clusters delete - delete an Anthos cluster on
        VMware

SYNOPSIS
    gcloud beta container vmware clusters delete
        (CLUSTER : --location=LOCATION) [--allow-missing] [--async] [--force]
        [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware clusters describe

```text
NAME
    gcloud beta container vmware clusters describe - describe an Anthos cluster
        on VMware

SYNOPSIS
    gcloud beta container vmware clusters describe
        (CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware clusters enroll

```text
NAME
    gcloud beta container vmware clusters enroll - enroll an Anthos cluster on
        VMware

SYNOPSIS
    gcloud beta container vmware clusters enroll
        (CLUSTER : --location=LOCATION)
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT)
        [--async] [--local-name=LOCAL_NAME] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware clusters list

```text
NAME
    gcloud beta container vmware clusters list - list Anthos clusters on VMware

SYNOPSIS
    gcloud beta container vmware clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware clusters query-version-config

```text
NAME
    gcloud beta container vmware clusters query-version-config - query versions
        for creating or upgrading an Anthos on VMware user cluster

SYNOPSIS
    gcloud beta container vmware clusters query-version-config
        [--location=LOCATION]
        [--cluster=CLUSTER
          | [--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION; default="global" --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware clusters update

```text
NAME
    gcloud beta container vmware clusters update - update an Anthos cluster on
        VMware

SYNOPSIS
    gcloud beta container vmware clusters update
        (CLUSTER : --location=LOCATION) [--admin-users=ADMIN_USERS] [--async]
        [--description=DESCRIPTION]
        [--metal-lb-config-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL]]
        [--static-ip-config-ip-blocks=[gateway=GATEWAY],
          [ips=IPS],[netmask=NETMASK]]
        [--upgrade-policy=[control-plane-only=CONTROL-PLANE-ONLY]]
        [--validate-only] [--version=VERSION]
        [--add-annotations=[KEY1=VALUE1,KEY2=VALUE2,...]
          | --remove-annotations=[KEY1,KEY2,...]]
        [--cpus=CPUS --memory=MEMORY --disable-auto-resize
          | --enable-auto-resize] [--disable-aag-config | --enable-aag-config]
        [--disable-auto-repair | --enable-auto-repair]
        [--disable-vsphere-csi | --enable-vsphere-csi] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware clusters upgrade

```text
NAME
    gcloud beta container vmware clusters upgrade - centrally upgrade an Anthos
        cluster on VMware

SYNOPSIS
    gcloud beta container vmware clusters upgrade
        (CLUSTER : --location=LOCATION) --version=VERSION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware clusters create

```text
NAME
    gcloud alpha container vmware clusters create - create an Anthos cluster on
        VMware

SYNOPSIS
    gcloud alpha container vmware clusters create
        (CLUSTER : --location=LOCATION) --version=VERSION
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT)
        ((--control-plane-vip=CONTROL_PLANE_VIP --ingress-vip=INGRESS_VIP)
          (--metal-lb-config-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL]
          | --control-plane-node-port=CONTROL_PLANE_NODE_PORT
          --ingress-http-node-port=INGRESS_HTTP_NODE_PORT
          --ingress-https-node-port=INGRESS_HTTPS_NODE_PORT
          --konnectivity-server-node-port=KONNECTIVITY_SERVER_NODE_PORT
          | [--f5-config-address=F5_CONFIG_ADDRESS
          --f5-config-partition=F5_CONFIG_PARTITION
          : --f5-config-snat-pool=F5_CONFIG_SNAT_POOL]))
        (--pod-address-cidr-blocks=POD_ADDRESS
          --service-address-cidr-blocks=SERVICE_ADDRESS
          : --control-plane-ip-block=[gateway=GATEWAY],
          [ips=IPS],[netmask=NETMASK]
          --dns-search-domains=[DNS_SEARCH_DOMAINS,...]
          --dns-servers=[DNS_SERVERS,...]
          --ntp-servers=[NTP_SERVERS,...] --enable-dhcp
          | --static-ip-config-ip-blocks=[gateway=GATEWAY],
          [ips=IPS],[netmask=NETMASK]) [--admin-users=ADMIN_USERS]
        [--annotations=[KEY=VALUE,...]] [--async] [--description=DESCRIPTION]
        [--disable-aag-config] [--disable-vsphere-csi] [--enable-auto-repair]
        [--enable-vm-tracking]
        [--upgrade-policy=[control-plane-only=CONTROL-PLANE-ONLY]]
        [--validate-only]
        [--cpus=CPUS --enable-auto-resize --memory=MEMORY --replicas=REPLICAS]
        [--disable-control-plane-v2 | --enable-control-plane-v2]
        [--enable-advanced-networking --enable-dataplane-v2]
        [--vcenter-ca-cert-data=VCENTER_CA_CERT_DATA
          --vcenter-cluster=VCENTER_CLUSTER
          --vcenter-datacenter=VCENTER_DATACENTER
          --vcenter-datastore=VCENTER_DATASTORE --vcenter-folder=VCENTER_FOLDER
          --vcenter-resource-pool=VCENTER_RESOURCE_POOL
          --vcenter-storage-policy-name=VCENTER_STORAGE_POLICY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Incomplete example: the `create` example gives only the cluster name and `--location`; gcloud 593.0.0 rejects it ("Exactly one of (--metal-lb-config-address-pools | ... | [--f5-config-address ...]) must be specified"), because the SYNOPSIS requires `--admin-cluster-membership`, `--version`, `--control-plane-vip` / `--ingress-vip` and a load balancer configuration (MetalLB address pools, the manual node ports, or the F5 BIG-IP flags). Use the SYNOPSIS and flags on this page to complete the command.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/vmware/clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
