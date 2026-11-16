---
source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/instance-configs
---

# gcloud spanner instance-configs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud spanner instance-configs create

```text
NAME
    gcloud spanner instance-configs create - create a Cloud Spanner instance
        configuration

SYNOPSIS
    gcloud spanner instance-configs create INSTANCE_CONFIG
        (--base-config=BASE_CONFIG --replicas=location=LOCATION,type=TYPE:[...]
          | [--clone-config=INSTANCE_CONFIG
          : --add-replicas=location=LOCATION,type=TYPE:[...]
          --skip-replicas=location=LOCATION,type=TYPE:[...]]) [--async]
        [--display-name=DISPLAY_NAME] [--etag=ETAG] [--labels=[KEY=VALUE,...]]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud Spanner instance configuration.

EXAMPLES
    To create a custom Cloud Spanner instance configuration based on an
    existing Google-managed configuration (nam3) by adding a READ_ONLY type
    replica in location us-east4, run:

        $ gcloud spanner instance-configs create custom-instance-config \
            --clone-config=nam3 \
            --add-replicas=location=us-east4,type=READ_ONLY

    To create a custom Cloud Spanner instance configuration based on another
    custom configuration (custom-instance-config) by adding a READ_ONLY type
    replica in location us-east1 and removing a READ_ONLY type replica in
    location us-east4, run:

        $ gcloud spanner instance-configs create custom-instance-config1 \
            --clone-config=custom-instance-config \
            --add-replicas=location=us-east1,type=READ_ONLY \
            --skip-replicas=location=us-east4,type=READ_ONLY

POSITIONAL ARGUMENTS
     INSTANCE_CONFIG
        Cloud Spanner instance configuration. The 'custom-' prefix is required
        to avoid name conflicts with Google-managed configurations.

REQUIRED FLAGS
     Exactly one of these must be specified:

       Command-line flags to setup a custom instance configuration replicas:

       --base-config=BASE_CONFIG
          The name of the Google-managed instance configuration, based on which
          your custom configuration is created.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --replicas=location=LOCATION,type=TYPE:[...]
          The geographic placement of nodes in this instance configuration and
          their replication types.

           location
              The location of the serving resources, e.g. "us-central1".

           type
              The type of replica.

              Items in the list are separated by ":". The allowed values and
              formats are as follows.

           READ_ONLY
              Read-only replicas only support reads (not writes). Read-only
              replicas:

              - Maintain a full copy of your data.

              - Serve reads.

              - Do not participate in voting to commit writes.

              - Are not eligible to become a leader.

           READ_WRITE
              Read-write replicas support both reads and writes. These
              replicas:

              - Maintain a full copy of your data.

              - Serve reads.

              - Can vote whether to commit a write.

              - Participate in leadership election.

              - Are eligible to become a leader.

           WITNESS
              Witness replicas don't support reads but do participate in voting
              to commit writes. Witness replicas:

              - Do not maintain a full copy of data.

              - Do not serve reads.

              - Vote whether to commit writes.

              - Participate in leader election but are not eligible to become
                leader.

              This flag argument must be specified if any of the other
              arguments in this group are specified.

       Command-line flags to setup a custom instance configuration using clone
       options:

       --clone-config=INSTANCE_CONFIG
          The ID of the instance config, based on which this configuration is
          created. The clone is an independent copy of this config. Available
          configurations can be found by running "gcloud spanner
          instance-configs list"

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --add-replicas=location=LOCATION,type=TYPE:[...]
          Add new replicas while cloning from the source config.

       --skip-replicas=location=LOCATION,type=TYPE:[...]
          Skip replicas from the source config while cloning. Each replica in
          the list must exist in the source config replicas list.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        The name of this instance configuration as it appears in UIs. Must
        specify this option if creating an instance-config with --replicas.

     --etag=ETAG
        Used for optimistic concurrency control.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --validate-only
        If specified, validate that the creation will succeed without creating
        the instance configuration.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner instance-configs create

        $ gcloud beta spanner instance-configs create
```

### gcloud spanner instance-configs delete

```text
NAME
    gcloud spanner instance-configs delete - delete a Cloud Spanner instance
        configuration

SYNOPSIS
    gcloud spanner instance-configs delete INSTANCE_CONFIG [--etag=ETAG]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Cloud Spanner instance configuration.

EXAMPLES
    To delete a custom Cloud Spanner instance configuration, run:

        $ gcloud spanner instance-configs delete custom-instance-config

POSITIONAL ARGUMENTS
     INSTANCE_CONFIG
        Cloud Spanner instance config.

FLAGS
     --etag=ETAG
        Used for optimistic concurrency control as a way to help prevent
        simultaneous deletes of an instance config from overwriting each other.

     --validate-only
        If specified, validate that the deletion will succeed without deleting
        the instance config.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner instance-configs delete

        $ gcloud beta spanner instance-configs delete
```

### gcloud spanner instance-configs describe

```text
NAME
    gcloud spanner instance-configs describe - describe a Cloud Spanner
        instance configuration

SYNOPSIS
    gcloud spanner instance-configs describe INSTANCE_CONFIG
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Spanner instance configuration.

EXAMPLES
    To describe an instance config named regional-us-central1, run:

        $ gcloud spanner instance-configs describe regional-us-central1

    To describe an instance config named nam-eur-asia1, run:

        $ gcloud spanner instance-configs describe nam-eur-asia1

POSITIONAL ARGUMENTS
     INSTANCE_CONFIG
        Cloud Spanner instance config.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner instance-configs describe

        $ gcloud beta spanner instance-configs describe
```

### gcloud spanner instance-configs list

```text
NAME
    gcloud spanner instance-configs list - list the available Cloud Spanner
        instance configurations

SYNOPSIS
    gcloud spanner instance-configs list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the available Cloud Spanner instance configurations.

EXAMPLES
    To list the Cloud Spanner instance configs that are availble for this
    project, run:

        $ gcloud spanner instance-configs list

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

        $ gcloud alpha spanner instance-configs list

        $ gcloud beta spanner instance-configs list
```

### gcloud spanner instance-configs update

```text
NAME
    gcloud spanner instance-configs update - update a Cloud Spanner instance
        configuration

SYNOPSIS
    gcloud spanner instance-configs update INSTANCE_CONFIG [--async]
        [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--update-labels=[KEY=VALUE,...]] [--validate-only]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Cloud Spanner instance configuration.

EXAMPLES
    To update display name of a custom Cloud Spanner instance configuration
    'custom-instance-config', run:

        $ gcloud spanner instance-configs update custom-instance-config \
            --display-name=nam3-RO-us-central1

    To modify the instance config 'custom-instance-config' by adding label
    'k0', with value 'value1' and label 'k1' with value 'value2' and removing
    labels with key 'k3', run:

        $ gcloud spanner instance-configs update custom-instance-config \
             --update-labels=k0=value1,k1=value2 --remove-labels=k3

    To clear all labels of a custom Cloud Spanner instance configuration
    'custom-instance-config', run:

        $ gcloud spanner instance-configs update custom-instance-config \
            --clear-labels

    To remove an existing label of a custom Cloud Spanner instance
    configuration 'custom-instance-config', run:

        $ gcloud spanner instance-configs update custom-instance-config \
            --remove-labels=KEY1,KEY2

POSITIONAL ARGUMENTS
     INSTANCE_CONFIG
        Cloud Spanner instance config. The 'custom-' prefix is required to
        avoid name conflicts with Google-managed configurations.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        The name of this instance configuration as it appears in UIs.

     --etag=ETAG
        Used for optimistic concurrency control.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --validate-only
        Use this flag to validate that the request will succeed before
        executing it.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud spanner instance-configs update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud spanner instance-configs update --clear-labels \
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

        $ gcloud alpha spanner instance-configs update

        $ gcloud beta spanner instance-configs update
```

### gcloud beta spanner instance-configs create

```text
NAME
    gcloud beta spanner instance-configs create - create a Cloud Spanner
        instance configuration

SYNOPSIS
    gcloud beta spanner instance-configs create INSTANCE_CONFIG
        (--base-config=BASE_CONFIG --replicas=location=LOCATION,type=TYPE:[...]
          | [--clone-config=INSTANCE_CONFIG
          : --add-replicas=location=LOCATION,type=TYPE:[...]
          --skip-replicas=location=LOCATION,type=TYPE:[...]]) [--async]
        [--display-name=DISPLAY_NAME] [--etag=ETAG] [--labels=[KEY=VALUE,...]]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner instance-configs delete

```text
NAME
    gcloud beta spanner instance-configs delete - delete a Cloud Spanner
        instance configuration

SYNOPSIS
    gcloud beta spanner instance-configs delete INSTANCE_CONFIG [--etag=ETAG]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner instance-configs describe

```text
NAME
    gcloud beta spanner instance-configs describe - describe a Cloud Spanner
        instance configuration

SYNOPSIS
    gcloud beta spanner instance-configs describe INSTANCE_CONFIG
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner instance-configs list

```text
NAME
    gcloud beta spanner instance-configs list - list the available Cloud
        Spanner instance configurations

SYNOPSIS
    gcloud beta spanner instance-configs list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner instance-configs update

```text
NAME
    gcloud beta spanner instance-configs update - update a Cloud Spanner
        instance configuration

SYNOPSIS
    gcloud beta spanner instance-configs update INSTANCE_CONFIG [--async]
        [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--update-labels=[KEY=VALUE,...]] [--validate-only]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner instance-configs create

```text
NAME
    gcloud alpha spanner instance-configs create - create a Cloud Spanner
        instance configuration

SYNOPSIS
    gcloud alpha spanner instance-configs create INSTANCE_CONFIG
        (--base-config=BASE_CONFIG --replicas=location=LOCATION,type=TYPE:[...]
          | [--clone-config=INSTANCE_CONFIG
          : --add-replicas=location=LOCATION,type=TYPE:[...]
          --skip-replicas=location=LOCATION,type=TYPE:[...]]) [--async]
        [--display-name=DISPLAY_NAME] [--etag=ETAG] [--labels=[KEY=VALUE,...]]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner instance-configs delete

```text
NAME
    gcloud alpha spanner instance-configs delete - delete a Cloud Spanner
        instance configuration

SYNOPSIS
    gcloud alpha spanner instance-configs delete INSTANCE_CONFIG [--etag=ETAG]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner instance-configs describe

```text
NAME
    gcloud alpha spanner instance-configs describe - describe a Cloud Spanner
        instance configuration

SYNOPSIS
    gcloud alpha spanner instance-configs describe INSTANCE_CONFIG
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner instance-configs list

```text
NAME
    gcloud alpha spanner instance-configs list - list the available Cloud
        Spanner instance configurations

SYNOPSIS
    gcloud alpha spanner instance-configs list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner instance-configs update

```text
NAME
    gcloud alpha spanner instance-configs update - update a Cloud Spanner
        instance configuration

SYNOPSIS
    gcloud alpha spanner instance-configs update INSTANCE_CONFIG [--async]
        [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--update-labels=[KEY=VALUE,...]] [--validate-only]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/instance-configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
