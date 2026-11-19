---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/repositories
---

# gcloud builds repositories

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds repositories create

```text
NAME
    gcloud builds repositories create - create a Cloud Build repository

SYNOPSIS
    gcloud builds repositories create
        (REPOSITORY : --connection=CONNECTION --region=REGION)
        --remote-uri=REMOTE_URI [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud Build repository in a connection.

EXAMPLES
    To Create a repository with name my-repo in the connection my-conn, run the
    following command:

        $ gcloud builds repositories create my-repo \
            --remote-uri=https://github.com/octocat/Hello-World.git \
            --connection=my-conn --region=us-central1

POSITIONAL ARGUMENTS
     Repository resource - Repository to create. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument repository on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPOSITORY
          ID of the repository or fully qualified identifier for the
          repository.

          To set the repository attribute:
          + provide the argument repository on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connection=CONNECTION
          Connection ID.

          To set the connection attribute:
          + provide the argument repository on the command line with a fully
            specified name;
          + provide the argument --connection on the command line.

       --region=REGION
          The Google Cloud region.

          To set the region attribute:
          + provide the argument repository on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

REQUIRED FLAGS
     --remote-uri=REMOTE_URI
        The remote git clone URL of the repository.

OPTIONAL FLAGS
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
    This command uses the cloudbuild/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/cloud-build/docs/

NOTES
    These variants are also available:

        $ gcloud alpha builds repositories create

        $ gcloud beta builds repositories create
```

### gcloud builds repositories delete

```text
NAME
    gcloud builds repositories delete - delete a Cloud Build Repository

SYNOPSIS
    gcloud builds repositories delete
        (REPOSITORY : --connection=CONNECTION --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Cloud Build Repository in a Connection.

EXAMPLES
    To delete Cloud Build repository my-repo in connection my-conn, run the
    following command:

        $ gcloud builds repositories delete my-repo --connection=my-conn \
            --region=us-central1

POSITIONAL ARGUMENTS
     Repository resource - Cloud Build repository to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument repository on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPOSITORY
          ID of the repository or fully qualified identifier for the
          repository.

          To set the repository attribute:
          + provide the argument repository on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connection=CONNECTION
          Connection ID.

          To set the connection attribute:
          + provide the argument repository on the command line with a fully
            specified name;
          + provide the argument --connection on the command line.

       --region=REGION
          The Google Cloud region.

          To set the region attribute:
          + provide the argument repository on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

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
    This command uses the cloudbuild/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/cloud-build/docs/

NOTES
    These variants are also available:

        $ gcloud alpha builds repositories delete

        $ gcloud beta builds repositories delete
```

### gcloud builds repositories describe

```text
NAME
    gcloud builds repositories describe - describe a Cloud Build Repository

SYNOPSIS
    gcloud builds repositories describe
        (REPOSITORY : --connection=CONNECTION --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Build Repository.

EXAMPLES
    To list all the Cloud Build connections in region us-central1, run the
    following command:

        $ gcloud builds repositories describe --region=us-central1

POSITIONAL ARGUMENTS
     Repository resource - Cloud Build Repository to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument repository on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPOSITORY
          ID of the repository or fully qualified identifier for the
          repository.

          To set the repository attribute:
          + provide the argument repository on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connection=CONNECTION
          Connection ID.

          To set the connection attribute:
          + provide the argument repository on the command line with a fully
            specified name;
          + provide the argument --connection on the command line.

       --region=REGION
          The Google Cloud region.

          To set the region attribute:
          + provide the argument repository on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudbuild/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/cloud-build/docs/

NOTES
    These variants are also available:

        $ gcloud alpha builds repositories describe

        $ gcloud beta builds repositories describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud builds repositories describe my-repo \
    --connection=my-conn \
    --region=us-central1
```

### gcloud builds repositories list

```text
NAME
    gcloud builds repositories list - list all Cloud Build repositories in a
        connection

SYNOPSIS
    gcloud builds repositories list (--connection=CONNECTION : --region=REGION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Cloud Build repositories in a connection.

EXAMPLES
    To list all the repositories in the Cloud Build connection my-conn, run the
    following command:

        $ gcloud builds repositories list --connection=my-conn \
            --region=us-central1

REQUIRED FLAGS
     Connection resource - Cloud Build connection to list all contained
     repositories. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --connection=CONNECTION
          ID of the connection or fully qualified identifier for the
          connection.

          To set the connection attribute:
          + provide the argument --connection on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --region=REGION
          The Google Cloud region.

          To set the region attribute:
          + provide the argument --connection on the command line with a
            fully specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

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
    This command uses the cloudbuild/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/cloud-build/docs/

NOTES
    These variants are also available:

        $ gcloud alpha builds repositories list

        $ gcloud beta builds repositories list
```

### gcloud beta builds repositories create

```text
NAME
    gcloud beta builds repositories create - create a Cloud Build repository

SYNOPSIS
    gcloud beta builds repositories create
        (REPOSITORY : --connection=CONNECTION --region=REGION)
        --remote-uri=REMOTE_URI [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds repositories delete

```text
NAME
    gcloud beta builds repositories delete - delete a Cloud Build Repository

SYNOPSIS
    gcloud beta builds repositories delete
        (REPOSITORY : --connection=CONNECTION --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds repositories describe

```text
NAME
    gcloud beta builds repositories describe - describe a Cloud Build
        Repository

SYNOPSIS
    gcloud beta builds repositories describe
        (REPOSITORY : --connection=CONNECTION --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds repositories list

```text
NAME
    gcloud beta builds repositories list - list all Cloud Build repositories in
        a connection

SYNOPSIS
    gcloud beta builds repositories list
        (--connection=CONNECTION : --region=REGION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds repositories create

```text
NAME
    gcloud alpha builds repositories create - create a Cloud Build repository

SYNOPSIS
    gcloud alpha builds repositories create
        (REPOSITORY : --connection=CONNECTION --region=REGION)
        --remote-uri=REMOTE_URI [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds repositories delete

```text
NAME
    gcloud alpha builds repositories delete - delete a Cloud Build Repository

SYNOPSIS
    gcloud alpha builds repositories delete
        (REPOSITORY : --connection=CONNECTION --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds repositories describe

```text
NAME
    gcloud alpha builds repositories describe - describe a Cloud Build
        Repository

SYNOPSIS
    gcloud alpha builds repositories describe
        (REPOSITORY : --connection=CONNECTION --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds repositories list

```text
NAME
    gcloud alpha builds repositories list - list all Cloud Build repositories
        in a connection

SYNOPSIS
    gcloud alpha builds repositories list
        (--connection=CONNECTION : --region=REGION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example (introduced as "To list all the Cloud Build connections") gives only `--region`, without the repository and `--connection` that the SYNOPSIS requires (gcloud 593.0.0: "REPOSITORY must be specified"); the runnable form adds `my-repo` and `--connection=my-conn`, the names used by the `delete` example on this page.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/repositories (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
