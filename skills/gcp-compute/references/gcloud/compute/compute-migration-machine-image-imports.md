---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/migration/machine-image-imports
---

# gcloud compute migration machine-image-imports

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute migration machine-image-imports create

```text
NAME
    gcloud compute migration machine-image-imports create - import machine
        images to Google Compute Engine

SYNOPSIS
    gcloud compute migration machine-image-imports create
        (IMAGE_IMPORT_NAME : --location=LOCATION) --source-file=SOURCE_FILE
        [--additional-licenses=[ADDITIONAL_LICENSES,...]]
        [--description=DESCRIPTION] [--kms-key=KMS_KEY]
        [--labels=[KEY=VALUE,...]] [--machine-image-name=MACHINE_IMAGE_NAME]
        [--machine-type=MACHINE_TYPE]
        [--network-interface=[network=NETWORK],
          [networkTier=NETWORKTIER],[subnetwork=SUBNETWORK]]
        [--single-region-storage] [--tags=[TAGS,...]]
        [--target-project=TARGET_PROJECT]
        [--enable-integrity-monitoring --enable-vtpm --secure-boot=SECURE_BOOT]
        [--scopes=[SCOPES,...] --service-account=SERVICE_ACCOUNT]
        [--skip-os-adaptation | --adaptation-modifiers=ADAPTATION_MODIFIERS
          --boot-conversion=BOOT_CONVERSION
          --generalize --license-type=LICENSE_TYPE --rootfs-uuid=ROOTFS_UUID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute migration machine-image-imports create Imports machine
    images such as OVA and OVF files, from a Google Cloud Storage file
    (gs://...) to Google Compute Engine, using the Migrate to Virtual Machines
    service API. This command creates an Image Import resource with a nested
    Image Import Job resource. The Image Import Job resource tracks the image
    import progress. To use this command, you must enable VM Migration API in
    your project.

EXAMPLES
    To import ub-14.04.5.ova from my-images-bucket to my-target-project in
    us-central1, create my-image-import resource in my-project in us-central1.
    Run:        $ gcloud compute migration machine-image-imports create \
            my-machine-image-import \
            --source-file=gs://my-images-bucket/ub-14.04.5.ova \
            --image-name=my-ubuntu-machine-image --location=us-central1 \
            --target-project=projects/my-project/locations/global/\
        targetProjects/my-target-project --project=my-project

POSITIONAL ARGUMENTS
     Image import resource - The Image Import resource you want to create. This
     would be the machine image name if --machine-image-name is not given. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument image_import_name on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       IMAGE_IMPORT_NAME
          ID of the image_import or fully qualified identifier for the
          image_import.

          To set the image_import_name attribute:
          + provide the argument image_import_name on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Resource location.

          To set the location attribute:
          + provide the argument image_import_name on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property compute/region.

REQUIRED FLAGS
     --source-file=SOURCE_FILE
        The path to the Google Cloud Storage file from which the image should
        be imported.

OPTIONAL FLAGS
     --additional-licenses=[ADDITIONAL_LICENSES,...]
        Comma-separated list of the additional licenses to assign to the
        machine image.

     --description=DESCRIPTION
        A description of the machine image.

     --kms-key=KMS_KEY
        Fully qualified identifier for the Cloud KMS (Key Management Service)
        cryptokey that will be used to protect the image.

     --labels=[KEY=VALUE,...]
        A map of labels to associate with the machine image.

     --machine-image-name=MACHINE_IMAGE_NAME
        The name of the machine image that will be imported to Google Compute
        Engine. Default is the Image Import name.

     --machine-type=MACHINE_TYPE
        The machine type to create the machine image with. If not provided, the
        service will choose a relevant machine type series based on the
        information from the source image.

     --network-interface=[network=NETWORK],[networkTier=NETWORKTIER],[subnetwork=SUBNETWORK]
        The network interface to use for the instance created by the machine
        image. This is a dicionary with the following keys:
        * network: The network to use for this network interface.
        * subnetwork: The subnetwork to use for this network interface.
        * network-tier: The network tier to use for this network interface.
          This argument can be specified multiple times in case of multiple
          nics.

     --single-region-storage
        If true, the location of the imported machine image will be the region
        of the import job. Otherwise the closest multi-region is selected.
        Default is false.

     --tags=[TAGS,...]
        The tags to apply to the instance created by the machine image.

     --target-project=TARGET_PROJECT
        The target project resource path to which the machine image will be
        imported. Default is the host project. To get a list of the target
        projects run the gcloud alpha migration vms target-projects list
        command.

     Shielded instance configuration.

     --enable-integrity-monitoring
        Defines whether the instance created by the machine image has integrity
        monitoring enabled. This can be set to true only if the image boot
        option is EFI, and vTPM is enabled.

     --enable-vtpm
        Defines whether the instance created by the machine image has vTPM
        enabled. This can be set to true only if the image boot option is EFI.

     --secure-boot=SECURE_BOOT
        Defines whether the instance created by the machine image has Secure
        Boot enabled. This can be set to true only if the image boot option is
        EFI. If not specified we will use the configuration of the source.
        SECURE_BOOT must be one of: false, secure-boot-unspecified, true.

     The service account to assign to the instance created by the machine
     image.

     --scopes=[SCOPES,...]
        The list of scopes to be made available for the service account.

     --service-account=SERVICE_ACCOUNT
        The email address of the service account.

     OS adaptation parameters.

     At most one of these can be specified:

       --skip-os-adaptation
          If true, skip OS adaptation. Default false.

       Or at least one of these can be specified:

         --adaptation-modifiers=ADAPTATION_MODIFIERS
            A map of flags to pass to the OS adaptation process. The actual
            value depends on the modifier and can also be empty. e.g.
            --adaptation-modifiers=flag1=value1,flag2

         --boot-conversion=BOOT_CONVERSION
            This property will trigger an internal process which will convert
            the image from using the existing boot option to another. The size
            of the boot disk might be increased to allow the conversion.
            Currently only support BIOS_TO_EFI. BOOT_CONVERSION must be one of:
            bios-to-efi, boot-conversion-unspecified, none.

         --generalize
            If true, generalize the imported machine image. Default false. The
            generalization process enables co-existence of multiple VMs created
            from the same machine image. For Windows, generalizing the machine
            image removes computer-specific information such as installed
            drivers and the computer security identifier (SID).

         --license-type=LICENSE_TYPE
            The license to use post migration. LICENSE_TYPE must be one of:
            compute-engine-license-type-byol,
            compute-engine-license-type-default,
            compute-engine-license-type-payg.

         --rootfs-uuid=ROOTFS_UUID
            Identifies the file system to adapt.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the vmmigration/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/migrate/virtual-machines

NOTES
    This variant is also available:

        $ gcloud alpha compute migration machine-image-imports create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud compute migration machine-image-imports create my-machine-image-import \
    --source-file=gs://my-images-bucket/ub-14.04.5.ova \
    --machine-image-name=my-ubuntu-machine-image \
    --location=us-central1 \
    --target-project=projects/my-project/locations/global/targetProjects/my-target-project \
    --project=my-project
```

### gcloud compute migration machine-image-imports delete

```text
NAME
    gcloud compute migration machine-image-imports delete - delete an Image
        Import resource

SYNOPSIS
    gcloud compute migration machine-image-imports delete
        (IMAGE_IMPORT_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute migration machine-image-imports delete deletes an Image
    Import resource. To use this command, you must enable VM Migration API in
    your project.

    This command does not delete any machine images imported to Google Compute
    Engine.

EXAMPLES
    To delete my-image-import resource in us-central1 in the default project,
    run:        $ gcloud compute migration machine-image-imports delete \
            my-image-import --location=us-central1

POSITIONAL ARGUMENTS
     Image import resource - The Image Import resource you want to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument image_import_name on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       IMAGE_IMPORT_NAME
          ID of the image_import or fully qualified identifier for the
          image_import.

          To set the image_import_name attribute:
          + provide the argument image_import_name on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Resource location.

          To set the location attribute:
          + provide the argument image_import_name on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property compute/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the vmmigration/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/migrate/virtual-machines

NOTES
    This variant is also available:

        $ gcloud alpha compute migration machine-image-imports delete
```

### gcloud compute migration machine-image-imports describe

```text
NAME
    gcloud compute migration machine-image-imports describe - describe an Image
        Import

SYNOPSIS
    gcloud compute migration machine-image-imports describe
        (IMAGE_IMPORT_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute migration machine-image-imports describe describes an Image
    Import resource with a nested Image Import Job. The Image Import Job
    resource tracks the image import progress. To use this command, you must
    enable VM Migration API in your project.

EXAMPLES
    To describe my-image-import resource in us-central1 in the default project,
    run:        $ gcloud compute migration machine-image-imports describe \
            my-image-import --location=us-central1

POSITIONAL ARGUMENTS
     Image import resource - The Image Import you want to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument image_import_name on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       IMAGE_IMPORT_NAME
          ID of the image_import or fully qualified identifier for the
          image_import.

          To set the image_import_name attribute:
          + provide the argument image_import_name on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Resource location.

          To set the location attribute:
          + provide the argument image_import_name on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property compute/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the vmmigration/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/migrate/virtual-machines

NOTES
    This variant is also available:

        $ gcloud alpha compute migration machine-image-imports describe
```

### gcloud compute migration machine-image-imports list

```text
NAME
    gcloud compute migration machine-image-imports list - list Image Imports

SYNOPSIS
    gcloud compute migration machine-image-imports list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute migration machine-image-imports list prints a detailed list
    of Image Import resources. To use this command, you must enable VM
    Migration API in your project.

EXAMPLES
    To list the Image Import resources in us-central1 in the default project,
    run:        $ gcloud compute migration machine-image-imports list \
            --location=us-central1

FLAGS
     Location resource - The compute/region of the Image Import. To get a list
     of the available regions, run gcloud compute regions list command. If not
     specified, the value of the [compute/zone] property in the current gcloud
     configuration is used. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property compute/region with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property compute/region.

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
    This command uses the vmmigration/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/migrate/virtual-machines

NOTES
    This variant is also available:

        $ gcloud alpha compute migration machine-image-imports list
```

### gcloud alpha compute migration machine-image-imports create

```text
NAME
    gcloud alpha compute migration machine-image-imports create - import
        machine images to Google Compute Engine

SYNOPSIS
    gcloud alpha compute migration machine-image-imports create
        (IMAGE_IMPORT_NAME : --location=LOCATION) --source-file=SOURCE_FILE
        [--additional-licenses=[ADDITIONAL_LICENSES,...]]
        [--description=DESCRIPTION] [--kms-key=KMS_KEY]
        [--labels=[KEY=VALUE,...]] [--machine-image-name=MACHINE_IMAGE_NAME]
        [--machine-type=MACHINE_TYPE]
        [--network-interface=[network=NETWORK],
          [networkTier=NETWORKTIER],[subnetwork=SUBNETWORK]]
        [--single-region-storage] [--tags=[TAGS,...]]
        [--target-project=TARGET_PROJECT]
        [--enable-integrity-monitoring --enable-vtpm --secure-boot=SECURE_BOOT]
        [--scopes=[SCOPES,...] --service-account=SERVICE_ACCOUNT]
        [--skip-os-adaptation | --adaptation-modifiers=ADAPTATION_MODIFIERS
          --boot-conversion=BOOT_CONVERSION
          --generalize --license-type=LICENSE_TYPE --rootfs-uuid=ROOTFS_UUID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute migration machine-image-imports delete

```text
NAME
    gcloud alpha compute migration machine-image-imports delete - delete an
        Image Import resource

SYNOPSIS
    gcloud alpha compute migration machine-image-imports delete
        (IMAGE_IMPORT_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute migration machine-image-imports describe

```text
NAME
    gcloud alpha compute migration machine-image-imports describe - describe an
        Image Import

SYNOPSIS
    gcloud alpha compute migration machine-image-imports describe
        (IMAGE_IMPORT_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute migration machine-image-imports list

```text
NAME
    gcloud alpha compute migration machine-image-imports list - list Image
        Imports

SYNOPSIS
    gcloud alpha compute migration machine-image-imports list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` example passes `--image-name`, which is not a flag of this command (gcloud 593.0.0: "unrecognized arguments: --image-name=... (did you mean '--machine-image-name'?)"); the runnable form uses `--machine-image-name`, the flag in the SYNOPSIS.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example puts `$ gcloud` on the same line as `Run:`, and the help wraps the `--target-project` value with a backslash; the runnable form starts the command on its own line and joins the value.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/migration/machine-image-imports (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
