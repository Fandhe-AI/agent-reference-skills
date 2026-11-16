---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/bare-metal/clusters
---

# gcloud container bare-metal clusters (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container bare-metal clusters create

```text
NAME
    gcloud container bare-metal clusters create - create an Anthos cluster on
        bare metal

SYNOPSIS
    gcloud container bare-metal clusters create (CLUSTER : --location=LOCATION)
        --version=VERSION
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT)
        (--control-plane-load-balancer-port=CONTROL_PLANE_LOAD_BALANCER_PORT
          (--control-plane-vip=CONTROL_PLANE_VIP
          --ingress-vip=INGRESS_VIP) (--enable-manual-lb
          | [--bgp-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL] --bgp-asn=BGP_ASN
          --bgp-peer-configs=[asn=ASN,
          ip=IP,control-plane-nodes=NODE_IP_1;NODE_IP_2,...]
          : [--bgp-load-balancer-node-configs=[node-ip=IP,
          labels=KEY1=VALUE1;KEY2=VALUE2,...]
          : --bgp-load-balancer-node-labels=[KEY=VALUE,...]
          --bgp-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
          --bgp-load-balancer-registry-burst=BGP_LOAD_BALANCER_REGISTRY_BURST
          --bgp-load-balancer-registry-pull-qps=BGP_LOAD_BALANCER_REGISTRY_PULL_QPS --disable-bgp-load-balancer-serialize-image-pulls]] | [--metal-lb-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL]
          : --metal-lb-load-balancer-node-configs=[labels=LABELS],
          [node-ip=NODE-IP]
          --metal-lb-load-balancer-node-labels=[KEY=VALUE,...]
          --metal-lb-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
          --disable-metal-lb-load-balancer-serialize-image-pulls
          --metal-lb-load-balancer-registry-burst=METAL_LB_LOAD_BALANCER_REGISTRY_BURST --metal-lb-load-balancer-registry-pull-qps=METAL_LB_LOAD_BALANCER_REGISTRY_PULL_QPS]))
        ((((--control-plane-node-configs=[labels=LABELS],[node-ip=NODE-IP]
          : --control-plane-node-labels=[KEY=VALUE,...]
          --control-plane-node-taints=[KEY=VALUE:EFFECT,...]
          --control-plane-registry-burst=CONTROL_PLANE_REGISTRY_BURST
          --control-plane-registry-pull-qps=CONTROL_PLANE_REGISTRY_PULL_QPS
          --disable-control-plane-serialize-image-pulls)))
          : --api-server-args=[KEY=VALUE,...])
        ((--lvp-node-mounts-config-path=LVP_NODE_MOUNTS_CONFIG_PATH
          --lvp-node-mounts-config-storage-class=LVP_NODE_MOUNTS_CONFIG_STORAGE_CLASS) ((--lvp-share-path=LVP_SHARE_PATH --lvp-share-storage-class=LVP_SHARE_STORAGE_CLASS) : --shared-path-pv-count=SHARED_PATH_PV_COUNT))
        [--admin-users=ADMIN_USERS] [--annotations=[KEY=VALUE,...]] [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--enable-application-logs]
        [--login-user=LOGIN_USER]
        [--maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,
          ...]] [--validate-only]
        [--container-runtime=CONTAINER_RUNTIME
          --max-pods-per-node=MAX_PODS_PER_NODE]
        [[(--island-mode-pod-address-cidr-blocks=POD_ADDRESS,[POD_ADDRESS,...]
          --island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...])
          : --enable-advanced-networking
          --enable-multi-nic-config --enable-sr-iov-config]]
        [--uri=URI : --no-proxy=[NO_PROXY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an Anthos cluster on bare metal.

EXAMPLES
    To create a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container bare-metal clusters create my-cluster \
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
          + set the property container_bare_metal/location.

REQUIRED FLAGS
     --version=VERSION
        Anthos cluster on bare metal version for the user cluster resource.

     Admin cluster membership resource - membership of the admin cluster.
     Membership name is the same as the admin cluster name.

     Examples:

         $ gcloud container bare-metal clusters create
               --admin-cluster-membership=projects/example-project-12345/locations/us-west1/memberships/example-admin-cluster-name

     or

         $ gcloud container bare-metal clusters create
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

     Anthos on bare metal cluster load balancer configuration.

     This must be specified.

       Control plane load balancer port configuration.

       This must be specified.

         --control-plane-load-balancer-port=CONTROL_PLANE_LOAD_BALANCER_PORT
            Control plane load balancer port configuration.

       VIPs used by the load balancer.

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

         Manual load balancer configuration.

         --enable-manual-lb
            ManualLB typed load balancers configuration.

         BGP load balancer configuration.

         --bgp-address-pools=[addresses=ADDRESSES],[avoid-buggy-ips=AVOID-BUGGY-IPS],[manual-assign=MANUAL-ASSIGN],[pool=POOL]
            BGP load balancer address pools configurations.

            Examples:

            To specify configurations for two address pools pool1 and pool2,

                  $ gcloud container bare-metal clusters create example_cluster
                      --bgp-address-pools 'pool=pool1,avoid-buggy-ips=True,manual-assign=True,addresses=192.168.1.1/32;192.168.1.2-192.168.1.3'
                      --bgp-address-pools 'pool=pool2,avoid-buggy-ips=False,manual-assign=False,addresses=192.168.2.1/32;192.168.2.2-192.168.2.3'

            Use quote around the flag value to escape semicolon in the
            terminal.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --bgp-asn=BGP_ASN
            BGP autonomous system number (ASN) of the cluster.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --bgp-peer-configs=[asn=ASN,ip=IP,control-plane-nodes=NODE_IP_1;NODE_IP_2,...]
            List of BGP peers that the cluster will connect to. At least one
            peer must be configured for each control plane node.

            Examples:

            To specify configurations for two peers of BGP autonomous system
            number (ASN) 10000 and 20000,

                  $ gcloud container bare-metal clusters create example_cluster
                      --bgp-peer-configs 'asn=10000,ip=192.168.1.1,control-plane-nodes=192.168.1.2;192.168.1.3'
                      --bgp-peer-configs 'asn=20000,ip=192.168.2.1,control-plane-nodes=192.168.2.2;192.168.2.3'

            Use quote around the flag value to escape semicolon in the
            terminal.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --bgp-load-balancer-node-configs=[node-ip=IP,labels=KEY1=VALUE1;KEY2=VALUE2,...]
            BGP load balancer data plane node configurations.

            Examples:

            To specify configurations for two nodes of IP 192.168.0.1 and
            192.168.1.1,

                  $ gcloud container bare-metal clusters create example_cluster
                      --bgp-load-balancer-node-configs 'node-ip=192.168.0.1,labels=KEY1=VALUE1;KEY2=VALUE2'
                      --bgp-load-balancer-node-configs 'node-ip=192.168.1.1,labels=KEY3=VALUE3'

            Use quote around the flag value to escape semicolon in the
            terminal.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --bgp-load-balancer-node-labels=[KEY=VALUE,...]
            Labels assigned to nodes of a BGP node pool.

         --bgp-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
            Node taint applied to every Kubernetes node in a node pool.

         Modifiable kubelet configurations for bare metal machines.

         --bgp-load-balancer-registry-burst=BGP_LOAD_BALANCER_REGISTRY_BURST
            Maximum size of bursty pulls, temporarily allow pulls to burst to
            this number, while still not exceeding registry_pull_qps.

         --bgp-load-balancer-registry-pull-qps=BGP_LOAD_BALANCER_REGISTRY_PULL_QPS
            Limit of registry pulls per second.

         --disable-bgp-load-balancer-serialize-image-pulls
            If set, prevent the Kubelet from pulling multiple images at a time.

         MetalLB load balancer configuration.

         MetalLB address pools configuration.

         Exactly one of these must be specified:

           --metal-lb-address-pools=[addresses=ADDRESSES],[avoid-buggy-ips=AVOID-BUGGY-IPS],[manual-assign=MANUAL-ASSIGN],[pool=POOL]
              MetalLB load balancer configurations.

              Examples:

              To specify MetalLB load balancer configurations for two address
              pools pool1 and pool2,

                    $ gcloud container bare-metal clusters create example_cluster
                        --metal-lb-address-pools 'pool=pool1,avoid-buggy-ips=True,manual-assign=True,addresses=192.168.1.1/32;192.168.1.2-192.168.1.3'
                        --metal-lb-address-pools 'pool=pool2,avoid-buggy-ips=False,manual-assign=False,addresses=192.168.2.1/32;192.168.2.2-192.168.2.3'

              Use quote around the flag value to escape semicolon in the
              terminal.

         Anthos on bare metal node pool configuration for MetalLB load balancer
         nodes.

         MetalLB Node Pool configuration.

         Populate MetalLB load balancer node config.

         At most one of these can be specified:

           --metal-lb-load-balancer-node-configs=[labels=LABELS],[node-ip=NODE-IP]
              MetalLB load balancer node configuration.

         --metal-lb-load-balancer-node-labels=[KEY=VALUE,...]
            Labels assigned to nodes of a MetalLB node pool.

         --metal-lb-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
            Node taint applied to every node in a MetalLB node pool.

         Modifiable kubelet configurations for bare metal machines.

         --disable-metal-lb-load-balancer-serialize-image-pulls
            If set, prevent the Kubelet from pulling multiple images at a time.

         --metal-lb-load-balancer-registry-burst=METAL_LB_LOAD_BALANCER_REGISTRY_BURST
            Maximum size of bursty pulls, temporarily allow pulls to burst to
            this number, while still not exceeding registry_pull_qps.

         --metal-lb-load-balancer-registry-pull-qps=METAL_LB_LOAD_BALANCER_REGISTRY_PULL_QPS
            Limit of registry pulls per second.

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

             Modifiable kubelet configurations for bare metal machines.

             --control-plane-registry-burst=CONTROL_PLANE_REGISTRY_BURST
                Maximum size of bursty pulls, temporarily allow pulls to burst
                to this number, while still not exceeding registry_pull_qps.

             --control-plane-registry-pull-qps=CONTROL_PLANE_REGISTRY_PULL_QPS
                Limit of registry pulls per second.

             --disable-control-plane-serialize-image-pulls
                If set, prevent the Kubelet from pulling multiple images at a
                time.

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
     Anthos on bare metal cluster security configuration.

     User cluster authorization configurations to bootstrap onto the admin
     cluster

     --admin-users=ADMIN_USERS
        Users that will be granted the cluster-admin role on the cluster,
        providing full access to the cluster.

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

     Anthos on bare metal node access related settings for the user cluster.

     --login-user=LOGIN_USER
        User name used to access node machines.

     Anthos on bare metal cluster maintenance configuration.

     --maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,...]
        IPv4 addresses to be placed into maintenance mode.

     --validate-only
        If set, only validate the request, but do not actually perform the
        operation.

     Anthos on bare metal cluster workload node configuration.

     --container-runtime=CONTAINER_RUNTIME
        Container runtime which will be used in the bare metal user cluster.

     --max-pods-per-node=MAX_PODS_PER_NODE
        Maximum number of pods a node can run.

     Anthos on bare metal cluster network configurations.

     --enable-advanced-networking
        Enables the use of advanced Anthos networking features, such as Bundled
        Load Balancing with BGP or the egress NAT gateway.

     Multiple networking interfaces cluster configurations.

     --enable-multi-nic-config
        If set, enable multiple network interfaces for your pods.

     SR-IOV networking operator configurations.

     --enable-sr-iov-config
        If set, install the SR-IOV operator.

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

        $ gcloud alpha container bare-metal clusters create

        $ gcloud beta container bare-metal clusters create
```

### gcloud container bare-metal clusters delete

```text
NAME
    gcloud container bare-metal clusters delete - delete an Anthos cluster on
        bare metal

SYNOPSIS
    gcloud container bare-metal clusters delete (CLUSTER : --location=LOCATION)
        [--allow-missing] [--async] [--force] [--ignore-errors]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Anthos cluster on bare metal.

EXAMPLES
    To delete a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container bare-metal clusters delete my-cluster \
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
          + set the property container_bare_metal/location.

FLAGS
     --allow-missing
        If set, and the Bare Metal cluster is not found, the request will
        succeed but no action will be taken.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --force
        If set, the operation will also apply to the child node pools. This
        flag is required if the cluster has any associated node pools.

     --ignore-errors
        If set, the deletion of a bare metal user cluster resource will succeed
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

        $ gcloud alpha container bare-metal clusters delete

        $ gcloud beta container bare-metal clusters delete
```

### gcloud container bare-metal clusters describe

```text
NAME
    gcloud container bare-metal clusters describe - describe an Anthos cluster
        on bare metal

SYNOPSIS
    gcloud container bare-metal clusters describe
        (CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Anthos cluster on bare metal.

EXAMPLES
    To describe a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container bare-metal clusters describe my-cluster \
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
          + set the property container_bare_metal/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container bare-metal clusters describe

        $ gcloud beta container bare-metal clusters describe
```

### gcloud container bare-metal clusters enroll

```text
NAME
    gcloud container bare-metal clusters enroll - enroll an Anthos cluster on
        bare metal

SYNOPSIS
    gcloud container bare-metal clusters enroll (CLUSTER : --location=LOCATION)
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enroll an Anthos cluster on bare metal.

EXAMPLES
    To enroll a cluster named my-cluster managed in location us-west1 with
    admin cluster membership of
    projects/my-project/locations/us-west1/memberships/my-admin-cluster-membership,
    run:

        $ gcloud container bare-metal clusters enroll my-cluster \
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
          + set the property container_bare_metal/location.

REQUIRED FLAGS
     Admin cluster membership resource - membership of the admin cluster.
     Membership name is the same as the admin cluster name.

     Examples:

         $ gcloud container bare-metal clusters enroll
               --admin-cluster-membership=projects/example-project-12345/locations/us-west1/memberships/example-admin-cluster-name

     or

         $ gcloud container bare-metal clusters enroll
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container bare-metal clusters enroll

        $ gcloud beta container bare-metal clusters enroll
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud container bare-metal clusters enroll my-cluster \
    --location=us-west1 \
    --admin-cluster-membership=projects/my-project/locations/us-west1/memberships/my-admin-cluster-membership
```

### gcloud container bare-metal clusters list

```text
NAME
    gcloud container bare-metal clusters list - list Anthos clusters on bare
        metal

SYNOPSIS
    gcloud container bare-metal clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Anthos clusters on bare metal.

EXAMPLES
    To lists all clusters managed in location us-west1, run:

        $ gcloud container bare-metal clusters list --location=us-west1

FLAGS
     Location resource - Google Cloud location to list. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

        $ gcloud alpha container bare-metal clusters list

        $ gcloud beta container bare-metal clusters list
```

### gcloud container bare-metal clusters query-version-config

```text
NAME
    gcloud container bare-metal clusters query-version-config - query versions
        for creating or upgrading an Anthos on bare metal user cluster

SYNOPSIS
    gcloud container bare-metal clusters query-version-config
        [--location=LOCATION]
        [--cluster=CLUSTER
          | [--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION; default="global" --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Query versions for creating or upgrading an Anthos on bare metal user
    cluster.

EXAMPLES
    To query all available versions in location us-west1, run:

        $ gcloud container bare-metal clusters query-version-config \
            --location=us-west1

    To query versions for creating a cluster with an admin cluster membership
    named my-admin-cluster-membership managed in project
    my-admin-cluster-project and location us-west, run:

        $ gcloud container bare-metal clusters query-version-config \
            --location=us-west1 \
            --admin-cluster-membership=my-admin-cluster-membership \
            --admin-cluster-membership-project=my-admin-cluster-project

    To query versions for upgrading a user cluster named my-user-cluster in
    location us-west1, run:

        $ gcloud container bare-metal clusters query-version-config \
            --location=us-west1 --cluster=my-user-cluster

FLAGS
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

     Use cases for querying versions.

     At most one of these can be specified:

       Upgrade an Anthos on bare metal user cluster use case.

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
        + set the property container_bare_metal/location.

       --cluster=CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument --cluster on the command line.

       Create an Anthos on bare metal user cluster use case.

       Admin cluster membership resource - membership of the admin cluster to
       query versions for create. Membership name is the same as the admin
       cluster name.

       Examples:

           $ gcloud container bare-metal clusters query-version-config
                 --admin-cluster-membership=projects/example-project-12345/locations/us-west1/memberships/example-admin-cluster-name

       or

           $ gcloud container bare-metal clusters query-version-config
                 --admin-cluster-membership-project=example-project-12345
                 --admin-cluster-membership-location=us-west1
                 --admin-cluster-membership=example-admin-cluster-name

           The arguments in this group can be used to specify the attributes of this resource.

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

        $ gcloud alpha container bare-metal clusters query-version-config

        $ gcloud beta container bare-metal clusters query-version-config
```

### gcloud container bare-metal clusters update

```text
NAME
    gcloud container bare-metal clusters update - update an Anthos cluster on
        bare metal

SYNOPSIS
    gcloud container bare-metal clusters update (CLUSTER : --location=LOCATION)
        [--admin-users=ADMIN_USERS] [--allow-missing] [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--enable-application-logs]
        [--login-user=LOGIN_USER]
        [--maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,
          ...]] [--validate-only] [--version=VERSION]
        [--add-annotations=[KEY1=VALUE1,KEY2=VALUE2,...]
          | --remove-annotations=[KEY1,KEY2,...]]
        [--api-server-args=[KEY=VALUE,...]
          --control-plane-node-configs=[labels=LABELS],[node-ip=NODE-IP]
          --control-plane-node-labels=[KEY=VALUE,...]
          --control-plane-node-taints=[KEY=VALUE:EFFECT,...]
          --control-plane-registry-burst=CONTROL_PLANE_REGISTRY_BURST
          --control-plane-registry-pull-qps=CONTROL_PLANE_REGISTRY_PULL_QPS
          --disable-control-plane-serialize-image-pulls
          | --enable-control-plane-serialize-image-pulls]
        [--bgp-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL] --bgp-asn=BGP_ASN
          --bgp-peer-configs=[asn=ASN,
          ip=IP,control-plane-nodes=NODE_IP_1;NODE_IP_2,...]
          --bgp-load-balancer-node-configs=[node-ip=IP,
          labels=KEY1=VALUE1;KEY2=VALUE2,...]
          --bgp-load-balancer-node-labels=[KEY=VALUE,...]
          --bgp-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
          --bgp-load-balancer-registry-burst=BGP_LOAD_BALANCER_REGISTRY_BURST
          --bgp-load-balancer-registry-pull-qps=BGP_LOAD_BALANCER_REGISTRY_PULL_QPS --disable-bgp-load-balancer-serialize-image-pulls | --enable-bgp-load-balancer-serialize-image-pulls | --metal-lb-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL]
          --metal-lb-load-balancer-node-configs=[labels=LABELS],
          [node-ip=NODE-IP]
          --metal-lb-load-balancer-node-labels=[KEY=VALUE,...]
          --metal-lb-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
          --metal-lb-load-balancer-registry-burst=METAL_LB_LOAD_BALANCER_REGISTRY_BURST --metal-lb-load-balancer-registry-pull-qps=METAL_LB_LOAD_BALANCER_REGISTRY_PULL_QPS --disable-metal-lb-load-balancer-serialize-image-pulls | --enable-metal-lb-load-balancer-serialize-image-pulls]
        [--island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...]
          --disable-sr-iov-config | --enable-sr-iov-config]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Anthos cluster on bare metal.

EXAMPLES
    To update a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container bare-metal clusters update my-cluster \
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
          + set the property container_bare_metal/location.

FLAGS
     Anthos on bare metal cluster security configuration.

     User cluster authorization configurations to bootstrap onto the admin
     cluster

     --admin-users=ADMIN_USERS
        Users that will be granted the cluster-admin role on the cluster,
        providing full access to the cluster.

     --allow-missing
        If set, and the Anthos cluster on bare metal is not found, the update
        request will try to create a new cluster with the provided
        configuration.

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

     Anthos on bare metal node access related settings for the user cluster.

     --login-user=LOGIN_USER
        User name used to access node machines.

     Anthos on bare metal cluster maintenance configuration.

     --maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,...]
        IPv4 addresses to be placed into maintenance mode.

     --validate-only
        If set, only validate the request, but do not actually perform the
        operation.

     --version=VERSION
        Anthos cluster on bare metal version for the user cluster resource.

     At most one of these can be specified:

       --add-annotations=[KEY1=VALUE1,KEY2=VALUE2,...]
          Add the given key-value pairs to the current annotations, or update
          its value if the key already exists.

       --remove-annotations=[KEY1,KEY2,...]
          Remove annotations of the given keys.

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

     Modifiable kubelet configurations for bare metal machines.

     --control-plane-registry-burst=CONTROL_PLANE_REGISTRY_BURST
        Maximum size of bursty pulls, temporarily allow pulls to burst to this
        number, while still not exceeding registry_pull_qps.

     --control-plane-registry-pull-qps=CONTROL_PLANE_REGISTRY_PULL_QPS
        Limit of registry pulls per second.

     At most one of these can be specified:

       --disable-control-plane-serialize-image-pulls
          If set, prevent the Kubelet from pulling multiple images at a time.

       --enable-control-plane-serialize-image-pulls
          If set, enable the Kubelet to pull multiple images at a time.

     Anthos on bare metal cluster load balancer configuration.

     Populate one of the load balancers.

     At most one of these can be specified:

       BGP load balancer configuration.

       --bgp-address-pools=[addresses=ADDRESSES],[avoid-buggy-ips=AVOID-BUGGY-IPS],[manual-assign=MANUAL-ASSIGN],[pool=POOL]
          BGP load balancer address pools configurations.

          Examples:

          To specify configurations for two address pools pool1 and pool2,

                $ gcloud container bare-metal clusters update example_cluster
                    --bgp-address-pools 'pool=pool1,avoid-buggy-ips=True,manual-assign=True,addresses=192.168.1.1/32;192.168.1.2-192.168.1.3'
                    --bgp-address-pools 'pool=pool2,avoid-buggy-ips=False,manual-assign=False,addresses=192.168.2.1/32;192.168.2.2-192.168.2.3'

          Use quote around the flag value to escape semicolon in the terminal.

       --bgp-asn=BGP_ASN
          BGP autonomous system number (ASN) of the cluster.

       --bgp-peer-configs=[asn=ASN,ip=IP,control-plane-nodes=NODE_IP_1;NODE_IP_2,...]
          List of BGP peers that the cluster will connect to. At least one peer
          must be configured for each control plane node.

          Examples:

          To specify configurations for two peers of BGP autonomous system
          number (ASN) 10000 and 20000,

                $ gcloud container bare-metal clusters update example_cluster
                    --bgp-peer-configs 'asn=10000,ip=192.168.1.1,control-plane-nodes=192.168.1.2;192.168.1.3'
                    --bgp-peer-configs 'asn=20000,ip=192.168.2.1,control-plane-nodes=192.168.2.2;192.168.2.3'

          Use quote around the flag value to escape semicolon in the terminal.

       --bgp-load-balancer-node-configs=[node-ip=IP,labels=KEY1=VALUE1;KEY2=VALUE2,...]
          BGP load balancer data plane node configurations.

          Examples:

          To specify configurations for two nodes of IP 192.168.0.1 and
          192.168.1.1,

                $ gcloud container bare-metal clusters update example_cluster
                    --bgp-load-balancer-node-configs 'node-ip=192.168.0.1,labels=KEY1=VALUE1;KEY2=VALUE2'
                    --bgp-load-balancer-node-configs 'node-ip=192.168.1.1,labels=KEY3=VALUE3'

          Use quote around the flag value to escape semicolon in the terminal.

       --bgp-load-balancer-node-labels=[KEY=VALUE,...]
          Labels assigned to nodes of a BGP node pool.

       --bgp-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
          Node taint applied to every Kubernetes node in a node pool.

       Modifiable kubelet configurations for bare metal machines.

       --bgp-load-balancer-registry-burst=BGP_LOAD_BALANCER_REGISTRY_BURST
          Maximum size of bursty pulls, temporarily allow pulls to burst to
          this number, while still not exceeding registry_pull_qps.

       --bgp-load-balancer-registry-pull-qps=BGP_LOAD_BALANCER_REGISTRY_PULL_QPS
          Limit of registry pulls per second.

       At most one of these can be specified:

         --disable-bgp-load-balancer-serialize-image-pulls
            If set, prevent the Kubelet from pulling multiple images at a time.

         --enable-bgp-load-balancer-serialize-image-pulls
            If set, enable the Kubelet to pull multiple images at a time.

       MetalLB load balancer configuration.

       MetalLB address pools configuration.

       At most one of these can be specified:

         --metal-lb-address-pools=[addresses=ADDRESSES],[avoid-buggy-ips=AVOID-BUGGY-IPS],[manual-assign=MANUAL-ASSIGN],[pool=POOL]
            MetalLB load balancer configurations.

            Examples:

            To specify MetalLB load balancer configurations for two address
            pools pool1 and pool2,

                  $ gcloud container bare-metal clusters update example_cluster
                      --metal-lb-address-pools 'pool=pool1,avoid-buggy-ips=True,manual-assign=True,addresses=192.168.1.1/32;192.168.1.2-192.168.1.3'
                      --metal-lb-address-pools 'pool=pool2,avoid-buggy-ips=False,manual-assign=False,addresses=192.168.2.1/32;192.168.2.2-192.168.2.3'

            Use quote around the flag value to escape semicolon in the
            terminal.

       Anthos on bare metal node pool configuration for MetalLB load balancer
       nodes.

       MetalLB Node Pool configuration.

       Populate MetalLB load balancer node config.

       At most one of these can be specified:

         --metal-lb-load-balancer-node-configs=[labels=LABELS],[node-ip=NODE-IP]
            MetalLB load balancer node configuration.

       --metal-lb-load-balancer-node-labels=[KEY=VALUE,...]
          Labels assigned to nodes of a MetalLB node pool.

       --metal-lb-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
          Node taint applied to every node in a MetalLB node pool.

       Modifiable kubelet configurations for bare metal machines.

       --metal-lb-load-balancer-registry-burst=METAL_LB_LOAD_BALANCER_REGISTRY_BURST
          Maximum size of bursty pulls, temporarily allow pulls to burst to
          this number, while still not exceeding registry_pull_qps.

       --metal-lb-load-balancer-registry-pull-qps=METAL_LB_LOAD_BALANCER_REGISTRY_PULL_QPS
          Limit of registry pulls per second.

       At most one of these can be specified:

         --disable-metal-lb-load-balancer-serialize-image-pulls
            If set, prevent the Kubelet from pulling multiple images at a time.

         --enable-metal-lb-load-balancer-serialize-image-pulls
            If set, enable the Kubelet to pull multiple images at a time.

     Anthos on bare metal cluster network configurations.

     Populate one of the network configs.

     Island mode CIDR network configuration.

     --island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...]
        IPv4 address range for all services in the cluster.

     SR-IOV networking operator configurations.

     At most one of these can be specified:

       --disable-sr-iov-config
          If set, the SR-IOV operator won't be installed.

       --enable-sr-iov-config
          If set, install the SR-IOV operator.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container bare-metal clusters update

        $ gcloud beta container bare-metal clusters update
```

### gcloud beta container bare-metal clusters create

```text
NAME
    gcloud beta container bare-metal clusters create - create an Anthos cluster
        on bare metal

SYNOPSIS
    gcloud beta container bare-metal clusters create
        (CLUSTER : --location=LOCATION) --version=VERSION
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT)
        (--control-plane-load-balancer-port=CONTROL_PLANE_LOAD_BALANCER_PORT
          (--control-plane-vip=CONTROL_PLANE_VIP
          --ingress-vip=INGRESS_VIP) (--enable-manual-lb
          | [--bgp-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL] --bgp-asn=BGP_ASN
          --bgp-peer-configs=[asn=ASN,
          ip=IP,control-plane-nodes=NODE_IP_1;NODE_IP_2,...]
          : [--bgp-load-balancer-node-configs=[node-ip=IP,
          labels=KEY1=VALUE1;KEY2=VALUE2,...]
          : --bgp-load-balancer-node-labels=[KEY=VALUE,...]
          --bgp-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
          --bgp-load-balancer-registry-burst=BGP_LOAD_BALANCER_REGISTRY_BURST
          --bgp-load-balancer-registry-pull-qps=BGP_LOAD_BALANCER_REGISTRY_PULL_QPS --disable-bgp-load-balancer-serialize-image-pulls]] | [--metal-lb-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL]
          : --metal-lb-load-balancer-node-configs=[labels=LABELS],
          [node-ip=NODE-IP]
          --metal-lb-load-balancer-node-labels=[KEY=VALUE,...]
          --metal-lb-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
          --disable-metal-lb-load-balancer-serialize-image-pulls
          --metal-lb-load-balancer-registry-burst=METAL_LB_LOAD_BALANCER_REGISTRY_BURST --metal-lb-load-balancer-registry-pull-qps=METAL_LB_LOAD_BALANCER_REGISTRY_PULL_QPS]))
        ((((--control-plane-node-configs=[labels=LABELS],[node-ip=NODE-IP]
          : --control-plane-node-labels=[KEY=VALUE,...]
          --control-plane-node-taints=[KEY=VALUE:EFFECT,...]
          --control-plane-registry-burst=CONTROL_PLANE_REGISTRY_BURST
          --control-plane-registry-pull-qps=CONTROL_PLANE_REGISTRY_PULL_QPS
          --disable-control-plane-serialize-image-pulls)))
          : --api-server-args=[KEY=VALUE,...])
        ((--lvp-node-mounts-config-path=LVP_NODE_MOUNTS_CONFIG_PATH
          --lvp-node-mounts-config-storage-class=LVP_NODE_MOUNTS_CONFIG_STORAGE_CLASS) ((--lvp-share-path=LVP_SHARE_PATH --lvp-share-storage-class=LVP_SHARE_STORAGE_CLASS) : --shared-path-pv-count=SHARED_PATH_PV_COUNT))
        [--admin-users=ADMIN_USERS] [--annotations=[KEY=VALUE,...]] [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--enable-application-logs]
        [--login-user=LOGIN_USER]
        [--maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,
          ...]] [--validate-only]
        [--container-runtime=CONTAINER_RUNTIME
          --max-pods-per-node=MAX_PODS_PER_NODE]
        [[(--island-mode-pod-address-cidr-blocks=POD_ADDRESS,[POD_ADDRESS,...]
          --island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...])
          : --enable-advanced-networking
          --enable-multi-nic-config --enable-sr-iov-config]]
        [--uri=URI : --no-proxy=[NO_PROXY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal clusters delete

```text
NAME
    gcloud beta container bare-metal clusters delete - delete an Anthos cluster
        on bare metal

SYNOPSIS
    gcloud beta container bare-metal clusters delete
        (CLUSTER : --location=LOCATION) [--allow-missing] [--async] [--force]
        [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal clusters describe

```text
NAME
    gcloud beta container bare-metal clusters describe - describe an Anthos
        cluster on bare metal

SYNOPSIS
    gcloud beta container bare-metal clusters describe
        (CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal clusters enroll

```text
NAME
    gcloud beta container bare-metal clusters enroll - enroll an Anthos cluster
        on bare metal

SYNOPSIS
    gcloud beta container bare-metal clusters enroll
        (CLUSTER : --location=LOCATION)
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal clusters list

```text
NAME
    gcloud beta container bare-metal clusters list - list Anthos clusters on
        bare metal

SYNOPSIS
    gcloud beta container bare-metal clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Incomplete example: the `create` example gives only the cluster name and `--location`; gcloud 593.0.0 rejects it ("Exactly one of (--enable-manual-lb | [--bgp-address-pools ...]) ... must be specified"), because the SYNOPSIS requires `--admin-cluster-membership`, `--version`, a load balancer mode (`--enable-manual-lb`, the BGP flags or the MetalLB flags), the control plane node configuration and the network flags. Use the SYNOPSIS and flags on this page to complete the command.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/bare-metal/clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
