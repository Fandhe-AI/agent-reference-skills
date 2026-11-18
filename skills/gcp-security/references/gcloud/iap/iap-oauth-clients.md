---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iap/oauth-clients
---

# gcloud iap oauth-clients

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iap oauth-clients create

```text
NAME
    gcloud iap oauth-clients create - create a Cloud IAP OAuth client in the
        project

SYNOPSIS
    gcloud iap oauth-clients create BRAND --display_name=DISPLAY_NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated and will be non-functional after
    the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will
    discontinue support for the IAP OAuth Admin APIs. New projects will not be
    able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be
    permanently shut down. Access to this feature will no longer be available.

    gcloud iap oauth-clients create is used to create an OAuth client in the
    project to be used by Cloud IAP. To call this command, the Cloud OAuth
    brand for the project must exist and be set for 'internal only'. The new
    client is owned by Cloud IAP.

EXAMPLES
    To create a Cloud IAP OAuth client for the current project, run:

        $ gcloud iap oauth-clients create BRAND --display_name=DISPLAY_NAME

    To create a Cloud IAP OAuth client for the project PROJECT_ID, run:

        $ gcloud iap oauth-clients create BRAND \
          --display_name=DISPLAY_NAME --project=PROJECT_ID

POSITIONAL ARGUMENTS
     Brand resource - Name of the Cloud OAuth brand to create a Cloud IAP OAuth
     client under. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument brand on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BRAND
          ID of the brand or fully qualified identifier for the brand.

          To set the brand attribute:
          + provide the argument brand on the command line.

REQUIRED FLAGS
     --display_name=DISPLAY_NAME
        User friendly name for the Cloud IAP OAuth client.

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

        $ gcloud alpha iap oauth-clients create

        $ gcloud beta iap oauth-clients create
```

### gcloud iap oauth-clients delete

```text
NAME
    gcloud iap oauth-clients delete - delete a Cloud IAP OAuth client

SYNOPSIS
    gcloud iap oauth-clients delete (NAME : --brand=BRAND)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated and will be non-functional after
    the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will
    discontinue support for the IAP OAuth Admin APIs. New projects will not be
    able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be
    permanently shut down. Access to this feature will no longer be available.

    gcloud iap oauth-clients delete is used to delete a Cloud IAP OAuth client.
    Note this command cannot be used to delete any other type of OAuth client
    in your project.

EXAMPLES
    To delete a Cloud IAP OAuth client named CLIENT for the current project and
    brand BRAND, run:

        $ gcloud iap oauth-clients delete CLIENT --brand=BRAND

    To delete a Cloud IAP OAuth client named CLIENT for a specific project
    PROJECT_ID and brand BRAND, run:

        $ gcloud iap oauth-clients delete CLIENT --brand=BRAND \
          --project=PROJECT_ID

POSITIONAL ARGUMENTS
     Proxy client resource - Name of the Cloud IAP OAuth client to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument name on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the proxy client or fully qualified identifier for the proxy
          client.

          To set the identity_aware_proxy_clients attribute:
          + provide the argument name on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --brand=BRAND
          The name of the OAuth brand.

          To set the brand attribute:
          + provide the argument name on the command line with a fully
            specified name;
          + provide the argument --brand on the command line.

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

        $ gcloud alpha iap oauth-clients delete

        $ gcloud beta iap oauth-clients delete
```

### gcloud iap oauth-clients describe

```text
NAME
    gcloud iap oauth-clients describe - describe a Cloud IAP OAuth client

SYNOPSIS
    gcloud iap oauth-clients describe (NAME : --brand=BRAND)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated and will be non-functional after
    the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will
    discontinue support for the IAP OAuth Admin APIs. New projects will not be
    able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be
    permanently shut down. Access to this feature will no longer be available.

    gcloud iap oauth-clients describe is used to describe a Cloud IAP OAuth
    client. Note this command cannot be used to describe any other type of
    OAuth client in your project.

EXAMPLES
    To describe a Cloud IAP OAuth client for the current project, run:

        $ gcloud iap oauth-clients describe NAME

    To describe a Cloud IAP OAuth client for a specific brand, run:

        $ gcloud iap oauth-clients describe NAME --brand=BRAND

POSITIONAL ARGUMENTS
     Proxy client resource - Name of the Cloud IAP OAuth client to describe.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument name on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the proxy client or fully qualified identifier for the proxy
          client.

          To set the identity_aware_proxy_clients attribute:
          + provide the argument name on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --brand=BRAND
          The name of the OAuth brand.

          To set the brand attribute:
          + provide the argument name on the command line with a fully
            specified name;
          + provide the argument --brand on the command line.

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

        $ gcloud alpha iap oauth-clients describe

        $ gcloud beta iap oauth-clients describe
```

### gcloud iap oauth-clients list

```text
NAME
    gcloud iap oauth-clients list - list Cloud IAP OAuth clients in the Cloud
        OAuth brand

SYNOPSIS
    gcloud iap oauth-clients list NAME [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated and will be non-functional after
    the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will
    discontinue support for the IAP OAuth Admin APIs. New projects will not be
    able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be
    permanently shut down. Access to this feature will no longer be available.

    gcloud iap oauth-clients list is used to list Cloud IAP OAuth clients in a
    Cloud OAuth brand. Note this command will not list any other type of OAuth
    client in your project.

EXAMPLES
    To list the Cloud IAP OAuth clients for the current project, run:

        $ gcloud iap oauth-clients list BRAND

POSITIONAL ARGUMENTS
     Brand resource - Name of the Cloud OAuth brand to list Cloud IAP OAuth
     clients under. This represents a Cloud resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

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

        $ gcloud alpha iap oauth-clients list

        $ gcloud beta iap oauth-clients list
```

### gcloud iap oauth-clients reset-secret

```text
NAME
    gcloud iap oauth-clients reset-secret - reset a Cloud IAP OAuth client
        secret

SYNOPSIS
    gcloud iap oauth-clients reset-secret (NAME : --brand=BRAND)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated and will be non-functional after
    the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will
    discontinue support for the IAP OAuth Admin APIs. New projects will not be
    able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be
    permanently shut down. Access to this feature will no longer be available.

    gcloud iap oauth-clients reset-secret is used to reset a Cloud IAP OAuth
    client secret. Note this command cannot be used to reset the secret for any
    other type of OAuth client in your project.

EXAMPLES
    To reset a Cloud IAP OAuth client secret, run:

        $ gcloud iap oauth-clients reset-secret NAME

    To reset a Cloud IAP OAuth client secret for a specific brand, run:

        $ gcloud iap oauth-clients reset-secret NAME --brand=BRAND

POSITIONAL ARGUMENTS
     Proxy client resource - Name of the Cloud IAP OAuth client whose secret
     will be reset. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument name on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the proxy client or fully qualified identifier for the proxy
          client.

          To set the identity_aware_proxy_clients attribute:
          + provide the argument name on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --brand=BRAND
          The name of the OAuth brand.

          To set the brand attribute:
          + provide the argument name on the command line with a fully
            specified name;
          + provide the argument --brand on the command line.

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

        $ gcloud alpha iap oauth-clients reset-secret

        $ gcloud beta iap oauth-clients reset-secret
```

### gcloud beta iap oauth-clients create

```text
NAME
    gcloud beta iap oauth-clients create - create a Cloud IAP OAuth client in
        the project

SYNOPSIS
    gcloud beta iap oauth-clients create BRAND --display_name=DISPLAY_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iap oauth-clients delete

```text
NAME
    gcloud beta iap oauth-clients delete - delete a Cloud IAP OAuth client

SYNOPSIS
    gcloud beta iap oauth-clients delete (NAME : --brand=BRAND)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iap oauth-clients describe

```text
NAME
    gcloud beta iap oauth-clients describe - describe a Cloud IAP OAuth client

SYNOPSIS
    gcloud beta iap oauth-clients describe (NAME : --brand=BRAND)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iap oauth-clients list

```text
NAME
    gcloud beta iap oauth-clients list - list Cloud IAP OAuth clients in the
        Cloud OAuth brand

SYNOPSIS
    gcloud beta iap oauth-clients list NAME [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iap oauth-clients reset-secret

```text
NAME
    gcloud beta iap oauth-clients reset-secret - reset a Cloud IAP OAuth client
        secret

SYNOPSIS
    gcloud beta iap oauth-clients reset-secret (NAME : --brand=BRAND)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iap oauth-clients create

```text
NAME
    gcloud alpha iap oauth-clients create - create a Cloud IAP OAuth client in
        the project

SYNOPSIS
    gcloud alpha iap oauth-clients create BRAND --display_name=DISPLAY_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iap oauth-clients delete

```text
NAME
    gcloud alpha iap oauth-clients delete - delete a Cloud IAP OAuth client

SYNOPSIS
    gcloud alpha iap oauth-clients delete (NAME : --brand=BRAND)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iap oauth-clients describe

```text
NAME
    gcloud alpha iap oauth-clients describe - describe a Cloud IAP OAuth client

SYNOPSIS
    gcloud alpha iap oauth-clients describe (NAME : --brand=BRAND)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iap oauth-clients list

```text
NAME
    gcloud alpha iap oauth-clients list - list Cloud IAP OAuth clients in the
        Cloud OAuth brand

SYNOPSIS
    gcloud alpha iap oauth-clients list NAME [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iap oauth-clients reset-secret

```text
NAME
    gcloud alpha iap oauth-clients reset-secret - reset a Cloud IAP OAuth
        client secret

SYNOPSIS
    gcloud alpha iap oauth-clients reset-secret (NAME : --brand=BRAND)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud iap oauth-clients create`: "This command is deprecated and will be non-functional after the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will discontinue support for the IAP OAuth Admin APIs. New projects will not be able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be permanently shut down. Access to this feature will no longer be available."; `gcloud iap oauth-clients delete`: "This command is deprecated and will be non-functional after the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will discontinue support for the IAP OAuth Admin APIs. New projects will not be able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be permanently shut down. Access to this feature will no longer be available."; `gcloud iap oauth-clients describe`: "This command is deprecated and will be non-functional after the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will discontinue support for the IAP OAuth Admin APIs. New projects will not be able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be permanently shut down. Access to this feature will no longer be available."; `gcloud iap oauth-clients list`: "This command is deprecated and will be non-functional after the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will discontinue support for the IAP OAuth Admin APIs. New projects will not be able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be permanently shut down. Access to this feature will no longer be available."; `gcloud iap oauth-clients reset-secret`: "This command is deprecated and will be non-functional after the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will discontinue support for the IAP OAuth Admin APIs. New projects will not be able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be permanently shut down. Access to this feature will no longer be available.".
- Incomplete example: the first `describe` and `reset-secret` examples pass only `NAME`; the brand is set only by "the argument `name` on the command line with a fully specified name" or `--brand` (no property sets it), and gcloud 593.0.0 fails with "Failed to find attribute [brand]" when `NAME` is an ID. Pass the fully qualified identifier or add `--brand`, as in the second examples.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iap/oauth-clients (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
