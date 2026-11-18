---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/ekm-config
---

# gcloud kms ekm-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms ekm-config add-iam-policy-binding

```text
NAME
    gcloud kms ekm-config add-iam-policy-binding - add IAM policy binding to an
        EkmConfig

SYNOPSIS
    gcloud kms ekm-config add-iam-policy-binding --location=LOCATION
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds a policy binding to the IAM policy of a kms EkmConfig. A binding
    consists of at least one member, a role, and an optional condition.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/editor' for the user
    test-user@gmail.com on the EkmConfig with location us-central1, run:

        $ gcloud kms ekm-config add-iam-policy-binding \
            --location='us-central1' --member='user:test-user@gmail.com' \
            --role='roles/editor'

    To add an IAM policy binding which expires at the end of the year 2022 for
    the role of 'roles/editor' and the user test-user@gmail.com and location
    us-central1, run:

        $ gcloud kms ekm-config add-iam-policy-binding \
            --location='us-central1' --member='user:test-user@gmail.com' \
            --role='roles/editor' --condition='expression=request.time <
        timestamp("2023-01-01T00:00:00Z"),title=expires_end_of_2022,description=Expires
        at midnight on 2022-12-31'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

REQUIRED FLAGS
     Location resource - The KMS location resource. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

     --member=PRINCIPAL
        The principal to add the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        Role name to assign to the principal. The role name is the complete
        path of a predefined role, such as roles/logging.viewer, or the role ID
        for a custom role, such as
        organizations/{ORGANIZATION_ID}/roles/logging.viewer.

OPTIONAL FLAGS
     At most one of these can be specified:

       --condition=[KEY=VALUE,...]
          A condition to include in the binding. When the condition is
          explicitly specified as None (--condition=None), a binding without a
          condition is added. When the condition is specified and is not None,
          --role cannot be a basic role. Basic roles are roles/editor,
          roles/owner, and roles/viewer. For more on conditions, refer to the
          conditions overview guide:
          https://cloud.google.com/iam/docs/conditions-overview

          When using the --condition flag, include the following key-value
          pairs:

           expression
              (Required) Condition expression that evaluates to True or False.
              This uses a subset of Common Expression Language syntax.

              If the condition expression includes a comma, use a different
              delimiter to separate the key-value pairs. Specify the delimiter
              before listing the key-value pairs. For example, to specify a
              colon (:) as the delimiter, do the following:
              --condition=^:^title=TITLE:expression=EXPRESSION. For more
              information, see
              https://cloud.google.com/sdk/gcloud/reference/topic/escaping.

           title
              (Required) A short string describing the purpose of the
              expression.

           description
              (Optional) Additional description for the expression.

       --condition-from-file=PATH_TO_FILE
          Path to a local JSON or YAML file that defines the condition. To see
          available fields, see the help for --condition. Use a full or
          relative path to a local file containing the value of condition.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms ekm-config add-iam-policy-binding

        $ gcloud beta kms ekm-config add-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud kms ekm-config add-iam-policy-binding \
    --location='us-central1' \
    --member='user:test-user@gmail.com' \
    --role='roles/editor' \
    --condition='expression=request.time < timestamp("2023-01-01T00:00:00Z"),title=expires_end_of_2022,description=Expires at midnight on 2022-12-31'
```

### gcloud kms ekm-config describe

```text
NAME
    gcloud kms ekm-config describe - describe the EkmConfig

SYNOPSIS
    gcloud kms ekm-config describe --location=LOCATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud kms ekm-config describe can be used to retrieve the EkmConfig.

EXAMPLES
    The following command retrieves the EkmConfig in us-east1 for the current
    project:

        $ gcloud kms ekm-config describe --location=us-east1

    The following command retrieves the EkmConfig for its project foo and
    location us-east1:

        $ gcloud kms ekm-config describe \
            --location="projects/foo/locations/us-east1"

REQUIRED FLAGS
     Location resource - The KMS location resource. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms ekm-config describe

        $ gcloud beta kms ekm-config describe
```

### gcloud kms ekm-config get-iam-policy

```text
NAME
    gcloud kms ekm-config get-iam-policy - get the IAM policy for an EkmConfig

SYNOPSIS
    gcloud kms ekm-config get-iam-policy --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets the IAM policy for the given location.

    Returns an empty policy if the resource does not have a policy set.

EXAMPLES
    The following command gets the IAM policy for the EkmConfig within the
    location us-central1:

        $ gcloud kms ekm-config get-iam-policy --location=us-central1

REQUIRED FLAGS
     Location resource - The KMS location resource. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

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

NOTES
    These variants are also available:

        $ gcloud alpha kms ekm-config get-iam-policy

        $ gcloud beta kms ekm-config get-iam-policy
```

### gcloud kms ekm-config remove-iam-policy-binding

```text
NAME
    gcloud kms ekm-config remove-iam-policy-binding - remove IAM policy binding
        from an EkmConfig

SYNOPSIS
    gcloud kms ekm-config remove-iam-policy-binding --location=LOCATION
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes a policy binding from the IAM policy of a kms EkmConfig. A binding
    consists of at least one member, a role, and an optional condition.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on the EkmConfig with location us-central1, run:

        $ gcloud kms ekm-config remove-iam-policy-binding \
            --location='us-central1' --member='user:test-user@gmail.com' \
            --role='roles/editor'

    To remove an IAM policy binding with a condition of
    expression='request.time < timestamp("2023-01-01T00:00:00Z")',
    title='expires_end_of_2022', and description='Expires at midnight on
    2022-12-31' for the role of 'roles/editor' for the user
    'test-user@gmail.com' on the EkmConfig with location us-central1, run:

        $ gcloud kms ekm-config remove-iam-policy-binding \
            --location='us-central1' --member='user:test-user@gmail.com' \
            --role='roles/editor' --condition='expression=request.time <
        timestamp("2023-01-01T00:00:00Z"),title=expires_end_of_2022,description=Expires
        at midnight on 2022-12-31'

    To remove all IAM policy bindings regardless of the condition for the role
    of 'roles/editor' and for the user 'test-user@gmail.com' on the EkmConfig
    with location us-central1, run:

        $ gcloud kms ekm-config remove-iam-policy-binding laplace \
            --location='us-central1' --member='user:test-user@gmail.com' \
            --role='roles/editor' --all

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

REQUIRED FLAGS
     Location resource - The KMS location resource. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

     --member=PRINCIPAL
        The principal to remove the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Deleted principals have an additional deleted: prefix and a ?uid=UID
        suffix, where UID is a unique identifier for the principal. Example:
        deleted:user:test-user@gmail.com?uid=123456789012345678901.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        The role to remove the principal from.

OPTIONAL FLAGS
     At most one of these can be specified:

       --all
          Remove all bindings with this role and principal, irrespective of any
          conditions.

       --condition=[KEY=VALUE,...]
          The condition of the binding that you want to remove. When the
          condition is explicitly specified as None (--condition=None), a
          binding without a condition is removed. Otherwise, only a binding
          with a condition that exactly matches the specified condition
          (including the optional description) is removed. For more on
          conditions, refer to the conditions overview guide:
          https://cloud.google.com/iam/docs/conditions-overview

          When using the --condition flag, include the following key-value
          pairs:

           expression
              (Required) Condition expression that evaluates to True or False.
              This uses a subset of Common Expression Language syntax.

              If the condition expression includes a comma, use a different
              delimiter to separate the key-value pairs. Specify the delimiter
              before listing the key-value pairs. For example, to specify a
              colon (:) as the delimiter, do the following:
              --condition=^:^title=TITLE:expression=EXPRESSION. For more
              information, see
              https://cloud.google.com/sdk/gcloud/reference/topic/escaping.

           title
              (Required) A short string describing the purpose of the
              expression.

           description
              (Optional) Additional description for the expression.

       --condition-from-file=PATH_TO_FILE
          Path to a local JSON or YAML file that defines the condition. To see
          available fields, see the help for --condition. Use a full or
          relative path to a local file containing the value of condition.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms ekm-config remove-iam-policy-binding

        $ gcloud beta kms ekm-config remove-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud kms ekm-config remove-iam-policy-binding \
    --location='us-central1' \
    --member='user:test-user@gmail.com' \
    --role='roles/editor' \
    --condition='expression=request.time < timestamp("2023-01-01T00:00:00Z"),title=expires_end_of_2022,description=Expires at midnight on 2022-12-31'

gcloud kms ekm-config remove-iam-policy-binding \
    --location='us-central1' \
    --member='user:test-user@gmail.com' \
    --role='roles/editor' \
    --all
```

### gcloud kms ekm-config set-iam-policy

```text
NAME
    gcloud kms ekm-config set-iam-policy - set the IAM policy for an EkmConfig

SYNOPSIS
    gcloud kms ekm-config set-iam-policy POLICY_FILE --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the EkmConfig in a location as defined in a JSON or
    YAML file.

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    The following command will read am IAM policy defined in a JSON file
    'policy.json' and set it for the EkmConfig with location us-central1:

        $ gcloud kms ekm-config set-iam-policy policy.json \
            --location=us-central1

POSITIONAL ARGUMENTS
     POLICY_FILE
        JSON or YAML file with the IAM policy

REQUIRED FLAGS
     Location resource - The KMS location resource. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms ekm-config set-iam-policy

        $ gcloud beta kms ekm-config set-iam-policy
```

### gcloud kms ekm-config update

```text
NAME
    gcloud kms ekm-config update - update the EkmConfig

SYNOPSIS
    gcloud kms ekm-config update --location=LOCATION
        [--default-ekm-connection=DEFAULT_EKM_CONNECTION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud kms ekm-config update can be used to update the EkmConfig. Applies
    to all CryptoKeys and CryptoKeyVersions with a protection level of external
    vpc.

EXAMPLES
    The following command sets the default ekm-connection to laplace for its
    project foo and location us-east1:

        $ gcloud kms ekm-config update --location=us-east1 \
            --default-ekm-connection="projects/foo/locations/us-east1/ekmCon\
        nections/laplace"

    The following command removes the default-ekm-connection in us-east1 for
    the current project:

        $ gcloud kms ekm-config update --location=us-east1 \
            --default-ekm-connection=""

REQUIRED FLAGS
     Location resource - The KMS location resource. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

OPTIONAL FLAGS
     --default-ekm-connection=DEFAULT_EKM_CONNECTION
        The resource name of the EkmConnection to be used as the default
        EkmConnection for all external-vpc CryptoKeys in a project and
        location. Can be an empty string to remove the default EkmConnection.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms ekm-config update

        $ gcloud beta kms ekm-config update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud kms ekm-config update \
    --location=us-east1 \
    --default-ekm-connection="projects/foo/locations/us-east1/ekmConnections/laplace"
```

### gcloud beta kms ekm-config add-iam-policy-binding

```text
NAME
    gcloud beta kms ekm-config add-iam-policy-binding - add IAM policy binding
        to an EkmConfig

SYNOPSIS
    gcloud beta kms ekm-config add-iam-policy-binding --location=LOCATION
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms ekm-config describe

```text
NAME
    gcloud beta kms ekm-config describe - describe the EkmConfig

SYNOPSIS
    gcloud beta kms ekm-config describe --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms ekm-config get-iam-policy

```text
NAME
    gcloud beta kms ekm-config get-iam-policy - get the IAM policy for an
        EkmConfig

SYNOPSIS
    gcloud beta kms ekm-config get-iam-policy --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms ekm-config remove-iam-policy-binding

```text
NAME
    gcloud beta kms ekm-config remove-iam-policy-binding - remove IAM policy
        binding from an EkmConfig

SYNOPSIS
    gcloud beta kms ekm-config remove-iam-policy-binding --location=LOCATION
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms ekm-config set-iam-policy

```text
NAME
    gcloud beta kms ekm-config set-iam-policy - set the IAM policy for an
        EkmConfig

SYNOPSIS
    gcloud beta kms ekm-config set-iam-policy POLICY_FILE --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms ekm-config update

```text
NAME
    gcloud beta kms ekm-config update - update the EkmConfig

SYNOPSIS
    gcloud beta kms ekm-config update --location=LOCATION
        [--default-ekm-connection=DEFAULT_EKM_CONNECTION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms ekm-config add-iam-policy-binding

```text
NAME
    gcloud alpha kms ekm-config add-iam-policy-binding - add IAM policy binding
        to an EkmConfig

SYNOPSIS
    gcloud alpha kms ekm-config add-iam-policy-binding --location=LOCATION
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms ekm-config describe

```text
NAME
    gcloud alpha kms ekm-config describe - describe the EkmConfig

SYNOPSIS
    gcloud alpha kms ekm-config describe --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms ekm-config get-iam-policy

```text
NAME
    gcloud alpha kms ekm-config get-iam-policy - get the IAM policy for an
        EkmConfig

SYNOPSIS
    gcloud alpha kms ekm-config get-iam-policy --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms ekm-config remove-iam-policy-binding

```text
NAME
    gcloud alpha kms ekm-config remove-iam-policy-binding - remove IAM policy
        binding from an EkmConfig

SYNOPSIS
    gcloud alpha kms ekm-config remove-iam-policy-binding --location=LOCATION
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms ekm-config set-iam-policy

```text
NAME
    gcloud alpha kms ekm-config set-iam-policy - set the IAM policy for an
        EkmConfig

SYNOPSIS
    gcloud alpha kms ekm-config set-iam-policy POLICY_FILE --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms ekm-config update

```text
NAME
    gcloud alpha kms ekm-config update - update the EkmConfig

SYNOPSIS
    gcloud alpha kms ekm-config update --location=LOCATION
        [--default-ekm-connection=DEFAULT_EKM_CONNECTION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `remove-iam-policy-binding` example with `--all` passes `laplace` as a positional argument, but the SYNOPSIS (`gcloud kms ekm-config remove-iam-policy-binding --location=LOCATION --member=PRINCIPAL --role=ROLE ...`) takes no positional arguments (gcloud 593.0.0: "unrecognized arguments: laplace"); the runnable form drops it.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/ekm-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
