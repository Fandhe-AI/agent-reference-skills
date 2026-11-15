---
source: https://docs.cloud.google.com/sdk/gcloud/reference/organizations/add-iam-policy-binding
---

# gcloud organizations add-iam-policy-binding

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud organizations add-iam-policy-binding

```text
NAME
    gcloud organizations add-iam-policy-binding - add IAM policy binding for an
        organization

SYNOPSIS
    gcloud organizations add-iam-policy-binding ORGANIZATION --member=PRINCIPAL
        --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds a policy binding to the IAM policy of an organization, given an
    organization ID and the binding. One binding consists of a member, a role,
    and an optional condition.

EXAMPLES
    To add an IAM policy binding with the role of 'roles/editor' for the user
    'test-user@example.com' on an organization with identifier
    'example-organization-id-1', run:

        $ gcloud organizations add-iam-policy-binding \
          example-organization-id-1 \
          --member='user:test-user@example.com' --role='roles/editor'

    To add an IAM policy binding with the role of 'roles/editor' for the
    service account 'my-iam-account@my-project.iam.gserviceaccount.com' on an
    organization with identifier 'example-organization-id-1', run:

        $ gcloud organizations add-iam-policy-binding \
          example-organization-id-1 \
          --member='serviceAccount:my-iam-account@my-project.iam.gservicea\
        ccount.com' --role='roles/editor'

    To add an IAM policy binding which expires at the end of the year 2018 for
    the role of 'roles/browser' and the user 'test-user@example.com' on an
    organization with identifier 'example-organization-id-1', run:

        $ gcloud organizations add-iam-policy-binding \
          example-organization-id-1 \
          --member='user:test-user@example.com' --role='roles/browser' \
          --condition='expression=request.time <
        timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,descrip\
        tion=Expires at midnight on 2018-12-31'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Organization resource - The organization to add the IAM policy binding.
     This represents a Cloud resource.

     This must be specified.

       ORGANIZATION
          ID of the organization or fully qualified identifier for the
          organization.

          To set the organization attribute:
          + provide the argument organization on the command line.

REQUIRED FLAGS
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

API REFERENCE
    This command uses the cloudresourcemanager/v1 API. The full documentation
    for this API can be found at: https://cloud.google.com/resource-manager

NOTES
    These variants are also available:

        $ gcloud alpha organizations add-iam-policy-binding

        $ gcloud beta organizations add-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud organizations add-iam-policy-binding example-organization-id-1 \
    --member='serviceAccount:my-iam-account@my-project.iam.gserviceaccount.com' \
    --role='roles/editor'

gcloud organizations add-iam-policy-binding example-organization-id-1 \
    --member='user:test-user@example.com' \
    --role='roles/browser' \
    --condition='expression=request.time < timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,description=Expires at midnight on 2018-12-31'
```

### gcloud beta organizations add-iam-policy-binding

```text
NAME
    gcloud beta organizations add-iam-policy-binding - add IAM policy binding
        for an organization

SYNOPSIS
    gcloud beta organizations add-iam-policy-binding ORGANIZATION
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha organizations add-iam-policy-binding

```text
NAME
    gcloud alpha organizations add-iam-policy-binding - add IAM policy binding
        for an organization

SYNOPSIS
    gcloud alpha organizations add-iam-policy-binding ORGANIZATION
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/organizations/add-iam-policy-binding (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
