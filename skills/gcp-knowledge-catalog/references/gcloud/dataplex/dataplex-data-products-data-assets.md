---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/data-products/data-assets
---

# gcloud dataplex data-products data-assets

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex data-products data-assets create

```text
NAME
    gcloud dataplex data-products data-assets create - create a Dataplex data
        asset resource

SYNOPSIS
    gcloud dataplex data-products data-assets create
        (DATA_ASSET : --data-product=DATA_PRODUCT --location=LOCATION)
        --resource=RESOURCE [--access-groups=ACCESS_GROUPS] [--async]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Dataplex data asset resource.

EXAMPLES
    To create a Dataplex data asset test-da in data product test-dp in location
    us-central1 with resource
    "//SERVICE_NAME/projects/MY_PROJECT/datasets/MY_DATASET/tables/MY_TABLE",
    run:

        $ gcloud dataplex data-products data-assets create test-da \
          --data-product=test-dp --location=us-central1 \
          --resource=//SERVICE_NAME/projects/MY_PROJECT/datasets/\
        MY_DATASET/tables/MY_TABLE

POSITIONAL ARGUMENTS
     Data asset resource - Arguments and flags that specify the Dataplex Data
     Asset you want to create. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument data_asset on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATA_ASSET
          ID of the data asset or fully qualified identifier for the data
          asset.

          To set the data_asset attribute:
          + provide the argument data_asset on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --data-product=DATA_PRODUCT
          Identifier of the Dataplex Data Product resource.

          To set the data-product attribute:
          + provide the argument data_asset on the command line with a fully
            specified name;
          + provide the argument --data-product on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument data_asset on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

REQUIRED FLAGS
     --resource=RESOURCE
        Full resource name of the cloud resource represented by the data asset.

OPTIONAL FLAGS
     --access-groups=ACCESS_GROUPS
        Access groups configurations for this data asset. Each access group
        config should be a JSON string. Expected schema: { "id": "group-id",
        "iam_roles": ["role-1", "role-2"] }

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex data-products data-assets create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud dataplex data-products data-assets create test-da \
    --data-product=test-dp \
    --location=us-central1 \
    --resource=//SERVICE_NAME/projects/MY_PROJECT/datasets/MY_DATASET/tables/MY_TABLE
```

### gcloud dataplex data-products data-assets delete

```text
NAME
    gcloud dataplex data-products data-assets delete - delete a Dataplex data
        asset resource

SYNOPSIS
    gcloud dataplex data-products data-assets delete
        (DATA_ASSET : --data-product=DATA_PRODUCT --location=LOCATION)
        [--async] [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Dataplex data asset resource.

EXAMPLES
    To delete a Dataplex data asset test-da in data product test-dp in location
    us-central1, run:

        $ gcloud dataplex data-products data-assets delete test-da \
          --data-product=test-dp --location=us-central1

POSITIONAL ARGUMENTS
     Data asset resource - Arguments and flags that specify the Dataplex Data
     Asset you want to delete. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument data_asset on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATA_ASSET
          ID of the data asset or fully qualified identifier for the data
          asset.

          To set the data_asset attribute:
          + provide the argument data_asset on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --data-product=DATA_PRODUCT
          Identifier of the Dataplex Data Product resource.

          To set the data-product attribute:
          + provide the argument data_asset on the command line with a fully
            specified name;
          + provide the argument --data-product on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument data_asset on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        Etag of the data asset to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex data-products data-assets delete
```

### gcloud dataplex data-products data-assets describe

```text
NAME
    gcloud dataplex data-products data-assets describe - describe a Dataplex
        data asset resource

SYNOPSIS
    gcloud dataplex data-products data-assets describe
        (DATA_ASSET : --data-product=DATA_PRODUCT --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Dataplex data asset resource.

EXAMPLES
    To describe a Dataplex data asset test-da in data product test-dp in
    location us-central1, run:

        $ gcloud dataplex data-products data-assets describe test-da \
          --data-product=test-dp --location=us-central1

POSITIONAL ARGUMENTS
     Data asset resource - Arguments and flags that specify the Dataplex Data
     Asset you want to describe. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument data_asset on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATA_ASSET
          ID of the data asset or fully qualified identifier for the data
          asset.

          To set the data_asset attribute:
          + provide the argument data_asset on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --data-product=DATA_PRODUCT
          Identifier of the Dataplex Data Product resource.

          To set the data-product attribute:
          + provide the argument data_asset on the command line with a fully
            specified name;
          + provide the argument --data-product on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument data_asset on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex data-products data-assets describe
```

### gcloud dataplex data-products data-assets list

```text
NAME
    gcloud dataplex data-products data-assets list - list Dataplex data asset
        resources

SYNOPSIS
    gcloud dataplex data-products data-assets list
        (--data-product=DATA_PRODUCT : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Dataplex data asset resources.

EXAMPLES
    To list Dataplex data assets in data product test-dp in location
    us-central1, run:

        $ gcloud dataplex data-products data-assets list \
          --data-product=test-dp --location=us-central1

REQUIRED FLAGS
     Data product resource - Arguments and flags that specify the parent
     Dataplex Data Product to list Data Assets under. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --data-product on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --data-product=DATA_PRODUCT
          ID of the data product or fully qualified identifier for the data
          product.

          To set the data-product attribute:
          + provide the argument --data-product on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument --data-product on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex data-products data-assets list
```

### gcloud dataplex data-products data-assets update

```text
NAME
    gcloud dataplex data-products data-assets update - update a Dataplex data
        asset resource

SYNOPSIS
    gcloud dataplex data-products data-assets update
        (DATA_ASSET : --data-product=DATA_PRODUCT --location=LOCATION)
        [--access-groups=ACCESS_GROUPS] [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Dataplex data asset resource.

EXAMPLES
    To update labels on a Dataplex data asset test-da in data product test-dp
    in location us-central1, run:

        $ gcloud dataplex data-products data-assets update test-da \
          --data-product=test-dp --location=us-central1 \
          --update-labels=k1=v1

POSITIONAL ARGUMENTS
     Data asset resource - Arguments and flags that specify the Dataplex Data
     Asset you want to update. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument data_asset on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATA_ASSET
          ID of the data asset or fully qualified identifier for the data
          asset.

          To set the data_asset attribute:
          + provide the argument data_asset on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --data-product=DATA_PRODUCT
          Identifier of the Dataplex Data Product resource.

          To set the data-product attribute:
          + provide the argument data_asset on the command line with a fully
            specified name;
          + provide the argument --data-product on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument data_asset on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --access-groups=ACCESS_GROUPS
        New access groups configurations for this data asset. This will replace
        the existing configurations. Each access group config should be a JSON
        string. Expected schema: { "id": "group-id", "iam_roles": ["role-1",
        "role-2"] }

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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

              $ gcloud dataplex data-products data-assets update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud dataplex data-products data-assets update --clear-labels \
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

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex data-products data-assets update
```

### gcloud alpha dataplex data-products data-assets create

```text
NAME
    gcloud alpha dataplex data-products data-assets create - create a Dataplex
        data asset resource

SYNOPSIS
    gcloud alpha dataplex data-products data-assets create
        (DATA_ASSET : --data-product=DATA_PRODUCT --location=LOCATION)
        --resource=RESOURCE [--access-groups=ACCESS_GROUPS] [--async]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex data-products data-assets delete

```text
NAME
    gcloud alpha dataplex data-products data-assets delete - delete a Dataplex
        data asset resource

SYNOPSIS
    gcloud alpha dataplex data-products data-assets delete
        (DATA_ASSET : --data-product=DATA_PRODUCT --location=LOCATION)
        [--async] [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex data-products data-assets describe

```text
NAME
    gcloud alpha dataplex data-products data-assets describe - describe a
        Dataplex data asset resource

SYNOPSIS
    gcloud alpha dataplex data-products data-assets describe
        (DATA_ASSET : --data-product=DATA_PRODUCT --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex data-products data-assets list

```text
NAME
    gcloud alpha dataplex data-products data-assets list - list Dataplex data
        asset resources

SYNOPSIS
    gcloud alpha dataplex data-products data-assets list
        (--data-product=DATA_PRODUCT : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex data-products data-assets update

```text
NAME
    gcloud alpha dataplex data-products data-assets update - update a Dataplex
        data asset resource

SYNOPSIS
    gcloud alpha dataplex data-products data-assets update
        (DATA_ASSET : --data-product=DATA_PRODUCT --location=LOCATION)
        [--access-groups=ACCESS_GROUPS] [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/data-products/data-assets (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
