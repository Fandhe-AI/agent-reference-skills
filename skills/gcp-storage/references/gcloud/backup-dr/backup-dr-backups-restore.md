---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backups/restore
---

# gcloud backup-dr backups restore

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr backups restore compute

```text
NAME
    gcloud backup-dr backups restore compute - restores a Compute Engine VM
        Backup

SYNOPSIS
    gcloud backup-dr backups restore compute
        (BACKUP : --backup-vault=BACKUP_VAULT
          --data-source=DATA_SOURCE --location=LOCATION) --name=NAME
        --target-project=TARGET_PROJECT --target-zone=TARGET_ZONE
        [--accelerator=[count=COUNT],[type=TYPE]] [--async]
        [--[no-]can-ip-forward] [--clear-encryption-key]
        [--confidential-compute] [--create-disk=[PROPERTY=VALUE,...]]
        [--[no-]deletion-protection] [--description=DESCRIPTION]
        [--[no-]enable-display-device] [--[no-]enable-uefi-networking]
        [--hostname=HOSTNAME] [--instance-kms-key=INSTANCE_KMS_KEY]
        [--instance-termination-action=INSTANCE_TERMINATION_ACTION]
        [--key-revocation-action-type=POLICY] [--labels=[KEY=VALUE,...]]
        [--local-ssd-recovery-timeout=LOCAL_SSD_RECOVERY_TIMEOUT]
        [--machine-type=MACHINE_TYPE] [--maintenance-policy=MAINTENANCE_POLICY]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]] [--min-cpu-platform=PLATFORM]
        [--min-node-cpu=MIN_NODE_CPU]
        [--network-interface=[PROPERTY=VALUE,...]]
        [--network-performance-configs=[PROPERTY=VALUE,...]]
        [--[no-]preemptible]
        [--private-ipv6-google-access-type=PRIVATE_IPV6_GOOGLE_ACCESS_TYPE]
        [--provisioning-model=PROVISIONING_MODEL]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--resource-policies=RESOURCE_POLICY,[...]] [--[no-]restart-on-failure]
        [--service-account=SERVICE_ACCOUNT] [--tags=TAG,[TAG,...]]
        [--threads-per-core=THREADS_PER_CORE] [--use-project-service-account]
        [--visible-core-count=VISIBLE_CORE_COUNT]
        [--reservation=RESERVATION --reservation-affinity=RESERVATION_AFFINITY]
        [--scopes=[SCOPE,...] | --no-scopes] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Restores a Compute Engine VM Backup.

EXAMPLES
    To restore a backup sample-backup in project sample-project and location
    us-central1, with sample-data-store and sample-backup-vault, and additional
    target properties, run:

        $ gcloud backup-dr backups restore compute sample-backup \
            --project=sample-project --location=us-central1 \
            --backup-vault=sample-backup-vault \
            --data-source=sample-data-source --<target-properties>

POSITIONAL ARGUMENTS
     Backup resource - The backup of a resource to be restored. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the Backup or fully qualified identifier for the Backup.

          To set the name attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --backup-vault=BACKUP_VAULT
          The ID of the Backup Vault.

          To set the backup-vault attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --backup-vault on the command line.

       --data-source=DATA_SOURCE
          The ID of the Data Source.

          To set the data-source attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --data-source on the command line.

       --location=LOCATION
          The location of the Backup.

          To set the location attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --name=NAME
        Name of the restored Compute Instance.

     --target-project=TARGET_PROJECT
        Project where the restore should happen.

     --target-zone=TARGET_ZONE
        Zone where the target instance is restored.

OPTIONAL FLAGS
     --accelerator=[count=COUNT],[type=TYPE]
        Attaches accelerators (e.g. GPUs) to the instances.

         type
            The specific type (e.g. nvidia-tesla-k80 for nVidia Tesla K80) of
            accelerator to attach to the instances. Use 'gcloud compute
            accelerator-types list' to learn about all available accelerator
            types.

         count
            Number of accelerators to attach to each instance. The default
            value is 1.

     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --[no-]can-ip-forward
        If provided, allows the restored instances to send and receive packets
        with non-matching destination or source IP addresses. Use
        --can-ip-forward to enable and --no-can-ip-forward to disable.

     --clear-encryption-key
        Clears the CMEK encryption of the restored disks and defaults to GMEK
        unless the kms-key is specified in the --create-disk flag.

     --confidential-compute
        The restored instance boots with Confidential Computing enabled.
        Confidential Computing is based on Secure Encrypted Virtualization
        (SEV), an AMD virtualization feature for running confidential
        instances.

     --create-disk=[PROPERTY=VALUE,...]
        Creates and attaches persistent disks to the instances.

        name: Specifies the name of the disk.

        replica-zones: Required for each regional disk associated with the
        instance. Specify the URLs of the zones where the disk should be
        replicated to. You must provide exactly two replica zones, and one zone
        must be the same as the instance zone.

        device-name: Device name of the disk from the source instance.

        kms-key: The Cloud KMS key resource name to be used for encryption. If
        supplied, it will encrypt the disk with the given key, if not supplied,
        the restored disk will use the encryption of the disk from the source
        instance. The device-name field must be provided for kms-key to take
        effect. Format:
        'projects/{project}/locations/{location}/keyRings/{ring}/cryptoKeys/{key}'

     --[no-]deletion-protection
        Enables deletion protection for the restored instance. Use
        --deletion-protection to enable and --no-deletion-protection to
        disable.

     --description=DESCRIPTION
        Specifies a textual description of the restored instance.

     --[no-]enable-display-device
        Enable a display device on the restored VM instances. Disabled by
        default. Use --enable-display-device to enable and
        --no-enable-display-device to disable.

     --[no-]enable-uefi-networking
        If set to true, enables UEFI networking for the instance creation. Use
        --enable-uefi-networking to enable and --no-enable-uefi-networking to
        disable.

     --hostname=HOSTNAME
        Specify the hostname of the restore instance to be created. The
        specified hostname must be RFC1035 compliant. If hostname is not
        specified, the default hostname is
        [INSTANCE_NAME].c.[TARGET_PROJECT_ID].internal when using the global
        DNS, and [INSTANCE_NAME].[ZONE].c.[TARGET_PROJECT_ID].internal when
        using zonal DNS.

     --instance-kms-key=INSTANCE_KMS_KEY
        The Cloud KMS (Key Management Service) cryptokey that will be used to
        protect the restored instance.

        Provide the full resource name of the cryptokey in the format:
        projects/<project>/locations/<location>/keyRings/<key-ring>/cryptoKeys/<key>

     --instance-termination-action=INSTANCE_TERMINATION_ACTION
        Specifies the termination action that will be taken upon VM preemption
        (--provisioning-model=SPOT) or automatic instance termination
        (--max-run-duration or --termination-time).

        INSTANCE_TERMINATION_ACTION must be one of:

         DELETE
            Permanently delete the VM.
         STOP
            Default only for Spot VMs. Stop the VM without preserving memory.
            The VM can be restarted later.

     --key-revocation-action-type=POLICY
        Specifies the behavior of the instance when the KMS key of one of its
        attached disks is revoked. The default is none. POLICY must be one of:
        * none No operation is performed.
        * stop The instance is stopped when the KMS key of one of its
          attached disks is revoked.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (), lowercase characters, and
        numbers.

     --local-ssd-recovery-timeout=LOCAL_SSD_RECOVERY_TIMEOUT
        Specifies the maximum amount of time a Local SSD VM should wait while
        recovery of the Local SSD state is attempted. Its value should be in
        between 0 and 168 hours with hour granularity and the default value
        being 1 hour.

     --machine-type=MACHINE_TYPE
        Specifies the machine type used for the restored instance. To get a
        list of available machine types, run 'gcloud compute machine-types
        list'. If unspecified, the default type will be based on the source
        instance.

        This can either be the fully qualified path or the name. For example:
        * --machine-type=projects/my-project/zones/us-central1-a/machineTypes/n1-standard-1
        * --machine-type=n1-standard-1

     --maintenance-policy=MAINTENANCE_POLICY
        Specifies the behavior of the VMs when their host machines undergo
        maintenance. The default is MIGRATE. For more information, see
        https://cloud.google.com/compute/docs/instances/host-maintenance-options.
        MAINTENANCE_POLICY must be one of:

         MIGRATE
            The instances should be migrated to a new host. This will
            temporarily impact the performance of instances during a migration
            event.
         TERMINATE
            The instances should be terminated.

     --metadata=KEY=VALUE,[KEY=VALUE,...]
        Metadata to be made available to the guest operating system running on
        the instances. Each metadata entry is a key/value pair separated by an
        equals sign. Each metadata key must be unique and have a max of 128
        bytes in length. Each value must have a max of 256 KB in length.
        Multiple arguments can be passed to this flag, e.g., --metadata
        key-1=value-1,key-2=value-2,key-3=value-3. The combined total size for
        all metadata entries is 512 KB.

        In images that have Compute Engine tools installed on them, such as the
        official images (https://cloud.google.com/compute/docs/images), the
        following metadata keys have special meanings:

         startup-script
            Specifies a script that will be executed by the instances once they
            start running.

         startup-script-url
            Same as startup-script except that the script contents are pulled
            from a Cloud Storage location (e.g., gs://bucket/file.sh or
            https://storage.googleapis.com/bucket/file.sh).

            For startup scripts on Windows instances, the following metadata
            keys have special meanings: windows-startup-script-url,
            windows-startup-script-cmd, windows-startup-script-bat,
            windows-startup-script-ps1, sysprep-specialize-script-url,
            sysprep-specialize-script-cmd, sysprep-specialize-script-bat, and
            sysprep-specialize-script-ps1. For more information, see Running
            startup scripts
            (https://cloud.google.com/compute/docs/startupscript).

     --min-cpu-platform=PLATFORM
        When specified, the VM will be scheduled on host with specified CPU
        architecture or a newer one. To list available CPU platforms in given
        zone, run:

            $ gcloud compute zones describe ZONE \
              --format="value(availableCpuPlatforms)"

        Default setting is "AUTOMATIC".

        CPU platform selection is available only in selected zones.

        You can find more information on-line:
        https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform

     --min-node-cpu=MIN_NODE_CPU
        Minimum number of virtual CPUs this instance will consume when running
        on a sole-tenant node.

     --network-interface=[PROPERTY=VALUE,...]
        Adds a network interface to the instance. This flag can be repeated to
        specify multiple network interfaces. The following keys are allowed:
        network, subnet, private-network-ip, internal-ipv6-address,
        internal-ipv6-prefix-length, address, external-ipv6-address,
        external-ipv6-prefix-length, network-tier, aliases, stack-type,
        queue-count, nic-type, network-attachment

     --network-performance-configs=[PROPERTY=VALUE,...]
        Configures network performance settings for the restored instance. If
        this flag is not specified, the restored instance will be created with
        its source instance's network performance configuration.

         total-egress-bandwidth-tier
            Total egress bandwidth is the available outbound bandwidth from a
            VM, regardless of whether the traffic is going to internal IP or
            external IP destinations. The following tier values are allowed:
            [DEFAULT, TIER_1]

     --[no-]preemptible
        If provided, instances will be preemptible and time-limited. Instances
        might be preempted to free up resources for standard VM instances, and
        will only be able to run for a limited amount of time. Preemptible
        instances can not be restarted and will not migrate. Use --preemptible
        to enable and --no-preemptible to disable.

     --private-ipv6-google-access-type=PRIVATE_IPV6_GOOGLE_ACCESS_TYPE
        The private IPv6 Google access type for the restored VM.
        PRIVATE_IPV6_GOOGLE_ACCESS_TYPE must be one of: inherit-subnetwork,
        enable-bidirectional-access, enable-outbound-vm-access

     --provisioning-model=PROVISIONING_MODEL
        Specifies provisioning model, which determines price, obtainability,
        and runtime for the restored VM instance. PROVISIONING_MODEL must be
        one of:

         SPOT
            Spot VMs are spare capacity; Spot VMs are discounted to have much
            lower prices than standard VMs but have no guaranteed runtime. Spot
            VMs are the new version of preemptible VM instances, except Spot
            VMs do not have a 24-hour maximum runtime.
         STANDARD
            Default. Standard provisioning model for VM instances, which has
            user-controlled runtime but no Spot discounts.

     --resource-manager-tags=[KEY=VALUE,...]
        Specifies a list of resource manager tags to apply to the instance.

     --resource-policies=RESOURCE_POLICY,[...]
        A list of resource policy names to be added to the instance. The
        policies must exist in the same region as the instance.

     --[no-]restart-on-failure
        The instances will be restarted if they are terminated by Compute
        Engine. This does not affect terminations performed by the user. Use
        --restart-on-failure to enable and --no-restart-on-failure to disable.

     --service-account=SERVICE_ACCOUNT
        A service account is an identity attached to the instance. Its access
        tokens can be accessed through the instance metadata server and are
        used to authenticate applications on the instance. The account can be
        set using an email address corresponding to the required service
        account. If not provided, the instance will use the project's default
        service account.

     --tags=TAG,[TAG,...]
        Specifies a list of tags to apply to the instance. These tags allow
        network firewall rules and routes to be applied to specified VM
        instances. See gcloud compute firewall-rules create(1) for more
        details.

     --threads-per-core=THREADS_PER_CORE
        The number of visible threads per physical core. To disable
        simultaneous multithreading (SMT) set this to 1. Valid values are: 1 or
        2.

        For more information about configuring SMT, see:
        https://cloud.google.com/compute/docs/instances/configuring-simultaneous-multithreading.

     --use-project-service-account
        If set, the BackupDR Project Service Agent (P4SA) credentials will be
        used for the restore operation instead of the Backup Vault Service
        Account. This is only supported for same-project restores.

     --visible-core-count=VISIBLE_CORE_COUNT
        The number of physical cores to expose to the instance's guest
        operating system. The number of virtual CPUs visible to the instance's
        guest operating system is this number of cores multiplied by the
        instance's count of visible threads per physical core.

     Specifies the reservation for the instance.

     --reservation=RESERVATION
        The name of the reservation, required when
        --reservation-affinity=specific.

     --reservation-affinity=RESERVATION_AFFINITY
        Specifies the reservation affinity of the instance.
        RESERVATION_AFFINITY must be one of:

         any
            Consume any available, matching reservation.
         none
            Do not consume from any reserved capacity.
         specific
            Must consume from a specific reservation.

     At most one of these can be specified:

       --scopes=[SCOPE,...]
          If not provided, the instance will be assigned the default scopes,
          described below. However, if neither --scopes nor --no-scopes are
          specified and the project has no default service account, then the
          instance will be created with no scopes. Note that the level of
          access that a service account has is determined by a combination of
          access scopes and IAM roles so you must configure both access scopes
          and IAM roles for the service account to work properly. SCOPE can be
          either the full URI of the scope or an alias. Default scopes are
          assigned to all instances. Available aliases are:
          https://cloud.google.com/sdk/gcloud/reference/compute/instances/create#--scopes

       --no-scopes
          Create the instance with no scopes.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Restores the specified backup

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backups restore compute

        $ gcloud beta backup-dr backups restore compute
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud backup-dr backups restore compute sample-backup \
    --project=sample-project \
    --location=us-central1 \
    --backup-vault=sample-backup-vault \
    --data-source=sample-data-source \
    --name=sample-restored-vm \
    --target-project=sample-project \
    --target-zone=us-central1-a
```

### gcloud backup-dr backups restore disk

```text
NAME
    gcloud backup-dr backups restore disk - restores a Compute Disk Backup

SYNOPSIS
    gcloud backup-dr backups restore disk
        (BACKUP : --backup-vault=BACKUP_VAULT
          --data-source=DATA_SOURCE --location=LOCATION) --name=NAME
        --target-project=TARGET_PROJECT [--access-mode=ACCESS_MODE]
        [--architecture=ARCHITECTURE] [--async] [--clear-encryption-key]
        [--confidential-compute] [--description=DESCRIPTION]
        [--guest-os-features=[GUEST_OS_FEATURES,...]] [--kms-key=KMS_KEY]
        [--labels=[KEY=VALUE,...]] [--licenses=LICENSE,[LICENSE,...]]
        [--provisioned-iops=PROVISIONED_IOPS]
        [--provisioned-throughput=PROVISIONED_THROUGHPUT]
        [--replica-zones=ZONE,ZONE] [--resource-policies=RESOURCE_POLICY,[...]]
        [--size=SIZE] [--storage-pool=STORAGE_POOL]
        [--target-region=TARGET_REGION] [--target-zone=TARGET_ZONE]
        [--type=TYPE] [--use-project-service-account]
        [--source-instance-boot-disk
          | --source-instance-disk-device-name=SOURCE_INSTANCE_DISK_DEVICE_NAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Restores a Compute Disk Backup.

EXAMPLES
    To restore a backup sample-backup in project sample-project and location
    us-central1, with sample-data-store and sample-backup-vault, and additional
    target properties, run:

        $ gcloud backup-dr backups restore disk sample-backup \
            --project=sample-project --location=us-central1 \
            --backup-vault=sample-backup-vault \
            --data-source=sample-data-source --<target-properties>

POSITIONAL ARGUMENTS
     Backup resource - The backup of a resource to be restored. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the Backup or fully qualified identifier for the Backup.

          To set the name attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --backup-vault=BACKUP_VAULT
          The ID of the Backup Vault.

          To set the backup-vault attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --backup-vault on the command line.

       --data-source=DATA_SOURCE
          The ID of the Data Source.

          To set the data-source attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --data-source on the command line.

       --location=LOCATION
          The location of the Backup.

          To set the location attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --name=NAME
        Name of the restored Disk.

     --target-project=TARGET_PROJECT
        Project where the restore should happen.

OPTIONAL FLAGS
     --access-mode=ACCESS_MODE
        Specifies how VMs attached to the disk can access the data on the disk.
        To grant read-only access to multiple VMs attached to the disk, set
        access-mode to READ_ONLY_MANY. To grant read-write access to only one
        VM attached to the disk, use READ_WRITE_SINGLE. READ_WRITE_SINGLE is
        used if omitted. ACCESS_MODE must be one of: READ_ONLY_MANY,
        READ_WRITE_MANY, READ_WRITE_SINGLE. ACCESS_MODE must be one of:

         READ_ONLY_MANY
            The AccessMode means the disk can be attached to multiple instances
            in RW mode.
         READ_WRITE_MANY
            The AccessMode means the disk can be attached to multiple instances
            in RO mode.
         READ_WRITE_SINGLE
            The default AccessMode, means the disk can be attached to single
            instance in RW mode.

     --architecture=ARCHITECTURE
        Specifies the architecture or processor type that this disk can
        support. For available processor types on Compute Engine, see
        https://cloud.google.com/compute/docs/cpu-platforms. ARCHITECTURE must
        be one of: ARM64, X86_64. ARCHITECTURE must be one of:

         ARM64
            The disk can only be used with ARM64 machines.
         X86_64
            The disk can only be used with x86_64 machines.

     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --clear-encryption-key
        The restored disk reverts to GMEK (CMEK is disabled).

     --confidential-compute
        Creates the disk with confidential compute mode enabled. Encryption
        with a Cloud KMS key is required to enable this option.

     --description=DESCRIPTION
        Specifies a textual description of the restored disk.

     --guest-os-features=[GUEST_OS_FEATURES,...]
        Enables one or more features for VM instances that use the image for
        their boot disks. See the descriptions of supported features at:
        https://cloud.google.com/compute/docs/images/create-delete-deprecate-private-images#guest-os-features.
        GUEST_OS_FEATURE must be one of: VIRTIO_SCSI_MULTIQUEUE, WINDOWS,
        MULTI_IP_SUBNET, UEFI_COMPATIBLE, SEV_CAPABLE, SEV_LIVE_MIGRATABLE,
        SEV_LIVE_MIGRATABLE_V2, SEV_SNP_CAPABLE, GVNIC, IDPF, TDX_CAPABLE,
        SUSPEND_RESUME_COMPATIBLE.

     --kms-key=KMS_KEY
        The Cloud KMS (Key Management Service) cryptokey that will be used to
        protect the disk Provide the full resource name of the cryptokey in the
        format:
        projects/<project>/locations/<location>/keyRings/<key-ring>/cryptoKeys/<key>

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (), lowercase characters, and
        numbers.

     --licenses=LICENSE,[LICENSE,...]
        A list of URIs to license resources. The provided licenses will be
        added onto the created disks to indicate the licensing and billing
        policies.

     --provisioned-iops=PROVISIONED_IOPS
        Provisioned IOPS of disk to create. Only for use with disks of type
        pd-extreme and hyperdisk-extreme.

     --provisioned-throughput=PROVISIONED_THROUGHPUT
        Provisioned throughput of disk to create. The throughput unit is MB per
        sec. Only for use with disks of type hyperdisk-throughput.

     --replica-zones=ZONE,ZONE
        A comma-separated list of exactly 2 URLs of the zones where the disk
        should be replicated to. Required when restoring to a regional disk.
        The zones must be in the same region as specified in the
        --target-region flag. See available zones with gcloud compute zones
        list.

     --resource-policies=RESOURCE_POLICY,[...]
        A list of resource policy names to be added to the disk. The policies
        must exist in the same region as the disk.

     --size=SIZE
        Size of the disk in GB. Disk size must be a multiple of 1 GB. If disk
        size is not specified, the default size of 500GB for pd-standard disks,
        100GB for pd-balanced disks, 100GB for pd-ssd disks, and 1000GB for
        pd-extreme disks will be used. For details about disk size limits,
        refer to: https://cloud.google.com/compute/docs/disks

     --storage-pool=STORAGE_POOL
        Specifies the URI of the storage pool in which the disk is created.

     --target-region=TARGET_REGION
        Region where the target disk is restored. This flag is mutually
        exclusive with --target-zone.

     --target-zone=TARGET_ZONE
        Zone where the target disk is restored. This flag is mutually exclusive
        with --target-region.

     --type=TYPE
        URL of the disk type describing which disk type to use to restore the
        disk. For example: projects/project/zones/zone/diskTypes/pd-ssd. To get
        a list of available disk types, run gcloud compute disk-types list. The
        default disk type is pd-standard.

     --use-project-service-account
        If set, the BackupDR Project Service Agent (P4SA) credentials will be
        used for the restore operation instead of the Backup Vault Service
        Account. This is only supported for same-project restores.

     At most one of these can be specified:

       --source-instance-boot-disk
          Whether to restore the boot disk of the instance.

       --source-instance-disk-device-name=SOURCE_INSTANCE_DISK_DEVICE_NAME
          The device name of the disk to be restored. This is the device name
          of the disk as specified in the original VM instance backup. This is
          different from source disk resource name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Restores the specified backup

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backups restore disk

        $ gcloud beta backup-dr backups restore disk
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud backup-dr backups restore disk sample-backup \
    --project=sample-project \
    --location=us-central1 \
    --backup-vault=sample-backup-vault \
    --data-source=sample-data-source \
    --name=sample-restored-disk \
    --target-project=sample-project \
    --target-zone=us-central1-a
```

### gcloud beta backup-dr backups restore compute

```text
NAME
    gcloud beta backup-dr backups restore compute - restores a Compute Engine
        VM Backup

SYNOPSIS
    gcloud beta backup-dr backups restore compute
        (BACKUP : --backup-vault=BACKUP_VAULT
          --data-source=DATA_SOURCE --location=LOCATION) --name=NAME
        --target-project=TARGET_PROJECT --target-zone=TARGET_ZONE
        [--accelerator=[count=COUNT],[type=TYPE]] [--async]
        [--[no-]can-ip-forward] [--clear-encryption-key]
        [--confidential-compute] [--create-disk=[PROPERTY=VALUE,...]]
        [--[no-]deletion-protection] [--description=DESCRIPTION]
        [--[no-]enable-display-device] [--[no-]enable-uefi-networking]
        [--hostname=HOSTNAME] [--instance-kms-key=INSTANCE_KMS_KEY]
        [--instance-termination-action=INSTANCE_TERMINATION_ACTION]
        [--key-revocation-action-type=POLICY] [--labels=[KEY=VALUE,...]]
        [--local-ssd-recovery-timeout=LOCAL_SSD_RECOVERY_TIMEOUT]
        [--machine-type=MACHINE_TYPE] [--maintenance-policy=MAINTENANCE_POLICY]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]] [--min-cpu-platform=PLATFORM]
        [--min-node-cpu=MIN_NODE_CPU]
        [--network-interface=[PROPERTY=VALUE,...]]
        [--network-performance-configs=[PROPERTY=VALUE,...]]
        [--[no-]preemptible]
        [--private-ipv6-google-access-type=PRIVATE_IPV6_GOOGLE_ACCESS_TYPE]
        [--provisioning-model=PROVISIONING_MODEL]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--resource-policies=RESOURCE_POLICY,[...]] [--[no-]restart-on-failure]
        [--service-account=SERVICE_ACCOUNT] [--tags=TAG,[TAG,...]]
        [--threads-per-core=THREADS_PER_CORE] [--use-project-service-account]
        [--visible-core-count=VISIBLE_CORE_COUNT]
        [--reservation=RESERVATION --reservation-affinity=RESERVATION_AFFINITY]
        [--scopes=[SCOPE,...] | --no-scopes] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backups restore disk

```text
NAME
    gcloud beta backup-dr backups restore disk - restores a Compute Disk Backup

SYNOPSIS
    gcloud beta backup-dr backups restore disk
        (BACKUP : --backup-vault=BACKUP_VAULT
          --data-source=DATA_SOURCE --location=LOCATION) --name=NAME
        --target-project=TARGET_PROJECT [--access-mode=ACCESS_MODE]
        [--architecture=ARCHITECTURE] [--async] [--clear-encryption-key]
        [--confidential-compute] [--description=DESCRIPTION]
        [--guest-os-features=[GUEST_OS_FEATURES,...]] [--kms-key=KMS_KEY]
        [--labels=[KEY=VALUE,...]] [--licenses=LICENSE,[LICENSE,...]]
        [--provisioned-iops=PROVISIONED_IOPS]
        [--provisioned-throughput=PROVISIONED_THROUGHPUT]
        [--replica-zones=ZONE,ZONE] [--resource-policies=RESOURCE_POLICY,[...]]
        [--size=SIZE] [--storage-pool=STORAGE_POOL]
        [--target-region=TARGET_REGION] [--target-zone=TARGET_ZONE]
        [--type=TYPE] [--use-project-service-account]
        [--source-instance-boot-disk
          | --source-instance-disk-device-name=SOURCE_INSTANCE_DISK_DEVICE_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backups restore compute

```text
NAME
    gcloud alpha backup-dr backups restore compute - restores a Compute Engine
        VM Backup

SYNOPSIS
    gcloud alpha backup-dr backups restore compute
        (BACKUP : --backup-vault=BACKUP_VAULT
          --data-source=DATA_SOURCE --location=LOCATION) --name=NAME
        --target-project=TARGET_PROJECT --target-zone=TARGET_ZONE
        [--accelerator=[count=COUNT],[type=TYPE]] [--async]
        [--[no-]can-ip-forward] [--clear-encryption-key]
        [--confidential-compute] [--create-disk=[PROPERTY=VALUE,...]]
        [--[no-]deletion-protection] [--description=DESCRIPTION]
        [--[no-]enable-display-device] [--[no-]enable-uefi-networking]
        [--hostname=HOSTNAME] [--instance-kms-key=INSTANCE_KMS_KEY]
        [--instance-termination-action=INSTANCE_TERMINATION_ACTION]
        [--key-revocation-action-type=POLICY] [--labels=[KEY=VALUE,...]]
        [--local-ssd-recovery-timeout=LOCAL_SSD_RECOVERY_TIMEOUT]
        [--machine-type=MACHINE_TYPE] [--maintenance-policy=MAINTENANCE_POLICY]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]] [--min-cpu-platform=PLATFORM]
        [--min-node-cpu=MIN_NODE_CPU]
        [--network-interface=[PROPERTY=VALUE,...]]
        [--network-performance-configs=[PROPERTY=VALUE,...]]
        [--[no-]preemptible]
        [--private-ipv6-google-access-type=PRIVATE_IPV6_GOOGLE_ACCESS_TYPE]
        [--provisioning-model=PROVISIONING_MODEL]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--resource-policies=RESOURCE_POLICY,[...]] [--[no-]restart-on-failure]
        [--service-account=SERVICE_ACCOUNT] [--tags=TAG,[TAG,...]]
        [--threads-per-core=THREADS_PER_CORE] [--use-project-service-account]
        [--visible-core-count=VISIBLE_CORE_COUNT]
        [--reservation=RESERVATION --reservation-affinity=RESERVATION_AFFINITY]
        [--scopes=[SCOPE,...] | --no-scopes] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backups restore disk

```text
NAME
    gcloud alpha backup-dr backups restore disk - restores a Compute Disk
        Backup

SYNOPSIS
    gcloud alpha backup-dr backups restore disk
        (BACKUP : --backup-vault=BACKUP_VAULT
          --data-source=DATA_SOURCE --location=LOCATION) --name=NAME
        --target-project=TARGET_PROJECT [--access-mode=ACCESS_MODE]
        [--architecture=ARCHITECTURE] [--async] [--clear-encryption-key]
        [--confidential-compute] [--description=DESCRIPTION]
        [--guest-os-features=[GUEST_OS_FEATURES,...]] [--kms-key=KMS_KEY]
        [--labels=[KEY=VALUE,...]] [--licenses=LICENSE,[LICENSE,...]]
        [--provisioned-iops=PROVISIONED_IOPS]
        [--provisioned-throughput=PROVISIONED_THROUGHPUT]
        [--replica-zones=ZONE,ZONE] [--resource-policies=RESOURCE_POLICY,[...]]
        [--size=SIZE] [--storage-pool=STORAGE_POOL]
        [--target-region=TARGET_REGION] [--target-zone=TARGET_ZONE]
        [--type=TYPE] [--use-project-service-account]
        [--source-instance-boot-disk
          | --source-instance-disk-device-name=SOURCE_INSTANCE_DISK_DEVICE_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (the help text above is verbatim): the `restore disk` help describes `READ_ONLY_MANY` as "attached to multiple instances in RW mode" and `READ_WRITE_MANY` as "attached to multiple instances in RO mode", which is reversed: as the flag description just above says, `READ_ONLY_MANY` grants read-only access to multiple VMs and `READ_WRITE_MANY` grants read-write access to multiple VMs.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the restore examples end with `--<target-properties>`, which is not a flag, and omit flags the SYNOPSIS and REQUIRED FLAGS mark as required; the runnable forms pass `--name`, `--target-project` and `--target-zone` (compute) or `--target-zone` (disk; `--target-region` is the mutually exclusive alternative) with example values.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backups/restore (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
