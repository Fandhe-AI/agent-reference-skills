---
source: https://docs.cloud.google.com/sdk/gcloud/reference/infra-manager/revisions
---

# gcloud infra-manager revisions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud infra-manager revisions describe

```text
NAME
    gcloud infra-manager revisions describe - describe revisions

SYNOPSIS
    gcloud infra-manager revisions describe
        (REVISION : --deployment=DEPLOYMENT --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a revision

EXAMPLES
    To describe the revision r-0 under deployment example-deployment at
    location us-central1, run:

        $ gcloud infra-manager revisions describe \
            projects/p1/locations/us-central1/deployments/\
        example-deployment/revisions/r-0

POSITIONAL ARGUMENTS
     Revision resource - The revision to describe The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument revision on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REVISION
          ID of the revision or fully qualified identifier for the revision.

          To set the revision attribute:
          + provide the argument revision on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --deployment=DEPLOYMENT
          deployments TBD

          To set the deployment attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --deployment on the command line.

       --location=LOCATION
          locations TBD

          To set the location attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property infra-manager/location.

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

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud infra-manager revisions describe projects/p1/locations/us-central1/deployments/example-deployment/revisions/r-0
```

### gcloud infra-manager revisions export-statefile

```text
NAME
    gcloud infra-manager revisions export-statefile - export a terraform state
        file

SYNOPSIS
    gcloud infra-manager revisions export-statefile
        (REVISION : --deployment=DEPLOYMENT --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command generates a signed url to download a terraform state file.

EXAMPLES
    Export state file for revision
    projects/p1/locations/l1/deployments/d1/revisions/r-0:

        $ gcloud infra-manager revisions export-statefile \
            projects/p1/locations/l1/deployments/d1/revisions/r-0

POSITIONAL ARGUMENTS
     Revision resource - the revision to be used as parent. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument REVISION on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REVISION
          ID of the revision or fully qualified identifier for the revision.

          To set the revision attribute:
          + provide the argument REVISION on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --deployment=DEPLOYMENT
          The deployment for the revision.

          To set the deployment attribute:
          + provide the argument REVISION on the command line with a fully
            specified name;
          + provide the argument --deployment on the command line.

       --location=LOCATION
          The Cloud location for the revision.

          To set the location attribute:
          + provide the argument REVISION on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property infra-manager/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud infra-manager revisions list

```text
NAME
    gcloud infra-manager revisions list - list revisions

SYNOPSIS
    gcloud infra-manager revisions list
        (--deployment=DEPLOYMENT : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List revisions for a deployment

EXAMPLES
    To list all revisions for deployment
    projects/p1/locations/l1/deployments/d1, run:

        $ gcloud infra-manager revisions list \
            --deployment=projects/p1/locations/l1/deployments/d1

REQUIRED FLAGS
     Deployment resource - The deployment for which we want to list all
     revisions. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --deployment on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --deployment=DEPLOYMENT
          ID of the deployment or fully qualified identifier for the
          deployment.

          To set the deployment attribute:
          + provide the argument --deployment on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          locations TBD

          To set the location attribute:
          + provide the argument --deployment on the command line with a
            fully specified name;
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

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/infra-manager/revisions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
