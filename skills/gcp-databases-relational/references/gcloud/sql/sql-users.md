---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/users
---

# gcloud sql users

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql users assign-roles

```text
NAME
    gcloud sql users assign-roles - updates a user's database roles in a given
        instance

SYNOPSIS
    gcloud sql users assign-roles USERNAME --instance=INSTANCE, -i INSTANCE
        --type=TYPE [--async] [--database-roles=[ROLE,...]] [--host=HOST]
        [--revoke-existing-roles] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a user's database roles in a given instance with a specified
    username and host.

EXAMPLES
    To grant database roles role1 and role2 for my-user in instance
    prod-instance, run:

        $ gcloud sql users assign-roles my-user --instance=prod-instance \
            --database-roles=role1,role2 --type=BUILT_IN

    To revoke existing database roles and grant new database roles role3 and
    role4 for my-user in instance prod-instance, run:

        $ gcloud sql users assign-roles my-user --instance=prod-instance \
            --revoke-existing-roles --database-roles=role3,role4 \
            --type=BUILT_IN

POSITIONAL ARGUMENTS
     USERNAME
        Cloud SQL username.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

     --type=TYPE
        Cloud SQL user's type. It determines the method to authenticate the
        user during login. See the list of user types at
        https://cloud.google.com/sql/docs/postgres/admin-api/rest/v1beta4/SqlUserType

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --database-roles=[ROLE,...]
        A comma-separated list of database roles to be assigned to the user.
        This option is only available for MySQL and PostgreSQL instances. You
        can include predefined Cloud SQL roles, like cloudsqlsuperuser, or your
        own custom roles. Custom roles must be created in the database before
        you can assign them. You can create roles using the CREATE ROLE
        statement for both MySQL and PostgreSQL.

     --host=HOST
        Cloud SQL user's hostname expressed as a specific IP address or address
        range. % denotes an unrestricted hostname. Applicable flag for MySQL
        instances; ignored for all other engines. Note, if you connect to your
        instance using IP addresses, you must add your client IP address as an
        authorized address, even if your hostname is unrestricted. For more
        information, see Configure IP
        (https://cloud.google.com/sql/docs/mysql/configure-ip).

     --revoke-existing-roles
        A boolean flag for revoking existing database roles from the user. This
        option is only available for MySQL and PostgreSQL instances.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql users assign-roles

        $ gcloud beta sql users assign-roles
```

### gcloud sql users create

```text
NAME
    gcloud sql users create - creates a user in a given instance

SYNOPSIS
    gcloud sql users create USERNAME --instance=INSTANCE, -i INSTANCE [--async]
        [--database-roles=[ROLE,...]] [--host=HOST] [--password=PASSWORD]
        [--password-policy-allowed-failed-attempts=PASSWORD_POLICY_ALLOWED_FAILED_ATTEMPTS]
        [--[no-]password-policy-enable-failed-attempts-check]
        [--[no-]password-policy-enable-password-verification]
        [--password-policy-password-expiration-duration=PASSWORD_POLICY_PASSWORD_EXPIRATION_DURATION]
        [--type=TYPE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a user in a given instance with specified username, host, type, and
    password.

POSITIONAL ARGUMENTS
     USERNAME
        Cloud SQL username.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --database-roles=[ROLE,...]
        A comma-separated list of database roles to be assigned to the user.
        This option is only available for MySQL and PostgreSQL instances. You
        can include predefined Cloud SQL roles, like cloudsqlsuperuser, or your
        own custom roles. Custom roles must be created in the database before
        you can assign them. You can create roles using the CREATE ROLE
        statement for both MySQL and PostgreSQL.

     --host=HOST
        Cloud SQL user's hostname expressed as a specific IP address or address
        range. % denotes an unrestricted hostname. Applicable flag for MySQL
        instances; ignored for all other engines. Note, if you connect to your
        instance using IP addresses, you must add your client IP address as an
        authorized address, even if your hostname is unrestricted. For more
        information, see Configure IP
        (https://cloud.google.com/sql/docs/mysql/configure-ip).

     --password=PASSWORD
        Cloud SQL user's password.

     --password-policy-allowed-failed-attempts=PASSWORD_POLICY_ALLOWED_FAILED_ATTEMPTS
        Number of failed login attempts allowed before a user is locked out.

     --[no-]password-policy-enable-failed-attempts-check
        Enables the failed login attempts check if set to true. Use
        --password-policy-enable-failed-attempts-check to enable and
        --no-password-policy-enable-failed-attempts-check to disable.

     --[no-]password-policy-enable-password-verification
        The current password must be specified when altering the password. Use
        --password-policy-enable-password-verification to enable and
        --no-password-policy-enable-password-verification to disable.

     --password-policy-password-expiration-duration=PASSWORD_POLICY_PASSWORD_EXPIRATION_DURATION
        Expiration duration after a password is updated, for example, 2d for 2
        days. See gcloud topic datetimes for information on duration formats.

     --type=TYPE
        Cloud SQL user's type. It determines the method to authenticate the
        user during login. See the list of user types at
        https://cloud.google.com/sql/docs/postgres/admin-api/rest/v1beta4/SqlUserType

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql users create

        $ gcloud beta sql users create
```

### gcloud sql users delete

```text
NAME
    gcloud sql users delete - deletes a Cloud SQL user in a given instance

SYNOPSIS
    gcloud sql users delete USERNAME --instance=INSTANCE, -i INSTANCE [--async]
        [--host=HOST] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a Cloud SQL user in a given instance specified by username and
    host.

POSITIONAL ARGUMENTS
     USERNAME
        Cloud SQL username.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --host=HOST
        Cloud SQL user's hostname expressed as a specific IP address or address
        range. % denotes an unrestricted hostname. Applicable flag for MySQL
        instances; ignored for all other engines. Note, if you connect to your
        instance using IP addresses, you must add your client IP address as an
        authorized address, even if your hostname is unrestricted. For more
        information, see Configure IP
        (https://cloud.google.com/sql/docs/mysql/configure-ip).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql users delete

        $ gcloud beta sql users delete
```

### gcloud sql users describe

```text
NAME
    gcloud sql users describe - retrieves information about a Cloud SQL user in
        a given instance

SYNOPSIS
    gcloud sql users describe USERNAME --instance=INSTANCE, -i INSTANCE
        [--host=HOST] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieves information about a Cloud SQL user in a given instance.

EXAMPLES
    To fetch a user with name 'my-user' and optional host '%' in instance
    'my-instance', run:

        $ gcloud sql users describe my-user --host=% --instance=my-instance

POSITIONAL ARGUMENTS
     USERNAME
        Cloud SQL username.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

OPTIONAL FLAGS
     --host=HOST
        Cloud SQL user's hostname expressed as a specific IP address or address
        range. % denotes an unrestricted hostname. Applicable flag for MySQL
        instances; ignored for all other engines. Note, if you connect to your
        instance using IP addresses, you must add your client IP address as an
        authorized address, even if your hostname is unrestricted. For more
        information, see Configure IP
        (https://cloud.google.com/sql/docs/mysql/configure-ip).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql users describe

        $ gcloud beta sql users describe
```

### gcloud sql users list

```text
NAME
    gcloud sql users list - lists Cloud SQL users in a given instance

SYNOPSIS
    gcloud sql users list --instance=INSTANCE, -i INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists Cloud SQL users in a given instance in the alphabetical order of the
    user name.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

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

        $ gcloud alpha sql users list

        $ gcloud beta sql users list
```

### gcloud sql users set-password

```text
NAME
    gcloud sql users set-password - changes a user's password in a given
        instance

SYNOPSIS
    gcloud sql users set-password USERNAME --instance=INSTANCE, -i INSTANCE
        [--async] [--host=HOST] [--discard-dual-password | --retain-password]
        [--password=PASSWORD | --prompt-for-password] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Changes a user's password in a given instance with specified username and
    host.

POSITIONAL ARGUMENTS
     USERNAME
        Cloud SQL username.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --host=HOST
        Cloud SQL user's hostname expressed as a specific IP address or address
        range. % denotes an unrestricted hostname. Applicable flag for MySQL
        instances; ignored for all other engines. Note, if you connect to your
        instance using IP addresses, you must add your client IP address as an
        authorized address, even if your hostname is unrestricted. For more
        information, see Configure IP
        (https://cloud.google.com/sql/docs/mysql/configure-ip).

     At most one of these can be specified:

       --discard-dual-password
          Discard the user's secondary password. Cannot set password and set
          this flag. This flag is only available for MySQL 8.0.

       --retain-password
          Retain the old password when changing to the new password. Must set
          password with this flag. This flag is only available for MySQL 8.0.

     At most one of these can be specified:

       --password=PASSWORD
          Cloud SQL user's password.

       --prompt-for-password
          Prompt for the Cloud SQL user's password with character echo
          disabled. The password is all typed characters up to but not
          including the RETURN or ENTER key.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql users set-password

        $ gcloud beta sql users set-password
```

### gcloud sql users set-password-policy

```text
NAME
    gcloud sql users set-password-policy - replaces a user's password policy in
        a given instance

SYNOPSIS
    gcloud sql users set-password-policy USERNAME --instance=INSTANCE, -i
        INSTANCE [--async] [--clear-password-policy] [--host=HOST]
        [--password-policy-allowed-failed-attempts=PASSWORD_POLICY_ALLOWED_FAILED_ATTEMPTS]
        [--[no-]password-policy-enable-failed-attempts-check]
        [--[no-]password-policy-enable-password-verification]
        [--password-policy-password-expiration-duration=PASSWORD_POLICY_PASSWORD_EXPIRATION_DURATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Replaces a user's password policy in a given instance with a specified
    username and host.

EXAMPLES
    To replace the password policy with 2 minutes password expiration time for
    my-user in instance prod-instance, run:

        $ gcloud sql users set-password-policy my-user \
            --instance=prod-instance \
            --password-policy-password-expiration-duration=2m

    To clear the existing password policy of my-user in instance prod-instance,
    run:

        $ gcloud sql users set-password-policy my-user \
            --instance=prod-instance --clear-password-policy

POSITIONAL ARGUMENTS
     USERNAME
        Cloud SQL username.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --clear-password-policy
        Clear the existing password policy. This flag is only available for
        Postgres.

     --host=HOST
        Cloud SQL user's hostname expressed as a specific IP address or address
        range. % denotes an unrestricted hostname. Applicable flag for MySQL
        instances; ignored for all other engines. Note, if you connect to your
        instance using IP addresses, you must add your client IP address as an
        authorized address, even if your hostname is unrestricted. For more
        information, see Configure IP
        (https://cloud.google.com/sql/docs/mysql/configure-ip).

     --password-policy-allowed-failed-attempts=PASSWORD_POLICY_ALLOWED_FAILED_ATTEMPTS
        Number of failed login attempts allowed before a user is locked out.

     --[no-]password-policy-enable-failed-attempts-check
        Enables the failed login attempts check if set to true. Use
        --password-policy-enable-failed-attempts-check to enable and
        --no-password-policy-enable-failed-attempts-check to disable.

     --[no-]password-policy-enable-password-verification
        The current password must be specified when altering the password. Use
        --password-policy-enable-password-verification to enable and
        --no-password-policy-enable-password-verification to disable.

     --password-policy-password-expiration-duration=PASSWORD_POLICY_PASSWORD_EXPIRATION_DURATION
        Expiration duration after a password is updated, for example, 2d for 2
        days. See gcloud topic datetimes for information on duration formats.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql users set-password-policy

        $ gcloud beta sql users set-password-policy
```

### gcloud beta sql users assign-roles

```text
NAME
    gcloud beta sql users assign-roles - updates a user's database roles in a
        given instance

SYNOPSIS
    gcloud beta sql users assign-roles USERNAME --instance=INSTANCE, -i
        INSTANCE --type=TYPE [--async] [--database-roles=[ROLE,...]]
        [--host=HOST] [--revoke-existing-roles] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql users create

```text
NAME
    gcloud beta sql users create - creates a user in a given instance

SYNOPSIS
    gcloud beta sql users create USERNAME --instance=INSTANCE, -i INSTANCE
        [--async] [--database-roles=[ROLE,...]] [--host=HOST]
        [--password=PASSWORD]
        [--password-policy-allowed-failed-attempts=PASSWORD_POLICY_ALLOWED_FAILED_ATTEMPTS]
        [--[no-]password-policy-enable-failed-attempts-check]
        [--[no-]password-policy-enable-password-verification]
        [--password-policy-password-expiration-duration=PASSWORD_POLICY_PASSWORD_EXPIRATION_DURATION]
        [--type=TYPE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql users delete

```text
NAME
    gcloud beta sql users delete - deletes a Cloud SQL user in a given instance

SYNOPSIS
    gcloud beta sql users delete USERNAME --instance=INSTANCE, -i INSTANCE
        [--async] [--host=HOST] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql users describe

```text
NAME
    gcloud beta sql users describe - retrieves information about a Cloud SQL
        user in a given instance

SYNOPSIS
    gcloud beta sql users describe USERNAME --instance=INSTANCE, -i INSTANCE
        [--host=HOST] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql users list

```text
NAME
    gcloud beta sql users list - lists Cloud SQL users in a given instance

SYNOPSIS
    gcloud beta sql users list --instance=INSTANCE, -i INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql users set-password

```text
NAME
    gcloud beta sql users set-password - changes a user's password in a given
        instance

SYNOPSIS
    gcloud beta sql users set-password USERNAME --instance=INSTANCE, -i
        INSTANCE [--async] [--host=HOST]
        [--discard-dual-password | --retain-password]
        [--password=PASSWORD | --prompt-for-password] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql users set-password-policy

```text
NAME
    gcloud beta sql users set-password-policy - replaces a user's password
        policy in a given instance

SYNOPSIS
    gcloud beta sql users set-password-policy USERNAME --instance=INSTANCE, -i
        INSTANCE [--async] [--clear-password-policy] [--host=HOST]
        [--password-policy-allowed-failed-attempts=PASSWORD_POLICY_ALLOWED_FAILED_ATTEMPTS]
        [--[no-]password-policy-enable-failed-attempts-check]
        [--[no-]password-policy-enable-password-verification]
        [--password-policy-password-expiration-duration=PASSWORD_POLICY_PASSWORD_EXPIRATION_DURATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql users assign-roles

```text
NAME
    gcloud alpha sql users assign-roles - updates a user's database roles in a
        given instance

SYNOPSIS
    gcloud alpha sql users assign-roles USERNAME --instance=INSTANCE, -i
        INSTANCE --type=TYPE [--async] [--database-roles=[ROLE,...]]
        [--host=HOST] [--revoke-existing-roles] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql users create

```text
NAME
    gcloud alpha sql users create - creates a user in a given instance

SYNOPSIS
    gcloud alpha sql users create USERNAME --instance=INSTANCE, -i INSTANCE
        [--async] [--database-roles=[ROLE,...]] [--host=HOST]
        [--password=PASSWORD]
        [--password-policy-allowed-failed-attempts=PASSWORD_POLICY_ALLOWED_FAILED_ATTEMPTS]
        [--[no-]password-policy-enable-failed-attempts-check]
        [--[no-]password-policy-enable-password-verification]
        [--password-policy-password-expiration-duration=PASSWORD_POLICY_PASSWORD_EXPIRATION_DURATION]
        [--type=TYPE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql users delete

```text
NAME
    gcloud alpha sql users delete - deletes a Cloud SQL user in a given
        instance

SYNOPSIS
    gcloud alpha sql users delete USERNAME --instance=INSTANCE, -i INSTANCE
        [--async] [--host=HOST] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql users describe

```text
NAME
    gcloud alpha sql users describe - retrieves information about a Cloud SQL
        user in a given instance

SYNOPSIS
    gcloud alpha sql users describe USERNAME --instance=INSTANCE, -i INSTANCE
        [--host=HOST] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql users list

```text
NAME
    gcloud alpha sql users list - lists Cloud SQL users in a given instance

SYNOPSIS
    gcloud alpha sql users list --instance=INSTANCE, -i INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql users set-password

```text
NAME
    gcloud alpha sql users set-password - changes a user's password in a given
        instance

SYNOPSIS
    gcloud alpha sql users set-password USERNAME --instance=INSTANCE, -i
        INSTANCE [--async] [--host=HOST]
        [--discard-dual-password | --retain-password]
        [--password=PASSWORD | --prompt-for-password] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql users set-password-policy

```text
NAME
    gcloud alpha sql users set-password-policy - replaces a user's password
        policy in a given instance

SYNOPSIS
    gcloud alpha sql users set-password-policy USERNAME --instance=INSTANCE, -i
        INSTANCE [--async] [--clear-password-policy] [--host=HOST]
        [--password-policy-allowed-failed-attempts=PASSWORD_POLICY_ALLOWED_FAILED_ATTEMPTS]
        [--[no-]password-policy-enable-failed-attempts-check]
        [--[no-]password-policy-enable-password-verification]
        [--password-policy-password-expiration-duration=PASSWORD_POLICY_PASSWORD_EXPIRATION_DURATION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/users (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
