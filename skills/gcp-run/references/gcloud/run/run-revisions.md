---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/revisions
---

# gcloud run revisions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud run revisions delete

```text
NAME
    gcloud run revisions delete - delete a revision

SYNOPSIS
    gcloud run revisions delete (REVISION : --namespace=NAMESPACE)
        [--[no-]async] [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a revision.

EXAMPLES
    To delete a revision:

        $ gcloud run revisions delete <revision-name>

POSITIONAL ARGUMENTS
     Revision resource - Revision to delete. The arguments in this group can be
     used to specify the attributes of this resource.

     This must be specified.

       REVISION
          ID of the revision or fully qualified identifier for the revision.

          To set the revision attribute:
          + provide the argument REVISION on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --namespace=NAMESPACE
          Specific to Cloud Run for Anthos: Kubernetes namespace for the
          revision.

          To set the namespace attribute:
          + provide the argument REVISION on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line;
          + set the property run/namespace;
          + For Cloud Run on Kubernetes Engine, defaults to "default".
            Otherwise, defaults to project ID.;
          + provide the argument project on the command line;
          + set the property core/project.

FLAGS
     --[no-]async
        Return immediately, without waiting for the operation in progress to
        complete. Defaults to --no-async. Use --async to enable and --no-async
        to disable.

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

        $ gcloud alpha run revisions delete

        $ gcloud beta run revisions delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud run revisions delete REVISION_NAME
```

### gcloud run revisions describe

```text
NAME
    gcloud run revisions describe - obtain details about revisions

SYNOPSIS
    gcloud run revisions describe (REVISION : --namespace=NAMESPACE)
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Obtain details about revisions.

EXAMPLES
    To describe a revision my-service-00001-abc`in us-central1:

        $ gcloud run revisions describe --region=us-central1 \
          my-service-00001-abc

POSITIONAL ARGUMENTS
     Revision resource - Revision to describe. The arguments in this group can
     be used to specify the attributes of this resource.

     This must be specified.

       REVISION
          ID of the revision or fully qualified identifier for the revision.

          To set the revision attribute:
          + provide the argument REVISION on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --namespace=NAMESPACE
          Specific to Cloud Run for Anthos: Kubernetes namespace for the
          revision.

          To set the namespace attribute:
          + provide the argument REVISION on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line;
          + set the property run/namespace;
          + For Cloud Run on Kubernetes Engine, defaults to "default".
            Otherwise, defaults to project ID.;
          + provide the argument project on the command line;
          + set the property core/project.

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

        $ gcloud alpha run revisions describe

        $ gcloud beta run revisions describe
```

### gcloud run revisions list

```text
NAME
    gcloud run revisions list - list available revisions

SYNOPSIS
    gcloud run revisions list [--region=REGION] [--service=SERVICE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List available revisions.

EXAMPLES
    To list all revisions for the provided service:

        $ gcloud run revisions list --service=foo

FLAGS
     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

     --service=SERVICE
        Limit matched revisions to the given service.

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

        $ gcloud alpha run revisions list

        $ gcloud beta run revisions list
```

### gcloud beta run revisions delete

```text
NAME
    gcloud beta run revisions delete - delete a revision

SYNOPSIS
    gcloud beta run revisions delete (REVISION : --namespace=NAMESPACE)
        [--[no-]async] [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run revisions describe

```text
NAME
    gcloud beta run revisions describe - obtain details about revisions

SYNOPSIS
    gcloud beta run revisions describe (REVISION : --namespace=NAMESPACE)
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run revisions list

```text
NAME
    gcloud beta run revisions list - list available revisions

SYNOPSIS
    gcloud beta run revisions list [--endpoint-mode=ENDPOINT_MODE]
        [--region=REGION] [--service=SERVICE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run revisions logs read

```text
NAME
    gcloud beta run revisions logs read - read logs for a Cloud Run revision

SYNOPSIS
    gcloud beta run revisions logs read REVISION
        [--freshness=FRESHNESS; default="1d"] [--log-filter=LOG_FILTER]
        [--order=ORDER; default="desc"] [--region=REGION] [--limit=LIMIT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run revisions logs tail

```text
NAME
    gcloud beta run revisions logs tail - tail logs for a Cloud Run revision

SYNOPSIS
    gcloud beta run revisions logs tail REVISION [--log-filter=LOG_FILTER]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run revisions delete

```text
NAME
    gcloud alpha run revisions delete - delete a revision

SYNOPSIS
    gcloud alpha run revisions delete (REVISION : --namespace=NAMESPACE)
        [--[no-]async] [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run revisions describe

```text
NAME
    gcloud alpha run revisions describe - obtain details about revisions

SYNOPSIS
    gcloud alpha run revisions describe (REVISION : --namespace=NAMESPACE)
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run revisions list

```text
NAME
    gcloud alpha run revisions list - list available revisions

SYNOPSIS
    gcloud alpha run revisions list [--endpoint-mode=ENDPOINT_MODE]
        [--region=REGION] [--service=SERVICE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run revisions logs read

```text
NAME
    gcloud alpha run revisions logs read - read logs for a Cloud Run revision

SYNOPSIS
    gcloud alpha run revisions logs read REVISION
        [--freshness=FRESHNESS; default="1d"] [--log-filter=LOG_FILTER]
        [--order=ORDER; default="desc"] [--region=REGION] [--limit=LIMIT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run revisions logs tail

```text
NAME
    gcloud alpha run revisions logs tail - tail logs for a Cloud Run revision

SYNOPSIS
    gcloud alpha run revisions logs tail REVISION [--log-filter=LOG_FILTER]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/revisions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
