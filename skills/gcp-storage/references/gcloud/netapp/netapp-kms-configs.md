---
source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/kms-configs
---

# gcloud netapp kms-configs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud netapp kms-configs create

```text
NAME
    gcloud netapp kms-configs create - create a Cloud NetApp Volumes KMS Config

SYNOPSIS
    gcloud netapp kms-configs create (KMS_CONFIG : --location=LOCATION)
        (--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a KMS (Key Management System) Config to encrypt Cloud NetApp
    Volumes, Storage Pools etc. using Customer Managed Encryption Keys (CMEK)

EXAMPLES
    The following command creates a KMS Config instance named KMS_CONFIG using
    specified project, location, Key Ring and Crypto Key

        $ gcloud netapp kms-configs create KMS_CONFIG \
          --location=us-central1 --kms-location=northamerica-northeast1 \
          --kms-project=kms-project1 --kms-keyring=kms-keyring21 \
          --kms-key=crypto-key1

POSITIONAL ARGUMENTS
     Kms config resource - The KMS Config to create The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument kms_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KMS_CONFIG
          ID of the kms_config or fully qualified identifier for the
          kms_config.

          To set the kms_config attribute:
          + provide the argument kms_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the kms_config.

          To set the location attribute:
          + provide the argument kms_config on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

REQUIRED FLAGS
     Kms key resource - The Cloud KMS (Key Management Service) Crypto Key that
     will be used The arguments in this group can be used to specify the
     attributes of this resource.

     This must be specified.

       --kms-key=KMS_KEY
          ID of the kms_key or fully qualified identifier for the kms_key.

          To set the kms-key attribute:
          + provide the argument --kms-key on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --kms-keyring=KMS_KEYRING
          The KMS keyring of the kms_key

          To set the kms-keyring attribute:
          + provide the argument --kms-key on the command line with a fully
            specified name;
          + provide the argument --kms-keyring on the command line.

       --kms-location=KMS_LOCATION
          The Cloud location for the kms_key.

          To set the kms-location attribute:
          + provide the argument --kms-key on the command line with a fully
            specified name;
          + provide the argument --kms-location on the command line;
          + provide the argument --location on the command line;
          + set the property netapp/location.

       --kms-project=KMS_PROJECT
          The Cloud project for the kms_key.

          To set the kms-project attribute:
          + provide the argument --kms-key on the command line with a fully
            specified name;
          + provide the argument --kms-project on the command line;
          + set the property core/project.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A description of the Cloud NetApp KMS Config

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta netapp kms-configs create
```

### gcloud netapp kms-configs delete

```text
NAME
    gcloud netapp kms-configs delete - delete a Cloud NetApp Volumes KMS Config

SYNOPSIS
    gcloud netapp kms-configs delete (KMS_CONFIG : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a KMS (Key Management System) Config

EXAMPLES
    The following command deletes a KMS Config instance named KMS_CONFIG in the
    default netapp/location.

        $ gcloud netapp kms-configs delete KMS_CONFIG

    To delete a KMS Config named KMS_CONFIG asynchronously, run the following
    command:

        $ gcloud netapp kms-configs delete KMS_CONFIG --async

POSITIONAL ARGUMENTS
     Kms config resource - The KMS Config to delete The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument kms_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KMS_CONFIG
          ID of the kms_config or fully qualified identifier for the
          kms_config.

          To set the kms_config attribute:
          + provide the argument kms_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the kms_config.

          To set the location attribute:
          + provide the argument kms_config on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

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

NOTES
    This variant is also available:

        $ gcloud beta netapp kms-configs delete
```

### gcloud netapp kms-configs describe

```text
NAME
    gcloud netapp kms-configs describe - show metadata for a Cloud NetApp
        Volumes KMS Config

SYNOPSIS
    gcloud netapp kms-configs describe (KMS_CONFIG : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a KMS (Key Management System) Config.

EXAMPLES
    The following command gets metadata using describe for a KMS Config
    instance named KMS_CONFIG in the default netapp/location.

        $ gcloud netapp kms-configs describe KMS_CONFIG

    To get metadata on a KMS Config named KMS_CONFIG in a specified location,
    run:

        $ gcloud netapp kms-configs describe KMS_CONFIG \
          --location=us-central1s

POSITIONAL ARGUMENTS
     Kms config resource - The KMS Config to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument kms_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KMS_CONFIG
          ID of the kms_config or fully qualified identifier for the
          kms_config.

          To set the kms_config attribute:
          + provide the argument kms_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the kms_config.

          To set the location attribute:
          + provide the argument kms_config on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta netapp kms-configs describe
```

### gcloud netapp kms-configs encrypt

```text
NAME
    gcloud netapp kms-configs encrypt - encrypt all existing volumes and
        storage pools in the same region with the desired Cloud NetApp Volumes
        KMS Config

SYNOPSIS
    gcloud netapp kms-configs encrypt (KMS_CONFIG : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Encrypt the existing volumes with the desired KMS (Key Management System)
    Config using Customer Managed Encryption Keys (CMEK).

EXAMPLES
    The following command encrypts the existing volumes with the desired KMS
    Config instance named KMS_CONFIG using specified project and location.

        $ gcloud netapp kms-configs encrypt KMS_CONFIG --location=us-central1

POSITIONAL ARGUMENTS
     Kms config resource - The KMS Config used to encrypt The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument kms_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KMS_CONFIG
          ID of the kms_config or fully qualified identifier for the
          kms_config.

          To set the kms_config attribute:
          + provide the argument kms_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the kms_config.

          To set the location attribute:
          + provide the argument kms_config on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

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

NOTES
    This variant is also available:

        $ gcloud beta netapp kms-configs encrypt
```

### gcloud netapp kms-configs list

```text
NAME
    gcloud netapp kms-configs list - list Cloud NetApp Volumes KMS Configs

SYNOPSIS
    gcloud netapp kms-configs list [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists KMS (Key Management System) Configs to encrypt Cloud NetApp Volumes,
    Storage Pools etc. using Customer Managed Encryption Keys (CMEK).

EXAMPLES
    The following command lists all KMS Config instance in the default
    netapp/location

        $ gcloud netapp kms-configs list

    To list all KMS Configs in a specified location, run:

        $ gcloud netapp kms-configs list --location=us-central1

FLAGS
     Location resource - The location in which to list KMS Configs. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * uses all locations by default. with a fully specified name;
      * set the property netapp/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * uses all locations by default.;
        * set the property netapp/location.

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
    This variant is also available:

        $ gcloud beta netapp kms-configs list
```

### gcloud netapp kms-configs update

```text
NAME
    gcloud netapp kms-configs update - update a Cloud NetApp Volumes KMS Config

SYNOPSIS
    gcloud netapp kms-configs update (KMS_CONFIG : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a KMS (Key Management System) Config.

EXAMPLES
    The following command updates a KMS Config instance named KMS_CONFIG with
    all possible arguments:

        $ gcloud netapp kms-configs update KMS_CONFIG \
          --location=us-central1 --kms-location=europe-southwest1 \
          --kms-project=new-kms-project --kms-keyring=kms-keyring2 \
          --kms-key=crypto-key2

    To update a KMS Config named KMS_CONFIG asynchronously, run the following
    command:

        $ gcloud netapp kms-configs update KMS_CONFIG --async \
          --location=us-central1 --kms-location=europe-southwest1 \
          --kms-project=new-kms-project --kms-keyring=kms-keyring2 \
          --kms-key=crypto-key2

POSITIONAL ARGUMENTS
     Kms config resource - The KMS Config to update The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument kms_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KMS_CONFIG
          ID of the kms_config or fully qualified identifier for the
          kms_config.

          To set the kms_config attribute:
          + provide the argument kms_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the kms_config.

          To set the location attribute:
          + provide the argument kms_config on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A description of the Cloud NetApp KMS Config

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud netapp kms-configs update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud netapp kms-configs update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

     Kms key resource - The Cloud KMS (Key Management Service) Crypto Key that
     will be used The arguments in this group can be used to specify the
     attributes of this resource.

     --kms-key=KMS_KEY
        ID of the kms_key or fully qualified identifier for the kms_key.

        To set the kms-key attribute:
        * provide the argument --kms-key on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --kms-keyring=KMS_KEYRING
        The KMS keyring of the kms_key

        To set the kms-keyring attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-keyring on the command line.

     --kms-location=KMS_LOCATION
        The Cloud location for the kms_key.

        To set the kms-location attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-location on the command line;
        * provide the argument --location on the command line;
        * set the property netapp/location.

     --kms-project=KMS_PROJECT
        The Cloud project for the kms_key.

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
    This variant is also available:

        $ gcloud beta netapp kms-configs update
```

### gcloud netapp kms-configs verify

```text
NAME
    gcloud netapp kms-configs verify - verify that the Cloud NetApp Volumes KMS
        Config is reachable

SYNOPSIS
    gcloud netapp kms-configs verify (KMS_CONFIG : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Verifies that the Cloud NetApp Volumes KMS (Key Management System) Config
    is reachable.

EXAMPLES
    The following command verifies that the KMS Config instance named
    KMS_CONFIG is reachable using specified location.

        $ gcloud netapp kms-configs verify KMS_CONFIG --location=us-central1

POSITIONAL ARGUMENTS
     Kms config resource - The KMS Config used to verify The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument kms_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KMS_CONFIG
          ID of the kms_config or fully qualified identifier for the
          kms_config.

          To set the kms_config attribute:
          + provide the argument kms_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the kms_config.

          To set the location attribute:
          + provide the argument kms_config on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta netapp kms-configs verify
```

### gcloud beta netapp kms-configs create

```text
NAME
    gcloud beta netapp kms-configs create - create a Cloud NetApp Volumes KMS
        Config

SYNOPSIS
    gcloud beta netapp kms-configs create (KMS_CONFIG : --location=LOCATION)
        (--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp kms-configs delete

```text
NAME
    gcloud beta netapp kms-configs delete - delete a Cloud NetApp Volumes KMS
        Config

SYNOPSIS
    gcloud beta netapp kms-configs delete (KMS_CONFIG : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp kms-configs describe

```text
NAME
    gcloud beta netapp kms-configs describe - show metadata for a Cloud NetApp
        Volumes KMS Config

SYNOPSIS
    gcloud beta netapp kms-configs describe (KMS_CONFIG : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp kms-configs encrypt

```text
NAME
    gcloud beta netapp kms-configs encrypt - encrypt all existing volumes and
        storage pools in the same region with the desired Cloud NetApp Volumes
        KMS Config

SYNOPSIS
    gcloud beta netapp kms-configs encrypt (KMS_CONFIG : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp kms-configs list

```text
NAME
    gcloud beta netapp kms-configs list - list Cloud NetApp Volumes KMS Configs

SYNOPSIS
    gcloud beta netapp kms-configs list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp kms-configs update

```text
NAME
    gcloud beta netapp kms-configs update - update a Cloud NetApp Volumes KMS
        Config

SYNOPSIS
    gcloud beta netapp kms-configs update (KMS_CONFIG : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp kms-configs verify

```text
NAME
    gcloud beta netapp kms-configs verify - verify that the Cloud NetApp
        Volumes KMS Config is reachable

SYNOPSIS
    gcloud beta netapp kms-configs verify (KMS_CONFIG : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/kms-configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
