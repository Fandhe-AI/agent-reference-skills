---
source: https://docs.cloud.google.com/sdk/gcloud/reference/developer-connect/connections/git-repository-links
---

# gcloud developer-connect connections git-repository-links

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud developer-connect connections git-repository-links create

```text
NAME
    gcloud developer-connect connections git-repository-links create - create a
        git repository link

SYNOPSIS
    gcloud developer-connect connections git-repository-links create
        (GIT_REPOSITORY_LINK : --connection=CONNECTION --location=LOCATION)
        --clone-uri=CLONE_URI [--annotations=[ANNOTATIONS,...]] [--async]
        [--etag=ETAG] [--labels=[LABELS,...]] [--request-id=REQUEST_ID]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a git repository link.

EXAMPLES
    To create a git repository link 'my-git-repository-link' in a connection
    my-connection in us-central1 run:

        $ gcloud developer-connect connections git-repository-links create \
            my-git-repository-link \
            --clone-uri=https://github.com/my-org/my-repo.git \
            --connection=my-connection --location=us-central1

    Or run:

        $ gcloud developer-connect connections git-repository-links create \
            projects/my-project/locations/us-central1/connections/\
        my-connection/gitRepositoryLinks/my-git-repository-link \
            --clone-uri=https://github.com/my-org/my-repo.git \
            --location=us-central1

POSITIONAL ARGUMENTS
     GitRepositoryLink resource - Identifier. Resource name of the repository,
     in the format projects/*/locations/*/connections/*/gitRepositoryLinks/*.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument git_repository_link on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GIT_REPOSITORY_LINK
          ID of the gitRepositoryLink or fully qualified identifier for the
          gitRepositoryLink.

          To set the git_repository_link attribute:
          + provide the argument git_repository_link on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connection=CONNECTION
          The connection id of the gitRepositoryLink resource.

          To set the connection attribute:
          + provide the argument git_repository_link on the command line with
            a fully specified name;
          + provide the argument --connection on the command line.

       --location=LOCATION
          The location id of the gitRepositoryLink resource.

          To set the location attribute:
          + provide the argument git_repository_link on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --clone-uri=CLONE_URI
        Git Clone URI.

OPTIONAL FLAGS
     --annotations=[ANNOTATIONS,...]
        Allows clients to store small amounts of arbitrary data.

         KEY
            Sets KEY value.

         VALUE
            Sets VALUE value.

        Shorthand Example:

            --annotations=string=string

        JSON Example:

            --annotations='{"string": "string"}'

        File Example:

            --annotations=path_to_file.(yaml|json)

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        This checksum is computed by the server based on the value of other
        fields, and may be sent on update and delete requests to ensure the
        client has an up-to-date value before proceeding.

     --labels=[LABELS,...]
        Labels as key value pairs.

         KEY
            Keys must start with a lowercase character and contain only hyphens
            (-), underscores (_), lowercase characters, and numbers.

         VALUE
            Values must contain only hyphens (-), underscores (_), lowercase
            characters, and numbers.

        Shorthand Example:

            --labels=string=string

        JSON Example:

            --labels='{"string": "string"}'

        File Example:

            --labels=path_to_file.(yaml|json)

     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server will
        guarantee that for at least 60 minutes since the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     --validate-only
        If set, validate the request, but do not actually post it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect connections git-repository-links \
            create

        $ gcloud beta developer-connect connections git-repository-links \
            create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud developer-connect connections git-repository-links create projects/my-project/locations/us-central1/connections/my-connection/gitRepositoryLinks/my-git-repository-link \
    --clone-uri=https://github.com/my-org/my-repo.git \
    --location=us-central1
```

### gcloud developer-connect connections git-repository-links delete

```text
NAME
    gcloud developer-connect connections git-repository-links delete - delete a
        single git repository link

SYNOPSIS
    gcloud developer-connect connections git-repository-links delete
        (GIT_REPOSITORY_LINK : --connection=CONNECTION --location=LOCATION)
        [--async] [--etag=ETAG] [--request-id=REQUEST_ID] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a single git repository link.

EXAMPLES
    To delete a git repository link my-git-repository-link in a connection
    my-connection in location us-central1 run:

        $ gcloud developer-connect connections git-repository-links delete \
            my-git-repository-link --connection=my-connection \
            --location=us-central1

POSITIONAL ARGUMENTS
     GitRepositoryLink resource - Name of the resource The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument git_repository_link on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GIT_REPOSITORY_LINK
          ID of the gitRepositoryLink or fully qualified identifier for the
          gitRepositoryLink.

          To set the git_repository_link attribute:
          + provide the argument git_repository_link on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connection=CONNECTION
          The connection id of the gitRepositoryLink resource.

          To set the connection attribute:
          + provide the argument git_repository_link on the command line with
            a fully specified name;
          + provide the argument --connection on the command line.

       --location=LOCATION
          The location id of the gitRepositoryLink resource.

          To set the location attribute:
          + provide the argument git_repository_link on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        This checksum is computed by the server based on the value of other
        fields, and may be sent on update and delete requests to ensure the
        client has an up-to-date value before proceeding.

     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server will
        guarantee that for at least 60 minutes after the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     --validate-only
        If set, validate the request, but do not actually post it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect connections git-repository-links \
            delete

        $ gcloud beta developer-connect connections git-repository-links \
            delete
```

### gcloud developer-connect connections git-repository-links describe

```text
NAME
    gcloud developer-connect connections git-repository-links describe - get
        details of a single git repository link

SYNOPSIS
    gcloud developer-connect connections git-repository-links describe
        (GIT_REPOSITORY_LINK : --connection=CONNECTION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details of a single git repository link.

EXAMPLES
    To get the details of a single git repository link my-git-repository-link
    in a conenction my-connection in location us-central1 run:

    $ gcloud developer-connect connections git-repository-links \        describe my-git-repository-link --connection=my-connection \
        --location=us-central1-a

POSITIONAL ARGUMENTS
     GitRepositoryLink resource - Name of the resource The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument git_repository_link on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GIT_REPOSITORY_LINK
          ID of the gitRepositoryLink or fully qualified identifier for the
          gitRepositoryLink.

          To set the git_repository_link attribute:
          + provide the argument git_repository_link on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connection=CONNECTION
          The connection id of the gitRepositoryLink resource.

          To set the connection attribute:
          + provide the argument git_repository_link on the command line with
            a fully specified name;
          + provide the argument --connection on the command line.

       --location=LOCATION
          The location id of the gitRepositoryLink resource.

          To set the location attribute:
          + provide the argument git_repository_link on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect connections git-repository-links \
            describe

        $ gcloud beta developer-connect connections git-repository-links \
            describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud developer-connect connections git-repository-links describe my-git-repository-link \
    --connection=my-connection \
    --location=us-central1
```

### gcloud developer-connect connections git-repository-links fetch-read-token

```text
NAME
    gcloud developer-connect connections git-repository-links fetch-read-token
        - fetch the read token of a given gitRepositoryLink

SYNOPSIS
    gcloud developer-connect connections git-repository-links fetch-read-token
        (GIT_REPOSITORY_LINK : --connection=CONNECTION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Fetch the read token of a given gitRepositoryLink.

EXAMPLES
    To get the read token of a GitRepositoryLink named "my-git-repository-link"
    in a Connection named "my-connection" in location "us-central1":

        $ gcloud developer-connect connections git-repository-links \
            fetch-read-token fetch-read-token my-git-repository-link \
            --connection=my-connection --location=us-central1 \
            --project=my-project

POSITIONAL ARGUMENTS
     GitRepositoryLink resource - Developer Connect GitRepositoryLink from
     which to fetch the read token. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument git_repository_link on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GIT_REPOSITORY_LINK
          ID of the gitRepositoryLink or fully qualified identifier for the
          gitRepositoryLink.

          To set the git_repository_link attribute:
          + provide the argument git_repository_link on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connection=CONNECTION
          The connection id of the gitRepositoryLink resource.

          To set the connection attribute:
          + provide the argument git_repository_link on the command line with
            a fully specified name;
          + provide the argument --connection on the command line.

       --location=LOCATION
          The location id of the gitRepositoryLink resource.

          To set the location attribute:
          + provide the argument git_repository_link on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect connections git-repository-links \
            fetch-read-token

        $ gcloud beta developer-connect connections git-repository-links \
            fetch-read-token
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud developer-connect connections git-repository-links fetch-read-token my-git-repository-link \
    --connection=my-connection \
    --location=us-central1 \
    --project=my-project
```

### gcloud developer-connect connections git-repository-links fetch-read-write-token

```text
NAME
    gcloud developer-connect connections git-repository-links
        fetch-read-write-token - fetch the read/write token of a given
        gitRepositoryLink

SYNOPSIS
    gcloud developer-connect connections git-repository-links
        fetch-read-write-token
        (GIT_REPOSITORY_LINK : --connection=CONNECTION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Fetch the read/write token of a given gitRepositoryLink.

EXAMPLES
    To get the read/write token of a GitRepositoryLink named
    "my-git-repository-link" in a Connection named "my-connection":

        $ gcloud developer-connect connections git-repository-links \
            fetch-read-write-token fetch-read-write-token \
            my-git-repository-link --connection=my-connection \
            --location=us-central1 --project=my-project

POSITIONAL ARGUMENTS
     GitRepositoryLink resource - Developer Connect GitRepositoryLink from
     which to fetch the read/write token. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument git_repository_link on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GIT_REPOSITORY_LINK
          ID of the gitRepositoryLink or fully qualified identifier for the
          gitRepositoryLink.

          To set the git_repository_link attribute:
          + provide the argument git_repository_link on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connection=CONNECTION
          The connection id of the gitRepositoryLink resource.

          To set the connection attribute:
          + provide the argument git_repository_link on the command line with
            a fully specified name;
          + provide the argument --connection on the command line.

       --location=LOCATION
          The location id of the gitRepositoryLink resource.

          To set the location attribute:
          + provide the argument git_repository_link on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect connections git-repository-links \
            fetch-read-write-token

        $ gcloud beta developer-connect connections git-repository-links \
            fetch-read-write-token
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud developer-connect connections git-repository-links fetch-read-write-token my-git-repository-link \
    --connection=my-connection \
    --location=us-central1 \
    --project=my-project
```

### gcloud developer-connect connections git-repository-links list

```text
NAME
    gcloud developer-connect connections git-repository-links list - list all
        git repository links in a connection

SYNOPSIS
    gcloud developer-connect connections git-repository-links list
        (--connection=CONNECTION : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all git repository links in a connection.

EXAMPLES
    To list all git repository links in a connection my-connection in location
    us-central1 run:

        $ gcloud developer-connect connections git-repository-links list \
            --connection=my-connection --location=us-central1

REQUIRED FLAGS
     Connection resource - Parent value for ListGitRepositoryLinksRequest The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

       --location=LOCATION
          The location id of the connection resource.

          To set the location attribute:
          + provide the argument --connection on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect connections git-repository-links \
            list

        $ gcloud beta developer-connect connections git-repository-links list
```

### gcloud beta developer-connect connections git-repository-links create

```text
NAME
    gcloud beta developer-connect connections git-repository-links create -
        create a git repository link

SYNOPSIS
    gcloud beta developer-connect connections git-repository-links create
        (GIT_REPOSITORY_LINK : --connection=CONNECTION --location=LOCATION)
        --clone-uri=CLONE_URI [--annotations=[ANNOTATIONS,...]] [--async]
        [--etag=ETAG] [--labels=[LABELS,...]] [--request-id=REQUEST_ID]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta developer-connect connections git-repository-links delete

```text
NAME
    gcloud beta developer-connect connections git-repository-links delete -
        delete a single git repository link

SYNOPSIS
    gcloud beta developer-connect connections git-repository-links delete
        (GIT_REPOSITORY_LINK : --connection=CONNECTION --location=LOCATION)
        [--async] [--etag=ETAG] [--request-id=REQUEST_ID] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta developer-connect connections git-repository-links describe

```text
NAME
    gcloud beta developer-connect connections git-repository-links describe -
        get details of a single git repository link

SYNOPSIS
    gcloud beta developer-connect connections git-repository-links describe
        (GIT_REPOSITORY_LINK : --connection=CONNECTION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta developer-connect connections git-repository-links fetch-read-token

```text
NAME
    gcloud beta developer-connect connections git-repository-links
        fetch-read-token - fetch the read token of a given gitRepositoryLink

SYNOPSIS
    gcloud beta developer-connect connections git-repository-links
        fetch-read-token
        (GIT_REPOSITORY_LINK : --connection=CONNECTION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta developer-connect connections git-repository-links fetch-read-write-token

```text
NAME
    gcloud beta developer-connect connections git-repository-links
        fetch-read-write-token - fetch the read/write token of a given
        gitRepositoryLink

SYNOPSIS
    gcloud beta developer-connect connections git-repository-links
        fetch-read-write-token
        (GIT_REPOSITORY_LINK : --connection=CONNECTION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta developer-connect connections git-repository-links list

```text
NAME
    gcloud beta developer-connect connections git-repository-links list - list
        all git repository links in a connection

SYNOPSIS
    gcloud beta developer-connect connections git-repository-links list
        (--connection=CONNECTION : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect connections git-repository-links create

```text
NAME
    gcloud alpha developer-connect connections git-repository-links create -
        create a git repository link

SYNOPSIS
    gcloud alpha developer-connect connections git-repository-links create
        (GIT_REPOSITORY_LINK : --connection=CONNECTION --location=LOCATION)
        --clone-uri=CLONE_URI [--annotations=[ANNOTATIONS,...]] [--async]
        [--etag=ETAG] [--labels=[LABELS,...]] [--request-id=REQUEST_ID]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect connections git-repository-links delete

```text
NAME
    gcloud alpha developer-connect connections git-repository-links delete -
        delete a single git repository link

SYNOPSIS
    gcloud alpha developer-connect connections git-repository-links delete
        (GIT_REPOSITORY_LINK : --connection=CONNECTION --location=LOCATION)
        [--async] [--etag=ETAG] [--request-id=REQUEST_ID] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect connections git-repository-links describe

```text
NAME
    gcloud alpha developer-connect connections git-repository-links describe -
        get details of a single git repository link

SYNOPSIS
    gcloud alpha developer-connect connections git-repository-links describe
        (GIT_REPOSITORY_LINK : --connection=CONNECTION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect connections git-repository-links fetch-read-token

```text
NAME
    gcloud alpha developer-connect connections git-repository-links
        fetch-read-token - fetch the read token of a given gitRepositoryLink

SYNOPSIS
    gcloud alpha developer-connect connections git-repository-links
        fetch-read-token
        (GIT_REPOSITORY_LINK : --connection=CONNECTION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect connections git-repository-links fetch-read-write-token

```text
NAME
    gcloud alpha developer-connect connections git-repository-links
        fetch-read-write-token - fetch the read/write token of a given
        gitRepositoryLink

SYNOPSIS
    gcloud alpha developer-connect connections git-repository-links
        fetch-read-write-token
        (GIT_REPOSITORY_LINK : --connection=CONNECTION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect connections git-repository-links list

```text
NAME
    gcloud alpha developer-connect connections git-repository-links list - list
        all git repository links in a connection

SYNOPSIS
    gcloud alpha developer-connect connections git-repository-links list
        (--connection=CONNECTION : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example passes `--location=us-central1-a`, a zone, while its text says the location is `us-central1`; the runnable form uses `--location=us-central1`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `fetch-read-token` and `fetch-read-write-token` examples repeat the command name (`fetch-read-token fetch-read-token`), so the second word is taken as GIT_REPOSITORY_LINK and the real link name as an extra argument (gcloud 593.0.0: "unrecognized arguments: my-git-repository-link"); the runnable form drops the repeated word.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/developer-connect/connections/git-repository-links (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
