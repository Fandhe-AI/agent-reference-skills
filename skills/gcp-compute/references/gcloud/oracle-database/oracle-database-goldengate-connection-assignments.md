---
source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/goldengate-connection-assignments
---

# gcloud oracle-database goldengate-connection-assignments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud oracle-database goldengate-connection-assignments create

```text
NAME
    gcloud oracle-database goldengate-connection-assignments create - create a
        new GoldengateConnectionAssignment

SYNOPSIS
    gcloud oracle-database goldengate-connection-assignments create
        GOLDENGATE_CONNECTION_ASSIGNMENT
        (--properties-goldengate-connection=PROPERTIES_GOLDENGATE_CONNECTION
          --properties-goldengate-deployment=PROPERTIES_GOLDENGATE_DEPLOYMENT)
        [--async] [--display-name=DISPLAY_NAME] [--labels=[LABELS,...]]
        [--location=LOCATION] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new GoldengateConnectionAssignment.

EXAMPLES
    To create a GoldengateConnectionAssignment with id my-assignment in the
    location us-east4 assigning connection my-connection to deployment
    my-deployment, run:

        $ gcloud oracle-database goldengate-connection-assignments create \
            my-assignment --location=us-east4 \
            --properties-goldengate-connection=projects/my-project/\
        locations/us-east4/goldengateConnections/my-connection \
            --properties-goldengate-deployment=projects/my-project/\
        locations/us-east4/goldengateDeployments/my-deployment

POSITIONAL ARGUMENTS
     GoldengateConnectionAssignment resource - Identifier. The name of the
     GoldengateConnectionAssignment resource in the following format:
     projects/{project}/locations/{region}/goldengateConnectionAssignments/{goldengate_connection_assignment}
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument goldengate_connection_assignment on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument goldengate_connection_assignment on the command
        line with a fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       GOLDENGATE_CONNECTION_ASSIGNMENT
          ID of the goldengateConnectionAssignment or fully qualified
          identifier for the goldengateConnectionAssignment.

          To set the goldengate_connection_assignment attribute:
          + provide the argument goldengate_connection_assignment on the
            command line.

REQUIRED FLAGS
     The properties of a GoldengateConnectionAssignment.

     This must be specified.

       GoldengateConnection resource - The GoldengateConnection resource to be
       assigned. Format:
       projects/{project}/locations/{location}/goldengateConnections/{goldengate_connection}
       This represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --properties-goldengate-connection on the
          command line with a fully specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --properties-goldengate-connection on the
          command line with a fully specified name;
        + provide the argument --location on the command line.

       This must be specified.

         --properties-goldengate-connection=PROPERTIES_GOLDENGATE_CONNECTION
            ID of the goldengateConnection or fully qualified identifier for
            the goldengateConnection.

            To set the goldengate-connection attribute:
            - provide the argument --properties-goldengate-connection on the
              command line.

       GoldengateDeployment resource - The GoldenGateDeployment to assign the
       connection to. Format:
       projects/{project}/locations/{location}/goldengateDeployments/{goldengate_deployment}
       This represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --properties-goldengate-deployment on the
          command line with a fully specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --properties-goldengate-deployment on the
          command line with a fully specified name;
        + provide the argument --location on the command line.

       This must be specified.

         --properties-goldengate-deployment=PROPERTIES_GOLDENGATE_DEPLOYMENT
            ID of the goldengateDeployment or fully qualified identifier for
            the goldengateDeployment.

            To set the goldengate-deployment attribute:
            - provide the argument --properties-goldengate-deployment on the
              command line.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        The display name for the GoldengateConnectionAssignment.

     --labels=[LABELS,...]
        The labels or tags associated with the GoldengateConnectionAssignment.

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

     --location=LOCATION
        For resources [goldengate_connection_assignment,
        properties-goldengate-connection, properties-goldengate-deployment],
        provides fallback value for resource location attribute. When the
        resource's full URI path is not provided, location will fallback to
        this flag value.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud oracle-database goldengate-connection-assignments create my-assignment \
    --location=us-east4 \
    --properties-goldengate-connection=projects/my-project/locations/us-east4/goldengateConnections/my-connection \
    --properties-goldengate-deployment=projects/my-project/locations/us-east4/goldengateDeployments/my-deployment
```

### gcloud oracle-database goldengate-connection-assignments delete

```text
NAME
    gcloud oracle-database goldengate-connection-assignments delete - delete a
        GoldengateConnectionAssignment

SYNOPSIS
    gcloud oracle-database goldengate-connection-assignments delete
        (GOLDENGATE_CONNECTION_ASSIGNMENT : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a GoldengateConnectionAssignment.

EXAMPLES
    To delete a GoldengateConnectionAssignment with id my-assignment in the
    location us-east4, run:

        $ gcloud oracle-database goldengate-connection-assignments delete \
            my-assignment --location=us-east4

POSITIONAL ARGUMENTS
     GoldengateConnectionAssignment resource - The name of the
     GoldengateConnectionAssignment to delete. Format:
     projects/{project}/locations/{location}/goldengateConnectionAssignments/{goldengate_connection_assignment}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument goldengate_connection_assignment on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GOLDENGATE_CONNECTION_ASSIGNMENT
          ID of the goldengateConnectionAssignment or fully qualified
          identifier for the goldengateConnectionAssignment.

          To set the goldengate_connection_assignment attribute:
          + provide the argument goldengate_connection_assignment on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the goldengateConnectionAssignment resource.

          To set the location attribute:
          + provide the argument goldengate_connection_assignment on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database goldengate-connection-assignments describe

```text
NAME
    gcloud oracle-database goldengate-connection-assignments describe - get
        details of a GoldengateConnectionAssignment

SYNOPSIS
    gcloud oracle-database goldengate-connection-assignments describe
        (GOLDENGATE_CONNECTION_ASSIGNMENT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details of a GoldengateConnectionAssignment.

EXAMPLES
    To get a GoldengateConnectionAssignment with id my-assignment in the
    location us-east4, run:

        $ gcloud oracle-database goldengate-connection-assignments \
            describe my-assignment --location=us-east4

POSITIONAL ARGUMENTS
     GoldengateConnectionAssignment resource - The name of the
     GoldengateConnectionAssignment to retrieve. Format:
     projects/{project}/locations/{location}/goldengateConnectionAssignments/{goldengate_connection_assignment}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument goldengate_connection_assignment on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GOLDENGATE_CONNECTION_ASSIGNMENT
          ID of the goldengateConnectionAssignment or fully qualified
          identifier for the goldengateConnectionAssignment.

          To set the goldengate_connection_assignment attribute:
          + provide the argument goldengate_connection_assignment on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the goldengateConnectionAssignment resource.

          To set the location attribute:
          + provide the argument goldengate_connection_assignment on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database goldengate-connection-assignments list

```text
NAME
    gcloud oracle-database goldengate-connection-assignments list - list all
        GoldengateConnectionAssignments

SYNOPSIS
    gcloud oracle-database goldengate-connection-assignments list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all GoldengateConnectionAssignments.

EXAMPLES
    To list all GoldengateConnectionAssignments in the location us-east4, run:

        $ gcloud oracle-database goldengate-connection-assignments list \
            --location=us-east4

REQUIRED FLAGS
     Location resource - The parent value for the
     GoldengateConnectionAssignments. Format:
     projects/{project}/locations/{location} This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database goldengate-connection-assignments test

```text
NAME
    gcloud oracle-database goldengate-connection-assignments test - test a
        GoldengateConnectionAssignment

SYNOPSIS
    gcloud oracle-database goldengate-connection-assignments test
        (GOLDENGATE_CONNECTION_ASSIGNMENT : --location=LOCATION) [--type=TYPE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Tests the connectivity of a GoldengateConnectionAssignment.

EXAMPLES
    To test a GoldengateConnectionAssignment with id my-assignment in the
    location us-east4, run:

        $ gcloud oracle-database goldengate-connection-assignments test \
            my-assignment --location=us-east4

POSITIONAL ARGUMENTS
     GoldengateConnectionAssignment resource - Name of the connection
     assignment for which to test connection.
     projects/{project}/locations/{region}/goldengateConnectionAssignments/{goldengate_connection_assignment}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument goldengate_connection_assignment on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GOLDENGATE_CONNECTION_ASSIGNMENT
          ID of the goldengateConnectionAssignment or fully qualified
          identifier for the goldengateConnectionAssignment.

          To set the goldengate_connection_assignment attribute:
          + provide the argument goldengate_connection_assignment on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the goldengateConnectionAssignment resource.

          To set the location attribute:
          + provide the argument goldengate_connection_assignment on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --type=TYPE
        The type of the test of the assigned connection. The only type actually
        supported is DEFAULT. TYPE must be (only one value is supported):

         default
            The default connection test.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database goldengate-connection-assignments update

```text
NAME
    gcloud oracle-database goldengate-connection-assignments update - update
        labels of a GoldengateConnectionAssignment

SYNOPSIS
    gcloud oracle-database goldengate-connection-assignments update
        (GOLDENGATE_CONNECTION_ASSIGNMENT : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update labels of a GoldengateConnectionAssignment. Only labels can be
    updated on this resource; use --update-labels, --remove-labels or
    --clear-labels to manage them.

EXAMPLES
    To add or update labels on a GoldengateConnectionAssignment with id
    my-assignment in the location us-east4, run:

        $ gcloud oracle-database goldengate-connection-assignments update \
            my-assignment --location=us-east4 \
            --update-labels=env=prod,team=oasis

    To remove the label team from the GoldengateConnectionAssignment, run:

        $ gcloud oracle-database goldengate-connection-assignments update \
            my-assignment --location=us-east4 --remove-labels=team

    To clear all labels from the GoldengateConnectionAssignment, run:

        $ gcloud oracle-database goldengate-connection-assignments update \
            my-assignment --location=us-east4 --clear-labels

POSITIONAL ARGUMENTS
     GoldengateConnectionAssignment resource - Identifier. The name of the
     GoldengateConnectionAssignment resource in the following format:
     projects/{project}/locations/{region}/goldengateConnectionAssignments/{goldengate_connection_assignment}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument goldengate_connection_assignment on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GOLDENGATE_CONNECTION_ASSIGNMENT
          ID of the goldengateConnectionAssignment or fully qualified
          identifier for the goldengateConnectionAssignment.

          To set the goldengate_connection_assignment attribute:
          + provide the argument goldengate_connection_assignment on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the goldengateConnectionAssignment resource.

          To set the location attribute:
          + provide the argument goldengate_connection_assignment on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. The labels or tags associated with the
          GoldengateConnectionAssignment.

           KEY
              Keys must start with a lowercase character and contain only
              hyphens (-), underscores (_), lowercase characters, and numbers.

           VALUE
              Values must contain only hyphens (-), underscores (_), lowercase
              characters, and numbers.

          Shorthand Example:

              --labels=string=string

          JSON Example:

              --labels='{"string": "string"}'

          File Example:

              --labels=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --update-labels=[UPDATE_LABELS,...]
            Update labels value or add key value pair. The labels or tags
            associated with the GoldengateConnectionAssignment.

             KEY
                Keys must start with a lowercase character and contain only
                hyphens (-), underscores (_), lowercase characters, and
                numbers.

             VALUE
                Values must contain only hyphens (-), underscores (_),
                lowercase characters, and numbers.

            Shorthand Example:

                --update-labels=string=string

            JSON Example:

                --update-labels='{"string": "string"}'

            File Example:

                --update-labels=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-labels
              Clear labels value and set to empty map.

           --remove-labels=REMOVE_LABELS
              Remove existing value from map labels. Sets remove_labels value.

              Shorthand Example:

                  --remove-labels=string,string

              JSON Example:

                  --remove-labels=["string"]

              File Example:

                  --remove-labels=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/goldengate-connection-assignments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
