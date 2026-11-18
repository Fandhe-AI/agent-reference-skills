---
source: https://docs.cloud.google.com/sdk/gcloud/reference/certificate-manager/maps/entries
---

# gcloud certificate-manager maps entries

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud certificate-manager maps entries create

```text
NAME
    gcloud certificate-manager maps entries create - create a certificate map
        entry

SYNOPSIS
    gcloud certificate-manager maps entries create
        (ENTRY : --location=LOCATION --map=MAP)
        (--hostname=HOSTNAME | --set-primary) [--description=DESCRIPTION]
        [--async] [--certificates=[CERTIFICATES,...]]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a certificate map entry.

EXAMPLES
    To create a certificate map entry with name simple-entry, run:

        $ gcloud certificate-manager maps entries create simple-entry \
            --map=simple-map --certificates=simple-cert

POSITIONAL ARGUMENTS
     Certificate map entry resource - The certificate map entry to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument entry on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY
          ID of the certificate map entry or fully qualified identifier for the
          certificate map entry.

          To set the entry attribute:
          + provide the argument entry on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the certificate map entry.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

       --map=MAP
          The certificate map for the certificate map entry.

          To set the map attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --map on the command line.

REQUIRED FLAGS
     Arguments to configure matcher for the certificate map entry.

     Exactly one of these must be specified:

       --hostname=HOSTNAME
          A domain name (FQDN), which controls when list of certificates
          specified in the resource will be taken under consideration for
          certificate selection.

       --set-primary
          The certificate will be used as the default cert if no other
          certificate in the map matches on SNI.

COMMONLY USED FLAGS
     --description=DESCRIPTION
        Text description of a certificate map entry.

OTHER FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Certificate resource - The certificates to be attached to the entry. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --certificates on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --certificates on the command line with a fully
        specified name;
      * default value of location is [global].

     --certificates=[CERTIFICATES,...]
        IDs of the certificates or fully qualified identifiers for the
        certificates.

        To set the certificate attribute:
        * provide the argument --certificates on the command line.

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
    These variants are also available:

        $ gcloud alpha certificate-manager maps entries create

        $ gcloud beta certificate-manager maps entries create
```

### gcloud certificate-manager maps entries delete

```text
NAME
    gcloud certificate-manager maps entries delete - delete a certificate map
        entry

SYNOPSIS
    gcloud certificate-manager maps entries delete
        (ENTRY : --location=LOCATION --map=MAP) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a certificate map entry resource.

EXAMPLES
    To delete the certificate map entry with name simple-entry, run:

        $ gcloud certificate-manager maps entries delete simple-entry \
            --map=simple-map

POSITIONAL ARGUMENTS
     Certificate map entry resource - The certificate map entry to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument entry on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY
          ID of the certificate map entry or fully qualified identifier for the
          certificate map entry.

          To set the entry attribute:
          + provide the argument entry on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the certificate map entry.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

       --map=MAP
          The certificate map for the certificate map entry.

          To set the map attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --map on the command line.

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

        $ gcloud alpha certificate-manager maps entries delete

        $ gcloud beta certificate-manager maps entries delete
```

### gcloud certificate-manager maps entries describe

```text
NAME
    gcloud certificate-manager maps entries describe - describe an existing
        certificate map entry

SYNOPSIS
    gcloud certificate-manager maps entries describe
        (ENTRY : --location=LOCATION --map=MAP) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command fetches and prints information about an existing certificate
    map entry.

EXAMPLES
    To describe a certificate map entry with name simple-entry, run:

        $ gcloud certificate-manager maps entries describe simple-entry \
            --map=simple-map

POSITIONAL ARGUMENTS
     Certificate map entry resource - The certificate map entry to describe.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument entry on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY
          ID of the certificate map entry or fully qualified identifier for the
          certificate map entry.

          To set the entry attribute:
          + provide the argument entry on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the certificate map entry.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

       --map=MAP
          The certificate map for the certificate map entry.

          To set the map attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --map on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager maps entries describe

        $ gcloud beta certificate-manager maps entries describe
```

### gcloud certificate-manager maps entries list

```text
NAME
    gcloud certificate-manager maps entries list - list certificate map entries

SYNOPSIS
    gcloud certificate-manager maps entries list
        (--map=MAP : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Certificate Manager certificate map entries in the certificate map.

EXAMPLES
    To list all certificate map entries in the certificate map, run:

        $ gcloud certificate-manager maps entries list --map=simple-map

REQUIRED FLAGS
     Certificate map resource - The certificate map to list map entries for.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --map on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --map=MAP
          ID of the certificate map or fully qualified identifier for the
          certificate map.

          To set the map attribute:
          + provide the argument --map on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The Cloud location for the certificate map.

          To set the location attribute:
          + provide the argument --map on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

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

        $ gcloud alpha certificate-manager maps entries list

        $ gcloud beta certificate-manager maps entries list
```

### gcloud certificate-manager maps entries update

```text
NAME
    gcloud certificate-manager maps entries update - update a certificate map
        entry

SYNOPSIS
    gcloud certificate-manager maps entries update
        (ENTRY : --location=LOCATION --map=MAP) [--description=DESCRIPTION]
        [--async] [--certificates=[CERTIFICATES,...]]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command updates existing certificate map entry.

EXAMPLES
    To update a certificate map entry with name simple-entry, run:

        $ gcloud certificate-manager maps entries update simple-entry \
            --map="simple-map" --description="desc" \
            --update-labels="key=value" --certificates="simple-cert"

POSITIONAL ARGUMENTS
     Certificate map entry resource - The certificate map entry to update. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument entry on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY
          ID of the certificate map entry or fully qualified identifier for the
          certificate map entry.

          To set the entry attribute:
          + provide the argument entry on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the certificate map entry.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

       --map=MAP
          The certificate map for the certificate map entry.

          To set the map attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --map on the command line.

COMMONLY USED FLAGS
     --description=DESCRIPTION
        Text description of a certificate map entry.

OTHER FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Certificate resource - The certificates to be attached to the entry. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --certificates on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --certificates on the command line with a fully
        specified name;
      * default value of location is [global].

     --certificates=[CERTIFICATES,...]
        IDs of the certificates or fully qualified identifiers for the
        certificates.

        To set the certificate attribute:
        * provide the argument --certificates on the command line.

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

              $ gcloud certificate-manager maps entries update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud certificate-manager maps entries update --clear-labels \
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

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager maps entries update

        $ gcloud beta certificate-manager maps entries update
```

### gcloud beta certificate-manager maps entries create

```text
NAME
    gcloud beta certificate-manager maps entries create - create a certificate
        map entry

SYNOPSIS
    gcloud beta certificate-manager maps entries create
        (ENTRY : --location=LOCATION --map=MAP)
        (--hostname=HOSTNAME | --set-primary) [--description=DESCRIPTION]
        [--async] [--certificates=[CERTIFICATES,...]]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager maps entries delete

```text
NAME
    gcloud beta certificate-manager maps entries delete - delete a certificate
        map entry

SYNOPSIS
    gcloud beta certificate-manager maps entries delete
        (ENTRY : --location=LOCATION --map=MAP) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager maps entries describe

```text
NAME
    gcloud beta certificate-manager maps entries describe - describe an
        existing certificate map entry

SYNOPSIS
    gcloud beta certificate-manager maps entries describe
        (ENTRY : --location=LOCATION --map=MAP) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager maps entries list

```text
NAME
    gcloud beta certificate-manager maps entries list - list certificate map
        entries

SYNOPSIS
    gcloud beta certificate-manager maps entries list
        (--map=MAP : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager maps entries update

```text
NAME
    gcloud beta certificate-manager maps entries update - update a certificate
        map entry

SYNOPSIS
    gcloud beta certificate-manager maps entries update
        (ENTRY : --location=LOCATION --map=MAP) [--description=DESCRIPTION]
        [--async] [--certificates=[CERTIFICATES,...]]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager maps entries create

```text
NAME
    gcloud alpha certificate-manager maps entries create - create a certificate
        map entry

SYNOPSIS
    gcloud alpha certificate-manager maps entries create
        (ENTRY : --location=LOCATION --map=MAP)
        (--hostname=HOSTNAME | --set-primary) [--description=DESCRIPTION]
        [--async] [--certificates=[CERTIFICATES,...]]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager maps entries delete

```text
NAME
    gcloud alpha certificate-manager maps entries delete - delete a certificate
        map entry

SYNOPSIS
    gcloud alpha certificate-manager maps entries delete
        (ENTRY : --location=LOCATION --map=MAP) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager maps entries describe

```text
NAME
    gcloud alpha certificate-manager maps entries describe - describe an
        existing certificate map entry

SYNOPSIS
    gcloud alpha certificate-manager maps entries describe
        (ENTRY : --location=LOCATION --map=MAP) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager maps entries list

```text
NAME
    gcloud alpha certificate-manager maps entries list - list certificate map
        entries

SYNOPSIS
    gcloud alpha certificate-manager maps entries list
        (--map=MAP : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager maps entries update

```text
NAME
    gcloud alpha certificate-manager maps entries update - update a certificate
        map entry

SYNOPSIS
    gcloud alpha certificate-manager maps entries update
        (ENTRY : --location=LOCATION --map=MAP) [--description=DESCRIPTION]
        [--async] [--certificates=[CERTIFICATES,...]]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Incomplete example: the `gcloud certificate-manager maps entries create simple-entry` example omits `--hostname` and `--set-primary`, one of which the SYNOPSIS requires (gcloud 593.0.0: "Exactly one of (--hostname | --set-primary) must be specified."). Add one of them (see FLAGS on this page).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/certificate-manager/maps/entries (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
