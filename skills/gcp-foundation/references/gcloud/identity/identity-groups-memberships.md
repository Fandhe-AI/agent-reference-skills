---
source: https://docs.cloud.google.com/sdk/gcloud/reference/identity/groups/memberships
---

# gcloud identity groups memberships

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud identity groups memberships add

```text
NAME
    gcloud identity groups memberships add - create a new membership in an
        existing group

SYNOPSIS
    gcloud identity groups memberships add --group-email=GROUP_EMAIL
        --member-email=MEMBER_EMAIL [--expiration=EXPIRATION]
        [--roles=[ROLES,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new membership in an existing group.

EXAMPLES
    To create a new membership in a group:

        $ gcloud identity groups memberships add \
            --group-email="eng-discuss@foo.com" \
            --member-email="user@foo.com"

REQUIRED FLAGS
     --group-email=GROUP_EMAIL
        The email address of the group the new membership is being added to.

     --member-email=MEMBER_EMAIL
        The email address of the group or user being added to a group.

OPTIONAL FLAGS
     --expiration=EXPIRATION
        Optional time of expiration for the membership. This is given as a
        duration from now, for example '30d', '6m', '3y' for 30 days, 6 months,
        or 3 years respectively.

     --roles=[ROLES,...]
        A comma-separated list of roles for a member within the Group. If not
        specified, MEMBER will be used as a default value.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudidentity/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/identity/

NOTES
    These variants are also available:

        $ gcloud alpha identity groups memberships add

        $ gcloud beta identity groups memberships add
```

### gcloud identity groups memberships check-transitive-membership

```text
NAME
    gcloud identity groups memberships check-transitive-membership - check a
        potential member for transitive membership in a group

SYNOPSIS
    gcloud identity groups memberships check-transitive-membership
        --group-email=GROUP_EMAIL --member-email=MEMBER_EMAIL
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Check a potential member for transitive membership in a group.

EXAMPLES
    To check if a potential member has a transitive membership in a group.

        $ gcloud identity groups memberships check-transitive-membership \
            --group-email=eng@foo.com --member-email=eng-discuss@foo.com

REQUIRED FLAGS
     --group-email=GROUP_EMAIL
        The email address of the group to check transitive membership for.

     --member-email=MEMBER_EMAIL
        The email address of the member to check transitive membership for.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudidentity/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/identity/

NOTES
    These variants are also available:

        $ gcloud alpha identity groups memberships \
            check-transitive-membership

        $ gcloud beta identity groups memberships check-transitive-membership
```

### gcloud identity groups memberships delete

```text
NAME
    gcloud identity groups memberships delete - delete a membership from an
        existing group

SYNOPSIS
    gcloud identity groups memberships delete --group-email=GROUP_EMAIL
        --member-email=MEMBER_EMAIL [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a membership from an existing group.

EXAMPLES
    To delete a memberships from a group:

        $ gcloud identity groups memberships delete \
            --group-email="eng-discuss@foo.com" \
            --member-email="user@foo.com"

REQUIRED FLAGS
     --group-email=GROUP_EMAIL
        The email address of the group the new membership is being removed
        from.

     --member-email=MEMBER_EMAIL
        The email address of the group or user being removed from the group
        identified by group-email.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudidentity/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/identity/

NOTES
    These variants are also available:

        $ gcloud alpha identity groups memberships delete

        $ gcloud beta identity groups memberships delete
```

### gcloud identity groups memberships describe

```text
NAME
    gcloud identity groups memberships describe - describe a membership in a
        group

SYNOPSIS
    gcloud identity groups memberships describe --group-email=GROUP_EMAIL
        --member-email=MEMBER_EMAIL [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a membership in a group.

EXAMPLES
    To describe a membership in a group:

        $ gcloud identity groups memberships describe \
            --group-email="eng-discuss@foo.com" \
            --member-email="user@foo.com"

REQUIRED FLAGS
     --group-email=GROUP_EMAIL
        The email address of the group whose membership is being described.

     --member-email=MEMBER_EMAIL
        The email address of the member whose membership is being described.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudidentity/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/identity/

NOTES
    These variants are also available:

        $ gcloud alpha identity groups memberships describe

        $ gcloud beta identity groups memberships describe
```

### gcloud identity groups memberships get-membership-graph

```text
NAME
    gcloud identity groups memberships get-membership-graph - get a membership
        graph of just a member or both a member and a group

SYNOPSIS
    gcloud identity groups memberships get-membership-graph --labels=LABELS
        --member-email=MEMBER_EMAIL [--group-email=GROUP_EMAIL]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get a membership graph of just a member or both a member and a group.

EXAMPLES
    To get a membership graph of just a member.

        $ gcloud identity groups memberships get-membership-graph \
            --member-email=eng-discuss@foo.com \
            --labels=cloudidentity.googleapis.com/groups.discussion_forum

    To get a membership graph between a member and a group.

        $ gcloud identity groups memberships get-membership-graph \
            --member-email=eng-discuss@foo.com --group-email=eng@foo.com \
            --labels=cloudidentity.googleapis.com/groups.discussion_forum

REQUIRED FLAGS
     --labels=LABELS
        The labels of the groups in the membership graph.

     --member-email=MEMBER_EMAIL
        The email address of the member to get the membership graph for.

OPTIONAL FLAGS
     --group-email=GROUP_EMAIL
        The email address of the group to constrain the membership graph with.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudidentity/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/identity/

NOTES
    These variants are also available:

        $ gcloud alpha identity groups memberships get-membership-graph

        $ gcloud beta identity groups memberships get-membership-graph
```

### gcloud identity groups memberships list

```text
NAME
    gcloud identity groups memberships list - list memberships in an existing
        group

SYNOPSIS
    gcloud identity groups memberships list --group-email=GROUP_EMAIL
        [--page-token=PAGE_TOKEN] [--view=VIEW; default="basic"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List memberships in an existing group.

EXAMPLES
    To list memberships of a group:

        $ gcloud identity groups memberships list \
            --group-email="eng-discuss@foo.com" --limit=50

REQUIRED FLAGS
     --group-email=GROUP_EMAIL
        The email address of the group to show members for.

FLAGS
     --page-token=PAGE_TOKEN
        The next_page_token value returned from a previous list request, if
        any.

     --view=VIEW; default="basic"
        There are two possible views, 'basic' and 'full', default is 'basic'.
        VIEW must be one of:

         basic
            Response only basic information of the Groups. (e.g.
            'display_name', 'name')

         full
            Response includes all the fields of the Groups

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
    This command uses the cloudidentity/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/identity/

NOTES
    These variants are also available:

        $ gcloud alpha identity groups memberships list

        $ gcloud beta identity groups memberships list
```

### gcloud identity groups memberships modify-membership-roles

```text
NAME
    gcloud identity groups memberships modify-membership-roles -
        add/remove/modify membership roles of a membership in a group

SYNOPSIS
    gcloud identity groups memberships modify-membership-roles
        --group-email=GROUP_EMAIL --member-email=MEMBER_EMAIL
        [--update-roles-params=UPDATE_ROLES_PARAMS
          | --add-roles=ADD_ROLES --remove-roles=[REMOVE_ROLES,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add/remove/modify membership roles OR update expiry details of membership
    in a group.

EXAMPLES
    To add a new membership role to an existing group-member pair.

        $ gcloud identity groups memberships modify-membership-roles \
            --group-email="eng-discuss@foo.com" \
            --member-email="user@foo.com" --add-roles=OWNER

REQUIRED FLAGS
     --group-email=GROUP_EMAIL
        The email address of the group that member-email belongs to.

     --member-email=MEMBER_EMAIL
        The email address of the group or user that is being updated

OPTIONAL FLAGS
     At most one of these can be specified:

       --update-roles-params=UPDATE_ROLES_PARAMS
          Resource representing the parameters to update membership roles. An
          example would be --update-roles-params
          MEMBER=expiry_details.expire_time.

       Or at least one of these can be specified:

         --add-roles=ADD_ROLES
            Membership roles to be added. Currently supported MembershipRole:
            'MEMBER', 'OWNER', 'MANAGER'.

         --remove-roles=[REMOVE_ROLES,...]
            Membership role names to be removed. Currently supported
            MembershipRole: 'OWNER', 'MANAGER'. MEMBER-less owner is not
            supported so removing just MEMBER role won't be possible.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudidentity/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/identity/

NOTES
    These variants are also available:

        $ gcloud alpha identity groups memberships modify-membership-roles

        $ gcloud beta identity groups memberships modify-membership-roles
```

### gcloud identity groups memberships search-transitive-groups

```text
NAME
    gcloud identity groups memberships search-transitive-groups - search
        transitive groups of a member

SYNOPSIS
    gcloud identity groups memberships search-transitive-groups --labels=LABELS
        --member-email=MEMBER_EMAIL [--page-size=PAGE_SIZE]
        [--page-token=PAGE_TOKEN] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Search transitive groups of a member.

EXAMPLES
    To search transitive groups of a member.

        $ gcloud identity groups memberships search-transitive-groups \
            --labels=cloudidentity.googleapis.com/groups.discussion_forum \
            --member-email=eng-discuss@foo.com --page-size=10

REQUIRED FLAGS
     --labels=LABELS
        The labels of the transitive groups.

     --member-email=MEMBER_EMAIL
        The email address of the member to search transitive groups for.

OPTIONAL FLAGS
     --page-size=PAGE_SIZE
        The maximum number of results to return.

     --page-token=PAGE_TOKEN
        The next_page_token value returned from a previous search request, if
        any.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudidentity/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/identity/

NOTES
    These variants are also available:

        $ gcloud alpha identity groups memberships search-transitive-groups

        $ gcloud beta identity groups memberships search-transitive-groups
```

### gcloud identity groups memberships search-transitive-memberships

```text
NAME
    gcloud identity groups memberships search-transitive-memberships - search
        transitive memberships of a group

SYNOPSIS
    gcloud identity groups memberships search-transitive-memberships
        --group-email=GROUP_EMAIL [--page-size=PAGE_SIZE]
        [--page-token=PAGE_TOKEN] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Search transitive memberships of a group.

EXAMPLES
    To search transitive memberships of a group.        $ gcloud identity groups memberships search-transitive-memberships \
            --group-email=eng@foo.com --page-size=10

REQUIRED FLAGS
     --group-email=GROUP_EMAIL
        The email address of the group to search transitive memberships for.

OPTIONAL FLAGS
     --page-size=PAGE_SIZE
        The maximum number of results to return.

     --page-token=PAGE_TOKEN
        The next_page_token value returned from a previous search request, if
        any.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudidentity/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/identity/

NOTES
    These variants are also available:

        $ gcloud alpha identity groups memberships \
            search-transitive-memberships

        $ gcloud beta identity groups memberships \
            search-transitive-memberships
```

### gcloud beta identity groups memberships add

```text
NAME
    gcloud beta identity groups memberships add - create a new membership in an
        existing group

SYNOPSIS
    gcloud beta identity groups memberships add --group-email=GROUP_EMAIL
        --member-email=MEMBER_EMAIL [--expiration=EXPIRATION]
        [--organization=ORGANIZATION] [--roles=[ROLES,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta identity groups memberships check-transitive-membership

```text
NAME
    gcloud beta identity groups memberships check-transitive-membership - check
        a potential member for transitive membership in a group

SYNOPSIS
    gcloud beta identity groups memberships check-transitive-membership
        --group-email=GROUP_EMAIL --member-email=MEMBER_EMAIL
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta identity groups memberships delete

```text
NAME
    gcloud beta identity groups memberships delete - delete a membership from
        an existing group

SYNOPSIS
    gcloud beta identity groups memberships delete --group-email=GROUP_EMAIL
        --member-email=MEMBER_EMAIL [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta identity groups memberships describe

```text
NAME
    gcloud beta identity groups memberships describe - describe a membership in
        a group

SYNOPSIS
    gcloud beta identity groups memberships describe --group-email=GROUP_EMAIL
        --member-email=MEMBER_EMAIL [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta identity groups memberships get-membership-graph

```text
NAME
    gcloud beta identity groups memberships get-membership-graph - get a
        membership graph of just a member or both a member and a group

SYNOPSIS
    gcloud beta identity groups memberships get-membership-graph
        --labels=LABELS --member-email=MEMBER_EMAIL [--group-email=GROUP_EMAIL]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta identity groups memberships list

```text
NAME
    gcloud beta identity groups memberships list - list memberships in an
        existing group

SYNOPSIS
    gcloud beta identity groups memberships list --group-email=GROUP_EMAIL
        [--page-token=PAGE_TOKEN] [--view=VIEW; default="basic"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta identity groups memberships modify-membership-roles

```text
NAME
    gcloud beta identity groups memberships modify-membership-roles -
        add/remove/modify membership roles of a membership in a group

SYNOPSIS
    gcloud beta identity groups memberships modify-membership-roles
        --group-email=GROUP_EMAIL --member-email=MEMBER_EMAIL
        [--update-roles-params=UPDATE_ROLES_PARAMS
          | --add-roles=ADD_ROLES --remove-roles=[REMOVE_ROLES,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta identity groups memberships search-transitive-groups

```text
NAME
    gcloud beta identity groups memberships search-transitive-groups - search
        transitive groups of a member

SYNOPSIS
    gcloud beta identity groups memberships search-transitive-groups
        --labels=LABELS --member-email=MEMBER_EMAIL [--page-size=PAGE_SIZE]
        [--page-token=PAGE_TOKEN] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta identity groups memberships search-transitive-memberships

```text
NAME
    gcloud beta identity groups memberships search-transitive-memberships -
        search transitive memberships of a group

SYNOPSIS
    gcloud beta identity groups memberships search-transitive-memberships
        --group-email=GROUP_EMAIL [--page-size=PAGE_SIZE]
        [--page-token=PAGE_TOKEN] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha identity groups memberships add

```text
NAME
    gcloud alpha identity groups memberships add - create a new membership in
        an existing group

SYNOPSIS
    gcloud alpha identity groups memberships add --group-email=GROUP_EMAIL
        --member-email=MEMBER_EMAIL [--expiration=EXPIRATION]
        [--organization=ORGANIZATION] [--roles=[ROLES,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha identity groups memberships check-transitive-membership

```text
NAME
    gcloud alpha identity groups memberships check-transitive-membership -
        check a potential member for transitive membership in a group

SYNOPSIS
    gcloud alpha identity groups memberships check-transitive-membership
        --group-email=GROUP_EMAIL --member-email=MEMBER_EMAIL
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha identity groups memberships delete

```text
NAME
    gcloud alpha identity groups memberships delete - delete a membership from
        an existing group

SYNOPSIS
    gcloud alpha identity groups memberships delete --group-email=GROUP_EMAIL
        --member-email=MEMBER_EMAIL [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha identity groups memberships describe

```text
NAME
    gcloud alpha identity groups memberships describe - describe a membership
        in a group

SYNOPSIS
    gcloud alpha identity groups memberships describe --group-email=GROUP_EMAIL
        --member-email=MEMBER_EMAIL [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha identity groups memberships get-membership-graph

```text
NAME
    gcloud alpha identity groups memberships get-membership-graph - get a
        membership graph of just a member or both a member and a group

SYNOPSIS
    gcloud alpha identity groups memberships get-membership-graph
        --labels=LABELS --member-email=MEMBER_EMAIL [--group-email=GROUP_EMAIL]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha identity groups memberships list

```text
NAME
    gcloud alpha identity groups memberships list - list memberships in an
        existing group

SYNOPSIS
    gcloud alpha identity groups memberships list --group-email=GROUP_EMAIL
        [--page-token=PAGE_TOKEN] [--view=VIEW; default="basic"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha identity groups memberships modify-membership-roles

```text
NAME
    gcloud alpha identity groups memberships modify-membership-roles -
        add/remove/modify membership roles of a membership in a group

SYNOPSIS
    gcloud alpha identity groups memberships modify-membership-roles
        --group-email=GROUP_EMAIL --member-email=MEMBER_EMAIL
        [--update-roles-params=UPDATE_ROLES_PARAMS
          | --add-roles=ADD_ROLES --remove-roles=[REMOVE_ROLES,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha identity groups memberships search-transitive-groups

```text
NAME
    gcloud alpha identity groups memberships search-transitive-groups - search
        transitive groups of a member

SYNOPSIS
    gcloud alpha identity groups memberships search-transitive-groups
        --labels=LABELS --member-email=MEMBER_EMAIL [--page-size=PAGE_SIZE]
        [--page-token=PAGE_TOKEN] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha identity groups memberships search-transitive-memberships

```text
NAME
    gcloud alpha identity groups memberships search-transitive-memberships -
        search transitive memberships of a group

SYNOPSIS
    gcloud alpha identity groups memberships search-transitive-memberships
        --group-email=GROUP_EMAIL [--page-size=PAGE_SIZE]
        [--page-token=PAGE_TOKEN] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/identity/groups/memberships (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
