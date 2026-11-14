---
source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/backups
---

# gcloud active-directory domains backups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud active-directory domains backups create

```text
NAME
    gcloud active-directory domains backups create - create a Managed Microsoft
        AD domain backup

SYNOPSIS
    gcloud active-directory domains backups create (BACKUP : --domain=DOMAIN)
        [--async] [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Managed Microsoft AD domain backup with the specified name
    using Google Cloud's Managed Service for Microsoft Active Directory.

    This command can fail for the following reasons:
      o The specified domain doesn't exist.
      o The specified domain is being created.
      o A backup already exists with the same target domain name.
      o The active account doesn't have permission to access the specified
        domain.
      o The active account doesn't have permission to create AD domain
        backups.

EXAMPLES
    To create an AD domain backup named my-backup under domain my-domain.com,
    run:

        $ gcloud active-directory domains backups create my-backup \
            --domain=my-domain.com --project=my-proj --async

POSITIONAL ARGUMENTS
     Backup resource - Name of the Managed Microsoft AD domain backup you want
     to create. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --domain=DOMAIN
          The fully-qualified domain name of the Microsoft Active Directory
          domain.

          To set the domain attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --domain on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

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

        $ gcloud alpha active-directory domains backups create

        $ gcloud beta active-directory domains backups create
```

### gcloud active-directory domains backups delete

```text
NAME
    gcloud active-directory domains backups delete - delete a Managed Microsoft
        AD domain backup

SYNOPSIS
    gcloud active-directory domains backups delete (BACKUP : --domain=DOMAIN)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Managed Microsoft AD domain backup with the specified name using
    Google Cloud's Managed Service for Microsoft Active Directory.

    This command can fail for the following reasons:
      o The specified backup doesn't exist.
      o The active account doesn't have permission to access the specified
        domain.
      o The active account doesn't have permission to access the specified AD
        domain backup.

EXAMPLES
    To delete an AD domain backup my-backup under domain        `projects/my-proj/locations/global/domains/my-domain.com`, run:

        $ gcloud active-directory domains backups delete \
            projects/my-proj/locations/global/domains/my-domain.com/\
        backups/my-backup --async

POSITIONAL ARGUMENTS
     Backup resource - Name of the Managed Microsoft AD domain backup you want
     to delete. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --domain=DOMAIN
          The fully-qualified domain name of the Microsoft Active Directory
          domain.

          To set the domain attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --domain on the command line.

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

        $ gcloud alpha active-directory domains backups delete

        $ gcloud beta active-directory domains backups delete
```

### gcloud active-directory domains backups describe

```text
NAME
    gcloud active-directory domains backups describe - describe a Managed
        Microsoft AD domain backup

SYNOPSIS
    gcloud active-directory domains backups describe (BACKUP : --domain=DOMAIN)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show metadata for a Managed Microsoft AD domain backup.

    Displays all metadata associated with an Active Directory domain backup
    when provided with a valid domain backup name.

    This command can fail for the following reasons:
      o The specified domain backup doesn't exist.
      o The active account doesn't have permission to access the specified
        domain.

EXAMPLES
    To display all metadata associated with an AD domain backup with the name
    my-backup under the domain my-domain in project my-project, run:

        $ gcloud active-directory domains backups describe \
            projects/my-proj/locations/global/domains/my-domain.com/\
        backups/my-backup

POSITIONAL ARGUMENTS
     Backup resource - Name of the Managed Microsoft AD domain backup you want
     to describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --domain=DOMAIN
          The fully-qualified domain name of the Microsoft Active Directory
          domain.

          To set the domain attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --domain on the command line.

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

        $ gcloud alpha active-directory domains backups describe

        $ gcloud beta active-directory domains backups describe
```

### gcloud active-directory domains backups list

```text
NAME
    gcloud active-directory domains backups list - list all Managed Microsoft
        AD domain backups

SYNOPSIS
    gcloud active-directory domains backups list --domain=DOMAIN
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Managed Microsoft AD domain backups in the specified Managed
    Microsoft AD domain.

    Displays associated Active Directory domain backups.

    This command can fail for the following reasons:
      o The active account doesn't have permission to access the specified
        domain.

EXAMPLES
    To list all AD domain backups in the project my-project under domain
    my-domain.com, run:

        $ gcloud active-directory domains backups list \
            --project=my-project --domain=my-domain.com --limit=5

REQUIRED FLAGS
     Domain resource - Name of the domain for which you want to list all
     associated Managed Microsoft AD domain backups. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --domain on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --domain=DOMAIN
          ID of the domain or fully qualified identifier for the domain.

          To set the domain attribute:
          + provide the argument --domain on the command line.

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

        $ gcloud alpha active-directory domains backups list

        $ gcloud beta active-directory domains backups list
```

### gcloud active-directory domains backups update

```text
NAME
    gcloud active-directory domains backups update - update a Managed Microsoft
        AD domain backup

SYNOPSIS
    gcloud active-directory domains backups update (BACKUP : --domain=DOMAIN)
        [--async] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Managed Microsoft AD domain backup.
      o The specified backup doesn't exist.
      o The active account doesn't have permission to access the specified
        domain.
      o The active account doesn't have permission to access the specified
        domain backup.

EXAMPLES
    To update an AD domain backup my-backup under domain        `projects/my-proj/locations/global/domains/my-domain.com` with the labels `l1` and `l2`, run:

        $ gcloud active-directory domains backups update \
            projects/my-proj/locations/global/domains/my-domain.com/\
        backups/my-backup --update-labels=l1=1,l2=2

POSITIONAL ARGUMENTS
     Backup resource - Name of the Managed Microsoft AD domain backup you want
     to update. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --domain=DOMAIN
          The fully-qualified domain name of the Microsoft Active Directory
          domain.

          To set the domain attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --domain on the command line.

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

              $ gcloud active-directory domains backups update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud active-directory domains backups update --clear-labels \
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

        $ gcloud alpha active-directory domains backups update

        $ gcloud beta active-directory domains backups update
```

### gcloud beta active-directory domains backups create

```text
NAME
    gcloud beta active-directory domains backups create - create a Managed
        Microsoft AD domain backup

SYNOPSIS
    gcloud beta active-directory domains backups create
        (BACKUP : --domain=DOMAIN) [--async] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta active-directory domains backups delete

```text
NAME
    gcloud beta active-directory domains backups delete - delete a Managed
        Microsoft AD domain backup

SYNOPSIS
    gcloud beta active-directory domains backups delete
        (BACKUP : --domain=DOMAIN) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta active-directory domains backups describe

```text
NAME
    gcloud beta active-directory domains backups describe - describe a Managed
        Microsoft AD domain backup

SYNOPSIS
    gcloud beta active-directory domains backups describe
        (BACKUP : --domain=DOMAIN) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta active-directory domains backups list

```text
NAME
    gcloud beta active-directory domains backups list - list all Managed
        Microsoft AD domain backups

SYNOPSIS
    gcloud beta active-directory domains backups list --domain=DOMAIN
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta active-directory domains backups update

```text
NAME
    gcloud beta active-directory domains backups update - update a Managed
        Microsoft AD domain backup

SYNOPSIS
    gcloud beta active-directory domains backups update
        (BACKUP : --domain=DOMAIN) [--async] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains backups create

```text
NAME
    gcloud alpha active-directory domains backups create - create a Managed
        Microsoft AD domain backup

SYNOPSIS
    gcloud alpha active-directory domains backups create
        (BACKUP : --domain=DOMAIN) [--async] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains backups delete

```text
NAME
    gcloud alpha active-directory domains backups delete - delete a Managed
        Microsoft AD domain backup

SYNOPSIS
    gcloud alpha active-directory domains backups delete
        (BACKUP : --domain=DOMAIN) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains backups describe

```text
NAME
    gcloud alpha active-directory domains backups describe - describe a Managed
        Microsoft AD domain backup

SYNOPSIS
    gcloud alpha active-directory domains backups describe
        (BACKUP : --domain=DOMAIN) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains backups list

```text
NAME
    gcloud alpha active-directory domains backups list - list all Managed
        Microsoft AD domain backups

SYNOPSIS
    gcloud alpha active-directory domains backups list --domain=DOMAIN
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains backups update

```text
NAME
    gcloud alpha active-directory domains backups update - update a Managed
        Microsoft AD domain backup

SYNOPSIS
    gcloud alpha active-directory domains backups update
        (BACKUP : --domain=DOMAIN) [--async] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/backups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
