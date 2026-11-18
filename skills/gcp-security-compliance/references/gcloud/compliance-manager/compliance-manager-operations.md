---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compliance-manager/operations
---

# gcloud compliance-manager operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compliance-manager operations cancel

```text
NAME
    gcloud compliance-manager operations cancel - cancel operations

SYNOPSIS
    gcloud compliance-manager operations cancel
        (OPERATION : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel an operation

EXAMPLES
    To cancel the operation, run:

        $ gcloud compliance-manager operations cancel

POSITIONAL ARGUMENTS
     Operation resource - The name of the operation resource to be cancelled.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [cloudsecuritycompliance.organizations.locations.operations,
        cloudsecuritycompliance.projects.locations.operations].

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the operation resource.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the operation resource.

          To set the organization attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudsecuritycompliance.organizations.locations.operations].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsecuritycompliance/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/security-command-center#compliance-management
```

### gcloud compliance-manager operations delete

```text
NAME
    gcloud compliance-manager operations delete - delete operations

SYNOPSIS
    gcloud compliance-manager operations delete
        (OPERATION : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an operation

EXAMPLES
    To delete the operation, run:

        $ gcloud compliance-manager operations delete

POSITIONAL ARGUMENTS
     Operation resource - The name of the operation resource to be deleted. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [cloudsecuritycompliance.organizations.locations.operations,
        cloudsecuritycompliance.projects.locations.operations].

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the operation resource.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the operation resource.

          To set the organization attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudsecuritycompliance.organizations.locations.operations].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsecuritycompliance/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/security-command-center#compliance-management
```

### gcloud compliance-manager operations describe

```text
NAME
    gcloud compliance-manager operations describe - describe operations

SYNOPSIS
    gcloud compliance-manager operations describe
        (OPERATION : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an operation

EXAMPLES
    To describe the operation, run:

        $ gcloud compliance-manager operations describe

POSITIONAL ARGUMENTS
     Operation resource - The name of the operation resource. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [cloudsecuritycompliance.organizations.locations.operations,
        cloudsecuritycompliance.projects.locations.operations].

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the operation resource.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the operation resource.

          To set the organization attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudsecuritycompliance.organizations.locations.operations].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsecuritycompliance/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/security-command-center#compliance-management
```

### gcloud compliance-manager operations list

```text
NAME
    gcloud compliance-manager operations list - list operations

SYNOPSIS
    gcloud compliance-manager operations list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List operations

EXAMPLES
    To list all operations, run:

        $ gcloud compliance-manager operations list

REQUIRED FLAGS
     Location resource - The name of the operation's parent resource. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [cloudsecuritycompliance.organizations.locations,
        cloudsecuritycompliance.projects.locations].

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --organization=ORGANIZATION
          The organization id of the location resource.

          To set the organization attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudsecuritycompliance.organizations.locations].

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
    This command uses the cloudsecuritycompliance/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/security-command-center#compliance-management
```

### gcloud compliance-manager operations wait

```text
NAME
    gcloud compliance-manager operations wait - wait operations

SYNOPSIS
    gcloud compliance-manager operations wait
        (OPERATION : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Wait an operation

EXAMPLES
    To wait the operation, run:

        $ gcloud compliance-manager operations wait

POSITIONAL ARGUMENTS
     Operation resource - The name of the operation resource to wait on. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [cloudsecuritycompliance.organizations.locations.operations,
        cloudsecuritycompliance.projects.locations.operations].

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the operation resource.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the operation resource.

          To set the organization attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudsecuritycompliance.organizations.locations.operations].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsecuritycompliance/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/security-command-center#compliance-management
```

## Notes

- Incomplete example: the `cancel`, `delete`, `describe`, `list` and `wait` examples give only the command; gcloud 593.0.0 fails with "argument (OPERATION : --location=LOCATION --organization=ORGANIZATION): Must be specified." (`list`: "argument (--location : --organization): Must be specified."). Add the required arguments (see SYNOPSIS and FLAGS on this page).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compliance-manager/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
