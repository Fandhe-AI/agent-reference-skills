---
source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/quota-rules
---

# gcloud netapp volumes quota-rules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud netapp volumes quota-rules create

```text
NAME
    gcloud netapp volumes quota-rules create - create a Cloud NetApp Volume
        Quota Rule

SYNOPSIS
    gcloud netapp volumes quota-rules create (QUOTA_RULE : --location=LOCATION)
        --disk-limit-mib=DISK_LIMIT_MIB --type=TYPE [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--target=TARGET] [--volume=VOLUME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud NetApp Volume Quota Rule.

EXAMPLES
    The following command creates a default user Quota Rule named NAME using
    the required arguments:

        $ gcloud netapp volumes quota-rules create NAME \
          --location=us-central1 --volume=vol1 --type=DEFAULT_USER_QUOTA \
          --disk-limit-mib=200

    The following command creates a default group Quota Rule named NAME using
    the required arguments:

        $ gcloud netapp volumes quota-rules create NAME \
          --location=us-central1 --volume=vol1 \
          --type=DEFAULT_GROUP_QUOTA --disk-limit-mib=200

    The following command creates an individual user Quota Rule named NAME for
    user with UID '100' using the required arguments:

        $ gcloud netapp volumes quota-rules create NAME \
          --location=us-central1 --volume=vol1 \
          --type=INDIVIDUAL_USER_QUOTA --target=100 --disk-limit-mib=200

    The following command creates an individual group Quota Rule named NAME for
    group with GID '1001' using the required arguments:

        $ gcloud netapp volumes quota-rules create NAME \
          --location=us-central1 --volume=vol1 \
          --type=INDIVIDUAL_GROUP_QUOTA --target=1001 --disk-limit-mib=200

POSITIONAL ARGUMENTS
     Quota rule resource - The Quota rule to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument quota_rule on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument quota_rule on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       QUOTA_RULE
          ID of the quota_rule or fully qualified identifier for the
          quota_rule.

          To set the quota_rule attribute:
          + provide the argument quota_rule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the quota_rule.

          To set the location attribute:
          + provide the argument quota_rule on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

REQUIRED FLAGS
     --disk-limit-mib=DISK_LIMIT_MIB
        The disk limit in MiB for the quota rule.

     --type=TYPE
        String indicating the type of quota rule. The supported values are:
        'DEFAULT_USER_QUOTA','DEFAULT_GROUP_QUOTA','INDIVIDUAL_USER_QUOTA','INDIVIDUAL_GROUP_QUOTA'

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A description of the Cloud NetApp Quota rule

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --target=TARGET
        The target of the quota rule. Identified by a Unix UID/GID, Windows
        SID, or null for default.

     Volume resource - The volume for which quota rule applies. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta netapp volumes quota-rules create
```

### gcloud netapp volumes quota-rules delete

```text
NAME
    gcloud netapp volumes quota-rules delete - delete a Cloud NetApp Volume
        QuotaRule

SYNOPSIS
    gcloud netapp volumes quota-rules delete (QUOTA_RULE : --location=LOCATION)
        [--async] [--volume=VOLUME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Cloud NetApp Volume QuotaRule.

EXAMPLES
    The following command deletes a QuotaRule named NAME using the required
    arguments:

        $ gcloud netapp volumes quota-rules delete NAME \
          --location=us-central1 --volume=vol1

    To delete a QuotaRule named NAME asynchronously, run the following command:

        $ gcloud netapp volumes quota-rules delete NAME \
          --location=us-central1 --volume=vol1 --async

POSITIONAL ARGUMENTS
     Quota rule resource - The Quota Rule to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument quota_rule on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument quota_rule on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       QUOTA_RULE
          ID of the quota_rule or fully qualified identifier for the
          quota_rule.

          To set the quota_rule attribute:
          + provide the argument quota_rule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the quota_rule.

          To set the location attribute:
          + provide the argument quota_rule on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Volume resource - The volume for which quota rule applies. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta netapp volumes quota-rules delete
```

### gcloud netapp volumes quota-rules describe

```text
NAME
    gcloud netapp volumes quota-rules describe - describe a Cloud NetApp Volume
        Quota Rule

SYNOPSIS
    gcloud netapp volumes quota-rules describe
        (QUOTA_RULE : --location=LOCATION) [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud NetApp Volume Quota Rule.

EXAMPLES
    The following command describes a Quota Rule named NAME in the given
    location and volume:

        $ gcloud netapp volumes quota-rules describe NAME \
          --location=us-central1 --volume=vol1

POSITIONAL ARGUMENTS
     Quota rule resource - The Quota Rule to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument quota_rule on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument quota_rule on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       QUOTA_RULE
          ID of the quota_rule or fully qualified identifier for the
          quota_rule.

          To set the quota_rule attribute:
          + provide the argument quota_rule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the quota_rule.

          To set the location attribute:
          + provide the argument quota_rule on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     Volume resource - The volume for which quota rule applies. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta netapp volumes quota-rules describe
```

### gcloud netapp volumes quota-rules list

```text
NAME
    gcloud netapp volumes quota-rules list - list Cloud NetApp Volume
        QuotaRules

SYNOPSIS
    gcloud netapp volumes quota-rules list [--location=LOCATION]
        [--volume=VOLUME] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists Cloud NetApp Volume QuotaRules.

EXAMPLES
    The following command lists all QuotaRules in the given location and
    volume:

        $ gcloud netapp volumes quota-rules list --location=us-central1 \
          --volume=vol1

FLAGS
     Location resource - The location in which to list Volume QuotaRules. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * uses all locations by default. with a fully specified name;
      * set the property netapp/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * uses all locations by default.;
        * set the property netapp/location.

     Volume resource - The volume for which quota rule applies. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

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
    This variant is also available:

        $ gcloud beta netapp volumes quota-rules list
```

### gcloud netapp volumes quota-rules update

```text
NAME
    gcloud netapp volumes quota-rules update - update a Cloud NetApp Volume
        QuotaRule

SYNOPSIS
    gcloud netapp volumes quota-rules update (QUOTA_RULE : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--disk-limit-mib=DISK_LIMIT_MIB]
        [--update-labels=[KEY=VALUE,...]] [--volume=VOLUME]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Cloud NetApp Volume QuotaRule and its specified parameters.

EXAMPLES
    The following command updates a QuotaRule named NAME and its specified
    parameters:

        $ gcloud netapp volumes quota-rules update NAME \
          --location=us-central1 --description="new" \
          --disk-limit-mib=100 --update-labels=key2=val2 --volume=vol1

POSITIONAL ARGUMENTS
     Quota rule resource - The Quota rule to update. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument quota_rule on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument quota_rule on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       QUOTA_RULE
          ID of the quota_rule or fully qualified identifier for the
          quota_rule.

          To set the quota_rule attribute:
          + provide the argument quota_rule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the quota_rule.

          To set the location attribute:
          + provide the argument quota_rule on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A description of the Cloud NetApp Quota rule

     --disk-limit-mib=DISK_LIMIT_MIB
        The disk limit in MiB for the quota rule.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     Volume resource - The volume for which quota rule applies. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud netapp volumes quota-rules update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud netapp volumes quota-rules update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta netapp volumes quota-rules update
```

### gcloud beta netapp volumes quota-rules create

```text
NAME
    gcloud beta netapp volumes quota-rules create - create a Cloud NetApp
        Volume Quota Rule

SYNOPSIS
    gcloud beta netapp volumes quota-rules create
        (QUOTA_RULE : --location=LOCATION) --disk-limit-mib=DISK_LIMIT_MIB
        --type=TYPE [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--target=TARGET] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes quota-rules delete

```text
NAME
    gcloud beta netapp volumes quota-rules delete - delete a Cloud NetApp
        Volume Quota Rule

SYNOPSIS
    gcloud beta netapp volumes quota-rules delete
        (QUOTA_RULE : --location=LOCATION) [--async] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes quota-rules describe

```text
NAME
    gcloud beta netapp volumes quota-rules describe - describe a Cloud NetApp
        Volume Quota Rule

SYNOPSIS
    gcloud beta netapp volumes quota-rules describe
        (QUOTA_RULE : --location=LOCATION) [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes quota-rules list

```text
NAME
    gcloud beta netapp volumes quota-rules list - list Cloud NetApp Volume
        QuotaRules

SYNOPSIS
    gcloud beta netapp volumes quota-rules list [--location=LOCATION]
        [--volume=VOLUME] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes quota-rules update

```text
NAME
    gcloud beta netapp volumes quota-rules update - update a Cloud NetApp
        Volume Quota Rule

SYNOPSIS
    gcloud beta netapp volumes quota-rules update
        (QUOTA_RULE : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--disk-limit-mib=DISK_LIMIT_MIB]
        [--update-labels=[KEY=VALUE,...]] [--volume=VOLUME]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/quota-rules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
