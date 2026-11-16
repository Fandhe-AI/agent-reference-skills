---
source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/backups
---

# gcloud firestore backups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud firestore backups delete

```text
NAME
    gcloud firestore backups delete - deletes a Cloud Firestore backup

SYNOPSIS
    gcloud firestore backups delete --backup=BACKUP --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To delete cf9f748a-7980-4703-b1a1-d1ffff591db0 backup in us-east1.

        $ gcloud firestore backups delete --location=us-east1 \
          --backup=cf9f748a-7980-4703-b1a1-d1ffff591db0

REQUIRED FLAGS
     --backup=BACKUP
        The backup to operate on.

        For example, to operate on backup cf9f748a-7980-4703-b1a1-d1ffff591db0:

            $ gcloud firestore backups delete \
                --backup='cf9f748a-7980-4703-b1a1-d1ffff591db0'

     --location=LOCATION
        The location to operate on. Available locations are listed at
        https://cloud.google.com/firestore/docs/locations.

        For example, to operate on location us-east1:

            $ gcloud firestore backups delete --location='us-east1'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore backups delete

        $ gcloud beta firestore backups delete
```

### gcloud firestore backups describe

```text
NAME
    gcloud firestore backups describe - retrieves information about a Cloud
        Firestore backup

SYNOPSIS
    gcloud firestore backups describe --backup=BACKUP --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To retrieve information about the cf9f748a-7980-4703-b1a1-d1ffff591db0
    backup in us-east1.

        $ gcloud firestore backups describe --location=us-east1 \
          --backup=cf9f748a-7980-4703-b1a1-d1ffff591db0

REQUIRED FLAGS
     --backup=BACKUP
        The backup to operate on.

        For example, to operate on backup cf9f748a-7980-4703-b1a1-d1ffff591db0:

            $ gcloud firestore backups describe \
                --backup='cf9f748a-7980-4703-b1a1-d1ffff591db0'

     --location=LOCATION
        The location to operate on. Available locations are listed at
        https://cloud.google.com/firestore/docs/locations.

        For example, to operate on location us-east1:

            $ gcloud firestore backups describe --location='us-east1'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore backups describe

        $ gcloud beta firestore backups describe
```

### gcloud firestore backups list

```text
NAME
    gcloud firestore backups list - list backups available to Cloud Firestore

SYNOPSIS
    gcloud firestore backups list [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To list all backups in location us-east1.

        $ gcloud firestore backups list --location=us-east1 \
          --format="table(name, database, state)"

    To list all backups in all location.

        $ gcloud firestore backups list \
          --format="table(name, database, state)"

FLAGS
     --location=LOCATION
        The location to operate on. Available locations are listed at
        https://cloud.google.com/firestore/docs/locations.

        For example, to operate on location us-east1:

            $ gcloud firestore backups list --location='us-east1'

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

        $ gcloud alpha firestore backups list

        $ gcloud beta firestore backups list
```

### gcloud firestore backups schedules create

```text
NAME
    gcloud firestore backups schedules create - creates a Cloud Firestore
        backup schedule

SYNOPSIS
    gcloud firestore backups schedules create --database=DATABASE
        --retention=RETENTION
        (--recurrence=RECURRENCE : --day-of-week=DAY_OF_WEEK)
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To create a backup schedule with 7 days retention and daily recurrence
    under database testdb.

        $ gcloud firestore backups schedules create --database=testdb \
          --retention=7d --recurrence=daily

    To create a backup schedule with 7 days retention and weekly recurrence on
    Monday under database testdb.

        $ gcloud firestore backups schedules create --database=testdb \
          --retention=7d --recurrence=weekly --day-of-week=MON

REQUIRED FLAGS
     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore backups schedules create --database='foo'

     --retention=RETENTION
        The rention of the backup. At what relative time in the future,
        compared to the creation time of the backup should the backup be
        deleted, i.e. keep backups for 7 days.

        For example, to set retention as 7 days.

            $ gcloud firestore backups schedules create --retention=7d

     Recurrence settings of a backup schedule.

     This must be specified.

       --recurrence=RECURRENCE
          The recurrence settings of a backup schedule.

          Currently only daily and weekly backup schedules are supported.

          When a weekly backup schedule is created, day-of-week is needed.

          For example, to create a weekly backup schedule which creates backups
          on Monday.

              $ gcloud firestore backups schedules create --recurrence=weekly \
                  --day-of-week=MON

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --day-of-week=DAY_OF_WEEK
          The day of week (UTC time zone) of when backups are created.

              The available values are: `MON`, `TUE`, `WED`, `THU`, `FRI`, `SAT`,`SUN`.
              Values are case insensitive.

              This is required when creating a weekly backup schedule.

          DAY_OF_WEEK must be one of: SUN, MON, TUE, WED, THU, FRI, SAT.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore backups schedules create

        $ gcloud beta firestore backups schedules create
```

### gcloud firestore backups schedules delete

```text
NAME
    gcloud firestore backups schedules delete - deletes a Cloud Firestore
        backup schedule

SYNOPSIS
    gcloud firestore backups schedules delete --backup-schedule=BACKUP_SCHEDULE
        --database=DATABASE [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To delete backup schedule 'cf9f748a-7980-4703-b1a1-d1ffff591db0' under
    database testdb.

        $ gcloud firestore backups schedules delete --database='testdb' \
          --backup-schedule='cf9f748a-7980-4703-b1a1-d1ffff591db0'

REQUIRED FLAGS
     --backup-schedule=BACKUP_SCHEDULE
        The backup schedule to operate on.

        For example, to operate on backup schedule
        091a49a0-223f-4c98-8c69-a284abbdb26b:

            $ gcloud firestore backups schedules delete \
                --backup-schedule='091a49a0-223f-4c98-8c69-a284abbdb26b'

     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore backups schedules delete --database='foo'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore backups schedules delete

        $ gcloud beta firestore backups schedules delete
```

### gcloud firestore backups schedules describe

```text
NAME
    gcloud firestore backups schedules describe - describes a Cloud Firestore
        backup schedule

SYNOPSIS
    gcloud firestore backups schedules describe
        --backup-schedule=BACKUP_SCHEDULE --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To describe backup schedule 'cf9f748a-7980-4703-b1a1-d1ffff591db0' under
    database testdb.

        $ gcloud firestore backups schedules describe --database='testdb' \
          --backup-schedule='cf9f748a-7980-4703-b1a1-d1ffff591db0'

REQUIRED FLAGS
     --backup-schedule=BACKUP_SCHEDULE
        The backup schedule to operate on.

        For example, to operate on backup schedule
        091a49a0-223f-4c98-8c69-a284abbdb26b:

            $ gcloud firestore backups schedules describe \
                --backup-schedule='091a49a0-223f-4c98-8c69-a284abbdb26b'

     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore backups schedules describe --database='foo'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore backups schedules describe

        $ gcloud beta firestore backups schedules describe
```

### gcloud firestore backups schedules list

```text
NAME
    gcloud firestore backups schedules list - lists backup schedules under a
        Cloud Firestore database

SYNOPSIS
    gcloud firestore backups schedules list --database=DATABASE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To list all backup schedules under database testdb.

        $ gcloud firestore backups schedules list --database='testdb'

REQUIRED FLAGS
     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore backups schedules list --database='foo'

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

        $ gcloud alpha firestore backups schedules list

        $ gcloud beta firestore backups schedules list
```

### gcloud firestore backups schedules update

```text
NAME
    gcloud firestore backups schedules update - updates a Cloud Firestore
        backup schedule

SYNOPSIS
    gcloud firestore backups schedules update --backup-schedule=BACKUP_SCHEDULE
        --database=DATABASE [--retention=RETENTION] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To update backup schedule 'cf9f748a-7980-4703-b1a1-d1ffff591db0' under
    database testdb to 7 days retention.

        $ gcloud firestore backups schedules update --database='testdb' \
          --backup-schedule='cf9f748a-7980-4703-b1a1-d1ffff591db0' \
          --retention='7d'

REQUIRED FLAGS
     --backup-schedule=BACKUP_SCHEDULE
        The backup schedule to operate on.

        For example, to operate on backup schedule
        091a49a0-223f-4c98-8c69-a284abbdb26b:

            $ gcloud firestore backups schedules update \
                --backup-schedule='091a49a0-223f-4c98-8c69-a284abbdb26b'

     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore backups schedules update --database='foo'

OPTIONAL FLAGS
     --retention=RETENTION
        The rention of the backup. At what relative time in the future,
        compared to the creation time of the backup should the backup be
        deleted, i.e. keep backups for 7 days.

        For example, to set retention as 7 days.

            $ gcloud firestore backups schedules update --retention=7d

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore backups schedules update

        $ gcloud beta firestore backups schedules update
```

### gcloud beta firestore backups delete

```text
NAME
    gcloud beta firestore backups delete - deletes a Cloud Firestore backup

SYNOPSIS
    gcloud beta firestore backups delete --backup=BACKUP --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore backups describe

```text
NAME
    gcloud beta firestore backups describe - retrieves information about a
        Cloud Firestore backup

SYNOPSIS
    gcloud beta firestore backups describe --backup=BACKUP --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore backups list

```text
NAME
    gcloud beta firestore backups list - list backups available to Cloud
        Firestore

SYNOPSIS
    gcloud beta firestore backups list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore backups schedules create

```text
NAME
    gcloud beta firestore backups schedules create - creates a Cloud Firestore
        backup schedule

SYNOPSIS
    gcloud beta firestore backups schedules create --database=DATABASE
        --retention=RETENTION
        (--recurrence=RECURRENCE : --day-of-week=DAY_OF_WEEK)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore backups schedules delete

```text
NAME
    gcloud beta firestore backups schedules delete - deletes a Cloud Firestore
        backup schedule

SYNOPSIS
    gcloud beta firestore backups schedules delete
        --backup-schedule=BACKUP_SCHEDULE --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore backups schedules describe

```text
NAME
    gcloud beta firestore backups schedules describe - describes a Cloud
        Firestore backup schedule

SYNOPSIS
    gcloud beta firestore backups schedules describe
        --backup-schedule=BACKUP_SCHEDULE --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore backups schedules list

```text
NAME
    gcloud beta firestore backups schedules list - lists backup schedules under
        a Cloud Firestore database

SYNOPSIS
    gcloud beta firestore backups schedules list --database=DATABASE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore backups schedules update

```text
NAME
    gcloud beta firestore backups schedules update - updates a Cloud Firestore
        backup schedule

SYNOPSIS
    gcloud beta firestore backups schedules update
        --backup-schedule=BACKUP_SCHEDULE --database=DATABASE
        [--retention=RETENTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore backups delete

```text
NAME
    gcloud alpha firestore backups delete - deletes a Cloud Firestore backup

SYNOPSIS
    gcloud alpha firestore backups delete --backup=BACKUP --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore backups describe

```text
NAME
    gcloud alpha firestore backups describe - retrieves information about a
        Cloud Firestore backup

SYNOPSIS
    gcloud alpha firestore backups describe --backup=BACKUP --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore backups list

```text
NAME
    gcloud alpha firestore backups list - list backups available to Cloud
        Firestore

SYNOPSIS
    gcloud alpha firestore backups list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore backups schedules create

```text
NAME
    gcloud alpha firestore backups schedules create - creates a Cloud Firestore
        backup schedule

SYNOPSIS
    gcloud alpha firestore backups schedules create --database=DATABASE
        --retention=RETENTION
        (--recurrence=RECURRENCE : --day-of-week=DAY_OF_WEEK)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore backups schedules delete

```text
NAME
    gcloud alpha firestore backups schedules delete - deletes a Cloud Firestore
        backup schedule

SYNOPSIS
    gcloud alpha firestore backups schedules delete
        --backup-schedule=BACKUP_SCHEDULE --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore backups schedules describe

```text
NAME
    gcloud alpha firestore backups schedules describe - describes a Cloud
        Firestore backup schedule

SYNOPSIS
    gcloud alpha firestore backups schedules describe
        --backup-schedule=BACKUP_SCHEDULE --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore backups schedules list

```text
NAME
    gcloud alpha firestore backups schedules list - lists backup schedules
        under a Cloud Firestore database

SYNOPSIS
    gcloud alpha firestore backups schedules list --database=DATABASE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore backups schedules update

```text
NAME
    gcloud alpha firestore backups schedules update - updates a Cloud Firestore
        backup schedule

SYNOPSIS
    gcloud alpha firestore backups schedules update
        --backup-schedule=BACKUP_SCHEDULE --database=DATABASE
        [--retention=RETENTION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/backups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
