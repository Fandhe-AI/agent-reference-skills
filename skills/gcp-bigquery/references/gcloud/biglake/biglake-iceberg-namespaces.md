---
source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/iceberg/namespaces
---

# gcloud biglake iceberg namespaces

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud biglake iceberg namespaces create

```text
NAME
    gcloud biglake iceberg namespaces create - create a BigLake Iceberg REST
        namespace

SYNOPSIS
    gcloud biglake iceberg namespaces create (NAMESPACE : --catalog=CATALOG)
        [--properties=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a BigLake Iceberg REST namespace.

EXAMPLES
    To create a namespace in parent catalog my-catalog, run:

        $ gcloud biglake iceberg namespaces create my-namespace \
            --catalog=my-catalog

    To create a namespace in parent catalog my-catalog, with properties
    key1=value1,key2=value2, run:

        $ gcloud biglake iceberg namespaces create my-namespace \
            --catalog=my-catalog --properties=key1=value1,key2=value2

POSITIONAL ARGUMENTS
     Namespace resource - The Iceberg Namespace to create. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument namespace on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument namespace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The Iceberg Catalog for the resource.

          To set the catalog attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

FLAGS
     --properties=[KEY=VALUE,...]
        Properties associated with the namespace.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg namespaces create

        $ gcloud beta biglake iceberg namespaces create
```

### gcloud biglake iceberg namespaces delete

```text
NAME
    gcloud biglake iceberg namespaces delete - delete a BigLake Iceberg REST
        namespace

SYNOPSIS
    gcloud biglake iceberg namespaces delete (NAMESPACE : --catalog=CATALOG)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a BigLake Iceberg REST namespace.

EXAMPLES
    To delete a namespace in parent catalog my-catalog, run:

        $ gcloud biglake iceberg namespaces delete my-namespace \
            --catalog=my-catalog

POSITIONAL ARGUMENTS
     Namespace resource - The Iceberg Namespace to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument namespace on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument namespace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The Iceberg Catalog for the resource.

          To set the catalog attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg namespaces delete

        $ gcloud beta biglake iceberg namespaces delete
```

### gcloud biglake iceberg namespaces describe

```text
NAME
    gcloud biglake iceberg namespaces describe - describe a BigLake Iceberg
        REST namespace

SYNOPSIS
    gcloud biglake iceberg namespaces describe (NAMESPACE : --catalog=CATALOG)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a BigLake Iceberg REST namespace.

EXAMPLES
    To describe a namespace in parent catalog my-catalog, run:

        $ gcloud biglake iceberg namespaces describe my-namespace \
            --catalog=my-catalog

POSITIONAL ARGUMENTS
     Namespace resource - The Iceberg Namespace to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument namespace on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument namespace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The Iceberg Catalog for the resource.

          To set the catalog attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg namespaces describe

        $ gcloud beta biglake iceberg namespaces describe
```

### gcloud biglake iceberg namespaces get-iam-policy

```text
NAME
    gcloud biglake iceberg namespaces get-iam-policy - get the IAM policy for a
        BigLake Iceberg REST catalog namespace

SYNOPSIS
    gcloud biglake iceberg namespaces get-iam-policy
        (NAMESPACE : --catalog=CATALOG) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets the IAM policy for a BigLake Iceberg REST catalog namespace.

EXAMPLES
    To get the IAM policy for the catalog my-catalog and namespace my-namespace
    run:

        $ gcloud biglake iceberg namespaces get-iam-policy my-namespace \
            --catalog=my-catalog

POSITIONAL ARGUMENTS
     Namespace resource - The Iceberg Namespace to get the IAM policy for. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument namespace on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument namespace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The Iceberg Catalog for the resource.

          To set the catalog attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

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

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg namespaces get-iam-policy

        $ gcloud beta biglake iceberg namespaces get-iam-policy
```

### gcloud biglake iceberg namespaces list

```text
NAME
    gcloud biglake iceberg namespaces list - list BigLake Iceberg REST
        namespaces

SYNOPSIS
    gcloud biglake iceberg namespaces list --catalog=CATALOG
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List BigLake Iceberg REST namespaces.

EXAMPLES
    To list namespaces in parent catalog my-catalog, run:        $ gcloud biglake iceberg namespaces list --catalog=my-catalog

REQUIRED FLAGS
     Catalog resource - The Iceberg Catalog to list. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --catalog=CATALOG
          ID of the catalog or fully qualified identifier for the catalog.

          To set the catalog attribute:
          + provide the argument --catalog on the command line.

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

        $ gcloud alpha biglake iceberg namespaces list

        $ gcloud beta biglake iceberg namespaces list
```

### gcloud biglake iceberg namespaces set-iam-policy

```text
NAME
    gcloud biglake iceberg namespaces set-iam-policy - set the IAM policy for a
        BigLake Iceberg REST catalog namespace

SYNOPSIS
    gcloud biglake iceberg namespaces set-iam-policy
        (NAMESPACE : --catalog=CATALOG) POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for a BigLake Iceberg REST catalog namespace.

EXAMPLES
    To set the IAM policy for the catalog my-catalog and namespace my-namespace
    with the policy in policy.json run:

        $ gcloud biglake iceberg namespaces set-iam-policy my-namespace \
            policy.json --catalog=my-catalog

POSITIONAL ARGUMENTS
     Namespace resource - The Iceberg Namespace to set the IAM policy for. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument namespace on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument namespace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The Iceberg Catalog for the resource.

          To set the catalog attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

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

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg namespaces set-iam-policy

        $ gcloud beta biglake iceberg namespaces set-iam-policy
```

### gcloud biglake iceberg namespaces update

```text
NAME
    gcloud biglake iceberg namespaces update - update a BigLake Iceberg REST
        namespace

SYNOPSIS
    gcloud biglake iceberg namespaces update (NAMESPACE : --catalog=CATALOG)
        [--clear-properties] [--remove-properties=[KEY,...]]
        [--update-properties=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a BigLake Iceberg REST namespace.

EXAMPLES
    To clear all properties from a namespace in parent catalog my-catalog, run:

        $ gcloud biglake iceberg namespaces update my-namespace \
            --catalog=my-catalog --clear-properties

    To add or update properties in a namespace in parent catalog my-catalog,
    with properties key1=value1,key2=value2, run:

        $ gcloud biglake iceberg namespaces update my-namespace \
            --catalog=my-catalog --update-properties=key1=value1,key2=value2

    To remove properties key1,key2 from a namespace in parent catalog
    my-catalog, run:

        $ gcloud biglake iceberg namespaces update my-namespace \
            --catalog=my-catalog --remove-properties=key1,key2

POSITIONAL ARGUMENTS
     Namespace resource - The Iceberg Namespace to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument namespace on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument namespace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The Iceberg Catalog for the resource.

          To set the catalog attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

FLAGS
     --clear-properties
        Clear all properties from the namespace.

     --remove-properties=[KEY,...]
        List of properties to remove.

     --update-properties=[KEY=VALUE,...]
        List of properties to update or add.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg namespaces update

        $ gcloud beta biglake iceberg namespaces update
```

### gcloud beta biglake iceberg namespaces create

```text
NAME
    gcloud beta biglake iceberg namespaces create - create a BigLake Iceberg
        REST namespace

SYNOPSIS
    gcloud beta biglake iceberg namespaces create
        (NAMESPACE : --catalog=CATALOG) [--properties=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg namespaces delete

```text
NAME
    gcloud beta biglake iceberg namespaces delete - delete a BigLake Iceberg
        REST namespace

SYNOPSIS
    gcloud beta biglake iceberg namespaces delete
        (NAMESPACE : --catalog=CATALOG) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg namespaces describe

```text
NAME
    gcloud beta biglake iceberg namespaces describe - describe a BigLake
        Iceberg REST namespace

SYNOPSIS
    gcloud beta biglake iceberg namespaces describe
        (NAMESPACE : --catalog=CATALOG) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg namespaces get-iam-policy

```text
NAME
    gcloud beta biglake iceberg namespaces get-iam-policy - get the IAM policy
        for a BigLake Iceberg REST catalog namespace

SYNOPSIS
    gcloud beta biglake iceberg namespaces get-iam-policy
        (NAMESPACE : --catalog=CATALOG) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg namespaces list

```text
NAME
    gcloud beta biglake iceberg namespaces list - list BigLake Iceberg REST
        namespaces

SYNOPSIS
    gcloud beta biglake iceberg namespaces list --catalog=CATALOG
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg namespaces set-iam-policy

```text
NAME
    gcloud beta biglake iceberg namespaces set-iam-policy - set the IAM policy
        for a BigLake Iceberg REST catalog namespace

SYNOPSIS
    gcloud beta biglake iceberg namespaces set-iam-policy
        (NAMESPACE : --catalog=CATALOG) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg namespaces update

```text
NAME
    gcloud beta biglake iceberg namespaces update - update a BigLake Iceberg
        REST namespace

SYNOPSIS
    gcloud beta biglake iceberg namespaces update
        (NAMESPACE : --catalog=CATALOG) [--clear-properties]
        [--remove-properties=[KEY,...]] [--update-properties=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg namespaces create

```text
NAME
    gcloud alpha biglake iceberg namespaces create - create a BigLake Iceberg
        REST namespace

SYNOPSIS
    gcloud alpha biglake iceberg namespaces create
        (NAMESPACE : --catalog=CATALOG) [--properties=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg namespaces delete

```text
NAME
    gcloud alpha biglake iceberg namespaces delete - delete a BigLake Iceberg
        REST namespace

SYNOPSIS
    gcloud alpha biglake iceberg namespaces delete
        (NAMESPACE : --catalog=CATALOG) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg namespaces describe

```text
NAME
    gcloud alpha biglake iceberg namespaces describe - describe a BigLake
        Iceberg REST namespace

SYNOPSIS
    gcloud alpha biglake iceberg namespaces describe
        (NAMESPACE : --catalog=CATALOG) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg namespaces get-iam-policy

```text
NAME
    gcloud alpha biglake iceberg namespaces get-iam-policy - get the IAM policy
        for a BigLake Iceberg REST catalog namespace

SYNOPSIS
    gcloud alpha biglake iceberg namespaces get-iam-policy
        (NAMESPACE : --catalog=CATALOG) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg namespaces list

```text
NAME
    gcloud alpha biglake iceberg namespaces list - list BigLake Iceberg REST
        namespaces

SYNOPSIS
    gcloud alpha biglake iceberg namespaces list --catalog=CATALOG
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg namespaces set-iam-policy

```text
NAME
    gcloud alpha biglake iceberg namespaces set-iam-policy - set the IAM policy
        for a BigLake Iceberg REST catalog namespace

SYNOPSIS
    gcloud alpha biglake iceberg namespaces set-iam-policy
        (NAMESPACE : --catalog=CATALOG) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg namespaces update

```text
NAME
    gcloud alpha biglake iceberg namespaces update - update a BigLake Iceberg
        REST namespace

SYNOPSIS
    gcloud alpha biglake iceberg namespaces update
        (NAMESPACE : --catalog=CATALOG) [--clear-properties]
        [--remove-properties=[KEY,...]] [--update-properties=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/iceberg/namespaces (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
