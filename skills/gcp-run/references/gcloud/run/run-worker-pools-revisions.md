---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/worker-pools/revisions
---

# gcloud run worker-pools revisions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud run worker-pools revisions delete

```text
NAME
    gcloud run worker-pools revisions delete - delete a worker pool revision

SYNOPSIS
    gcloud run worker-pools revisions delete
        (WORKER_POOL_REVISION : --region=REGION --worker-pool=WORKER_POOL)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a worker pool revision.

EXAMPLES
    To delete a revision rev1 of a worker pool worker1 in us-central1:

        $ gcloud run worker-pools revisions delete rev1 \
          --region=us-central1 --worker-pool=worker1

POSITIONAL ARGUMENTS
     WorkerPoolRevision resource - Worker pool revision to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument WORKER_POOL_REVISION on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WORKER_POOL_REVISION
          ID of the WorkerPoolRevision or fully qualified identifier for the
          WorkerPoolRevision.

          To set the revision attribute:
          + provide the argument WORKER_POOL_REVISION on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud region for the WorkerPoolRevision. Overrides the default
          run/region property value for this command invocation.

          To set the region attribute:
          + provide the argument WORKER_POOL_REVISION on the command line
            with a fully specified name;
          + provide the argument --region on the command line;
          + set the property run/region;
          + specify the region from an interactive prompt.

       --worker-pool=WORKER_POOL
          WorkerPool for the WorkerPoolRevision.

          To set the worker-pool attribute:
          + provide the argument WORKER_POOL_REVISION on the command line
            with a fully specified name;
          + provide the argument --worker-pool on the command line;
          + specify the workerpool name from an interactive prompt.

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

        $ gcloud alpha run worker-pools revisions delete

        $ gcloud beta run worker-pools revisions delete
```

### gcloud run worker-pools revisions describe

```text
NAME
    gcloud run worker-pools revisions describe - obtain details about a given
        worker pool revision

SYNOPSIS
    gcloud run worker-pools revisions describe WORKER_POOL_REVISION
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Obtain details about a given worker pool revision.

EXAMPLES
    To describe a revision rev.1 in us-central1:

        $ gcloud run worker-pools revisions describe rev.1 \
          --region=us-central1

POSITIONAL ARGUMENTS
     Revision resource - Worker pool revision to describe. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument WORKER_POOL_REVISION on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WORKER_POOL_REVISION
          ID of the revision or fully qualified identifier for the revision.

          To set the revision attribute:
          + provide the argument WORKER_POOL_REVISION on the command line.

FLAGS
     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run worker-pools revisions describe

        $ gcloud beta run worker-pools revisions describe
```

### gcloud run worker-pools revisions list

```text
NAME
    gcloud run worker-pools revisions list - list available worker pool
        revisions

SYNOPSIS
    gcloud run worker-pools revisions list [--region=REGION]
        [--worker-pool=WORKER_POOL] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List available worker pool revisions.

EXAMPLES
    To list all revisions in a worker pool foo:

        $ gcloud run worker-pools revisions list --worker-pool=foo

FLAGS
     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

     --worker-pool=WORKER_POOL
        Limit matched revisions to the given worker.

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

        $ gcloud alpha run worker-pools revisions list

        $ gcloud beta run worker-pools revisions list
```

### gcloud beta run worker-pools revisions delete

```text
NAME
    gcloud beta run worker-pools revisions delete - delete a worker pool
        revision

SYNOPSIS
    gcloud beta run worker-pools revisions delete
        (WORKER_POOL_REVISION : --region=REGION --worker-pool=WORKER_POOL)
        [--async] [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run worker-pools revisions describe

```text
NAME
    gcloud beta run worker-pools revisions describe - obtain details about a
        given worker pool revision

SYNOPSIS
    gcloud beta run worker-pools revisions describe WORKER_POOL_REVISION
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run worker-pools revisions list

```text
NAME
    gcloud beta run worker-pools revisions list - list available worker pool
        revisions

SYNOPSIS
    gcloud beta run worker-pools revisions list [--endpoint-mode=ENDPOINT_MODE]
        [--region=REGION] [--worker-pool=WORKER_POOL] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run worker-pools revisions delete

```text
NAME
    gcloud alpha run worker-pools revisions delete - delete a worker pool
        revision

SYNOPSIS
    gcloud alpha run worker-pools revisions delete
        (WORKER_POOL_REVISION : --region=REGION --worker-pool=WORKER_POOL)
        [--async] [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run worker-pools revisions describe

```text
NAME
    gcloud alpha run worker-pools revisions describe - obtain details about a
        given worker pool revision

SYNOPSIS
    gcloud alpha run worker-pools revisions describe WORKER_POOL_REVISION
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run worker-pools revisions list

```text
NAME
    gcloud alpha run worker-pools revisions list - list available worker pool
        revisions

SYNOPSIS
    gcloud alpha run worker-pools revisions list
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [--worker-pool=WORKER_POOL] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run worker-pools revisions logs read

```text
NAME
    gcloud alpha run worker-pools revisions logs read - read logs for a Cloud
        Run worker pool revision

SYNOPSIS
    gcloud alpha run worker-pools revisions logs read REVISION
        [--freshness=FRESHNESS; default="1d"] [--log-filter=LOG_FILTER]
        [--order=ORDER; default="desc"] [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run worker-pools revisions logs tail

```text
NAME
    gcloud alpha run worker-pools revisions logs tail - tail logs for a Cloud
        Run worker pool revision

SYNOPSIS
    gcloud alpha run worker-pools revisions logs tail REVISION
        [--log-filter=LOG_FILTER] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/worker-pools/revisions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
