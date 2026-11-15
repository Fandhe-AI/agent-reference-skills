---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/list-grantable-roles
---

# gcloud iam list-grantable-roles

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam list-grantable-roles

```text
NAME
    gcloud iam list-grantable-roles - list IAM grantable roles for a resource

SYNOPSIS
    gcloud iam list-grantable-roles RESOURCE [--filter=EXPRESSION]
        [--page-size=PAGE_SIZE; default=300] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command displays the list of grantable roles for a resource. The
    resource can be referenced either via the full resource name or via a URI.
    User can then add IAM policy bindings to grant the roles.

EXAMPLES
    List grantable roles for a project:

        $ gcloud iam list-grantable-roles \
            //cloudresourcemanager.googleapis.com/projects/PROJECT_ID

    List grantable roles for a resource identified via full resource name:

        $ gcloud iam list-grantable-roles \
            //compute.googleapis.com/projects/example-project/zones/\
        us-central1-f/instances/example-instance

    List grantable roles for a resource identified via URI:

        $ gcloud iam list-grantable-roles \
            https://www.googleapis.com/compute/v1/projects/example-project/\
        zones/us-central1-f/instances/example-instance

POSITIONAL ARGUMENTS
     RESOURCE
        The full resource name or URI to get the list of roles for.

        See "Resource Names"
        (https://cloud.google.com/apis/design/resource_names) for details. To
        get a URI from most list commands in gcloud, pass the --uri flag. For
        example:

            $ gcloud compute instances list --project prj --uri \
            https://compute.googleapis.com/compute/v1/projects/prj/zones/us-east1-c/instances/i1 \
            https://compute.googleapis.com/compute/v1/projects/prj/zones/us-east1-d/instances/i2

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE; default=300
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is 300.
        Paging may be applied before or after --filter and --limit depending on
        the service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam list-grantable-roles

        $ gcloud beta iam list-grantable-roles
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud iam list-grantable-roles //compute.googleapis.com/projects/example-project/zones/us-central1-f/instances/example-instance

gcloud iam list-grantable-roles https://www.googleapis.com/compute/v1/projects/example-project/zones/us-central1-f/instances/example-instance
```

### gcloud beta iam list-grantable-roles

```text
NAME
    gcloud beta iam list-grantable-roles - list IAM grantable roles for a
        resource

SYNOPSIS
    gcloud beta iam list-grantable-roles RESOURCE [--filter=EXPRESSION]
        [--page-size=PAGE_SIZE; default=300] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam list-grantable-roles

```text
NAME
    gcloud alpha iam list-grantable-roles - list IAM grantable roles for a
        resource

SYNOPSIS
    gcloud alpha iam list-grantable-roles RESOURCE [--filter=EXPRESSION]
        [--page-size=PAGE_SIZE; default=300] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/list-grantable-roles (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
