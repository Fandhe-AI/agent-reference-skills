---
source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/org-policies
---

# gcloud resource-manager org-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud resource-manager org-policies allow

```text
NAME
    gcloud resource-manager org-policies allow - add values to an Organization
        Policy allowed_values list policy

SYNOPSIS
    gcloud resource-manager org-policies allow ORG_POLICY_ID ALLOWED_VALUE
        [ALLOWED_VALUE ...]
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds one or more values to the specified Organization Policy allowed_values
    list policy associated with the specified resource.

EXAMPLES
    The following command adds devEnv and prodEnv to an Organization Policy
    allowed_values list policy for constraint serviceuser.services on project
    foo-project:

        $ gcloud resource-manager org-policies allow serviceuser.services \
            --project=foo-project devEnv prodEnv

POSITIONAL ARGUMENTS
     ORG_POLICY_ID
        The Org Policy constraint name.

     ALLOWED_VALUE [ALLOWED_VALUE ...]
        The values to add to the allowed_values list policy.

REQUIRED FLAGS
     Resource that is associated with the organization policy.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder ID.

       --organization=ORGANIZATION_ID
          Organization ID.

       --project=PROJECT_ID
          Project ID. Overrides the default core/project property value for
          this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager org-policies allow

        $ gcloud beta resource-manager org-policies allow
```

### gcloud resource-manager org-policies delete

```text
NAME
    gcloud resource-manager org-policies delete - delete an Organization Policy

SYNOPSIS
    gcloud resource-manager org-policies delete ORG_POLICY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes an Organization Policy associated with the specified resource.

EXAMPLES
    The following command clears an Organization Policy for constraint
    serviceuser.services on project foo-project:

        $ gcloud resource-manager org-policies delete serviceuser.services \
            --project=foo-project

POSITIONAL ARGUMENTS
     ORG_POLICY_ID
        The Org Policy constraint name.

REQUIRED FLAGS
     Resource that is associated with the organization policy.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder ID.

       --organization=ORGANIZATION_ID
          Organization ID.

       --project=PROJECT_ID
          Project ID. Overrides the default core/project property value for
          this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager org-policies delete

        $ gcloud beta resource-manager org-policies delete
```

### gcloud resource-manager org-policies deny

```text
NAME
    gcloud resource-manager org-policies deny - add values to an Organization
        Policy denied_values list policy

SYNOPSIS
    gcloud resource-manager org-policies deny ORG_POLICY_ID DENIED_VALUE
        [DENIED_VALUE ...]
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds one or more values to the specified Organization Policy denied_values
    list policy associated with the specified resource.

EXAMPLES
    The following command adds devEnv and prodEnv to an Organization Policy
    denied_values list policy for constraint serviceuser.services on project
    foo-project:

        $ gcloud resource-manager org-policies deny serviceuser.services \
            --project=foo-project devEnv prodEnv

POSITIONAL ARGUMENTS
     ORG_POLICY_ID
        The Org Policy constraint name.

     DENIED_VALUE [DENIED_VALUE ...]
        The values to add to the denied_values list policy.

REQUIRED FLAGS
     Resource that is associated with the organization policy.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder ID.

       --organization=ORGANIZATION_ID
          Organization ID.

       --project=PROJECT_ID
          Project ID. Overrides the default core/project property value for
          this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager org-policies deny

        $ gcloud beta resource-manager org-policies deny
```

### gcloud resource-manager org-policies describe

```text
NAME
    gcloud resource-manager org-policies describe - describe an Organization
        Policy

SYNOPSIS
    gcloud resource-manager org-policies describe ORG_POLICY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--effective] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes an Organization Policy associated with the specified resource.

EXAMPLES
    The following command retrieves an Organization Policy for constraint
    serviceuser.services on project foo-project:

        $ gcloud resource-manager org-policies describe \
            serviceuser.services --project=foo-project

    The following command retrieves the effective Organization Policy for
    constraint serviceuser.services on project foo-project:

        $ gcloud resource-manager org-policies describe \
            serviceuser.services --project=foo-project --effective

POSITIONAL ARGUMENTS
     ORG_POLICY_ID
        The Org Policy constraint name.

REQUIRED FLAGS
     Resource that is associated with the organization policy.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder ID.

       --organization=ORGANIZATION_ID
          Organization ID.

       --project=PROJECT_ID
          Project ID. Overrides the default core/project property value for
          this command invocation.

OPTIONAL FLAGS
     --effective
        Show the effective policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager org-policies describe

        $ gcloud beta resource-manager org-policies describe
```

### gcloud resource-manager org-policies disable-enforce

```text
NAME
    gcloud resource-manager org-policies disable-enforce - turns off
        enforcement of boolean Organization Policy constraint

SYNOPSIS
    gcloud resource-manager org-policies disable-enforce ORG_POLICY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Turns off enforcement of a boolean Organization Policy constraint at the
    specified resource.

EXAMPLES
    The following command disables enforcement of the Organization Policy
    boolean constraint compute.disableSerialPortAccess on project foo-project:

        $ gcloud resource-manager org-policies disable-enforce \
            compute.disableSerialPortAccess --project=foo-project

POSITIONAL ARGUMENTS
     ORG_POLICY_ID
        The Org Policy constraint name.

REQUIRED FLAGS
     Resource that is associated with the organization policy.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder ID.

       --organization=ORGANIZATION_ID
          Organization ID.

       --project=PROJECT_ID
          Project ID. Overrides the default core/project property value for
          this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager org-policies disable-enforce

        $ gcloud beta resource-manager org-policies disable-enforce
```

### gcloud resource-manager org-policies enable-enforce

```text
NAME
    gcloud resource-manager org-policies enable-enforce - turns on enforcement
        of boolean Organization Policy constraint

SYNOPSIS
    gcloud resource-manager org-policies enable-enforce ORG_POLICY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Turns on enforcement of a boolean Organization Policy constraint at the
    specified resource.

EXAMPLES
    The following command enables enforcement of the Organization Policy
    boolean constraint compute.disableSerialPortAccess on project foo-project:

        $ gcloud resource-manager org-policies enable-enforce \
            compute.disableSerialPortAccess --project=foo-project

POSITIONAL ARGUMENTS
     ORG_POLICY_ID
        The Org Policy constraint name.

REQUIRED FLAGS
     Resource that is associated with the organization policy.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder ID.

       --organization=ORGANIZATION_ID
          Organization ID.

       --project=PROJECT_ID
          Project ID. Overrides the default core/project property value for
          this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager org-policies enable-enforce

        $ gcloud beta resource-manager org-policies enable-enforce
```

### gcloud resource-manager org-policies list

```text
NAME
    gcloud resource-manager org-policies list - list Organization Policies
        associated with the specified resource

SYNOPSIS
    gcloud resource-manager org-policies list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--show-unset] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    The following command lists all set Organization Policies associated with
    project foo-project:

        $ gcloud resource-manager org-policies list --project=foo-project

    The following command lists all available constraints in addition to set
    Organization Policies associated with project foo-project:

        $ gcloud resource-manager org-policies list --project=foo-project \
            --show-unset

REQUIRED FLAGS
     Resource that is associated with the organization policy.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder ID.

       --organization=ORGANIZATION_ID
          Organization ID.

       --project=PROJECT_ID
          Project ID. Overrides the default core/project property value for
          this command invocation.

FLAGS
     --show-unset
        Show available constraints. For more information about constraints, see
        https://cloud.google.com/resource-manager/docs/organization-policy/understanding-constraints

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

        $ gcloud alpha resource-manager org-policies list

        $ gcloud beta resource-manager org-policies list
```

### gcloud resource-manager org-policies set-policy

```text
NAME
    gcloud resource-manager org-policies set-policy - set Organization Policy

SYNOPSIS
    gcloud resource-manager org-policies set-policy POLICY_FILE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets an Organization Policy associated with the specified resource from a
    file that contains the JSON or YAML encoded Organization Policy.

EXAMPLES
    Organization policy list constraint YAML file example:

        constraint: constraints/CONSTRAINT_NAME
        listPolicy:
          deniedValues:
          - VALUE_A

    Organization policy list constraint JSON file example:

        {
          "constraint": "constraints/CONSTRAINT_NAME",
          "listPolicy": {
            "deniedValues": ["VALUE_A"]
          }
        }

    The following command sets an Organization Policy for a constraint on
    project foo-project from file /tmp/policy.yaml:

        $ gcloud resource-manager org-policies set-policy \
            --project=foo-project /tmp/policy.yaml

POSITIONAL ARGUMENTS
     POLICY_FILE
        JSON or YAML file with the Organization Policy.

REQUIRED FLAGS
     Resource that is associated with the organization policy.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder ID.

       --organization=ORGANIZATION_ID
          Organization ID.

       --project=PROJECT_ID
          Project ID. Overrides the default core/project property value for
          this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager org-policies set-policy

        $ gcloud beta resource-manager org-policies set-policy
```

### gcloud beta resource-manager org-policies allow

```text
NAME
    gcloud beta resource-manager org-policies allow - add values to an
        Organization Policy allowed_values list policy

SYNOPSIS
    gcloud beta resource-manager org-policies allow ORG_POLICY_ID ALLOWED_VALUE
        [ALLOWED_VALUE ...]
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager org-policies delete

```text
NAME
    gcloud beta resource-manager org-policies delete - delete an Organization
        Policy

SYNOPSIS
    gcloud beta resource-manager org-policies delete ORG_POLICY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager org-policies deny

```text
NAME
    gcloud beta resource-manager org-policies deny - add values to an
        Organization Policy denied_values list policy

SYNOPSIS
    gcloud beta resource-manager org-policies deny ORG_POLICY_ID DENIED_VALUE
        [DENIED_VALUE ...]
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager org-policies describe

```text
NAME
    gcloud beta resource-manager org-policies describe - describe an
        Organization Policy

SYNOPSIS
    gcloud beta resource-manager org-policies describe ORG_POLICY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--effective] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager org-policies disable-enforce

```text
NAME
    gcloud beta resource-manager org-policies disable-enforce - turns off
        enforcement of boolean Organization Policy constraint

SYNOPSIS
    gcloud beta resource-manager org-policies disable-enforce ORG_POLICY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager org-policies enable-enforce

```text
NAME
    gcloud beta resource-manager org-policies enable-enforce - turns on
        enforcement of boolean Organization Policy constraint

SYNOPSIS
    gcloud beta resource-manager org-policies enable-enforce ORG_POLICY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager org-policies list

```text
NAME
    gcloud beta resource-manager org-policies list - list Organization Policies
        associated with the specified resource

SYNOPSIS
    gcloud beta resource-manager org-policies list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--show-unset] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager org-policies set-policy

```text
NAME
    gcloud beta resource-manager org-policies set-policy - set Organization
        Policy

SYNOPSIS
    gcloud beta resource-manager org-policies set-policy POLICY_FILE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager org-policies allow

```text
NAME
    gcloud alpha resource-manager org-policies allow - add values to an
        Organization Policy allowed_values list policy

SYNOPSIS
    gcloud alpha resource-manager org-policies allow ORG_POLICY_ID
        ALLOWED_VALUE [ALLOWED_VALUE ...]
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager org-policies delete

```text
NAME
    gcloud alpha resource-manager org-policies delete - delete an Organization
        Policy

SYNOPSIS
    gcloud alpha resource-manager org-policies delete ORG_POLICY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager org-policies deny

```text
NAME
    gcloud alpha resource-manager org-policies deny - add values to an
        Organization Policy denied_values list policy

SYNOPSIS
    gcloud alpha resource-manager org-policies deny ORG_POLICY_ID DENIED_VALUE
        [DENIED_VALUE ...]
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager org-policies describe

```text
NAME
    gcloud alpha resource-manager org-policies describe - describe an
        Organization Policy

SYNOPSIS
    gcloud alpha resource-manager org-policies describe ORG_POLICY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--effective] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager org-policies disable-enforce

```text
NAME
    gcloud alpha resource-manager org-policies disable-enforce - turns off
        enforcement of boolean Organization Policy constraint

SYNOPSIS
    gcloud alpha resource-manager org-policies disable-enforce ORG_POLICY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager org-policies enable-enforce

```text
NAME
    gcloud alpha resource-manager org-policies enable-enforce - turns on
        enforcement of boolean Organization Policy constraint

SYNOPSIS
    gcloud alpha resource-manager org-policies enable-enforce ORG_POLICY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager org-policies list

```text
NAME
    gcloud alpha resource-manager org-policies list - list Organization
        Policies associated with the specified resource

SYNOPSIS
    gcloud alpha resource-manager org-policies list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--show-unset] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager org-policies set-policy

```text
NAME
    gcloud alpha resource-manager org-policies set-policy - set Organization
        Policy

SYNOPSIS
    gcloud alpha resource-manager org-policies set-policy POLICY_FILE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/org-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
