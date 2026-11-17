---
source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/cloud-vm-clusters
---

# gcloud oracle-database cloud-vm-clusters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud oracle-database cloud-vm-clusters create

```text
NAME
    gcloud oracle-database cloud-vm-clusters create - create a new
        CloudVmCluster

SYNOPSIS
    gcloud oracle-database cloud-vm-clusters create CLOUD_VM_CLUSTER
        --exadata-infrastructure=EXADATA_INFRASTRUCTURE [--async]
        [--backup-odb-subnet=BACKUP_ODB_SUBNET]
        [--backup-subnet-cidr=BACKUP_SUBNET_CIDR] [--cidr=CIDR]
        [--display-name=DISPLAY_NAME]
        [--exascale-db-storage-vault=EXASCALE_DB_STORAGE_VAULT]
        [--identity-connector-disabled] [--labels=[LABELS,...]]
        [--location=LOCATION] [--network=NETWORK] [--odb-dns-zone=ODB_DNS_ZONE]
        [--odb-network=ODB_NETWORK] [--odb-subnet=ODB_SUBNET]
        [--request-id=REQUEST_ID]
        [[--properties-cpu-core-count=PROPERTIES_CPU_CORE_COUNT
          --properties-license-type=PROPERTIES_LICENSE_TYPE
          : --properties-cluster-name=PROPERTIES_CLUSTER_NAME
          --properties-data-storage-size-tb=PROPERTIES_DATA_STORAGE_SIZE_TB
          --properties-db-node-storage-size-gb=PROPERTIES_DB_NODE_STORAGE_SIZE_GB --properties-db-server-ocids=[PROPERTIES_DB_SERVER_OCIDS,
          ...] --properties-disk-redundancy=PROPERTIES_DISK_REDUNDANCY
          --properties-gi-version=PROPERTIES_GI_VERSION
          --properties-hostname-prefix=PROPERTIES_HOSTNAME_PREFIX
          --properties-local-backup-enabled
          --properties-memory-size-gb=PROPERTIES_MEMORY_SIZE_GB
          --properties-node-count=PROPERTIES_NODE_COUNT
          --properties-ocpu-count=PROPERTIES_OCPU_COUNT
          --properties-scan-listener-port-tcp=PROPERTIES_SCAN_LISTENER_PORT_TCP
          --properties-scan-listener-port-tcp-ssl=PROPERTIES_SCAN_LISTENER_PORT_TCP_SSL --properties-sparse-diskgroup-enabled --properties-ssh-public-keys=[PROPERTIES_SSH_PUBLIC_KEYS,
          ...] --properties-system-version=PROPERTIES_SYSTEM_VERSION
          --properties-vm-backup-storage-type=PROPERTIES_VM_BACKUP_STORAGE_TYPE
          --properties-vm-file-system-storage-type=PROPERTIES_VM_FILE_SYSTEM_STORAGE_TYPE --diagnostics-data-collection-options-events-enabled --diagnostics-data-collection-options-health-monitoring-enabled --diagnostics-data-collection-options-incident-logs-enabled --time-zone-id=TIME_ZONE_ID --time-zone-version=TIME_ZONE_VERSION]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new CloudVmCluster.

EXAMPLES
    Choose an available gi-versions in your location by running gcloud
    oracle-database db-system-shapes list --location=us-east4. To create
    CloudVmCluster instance with id my-instance in the location us-east4 with
    display-name my instance, odb-network
    projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork,
    odb-subnet
    projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork/odbSubnets/my-odbsubnet,
    backup-odb-subnet
    projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork/odbSubnets/my-backup-odbsubnet,
    cidr 10.1.0.0/24, network
    projects/my-project/locations/global/networks/default, backup-subnet-cidr
    10.2.0.0/24, license-type LICENSE_INCLUDED, ssh-public-keys
    VtTxzlPJtIivthmLOmWdRDFy5l27pKUTwLp02, hostname-prefix hostname1,
    cpu-core-count 4 and choosen gi-version xx.0.0.0, run:

    To set the network configuration use one of the following options:

    ODBNetwork based configuration(This is the recommended way):

        $ gcloud oracle-database cloud-vm-clusters create my-instance \
            --location=us-east4 --display-name="my instance" \
            --odb-network=projects/network-project/locations/us-east4/\
        odbNetworks/my-odbnetwork \
            --odb-subnet=projects/network-project/locations/us-east4/\
        odbNetworks/my-odbnetwork/odbSubnets/my-odbsubnet \
            --backup-odb-subnet=projects/network-project/locations/\
        us-east4/odbNetworks/my-odbnetwork/odbSubnets/my-backup-odbsubnet \
            --properties-license-type=LICENSE_INCLUDED \
            --properties-ssh-public-keys="VtTxzlPJtIivthmLOmWdRDFy5l27pKUTwL\
        p02" --properties-gi-version=xx.0.0.0 \
            --properties-hostname-prefix=hostname1 \
            --properties-cpu-core-count=4

    To use a custom domain name for the CloudVmCluster, create an OdbDnsZone
    under the same OdbNetwork and pass it with --odb-dns-zone:

        $ gcloud oracle-database cloud-vm-clusters create my-instance \
            --location=us-east4 --display-name="my instance" \
            --odb-network=projects/network-project/locations/us-east4/\
        odbNetworks/my-odbnetwork \
            --odb-subnet=projects/network-project/locations/us-east4/\
        odbNetworks/my-odbnetwork/odbSubnets/my-odbsubnet \
            --backup-odb-subnet=projects/network-project/locations/\
        us-east4/odbNetworks/my-odbnetwork/odbSubnets/my-backup-odbsubnet \
            --odb-dns-zone=projects/network-project/locations/us-east4/\
        odbNetworks/my-odbnetwork/odbDnsZones/my-odb-dns-zone \
            --properties-license-type=LICENSE_INCLUDED \
            --properties-ssh-public-keys="VtTxzlPJtIivthmLOmWdRDFy5l27pKUTwL\
        p02" --properties-gi-version=xx.0.0.0 \
            --properties-hostname-prefix=hostname1 \
            --properties-cpu-core-count=4

    Network and CIDR based configuration:

        $ gcloud oracle-database cloud-vm-clusters create my-instance \
            --location=us-east4 --display-name="my instance" \
            --cidr=10.1.0.0/24 \
            --network=projects/my-project/locations/global/networks/\
        default --backup-subnet-cidr=10.2.0.0/24 \
            --properties-license-type=LICENSE_INCLUDED \
            --properties-ssh-public-keys="VtTxzlPJtIivthmLOmWdRDFy5l27pKUTwL\
        p02" --properties-gi-version=xx.0.0.0 \
            --properties-hostname-prefix=hostname1 \
            --properties-cpu-core-count=4

POSITIONAL ARGUMENTS
     CloudVmCluster resource - Identifier. The name of the VM Cluster resource
     with the format:
     projects/{project}/locations/{region}/cloudVmClusters/{cloud_vm_cluster}
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument cloud_vm_cluster on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument cloud_vm_cluster on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       CLOUD_VM_CLUSTER
          ID of the cloudVmCluster or fully qualified identifier for the
          cloudVmCluster.

          To set the cloud_vm_cluster attribute:
          + provide the argument cloud_vm_cluster on the command line.

REQUIRED FLAGS
     CloudExadataInfrastructure resource - The name of the Exadata
     Infrastructure resource on which VM cluster resource is created, in the
     following format:
     projects/{project}/locations/{region}/cloudExadataInfrastuctures/{cloud_extradata_infrastructure}
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --exadata-infrastructure on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --exadata-infrastructure on the command line
        with a fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       --exadata-infrastructure=EXADATA_INFRASTRUCTURE
          ID of the cloudExadataInfrastructure or fully qualified identifier
          for the cloudExadataInfrastructure.

          To set the cloud-exadata-infrastructure attribute:
          + provide the argument --exadata-infrastructure on the command
            line.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     OdbSubnet resource - The name of the backup OdbSubnet associated with the
     VM Cluster. Format:
     projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --backup-odb-subnet on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --backup-odb-subnet on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     To set the odb-network attribute:
      * provide the argument --backup-odb-subnet on the command line with a
        fully specified name;
      * provide the argument --odb-network on the command line.

     --backup-odb-subnet=BACKUP_ODB_SUBNET
        ID of the odbSubnet or fully qualified identifier for the odbSubnet.

        To set the odb-subnet attribute:
        * provide the argument --backup-odb-subnet on the command line.

     --backup-subnet-cidr=BACKUP_SUBNET_CIDR
        CIDR range of the backup subnet.

     --cidr=CIDR
        Network settings. CIDR to use for cluster IP allocation.

     --display-name=DISPLAY_NAME
        User friendly name for this resource.

     ExascaleDbStorageVault resource - The name of ExascaleDbStorageVault
     associated with the VM Cluster. Format:
     projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault}
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --exascale-db-storage-vault on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --exascale-db-storage-vault on the command line
        with a fully specified name;
      * provide the argument --location on the command line.

     --exascale-db-storage-vault=EXASCALE_DB_STORAGE_VAULT
        ID of the exascaleDbStorageVault or fully qualified identifier for the
        exascaleDbStorageVault.

        To set the exascale-db-storage-vault attribute:
        * provide the argument --exascale-db-storage-vault on the command
          line.

     --identity-connector-disabled
        If set to true, disables the automatic provisioning of the Workload
        Identity Connector during creation. If set to false or omitted, the
        Workload Identity Connector will be automatically provisioned by
        default. Note: Provisioning the Workload Identity Connector is a
        prerequisite for enabling Google Cloud CMEK.

     --labels=[LABELS,...]
        Labels or tags associated with the VM Cluster.

         KEY
            Keys must start with a lowercase character and contain only hyphens
            (-), underscores (_), lowercase characters, and numbers.

         VALUE
            Values must contain only hyphens (-), underscores (_), lowercase
            characters, and numbers.

        Shorthand Example:

            --labels=string=string

        JSON Example:

            --labels='{"string": "string"}'

        File Example:

            --labels=path_to_file.(yaml|json)

     --location=LOCATION
        For resources [backup-odb-subnet, cloud_vm_cluster,
        exadata-infrastructure, exascale-db-storage-vault, odb-dns-zone,
        odb-network, odb-subnet], provides fallback value for resource location
        attribute. When the resource's full URI path is not provided, location
        will fallback to this flag value.

     Network resource - The name of the VPC network. Format:
     projects/{project}/global/networks/{network} This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --network=NETWORK
        ID of the network or fully qualified identifier for the network.

        To set the network attribute:
        * provide the argument --network on the command line.

     OdbDnsZone resource - The name of the OdbDnsZone for using custom domain
     name for the VM Cluster. Format:
     projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbDnsZones/{odb_dns_zone}
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --odb-dns-zone on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --odb-dns-zone on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     To set the odb-network attribute:
      * provide the argument --odb-dns-zone on the command line with a fully
        specified name;
      * provide the argument --odb-network on the command line.

     --odb-dns-zone=ODB_DNS_ZONE
        ID of the odbDnsZone or fully qualified identifier for the odbDnsZone.

        To set the odb-dns-zone attribute:
        * provide the argument --odb-dns-zone on the command line.

     --odb-network=ODB_NETWORK
        For resources [backup-odb-subnet, odb-dns-zone, odb-network,
        odb-subnet], provides fallback value for resource odb-network
        attribute. When the resource's full URI path is not provided,
        odb-network will fallback to this flag value.

     OdbSubnet resource - The name of the OdbSubnet associated with the VM
     Cluster for IP allocation. Format:
     projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --odb-subnet on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --odb-subnet on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     To set the odb-network attribute:
      * provide the argument --odb-subnet on the command line with a fully
        specified name;
      * provide the argument --odb-network on the command line.

     --odb-subnet=ODB_SUBNET
        ID of the odbSubnet or fully qualified identifier for the odbSubnet.

        To set the odb-subnet attribute:
        * provide the argument --odb-subnet on the command line.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     Various properties and settings associated with Exadata VM cluster.

     --properties-cpu-core-count=PROPERTIES_CPU_CORE_COUNT
        Number of enabled CPU cores.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --properties-license-type=PROPERTIES_LICENSE_TYPE
        License type of VM Cluster. PROPERTIES_LICENSE_TYPE must be one of:

         bring-your-own-license
            Bring your own license
         license-included
            License included part of offer

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --properties-cluster-name=PROPERTIES_CLUSTER_NAME
        OCI Cluster name.

     --properties-data-storage-size-tb=PROPERTIES_DATA_STORAGE_SIZE_TB
        The data disk group size to be allocated in TBs.

     --properties-db-node-storage-size-gb=PROPERTIES_DB_NODE_STORAGE_SIZE_GB
        Local storage per VM.

     --properties-db-server-ocids=[PROPERTIES_DB_SERVER_OCIDS,...]
        OCID of database servers.

     --properties-disk-redundancy=PROPERTIES_DISK_REDUNDANCY
        The type of redundancy. PROPERTIES_DISK_REDUNDANCY must be one of:

         high
            High - 3 way mirror.
         normal
            Normal - 2 way mirror.

     --properties-gi-version=PROPERTIES_GI_VERSION
        Grid Infrastructure Version.

     --properties-hostname-prefix=PROPERTIES_HOSTNAME_PREFIX
        Prefix for VM cluster host names.

     --properties-local-backup-enabled
        Use local backup.

     --properties-memory-size-gb=PROPERTIES_MEMORY_SIZE_GB
        Memory allocated in GBs.

     --properties-node-count=PROPERTIES_NODE_COUNT
        Number of database servers.

     --properties-ocpu-count=PROPERTIES_OCPU_COUNT
        OCPU count per VM. Minimum is 0.1.

     --properties-scan-listener-port-tcp=PROPERTIES_SCAN_LISTENER_PORT_TCP
        SCAN listener port - TCP

     --properties-scan-listener-port-tcp-ssl=PROPERTIES_SCAN_LISTENER_PORT_TCP_SSL
        SCAN listener port - TLS

     --properties-sparse-diskgroup-enabled
        Use exadata sparse snapshots.

     --properties-ssh-public-keys=[PROPERTIES_SSH_PUBLIC_KEYS,...]
        SSH public keys to be stored with cluster.

     --properties-system-version=PROPERTIES_SYSTEM_VERSION
        Operating system version of the image.

     --properties-vm-backup-storage-type=PROPERTIES_VM_BACKUP_STORAGE_TYPE
        Specifies whether VM backups are stored on local DB server storage or
        Exascale storage. PROPERTIES_VM_BACKUP_STORAGE_TYPE must be one of:

         vm-backup-storage-type-exascale
            Exascale storage.
         vm-backup-storage-type-local
            Local DB server storage.

     --properties-vm-file-system-storage-type=PROPERTIES_VM_FILE_SYSTEM_STORAGE_TYPE
        Specifies whether VM file system storage / VM images are stored on
        local DB server storage or Exascale storage.
        PROPERTIES_VM_FILE_SYSTEM_STORAGE_TYPE must be one of:

         vm-file-system-storage-type-exascale
            Exascale storage.
         vm-file-system-storage-type-local
            Local DB server storage.

     Data collection options for diagnostics.

     --diagnostics-data-collection-options-events-enabled
        Indicates whether diagnostic collection is enabled for the VM cluster

     --diagnostics-data-collection-options-health-monitoring-enabled
        Indicates whether health monitoring is enabled for the VM cluster

     --diagnostics-data-collection-options-incident-logs-enabled
        Indicates whether incident logs and trace collection are enabled for
        the VM cluster

     Represents a time zone from the IANA Time Zone Database
     (https://www.iana.org/time-zones).

     --time-zone-id=TIME_ZONE_ID
        IANA Time Zone Database time zone. For example "America/New_York".

     --time-zone-version=TIME_ZONE_VERSION
        IANA Time Zone Database version number. For example "2019a".

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud oracle-database cloud-vm-clusters create my-instance \
    --location=us-east4 \
    --display-name="my instance" \
    --odb-network=projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork \
    --odb-subnet=projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork/odbSubnets/my-odbsubnet \
    --backup-odb-subnet=projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork/odbSubnets/my-backup-odbsubnet \
    --properties-license-type=license-included \
    --properties-ssh-public-keys="VtTxzlPJtIivthmLOmWdRDFy5l27pKUTwLp02" \
    --properties-gi-version=xx.0.0.0 \
    --properties-hostname-prefix=hostname1 \
    --properties-cpu-core-count=4

gcloud oracle-database cloud-vm-clusters create my-instance \
    --location=us-east4 \
    --display-name="my instance" \
    --odb-network=projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork \
    --odb-subnet=projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork/odbSubnets/my-odbsubnet \
    --backup-odb-subnet=projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork/odbSubnets/my-backup-odbsubnet \
    --odb-dns-zone=projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork/odbDnsZones/my-odb-dns-zone \
    --properties-license-type=license-included \
    --properties-ssh-public-keys="VtTxzlPJtIivthmLOmWdRDFy5l27pKUTwLp02" \
    --properties-gi-version=xx.0.0.0 \
    --properties-hostname-prefix=hostname1 \
    --properties-cpu-core-count=4

gcloud oracle-database cloud-vm-clusters create my-instance \
    --location=us-east4 \
    --display-name="my instance" \
    --cidr=10.1.0.0/24 \
    --network=projects/my-project/global/networks/default \
    --backup-subnet-cidr=10.2.0.0/24 \
    --properties-license-type=license-included \
    --properties-ssh-public-keys="VtTxzlPJtIivthmLOmWdRDFy5l27pKUTwLp02" \
    --properties-gi-version=xx.0.0.0 \
    --properties-hostname-prefix=hostname1 \
    --properties-cpu-core-count=4
```

### gcloud oracle-database cloud-vm-clusters db-nodes list

```text
NAME
    gcloud oracle-database cloud-vm-clusters db-nodes list - list all DbNodes

SYNOPSIS
    gcloud oracle-database cloud-vm-clusters db-nodes list
        [--cloud-vm-cluster=CLOUD_VM_CLUSTER
          --exadb-vm-cluster=EXADB_VM_CLUSTER --location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all DbNodes.

EXAMPLES
    To list all DbNodes in the location us-east4, run:

        $ gcloud oracle-database cloud-vm-clusters db-nodes list \
            --location=us-east4

FLAGS
     CloudVmClusterOrExadbVmCluster resource - The parent value for database
     node in the following format:
     projects/{project}/locations/{location}/cloudVmClusters/{cloudVmCluster}.
     . The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --exadb-vm-cluster on the command line with a
        fully specified name;
      * provide the argument --cloud-vm-cluster on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [cloudVmCluster, exadbVmCluster].

     --cloud-vm-cluster=CLOUD_VM_CLUSTER
        ID of the cloudVmClusterOrExadbVmCluster or fully qualified identifier
        for the cloudVmClusterOrExadbVmCluster.

        To set the cloud_vm_cluster attribute:
        * provide the argument --cloud-vm-cluster on the command line. Must
          be specified for resource of type [cloudVmCluster].

     --exadb-vm-cluster=EXADB_VM_CLUSTER
        ID of the cloudVmClusterOrExadbVmCluster or fully qualified identifier
        for the cloudVmClusterOrExadbVmCluster.

        To set the exadb_vm_cluster attribute:
        * provide the argument --exadb-vm-cluster on the command line. Must
          be specified for resource of type [exadbVmCluster].

     --location=LOCATION
        The location id of the cloudVmClusterOrExadbVmCluster resource.

        To set the location attribute:
        * provide the argument --exadb-vm-cluster on the command line with a
          fully specified name;
        * provide the argument --cloud-vm-cluster on the command line with a
          fully specified name;
        * provide the argument --location on the command line.

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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database cloud-vm-clusters delete

```text
NAME
    gcloud oracle-database cloud-vm-clusters delete - delete a CloudVmCluster

SYNOPSIS
    gcloud oracle-database cloud-vm-clusters delete
        (CLOUD_VM_CLUSTER : --location=LOCATION) [--async] [--force]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a CloudVmCluster.

EXAMPLES
    To delete a CloudVmCluster with id my-instance in the location us-east4,
    run:

        $ gcloud oracle-database cloud-vm-clusters delete my-instance \
            --location=us-east4

POSITIONAL ARGUMENTS
     CloudVmCluster resource - The name of the Cloud VM Cluster in the
     following format:
     projects/{project}/locations/{location}/cloudVmClusters/{cloud_vm_cluster}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument cloud_vm_cluster on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLOUD_VM_CLUSTER
          ID of the cloudVmCluster or fully qualified identifier for the
          cloudVmCluster.

          To set the cloud_vm_cluster attribute:
          + provide the argument cloud_vm_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the cloudVmCluster resource.

          To set the location attribute:
          + provide the argument cloud_vm_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --force
        If set to true, all child resources for the VM Cluster will be deleted.
        A VM Cluster can only be deleted once all its child resources have been
        deleted.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database cloud-vm-clusters describe

```text
NAME
    gcloud oracle-database cloud-vm-clusters describe - describe
        cloudVmClusters

SYNOPSIS
    gcloud oracle-database cloud-vm-clusters describe
        (CLOUD_VM_CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a cloudVmCluster

EXAMPLES
    To describe the cloudVmCluster, run:

        $ gcloud oracle-database cloud-vm-clusters describe

POSITIONAL ARGUMENTS
     CloudVmCluster resource - The name of the Cloud VM Cluster in the
     following format:
     projects/{project}/locations/{location}/cloudVmClusters/{cloud_vm_cluster}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument cloud_vm_cluster on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLOUD_VM_CLUSTER
          ID of the cloudVmCluster or fully qualified identifier for the
          cloudVmCluster.

          To set the cloud_vm_cluster attribute:
          + provide the argument cloud_vm_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the cloudVmCluster resource.

          To set the location attribute:
          + provide the argument cloud_vm_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database cloud-vm-clusters disable-identity-connector

```text
NAME
    gcloud oracle-database cloud-vm-clusters disable-identity-connector -
        disable the Workload Identity Connector for a Cloud VM Cluster

SYNOPSIS
    gcloud oracle-database cloud-vm-clusters disable-identity-connector
        (CLOUD_VM_CLUSTER : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Disable the Workload Identity Connector for a Cloud VM Cluster.

EXAMPLES
    To disable the Workload Identity Connector for a Cloud VM Cluster with id
    my-cluster in the location us-east4, run:

        $ gcloud oracle-database cloud-vm-clusters \
            disable-identity-connector my-cluster --location=us-east4

POSITIONAL ARGUMENTS
     CloudVmCluster resource - The name of the Cloud VM Cluster in the
     following format:
     projects/{project}/locations/{location}/cloudVmClusters/{cloud_vm_cluster}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument cloud_vm_cluster on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLOUD_VM_CLUSTER
          ID of the cloudVmCluster or fully qualified identifier for the
          cloudVmCluster.

          To set the cloud_vm_cluster attribute:
          + provide the argument cloud_vm_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the cloudVmCluster resource.

          To set the location attribute:
          + provide the argument cloud_vm_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database cloud-vm-clusters enable-identity-connector

```text
NAME
    gcloud oracle-database cloud-vm-clusters enable-identity-connector - enable
        the Workload Identity Connector for a Cloud VM Cluster

SYNOPSIS
    gcloud oracle-database cloud-vm-clusters enable-identity-connector
        (CLOUD_VM_CLUSTER : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enable the Workload Identity Connector for a Cloud VM Cluster.

EXAMPLES
    To enable the Workload Identity Connector for a Cloud VM Cluster with id
    my-cluster in the location us-east4, run:

        $ gcloud oracle-database cloud-vm-clusters \
            enable-identity-connector my-cluster --location=us-east4

POSITIONAL ARGUMENTS
     CloudVmCluster resource - The name of the Cloud VM Cluster in the
     following format:
     projects/{project}/locations/{location}/cloudVmClusters/{cloud_vm_cluster}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument cloud_vm_cluster on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLOUD_VM_CLUSTER
          ID of the cloudVmCluster or fully qualified identifier for the
          cloudVmCluster.

          To set the cloud_vm_cluster attribute:
          + provide the argument cloud_vm_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the cloudVmCluster resource.

          To set the location attribute:
          + provide the argument cloud_vm_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database cloud-vm-clusters list

```text
NAME
    gcloud oracle-database cloud-vm-clusters list - list all CloudVmClusters

SYNOPSIS
    gcloud oracle-database cloud-vm-clusters list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all CloudVmClusters.

EXAMPLES
    To list all CloudVmClusters in the location us-east4, run:

        $ gcloud oracle-database cloud-vm-clusters list --location=us-east4

REQUIRED FLAGS
     Location resource - The name of the parent in the following format:
     projects/{project}/locations/{location}. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database cloud-vm-clusters update

```text
NAME
    gcloud oracle-database cloud-vm-clusters update - update labels of a
        CloudVmCluster

SYNOPSIS
    gcloud oracle-database cloud-vm-clusters update
        (CLOUD_VM_CLUSTER : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update labels of a CloudVmCluster. Only labels can be updated on this
    resource; use --update-labels, --remove-labels or --clear-labels to manage
    them.

EXAMPLES
    To add or update labels on a CloudVmCluster with id my-instance in the
    location us-east4, run:

        $ gcloud oracle-database cloud-vm-clusters update my-instance \
            --location=us-east4 --update-labels=env=prod,team=oasis

    To remove the label team from the CloudVmCluster, run:

        $ gcloud oracle-database cloud-vm-clusters update my-instance \
            --location=us-east4 --remove-labels=team

    To clear all labels from the CloudVmCluster, run:

        $ gcloud oracle-database cloud-vm-clusters update my-instance \
            --location=us-east4 --clear-labels

POSITIONAL ARGUMENTS
     CloudVmCluster resource - Identifier. The name of the VM Cluster resource
     with the format:
     projects/{project}/locations/{region}/cloudVmClusters/{cloud_vm_cluster}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument cloud_vm_cluster on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLOUD_VM_CLUSTER
          ID of the cloudVmCluster or fully qualified identifier for the
          cloudVmCluster.

          To set the cloud_vm_cluster attribute:
          + provide the argument cloud_vm_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the cloudVmCluster resource.

          To set the location attribute:
          + provide the argument cloud_vm_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. Labels or tags associated with the VM
          Cluster.

           KEY
              Keys must start with a lowercase character and contain only
              hyphens (-), underscores (_), lowercase characters, and numbers.

           VALUE
              Values must contain only hyphens (-), underscores (_), lowercase
              characters, and numbers.

          Shorthand Example:

              --labels=string=string

          JSON Example:

              --labels='{"string": "string"}'

          File Example:

              --labels=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --update-labels=[UPDATE_LABELS,...]
            Update labels value or add key value pair. Labels or tags
            associated with the VM Cluster.

             KEY
                Keys must start with a lowercase character and contain only
                hyphens (-), underscores (_), lowercase characters, and
                numbers.

             VALUE
                Values must contain only hyphens (-), underscores (_),
                lowercase characters, and numbers.

            Shorthand Example:

                --update-labels=string=string

            JSON Example:

                --update-labels='{"string": "string"}'

            File Example:

                --update-labels=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-labels
              Clear labels value and set to empty map.

           --remove-labels=REMOVE_LABELS
              Remove existing value from map labels. Sets remove_labels value.

              Shorthand Example:

                  --remove-labels=string,string

              JSON Example:

                  --remove-labels=["string"]

              File Example:

                  --remove-labels=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Incomplete example: the `gcloud oracle-database cloud-vm-clusters create` example omits `--exadata-infrastructure`, which the SYNOPSIS requires (gcloud 593.0.0: "argument --exadata-infrastructure: Must be specified."). Add the required flag (see FLAGS on this page).
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example gives the VPC network as `projects/my-project/locations/global/networks/default`, but the `--network` resource format in the same help is `projects/{project}/global/networks/{network}`; the runnable form uses `projects/my-project/global/networks/default`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example passes the API enum name in uppercase (for example `LICENSE_INCLUDED`, `DW`, `GOOGLE_MANAGED`, `SMART_STORAGE`), while the flag description lists the choices in lowercase (`license-included`, `dw`, `google-managed`, `smart-storage`); the runnable form uses the documented lowercase choices (gcloud 593.0.0 also accepts the uppercase names).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/cloud-vm-clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
