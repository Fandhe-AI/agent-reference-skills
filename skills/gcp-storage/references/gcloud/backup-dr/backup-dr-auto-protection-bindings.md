---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/auto-protection-bindings
---

# gcloud backup-dr auto-protection-bindings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr auto-protection-bindings create

```text
NAME
    gcloud backup-dr auto-protection-bindings create - create a Backup and DR
        auto-protection binding

SYNOPSIS
    gcloud backup-dr auto-protection-bindings create
        (AUTO_PROTECTION_POLICY_BINDING
          : --auto-protection-policy=AUTO_PROTECTION_POLICY
          --location=LOCATION) --scope=SCOPE [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Backup and DR auto-protection binding.

EXAMPLES
    To create a Backup and DR auto-protection binding, run:

        $ gcloud backup-dr auto-protection-bindings create my-binding-id \
            --auto-protection-policy=my-auto-protection-policy \
            --location=us-central1 --scope=projects/my-project

POSITIONAL ARGUMENTS
     Auto protection policy binding resource - The auto-protection binding to
     create. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument auto_protection_policy_binding on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTO_PROTECTION_POLICY_BINDING
          ID of the auto_protection_policy_binding or fully qualified
          identifier for the auto_protection_policy_binding.

          To set the auto_protection_policy_binding attribute:
          + provide the argument auto_protection_policy_binding on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --auto-protection-policy=AUTO_PROTECTION_POLICY
          The ID of the AutoProtectionPolicy.

          To set the auto-protection-policy attribute:
          + provide the argument auto_protection_policy_binding on the
            command line with a fully specified name;
          + provide the argument --auto-protection-policy on the command
            line.

       --location=LOCATION
          Location ID of the resource.

          To set the location attribute:
          + provide the argument auto_protection_policy_binding on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --scope=SCOPE
        The scope of the binding (e.g. projects/foo).

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        The description of the binding.

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

        $ gcloud alpha backup-dr auto-protection-bindings create

        $ gcloud beta backup-dr auto-protection-bindings create
```

### gcloud backup-dr auto-protection-bindings delete

```text
NAME
    gcloud backup-dr auto-protection-bindings delete - delete a Backup and DR
        auto-protection policy binding

SYNOPSIS
    gcloud backup-dr auto-protection-bindings delete
        (AUTO_PROTECTION_POLICY_BINDING
          : --auto-protection-policy=AUTO_PROTECTION_POLICY
          --location=LOCATION) [--async] [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Backup and DR auto-protection policy binding.

EXAMPLES
    To delete a Backup and DR auto-protection policy binding, run:

        $ gcloud backup-dr auto-protection-bindings delete my-binding-id \
            --auto-protection-policy=my-auto-protection-policy \
            --location=us-central1

POSITIONAL ARGUMENTS
     Auto protection policy binding resource - The auto-protection policy
     binding to delete. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument auto_protection_policy_binding on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTO_PROTECTION_POLICY_BINDING
          ID of the auto_protection_policy_binding or fully qualified
          identifier for the auto_protection_policy_binding.

          To set the auto_protection_policy_binding attribute:
          + provide the argument auto_protection_policy_binding on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --auto-protection-policy=AUTO_PROTECTION_POLICY
          The ID of the AutoProtectionPolicy.

          To set the auto_protection_policy attribute:
          + provide the argument auto_protection_policy_binding on the
            command line with a fully specified name;
          + provide the argument --auto-protection-policy on the command
            line.

       --location=LOCATION
          Location ID of the resource.

          To set the location attribute:
          + provide the argument auto_protection_policy_binding on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr auto-protection-bindings delete

        $ gcloud beta backup-dr auto-protection-bindings delete
```

### gcloud backup-dr auto-protection-bindings describe

```text
NAME
    gcloud backup-dr auto-protection-bindings describe - describe a Backup and
        DR auto-protection binding

SYNOPSIS
    gcloud backup-dr auto-protection-bindings describe
        (AUTO_PROTECTION_POLICY_BINDING
          : --auto-protection-policy=AUTO_PROTECTION_POLICY
          --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Backup and DR auto-protection binding.

EXAMPLES
    To describe a Backup and DR auto-protection binding, run:

        $ gcloud backup-dr auto-protection-bindings describe my-binding-id \
            --auto-protection-policy=my-auto-protection-policy \
            --location=us-central1

POSITIONAL ARGUMENTS
     Auto protection policy binding resource - The auto-protection binding to
     describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument auto_protection_policy_binding on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTO_PROTECTION_POLICY_BINDING
          ID of the auto_protection_policy_binding or fully qualified
          identifier for the auto_protection_policy_binding.

          To set the auto_protection_policy_binding attribute:
          + provide the argument auto_protection_policy_binding on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --auto-protection-policy=AUTO_PROTECTION_POLICY
          The ID of the AutoProtectionPolicy.

          To set the auto-protection-policy attribute:
          + provide the argument auto_protection_policy_binding on the
            command line with a fully specified name;
          + provide the argument --auto-protection-policy on the command
            line.

       --location=LOCATION
          Location ID of the resource.

          To set the location attribute:
          + provide the argument auto_protection_policy_binding on the
            command line with a fully specified name;
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

        $ gcloud alpha backup-dr auto-protection-bindings describe

        $ gcloud beta backup-dr auto-protection-bindings describe
```

### gcloud backup-dr auto-protection-bindings list

```text
NAME
    gcloud backup-dr auto-protection-bindings list - list Backup and DR
        auto-protection bindings

SYNOPSIS
    gcloud backup-dr auto-protection-bindings list
        (--auto-protection-policy=AUTO_PROTECTION_POLICY : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Backup and DR auto-protection bindings.

EXAMPLES
    To list Backup and DR auto-protection bindings for a specific
    auto-protection-policy, run:

        $ gcloud backup-dr auto-protection-bindings list \
            --auto-protection-policy=my-auto-protection-policy \
            --location=us-central1

REQUIRED FLAGS
     Auto protection policy resource - The auto-protection policy whose
     bindings should be listed. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --auto-protection-policy on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --auto-protection-policy=AUTO_PROTECTION_POLICY
          ID of the auto_protection_policy or fully qualified identifier for
          the auto_protection_policy.

          To set the auto-protection-policy attribute:
          + provide the argument --auto-protection-policy on the command
            line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          Location ID of the resource.

          To set the location attribute:
          + provide the argument --auto-protection-policy on the command line
            with a fully specified name;
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

API REFERENCE
    This command uses the backupdr/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/backup-disaster-recovery

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr auto-protection-bindings list

        $ gcloud beta backup-dr auto-protection-bindings list
```

### gcloud beta backup-dr auto-protection-bindings create

```text
NAME
    gcloud beta backup-dr auto-protection-bindings create - create a Backup and
        DR auto-protection binding

SYNOPSIS
    gcloud beta backup-dr auto-protection-bindings create
        (AUTO_PROTECTION_POLICY_BINDING
          : --auto-protection-policy=AUTO_PROTECTION_POLICY
          --location=LOCATION) --scope=SCOPE [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr auto-protection-bindings delete

```text
NAME
    gcloud beta backup-dr auto-protection-bindings delete - delete a Backup and
        DR auto-protection policy binding

SYNOPSIS
    gcloud beta backup-dr auto-protection-bindings delete
        (AUTO_PROTECTION_POLICY_BINDING
          : --auto-protection-policy=AUTO_PROTECTION_POLICY
          --location=LOCATION) [--async] [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr auto-protection-bindings describe

```text
NAME
    gcloud beta backup-dr auto-protection-bindings describe - describe a Backup
        and DR auto-protection binding

SYNOPSIS
    gcloud beta backup-dr auto-protection-bindings describe
        (AUTO_PROTECTION_POLICY_BINDING
          : --auto-protection-policy=AUTO_PROTECTION_POLICY
          --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr auto-protection-bindings list

```text
NAME
    gcloud beta backup-dr auto-protection-bindings list - list Backup and DR
        auto-protection bindings

SYNOPSIS
    gcloud beta backup-dr auto-protection-bindings list
        (--auto-protection-policy=AUTO_PROTECTION_POLICY : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr auto-protection-bindings create

```text
NAME
    gcloud alpha backup-dr auto-protection-bindings create - create a Backup
        and DR auto-protection binding

SYNOPSIS
    gcloud alpha backup-dr auto-protection-bindings create
        (AUTO_PROTECTION_POLICY_BINDING
          : --auto-protection-policy=AUTO_PROTECTION_POLICY
          --location=LOCATION) --scope=SCOPE [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr auto-protection-bindings delete

```text
NAME
    gcloud alpha backup-dr auto-protection-bindings delete - delete a Backup
        and DR auto-protection policy binding

SYNOPSIS
    gcloud alpha backup-dr auto-protection-bindings delete
        (AUTO_PROTECTION_POLICY_BINDING
          : --auto-protection-policy=AUTO_PROTECTION_POLICY
          --location=LOCATION) [--async] [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr auto-protection-bindings describe

```text
NAME
    gcloud alpha backup-dr auto-protection-bindings describe - describe a
        Backup and DR auto-protection binding

SYNOPSIS
    gcloud alpha backup-dr auto-protection-bindings describe
        (AUTO_PROTECTION_POLICY_BINDING
          : --auto-protection-policy=AUTO_PROTECTION_POLICY
          --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr auto-protection-bindings list

```text
NAME
    gcloud alpha backup-dr auto-protection-bindings list - list Backup and DR
        auto-protection bindings

SYNOPSIS
    gcloud alpha backup-dr auto-protection-bindings list
        (--auto-protection-policy=AUTO_PROTECTION_POLICY : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/auto-protection-bindings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
