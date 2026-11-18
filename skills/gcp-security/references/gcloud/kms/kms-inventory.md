---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/inventory
---

# gcloud kms inventory

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms inventory get-protected-resources-summary

```text
NAME
    gcloud kms inventory get-protected-resources-summary - gets the protected
        resources summary

SYNOPSIS
    gcloud kms inventory get-protected-resources-summary
        (--keyname=KEYNAME : --keyring=KEYRING --location=LOCATION)
        [--fallback-scope=FALLBACK_SCOPE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud kms inventory get-protected-resources-summary returns a summary of
    the resources a key is protecting.

    The summary includes how many projects contain protected resources, how
    many protected resources there are, what are the types of protected
    resources, and the count for each type of protected resource.

EXAMPLES
    To view the summary of protected resources for the key
    projects/test-prj/locations/us/keyRings/us-keyring/cryptoKeys/us-key, run:

        $ gcloud kms inventory get-protected-resources-summary \
            --keyname=projects/test-prj/locations/us/keyRings/us-keyring/\
        cryptoKeys/us-key

REQUIRED FLAGS
     Key resource - The KMS key resource. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --keyname on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       --keyname=KEYNAME
          ID of the key or fully qualified identifier for the key.

          To set the key attribute:
          + provide the argument --keyname on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --keyring=KEYRING
          The KMS keyring of the key.

          To set the keyring attribute:
          + provide the argument --keyname on the command line with a fully
            specified name;
          + provide the argument --keyring on the command line.

       --location=LOCATION
          The Google Cloud location for the key.

          To set the location attribute:
          + provide the argument --keyname on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

OPTIONAL FLAGS
     --fallback-scope=FALLBACK_SCOPE
        If permission is denied at the organization level, fall back to the
        project level scope. FALLBACK_SCOPE must be one of:
        FALLBACK_SCOPE_UNSPECIFIED, FALLBACK_SCOPE_PROJECT.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms inventory get-protected-resources-summary

        $ gcloud beta kms inventory get-protected-resources-summary
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud kms inventory get-protected-resources-summary \
    --keyname=projects/test-prj/locations/us/keyRings/us-keyring/cryptoKeys/us-key
```

### gcloud kms inventory list-keys

```text
NAME
    gcloud kms inventory list-keys - lists the keys in a project

SYNOPSIS
    gcloud kms inventory list-keys [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud kms inventory list-keys lists the keys in the specified project.

EXAMPLES
    To view the keys in the default project, run:

        $ gcloud kms inventory list-keys

    To view the keys in project jellyfish, run:

        $ gcloud kms inventory list-keys --project=jellyfish

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

        $ gcloud alpha kms inventory list-keys

        $ gcloud beta kms inventory list-keys
```

### gcloud kms inventory search-protected-resources

```text
NAME
    gcloud kms inventory search-protected-resources - searches the resources
        protected by a key

SYNOPSIS
    gcloud kms inventory search-protected-resources --scope=SEARCH_SCOPE
        (--keyname=KEYNAME : --keyring=KEYRING --location=LOCATION)
        [--resource-types=[RESOURCE_TYPES,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud kms inventory search-protected-resources returns a list of the
    resources a key is protecting within the specified organization or project.

EXAMPLES
    To view the protected resources for the key
    projects/test-prj/locations/us/keyRings/us-keyring/cryptoKeys/us-key within
    organization number 1234 run:

        $ gcloud kms inventory search-protected-resources \
            --keyname=projects/test-prj/locations/us/keyRings/us-keyring/\
        cryptoKeys/us-key --scope=organizations/1234

    To view the protected resources for the key
    projects/test-prj/locations/us/keyRings/us-keyring/cryptoKeys/us-key within
    project number 2345 run:

        $ gcloud kms inventory search-protected-resources \
            --keyname=projects/test-prj/locations/us/keyRings/us-keyring/\
        cryptoKeys/us-key --scope=projects/2345

REQUIRED FLAGS
     --scope=SEARCH_SCOPE
        The scope of the search, which can be an organization ID or a project
        ID or a project number.

     Key resource - The KMS key resource. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --keyname on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       --keyname=KEYNAME
          ID of the key or fully qualified identifier for the key.

          To set the key attribute:
          + provide the argument --keyname on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --keyring=KEYRING
          The KMS keyring of the key.

          To set the keyring attribute:
          + provide the argument --keyname on the command line with a fully
            specified name;
          + provide the argument --keyring on the command line.

       --location=LOCATION
          The Google Cloud location for the key.

          To set the location attribute:
          + provide the argument --keyname on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --resource-types=[RESOURCE_TYPES,...]
        A list of resource types that this request searches for. If empty, it
        will search all the trackable resource types
        (https://cloud.google.com/kms/docs/view-key-usage#tracked-resource-types).

        Regular expressions are also supported. For example:

        * compute.googleapis.com.* snapshots resources whose type starts with
          compute.googleapis.com.
        * .*Image snapshots resources whose type ends with Image.
        * .*Image.* snapshots resources whose type contains Image.

        See RE2 (https://github.com/google/re2/wiki/Syntax) for all supported
        regular expression syntax. If the regular expression does not match any
        supported resource type, an INVALID_ARGUMENT error will be returned.

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

        $ gcloud alpha kms inventory search-protected-resources

        $ gcloud beta kms inventory search-protected-resources
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud kms inventory search-protected-resources \
    --keyname=projects/test-prj/locations/us/keyRings/us-keyring/cryptoKeys/us-key \
    --scope=organizations/1234

gcloud kms inventory search-protected-resources \
    --keyname=projects/test-prj/locations/us/keyRings/us-keyring/cryptoKeys/us-key \
    --scope=projects/2345
```

### gcloud beta kms inventory get-protected-resources-summary

```text
NAME
    gcloud beta kms inventory get-protected-resources-summary - gets the
        protected resources summary

SYNOPSIS
    gcloud beta kms inventory get-protected-resources-summary
        (--keyname=KEYNAME : --keyring=KEYRING --location=LOCATION)
        [--fallback-scope=FALLBACK_SCOPE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms inventory list-keys

```text
NAME
    gcloud beta kms inventory list-keys - lists the keys in a project

SYNOPSIS
    gcloud beta kms inventory list-keys [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms inventory search-protected-resources

```text
NAME
    gcloud beta kms inventory search-protected-resources - searches the
        resources protected by a key

SYNOPSIS
    gcloud beta kms inventory search-protected-resources --scope=SEARCH_SCOPE
        (--keyname=KEYNAME : --keyring=KEYRING --location=LOCATION)
        [--resource-types=[RESOURCE_TYPES,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms inventory get-protected-resources-summary

```text
NAME
    gcloud alpha kms inventory get-protected-resources-summary - gets the
        protected resources summary

SYNOPSIS
    gcloud alpha kms inventory get-protected-resources-summary
        (--keyname=KEYNAME : --keyring=KEYRING --location=LOCATION)
        [--fallback-scope=FALLBACK_SCOPE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms inventory list-keys

```text
NAME
    gcloud alpha kms inventory list-keys - lists the keys in a project

SYNOPSIS
    gcloud alpha kms inventory list-keys [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms inventory search-protected-resources

```text
NAME
    gcloud alpha kms inventory search-protected-resources - searches the
        resources protected by a key

SYNOPSIS
    gcloud alpha kms inventory search-protected-resources --scope=SEARCH_SCOPE
        (--keyname=KEYNAME : --keyring=KEYRING --location=LOCATION)
        [--resource-types=[RESOURCE_TYPES,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/inventory (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
