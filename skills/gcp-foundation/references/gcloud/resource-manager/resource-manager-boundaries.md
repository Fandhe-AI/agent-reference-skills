---
source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/boundaries
---

# gcloud resource-manager boundaries

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud resource-manager boundaries create

```text
NAME
    gcloud resource-manager boundaries create - create a new boundary

SYNOPSIS
    gcloud resource-manager boundaries create
        (BOUNDARY : --folder=FOLDER --organization=ORGANIZATION) [--async]
        [--display-name=DISPLAY_NAME] [--tag-key=TAG_KEY]
        [--tag-value=TAG_VALUE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud resource-manager boundaries create creates a new boundary under the
    specified organization or folder.

EXAMPLES
    To create a boundary with ID my-boundary in an organization with ID
    123456789012, run:

        $ gcloud resource-manager boundaries create my-boundary \
            --organization=123456789012 --display-name="My Boundary"

    To create a boundary with ID my-boundary in an organization with ID
    123456789012 with a tag filter, run:

        $ gcloud resource-manager boundaries create my-boundary \
            --organization=123456789012 --display-name="My Boundary" \
            --tag-key=123456789012/env --tag-value=production

    To create a boundary with ID my-boundary in a folder with ID 456789012345,
    run:

        $ gcloud resource-manager boundaries create my-boundary \
            --folder=456789012345 --display-name="My Boundary" \
            --tag-key=123456789012/env --tag-value=production

POSITIONAL ARGUMENTS
     Boundary resource - The boundary to create. The arguments in this group
     can be used to specify the attributes of this resource. This resource can
     be one of the following types:
     [cloudresourcemanager.organizations.boundaries,
     cloudresourcemanager.folders.boundaries].

     This must be specified.

       BOUNDARY
          ID of the boundary or fully qualified identifier for the boundary.

          To set the boundary attribute:
          + provide the argument boundary on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          Folder ID or full resource name of the boundary.

          To set the folder attribute:
          + provide the argument boundary on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.folders.boundaries].

       --organization=ORGANIZATION
          Organization ID or full resource name of the boundary.

          To set the organization attribute:
          + provide the argument boundary on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.organizations.boundaries].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        Friendly display name to use for the boundary.

     --tag-key=TAG_KEY
        The namespaced name of the tag key (e.g. 123456789012/env).

     --tag-value=TAG_VALUE
        The short name of the tag value (e.g. production).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager boundaries create

        $ gcloud beta resource-manager boundaries create
```

### gcloud resource-manager boundaries delete

```text
NAME
    gcloud resource-manager boundaries delete - delete a boundary

SYNOPSIS
    gcloud resource-manager boundaries delete
        (BOUNDARY : --folder=FOLDER --organization=ORGANIZATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud resource-manager boundaries delete deletes an existing boundary
    given its ID and parent or its full resource name.

EXAMPLES
    To delete a boundary with ID my-boundary in an organization with ID
    123456789012, run:

        $ gcloud resource-manager boundaries delete my-boundary \
            --organization=123456789012

    To delete a boundary by full resource name, run:

        $ gcloud resource-manager boundaries delete \
            organizations/123456789012/boundaries/my-boundary

POSITIONAL ARGUMENTS
     Boundary resource - The boundary to delete. The arguments in this group
     can be used to specify the attributes of this resource. This resource can
     be one of the following types:
     [cloudresourcemanager.organizations.boundaries,
     cloudresourcemanager.folders.boundaries].

     This must be specified.

       BOUNDARY
          ID of the boundary or fully qualified identifier for the boundary.

          To set the boundary attribute:
          + provide the argument boundary on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          Folder ID or full resource name of the boundary.

          To set the folder attribute:
          + provide the argument boundary on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.folders.boundaries].

       --organization=ORGANIZATION
          Organization ID or full resource name of the boundary.

          To set the organization attribute:
          + provide the argument boundary on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.organizations.boundaries].

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
    These variants are also available:

        $ gcloud alpha resource-manager boundaries delete

        $ gcloud beta resource-manager boundaries delete
```

### gcloud resource-manager boundaries describe

```text
NAME
    gcloud resource-manager boundaries describe - describe a boundary

SYNOPSIS
    gcloud resource-manager boundaries describe
        (BOUNDARY : --folder=FOLDER --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud resource-manager boundaries describe describes a boundary given its
    ID and parent or its full resource name.

EXAMPLES
    To describe a boundary with ID my-boundary in an organization with ID
    123456789012, run:

        $ gcloud resource-manager boundaries describe my-boundary \
            --organization=123456789012

    To describe a boundary by full resource name, run:

        $ gcloud resource-manager boundaries describe \
            organizations/123456789012/boundaries/my-boundary

POSITIONAL ARGUMENTS
     Boundary resource - The boundary to describe. The arguments in this group
     can be used to specify the attributes of this resource. This resource can
     be one of the following types:
     [cloudresourcemanager.organizations.boundaries,
     cloudresourcemanager.folders.boundaries].

     This must be specified.

       BOUNDARY
          ID of the boundary or fully qualified identifier for the boundary.

          To set the boundary attribute:
          + provide the argument boundary on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          Folder ID or full resource name of the boundary.

          To set the folder attribute:
          + provide the argument boundary on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.folders.boundaries].

       --organization=ORGANIZATION
          Organization ID or full resource name of the boundary.

          To set the organization attribute:
          + provide the argument boundary on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.organizations.boundaries].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager boundaries describe

        $ gcloud beta resource-manager boundaries describe
```

### gcloud resource-manager boundaries list

```text
NAME
    gcloud resource-manager boundaries list - list boundaries

SYNOPSIS
    gcloud resource-manager boundaries list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud resource-manager boundaries list lists all boundaries under the
    specified organization or folder.

EXAMPLES
    To list boundaries under an organization with ID 123456789012, run:

        $ gcloud resource-manager boundaries list --organization=123456789012

    To list boundaries under a folder with ID 456789012345, run:

        $ gcloud resource-manager boundaries list --folder=456789012345

REQUIRED FLAGS
     Parent resource of the boundary.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder ID.

       --organization=ORGANIZATION_ID
          Organization ID.

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

        $ gcloud alpha resource-manager boundaries list

        $ gcloud beta resource-manager boundaries list
```

### gcloud resource-manager boundaries update

```text
NAME
    gcloud resource-manager boundaries update - update a boundary

SYNOPSIS
    gcloud resource-manager boundaries update
        (BOUNDARY : --folder=FOLDER --organization=ORGANIZATION) [--async]
        [--display-name=DISPLAY_NAME] [--etag=ETAG] [--tag-value=TAG_VALUE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud resource-manager boundaries update updates the display name or tag
    value of an existing boundary.

EXAMPLES
    To update a boundary with ID my-boundary in an organization with ID
    123456789012, run:

        $ gcloud resource-manager boundaries update my-boundary \
            --organization=123456789012 --display-name="Updated Name" \
            --tag-value=staging

POSITIONAL ARGUMENTS
     Boundary resource - The boundary to update. The arguments in this group
     can be used to specify the attributes of this resource. This resource can
     be one of the following types:
     [cloudresourcemanager.organizations.boundaries,
     cloudresourcemanager.folders.boundaries].

     This must be specified.

       BOUNDARY
          ID of the boundary or fully qualified identifier for the boundary.

          To set the boundary attribute:
          + provide the argument boundary on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          Folder ID or full resource name of the boundary.

          To set the folder attribute:
          + provide the argument boundary on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.folders.boundaries].

       --organization=ORGANIZATION
          Organization ID or full resource name of the boundary.

          To set the organization attribute:
          + provide the argument boundary on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.organizations.boundaries].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        Friendly display name to use for the boundary.

     --etag=ETAG
        The etag of the boundary.

     --tag-value=TAG_VALUE
        The short name of the tag value (e.g. production).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager boundaries update

        $ gcloud beta resource-manager boundaries update
```

### gcloud beta resource-manager boundaries create

```text
NAME
    gcloud beta resource-manager boundaries create - create a new boundary

SYNOPSIS
    gcloud beta resource-manager boundaries create
        (BOUNDARY : --folder=FOLDER --organization=ORGANIZATION) [--async]
        [--display-name=DISPLAY_NAME] [--tag-key=TAG_KEY]
        [--tag-value=TAG_VALUE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager boundaries delete

```text
NAME
    gcloud beta resource-manager boundaries delete - delete a boundary

SYNOPSIS
    gcloud beta resource-manager boundaries delete
        (BOUNDARY : --folder=FOLDER --organization=ORGANIZATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager boundaries describe

```text
NAME
    gcloud beta resource-manager boundaries describe - describe a boundary

SYNOPSIS
    gcloud beta resource-manager boundaries describe
        (BOUNDARY : --folder=FOLDER --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager boundaries list

```text
NAME
    gcloud beta resource-manager boundaries list - list boundaries

SYNOPSIS
    gcloud beta resource-manager boundaries list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager boundaries update

```text
NAME
    gcloud beta resource-manager boundaries update - update a boundary

SYNOPSIS
    gcloud beta resource-manager boundaries update
        (BOUNDARY : --folder=FOLDER --organization=ORGANIZATION) [--async]
        [--display-name=DISPLAY_NAME] [--etag=ETAG] [--tag-value=TAG_VALUE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager boundaries create

```text
NAME
    gcloud alpha resource-manager boundaries create - create a new boundary

SYNOPSIS
    gcloud alpha resource-manager boundaries create
        (BOUNDARY : --folder=FOLDER --organization=ORGANIZATION) [--async]
        [--display-name=DISPLAY_NAME] [--tag-key=TAG_KEY]
        [--tag-value=TAG_VALUE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager boundaries delete

```text
NAME
    gcloud alpha resource-manager boundaries delete - delete a boundary

SYNOPSIS
    gcloud alpha resource-manager boundaries delete
        (BOUNDARY : --folder=FOLDER --organization=ORGANIZATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager boundaries describe

```text
NAME
    gcloud alpha resource-manager boundaries describe - describe a boundary

SYNOPSIS
    gcloud alpha resource-manager boundaries describe
        (BOUNDARY : --folder=FOLDER --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager boundaries list

```text
NAME
    gcloud alpha resource-manager boundaries list - list boundaries

SYNOPSIS
    gcloud alpha resource-manager boundaries list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager boundaries update

```text
NAME
    gcloud alpha resource-manager boundaries update - update a boundary

SYNOPSIS
    gcloud alpha resource-manager boundaries update
        (BOUNDARY : --folder=FOLDER --organization=ORGANIZATION) [--async]
        [--display-name=DISPLAY_NAME] [--etag=ETAG] [--tag-value=TAG_VALUE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/boundaries (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
