---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/attachments/groups
---

# gcloud compute interconnects attachments groups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects attachments groups add-members

```text
NAME
    gcloud compute interconnects attachments groups add-members - add member
        interconnect attachments to a Compute Engine interconnect attachment
        group

SYNOPSIS
    gcloud compute interconnects attachments groups add-members NAME
        --attachments=[INTERCONNECT_ATTACHMENT,...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments groups add-members is used to add
    member interconnect attachments to an interconnect attachment group.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To add attachment-1 and attachment-2 to interconnect attachment group
    example-attachment-group, run:

        $ gcloud compute interconnects attachments groups add-members \
            example-attachment-group \
            --attachments=region-1/attachment-1,region-2/attachment-2

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect attachment group to update.

REQUIRED FLAGS
     --attachments=[INTERCONNECT_ATTACHMENT,...]
        Member interconnect attachments to add to or remove from the
        interconnect attachment group.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects attachments groups add-members

        $ gcloud beta compute interconnects attachments groups add-members
```

### gcloud compute interconnects attachments groups create

```text
NAME
    gcloud compute interconnects attachments groups create - create a Compute
        Engine interconnect attachment group

SYNOPSIS
    gcloud compute interconnects attachments groups create NAME
        --intended-availability-sla=INTENDED_AVAILABILITY_SLA
        [--attachments=[INTERCONNECT_ATTACHMENT,...]]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments groups create is used to create
    interconnect attachment groups. An interconnect attachment group connects a
    set of redundant interconnect attachments between Google and the customer.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To create an interconnect attachment group capable of PRODUCTION_CRITICAL,
    run:

        $ gcloud compute interconnects attachments groups create \
            example-attachment-group \
            --intended-availability-sla=PRODUCTION_CRITICAL \
            --description="Example interconnect attachment group"

    It is easy to add members to an existing interconnect attachment group
    after creation using the add-members command.

    To create an interconnect attachment group capable of
    PRODUCTION_NON_CRITICAL, with two members at creation time, run:

        $ gcloud compute interconnects attachments groups create \
            example-attachment-group \
            --intended-availability-sla=PRODUCTION_NON_CRITICAL \
            --attachments=region-1/attachment-1,region-2/attachment-2

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect attachment group to create.

REQUIRED FLAGS
     --intended-availability-sla=INTENDED_AVAILABILITY_SLA
        The availability SLA that the user intends this group to support.

OPTIONAL FLAGS
     --attachments=[INTERCONNECT_ATTACHMENT,...]
        Member interconnect attachments to add to the interconnect attachment
        group initially.

     --description=DESCRIPTION
        An optional, textual description for the interconnect attachment group.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects attachments groups create

        $ gcloud beta compute interconnects attachments groups create
```

### gcloud compute interconnects attachments groups delete

```text
NAME
    gcloud compute interconnects attachments groups delete - delete Compute
        Engine interconnect attachment groups

SYNOPSIS
    gcloud compute interconnects attachments groups delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments groups delete is used to delete
    interconnect attachment groups.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To delete an interconnect attachment group, run:

        $ gcloud compute interconnects attachments groups delete \
            example-attachment-group"

    Although not shown in this example, you can delete multiple interconnect
    attachment groups in a single command.

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the interconnect attachment groups to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects attachments groups delete

        $ gcloud beta compute interconnects attachments groups delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute interconnects attachments groups delete example-attachment-group
```

### gcloud compute interconnects attachments groups describe

```text
NAME
    gcloud compute interconnects attachments groups describe - describe a
        Compute Engine interconnect attachment group

SYNOPSIS
    gcloud compute interconnects attachments groups describe NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments groups describe is used to
    describe interconnect attachment groups.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To describe an interconnect attachment group, run:

        $ gcloud compute interconnects attachments groups describe \
            example-attachment-group

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect attachment group to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects attachments groups describe

        $ gcloud beta compute interconnects attachments groups describe
```

### gcloud compute interconnects attachments groups get-operational-status

```text
NAME
    gcloud compute interconnects attachments groups get-operational-status -
        get the operational status of a Compute Engine interconnect attachment
        group

SYNOPSIS
    gcloud compute interconnects attachments groups get-operational-status NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments groups get-operational-status is
    used to get the operational status of interconnect attachment groups.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To get the operational status of interconnect attachment group
    example-attachment-group, run:

        $ gcloud compute interconnects attachments groups \
            get-operational-status example-attachment-group

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect attachment group to get operational status.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects attachments groups \
            get-operational-status

        $ gcloud beta compute interconnects attachments groups \
            get-operational-status
```

### gcloud compute interconnects attachments groups list

```text
NAME
    gcloud compute interconnects attachments groups list - list interconnect
        attachment groups

SYNOPSIS
    gcloud compute interconnects attachments groups list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments groups list is used to list
    interconnect attachment groups.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To list interconnect attachment groups, run:

        $ gcloud compute interconnects attachments groups list

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

        $ gcloud alpha compute interconnects attachments groups list

        $ gcloud beta compute interconnects attachments groups list
```

### gcloud compute interconnects attachments groups remove-members

```text
NAME
    gcloud compute interconnects attachments groups remove-members - remove
        member interconnect attachments from a Compute Engine interconnect
        attachment group

SYNOPSIS
    gcloud compute interconnects attachments groups remove-members NAME
        --attachments=[INTERCONNECT_ATTACHMENT,...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments groups remove-members is used to
    remove member interconnect attachments from an interconnect attachment
    group.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To remove attachment-1 and attachment-2 from interconnect attachment group
    example-attachment-group, run:

        $ gcloud compute interconnects attachments groups remove-members \
            example-attachment-group \
            --attachments=region-1/attachment-1,region-2/attachment-2

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect attachment group to update.

REQUIRED FLAGS
     --attachments=[INTERCONNECT_ATTACHMENT,...]
        Member interconnect attachments to add to or remove from the
        interconnect attachment group.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects attachments groups \
            remove-members

        $ gcloud beta compute interconnects attachments groups remove-members
```

### gcloud compute interconnects attachments groups set-iam-policy

```text
NAME
    gcloud compute interconnects attachments groups set-iam-policy - set the
        IAM policy for a Compute Engine interconnect attachment group

SYNOPSIS
    gcloud compute interconnects attachments groups set-iam-policy
        INTERCONNECT_ATTACHMENT_GROUP POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given interconnect attachment group as defined
    in a JSON or YAML file.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    'policy.json' and set it for the interconnect attachment group
    my-interconnect-attachment-group:

        $ gcloud compute interconnects attachments groups set-iam-policy \
            my-interconnect-attachment-group policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Interconnect attachment group resource - The interconnect attachment group
     to set the IAM policy for. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument interconnect_attachment_group on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERCONNECT_ATTACHMENT_GROUP
          ID of the interconnect_attachment_group or fully qualified identifier
          for the interconnect_attachment_group.

          To set the interconnect_attachment_group attribute:
          + provide the argument interconnect_attachment_group on the command
            line.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects attachments groups \
            set-iam-policy

        $ gcloud beta compute interconnects attachments groups set-iam-policy
```

### gcloud compute interconnects attachments groups test-iam-permissions

```text
NAME
    gcloud compute interconnects attachments groups test-iam-permissions - test
        IAM permissions for a Compute Engine interconnect attachment group

SYNOPSIS
    gcloud compute interconnects attachments groups test-iam-permissions
        INTERCONNECT_ATTACHMENT_GROUP --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns permissions that a caller has on the specified interconnect
    attachment group.

EXAMPLES
    To test if the caller has compute.interconnectAttachmentGroups.get
    permission on an interconnect attachment group, run:

        $ gcloud compute interconnects attachments groups \
            test-iam-permissions my-interconnect-attachment-group \
            --permissions=compute.interconnectAttachmentGroups.get

POSITIONAL ARGUMENTS
     Interconnect attachment group resource - The interconnect attachment group
     for which to test permissions. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument interconnect_attachment_group on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERCONNECT_ATTACHMENT_GROUP
          ID of the interconnect_attachment_group or fully qualified identifier
          for the interconnect_attachment_group.

          To set the interconnect_attachment_group attribute:
          + provide the argument interconnect_attachment_group on the command
            line.

REQUIRED FLAGS
     --permissions=[PERMISSIONS,...]
        Permissions to be tested.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects attachments groups \
            test-iam-permissions

        $ gcloud beta compute interconnects attachments groups \
            test-iam-permissions
```

### gcloud compute interconnects attachments groups update

```text
NAME
    gcloud compute interconnects attachments groups update - update a Compute
        Engine interconnect attachment group

SYNOPSIS
    gcloud compute interconnects attachments groups update NAME
        [--attachments=[INTERCONNECT_ATTACHMENT,...]]
        [--description=DESCRIPTION]
        [--intended-availability-sla=INTENDED_AVAILABILITY_SLA]
        [--update-mask=UPDATE_MASK] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments groups update is used to update
    interconnect attachment groups.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To update an interconnect attachment group example-attachment-group's
    intended availability SLA to PRODUCTION_CRITICAL, run:

        $ gcloud compute interconnects attachments groups update \
            example-attachment-group \
            --intended-availability-sla=PRODUCTION_CRITICAL

    To update an interconnect attachment group example-attachment-group's
    description to "example attachment group description", run:

        $ gcloud compute interconnects attachments groups update \
            example-attachment-group \
            --description="example attachment group description"

    To update an interconnect attachment group example-attachment-group's
    member attachments to attachment-1 and attachment-2, run:

        $ gcloud compute interconnects attachments groups update \
            example-attachment-group \
            --attachments=region-1/attachment-1,region-2/attachment-2 \
            --update-mask=attachments

    Although you can add or remove member attachments using this command, it is
    recommended to add or remove member attachments using the add-members and
    remove-members commands.

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect attachment group to update.

FLAGS
     --attachments=[INTERCONNECT_ATTACHMENT,...]
        Member interconnect attachments to add to the interconnect attachment
        group initially.

     --description=DESCRIPTION
        An optional, textual description for the interconnect attachment group.

     --intended-availability-sla=INTENDED_AVAILABILITY_SLA
        The availability SLA that the user intends this group to support.

     --update-mask=UPDATE_MASK
        Optional update mask to specify which fields to update. Use commas to
        separate masks. If not specified, all fields present in the command
        will be updated.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects attachments groups update

        $ gcloud beta compute interconnects attachments groups update
```

### gcloud beta compute interconnects attachments groups add-members

```text
NAME
    gcloud beta compute interconnects attachments groups add-members - add
        member interconnect attachments to a Compute Engine interconnect
        attachment group

SYNOPSIS
    gcloud beta compute interconnects attachments groups add-members NAME
        --attachments=[INTERCONNECT_ATTACHMENT,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute interconnects attachments groups create

```text
NAME
    gcloud beta compute interconnects attachments groups create - create a
        Compute Engine interconnect attachment group

SYNOPSIS
    gcloud beta compute interconnects attachments groups create NAME
        --intended-availability-sla=INTENDED_AVAILABILITY_SLA
        [--attachments=[INTERCONNECT_ATTACHMENT,...]]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute interconnects attachments groups delete

```text
NAME
    gcloud beta compute interconnects attachments groups delete - delete
        Compute Engine interconnect attachment groups

SYNOPSIS
    gcloud beta compute interconnects attachments groups delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute interconnects attachments groups describe

```text
NAME
    gcloud beta compute interconnects attachments groups describe - describe a
        Compute Engine interconnect attachment group

SYNOPSIS
    gcloud beta compute interconnects attachments groups describe NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute interconnects attachments groups get-operational-status

```text
NAME
    gcloud beta compute interconnects attachments groups get-operational-status
        - get the operational status of a Compute Engine interconnect
        attachment group

SYNOPSIS
    gcloud beta compute interconnects attachments groups get-operational-status
        NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute interconnects attachments groups list

```text
NAME
    gcloud beta compute interconnects attachments groups list - list
        interconnect attachment groups

SYNOPSIS
    gcloud beta compute interconnects attachments groups list
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute interconnects attachments groups remove-members

```text
NAME
    gcloud beta compute interconnects attachments groups remove-members -
        remove member interconnect attachments from a Compute Engine
        interconnect attachment group

SYNOPSIS
    gcloud beta compute interconnects attachments groups remove-members NAME
        --attachments=[INTERCONNECT_ATTACHMENT,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute interconnects attachments groups set-iam-policy

```text
NAME
    gcloud beta compute interconnects attachments groups set-iam-policy - set
        the IAM policy for a Compute Engine interconnect attachment group

SYNOPSIS
    gcloud beta compute interconnects attachments groups set-iam-policy
        INTERCONNECT_ATTACHMENT_GROUP POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute interconnects attachments groups test-iam-permissions

```text
NAME
    gcloud beta compute interconnects attachments groups test-iam-permissions -
        test IAM permissions for a Compute Engine interconnect attachment group

SYNOPSIS
    gcloud beta compute interconnects attachments groups test-iam-permissions
        INTERCONNECT_ATTACHMENT_GROUP --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute interconnects attachments groups update

```text
NAME
    gcloud beta compute interconnects attachments groups update - update a
        Compute Engine interconnect attachment group

SYNOPSIS
    gcloud beta compute interconnects attachments groups update NAME
        [--attachments=[INTERCONNECT_ATTACHMENT,...]]
        [--description=DESCRIPTION]
        [--intended-availability-sla=INTENDED_AVAILABILITY_SLA]
        [--update-mask=UPDATE_MASK] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments groups add-members

```text
NAME
    gcloud alpha compute interconnects attachments groups add-members - add
        member interconnect attachments to a Compute Engine interconnect
        attachment group

SYNOPSIS
    gcloud alpha compute interconnects attachments groups add-members NAME
        --attachments=[INTERCONNECT_ATTACHMENT,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments groups create

```text
NAME
    gcloud alpha compute interconnects attachments groups create - create a
        Compute Engine interconnect attachment group

SYNOPSIS
    gcloud alpha compute interconnects attachments groups create NAME
        --intended-availability-sla=INTENDED_AVAILABILITY_SLA
        [--attachments=[INTERCONNECT_ATTACHMENT,...]]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments groups delete

```text
NAME
    gcloud alpha compute interconnects attachments groups delete - delete
        Compute Engine interconnect attachment groups

SYNOPSIS
    gcloud alpha compute interconnects attachments groups delete NAME
        [NAME ...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments groups describe

```text
NAME
    gcloud alpha compute interconnects attachments groups describe - describe a
        Compute Engine interconnect attachment group

SYNOPSIS
    gcloud alpha compute interconnects attachments groups describe NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments groups get-operational-status

```text
NAME
    gcloud alpha compute interconnects attachments groups
        get-operational-status - get the operational status of a Compute Engine
        interconnect attachment group

SYNOPSIS
    gcloud alpha compute interconnects attachments groups
        get-operational-status NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments groups list

```text
NAME
    gcloud alpha compute interconnects attachments groups list - list
        interconnect attachment groups

SYNOPSIS
    gcloud alpha compute interconnects attachments groups list
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments groups remove-members

```text
NAME
    gcloud alpha compute interconnects attachments groups remove-members -
        remove member interconnect attachments from a Compute Engine
        interconnect attachment group

SYNOPSIS
    gcloud alpha compute interconnects attachments groups remove-members NAME
        --attachments=[INTERCONNECT_ATTACHMENT,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments groups set-iam-policy

```text
NAME
    gcloud alpha compute interconnects attachments groups set-iam-policy - set
        the IAM policy for a Compute Engine interconnect attachment group

SYNOPSIS
    gcloud alpha compute interconnects attachments groups set-iam-policy
        INTERCONNECT_ATTACHMENT_GROUP POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments groups test-iam-permissions

```text
NAME
    gcloud alpha compute interconnects attachments groups test-iam-permissions
        - test IAM permissions for a Compute Engine interconnect attachment
        group

SYNOPSIS
    gcloud alpha compute interconnects attachments groups test-iam-permissions
        INTERCONNECT_ATTACHMENT_GROUP --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments groups update

```text
NAME
    gcloud alpha compute interconnects attachments groups update - update a
        Compute Engine interconnect attachment group

SYNOPSIS
    gcloud alpha compute interconnects attachments groups update NAME
        [--attachments=[INTERCONNECT_ATTACHMENT,...]]
        [--description=DESCRIPTION]
        [--intended-availability-sla=INTENDED_AVAILABILITY_SLA]
        [--update-mask=UPDATE_MASK] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example ends with a stray unmatched `"` after `example-attachment-group`; the runnable form drops it.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/attachments/groups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
