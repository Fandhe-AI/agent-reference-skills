---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/auto-protection-policies
---

# gcloud backup-dr auto-protection-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr auto-protection-policies create

```text
NAME
    gcloud backup-dr auto-protection-policies create - create a Backup and DR
        AutoProtectionPolicy

SYNOPSIS
    gcloud backup-dr auto-protection-policies create
        (AUTO_PROTECTION_POLICY : --location=LOCATION)
        --backup-plan-details=[backup-plan=BACKUP-PLAN],
          [resource-type=RESOURCE-TYPE] --criteria=key=KEY,values=VALUES
        [--async] [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Backup and DR AutoProtectionPolicy.

EXAMPLES
    To create an AutoProtectionPolicy 'my-policy' in 'us-central1' with a
    criteria label, run:

        # gcloud-disable-gdu-domain
        $ gcloud backup-dr auto-protection-policies create my-policy \
            --location=us-central1 --criteria=key=environment,values=prod \
            --description="My Policy" \
            --backup-plan-details="resource-type=compute.googleapis.com/Inst\
        ance,backup-plan=projects/my-proj/locations/us-central1/backupPlans/\
        my-plan"

POSITIONAL ARGUMENTS
     AutoProtectionPolicy resource - Name of the AutoProtectionPolicy to
     create. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument auto_protection_policy on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTO_PROTECTION_POLICY
          ID of the AutoProtectionPolicy or fully qualified identifier for the
          AutoProtectionPolicy.

          To set the name attribute:
          + provide the argument auto_protection_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the AutoProtectionPolicy.

          To set the location attribute:
          + provide the argument auto_protection_policy on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --backup-plan-details=[backup-plan=BACKUP-PLAN],[resource-type=RESOURCE-TYPE]
        Backup plan details in format resource-type=VALUE,backup-plan=VALUE.
        This flag can be repeated to specify multiple backup plans.

     --criteria=key=KEY,values=VALUES
        Criteria of the policy in format key=KEY,values=VALUE.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --description=DESCRIPTION
        Description for the policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Create a Backup and DR AutoProtectionPolicy.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr auto-protection-policies create

        $ gcloud beta backup-dr auto-protection-policies create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud backup-dr auto-protection-policies create my-policy \
    --location=us-central1 \
    --criteria=key=environment,values=prod \
    --description="My Policy" \
    --backup-plan-details="resource-type=compute.googleapis.com/Instance,backup-plan=projects/my-proj/locations/us-central1/backupPlans/my-plan"
```

### gcloud backup-dr auto-protection-policies delete

```text
NAME
    gcloud backup-dr auto-protection-policies delete - delete a Backup and DR
        AutoProtectionPolicy

SYNOPSIS
    gcloud backup-dr auto-protection-policies delete
        (AUTO_PROTECTION_POLICY : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Backup and DR AutoProtectionPolicy.

EXAMPLES
    To delete an AutoProtectionPolicy 'my-policy' in 'us-central1', run:

        $ gcloud backup-dr auto-protection-policies delete my-policy \
            --location=us-central1

POSITIONAL ARGUMENTS
     Auto protection policy resource - Name of the AutoProtectionPolicy to
     delete. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument auto_protection_policy on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTO_PROTECTION_POLICY
          ID of the auto_protection_policy or fully qualified identifier for
          the auto_protection_policy.

          To set the auto_protection_policy attribute:
          + provide the argument auto_protection_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID of the resource.

          To set the location attribute:
          + provide the argument auto_protection_policy on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the backupdr/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/backup-disaster-recovery

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr auto-protection-policies delete

        $ gcloud beta backup-dr auto-protection-policies delete
```

### gcloud backup-dr auto-protection-policies describe

```text
NAME
    gcloud backup-dr auto-protection-policies describe - describe a Backup and
        DR AutoProtectionPolicy

SYNOPSIS
    gcloud backup-dr auto-protection-policies describe
        (AUTO_PROTECTION_POLICY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Backup and DR AutoProtectionPolicy.

EXAMPLES
    To describe an AutoProtectionPolicy 'my-policy' in 'us-central1', run:

        $ gcloud backup-dr auto-protection-policies describe my-policy \
            --location=us-central1

POSITIONAL ARGUMENTS
     Auto protection policy resource - Name of the AutoProtectionPolicy to
     describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument auto_protection_policy on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTO_PROTECTION_POLICY
          ID of the auto_protection_policy or fully qualified identifier for
          the auto_protection_policy.

          To set the auto_protection_policy attribute:
          + provide the argument auto_protection_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID of the resource.

          To set the location attribute:
          + provide the argument auto_protection_policy on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the backupdr/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/backup-disaster-recovery

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr auto-protection-policies describe

        $ gcloud beta backup-dr auto-protection-policies describe
```

### gcloud backup-dr auto-protection-policies list

```text
NAME
    gcloud backup-dr auto-protection-policies list - list Backup and DR
        AutoProtectionPolicies

SYNOPSIS
    gcloud backup-dr auto-protection-policies list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Backup and DR AutoProtectionPolicies.

EXAMPLES
    To list Backup and DR AutoProtectionPolicies across all locations, run:

        $ gcloud backup-dr auto-protection-policies list

    To list Backup and DR AutoProtectionPolicies strictly in 'us-central1',
    run:

        $ gcloud backup-dr auto-protection-policies list \
            --location=us-central1

FLAGS
     Location resource - The location to list AutoProtectionPolicies. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * default is all locations with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * default is all locations .

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
    This command uses the backupdr/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/backup-disaster-recovery

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr auto-protection-policies list

        $ gcloud beta backup-dr auto-protection-policies list
```

### gcloud backup-dr auto-protection-policies update

```text
NAME
    gcloud backup-dr auto-protection-policies update - update a Backup and DR
        AutoProtectionPolicy

SYNOPSIS
    gcloud backup-dr auto-protection-policies update
        (AUTO_PROTECTION_POLICY : --location=LOCATION) [--async]
        [--backup-plan-details=[backup-plan=BACKUP-PLAN],
          [resource-type=RESOURCE-TYPE]] [--criteria=key=KEY,values=VALUES]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Backup and DR AutoProtectionPolicy.

EXAMPLES
    To update the description of an AutoProtectionPolicy 'my-policy' in
    'us-central1', run:

        $ gcloud backup-dr auto-protection-policies update my-policy \
            --location=us-central1 --description="Updated Policy"

POSITIONAL ARGUMENTS
     AutoProtectionPolicy resource - Name of the AutoProtectionPolicy to
     update. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument auto_protection_policy on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTO_PROTECTION_POLICY
          ID of the AutoProtectionPolicy or fully qualified identifier for the
          AutoProtectionPolicy.

          To set the name attribute:
          + provide the argument auto_protection_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the AutoProtectionPolicy.

          To set the location attribute:
          + provide the argument auto_protection_policy on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --backup-plan-details=[backup-plan=BACKUP-PLAN],[resource-type=RESOURCE-TYPE]
        Backup plan details in format resource-type=VALUE,backup-plan=VALUE.

     --criteria=key=KEY,values=VALUES
        Criteria of the policy in format key=KEY,values=VALUE.

     --description=DESCRIPTION
        Description for the policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Update a Backup and DR AutoProtectionPolicy.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr auto-protection-policies update

        $ gcloud beta backup-dr auto-protection-policies update
```

### gcloud beta backup-dr auto-protection-policies create

```text
NAME
    gcloud beta backup-dr auto-protection-policies create - create a Backup and
        DR AutoProtectionPolicy

SYNOPSIS
    gcloud beta backup-dr auto-protection-policies create
        (AUTO_PROTECTION_POLICY : --location=LOCATION)
        --backup-plan-details=[backup-plan=BACKUP-PLAN],
          [resource-type=RESOURCE-TYPE] --criteria=key=KEY,values=VALUES
        [--async] [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr auto-protection-policies delete

```text
NAME
    gcloud beta backup-dr auto-protection-policies delete - delete a Backup and
        DR AutoProtectionPolicy

SYNOPSIS
    gcloud beta backup-dr auto-protection-policies delete
        (AUTO_PROTECTION_POLICY : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr auto-protection-policies describe

```text
NAME
    gcloud beta backup-dr auto-protection-policies describe - describe a Backup
        and DR AutoProtectionPolicy

SYNOPSIS
    gcloud beta backup-dr auto-protection-policies describe
        (AUTO_PROTECTION_POLICY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr auto-protection-policies list

```text
NAME
    gcloud beta backup-dr auto-protection-policies list - list Backup and DR
        AutoProtectionPolicies

SYNOPSIS
    gcloud beta backup-dr auto-protection-policies list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr auto-protection-policies update

```text
NAME
    gcloud beta backup-dr auto-protection-policies update - update a Backup and
        DR AutoProtectionPolicy

SYNOPSIS
    gcloud beta backup-dr auto-protection-policies update
        (AUTO_PROTECTION_POLICY : --location=LOCATION) [--async]
        [--backup-plan-details=[backup-plan=BACKUP-PLAN],
          [resource-type=RESOURCE-TYPE]] [--criteria=key=KEY,values=VALUES]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr auto-protection-policies create

```text
NAME
    gcloud alpha backup-dr auto-protection-policies create - create a Backup
        and DR AutoProtectionPolicy

SYNOPSIS
    gcloud alpha backup-dr auto-protection-policies create
        (AUTO_PROTECTION_POLICY : --location=LOCATION)
        --backup-plan-details=[backup-plan=BACKUP-PLAN],
          [resource-type=RESOURCE-TYPE] --criteria=key=KEY,values=VALUES
        [--async] [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr auto-protection-policies delete

```text
NAME
    gcloud alpha backup-dr auto-protection-policies delete - delete a Backup
        and DR AutoProtectionPolicy

SYNOPSIS
    gcloud alpha backup-dr auto-protection-policies delete
        (AUTO_PROTECTION_POLICY : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr auto-protection-policies describe

```text
NAME
    gcloud alpha backup-dr auto-protection-policies describe - describe a
        Backup and DR AutoProtectionPolicy

SYNOPSIS
    gcloud alpha backup-dr auto-protection-policies describe
        (AUTO_PROTECTION_POLICY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr auto-protection-policies list

```text
NAME
    gcloud alpha backup-dr auto-protection-policies list - list Backup and DR
        AutoProtectionPolicies

SYNOPSIS
    gcloud alpha backup-dr auto-protection-policies list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr auto-protection-policies update

```text
NAME
    gcloud alpha backup-dr auto-protection-policies update - update a Backup
        and DR AutoProtectionPolicy

SYNOPSIS
    gcloud alpha backup-dr auto-protection-policies update
        (AUTO_PROTECTION_POLICY : --location=LOCATION) [--async]
        [--backup-plan-details=[backup-plan=BACKUP-PLAN],
          [resource-type=RESOURCE-TYPE]] [--criteria=key=KEY,values=VALUES]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/auto-protection-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
