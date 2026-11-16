---
source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/objects
---

# gcloud database-migration objects

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud database-migration objects list

```text
NAME
    gcloud database-migration objects list - list a DMS migration job objects

SYNOPSIS
    gcloud database-migration objects list
        (--migration-job=MIGRATION_JOB : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List migration job objects.

EXAMPLES
    To list all objects in a migration job and location 'us-central1', run:

        $ gcloud database-migration objects list --migration-job=mj \
          --region=us-central1

REQUIRED FLAGS
     Migration job resource - The migration job to list migration job objects.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --migration-job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --migration-job=MIGRATION_JOB
          ID of the migration_job or fully qualified identifier for the
          migration_job.

          To set the migration_job attribute:
          + provide the argument --migration-job on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --region=REGION
          The Cloud region for the migration_job.

          To set the region attribute:
          + provide the argument --migration-job on the command line with a
            fully specified name;
          + provide the argument --region on the command line.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

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
    This command uses the database-migration/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/database-migration/

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.
```

### gcloud database-migration objects lookup

```text
NAME
    gcloud database-migration objects lookup - lookup a DMS migration job
        object

SYNOPSIS
    gcloud database-migration objects lookup
        (--database=DATABASE --schema=SCHEMA --table=TABLE)
        (--migration-job=MIGRATION_JOB : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [--type=TYPE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lookup a migration job object by its source object identifier (e.g.
    database)

EXAMPLES
    To lookup an existing migration job object:

        $ gcloud database-migration objects lookup --migration-job=my-job \
          --location=us-central1 --database=my-database

REQUIRED FLAGS
     The source object identifier.

     At least one of these must be specified:

       --database=DATABASE
          The name of the database to lookup.

       --schema=SCHEMA
          The name of the schema to lookup.

       --table=TABLE
          The name of the table to lookup.

     Migration job resource - The migration job to list migration job objects.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --migration-job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --migration-job=MIGRATION_JOB
          ID of the migration_job or fully qualified identifier for the
          migration_job.

          To set the migration_job attribute:
          + provide the argument --migration-job on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --region=REGION
          The Cloud region for the migration_job.

          To set the region attribute:
          + provide the argument --migration-job on the command line with a
            fully specified name;
          + provide the argument --region on the command line.

OPTIONAL FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     --type=TYPE
        The type of the object to lookup. If not provided, the default is
        DATABASE. TYPE must be one of: DATABASE, SCHEMA, TABLE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud database-migration objects lookup \
    --migration-job=my-job \
    --region=us-central1 \
    --database=my-database
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example passes `--location=us-central1`, but the SYNOPSIS of this command takes the region with `--region` and has no `--location` flag (gcloud 593.0.0: "unrecognized arguments: --location=us-central1"); the runnable form uses `--region=us-central1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/objects (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
