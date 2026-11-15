---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/roles
---

# gcloud iam roles

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam roles copy

```text
NAME
    gcloud iam roles copy - create a role from an existing role

SYNOPSIS
    gcloud iam roles copy [--dest-organization=DEST_ORGANIZATION]
        [--dest-project=DEST_PROJECT] [--destination=DESTINATION]
        [--source=SOURCE] [--source-organization=SOURCE_ORGANIZATION]
        [--source-project=SOURCE_PROJECT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a role from an existing role.

EXAMPLES
    To create a copy of an existing role spanner.databaseAdmin into an
    organization with 1234567, run:

        $ gcloud iam roles copy --source="roles/spanner.databaseAdmin" \
            --destination=CustomViewer --dest-organization=1234567

    To create a copy of an existing role spanner.databaseAdmin into a project
    with PROJECT_ID, run:

        $ gcloud iam roles copy --source="roles/spanner.databaseAdmin" \
            --destination=CustomSpannerDbAdmin --dest-project=PROJECT_ID

    To modify the newly created role see the roles update command.

FLAGS
     --dest-organization=DEST_ORGANIZATION
        The organization of the destination role.

     --dest-project=DEST_PROJECT
        The project of the destination role.

     --destination=DESTINATION
        The destination role ID for the new custom role. For example: viewer.

     --source=SOURCE
        The source role ID. For predefined roles, for example: roles/viewer.
        For custom roles, for example: myCompanyAdmin.

     --source-organization=SOURCE_ORGANIZATION
        The organization of the source role if it is an custom role.

     --source-project=SOURCE_PROJECT
        The project of the source role if it is an custom role.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam roles copy

        $ gcloud beta iam roles copy
```

### gcloud iam roles create

```text
NAME
    gcloud iam roles create - create a custom role for a project or an
        organization

SYNOPSIS
    gcloud iam roles create ROLE_ID
        (--organization=ORGANIZATION | --project=PROJECT_ID)
        [--file=FILE | --description=DESCRIPTION
          --permissions=PERMISSIONS --stage=STAGE --title=TITLE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a custom role with the provided information.

EXAMPLES
    To create a custom role ProjectUpdater from a YAML file, run:

        $ gcloud iam roles create ProjectUpdater --organization=12345 \
            --file=role_file_path

    To create a custom role ProjectUpdater with flags, run:

        $ gcloud iam roles create ProjectUpdater --project=myproject \
            --title=ProjectUpdater \
            --description="Have access to get and update the project" \
            --permissions=resourcemanager.projects.get,\
        resourcemanager.projects.update

POSITIONAL ARGUMENTS
     ROLE_ID
        ID of the custom role to create. You must also specify the
        --organization or --project flag.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --organization=ORGANIZATION
          Organization of the role you want to create.

       --project=PROJECT_ID
          Project of the role you want to create.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

OPTIONAL FLAGS
     At most one of these can be specified:

       --file=FILE
          The JSON or YAML file with the IAM Role to create. See
          https://docs.cloud.google.com/iam/docs/reference/rest/v1/projects.roles.

       Or at least one of these can be specified:

         Roles Settings

         --description=DESCRIPTION
            The description of the role you want to create.

         --permissions=PERMISSIONS
            The permissions of the role you want to create. Use commas to
            separate them.

         --stage=STAGE
            The state of the role you want to create. This represents a role's
            lifecycle phase: ALPHA, BETA, GA, DEPRECATED, DISABLED, EAP.

         --title=TITLE
            The title of the role you want to create.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam roles create

        $ gcloud beta iam roles create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud iam roles create ProjectUpdater \
    --project=myproject \
    --title=ProjectUpdater \
    --description="Have access to get and update the project" \
    --permissions=resourcemanager.projects.get,resourcemanager.projects.update
```

### gcloud iam roles delete

```text
NAME
    gcloud iam roles delete - delete a custom role from an organization or a
        project

SYNOPSIS
    gcloud iam roles delete ROLE_ID
        (--organization=ORGANIZATION | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command deletes a role.

    This command can fail for the following reasons:
      o The role specified does not exist.
      o The active user does not have permission to access the given role.

EXAMPLES
    To delete the role ProjectUpdater of the organization 1234567, run:

        $ gcloud iam roles delete ProjectUpdater --organization=1234567

    To delete the role ProjectUpdater of the project myproject, run:

        $ gcloud iam roles delete ProjectUpdater --project=myproject

POSITIONAL ARGUMENTS
     ROLE_ID
        ID of the custom role to delete. You must also specify the
        --organization or --project flag.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --organization=ORGANIZATION
          Organization of the role you want to delete.

       --project=PROJECT_ID
          Project of the role you want to delete.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam roles delete

        $ gcloud beta iam roles delete
```

### gcloud iam roles describe

```text
NAME
    gcloud iam roles describe - show metadata for a role

SYNOPSIS
    gcloud iam roles describe ROLE_ID
        [--organization=ORGANIZATION | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command shows metadata for a role.

    This command can fail for the following reasons:
      o The role specified does not exist.
      o The active user does not have permission to access the given role.

EXAMPLES
    To print metadata for the role spanner.databaseAdmin of the organization
    1234567, run:

        $ gcloud iam roles describe roles/spanner.databaseAdmin \
            --organization=1234567

    To print metadata for the role spanner.databaseAdmin of the project
    myproject, run:

        $ gcloud iam roles describe roles/spanner.databaseAdmin \
            --project=myproject

    To print metadata for a predefined role, spanner.databaseAdmin, run:

        $ gcloud iam roles describe roles/spanner.databaseAdmin

POSITIONAL ARGUMENTS
     ROLE_ID
        ID of the role to describe. Curated roles example: roles/viewer. Custom
        roles example: CustomRole. For custom roles, you must also specify the
        --organization or --project flag.

FLAGS
     At most one of these can be specified:

       --organization=ORGANIZATION
          Organization of the role you want to describe.

       --project=PROJECT_ID
          Project of the role you want to describe.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam roles describe

        $ gcloud beta iam roles describe
```

### gcloud iam roles list

```text
NAME
    gcloud iam roles list - list predefined roles, or the custom roles for an
        organization or project

SYNOPSIS
    gcloud iam roles list [--show-deleted]
        [--organization=ORGANIZATION | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    When an organization or project is specified, this command lists the custom
    roles that are defined for that organization or project.

    Otherwise, this command lists IAM's predefined roles.

EXAMPLES
    To list custom roles for the organization 12345, run:

        $ gcloud iam roles list --organization=12345

    To list custom roles for the project myproject, run:

        $ gcloud iam roles list --project=myproject

    To list all predefined roles, run:

        $ gcloud iam roles list

FLAGS
     --show-deleted
        Show deleted roles by specifying this flag.

     At most one of these can be specified:

       --organization=ORGANIZATION
          Organization of the role you want to list.

       --project=PROJECT_ID
          Project of the role you want to list.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

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

NOTES
    These variants are also available:

        $ gcloud alpha iam roles list

        $ gcloud beta iam roles list
```

### gcloud iam roles undelete

```text
NAME
    gcloud iam roles undelete - undelete a custom role from an organization or
        a project

SYNOPSIS
    gcloud iam roles undelete ROLE_ID
        (--organization=ORGANIZATION | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command undeletes a role. Roles that have been deleted for certain
    long time can't be undeleted.

    This command can fail for the following reasons:
      o The role specified does not exist.
      o The active user does not have permission to access the given role.

EXAMPLES
    To undelete the role ProjectUpdater of the organization 1234567, run:

        $ gcloud iam roles undelete ProjectUpdater --organization=1234567

    To undelete the role ProjectUpdater of the project myproject, run:

        $ gcloud iam roles undelete ProjectUpdater --project=myproject

POSITIONAL ARGUMENTS
     ROLE_ID
        ID of the custom role to undelete. You must also specify the
        --organization or --project flag.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --organization=ORGANIZATION
          Organization of the role you want to undelete.

       --project=PROJECT_ID
          Project of the role you want to undelete.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam roles undelete

        $ gcloud beta iam roles undelete
```

### gcloud iam roles update

```text
NAME
    gcloud iam roles update - update an IAM custom role

SYNOPSIS
    gcloud iam roles update ROLE_ID
        (--organization=ORGANIZATION | --project=PROJECT_ID) [--file=FILE]
        [--add-permissions=ADD_PERMISSIONS --description=DESCRIPTION
          --permissions=PERMISSIONS
          --remove-permissions=REMOVE_PERMISSIONS --stage=STAGE --title=TITLE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command updates an IAM custom role.

EXAMPLES
    To update the role ProjectUpdater from a YAML file, run:

        $ gcloud iam roles update ProjectUpdater --organization=123 \
            --file=role_file_path

    To update the role ProjectUpdater with flags, run:

        $ gcloud iam roles update ProjectUpdater --project=myproject \
            --permissions=permission1,permission2

POSITIONAL ARGUMENTS
     ROLE_ID
        ID of the custom role to update. You must also specify the
        --organization or --project flag.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --organization=ORGANIZATION
          Organization of the role you want to update.

       --project=PROJECT_ID
          Project of the role you want to update.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

OPTIONAL FLAGS
     --file=FILE
        The YAML file you want to use to update a role. Can not be specified
        with other flags except role-id.

     The following flags determine the fields need to be updated. You can
     update a role by specifying the following flags, or you can update a role
     from a YAML file by specifying the file flag.

     --add-permissions=ADD_PERMISSIONS
        The permissions you want to add to the role. Use commas to separate
        them.

     --description=DESCRIPTION
        The description of the role you want to update.

     --permissions=PERMISSIONS
        The permissions of the role you want to set. Use commas to separate
        them.

     --remove-permissions=REMOVE_PERMISSIONS
        The permissions you want to remove from the role. Use commas to
        separate them.

     --stage=STAGE
        The state of the role you want to update.

     --title=TITLE
        The title of the role you want to update.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam roles update

        $ gcloud beta iam roles update
```

### gcloud beta iam roles copy

```text
NAME
    gcloud beta iam roles copy - create a role from an existing role

SYNOPSIS
    gcloud beta iam roles copy [--dest-organization=DEST_ORGANIZATION]
        [--dest-project=DEST_PROJECT] [--destination=DESTINATION]
        [--source=SOURCE] [--source-organization=SOURCE_ORGANIZATION]
        [--source-project=SOURCE_PROJECT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam roles create

```text
NAME
    gcloud beta iam roles create - create a custom role for a project or an
        organization

SYNOPSIS
    gcloud beta iam roles create ROLE_ID
        (--organization=ORGANIZATION | --project=PROJECT_ID)
        [--file=FILE | --description=DESCRIPTION
          --permissions=PERMISSIONS --stage=STAGE --title=TITLE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam roles delete

```text
NAME
    gcloud beta iam roles delete - delete a custom role from an organization or
        a project

SYNOPSIS
    gcloud beta iam roles delete ROLE_ID
        (--organization=ORGANIZATION | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam roles describe

```text
NAME
    gcloud beta iam roles describe - show metadata for a role

SYNOPSIS
    gcloud beta iam roles describe ROLE_ID
        [--organization=ORGANIZATION | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam roles list

```text
NAME
    gcloud beta iam roles list - list predefined roles, or the custom roles for
        an organization or project

SYNOPSIS
    gcloud beta iam roles list [--show-deleted]
        [--organization=ORGANIZATION | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam roles undelete

```text
NAME
    gcloud beta iam roles undelete - undelete a custom role from an
        organization or a project

SYNOPSIS
    gcloud beta iam roles undelete ROLE_ID
        (--organization=ORGANIZATION | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam roles update

```text
NAME
    gcloud beta iam roles update - update an IAM custom role

SYNOPSIS
    gcloud beta iam roles update ROLE_ID
        (--organization=ORGANIZATION | --project=PROJECT_ID) [--file=FILE]
        [--add-permissions=ADD_PERMISSIONS --description=DESCRIPTION
          --permissions=PERMISSIONS
          --remove-permissions=REMOVE_PERMISSIONS --stage=STAGE --title=TITLE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam roles copy

```text
NAME
    gcloud alpha iam roles copy - create a role from an existing role

SYNOPSIS
    gcloud alpha iam roles copy [--dest-organization=DEST_ORGANIZATION]
        [--dest-project=DEST_PROJECT] [--destination=DESTINATION]
        [--source=SOURCE] [--source-organization=SOURCE_ORGANIZATION]
        [--source-project=SOURCE_PROJECT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam roles create

```text
NAME
    gcloud alpha iam roles create - create a custom role for a project or an
        organization

SYNOPSIS
    gcloud alpha iam roles create ROLE_ID
        (--organization=ORGANIZATION | --project=PROJECT_ID)
        [--file=FILE | --description=DESCRIPTION
          --permissions=PERMISSIONS --stage=STAGE --title=TITLE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam roles delete

```text
NAME
    gcloud alpha iam roles delete - delete a custom role from an organization
        or a project

SYNOPSIS
    gcloud alpha iam roles delete ROLE_ID
        (--organization=ORGANIZATION | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam roles describe

```text
NAME
    gcloud alpha iam roles describe - show metadata for a role

SYNOPSIS
    gcloud alpha iam roles describe ROLE_ID
        [--organization=ORGANIZATION | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam roles list

```text
NAME
    gcloud alpha iam roles list - list predefined roles, or the custom roles
        for an organization or project

SYNOPSIS
    gcloud alpha iam roles list [--show-deleted]
        [--organization=ORGANIZATION | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam roles undelete

```text
NAME
    gcloud alpha iam roles undelete - undelete a custom role from an
        organization or a project

SYNOPSIS
    gcloud alpha iam roles undelete ROLE_ID
        (--organization=ORGANIZATION | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam roles update

```text
NAME
    gcloud alpha iam roles update - update an IAM custom role

SYNOPSIS
    gcloud alpha iam roles update ROLE_ID
        (--organization=ORGANIZATION | --project=PROJECT_ID) [--file=FILE]
        [--add-permissions=ADD_PERMISSIONS --description=DESCRIPTION
          --permissions=PERMISSIONS
          --remove-permissions=REMOVE_PERMISSIONS --stage=STAGE --title=TITLE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/roles (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
