---
source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/peerings
---

# gcloud active-directory peerings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud active-directory peerings create

```text
NAME
    gcloud active-directory peerings create - create a Managed Microsoft Active
        Directory domain peering

SYNOPSIS
    gcloud active-directory peerings create PEERING
        --authorized-network=AUTHORIZED_NETWORK --domain=DOMAIN [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Managed Microsoft AD domain peering with the given name using
    Google Cloud's Managed Service for Microsoft Active Directory.

    This command can fail for the following reasons:
      o A domain peering with the same name already exists.
      o The active account does not have permission to create AD domains
        peerings.
      o There is an overlap between the provided CIDR range and authorized
        network's CIDR.

EXAMPLES
    The following command creates an AD domain peering with the name
    my-peering, network my-network and domain
    projects/domain-project/locations/global/domains/domain.com

        $ gcloud active-directory peerings create my-peering \
            --domain=projects/domain-project/locations/global/domains/\
        domain.com \
            --authorized-network=projects/network-project/global/networks/\
        my-network

POSITIONAL ARGUMENTS
     Peering resource - Name of the managed Managed Microsoft AD domain peering
     you want to create. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument peering on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PEERING
          ID of the peering or fully qualified identifier for the peering.

          To set the peering attribute:
          + provide the argument peering on the command line.

REQUIRED FLAGS
     --authorized-network=AUTHORIZED_NETWORK
        Name of the Network that is authorized to communicate with Managed
        Microsoft AD domain. This is usually the full path name of the network
        in the peer project.

     --domain=DOMAIN
        Name of the managed Managed Microsoft AD domain you want to peer to.

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
    This command uses the managedidentities/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/managed-microsoft-ad/

NOTES
    These variants are also available:

        $ gcloud alpha active-directory peerings create

        $ gcloud beta active-directory peerings create
```

### gcloud active-directory peerings delete

```text
NAME
    gcloud active-directory peerings delete - delete a Managed Microsoft Active
        Directory domain peering

SYNOPSIS
    gcloud active-directory peerings delete PEERING [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Managed Microsoft Active Directory (AD) domain peering.

    This command can fail for the following reasons:
      o The active account does not have permission to access the given AD
        domain.
      o The domain peering is no longer existed.

EXAMPLES
    The following command deletes an AD domain peering with the name
    my-peering.

        $ gcloud active-directory peerings delete my-peering

POSITIONAL ARGUMENTS
     Peering resource - Name of the managed Managed Microsoft AD domain peering
     you want to delete. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument peering on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PEERING
          ID of the peering or fully qualified identifier for the peering.

          To set the peering attribute:
          + provide the argument peering on the command line.

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
    This command uses the managedidentities/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/managed-microsoft-ad/

NOTES
    These variants are also available:

        $ gcloud alpha active-directory peerings delete

        $ gcloud beta active-directory peerings delete
```

### gcloud active-directory peerings describe

```text
NAME
    gcloud active-directory peerings describe - describe a Managed Microsoft
        Active Directory domain peering

SYNOPSIS
    gcloud active-directory peerings describe PEERING [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show metadata for a Managed Microsoft AD domain peering.

    Displays all metadata associated with a Active Directory domain peering
    given a valid domain peering name.

    This command can fail for the following reasons:
      o The specified domain peering does not exist.
      o The active account does not have permission to access the given
        domain.

EXAMPLES
    The following command gets metadata for an AD domain peering with the name
    my-peering.

        $ gcloud active-directory peerings describe my-peering

POSITIONAL ARGUMENTS
     Peering resource - Name of the Managed Microsoft AD domain peering you
     want to describe. This represents a Cloud resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument peering on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PEERING
          ID of the peering or fully qualified identifier for the peering.

          To set the peering attribute:
          + provide the argument peering on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the managedidentities/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/managed-microsoft-ad/

NOTES
    These variants are also available:

        $ gcloud alpha active-directory peerings describe

        $ gcloud beta active-directory peerings describe
```

### gcloud active-directory peerings list

```text
NAME
    gcloud active-directory peerings list - list all Managed Microsoft Active
        Directory domain peerings

SYNOPSIS
    gcloud active-directory peerings list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Managed Microsoft AD domain peerings in the given project.

    Displays associated Active Directory domain peerings.

    This command can fail for the following reasons:
      o The active account does not have permission to access the given
        domain.

EXAMPLES
    The following command lists five AD domain peerings in the project.

        $ gcloud active-directory peerings list --limit=5

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
    This command uses the managedidentities/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/managed-microsoft-ad/

NOTES
    These variants are also available:

        $ gcloud alpha active-directory peerings list

        $ gcloud beta active-directory peerings list
```

### gcloud active-directory peerings update

```text
NAME
    gcloud active-directory peerings update - update a Managed Microsoft Active
        Directory domain peering

SYNOPSIS
    gcloud active-directory peerings update PEERING [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Managed Microsoft Active Directory (AD) domain peering.

    This command can fail for the following reasons:
      o The active account does not have permission to access the given AD
        domain.

EXAMPLES
    The following command updates an AD domain peering my-peering with the
    label l1 and l2

        $ gcloud active-directory peerings update my-peering \
            --update-labels=l1=1,l2=2

POSITIONAL ARGUMENTS
     Peering resource - Name of the managed Managed Microsoft AD domain you
     want to delete. This represents a Cloud resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument peering on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PEERING
          ID of the peering or fully qualified identifier for the peering.

          To set the peering attribute:
          + provide the argument peering on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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

              $ gcloud active-directory peerings update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud active-directory peerings update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the managedidentities/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/managed-microsoft-ad/

NOTES
    These variants are also available:

        $ gcloud alpha active-directory peerings update

        $ gcloud beta active-directory peerings update
```

### gcloud beta active-directory peerings create

```text
NAME
    gcloud beta active-directory peerings create - create a Managed Microsoft
        Active Directory domain peering

SYNOPSIS
    gcloud beta active-directory peerings create PEERING
        --authorized-network=AUTHORIZED_NETWORK --domain=DOMAIN [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta active-directory peerings delete

```text
NAME
    gcloud beta active-directory peerings delete - delete a Managed Microsoft
        Active Directory domain peering

SYNOPSIS
    gcloud beta active-directory peerings delete PEERING [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta active-directory peerings describe

```text
NAME
    gcloud beta active-directory peerings describe - describe a Managed
        Microsoft Active Directory domain peering

SYNOPSIS
    gcloud beta active-directory peerings describe PEERING
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta active-directory peerings list

```text
NAME
    gcloud beta active-directory peerings list - list all Managed Microsoft
        Active Directory domain peerings

SYNOPSIS
    gcloud beta active-directory peerings list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta active-directory peerings update

```text
NAME
    gcloud beta active-directory peerings update - update a Managed Microsoft
        Active Directory domain peering

SYNOPSIS
    gcloud beta active-directory peerings update PEERING [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory peerings create

```text
NAME
    gcloud alpha active-directory peerings create - create a Managed Microsoft
        Active Directory domain peering

SYNOPSIS
    gcloud alpha active-directory peerings create PEERING
        --authorized-network=AUTHORIZED_NETWORK --domain=DOMAIN [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory peerings delete

```text
NAME
    gcloud alpha active-directory peerings delete - delete a Managed Microsoft
        Active Directory domain peering

SYNOPSIS
    gcloud alpha active-directory peerings delete PEERING [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory peerings describe

```text
NAME
    gcloud alpha active-directory peerings describe - describe a Managed
        Microsoft Active Directory domain peering

SYNOPSIS
    gcloud alpha active-directory peerings describe PEERING
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory peerings list

```text
NAME
    gcloud alpha active-directory peerings list - list all Managed Microsoft
        Active Directory domain peerings

SYNOPSIS
    gcloud alpha active-directory peerings list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory peerings update

```text
NAME
    gcloud alpha active-directory peerings update - update a Managed Microsoft
        Active Directory domain peering

SYNOPSIS
    gcloud alpha active-directory peerings update PEERING [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/peerings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
