---
source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/exadb-vm-clusters
---

# gcloud oracle-database exadb-vm-clusters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud oracle-database exadb-vm-clusters create

```text
NAME
    gcloud oracle-database exadb-vm-clusters create - create a new
        ExadbVmCluster

SYNOPSIS
    gcloud oracle-database exadb-vm-clusters create EXADB_VM_CLUSTER
        --backup-odb-subnet=BACKUP_ODB_SUBNET --display-name=DISPLAY_NAME
        --odb-subnet=ODB_SUBNET
        (--properties-enabled-ecpu-count-per-node=PROPERTIES_ENABLED_ECPU_COUNT_PER_NODE --properties-exascale-db-storage-vault=PROPERTIES_EXASCALE_DB_STORAGE_VAULT --properties-grid-image-id=PROPERTIES_GRID_IMAGE_ID --properties-hostname-prefix=PROPERTIES_HOSTNAME_PREFIX --properties-node-count=PROPERTIES_NODE_COUNT --properties-shape-attribute=PROPERTIES_SHAPE_ATTRIBUTE --properties-ssh-public-keys=[PROPERTIES_SSH_PUBLIC_KEYS,
          ...]
          --vm-file-system-storage-size-in-gbs-per-node=VM_FILE_SYSTEM_STORAGE_SIZE_IN_GBS_PER_NODE : --properties-additional-ecpu-count-per-node=PROPERTIES_ADDITIONAL_ECPU_COUNT_PER_NODE --properties-cluster-name=PROPERTIES_CLUSTER_NAME --properties-license-model=PROPERTIES_LICENSE_MODEL --properties-scan-listener-port-tcp=PROPERTIES_SCAN_LISTENER_PORT_TCP --data-collection-options-is-diagnostics-events-enabled --data-collection-options-is-health-monitoring-enabled --data-collection-options-is-incident-logs-enabled --time-zone-id=TIME_ZONE_ID --time-zone-version=TIME_ZONE_VERSION)
        [--async] [--identity-connector-disabled] [--labels=[LABELS,...]]
        [--location=LOCATION] [--odb-network=ODB_NETWORK]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new ExadbVmCluster.

EXAMPLES
    To create an ExadbVmCluster with id my-instance in the location us-east4
    with display-name my instance, node-count 2, enabled-ecpu-count-per-node 4,
    vm-file-system-storage-size-in-gbs-per-node 100, shape-attribute
    SMART_STORAGE, exascale-db-storage-vault
    projects/my-project/locations/us-east4/exascaleDbStorageVaults/my-vault,
    hostname-prefix my-host, ssh-public-keys
    VtTxzlPJtIivthmLOmWdRDFy5l27pKUTwLp02, odb-network
    projects/my-project/locations/us-east4/odbNetworks/my-network, odb-subnet
    projects/my-project/locations/us-east4/odbNetworks/my-network/odbSubnets/my-subnet,
    backup-odb-subnet
    projects/my-project/locations/us-east4/odbNetworks/my-network/odbSubnets/my-backup-subnet,
    grid-image-id projects/my-project/locations/us-east4/giVersions/19.0.0.0,
    run:

        $ gcloud oracle-database exadb-vm-clusters create my-instance \
            --location=us-east4 --display-name="my instance" \
            --properties-node-count=2 \
            --properties-enabled-ecpu-count-per-node=4 \
            --vm-file-system-storage-size-in-gbs-per-node=100 \
            --properties-shape-attribute=SMART_STORAGE \
            --properties-exascale-db-storage-vault=projects/my-project/\
        locations/us-east4/exascaleDbStorageVaults/my-vault \
            --properties-hostname-prefix=my-host \
            --properties-ssh-public-keys="VtTxzlPJtIivthmLOmWdRDFy5l27pKUTwL\
        p02" \
            --odb-network=projects/my-project/locations/us-east4/\
        odbNetworks/my-network \
            --odb-subnet=projects/my-project/locations/us-east4/\
        odbNetworks/my-network/odbSubnets/my-subnet \
            --backup-odb-subnet=projects/my-project/locations/us-east4/\
        odbNetworks/my-network/odbSubnets/my-backup-subnet \
            --properties-grid-image-id=projects/my-project/locations/\
        us-east4/giVersions/19.0.0.0

POSITIONAL ARGUMENTS
     ExadbVmCluster resource - Identifier. The name of the ExadbVmCluster
     resource in the following format:
     projects/{project}/locations/{region}/exadbVmClusters/{exadb_vm_cluster}
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument exadb_vm_cluster on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument exadb_vm_cluster on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       EXADB_VM_CLUSTER
          ID of the exadbVmCluster or fully qualified identifier for the
          exadbVmCluster.

          To set the exadb_vm_cluster attribute:
          + provide the argument exadb_vm_cluster on the command line.

REQUIRED FLAGS
     OdbSubnet resource - The name of the backup OdbSubnet associated with the
     ExadbVmCluster. Format:
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

     This must be specified.

       --backup-odb-subnet=BACKUP_ODB_SUBNET
          ID of the odbSubnet or fully qualified identifier for the odbSubnet.

          To set the odb-subnet attribute:
          + provide the argument --backup-odb-subnet on the command line.

     --display-name=DISPLAY_NAME
        The display name for the ExadbVmCluster. The name does not have to be
        unique within your project. The name must be 1-255 characters long and
        can only contain alphanumeric characters.

     OdbSubnet resource - The name of the OdbSubnet associated with the
     ExadbVmCluster for IP allocation. Format:
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

     This must be specified.

       --odb-subnet=ODB_SUBNET
          ID of the odbSubnet or fully qualified identifier for the odbSubnet.

          To set the odb-subnet attribute:
          + provide the argument --odb-subnet on the command line.

     The properties of an ExadbVmCluster.

     This must be specified.

       --properties-enabled-ecpu-count-per-node=PROPERTIES_ENABLED_ECPU_COUNT_PER_NODE
          The number of ECPUs enabled per node for an exadata vm cluster on
          exascale infrastructure.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       ExascaleDbStorageVault resource - The name of ExascaleDbStorageVault
       associated with the ExadbVmCluster. It can refer to an existing
       ExascaleDbStorageVault. Or a new one can be created during the
       ExadbVmCluster creation (requires storage_vault_properties to be set).
       Format:
       projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault}
       This represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --properties-exascale-db-storage-vault on the
          command line with a fully specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --properties-exascale-db-storage-vault on the
          command line with a fully specified name;
        + provide the argument --location on the command line.

       This must be specified.

         --properties-exascale-db-storage-vault=PROPERTIES_EXASCALE_DB_STORAGE_VAULT
            ID of the exascaleDbStorageVault or fully qualified identifier for
            the exascaleDbStorageVault.

            To set the exascale-db-storage-vault attribute:
            - provide the argument --properties-exascale-db-storage-vault on
              the command line.

       --properties-grid-image-id=PROPERTIES_GRID_IMAGE_ID
          Grid Infrastructure Version.

       --properties-hostname-prefix=PROPERTIES_HOSTNAME_PREFIX
          Prefix for VM cluster host names.

       --properties-node-count=PROPERTIES_NODE_COUNT
          The number of nodes/VMs in the ExadbVmCluster.

       --properties-shape-attribute=PROPERTIES_SHAPE_ATTRIBUTE
          The shape attribute of the VM cluster. The type of Exascale storage
          used for Exadata VM cluster. The default is SMART_STORAGE which
          supports Oracle Database 23ai and later. PROPERTIES_SHAPE_ATTRIBUTE
          must be one of:

           block-storage
              Indicates that the resource is in block storage.
           smart-storage
              Indicates that the resource is in smart storage.

       --properties-ssh-public-keys=[PROPERTIES_SSH_PUBLIC_KEYS,...]
          The SSH public keys for the ExadbVmCluster.

       The storage allocation for the exadbvmcluster, in gigabytes (GB).

       This must be specified.

         --vm-file-system-storage-size-in-gbs-per-node=VM_FILE_SYSTEM_STORAGE_SIZE_IN_GBS_PER_NODE
            The storage allocation for the exadbvmcluster per node, in
            gigabytes (GB). This field is used to calculate the total storage
            allocation for the exadbvmcluster.

       --properties-additional-ecpu-count-per-node=PROPERTIES_ADDITIONAL_ECPU_COUNT_PER_NODE
          The number of additional ECPUs per node for an Exadata VM cluster on
          exascale infrastructure.

       --properties-cluster-name=PROPERTIES_CLUSTER_NAME
          The cluster name for Exascale vm cluster. The cluster name must begin
          with an alphabetic character and may contain hyphens(-) but can not
          contain underscores(). It should be not more than 11 characters and
          is not case sensitive. OCI Cluster name.

       --properties-license-model=PROPERTIES_LICENSE_MODEL
          The license type of the ExadbVmCluster. PROPERTIES_LICENSE_MODEL must
          be one of:

           bring-your-own-license
              Bring your own license.
           license-included
              Default is license included.

       --properties-scan-listener-port-tcp=PROPERTIES_SCAN_LISTENER_PORT_TCP
          SCAN listener port - TCP

       Data collection options for diagnostics.
       https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/DataCollectionOptions

       --data-collection-options-is-diagnostics-events-enabled
          Indicates whether to enable data collection for diagnostics.

       --data-collection-options-is-health-monitoring-enabled
          Indicates whether to enable health monitoring.

       --data-collection-options-is-incident-logs-enabled
          Indicates whether to enable incident logs and trace collection.

       Represents a time zone from the IANA Time Zone Database
       (https://www.iana.org/time-zones).

       --time-zone-id=TIME_ZONE_ID
          IANA Time Zone Database time zone. For example "America/New_York".

       --time-zone-version=TIME_ZONE_VERSION
          IANA Time Zone Database version number. For example "2019a".

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --identity-connector-disabled
        If set to true, disables the automatic provisioning of the Workload
        Identity Connector during creation. If set to false or omitted, the
        Workload Identity Connector will be automatically provisioned by
        default. Note: Provisioning the Workload Identity Connector is a
        prerequisite for enabling Google Cloud CMEK.

     --labels=[LABELS,...]
        The labels or tags associated with the ExadbVmCluster.

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
        For resources [backup-odb-subnet, exadb_vm_cluster, odb-network,
        odb-subnet, properties-exascale-db-storage-vault], provides fallback
        value for resource location attribute. When the resource's full URI
        path is not provided, location will fallback to this flag value.

     --odb-network=ODB_NETWORK
        For resources [backup-odb-subnet, odb-network, odb-subnet], provides
        fallback value for resource odb-network attribute. When the resource's
        full URI path is not provided, odb-network will fallback to this flag
        value.

     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server will
        guarantee that for at least 60 minutes since the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

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

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud oracle-database exadb-vm-clusters create my-instance \
    --location=us-east4 \
    --display-name="my instance" \
    --properties-node-count=2 \
    --properties-enabled-ecpu-count-per-node=4 \
    --vm-file-system-storage-size-in-gbs-per-node=100 \
    --properties-shape-attribute=smart-storage \
    --properties-exascale-db-storage-vault=projects/my-project/locations/us-east4/exascaleDbStorageVaults/my-vault \
    --properties-hostname-prefix=my-host \
    --properties-ssh-public-keys="VtTxzlPJtIivthmLOmWdRDFy5l27pKUTwLp02" \
    --odb-network=projects/my-project/locations/us-east4/odbNetworks/my-network \
    --odb-subnet=projects/my-project/locations/us-east4/odbNetworks/my-network/odbSubnets/my-subnet \
    --backup-odb-subnet=projects/my-project/locations/us-east4/odbNetworks/my-network/odbSubnets/my-backup-subnet \
    --properties-grid-image-id=projects/my-project/locations/us-east4/giVersions/19.0.0.0
```

### gcloud oracle-database exadb-vm-clusters delete

```text
NAME
    gcloud oracle-database exadb-vm-clusters delete - delete an ExadbVmCluster

SYNOPSIS
    gcloud oracle-database exadb-vm-clusters delete
        (EXADB_VM_CLUSTER : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an ExadbVmCluster.

EXAMPLES
    To delete an ExadbVmCluster with id my-instance in the location us-east4,
    run:

        $ gcloud oracle-database exadb-vm-clusters delete my-instance \
            --location=us-east4

POSITIONAL ARGUMENTS
     ExadbVmCluster resource - The name of the ExadbVmCluster in the following
     format:
     projects/{project}/locations/{location}/exadbVmClusters/{exadb_vm_cluster}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument exadb_vm_cluster on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EXADB_VM_CLUSTER
          ID of the exadbVmCluster or fully qualified identifier for the
          exadbVmCluster.

          To set the exadb_vm_cluster attribute:
          + provide the argument exadb_vm_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the exadbVmCluster resource.

          To set the location attribute:
          + provide the argument exadb_vm_cluster on the command line with a
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

### gcloud oracle-database exadb-vm-clusters describe

```text
NAME
    gcloud oracle-database exadb-vm-clusters describe - get details of a
        ExadbVmCluster

SYNOPSIS
    gcloud oracle-database exadb-vm-clusters describe
        (EXADB_VM_CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details of a ExadbVmCluster.

EXAMPLES
    To get a ExadbVmCluster with id my-instance in the location us-east4, run:

        $ gcloud oracle-database exadb-vm-clusters describe my-instance \
            --location=us-east4

POSITIONAL ARGUMENTS
     ExadbVmCluster resource - The name of the ExadbVmCluster in the following
     format:
     projects/{project}/locations/{location}/exadbVmClusters/{exadb_vm_cluster}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument exadb_vm_cluster on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EXADB_VM_CLUSTER
          ID of the exadbVmCluster or fully qualified identifier for the
          exadbVmCluster.

          To set the exadb_vm_cluster attribute:
          + provide the argument exadb_vm_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the exadbVmCluster resource.

          To set the location attribute:
          + provide the argument exadb_vm_cluster on the command line with a
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

### gcloud oracle-database exadb-vm-clusters disable-identity-connector

```text
NAME
    gcloud oracle-database exadb-vm-clusters disable-identity-connector -
        disable the Workload Identity Connector for an Exadb VM Cluster

SYNOPSIS
    gcloud oracle-database exadb-vm-clusters disable-identity-connector
        (EXADB_VM_CLUSTER : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Disable the Workload Identity Connector for an Exadb VM Cluster.

EXAMPLES
    To disable the Workload Identity Connector for an Exadb VM Cluster with id
    my-cluster in the location us-east4, run:

        $ gcloud oracle-database exadb-vm-clusters \
            disable-identity-connector my-cluster --location=us-east4

POSITIONAL ARGUMENTS
     ExadbVmCluster resource - The name of the Exadb VM Cluster in the
     following format:
     projects/{project}/locations/{location}/exadbVmClusters/{exadb_vm_cluster}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument exadb_vm_cluster on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EXADB_VM_CLUSTER
          ID of the exadbVmCluster or fully qualified identifier for the
          exadbVmCluster.

          To set the exadb_vm_cluster attribute:
          + provide the argument exadb_vm_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the exadbVmCluster resource.

          To set the location attribute:
          + provide the argument exadb_vm_cluster on the command line with a
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

### gcloud oracle-database exadb-vm-clusters enable-identity-connector

```text
NAME
    gcloud oracle-database exadb-vm-clusters enable-identity-connector - enable
        the Workload Identity Connector for an Exadb VM Cluster

SYNOPSIS
    gcloud oracle-database exadb-vm-clusters enable-identity-connector
        (EXADB_VM_CLUSTER : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enable the Workload Identity Connector for an Exadb VM Cluster.

EXAMPLES
    To enable the Workload Identity Connector for an Exadb VM Cluster with id
    my-cluster in the location us-east4, run:

        $ gcloud oracle-database exadb-vm-clusters \
            enable-identity-connector my-cluster --location=us-east4

POSITIONAL ARGUMENTS
     ExadbVmCluster resource - The name of the Exadb VM Cluster in the
     following format:
     projects/{project}/locations/{location}/exadbVmClusters/{exadb_vm_cluster}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument exadb_vm_cluster on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EXADB_VM_CLUSTER
          ID of the exadbVmCluster or fully qualified identifier for the
          exadbVmCluster.

          To set the exadb_vm_cluster attribute:
          + provide the argument exadb_vm_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the exadbVmCluster resource.

          To set the location attribute:
          + provide the argument exadb_vm_cluster on the command line with a
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

### gcloud oracle-database exadb-vm-clusters list

```text
NAME
    gcloud oracle-database exadb-vm-clusters list - list all ExadbVmClusters

SYNOPSIS
    gcloud oracle-database exadb-vm-clusters list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all ExadbVmClusters.

EXAMPLES
    To list all ExadbVmClusters in the location us-east4, run:

        $ gcloud oracle-database exadb-vm-clusters list --location=us-east4

REQUIRED FLAGS
     Location resource - The parent value for ExadbVmClusters in the following
     format: projects/{project}/locations/{location}. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

### gcloud oracle-database exadb-vm-clusters remove-virtual-machine

```text
NAME
    gcloud oracle-database exadb-vm-clusters remove-virtual-machine - remove
        virtual machines from an ExadbVmCluster

SYNOPSIS
    gcloud oracle-database exadb-vm-clusters remove-virtual-machine
        (EXADB_VM_CLUSTER : --location=LOCATION) --hostnames=[HOSTNAMES,...]
        [--async] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes virtual machines from an existing ExadbVmCluster.

EXAMPLES
    To remove virtual machines with hostnames host1 and host2 from an
    ExadbVmCluster with id my-instance in the location us-east4, run:

        $ gcloud oracle-database exadb-vm-clusters remove-virtual-machine \
            my-instance --location=us-east4 --hostnames=host1,host2

POSITIONAL ARGUMENTS
     ExadbVmCluster resource - The name of the ExadbVmCluster in the following
     format:
     projects/{project}/locations/{location}/exadbVmClusters/{exadb_vm_cluster}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument exadb_vm_cluster on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EXADB_VM_CLUSTER
          ID of the exadbVmCluster or fully qualified identifier for the
          exadbVmCluster.

          To set the exadb_vm_cluster attribute:
          + provide the argument exadb_vm_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the exadbVmCluster resource.

          To set the location attribute:
          + provide the argument exadb_vm_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --hostnames=[HOSTNAMES,...]
        The list of host names of db nodes to be removed from the
        ExadbVmCluster.

OPTIONAL FLAGS
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

### gcloud oracle-database exadb-vm-clusters update

```text
NAME
    gcloud oracle-database exadb-vm-clusters update - update an ExadbVmCluster

SYNOPSIS
    gcloud oracle-database exadb-vm-clusters update
        (EXADB_VM_CLUSTER : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID]
        [--clear-properties --properties-node-count=PROPERTIES_NODE_COUNT]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an ExadbVmCluster.

EXAMPLES
    To add virtual machines to an existing ExadbVmCluster with id my-instance
    in the location us-east4 by updating the node-count to 4, run:

        $ gcloud oracle-database exadb-vm-clusters update my-instance \
            --location=us-east4 --properties-node-count=4

POSITIONAL ARGUMENTS
     ExadbVmCluster resource - Identifier. The name of the ExadbVmCluster
     resource in the following format:
     projects/{project}/locations/{region}/exadbVmClusters/{exadb_vm_cluster}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument exadb_vm_cluster on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EXADB_VM_CLUSTER
          ID of the exadbVmCluster or fully qualified identifier for the
          exadbVmCluster.

          To set the exadb_vm_cluster attribute:
          + provide the argument exadb_vm_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the exadbVmCluster resource.

          To set the location attribute:
          + provide the argument exadb_vm_cluster on the command line with a
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

     The properties of an ExadbVmCluster.

     --clear-properties
        Set exadbVmCluster.properties back to default value.

     --properties-node-count=PROPERTIES_NODE_COUNT
        The number of nodes/VMs in the ExadbVmCluster.

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. The labels or tags associated with the
          ExadbVmCluster.

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
            Update labels value or add key value pair. The labels or tags
            associated with the ExadbVmCluster.

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
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example passes the API enum name in uppercase (for example `LICENSE_INCLUDED`, `DW`, `GOOGLE_MANAGED`, `SMART_STORAGE`), while the flag description lists the choices in lowercase (`license-included`, `dw`, `google-managed`, `smart-storage`); the runnable form uses the documented lowercase choices (gcloud 593.0.0 also accepts the uppercase names).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/exadb-vm-clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
