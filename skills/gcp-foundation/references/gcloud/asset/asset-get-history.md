---
source: https://docs.cloud.google.com/sdk/gcloud/reference/asset/get-history
---

# gcloud asset get-history

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud asset get-history

```text
NAME
    gcloud asset get-history - get the update history of assets that overlaps a
        time window

SYNOPSIS
    gcloud asset get-history --asset-names=[ASSET_NAMES,...]
        --content-type=CONTENT_TYPE --start-time=START_TIME
        (--organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--end-time=END_TIME] [--relationship-types=[RELATIONSHIP_TYPES,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the update history of assets that overlaps a time window.

EXAMPLES
    To get the history of asset metadata for
    '//compute.googleapis.com/projects/test-project/zones/us-central1-f/instances/instance1'
    between '2018-10-02T15:01:23.045Z' and '2018-12-05T13:01:21.045Z', run:

        $ gcloud asset get-history --project='test-project' \
            --asset-names='//compute.googleapis.com/projects/test-project/zo\
        nes/us-central1-f/instances/instance1' \
            --start-time='2018-10-02T15:01:23.045Z' \
            --end-time='2018-12-05T13:01:21.045Z' --content-type='resource'

    To get the history of asset iam policy for
    '//cloudresourcemanager.googleapis.com/projects/10179387634' between
    '2018-10-02T15:01:23.045Z' and '2018-12-05T13:01:21.045Z', and project
    '10179387634' is in organization '1060499660910', run:

        $ gcloud asset get-history --organization='1060499660910' \
            --asset-names='//cloudresourcemanager.googleapis.com/projects/10\
        179387634' --start-time='2018-10-02T15:01:23.045Z' \
            --end-time='2018-12-05T13:01:21.045Z' \
            --content-type='iam-policy'

REQUIRED FLAGS
     --asset-names=[ASSET_NAMES,...]
        A list of full names of the assets to get the history for. For more
        information, see:
        https://cloud.google.com/apis/design/resource_names#full_resource_name

     --content-type=CONTENT_TYPE
        Asset content type. Specifying resource will export resource metadata,
        specifying iam-policy will export the IAM policy for each child asset,
        specifying org-policy will export the Org Policy set on child assets,
        specifying access-policy will export the Access Policy set on child
        assets, specifying os-inventory will export the OS inventory of VM
        instances, and specifying relationship will export relationships of the
        assets. CONTENT_TYPE must be one of: resource, iam-policy, org-policy,
        access-policy, os-inventory, relationship.

     --start-time=START_TIME
        Start time of the time window (inclusive) for the asset history. Must
        be after the current time minus 35 days. See $ gcloud topic datetimes
        for information on time formats.

     Exactly one of these must be specified:

       --organization=ORGANIZATION_ID
          The ID of the organization which is the root asset.

       --project=PROJECT_ID
          The project which is the root asset.

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
     --end-time=END_TIME
        End time of the time window (exclusive) for the asset history. Defaults
        to current time if not specified. See $ gcloud topic datetimes for
        information on time formats.

     --relationship-types=[RELATIONSHIP_TYPES,...]
        A list of relationship types (i.e., "INSTANCE_TO_INSTANCEGROUP") to
        take a snapshot. This argument will only be honoured if
        content_type=RELATIONSHIP. If specified and non-empty, only
        relationships matching the specified types will be returned. See
        http://cloud.google.com/asset-inventory/docs/supported-asset-types for
        supported relationship types.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha asset get-history

        $ gcloud beta asset get-history
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud asset get-history \
    --project='test-project' \
    --asset-names='//compute.googleapis.com/projects/test-project/zones/us-central1-f/instances/instance1' \
    --start-time='2018-10-02T15:01:23.045Z' \
    --end-time='2018-12-05T13:01:21.045Z' \
    --content-type='resource'

gcloud asset get-history \
    --organization='1060499660910' \
    --asset-names='//cloudresourcemanager.googleapis.com/projects/10179387634' \
    --start-time='2018-10-02T15:01:23.045Z' \
    --end-time='2018-12-05T13:01:21.045Z' \
    --content-type='iam-policy'
```

### gcloud beta asset get-history

```text
NAME
    gcloud beta asset get-history - get the update history of assets that
        overlaps a time window

SYNOPSIS
    gcloud beta asset get-history --asset-names=[ASSET_NAMES,...]
        --content-type=CONTENT_TYPE --start-time=START_TIME
        (--organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--end-time=END_TIME] [--relationship-types=[RELATIONSHIP_TYPES,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha asset get-history

```text
NAME
    gcloud alpha asset get-history - get the update history of assets that
        overlaps a time window

SYNOPSIS
    gcloud alpha asset get-history --asset-names=[ASSET_NAMES,...]
        --content-type=CONTENT_TYPE --start-time=START_TIME
        (--organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--end-time=END_TIME] [--relationship-types=[RELATIONSHIP_TYPES,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/asset/get-history (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
