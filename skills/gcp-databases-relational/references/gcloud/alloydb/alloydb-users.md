---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/users
---

# gcloud alloydb users

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alloydb users create

```text
NAME
    gcloud alloydb users create - creates a user in a given cluster

SYNOPSIS
    gcloud alloydb users create USERNAME --cluster=CLUSTER --region=REGION
        [--db-roles=[ROLE,...]] [--keep-extra-roles=KEEP_EXTRA_ROLES]
        [--password=PASSWORD] [--superuser=SUPERUSER]
        [--type=TYPE; default="BUILT_IN"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a user in a given cluster with specified username, cluster, region,
    type, and password.

EXAMPLES
    To create a new user, run:

        $ gcloud alloydb users create my-username --cluster=my-cluster \
            --region=us-central1 --password=postgres

POSITIONAL ARGUMENTS
     USERNAME
        AlloyDB username

REQUIRED FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

OPTIONAL FLAGS
     --db-roles=[ROLE,...]
        Comma separated list of database roles this new user will be granted
        upon creation.

     --keep-extra-roles=KEEP_EXTRA_ROLES
        If the user already exists and has extra roles, keep them.

     --password=PASSWORD
        Password for this database user.

     --superuser=SUPERUSER
        If true, new user will have AlloyDB superuser privileges. Default value
        is false.

     --type=TYPE; default="BUILT_IN"
        Type corresponds to the user type. TYPE must be one of:

         BUILT_IN
            This database user can authenticate via password-based
            authentication
         IAM_BASED
            This database user can authenticate via IAM-based authentication
         IAM_GROUP
            This database user represents an IAM group whose members can
            authenticate via IAM group-based authentication

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb users create

        $ gcloud beta alloydb users create
```

### gcloud alloydb users delete

```text
NAME
    gcloud alloydb users delete - deletes an AlloyDB user in a given cluster

SYNOPSIS
    gcloud alloydb users delete USERNAME --cluster=CLUSTER --region=REGION
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes an AlloyDB user in a given cluster.

EXAMPLES
    To delete an user, run:

        $ gcloud alloydb users delete my-username --cluster=my-cluster \
            --region=us-central1

POSITIONAL ARGUMENTS
     USERNAME
        AlloyDB username

REQUIRED FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb users delete

        $ gcloud beta alloydb users delete
```

### gcloud alloydb users list

```text
NAME
    gcloud alloydb users list - lists AlloyDB users in a given cluster

SYNOPSIS
    gcloud alloydb users list --cluster=CLUSTER --region=REGION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists AlloyDB users in a given cluster.

    Note: Users or roles configured with NOLOGIN are filtered out of the
    returned list.

EXAMPLES
    To list users, run:

        $ gcloud alloydb users list --cluster=my-cluster --region=us-central1

REQUIRED FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

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

        $ gcloud alpha alloydb users list

        $ gcloud beta alloydb users list
```

### gcloud alloydb users set-password

```text
NAME
    gcloud alloydb users set-password - update an AlloyDB user's password
        within a given cluster and region

SYNOPSIS
    gcloud alloydb users set-password USERNAME --cluster=CLUSTER
        --password=PASSWORD --region=REGION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an AlloyDB user's password within a given cluster and region.

EXAMPLES
    To update a user's password, run:

        $ gcloud alloydb users set-password my-username \
            --cluster=my-cluster --region=us-central1 --password=postgres

POSITIONAL ARGUMENTS
     USERNAME
        AlloyDB username

REQUIRED FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --password=PASSWORD
        Password for this database user.

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb users set-password

        $ gcloud beta alloydb users set-password
```

### gcloud alloydb users set-roles

```text
NAME
    gcloud alloydb users set-roles - update an AlloyDB user's database roles
        within a given cluster and region

SYNOPSIS
    gcloud alloydb users set-roles USERNAME --cluster=CLUSTER
        --db-roles=[ROLE,...] --region=REGION
        [--keep-extra-roles=KEEP_EXTRA_ROLES] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an AlloyDB user's database roles within a given cluster and region.

EXAMPLES
    To update a user's database roles, run:

        $ gcloud alloydb users set-roles my-username --cluster=my-cluster \
            --region=us-central1 --db-roles=role1,role2

POSITIONAL ARGUMENTS
     USERNAME
        AlloyDB username

REQUIRED FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --db-roles=[ROLE,...]
        Comma separated list of database roles this new user will be granted
        upon creation.

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

OPTIONAL FLAGS
     --keep-extra-roles=KEEP_EXTRA_ROLES
        If the user already exists and has extra roles, keep them.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb users set-roles

        $ gcloud beta alloydb users set-roles
```

### gcloud alloydb users set-superuser

```text
NAME
    gcloud alloydb users set-superuser - update an AlloyDB user's superuser
        role within a given cluster and region

SYNOPSIS
    gcloud alloydb users set-superuser USERNAME --cluster=CLUSTER
        --region=REGION --superuser=SUPERUSER [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an AlloyDB user's superuser role within a given cluster and region.

EXAMPLES
    To update a user's superuser role, run:

        $ gcloud alloydb users set-superuser my-username \
            --cluster=my-cluster --region=us-central1 --superuser=true/false

POSITIONAL ARGUMENTS
     USERNAME
        AlloyDB username

REQUIRED FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

     --superuser=SUPERUSER
        If true, user will have AlloyDB superuser privileges

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb users set-superuser

        $ gcloud beta alloydb users set-superuser
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud alloydb users set-superuser my-username \
    --cluster=my-cluster \
    --region=us-central1 \
    --superuser=true
```

### gcloud beta alloydb users create

```text
NAME
    gcloud beta alloydb users create - creates a user in a given cluster

SYNOPSIS
    gcloud beta alloydb users create USERNAME --cluster=CLUSTER --region=REGION
        [--db-roles=[ROLE,...]] [--keep-extra-roles=KEEP_EXTRA_ROLES]
        [--password=PASSWORD] [--superuser=SUPERUSER]
        [--type=TYPE; default="BUILT_IN"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb users delete

```text
NAME
    gcloud beta alloydb users delete - deletes an AlloyDB user in a given
        cluster

SYNOPSIS
    gcloud beta alloydb users delete USERNAME --cluster=CLUSTER --region=REGION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb users list

```text
NAME
    gcloud beta alloydb users list - lists AlloyDB users in a given cluster

SYNOPSIS
    gcloud beta alloydb users list --cluster=CLUSTER --region=REGION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb users set-password

```text
NAME
    gcloud beta alloydb users set-password - update an AlloyDB user's password
        within a given cluster and region

SYNOPSIS
    gcloud beta alloydb users set-password USERNAME --cluster=CLUSTER
        --password=PASSWORD --region=REGION [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb users set-roles

```text
NAME
    gcloud beta alloydb users set-roles - update an AlloyDB user's database
        roles within a given cluster and region

SYNOPSIS
    gcloud beta alloydb users set-roles USERNAME --cluster=CLUSTER
        --db-roles=[ROLE,...] --region=REGION
        [--keep-extra-roles=KEEP_EXTRA_ROLES] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb users set-superuser

```text
NAME
    gcloud beta alloydb users set-superuser - update an AlloyDB user's
        superuser role within a given cluster and region

SYNOPSIS
    gcloud beta alloydb users set-superuser USERNAME --cluster=CLUSTER
        --region=REGION --superuser=SUPERUSER [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb users create

```text
NAME
    gcloud alpha alloydb users create - creates a user in a given cluster

SYNOPSIS
    gcloud alpha alloydb users create USERNAME --cluster=CLUSTER
        --region=REGION [--db-roles=[ROLE,...]]
        [--keep-extra-roles=KEEP_EXTRA_ROLES] [--password=PASSWORD]
        [--superuser=SUPERUSER] [--type=TYPE; default="BUILT_IN"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb users delete

```text
NAME
    gcloud alpha alloydb users delete - deletes an AlloyDB user in a given
        cluster

SYNOPSIS
    gcloud alpha alloydb users delete USERNAME --cluster=CLUSTER
        --region=REGION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb users list

```text
NAME
    gcloud alpha alloydb users list - lists AlloyDB users in a given cluster

SYNOPSIS
    gcloud alpha alloydb users list --cluster=CLUSTER --region=REGION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb users set-password

```text
NAME
    gcloud alpha alloydb users set-password - update an AlloyDB user's password
        within a given cluster and region

SYNOPSIS
    gcloud alpha alloydb users set-password USERNAME --cluster=CLUSTER
        --password=PASSWORD --region=REGION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb users set-roles

```text
NAME
    gcloud alpha alloydb users set-roles - update an AlloyDB user's database
        roles within a given cluster and region

SYNOPSIS
    gcloud alpha alloydb users set-roles USERNAME --cluster=CLUSTER
        --db-roles=[ROLE,...] --region=REGION
        [--keep-extra-roles=KEEP_EXTRA_ROLES] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb users set-superuser

```text
NAME
    gcloud alpha alloydb users set-superuser - update an AlloyDB user's
        superuser role within a given cluster and region

SYNOPSIS
    gcloud alpha alloydb users set-superuser USERNAME --cluster=CLUSTER
        --region=REGION --superuser=SUPERUSER [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `set-superuser` example passes `--superuser=true/false`, the two alternatives written as one value; gcloud 593.0.0 rejects it ("Invalid flag value [true/false], expected one of [true, yes, false, no]"), so the runnable form passes `--superuser=true` (use `--superuser=false` to remove the role).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/users (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
