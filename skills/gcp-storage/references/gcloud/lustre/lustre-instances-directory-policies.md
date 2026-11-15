---
source: https://docs.cloud.google.com/sdk/gcloud/reference/lustre/instances/directory-policies
---

# gcloud lustre instances directory-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud lustre instances directory-policies create

```text
NAME
    gcloud lustre instances directory-policies create - create
        directoryPolicies

SYNOPSIS
    gcloud lustre instances directory-policies create
        (DIRECTORY_POLICY : --instance=INSTANCE --location=LOCATION)
        --directory-path=DIRECTORY_PATH [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a directoryPolicy

EXAMPLES
    To create the directoryPolicy, run:

        $ gcloud lustre instances directory-policies create

POSITIONAL ARGUMENTS
     DirectoryPolicy resource - Identifier. The resource name of the directory
     policy. DirectoryPolicy names have the form
     projects/{project}/locations/{location}/instances/{instance}/directoryPolicies/{id}.
     {id} is user provided. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument directory_policy on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DIRECTORY_POLICY
          ID of the directoryPolicy or fully qualified identifier for the
          directoryPolicy.

          To set the directory_policy attribute:
          + provide the argument directory_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The instance id of the directoryPolicy resource.

          To set the instance attribute:
          + provide the argument directory_policy on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

       --location=LOCATION
          The location id of the directoryPolicy resource.

          To set the location attribute:
          + provide the argument directory_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --directory-path=DIRECTORY_PATH
        The lustre instance filesystem full path of the directory. It must
        start with a slash. e.g. /lustre/testFolder

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the lustre/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/managed-lustre/docs

NOTES
    This variant is also available:

        $ gcloud alpha lustre instances directory-policies create
```

### gcloud lustre instances directory-policies delete

```text
NAME
    gcloud lustre instances directory-policies delete - delete
        directoryPolicies

SYNOPSIS
    gcloud lustre instances directory-policies delete
        (DIRECTORY_POLICY : --instance=INSTANCE --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a directoryPolicy

EXAMPLES
    To delete the directoryPolicy, run:

        $ gcloud lustre instances directory-policies delete

POSITIONAL ARGUMENTS
     DirectoryPolicy resource - The resource name of the directory policy.
     DirectoryPolicy names have the form
     projects/{project}/locations/{location}/instances/{instance}/directoryPolicies/{id}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument directory_policy on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DIRECTORY_POLICY
          ID of the directoryPolicy or fully qualified identifier for the
          directoryPolicy.

          To set the directory_policy attribute:
          + provide the argument directory_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The instance id of the directoryPolicy resource.

          To set the instance attribute:
          + provide the argument directory_policy on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

       --location=LOCATION
          The location id of the directoryPolicy resource.

          To set the location attribute:
          + provide the argument directory_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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

API REFERENCE
    This command uses the lustre/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/managed-lustre/docs

NOTES
    This variant is also available:

        $ gcloud alpha lustre instances directory-policies delete
```

### gcloud lustre instances directory-policies describe

```text
NAME
    gcloud lustre instances directory-policies describe - describe
        directoryPolicies

SYNOPSIS
    gcloud lustre instances directory-policies describe
        (DIRECTORY_POLICY : --instance=INSTANCE --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a directoryPolicy

EXAMPLES
    To describe the directoryPolicy, run:

        $ gcloud lustre instances directory-policies describe

POSITIONAL ARGUMENTS
     DirectoryPolicy resource - The resource name of the directory policy.
     DirectoryPolicy names have the form
     projects/{project}/locations/{location}/instances/{instance}/directoryPolicies/{id}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument directory_policy on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DIRECTORY_POLICY
          ID of the directoryPolicy or fully qualified identifier for the
          directoryPolicy.

          To set the directory_policy attribute:
          + provide the argument directory_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The instance id of the directoryPolicy resource.

          To set the instance attribute:
          + provide the argument directory_policy on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

       --location=LOCATION
          The location id of the directoryPolicy resource.

          To set the location attribute:
          + provide the argument directory_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the lustre/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/managed-lustre/docs

NOTES
    This variant is also available:

        $ gcloud alpha lustre instances directory-policies describe
```

### gcloud lustre instances directory-policies list

```text
NAME
    gcloud lustre instances directory-policies list - list directoryPolicies

SYNOPSIS
    gcloud lustre instances directory-policies list
        (--instance=INSTANCE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List directoryPolicies

EXAMPLES
    To list all directoryPolicies, run:

        $ gcloud lustre instances directory-policies list

REQUIRED FLAGS
     Instance resource - The parent instance. It must be in the format of
     projects/{project}/locations/{location}/instances/{instance}. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --instance=INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument --instance on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location id of the instance resource.

          To set the location attribute:
          + provide the argument --instance on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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
    This command uses the lustre/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/managed-lustre/docs

NOTES
    This variant is also available:

        $ gcloud alpha lustre instances directory-policies list
```

### gcloud alpha lustre instances directory-policies create

```text
NAME
    gcloud alpha lustre instances directory-policies create - create
        directoryPolicies

SYNOPSIS
    gcloud alpha lustre instances directory-policies create
        (DIRECTORY_POLICY : --instance=INSTANCE --location=LOCATION)
        --directory-path=DIRECTORY_PATH [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha lustre instances directory-policies delete

```text
NAME
    gcloud alpha lustre instances directory-policies delete - delete
        directoryPolicies

SYNOPSIS
    gcloud alpha lustre instances directory-policies delete
        (DIRECTORY_POLICY : --instance=INSTANCE --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha lustre instances directory-policies describe

```text
NAME
    gcloud alpha lustre instances directory-policies describe - describe
        directoryPolicies

SYNOPSIS
    gcloud alpha lustre instances directory-policies describe
        (DIRECTORY_POLICY : --instance=INSTANCE --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha lustre instances directory-policies list

```text
NAME
    gcloud alpha lustre instances directory-policies list - list
        directoryPolicies

SYNOPSIS
    gcloud alpha lustre instances directory-policies list
        (--instance=INSTANCE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/lustre/instances/directory-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
