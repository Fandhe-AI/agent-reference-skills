---
source: https://docs.cloud.google.com/sdk/gcloud/reference/infra-manager/resource-drifts
---

# gcloud infra-manager resource-drifts

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud infra-manager resource-drifts describe

```text
NAME
    gcloud infra-manager resource-drifts describe - describe resource drifts

SYNOPSIS
    gcloud infra-manager resource-drifts describe
        (RESOURCE_DRIFT : --location=LOCATION --preview=PREVIEW)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a resource drift

EXAMPLES
    To describe a resource drift rd under preview pr1 at location us-central1,
    run:

        $ gcloud infra-manager resource-drifts describe \
            projects/p1/locations/us-central1/previews/pr1/resourceDrifts/rd

POSITIONAL ARGUMENTS
     ResourceDrift resource - The resource drift to describe The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument resource_drift on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESOURCE_DRIFT
          ID of the resourceDrift or fully qualified identifier for the
          resourceDrift.

          To set the resource_drift attribute:
          + provide the argument resource_drift on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          locations TBD

          To set the location attribute:
          + provide the argument resource_drift on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property infra-manager/location.

       --preview=PREVIEW
          preview TBD

          To set the preview attribute:
          + provide the argument resource_drift on the command line with a
            fully specified name;
          + provide the argument --preview on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the config/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/infrastructure-manager/docs
```

### gcloud infra-manager resource-drifts list

```text
NAME
    gcloud infra-manager resource-drifts list - list resource drifts

SYNOPSIS
    gcloud infra-manager resource-drifts list
        (--preview=PREVIEW : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List resource drifts for a preview

EXAMPLES
    To list all resource drifts for preview
    projects/p1/locations/us-central1/previews/pr1, run:

        $ gcloud infra-manager resource-drifts list \
            --preview=projects/p1/locations/us-central1/previews/pr1

REQUIRED FLAGS
     Preview resource - The preview for which we want to list all resource
     drifts. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --preview on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --preview=PREVIEW
          ID of the preview or fully qualified identifier for the preview.

          To set the preview attribute:
          + provide the argument --preview on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          locations TBD

          To set the location attribute:
          + provide the argument --preview on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property infra-manager/location.

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
    This command uses the config/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/infrastructure-manager/docs
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/infra-manager/resource-drifts (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
