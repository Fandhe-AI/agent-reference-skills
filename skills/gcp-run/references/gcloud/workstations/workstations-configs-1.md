---
source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/configs
---

# gcloud workstations configs (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud workstations configs create

```text
NAME
    gcloud workstations configs create - create a workstation configuration

SYNOPSIS
    gcloud workstations configs create
        (CONFIG : --cluster=CLUSTER --region=REGION)
        [--allowed-ports=[ALLOWED_PORTS,...]] [--async]
        [--boot-disk-size=BOOT_DISK_SIZE; default=50]
        [--container-args=[CONTAINER_ARGS,...]]
        [--container-command=[CONTAINER_COMMAND,...]]
        [--container-env=[CONTAINER_ENV,...]]
        [--container-run-as-user=CONTAINER_RUN_AS_USER]
        [--container-working-dir=CONTAINER_WORKING_DIR]
        [--disable-public-ip-addresses] [--disable-ssh-to-vm]
        [--disable-tcp-connections] [--enable-audit-agent]
        [--enable-confidential-compute] [--enable-nested-virtualization]
        [--enable-ssh-to-vm] [--endpoint-mode=ENDPOINT_MODE]
        [--ephemeral-directory=[PROPERTY=VALUE,...]]
        [--grant-workstation-admin-role-on-create]
        [--idle-timeout=IDLE_TIMEOUT; default=7200]
        [--instance-metadata=[INSTANCE_METADATA,...]] [--labels=[LABELS,...]]
        [--machine-type=MACHINE_TYPE; default="e2-standard-4"]
        [--max-usable-workstations-count=MAX_USABLE_WORKSTATIONS_COUNT]
        [--network-tags=[NETWORK_TAGS,...]] [--pool-size=POOL_SIZE; default=1]
        [--replica-zones=[REPLICA_ZONES,...]]
        [--running-timeout=RUNNING_TIMEOUT; default=7200]
        [--service-account=SERVICE_ACCOUNT]
        [--service-account-scopes=[SERVICE_ACCOUNT_SCOPES,...]]
        [--shielded-integrity-monitoring] [--shielded-secure-boot]
        [--shielded-vtpm] [--startup-script-uri=STARTUP_SCRIPT_URI]
        [--vm-tags=[VM_TAGS,...]]
        [--accelerator-count=ACCELERATOR_COUNT
          : --accelerator-type=ACCELERATOR_TYPE]
        [--container-custom-image=CONTAINER_CUSTOM_IMAGE
          | --container-predefined-image=CONTAINER_PREDEFINED_IMAGE;
          default="codeoss"]
        [--kms-key=KMS_KEY : --kms-key-service-account=KMS_KEY_SERVICE_ACCOUNT]
        [--no-persistent-storage | --disk-archive-timeout=DISK_ARCHIVE_TIMEOUT
          --disk-provisioned-iops=DISK_PROVISIONED_IOPS
          --disk-provisioned-throughput=DISK_PROVISIONED_THROUGHPUT
          --disk-reclaim-policy=DISK_RECLAIM_POLICY;
          default="delete" --disk-type=DISK_TYPE --disk-size=DISK_SIZE
          | --disk-source-snapshot=DISK_SOURCE_SNAPSHOT
          | --pd-disk-type=PD_DISK_TYPE; default="pd-standard"
          --pd-reclaim-policy=PD_RECLAIM_POLICY;
          default="delete" --pd-disk-size=PD_DISK_SIZE; default=200
          | --pd-source-snapshot=PD_SOURCE_SNAPSHOT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a workstation configuration.

EXAMPLES
    To create a configuration with the 'e2-standard-8' machine type and a
    IntelliJ image, run:

        $ gcloud workstations configs create CONFIG \
            --machine-type=e2-standard-8 \
            --container-predefined-image=intellij

    To create a configuration with a Shielded VM instance that enables Secure
    Boot, virtual trusted platform module (vTPM) and integrity monitoring, run:

        $ gcloud workstations configs create CONFIG \
            --machine-type=e2-standard-4 --shielded-secure-boot \
            --shielded-vtpm --shielded-integrity-monitoring

    To create a configuration with a non-default persistent disk containing
    10GB of PD SSD storage, run:        $ gcloud workstations configs create CONFIG \
            --machine-type=e2-standard-4 --pd-disk-type=pd-ssd \
            --pd-disk-size=10

POSITIONAL ARGUMENTS
     Config resource - The group of arguments defining a config The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONFIG
          ID of the config or fully qualified identifier for the config.

          To set the config attribute:
          + provide the argument config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The cluster for the config.

          To set the cluster attribute:
          + provide the argument config on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line;
          + set the property workstations/cluster.

       --region=REGION
          The region for the config.

          To set the region attribute:
          + provide the argument config on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property workstations/region.

FLAGS
     --allowed-ports=[ALLOWED_PORTS,...]
        A Single or Range of ports externally accessible in the workstation. If
        not specified defaults to ports 22, 80 and ports 1024-65535.

        To specify a single port, both first and last should be same.

        Example:

            $ gcloud workstations configs create \
                --allowed-ports=first=9000,last=9090
            $ gcloud workstations configs create --allowed-ports=first=80,last=80

        Sets allowed_ports value.

         first
            Required, sets first value.

         last
            Required, sets last value.

        Shorthand Example:

            --allowed-ports=first=int,last=int

        JSON Example:

            --allowed-ports='{"first": int, "last": int}'

        File Example:

            --allowed-ports=path_to_file.(yaml|json)

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --boot-disk-size=BOOT_DISK_SIZE; default=50
        Size of the boot disk in GB.

     --container-args=[CONTAINER_ARGS,...]
        Arguments passed to the entrypoint.

        Example:

            $ gcloud workstations configs create --container-args=arg_1,arg_2

     --container-command=[CONTAINER_COMMAND,...]
        If set, overrides the default ENTRYPOINT specified by the image.

        Example:

            $ gcloud workstations configs create \
                --container-command=executable,parameter_1,parameter_2

     --container-env=[CONTAINER_ENV,...]
        Environment variables passed to the container.

        Example:

            $ gcloud workstations configs create \
                --container-env=key1=value1,key2=value2

     --container-run-as-user=CONTAINER_RUN_AS_USER
        If set, overrides the USER specified in the image with the given uid.

     --container-working-dir=CONTAINER_WORKING_DIR
        If set, overrides the default DIR specified by the image.

     --disable-public-ip-addresses
        Default value is false. If set, instances will have no public IP
        address.

     --disable-ssh-to-vm
        (DEPRECATED) Default value is False. If set, workstations disable SSH
        connections to the root VM.

        The --disable-ssh-to-vm option is deprecated; use --enable-ssh-to-vm
        instead.

     --disable-tcp-connections
        Default value is false. If set, workstations don't allow plain TCP
        connections.

     --enable-audit-agent
        Whether to enable Linux auditd logging on the workstation. When
        enabled, a service account must also be specified that has
        logging.buckets.write permission on the project.

     --enable-confidential-compute
        Default value is false. If set, instances will have confidential
        compute enabled.

     --enable-nested-virtualization
        Default value is false. If set, instances will have nested
        virtualization enabled.

     --enable-ssh-to-vm
        Default value is False. If set, workstations enable SSH connections to
        the root VM.

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

     --ephemeral-directory=[PROPERTY=VALUE,...]
        Ephemeral directory which won't persist across workstation sessions. An
        ephemeral directory is backed by a Compute Engine persistent disk whose
        mount-path, source-snapshot, source-image, and read-only are
        configurable.

         mount-path
            Location of this directory in the running workstation.

         source-snapshot
            Name of the snapshot to use as the source for the disk. Must be
            empty if [source_image][] is set. Must be empty if [read_only][] is
            false. Updating [source_snapshot][] will update content in the
            ephemeral directory after the workstation is restarted.

         source-image
            Name of the disk image to use as the source for the disk. Must be
            empty if [source_snapshot][] is set. Updating [source_image][] will
            update content in the ephemeral directory after the workstation is
            restarted.

         read-only
            Whether the disk is read only. If true, the disk may be shared by
            multiple VMs and [source_snapshot][] must be set. Set to false when
            not specified and true when specified.

            Example:

                $ gcloud workstations configs create \
                    --ephemeral-directory="mount-path=/home2,disk-type=pd-balanced,s\
                ource-snapshot=projects/my-project/global/snapshots/snapshot,read-on\
                ly=true"

     --grant-workstation-admin-role-on-create
        Default value is false. If set, creator of a workstation will get
        roles/workstations.policyAdmin role along with roles/workstations.user
        role on the workstation created by them.

     --idle-timeout=IDLE_TIMEOUT; default=7200
        How long (in seconds) to wait before automatically stopping an instance
        that hasn't received any user traffic. A value of 0 indicates that this
        instance should never time out due to idleness.

     --instance-metadata=[INSTANCE_METADATA,...]
        Custom metadata to apply to Compute Engine instances.

        Example:

            $ gcloud workstations configs create \
                --instance-metadata=key1=value1,key2=value2

     --labels=[LABELS,...]
        Labels that are applied to the configuration and propagated to the
        underlying Compute Engine resources.

        Example:

            $ gcloud workstations configs create \
                --labels=label1=value1,label2=value2

     --machine-type=MACHINE_TYPE; default="e2-standard-4"
        Machine type determines the specifications of the Compute Engine
        machines that the workstations created under this configuration will
        run on.

     --max-usable-workstations-count=MAX_USABLE_WORKSTATIONS_COUNT
        Maximum number of workstations under this configuration a user can have
        workstations.workstation.use permission on.

        If not specified, defaults to 0, which indicates a user can have
        unlimited number of workstations under this configuration.

     --network-tags=[NETWORK_TAGS,...]
        Network tags to add to the Google Compute Engine machines backing the
        Workstations.

        Example:

            $ gcloud workstations configs create --network-tags=tag_1,tag_2

     --pool-size=POOL_SIZE; default=1
        Number of instances to pool for faster Workstation startup.

     --replica-zones=[REPLICA_ZONES,...]
        Specifies the zones the VM and disk resources will be replicated within
        the region. If set, exactly two zones within the workstation cluster's
        region must be specified.

        Example:

            $ gcloud workstations configs create \
                --replica-zones=us-central1-a,us-central1-f

     --running-timeout=RUNNING_TIMEOUT; default=7200
        How long (in seconds) to wait before automatically stopping a
        workstation after it started. A value of 0 indicates that workstations
        using this config should never time out.

     --service-account=SERVICE_ACCOUNT
        Email address of the service account that will be used on VM instances
        used to support this config. This service account must have permission
        to pull the specified container image. If not set, VMs will run without
        a service account, in which case the image must be publicly accessible.

     --service-account-scopes=[SERVICE_ACCOUNT_SCOPES,...]
        Scopes to grant to the service_account. Various scopes are
        automatically added based on feature usage. When specified, users of
        workstations under this configuration must have
        iam.serviceAccounts.actAs on the service account.

     --shielded-integrity-monitoring
        Default value is false. If set, instances will have integrity
        monitoring enabled.

     --shielded-secure-boot
        Default value is false. If set, instances will have Secure Boot
        enabled.

     --shielded-vtpm
        Default value is false. If set, instances will have vTPM enabled.

     --startup-script-uri=STARTUP_SCRIPT_URI
        Link to the startup script stored in Cloud Storage. The script is
        executed on the workstation VM after it is booted.

        Example:

            $ gcloud workstations configs create \
                --startup-script-uri=gs://{bucket-name}/{object-name}

     --vm-tags=[VM_TAGS,...]
        Resource manager tags to be bound to the instance. Tag keys and values
        have the same definition as
        https://cloud.google.com/resource-manager/docs/tags/tags-overview

        Example:

            $ gcloud workstations configs create \
                --vm-tags=tagKeys/key1=tagValues/value1,tagKeys/key2=tagValues/\
            value2

     Accelerator settings

     --accelerator-count=ACCELERATOR_COUNT
        The number of accelerator cards exposed to the instance.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --accelerator-type=ACCELERATOR_TYPE
        The type of accelerator resource to attach to the instance, for
        example, "nvidia-tesla-p100".

     At most one of these can be specified:

       --container-custom-image=CONTAINER_CUSTOM_IMAGE
          A docker image for the workstation. This image must be accessible by
          the service account configured in this configuration
          (--service-account). If no service account is defined, this image
          must be public.

       --container-predefined-image=CONTAINER_PREDEFINED_IMAGE; default="codeoss"
          Code editor on base images. CONTAINER_PREDEFINED_IMAGE must be one
          of:

           base-image
              Base image - no IDE
           clion
              CLion
           codeoss
              Code OSS
           codeoss-cuda
              Code OSS + CUDA toolkit
           goland
              GoLand
           intellij
              IntelliJ IDEA Ultimate
           phpstorm
              PhpStorm
           pycharm
              PyCharm Professional
           rider
              Rider
           rubymine
              RubyMine
           webstorm
              WebStorm

     Encryption key settings

     --kms-key=KMS_KEY
        The customer-managed encryption key to use for this config. If not
        specified, a Google-managed encryption key is used.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --kms-key-service-account=KMS_KEY_SERVICE_ACCOUNT
        The service account associated with the provided customer-managed
        encryption key.

     At most one of these can be specified:

       --no-persistent-storage
          If set, workstations under this configuration will not have a
          persistent directory.

       Or at least one of these can be specified:

         --disk-archive-timeout=DISK_ARCHIVE_TIMEOUT
            Number of seconds to wait after initially creating or subsequently
            shutting down the workstation before converting its disk into a
            snapshot to save costs. A value of 0 indicates that the disk will
            never be archived.

         --disk-provisioned-iops=DISK_PROVISIONED_IOPS
            Number of I/O operations per second that the disk can handle.
            Values must be between 3000 and 100,000.

         --disk-provisioned-throughput=DISK_PROVISIONED_THROUGHPUT
            Throughput in MB per second that the disk can handle. Values must
            be between 1 and 2,400.

         --disk-reclaim-policy=DISK_RECLAIM_POLICY; default="delete"
            What should happen to the disk after the Workstation is deleted.
            DISK_RECLAIM_POLICY must be one of:

             delete
                The persistent disk will be deleted with the Workstation.
             retain
                The persistent disk will be remain after the workstation is
                deleted and the administrator must manually delete the disk.

         --disk-type=DISK_TYPE
            Type of the persistent directory. DISK_TYPE must be one of:
            pd-standard, pd-balanced, pd-ssd, hyperdisk-balanced-ha.

         At most one of these can be specified:

           --disk-size=DISK_SIZE
              Size of the persistent directory in GB. DISK_SIZE must be one of:
              10, 50, 100, 200, 500, 1000.

           --disk-source-snapshot=DISK_SOURCE_SNAPSHOT
              Name of the snapshot to use as the source for the home disk.

       Or at least one of these can be specified:

         --pd-disk-type=PD_DISK_TYPE; default="pd-standard"
            Type of the persistent directory. PD_DISK_TYPE must be one of:
            pd-standard, pd-balanced, pd-ssd.

         --pd-reclaim-policy=PD_RECLAIM_POLICY; default="delete"
            What should happen to the disk after the Workstation is deleted.
            PD_RECLAIM_POLICY must be one of:

             delete
                The persistent disk will be deleted with the Workstation.
             retain
                The persistent disk will be remain after the workstation is
                deleted and the administrator must manually delete the disk.

         At most one of these can be specified:

           --pd-disk-size=PD_DISK_SIZE; default=200
              Size of the persistent directory in GB. PD_DISK_SIZE must be one
              of: 10, 50, 100, 200, 500, 1000.

           --pd-source-snapshot=PD_SOURCE_SNAPSHOT
              Name of the snapshot to use as the source for the home disk.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha workstations configs create

        $ gcloud beta workstations configs create
```

### gcloud workstations configs delete

```text
NAME
    gcloud workstations configs delete - delete a workstation configuration

SYNOPSIS
    gcloud workstations configs delete
        (CONFIG : --cluster=CLUSTER --region=REGION) [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a workstation configuration.

EXAMPLES
    To delete a configuration, run:

        $ gcloud workstations configs delete WORKSTATION

POSITIONAL ARGUMENTS
     Config resource - The name of the configuration to delete. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONFIG
          ID of the config or fully qualified identifier for the config.

          To set the config attribute:
          + provide the argument config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The name of the cluster containing the config.

          To set the cluster attribute:
          + provide the argument config on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line;
          + set the property workstations/cluster.

       --region=REGION
          The name of the region of the config.

          To set the region attribute:
          + provide the argument config on the command line with a fully
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

        $ gcloud alpha workstations configs delete

        $ gcloud beta workstations configs delete
```

### gcloud workstations configs describe

```text
NAME
    gcloud workstations configs describe - describe a config

SYNOPSIS
    gcloud workstations configs describe
        (CONFIG : --cluster=CLUSTER --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a config.

EXAMPLES
    To describe a config, run:

        $ gcloud workstations configs describe CONFIG

POSITIONAL ARGUMENTS
     Config resource - The name of the config to display. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONFIG
          ID of the config or fully qualified identifier for the config.

          To set the config attribute:
          + provide the argument config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The name of the cluster containing the config.

          To set the cluster attribute:
          + provide the argument config on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line;
          + set the property workstations/cluster.

       --region=REGION
          The name of the region of the config.

          To set the region attribute:
          + provide the argument config on the command line with a fully
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

        $ gcloud alpha workstations configs describe

        $ gcloud beta workstations configs describe
```

### gcloud workstations configs get-iam-policy

```text
NAME
    gcloud workstations configs get-iam-policy - get the IAM policy for a
        configuration

SYNOPSIS
    gcloud workstations configs get-iam-policy
        (CONFIG : --cluster=CLUSTER --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud workstations configs get-iam-policy displays the IAM policy
    associated with a given configuration. If formatted as JSON, the output can
    be edited and used as a policy file for set-iam-policy. The output includes
    an "etag" field identifying the version emitted and allowing detection of
    concurrent policy updates; see $ {parent} set-iam-policy for additional
    details.

EXAMPLES
    To get the IAM policy for a given configuration, run:

        $ gcloud workstations configs get-iam-policy CONFIG

POSITIONAL ARGUMENTS
     Config resource - The configuration for which to display the IAM policy.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONFIG
          ID of the config or fully qualified identifier for the config.

          To set the config attribute:
          + provide the argument config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The name of the cluster containing the config.

          To set the cluster attribute:
          + provide the argument config on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line;
          + set the property workstations/cluster.

       --region=REGION
          The name of the region of the config.

          To set the region attribute:
          + provide the argument config on the command line with a fully
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

        $ gcloud alpha workstations configs get-iam-policy

        $ gcloud beta workstations configs get-iam-policy
```

### gcloud workstations configs list

```text
NAME
    gcloud workstations configs list - list workstation configurations

SYNOPSIS
    gcloud workstations configs list [--endpoint-mode=ENDPOINT_MODE]
        [--cluster=CLUSTER --region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all workstation configurations under the specified cluster.

EXAMPLES
    To list workstation configurations, run:

        $ gcloud workstations configs list

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

     Cluster resource - The cluster of the configurations to display. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --cluster on the command line with a fully
        specified name;
      * set the property workstations/cluster with a fully specified name;
      * default is all clusters with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --cluster=CLUSTER
        ID of the cluster or fully qualified identifier for the cluster.

        To set the cluster attribute:
        * provide the argument --cluster on the command line;
        * set the property workstations/cluster;
        * default is all clusters .

     --region=REGION
        The name of the region of the cluster.

        To set the region attribute:
        * provide the argument --cluster on the command line with a fully
          specified name;
        * set the property workstations/cluster with a fully specified name;
        * default is all clusters with a fully specified name;
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

        $ gcloud alpha workstations configs list

        $ gcloud beta workstations configs list
```

### gcloud workstations configs set-iam-policy

```text
NAME
    gcloud workstations configs set-iam-policy - set the IAM policy for a
        configuration

SYNOPSIS
    gcloud workstations configs set-iam-policy
        (CONFIG : --cluster=CLUSTER --region=REGION) POLICY_FILE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given configuration as defined in a JSON or
    YAML file.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    'policy.json' and set it for the given configuration:

        $ gcloud workstations configs set-iam-policy CONFIG policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Config resource - The configuration for which to display the IAM policy.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONFIG
          ID of the config or fully qualified identifier for the config.

          To set the config attribute:
          + provide the argument config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The name of the cluster containing the config.

          To set the cluster attribute:
          + provide the argument config on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line;
          + set the property workstations/cluster.

       --region=REGION
          The name of the region of the config.

          To set the region attribute:
          + provide the argument config on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property workstations/region.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

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

        $ gcloud alpha workstations configs set-iam-policy

        $ gcloud beta workstations configs set-iam-policy
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud workstations configs create --disable-ssh-to-vm`: "The --disable-ssh-to-vm option is deprecated; use --enable-ssh-to-vm instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
