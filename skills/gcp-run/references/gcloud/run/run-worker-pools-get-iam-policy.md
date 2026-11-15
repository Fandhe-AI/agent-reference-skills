---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/worker-pools/get-iam-policy
---

# gcloud run worker-pools get-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud run worker-pools get-iam-policy

```text
NAME
    gcloud run worker-pools get-iam-policy - get the IAM policy for a Cloud Run
        worker pool

SYNOPSIS
    gcloud run worker-pools get-iam-policy (WORKERPOOL : --region=REGION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command gets the IAM policy for a worker pool. If formatted as JSON,
    the output can be edited and used as a policy file for set-iam-policy. The
    output includes an "etag" field identifying the version emitted and
    allowing detection of concurrent policy updates; see $ gcloud alpha run
    registries set-iam-policy for additional details.

EXAMPLES
    To print the IAM policy for a given worker pool, run:

        $ gcloud run worker-pools get-iam-policy --region=us-central1 \
            my-worker-pool

POSITIONAL ARGUMENTS
     Workerpool resource - The worker pool for which to display the IAM policy.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument workerpool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WORKERPOOL
          ID of the workerpool or fully qualified identifier for the
          workerpool.

          To set the workerpool attribute:
          + provide the argument workerpool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud Run region.

          To set the region attribute:
          + provide the argument workerpool on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property run/region;
          + specify from a list of available regions in a prompt.

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

API REFERENCE
    This command uses the run/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/run/

NOTES
    These variants are also available:

        $ gcloud alpha run worker-pools get-iam-policy

        $ gcloud beta run worker-pools get-iam-policy
```

### gcloud beta run worker-pools get-iam-policy

```text
NAME
    gcloud beta run worker-pools get-iam-policy - get the IAM policy for a
        Cloud Run worker pool

SYNOPSIS
    gcloud beta run worker-pools get-iam-policy (WORKERPOOL : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run worker-pools get-iam-policy

```text
NAME
    gcloud alpha run worker-pools get-iam-policy - get the IAM policy for a
        Cloud Run worker pool

SYNOPSIS
    gcloud alpha run worker-pools get-iam-policy (WORKERPOOL : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/worker-pools/get-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
