---
source: https://docs.cloud.google.com/sdk/gcloud/reference/quotas/preferences
---

# gcloud quotas preferences

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud quotas preferences create

```text
NAME
    gcloud quotas preferences create - create a new QuotaPreference that
        declares the desired value for a quota

SYNOPSIS
    gcloud quotas preferences create --preferred-value=PREFERRED_VALUE
        --quota-id=QUOTA_ID --service=SERVICE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER)
        [--allow-high-percentage-quota-decrease]
        [--allow-quota-decrease-below-usage] [--dimensions=[KEY=VALUE,...]]
        [--email=EMAIL] [--justification=JUSTIFICATION]
        [--preference-id=PREFERENCE_ID] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To create a quota preference in region us-central1 that applies to the
    default_limit quota under service example.googleapis.com for
    projects/12321, run:

        $ gcloud quotas preferences create \
            --service=example.googleapis.com --project=12321 \
            --quota-id=default_limit --preferred-value=100 \
            --dimensions=region=us-central1 \
            --preference-id=example_default-limit_us-central1

    To create a quota preference under service example.googleapis.com for
    organizations/789 with random preference ID, run:

        $ gcloud quotas preferences create \
            --service=example.googleapis.com --organization=789 \
            --quota-id=default_limit --preferred-value=200

REQUIRED FLAGS
     --preferred-value=PREFERRED_VALUE
        Preferred value. Must be greater than or equal to -1. If set to -1, it
        means the value is "unlimited".

     --quota-id=QUOTA_ID
        ID of the quota, which is unique within the service.

     --service=SERVICE
        Name of the service in which the quota is defined.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the quota preference to create.

       --organization=ORGANIZATION_ID
          Organization of the quota preference to create.

       --project=PROJECT_ID_OR_NUMBER
          Project of the quota preference to create.

OPTIONAL FLAGS
     --allow-high-percentage-quota-decrease
        If specified, allows you to reduce your effective limit by more than 10
        percent. Default is false.

     --allow-quota-decrease-below-usage
        If specified, allows you to reduce your effective limit below your
        quota usage. Default is false.

     --dimensions=[KEY=VALUE,...]
        Dimensions of the quota.

     --email=EMAIL
        An optional email address that can be used for quota related
        communication between the Google Cloud and the user in case the Google
        Cloud needs further information to make a decision on whether the user
        preferred quota can be granted. The Google account for the email
        address must have quota update permission for the project, folder or
        organization this quota preference is for. If no contact email address
        is provided, or the provided email address does not have the required
        quota update permission, the quota preference request will be denied in
        case further information is required to make a decision.

     --justification=JUSTIFICATION
        A short statement to justify quota increase requests.

     --preference-id=PREFERENCE_ID
        ID of the Quota Preference object, must be unique under its parent.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha quotas preferences create

        $ gcloud beta quotas preferences create
```

### gcloud quotas preferences describe

```text
NAME
    gcloud quotas preferences describe - get details about a single
        QuotaPreference

SYNOPSIS
    gcloud quotas preferences describe PREFERENCE_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To get the details about quota preference my-preference for projects/12321,
    run:

        $ gcloud quotas preferences describe my-preference --project=12321
        $ gcloud quotas preferences describe my-preference \
            --project=my-project-id

    To get the details about quota preference my-preference for folders/123,
    run:

        $ gcloud quotas preferences describe my-preference --folder=123

POSITIONAL ARGUMENTS
     PREFERENCE_ID
        ID of the Quota Preference object, must be unique under its parent.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the quota preference to describe.

       --organization=ORGANIZATION_ID
          Organization of the quota preference to describe.

       --project=PROJECT_ID_OR_NUMBER
          Project of the quota preference to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha quotas preferences describe

        $ gcloud beta quotas preferences describe
```

### gcloud quotas preferences list

```text
NAME
    gcloud quotas preferences list - list QuotaPreferences in a given project,
        folder or organization

SYNOPSIS
    gcloud quotas preferences list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [--reconciling-only]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To list the quota preferences for projects/12321, run:

        $ gcloud quotas preferences list --project=12321
        $ gcloud quotas preferences list --project=my-project-id

    To list first 10 quota preferences ordered by create time for folder/123,
    run:

        $ gcloud quotas preferences list --folder=123 --page-size=10 \
            --sort-by=create_time

    To list all quota preferences in unresolved state in region us-central1 for
    organization/789, run:

        $ gcloud quotas preferences list --organization=789 \
            --filter=dimensions.region:us-central1 --reconciling-only

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the quota preferences to list.

       --organization=ORGANIZATION_ID
          Organization of the quota preferences to list.

       --project=PROJECT_ID_OR_NUMBER
          Project of the quota preferences to list.

FLAGS
     --reconciling-only
        If specified, only displays quota preferences in unresolved states.
        Default is false.

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

        $ gcloud alpha quotas preferences list

        $ gcloud beta quotas preferences list
```

### gcloud quotas preferences update

```text
NAME
    gcloud quotas preferences update - update the parameters of a single
        QuotaPreference

SYNOPSIS
    gcloud quotas preferences update PREFERENCE_ID
        --preferred-value=PREFERRED_VALUE --quota-id=QUOTA_ID --service=SERVICE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER)
        [--allow-high-percentage-quota-decrease] [--allow-missing]
        [--allow-quota-decrease-below-usage] [--dimensions=[KEY=VALUE,...]]
        [--email=EMAIL] [--justification=JUSTIFICATION] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command updates an existing or creates a new QuotaPreference. It can
    updates the config in any states, not just the ones pending approval.

EXAMPLES
    To update a quota preference with id my-preference in region us-central1
    that applies to the default_limit quota for projects/12321, run:

        $ gcloud quotas preferences update my-preference \
            --service=example.googleapis.com --project=12321 \
            --quota-id=default_limit --preferred-value=100 \
            --dimensions=region=us-central1

    To create a new quota preference for organizations/789, run:

        $ gcloud quotas preferences update my-preference \
            --service=example.googleapis.com --organization=789 \
            --quota-id=default_limit --preferred-value=200 --allow-missing

POSITIONAL ARGUMENTS
     PREFERENCE_ID
        ID of the Quota Preference object, must be unique under its parent.

REQUIRED FLAGS
     --preferred-value=PREFERRED_VALUE
        Preferred value. Must be greater than or equal to -1. If set to -1, it
        means the value is "unlimited".

     --quota-id=QUOTA_ID
        ID of the quota, which is unique within the service.

     --service=SERVICE
        Name of the service in which the quota is defined.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the quota preference to update.

       --organization=ORGANIZATION_ID
          Organization of the quota preference to update.

       --project=PROJECT_ID_OR_NUMBER
          Project of the quota preference to update.

OPTIONAL FLAGS
     --allow-high-percentage-quota-decrease
        If specified, allows you to reduce your effective limit by more than 10
        percent. Default is false.

     --allow-missing
        If specified and the quota preference is not found, a new one will be
        created. Default is false.

     --allow-quota-decrease-below-usage
        If specified, allows you to reduce your effective limit below your
        quota usage. Default is false.

     --dimensions=[KEY=VALUE,...]
        Dimensions of the quota.

     --email=EMAIL
        An optional email address that can be used for quota related
        communication between the Google Cloud and the user in case the Google
        Cloud needs further information to make a decision on whether the user
        preferred quota can be granted. The Google account for the email
        address must have quota update permission for the project, folder or
        organization this quota preference is for. If no contact email address
        is provided, or the provided email address does not have the required
        quota update permission, the quota preference request will be denied in
        case further information is required to make a decision.

     --justification=JUSTIFICATION
        A short statement to justify quota increase requests.

     --validate-only
        If specified, only validates the request, but does not actually update.
        Note that a request being valid does not mean that the request is
        guaranteed to be fulfilled. Default is false.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha quotas preferences update

        $ gcloud beta quotas preferences update
```

### gcloud beta quotas preferences create

```text
NAME
    gcloud beta quotas preferences create - create a new QuotaPreference that
        declares the desired value for a quota

SYNOPSIS
    gcloud beta quotas preferences create --preferred-value=PREFERRED_VALUE
        --quota-id=QUOTA_ID --service=SERVICE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER)
        [--allow-high-percentage-quota-decrease]
        [--allow-quota-decrease-below-usage] [--dimensions=[KEY=VALUE,...]]
        [--email=EMAIL] [--justification=JUSTIFICATION]
        [--preference-id=PREFERENCE_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta quotas preferences describe

```text
NAME
    gcloud beta quotas preferences describe - get details about a single
        QuotaPreference

SYNOPSIS
    gcloud beta quotas preferences describe PREFERENCE_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta quotas preferences list

```text
NAME
    gcloud beta quotas preferences list - list QuotaPreferences in a given
        project, folder or organization

SYNOPSIS
    gcloud beta quotas preferences list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [--reconciling-only]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta quotas preferences update

```text
NAME
    gcloud beta quotas preferences update - update the parameters of a single
        QuotaPreference

SYNOPSIS
    gcloud beta quotas preferences update PREFERENCE_ID
        --preferred-value=PREFERRED_VALUE --quota-id=QUOTA_ID --service=SERVICE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER)
        [--allow-high-percentage-quota-decrease] [--allow-missing]
        [--allow-quota-decrease-below-usage] [--dimensions=[KEY=VALUE,...]]
        [--email=EMAIL] [--justification=JUSTIFICATION] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha quotas preferences create

```text
NAME
    gcloud alpha quotas preferences create - create a new QuotaPreference that
        declares the desired value for a quota

SYNOPSIS
    gcloud alpha quotas preferences create --preferred-value=PREFERRED_VALUE
        --quota-id=QUOTA_ID --service=SERVICE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER)
        [--allow-high-percentage-quota-decrease]
        [--allow-quota-decrease-below-usage] [--dimensions=[KEY=VALUE,...]]
        [--email=EMAIL] [--justification=JUSTIFICATION]
        [--preference-id=PREFERENCE_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha quotas preferences describe

```text
NAME
    gcloud alpha quotas preferences describe - get details about a single
        QuotaPreference

SYNOPSIS
    gcloud alpha quotas preferences describe PREFERENCE_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha quotas preferences list

```text
NAME
    gcloud alpha quotas preferences list - list QuotaPreferences in a given
        project, folder or organization

SYNOPSIS
    gcloud alpha quotas preferences list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [--reconciling-only]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha quotas preferences update

```text
NAME
    gcloud alpha quotas preferences update - update the parameters of a single
        QuotaPreference

SYNOPSIS
    gcloud alpha quotas preferences update PREFERENCE_ID
        --preferred-value=PREFERRED_VALUE --quota-id=QUOTA_ID --service=SERVICE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER)
        [--allow-high-percentage-quota-decrease] [--allow-missing]
        [--allow-quota-decrease-below-usage] [--dimensions=[KEY=VALUE,...]]
        [--email=EMAIL] [--justification=JUSTIFICATION] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/quotas/preferences (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
