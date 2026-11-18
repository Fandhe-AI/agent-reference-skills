---
source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/authorized-orgs
---

# gcloud access-context-manager authorized-orgs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud access-context-manager authorized-orgs create

```text
NAME
    gcloud access-context-manager authorized-orgs create - create a new
        authorized organizations description

SYNOPSIS
    gcloud access-context-manager authorized-orgs create
        (AUTHORIZED_ORGS_DESC : --policy=POLICY) --asset_type=ASSET_TYPE
        --authorization_direction=AUTHORIZATION_DIRECTION
        --authorization_type=AUTHORIZATION_TYPE [--async] [--orgs=[ORGS,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new authorized organizations description in a given access policy.

EXAMPLES
    To create a new authorized organizations description:

        $ gcloud access-context-manager authorized-orgs create \
            --orgs=organizations/12345 --policy=9876543

POSITIONAL ARGUMENTS
     Authorized orgs desc resource - The authorized organizations description
     to create. The arguments in this group can be used to specify the
     attributes of this resource.

     This must be specified.

       AUTHORIZED_ORGS_DESC
          ID of the authorized-orgs-desc or fully qualified identifier for the
          authorized-orgs-desc.

          To set the authorized_orgs_desc attribute:
          + provide the argument authorized_orgs_desc on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --policy=POLICY
          The ID of the access policy.

          To set the policy attribute:
          + provide the argument authorized_orgs_desc on the command line
            with a fully specified name;
          + provide the argument --policy on the command line;
          + set the property access_context_manager/policy;
          + automatically, if the current account belongs to an organization
            with exactly one access policy..

REQUIRED FLAGS
     --asset_type=ASSET_TYPE
        The asset type of this authorized organizations description. For
        example, device, or credential strength. ASSET_TYPE must be one of:
        asset-type-credential-strength, asset-type-device,
        asset-type-unspecified.

     --authorization_direction=AUTHORIZATION_DIRECTION
        Authorization direction of this authorization relationship. Specifies
        whether to allow specified organizations to evaluate this
        organization's traffic, or allow specified organizations traffic to be
        evaluated by this org. AUTHORIZATION_DIRECTION must be one of:
        authorization-direction-from, authorization-direction-to,
        authorization-direction-unspecified.

     --authorization_type=AUTHORIZATION_TYPE
        The authorization type of the authorized organizations description. For
        example, trust, troubleshooting or logging. AUTHORIZATION_TYPE must be
        one of: authorization-type-trust, authorization-type-unspecified.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --orgs=[ORGS,...]
        Comma-separated list of organizations (in the following format:
        organizations/<organizationnumber>).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    This variant is also available:

        $ gcloud alpha access-context-manager authorized-orgs create
```

### gcloud access-context-manager authorized-orgs delete

```text
NAME
    gcloud access-context-manager authorized-orgs delete - delete an authorized
        organizations description

SYNOPSIS
    gcloud access-context-manager authorized-orgs delete
        (AUTHORIZED_ORGS_DESC : --policy=POLICY) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an authorized organizations description in a given access policy.

EXAMPLES
    To delete an existing authorized organizations description, run:

        $ gcloud access-context-manager authorized-orgs delete \
            my_authorized_orgs_desc_id

POSITIONAL ARGUMENTS
     Authorized orgs desc resource - The authorized organizations description
     you want to delete. The arguments in this group can be used to specify the
     attributes of this resource.

     This must be specified.

       AUTHORIZED_ORGS_DESC
          ID of the authorized-orgs-desc or fully qualified identifier for the
          authorized-orgs-desc.

          To set the authorized_orgs_desc attribute:
          + provide the argument authorized_orgs_desc on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --policy=POLICY
          The ID of the access policy.

          To set the policy attribute:
          + provide the argument authorized_orgs_desc on the command line
            with a fully specified name;
          + provide the argument --policy on the command line;
          + set the property access_context_manager/policy;
          + automatically, if the current account belongs to an organization
            with exactly one access policy..

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    This variant is also available:

        $ gcloud alpha access-context-manager authorized-orgs delete
```

### gcloud access-context-manager authorized-orgs describe

```text
NAME
    gcloud access-context-manager authorized-orgs describe - show details about
        an authorized organizations description

SYNOPSIS
    gcloud access-context-manager authorized-orgs describe
        (AUTHORIZED_ORGS_DESC : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about an existing authorized organizations description.

EXAMPLES
    To get details about an existing authorized organizations description, run:

        $ gcloud access-context-manager authorized-orgs describe \
            my_authorized_orgs_desc_id

POSITIONAL ARGUMENTS
     Authorized orgs desc resource - The authorized organizations description
     for which you want to show details. The arguments in this group can be
     used to specify the attributes of this resource.

     This must be specified.

       AUTHORIZED_ORGS_DESC
          ID of the authorized-orgs-desc or fully qualified identifier for the
          authorized-orgs-desc.

          To set the authorized_orgs_desc attribute:
          + provide the argument authorized_orgs_desc on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --policy=POLICY
          The ID of the access policy.

          To set the policy attribute:
          + provide the argument authorized_orgs_desc on the command line
            with a fully specified name;
          + provide the argument --policy on the command line;
          + set the property access_context_manager/policy;
          + automatically, if the current account belongs to an organization
            with exactly one access policy..

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    This variant is also available:

        $ gcloud alpha access-context-manager authorized-orgs describe
```

### gcloud access-context-manager authorized-orgs list

```text
NAME
    gcloud access-context-manager authorized-orgs list - list authorized
        organizations descriptions

SYNOPSIS
    gcloud access-context-manager authorized-orgs list [--policy=POLICY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all authorized organizations descriptions in an access policy object.

EXAMPLES
    To list authorized organizations description in an access policy, run:

        $ gcloud access-context-manager authorized-orgs list

    This command prints out a list of authorized organizations descriptions in
    a tabular form:

        NAME
        my_authorized_orgs_desc

FLAGS
     Policy resource - The access policy for which you want to list the
     corresponding authorized organizations descriptions. This represents a
     Cloud resource.

     --policy=POLICY
        ID of the policy or fully qualified identifier for the policy.

        To set the policy attribute:
        * provide the argument --policy on the command line;
        * set the property access_context_manager/policy;
        * automatically, if the current account belongs to an organization
          with exactly one access policy..

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
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    This variant is also available:

        $ gcloud alpha access-context-manager authorized-orgs list
```

### gcloud access-context-manager authorized-orgs update

```text
NAME
    gcloud access-context-manager authorized-orgs update - update the
        organizations for an existing authorized organizations description

SYNOPSIS
    gcloud access-context-manager authorized-orgs update
        (AUTHORIZED_ORGS_DESC : --policy=POLICY)
        [--add-orgs=[ORGS,...] | --clear-orgs | --remove-orgs=[ORGS,...]
          | --set-orgs=[ORGS,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command updates an authorized organizations description.

EXAMPLES
    To update the organizations for an authorized organizations description:

        $ gcloud access-context-manager authorized-orgs update \
            my-authorized-orgs \
            --add-orgs="organizations/123,organizations/456"

POSITIONAL ARGUMENTS
     Authorized orgs desc resource - The authorized orgs desc to update. The
     arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       AUTHORIZED_ORGS_DESC
          ID of the authorized_orgs_desc or fully qualified identifier for the
          authorized_orgs_desc.

          To set the authorized_orgs_desc attribute:
          + provide the argument authorized_orgs_desc on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --policy=POLICY
          The ID of the access policy.

          To set the policy attribute:
          + provide the argument authorized_orgs_desc on the command line
            with a fully specified name;
          + provide the argument --policy on the command line;
          + set the property access_context_manager/policy.

FLAGS
     These flags modify the member orgs of this authorized_orgs_desc. Orgs must
     be organizations, in the form organizations/<organizationsnumber>.

     At most one of these can be specified:

       --add-orgs=[ORGS,...]
          Append the given values to the current orgs.

       --clear-orgs
          Empty the current orgs.

       --remove-orgs=[ORGS,...]
          Remove the given values from the current orgs.

       --set-orgs=[ORGS,...]
          Completely replace the current orgs with the given values.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha access-context-manager authorized-orgs update
```

### gcloud alpha access-context-manager authorized-orgs create

```text
NAME
    gcloud alpha access-context-manager authorized-orgs create - create a new
        authorized organizations description

SYNOPSIS
    gcloud alpha access-context-manager authorized-orgs create
        (AUTHORIZED_ORGS_DESC : --policy=POLICY) --asset_type=ASSET_TYPE
        --authorization_direction=AUTHORIZATION_DIRECTION
        --authorization_type=AUTHORIZATION_TYPE [--async] [--orgs=[ORGS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager authorized-orgs delete

```text
NAME
    gcloud alpha access-context-manager authorized-orgs delete - delete an
        authorized organizations description

SYNOPSIS
    gcloud alpha access-context-manager authorized-orgs delete
        (AUTHORIZED_ORGS_DESC : --policy=POLICY) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager authorized-orgs describe

```text
NAME
    gcloud alpha access-context-manager authorized-orgs describe - show details
        about an authorized organizations description

SYNOPSIS
    gcloud alpha access-context-manager authorized-orgs describe
        (AUTHORIZED_ORGS_DESC : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager authorized-orgs list

```text
NAME
    gcloud alpha access-context-manager authorized-orgs list - list authorized
        organizations descriptions

SYNOPSIS
    gcloud alpha access-context-manager authorized-orgs list [--policy=POLICY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager authorized-orgs update

```text
NAME
    gcloud alpha access-context-manager authorized-orgs update - update the
        organizations for an existing authorized organizations description

SYNOPSIS
    gcloud alpha access-context-manager authorized-orgs update
        (AUTHORIZED_ORGS_DESC : --policy=POLICY)
        [--add-orgs=[ORGS,...] | --clear-orgs | --remove-orgs=[ORGS,...]
          | --set-orgs=[ORGS,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Incomplete example: the `gcloud access-context-manager authorized-orgs create` example omits the `AUTHORIZED_ORGS_DESC` positional argument and `--asset_type`, `--authorization_direction` and `--authorization_type`, which the SYNOPSIS requires (gcloud 593.0.0: "argument --policy: AUTHORIZED_ORGS_DESC must be specified."). Add the required arguments (see FLAGS on this page).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/authorized-orgs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
