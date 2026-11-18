---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iap/oauth-brands
---

# gcloud iap oauth-brands

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iap oauth-brands create

```text
NAME
    gcloud iap oauth-brands create - create a Cloud OAuth brand for the project

SYNOPSIS
    gcloud iap oauth-brands create --application_title=APPLICATION_TITLE
        --support_email=SUPPORT_EMAIL [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated and will be non-functional after
    the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will
    discontinue support for the IAP OAuth Admin APIs. New projects will not be
    able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be
    permanently shut down. Access to this feature will no longer be available.

    gcloud iap oauth-brands create is used to create a Cloud OAuth brand for
    the project. The brand is 'internal only', meaning OAuth clients created
    under it only accept requests from users who belong to the same G Suite
    account as the project. The brand is created in unreviewed status. Your
    domain will not appear on the OAuth consent screen until it is reviewed
    after you manually start a review process in Google Cloud Platform Console.
    Note that the 'internal only' setting can be manually changed in Google
    Cloud Platform Console
    (https://console.cloud.google.com/apis/credentials/consent). A project can
    only have one brand.

EXAMPLES
    To create a Cloud OAuth brand for the current project, run:

        $ gcloud iap oauth-brands create \
          --application_title=APPLICATION_TITLE \
          --support_email=SUPPORT_EMAIL

    To create a Cloud OAuth brand for the project PROJECT_ID, run:

        $ gcloud iap oauth-brands create \
          --application_title=APPLICATION_TITLE \
          --support_email=SUPPORT_EMAIL --project=PROJECT_ID

REQUIRED FLAGS
     --application_title=APPLICATION_TITLE
        Application name displayed on the OAuth consent screen.

     --support_email=SUPPORT_EMAIL
        Support email displayed on the OAuth consent screen.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iap/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iap

NOTES
    These variants are also available:

        $ gcloud alpha iap oauth-brands create

        $ gcloud beta iap oauth-brands create
```

### gcloud iap oauth-brands describe

```text
NAME
    gcloud iap oauth-brands describe - describe a Cloud OAuth brand

SYNOPSIS
    gcloud iap oauth-brands describe NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated and will be non-functional after
    the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will
    discontinue support for the IAP OAuth Admin APIs. New projects will not be
    able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be
    permanently shut down. Access to this feature will no longer be available.

    gcloud iap oauth-brands describe is used to describe a Cloud OAuth brand.

EXAMPLES
    To describe a Cloud OAuth brand with name NAME, run:

        $ gcloud iap oauth-brands describe NAME

    To describe a Cloud OAuth brand with name NAME inside project PROJECT_ID,
    run:

        $ gcloud iap oauth-brands describe NAME --project=PROJECT_ID

POSITIONAL ARGUMENTS
     Brand resource - Name of the Cloud OAuth brand to describe. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument name on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the brand or fully qualified identifier for the brand.

          To set the brand attribute:
          + provide the argument name on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iap/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iap

NOTES
    These variants are also available:

        $ gcloud alpha iap oauth-brands describe

        $ gcloud beta iap oauth-brands describe
```

### gcloud iap oauth-brands list

```text
NAME
    gcloud iap oauth-brands list - list Cloud OAuth brands in the project

SYNOPSIS
    gcloud iap oauth-brands list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated and will be non-functional after
    the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will
    discontinue support for the IAP OAuth Admin APIs. New projects will not be
    able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be
    permanently shut down. Access to this feature will no longer be available.

    gcloud iap oauth-brands list is used to list the Cloud OAuth brand in the
    project.

EXAMPLES
    To list all Cloud OAuth brands in the current project, run:

        $ gcloud iap oauth-brands list

    To list all Cloud OAuth brands in the project PROJECT_ID, run:

        $ gcloud iap oauth-brands list --project=PROJECT_ID

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
    This command uses the iap/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iap

NOTES
    These variants are also available:

        $ gcloud alpha iap oauth-brands list

        $ gcloud beta iap oauth-brands list
```

### gcloud beta iap oauth-brands create

```text
NAME
    gcloud beta iap oauth-brands create - create a Cloud OAuth brand for the
        project

SYNOPSIS
    gcloud beta iap oauth-brands create --application_title=APPLICATION_TITLE
        --support_email=SUPPORT_EMAIL [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iap oauth-brands describe

```text
NAME
    gcloud beta iap oauth-brands describe - describe a Cloud OAuth brand

SYNOPSIS
    gcloud beta iap oauth-brands describe NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iap oauth-brands list

```text
NAME
    gcloud beta iap oauth-brands list - list Cloud OAuth brands in the project

SYNOPSIS
    gcloud beta iap oauth-brands list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iap oauth-brands create

```text
NAME
    gcloud alpha iap oauth-brands create - create a Cloud OAuth brand for the
        project

SYNOPSIS
    gcloud alpha iap oauth-brands create --application_title=APPLICATION_TITLE
        --support_email=SUPPORT_EMAIL [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iap oauth-brands describe

```text
NAME
    gcloud alpha iap oauth-brands describe - describe a Cloud OAuth brand

SYNOPSIS
    gcloud alpha iap oauth-brands describe NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iap oauth-brands list

```text
NAME
    gcloud alpha iap oauth-brands list - list Cloud OAuth brands in the project

SYNOPSIS
    gcloud alpha iap oauth-brands list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud iap oauth-brands create`: "This command is deprecated and will be non-functional after the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will discontinue support for the IAP OAuth Admin APIs. New projects will not be able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be permanently shut down. Access to this feature will no longer be available."; `gcloud iap oauth-brands describe`: "This command is deprecated and will be non-functional after the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will discontinue support for the IAP OAuth Admin APIs. New projects will not be able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be permanently shut down. Access to this feature will no longer be available."; `gcloud iap oauth-brands list`: "This command is deprecated and will be non-functional after the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will discontinue support for the IAP OAuth Admin APIs. New projects will not be able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be permanently shut down. Access to this feature will no longer be available.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iap/oauth-brands (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
