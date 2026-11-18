---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pam/operations
---

# gcloud pam operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pam operations delete

```text
NAME
    gcloud pam operations delete - delete a Privileged Access Manager long
        running operation

SYNOPSIS
    gcloud pam operations delete
        (OPERATION
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Privileged Access Manager (PAM) long running operation.

EXAMPLES
    The following command deletes an operation with the full name
    OPERATION_NAME:

        $ gcloud pam operations delete OPERATION_NAME

POSITIONAL ARGUMENTS
     Operation resource - Name of the operation to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [privilegedaccessmanager.projects.locations.operations,
        privilegedaccessmanager.folders.locations.operations,
        privilegedaccessmanager.organizations.locations.operations].

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations.operations].

       --location=LOCATION
          The resource location

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations.operations].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the privilegedaccessmanager/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/iam/docs/pam-overview

NOTES
    These variants are also available:

        $ gcloud alpha pam operations delete

        $ gcloud beta pam operations delete
```

### gcloud pam operations describe

```text
NAME
    gcloud pam operations describe - show details of a Privileged Access
        Manager long running operation

SYNOPSIS
    gcloud pam operations describe
        (OPERATION
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of a Privileged Access Manager (PAM) long running operation.

EXAMPLES
    The following command describes an operation with the full name
    OPERATION_NAME:

        $ gcloud pam operations describe OPERATION_NAME

POSITIONAL ARGUMENTS
     Operation resource - Name of the operation to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [privilegedaccessmanager.projects.locations.operations,
        privilegedaccessmanager.folders.locations.operations,
        privilegedaccessmanager.organizations.locations.operations].

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations.operations].

       --location=LOCATION
          The resource location

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations.operations].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the privilegedaccessmanager/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/iam/docs/pam-overview

NOTES
    These variants are also available:

        $ gcloud alpha pam operations describe

        $ gcloud beta pam operations describe
```

### gcloud pam operations list

```text
NAME
    gcloud pam operations list - list all Privileged Access Manager long
        running operations under a location

SYNOPSIS
    gcloud pam operations list
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Privileged Access Manager (PAM) long running operations under a
    project/folder/organization location.

EXAMPLES
    The following command lists all operations in a project named
    sample-project and in location global:

        $ gcloud pam operations list --project=sample-project \
            --location=global

    The following command lists all operations in a folder with ID FOLDER_ID
    and in location global:

        $ gcloud pam operations list --folder=FOLDER_ID --location=global

    The following command lists all operations in an organization with ID
    ORGANIZATION_ID and in location global:

        $ gcloud pam operations list --organization=ORGANIZATION_ID \
            --location=global

REQUIRED FLAGS
     Location resource - Location of the operations. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [privilegedaccessmanager.projects.locations,
        privilegedaccessmanager.folders.locations,
        privilegedaccessmanager.organizations.locations].

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations].

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations].

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
    This command uses the privilegedaccessmanager/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/iam/docs/pam-overview

NOTES
    These variants are also available:

        $ gcloud alpha pam operations list

        $ gcloud beta pam operations list
```

### gcloud pam operations wait

```text
NAME
    gcloud pam operations wait - poll a Privileged Access Manager long running
        operation

SYNOPSIS
    gcloud pam operations wait
        (OPERATION
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Poll a Privileged Access Manager (PAM) long running operation until it
    completes and then display its result.

EXAMPLES
    The following command polls an operation with the full name OPERATION_NAME:

        $ gcloud pam operations wait OPERATION_NAME

POSITIONAL ARGUMENTS
     Operation resource - Name of the operation to poll. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [privilegedaccessmanager.projects.locations.operations,
        privilegedaccessmanager.folders.locations.operations,
        privilegedaccessmanager.organizations.locations.operations].

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations.operations].

       --location=LOCATION
          The resource location

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations.operations].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the privilegedaccessmanager/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/iam/docs/pam-overview

NOTES
    These variants are also available:

        $ gcloud alpha pam operations wait

        $ gcloud beta pam operations wait
```

### gcloud beta pam operations delete

```text
NAME
    gcloud beta pam operations delete - delete a Privileged Access Manager long
        running operation

SYNOPSIS
    gcloud beta pam operations delete
        (OPERATION
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam operations describe

```text
NAME
    gcloud beta pam operations describe - show details of a Privileged Access
        Manager long running operation

SYNOPSIS
    gcloud beta pam operations describe
        (OPERATION
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam operations list

```text
NAME
    gcloud beta pam operations list - list all Privileged Access Manager long
        running operations under a location

SYNOPSIS
    gcloud beta pam operations list
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam operations wait

```text
NAME
    gcloud beta pam operations wait - poll a Privileged Access Manager long
        running operation

SYNOPSIS
    gcloud beta pam operations wait
        (OPERATION
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam operations delete

```text
NAME
    gcloud alpha pam operations delete - delete a Privileged Access Manager
        long running operation

SYNOPSIS
    gcloud alpha pam operations delete
        (OPERATION
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam operations describe

```text
NAME
    gcloud alpha pam operations describe - show details of a Privileged Access
        Manager long running operation

SYNOPSIS
    gcloud alpha pam operations describe
        (OPERATION
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam operations list

```text
NAME
    gcloud alpha pam operations list - list all Privileged Access Manager long
        running operations under a location

SYNOPSIS
    gcloud alpha pam operations list
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam operations wait

```text
NAME
    gcloud alpha pam operations wait - poll a Privileged Access Manager long
        running operation

SYNOPSIS
    gcloud alpha pam operations wait
        (OPERATION
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pam/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
