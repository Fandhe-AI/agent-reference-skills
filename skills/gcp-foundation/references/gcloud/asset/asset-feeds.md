---
source: https://docs.cloud.google.com/sdk/gcloud/reference/asset/feeds
---

# gcloud asset feeds

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud asset feeds create

```text
NAME
    gcloud asset feeds create - create a Cloud Asset Inventory Feed

SYNOPSIS
    gcloud asset feeds create FEED_ID --pubsub-topic=PUBSUB_TOPIC
        (--asset-names=[ASSET_NAMES,...] --asset-types=[ASSET_TYPES,...]
          --relationship-types=[RELATIONSHIP_TYPES,...])
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID)
        [--condition-description=CONDITION_DESCRIPTION]
        [--condition-expression=CONDITION_EXPRESSION]
        [--condition-title=CONDITION_TITLE] [--content-type=CONTENT_TYPE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Cloud Asset Inventory Feed for updates on assets.

EXAMPLES
    To create a new feed 'feed1' in project 'p1' which alerts on compute disks
    and network resources types, run:

        $ gcloud asset feeds create feed1 --project=p1 \
            --asset-types=compute.googleapis.com/Network,\
        compute.googleapis.com/Disk --content-type=resource \
            --pubsub-topic=projects/project1/topics/feed-topic

POSITIONAL ARGUMENTS
     FEED_ID
        Asset feed identifier being created, it must be unique under the
        specified parent resource project/folder/organization.

REQUIRED FLAGS
     --pubsub-topic=PUBSUB_TOPIC
        Name of the Cloud Pub/Sub topic to publish to, of the form
        projects/PROJECT_ID/topics/TOPIC_ID. You can list existing topics with
        gcloud pubsub topics list --format="text(name)"

     At least one of these must be specified:

       --asset-names=[ASSET_NAMES,...]
          A comma-separated list of the full names of the assets to receive
          updates. For example:
          //compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1.
          For more information, see:
          https://cloud.google.com/apis/design/resource_names#full_resource_name

       --asset-types=[ASSET_TYPES,...]
          A comma-separated list of types of the assets types to receive
          updates. For example:
          compute.googleapis.com/Disk,compute.googleapis.com/Network. Regular
          expressions (https://github.com/google/re2/wiki/Syntax) are also
          supported. For more information, see:
          https://cloud.google.com/resource-manager/docs/cloud-asset-inventory/overview

       --relationship-types=[RELATIONSHIP_TYPES,...]
          A comma-separated list of the relationship types (i.e.,
          "INSTANCE_TO_INSTANCEGROUP") to receive updates. This argument will
          only be honoured if content_type=RELATIONSHIP.See
          http://cloud.google.com/asset-inventory/docs/supported-asset-types
          for supported relationship types.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the feed.

       --organization=ORGANIZATION_ID
          Organization of the feed.

       --project=PROJECT_ID
          project of the feed.

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
     --condition-description=CONDITION_DESCRIPTION
        Description of the feed condition. For reference only.

     --condition-expression=CONDITION_EXPRESSION
        Feed condition expression. If not specified, no condition will be
        applied to feed. For more information, see:
        https://cloud.google.com/asset-inventory/docs/monitoring-asset-changes#feed_with_condition

     --condition-title=CONDITION_TITLE
        Title of the feed condition. For reference only.

     --content-type=CONTENT_TYPE
        Asset content type. If not specified, no content but the asset name and
        type will be returned in the feed. For more information, see
        https://cloud.google.com/resource-manager/docs/cloud-asset-inventory/overview#asset_content_type.
        CONTENT_TYPE must be one of: resource, iam-policy, org-policy,
        access-policy, os-inventory, relationship.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha asset feeds create

        $ gcloud beta asset feeds create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud asset feeds create feed1 \
    --project=p1 \
    --asset-types=compute.googleapis.com/Network,compute.googleapis.com/Disk \
    --content-type=resource \
    --pubsub-topic=projects/project1/topics/feed-topic
```

### gcloud asset feeds delete

```text
NAME
    gcloud asset feeds delete - delete a Cloud Asset Inventory Feed

SYNOPSIS
    gcloud asset feeds delete FEED_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Cloud Asset Inventory Feed.

EXAMPLES
    To delete a feed 'feed1' in project 'p1', run:

        $ gcloud asset feeds delete feed1 --project=p1

POSITIONAL ARGUMENTS
     FEED_ID
        Asset feed identifier to delete.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the feed.

       --organization=ORGANIZATION_ID
          Organization of the feed.

       --project=PROJECT_ID
          project of the feed.

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

        $ gcloud alpha asset feeds delete

        $ gcloud beta asset feeds delete
```

### gcloud asset feeds describe

```text
NAME
    gcloud asset feeds describe - describe a Cloud Asset Inventory Feed

SYNOPSIS
    gcloud asset feeds describe FEED_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Asset Inventory Feed.

EXAMPLES
    To describe a feed 'feed1' in project 'p1', run:

        $ gcloud asset feeds describe feed1 --project=p1

POSITIONAL ARGUMENTS
     FEED_ID
        Asset feed identifier to describe.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the feed.

       --organization=ORGANIZATION_ID
          Organization of the feed.

       --project=PROJECT_ID
          project of the feed.

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

        $ gcloud alpha asset feeds describe

        $ gcloud beta asset feeds describe
```

### gcloud asset feeds list

```text
NAME
    gcloud asset feeds list - list Cloud Asset Inventory Feeds

SYNOPSIS
    gcloud asset feeds list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Cloud Asset Inventory Feeds under a parent resource.

EXAMPLES
    To list feeds in organization 'org1', run:

        $ gcloud asset feeds list --organization=org1

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the feed.

       --organization=ORGANIZATION_ID
          Organization of the feed.

       --project=PROJECT_ID
          project of the feed.

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

        $ gcloud alpha asset feeds list

        $ gcloud beta asset feeds list
```

### gcloud asset feeds update

```text
NAME
    gcloud asset feeds update - update an existing Cloud Asset Inventory Feed

SYNOPSIS
    gcloud asset feeds update FEED_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--pubsub-topic=PUBSUB_TOPIC]
        [--add-asset-names=[ASSET-NAMES,...] | --clear-asset-names
          | --remove-asset-names=[ASSET-NAMES,...]]
        [--add-asset-types=[ASSET-TYPES,...] | --clear-asset-types
          | --remove-asset-types=[ASSET-TYPES,...]]
        [--add-relationship-types=[RELATIONSHIP-TYPES,...]
          | --clear-relationship-types
          | --remove-relationship-types=[RELATIONSHIP-TYPES,...]]
        [--clear-condition-description
          | --condition-description=CONDITION_DESCRIPTION]
        [--clear-condition-expression
          | --condition-expression=CONDITION_EXPRESSION]
        [--clear-condition-title | --condition-title=CONDITION_TITLE]
        [--clear-content-type | --content-type=CONTENT_TYPE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing Cloud Asset Inventory Feed.

EXAMPLES
    To add an asset-type to an existing feed, run:

        $ gcloud asset feeds update feed1 --project=p1 \
            --add-asset-types=pubsub.googleapis.com/Topic

POSITIONAL ARGUMENTS
     FEED_ID
        Identifier of the asset feed to update, which must be unique in its
        parent resource. Parent resource can be a project, folder, or an
        organization.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the feed.

       --organization=ORGANIZATION_ID
          Organization of the feed.

       --project=PROJECT_ID
          project of the feed.

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
     --pubsub-topic=PUBSUB_TOPIC
        Name of the Cloud Pub/Sub topic to publish to, of the form
        projects/PROJECT_ID/topics/TOPIC_ID. You can list existing topics with
        gcloud pubsub topics list --format="text(name)"

     These flags modify the member assetNames of this Feed. See
     https://cloud.google.com/apis/design/resource_names#full_resource_name for
     more information.

     At most one of these can be specified:

       --add-asset-names=[ASSET-NAMES,...]
          Append the given values to the current assetNames.

       --clear-asset-names
          Empty the current assetNames.

       --remove-asset-names=[ASSET-NAMES,...]
          Remove the given values from the current assetNames.

     These flags modify the member assetTypes of this Feed. See
     https://cloud.google.com/resource-manager/docs/cloud-asset-inventory/overview
     for all supported asset types.

     At most one of these can be specified:

       --add-asset-types=[ASSET-TYPES,...]
          Append the given values to the current assetTypes.

       --clear-asset-types
          Empty the current assetTypes.

       --remove-asset-types=[ASSET-TYPES,...]
          Remove the given values from the current assetTypes.

     These flags modify the member relationshipTypes of this Feed. See
     https://cloud.google.com/resource-manager/docs/cloud-asset-inventory/overview
     for all supported relationship types.

     At most one of these can be specified:

       --add-relationship-types=[RELATIONSHIP-TYPES,...]
          Append the given values to the current relationshipTypes.

       --clear-relationship-types
          Empty the current relationshipTypes.

       --remove-relationship-types=[RELATIONSHIP-TYPES,...]
          Remove the given values from the current relationshipTypes.

     At most one of these can be specified:

       --clear-condition-description
          Clear any existing condition description setting on the feed.
          Condition description will be empty.

       --condition-description=CONDITION_DESCRIPTION
          Condition description to overwrite the existing one.

     At most one of these can be specified:

       --clear-condition-expression
          Clear any existing condition expression setting on the feed. No
          condition will be applied to feed.

       --condition-expression=CONDITION_EXPRESSION
          Condition expression to overwrite the existing one. For more
          information, see:
          https://cloud.google.com/asset-inventory/docs/monitoring-asset-changes#feed_with_condition

     At most one of these can be specified:

       --clear-condition-title
          Clear any existing condition title setting on the feed. Condition
          title will be empty.

       --condition-title=CONDITION_TITLE
          Condition title to overwrite the existing one.

     At most one of these can be specified:

       --clear-content-type
          Clear any existing content type setting on the feed. Content type
          will be unspecified, no content but the asset name and type will be
          returned in the feed.

       --content-type=CONTENT_TYPE
          Asset content type to overwrite the existing one. For more
          information, see:
          https://cloud.google.com/resource-manager/docs/cloud-asset-inventory/overview#asset_content_type.
          CONTENT_TYPE must be one of: resource, iam-policy, org-policy,
          access-policy, os-inventory, relationship.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha asset feeds update

        $ gcloud beta asset feeds update
```

### gcloud beta asset feeds create

```text
NAME
    gcloud beta asset feeds create - create a Cloud Asset Inventory Feed

SYNOPSIS
    gcloud beta asset feeds create FEED_ID --pubsub-topic=PUBSUB_TOPIC
        (--asset-names=[ASSET_NAMES,...] --asset-types=[ASSET_TYPES,...]
          --relationship-types=[RELATIONSHIP_TYPES,...])
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID)
        [--condition-description=CONDITION_DESCRIPTION]
        [--condition-expression=CONDITION_EXPRESSION]
        [--condition-title=CONDITION_TITLE] [--content-type=CONTENT_TYPE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta asset feeds delete

```text
NAME
    gcloud beta asset feeds delete - delete a Cloud Asset Inventory Feed

SYNOPSIS
    gcloud beta asset feeds delete FEED_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta asset feeds describe

```text
NAME
    gcloud beta asset feeds describe - describe a Cloud Asset Inventory Feed

SYNOPSIS
    gcloud beta asset feeds describe FEED_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta asset feeds list

```text
NAME
    gcloud beta asset feeds list - list Cloud Asset Inventory Feeds

SYNOPSIS
    gcloud beta asset feeds list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta asset feeds update

```text
NAME
    gcloud beta asset feeds update - update an existing Cloud Asset Inventory
        Feed

SYNOPSIS
    gcloud beta asset feeds update FEED_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--pubsub-topic=PUBSUB_TOPIC]
        [--add-asset-names=[ASSET-NAMES,...] | --clear-asset-names
          | --remove-asset-names=[ASSET-NAMES,...]]
        [--add-asset-types=[ASSET-TYPES,...] | --clear-asset-types
          | --remove-asset-types=[ASSET-TYPES,...]]
        [--add-relationship-types=[RELATIONSHIP-TYPES,...]
          | --clear-relationship-types
          | --remove-relationship-types=[RELATIONSHIP-TYPES,...]]
        [--clear-condition-description
          | --condition-description=CONDITION_DESCRIPTION]
        [--clear-condition-expression
          | --condition-expression=CONDITION_EXPRESSION]
        [--clear-condition-title | --condition-title=CONDITION_TITLE]
        [--clear-content-type | --content-type=CONTENT_TYPE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha asset feeds create

```text
NAME
    gcloud alpha asset feeds create - create a Cloud Asset Inventory Feed

SYNOPSIS
    gcloud alpha asset feeds create FEED_ID --pubsub-topic=PUBSUB_TOPIC
        (--asset-names=[ASSET_NAMES,...] --asset-types=[ASSET_TYPES,...]
          --relationship-types=[RELATIONSHIP_TYPES,...])
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID)
        [--condition-description=CONDITION_DESCRIPTION]
        [--condition-expression=CONDITION_EXPRESSION]
        [--condition-title=CONDITION_TITLE] [--content-type=CONTENT_TYPE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha asset feeds delete

```text
NAME
    gcloud alpha asset feeds delete - delete a Cloud Asset Inventory Feed

SYNOPSIS
    gcloud alpha asset feeds delete FEED_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha asset feeds describe

```text
NAME
    gcloud alpha asset feeds describe - describe a Cloud Asset Inventory Feed

SYNOPSIS
    gcloud alpha asset feeds describe FEED_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha asset feeds list

```text
NAME
    gcloud alpha asset feeds list - list Cloud Asset Inventory Feeds

SYNOPSIS
    gcloud alpha asset feeds list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha asset feeds update

```text
NAME
    gcloud alpha asset feeds update - update an existing Cloud Asset Inventory
        Feed

SYNOPSIS
    gcloud alpha asset feeds update FEED_ID
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--pubsub-topic=PUBSUB_TOPIC]
        [--add-asset-names=[ASSET-NAMES,...] | --clear-asset-names
          | --remove-asset-names=[ASSET-NAMES,...]]
        [--add-asset-types=[ASSET-TYPES,...] | --clear-asset-types
          | --remove-asset-types=[ASSET-TYPES,...]]
        [--add-relationship-types=[RELATIONSHIP-TYPES,...]
          | --clear-relationship-types
          | --remove-relationship-types=[RELATIONSHIP-TYPES,...]]
        [--clear-condition-description
          | --condition-description=CONDITION_DESCRIPTION]
        [--clear-condition-expression
          | --condition-expression=CONDITION_EXPRESSION]
        [--clear-condition-title | --condition-title=CONDITION_TITLE]
        [--clear-content-type | --content-type=CONTENT_TYPE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/asset/feeds (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
