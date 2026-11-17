---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/vpc-access/operations
---

# gcloud compute networks vpc-access operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute networks vpc-access operations describe

```text
NAME
    gcloud compute networks vpc-access operations describe - show metadata for
        a VPC Access Service operation

SYNOPSIS
    gcloud compute networks vpc-access operations describe
        (OPERATION : --region=REGION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all metadata associated with a VPC Access Service operation given a
    valid operation name.

    This command can fail for the following reasons:
      o The operation specified does not exist.
      o The active account does not have permission to access the given
        operation.

EXAMPLES
    The following command prints metadata for an operation with the name in
    region us-central1:

        $ gcloud compute networks vpc-access operations describe \
            operation-1564112342235-435a134f8c3f8-81bb4b49-0830c1f8 \
            --region=us-central

POSITIONAL ARGUMENTS
     Operation resource - The operation to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Compute region (e.g. us-central1) for the connector.

          To set the region attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the vpcaccess/v1 API. The full documentation for this API
    can be found at:
    https://cloud.google.com/vpc/docs/configure-serverless-vpc-access

NOTES
    This variant is also available:

        $ gcloud beta compute networks vpc-access operations describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute networks vpc-access operations describe operation-1564112342235-435a134f8c3f8-81bb4b49-0830c1f8 \
    --region=us-central1
```

### gcloud compute networks vpc-access operations list

```text
NAME
    gcloud compute networks vpc-access operations list - list VPC Access
        Service operations

SYNOPSIS
    gcloud compute networks vpc-access operations list --region=REGION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all VPC Access Service operations under the specified project and
    region.

    You can specify the maximum number of operations to list using the --limit
    flag.

EXAMPLES
    The following command lists a maximum of five operations in region
    us-central1:

        $ gcloud compute networks vpc-access operations list \
          --region=us-central1 --limit=5

REQUIRED FLAGS
     Region resource - The region of the operations to list. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --region=REGION
          ID of the region or fully qualified identifier for the region.

          To set the region attribute:
          + provide the argument --region on the command line.

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
    This command uses the vpcaccess/v1 API. The full documentation for this API
    can be found at:
    https://cloud.google.com/vpc/docs/configure-serverless-vpc-access

NOTES
    This variant is also available:

        $ gcloud beta compute networks vpc-access operations list
```

### gcloud beta compute networks vpc-access operations describe

```text
NAME
    gcloud beta compute networks vpc-access operations describe - show metadata
        for a VPC Access Service operation

SYNOPSIS
    gcloud beta compute networks vpc-access operations describe
        (OPERATION : --region=REGION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute networks vpc-access operations list

```text
NAME
    gcloud beta compute networks vpc-access operations list - list VPC Access
        Service operations

SYNOPSIS
    gcloud beta compute networks vpc-access operations list --region=REGION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example says the resource is "in region us-central1" but passes `--region=us-central`, which is not a region; the runnable form uses `--region=us-central1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/vpc-access/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
