---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workforce-pools/providers/scim-tenants/tokens
---

# gcloud iam workforce-pools providers scim-tenants tokens

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam workforce-pools providers scim-tenants tokens create

```text
NAME
    gcloud iam workforce-pools providers scim-tenants tokens create - create an
        IAM workforce identity pool provider SCIM tenant token

SYNOPSIS
    gcloud iam workforce-pools providers scim-tenants tokens create
        (TOKEN : --location=LOCATION --provider=PROVIDER
          --scim-tenant=SCIM_TENANT --workforce-pool=WORKFORCE_POOL)
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new SCIM token associated with a specific workforce identity pool
    provider SCIM tenant.

    Upon successful creation, the command returns the created SCIM token
    resource.

EXAMPLES
    To create a SCIM token with ID my-token under tenant my-tenant provider
    my-provider in pool my-pool located in global:

        $ gcloud iam workforce-pools providers scim-tenants tokens create \
            my-token --location=global --workforce-pool=my-pool \
            --provider=my-provider --scim-tenant=my-tenant

POSITIONAL ARGUMENTS
     Workforce pool provider scim token resource - The ID of the SCIM token to
     create. Must be 4-32 characters, alphanumeric ([a-z0-9-]), and cannot
     start with gcp-. The arguments in this group can be used to specify the
     attributes of this resource.

     This must be specified.

       TOKEN
          ID of the workforce pool provider scim token or fully qualified
          identifier for the workforce pool provider scim token.

          To set the token attribute:
          + provide the argument token on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the workforce pool.

          To set the location attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --provider=PROVIDER
          The ID to use for the workforce pool provider, which becomes the
          final component of the resource name. This value must be unique
          within the workforce pool, 4-32 characters in length, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the provider attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --provider on the command line.

       --scim-tenant=SCIM_TENANT
          The ID for the SCIM tenant, which becomes the final component of the
          resource name. This value must be 4-32 characters, alphanumeric
          ([a-z0-9-]), and cannot start with gcp-.

          To set the scim-tenant attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --scim-tenant on the command line.

       --workforce-pool=WORKFORCE_POOL
          The ID to use for the workforce pool, which becomes the final
          component of the resource name. This value must be a globally unique
          string of 6 to 63 lowercase letters, digits, or hyphens. It must
          start with a letter, and cannot have a trailing hyphen. The prefix
          gcp- is reserved for use by Google, and may not be specified.

          To set the workforce-pool attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --workforce-pool on the command line.

FLAGS
     --display-name=DISPLAY_NAME
        Optional, user-specified display name for the SCIM token (max 32
        characters).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    These variants are also available:

        $ gcloud alpha iam workforce-pools providers scim-tenants tokens \
            create

        $ gcloud beta iam workforce-pools providers scim-tenants tokens \
            create
```

### gcloud iam workforce-pools providers scim-tenants tokens delete

```text
NAME
    gcloud iam workforce-pools providers scim-tenants tokens delete - delete an
        IAM workforce identity pool provider SCIM tenant token

SYNOPSIS
    gcloud iam workforce-pools providers scim-tenants tokens delete
        (TOKEN : --location=LOCATION --provider=PROVIDER
          --scim-tenant=SCIM_TENANT --workforce-pool=WORKFORCE_POOL)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a SCIM token associated with a specific workforce identity pool
    provider SCIM tenant.

EXAMPLES
    To delete a SCIM token with ID my-token under tenant my-tenant provider
    my-provider in pool my-pool located in global:

        $ gcloud iam workforce-pools providers scim-tenants tokens delete \
            my-token --location=global --workforce-pool=my-pool \
            --provider=my-provider --scim-tenant=my-tenant

POSITIONAL ARGUMENTS
     Workforce pool provider scim token resource - The SCIM token to delete.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       TOKEN
          ID of the workforce pool provider scim token or fully qualified
          identifier for the workforce pool provider scim token.

          To set the token attribute:
          + provide the argument token on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the workforce pool.

          To set the location attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --provider=PROVIDER
          The ID to use for the workforce pool provider, which becomes the
          final component of the resource name. This value must be unique
          within the workforce pool, 4-32 characters in length, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the provider attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --provider on the command line.

       --scim-tenant=SCIM_TENANT
          The ID for the SCIM tenant, which becomes the final component of the
          resource name. This value must be 4-32 characters, alphanumeric
          ([a-z0-9-]), and cannot start with gcp-.

          To set the scim-tenant attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --scim-tenant on the command line.

       --workforce-pool=WORKFORCE_POOL
          The ID to use for the workforce pool, which becomes the final
          component of the resource name. This value must be a globally unique
          string of 6 to 63 lowercase letters, digits, or hyphens. It must
          start with a letter, and cannot have a trailing hyphen. The prefix
          gcp- is reserved for use by Google, and may not be specified.

          To set the workforce-pool attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --workforce-pool on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    These variants are also available:

        $ gcloud alpha iam workforce-pools providers scim-tenants tokens \
            delete

        $ gcloud beta iam workforce-pools providers scim-tenants tokens \
            delete
```

### gcloud iam workforce-pools providers scim-tenants tokens describe

```text
NAME
    gcloud iam workforce-pools providers scim-tenants tokens describe -
        describe an IAM workforce identity pool provider SCIM tenant token

SYNOPSIS
    gcloud iam workforce-pools providers scim-tenants tokens describe
        (TOKEN : --location=LOCATION --provider=PROVIDER
          --scim-tenant=SCIM_TENANT --workforce-pool=WORKFORCE_POOL)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a SCIM token associated with a specific workforce identity pool
    provider SCIM tenant.

EXAMPLES
    To describe a SCIM token with ID my-token under tenant my-tenant provider
    my-provider in pool my-pool located in global:

        $ gcloud iam workforce-pools providers scim-tenants tokens \
            describe my-token --location=global --workforce-pool=my-pool \
            --provider=my-provider --scim-tenant=my-tenant

POSITIONAL ARGUMENTS
     Workforce pool provider scim token resource - The SCIM token to describe.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       TOKEN
          ID of the workforce pool provider scim token or fully qualified
          identifier for the workforce pool provider scim token.

          To set the token attribute:
          + provide the argument token on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the workforce pool.

          To set the location attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --provider=PROVIDER
          The ID to use for the workforce pool provider, which becomes the
          final component of the resource name. This value must be unique
          within the workforce pool, 4-32 characters in length, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the provider attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --provider on the command line.

       --scim-tenant=SCIM_TENANT
          The ID for the SCIM tenant, which becomes the final component of the
          resource name. This value must be 4-32 characters, alphanumeric
          ([a-z0-9-]), and cannot start with gcp-.

          To set the scim-tenant attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --scim-tenant on the command line.

       --workforce-pool=WORKFORCE_POOL
          The ID to use for the workforce pool, which becomes the final
          component of the resource name. This value must be a globally unique
          string of 6 to 63 lowercase letters, digits, or hyphens. It must
          start with a letter, and cannot have a trailing hyphen. The prefix
          gcp- is reserved for use by Google, and may not be specified.

          To set the workforce-pool attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --workforce-pool on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    These variants are also available:

        $ gcloud alpha iam workforce-pools providers scim-tenants tokens \
            describe

        $ gcloud beta iam workforce-pools providers scim-tenants tokens \
            describe
```

### gcloud iam workforce-pools providers scim-tenants tokens list

```text
NAME
    gcloud iam workforce-pools providers scim-tenants tokens list - list IAM
        workforce identity pool provider SCIM tenant tokens

SYNOPSIS
    gcloud iam workforce-pools providers scim-tenants tokens list
        (--scim-tenant=SCIM_TENANT : --location=LOCATION
          --provider=PROVIDER --workforce-pool=WORKFORCE_POOL) [--show-deleted]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all SCIM tokens associated with a specific workforce identity pool
    provider SCIM tenant.

EXAMPLES
    To list all SCIM tokens under tenant my-tenant provider my-provider in pool
    my-pool located in global:

        $ gcloud iam workforce-pools providers scim-tenants tokens list \
            --location=global --workforce-pool=my-pool \
            --provider=my-provider --scim-tenant=my-tenant

    To list deleted SCIM tokens as well:

        $ gcloud iam workforce-pools providers scim-tenants tokens list \
            --location=global --workforce-pool=my-pool \
            --provider=my-provider --scim-tenant=my-tenant --show-deleted

REQUIRED FLAGS
     Workforce pool provider scim tenant resource - The SCIM tenant to list
     tokens for. The arguments in this group can be used to specify the
     attributes of this resource.

     This must be specified.

       --scim-tenant=SCIM_TENANT
          ID of the workforce pool provider scim tenant or fully qualified
          identifier for the workforce pool provider scim tenant.

          To set the scim-tenant attribute:
          + provide the argument --scim-tenant on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location for the workforce pool.

          To set the location attribute:
          + provide the argument --scim-tenant on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --provider=PROVIDER
          The ID to use for the workforce pool provider, which becomes the
          final component of the resource name. This value must be unique
          within the workforce pool, 4-32 characters in length, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the provider attribute:
          + provide the argument --scim-tenant on the command line with a
            fully specified name;
          + provide the argument --provider on the command line.

       --workforce-pool=WORKFORCE_POOL
          The ID to use for the workforce pool, which becomes the final
          component of the resource name. This value must be a globally unique
          string of 6 to 63 lowercase letters, digits, or hyphens. It must
          start with a letter, and cannot have a trailing hyphen. The prefix
          gcp- is reserved for use by Google, and may not be specified.

          To set the workforce-pool attribute:
          + provide the argument --scim-tenant on the command line with a
            fully specified name;
          + provide the argument --workforce-pool on the command line.

FLAGS
     --show-deleted
        Include soft-deleted tokens in the results.

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
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    These variants are also available:

        $ gcloud alpha iam workforce-pools providers scim-tenants tokens list

        $ gcloud beta iam workforce-pools providers scim-tenants tokens list
```

### gcloud iam workforce-pools providers scim-tenants tokens update

```text
NAME
    gcloud iam workforce-pools providers scim-tenants tokens update - update an
        IAM workforce identity pool provider SCIM tenant token

SYNOPSIS
    gcloud iam workforce-pools providers scim-tenants tokens update
        (TOKEN : --location=LOCATION --provider=PROVIDER
          --scim-tenant=SCIM_TENANT --workforce-pool=WORKFORCE_POOL)
        --display-name=DISPLAY_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing SCIM token associated with a specific workforce identity
    pool provider SCIM tenant.

EXAMPLES
    To update the display name of a SCIM token with ID my-token under tenant
    my-tenant provider my-provider in pool my-pool located in global:

        $ gcloud iam workforce-pools providers scim-tenants tokens update \
            my-token --location=global --workforce-pool=my-pool \
            --provider=my-provider --scim-tenant=my-tenant \
            --display-name="New display name"

POSITIONAL ARGUMENTS
     Workforce pool provider scim token resource - The SCIM token to update.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       TOKEN
          ID of the workforce pool provider scim token or fully qualified
          identifier for the workforce pool provider scim token.

          To set the token attribute:
          + provide the argument token on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the workforce pool.

          To set the location attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --provider=PROVIDER
          The ID to use for the workforce pool provider, which becomes the
          final component of the resource name. This value must be unique
          within the workforce pool, 4-32 characters in length, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the provider attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --provider on the command line.

       --scim-tenant=SCIM_TENANT
          The ID for the SCIM tenant, which becomes the final component of the
          resource name. This value must be 4-32 characters, alphanumeric
          ([a-z0-9-]), and cannot start with gcp-.

          To set the scim-tenant attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --scim-tenant on the command line.

       --workforce-pool=WORKFORCE_POOL
          The ID to use for the workforce pool, which becomes the final
          component of the resource name. This value must be a globally unique
          string of 6 to 63 lowercase letters, digits, or hyphens. It must
          start with a letter, and cannot have a trailing hyphen. The prefix
          gcp- is reserved for use by Google, and may not be specified.

          To set the workforce-pool attribute:
          + provide the argument token on the command line with a fully
            specified name;
          + provide the argument --workforce-pool on the command line.

REQUIRED FLAGS
     --display-name=DISPLAY_NAME
        Optional, user-specified display name for the SCIM token (max 32
        characters).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    These variants are also available:

        $ gcloud alpha iam workforce-pools providers scim-tenants tokens \
            update

        $ gcloud beta iam workforce-pools providers scim-tenants tokens \
            update
```

### gcloud beta iam workforce-pools providers scim-tenants tokens create

```text
NAME
    gcloud beta iam workforce-pools providers scim-tenants tokens create -
        create an IAM workforce identity pool provider SCIM tenant token

SYNOPSIS
    gcloud beta iam workforce-pools providers scim-tenants tokens create
        (TOKEN : --location=LOCATION --provider=PROVIDER
          --scim-tenant=SCIM_TENANT --workforce-pool=WORKFORCE_POOL)
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam workforce-pools providers scim-tenants tokens delete

```text
NAME
    gcloud beta iam workforce-pools providers scim-tenants tokens delete -
        delete an IAM workforce identity pool provider SCIM tenant token

SYNOPSIS
    gcloud beta iam workforce-pools providers scim-tenants tokens delete
        (TOKEN : --location=LOCATION --provider=PROVIDER
          --scim-tenant=SCIM_TENANT --workforce-pool=WORKFORCE_POOL)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam workforce-pools providers scim-tenants tokens describe

```text
NAME
    gcloud beta iam workforce-pools providers scim-tenants tokens describe -
        describe an IAM workforce identity pool provider SCIM tenant token

SYNOPSIS
    gcloud beta iam workforce-pools providers scim-tenants tokens describe
        (TOKEN : --location=LOCATION --provider=PROVIDER
          --scim-tenant=SCIM_TENANT --workforce-pool=WORKFORCE_POOL)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam workforce-pools providers scim-tenants tokens list

```text
NAME
    gcloud beta iam workforce-pools providers scim-tenants tokens list - list
        IAM workforce identity pool provider SCIM tenant tokens

SYNOPSIS
    gcloud beta iam workforce-pools providers scim-tenants tokens list
        (--scim-tenant=SCIM_TENANT : --location=LOCATION
          --provider=PROVIDER --workforce-pool=WORKFORCE_POOL) [--show-deleted]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam workforce-pools providers scim-tenants tokens update

```text
NAME
    gcloud beta iam workforce-pools providers scim-tenants tokens update -
        update an IAM workforce identity pool provider SCIM tenant token

SYNOPSIS
    gcloud beta iam workforce-pools providers scim-tenants tokens update
        (TOKEN : --location=LOCATION --provider=PROVIDER
          --scim-tenant=SCIM_TENANT --workforce-pool=WORKFORCE_POOL)
        --display-name=DISPLAY_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam workforce-pools providers scim-tenants tokens create

```text
NAME
    gcloud alpha iam workforce-pools providers scim-tenants tokens create -
        create an IAM workforce identity pool provider SCIM tenant token

SYNOPSIS
    gcloud alpha iam workforce-pools providers scim-tenants tokens create
        (TOKEN : --location=LOCATION --provider=PROVIDER
          --scim-tenant=SCIM_TENANT --workforce-pool=WORKFORCE_POOL)
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam workforce-pools providers scim-tenants tokens delete

```text
NAME
    gcloud alpha iam workforce-pools providers scim-tenants tokens delete -
        delete an IAM workforce identity pool provider SCIM tenant token

SYNOPSIS
    gcloud alpha iam workforce-pools providers scim-tenants tokens delete
        (TOKEN : --location=LOCATION --provider=PROVIDER
          --scim-tenant=SCIM_TENANT --workforce-pool=WORKFORCE_POOL)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam workforce-pools providers scim-tenants tokens describe

```text
NAME
    gcloud alpha iam workforce-pools providers scim-tenants tokens describe -
        describe an IAM workforce identity pool provider SCIM tenant token

SYNOPSIS
    gcloud alpha iam workforce-pools providers scim-tenants tokens describe
        (TOKEN : --location=LOCATION --provider=PROVIDER
          --scim-tenant=SCIM_TENANT --workforce-pool=WORKFORCE_POOL)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam workforce-pools providers scim-tenants tokens list

```text
NAME
    gcloud alpha iam workforce-pools providers scim-tenants tokens list - list
        IAM workforce identity pool provider SCIM tenant tokens

SYNOPSIS
    gcloud alpha iam workforce-pools providers scim-tenants tokens list
        (--scim-tenant=SCIM_TENANT : --location=LOCATION
          --provider=PROVIDER --workforce-pool=WORKFORCE_POOL) [--show-deleted]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam workforce-pools providers scim-tenants tokens update

```text
NAME
    gcloud alpha iam workforce-pools providers scim-tenants tokens update -
        update an IAM workforce identity pool provider SCIM tenant token

SYNOPSIS
    gcloud alpha iam workforce-pools providers scim-tenants tokens update
        (TOKEN : --location=LOCATION --provider=PROVIDER
          --scim-tenant=SCIM_TENANT --workforce-pool=WORKFORCE_POOL)
        --display-name=DISPLAY_NAME [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workforce-pools/providers/scim-tenants/tokens (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
