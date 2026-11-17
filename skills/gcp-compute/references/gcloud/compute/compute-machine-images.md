---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/machine-images
---

# gcloud compute machine-images

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute machine-images add-iam-policy-binding

```text
NAME
    gcloud compute machine-images add-iam-policy-binding - add IAM policy
        binding to the IAM policy of a Compute Engine machine image

SYNOPSIS
    gcloud compute machine-images add-iam-policy-binding MACHINE_IMAGE
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to the IAM policy of a Compute Engine machine
    image. A policy binding consists of a member and a role.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/compute.admin' for the
    user 'test-user@gmail.com' to machine image 'my-image' run:

        $ gcloud compute machine-images add-iam-policy-binding my-image \
            --member='user:test-user@gmail.com' --role='roles/compute.admin'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Machine image resource - The machine image for which to add IAM policy
     binding to. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument machine_image on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MACHINE_IMAGE
          ID of the machine image or fully qualified identifier for the machine
          image.

          To set the machine_image attribute:
          + provide the argument machine_image on the command line.

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

        $ gcloud alpha compute machine-images add-iam-policy-binding

        $ gcloud beta compute machine-images add-iam-policy-binding
```

### gcloud compute machine-images create

```text
NAME
    gcloud compute machine-images create - create a Compute Engine machine
        image

SYNOPSIS
    gcloud compute machine-images create IMAGE
        --source-instance=SOURCE_INSTANCE [--csek-key-file=FILE]
        [--description=DESCRIPTION] [--guest-flush]
        [--no-require-csek-key-create]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--source-disk-csek-key=[PROPERTY=VALUE,...]]
        [--source-instance-zone=SOURCE_INSTANCE_ZONE]
        [--storage-location=LOCATION]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Compute Engine machine image.

EXAMPLES
    To create a machine image, run:

        $ gcloud compute machine-images create my-machine-image \
            --source-instance=example-source \
            --source-instance-zone=us-central1-a

POSITIONAL ARGUMENTS
     IMAGE
        Name of the machineImage to create.

REQUIRED FLAGS
     --source-instance=SOURCE_INSTANCE
        The source instance to create a machine image from.

OPTIONAL FLAGS
     --csek-key-file=FILE
        (DEPRECATED) Path to a Customer-Supplied Encryption Key (CSEK) key file
        that maps Compute Engine machine images to user managed keys to be used
        when creating, mounting, or taking snapshots of disks.

            If you pass `-` as value of the flag, the CSEK is read from stdin.
            See https://cloud.google.com/compute/docs/disks/customer-supplied-encryption for more details.

        The --csek-key-file flag is deprecated.

     --description=DESCRIPTION
        Specifies a text description of the machine image.

     --guest-flush
        Create an application-consistent machine image by informing the OS to
        prepare for the snapshot process.

     --require-csek-key-create
        (DEPRECATED) Refuse to create machine images not protected by a user
        managed key in the key file when --csek-key-file is given. This
        behavior is enabled by default to prevent incorrect gcloud invocations
        from accidentally creating machine images with no user managed key.
        Disabling the check allows creation of some machine images without a
        matching Customer-Supplied Encryption Key in the supplied
        --csek-key-file. See
        https://cloud.google.com/compute/docs/disks/customer-supplied-encryption
        for more details.

        The --require-csek-key-create flag is deprecated. Enabled by default,
        use --no-require-csek-key-create to disable.

     --resource-manager-tags=[KEY=VALUE,...]
        A comma-separated list of Resource Manager tags to apply to the machine
        image.

     --source-disk-csek-key=[PROPERTY=VALUE,...]
        (DEPRECATED) Customer-supplied encryption key of the disk attached to
        the source instance. Required if the source disk is protected by a
        customer-supplied encryption key. This flag can be repeated to specify
        multiple attached disks.

            *disk*::: URL of the disk attached to the source instance.
            This can be a full or   valid partial URL

            *csek-key-file*::: path to customer-supplied encryption key.

        The --source-disk-csek-key flag is deprecated.

     --source-instance-zone=SOURCE_INSTANCE_ZONE
        Zone of the instance to operate on. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

     --storage-location=LOCATION
        Google Cloud Storage location, either regional or multi-regional, where
        machine image's content is to be stored. If absent, a nearby regional
        or multi-regional location is chosen automatically.

     Key resource - The Cloud KMS (Key Management Service) cryptokey that will
     be used to protect the machine image. The 'Compute Engine Service Agent'
     service account must hold permission 'Cloud KMS CryptoKey
     Encrypter/Decrypter'. The arguments in this group can be used to specify
     the attributes of this resource.

     --kms-key=KMS_KEY
        ID of the key or fully qualified identifier for the key.

        To set the kms-key attribute:
        * provide the argument --kms-key on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --kms-keyring=KMS_KEYRING
        The KMS keyring of the key.

        To set the kms-keyring attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-keyring on the command line.

     --kms-location=KMS_LOCATION
        The Google Cloud location for the key.

        To set the kms-location attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-location on the command line.

     --kms-project=KMS_PROJECT
        The Google Cloud project for the key.

        To set the kms-project attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-project on the command line;
        * set the property core/project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute machine-images create

        $ gcloud beta compute machine-images create
```

### gcloud compute machine-images delete

```text
NAME
    gcloud compute machine-images delete - delete a Compute Engine machine
        image

SYNOPSIS
    gcloud compute machine-images delete IMAGE [IMAGE ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Compute Engine machine image.

EXAMPLES
    To delete a machine image, run:

        $ gcloud compute machine-images delete my-machine-image

POSITIONAL ARGUMENTS
     IMAGE [IMAGE ...]
        Names of the machineImages to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute machine-images delete

        $ gcloud beta compute machine-images delete
```

### gcloud compute machine-images describe

```text
NAME
    gcloud compute machine-images describe - describe a Compute Engine machine
        image

SYNOPSIS
    gcloud compute machine-images describe IMAGE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Compute Engine machine image.

EXAMPLES
    To describe a machine image, run:

        $ gcloud compute machine-images describe my-machine-image

POSITIONAL ARGUMENTS
     IMAGE
        Name of the machineImage to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute machine-images describe

        $ gcloud beta compute machine-images describe
```

### gcloud compute machine-images get-iam-policy

```text
NAME
    gcloud compute machine-images get-iam-policy - get the IAM policy for a
        Compute Engine machine image

SYNOPSIS
    gcloud compute machine-images get-iam-policy MACHINE_IMAGE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute machine-images get-iam-policy displays the IAM policy
    associated with a Compute Engine machine image in a project. If formatted
    as JSON, the output can be edited and used as a policy file for gcloud
    compute machine-images get-iam-policy set-iam-policy. The output includes
    an etag field that identifies the version emitted and allows detection of
    concurrent policy updates; see $ gcloud compute machine-images
    get-iam-policy set-iam-policy for additional details.

EXAMPLES
    To print the IAM policy for a given machine image, run:

        $ gcloud compute machine-images get-iam-policy my-machine-image

POSITIONAL ARGUMENTS
     Machine image resource - The machine image to display the IAM policy for.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument machine_image on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MACHINE_IMAGE
          ID of the machine image or fully qualified identifier for the machine
          image.

          To set the machine_image attribute:
          + provide the argument machine_image on the command line.

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

        $ gcloud alpha compute machine-images get-iam-policy

        $ gcloud beta compute machine-images get-iam-policy
```

### gcloud compute machine-images import

```text
NAME
    gcloud compute machine-images import - create a Compute Engine machine
        image from virtual appliance in OVA/OVF format

SYNOPSIS
    gcloud compute machine-images import IMAGE --cmd-deprecated
        --source-uri=SOURCE_URI [--no-address] [--async] [--byol]
        [--can-ip-forward]
        [--cloudbuild-service-account=CLOUDBUILD_SERVICE_ACCOUNT]
        [--compute-service-account=COMPUTE_SERVICE_ACCOUNT]
        [--description=DESCRIPTION] [--no-guest-environment] [--guest-flush]
        [--guest-os-features=[GUEST_OS_FEATURE,...]] [--labels=[KEY=VALUE,...]]
        [--log-location=LOG_LOCATION] [--machine-type=MACHINE_TYPE]
        [--network=NETWORK] [--network-tier=NETWORK_TIER] [--os=OS]
        [--no-restart-on-failure] [--storage-location=LOCATION]
        [--subnet=SUBNET] [--tags=TAG,[TAG,...]]
        [--timeout=TIMEOUT; default="2h"] [--zone=ZONE]
        [--custom-cpu=CUSTOM_CPU --custom-memory=CUSTOM_MEMORY
          : --custom-extensions --custom-vm-type=CUSTOM_VM_TYPE]
        [--scopes=[SCOPE,...] | --no-scopes]
        [--service-account=SERVICE_ACCOUNT | --no-service-account]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is being deprecated. Instead, use the gcloud
    migration vms machine-image-imports command. For more information, See
    "gcloud alpha migration vms machine-image-imports --help".

    gcloud compute machine-images import creates Compute Engine machine image
    from virtual appliance in OVA/OVF format.

    Importing OVF involves:
      o Unpacking OVF package (if in OVA format) to Cloud Storage.
      o Import disks from OVF to Compute Engine.
      o Translate the boot disk to make it bootable in Compute Engine.
      o Create a machine image using OVF metadata and imported disks.

    Virtual instances, images, machine images, and disks in Compute engine and
    files stored on Cloud Storage incur charges. See
    https://cloud.google.com/compute/docs/images/importing-virtual-disks#resource_cleanup.

EXAMPLES
    To import an OVF package from Cloud Storage into a machine image named
    my-machine-image, run:

        $ gcloud compute machine-images import my-machine-image \
            --source-uri=gs://my-bucket/my-dir

POSITIONAL ARGUMENTS
     IMAGE
        Name of the machineImage to import.

REQUIRED FLAGS
     --cmd-deprecated
        The command you're using is deprecated and will be removed by December
        31, 2025. We recommend using gcloud compute migration image-imports
        instead. See our official documentation for more information.
        https://cloud.google.com/migrate/virtual-machines/docs/5.0/migrate/image_import.

     --source-uri=SOURCE_URI
        Cloud Storage path to one of: OVF descriptor OVA file Directory with
        OVF package. For more information about Cloud Storage URIs, see
        https://cloud.google.com/storage/docs/request-endpoints#json-api.

OPTIONAL FLAGS
     --no-address
        Temporary VMs are created in your project during machine image import.
        Set this flag so that these temporary VMs are not assigned external IP
        addresses.

        Note: The machine image import process requires package managers to be
        installed on the operating system for the virtual disk. These package
        managers might need to make requests to package repositories that are
        outside Google Cloud. To allow access for these updates, you need to
        configure Cloud NAT and Private Google Access. For more information,
        see https://cloud.google.com/nat/docs/gce-example#create-nat and
        https://cloud.google.com/vpc/docs/private-access-options#pga.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --byol
        Specifies that you want to import an image with an existing license.
        Importing an image with an existing license is known as bring your own
        license (BYOL).

        --byol can be specified in any of the following ways:

            + `--byol --os=rhel-8`: imports a RHEL 8 image with an existing license.
            + `--os=rhel-8-byol`: imports a RHEL 8 image with an existing license.
            + `--byol`: detects the OS contained on the disk, and imports
               the image with an existing license.

        For more information about BYOL, see:
        https://cloud.google.com/compute/docs/nodes/bringing-your-own-licenses

     --can-ip-forward
        If provided, allows the VMs created from the imported machine image to
        send and receive packets with non-matching destination or source IP
        addresses.

     --cloudbuild-service-account=CLOUDBUILD_SERVICE_ACCOUNT
        Image import and export tools use Cloud Build to import and export
        images to and from your project. Cloud Build uses a specific service
        account to execute builds on your behalf. The Cloud Build service
        account generates an access token for other service accounts and it is
        also used for authentication when building the artifacts for the image
        import tool.

        Use this flag to to specify a user-managed service account for image
        import and export. If you don't specify this flag, Cloud Build runs
        using your project's default Cloud Build service account. To set this
        option, specify the email address of the desired user-managed service
        account. Note: You must specify the --logs-location flag when you set a
        user-managed service account.

        At minimum, the specified user-managed service account needs to have
        the following roles assigned:

        * roles/compute.admin
        * roles/iam.serviceAccountTokenCreator
        * roles/iam.serviceAccountUser

     --compute-service-account=COMPUTE_SERVICE_ACCOUNT
        A temporary virtual machine instance is created in your project during
        machine image import. Machine image import tooling on this temporary
        instance must be authenticated.

        A Compute Engine service account is an identity attached to an
        instance. Its access tokens can be accessed through the instance
        metadata server and can be used to authenticate machine image import
        tooling on the instance.

        To set this option, specify the email address corresponding to the
        required Compute Engine service account. If not provided, the machine
        image import on the temporary instance uses the project's default
        Compute Engine service account.

        At a minimum, you need to grant the following roles to the specified
        Cloud Build service account:

        * roles/compute.storageAdmin
        * roles/storage.objectViewer

     --description=DESCRIPTION
        Specifies a text description of the machine image.

     --guest-environment
        The guest environment will be installed on the machine image. Enabled
        by default, use --no-guest-environment to disable.

     --guest-flush
        Create an application-consistent machine image by informing the OS to
        prepare for the snapshot process.

     --guest-os-features=[GUEST_OS_FEATURE,...]
        Enables one or more features for VM instances that use the image for
        their boot disks. See the descriptions of supported features at:
        https://cloud.google.com/compute/docs/images/create-delete-deprecate-private-images#guest-os-features.
        GUEST_OS_FEATURE must be (only one value is supported):
        UEFI_COMPATIBLE.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --log-location=LOG_LOCATION
        Directory in Cloud Storage to hold build logs. If not set,
        gs://<project num>.cloudbuild-logs.googleusercontent.com/ is created
        and used.

     --machine-type=MACHINE_TYPE
        Specifies the machine type used for the instances. To get a list of
        available machine types, run 'gcloud compute machine-types list'. If
        unspecified, the default type is n1-standard-1.

     --network=NETWORK
        Specifies the network for the VMs that are created from the imported
        machine image. If --subnet is also specified, then the subnet must be a
        subnetwork of network specified by --network. If neither is specified,
        the default network is used.

     --network-tier=NETWORK_TIER
        Specifies the network tier that will be used to configure the machine
        image. NETWORK_TIER must be one of: PREMIUM, STANDARD. The default
        value is PREMIUM.

     --os=OS
        Specifies the OS of the machine image being imported. OS must be one
        of: centos-7, centos-stream-8, centos-stream-9, debian-10, debian-11,
        debian-8, debian-9, opensuse-15, rhel-6, rhel-6-byol, rhel-7,
        rhel-7-byol, rhel-8, rhel-8-byol, rhel-9, rhel-9-byol, rocky-8,
        rocky-9, sles-12, sles-12-byol, sles-15, sles-15-byol, sles-sap-12,
        sles-sap-12-byol, sles-sap-15, sles-sap-15-byol, ubuntu-1404,
        ubuntu-1604, ubuntu-1804, ubuntu-2004, ubuntu-2204,
        windows-10-x64-byol, windows-10-x86-byol, windows-11-x64-byol,
        windows-2008r2, windows-2008r2-byol, windows-2012, windows-2012-byol,
        windows-2012r2, windows-2012r2-byol, windows-2016, windows-2016-byol,
        windows-2019, windows-2019-byol, windows-2022, windows-2022-byol,
        windows-7-x64-byol, windows-7-x86-byol, windows-8-x64-byol,
        windows-8-x86-byol.

     --restart-on-failure
        The VMs created from the imported machine image are restarted if they
        are terminated by Compute Engine. This does not affect terminations
        performed by the user. Enabled by default, use --no-restart-on-failure
        to disable.

     --storage-location=LOCATION
        Google Cloud Storage location, either regional or multi-regional, where
        machine image's content is to be stored. If absent, a nearby regional
        or multi-regional location is chosen automatically.

     --subnet=SUBNET
        Specifies the subnet for the VMs created from the imported machine
        image. If --network is also specified, the subnet must be a subnetwork
        of the network specified by --network.

     --tags=TAG,[TAG,...]
        Specifies a list of tags to apply to the VMs created from the imported
        machine image. These tags allow network firewall rules and routes to be
        applied to specified VMs. See gcloud compute firewall-rules create(1)
        for more details.

        To read more about configuring network tags, read this guide:
        https://cloud.google.com/vpc/docs/add-remove-network-tags

        To list VMs with their respective status and tags, run:

            $ gcloud compute instances list \
                --format='table(name,status,tags.list())'

        To list VMs tagged with a specific tag, tag1, run:

            $ gcloud compute instances list --filter='tags:tag1'

     --timeout=TIMEOUT; default="2h"
        Maximum time an import can last before it fails as "TIMEOUT". For
        example, if you specify 2h, the process fails after 2 hours. See $
        gcloud topic datetimes for information about duration formats.

        This timeout option has a maximum value of 24 hours.

     --zone=ZONE
        Zone of the machine image to import. The zone in which to perform the
        import of the machine image. If not specified and the compute/zone
        property isn't set, you might be prompted to select a zone (interactive
        mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

     Custom machine type extensions.

     --custom-cpu=CUSTOM_CPU
        A whole number value specifying the number of cores that are needed in
        the custom machine type.

        For some machine types, shared-core values can also be used. For
        example, for E2 machine types, you can specify micro, small, or medium.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --custom-memory=CUSTOM_MEMORY
        A whole number value indicating how much memory is desired in the
        custom machine type. A size unit should be provided (eg. 3072MB or 9GB)
        - if no units are specified, GB is assumed.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --custom-extensions
        Use the extended custom machine type.

     --custom-vm-type=CUSTOM_VM_TYPE
        Specifies a custom machine type. The default is n1. For more
        information about custom machine types, see:
        https://cloud.google.com/compute/docs/general-purpose-machines#custom_machine_types

     At most one of these can be specified:

       --scopes=[SCOPE,...]
          If not provided, the machine image will be assigned the default
          scopes, described below. However, if neither --scopes nor --no-scopes
          are specified and the project has no default service account, then
          the machine image is imported with no scopes. Note that the level of
          access that a service account has is determined by a combination of
          access scopes and IAM roles so you must configure both access scopes
          and IAM roles for the service account to work properly.

          SCOPE can be either the full URI of the scope or an alias. Default
          scopes are assigned to all instances. Available aliases are:

            Alias                  URI
            bigquery               https://www.googleapis.com/auth/bigquery
            cloud-platform         https://www.googleapis.com/auth/cloud-platform
            cloud-source-repos     https://www.googleapis.com/auth/source.full_control
            cloud-source-repos-ro  https://www.googleapis.com/auth/source.read_only
            compute-ro             https://www.googleapis.com/auth/compute.readonly
            compute-rw             https://www.googleapis.com/auth/compute
            datastore              https://www.googleapis.com/auth/datastore
            default                https://www.googleapis.com/auth/devstorage.read_only
                                   https://www.googleapis.com/auth/logging.write
                                   https://www.googleapis.com/auth/monitoring.write
                                   https://www.googleapis.com/auth/pubsub
                                   https://www.googleapis.com/auth/service.management.readonly
                                   https://www.googleapis.com/auth/servicecontrol
                                   https://www.googleapis.com/auth/trace.append
            gke-default            https://www.googleapis.com/auth/devstorage.read_only
                                   https://www.googleapis.com/auth/logging.write
                                   https://www.googleapis.com/auth/monitoring
                                   https://www.googleapis.com/auth/service.management.readonly
                                   https://www.googleapis.com/auth/servicecontrol
                                   https://www.googleapis.com/auth/trace.append
            logging-write          https://www.googleapis.com/auth/logging.write
            monitoring             https://www.googleapis.com/auth/monitoring
            monitoring-read        https://www.googleapis.com/auth/monitoring.read
            monitoring-write       https://www.googleapis.com/auth/monitoring.write
            pubsub                 https://www.googleapis.com/auth/pubsub
            service-control        https://www.googleapis.com/auth/servicecontrol
            service-management     https://www.googleapis.com/auth/service.management.readonly
            sql (deprecated)       https://www.googleapis.com/auth/sqlservice
            sql-admin              https://www.googleapis.com/auth/sqlservice.admin
            storage-full           https://www.googleapis.com/auth/devstorage.full_control
            storage-ro             https://www.googleapis.com/auth/devstorage.read_only
            storage-rw             https://www.googleapis.com/auth/devstorage.read_write
            taskqueue              https://www.googleapis.com/auth/taskqueue
            trace                  https://www.googleapis.com/auth/trace.append
            userinfo-email         https://www.googleapis.com/auth/userinfo.email

          DEPRECATION WARNING: https://www.googleapis.com/auth/sqlservice
          account scope and sql alias do not provide SQL instance management
          capabilities and have been deprecated. Please, use
          https://www.googleapis.com/auth/sqlservice.admin or sql-admin to
          manage your Google SQL Service instances.

       --no-scopes
          Import machine image without scopes

     At most one of these can be specified:

       --service-account=SERVICE_ACCOUNT
          A service account is an identity attached to the machine image. Its
          access tokens can be accessed through the instance metadata server
          and are used to authenticate applications on the instance. The
          account can be set using an email address corresponding to the
          required service account.

          If not provided, the machine image will use the project's default
          service account.

       --no-service-account
          Import machine image without service account

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute machine-images import

        $ gcloud beta compute machine-images import
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute machine-images import my-machine-image \
    --cmd-deprecated \
    --source-uri=gs://my-bucket/my-dir
```

### gcloud compute machine-images list

```text
NAME
    gcloud compute machine-images list - list Google Compute Engine machine
        images

SYNOPSIS
    gcloud compute machine-images list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute machine-images list displays all Google Compute Engine
    machine images in a project.

EXAMPLES
    To list all machine images in a project in table form, run:

        $ gcloud compute machine-images list

    To list the URIs of all machine images in a project, run:

        $ gcloud compute machine-images list --uri

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

        $ gcloud alpha compute machine-images list

        $ gcloud beta compute machine-images list
```

### gcloud compute machine-images remove-iam-policy-binding

```text
NAME
    gcloud compute machine-images remove-iam-policy-binding - remove IAM policy
        binding from the IAM policy of a Compute Engine machine image

SYNOPSIS
    gcloud compute machine-images remove-iam-policy-binding MACHINE_IMAGE
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding from the IAM policy of a Compute Engine
    machine image. A policy binding consists of a member and a role.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/compute.admin' for
    the user 'test-user@gmail.com' from image 'my-image'

        $ gcloud compute machine-images remove-iam-policy-binding my-image \
            --member='user:test-user@gmail.com' --role='roles/compute.admin'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Machine image resource - The machine image from which to remove the IAM
     policy binding. This represents a Cloud resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument machine_image on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MACHINE_IMAGE
          ID of the machine image or fully qualified identifier for the machine
          image.

          To set the machine_image attribute:
          + provide the argument machine_image on the command line.

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

        $ gcloud alpha compute machine-images remove-iam-policy-binding

        $ gcloud beta compute machine-images remove-iam-policy-binding
```

### gcloud compute machine-images set-iam-policy

```text
NAME
    gcloud compute machine-images set-iam-policy - set the IAM policy for a
        Compute Engine machine image

SYNOPSIS
    gcloud compute machine-images set-iam-policy MACHINE_IMAGE POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given machine image as defined in a JSON or
    YAML file.

EXAMPLES
    The following command reads an IAM policy defined in a policy.json file        and sets the policy for the machine image `my-image`:

        $ gcloud compute machine-images set-iam-policy my-image policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Machine image resource - The machine image to set the IAM policy for. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument machine_image on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MACHINE_IMAGE
          ID of the machine image or fully qualified identifier for the machine
          image.

          To set the machine_image attribute:
          + provide the argument machine_image on the command line.

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

        $ gcloud alpha compute machine-images set-iam-policy

        $ gcloud beta compute machine-images set-iam-policy
```

### gcloud compute machine-images test-iam-permissions

```text
NAME
    gcloud compute machine-images test-iam-permissions - test IAM permissions
        for a Compute Engine machine image

SYNOPSIS
    gcloud compute machine-images test-iam-permissions MACHINE_IMAGE
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns permissions that a caller has on the specified machine image.

EXAMPLES
    To test whether the caller has the 'compute.machineImages.getIamPolicy'
    permission on a machine image, run:

        $ gcloud compute machine-images test-iam-permissions \
            my-machine-image \
            --permissions=compute.machineImages.getIamPolicy

POSITIONAL ARGUMENTS
     Machine image resource - The ID of the machine image to test permissions
     for. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument machine_image on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MACHINE_IMAGE
          ID of the machine image or fully qualified identifier for the machine
          image.

          To set the machine_image attribute:
          + provide the argument machine_image on the command line.

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

        $ gcloud alpha compute machine-images test-iam-permissions

        $ gcloud beta compute machine-images test-iam-permissions
```

### gcloud beta compute machine-images add-iam-policy-binding

```text
NAME
    gcloud beta compute machine-images add-iam-policy-binding - add IAM policy
        binding to the IAM policy of a Compute Engine machine image

SYNOPSIS
    gcloud beta compute machine-images add-iam-policy-binding MACHINE_IMAGE
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute machine-images create

```text
NAME
    gcloud beta compute machine-images create - create a Compute Engine machine
        image

SYNOPSIS
    gcloud beta compute machine-images create IMAGE
        --source-instance=SOURCE_INSTANCE [--csek-key-file=FILE]
        [--description=DESCRIPTION] [--guest-flush]
        [--kms-key-service-account=KMS_KEY_SERVICE_ACCOUNT]
        [--no-require-csek-key-create]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--source-disk-csek-key=[PROPERTY=VALUE,...]]
        [--source-instance-zone=SOURCE_INSTANCE_ZONE]
        [--storage-location=LOCATION]
        [--exclude-disks=DISK_DEVICE_NAME[,DISK_DEVICE_NAME],[...]
          | --include-disks=DISK_DEVICE_NAME[,DISK_DEVICE_NAME],[...]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute machine-images delete

```text
NAME
    gcloud beta compute machine-images delete - delete a Compute Engine machine
        image

SYNOPSIS
    gcloud beta compute machine-images delete IMAGE [IMAGE ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute machine-images describe

```text
NAME
    gcloud beta compute machine-images describe - describe a Compute Engine
        machine image

SYNOPSIS
    gcloud beta compute machine-images describe IMAGE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute machine-images get-iam-policy

```text
NAME
    gcloud beta compute machine-images get-iam-policy - get the IAM policy for
        a Compute Engine machine image

SYNOPSIS
    gcloud beta compute machine-images get-iam-policy MACHINE_IMAGE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute machine-images import

```text
NAME
    gcloud beta compute machine-images import - create a Compute Engine machine
        image from virtual appliance in OVA/OVF format

SYNOPSIS
    gcloud beta compute machine-images import IMAGE --cmd-deprecated
        --source-uri=SOURCE_URI [--no-address] [--async] [--byol]
        [--can-ip-forward]
        [--cloudbuild-service-account=CLOUDBUILD_SERVICE_ACCOUNT]
        [--compute-service-account=COMPUTE_SERVICE_ACCOUNT]
        [--description=DESCRIPTION] [--no-guest-environment] [--guest-flush]
        [--guest-os-features=[GUEST_OS_FEATURE,...]] [--labels=[KEY=VALUE,...]]
        [--log-location=LOG_LOCATION] [--machine-type=MACHINE_TYPE]
        [--network=NETWORK] [--network-tier=NETWORK_TIER] [--os=OS]
        [--no-restart-on-failure] [--storage-location=LOCATION]
        [--subnet=SUBNET] [--tags=TAG,[TAG,...]]
        [--timeout=TIMEOUT; default="2h"] [--zone=ZONE]
        [--custom-cpu=CUSTOM_CPU --custom-memory=CUSTOM_MEMORY
          : --custom-extensions --custom-vm-type=CUSTOM_VM_TYPE]
        [--scopes=[SCOPE,...] | --no-scopes]
        [--service-account=SERVICE_ACCOUNT | --no-service-account]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute machine-images list

```text
NAME
    gcloud beta compute machine-images list - list Google Compute Engine
        machine images

SYNOPSIS
    gcloud beta compute machine-images list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute machine-images remove-iam-policy-binding

```text
NAME
    gcloud beta compute machine-images remove-iam-policy-binding - remove IAM
        policy binding from the IAM policy of a Compute Engine machine image

SYNOPSIS
    gcloud beta compute machine-images remove-iam-policy-binding MACHINE_IMAGE
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute machine-images set-iam-policy

```text
NAME
    gcloud beta compute machine-images set-iam-policy - set the IAM policy for
        a Compute Engine machine image

SYNOPSIS
    gcloud beta compute machine-images set-iam-policy MACHINE_IMAGE POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute machine-images test-iam-permissions

```text
NAME
    gcloud beta compute machine-images test-iam-permissions - test IAM
        permissions for a Compute Engine machine image

SYNOPSIS
    gcloud beta compute machine-images test-iam-permissions MACHINE_IMAGE
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute machine-images add-iam-policy-binding

```text
NAME
    gcloud alpha compute machine-images add-iam-policy-binding - add IAM policy
        binding to the IAM policy of a Compute Engine machine image

SYNOPSIS
    gcloud alpha compute machine-images add-iam-policy-binding MACHINE_IMAGE
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute machine-images create

```text
NAME
    gcloud alpha compute machine-images create - create a Compute Engine
        machine image

SYNOPSIS
    gcloud alpha compute machine-images create IMAGE
        --source-instance=SOURCE_INSTANCE [--csek-key-file=FILE]
        [--description=DESCRIPTION] [--guest-flush]
        [--kms-key-service-account=KMS_KEY_SERVICE_ACCOUNT]
        [--no-require-csek-key-create]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--source-disk-csek-key=[PROPERTY=VALUE,...]]
        [--source-instance-zone=SOURCE_INSTANCE_ZONE]
        [--storage-location=LOCATION]
        [--exclude-disks=DISK_DEVICE_NAME[,DISK_DEVICE_NAME],[...]
          | --include-disks=DISK_DEVICE_NAME[,DISK_DEVICE_NAME],[...]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute machine-images delete

```text
NAME
    gcloud alpha compute machine-images delete - delete a Compute Engine
        machine image

SYNOPSIS
    gcloud alpha compute machine-images delete IMAGE [IMAGE ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute machine-images describe

```text
NAME
    gcloud alpha compute machine-images describe - describe a Compute Engine
        machine image

SYNOPSIS
    gcloud alpha compute machine-images describe IMAGE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute machine-images get-iam-policy

```text
NAME
    gcloud alpha compute machine-images get-iam-policy - get the IAM policy for
        a Compute Engine machine image

SYNOPSIS
    gcloud alpha compute machine-images get-iam-policy MACHINE_IMAGE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute machine-images import

```text
NAME
    gcloud alpha compute machine-images import - create a Compute Engine
        machine image from virtual appliance in OVA/OVF format

SYNOPSIS
    gcloud alpha compute machine-images import IMAGE --cmd-deprecated
        --source-uri=SOURCE_URI [--no-address] [--async] [--byol]
        [--can-ip-forward]
        [--cloudbuild-service-account=CLOUDBUILD_SERVICE_ACCOUNT]
        [--compute-service-account=COMPUTE_SERVICE_ACCOUNT]
        [--description=DESCRIPTION] [--no-guest-environment] [--guest-flush]
        [--guest-os-features=[GUEST_OS_FEATURE,...]] [--labels=[KEY=VALUE,...]]
        [--log-location=LOG_LOCATION] [--machine-type=MACHINE_TYPE]
        [--network=NETWORK] [--network-tier=NETWORK_TIER] [--os=OS]
        [--no-restart-on-failure] [--storage-location=LOCATION]
        [--subnet=SUBNET] [--tags=TAG,[TAG,...]]
        [--timeout=TIMEOUT; default="2h"] [--zone=ZONE]
        [--custom-cpu=CUSTOM_CPU --custom-memory=CUSTOM_MEMORY
          : --custom-extensions --custom-vm-type=CUSTOM_VM_TYPE]
        [--scopes=[SCOPE,...] | --no-scopes]
        [--service-account=SERVICE_ACCOUNT | --no-service-account]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute machine-images list

```text
NAME
    gcloud alpha compute machine-images list - list Google Compute Engine
        machine images

SYNOPSIS
    gcloud alpha compute machine-images list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute machine-images remove-iam-policy-binding

```text
NAME
    gcloud alpha compute machine-images remove-iam-policy-binding - remove IAM
        policy binding from the IAM policy of a Compute Engine machine image

SYNOPSIS
    gcloud alpha compute machine-images remove-iam-policy-binding MACHINE_IMAGE
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute machine-images set-iam-policy

```text
NAME
    gcloud alpha compute machine-images set-iam-policy - set the IAM policy for
        a Compute Engine machine image

SYNOPSIS
    gcloud alpha compute machine-images set-iam-policy MACHINE_IMAGE
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute machine-images test-iam-permissions

```text
NAME
    gcloud alpha compute machine-images test-iam-permissions - test IAM
        permissions for a Compute Engine machine image

SYNOPSIS
    gcloud alpha compute machine-images test-iam-permissions MACHINE_IMAGE
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute machine-images create --csek-key-file`: "The --csek-key-file flag is deprecated."; `gcloud compute machine-images create --require-csek-key-create`: "The --require-csek-key-create flag is deprecated. Enabled by default, use --no-require-csek-key-create to disable."; `gcloud compute machine-images create --source-disk-csek-key`: "The --source-disk-csek-key flag is deprecated."; `gcloud compute machine-images import`: "This command is being deprecated. Instead, use the gcloud migration vms machine-image-imports command. For more information, See "gcloud alpha migration vms machine-image-imports --help"."; `gcloud compute machine-images import --scopes`: "DEPRECATION WARNING: https://www.googleapis.com/auth/sqlservice account scope and sql alias do not provide SQL instance management capabilities and have been deprecated. Please, use https://www.googleapis.com/auth/sqlservice.admin or sql-admin to manage your Google SQL Service instances.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (the help text above is verbatim): in `machine-images import`, the `--cloudbuild-service-account` description says "You must specify the --logs-location flag when you set a user-managed service account", but the command has no `--logs-location` flag; the flag in the SYNOPSIS and FLAGS is `--log-location`. In `machine-images get-iam-policy`, the DESCRIPTION refers to "gcloud compute machine-images get-iam-policy set-iam-policy", which is not a command; the command that sets the policy is `gcloud compute machine-images set-iam-policy MACHINE_IMAGE POLICY_FILE` (see its SYNOPSIS on this page).
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `import` example omits `--cmd-deprecated`, which the SYNOPSIS requires (gcloud 593.0.0: "argument --cmd-deprecated: Must be specified."); the runnable form adds it.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/machine-images (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
