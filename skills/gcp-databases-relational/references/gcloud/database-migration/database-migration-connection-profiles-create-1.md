---
source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/connection-profiles/create
---

# gcloud database-migration connection-profiles create (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud database-migration connection-profiles create alloydb

```text
NAME
    gcloud database-migration connection-profiles create alloydb - create a
        Database Migration Service connection profile for AlloyDB

SYNOPSIS
    gcloud database-migration connection-profiles create alloydb
        (CONNECTION_PROFILE : --region=REGION) --cpu-count=CPU_COUNT
        --password=PASSWORD --primary-id=PRIMARY_ID [--no-async]
        [--authorized-network-cidr-ranges=[NETWORK,...]]
        [--cluster-labels=[KEY=VALUE,...]] [--database-flags=[FLAG=VALUE,...]]
        [--database-version=DATABASE_VERSION] [--display-name=DISPLAY_NAME]
        [--enable-outbound-public-ip] [--enable-public-ip]
        [--endpoint-mode=ENDPOINT_MODE] [--labels=[KEY=VALUE,...]]
        [--machine-type=MACHINE_TYPE] [--network=NETWORK]
        [--primary-labels=[KEY=VALUE,...]] [--role=ROLE]
        [--kms-key=KMS_KEY
          : --kms-keyring=KMS_KEYRING --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Database Migration Service destination connection profile for
    AlloyDB. This will create an AlloyDB cluster and primary instance.

EXAMPLES
    To create a connection profile for AlloyDB:

        $ gcloud database-migration connection-profiles create alloydb \
          my-profile --region=us-central1 --password=my_password \
          --primary-id=my-primary --cpu-count=2

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

REQUIRED FLAGS
     --cpu-count=CPU_COUNT
        Whole number value indicating how many vCPUs the machine should
        contain. Each vCPU count corresponds to a N2 high-mem machine:
        (https://cloud.google.com/compute/docs/general-purpose-machines#n2_machines).
        CPU_COUNT must be one of: 2, 4, 8, 16, 32, 64.

     --password=PASSWORD
        Initial password for the 'postgres' user.

     --primary-id=PRIMARY_ID
        The ID of the primary instance for this AlloyDB cluster.

OPTIONAL FLAGS
     --no-async
        Waits for the operation in progress to complete before returning.

     --authorized-network-cidr-ranges=[NETWORK,...]
        Comma-separated list of CIDR ranges that can connect to the AlloyDB
        instance.

     --cluster-labels=[KEY=VALUE,...]
        The resource labels for an AlloyDB cluster. An object containing a list
        of "key": "value" pairs.

     --database-flags=[FLAG=VALUE,...]
        Comma-separated list of database flags to set on the AlloyDB primary
        instance. Use an equals sign to separate the flag name and value. Flags
        without values, like skip_grant_tables, can be written out without a
        value, e.g., skip_grant_tables=. Use on/off values for booleans. View
        AlloyDB's documentation for allowed flags (e.g., --database-flags
        max_allowed_packet=55555,skip_grant_tables=,log_output=1).

     --database-version=DATABASE_VERSION
        Database engine major version. DATABASE_VERSION must be one of:
        POSTGRES_14, POSTGRES_15, POSTGRES_16, POSTGRES_17.

     --display-name=DISPLAY_NAME
        A user-friendly name for the connection profile. The display name can
        include letters, numbers, spaces, and hyphens, and must start with a
        letter.

     --enable-outbound-public-ip
        If true, Enables an outbound public IP address to support a database
        server sending requests out into the internet.

     --enable-public-ip
        If true, the AlloyDB instance will be accessible via public IP.

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

     --machine-type=MACHINE_TYPE
        Machine type of the VM instance. E.g. "n2-highmem-4", "n2-highmem-8",
        "c4a-highmem-4-lssd". cpu_count must match the number of vCPUs in the
        machine type.

     --network=NETWORK
        The VPC network from which the AlloyDB instance is accessible via
        private IP. For example, projects/myProject/global/networks/default.
        This setting cannot be updated after it is set.

     --primary-labels=[KEY=VALUE,...]
        The resource labels for an AlloyDB primary instance. An object
        containing a list of "key": "value" pairs.

     --role=ROLE
        The role of the connection profile. ROLE must be one of: SOURCE,
        DESTINATION.

     Kms key resource - Name of the CMEK (customer-managed encryption key) used
     for this AlloyDB cluster. For example,
     projects/myProject/locations/us-central1/keyRings/myKeyRing/cryptoKeys/myKey.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the region attribute:
      * provide the argument --kms-key on the command line with a fully
        specified name;
      * provide the argument --region on the command line.

     --kms-key=KMS_KEY
        ID of the kms-key or fully qualified identifier for the kms-key.

        To set the kms-key attribute:
        * provide the argument --kms-key on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --kms-keyring=KMS_KEYRING
        The CMEK keyring id of the kms-key.

        To set the kms-keyring attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-keyring on the command line.

     --kms-project=KMS_PROJECT
        The Cloud project id for the kms-key.

        To set the kms-project attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-project on the command line.

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

### gcloud database-migration connection-profiles create cloudsql

```text
NAME
    gcloud database-migration connection-profiles create cloudsql - create a
        Database Migration Service connection profile for Cloud SQL

SYNOPSIS
    gcloud database-migration connection-profiles create cloudsql
        (CONNECTION_PROFILE : --region=REGION) --source-id=SOURCE_ID
        --tier=TIER
        (--database-version=DATABASE_VERSION
          | --database-version-name=DATABASE_VERSION_NAME)
        [--activation-policy=ACTIVATION_POLICY]
        [--allocated-ip-range=ALLOCATED_IP_RANGE] [--no-async]
        [--authorized-networks=NETWORK,[NETWORK,...]]
        [--no-auto-storage-increase] [--availability-type=AVAILABILITY_TYPE]
        [--data-disk-size=DATA_DISK_SIZE] [--data-disk-type=DATA_DISK_TYPE]
        [--database-flags=[FLAG=VALUE,...]] [--display-name=DISPLAY_NAME]
        [--edition=EDITION] [--no-enable-ip-v4] [--endpoint-mode=ENDPOINT_MODE]
        [--labels=[KEY=VALUE,...]] [--private-network=PRIVATE_NETWORK]
        [--provider=PROVIDER] [--require-ssl] [--role=ROLE]
        [--root-password=ROOT_PASSWORD] [--secondary-zone=SECONDARY_ZONE]
        [--storage-auto-resize-limit=STORAGE_AUTO_RESIZE_LIMIT]
        [--user-labels=[KEY=VALUE,...]] [--zone=ZONE]
        [--cmek-key=CMEK_KEY
          : --cmek-keyring=CMEK_KEYRING --cmek-project=CMEK_PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Database Migration Service destination connection profile for
    Cloud SQL. This will create a Cloud SQL replica. Used for PostgreSQL and
    MySQL migrations.

EXAMPLES
    To create a connection profile for Cloud SQL with database version MySQL
    5.6:

        $ gcloud database-migration connection-profiles create cloudsql \
          my-profile --region=us-central1 --database-version=MYSQL_5_6 \
          --source-id=cp1 --tier=db-n1-standard-1

    To create a connection profile for Cloud SQL and a Cloud SQL replica with
    database version PostgreSQL 10:

        $ gcloud database-migration connection-profiles create cloudsql \
          my-profile --region=us-central1 --database-version=POSTGRES_10 \
          --source-id=cp1 --tier=db-custom-1-3840 --zone=us-central1-a

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

REQUIRED FLAGS
     Connection profile resource - Database Migration Service source connection
     profile ID. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --source-id on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the region attribute:
      * provide the argument --source-id on the command line with a fully
        specified name;
      * provide the argument --region on the command line.

     This must be specified.

       --source-id=SOURCE_ID
          ID of the connection_profile or fully qualified identifier for the
          connection_profile.

          To set the connection_profile attribute:
          + provide the argument --source-id on the command line.

     --tier=TIER
        Tier (or machine type) for this instance, for example: db-n1-standard-1
        (MySQL instances) or db-custom-1-3840 (PostgreSQL instances). For more
        information, see Cloud SQL Instance Settings
        (https://cloud.google.com/sql/docs/mysql/instance-settings).

     Exactly one of these must be specified:

       --database-version=DATABASE_VERSION
          Database engine type and version. DATABASE_VERSION must be one of:
          MYSQL_5_7, MYSQL_5_6, MYSQL_8_0, MYSQL_8_0_18, MYSQL_8_0_26,
          MYSQL_8_0_27, MYSQL_8_0_28, MYSQL_8_0_30, MYSQL_8_0_31, MYSQL_8_0_32,
          MYSQL_8_0_33, MYSQL_8_0_34, MYSQL_8_0_35, MYSQL_8_0_36, MYSQL_8_0_37,
          MYSQL_8_4, POSTGRES_9_6, POSTGRES_10, POSTGRES_11, POSTGRES_12,
          POSTGRES_13, POSTGRES_14, POSTGRES_15, POSTGRES_16.

       --database-version-name=DATABASE_VERSION_NAME
          Database version name (e.g. POSTGRES_15)

OPTIONAL FLAGS
     --activation-policy=ACTIVATION_POLICY
        Activation policy specifies when the instance is activated; it is
        applicable only when the instance state is 'RUNNABLE'. Valid values:

        ALWAYS: The instance is on, and remains so even in the absence of
        connection requests.

        NEVER: The instance is off; it is not activated, even if a connection
        request arrives.

        ACTIVATION_POLICY must be one of: ALWAYS, NEVER.

     --allocated-ip-range=ALLOCATED_IP_RANGE
        The name of the allocated IP range for the private IP Cloud SQL
        instance. This name refers to an already allocated IP range. If set,
        the instance IP will be created in the allocated range.

     --no-async
        Waits for the operation in progress to complete before returning.

     --authorized-networks=NETWORK,[NETWORK,...]
        List of external networks that are allowed to connect to the instance.
        Specify values in CIDR notation, also known as 'slash' notation
        (e.g.192.168.100.0/24).

     --auto-storage-increase
        If you enable this setting, Cloud SQL checks your available storage
        every 30 seconds. If the available storage falls below a threshold
        size, Cloud SQL automatically adds additional storage capacity. If the
        available storage repeatedly falls below the threshold size, Cloud SQL
        continues to add storage until it reaches the maximum of 64 TB.
        Default: ON. Enabled by default, use --no-auto-storage-increase to
        disable.

     --availability-type=AVAILABILITY_TYPE
        Cloud SQL availability type. AVAILABILITY_TYPE must be one of:
        REGIONAL, ZONAL.

     --data-disk-size=DATA_DISK_SIZE
        Storage capacity available to the database, in GB. The minimum (and
        default) size is 10GB.

     --data-disk-type=DATA_DISK_TYPE
        Type of storage. DATA_DISK_TYPE must be one of: PD_SSD, PD_HDD.

     --database-flags=[FLAG=VALUE,...]
        Comma-separated list of database flags to set on the instance. Use an
        equals sign to separate the flag name and value. Flags without values,
        like skip_grant_tables, can be written out without a value, e.g.,
        skip_grant_tables=. Use on/off values for booleans. View the Instance
        Resource API for allowed flags. (e.g., --database-flags
        max_allowed_packet=55555 skip_grant_tables=,log_output=1).

     --display-name=DISPLAY_NAME
        A user-friendly name for the connection profile. The display name can
        include letters, numbers, spaces, and hyphens, and must start with a
        letter.

     --edition=EDITION
        Specifies edition. EDITION must be one of:

         enterprise
            Enterprise is the standard option for smaller instances.
         enterprise-plus
            Enterprise plus option recommended for cpu-intensive workloads.
            Offers access to premium features and capabilities.

     --enable-ip-v4
        Whether the instance should be assigned an IPv4 address or not. Enabled
        by default, use --no-enable-ip-v4 to disable.

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

     --private-network=PRIVATE_NETWORK
        Resource link for the VPC network from which the Cloud SQL instance is
        accessible for private IP. For example,
        /projects/myProject/global/networks/default. This setting can be
        updated, but it cannot be removed after it is set.

     --provider=PROVIDER
        Database provider, for managed databases. PROVIDER must be one of: RDS,
        CLOUDSQL.

     --require-ssl
        Whether SSL connections over IP should be enforced or not.

     --role=ROLE
        The role of the connection profile. ROLE must be one of: SOURCE,
        DESTINATION.

     --root-password=ROOT_PASSWORD
        Root Cloud SQL user's password.

     --secondary-zone=SECONDARY_ZONE
        Google Cloud Platform zone where the failover Cloud SQL database
        instance is located. Used when the Cloud SQL database availability type
        is REGIONAL (i.e. multiple zones / highly available).

     --storage-auto-resize-limit=STORAGE_AUTO_RESIZE_LIMIT
        Maximum size to which storage capacity can be automatically increased.
        The default value is 0, which specifies that there is no limit.

     --user-labels=[KEY=VALUE,...]
        The resource labels for a Cloud SQL instance to use to annotate any
        related underlying resources such as Compute Engine VMs. An object
        containing a list of "key": "value" pairs.

     --zone=ZONE
        Google Cloud Platform zone where your Cloud SQL database instance is
        located.

     Cmek key resource - Name of the CMEK (customer-managed encryption key)
     used for the connection profile. For example,
     projects/myProject/locations/us-central1/keyRings/myKeyRing/cryptoKeys/myKey.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the region attribute:
      * provide the argument --cmek-key on the command line with a fully
        specified name.

     --cmek-key=CMEK_KEY
        ID of the cmek-key or fully qualified identifier for the cmek-key.

        To set the cmek-key attribute:
        * provide the argument --cmek-key on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --cmek-keyring=CMEK_KEYRING
        The CMEK keyring id of the cmek-key.

        To set the cmek-keyring attribute:
        * provide the argument --cmek-key on the command line with a fully
          specified name;
        * provide the argument --cmek-keyring on the command line.

     --cmek-project=CMEK_PROJECT
        The Cloud project id for the cmek-key.

        To set the cmek-project attribute:
        * provide the argument --cmek-key on the command line with a fully
          specified name;
        * provide the argument --cmek-project on the command line.

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

        $ gcloud alpha database-migration connection-profiles create cloudsql
```

### gcloud database-migration connection-profiles create mysql

```text
NAME
    gcloud database-migration connection-profiles create mysql - create a
        Database Migration Service connection profile for MySQL

SYNOPSIS
    gcloud database-migration connection-profiles create mysql
        (CONNECTION_PROFILE : --region=REGION) [--no-async]
        [--display-name=DISPLAY_NAME] [--endpoint-mode=ENDPOINT_MODE]
        [--labels=[KEY=VALUE,...]] [--provider=PROVIDER] [--role=ROLE]
        [--ca-certificate=CA_CERTIFICATE --ssl-type=SSL_TYPE
          --client-certificate=CLIENT_CERTIFICATE --private-key=PRIVATE_KEY]
        [--cloudsql-instance=CLOUDSQL_INSTANCE
          --host=HOST --port=PORT --username=USERNAME --password=PASSWORD
          | --prompt-for-password]
        [--private-connection=PRIVATE_CONNECTION
          | --psc-service-attachment=PSC_SERVICE_ATTACHMENT
          | --static-ip-connectivity] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Database Migration Service connection profile for MySQL.

EXAMPLES
    To create a connection profile for MySQL:

        $ gcloud database-migration connection-profiles create mysql \
          my-profile --region=us-central1 --password=123456 \
          --username=my-user --host=1.2.3.4 --port=3306

    If the source is a Cloud SQL database, run:

        $ gcloud database-migration connection-profiles create mysql \
          my-profile --region=us-central1 --password=123456 \
          --username=my-user --host=1.2.3.4 --port=3306 \
          --cloudsql-instance=my-instance --provider=CLOUDSQL

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

     --provider=PROVIDER
        Database provider, for managed databases. PROVIDER must be one of: RDS,
        CLOUDSQL.

     --role=ROLE
        The role of the connection profile. ROLE must be one of: SOURCE,
        DESTINATION.

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
        SERVER_CLIENT, REQUIRED, NONE.

     --client-certificate=CLIENT_CERTIFICATE
        x509 PEM-encoded certificate that will be used by the replica to
        authenticate against the database server. The value for this flag needs
        to be the content of the certificate file, not the path to the file.
        For example, on a Linux machine you can use command substitution:
        <code>--client-certificate=$(</path/to/certificate_file.pem)</code>.
        Database Migration Service encrypts the value when storing it.

     --private-key=PRIVATE_KEY
        Unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with
        the Client Certificate. The value for this flag needs to be the content
        of the certificate file, not the path to the file. For example, on a
        Linux machine you can use command substitution:
        <code>--private-key=$(</path/to/private_key_file.pem)</code>. Database
        Migration Service encrypts the value when storing it.

     --cloudsql-instance=CLOUDSQL_INSTANCE
        If the source or destination is a Cloud SQL database, then use this
        field to provide the respective Cloud SQL instance ID.

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

     --port=PORT
        Network port of the database.

            For PostgreSQL or MySQL destination profiles with Cloud SQL or AlloyDB, this
            flag is optional if the instance or cluster is provided.

     --username=USERNAME
        Username that Database Migration Service uses to connect to the
        database. Database Migration Service encrypts the value when storing
        it.

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

        $ gcloud alpha database-migration connection-profiles create mysql
```

### gcloud database-migration connection-profiles create oracle

```text
NAME
    gcloud database-migration connection-profiles create oracle - create a
        Database Migration Service connection profile for Oracle

SYNOPSIS
    gcloud database-migration connection-profiles create oracle
        (CONNECTION_PROFILE : --region=REGION)
        --database-service=DATABASE_SERVICE --host=HOST --port=PORT
        --username=USERNAME (--password=PASSWORD | --prompt-for-password)
        [--no-async] [--ca-certificate=CA_CERTIFICATE]
        [--display-name=DISPLAY_NAME] [--endpoint-mode=ENDPOINT_MODE]
        [--labels=[KEY=VALUE,...]] [--role=ROLE]
        [--asm-host=ASM_HOST --asm-password=ASM_PASSWORD --asm-port=ASM_PORT
          --asm-service-name=ASM_SERVICE_NAME --asm-user=ASM_USER]
        [--private-connection=PRIVATE_CONNECTION | --static-ip-connectivity
          | [--forward-ssh-hostname=FORWARD_SSH_HOSTNAME
          --forward-ssh-username=FORWARD_SSH_USERNAME
          (--forward-ssh-password=FORWARD_SSH_PASSWORD
          | --forward-ssh-private-key=FORWARD_SSH_PRIVATE_KEY)
          : --forward-ssh-port=FORWARD_SSH_PORT; default=22]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Database Migration Service connection profile for Oracle.

EXAMPLES
    To create a connection profile my-profile for Oracle:

        $ gcloud database-migration connection-profiles create oracle \
          my-profile --region=us-central1 --password=123456 \
          --username=my-user --host=1.2.3.4 --port=5432

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

REQUIRED FLAGS
     --database-service=DATABASE_SERVICE
        database service for the oracle connection profile.

     --host=HOST
        IP or hostname of the database.

            When `--psc-service-attachment` is also specified, this field value
            should be:

            1. For Cloud SQL PSC enabled instance - the dns_name field
               (e.g <uid>.<region>.sql.goog.).
            2. For Cloud SQL PSA instance (vpc peering) - the private ip of the
               instance.

     --port=PORT
        Network port of the database.

     --username=USERNAME
        Username that Database Migration Service uses to connect to the
        database. Database Migration Service encrypts the value when storing
        it.

     Exactly one of these must be specified:

       --password=PASSWORD
          Password for the user that Database Migration Service uses to connect
          to the database. Database Migration Service encrypts the value when
          storing it, and the field is not returned on request.

       --prompt-for-password
          Prompt for the password used to connect to the database.

OPTIONAL FLAGS
     --no-async
        Waits for the operation in progress to complete before returning.

     --ca-certificate=CA_CERTIFICATE
        x509 PEM-encoded certificate of the CA that signed the database
        server's certificate. The value for this flag needs to be the content
        of the certificate file, not the path to the file. For example, on a
        Linux machine you can use command substitution:
        <code>--ca-certificate=$(</path/to/certificate_file.pem)</code>.
        Database Migration Service will use this certificate to verify it's
        connecting to the correct host. Database Migration Service encrypts the
        value when storing it.

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

     Oracle Automatic Storage Management (ASM) configuration.

     --asm-host=ASM_HOST
        Hostname for the Oracle ASM connection.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --asm-password=ASM_PASSWORD
        Password for the Oracle ASM connection.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --asm-port=ASM_PORT
        Port for the Oracle ASM connection.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --asm-service-name=ASM_SERVICE_NAME
        ASM service name for the Oracle ASM connection.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --asm-user=ASM_USER
        Username for the Oracle ASM connection.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

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
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud database-migration connection-profiles create oracle my-profile \
    --region=us-central1 \
    --password=123456 \
    --username=my-user \
    --host=1.2.3.4 \
    --port=5432 \
    --database-service=DATABASE_SERVICE
```

### gcloud database-migration connection-profiles create postgresql

```text
NAME
    gcloud database-migration connection-profiles create postgresql - create a
        Database Migration Service connection profile for PostgreSQL

SYNOPSIS
    gcloud database-migration connection-profiles create postgresql
        (CONNECTION_PROFILE : --region=REGION) [--no-async]
        [--display-name=DISPLAY_NAME] [--endpoint-mode=ENDPOINT_MODE]
        [--labels=[KEY=VALUE,...]] [--role=ROLE] [--ssl-flags=[FLAG=VALUE,...]]
        [--alloydb-cluster=ALLOYDB_CLUSTER
          --cloudsql-instance=CLOUDSQL_INSTANCE --database=DATABASE
          --host=HOST --port=PORT --enable-iam-authentication
          | --username=USERNAME (--password=PASSWORD | --prompt-for-password)]
        [--ca-certificate=CA_CERTIFICATE --ssl-type=SSL_TYPE
          --client-certificate=CLIENT_CERTIFICATE --private-key=PRIVATE_KEY]
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
    Create a Database Migration Service connection profile for PostgreSQL.

EXAMPLES
    To create a connection profile my-profile for PostgreSQL:

        $ gcloud database-migration connection-profiles create postgresql \
          my-profile --region=us-central1 --password=123456 \
          --username=my-user --host=1.2.3.4 --port=5432

    If the source is a Cloud SQL database, run:

        $ gcloud database-migration connection-profiles create postgresql \
          my-profile --region=us-central1 --password=123456 \
          --username=my-user --host=1.2.3.4 --port=5432 \
          --cloudsql-instance=my-instance

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

     --alloydb-cluster=ALLOYDB_CLUSTER
        If the destination is an AlloyDB cluster, use this field to provide the
        AlloyDB cluster ID.

     --cloudsql-instance=CLOUDSQL_INSTANCE
        If the source or destination is a Cloud SQL database, then use this
        field to provide the respective Cloud SQL instance ID.

     --database=DATABASE
        The name of the specific database within the host. For Native Logical
        Postgres migrations, one of the replicating databases must be
        specified.

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

     Authentication method.

     At most one of these can be specified:

       --enable-iam-authentication
          Use IAM database authentication to connect to the database. The
          username will be overridden by the DMS service agent principal. This
          flag is only supported for PostgreSQL Destinations.

       Or at least one of these can be specified:

         --username=USERNAME
            Username that Database Migration Service uses to connect to the
            database. Database Migration Service encrypts the value when
            storing it.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         Exactly one of these must be specified:

           --password=PASSWORD
              Password for the user that Database Migration Service uses to
              connect to the database. Database Migration Service encrypts the
              value when storing it, and the field is not returned on request.

           --prompt-for-password
              Prompt for the password used to connect to the database.

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
        SERVER_CLIENT, REQUIRED, NONE.

     --client-certificate=CLIENT_CERTIFICATE
        x509 PEM-encoded certificate that will be used by the replica to
        authenticate against the database server. The value for this flag needs
        to be the content of the certificate file, not the path to the file.
        For example, on a Linux machine you can use command substitution:
        <code>--client-certificate=$(</path/to/certificate_file.pem)</code>.
        Database Migration Service encrypts the value when storing it.

     --private-key=PRIVATE_KEY
        Unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with
        the Client Certificate. The value for this flag needs to be the content
        of the certificate file, not the path to the file. For example, on a
        Linux machine you can use command substitution:
        <code>--private-key=$(</path/to/private_key_file.pem)</code>. Database
        Migration Service encrypts the value when storing it.

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
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the Oracle `create` example omits `--database-service`, which the SYNOPSIS and REQUIRED FLAGS list as required (gcloud 593.0.0: "argument --database-service: Must be specified"); the runnable form adds `--database-service=DATABASE_SERVICE` (the Oracle database service name).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/connection-profiles/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
