---
source: https://docs.cloud.google.com/sdk/gcloud/reference/secrets/versions
---

# gcloud secrets versions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud secrets versions access

```text
NAME
    gcloud secrets versions access - access a secret version's data

SYNOPSIS
    gcloud secrets versions access (VERSION : --secret=SECRET)
        [--location=LOCATION] [--out-file=OUT-FILE-PATH] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Access the data for the specified secret version.

EXAMPLES
    Access the data for version 123 of the secret 'my-secret':

        $ gcloud secrets versions access 123 --secret=my-secret

    Note: The output will be formatted as UTF-8 which can corrupt binary
    secrets.

    To write raw bytes to a file use --out-file flag:

        $ gcloud secrets versions access 123 --secret=my-secret \
            --out-file=/tmp/secret

    To get the raw bytes, have Google Cloud CLI print the response as
    base64-encoded and decode:

        $ gcloud secrets versions access 123 --secret=my-secret \
            --format='get(payload.data)' | tr '_-' '/+' | base64 -d

POSITIONAL ARGUMENTS
     Version resource - Numeric secret version to access or a configured alias
     (including 'latest' to use the latest version). The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument VERSION on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VERSION
          ID of the version or fully qualified identifier for the version.

          To set the version attribute:
          + provide the argument VERSION on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --secret=SECRET
          The secret of the version.

          To set the secret attribute:
          + provide the argument VERSION on the command line with a fully
            specified name;
          + provide the argument --secret on the command line.

FLAGS
     Location resource - The location to access secret. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line.

     --out-file=OUT-FILE-PATH
        File path to which secret data is written. If this flag is not provided
        secret data will be written to stdout in UTF-8 format.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta secrets versions access
```

### gcloud secrets versions add

```text
NAME
    gcloud secrets versions add - create a new version of an existing secret

SYNOPSIS
    gcloud secrets versions add SECRET --data-file=PATH [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new version of an existing secret with the provided data. The
    command will return an error if no such secret exists.

EXAMPLES
    Create a new version of an existing secret named 'my-secret' with secret
    data "s3cr3t":

        $ printf "s3cr3t" | gcloud secrets versions add my-secret \
            --data-file=-

    Create a new version of an existing secret named 'my-secret' with secret
    data "s3cr3t" using PowerShell (Note: PowerShell will add a newline to the
    resulting secret):

        $ Write-Output "s3cr3t" | gcloud secrets versions add my-secret \
            --data-file=-

    Create a new version of an existing secret named 'my-secret' with secret
    data from a file:

        $ gcloud secrets versions add my-secret --data-file=/tmp/secret

POSITIONAL ARGUMENTS
     Secret resource - The secret to create. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument SECRET on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SECRET
          ID of the secret or fully qualified identifier for the secret.

          To set the secret attribute:
          + provide the argument SECRET on the command line.

REQUIRED FLAGS
     --data-file=PATH
        File path from which to read secret data. Set this to "-" to read the
        secret data from stdin.

OPTIONAL FLAGS
     Location resource - The location to create secret version. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta secrets versions add
```

### gcloud secrets versions describe

```text
NAME
    gcloud secrets versions describe - describe metadata about the secret
        version

SYNOPSIS
    gcloud secrets versions describe (VERSION : --secret=SECRET)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a secret version's metadata. This command does not include the
    secret version's secret data.

EXAMPLES
    Describe version '123' of the secret named 'my-secret':

        $ gcloud secrets versions describe 123 --secret=my-secret

POSITIONAL ARGUMENTS
     Version resource - Numeric secret version to describe or a configured
     alias (including 'latest' to use the latest version). The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument VERSION on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VERSION
          ID of the version or fully qualified identifier for the version.

          To set the version attribute:
          + provide the argument VERSION on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --secret=SECRET
          The secret of the version.

          To set the secret attribute:
          + provide the argument VERSION on the command line with a fully
            specified name;
          + provide the argument --secret on the command line.

FLAGS
     Location resource - The location to describe secret. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta secrets versions describe
```

### gcloud secrets versions destroy

```text
NAME
    gcloud secrets versions destroy - destroy a secret version's metadata and
        secret data

SYNOPSIS
    gcloud secrets versions destroy (VERSION : --secret=SECRET) [--etag=ETAG]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Destroy a secret version's metadata and secret data. This action is
    irreversible.

EXAMPLES
    Destroy version 123 of the secret named my-secret:

        $ gcloud secrets versions destroy 123 --secret=my-secret

    Destroy version 123 of the secret named my-secret using etag:

        $ gcloud secrets versions destroy 123 --secret=my-secret --etag=123

POSITIONAL ARGUMENTS
     Version resource - Numeric secret version to destroy. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument VERSION on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VERSION
          ID of the version or fully qualified identifier for the version.

          To set the version attribute:
          + provide the argument VERSION on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --secret=SECRET
          The secret of the version.

          To set the secret attribute:
          + provide the argument VERSION on the command line with a fully
            specified name;
          + provide the argument --secret on the command line.

FLAGS
     --etag=ETAG
        Current entity tag (ETag) of the secret version. If specified, the
        version is destroyed only if the ETag provided matches the current
        version's ETag.

     Location resource - The location to destroy . This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta secrets versions destroy
```

### gcloud secrets versions disable

```text
NAME
    gcloud secrets versions disable - disable the version of the provided
        secret

SYNOPSIS
    gcloud secrets versions disable (VERSION : --secret=SECRET) [--etag=ETAG]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Disable the version of the provided secret. It can be re-enabled with
    gcloud secrets versions enable.

EXAMPLES
    Disable version 123 of the secret named my-secret:

        $ gcloud secrets versions disable 123 --secret=my-secret

    Disable version 123 of the secret named my-secret using etag:

        $ gcloud secrets versions disable 123 --secret=my-secret --etag=123

POSITIONAL ARGUMENTS
     Version resource - Numeric secret version to disable. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument VERSION on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VERSION
          ID of the version or fully qualified identifier for the version.

          To set the version attribute:
          + provide the argument VERSION on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --secret=SECRET
          The secret of the version.

          To set the secret attribute:
          + provide the argument VERSION on the command line with a fully
            specified name;
          + provide the argument --secret on the command line.

FLAGS
     --etag=ETAG
        Current entity tag (ETag) of the secret version. If specified, the
        version is disabled only if the ETag provided matches the current
        version's ETag.

     Location resource - The location to disable. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta secrets versions disable
```

### gcloud secrets versions enable

```text
NAME
    gcloud secrets versions enable - enable the version of the provided secret

SYNOPSIS
    gcloud secrets versions enable (VERSION : --secret=SECRET) [--etag=ETAG]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enable the version of the provided secret. It can be disabled with gcloud
    secrets versions disable.

EXAMPLES
    Enable version 123 of the secret named my-secret:

        $ gcloud secrets versions enable 123 --secret=my-secret

    Enable version 123 of the secret named my-secret using etag:

        $ gcloud secrets versions enable 123 --secret=my-secret --etag=123

POSITIONAL ARGUMENTS
     Version resource - Numeric secret version to enable. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument VERSION on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VERSION
          ID of the version or fully qualified identifier for the version.

          To set the version attribute:
          + provide the argument VERSION on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --secret=SECRET
          The secret of the version.

          To set the secret attribute:
          + provide the argument VERSION on the command line with a fully
            specified name;
          + provide the argument --secret on the command line.

FLAGS
     --etag=ETAG
        Current entity tag (ETag) of the secret version. If specified, the
        version is enabled only if the ETag provided matches the current
        version's ETag.

     Location resource - The location to enable. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta secrets versions enable
```

### gcloud secrets versions list

```text
NAME
    gcloud secrets versions list - list all versions for a secret

SYNOPSIS
    gcloud secrets versions list SECRET [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=100] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all versions and their status (For example: active/disabled/destroyed)
    for a secret.

EXAMPLES
    List all versions for the secret named 'my-secret':

        $ gcloud secrets versions list my-secret

POSITIONAL ARGUMENTS
     Secret resource - The secret from which to list versions. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument SECRET on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SECRET
          ID of the secret or fully qualified identifier for the secret.

          To set the secret attribute:
          + provide the argument SECRET on the command line.

FLAGS
     Location resource - The location to create secret. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line.

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

     --page-size=PAGE_SIZE; default=100
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is 100.
        Paging may be applied before or after --filter and --limit depending on
        the service.

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

        $ gcloud beta secrets versions list
```

### gcloud beta secrets versions access

```text
NAME
    gcloud beta secrets versions access - access a secret version's data

SYNOPSIS
    gcloud beta secrets versions access (VERSION : --secret=SECRET)
        [--location=LOCATION] [--out-file=OUT-FILE-PATH] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta secrets versions add

```text
NAME
    gcloud beta secrets versions add - create a new version of an existing
        secret

SYNOPSIS
    gcloud beta secrets versions add SECRET --data-file=PATH
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta secrets versions describe

```text
NAME
    gcloud beta secrets versions describe - describe metadata about the secret
        version

SYNOPSIS
    gcloud beta secrets versions describe (VERSION : --secret=SECRET)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta secrets versions destroy

```text
NAME
    gcloud beta secrets versions destroy - destroy a secret version's metadata
        and secret data

SYNOPSIS
    gcloud beta secrets versions destroy (VERSION : --secret=SECRET)
        [--etag=ETAG] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta secrets versions disable

```text
NAME
    gcloud beta secrets versions disable - disable the version of the provided
        secret

SYNOPSIS
    gcloud beta secrets versions disable (VERSION : --secret=SECRET)
        [--etag=ETAG] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta secrets versions enable

```text
NAME
    gcloud beta secrets versions enable - enable the version of the provided
        secret

SYNOPSIS
    gcloud beta secrets versions enable (VERSION : --secret=SECRET)
        [--etag=ETAG] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta secrets versions list

```text
NAME
    gcloud beta secrets versions list - list all versions for a secret

SYNOPSIS
    gcloud beta secrets versions list SECRET [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=100] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha secrets versions config export

```text
NAME
    gcloud alpha secrets versions config export - export the configuration for
        a Secretmanager version

SYNOPSIS
    gcloud alpha secrets versions config export
        ([VERSION : --secret=SECRET] --all) [--path=PATH; default="-"]
        [--resource-format=RESOURCE_FORMAT] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/secrets/versions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
