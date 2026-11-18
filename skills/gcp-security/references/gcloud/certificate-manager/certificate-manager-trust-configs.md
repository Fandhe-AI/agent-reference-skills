---
source: https://docs.cloud.google.com/sdk/gcloud/reference/certificate-manager/trust-configs
---

# gcloud certificate-manager trust-configs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud certificate-manager trust-configs create

```text
NAME
    gcloud certificate-manager trust-configs create - create TrustConfig

SYNOPSIS
    gcloud certificate-manager trust-configs create
        (TRUST_CONFIG : --location=LOCATION)
        (--allowlisted-certificates=[ALLOWLISTED_CERTIFICATES,...]
          --trust-store=[intermediate-cas=INTERMEDIATE-CAS],
          [trust-anchors=TRUST-ANCHORS]) [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--tags=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a TrustConfig.

EXAMPLES
    To create a TrustConfig from PEM certificate files, run:

        $ gcloud certificate-manager trust-configs create my-trust-config \
            --description="my description" \
            --labels=my-key1=my-value1,my-key2=my-value2 \
            --trust-store=trust-anchors=ta.pem,\
        intermediate-cas="ica1.pem;ica2.pem"

POSITIONAL ARGUMENTS
     TrustConfig resource - Name of the TrustConfig to create. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument trust_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRUST_CONFIG
          ID of the trustConfig or fully qualified identifier for the
          trustConfig.

          To set the trust_config attribute:
          + provide the argument trust_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Certificate Manager location.

          To set the location attribute:
          + provide the argument trust_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

REQUIRED FLAGS
     At least one of these must be specified:

       --allowlisted-certificates=[ALLOWLISTED_CERTIFICATES,...]
          Allowlisted PEM-encoded certificates. Certificates should be provided
          in files. For multiple file names, separate them by a comma (',').
          One file can contain multiple certificates.

          Examples:

              Single file: --allowlisted-certificates=ac.pem

              Multiple files: --allowlisted-certificates=ac1.pem,ac2.pem

       --trust-store=[intermediate-cas=INTERMEDIATE-CAS],[trust-anchors=TRUST-ANCHORS]
          Trust Store with the given trust anchor and intermediate CA
          PEM-encoded certificates. Certificates should be provided in files.
          For multiple file names, separate them by a semicolon (';') and quote
          them ('"'). One file can contain multiple certificates. Intermediate
          CAs are optional.

          Examples:

              Single files: --trust-store trust-anchors=ta.pem,intermediate-cas=ica.pem

              No intermediate CAs: --trust-store trust-anchors=ta.pem

              Multiple files: --trust-store trust-anchors="ta1.pem;ta2.pem",intermediate-cas="ica1.pem;ica2.pem"

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Human-readable description of the resource.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --tags=[KEY=VALUE,...]
        List of tags KEY=VALUE pairs to bind. Each item must be expressed as
        <tag-key-namespaced-name>=<tag-value-short-name>.

        Example: 123/environment=production,123/costCenter=marketing

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the certificatemanager/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/certificate-manager/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager trust-configs create

        $ gcloud beta certificate-manager trust-configs create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud certificate-manager trust-configs create my-trust-config \
    --description="my description" \
    --labels=my-key1=my-value1,my-key2=my-value2 \
    --trust-store=trust-anchors=ta.pem,intermediate-cas="ica1.pem;ica2.pem"
```

### gcloud certificate-manager trust-configs delete

```text
NAME
    gcloud certificate-manager trust-configs delete - delete TrustConfig

SYNOPSIS
    gcloud certificate-manager trust-configs delete
        (TRUST_CONFIG : --location=LOCATION) [--async] [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified TrustConfig.

EXAMPLES
    To delete a TrustConfig called 'my-trust-config', run:

        $ gcloud certificate-manager trust-configs delete my-trust-config \
            --location=global

POSITIONAL ARGUMENTS
     TrustConfig resource - Name of the TrustConfig you want to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument trust_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRUST_CONFIG
          ID of the trustConfig or fully qualified identifier for the
          trustConfig.

          To set the trust_config attribute:
          + provide the argument trust_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Certificate Manager location.

          To set the location attribute:
          + provide the argument trust_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        The current etag of the asset. If an etag is provided and does not
        match the current etag of the asset, the deletion will be blocked.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the certificatemanager/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/certificate-manager/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager trust-configs delete

        $ gcloud beta certificate-manager trust-configs delete
```

### gcloud certificate-manager trust-configs describe

```text
NAME
    gcloud certificate-manager trust-configs describe - show details about a
        TrustConfig

SYNOPSIS
    gcloud certificate-manager trust-configs describe
        (TRUST_CONFIG : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about a TrustConfig.

EXAMPLES
    To show details about an existing trust config, run:

        $ gcloud certificate-manager trust-configs describe my-trust-config

POSITIONAL ARGUMENTS
     TrustConfig resource - The TrustConfig you want to describe. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument trust_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRUST_CONFIG
          ID of the trustConfig or fully qualified identifier for the
          trustConfig.

          To set the trust_config attribute:
          + provide the argument trust_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Certificate Manager location.

          To set the location attribute:
          + provide the argument trust_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the certificatemanager/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/certificate-manager/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager trust-configs describe

        $ gcloud beta certificate-manager trust-configs describe
```

### gcloud certificate-manager trust-configs export

```text
NAME
    gcloud certificate-manager trust-configs export - export TrustConfig

SYNOPSIS
    gcloud certificate-manager trust-configs export
        (TRUST_CONFIG : --location=LOCATION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export a TrustConfig.

EXAMPLES
    To export a TrustConfig, run:

        $ gcloud certificate-manager trust-configs export my-trust-config \
            --destination=my-trust-config.yaml --location=global

POSITIONAL ARGUMENTS
     TrustConfig resource - Name of the TrustConfig to export. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument trust_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRUST_CONFIG
          ID of the trustConfig or fully qualified identifier for the
          trustConfig.

          To set the trust_config attribute:
          + provide the argument trust_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Certificate Manager location.

          To set the location attribute:
          + provide the argument trust_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

FLAGS
     --destination=DESTINATION
        Path to a YAML file where the configuration will be exported. The
        exported data will not contain any output-only fields. Alternatively,
        you may omit this flag to write to standard output. For a schema
        describing the export/import format, see
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/...

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the certificatemanager/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/certificate-manager/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager trust-configs export

        $ gcloud beta certificate-manager trust-configs export
```

### gcloud certificate-manager trust-configs import

```text
NAME
    gcloud certificate-manager trust-configs import - import TrustConfig

SYNOPSIS
    gcloud certificate-manager trust-configs import
        (TRUST_CONFIG : --location=LOCATION) [--async] [--source=SOURCE]
        [--update-mask=UPDATE_MASK] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Import a TrustConfig.

EXAMPLES
    To import a TrustConfig from a YAML file, run:

        $ gcloud certificate-manager trust-configs import my-trust-config \
            --source=my-trust-config.yaml --location=global

POSITIONAL ARGUMENTS
     TrustConfig resource - Name of the TrustConfig to import. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument trust_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRUST_CONFIG
          ID of the trustConfig or fully qualified identifier for the
          trustConfig.

          To set the trust_config attribute:
          + provide the argument trust_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Certificate Manager location.

          To set the location attribute:
          + provide the argument trust_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --source=SOURCE
        Path to a YAML file containing the configuration export data. The YAML
        file must not contain any output-only fields. Alternatively, you may
        omit this flag to read from standard input. For a schema describing the
        export/import format, see: $CLOUDSDKROOT/lib/googlecloudsdk/schemas/...

        $CLOUDSDKROOT is can be obtained with the following command:

            $ gcloud info --format='value(installation.sdk_root)'

     --update-mask=UPDATE_MASK
        Update mask used to specify fields to be overwritten in the TrustConfig
        by import. TrustConfig must already exist. Fields specified in the
        update-mask are relative to the TrustConfig. The flag can be a
        comma-separated list of updatable non-nested fields, e.g. description
        or trust_stores. Valid example: --update-mask=description,trust_stores.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the certificatemanager/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/certificate-manager/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager trust-configs import

        $ gcloud beta certificate-manager trust-configs import
```

### gcloud certificate-manager trust-configs list

```text
NAME
    gcloud certificate-manager trust-configs list - list all TrustConfigs in a
        project

SYNOPSIS
    gcloud certificate-manager trust-configs list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List existing TrustConfigs.

EXAMPLES
    To list existing TrustConfigs, run:

        $ gcloud certificate-manager trust-configs list

FLAGS
     Location resource - The location (defaults to '-') of the resources. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * if left empty, will use the wildcard '-' to list all locations with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * if left empty, will use the wildcard '-' to list all locations.

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
    This command uses the certificatemanager/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/certificate-manager/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager trust-configs list

        $ gcloud beta certificate-manager trust-configs list
```

### gcloud certificate-manager trust-configs update

```text
NAME
    gcloud certificate-manager trust-configs update - update TrustConfig

SYNOPSIS
    gcloud certificate-manager trust-configs update
        (TRUST_CONFIG : --location=LOCATION)
        [--add-allowlisted-certificates=[ADD_ALLOWLISTED_CERTIFICATES,...]]
        [--async] [--description=DESCRIPTION]
        [--trust-store=[intermediate-cas=INTERMEDIATE-CAS],
          [trust-anchors=TRUST-ANCHORS]] [--update-labels=[KEY=VALUE,...]]
        [--clear-allowlisted-certificates
          | --remove-allowlisted-certificates=[REMOVE_ALLOWLISTED_CERTIFICATES,
          ...]] [--clear-labels | --remove-labels=[KEY,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a TrustConfig.

EXAMPLES
    To update a TrustConfig, run:

        $ gcloud certificate-manager trust-configs update my-trust-config \
            --description="updated description" \
            --trust-store=trust-anchors=ta.pem,\
        intermediate-cas="ica1.pem;ica2.pem" \
            --update-labels=my-key1=my-updated-value1 \
            --remove-labels=my-key2

POSITIONAL ARGUMENTS
     TrustConfig resource - Name of the TrustConfig to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument trust_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRUST_CONFIG
          ID of the trustConfig or fully qualified identifier for the
          trustConfig.

          To set the trust_config attribute:
          + provide the argument trust_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Certificate Manager location.

          To set the location attribute:
          + provide the argument trust_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

FLAGS
     --add-allowlisted-certificates=[ADD_ALLOWLISTED_CERTIFICATES,...]
        Add allowlisted PEM-encoded certificates. Certificates should be
        provided in files. For multiple file names, separate them by a comma
        (','). One file can contain multiple certificates.

        Examples:

            Single file: --add-allowlisted-certificates=ac.pem

            Multiple files: --add-allowlisted-certificates=ac1.pem,ac2.pem

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Human-readable description of the resource.

     --trust-store=[intermediate-cas=INTERMEDIATE-CAS],[trust-anchors=TRUST-ANCHORS]
        Trust Store with the given trust anchor and intermediate CA PEM-encoded
        certificates. Certificates should be provided in files. For multiple
        file names, separate them by a semicolon (';') and quote them ('"').
        One file can contain multiple certificates. Intermediate CAs are
        optional.

        Examples:

            Single files: --trust-store trust-anchors=ta.pem,intermediate-cas=ica.pem

            No intermediate CAs: --trust-store trust-anchors=ta.pem

            Multiple files: --trust-store trust-anchors="ta1.pem;ta2.pem",intermediate-cas="ica1.pem;ica2.pem"

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-allowlisted-certificates
          Clear all allowlisted certificates.

       --remove-allowlisted-certificates=[REMOVE_ALLOWLISTED_CERTIFICATES,...]
          Remove allowlisted PEM-encoded certificates. Certificates should be
          provided in files. For multiple file names, separate them by a comma
          (','). One file can contain multiple certificates.

          Examples:

              Single file: --remove-allowlisted-certificates=ac.pem

              Multiple files: --remove-allowlisted-certificates=ac1.pem,ac2.pem

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud certificate-manager trust-configs update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud certificate-manager trust-configs update --clear-labels \
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
    This command uses the certificatemanager/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/certificate-manager/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager trust-configs update

        $ gcloud beta certificate-manager trust-configs update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud certificate-manager trust-configs update my-trust-config \
    --description="updated description" \
    --trust-store=trust-anchors=ta.pem,intermediate-cas="ica1.pem;ica2.pem" \
    --update-labels=my-key1=my-updated-value1 \
    --remove-labels=my-key2
```

### gcloud beta certificate-manager trust-configs create

```text
NAME
    gcloud beta certificate-manager trust-configs create - create TrustConfig

SYNOPSIS
    gcloud beta certificate-manager trust-configs create
        (TRUST_CONFIG : --location=LOCATION)
        (--allowlisted-certificates=[ALLOWLISTED_CERTIFICATES,...]
          --trust-store=[intermediate-cas=INTERMEDIATE-CAS],
          [trust-anchors=TRUST-ANCHORS]) [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--tags=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager trust-configs delete

```text
NAME
    gcloud beta certificate-manager trust-configs delete - delete TrustConfig

SYNOPSIS
    gcloud beta certificate-manager trust-configs delete
        (TRUST_CONFIG : --location=LOCATION) [--async] [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager trust-configs describe

```text
NAME
    gcloud beta certificate-manager trust-configs describe - show details about
        a TrustConfig

SYNOPSIS
    gcloud beta certificate-manager trust-configs describe
        (TRUST_CONFIG : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager trust-configs export

```text
NAME
    gcloud beta certificate-manager trust-configs export - export TrustConfig

SYNOPSIS
    gcloud beta certificate-manager trust-configs export
        (TRUST_CONFIG : --location=LOCATION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager trust-configs import

```text
NAME
    gcloud beta certificate-manager trust-configs import - import TrustConfig

SYNOPSIS
    gcloud beta certificate-manager trust-configs import
        (TRUST_CONFIG : --location=LOCATION) [--async] [--source=SOURCE]
        [--update-mask=UPDATE_MASK] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager trust-configs list

```text
NAME
    gcloud beta certificate-manager trust-configs list - list all TrustConfigs
        in a project

SYNOPSIS
    gcloud beta certificate-manager trust-configs list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager trust-configs update

```text
NAME
    gcloud beta certificate-manager trust-configs update - update TrustConfig

SYNOPSIS
    gcloud beta certificate-manager trust-configs update
        (TRUST_CONFIG : --location=LOCATION)
        [--add-allowlisted-certificates=[ADD_ALLOWLISTED_CERTIFICATES,...]]
        [--async] [--description=DESCRIPTION]
        [--trust-store=[intermediate-cas=INTERMEDIATE-CAS],
          [trust-anchors=TRUST-ANCHORS]] [--update-labels=[KEY=VALUE,...]]
        [--clear-allowlisted-certificates
          | --remove-allowlisted-certificates=[REMOVE_ALLOWLISTED_CERTIFICATES,
          ...]] [--clear-labels | --remove-labels=[KEY,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager trust-configs create

```text
NAME
    gcloud alpha certificate-manager trust-configs create - create TrustConfig

SYNOPSIS
    gcloud alpha certificate-manager trust-configs create
        (TRUST_CONFIG : --location=LOCATION)
        (--allowlisted-certificates=[ALLOWLISTED_CERTIFICATES,...]
          --trust-store=[intermediate-cas=INTERMEDIATE-CAS],
          [trust-anchors=TRUST-ANCHORS]) [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--tags=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager trust-configs delete

```text
NAME
    gcloud alpha certificate-manager trust-configs delete - delete TrustConfig

SYNOPSIS
    gcloud alpha certificate-manager trust-configs delete
        (TRUST_CONFIG : --location=LOCATION) [--async] [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager trust-configs describe

```text
NAME
    gcloud alpha certificate-manager trust-configs describe - show details
        about a TrustConfig

SYNOPSIS
    gcloud alpha certificate-manager trust-configs describe
        (TRUST_CONFIG : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager trust-configs export

```text
NAME
    gcloud alpha certificate-manager trust-configs export - export TrustConfig

SYNOPSIS
    gcloud alpha certificate-manager trust-configs export
        (TRUST_CONFIG : --location=LOCATION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager trust-configs import

```text
NAME
    gcloud alpha certificate-manager trust-configs import - import TrustConfig

SYNOPSIS
    gcloud alpha certificate-manager trust-configs import
        (TRUST_CONFIG : --location=LOCATION) [--async] [--source=SOURCE]
        [--update-mask=UPDATE_MASK] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager trust-configs list

```text
NAME
    gcloud alpha certificate-manager trust-configs list - list all TrustConfigs
        in a project

SYNOPSIS
    gcloud alpha certificate-manager trust-configs list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager trust-configs update

```text
NAME
    gcloud alpha certificate-manager trust-configs update - update TrustConfig

SYNOPSIS
    gcloud alpha certificate-manager trust-configs update
        (TRUST_CONFIG : --location=LOCATION)
        [--add-allowlisted-certificates=[ADD_ALLOWLISTED_CERTIFICATES,...]]
        [--async] [--description=DESCRIPTION]
        [--trust-store=[intermediate-cas=INTERMEDIATE-CAS],
          [trust-anchors=TRUST-ANCHORS]] [--update-labels=[KEY=VALUE,...]]
        [--clear-allowlisted-certificates
          | --remove-allowlisted-certificates=[REMOVE_ALLOWLISTED_CERTIFICATES,
          ...]] [--clear-labels | --remove-labels=[KEY,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/certificate-manager/trust-configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
