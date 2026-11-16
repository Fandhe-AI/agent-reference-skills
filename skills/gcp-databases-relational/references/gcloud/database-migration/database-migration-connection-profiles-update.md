---
source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/connection-profiles/update
---

# gcloud database-migration connection-profiles update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud database-migration connection-profiles update

```text
NAME
    gcloud database-migration connection-profiles update - update a Database
        Migration Service connection profile

SYNOPSIS
    gcloud database-migration connection-profiles update
        (CONNECTION_PROFILE : --region=REGION)
        [--alloydb-cluster=ALLOYDB_CLUSTER] [--ca-certificate=CA_CERTIFICATE]
        [--client-certificate=CLIENT_CERTIFICATE]
        [--cloudsql-instance=CLOUDSQL_INSTANCE]
        [--cloudsql-project-id=CLOUDSQL_PROJECT_ID] [--database=DATABASE]
        [--database-service=DATABASE_SERVICE] [--dbm-port=DBM_PORT]
        [--display-name=DISPLAY_NAME] [--endpoint-mode=ENDPOINT_MODE]
        [--host=HOST] [--port=PORT] [--private-key=PRIVATE_KEY]
        [--ssl-flags=[FLAG=VALUE,...]] [--ssl-type=SSL_TYPE]
        [--update-labels=[KEY=VALUE,...]] [--username=USERNAME]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--disable-iam-authentication | --enable-iam-authentication]
        [--gcs-bucket=GCS_BUCKET : --gcs-prefix=GCS_PREFIX]
        [--password=PASSWORD | --prompt-for-password]
        [--private-connection=PRIVATE_CONNECTION
          | --psc-service-attachment=PSC_SERVICE_ATTACHMENT
          | --static-ip-connectivity
          | [--forward-ssh-hostname=FORWARD_SSH_HOSTNAME
          --forward-ssh-username=FORWARD_SSH_USERNAME
          (--forward-ssh-password=FORWARD_SSH_PASSWORD
          | --forward-ssh-private-key=FORWARD_SSH_PRIVATE_KEY)
          : --forward-ssh-port=FORWARD_SSH_PORT; default=22]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Database Migration Service connection profile.
      o Draft connection profile: the user can update all flags available in
        connection-profiles create command.
      o Existing connection profile: the user can update a limited list of
        flags, see connection-profiles update Synopsis.
      o If a migration job is using the connection profile, then updates to
        fields host, port, username, and password will propagate to the
        destination instance.

EXAMPLES
    To update the username of a connection profile:

        $ gcloud database-migration connection-profiles update my-profile \
          --region=us-central1 --username=new-user

POSITIONAL ARGUMENTS
     Connection profile resource - The connection profile to update. The
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
     --alloydb-cluster=ALLOYDB_CLUSTER
        If the destination is an AlloyDB cluster, use this field to provide the
        AlloyDB cluster ID.

     --ca-certificate=CA_CERTIFICATE
        x509 PEM-encoded certificate of the CA that signed the database
        server's certificate. The value for this flag needs to be the content
        of the certificate file, not the path to the file. For example, on a
        Linux machine you can use command substitution:
        <code>--ca-certificate=$(</path/to/certificate_file.pem)</code>.
        Database Migration Service will use this certificate to verify it's
        connecting to the correct host. Database Migration Service encrypts the
        value when storing it.

     --client-certificate=CLIENT_CERTIFICATE
        x509 PEM-encoded certificate that will be used by the replica to
        authenticate against the database server. The value for this flag needs
        to be the content of the certificate file, not the path to the file.
        For example, on a Linux machine you can use command substitution:
        <code>--client-certificate=$(</path/to/certificate_file.pem)</code>.
        Database Migration Service encrypts the value when storing it.

     --cloudsql-instance=CLOUDSQL_INSTANCE
        If the source or destination is a Cloud SQL database, then use this
        field to provide the respective Cloud SQL instance ID.

     --cloudsql-project-id=CLOUDSQL_PROJECT_ID
        The project id of the Cloud SQL instance. Only needed if the Cloud SQL
        instance is in a different project than the connection profile. This is
        only supported for source connection profiles for SQL Server.

     --database=DATABASE
        The name of the specific database within the host.

     --database-service=DATABASE_SERVICE
        database service for the oracle connection profile.

     --dbm-port=DBM_PORT
        The Database Mirroring (DBM) port.

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

     --host=HOST
        IP or hostname of the database.

            For PostgreSQL or MySQL destination profiles with Cloud SQL or AlloyDB, this
            flag is optional if the instance or cluster is provided.

            When `--psc-service-attachment` is also specified, this field value
            should be:

            1. For Cloud SQL PSC enabled instance - the dns_name field
               (e.g <uid>.<region>.sql.goog.).
            2. For Cloud SQL PSA instance (vpc peering) - the private ip of the
               instance.

            3. For AlloyDB PSC enabled cluster - the dns_name field of the primary
               instance (e.g <uid>.<region>.alloydb-psc.goog.).

            4. For AlloyDB PSA cluster - the private ip of the primary instance.

     --port=PORT
        Network port of the database.

            For PostgreSQL or MySQL destination profiles with Cloud SQL or AlloyDB, this
            flag is optional if the instance or cluster is provided.

     --private-key=PRIVATE_KEY
        Unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with
        the Client Certificate. The value for this flag needs to be the content
        of the certificate file, not the path to the file. For example, on a
        Linux machine you can use command substitution:
        <code>--private-key=$(</path/to/private_key_file.pem)</code>. Database
        Migration Service encrypts the value when storing it.

     --ssl-flags=[FLAG=VALUE,...]
        List of SSL flags used for establishing SSL connection to the database.
        Use an equals sign to separate the flag name and value. By default,
        flags are separated by commas. Example: --ssl-flags
        ssl_mode=enable,server_certificate_hostname=server.com.

        If flag values contain commas (such as RFC 2253 distinguished names for
        server_certificate_dn), use an alternative delimiter with the ^DELIM^
        prefix syntax. Example:
        --ssl-flags="^;^server_certificate_dn=CN=db.example.com,OU=RDS,O=Amazon.com,C=US".

     --ssl-type=SSL_TYPE
        The type of SSL configuration. SSL_TYPE must be one of: SERVER_ONLY,
        SERVER_CLIENT, REQUIRED, NONE.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --username=USERNAME
        Username that Database Migration Service uses to connect to the
        database. Database Migration Service encrypts the value when storing
        it.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud database-migration connection-profiles update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud database-migration connection-profiles update \
                --clear-labels --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

     At most one of these can be specified:

       --disable-iam-authentication
          Use IAM database authentication to connect to the database. The
          username will be overridden by the DMS service agent principal. This
          flag is only supported for PostgreSQL Destinations.

       --enable-iam-authentication
          Use IAM database authentication to connect to the database. The
          username will be overridden by the DMS service agent principal. This
          flag is only supported for PostgreSQL Destinations.

     --gcs-bucket=GCS_BUCKET
        Cloud Storage bucket for the source SQL Server connection profile where
        the backups are stored. This flag is used only for SQL Server to Cloud
        SQL migrations.

     --gcs-prefix=GCS_PREFIX
        Cloud Storage prefix path within the bucket for the source SQL Server
        connection profile where the backups are stored. This flag is used only
        for SQL Server to Cloud SQL migrations.

     At most one of these can be specified:

       --password=PASSWORD
          Password for the user that Database Migration Service uses to connect
          to the database. Database Migration Service encrypts the value when
          storing it, and the field is not returned on request.

       --prompt-for-password
          Prompt for the password used to connect to the database.

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

NOTES
    This variant is also available:

        $ gcloud alpha database-migration connection-profiles update
```

### gcloud alpha database-migration connection-profiles update

```text
NAME
    gcloud alpha database-migration connection-profiles update - update a
        Database Migration Service connection profile

SYNOPSIS
    gcloud alpha database-migration connection-profiles update
        (CONNECTION_PROFILE : --region=REGION)
        [--ca-certificate=CA_CERTIFICATE] [--certificate=CERTIFICATE]
        [--dbm-port=DBM_PORT] [--display-name=DISPLAY_NAME]
        [--endpoint-mode=ENDPOINT_MODE] [--host=HOST] [--instance=INSTANCE]
        [--port=PORT] [--private-key=PRIVATE_KEY]
        [--update-labels=[KEY=VALUE,...]] [--username=USERNAME]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--password=PASSWORD | --prompt-for-password]
        [--private-connection=PRIVATE_CONNECTION
          | --psc-service-attachment=PSC_SERVICE_ATTACHMENT
          | --static-ip-connectivity
          | [--forward-ssh-hostname=FORWARD_SSH_HOSTNAME
          --forward-ssh-username=FORWARD_SSH_USERNAME
          (--forward-ssh-password=FORWARD_SSH_PASSWORD
          | --forward-ssh-private-key=FORWARD_SSH_PRIVATE_KEY)
          : --forward-ssh-port=FORWARD_SSH_PORT; default=22]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/connection-profiles/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
