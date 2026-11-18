---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/key-handles
---

# gcloud kms key-handles

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms key-handles create

```text
NAME
    gcloud kms key-handles create - create a new KeyHandle

SYNOPSIS
    gcloud kms key-handles create --location=LOCATION
        --resource-type=RESOURCE_TYPE
        (--generate-key-handle-id | --key-handle-id=KEY_HANDLE_ID)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new KeyHandle, triggering the provisioning of a new CryptoKey for
    CMEK use with the given resource type in the configured key project and the
    same location

EXAMPLES
    The following command creates a KeyHandle named my-key-handle within the
    location global for the resource type compute.googleapis.com/Disk:

        $ gcloud kms key-handles create --key-handle-id=my-key-handle \
            --location=global --resource-type=compute.googleapis.com/Disk

    To generate a random KeyHandle id, the --generate-key-handle-id flag can be
    used instead of --key-handle-id.

REQUIRED FLAGS
     Location resource - The KMS location resource. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

     --resource-type=RESOURCE_TYPE
        The resource type selector for KeyHandle resources of the form
        {SERVICE}.{UNIVERSE_DOMAIN}/{TYPE}.

     Exactly one of these must be specified:

       --generate-key-handle-id
          Generate a KeyHandle id for the new KeyHandle resource.

       --key-handle-id=KEY_HANDLE_ID
          The KeyHandle id for the new KeyHandle resource.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms key-handles create

        $ gcloud beta kms key-handles create
```

### gcloud kms key-handles describe

```text
NAME
    gcloud kms key-handles describe - get metadata for a KeyHandle

SYNOPSIS
    gcloud kms key-handles describe (KEY_HANDLE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get metadata for a KeyHandle.

EXAMPLES
    The following command gets metadata for a KeyHandle named my-key-handle in
    the locations us-central1.

        $ gcloud kms key-handles describe my-key-handle \
             --location=us-central1

POSITIONAL ARGUMENTS
     Key handle resource - The KeyHandle to get metadata for. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument key_handle on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEY_HANDLE
          ID of the key handle or fully qualified identifier for the key
          handle.

          To set the key_handle attribute:
          + provide the argument key_handle on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the resource.

          To set the location attribute:
          + provide the argument key_handle on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudkms/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/kms/

NOTES
    These variants are also available:

        $ gcloud alpha kms key-handles describe

        $ gcloud beta kms key-handles describe
```

### gcloud kms key-handles list

```text
NAME
    gcloud kms key-handles list - list KeyHandle resources within a project and
        location

SYNOPSIS
    gcloud kms key-handles list --location=LOCATION
        --resource-type=RESOURCE_TYPE [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all KeyHandle resources within a given project and location.
    Addtionally, can filter the list.

EXAMPLES
    The following command lists a maximum of five KeyHandle resources in the
    location global:

        $ gcloud kms key-handles list --location=global --limit=5

    The following command lists all KeyHandle resources in the location global
    that have a resource type selector of compute.googleapis.com/Instance:

        $ gcloud kms key-handles list --location=global \
            --resource-type=compute.googleapis.com/Instance

REQUIRED FLAGS
     Location resource - The KMS location resource. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

     --resource-type=RESOURCE_TYPE
        The resource type selector for KeyHandle resources of the form
        {SERVICE}.{UNIVERSE_DOMAIN}/{TYPE}.

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

        $ gcloud alpha kms key-handles list

        $ gcloud beta kms key-handles list
```

### gcloud beta kms key-handles create

```text
NAME
    gcloud beta kms key-handles create - create a new KeyHandle

SYNOPSIS
    gcloud beta kms key-handles create --location=LOCATION
        --resource-type=RESOURCE_TYPE
        (--generate-key-handle-id | --key-handle-id=KEY_HANDLE_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms key-handles describe

```text
NAME
    gcloud beta kms key-handles describe - get metadata for a KeyHandle

SYNOPSIS
    gcloud beta kms key-handles describe (KEY_HANDLE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms key-handles list

```text
NAME
    gcloud beta kms key-handles list - list KeyHandle resources within a
        project and location

SYNOPSIS
    gcloud beta kms key-handles list --location=LOCATION
        --resource-type=RESOURCE_TYPE [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms key-handles create

```text
NAME
    gcloud alpha kms key-handles create - create a new KeyHandle

SYNOPSIS
    gcloud alpha kms key-handles create --location=LOCATION
        --resource-type=RESOURCE_TYPE
        (--generate-key-handle-id | --key-handle-id=KEY_HANDLE_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms key-handles describe

```text
NAME
    gcloud alpha kms key-handles describe - get metadata for a KeyHandle

SYNOPSIS
    gcloud alpha kms key-handles describe (KEY_HANDLE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms key-handles list

```text
NAME
    gcloud alpha kms key-handles list - list KeyHandle resources within a
        project and location

SYNOPSIS
    gcloud alpha kms key-handles list --location=LOCATION
        --resource-type=RESOURCE_TYPE [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Incomplete example: the first `gcloud kms key-handles list` example omits `--resource-type`, which the SYNOPSIS requires (gcloud 593.0.0: "argument --resource-type: Must be specified."). Add the required flag, as in the second example.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/key-handles (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
