---
source: https://docs.cloud.google.com/sdk/gcloud/reference/asset/saved-queries
---

# gcloud asset saved-queries

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud asset saved-queries create

```text
NAME
    gcloud asset saved-queries create - create a Cloud Asset Inventory saved
        query

SYNOPSIS
    gcloud asset saved-queries create QUERY_ID
        --query-file-path=QUERY_FILE_PATH
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Cloud Asset Inventory saved query.

EXAMPLES
    To create a new saved 'query-id-1' in project 'p1' with the content of the
    query stored locally in query.json, run:

        $ gcloud asset saved-queries create query-id-1 --project=p1 \
            --query-file-path=./query-content.json \
            --description="This is an example saved query with query id \
        query-id-1" --labels="key1=val1"

POSITIONAL ARGUMENTS
     QUERY_ID
        Saved query identifier being created. It must be unique under the
        specified parent resource project/folder/organization.

REQUIRED FLAGS
     --query-file-path=QUERY_FILE_PATH
        Path to JSON or YAML file that contains the query.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the saved query.

       --organization=ORGANIZATION_ID
          Organization of the saved query.

       --project=PROJECT_ID
          Project of the saved query.

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
     --description=DESCRIPTION
        A string describing the query.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha asset saved-queries create

        $ gcloud beta asset saved-queries create
```

### gcloud asset saved-queries delete

```text
NAME
    gcloud asset saved-queries delete - delete a Cloud Asset Inventory saved
        query

SYNOPSIS
    gcloud asset saved-queries delete QUERY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Cloud Asset Inventory saved query.

EXAMPLES
    To delete a saved query with id 'query1' in project 'p1', run:

        $ gcloud asset saved-queries delete query1 --project=p1

POSITIONAL ARGUMENTS
     QUERY_ID
        Asset saved query identifier to be deleted. It must be unique under the
        specified parent resource project/folder/organization.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the saved query.

       --organization=ORGANIZATION_ID
          Organization of the saved query.

       --project=PROJECT_ID
          Project of the saved query.

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

        $ gcloud alpha asset saved-queries delete

        $ gcloud beta asset saved-queries delete
```

### gcloud asset saved-queries describe

```text
NAME
    gcloud asset saved-queries describe - describe a Cloud Asset Inventory
        saved query

SYNOPSIS
    gcloud asset saved-queries describe QUERY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Asset Inventory saved query.

EXAMPLES
    To describe a saved query with query id 'query1' in project 'p1', run:

        $ gcloud asset saved-queries describe query1 --project=p1

POSITIONAL ARGUMENTS
     QUERY_ID
        Asset Saved Query identifier being described. It must be unique under
        the specified parent resource: project/folder/organization.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the saved query.

       --organization=ORGANIZATION_ID
          Organization of the saved query.

       --project=PROJECT_ID
          Project of the saved query.

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

        $ gcloud alpha asset saved-queries describe

        $ gcloud beta asset saved-queries describe
```

### gcloud asset saved-queries list

```text
NAME
    gcloud asset saved-queries list - list Cloud Asset Inventory saved query

SYNOPSIS
    gcloud asset saved-queries list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Cloud Asset Inventory saved queries under a parent resource.

EXAMPLES
    To list saved queries in organization 'org1', run:

        $ gcloud asset saved-queries list --organization=org1

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the saved query.

       --organization=ORGANIZATION_ID
          Organization of the saved query.

       --project=PROJECT_ID
          Project of the saved query.

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

        $ gcloud alpha asset saved-queries list

        $ gcloud beta asset saved-queries list
```

### gcloud asset saved-queries update

```text
NAME
    gcloud asset saved-queries update - update an existing Cloud Asset
        Inventory saved query

SYNOPSIS
    gcloud asset saved-queries update QUERY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--description=DESCRIPTION]
        [--query-file-path=QUERY_FILE_PATH] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing Cloud Asset Inventory saved query.

EXAMPLES
    To update the content of an existing saved query, run:

        $ gcloud asset saved-queries update query-id-1 --project=p1 \
            --query-file-path=./query-content.json \
            --description="updating a query with query id query-id-1" \
            --update-labels="key1=val1"

POSITIONAL ARGUMENTS
     QUERY_ID
        Saved query identifier being updated. It must be unique under the
        specified parent resource project/folder/organization.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the saved query.

       --organization=ORGANIZATION_ID
          Organization of the saved query.

       --project=PROJECT_ID
          Project of the saved query.

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
     --description=DESCRIPTION
        A string describing the query.

     --query-file-path=QUERY_FILE_PATH
        Path to JSON or YAML file that contains the query.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud asset saved-queries update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud asset saved-queries update --clear-labels \
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
    These variants are also available:

        $ gcloud alpha asset saved-queries update

        $ gcloud beta asset saved-queries update
```

### gcloud beta asset saved-queries create

```text
NAME
    gcloud beta asset saved-queries create - create a Cloud Asset Inventory
        saved query

SYNOPSIS
    gcloud beta asset saved-queries create QUERY_ID
        --query-file-path=QUERY_FILE_PATH
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta asset saved-queries delete

```text
NAME
    gcloud beta asset saved-queries delete - delete a Cloud Asset Inventory
        saved query

SYNOPSIS
    gcloud beta asset saved-queries delete QUERY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta asset saved-queries describe

```text
NAME
    gcloud beta asset saved-queries describe - describe a Cloud Asset Inventory
        saved query

SYNOPSIS
    gcloud beta asset saved-queries describe QUERY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta asset saved-queries list

```text
NAME
    gcloud beta asset saved-queries list - list Cloud Asset Inventory saved
        query

SYNOPSIS
    gcloud beta asset saved-queries list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta asset saved-queries update

```text
NAME
    gcloud beta asset saved-queries update - update an existing Cloud Asset
        Inventory saved query

SYNOPSIS
    gcloud beta asset saved-queries update QUERY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--description=DESCRIPTION]
        [--query-file-path=QUERY_FILE_PATH] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha asset saved-queries create

```text
NAME
    gcloud alpha asset saved-queries create - create a Cloud Asset Inventory
        saved query

SYNOPSIS
    gcloud alpha asset saved-queries create QUERY_ID
        --query-file-path=QUERY_FILE_PATH
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha asset saved-queries delete

```text
NAME
    gcloud alpha asset saved-queries delete - delete a Cloud Asset Inventory
        saved query

SYNOPSIS
    gcloud alpha asset saved-queries delete QUERY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha asset saved-queries describe

```text
NAME
    gcloud alpha asset saved-queries describe - describe a Cloud Asset
        Inventory saved query

SYNOPSIS
    gcloud alpha asset saved-queries describe QUERY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha asset saved-queries list

```text
NAME
    gcloud alpha asset saved-queries list - list Cloud Asset Inventory saved
        query

SYNOPSIS
    gcloud alpha asset saved-queries list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha asset saved-queries update

```text
NAME
    gcloud alpha asset saved-queries update - update an existing Cloud Asset
        Inventory saved query

SYNOPSIS
    gcloud alpha asset saved-queries update QUERY_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--description=DESCRIPTION]
        [--query-file-path=QUERY_FILE_PATH] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/asset/saved-queries (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
