---
source: https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters
---

# gcloud cluster-director clusters (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud cluster-director clusters create

```text
NAME
    gcloud cluster-director clusters create - creates a Cluster Director
        resource

SYNOPSIS
    gcloud cluster-director clusters create (CLUSTER : --location=LOCATION)
        (--buckets=[id=ID],[name=NAME]
          --create-buckets=[enableAutoclass=ENABLEAUTOCLASS],
          [enableHNS=ENABLEHNS],[id=ID],[name=NAME],[storageClass=STORAGECLASS]
          --create-filestores=[capacityGb=CAPACITYGB],[description=DESCRIPTION],
          [fileshare=FILESHARE],
          [id=ID],[name=NAME],[protocol=PROTOCOL],[tier=TIER]
          --create-lustres=[capacityGb=CAPACITYGB],[description=DESCRIPTION],
          [filesystem=FILESYSTEM],[id=ID],
          [name=NAME],[perUnitStorageThroughput=PERUNITSTORAGETHROUGHPUT]
          --description=DESCRIPTION --filestores=[id=ID],[name=NAME]
          --flex-start-instances=[id=ID],
          [machineType=MACHINETYPE],[maxDuration=MAXDURATION],[zone=ZONE]
          --labels=[LABELS,...] --lustres=[id=ID],[name=NAME]
          --on-demand-instances=[id=ID],[machineType=MACHINETYPE],[zone=ZONE]
          --reference-architecture=REFERENCE_ARCHITECTURE
          --reserved-instances=[id=ID],[reservation=RESERVATION]
          --spot-instances=[id=ID],[machineType=MACHINETYPE],
          [terminationAction=TERMINATIONACTION],[zone=ZONE]
          --create-network=[description=DESCRIPTION],[name=NAME]
          | [--network=NETWORK --subnet=SUBNET
          : --network-project=NETWORK_PROJECT]
          --slurm-default-partition=SLURM_DEFAULT_PARTITION
          --slurm-epilog-scripts=[SLURM_EPILOG_SCRIPTS,...]
          --slurm-login-node=[bootDisk=BOOTDISK],[count=COUNT],
          [enableOsLogin=ENABLEOSLOGIN],[enablePublicIps=ENABLEPUBLICIPS],
          [labels=LABELS],[machineType=MACHINETYPE],
          [startupScript=STARTUPSCRIPT],
          [storageConfigs=STORAGECONFIGS],[zone=ZONE]
          --slurm-node-sets=[computeId=COMPUTEID],
          [computeInstance=COMPUTEINSTANCE],[id=ID],
          [maxDynamicNodeCount=MAXDYNAMICNODECOUNT],
          [staticNodeCount=STATICNODECOUNT],[storageConfigs=STORAGECONFIGS]
          --slurm-partitions=[id=ID],[nodeSetIds=NODESETIDS]
          --slurm-prolog-scripts=[SLURM_PROLOG_SCRIPTS,...]) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud cluster-director clusters create facilitates the creation of a
    cluster resource.

    Use one of the following options to create a cluster:
      o [Preferred] Use granular flags to define cluster specs.
      o Use --reference-architecture to apply pre-configured templates.

REFERENCE ARCHITECTURES
    Reference architectures allow you to quickly provision clusters with
    pre-defined configurations for compute, storage, and orchestrator.

    quickstart (applied when using --reference-architecture=quickstart):
      o Compute: 2x a3-megagpu-8g nodes (Flex Start, max duration 7 days).
      o Login Node: 1x n2-standard-16 node.
      o Storage: 36TB Lustre storage (scratch disk).

    a3-ultra (applied when using --reference-architecture=a3-ultra):
      o Compute: 4x reserved nodes (requires specifying
        --reserved-instances).
      o Login Node: 1x n2-standard-16 node.
      o Storage: 36TB Lustre storage (scratch disk) and 5.1TB Filestore
        storage.

    a4-high-flex-start (applied when using
    --reference-architecture=a4-high-flex-start):
      o Compute: 4x a4-highgpu-8g nodes (Flex Start, max duration 7 days).
      o Login Node: 1x n2-standard-16 node.
      o Storage: 18TB Lustre storage (scratch disk) and 2TB Filestore
        storage.

    a4x-high (applied when using --reference-architecture=a4x-high):
      o Compute: 18x reserved nodes (requires specifying
        --reserved-instances).
      o Login Node: 1x n2-standard-16 node.
      o Storage: 36TB Lustre storage (scratch disk).

    g4-flex-start (applied when using --reference-architecture=g4-flex-start):
      o Compute: 4x g4-standard-384 nodes (Flex Start, max duration 7 days).
      o Login Node: 1x n2-standard-16 node.
      o Storage: 36TB Lustre storage (scratch disk) and 10.2TB Filestore
        storage.

    h4d-highmem-flex-start (applied when using
    --reference-architecture=h4d-highmem-flex-start):
      o Compute: 4x h4d-highmem-192 nodes (Flex Start, max duration 7 days).
      o Login Node: 1x n2-standard-16 node.
      o Storage: 18TB Lustre storage (scratch disk) and 1TB Filestore
        storage.

    Please refer to the examples below for more details.

EXAMPLES
    To create a cluster my-cluster in location us-central1 with granular flags,
    run the following example:

        $ gcloud cluster-director clusters create my-cluster \
            --location=us-central1 --description="My cluster description" \
            --labels=env=prod,client=gcloud-cli \
            --create-network=name=network0 \
            --create-filestores=name=locations/us-central1-a/instances/\
        filestore0,tier=ZONAL,capacityGb={filestoreSize},\
        fileshare={fileshare} \
            --filestores=locations/us-central1-a/instances/filestore1 \
            --create-buckets=name=bucket0 --buckets=bucket1 \
            --create-lustres=name=locations/us-central1-a/instances/\
        lustre0,capacityGb={lustreSize},filesystem={filesystem} \
            --lustres=locations/us-central1-a/instances/lustre1 \
            --reserved-instances=id=compute0,reservation=zones/\
        us-central1-a/reservations/{reservation} \
            --slurm-login-node=machineType={machineType},\
        zone=us-central1-a \
            --slurm-node-sets=id=nodeset0,computeId=compute0 \
            --slurm-partitions=id=partition0,nodesetIds=[nodeset0] \
            --slurm-default-partition=partition0 --format=json

    To create a cluster my-cluster in location us-central1 using the quickstart
    setup with default cluster parameters, run the following example:

        $ gcloud cluster-director clusters create my-cluster \
            --location=us-central1 --reference-architecture=quickstart \
            --create-network=name=network0

    To create a cluster my-cluster in location us-central1 using a pre-defined
    reference architecture choice (such as g4-flex-start), run the following
    example:

        $ gcloud cluster-director clusters create my-cluster \
            --location=us-central1 --reference-architecture=g4-flex-start \
            --create-network=name=network0

POSITIONAL ARGUMENTS
     Cluster resource - Name of the cluster resource. Formats: cluster |
     projects/{project}/locations/{locations}/clusters/{cluster} The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

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
          Location ID of the cluster resource.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     Flag Configurations to define cluster spec.

     At least one of these must be specified:

       --buckets=[id=ID],[name=NAME]
          Reference of existing Google Cloud Storage bucket.

          id: ID of the bucket resource, used to refer to this resource in
          storage-configs. name: Name of the existing Cloud Storage bucket to
          import from your project in the format of bucket-name.

          For example --buckets id=my-bucket,name=bucket-1.

          Sets buckets value.

          Shorthand Example:

              --buckets=id=string,name=string --buckets=id=string,name=string

          JSON Example:

              --buckets='[{"id": "string", "name": "string"}]'

          File Example:

              --buckets=path_to_file.(yaml|json)

       --create-buckets=[enableAutoclass=ENABLEAUTOCLASS],[enableHNS=ENABLEHNS],[id=ID],[name=NAME],[storageClass=STORAGECLASS]
          Parameters to create a Google Cloud Storage bucket.

          Required fields:
          + id
          + name

          For example --create-buckets
          id=my-bucket,name=bucket-1,storageClass=STANDARD,enableHNS=true

          Supported storageClass values:
          + STANDARD
          + NEARLINE
          + COLDLINE
          + ARCHIVE

          Defaults:
          + storageClass: STANDARD

          Note:
          + Either storageClass or enableAutoclass can be set.
          + HNS: Hierarchical namespace. Hierarchical namespace buckets
            cannot use Autoclass.

          Sets create_buckets value.

          Shorthand Example:

              --create-buckets=enableAutoclass=boolean,enableHNS=boolean,id=string,name=string,storageClass=string --create-buckets=enableAutoclass=boolean,enableHNS=boolean,id=string,name=string,storageClass=string

          JSON Example:

              --create-buckets='[{"enableAutoclass": boolean, "enableHNS": boolean, "id": "string", "name": "string", "storageClass": "string"}]'

          File Example:

              --create-buckets=path_to_file.(yaml|json)

       --create-filestores=[capacityGb=CAPACITYGB],[description=DESCRIPTION],[fileshare=FILESHARE],[id=ID],[name=NAME],[protocol=PROTOCOL],[tier=TIER]
          Parameters to create a filestore instance.

          Required fields:
          + id
          + name
          + tier
          + capacityGb
          + fileshare

          For example --create-filestores
          id=my-fs,name=locations/us-central1/instances/filestore-1,tier=REGIONAL,capacityGb=1024,fileshare=share1

          id: Alphanumeric identifier of the filestore resource. Can be used to
          refer to this resource in storage-configs. name: Name of the
          filestore instance to create in your project in the format of
          locations/us-central1/instances/filestore-1.

          capacityGb: Size of the filestore in GiB. Must be between 1024 and
          102400, and must meet scalability requirements described at
          https://cloud.google.com/filestore/docs/service-tiers.

          fileshare: The directory on a Filestore instance where all shared
          files are stored. Must match the regex [a-z]([-a-z0-9]*[a-z0-9])?, be
          1-63 characters in length, and comply with RFC1035.

          Supported protocol values:
          + NFSV3
          + NFSV41
          + If not specified, defaults to NFSV3

          Defaults:
          + protocol: NFSV3.

          Sets create_filestores value.

          Shorthand Example:

              --create-filestores=capacityGb=int,description=string,fileshare=string,id=string,name=string,protocol=string,tier=string --create-filestores=capacityGb=int,description=string,fileshare=string,id=string,name=string,protocol=string,tier=string

          JSON Example:

              --create-filestores='[{"capacityGb": int, "description": "string", "fileshare": "string", "id": "string", "name": "string", "protocol": "string", "tier": "string"}]'

          File Example:

              --create-filestores=path_to_file.(yaml|json)

       --create-lustres=[capacityGb=CAPACITYGB],[description=DESCRIPTION],[filesystem=FILESYSTEM],[id=ID],[name=NAME],[perUnitStorageThroughput=PERUNITSTORAGETHROUGHPUT]
          Parameters to create a Lustre instance.

          Required fields:
          + id
          + name
          + capacityGb
          + filesystem.

          id: ID of the lustre resource, used to refer to this resource in
          storage-configs.

          name: Name of the Managed Lustre instance to create in your project
          in the format of locations/us-central1/instances/lustre-1.

          For example --create-lustres
          id=my-lustre,name=locations/us-central1/instances/lustre-1,capacityGb=1024,filesystem=fs-1,perUnitStorageThroughput=1000

          Values for perUnitStorageThroughput: 125, 250, 500, 1000.

          Sets create_lustres value.

          Shorthand Example:

              --create-lustres=capacityGb=int,description=string,filesystem=string,id=string,name=string,perUnitStorageThroughput=int --create-lustres=capacityGb=int,description=string,filesystem=string,id=string,name=string,perUnitStorageThroughput=int

          JSON Example:

              --create-lustres='[{"capacityGb": int, "description": "string", "filesystem": "string", "id": "string", "name": "string", "perUnitStorageThroughput": int}]'

          File Example:

              --create-lustres=path_to_file.(yaml|json)

       --description=DESCRIPTION
          Description of the cluster.

          For example --description "My cluster"

       --filestores=[id=ID],[name=NAME]
          Reference of existing filestore instance.

          id: ID of the filestore resource, used to refer to this resource in
          storage-configs. name: Name of the existing filestore instance to
          import from your project in the format of
          locations/us-central1/instances/filestore-1.

          For example --filestores
          id=my-fs,name=locations/us-central1/instances/filestore-1.

          Sets filestores value.

          Shorthand Example:

              --filestores=id=string,name=string --filestores=id=string,name=string

          JSON Example:

              --filestores='[{"id": "string", "name": "string"}]'

          File Example:

              --filestores=path_to_file.(yaml|json)

       --flex-start-instances=[id=ID],[machineType=MACHINETYPE],[maxDuration=MAXDURATION],[zone=ZONE]
          Parameters to define cluster Flex Start instances.

          For example --flex-start-instances
          id=c1,zone=us-central1-a,machineType=n1-standard-1,maxDuration=10000s.

          Sets flex_start_instances value.

          Shorthand Example:

              --flex-start-instances=id=string,machineType=string,maxDuration=string,zone=string --flex-start-instances=id=string,machineType=string,maxDuration=string,zone=string

          JSON Example:

              --flex-start-instances='[{"id": "string", "machineType": "string", "maxDuration": "string", "zone": "string"}]'

          File Example:

              --flex-start-instances=path_to_file.(yaml|json)

       --labels=[LABELS,...]
          Cluster labels as key value pairs.

          For example --labels key1=value1,key2=value2.

          Sets labels value.

          Shorthand Example:

              --labels={string=string}

          JSON Example:

              --labels='{"string": "string"}'

          File Example:

              --labels=path_to_file.(yaml|json)

       --lustres=[id=ID],[name=NAME]
          Reference of existing Lustre instance.

          id: ID of the lustre resource, used to refer to this resource in
          storage-configs. name: Name of the existing Managed Lustre instance
          to import from your project in the format of
          locations/us-central1/instances/lustre-1.

          For example --lustres
          id=my-lustre,name=locations/us-central1/instances/lustre-1.

          Sets lustres value.

          Shorthand Example:

              --lustres=id=string,name=string --lustres=id=string,name=string

          JSON Example:

              --lustres='[{"id": "string", "name": "string"}]'

          File Example:

              --lustres=path_to_file.(yaml|json)

       --on-demand-instances=[id=ID],[machineType=MACHINETYPE],[zone=ZONE]
          Parameters to define cluster on demand instances.

          For example --on-demand-instances
          id=c1,zone=us-central1-a,machineType=n1-standard-1.

          Sets on_demand_instances value.

          Shorthand Example:

              --on-demand-instances=id=string,machineType=string,zone=string --on-demand-instances=id=string,machineType=string,zone=string

          JSON Example:

              --on-demand-instances='[{"id": "string", "machineType": "string", "zone": "string"}]'

          File Example:

              --on-demand-instances=path_to_file.(yaml|json)

       --reference-architecture=REFERENCE_ARCHITECTURE
          Reference a pre-defined architecture. Available options:
          + a3-ultra: 4x reserved nodes (requires --reserved-instances), 1x
            login node (n2-standard-16), 36TB Lustre storage, and 5.1TB
            Filestore storage.
          + a4-high-flex-start: 4x a4-highgpu-8g compute nodes (Flex Start),
            1x login node (n2-standard-16), 18TB Lustre storage, and 2TB
            Filestore storage.
          + a4x-high: 18x reserved nodes (requires --reserved-instances), 1x
            login node (n2-standard-16), and 36TB Lustre storage.
          + g4-flex-start: 4x g4-standard-384 compute nodes (Flex Start), 1x
            login node (n2-standard-16), 36TB Lustre storage, and 10.2TB
            Filestore storage.
          + h4d-highmem-flex-start: 4x h4d-highmem-192 compute nodes (Flex
            Start), 1x login node (n2-standard-16), 18TB Lustre storage, and
            1TB Filestore storage.
          + quickstart: 2x a3-megagpu-8g compute nodes (Flex Start, max
            duration 7 days), 1x login node (n2-standard-16), and 36TB Lustre
            storage. REFERENCE_ARCHITECTURE must be one of: a3-ultra,
            a4-high-flex-start, a4x-high, g4-flex-start,
            h4d-highmem-flex-start, quickstart.

       --reserved-instances=[id=ID],[reservation=RESERVATION]
          Parameters to define cluster reserved instances.

          For example --reserved-instances
          id=c1,reservation=zones/us-central1-a/reservations/reservation-1.

          Sets reserved_instances value.

          Shorthand Example:

              --reserved-instances=id=string,reservation=string --reserved-instances=id=string,reservation=string

          JSON Example:

              --reserved-instances='[{"id": "string", "reservation": "string"}]'

          File Example:

              --reserved-instances=path_to_file.(yaml|json)

       --spot-instances=[id=ID],[machineType=MACHINETYPE],[terminationAction=TERMINATIONACTION],[zone=ZONE]
          Parameters to define cluster spot instances.

          For example --spot-instances
          id=c1,zone=us-central1-a,machineType=n1-standard-1.

          Sets spot_instances value.

          Shorthand Example:

              --spot-instances=id=string,machineType=string,terminationAction=string,zone=string --spot-instances=id=string,machineType=string,terminationAction=string,zone=string

          JSON Example:

              --spot-instances='[{"id": "string", "machineType": "string", "terminationAction": "string", "zone": "string"}]'

          File Example:

              --spot-instances=path_to_file.(yaml|json)

       Network configuration for the cluster.

       At most one of these can be specified:

         --create-network=[description=DESCRIPTION],[name=NAME]
            Parameters to create a VPC (Virtual Private Cloud) network.

            Required fields:
            - name Name: Must match the regex [a-z]([-a-z0-9]*[a-z0-9])?, be
              1-63 characters in length, and comply with RFC1035.

            Description: A description of the network. Maximum of 2048
            characters.

            For example --create-network name=network-1,description="My
            network".

            Sets create_network value.

            Shorthand Example:

                --create-network=description=string,name=string

            JSON Example:

                --create-network='{"description": "string", "name": "string"}'

            File Example:

                --create-network=path_to_file.(yaml|json)

         Or at least one of these can be specified:

           Use an existing network source for the cluster.

           --network=NETWORK
              Reference of existing network name. If the network is in a
              different project (Shared VPC), specify the project ID using
              --network-project.

              For example --network network-1

              This flag argument must be specified if any of the other
              arguments in this group are specified.

           --subnet=SUBNET
              Reference of existing subnetwork name. If the subnetwork is in a
              different project (Shared VPC), specify the project ID using
              --network-project.

              For example --subnet regions/us-central1/subnetworks/subnet-1

              This flag argument must be specified if any of the other
              arguments in this group are specified.

           --network-project=NETWORK_PROJECT
              Project ID of the project containing the network and subnetwork
              resources, if different from the cluster project (e.g. for Shared
              VPC).

       Orchestrator configuration for the cluster.

       Slurm orchestrator configuration for the cluster.

       --slurm-default-partition=SLURM_DEFAULT_PARTITION
          Parameters to define slurm cluster default partition.

          For example --slurm-default-partition p1

       --slurm-epilog-scripts=[SLURM_EPILOG_SCRIPTS,...]
          Slurm epilog bash scripts.

          For example --slurm-epilog-scripts script1.sh,script2.sh

       --slurm-login-node=[bootDisk=BOOTDISK],[count=COUNT],[enableOsLogin=ENABLEOSLOGIN],[enablePublicIps=ENABLEPUBLICIPS],[labels=LABELS],[machineType=MACHINETYPE],[startupScript=STARTUPSCRIPT],[storageConfigs=STORAGECONFIGS],[zone=ZONE]
          Parameters to define slurm cluster login node.

          Required:
          + machineType
          + zone

          For example --slurm-login-node
          machineType=n1-standard-1,zone=us-central1-a,count=1

          Defaults:
          + count: 1
          + enableOsLogin: true
          + enablePublicIPs: true
          + bootDisk.sizeGb: 100

          Note:
          + startupScript:
            - Either str or file_path
            - For file_path, only bash file format (.sh or .bash) is
              supported.
            - For file_path, only absolute path is supported.
          + bootDisk:
            - Must be 50 GB or greater.

            Sets slurm_login_node value.

          Shorthand Example:

              --slurm-login-node=bootDisk={sizeGb=int,type=string},count=int,enableOsLogin=boolean,enablePublicIps=boolean,labels={string=string},machineType=string,startupScript=string,storageConfigs=[{id=string,localMount=string}],zone=string

          JSON Example:

              --slurm-login-node='{"bootDisk": {"sizeGb": int, "type": "string"}, "count": int, "enableOsLogin": boolean, "enablePublicIps": boolean, "labels": {"string": "string"}, "machineType": "string", "startupScript": "string", "storageConfigs": [{"id": "string", "localMount": "string"}], "zone": "string"}'

          File Example:

              --slurm-login-node=path_to_file.(yaml|json)

       --slurm-node-sets=[computeId=COMPUTEID],[computeInstance=COMPUTEINSTANCE],[id=ID],[maxDynamicNodeCount=MAXDYNAMICNODECOUNT],[staticNodeCount=STATICNODECOUNT],[storageConfigs=STORAGECONFIGS]
          Parameters to define slurm cluster nodeset config.

          Required fields:
          + id

          For example --slurm-node-sets
          id=ns1,computeId=c1,staticNodeCount=1,maxDynamicNodeCount=2,computeInstance=[startupScript="echo
          hello",labels="k1=v1"]

          Defaults:

          Note:
          + startupScript:
            - Either str or file_path
            - For file_path, only bash file format (.sh or .bash) is
              supported.
            - For file_path, only absolute path is supported.

            Sets slurm_node_sets value.

          Shorthand Example:

              --slurm-node-sets=computeId=string,computeInstance={bootDisk={sizeGb=int,type=string},labels={string=string},startupScript=string},id=string,maxDynamicNodeCount=int,staticNodeCount=int,storageConfigs=[{id=string,localMount=string}] --slurm-node-sets=computeId=string,computeInstance={bootDisk={sizeGb=int,type=string},labels={string=string},startupScript=string},id=string,maxDynamicNodeCount=int,staticNodeCount=int,storageConfigs=[{id=string,localMount=string}]

          JSON Example:

              --slurm-node-sets='[{"computeId": "string", "computeInstance": {"bootDisk": {"sizeGb": int, "type": "string"}, "labels": {"string": "string"}, "startupScript": "string"}, "id": "string", "maxDynamicNodeCount": int, "staticNodeCount": int, "storageConfigs": [{"id": "string", "localMount": "string"}]}]'

          File Example:

              --slurm-node-sets=path_to_file.(yaml|json)

       --slurm-partitions=[id=ID],[nodeSetIds=NODESETIDS]
          Parameters to define slurm cluster partitions.

          For example --slurm-partitions id=p1,nodesetIds=[ns1,ns2].

          Sets slurm_partitions value.

          Shorthand Example:

              --slurm-partitions=id=string,nodeSetIds=[string] --slurm-partitions=id=string,nodeSetIds=[string]

          JSON Example:

              --slurm-partitions='[{"id": "string", "nodeSetIds": ["string"]}]'

          File Example:

              --slurm-partitions=path_to_file.(yaml|json)

       --slurm-prolog-scripts=[SLURM_PROLOG_SCRIPTS,...]
          Slurm prolog bash scripts.

          For example --slurm-prolog-scripts script1.sh,script2.sh

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

GUIDANCE
  Using reference architectures
    Use --reference-architecture to provision a cluster from a pre-defined
    template with sensible defaults for compute, storage, and Slurm
    orchestration. Individual flags can be combined with
    --reference-architecture to customize or override specific resources.

  Using flags files
    Store reusable cluster flag configurations in a YAML or JSON file and pass
    --flags-file=FILE to reuse complex arguments across multiple cluster
    deployments while overriding individual flags on the command line.

NOTES
    These variants are also available:

        $ gcloud alpha cluster-director clusters create

        $ gcloud beta cluster-director clusters create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud cluster-director clusters create my-cluster \
    --location=us-central1 \
    --description="My cluster description" \
    --labels=env=prod,client=gcloud-cli \
    --create-network=name=network0 \
    --create-filestores=id=filestore0,name=locations/us-central1-a/instances/filestore0,tier=ZONAL,capacityGb={filestoreSize},fileshare={fileshare} \
    --filestores=id=filestore1,name=locations/us-central1-a/instances/filestore1 \
    --create-buckets=id=bucket0,name=bucket0 \
    --buckets=id=bucket1,name=bucket1 \
    --create-lustres=id=lustre0,name=locations/us-central1-a/instances/lustre0,capacityGb={lustreSize},filesystem={filesystem} \
    --lustres=id=lustre1,name=locations/us-central1-a/instances/lustre1 \
    --reserved-instances=id=compute0,reservation=zones/us-central1-a/reservations/{reservation} \
    --slurm-login-node=machineType={machineType},zone=us-central1-a \
    --slurm-node-sets=id=nodeset0,computeId=compute0 \
    --slurm-partitions=id=partition0,nodeSetIds=[nodeset0] \
    --slurm-default-partition=partition0 \
    --format=json
```

### gcloud cluster-director clusters delete

```text
NAME
    gcloud cluster-director clusters delete - deletes a Cluster Director
        resource

SYNOPSIS
    gcloud cluster-director clusters delete (CLUSTER : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a Cluster Director resource.

EXAMPLES
    To delete a cluster my-cluster in location us-central1-a run:

        $ gcloud cluster-director clusters delete my-cluster \
            --location=us-central1-a

POSITIONAL ARGUMENTS
     Cluster resource - Identifier. Name of the cluster to delete. Formats:
     cluster | projects/{project}/locations/{locations}/clusters/{cluster} The
     arguments in this group can be used to specify the attributes of this
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

       --location=LOCATION
          Location ID of the cluster resource.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
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
    This command uses the hypercomputecluster/v1 API. The full documentation
    for this API can be found at:
    https://docs.cloud.google.com/cluster-director/docs

NOTES
    These variants are also available:

        $ gcloud alpha cluster-director clusters delete

        $ gcloud beta cluster-director clusters delete
```

### gcloud cluster-director clusters describe

```text
NAME
    gcloud cluster-director clusters describe - gets details of a Cluster
        Director resource

SYNOPSIS
    gcloud cluster-director clusters describe (CLUSTER : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets details of a Cluster Director resource.

EXAMPLES
    To get the details of a cluster my-cluster in location us-central1-a run:

        $ gcloud cluster-director clusters describe my-cluster \
            --location=us-central1-a

POSITIONAL ARGUMENTS
     Cluster resource - Identifier. Name of the cluster to retrieve. Format:
     cluster | projects/{project}/locations/{location}/clusters/{cluster} The
     arguments in this group can be used to specify the attributes of this
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

       --location=LOCATION
          Location ID of the cluster resource.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the hypercomputecluster/v1 API. The full documentation
    for this API can be found at:
    https://docs.cloud.google.com/cluster-director/docs

NOTES
    These variants are also available:

        $ gcloud alpha cluster-director clusters describe

        $ gcloud beta cluster-director clusters describe
```

### gcloud cluster-director clusters export

```text
NAME
    gcloud cluster-director clusters export - exports a Cluster Director
        resource

SYNOPSIS
    gcloud cluster-director clusters export (CLUSTER : --location=LOCATION)
        [--destination=DESTINATION] [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Exports a Cluster Director resource configuration to a YAML file.

EXAMPLES
    To export a cluster my-cluster in location us-central1 to a YAML file, run:

        $ gcloud cluster-director clusters export my-cluster \
            --location=us-central1 --destination=cluster-config.yaml

POSITIONAL ARGUMENTS
     Cluster resource - Identifier. Name of the cluster to export. Format:
     cluster | projects/{project}/locations/{location}/clusters/{cluster} The
     arguments in this group can be used to specify the attributes of this
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

       --location=LOCATION
          Location ID of the cluster resource.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --destination=DESTINATION
        Path to a YAML file where the configuration will be exported. The
        exported data will not contain any output-only fields. Alternatively,
        you may omit this flag to write to standard output. For a schema
        describing the export/import format, see
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/...

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
    This command uses the hypercomputecluster/v1 API. The full documentation
    for this API can be found at:
    https://docs.cloud.google.com/cluster-director/docs

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha cluster-director clusters export

        $ gcloud beta cluster-director clusters export
```

### gcloud cluster-director clusters import

```text
NAME
    gcloud cluster-director clusters import - imports a Cluster Director
        resource

SYNOPSIS
    gcloud cluster-director clusters import (CLUSTER : --location=LOCATION)
        [--async] [--endpoint-mode=ENDPOINT_MODE] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Imports a Cluster Director resource configuration from a YAML file.

EXAMPLES
    To import a cluster my-cluster in location us-central1 from a YAML file,
    run:

        $ gcloud cluster-director clusters import my-cluster \
            --location=us-central1 --source=cluster-config.yaml

POSITIONAL ARGUMENTS
     Cluster resource - Identifier. Name of the cluster to import. Format:
     cluster | projects/{project}/locations/{location}/clusters/{cluster} The
     arguments in this group can be used to specify the attributes of this
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

       --location=LOCATION
          Location ID of the cluster resource.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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

     --source=SOURCE
        Path to a YAML file containing the configuration export data. The YAML
        file must not contain any output-only fields. Alternatively, you may
        omit this flag to read from standard input. For a schema describing the
        export/import format, see: $CLOUDSDKROOT/lib/googlecloudsdk/schemas/...

        $CLOUDSDKROOT is can be obtained with the following command:

            $ gcloud info --format='value(installation.sdk_root)'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the hypercomputecluster/v1 API. The full documentation
    for this API can be found at:
    https://docs.cloud.google.com/cluster-director/docs

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha cluster-director clusters import

        $ gcloud beta cluster-director clusters import
```

### gcloud cluster-director clusters list

```text
NAME
    gcloud cluster-director clusters list - list Cluster Director resources

SYNOPSIS
    gcloud cluster-director clusters list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Cluster Director resources.

EXAMPLES
    To list all clusters in particular location us-central1-a run:

        $ gcloud cluster-director clusters list --location=us-central1-a

REQUIRED FLAGS
     Location resource - Identifier. Parent collection which own list of
     clusters. Format: location | projects/{project}/locations/{location} This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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
    This command uses the hypercomputecluster/v1 API. The full documentation
    for this API can be found at:
    https://docs.cloud.google.com/cluster-director/docs

NOTES
    These variants are also available:

        $ gcloud alpha cluster-director clusters list

        $ gcloud beta cluster-director clusters list
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the create example passes the storage flags without the `id` key that the flag definitions on this page list (`--create-filestores`, `--create-buckets` and `--create-lustres`: "Required fields: + id + name ..."; `--filestores`, `--buckets` and `--lustres` take `[id=ID],[name=NAME]`), and passes only a name to `--filestores`, `--buckets` and `--lustres`; the runnable form adds `id=` (the resource name's last segment) and writes the existing resources as `id=...,name=...`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the partition examples write the key as `nodesetIds`, while the SYNOPSIS, the Shorthand Example and the JSON Example of the partition flags use `nodeSetIds`; the runnable form uses `nodeSetIds`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
