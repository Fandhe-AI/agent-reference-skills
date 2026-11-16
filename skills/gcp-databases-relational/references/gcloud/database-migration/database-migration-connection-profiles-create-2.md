---
source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/connection-profiles/create
---

# gcloud database-migration connection-profiles create (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud database-migration connection-profiles create sqlserver

```text
NAME
    gcloud database-migration connection-profiles create sqlserver - create a
        Database Migration Service connection profile for SQL Server

SYNOPSIS
    gcloud database-migration connection-profiles create sqlserver
        (CONNECTION_PROFILE : --region=REGION) [--no-async]
        [--database=DATABASE] [--display-name=DISPLAY_NAME]
        [--endpoint-mode=ENDPOINT_MODE] [--labels=[KEY=VALUE,...]]
        [--role=ROLE] [--ssl-flags=[FLAG=VALUE,...]]
        [--ca-certificate=CA_CERTIFICATE --ssl-type=SSL_TYPE]
        [[--gcs-bucket=GCS_BUCKET
          : --gcs-prefix=GCS_PREFIX --provider=PROVIDER]
          | [--host=HOST --port=PORT : --dbm-port=DBM_PORT]]
        [--private-connection=PRIVATE_CONNECTION
          | --psc-service-attachment=PSC_SERVICE_ATTACHMENT
          | --static-ip-connectivity
          | [--forward-ssh-hostname=FORWARD_SSH_HOSTNAME
          --forward-ssh-username=FORWARD_SSH_USERNAME
          (--forward-ssh-password=FORWARD_SSH_PASSWORD
          | --forward-ssh-private-key=FORWARD_SSH_PRIVATE_KEY)
          : --forward-ssh-port=FORWARD_SSH_PORT; default=22]]
        [--username=USERNAME (--password=PASSWORD | --prompt-for-password)
          : --cloudsql-instance=CLOUDSQL_INSTANCE
          --cloudsql-project-id=CLOUDSQL_PROJECT_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Database Migration Service connection profile for SQL Server.

EXAMPLES
    To create a source connection profile my-source-profile for SQL Server:

        $ gcloud database-migration connection-profiles create sqlserver \
          my-source-profile --region=us-central1 \
          --gcs-bucket=bucket-name --gcs-prefix=prefix/path

    To create a destination connection profile my-dest-profile for SQL Server:

        $ gcloud database-migration connection-profiles create sqlserver \
          my-dest-profile --region=us-central1 \
          --cloudsql-instance=cloudsql-id

POSITIONAL ARGUMENTS
     Connection profile resource - The connection profile to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument connection_profile on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTION_PROFILE
          ID of the connection_profile or fully qualified identifier for the
          connection_profile.

          To set the connection_profile attribute:
          + provide the argument connection_profile on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud region for the connection_profile.

          To set the region attribute:
          + provide the argument connection_profile on the command line with
            a fully specified name;
          + provide the argument --region on the command line.

FLAGS
     --no-async
        Waits for the operation in progress to complete before returning.

     --database=DATABASE
        The name of the specific database within the host.

     --display-name=DISPLAY_NAME
        A user-friendly name for the connection profile. The display name can
        include letters, numbers, spaces, and hyphens, and must start with a
        letter.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --role=ROLE
        The role of the connection profile. ROLE must be one of: SOURCE,
        DESTINATION.

     --ssl-flags=[FLAG=VALUE,...]
        List of SSL flags used for establishing SSL connection to the database.
        Use an equals sign to separate the flag name and value. By default,
        flags are separated by commas. Example: --ssl-flags
        ssl_mode=enable,server_certificate_hostname=server.com.

        If flag values contain commas (such as RFC 2253 distinguished names for
        server_certificate_dn), use an alternative delimiter with the ^DELIM^
        prefix syntax. Example:
        --ssl-flags="^;^server_certificate_dn=CN=db.example.com,OU=RDS,O=Amazon.com,C=US".

     --ca-certificate=CA_CERTIFICATE
        x509 PEM-encoded certificate of the CA that signed the database
        server's certificate. The value for this flag needs to be the content
        of the certificate file, not the path to the file. For example, on a
        Linux machine you can use command substitution:
        <code>--ca-certificate=$(</path/to/certificate_file.pem)</code>.
        Database Migration Service will use this certificate to verify it's
        connecting to the correct host. Database Migration Service encrypts the
        value when storing it.

     --ssl-type=SSL_TYPE
        The type of SSL configuration. SSL_TYPE must be one of: SERVER_ONLY,
        REQUIRED, NONE.

     At most one of these can be specified:

       --gcs-bucket=GCS_BUCKET
          Cloud Storage bucket for the source SQL Server connection profile
          where the backups are stored. This flag is used only for SQL Server
          to Cloud SQL migrations.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --gcs-prefix=GCS_PREFIX
          Cloud Storage prefix path within the bucket for the source SQL Server
          connection profile where the backups are stored. This flag is used
          only for SQL Server to Cloud SQL migrations.

       --provider=PROVIDER
          Database provider, for managed databases. PROVIDER must be one of:
          CLOUDSQL, RDS.

       --host=HOST
          IP or hostname of the database.

              When `--psc-service-attachment` is also specified, this field value
              should be:

              1. For Cloud SQL PSC enabled instance - the dns_name field
                 (e.g <uid>.<region>.sql.goog.).
              2. For Cloud SQL PSA instance (vpc peering) - the private ip of the
                 instance.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --port=PORT
          Network port of the database.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --dbm-port=DBM_PORT
          The Database Mirroring (DBM) port.

     At most one of these can be specified:

         Private connection resource - Resource ID of the private connection.
         This represents a Cloud resource. (NOTE) Some attributes are not given
         arguments in this group but can be set in other ways.

         To set the project attribute:
         + provide the argument --private-connection on the command line with
           a fully specified name;
         + provide the argument --project on the command line;
         + set the property core/project.

       To set the region attribute:
        + provide the argument --private-connection on the command line with
          a fully specified name;
        + provide the argument --region on the command line.

         --private-connection=PRIVATE_CONNECTION
            ID of the private_connection or fully qualified identifier for the
            private_connection.

            To set the private_connection attribute:
         + provide the argument --private-connection on the command line.

       Or at least one of these can be specified:

         Service attachment resource - Resource ID of the service attachment.
         This represents a Cloud resource. (NOTE) Some attributes are not given
         arguments in this group but can be set in other ways.

         To set the project attribute:
         + provide the argument --psc-service-attachment on the command line
           with a fully specified name;
         + provide the argument --project on the command line;
         + set the property core/project.

       To set the region attribute:
        + provide the argument --psc-service-attachment on the command line
          with a fully specified name;
        + provide the argument --region on the command line.

         --psc-service-attachment=PSC_SERVICE_ATTACHMENT
            ID of the service_attachment or fully qualified identifier for the
            service_attachment.

            To set the service_attachment attribute:
         + provide the argument --psc-service-attachment on the command line.

       --static-ip-connectivity
          use static ip connectivity

       Or at least one of these can be specified:

         --forward-ssh-hostname=FORWARD_SSH_HOSTNAME
            Hostname for the SSH tunnel.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --forward-ssh-username=FORWARD_SSH_USERNAME
            Username for the SSH tunnel.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --forward-ssh-port=FORWARD_SSH_PORT; default=22
            Port for the SSH tunnel, default value is 22.

         Exactly one of these must be specified:

           --forward-ssh-password=FORWARD_SSH_PASSWORD
              SSH password.

           --forward-ssh-private-key=FORWARD_SSH_PRIVATE_KEY
              SSH private key..

     --username=USERNAME
        Username that Database Migration Service uses to connect to the
        database for metrics and observability. We highly recommend that you
        use the sqlserver user for this. Database Migration Service encrypts
        the value when storing it.

     --cloudsql-instance=CLOUDSQL_INSTANCE
        If the source or destination is a Cloud SQL database, then use this
        field to provide the respective Cloud SQL instance ID.

     --cloudsql-project-id=CLOUDSQL_PROJECT_ID
        The project id of the Cloud SQL instance. Only needed if the Cloud SQL
        instance is in a different project than the connection profile. This is
        only supported for source connection profiles for SQL Server.

     Exactly one of these must be specified:

       --password=PASSWORD
          Password for the user that Database Migration Service uses to connect
          to the database. Database Migration Service encrypts the value when
          storing it, and the field is not returned on request.

       --prompt-for-password
          Prompt for the password used to connect to the database.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud database-migration connection-profiles create sqlserver my-dest-profile \
    --region=us-central1 \
    --cloudsql-instance=cloudsql-id \
    --username=USERNAME \
    --prompt-for-password
```

### gcloud alpha database-migration connection-profiles create cloudsql

```text
NAME
    gcloud alpha database-migration connection-profiles create cloudsql -
        create a Database Migration Service connection profile for Cloud SQL

SYNOPSIS
    gcloud alpha database-migration connection-profiles create cloudsql
        (CONNECTION_PROFILE : --region=REGION)
        --database-version=DATABASE_VERSION --source-id=SOURCE_ID --tier=TIER
        [--activation-policy=ACTIVATION_POLICY] [--no-async]
        [--authorized-networks=NETWORK,[NETWORK,...]]
        [--no-auto-storage-increase] [--availability-type=AVAILABILITY_TYPE]
        [--data-disk-size=DATA_DISK_SIZE] [--data-disk-type=DATA_DISK_TYPE]
        [--database-flags=[FLAG=VALUE,...]] [--display-name=DISPLAY_NAME]
        [--no-enable-ip-v4] [--endpoint-mode=ENDPOINT_MODE]
        [--labels=[KEY=VALUE,...]] [--private-network=PRIVATE_NETWORK]
        [--provider=PROVIDER] [--require-ssl] [--root-password=ROOT_PASSWORD]
        [--secondary-zone=SECONDARY_ZONE]
        [--storage-auto-resize-limit=STORAGE_AUTO_RESIZE_LIMIT]
        [--user-labels=[KEY=VALUE,...]] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha database-migration connection-profiles create mysql

```text
NAME
    gcloud alpha database-migration connection-profiles create mysql - create a
        Database Migration Service connection profile for MySQL

SYNOPSIS
    gcloud alpha database-migration connection-profiles create mysql
        (CONNECTION_PROFILE : --region=REGION) [--no-async]
        [--display-name=DISPLAY_NAME] [--endpoint-mode=ENDPOINT_MODE]
        [--instance=INSTANCE] [--labels=[KEY=VALUE,...]] [--provider=PROVIDER]
        [--role=ROLE]
        [--ca-certificate=CA_CERTIFICATE
          --certificate=CERTIFICATE --private-key=PRIVATE_KEY]
        [--cloudsql-instance=CLOUDSQL_INSTANCE
          --host=HOST --port=PORT --username=USERNAME --password=PASSWORD
          | --prompt-for-password]
        [--private-connection=PRIVATE_CONNECTION
          | --psc-service-attachment=PSC_SERVICE_ATTACHMENT
          | --static-ip-connectivity] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the SQL Server destination `create` example passes `--cloudsql-instance` alone; the SYNOPSIS groups it with `--username` and `--password` / `--prompt-for-password` (gcloud 593.0.0: "argument --cloudsql-instance: --username (--password | --prompt-for-password) must be specified"), so the runnable form adds `--username=USERNAME --prompt-for-password` (gcloud asks for the password instead of taking it on the command line).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/connection-profiles/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
