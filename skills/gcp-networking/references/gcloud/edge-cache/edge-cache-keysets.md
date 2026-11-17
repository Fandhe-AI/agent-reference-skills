---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cache/keysets
---

# gcloud edge-cache keysets

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cache keysets create

```text
NAME
    gcloud edge-cache keysets create - create an EdgeCacheKeyset resource

SYNOPSIS
    gcloud edge-cache keysets create (KEYSET : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--public-key=[id=ID],[managed=MANAGED],[value=VALUE]]
        [--validation-shared-key=[secret_version=SECRET_VERSION]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new EdgeCacheKeyset resource.

EXAMPLES
    To create an EdgeCacheKeyset resource called 'my-keyset', run:

        $ gcloud edge-cache keysets create my-keyset \
            --public-key='id=KEYID,value=BASE64PUBLICKEY'

POSITIONAL ARGUMENTS
     Keyset resource - The name of the EdgeCacheKeyset resource to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument keyset on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEYSET
          ID of the keyset or fully qualified identifier for the keyset.

          To set the keyset attribute:
          + provide the argument keyset on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument keyset on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Human-readable description of the resource.

     --labels=[KEY=VALUE,...]
        List of KEY=VALUE labels to attach to this resource.

     --public-key=[id=ID],[managed=MANAGED],[value=VALUE]
        Set of public keys to use for validating signed requests, when
        associated with a route. This flag can be repeated to create a Keyset
        with multiple public keys.

        If you are providing your own public keys, specify the key in the form
        id=ID,value=BASE64ENCODEDPUBLICKEY.

        If you are using Google-managed public keys as part of a dual-token
        setup, specify the key in the form id=ID,managed=true.

         id
            id (name) name of the key within the keyset.

         value
            URL-safe base64 encoded public key. Cannot be specified if
            managed=true.

         managed
            Boolean indicating this is a Google-managed key. Cannot be
            specified if value=true.

        To create a public key with id 'foo', pass
        --public-key='id=foo,value=VALUE' to gcloud edge-cache keysets create.

        To create a Google-managed public key with id 'bar', pass
        --public-key='id=foo,managed=true' to gcloud edge-cache keysets create.

        At least one of public-key or validation-shared-key must be specified.

     --validation-shared-key=[secret_version=SECRET_VERSION]
        An ordered list of shared keys to use for validating signed requests.

        To create a validation shared key pointing to a Secret Manager secret
        version with name projects/PROJECT/secrets/SECRET/versions/VERSION,
        pass
        --validation-shared-key='secret_version=projects/PROJECT/secrets/SECRET/versions/VERSION'
        to gcloud edge-cache keysets create.

         secret_version
            The name of the secret in Secret Manager. Must be in the format
            projects/PROJECT/secrets/SECRET/versions/VERSION.

        At least one of public-key or validation-shared-key must be specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud alpha edge-cache keysets create
```

### gcloud edge-cache keysets delete

```text
NAME
    gcloud edge-cache keysets delete - delete an EdgeCacheKeyset resource

SYNOPSIS
    gcloud edge-cache keysets delete (KEYSET : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an EdgeCacheKeyset resource.

EXAMPLES
    To delete an EdgeCacheKeyset resource called 'my-keyset', run:

        $ gcloud edge-cache keysets delete my-keyset

POSITIONAL ARGUMENTS
     Keyset resource - The name of the EdgeCacheKeyset resource to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument keyset on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEYSET
          ID of the keyset or fully qualified identifier for the keyset.

          To set the keyset attribute:
          + provide the argument keyset on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument keyset on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud alpha edge-cache keysets delete
```

### gcloud edge-cache keysets describe

```text
NAME
    gcloud edge-cache keysets describe - show details about an EdgeCacheKeyset
        resource

SYNOPSIS
    gcloud edge-cache keysets describe (KEYSET : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about an EdgeCacheKeyset resource.

EXAMPLES
    To show details for an EdgeCacheKeyset resource named 'my-keyset', run:

        $ gcloud edge-cache keysets describe my-keyset

POSITIONAL ARGUMENTS
     Keyset resource - The EdgeCacheKeyset resource you want to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument keyset on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEYSET
          ID of the keyset or fully qualified identifier for the keyset.

          To set the keyset attribute:
          + provide the argument keyset on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument keyset on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud alpha edge-cache keysets describe
```

### gcloud edge-cache keysets export

```text
NAME
    gcloud edge-cache keysets export - export an EdgeCacheKeyset resource

SYNOPSIS
    gcloud edge-cache keysets export (KEYSET : --location=LOCATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export an EdgeCacheKeyset resource to YAML.

EXAMPLES
    To export an EdgeCacheKeyset resourced named 'my-keyset', run:

        $ gcloud edge-cache keysets export my-keyset \
            --destination=keyset.yaml

POSITIONAL ARGUMENTS
     Keyset resource - The EdgeCacheKeyset resource you want to export. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument keyset on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEYSET
          ID of the keyset or fully qualified identifier for the keyset.

          To set the keyset attribute:
          + provide the argument keyset on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument keyset on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud alpha edge-cache keysets export
```

### gcloud edge-cache keysets import

```text
NAME
    gcloud edge-cache keysets import - import an EdgeCacheKeyset resource

SYNOPSIS
    gcloud edge-cache keysets import (KEYSET : --location=LOCATION) [--async]
        [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Import an EdgeCacheKeyset resource. If the named EdgeCacheKeyset resource
    already exists, the resource will be updated to match the imported resource
    configuration.

    Note: If you are updating an existing EdgeCacheKeyset resource, you should
    ensure that it includes any public keys still needed to validate incoming
    user requests.

    If the named EdgeCacheKeyset resource does not already exist, a new
    EdgeCacheKeyset resource will be created with that name.

EXAMPLES
    To import an EdgeCacheKeyset resource named 'my-keyset' from a YAML file,
    run:

        $ gcloud edge-cache keysets import my-keyset --source=my-keyset.yaml

POSITIONAL ARGUMENTS
     Keyset resource - The EdgeCacheKeyset resource you want to import. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument keyset on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEYSET
          ID of the keyset or fully qualified identifier for the keyset.

          To set the keyset attribute:
          + provide the argument keyset on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument keyset on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud alpha edge-cache keysets import
```

### gcloud edge-cache keysets list

```text
NAME
    gcloud edge-cache keysets list - list EdgeCacheKeyset resources

SYNOPSIS
    gcloud edge-cache keysets list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List EdgeCacheKeyset resources.

EXAMPLES
    To list existing EdgeCacheKeyset resources, run:

        $ gcloud edge-cache keysets list

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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud alpha edge-cache keysets list
```

### gcloud edge-cache keysets update

```text
NAME
    gcloud edge-cache keysets update - update an EdgeCacheKeyset resource

SYNOPSIS
    gcloud edge-cache keysets update (KEYSET : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--public-key=[id=ID],[managed=MANAGED],[value=VALUE]]
        [--validation-shared-key=[secret_version=SECRET_VERSION]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing EdgeCacheKeyset resource.

EXAMPLES
    To update an EdgeCacheKeyset resource called 'my-keyset', run:

        $ gcloud edge-cache keysets update my-keyset \
            --public-key='id=KEYID,value=BASE64PUBLICKEY'

    The update command appends keys to an existing EdgeCacheKeyset resource. To
    add more than one key to an EdgeCacheKeyset resource, provide multiple
    --public-key values:

        $ gcloud edge-cache keysets update my-keyset \
            --public-key='id=KEYID,value=BASE64PUBLICKEY' \
            --public-key='id=EXISTING,value=EXISTINGPUBLICKEY'

    You can specify, and an EdgeCacheKeyset resource can contain, up to three
    (3) public keys. To delete unused public keys within an existing Keyset,
    use the import command to specify the EdgeCacheKeyset resource in full,
    omitting any unused publicKey items.

POSITIONAL ARGUMENTS
     Keyset resource - The name of the EdgeCacheKeyset resource to update. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument keyset on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEYSET
          ID of the keyset or fully qualified identifier for the keyset.

          To set the keyset attribute:
          + provide the argument keyset on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument keyset on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Human-readable description of the resource.

     --labels=[KEY=VALUE,...]
        List of KEY=VALUE labels to attach to this resource.

     --public-key=[id=ID],[managed=MANAGED],[value=VALUE]
        Set of public keys to use for validating signed requests, when
        associated with a route. This flag can be repeated to create a Keyset
        with multiple public keys.

        If you are providing your own public keys, specify the key in the form
        id=ID,value=BASE64ENCODEDPUBLICKEY.

        If you are using Google-managed public keys as part of a dual-token
        setup, specify the key in the form id=ID,managed=true.

         id
            id (name) name of the key within the keyset.

         value
            URL-safe base64 encoded public key. Cannot be specified if
            managed=true.

         managed
            Boolean indicating this is a Google-managed key. Cannot be
            specified if value=true.

        To create a public key with id 'foo', pass
        --public-key='id=foo,value=VALUE' to gcloud edge-cache keysets update.

        To create a Google-managed public key with id 'bar', pass
        --public-key='id=foo,managed=true' to gcloud edge-cache keysets update.

        At least one of public-key or validation-shared-key must be specified.

     --validation-shared-key=[secret_version=SECRET_VERSION]
        An ordered list of shared keys to use for validating signed requests.

        To create a validation shared key pointing to a Secret Manager secret
        version with name projects/PROJECT/secrets/SECRET/versions/VERSION,
        pass
        --validation-shared-key='secret_version=projects/PROJECT/secrets/SECRET/versions/VERSION'
        to gcloud edge-cache keysets update.

         secret_version
            The name of the secret in Secret Manager. Must be in the format
            projects/PROJECT/secrets/SECRET/versions/VERSION.

        At least one of public-key or validation-shared-key must be specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud alpha edge-cache keysets update
```

### gcloud alpha edge-cache keysets create

```text
NAME
    gcloud alpha edge-cache keysets create - create an EdgeCacheKeyset resource

SYNOPSIS
    gcloud alpha edge-cache keysets create (KEYSET : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--public-key=[id=ID],[managed=MANAGED],[value=VALUE]]
        [--validation-shared-key=[secret_version=SECRET_VERSION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache keysets delete

```text
NAME
    gcloud alpha edge-cache keysets delete - delete an EdgeCacheKeyset resource

SYNOPSIS
    gcloud alpha edge-cache keysets delete (KEYSET : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache keysets describe

```text
NAME
    gcloud alpha edge-cache keysets describe - show details about an
        EdgeCacheKeyset resource

SYNOPSIS
    gcloud alpha edge-cache keysets describe (KEYSET : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache keysets export

```text
NAME
    gcloud alpha edge-cache keysets export - export an EdgeCacheKeyset resource

SYNOPSIS
    gcloud alpha edge-cache keysets export (KEYSET : --location=LOCATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache keysets import

```text
NAME
    gcloud alpha edge-cache keysets import - import an EdgeCacheKeyset resource

SYNOPSIS
    gcloud alpha edge-cache keysets import (KEYSET : --location=LOCATION)
        [--async] [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache keysets list

```text
NAME
    gcloud alpha edge-cache keysets list - list EdgeCacheKeyset resources

SYNOPSIS
    gcloud alpha edge-cache keysets list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache keysets update

```text
NAME
    gcloud alpha edge-cache keysets update - update an EdgeCacheKeyset resource

SYNOPSIS
    gcloud alpha edge-cache keysets update (KEYSET : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--public-key=[id=ID],[managed=MANAGED],[value=VALUE]]
        [--validation-shared-key=[secret_version=SECRET_VERSION]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cache/keysets (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
