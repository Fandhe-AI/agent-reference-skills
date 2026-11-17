---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/migration/image-imports
---

# gcloud compute migration image-imports

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute migration image-imports create

```text
NAME
    gcloud compute migration image-imports create - import Virtual Disk images
        to Google Compute Engine

SYNOPSIS
    gcloud compute migration image-imports create
        (IMAGE_IMPORT_NAME : --location=LOCATION) --source-file=SOURCE_FILE
        [--additional-licenses=[ADDITIONAL_LICENSES,...]]
        [--description=DESCRIPTION] [--family-name=FAMILY_NAME]
        [--image-name=IMAGE_NAME] [--kms-key=KMS_KEY]
        [--labels=[KEY=VALUE,...]] [--single-region-storage]
        [--target-project=TARGET_PROJECT]
        [--adaptation-modifiers=ADAPTATION_MODIFIERS
          --boot-conversion=BOOT_CONVERSION
          --generalize --license-type=LICENSE_TYPE --rootfs-uuid=ROOTFS_UUID
          | [--skip-os-adaptation
          : --guest-os-features=[GUEST_OS_FEATURES,...]]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute migration image-imports create imports images such as VMWare
    VMDK files and VHD files, from a Google Cloud Storage file (gs://...) to
    Google Compute Engine, using the Migrate to Virtual Machines service API.
    This command creates an Image Import resource with a nested Image Import
    Job resource. The Image Import Job resource tracks the image import
    progress. To use this command, you must enable VM Migration API in your
    project.

EXAMPLES
    To import my-ubuntu22.04.vmdk from my-images-bucket to my-target-project in
    us-central1, create my-image-import resource in my-project in us-central1.
    Run:        $ gcloud compute migration image-imports create my-image-import \
            --source-file=gs://my-images-bucket/my-ubuntu22.04.vmdk \
            --image-name=my-ubuntu-image --location=us-central1 \
            --target-project=projects/my-project/locations/global/\
        targetProjects/my-target-project --project=my-project

POSITIONAL ARGUMENTS
     Image import resource - The Image Import resource you want to create. This
     would be the image name if --image-name is not given. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

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
        Comma-separated list of the additional licenses to assign to the image.

     --description=DESCRIPTION
        A description of the image.

     --family-name=FAMILY_NAME
        The name of the image family to which the new image belongs.

     --image-name=IMAGE_NAME
        The name of the image that will be imported to Google Compute Engine.
        Default is the Image Import name.

     --kms-key=KMS_KEY
        Fully qualified identifier for the Cloud KMS (Key Management Service)
        cryptokey that will be used to protect the image.

     --labels=[KEY=VALUE,...]
        A map of labels to associate with the image.

     --single-region-storage
        If true, the location of the imported image will be the region of the
        import job. Otherwise the closest multi-region is selected. Default is
        false.

     --target-project=TARGET_PROJECT
        The target project resource path to which the image will be imported.
        Default is the customer project. To get a list of the target projects
        run the gcloud alpha migration vms target-projects list command.

     OS adaptation parameters

     At most one of these can be specified:

       --adaptation-modifiers=ADAPTATION_MODIFIERS
          A map of flags to pass to the OS adaptation process. The actual value
          depends on the modifier and can also be empty. e.g.
          --adaptation-modifiers=flag1=value1,flag2

       --boot-conversion=BOOT_CONVERSION
          This property will trigger an internal process which will convert the
          image from using the existing boot option to another. The size of the
          boot disk might be increased to allow the conversion. Currently only
          support BIOS_TO_EFI.

          BOOT_CONVERSION must be one of: bios-to-efi,
          boot-conversion-unspecified, none.

       --generalize
          If true, generalize the imported image. Default false. The
          generalization process enables co-existence of multiple VMs created
          from the same image. For Windows, generalizing the image removes
          computer-specific information such as installed drivers and the
          computer security identifier (SID).

       --license-type=LICENSE_TYPE
          The license to use post migration. LICENSE_TYPE must be one of:
          compute-engine-license-type-byol,
          compute-engine-license-type-default,
          compute-engine-license-type-payg.

       --rootfs-uuid=ROOTFS_UUID
          Identifies the file system to adapt.

       --skip-os-adaptation
          If true, skip OS adaptation. Default false.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --guest-os-features=[GUEST_OS_FEATURES,...]
          Guest OS features to enable on the imported image. This field does
          not change the OS of the image; it only marks the image with the
          specified features, so ensure they are compatible with the OS. If
          specified, --skip-os-adaptation must be specified.

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

        $ gcloud alpha compute migration image-imports create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud compute migration image-imports create my-image-import \
    --source-file=gs://my-images-bucket/my-ubuntu22.04.vmdk \
    --image-name=my-ubuntu-image \
    --location=us-central1 \
    --target-project=projects/my-project/locations/global/targetProjects/my-target-project \
    --project=my-project
```

### gcloud compute migration image-imports delete

```text
NAME
    gcloud compute migration image-imports delete - delete an Image Import
        resource

SYNOPSIS
    gcloud compute migration image-imports delete
        (IMAGE_IMPORT_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute migration image-imports delete deletes an Image Import
    resource. To use this command, you must enable VM Migration API in your
    project.

    This command does not delete any images imported to Google Compute Engine.

EXAMPLES
    To delete my-image-import resource in us-central1 in the default project,
    run:        $ gcloud compute migration image-imports delete my-image-import \
            --location=us-central1

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

        $ gcloud alpha compute migration image-imports delete
```

### gcloud compute migration image-imports describe

```text
NAME
    gcloud compute migration image-imports describe - describe an Image Import

SYNOPSIS
    gcloud compute migration image-imports describe
        (IMAGE_IMPORT_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute migration image-imports describe describes an Image Import
    resource with a nested Image Import Job. The Image Import Job resource
    tracks the image import progress. To use this command, you must enable VM
    Migration API in your project.

EXAMPLES
    To describe my-image-import resource in us-central1 in the default project,
    run:        $ gcloud compute migration image-imports describe my-image-import \
            --location=us-central1

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

        $ gcloud alpha compute migration image-imports describe
```

### gcloud compute migration image-imports list

```text
NAME
    gcloud compute migration image-imports list - list Image Imports

SYNOPSIS
    gcloud compute migration image-imports list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute migration image-imports list prints a detailed list of Image
    Import resources. To use this command, you must enable VM Migration API in
    your project.

EXAMPLES
    To list the Image Import resources in us-central1 in the default project,
    run:        $ gcloud compute migration image-imports list --location=us-central1

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

        $ gcloud alpha compute migration image-imports list
```

### gcloud alpha compute migration image-imports create

```text
NAME
    gcloud alpha compute migration image-imports create - import Virtual Disk
        images to Google Compute Engine

SYNOPSIS
    gcloud alpha compute migration image-imports create
        (IMAGE_IMPORT_NAME : --location=LOCATION) --source-file=SOURCE_FILE
        [--additional-licenses=[ADDITIONAL_LICENSES,...]]
        [--description=DESCRIPTION] [--family-name=FAMILY_NAME]
        [--image-name=IMAGE_NAME] [--kms-key=KMS_KEY]
        [--labels=[KEY=VALUE,...]] [--single-region-storage]
        [--target-project=TARGET_PROJECT]
        [--adaptation-modifiers=ADAPTATION_MODIFIERS
          --boot-conversion=BOOT_CONVERSION
          --generalize --license-type=LICENSE_TYPE --rootfs-uuid=ROOTFS_UUID
          | [--skip-os-adaptation
          : --guest-os-features=[GUEST_OS_FEATURES,...]]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute migration image-imports delete

```text
NAME
    gcloud alpha compute migration image-imports delete - delete an Image
        Import resource

SYNOPSIS
    gcloud alpha compute migration image-imports delete
        (IMAGE_IMPORT_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute migration image-imports describe

```text
NAME
    gcloud alpha compute migration image-imports describe - describe an Image
        Import

SYNOPSIS
    gcloud alpha compute migration image-imports describe
        (IMAGE_IMPORT_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute migration image-imports list

```text
NAME
    gcloud alpha compute migration image-imports list - list Image Imports

SYNOPSIS
    gcloud alpha compute migration image-imports list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example puts `$ gcloud` on the same line as `Run:`, and the help wraps the `--target-project` value with a backslash; the runnable form starts the command on its own line and joins the value.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/migration/image-imports (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
