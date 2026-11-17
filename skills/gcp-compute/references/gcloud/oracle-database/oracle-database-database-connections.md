---
source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/database-connections
---

# gcloud oracle-database database-connections

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud oracle-database database-connections create

```text
NAME
    gcloud oracle-database database-connections create - create a new
        DatabaseConnection

SYNOPSIS
    gcloud oracle-database database-connections create DATABASE_CONNECTION
        --connection-string=CONNECTION_STRING [--async]
        [--display-name=DISPLAY_NAME] [--labels=[LABELS,...]]
        [--location=LOCATION] [--odb-network=ODB_NETWORK]
        [--password-secret-version=PASSWORD_SECRET_VERSION]
        [--request-id=REQUEST_ID] [--secret=SECRET] [--username=USERNAME]
        [--wallet-secret-version=WALLET_SECRET_VERSION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new DatabaseConnection.

EXAMPLES
    To create a DatabaseConnection with id my-connection in the location
    us-east4 with display-name my connection, connection-string
    my-db-host.example.com:1521/my-service, username admin,
    password-secret-version projects/my-project/secrets/my-secret/versions/1,
    and odb-network
    projects/my-project/locations/us-east4/odbNetworks/my-odbnetwork, run:

        $ gcloud oracle-database database-connections create my-connection \
            --location=us-east4 --display-name="my connection" \
            --connection-string="my-db-host.example.com:1521/my-service" \
            --username="admin" \
            --password-secret-version=projects/my-project/secrets/\
        my-secret/versions/1 \
            --odb-network=projects/my-project/locations/us-east4/\
        odbNetworks/my-odbnetwork

POSITIONAL ARGUMENTS
     DatabaseConnection resource - Identifier. The resource name of the
     DatabaseConnection. Format:
     projects/{project}/locations/{location}/databaseConnections/{database_connection}
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument database_connection on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument database_connection on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       DATABASE_CONNECTION
          ID of the databaseConnection or fully qualified identifier for the
          databaseConnection.

          To set the database_connection attribute:
          + provide the argument database_connection on the command line.

REQUIRED FLAGS
     --connection-string=CONNECTION_STRING
        Oracle Easy Connect or TNS connection string. Example:
        "your-db-host.example.com:1521/YOUR_SERVICE_NAME"

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        User-friendly display name for the connection.

     --labels=[LABELS,...]
        Optional: Labels as key-value pairs to organize the resource.

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
        For resources [database_connection, odb-network], provides fallback
        value for resource location attribute. When the resource's full URI
        path is not provided, location will fallback to this flag value.

     Arguments for the network configuration.

     OdbNetwork resource - For Oracle Database@Google cloud resources. Format:
     projects/{project}/locations/{location}/odbNetworks/{odbNetwork} This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --odb-network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --odb-network on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     --odb-network=ODB_NETWORK
        ID of the odbNetwork or fully qualified identifier for the odbNetwork.

        To set the odb-network attribute:
        * provide the argument --odb-network on the command line.

     SecretVersion resource - The resource name of the GCP Secret Manager
     secret version containing the password for the specified username. Format:
     projects/{project}/secrets/{secret_id}/versions/{version_id} The service's
     Per-Product Per-Project Service Account (P4SA) must have the
     'secretmanager.secretAccessor' permission on this secret. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --password-secret-version on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the secret attribute:
      * provide the argument --password-secret-version on the command line
        with a fully specified name;
      * provide the argument --secret on the command line.

     --password-secret-version=PASSWORD_SECRET_VERSION
        ID of the secretVersion or fully qualified identifier for the
        secretVersion.

        To set the secret-version attribute:
        * provide the argument --password-secret-version on the command line.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     --secret=SECRET
        For resources [password-secret-version, wallet-secret-version],
        provides fallback value for resource secret attribute. When the
        resource's full URI path is not provided, secret will fallback to this
        flag value.

     --username=USERNAME
        The default database username to use for connections.

     Arguments for the wallet source.

     SecretVersion resource - Optional: The resource name of the GCP Secret
     Manager secret version containing base64 encoded content of the Oracle
     Wallet ZIP file required for mTLS/TLS connections. Format:
     projects/{project}/secrets/{secret_id}/versions/{version_id} The service's
     Per-Product Per-Project Service Account (P4SA) must have the
     'secretmanager.secretAccessor' permission on this secret. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --wallet-secret-version on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the secret attribute:
      * provide the argument --wallet-secret-version on the command line with
        a fully specified name;
      * provide the argument --secret on the command line.

     --wallet-secret-version=WALLET_SECRET_VERSION
        ID of the secretVersion or fully qualified identifier for the
        secretVersion.

        To set the secret-version attribute:
        * provide the argument --wallet-secret-version on the command line.

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
gcloud oracle-database database-connections create my-connection \
    --location=us-east4 \
    --display-name="my connection" \
    --connection-string="my-db-host.example.com:1521/my-service" \
    --username="admin" \
    --password-secret-version=projects/my-project/secrets/my-secret/versions/1 \
    --odb-network=projects/my-project/locations/us-east4/odbNetworks/my-odbnetwork
```

### gcloud oracle-database database-connections delete

```text
NAME
    gcloud oracle-database database-connections delete - delete a
        DatabaseConnection

SYNOPSIS
    gcloud oracle-database database-connections delete
        (DATABASE_CONNECTION : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a DatabaseConnection.

EXAMPLES
    To delete a DatabaseConnection with id my-connection in the location
    us-east4, run:

        $ gcloud oracle-database database-connections delete my-connection \
            --location=us-east4

POSITIONAL ARGUMENTS
     DatabaseConnection resource - The name of the resource in the following
     format:
     projects/{project}/locations/{location}/databaseConnections/{database_connection}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument database_connection on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE_CONNECTION
          ID of the databaseConnection or fully qualified identifier for the
          databaseConnection.

          To set the database_connection attribute:
          + provide the argument database_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the databaseConnection resource.

          To set the location attribute:
          + provide the argument database_connection on the command line with
            a fully specified name;
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

### gcloud oracle-database database-connections describe

```text
NAME
    gcloud oracle-database database-connections describe - get details of a
        DatabaseConnection

SYNOPSIS
    gcloud oracle-database database-connections describe
        (DATABASE_CONNECTION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details of a DatabaseConnection.

EXAMPLES
    To get a DatabaseConnection with id my-connection in the location us-east4,
    run:

        $ gcloud oracle-database database-connections describe \
            my-connection --location=us-east4

POSITIONAL ARGUMENTS
     DatabaseConnection resource - The name of the DatabaseConnection in the
     following format:
     projects/{project}/locations/{location}/databaseConnections/{database_connection}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument database_connection on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE_CONNECTION
          ID of the databaseConnection or fully qualified identifier for the
          databaseConnection.

          To set the database_connection attribute:
          + provide the argument database_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the databaseConnection resource.

          To set the location attribute:
          + provide the argument database_connection on the command line with
            a fully specified name;
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

### gcloud oracle-database database-connections execute-sql

```text
NAME
    gcloud oracle-database database-connections execute-sql - execute a SQL
        statement on a DatabaseConnection

SYNOPSIS
    gcloud oracle-database database-connections execute-sql
        (DATABASE_CONNECTION : --location=LOCATION)
        --sql-statement=SQL_STATEMENT
        [--params=[name=NAME],[typeName=TYPENAME],[value=VALUE]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Executes a SQL statement on a DatabaseConnection. Supports SELECT queries
    as well as DML and DDL statements, which are autocommitted.

EXAMPLES
    To execute a SQL statement on a DatabaseConnection with id my-connection in
    the location us-east4, run:

        $ gcloud oracle-database database-connections execute-sql \
            my-connection --location=us-east4 \
            --sql-statement="SELECT 1 FROM DUAL"

    To execute a parameterized SQL statement with bind variables (where value
    takes JSON) on a DatabaseConnection with id my-connection in the location
    us-east4, run:

        $ gcloud oracle-database database-connections execute-sql \
            my-connection --location=us-east4 \
            --sql-statement="SELECT * FROM employees WHERE department_id = \
        :dept_id AND status = :status" --params='name=dept_id,value=10' \
            --params='name=status,value="ACTIVE"'

POSITIONAL ARGUMENTS
     DatabaseConnection resource - The name of the DatabaseConnection in the
     following format:
     projects/{project}/locations/{location}/databaseConnections/{database_connection}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument database_connection on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE_CONNECTION
          ID of the databaseConnection or fully qualified identifier for the
          databaseConnection.

          To set the database_connection attribute:
          + provide the argument database_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the databaseConnection resource.

          To set the location attribute:
          + provide the argument database_connection on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --sql-statement=SQL_STATEMENT
        The SQL statement to execute.

OPTIONAL FLAGS
     --params=[name=NAME],[typeName=TYPENAME],[value=VALUE]
        Optional: Bind variables (parameters) to be used with the SQL
        statement. Supports named bind variables (e.g., :dept_id, :status in
        Oracle SQL) or positional parameters (:1, :2).

         name
            The name of the SQL bind parameter (excluding the leading colon,
            e.g. "id"). If omitted, parameters bind positionally based on their
            order in the list.

         typeName
            Optional: Datatype hint for the parameter (e.g., "VARCHAR2",
            "NUMBER", "DATE", "TIMESTAMP"). If omitted, the Oracle driver will
            infer the type from the value string.

         value
            Use protobuf.Value so clients can pass ints, bools, and strings
            natively.

        Shorthand Example:

            --params=name=string,typeName=string,value={...} --params=name=string,typeName=string,value={...}

        JSON Example:

            --params='[{"name": "string", "typeName": "string", "value": {...}}]'

        File Example:

            --params=path_to_file.(yaml|json)

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

### gcloud oracle-database database-connections list

```text
NAME
    gcloud oracle-database database-connections list - list all
        DatabaseConnections

SYNOPSIS
    gcloud oracle-database database-connections list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all DatabaseConnections.

EXAMPLES
    To list all DatabaseConnections in the location us-east4, run:

        $ gcloud oracle-database database-connections list \
            --location=us-east4

REQUIRED FLAGS
     Location resource - The parent value for the DatabaseConnection in the
     following format: projects/{project}/locations/{location}. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

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

### gcloud oracle-database database-connections test

```text
NAME
    gcloud oracle-database database-connections test - test connectivity of a
        DatabaseConnection

SYNOPSIS
    gcloud oracle-database database-connections test
        (DATABASE_CONNECTION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Tests connectivity of a DatabaseConnection.

EXAMPLES
    To test connectivity of a DatabaseConnection with id my-connection in the
    location us-east4, run:

        $ gcloud oracle-database database-connections test my-connection \
            --location=us-east4

POSITIONAL ARGUMENTS
     DatabaseConnection resource - The name of the DatabaseConnection to test.
     Format:
     projects/{project}/locations/{location}/databaseConnections/{database_connection}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument database_connection on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE_CONNECTION
          ID of the databaseConnection or fully qualified identifier for the
          databaseConnection.

          To set the database_connection attribute:
          + provide the argument database_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the databaseConnection resource.

          To set the location attribute:
          + provide the argument database_connection on the command line with
            a fully specified name;
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

### gcloud oracle-database database-connections update

```text
NAME
    gcloud oracle-database database-connections update - update a
        DatabaseConnection

SYNOPSIS
    gcloud oracle-database database-connections update
        (DATABASE_CONNECTION : --location=LOCATION) [--async]
        [--password-secret-version=PASSWORD_SECRET_VERSION]
        [--request-id=REQUEST_ID] [--secret=SECRET]
        [--clear-wallet-secret-version
          | --wallet-secret-version=WALLET_SECRET_VERSION]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a DatabaseConnection.

EXAMPLES
    To update the password secret version of a DatabaseConnection with id
    my-connection in the location us-east4, run:

        $ gcloud oracle-database database-connections update my-connection \
            --location=us-east4 \
            --password-secret-version=projects/my-project/secrets/\
        my-secret/versions/2

    To add or update labels on a DatabaseConnection with id my-connection in
    the location us-east4, run:

        $ gcloud oracle-database database-connections update my-connection \
            --location=us-east4 --update-labels=env=prod,team=oasis

    To remove the label team from the DatabaseConnection, run:

        $ gcloud oracle-database database-connections update my-connection \
            --location=us-east4 --remove-labels=team

    To clear all labels from the DatabaseConnection, run:

        $ gcloud oracle-database database-connections update my-connection \
            --location=us-east4 --clear-labels

POSITIONAL ARGUMENTS
     DatabaseConnection resource - Identifier. The resource name of the
     DatabaseConnection. Format:
     projects/{project}/locations/{location}/databaseConnections/{database_connection}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument database_connection on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE_CONNECTION
          ID of the databaseConnection or fully qualified identifier for the
          databaseConnection.

          To set the database_connection attribute:
          + provide the argument database_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the databaseConnection resource.

          To set the location attribute:
          + provide the argument database_connection on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     SecretVersion resource - The resource name of the GCP Secret Manager
     secret version containing the password for the specified username. Format:
     projects/{project}/secrets/{secret_id}/versions/{version_id} The service's
     Per-Product Per-Project Service Account (P4SA) must have the
     'secretmanager.secretAccessor' permission on this secret. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --password-secret-version on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the secret attribute:
      * provide the argument --password-secret-version on the command line
        with a fully specified name;
      * provide the argument --secret on the command line.

     --password-secret-version=PASSWORD_SECRET_VERSION
        ID of the secretVersion or fully qualified identifier for the
        secretVersion.

        To set the secret-version attribute:
        * provide the argument --password-secret-version on the command line.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     --secret=SECRET
        For resources [password-secret-version, wallet-secret-version],
        provides fallback value for resource secret attribute. When the
        resource's full URI path is not provided, secret will fallback to this
        flag value.

     Arguments for the wallet source.

     Update wallet_secret_version.

     At most one of these can be specified:

       --clear-wallet-secret-version
          Clear wallet_secret_version value and set to null.

       SecretVersion resource - Set wallet_secret_version to new value.

       Optional: The resource name of the GCP Secret Manager secret version
       containing base64 encoded content of the Oracle Wallet ZIP file required
       for mTLS/TLS connections. Format:
       projects/{project}/secrets/{secret_id}/versions/{version_id} The
       service's Per-Product Per-Project Service Account (P4SA) must have the
       'secretmanager.secretAccessor' permission on this secret. This
       represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --wallet-secret-version on the command line
          with a fully specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the secret attribute:
        + provide the argument --wallet-secret-version on the command line
          with a fully specified name;
        + provide the argument --secret on the command line.

       --wallet-secret-version=WALLET_SECRET_VERSION
          ID of the secretVersion or fully qualified identifier for the
          secretVersion.

          To set the secret-version attribute:
          + provide the argument --wallet-secret-version on the command line.

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. Optional: Labels as key-value pairs to
          organize the resource.

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
            Update labels value or add key value pair. Optional: Labels as
            key-value pairs to organize the resource.

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

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud oracle-database database-connections update my-connection \
    --location=us-east4 \
    --password-secret-version=projects/my-project/secrets/my-secret/versions/2
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/database-connections (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
